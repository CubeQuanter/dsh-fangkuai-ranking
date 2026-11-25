import { defineTool } from '@deepseek-ai/dsh-tools'
import type { Context } from '@deepseek-ai/cordis'
import { CONDITIONS, CONDITION_GROUPS, METRICS, TEMPLATES } from '../shared/catalog.ts'
import { formatCondition, formatMetric, formatSort } from '../shared/format.ts'
import type { EvaluateResult, ResultRow } from '../shared/types.ts'
import { AppError } from './errors.ts'
import type { RankingService } from './service.ts'

function textBlock(text: string) {
  return [{ type: 'text' as const, text }]
}

function hhmmss(asOf: number | null): string {
  if (!asOf) return '暂无'
  return new Intl.DateTimeFormat('zh-CN', {
    timeZone: 'Asia/Shanghai',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false,
  }).format(new Date(asOf))
}

function rankingLine(ranking: { name: string; conditionTexts: string[]; sortText: string }): string {
  const conditions = ranking.conditionTexts.length > 0 ? ranking.conditionTexts.join('；') : '不限条件'
  return `${ranking.name}｜${conditions}｜${ranking.sortText}`
}

function tableRows(result: EvaluateResult, limit: number): string {
  const rows = result.rows.slice(0, limit)
  if (rows.length === 0) return '没有股票同时满足这些条件。可以去掉一两个条件后再试。'
  const header = '| 排名 | 名称 | 代码 | 涨跌幅 | 成交额 | 标签 |'
  const divider = '| --- | --- | --- | --- | --- | --- |'
  const body = rows.map((row: ResultRow) => {
    const pct = formatMetric('pct', row.pct)
    const amount = formatMetric('amount', row.amount)
    const tags = row.tags.length > 0 ? row.tags.join('、') : '—'
    return `| ${row.rank} | ${row.name} | ${row.ticker} | ${pct} | ${amount} | ${tags} |`
  })
  return [header, divider, ...body].join('\n')
}

function summary(result: EvaluateResult): string {
  const lines = [
    `《${result.ranking.name}》`,
    `共命中 ${result.matched} 只，展示 ${result.rows.length} 只；行情时点 ${hhmmss(result.asOf)}。`,
    `条件：${result.conditionTexts.join('；') || '不限条件'}`,
    `排序：${result.sortText}`,
  ]
  if (result.warnings.length > 0) lines.push(`提示：${result.warnings.join('；')}`)
  return lines.join('\n')
}

function catalogText(): string {
  const lines = ['可用条件（按用途分组）：']
  for (const group of CONDITION_GROUPS) {
    const items = CONDITIONS.filter((item) => item.group === group.id).map((item) => `${item.key}（${item.label}）`)
    lines.push(`- ${group.label}：${items.join('、')}`)
  }
  lines.push('', `排序项：${METRICS.filter((item) => item.sortable).map((item) => `${item.key}（${item.label}）`).join('、')}`)
  lines.push('', '推荐模板：')
  for (const template of TEMPLATES) lines.push(`- ${template.name}：${template.description}`)
  lines.push('', '创建榜单时，conditions 里每条写 key、op、value；数值条件的 op 用 gte/lte/between，板块条件用 in。')
  return lines.join('\n')
}

/** 模型工具与界面共用同一个服务；这里只做参数适配和中文呈现。 */
export function registerTools(ctx: Context, service: RankingService): () => void {
  const disposers: (() => void)[] = []

  disposers.push(
    ctx.tools.register(
      defineTool({
        name: 'fangkuai_ranking_status',
        description:
          '查看方块榜单插件状态：访问密钥是否已配置、本机保存了哪些榜单。开始任何榜单操作前先调用一次，确认用户已完成连接。',
        parameters: {},
        timeoutMs: 30000,
        output: {
          schema: {
            type: 'object',
            additionalProperties: false,
            properties: { text: { type: 'string', required: true } },
          },
          render: (_args, value) => textBlock(value.text),
        },
        async execute() {
          const data = await service.bootstrap()
          const lines: string[] = []
          lines.push(data.connection.configured ? '扶摇数据已连接。' : '还没有配置扶摇访问密钥。')
          if (!data.connection.configured) {
            lines.push('请让用户在侧栏「榜单」中打开工作台，填写访问密钥并验证。密钥只保存在本机，不会进入对话。')
          }
          lines.push(`已保存 ${data.rankings.length} 个榜单：`)
          if (data.rankings.length === 0) lines.push('- 暂无')
          for (const ranking of data.rankings) {
            lines.push(
              `- ${ranking.id}｜${rankingLine({
                name: ranking.name,
                conditionTexts: ranking.conditions.map(formatCondition),
                sortText: formatSort(ranking.sortKey, ranking.sortDir),
              })}`,
            )
          }
          return { text: lines.join('\n') }
        },
      }),
    ),
  )

  disposers.push(
    ctx.tools.register(
      defineTool({
        name: 'fangkuai_ranking_catalog',
        description:
          '获取方块榜单可用的选股条件、排序项、展示列和推荐模板。创建或修改榜单前调用，按返回的条件键（key）组装配置。',
        parameters: {},
        timeoutMs: 30000,
        output: {
          schema: {
            type: 'object',
            additionalProperties: false,
            properties: { text: { type: 'string', required: true } },
          },
          render: (_args, value) => textBlock(value.text),
        },
        async execute() {
          return { text: catalogText() }
        },
      }),
    ),
  )

  disposers.push(
    ctx.tools.register(
      defineTool({
        name: 'fangkuai_ranking_create',
        description:
          '创建并保存一个个性化榜单。config 需要 name、conditions、sortKey、sortDir、limit、view、columns、groupBy；条件键必须来自 fangkuai_ranking_catalog。创建后用户可在侧栏「榜单」看到结果。',
        parameters: {
          config: {
            type: 'json',
            required: true,
            description:
              '榜单配置。示例：{"name":"低位放量","conditions":[{"key":"pct","op":"gte","value":3},{"key":"volRatio5","op":"gte","value":1.5}],"sortKey":"amount","sortDir":"desc","limit":30,"view":"list","columns":["pct","amount","pct5"],"groupBy":"board"}',
          },
        },
        timeoutMs: 30000,
        output: {
          schema: {
            type: 'object',
            additionalProperties: false,
            properties: { text: { type: 'string', required: true } },
          },
          render: (_args, value) => textBlock(value.text),
        },
        async execute(args) {
          const ranking = await service.create(args.config)
          return {
            text: `已创建榜单「${ranking.name}」（${ranking.id}）。\n${rankingLine({
              name: ranking.name,
              conditionTexts: ranking.conditions.map(formatCondition),
              sortText: formatSort(ranking.sortKey, ranking.sortDir),
            })}\n可在侧栏「榜单」查看和调整。`,
          }
        },
      }),
    ),
  )

  disposers.push(
    ctx.tools.register(
      defineTool({
        name: 'fangkuai_ranking_update',
        description:
          '修改已保存的榜单。patch 只写要改的字段，例如 {"name":"新名字"} 或 {"conditions":[...]}；未写的字段保持不变。',
        parameters: {
          id: { type: 'string', required: true, description: '榜单一览里显示的榜单编号' },
          patch: { type: 'json', required: true, description: '要修改的字段，结构同创建榜单的 config' },
        },
        timeoutMs: 30000,
        output: {
          schema: {
            type: 'object',
            additionalProperties: false,
            properties: { text: { type: 'string', required: true } },
          },
          render: (_args, value) => textBlock(value.text),
        },
        async execute(args) {
          const ranking = await service.update(args.id, args.patch)
          return {
            text: `已更新榜单「${ranking.name}」。\n${rankingLine({
              name: ranking.name,
              conditionTexts: ranking.conditions.map(formatCondition),
              sortText: formatSort(ranking.sortKey, ranking.sortDir),
            })}`,
          }
        },
      }),
    ),
  )

  disposers.push(
    ctx.tools.register(
      defineTool({
        name: 'fangkuai_ranking_delete',
        description: '删除一个已保存的榜单。删除后无法恢复。',
        parameters: {
          id: { type: 'string', required: true, description: '榜单一览里显示的榜单编号' },
        },
        timeoutMs: 30000,
        output: {
          schema: {
            type: 'object',
            additionalProperties: false,
            properties: { text: { type: 'string', required: true } },
          },
          render: (_args, value) => textBlock(value.text),
        },
        async execute(args) {
          await service.remove(args.id)
          return { text: '已删除这个榜单。' }
        },
      }),
    ),
  )

  disposers.push(
    ctx.tools.register(
      defineTool({
        name: 'fangkuai_ranking_evaluate',
        description:
          '实时计算一个榜单。传 id 计算已保存的榜单；或传 config 直接试算而不保存。返回命中数量、行情时点和前 N 名。首次使用窗口条件时需要读取近10日行情，可能稍慢。',
        parameters: {
          id: { type: 'string', description: '已保存榜单的编号；与 config 二选一' },
          config: { type: 'json', description: '临时榜单配置；与 id 二选一' },
          limit: { type: 'number', description: '最多返回多少名，1 到 50，默认 20' },
        },
        timeoutMs: 120000,
        output: {
          schema: {
            type: 'object',
            additionalProperties: false,
            properties: { text: { type: 'string', required: true } },
          },
          render: (_args, value) => textBlock(value.text),
        },
        async execute(args) {
          const limit = Math.min(Math.max(Math.round(args.limit ?? 20), 1), 50)
          let result: EvaluateResult
          if (args.id) {
            result = await service.evaluateSaved(args.id, false, limit)
          } else if (args.config !== undefined) {
            result = await service.evaluateDraft(args.config, false, limit)
          } else {
            throw new AppError('missing_target', '请提供榜单编号或一份临时配置')
          }
          return { text: `${summary(result)}\n\n${tableRows(result, limit)}` }
        },
      }),
    ),
  )

  return () => {
    for (const dispose of disposers) dispose()
  }
}

