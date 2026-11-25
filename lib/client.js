window.__ModuleLoader__.load({
	id: "dsh-fangkuai-ranking",
	factory: (require) => {
		var module = { exports: {} };
		var exports = module.exports;
		Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
		let react_jsx_runtime = require("react/jsx-runtime");
		let react = require("react");
		// src/client/ui/icons.tsx
		const paths = {
			plus: ["M12 5v14", "M5 12h14"],
			refresh: ["M20 11a8 8 0 1 1-2.3-5.7", "M20 4v7h-7"],
			settings: ["M12 15.2a3.2 3.2 0 1 0 0-6.4 3.2 3.2 0 0 0 0 6.4Z", "M19.4 15a1.7 1.7 0 0 0 .3 1.9l.1.1a2 2 0 0 1-2.8 2.8l-.1-.1a1.7 1.7 0 0 0-1.9-.3 1.7 1.7 0 0 0-1 1.6V21a2 2 0 0 1-4 0v-.1a1.7 1.7 0 0 0-1-1.6 1.7 1.7 0 0 0-1.9.3l-.1.1a2 2 0 0 1-2.8-2.8l.1-.1a1.7 1.7 0 0 0 .3-1.9 1.7 1.7 0 0 0-1.6-1H3a2 2 0 0 1 0-4h.1a1.7 1.7 0 0 0 1.6-1 1.7 1.7 0 0 0-.3-1.9l-.1-.1a2 2 0 0 1 2.8-2.8l.1.1a1.7 1.7 0 0 0 1.9.3h0a1.7 1.7 0 0 0 1-1.6V3a2 2 0 0 1 4 0v.1a1.7 1.7 0 0 0 1 1.6 1.7 1.7 0 0 0 1.9-.3l.1-.1a2 2 0 0 1 2.8 2.8l-.1.1a1.7 1.7 0 0 0-.3 1.9v0a1.7 1.7 0 0 0 1.6 1H21a2 2 0 0 1 0 4h-.1a1.7 1.7 0 0 0-1.6 1Z"],
			close: ["M6 6l12 12", "M18 6l-12 12"],
			back: ["M15 18l-6-6 6-6"],
			chevron: ["M6 9l6 6 6-6"],
			search: ["M11 19a8 8 0 1 0 0-16 8 8 0 0 0 0 16Z", "M21 21l-4.3-4.3"],
			download: [
				"M12 3v12",
				"M7 10l5 5 5-5",
				"M5 21h14"
			],
			edit: ["M12 20h9", "M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4Z"],
			copy: ["M9 9h11v11H9Z", "M5 15H4V4h11v1"],
			trash: [
				"M3 6h18",
				"M8 6V4h8v2",
				"M19 6l-1 14H6L5 6",
				"M10 11v6",
				"M14 11v6"
			],
			check: ["M20 6L9 17l-5-5"],
			eye: ["M2 12s3.5-6 10-6 10 6 10 6-3.5 6-10 6S2 12 2 12Z", "M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z"],
			"eye-off": [
				"M3 3l18 18",
				"M10.6 6.2A9 9 0 0 1 12 6c6.5 0 10 6 10 6a15 15 0 0 1-3.3 3.8",
				"M6.4 8.1A15 15 0 0 0 2 12s3.5 6 10 6c1.4 0 2.8-.3 4-.8",
				"M9.5 9.5a3 3 0 0 0 4.2 4.2"
			],
			key: [
				"M15 7a4 4 0 1 0 3 6.6",
				"M18 13l4 4-2 2-4-4",
				"M14 10l-9 9 2 2 9-9"
			],
			list: [
				"M8 6h13",
				"M8 12h13",
				"M8 18h13",
				"M3 6h.1",
				"M3 12h.1",
				"M3 18h.1"
			],
			cards: [
				"M3 3h7v7H3Z",
				"M14 3h7v7h-7Z",
				"M3 14h7v7H3Z",
				"M14 14h7v7h-7Z"
			],
			bars: [
				"M5 20V10",
				"M12 20V4",
				"M19 20v-7"
			],
			groups: [
				"M4 5h6v6H4Z",
				"M14 5h6v6h-6Z",
				"M4 14h6v6H4Z",
				"M14 14h6v6h-6Z"
			],
			"arrow-right": ["M5 12h14", "M13 6l6 6-6 6"],
			warning: [
				"M12 3l10 18H2L12 3Z",
				"M12 9v5",
				"M12 18h.1"
			]
		};
		function Icon({ name, size = 18, ...rest }) {
			return /* @__PURE__ */ (0, react_jsx_runtime.jsx)("svg", {
				viewBox: "0 0 24 24",
				width: size,
				height: size,
				fill: "none",
				stroke: "currentColor",
				strokeWidth: 1.7,
				strokeLinecap: "round",
				strokeLinejoin: "round",
				"aria-hidden": "true",
				...rest,
				children: paths[name].map((path) => /* @__PURE__ */ (0, react_jsx_runtime.jsx)("path", { d: path }, path))
			});
		}
		/** 方块量化品牌图标：白底圆角方块 + 黑色立方体线稿，与应用图标同源。 */
		function BrandMark({ size = 28 }) {
			return /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("svg", {
				viewBox: "0 0 100 100",
				width: size,
				height: size,
				"aria-hidden": "true",
				children: [
					/* @__PURE__ */ (0, react_jsx_runtime.jsx)("rect", {
						x: "1",
						y: "1",
						width: "98",
						height: "98",
						rx: "4",
						fill: "#ffffff"
					}),
					/* @__PURE__ */ (0, react_jsx_runtime.jsx)("polygon", {
						points: "50,6.26 90.6,26.56 90.6,73.44 50,93.74 9.4,73.44 9.4,26.56",
						fill: "#000000"
					}),
					/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("g", {
						stroke: "#ffffff",
						strokeWidth: "2.03",
						strokeLinecap: "round",
						children: [
							/* @__PURE__ */ (0, react_jsx_runtime.jsx)("line", {
								x1: "50",
								y1: "46.86",
								x2: "9.4",
								y2: "26.56"
							}),
							/* @__PURE__ */ (0, react_jsx_runtime.jsx)("line", {
								x1: "50",
								y1: "46.86",
								x2: "90.6",
								y2: "26.56"
							}),
							/* @__PURE__ */ (0, react_jsx_runtime.jsx)("line", {
								x1: "50",
								y1: "46.86",
								x2: "50",
								y2: "93.74"
							})
						]
					})
				]
			});
		}
		// src/shared/catalog.ts
		const CONDITION_GROUPS = [
			{
				id: "scope",
				label: "范围与身份",
				hint: "先圈定看哪一类股票"
			},
			{
				id: "quote",
				label: "行情与量能",
				hint: "价格、成交和波动"
			},
			{
				id: "valuation",
				label: "估值与换手",
				hint: "市盈率、市值和换手"
			},
			{
				id: "window",
				label: "短线窗口",
				hint: "近 5 到 10 个交易日的强弱"
			},
			{
				id: "limit",
				label: "涨停与打板",
				hint: "封板、连板和炸板状态"
			},
			{
				id: "trend",
				label: "趋势与历史",
				hint: "近 60 个交易日的趋势与技术指标"
			},
			{
				id: "hot",
				label: "热榜与情绪",
				hint: "同花顺热榜和飙升榜"
			}
		];
		/** 条件选择器首屏只放这些高频条件；其余收在「更多条件」里，避免一次摊 53 个。
		*  选的是覆盖「圈范围、看强弱、抓涨停、跟情绪」四类动作的最小集，
		*  不是按数据源或字段数量摊平。 */
		const COMMON_CONDITION_KEYS = [
			"keyword",
			"industry",
			"concept",
			"pct",
			"amount",
			"pct5",
			"pct60",
			"volRatio5",
			"aboveMa5",
			"high5",
			"limitUp",
			"limitUpCnt60",
			"maxStep60",
			"boardCount",
			"sealMoney",
			"hotRank",
			"onHot"
		];
		const NUMERIC_OPS = [
			"gte",
			"lte",
			"between"
		];
		const BOARD_OPTIONS = [
			{
				value: "main",
				label: "沪深主板"
			},
			{
				value: "chinext",
				label: "创业板"
			},
			{
				value: "kechuang",
				label: "科创板"
			},
			{
				value: "beijing",
				label: "北交所"
			}
		];
		function numberCondition(key, label, group, source, defaultValue, unit, hint, extra) {
			return {
				key,
				label,
				group,
				kind: "number",
				source,
				ops: NUMERIC_OPS,
				defaultOp: "gte",
				defaultValue,
				...unit === void 0 ? {} : { unit },
				hint,
				...extra
			};
		}
		function yesNoCondition(key, label, group, source, hint) {
			return {
				key,
				label,
				group,
				kind: "bool",
				source,
				ops: ["eq"],
				defaultOp: "eq",
				defaultValue: "yes",
				hint
			};
		}
		const CONDITIONS = [
			{
				key: "keyword",
				label: "名称或代码包含",
				group: "scope",
				kind: "text",
				source: "profile",
				ops: ["contains"],
				defaultOp: "contains",
				defaultValue: "",
				maxLength: 12,
				placeholder: "如：宁德、300750",
				hint: "不区分大小写，支持简称或六位代码"
			},
			{
				key: "board",
				label: "所属市场",
				group: "scope",
				kind: "enum",
				source: "profile",
				ops: ["in"],
				defaultOp: "in",
				defaultValue: ["main"],
				options: BOARD_OPTIONS,
				hint: "可同时勾选多个市场"
			},
			{
				key: "industry",
				label: "所属行业",
				group: "scope",
				kind: "board",
				source: "board",
				boardTag: "industry",
				ops: ["in"],
				defaultOp: "in",
				defaultValue: [],
				hint: "按同花顺行业板块筛选，可多选"
			},
			{
				key: "concept",
				label: "所属概念",
				group: "scope",
				kind: "board",
				source: "board",
				boardTag: "cn_concept",
				ops: ["in"],
				defaultOp: "in",
				defaultValue: [],
				hint: "按同花顺概念板块筛选，可多选"
			},
			{
				key: "region",
				label: "所属地域",
				group: "scope",
				kind: "board",
				source: "board",
				boardTag: "region",
				ops: ["in"],
				defaultOp: "in",
				defaultValue: [],
				hint: "按地域板块筛选，可多选"
			},
			numberCondition("listedDays", "上市天数不超过", "scope", "profile", 60, "天", "用于挑次新股；0 表示今天上市", {
				min: 0,
				max: 3650,
				step: 1
			}),
			yesNoCondition("isST", "风险警示股", "scope", "profile", "风险警示股通常带有 ST 标识"),
			numberCondition("price", "最新价", "quote", "quote", 10, "元", "按当前成交价筛选", {
				min: 0,
				max: 1e4,
				step: .01
			}),
			numberCondition("pct", "今日涨跌幅", "quote", "quote", 3, "%", "正数为上涨，负数为下跌", {
				min: -100,
				max: 100,
				step: .01
			}),
			numberCondition("amount", "成交额", "quote", "quote", 1, "亿元", "盘中累计成交金额", {
				min: 0,
				max: 1e4,
				step: .1
			}),
			numberCondition("volume", "成交量", "quote", "quote", 500, "万手", "盘中累计成交手数", {
				min: 0,
				max: 1e5,
				step: 10
			}),
			numberCondition("amplitude", "振幅", "quote", "quote", 5, "%", "今日最高与最低的波动幅度", {
				min: 0,
				max: 100,
				step: .1
			}),
			numberCondition("gap", "开盘涨幅", "quote", "quote", 0, "%", "开盘价相对昨收的涨跌", {
				min: -100,
				max: 100,
				step: .01
			}),
			numberCondition("pe", "市盈率 PE", "valuation", "profile", 30, "倍", "东方财富公开行情口径，亏损股可能为负", {
				min: -1e3,
				max: 5e3,
				step: .1
			}),
			numberCondition("pb", "市净率 PB", "valuation", "profile", 3, "倍", "股价相对每股净资产", {
				min: 0,
				max: 1e3,
				step: .01
			}),
			numberCondition("turnoverRate", "换手率", "valuation", "profile", 3, "%", "当日成交占流通股本的比例", {
				min: 0,
				max: 100,
				step: .01
			}),
			numberCondition("totalMv", "总市值", "valuation", "profile", 100, "亿元", "按最新价计算的总市值", {
				min: 0,
				max: 1e5,
				step: 1
			}),
			numberCondition("circMv", "流通市值", "valuation", "profile", 100, "亿元", "按最新价计算的流通市值", {
				min: 0,
				max: 1e5,
				step: 1
			}),
			numberCondition("pct5", "5日涨跌幅", "window", "history", 5, "%", "近 5 个交易日累计涨跌", {
				min: -100,
				max: 500,
				step: .1
			}),
			numberCondition("pct10", "10日涨跌幅", "window", "history", 10, "%", "近 10 个交易日累计涨跌", {
				min: -100,
				max: 1e3,
				step: .1
			}),
			numberCondition("volRatio5", "5日量比", "window", "history", 1.5, "倍", "今日成交量相对前 5 日均量的倍数", {
				min: 0,
				max: 50,
				step: .1
			}),
			numberCondition("ma5dev", "偏离5日均线", "window", "history", 3, "%", "现价高于 5 日均线的幅度", {
				min: -100,
				max: 100,
				step: .1
			}),
			yesNoCondition("aboveMa5", "站上5日均线", "window", "history", "现价在 5 日均线上方"),
			yesNoCondition("aboveMa10", "站上10日均线", "window", "history", "现价在 10 日均线上方"),
			yesNoCondition("maCross", "5日线上穿10日线", "window", "history", "昨日 5 日线不高于 10 日线，今日上穿"),
			yesNoCondition("high5", "创5日新高", "window", "history", "今日最高价超过前 5 个交易日最高价"),
			yesNoCondition("high10", "创10日新高", "window", "history", "今日最高价超过前 10 个交易日最高价"),
			yesNoCondition("low5", "创5日新低", "window", "history", "今日最低价低于前 5 个交易日最低价"),
			yesNoCondition("limitUp", "今日涨停", "limit", "limit", "来自当日涨停股票池"),
			yesNoCondition("limitDown", "今日跌停", "limit", "limit", "来自当日跌停股票池"),
			yesNoCondition("broken", "今日炸板", "limit", "limit", "盘中触及涨停后打开"),
			numberCondition("boardCount", "连板数", "limit", "limit", 2, "板", "首板为 1，连续涨停依次递增", {
				min: 1,
				max: 30,
				step: 1
			}),
			numberCondition("sealMoney", "封单金额", "limit", "limit", 1e3, "万元", "涨停价上当前封单金额", {
				min: 0,
				max: 1e6,
				step: 100
			}),
			numberCondition("openTimes", "开板次数", "limit", "limit", 3, "次", "炸板股票盘中的开板次数", {
				min: 0,
				max: 100,
				step: 1
			}),
			{
				key: "limitTime",
				label: "封板时间不晚于",
				group: "limit",
				kind: "time",
				source: "limit",
				ops: ["lte"],
				defaultOp: "lte",
				defaultValue: "10:00",
				hint: "只对涨停股票有效"
			},
			{
				key: "limitReason",
				label: "涨停原因包含",
				group: "limit",
				kind: "text",
				source: "limit",
				ops: ["contains"],
				defaultOp: "contains",
				defaultValue: "",
				maxLength: 12,
				placeholder: "如：存储、机器人",
				hint: "来自涨停池给出的题材原因"
			},
			numberCondition("limitUpCnt60", "近 60 日涨停次数", "trend", "history", 3, "次", "按日 K 的涨跌停价推导，含今天；ST 按 5% 口径", {
				min: 0,
				max: 60,
				step: 1
			}),
			numberCondition("limitDownCnt60", "近 60 日跌停次数", "trend", "history", 1, "次", "按日 K 的涨跌停价推导，含今天", {
				min: 0,
				max: 60,
				step: 1
			}),
			numberCondition("brokenCnt60", "近 60 日炸板次数", "trend", "history", 2, "次", "盘中触及涨停或跌停价但收盘没有封住", {
				min: 0,
				max: 60,
				step: 1
			}),
			numberCondition("maxStep60", "近 60 日最高连板", "trend", "history", 2, "板", "连续涨停的最高天数，不是今天的连板数", {
				min: 0,
				max: 60,
				step: 1
			}),
			numberCondition("pct60", "近 60 日涨跌幅", "trend", "history", 10, "%", "最近 60 个交易日的累计涨跌", {
				min: -100,
				max: 1e3,
				step: 1
			}),
			numberCondition("ma60dev", "偏离 60 日均线", "trend", "history", 5, "%", "现价相对 60 日均线的偏离幅度", {
				min: -100,
				max: 100,
				step: .1
			}),
			yesNoCondition("aboveMa60", "站上 60 日均线", "trend", "history", "收盘价在 60 日均线上方"),
			numberCondition("rsi24", "RSI（24 日）", "trend", "history", 70, "", "相对强弱指标，0 到 100，越高越强", {
				min: 0,
				max: 100,
				step: .1
			}),
			numberCondition("kdjJ", "KDJ 的 J 值", "trend", "history", 80, "", "9 日 KDJ 的 J 值，超过 80 常视为短线偏热", {
				min: -50,
				max: 150,
				step: .1
			}),
			numberCondition("bollPct", "布林带位置", "trend", "history", 80, "%", "0 在下轨、100 在上轨；超过 100 表示突破上轨", {
				min: -100,
				max: 200,
				step: .1
			}),
			numberCondition("cci", "CCI（14 日）", "trend", "history", 100, "", "顺势指标，超过 100 表示走势偏强", {
				min: -500,
				max: 500,
				step: .1
			}),
			numberCondition("hotRank", "热榜排名", "hot", "hot", 20, "名", "数值越小排名越靠前", {
				min: 1,
				max: 100,
				step: 1
			}),
			numberCondition("hotChange", "热榜排名上升", "hot", "hot", 5, "位", "正数表示排名上升的位次数", {
				min: 0,
				max: 200,
				step: 1
			}),
			numberCondition("hotHeat", "热度值", "hot", "hot", 50, "万", "同花顺热榜热度，按万展示", {
				min: 0,
				max: 1e5,
				step: 1
			}),
			yesNoCondition("onHot", "进入热榜", "hot", "hot", "在当日热股榜前 100 名内"),
			yesNoCondition("onSkyrocket", "进入飙升榜", "hot", "hot", "在当日热度飙升榜前 100 名内"),
			numberCondition("skyRank", "飙升榜排名", "hot", "hot", 20, "名", "数值越小排名越靠前", {
				min: 1,
				max: 100,
				step: 1
			})
		];
		const METRICS = [
			{
				key: "pct",
				label: "涨跌幅",
				short: "涨跌",
				unit: "%",
				sortable: true,
				defaultDir: "desc"
			},
			{
				key: "price",
				label: "最新价",
				short: "现价",
				unit: "元",
				sortable: true,
				defaultDir: "desc"
			},
			{
				key: "amount",
				label: "成交额",
				short: "成交额",
				unit: "亿元",
				sortable: true,
				defaultDir: "desc"
			},
			{
				key: "volume",
				label: "成交量",
				short: "成交量",
				unit: "万手",
				sortable: true,
				defaultDir: "desc"
			},
			{
				key: "amplitude",
				label: "振幅",
				short: "振幅",
				unit: "%",
				sortable: true,
				defaultDir: "desc"
			},
			{
				key: "gap",
				label: "开盘涨幅",
				short: "开盘",
				unit: "%",
				sortable: true,
				defaultDir: "desc"
			},
			{
				key: "pct5",
				label: "5日涨跌幅",
				short: "5日",
				unit: "%",
				sortable: true,
				defaultDir: "desc"
			},
			{
				key: "pct10",
				label: "10日涨跌幅",
				short: "10日",
				unit: "%",
				sortable: true,
				defaultDir: "desc"
			},
			{
				key: "pct60",
				label: "60日涨跌幅",
				short: "60日",
				unit: "%",
				sortable: true,
				defaultDir: "desc"
			},
			{
				key: "volRatio5",
				label: "5日量比",
				short: "量比",
				unit: "倍",
				sortable: true,
				defaultDir: "desc"
			},
			{
				key: "ma5dev",
				label: "偏离5日均线",
				short: "偏离",
				unit: "%",
				sortable: true,
				defaultDir: "desc"
			},
			{
				key: "ma60dev",
				label: "偏离60日均线",
				short: "60日线",
				unit: "%",
				sortable: true,
				defaultDir: "desc"
			},
			{
				key: "limitUpCnt60",
				label: "60日涨停次数",
				short: "60日涨停",
				unit: "次",
				sortable: true,
				defaultDir: "desc"
			},
			{
				key: "limitDownCnt60",
				label: "60日跌停次数",
				short: "60日跌停",
				unit: "次",
				sortable: true,
				defaultDir: "desc"
			},
			{
				key: "brokenCnt60",
				label: "60日炸板次数",
				short: "60日炸板",
				unit: "次",
				sortable: true,
				defaultDir: "desc"
			},
			{
				key: "maxStep60",
				label: "60日最高连板",
				short: "最高连板",
				unit: "板",
				sortable: true,
				defaultDir: "desc"
			},
			{
				key: "rsi24",
				label: "RSI(24)",
				short: "RSI",
				unit: "",
				sortable: true,
				defaultDir: "desc"
			},
			{
				key: "kdjJ",
				label: "KDJ 的 J 值",
				short: "KDJ",
				unit: "",
				sortable: true,
				defaultDir: "desc"
			},
			{
				key: "bollPct",
				label: "布林带位置",
				short: "布林",
				unit: "%",
				sortable: true,
				defaultDir: "desc"
			},
			{
				key: "cci",
				label: "CCI(14)",
				short: "CCI",
				unit: "",
				sortable: true,
				defaultDir: "desc"
			},
			{
				key: "boardCount",
				label: "连板数",
				short: "连板",
				unit: "板",
				sortable: true,
				defaultDir: "desc"
			},
			{
				key: "sealMoney",
				label: "封单额",
				short: "封单",
				unit: "万元",
				sortable: true,
				defaultDir: "desc"
			},
			{
				key: "openTimes",
				label: "开板次数",
				short: "开板",
				unit: "次",
				sortable: true,
				defaultDir: "desc"
			},
			{
				key: "limitTime",
				label: "封板时间",
				short: "封板",
				sortable: false,
				defaultDir: "asc"
			},
			{
				key: "hotRank",
				label: "热榜排名",
				short: "热榜",
				unit: "名",
				sortable: true,
				defaultDir: "asc"
			},
			{
				key: "hotChange",
				label: "热榜上升",
				short: "上升",
				unit: "位",
				sortable: true,
				defaultDir: "desc"
			},
			{
				key: "hotHeat",
				label: "热度",
				short: "热度",
				unit: "万",
				sortable: true,
				defaultDir: "desc"
			},
			{
				key: "skyRank",
				label: "飙升榜排名",
				short: "飙升",
				unit: "名",
				sortable: true,
				defaultDir: "asc"
			},
			{
				key: "pe",
				label: "PE(TTM)",
				short: "PE",
				unit: "倍",
				sortable: false,
				defaultDir: "desc"
			},
			{
				key: "pb",
				label: "PB",
				short: "PB",
				unit: "倍",
				sortable: false,
				defaultDir: "desc"
			},
			{
				key: "turnoverRate",
				label: "换手率",
				short: "换手",
				unit: "%",
				sortable: false,
				defaultDir: "desc"
			},
			{
				key: "totalMv",
				label: "总市值",
				short: "市值",
				unit: "亿",
				sortable: false,
				defaultDir: "desc"
			},
			{
				key: "circMv",
				label: "流通市值",
				short: "流通",
				unit: "亿",
				sortable: false,
				defaultDir: "desc"
			}
		];
		const ACCENTS = [
			{
				key: "indigo",
				label: "靛蓝",
				color: "#6366f1"
			},
			{
				key: "rose",
				label: "玫红",
				color: "#f43f5e"
			},
			{
				key: "amber",
				label: "琥珀",
				color: "#f59e0b"
			},
			{
				key: "emerald",
				label: "翠绿",
				color: "#10b981"
			},
			{
				key: "sky",
				label: "天蓝",
				color: "#0ea5e9"
			},
			{
				key: "violet",
				label: "紫罗兰",
				color: "#8b5cf6"
			},
			{
				key: "orange",
				label: "橙",
				color: "#f97316"
			},
			{
				key: "teal",
				label: "青",
				color: "#14b8a6"
			}
		];
		const VIEWS = [
			{
				key: "list",
				label: "列表",
				hint: "表格形态：精确读数、可排序、可分页，看名单的默认选择"
			},
			{
				key: "card",
				label: "卡片墙",
				hint: "每股一张小卡：名称 + 涨跌幅大字 + 三个关键指标 + 命中理由"
			},
			{
				key: "podium",
				label: "排行榜",
				hint: "前三名领奖台突出，其余按排序指标画长度条，名次感最强"
			},
			{
				key: "group",
				label: "分组",
				hint: "按行业/概念/连板高度分组折叠，看结构而不是看个体"
			},
			{
				key: "chip",
				label: "芯片墙",
				hint: "极致密度的色块墙，一屏盯几十只，涨跌停带角标"
			}
		];
		const GROUPS = [
			{
				key: "industry",
				label: "所属行业"
			},
			{
				key: "limit_times",
				label: "连板高度"
			},
			{
				key: "pct_band",
				label: "涨跌幅区间"
			},
			{
				key: "concept",
				label: "所属题材"
			}
		];
		const TEMPLATES = [
			{
				id: "limit-ladder",
				name: "今日涨停梯队",
				accent: "rose",
				description: "按连板高度排序，一眼看清今天的晋级梯队。",
				draft: {
					accent: "rose",
					conditions: [{
						key: "limitUp",
						op: "eq",
						value: "yes"
					}, {
						key: "boardCount",
						op: "gte",
						value: 1
					}],
					sortKey: "boardCount",
					sortDir: "desc",
					limit: 50,
					view: "list",
					columns: [
						"pct",
						"boardCount",
						"sealMoney",
						"limitTime"
					],
					groupBy: "limit_times"
				}
			},
			{
				id: "volume-breakout",
				name: "放量突破",
				accent: "teal",
				description: "量能明显放大，同时创出近 10 日新高。",
				draft: {
					accent: "teal",
					conditions: [
						{
							key: "pct",
							op: "between",
							value: {
								min: 2.5,
								max: 8.5
							}
						},
						{
							key: "volRatio5",
							op: "gte",
							value: 1.5
						},
						{
							key: "high10",
							op: "eq",
							value: "yes"
						}
					],
					sortKey: "amount",
					sortDir: "desc",
					limit: 40,
					view: "card",
					columns: [
						"pct",
						"amount",
						"volRatio5",
						"pct5"
					],
					groupBy: "industry"
				}
			},
			{
				id: "hot-rise",
				name: "热榜飙升",
				accent: "amber",
				description: "热度排名明显上升的股票，适合观察情绪发酵。",
				draft: {
					accent: "amber",
					conditions: [{
						key: "onHot",
						op: "eq",
						value: "yes"
					}, {
						key: "hotChange",
						op: "gte",
						value: 5
					}],
					sortKey: "hotChange",
					sortDir: "desc",
					limit: 30,
					view: "podium",
					columns: [
						"pct",
						"hotRank",
						"hotChange",
						"hotHeat"
					],
					groupBy: "industry"
				}
			},
			{
				id: "new-stock",
				name: "次新活跃",
				accent: "indigo",
				description: "上市不久、成交活跃且今日走强的次新股。",
				draft: {
					accent: "indigo",
					conditions: [
						{
							key: "listedDays",
							op: "lte",
							value: 60
						},
						{
							key: "pct",
							op: "gte",
							value: 3
						},
						{
							key: "amount",
							op: "gte",
							value: .5
						}
					],
					sortKey: "amount",
					sortDir: "desc",
					limit: 40,
					view: "card",
					columns: [
						"pct",
						"amount",
						"volume",
						"hotRank"
					],
					groupBy: "industry"
				}
			},
			{
				id: "reversal",
				name: "低位反转",
				accent: "violet",
				description: "近 5 日仍在低位，今天重新站上 5 日线的股票。",
				draft: {
					accent: "violet",
					conditions: [
						{
							key: "pct5",
							op: "between",
							value: {
								min: -8,
								max: 2
							}
						},
						{
							key: "pct",
							op: "gte",
							value: 3
						},
						{
							key: "aboveMa5",
							op: "eq",
							value: "yes"
						}
					],
					sortKey: "pct",
					sortDir: "desc",
					limit: 30,
					view: "list",
					columns: [
						"pct",
						"pct5",
						"ma5dev",
						"amount"
					],
					groupBy: "industry"
				}
			},
			{
				id: "sixty-strong",
				name: "60日强势",
				accent: "teal",
				description: "近 60 日涨幅靠前、期间有过涨停、仍站在 60 日线上的股票。",
				draft: {
					accent: "teal",
					conditions: [
						{
							key: "pct60",
							op: "gte",
							value: 15
						},
						{
							key: "limitUpCnt60",
							op: "gte",
							value: 2
						},
						{
							key: "aboveMa60",
							op: "eq",
							value: "yes"
						}
					],
					sortKey: "pct60",
					sortDir: "desc",
					limit: 30,
					view: "card",
					columns: [
						"pct60",
						"limitUpCnt60",
						"maxStep60",
						"ma60dev"
					],
					groupBy: "industry"
				}
			},
			{
				id: "break-watch",
				name: "炸板观察",
				accent: "rose",
				description: "今天摸过涨停又打开，开板次数较多的股票。",
				draft: {
					accent: "rose",
					conditions: [{
						key: "broken",
						op: "eq",
						value: "yes"
					}, {
						key: "openTimes",
						op: "gte",
						value: 2
					}],
					sortKey: "pct",
					sortDir: "desc",
					limit: 30,
					view: "list",
					columns: [
						"pct",
						"openTimes",
						"amount",
						"hotRank"
					],
					groupBy: "limit_times"
				}
			}
		];
		const DEFAULT_COLUMNS = [
			"pct",
			"amount",
			"pct5",
			"hotRank"
		];
		function conditionMeta(key) {
			return CONDITIONS.find((item) => item.key === key);
		}
		function metricMeta(key) {
			return METRICS.find((item) => item.key === key);
		}
		function accentMeta(key) {
			return ACCENTS.find((item) => item.key === key) ?? ACCENTS[0];
		}
		function sortOptions() {
			return METRICS.filter((item) => item.sortable);
		}
		function columnOptions() {
			return METRICS;
		}
		function boardTagLabel(tag) {
			if (tag === "industry") return "行业";
			if (tag === "cn_concept") return "概念";
			return "地域";
		}
		function draftFromTemplate(template) {
			return {
				name: template.name,
				note: "",
				logic: "and",
				...template.draft
			};
		}
		function baseDraft() {
			return {
				name: "",
				note: "",
				accent: "indigo",
				logic: "and",
				conditions: [],
				sortKey: "pct",
				sortDir: "desc",
				limit: 50,
				view: "list",
				columns: [...DEFAULT_COLUMNS],
				groupBy: "industry"
			};
		}
		// src/client/api.ts
		const BASE = "/fangkuai-ranking/api";
		var UiError = class extends Error {
			code;
			constructor(code, message) {
				super(message);
				this.name = "UiError";
				this.code = code;
			}
		};
		async function request(path, init) {
			let response;
			try {
				response = await fetch(`${BASE}${path}`, {
					...init,
					headers: {
						accept: "application/json",
						...init?.body ? { "content-type": "application/json" } : {},
						...init?.headers ?? {}
					}
				});
			} catch {
				throw new UiError("network", "暂时连不上本地服务，请稍后再试");
			}
			const body = await response.json().catch(() => null);
			if (!body) throw new UiError("bad_response", "服务返回了无法识别的内容");
			if (!body.ok) throw new UiError(body.error.code, body.error.message);
			return body.data;
		}
		const api = {
			bootstrap: () => request("/bootstrap"),
			connection: () => request("/config"),
			saveKey: (key) => request("/config", {
				method: "POST",
				body: JSON.stringify({ key })
			}),
			removeKey: () => request("/config", { method: "DELETE" }),
			wall: (ids, refresh = false) => request("/wall", {
				method: "POST",
				body: JSON.stringify({
					ids,
					refresh
				})
			}),
			evaluate: (id, refresh = false) => request(`/rankings/${encodeURIComponent(id)}/evaluate`, {
				method: "POST",
				body: JSON.stringify({ refresh })
			}),
			preview: (config, limit = 10) => request("/preview", {
				method: "POST",
				body: JSON.stringify({
					config,
					limit
				})
			}),
			create: (config) => request("/rankings", {
				method: "POST",
				body: JSON.stringify({ config })
			}),
			update: (id, patch) => request(`/rankings/${encodeURIComponent(id)}`, {
				method: "PUT",
				body: JSON.stringify({ patch })
			}),
			remove: (id) => request(`/rankings/${encodeURIComponent(id)}`, { method: "DELETE" }),
			boards: (tag) => request(`/boards?tag=${encodeURIComponent(tag)}`),
			basicStatus: () => request("/basic"),
			initializeBasic: (refresh = false) => request("/basic/init", {
				method: "POST",
				body: JSON.stringify({ refresh })
			})
		};
		// src/client/ui/ConditionPicker.tsx
		function kindHint(meta) {
			if (meta.kind === "number") return "填数字";
			if (meta.kind === "enum") return "多选";
			if (meta.kind === "board") return "选板块";
			if (meta.kind === "time") return "选时间";
			if (meta.kind === "text") return "填文字";
			return "是或否";
		}
		function matches(meta, search) {
			return !search || meta.label.includes(search) || meta.key.includes(search) || (meta.hint ?? "").includes(search);
		}
		function PickerItems({ items, used, onPick, onClose }) {
			return /* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
				className: "dsr-picker-grid",
				children: items.map((meta) => {
					const disabled = used.has(meta.key);
					return /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("button", {
						type: "button",
						className: "dsr-picker-item",
						disabled,
						title: meta.hint,
						onClick: () => {
							onPick(meta);
							onClose();
						},
						children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("b", { children: meta.label }), /* @__PURE__ */ (0, react_jsx_runtime.jsx)("small", { children: disabled ? "已经加过了" : kindHint(meta) })]
					}, meta.key);
				})
			});
		}
		function ConditionPicker({ used, onPick, onClose }) {
			const [query, setQuery] = (0, react.useState)("");
			const [moreOpen, setMoreOpen] = (0, react.useState)(false);
			const search = query.trim();
			const common = (0, react.useMemo)(() => CONDITIONS.filter((meta) => COMMON_CONDITION_KEYS.includes(meta.key) && matches(meta, search)), [search]);
			const advancedGroups = (0, react.useMemo)(() => CONDITION_GROUPS.map((group) => ({
				...group,
				items: CONDITIONS.filter((meta) => !COMMON_CONDITION_KEYS.includes(meta.key) && meta.group === group.id && matches(meta, search))
			})).filter((group) => group.items.length > 0), [search]);
			const advancedCount = CONDITIONS.length - COMMON_CONDITION_KEYS.length;
			const advancedMatches = advancedGroups.reduce((total, group) => total + group.items.length, 0);
			return /* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
				className: "dsr-picker-modal",
				role: "dialog",
				"aria-modal": "true",
				"aria-label": "添加条件",
				onClick: onClose,
				children: /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
					className: "dsr-picker",
					onClick: (event) => event.stopPropagation(),
					children: [/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
						className: "dsr-picker-head",
						children: [
							/* @__PURE__ */ (0, react_jsx_runtime.jsx)(Icon, {
								name: "search",
								size: 15
							}),
							/* @__PURE__ */ (0, react_jsx_runtime.jsx)("h2", { children: "添加条件" }),
							/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("span", {
								className: "dsr-picker-count",
								children: [CONDITIONS.length, " 个可用"]
							}),
							/* @__PURE__ */ (0, react_jsx_runtime.jsx)("button", {
								type: "button",
								className: "dsr-icon-btn",
								"aria-label": "关闭",
								onClick: onClose,
								children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)(Icon, { name: "close" })
							})
						]
					}), /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
						className: "dsr-picker-body",
						children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
							className: "dsr-picker-search",
							children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)("input", {
								className: "dsr-input",
								autoFocus: true,
								value: query,
								placeholder: "搜索条件，如：涨停、量比、行业",
								onChange: (event) => setQuery(event.target.value)
							})
						}), search ? /* @__PURE__ */ (0, react_jsx_runtime.jsxs)(react_jsx_runtime.Fragment, { children: [
							common.length + advancedMatches === 0 ? /* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
								className: "dsr-hint",
								style: {
									padding: 20,
									textAlign: "center"
								},
								children: "没有找到这个条件"
							}) : null,
							common.length > 0 ? /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("section", {
								className: "dsr-picker-group",
								children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("h3", { children: "常用条件" }), /* @__PURE__ */ (0, react_jsx_runtime.jsx)(PickerItems, {
									items: common,
									used,
									onPick,
									onClose
								})]
							}) : null,
							advancedGroups.map((group) => /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("section", {
								className: "dsr-picker-group",
								children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("h3", { children: group.label }), /* @__PURE__ */ (0, react_jsx_runtime.jsx)(PickerItems, {
									items: group.items,
									used,
									onPick,
									onClose
								})]
							}, group.id))
						] }) : /* @__PURE__ */ (0, react_jsx_runtime.jsxs)(react_jsx_runtime.Fragment, { children: [
							/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("section", {
								className: "dsr-picker-group",
								children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("h3", { children: "常用条件 · 先把最有效的这几个用起来" }), /* @__PURE__ */ (0, react_jsx_runtime.jsx)(PickerItems, {
									items: common,
									used,
									onPick,
									onClose
								})]
							}),
							/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("button", {
								type: "button",
								className: "fk-picker-more",
								onClick: () => setMoreOpen((value) => !value),
								"aria-expanded": moreOpen,
								children: [
									/* @__PURE__ */ (0, react_jsx_runtime.jsx)(Icon, {
										name: moreOpen ? "chevron" : "chevron",
										size: 13
									}),
									"更多条件",
									/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("span", { children: [advancedCount, " 个"] }),
									/* @__PURE__ */ (0, react_jsx_runtime.jsx)("small", { children: moreOpen ? "收起" : "按需展开" })
								]
							}),
							moreOpen ? advancedGroups.map((group) => /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("section", {
								className: "dsr-picker-group fk-picker-advanced",
								children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("h3", { children: group.label }), /* @__PURE__ */ (0, react_jsx_runtime.jsx)(PickerItems, {
									items: group.items,
									used,
									onPick,
									onClose
								})]
							}, group.id)) : null
						] })]
					})]
				})
			});
		}
		// src/client/ui/BoardPicker.tsx
		const cache = /* @__PURE__ */ new Map();
		const inflight = /* @__PURE__ */ new Map();
		async function loadBoards(tag) {
			const cached = cache.get(tag);
			if (cached) return cached;
			const running = inflight.get(tag);
			if (running) return running;
			const promise = api.boards(tag).then((items) => {
				cache.set(tag, items);
				inflight.delete(tag);
				return items;
			});
			inflight.set(tag, promise);
			return promise;
		}
		function BoardPicker({ tag, values, names, onChange }) {
			const [open, setOpen] = (0, react.useState)(false);
			const [query, setQuery] = (0, react.useState)("");
			const [boards, setBoards] = (0, react.useState)(cache.get(tag) ?? []);
			const [loading, setLoading] = (0, react.useState)(false);
			const [error, setError] = (0, react.useState)("");
			const root = (0, react.useRef)(null);
			(0, react.useEffect)(() => {
				if (!open) return;
				const handler = (event) => {
					if (root.current && !root.current.contains(event.target)) setOpen(false);
				};
				document.addEventListener("pointerdown", handler);
				return () => document.removeEventListener("pointerdown", handler);
			}, [open]);
			(0, react.useEffect)(() => {
				if (!open || boards.length > 0) return;
				setLoading(true);
				setError("");
				loadBoards(tag).then((items) => setBoards(items)).catch((issue) => setError(issue instanceof UiError ? issue.message : "板块列表暂时不可用")).finally(() => setLoading(false));
			}, [
				open,
				tag,
				boards.length
			]);
			const selected = new Set(values);
			const filtered = query.trim() ? boards.filter((item) => item.name.includes(query.trim()) || item.code.includes(query.trim())) : boards;
			function toggle(board) {
				const next = new Set(selected);
				if (next.has(board.code)) next.delete(board.code);
				else if (next.size < 5) next.add(board.code);
				const nextNames = boards.filter((item) => next.has(item.code)).map((item) => item.name);
				onChange([...next], nextNames);
			}
			const label = names.length > 0 ? names.join("、") : `选择${boardTagLabel(tag)}`;
			return /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
				className: "dsr-popover",
				ref: root,
				children: [/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("button", {
					type: "button",
					className: "dsr-board-trigger",
					title: label,
					onClick: () => setOpen((value) => !value),
					children: [label, /* @__PURE__ */ (0, react_jsx_runtime.jsx)(Icon, {
						name: "chevron",
						size: 11,
						style: {
							marginLeft: 4,
							verticalAlign: -2
						}
					})]
				}), open ? /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
					className: "dsr-popover-panel",
					children: [
						/* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
							className: "dsr-pop-search",
							children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)("input", {
								className: "dsr-input",
								value: query,
								autoFocus: true,
								placeholder: `搜索${boardTagLabel(tag)}名称`,
								onChange: (event) => setQuery(event.target.value)
							})
						}),
						/* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
							className: "dsr-pop-list",
							children: loading ? /* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
								style: {
									padding: 14,
									textAlign: "center"
								},
								className: "dsr-hint",
								children: "正在读取板块…"
							}) : error ? /* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
								style: { padding: 10 },
								className: "dsr-hint",
								children: "板块列表暂时不可用"
							}) : filtered.length === 0 ? /* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
								style: {
									padding: 14,
									textAlign: "center"
								},
								className: "dsr-hint",
								children: "没有找到这个板块"
							}) : filtered.slice(0, 200).map((board) => {
								const isSelected = selected.has(board.code);
								const disabled = !isSelected && selected.size >= 5;
								return /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("button", {
									type: "button",
									className: `dsr-pop-item ${isSelected ? "selected" : ""} ${disabled ? "disabled" : ""}`,
									disabled,
									onClick: () => toggle(board),
									children: [
										/* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
											className: "dsr-check",
											children: isSelected ? /* @__PURE__ */ (0, react_jsx_runtime.jsx)(Icon, {
												name: "check",
												size: 9
											}) : null
										}),
										/* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", { children: board.name }),
										board.count ? /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("small", { children: [board.count, " 只"] }) : null
									]
								}, board.code);
							})
						}),
						/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
							className: "dsr-pop-foot",
							children: [/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("span", {
								className: "dsr-hint",
								children: [
									"已选 ",
									selected.size,
									" / 5"
								]
							}), /* @__PURE__ */ (0, react_jsx_runtime.jsx)("button", {
								type: "button",
								className: "dsr-btn small",
								onClick: () => setOpen(false),
								children: "完成"
							})]
						})
					]
				}) : null]
			});
		}
		// src/client/ui/ConditionRow.tsx
		function isRange(value) {
			return typeof value === "object" && value !== null && !Array.isArray(value);
		}
		function numberOf(value, fallback = 0) {
			if (typeof value === "number" && Number.isFinite(value)) return value;
			if (isRange(value)) return value.min;
			return fallback;
		}
		function ConditionRow({ clause, meta, hit, onChange, onRemove }) {
			const value = clause.value;
			const unit = meta.unit ?? "";
			const numeric = numberOf(value, typeof meta.defaultValue === "number" ? meta.defaultValue : 0);
			function changeOp(op) {
				if (meta.kind !== "number") return;
				if (op === "between") onChange({
					...clause,
					op: "between",
					value: {
						min: numeric,
						max: numeric
					}
				});
				else onChange({
					...clause,
					op: op === "lte" ? "lte" : "gte",
					value: numeric
				});
			}
			function setNumber(next, which) {
				if (isRange(value) && which) onChange({
					...clause,
					value: {
						...value,
						[which]: next
					}
				});
				else onChange({
					...clause,
					value: next
				});
			}
			let controls;
			if (meta.kind === "number") controls = /* @__PURE__ */ (0, react_jsx_runtime.jsxs)(react_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("select", {
				className: "dsr-cond-op",
				value: clause.op,
				onChange: (event) => changeOp(event.target.value),
				children: [
					/* @__PURE__ */ (0, react_jsx_runtime.jsx)("option", {
						value: "gte",
						children: "≥"
					}),
					/* @__PURE__ */ (0, react_jsx_runtime.jsx)("option", {
						value: "lte",
						children: "≤"
					}),
					/* @__PURE__ */ (0, react_jsx_runtime.jsx)("option", {
						value: "between",
						children: "区间"
					})
				]
			}), clause.op === "between" && isRange(value) ? /* @__PURE__ */ (0, react_jsx_runtime.jsxs)(react_jsx_runtime.Fragment, { children: [
				/* @__PURE__ */ (0, react_jsx_runtime.jsx)("input", {
					className: "dsr-num",
					type: "number",
					step: meta.step ?? .01,
					min: meta.min,
					max: meta.max,
					value: value.min,
					onChange: (event) => setNumber(Number(event.target.value), "min")
				}),
				/* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
					className: "dsr-between-sep",
					children: "至"
				}),
				/* @__PURE__ */ (0, react_jsx_runtime.jsx)("input", {
					className: "dsr-num",
					type: "number",
					step: meta.step ?? .01,
					min: meta.min,
					max: meta.max,
					value: value.max,
					onChange: (event) => setNumber(Number(event.target.value), "max")
				}),
				/* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
					className: "dsr-unit",
					children: unit
				})
			] }) : /* @__PURE__ */ (0, react_jsx_runtime.jsxs)(react_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("input", {
				className: "dsr-num",
				type: "number",
				step: meta.step ?? .01,
				min: meta.min,
				max: meta.max,
				value: numeric,
				onChange: (event) => setNumber(Number(event.target.value))
			}), /* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
				className: "dsr-unit",
				children: unit
			})] })] });
			else if (meta.kind === "enum") {
				const selected = Array.isArray(value) ? value : [];
				controls = /* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
					style: {
						display: "flex",
						flexWrap: "wrap",
						gap: 4
					},
					children: (meta.options ?? []).map((option) => {
						const on = selected.includes(option.value);
						return /* @__PURE__ */ (0, react_jsx_runtime.jsx)("button", {
							type: "button",
							className: `dsr-col-chip ${on ? "on" : ""}`,
							onClick: () => {
								const next = on ? selected.filter((item) => item !== option.value) : [...selected, option.value];
								onChange({
									...clause,
									value: next
								});
							},
							children: option.label
						}, option.value);
					})
				});
			} else if (meta.kind === "bool") controls = /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
				className: "dsr-seg",
				children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("button", {
					type: "button",
					className: value === "yes" ? "active" : "",
					onClick: () => onChange({
						...clause,
						value: "yes"
					}),
					children: "是"
				}), /* @__PURE__ */ (0, react_jsx_runtime.jsx)("button", {
					type: "button",
					className: value === "no" ? "active" : "",
					onClick: () => onChange({
						...clause,
						value: "no"
					}),
					children: "否"
				})]
			});
			else if (meta.kind === "text") controls = /* @__PURE__ */ (0, react_jsx_runtime.jsx)("input", {
				className: "dsr-input",
				style: {
					height: 30,
					fontSize: 11
				},
				value: typeof value === "string" ? value : "",
				maxLength: meta.maxLength ?? 12,
				placeholder: meta.placeholder,
				onChange: (event) => onChange({
					...clause,
					value: event.target.value
				})
			});
			else if (meta.kind === "time") controls = /* @__PURE__ */ (0, react_jsx_runtime.jsx)("input", {
				className: "dsr-num",
				style: { width: 112 },
				type: "time",
				value: typeof value === "string" ? value : "10:00",
				onChange: (event) => onChange({
					...clause,
					value: event.target.value
				})
			});
			else controls = /* @__PURE__ */ (0, react_jsx_runtime.jsx)(BoardPicker, {
				tag: meta.boardTag ?? "industry",
				values: Array.isArray(value) ? value : [],
				names: clause.note ? clause.note.split("、") : [],
				onChange: (codes, names) => onChange({
					...clause,
					value: codes,
					note: names.join("、")
				})
			});
			return /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
				className: "dsr-cond-row",
				children: [
					/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
						className: "dsr-cond-label",
						title: meta.hint,
						children: [meta.label, hit != null ? /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("span", {
							className: `fk-cond-hit ${hit === 0 ? "zero" : ""}`,
							children: [hit, " 只"]
						}) : null]
					}),
					/* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
						className: "dsr-cond-controls",
						children: controls
					}),
					/* @__PURE__ */ (0, react_jsx_runtime.jsx)("button", {
						type: "button",
						className: `dsr-negate ${clause.negate ? "on" : ""}`,
						title: clause.negate ? "当前为排除，再点一下恢复" : "把这条改成排除",
						onClick: () => onChange({
							...clause,
							negate: !clause.negate
						}),
						children: "排除"
					}),
					/* @__PURE__ */ (0, react_jsx_runtime.jsx)("button", {
						type: "button",
						className: "dsr-remove",
						"aria-label": "移除条件",
						title: "移除条件",
						onClick: onRemove,
						children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)(Icon, {
							name: "close",
							size: 12
						})
					})
				]
			});
		}
		// src/shared/format.ts
		function formatNumber(value, digits = 2) {
			return value.toLocaleString("zh-CN", {
				minimumFractionDigits: digits,
				maximumFractionDigits: digits
			});
		}
		function formatSignedPercent(value) {
			if (value === null || !Number.isFinite(value)) return "—";
			return `${value > 0 ? "+" : ""}${value.toFixed(2)}%`;
		}
		/** 成交额统一按亿元存储，展示时大于一亿用亿、否则用万。 */
		function formatAmountYi(value) {
			if (value === null || !Number.isFinite(value)) return "—";
			if (value >= 1) return `${value.toFixed(value >= 100 ? 0 : 2)}亿`;
			return `${(value * 1e4).toFixed(0)}万`;
		}
		/** 成交量统一按万手存储。 */
		function formatVolumeWan(value) {
			if (value === null || !Number.isFinite(value)) return "—";
			return `${value.toFixed(value >= 100 ? 0 : 2)}万手`;
		}
		/** 封单额统一按万元存储。 */
		function formatSealWan(value) {
			if (value === null || !Number.isFinite(value)) return "—";
			if (value >= 1e4) return `${(value / 1e4).toFixed(2)}亿`;
			return `${value.toFixed(0)}万`;
		}
		/** 热度统一按万存储。 */
		function formatHeatWan(value) {
			if (value === null || !Number.isFinite(value)) return "—";
			return `${value.toFixed(value >= 10 ? 0 : 1)}万`;
		}
		function formatMetric(key, value) {
			if (key === "limitTime") return value || "—";
			if (value === null || !Number.isFinite(value)) return "—";
			switch (key) {
				case "pct":
				case "pct5":
				case "pct10":
				case "pct60":
				case "gap":
				case "ma5dev":
				case "ma60dev":
				case "amplitude": return formatSignedPercent(value);
				case "price": return formatNumber(value, 2);
				case "amount": return formatAmountYi(value);
				case "volume": return formatVolumeWan(value);
				case "volRatio5": return value.toFixed(2);
				case "boardCount": return `${value.toFixed(0)}板`;
				case "sealMoney": return formatSealWan(value);
				case "openTimes": return `${value.toFixed(0)}次`;
				case "hotRank":
				case "skyRank": return `第${value.toFixed(0)}名`;
				case "hotChange": return `${value > 0 ? "+" : ""}${value.toFixed(0)}`;
				case "hotHeat": return formatHeatWan(value);
				case "pe":
				case "pb": return value.toFixed(2);
				case "turnoverRate": return `${value.toFixed(2)}%`;
				case "totalMv":
				case "circMv": return `${value.toFixed(value >= 100 ? 0 : 2)}亿`;
				case "limitUpCnt60":
				case "limitDownCnt60":
				case "brokenCnt60": return `${value.toFixed(0)}次`;
				case "maxStep60": return `${value.toFixed(0)}板`;
				case "rsi24":
				case "kdjJ":
				case "bollPct":
				case "cci": return value.toFixed(1);
				default: return String(value);
			}
		}
		function viewLabel(view) {
			return VIEWS.find((item) => item.key === view)?.label ?? "列表";
		}
		function accentColor(accent) {
			return accentMeta(accent).color;
		}
		function formatSort(sortKey, direction) {
			return `${metricMeta(sortKey)?.label ?? sortKey}${direction === "desc" ? "从高到低" : "从低到高"}`;
		}
		function enumLabel(key, value) {
			return conditionMeta(key)?.options?.find((item) => item.value === value)?.label ?? value;
		}
		function valueWithUnit(metaUnit, value, key) {
			if (!metaUnit) return value;
			if (key === "hotRank" || key === "skyRank") return value;
			return `${value}${metaUnit}`;
		}
		/** 榜单条件的中文摘要，界面和模型工具共用。 */
		function formatCondition(clause) {
			const meta = conditionMeta(clause.key);
			if (!meta) return clause.key;
			const prefix = clause.negate ? "排除 " : "";
			const value = clause.value;
			if (meta.kind === "number") {
				if (clause.op === "between" && typeof value === "object" && !Array.isArray(value)) {
					const unit = meta.unit ?? "";
					return `${prefix}${meta.label} ${value.min}${unit} 至 ${value.max}${unit}`;
				}
				const number = typeof value === "number" ? value : Number(value);
				if (!Number.isFinite(number)) return `${prefix}${meta.label}`;
				const cmp = clause.op === "lte" ? "≤" : "≥";
				return `${prefix}${meta.label} ${cmp} ${valueWithUnit(meta.unit, String(number), clause.key)}`;
			}
			if (meta.kind === "enum") {
				const values = Array.isArray(value) ? value : [String(value)];
				return `${prefix}${meta.label}：${values.map((item) => enumLabel(clause.key, item)).join("、")}`;
			}
			if (meta.kind === "bool") return `${prefix}${meta.label}：${value === "yes" ? "是" : "否"}`;
			if (meta.kind === "text") return `${prefix}${meta.label}“${String(value)}”`;
			if (meta.kind === "time") return `${prefix}${meta.label} ${String(value)}`;
			if (meta.kind === "board") {
				const labels = clause.note?.trim();
				return `${prefix}${meta.label}：${labels || "已选板块"}`;
			}
			return `${prefix}${meta.label}`;
		}
		// src/client/ui/display.ts
		function formatClock(asOf) {
			if (!asOf) return "暂无";
			return new Intl.DateTimeFormat("zh-CN", {
				timeZone: "Asia/Shanghai",
				hour: "2-digit",
				minute: "2-digit",
				second: "2-digit",
				hour12: false
			}).format(new Date(asOf));
		}
		function marketPhase() {
			const shifted = new Date(Date.now() + 288e5);
			const day = shifted.getUTCDay();
			if (day === 0 || day === 6) return {
				label: "已收盘",
				live: false
			};
			const minutes = shifted.getUTCHours() * 60 + shifted.getUTCMinutes();
			if (minutes < 570) return {
				label: "未开盘",
				live: false
			};
			if (minutes <= 690) return {
				label: "盘中",
				live: true
			};
			if (minutes < 780) return {
				label: "午间休市",
				live: false
			};
			if (minutes <= 900) return {
				label: "盘中",
				live: true
			};
			return {
				label: "已收盘",
				live: false
			};
		}
		/** 快照是否属于今天（上海时区）；避免拿昨天的快照冒充盘中预览。 */
		function isTodayShanghai(timestamp) {
			if (!timestamp || !Number.isFinite(timestamp)) return false;
			const shifted = new Date(timestamp + 288e5);
			const now = new Date(Date.now() + 288e5);
			return shifted.toISOString().slice(0, 10) === now.toISOString().slice(0, 10);
		}
		function boardLabel(key) {
			if (key === "main") return "沪深主板";
			if (key === "chinext") return "创业板";
			if (key === "kechuang") return "科创板";
			if (key === "beijing") return "北交所";
			return key;
		}
		function groupKey(row, group) {
			if (group === "industry") return row.industry?.trim() || "未分类";
			if (group === "limit_times") {
				const count = row.boardCount ?? 0;
				if (count <= 0) return "未涨停";
				return count === 1 ? "首板" : `${count}连板`;
			}
			if (group === "pct_band") {
				const pct = row.pct;
				if (pct === null || !Number.isFinite(pct)) return "无行情";
				if (pct < -7) return "跌幅 > 7%";
				if (pct < -3) return "跌幅 3%~7%";
				if (pct < 0) return "跌幅 0%~3%";
				if (pct === 0) return "平盘";
				if (pct <= 3) return "涨幅 0%~3%";
				if (pct <= 7) return "涨幅 3%~7%";
				return "涨幅 > 7%";
			}
			return row.concepts[0] ?? "未分类";
		}
		function groupOrder(key, group) {
			if (group === "industry" || group === "concept") return 0;
			if (group === "limit_times") {
				if (key === "未涨停") return 99;
				if (key === "首板") return 0;
				const match = /(\d+)/.exec(key);
				return match ? Number(match[1]) : 50;
			}
			const index = [
				"跌幅 > 7%",
				"跌幅 3%~7%",
				"跌幅 0%~3%",
				"平盘",
				"涨幅 0%~3%",
				"涨幅 3%~7%",
				"涨幅 > 7%",
				"无行情"
			].indexOf(key);
			return index === -1 ? 99 : index;
		}
		function pctClass(value) {
			if (value === null || !Number.isFinite(value) || value === 0) return "flat";
			return value > 0 ? "up" : "down";
		}
		function metricOfRow(row, key) {
			if (key === "limitTime") return null;
			const value = row[key];
			return typeof value === "number" ? value : null;
		}
		function metricDisplay(row, key) {
			if (key === "limitTime") return row.limitTime || "—";
			return formatMetric(key, metricOfRow(row, key));
		}
		// src/client/ui/bits.tsx
		function Pct({ value }) {
			return /* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
				className: `dsr-pct ${pctClass(value)}`,
				children: formatSignedPercent(value)
			});
		}
		function Rank({ value, className = "" }) {
			return /* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
				className: `dsr-rank ${value <= 3 ? "medal" : ""} ${className}`,
				children: String(value).padStart(2, "0")
			});
		}
		function StockName({ name, ticker }) {
			return /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("span", {
				className: "dsr-name",
				children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("b", { children: name }), /* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
					className: "dsr-code",
					children: ticker
				})]
			});
		}
		function Spinner({ label }) {
			return /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("span", {
				className: "dsr-loading",
				children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", { className: "dsr-spinner" }), label ? /* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", { children: label }) : null]
			});
		}
		function ErrorLine({ text }) {
			return /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
				className: "dsr-error",
				role: "alert",
				children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)(Icon, {
					name: "warning",
					size: 15
				}), /* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", { children: text })]
			});
		}
		function Empty({ title, description, children }) {
			return /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
				className: "dsr-empty-result",
				children: [
					/* @__PURE__ */ (0, react_jsx_runtime.jsx)("h3", { children: title }),
					description ? /* @__PURE__ */ (0, react_jsx_runtime.jsx)("p", { children: description }) : null,
					children
				]
			});
		}
		// src/client/ui/EditorScreen.tsx
		const HISTORY_COLUMNS = /* @__PURE__ */ new Set([
			"pct5",
			"pct10",
			"volRatio5",
			"ma5dev"
		]);
		const LIMITS = [
			20,
			30,
			40,
			50,
			100,
			200
		];
		const MAX_CONDITIONS = 20;
		const VIEW_ICON = {
			list: "list",
			card: "cards",
			podium: "bars",
			group: "groups",
			chip: "list"
		};
		function cloneValue(value) {
			if (Array.isArray(value)) return [...value];
			if (typeof value === "object" && value !== null) return { ...value };
			return value;
		}
		function defaultClause(meta) {
			const clause = {
				key: meta.key,
				op: meta.defaultOp,
				value: cloneValue(meta.defaultValue)
			};
			if (meta.kind === "board") clause.note = "";
			return clause;
		}
		function historyNeeded(draft) {
			if (draft.conditions.some((clause) => conditionMeta(clause.key)?.source === "history")) return true;
			if (HISTORY_COLUMNS.has(draft.sortKey)) return true;
			return draft.columns.some((column) => HISTORY_COLUMNS.has(column));
		}
		function EditorScreen({ id, initial, historyReady, onCancel, onSaved }) {
			const [draft, setDraft] = (0, react.useState)(initial);
			const [picker, setPicker] = (0, react.useState)(false);
			const [preview, setPreview] = (0, react.useState)(null);
			const [previewing, setPreviewing] = (0, react.useState)(false);
			const [previewError, setPreviewError] = (0, react.useState)("");
			const [saving, setSaving] = (0, react.useState)(false);
			const [error, setError] = (0, react.useState)("");
			const [dirty, setDirty] = (0, react.useState)(false);
			const previewSeq = (0, react.useRef)(0);
			const initialJson = (0, react.useMemo)(() => JSON.stringify(initial), [initial]);
			const slowHint = historyNeeded(draft) && !historyReady;
			function clearPreview() {
				setPreview(null);
				setPreviewError("");
			}
			function update(patch) {
				setDraft((current) => ({
					...current,
					...patch
				}));
				setDirty(true);
				clearPreview();
				setError("");
			}
			function updateClause(index, clause) {
				update({ conditions: draft.conditions.map((item, itemIndex) => itemIndex === index ? clause : item) });
			}
			function removeClause(index) {
				update({ conditions: draft.conditions.filter((_, itemIndex) => itemIndex !== index) });
			}
			function addClause(meta) {
				if (draft.conditions.length >= MAX_CONDITIONS) return;
				update({ conditions: [...draft.conditions, defaultClause(meta)] });
			}
			function applyDraft(next) {
				setDraft(next);
				setDirty(true);
				clearPreview();
				setError("");
			}
			function validateForSave() {
				if (!draft.name.trim()) return "请给榜单起一个名字";
				if (draft.name.trim().length > 20) return "榜单名称最多 20 个字";
				if (draft.note.trim().length > 60) return "备注最多 60 个字";
				if (draft.conditions.length === 0) return "请至少添加一个筛选条件";
				if (draft.conditions.length > MAX_CONDITIONS) return `最多设置 ${MAX_CONDITIONS} 个条件`;
				const emptyBoard = draft.conditions.find((clause) => conditionMeta(clause.key)?.kind === "board" && Array.isArray(clause.value) && clause.value.length === 0);
				if (emptyBoard) return `请在「${conditionMeta(emptyBoard.key)?.label ?? "板块"}」里选择至少一个板块`;
				if (draft.columns.length === 0) return "请至少选择一列展示数据";
				return "";
			}
			async function runPreview() {
				if (draft.conditions.length === 0) {
					clearPreview();
					return;
				}
				const seq = ++previewSeq.current;
				setPreviewing(true);
				setPreviewError("");
				try {
					const result = await api.preview(draft, 10);
					if (previewSeq.current !== seq) return;
					setPreview(result);
				} catch (issue) {
					if (previewSeq.current !== seq) return;
					setPreviewError(issue instanceof UiError ? issue.message : "试算没有成功，请稍后再试");
				} finally {
					if (previewSeq.current === seq) setPreviewing(false);
				}
			}
			async function save() {
				if (saving) return;
				const invalid = validateForSave();
				if (invalid) {
					setError(invalid);
					return;
				}
				setSaving(true);
				setError("");
				try {
					const body = {
						...draft,
						name: draft.name.trim(),
						note: draft.note.trim()
					};
					onSaved(id ? await api.update(id, body) : await api.create(body), !id);
				} catch (issue) {
					setError(issue instanceof UiError ? issue.message : "保存没有成功，请稍后再试");
				} finally {
					setSaving(false);
				}
			}
			function cancel() {
				const currentJson = JSON.stringify(draft);
				if (dirty && currentJson !== initialJson && !window.confirm("还有没保存的修改，确定离开吗？")) return;
				onCancel();
			}
			(0, react.useEffect)(() => {
				const timer = window.setTimeout(() => void runPreview(), 600);
				return () => window.clearTimeout(timer);
			}, [
				draft.conditions,
				draft.sortKey,
				draft.sortDir,
				draft.limit,
				draft.logic,
				draft.columns,
				draft.view,
				draft.groupBy
			]);
			(0, react.useEffect)(() => {
				const handler = (event) => {
					if ((event.ctrlKey || event.metaKey) && event.key === "Enter") {
						event.preventDefault();
						save();
					}
				};
				window.addEventListener("keydown", handler);
				return () => window.removeEventListener("keydown", handler);
			});
			const used = new Set(draft.conditions.map((clause) => clause.key));
			const phase = marketPhase();
			const hitOf = (key) => preview?.conditionHits.find((item) => item.key === key)?.hits;
			if (picker) return /* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
				className: "dsr-editor-backdrop",
				children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)(ConditionPicker, {
					used,
					onPick: addClause,
					onClose: () => setPicker(false)
				})
			});
			return /* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
				className: "dsr-editor-backdrop",
				children: /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
					className: "fk-editor-modal",
					children: [
						/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
							className: "fk-editor-head",
							children: [
								/* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
									className: "fk-editor-mark",
									children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)(Icon, {
										name: "cards",
										size: 16
									})
								}),
								/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("h1", { children: id ? `编辑「${draft.name}」` : "新建榜单" }), /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("span", {
									className: "dsr-muted",
									children: [
										CONDITIONS.length,
										" 个预设条件 · ",
										columnOptions().length,
										" 个字段"
									]
								})] }),
								/* @__PURE__ */ (0, react_jsx_runtime.jsx)("button", {
									type: "button",
									className: "dsr-icon-btn",
									"aria-label": "关闭",
									title: "关闭（Esc）",
									onClick: cancel,
									children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)(Icon, { name: "close" })
								})
							]
						}),
						/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
							className: "fk-editor-scroll",
							children: [
								/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("section", {
									className: "fk-editor-section",
									children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
										className: "fk-editor-label",
										children: "① 基本信息"
									}), /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
										className: "fk-basic-row",
										children: [
											/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("label", {
												className: "fk-basic-name",
												children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
													className: "dsr-label",
													children: "名称"
												}), /* @__PURE__ */ (0, react_jsx_runtime.jsx)("input", {
													id: "ranking-name",
													className: "dsr-input dsr-name-input",
													value: draft.name,
													maxLength: 20,
													placeholder: "例如：打板接力",
													autoFocus: true,
													onChange: (event) => update({ name: event.target.value })
												})]
											}),
											/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("label", {
												className: "fk-basic-note",
												children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
													className: "dsr-label",
													children: "备注"
												}), /* @__PURE__ */ (0, react_jsx_runtime.jsx)("input", {
													className: "dsr-input",
													value: draft.note,
													maxLength: 60,
													placeholder: "这个榜单用来盯什么（可空）",
													onChange: (event) => update({ note: event.target.value })
												})]
											}),
											/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
												className: "fk-basic-accent",
												children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
													className: "dsr-label",
													children: "辨识色"
												}), /* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
													className: "dsr-accent-row",
													children: ACCENTS.map((accent) => /* @__PURE__ */ (0, react_jsx_runtime.jsx)("button", {
														type: "button",
														className: `dsr-swatch ${draft.accent === accent.key ? "on" : ""}`,
														style: { "--swatch": accent.color },
														"aria-label": accent.label,
														title: accent.label,
														onClick: () => update({ accent: accent.key })
													}, accent.key))
												})]
											})
										]
									})]
								}),
								/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("section", {
									className: "fk-editor-section",
									children: [
										/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
											className: "fk-editor-label-row",
											children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
												className: "fk-editor-label",
												children: "② 筛选条件"
											}), /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("span", {
												className: "dsr-muted",
												children: [
													draft.conditions.length,
													" / ",
													MAX_CONDITIONS
												]
											})]
										}),
										/* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
											className: "dsr-templates fk-template-row",
											children: TEMPLATES.map((template) => /* @__PURE__ */ (0, react_jsx_runtime.jsx)("button", {
												type: "button",
												className: "dsr-template-chip",
												title: template.description,
												onClick: () => {
													const next = draftFromTemplate(template);
													applyDraft({
														...next,
														name: draft.name.trim() || next.name,
														note: draft.note.trim() || next.note
													});
												},
												children: template.name
											}, template.id))
										}),
										/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
											className: "fk-cond-toolbar",
											children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
												className: "dsr-muted",
												children: "默认全部满足；可切「任一满足」，单条可切「排除」。"
											}), /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
												className: "dsr-seg",
												children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("button", {
													type: "button",
													className: draft.logic === "and" ? "active" : "",
													onClick: () => update({ logic: "and" }),
													children: "全部满足"
												}), /* @__PURE__ */ (0, react_jsx_runtime.jsx)("button", {
													type: "button",
													className: draft.logic === "or" ? "active" : "",
													onClick: () => update({ logic: "or" }),
													children: "任一满足"
												})]
											})]
										}),
										draft.conditions.length === 0 ? /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
											className: "dsr-cond-empty",
											children: [
												"还没有条件。至少加一条，榜单才有筛选意义；现在只会按「",
												sortOptions().find((item) => item.key === draft.sortKey)?.label,
												"」排队。"
											]
										}) : /* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
											className: "dsr-cond-list",
											children: draft.conditions.map((clause, index) => {
												const meta = conditionMeta(clause.key);
												if (!meta) return null;
												return /* @__PURE__ */ (0, react_jsx_runtime.jsx)(ConditionRow, {
													clause,
													meta,
													hit: hitOf(clause.key),
													onChange: (next) => updateClause(index, next),
													onRemove: () => removeClause(index)
												}, `${clause.key}-${index}`);
											})
										}),
										/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("button", {
											type: "button",
											className: "dsr-add-cond",
											onClick: () => setPicker(true),
											disabled: draft.conditions.length >= MAX_CONDITIONS,
											children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)(Icon, {
												name: "plus",
												size: 13
											}), draft.conditions.length >= MAX_CONDITIONS ? `最多 ${MAX_CONDITIONS} 个条件` : "添加条件"]
										}),
										slowHint ? /* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
											className: "dsr-hint",
											children: "这组条件要用近 10 日行情，第一次试算会多等几秒，当天会复用这份行情。"
										}) : null
									]
								}),
								/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("section", {
									className: "fk-editor-section",
									children: [
										/* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
											className: "fk-editor-label",
											children: "③ 呈现方式"
										}),
										/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
											className: "fk-display-row",
											children: [
												/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("label", {
													className: "fk-display-field",
													children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
														className: "dsr-label",
														children: "排序依据"
													}), /* @__PURE__ */ (0, react_jsx_runtime.jsx)("select", {
														className: "dsr-select",
														value: draft.sortKey,
														onChange: (event) => {
															const key = event.target.value;
															update({
																sortKey: key,
																sortDir: sortOptions().find((item) => item.key === key)?.defaultDir ?? "desc"
															});
														},
														children: sortOptions().map((item) => /* @__PURE__ */ (0, react_jsx_runtime.jsx)("option", {
															value: item.key,
															children: item.label
														}, item.key))
													})]
												}),
												/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
													className: "fk-display-field",
													children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
														className: "dsr-label",
														children: "方向"
													}), /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
														className: "dsr-seg",
														children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("button", {
															type: "button",
															className: draft.sortDir === "desc" ? "active" : "",
															onClick: () => update({ sortDir: "desc" }),
															children: "从大到小"
														}), /* @__PURE__ */ (0, react_jsx_runtime.jsx)("button", {
															type: "button",
															className: draft.sortDir === "asc" ? "active" : "",
															onClick: () => update({ sortDir: "asc" }),
															children: "从小到大"
														})]
													})]
												}),
												/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("label", {
													className: "fk-display-field",
													children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
														className: "dsr-label",
														children: "显示长度"
													}), /* @__PURE__ */ (0, react_jsx_runtime.jsx)("select", {
														className: "dsr-select",
														value: draft.limit,
														onChange: (event) => update({ limit: Number(event.target.value) }),
														children: LIMITS.map((value) => /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("option", {
															value,
															children: [value, " 只"]
														}, value))
													})]
												})
											]
										}),
										/* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
											className: "fk-view-grid",
											children: VIEWS.map((item) => /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("button", {
												type: "button",
												title: item.hint,
												className: `fk-view-option ${draft.view === item.key ? "on" : ""}`,
												onClick: () => update({ view: item.key }),
												children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)(Icon, {
													name: VIEW_ICON[item.key],
													size: 16
												}), /* @__PURE__ */ (0, react_jsx_runtime.jsx)("b", { children: item.label })]
											}, item.key))
										}),
										draft.view === "group" ? /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
											className: "fk-group-row",
											children: [
												/* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
													className: "dsr-label",
													children: "分组依据"
												}),
												/* @__PURE__ */ (0, react_jsx_runtime.jsx)("select", {
													className: "dsr-select",
													value: draft.groupBy,
													onChange: (event) => update({ groupBy: event.target.value }),
													children: GROUPS.map((item) => /* @__PURE__ */ (0, react_jsx_runtime.jsx)("option", {
														value: item.key,
														children: item.label
													}, item.key))
												}),
												draft.groupBy === "concept" && !draft.conditions.some((clause) => clause.key === "concept" && !clause.negate) ? /* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
													className: "dsr-hint",
													children: "按题材分组需要先加一条正向的「所属题材」条件。"
												}) : null
											]
										}) : null,
										/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
											className: "dsr-field fk-columns-field",
											children: [
												/* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
													className: "dsr-label",
													children: "展示哪些数据"
												}),
												/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
													className: "dsr-columns",
													children: [columnOptions().map((item) => {
														const on = draft.columns.includes(item.key);
														return /* @__PURE__ */ (0, react_jsx_runtime.jsx)("button", {
															type: "button",
															className: `dsr-col-chip ${on ? "on" : ""}`,
															onClick: () => {
																if (on) {
																	if (draft.columns.length === 1) return;
																	update({ columns: draft.columns.filter((key) => key !== item.key) });
																} else update({ columns: [...draft.columns, item.key] });
															},
															children: item.label
														}, item.key);
													}), /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("span", {
														className: "dsr-hint",
														children: [draft.columns.length, " 列"]
													})]
												}),
												/* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
													className: "dsr-hint",
													children: "附加列只在「列表」看法里显示；卡片墙、排行榜、分组和芯片墙会挑重点展示。"
												})
											]
										})
									]
								})
							]
						}),
						/* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
							className: "fk-editor-previewbar",
							children: previewError ? /* @__PURE__ */ (0, react_jsx_runtime.jsx)(ErrorLine, { text: previewError }) : previewing ? /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("span", {
								className: "fk-preview-loading",
								children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", { className: "dsr-spinner" }), "按当前条件试算…"]
							}) : preview ? /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
								className: "fk-preview-content",
								children: [
									/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("span", {
										className: "fk-preview-count",
										children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("b", { children: preview.matched }), " 只入选"]
									}),
									/* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
										className: "fk-preview-names",
										children: preview.rows.slice(0, 4).map((row) => row.name).join("、") || "没有股票满足"
									}),
									/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("span", {
										className: "fk-preview-meta",
										children: [
											"数据日 ",
											preview.dataDate ?? "—",
											preview.previewAt ? ` · ${phase.live ? "盘中预览" : "快照"} ${formatClock(preview.previewAt)}` : ""
										]
									})
								]
							}) : /* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
								className: "fk-preview-empty",
								children: "加条件后自动试算，这里会显示前几只。"
							})
						}),
						/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
							className: "fk-editor-footer",
							children: [
								error ? /* @__PURE__ */ (0, react_jsx_runtime.jsx)(ErrorLine, { text: error }) : /* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", { className: "dsr-spacer" }),
								/* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
									className: "fk-editor-shortcut",
									children: "Ctrl + Enter 保存"
								}),
								/* @__PURE__ */ (0, react_jsx_runtime.jsx)("button", {
									type: "button",
									className: "dsr-btn",
									onClick: cancel,
									children: "取消"
								}),
								/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("button", {
									type: "button",
									className: "dsr-btn primary",
									onClick: () => void save(),
									disabled: saving,
									children: [saving ? /* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", { className: "dsr-spinner" }) : null, id ? "保存修改" : "保存榜单"]
								})
							]
						})
					]
				})
			});
		}
		// src/client/ui/Sparkline.tsx
		function tint(hex, alpha) {
			const value = Number.parseInt(hex.slice(1), 16);
			return `rgba(${value >> 16 & 255}, ${value >> 8 & 255}, ${value & 255}, ${alpha})`;
		}
		function Sparkline({ row }) {
			const values = row.spark;
			if (values.length < 2) return null;
			const min = Math.min(...values);
			const span = Math.max(...values) - min || 1;
			const width = 100;
			const height = 26;
			const points = values.map((value, index) => {
				const x = index / (values.length - 1) * width;
				const y = 23 - (value - min) / span * 20;
				return `${x.toFixed(2)},${y.toFixed(2)}`;
			});
			const area = `0,${height} ${points.join(" ")} ${width},${height}`;
			const tone = pctClass(row.pct) === "down" ? "#35b37e" : "#e05555";
			const lastY = 23 - ((values[values.length - 1] ?? 0) - min) / span * 20;
			return /* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
				className: "dsr-stock-spark",
				children: /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("svg", {
					viewBox: `0 0 ${width} ${height}`,
					preserveAspectRatio: "none",
					"aria-hidden": "true",
					children: [
						/* @__PURE__ */ (0, react_jsx_runtime.jsx)("path", {
							d: `M ${area}`,
							fill: tint(tone, .08)
						}),
						/* @__PURE__ */ (0, react_jsx_runtime.jsx)("polyline", {
							points: points.join(" "),
							fill: "none",
							stroke: tint(tone, .88),
							strokeWidth: "1.2",
							strokeLinecap: "round",
							strokeLinejoin: "round"
						}),
						/* @__PURE__ */ (0, react_jsx_runtime.jsx)("circle", {
							cx: width,
							cy: lastY,
							r: "1.6",
							fill: tone
						})
					]
				})
			});
		}
		// src/client/ui/ResultViews.tsx
		const signedColumns = /* @__PURE__ */ new Set([
			"pct",
			"pct5",
			"pct10",
			"gap",
			"ma5dev"
		]);
		function labelOf(key) {
			return metricMeta(key)?.label ?? key;
		}
		function MetricCell({ row, column }) {
			if (signedColumns.has(column)) return /* @__PURE__ */ (0, react_jsx_runtime.jsx)(Pct, { value: metricOfRow(row, column) });
			return /* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", { children: metricDisplay(row, column) });
		}
		function ListView({ result, config, compact = false }) {
			const extraColumns = config.columns.filter((column) => column !== "price" && column !== "pct" && column !== "boardCount");
			if (compact) return /* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
				className: "dsr-table-wrap fk-preview-table",
				children: /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("table", {
					className: "dsr-table",
					children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("thead", { children: /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("tr", { children: [
						/* @__PURE__ */ (0, react_jsx_runtime.jsx)("th", { children: "#" }),
						/* @__PURE__ */ (0, react_jsx_runtime.jsx)("th", { children: "名称" }),
						/* @__PURE__ */ (0, react_jsx_runtime.jsx)("th", { children: "涨跌幅" }),
						/* @__PURE__ */ (0, react_jsx_runtime.jsx)("th", { children: labelOf(config.sortKey) })
					] }) }), /* @__PURE__ */ (0, react_jsx_runtime.jsx)("tbody", { children: result.rows.map((row) => /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("tr", { children: [
						/* @__PURE__ */ (0, react_jsx_runtime.jsx)("td", {
							className: "fk-cell-rank",
							children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
								className: `fk-rank-badge ${row.rank <= 3 ? `podium-${row.rank}` : ""}`,
								children: row.rank
							})
						}),
						/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("td", {
							className: "fk-cell-name",
							children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
								className: "fk-preview-name",
								children: row.name
							}), /* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
								className: "fk-code fk-mono",
								children: row.ticker
							})]
						}),
						/* @__PURE__ */ (0, react_jsx_runtime.jsx)("td", { children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)(Pct, { value: row.pct }) }),
						/* @__PURE__ */ (0, react_jsx_runtime.jsx)("td", {
							className: "fk-mono",
							children: metricDisplay(row, config.sortKey)
						})
					] }, row.thscode)) })]
				})
			});
			return /* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
				className: "dsr-table-wrap",
				children: /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("table", {
					className: "dsr-table",
					children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("thead", { children: /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("tr", { children: [
						/* @__PURE__ */ (0, react_jsx_runtime.jsx)("th", { children: "#" }),
						/* @__PURE__ */ (0, react_jsx_runtime.jsx)("th", { children: "代码" }),
						/* @__PURE__ */ (0, react_jsx_runtime.jsx)("th", { children: "名称" }),
						/* @__PURE__ */ (0, react_jsx_runtime.jsx)("th", { children: "行业" }),
						/* @__PURE__ */ (0, react_jsx_runtime.jsx)("th", { children: "收盘" }),
						/* @__PURE__ */ (0, react_jsx_runtime.jsx)("th", { children: "涨跌幅" }),
						/* @__PURE__ */ (0, react_jsx_runtime.jsx)("th", { children: "连板" }),
						extraColumns.map((column) => /* @__PURE__ */ (0, react_jsx_runtime.jsx)("th", { children: labelOf(column) }, column)),
						/* @__PURE__ */ (0, react_jsx_runtime.jsx)("th", { children: "状态" })
					] }) }), /* @__PURE__ */ (0, react_jsx_runtime.jsx)("tbody", { children: result.rows.map((row) => /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("tr", { children: [
						/* @__PURE__ */ (0, react_jsx_runtime.jsx)("td", {
							className: "fk-cell-rank",
							children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
								className: `fk-rank-badge ${row.rank <= 3 ? `podium-${row.rank}` : ""}`,
								children: row.rank
							})
						}),
						/* @__PURE__ */ (0, react_jsx_runtime.jsx)("td", {
							className: "fk-cell-code",
							children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
								className: "fk-code fk-mono",
								children: row.ticker
							})
						}),
						/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("td", {
							className: "fk-cell-name",
							children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
								className: "fk-name",
								children: row.name
							}), row.limitUp ? /* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
								className: "dsr-tag tag-up",
								children: "涨停"
							}) : row.broken ? /* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
								className: "dsr-tag tag-burst",
								children: "炸板"
							}) : null]
						}),
						/* @__PURE__ */ (0, react_jsx_runtime.jsx)("td", {
							className: "fk-cell-industry",
							title: row.industry ?? "",
							children: row.industry ?? "—"
						}),
						/* @__PURE__ */ (0, react_jsx_runtime.jsx)("td", {
							className: "fk-mono",
							children: metricDisplay(row, "price")
						}),
						/* @__PURE__ */ (0, react_jsx_runtime.jsx)("td", { children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)(Pct, { value: row.pct }) }),
						/* @__PURE__ */ (0, react_jsx_runtime.jsx)("td", {
							className: "fk-mono",
							children: row.boardCount ? `${row.boardCount}板` : "—"
						}),
						extraColumns.map((column) => /* @__PURE__ */ (0, react_jsx_runtime.jsx)("td", { children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)(MetricCell, {
							row,
							column
						}) }, column)),
						/* @__PURE__ */ (0, react_jsx_runtime.jsx)("td", {
							className: "fk-cell-tags",
							children: row.tags.length > 0 ? row.tags.slice(0, 2).map((tag) => /* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
								className: "dsr-tag",
								children: tag
							}, tag)) : "—"
						})
					] }, row.thscode)) })]
				})
			});
		}
		function CardsView({ result, config }) {
			return /* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
				className: "dsr-cards-grid",
				children: result.rows.map((row) => /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("article", {
					className: "dsr-stock-card",
					children: [
						/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
							className: "dsr-stock-card-head",
							children: [
								/* @__PURE__ */ (0, react_jsx_runtime.jsx)(Rank, { value: row.rank }),
								/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
									style: { minWidth: 0 },
									children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("b", {
										title: row.name,
										children: row.name
									}), /* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
										className: "dsr-code",
										children: row.ticker
									})]
								}),
								/* @__PURE__ */ (0, react_jsx_runtime.jsx)(Pct, { value: row.pct })
							]
						}),
						/* @__PURE__ */ (0, react_jsx_runtime.jsx)(Sparkline, { row }),
						/* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
							className: "dsr-metrics",
							children: config.columns.filter((column) => column !== "pct").map((column) => /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("span", {
								className: "dsr-metric",
								children: [metricMeta(column)?.short ?? column, /* @__PURE__ */ (0, react_jsx_runtime.jsx)("strong", { children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)(MetricCell, {
									row,
									column
								}) })]
							}, column))
						}),
						row.tags.length > 0 ? /* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
							className: "dsr-stock-tags",
							children: row.tags.slice(0, 3).map((tag) => /* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
								className: "dsr-tag",
								children: tag
							}, tag))
						}) : null
					]
				}, row.thscode))
			});
		}
		function PodiumView({ result, config }) {
			const values = result.rows.map((row) => metricOfRow(row, config.sortKey) ?? 0);
			const max = Math.max(...values);
			const min = Math.min(...values);
			const span = max - min || Math.abs(max) || 1;
			const accent = accentColor(config.accent);
			const top = result.rows.slice(0, 3);
			return /* @__PURE__ */ (0, react_jsx_runtime.jsxs)(react_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
				className: "dsr-podium",
				children: top.map((row) => /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("article", {
					className: `dsr-podium-card podium-${row.rank}`,
					children: [
						/* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
							className: "dsr-podium-rank",
							children: row.rank
						}),
						/* @__PURE__ */ (0, react_jsx_runtime.jsx)("b", {
							title: row.name,
							children: row.name
						}),
						/* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
							className: "dsr-code",
							children: row.ticker
						}),
						/* @__PURE__ */ (0, react_jsx_runtime.jsx)(Pct, { value: row.pct }),
						/* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
							className: "dsr-podium-value",
							children: metricDisplay(row, config.sortKey)
						})
					]
				}, row.thscode))
			}), /* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
				className: "dsr-bars",
				children: result.rows.map((row) => {
					const value = metricOfRow(row, config.sortKey) ?? 0;
					const width = Math.max(3, (value - min) / span * 100);
					const fill = `color-mix(in srgb, ${pctClass(row.pct) === "down" ? "#35b37e" : accent} 82%, transparent)`;
					const track = "color-mix(in srgb, var(--dsr-text) 6%, transparent)";
					return /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
						className: "dsr-bar-row",
						children: [
							/* @__PURE__ */ (0, react_jsx_runtime.jsx)(Rank, { value: row.rank }),
							/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
								className: "dsr-bar-label",
								children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("b", {
									title: row.name,
									children: row.name
								}), /* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
									className: "dsr-code",
									children: row.ticker
								})]
							}),
							/* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
								className: "dsr-bar-track",
								style: { background: `linear-gradient(90deg, ${fill} 0%, ${fill} ${width}%, ${track} ${width}%, ${track} 100%)` }
							}),
							/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("span", {
								className: "dsr-bar-value",
								children: [metricDisplay(row, config.sortKey), config.sortKey !== "pct" ? /* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
									style: { marginLeft: 6 },
									children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)(Pct, { value: row.pct })
								}) : null]
							})
						]
					}, row.thscode);
				})
			})] });
		}
		function GroupsView({ result, config, compact = false }) {
			const buckets = /* @__PURE__ */ new Map();
			for (const row of result.rows) {
				const key = groupKey(row, config.groupBy);
				const list = buckets.get(key);
				if (list) list.push(row);
				else buckets.set(key, [row]);
			}
			const allKeys = [...buckets.keys()].sort((a, b) => groupOrder(a, config.groupBy) - groupOrder(b, config.groupBy));
			const keys = compact ? allKeys.slice(0, 3) : allKeys;
			return /* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
				className: "dsr-groups",
				children: keys.map((key) => {
					const rows = (buckets.get(key) ?? []).slice(0, compact ? 3 : void 0);
					return /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("section", {
						className: "dsr-group",
						children: [/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
							className: "dsr-group-head",
							children: [
								/* @__PURE__ */ (0, react_jsx_runtime.jsx)(Icon, {
									name: "groups",
									size: 13
								}),
								/* @__PURE__ */ (0, react_jsx_runtime.jsx)("h3", { children: key }),
								/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("span", {
									className: "dsr-muted",
									children: [rows.length, " 只"]
								})
							]
						}), /* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
							className: "dsr-group-rows",
							children: rows.map((row) => /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
								className: "dsr-group-row",
								children: [
									/* @__PURE__ */ (0, react_jsx_runtime.jsx)(Rank, { value: row.rank }),
									/* @__PURE__ */ (0, react_jsx_runtime.jsx)(StockName, {
										name: row.name,
										ticker: row.ticker
									}),
									/* @__PURE__ */ (0, react_jsx_runtime.jsx)(Pct, { value: row.pct }),
									/* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
										className: "dsr-bar-value",
										children: metricDisplay(row, config.sortKey)
									})
								]
							}, row.thscode))
						})]
					}, key);
				})
			});
		}
		function ChipView({ result, config }) {
			return /* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
				className: "dsr-chip-wall",
				children: result.rows.map((row) => /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
					className: `dsr-chip-stock ${pctClass(row.pct)}`,
					title: `${row.name} ${row.ticker} ${metricDisplay(row, "pct")}`,
					children: [
						/* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
							className: "dsr-chip-rank",
							children: row.rank
						}),
						/* @__PURE__ */ (0, react_jsx_runtime.jsx)("b", { children: row.name }),
						/* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
							className: "dsr-chip-code",
							children: row.ticker
						}),
						/* @__PURE__ */ (0, react_jsx_runtime.jsx)(Pct, { value: row.pct }),
						row.limitUp || row.broken || row.limitDown ? /* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
							className: "dsr-chip-badge",
							children: row.limitUp ? "涨停" : row.broken ? "炸板" : "跌停"
						}) : null,
						config.sortKey !== "pct" ? /* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
							className: "dsr-chip-value",
							children: metricDisplay(row, config.sortKey)
						}) : null
					]
				}, row.thscode))
			});
		}
		function viewOf(value, result, config, compact = false) {
			if (value === "card") return /* @__PURE__ */ (0, react_jsx_runtime.jsx)(CardsView, {
				result,
				config
			});
			if (value === "podium") return /* @__PURE__ */ (0, react_jsx_runtime.jsx)(PodiumView, {
				result,
				config
			});
			if (value === "group") return /* @__PURE__ */ (0, react_jsx_runtime.jsx)(GroupsView, {
				result,
				config,
				compact
			});
			if (value === "chip") return /* @__PURE__ */ (0, react_jsx_runtime.jsx)(ChipView, {
				result,
				config
			});
			return /* @__PURE__ */ (0, react_jsx_runtime.jsx)(ListView, {
				result,
				config,
				compact
			});
		}
		// src/client/ui/FocusScreen.tsx
		const PAGE_SIZE = 20;
		function exportCsv(result, config) {
			const escape = (value) => `"${value.replace(/"/g, "\"\"")}"`;
			const lines = [[
				"名次",
				"名称",
				"代码",
				"市场",
				...config.columns.map((key) => metricMeta(key)?.label ?? key),
				"状态"
			].map(escape).join(",")];
			for (const row of result.rows) lines.push([
				String(row.rank),
				row.name,
				row.ticker,
				boardLabel(row.board),
				...config.columns.map((key) => metricDisplay(row, key)),
				row.tags.join("、")
			].map((item) => escape(String(item))).join(","));
			const blob = new Blob([`\ufeff${lines.join("\n")}`], { type: "text/csv;charset=utf-8" });
			const url = URL.createObjectURL(blob);
			const anchor = document.createElement("a");
			anchor.href = url;
			anchor.download = `${config.name}.csv`;
			document.body.appendChild(anchor);
			anchor.click();
			anchor.remove();
			window.setTimeout(() => URL.revokeObjectURL(url), 1200);
		}
		function FocusScreen({ config, result, loading, error, onBack, onEdit, onDuplicate, onDelete, onRemoveCondition, onRefresh }) {
			const previewLive = marketPhase().live && isTodayShanghai(result?.previewAt ?? null);
			const [page, setPage] = (0, react.useState)(0);
			(0, react.useEffect)(() => setPage(0), [config.id]);
			const totalPages = result ? Math.max(1, Math.ceil(result.rows.length / PAGE_SIZE)) : 1;
			const safePage = Math.min(page, totalPages - 1);
			const start = safePage * PAGE_SIZE;
			const end = Math.min(start + PAGE_SIZE, result?.rows.length ?? 0);
			const pagedResult = result ? {
				...result,
				rows: result.rows.slice(start, end)
			} : null;
			return /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
				className: "dsr-page fk-page fk-focus-page",
				children: [
					/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
						className: "dsr-focus-head",
						children: [/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
							className: "fk-focus-bar",
							children: [
								/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("button", {
									type: "button",
									className: "fk-back",
									onClick: onBack,
									children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)(Icon, {
										name: "back",
										size: 14
									}), "全部榜单"]
								}),
								/* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
									className: "fk-focus-accent",
									style: { background: accentColor(config.accent) }
								}),
								/* @__PURE__ */ (0, react_jsx_runtime.jsx)("h1", { children: config.name }),
								config.note ? /* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
									className: "fk-focus-note",
									children: config.note
								}) : null,
								/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("span", {
									className: "fk-focus-hit",
									children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("b", {
										className: "fk-mono",
										style: { color: accentColor(config.accent) },
										children: result ? result.matched : "—"
									}), /* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", { children: "只" })]
								}),
								result ? /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("span", {
									className: "fk-focus-date fk-mono",
									children: ["数据日 ", result.dataDate ?? "—"]
								}) : null,
								result?.previewAt ? /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("span", {
									className: `fk-preview-chip ${previewLive ? "live" : ""}`,
									children: [
										previewLive ? "盘中预览" : "最近快照",
										" · ",
										formatClock(result.previewAt)
									]
								}) : null,
								/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
									className: "fk-focus-actions",
									children: [
										/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("button", {
											type: "button",
											className: "fk-btn",
											onClick: onRefresh,
											disabled: loading,
											children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)(Icon, {
												name: "refresh",
												size: 13
											}), "刷新"]
										}),
										/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("button", {
											type: "button",
											className: "fk-btn",
											onClick: onEdit,
											children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)(Icon, {
												name: "edit",
												size: 13
											}), "编辑"]
										}),
										/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("button", {
											type: "button",
											className: "fk-btn",
											onClick: onDuplicate,
											children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)(Icon, {
												name: "copy",
												size: 13
											}), "复制"]
										}),
										/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("button", {
											type: "button",
											className: "fk-btn",
											onClick: () => result && exportCsv(result, config),
											disabled: !result || result.rows.length === 0,
											children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)(Icon, {
												name: "download",
												size: 13
											}), "导出"]
										}),
										/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("button", {
											type: "button",
											className: "fk-btn danger",
											onClick: onDelete,
											children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)(Icon, {
												name: "trash",
												size: 13
											}), "删除"]
										})
									]
								})
							]
						}), /* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
							className: "dsr-conditions",
							children: config.conditions.length === 0 ? /* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
								className: "dsr-cond-chip",
								children: "全部股票"
							}) : /* @__PURE__ */ (0, react_jsx_runtime.jsxs)(react_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
								className: `fk-logic-chip ${config.logic === "or" ? "or" : ""}`,
								children: config.logic === "or" ? "任一满足" : "全部满足"
							}), config.conditions.map((clause, index) => /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("span", {
								className: `dsr-cond-chip ${clause.negate ? "exclude" : ""}`,
								children: [
									clause.negate ? /* @__PURE__ */ (0, react_jsx_runtime.jsx)(Icon, {
										name: "close",
										size: 10
									}) : null,
									formatCondition(clause),
									/* @__PURE__ */ (0, react_jsx_runtime.jsx)("button", {
										type: "button",
										className: "fk-cond-remove",
										title: "移除该条件",
										onClick: () => onRemoveCondition(clause.key),
										children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)(Icon, {
											name: "close",
											size: 10
										})
									})
								]
							}, `${clause.key}-${index}`))] })
						})]
					}),
					error ? /* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
						style: { marginBottom: 10 },
						children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)(ErrorLine, { text: error })
					}) : null,
					/* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
						className: "dsr-result-card",
						children: loading && !result ? /* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
							style: {
								padding: "48px 0",
								display: "flex",
								justifyContent: "center"
							},
							children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)(Spinner, { label: "正在读取全市场行情并计算…" })
						}) : result && result.rows.length === 0 ? /* @__PURE__ */ (0, react_jsx_runtime.jsx)(Empty, {
							title: "暂时没有股票满足条件",
							description: "盘中数据会不断变化；也可以把某个数值放宽一点，或者去掉一个条件。",
							children: /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("button", {
								type: "button",
								className: "fk-btn",
								onClick: onEdit,
								children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)(Icon, {
									name: "edit",
									size: 13
								}), "调整条件"]
							})
						}) : result ? /* @__PURE__ */ (0, react_jsx_runtime.jsxs)(react_jsx_runtime.Fragment, { children: [
							result.warnings.length > 0 ? /* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
								className: "dsr-hint",
								style: { marginBottom: 9 },
								children: result.warnings.join("；")
							}) : null,
							pagedResult ? viewOf(config.view, pagedResult, config) : null,
							/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
								className: "fk-result-foot",
								children: [
									/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("span", { children: [
										"共 ",
										result.matched,
										" 只入选，本页 ",
										start + 1,
										"-",
										end,
										" 只"
									] }),
									totalPages > 1 ? /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("span", {
										className: "fk-pager",
										children: [
											/* @__PURE__ */ (0, react_jsx_runtime.jsx)("button", {
												type: "button",
												className: "fk-page-btn",
												disabled: safePage === 0,
												onClick: () => setPage((value) => Math.max(0, value - 1)),
												children: "上一页"
											}),
											/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("span", {
												className: "fk-mono",
												children: [
													safePage + 1,
													" / ",
													totalPages
												]
											}),
											/* @__PURE__ */ (0, react_jsx_runtime.jsx)("button", {
												type: "button",
												className: "fk-page-btn",
												disabled: safePage >= totalPages - 1,
												onClick: () => setPage((value) => Math.min(totalPages - 1, value + 1)),
												children: "下一页"
											})
										]
									}) : null,
									/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("span", {
										className: "fk-mono",
										children: [
											"数据日 ",
											result.dataDate ?? "—",
											result.previewAt ? ` · 快照 ${formatClock(result.previewAt)}` : ""
										]
									})
								]
							})
						] }) : null
					})
				]
			});
		}
		// src/client/ui/SetupScreen.tsx
		function SetupScreen({ onConnected, writable }) {
			const [key, setKey] = (0, react.useState)("");
			const [show, setShow] = (0, react.useState)(false);
			const [busy, setBusy] = (0, react.useState)(false);
			const [error, setError] = (0, react.useState)("");
			async function submit() {
				if (busy) return;
				if (key.trim().length < 8) {
					setError("请完整粘贴扶摇访问密钥");
					return;
				}
				setBusy(true);
				setError("");
				try {
					await api.saveKey(key.trim());
					onConnected("已连接扶摇数据");
				} catch (issue) {
					setError(issue instanceof UiError ? issue.message : "连接没有成功，请稍后再试");
				} finally {
					setBusy(false);
				}
			}
			return /* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
				className: "dsr-setup",
				children: /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
					className: "dsr-setup-card",
					children: [/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
						className: "dsr-setup-visual",
						children: [
							/* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
								className: "dsr-setup-kicker",
								children: "方块榜单 · 盘中实时"
							}),
							/* @__PURE__ */ (0, react_jsx_runtime.jsx)("h1", {
								className: "dsr-setup-title",
								children: "把你的选股逻辑，变成一块实时榜单"
							}),
							/* @__PURE__ */ (0, react_jsx_runtime.jsx)("p", {
								className: "dsr-setup-desc",
								children: "不用写公式，不用导数据。选好条件，榜单就在盘中自己跑起来；想看更细，点开任意一只股票就行。"
							}),
							/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
								className: "dsr-setup-points",
								children: [
									/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
										className: "dsr-point",
										children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
											className: "dsr-point-dot",
											children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)(Icon, {
												name: "bars",
												size: 13
											})
										}), /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("span", { children: [
											CONDITIONS.length,
											" 个可用条件，常用的 ",
											COMMON_CONDITION_KEYS.length,
											" 个直接可选，其余按需展开"
										] })]
									}),
									/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
										className: "dsr-point",
										children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
											className: "dsr-point-dot",
											children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)(Icon, {
												name: "cards",
												size: 13
											})
										}), /* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", { children: "列表、卡片墙、排行榜、分组、芯片墙五种看法，随时切换" })]
									}),
									/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
										className: "dsr-point",
										children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
											className: "dsr-point-dot",
											children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)(Icon, {
												name: "key",
												size: 13
											})
										}), /* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", { children: "扶摇密钥由你掌握，东方财富公开行情免密钥；榜单和条件只留在本机" })]
									})
								]
							}),
							/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
								className: "dsr-setup-bars",
								"aria-hidden": "true",
								children: [
									/* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {}),
									/* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {}),
									/* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {}),
									/* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {}),
									/* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {})
								]
							})
						]
					}), /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
						className: "dsr-setup-form",
						children: [
							/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
								style: {
									display: "flex",
									alignItems: "center",
									gap: 8,
									marginBottom: 18,
									color: "var(--dsr-text-3)"
								},
								children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)(BrandMark, { size: 22 }), /* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
									style: {
										fontSize: 11,
										letterSpacing: ".08em"
									},
									children: "连接数据账户"
								})]
							}),
							/* @__PURE__ */ (0, react_jsx_runtime.jsx)("h2", {
								className: "dsr-form-title",
								children: "填一个访问密钥，就能开始"
							}),
							/* @__PURE__ */ (0, react_jsx_runtime.jsx)("p", {
								className: "dsr-form-sub",
								children: "在扶摇数据服务控制台创建访问密钥后，粘贴到这里。只需要一次。"
							}),
							/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
								className: "dsr-field",
								children: [
									/* @__PURE__ */ (0, react_jsx_runtime.jsx)("label", {
										className: "dsr-label",
										htmlFor: "fuyao-key",
										children: "访问密钥"
									}),
									/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
										className: "dsr-key-row",
										children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("input", {
											id: "fuyao-key",
											className: "dsr-input",
											type: show ? "text" : "password",
											value: key,
											placeholder: "粘贴访问密钥",
											autoComplete: "off",
											spellCheck: false,
											onChange: (event) => setKey(event.target.value),
											onKeyDown: (event) => {
												if (event.key === "Enter") submit();
											}
										}), /* @__PURE__ */ (0, react_jsx_runtime.jsx)("button", {
											type: "button",
											className: "dsr-eye",
											"aria-label": show ? "隐藏密钥" : "显示密钥",
											title: show ? "隐藏密钥" : "显示密钥",
											onClick: () => setShow((value) => !value),
											children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)(Icon, {
												name: show ? "eye-off" : "eye",
												size: 15
											})
										})]
									}),
									/* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
										className: "dsr-hint",
										children: "密钥只用于在本机查询行情，不会出现在对话内容里。"
									})
								]
							}),
							/* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
								className: "dsr-privacy",
								children: "榜单、筛选条件和密钥都只保存在这台电脑上。扶摇数据服务只看到行情查询，不会看到你的榜单。"
							}),
							error ? /* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
								style: { marginTop: 12 },
								children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)(ErrorLine, { text: error })
							}) : null,
							!writable ? /* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
								style: { marginTop: 12 },
								className: "dsr-hint",
								children: "当前环境不支持在界面里保存密钥，请改用本机环境变量提供。"
							}) : null,
							/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
								className: "dsr-setup-actions",
								children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("button", {
									type: "button",
									className: "dsr-btn primary",
									onClick: () => void submit(),
									disabled: busy || !writable,
									children: busy ? /* @__PURE__ */ (0, react_jsx_runtime.jsxs)(react_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", { className: "dsr-spinner" }), "正在验证"] }) : /* @__PURE__ */ (0, react_jsx_runtime.jsxs)(react_jsx_runtime.Fragment, { children: ["验证并开始", /* @__PURE__ */ (0, react_jsx_runtime.jsx)(Icon, {
										name: "arrow-right",
										size: 14
									})] })
								}), busy ? /* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
									className: "dsr-hint",
									children: "通常一两秒就好"
								}) : null]
							}),
							/* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
								className: "dsr-setup-note",
								children: "还没有密钥？在扶摇数据服务控制台创建一个即可。榜单如果用到五日、十日窗口，账户需要能取到近 10 个交易日行情包。"
							})
						]
					})]
				})
			});
		}
		// src/shared/version.ts
		const PLUGIN_VERSION = "0.4.0";
		// src/client/ui/SettingsScreen.tsx
		function sourceLabel(info) {
			if (info.source === "env") return "由本机设置提供";
			if (info.source === "file") return "保存在本机安全位置";
			return "保存在本机";
		}
		function SettingsScreen({ connection, sources, basic, onBack, onChanged }) {
			const [editing, setEditing] = (0, react.useState)(!connection.configured);
			const [key, setKey] = (0, react.useState)("");
			const [show, setShow] = (0, react.useState)(false);
			const [busy, setBusy] = (0, react.useState)(false);
			const [error, setError] = (0, react.useState)("");
			const [confirmRemove, setConfirmRemove] = (0, react.useState)(false);
			const [basicState, setBasicState] = (0, react.useState)(basic);
			const [basicBusy, setBasicBusy] = (0, react.useState)(false);
			const [basicError, setBasicError] = (0, react.useState)("");
			(0, react.useEffect)(() => {
				setBasicState(basic);
			}, [basic]);
			(0, react.useEffect)(() => {
				if (basicState.status !== "running") return void 0;
				const timer = setInterval(() => {
					api.basicStatus().then((next) => setBasicState(next)).catch(() => void 0);
				}, 2e3);
				return () => clearInterval(timer);
			}, [basicState.status]);
			async function startBasic() {
				if (basicBusy || basicState.status === "running") return;
				setBasicBusy(true);
				setBasicError("");
				try {
					const next = await api.initializeBasic(basicState.status === "ready");
					setBasicState(next);
				} catch (issue) {
					setBasicError(issue instanceof UiError ? issue.message : "初始化没有启动，请稍后再试");
				} finally {
					setBasicBusy(false);
				}
			}
			const basicPercent = basicState.total > 0 ? Math.min(100, Math.round(basicState.done / basicState.total * 100)) : 0;
			const basicLabel = basicState.status === "running" ? "初始化中" : basicState.status === "ready" ? "已就绪" : basicState.status === "error" ? "需要重试" : "待初始化";
			const effectiveSources = sources.map((source) => source.key === "basic" ? {
				...source,
				status: basicState.status === "ready" ? "ready" : basicState.status === "running" ? "running" : "pending"
			} : source);
			async function save() {
				if (busy) return;
				if (key.trim().length < 8) {
					setError("请完整粘贴访问密钥");
					return;
				}
				setBusy(true);
				setError("");
				try {
					await api.saveKey(key.trim());
					setKey("");
					setEditing(false);
					onChanged("访问密钥已更新");
				} catch (issue) {
					setError(issue instanceof UiError ? issue.message : "保存没有成功，请稍后再试");
				} finally {
					setBusy(false);
				}
			}
			async function remove() {
				setBusy(true);
				setError("");
				try {
					await api.removeKey();
					setConfirmRemove(false);
					onChanged("访问密钥已移除");
				} catch (issue) {
					setError(issue instanceof UiError ? issue.message : "移除没有成功，请稍后再试");
				} finally {
					setBusy(false);
				}
			}
			return /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
				className: "dsr-page narrow",
				children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
					className: "dsr-focus-head",
					style: { marginBottom: 12 },
					children: /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
						className: "fk-focus-bar",
						children: [
							/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("button", {
								type: "button",
								className: "fk-back",
								"aria-label": "返回",
								title: "返回",
								onClick: onBack,
								children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)(Icon, {
									name: "back",
									size: 14
								}), "全部榜单"]
							}),
							/* @__PURE__ */ (0, react_jsx_runtime.jsx)("h1", { children: "设置" }),
							/* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
								className: "fk-focus-date",
								children: "数据账户、计算范围和使用说明"
							})
						]
					})
				}), /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
					className: "dsr-settings",
					children: [
						/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("section", {
							className: "dsr-settings-block",
							children: [/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
								className: "dsr-settings-head",
								children: [
									/* @__PURE__ */ (0, react_jsx_runtime.jsx)(Icon, {
										name: "key",
										size: 15
									}),
									/* @__PURE__ */ (0, react_jsx_runtime.jsx)("h2", { children: "数据账户" }),
									/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("span", {
										className: `dsr-chip ${connection.configured ? "" : "live"}`,
										children: [connection.configured ? /* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
											className: "dsr-status-dot",
											style: { background: "#35b37e" }
										}) : null, connection.configured ? "已连接" : "未连接"]
									})
								]
							}), /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
								className: "dsr-settings-body",
								children: [
									/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
										className: "dsr-setting-row",
										children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
											className: "dsr-label",
											children: "当前状态"
										}), /* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
											className: "dsr-setting-value",
											children: connection.configured ? `${sourceLabel(connection)}${connection.masked ? ` · ${connection.masked}` : ""}` : "还没有配置访问密钥"
										})]
									}),
									editing ? /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
										className: "dsr-key-form",
										children: [
											/* @__PURE__ */ (0, react_jsx_runtime.jsx)("label", {
												className: "dsr-label",
												htmlFor: "settings-key",
												children: "访问密钥"
											}),
											/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
												className: "dsr-key-row",
												children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("input", {
													id: "settings-key",
													className: "dsr-input",
													type: show ? "text" : "password",
													value: key,
													placeholder: "粘贴新的访问密钥",
													autoComplete: "off",
													spellCheck: false,
													onChange: (event) => setKey(event.target.value),
													onKeyDown: (event) => {
														if (event.key === "Enter") save();
													}
												}), /* @__PURE__ */ (0, react_jsx_runtime.jsx)("button", {
													type: "button",
													className: "dsr-eye",
													"aria-label": show ? "隐藏密钥" : "显示密钥",
													title: show ? "隐藏密钥" : "显示密钥",
													onClick: () => setShow((value) => !value),
													children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)(Icon, {
														name: show ? "eye-off" : "eye",
														size: 15
													})
												})]
											}),
											/* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
												className: "dsr-hint",
												children: "更换后会先验证，通过才保存；旧密钥随即失效。"
											}),
											/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
												style: {
													display: "flex",
													gap: 8,
													marginTop: 2
												},
												children: [/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("button", {
													type: "button",
													className: "dsr-btn primary",
													onClick: () => void save(),
													disabled: busy || !connection.writable,
													children: [busy ? /* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", { className: "dsr-spinner" }) : null, "验证并保存"]
												}), connection.configured ? /* @__PURE__ */ (0, react_jsx_runtime.jsx)("button", {
													type: "button",
													className: "dsr-btn",
													onClick: () => {
														setEditing(false);
														setKey("");
														setError("");
													},
													children: "取消"
												}) : null]
											}),
											!connection.writable ? /* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
												className: "dsr-hint",
												children: "当前环境不支持在界面里保存，请改用本机环境变量提供。"
											}) : null
										]
									}) : /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
										style: {
											display: "flex",
											gap: 8,
											flexWrap: "wrap"
										},
										children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("button", {
											type: "button",
											className: "dsr-btn",
											onClick: () => setEditing(true),
											children: "更换密钥"
										}), confirmRemove ? /* @__PURE__ */ (0, react_jsx_runtime.jsxs)(react_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("button", {
											type: "button",
											className: "dsr-btn danger",
											onClick: () => void remove(),
											disabled: busy,
											children: "确认移除"
										}), /* @__PURE__ */ (0, react_jsx_runtime.jsx)("button", {
											type: "button",
											className: "dsr-btn",
											onClick: () => setConfirmRemove(false),
											children: "取消"
										})] }) : /* @__PURE__ */ (0, react_jsx_runtime.jsx)("button", {
											type: "button",
											className: "dsr-btn quiet",
											onClick: () => setConfirmRemove(true),
											children: "移除密钥"
										})]
									}),
									error ? /* @__PURE__ */ (0, react_jsx_runtime.jsx)(ErrorLine, { text: error }) : null
								]
							})]
						}),
						/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("section", {
							className: "dsr-settings-block",
							children: [/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
								className: "dsr-settings-head",
								children: [
									/* @__PURE__ */ (0, react_jsx_runtime.jsx)(Icon, {
										name: "list",
										size: 15
									}),
									/* @__PURE__ */ (0, react_jsx_runtime.jsx)("h2", { children: "数据来源" }),
									/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("span", {
										className: "dsr-chip",
										children: [effectiveSources.filter((source) => source.status === "ready").length, " 路已就绪"]
									})
								]
							}), /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
								className: "dsr-settings-body",
								children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
									className: "fk-source-list",
									children: effectiveSources.map((source) => /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
										className: "fk-source-row",
										children: [
											/* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", { className: `fk-source-dot ${source.status}` }),
											/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("b", { children: source.name }), /* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", { children: source.role })] }),
											/* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
												className: `fk-source-state ${source.status}`,
												children: source.status === "ready" ? "已就绪" : source.status === "need_key" ? "待填密钥" : source.status === "running" ? "初始化中" : "待初始化"
											})
										]
									}, source.key))
								}), /* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
									className: "dsr-hint",
									children: "基础数据全部来自免费公开行情；扶摇密钥只用于实时快照和热榜，不需要额外数据服务。"
								})]
							})]
						}),
						/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("section", {
							className: "dsr-settings-block",
							children: [/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
								className: "dsr-settings-head",
								children: [
									/* @__PURE__ */ (0, react_jsx_runtime.jsx)(Icon, {
										name: "bars",
										size: 15
									}),
									/* @__PURE__ */ (0, react_jsx_runtime.jsx)("h2", { children: "基础数据" }),
									/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("span", {
										className: `dsr-chip ${basicState.status === "ready" ? "" : "live"}`,
										children: [basicState.status === "ready" ? /* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
											className: "dsr-status-dot",
											style: { background: "#35b37e" }
										}) : null, basicLabel]
									})
								]
							}), /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
								className: "dsr-settings-body",
								children: [
									/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
										className: "dsr-setting-row",
										children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
											className: "dsr-label",
											children: "覆盖范围"
										}), /* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
											className: "dsr-setting-value",
											children: basicState.coverage > 0 ? `${basicState.coverage} 只股票${basicState.failed > 0 ? `（${basicState.failed} 只没取到）` : ""} · 近 6 个月日 K` : "还没有回补历史，60 日条件暂时不可用"
										})]
									}),
									/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
										className: "dsr-setting-row",
										children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
											className: "dsr-label",
											children: "数据日"
										}), /* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
											className: "dsr-setting-value",
											children: basicState.asOf ?? "等待初始化"
										})]
									}),
									basicState.status === "running" ? /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
										className: "dsr-basic-progress",
										children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
											className: "dsr-basic-track",
											children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
												className: "dsr-basic-fill",
												style: { width: `${basicPercent}%` }
											})
										}), /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("span", { children: [
											basicState.done,
											" / ",
											basicState.total,
											" 只 · ",
											basicPercent,
											"%",
											basicState.failed > 0 ? ` · ${basicState.failed} 只没取到` : ""
										] })]
									}) : null,
									basicState.message && basicState.status !== "running" ? /* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
										className: "dsr-hint",
										children: basicState.message
									}) : null,
									/* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
										className: "dsr-hint",
										children: "第一次安装点一次即可。插件会用免费公开行情回补近 6 个月，统计结果只存在你自己的电脑里；以后每天点一次「重新同步最近 6 个月」，60 日窗口就会跟着走。"
									}),
									/* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
										style: {
											display: "flex",
											gap: 8,
											marginTop: 2,
											flexWrap: "wrap"
										},
										children: /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("button", {
											type: "button",
											className: "dsr-btn primary",
											onClick: () => void startBasic(),
											disabled: basicBusy || basicState.status === "running" || !connection.configured,
											children: [basicBusy || basicState.status === "running" ? /* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", { className: "dsr-spinner" }) : null, basicState.status === "running" ? "正在初始化" : basicState.status === "ready" ? "重新同步最近 6 个月" : basicState.status === "error" ? "重新初始化" : "初始化基础数据"]
										})
									}),
									!connection.configured ? /* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
										className: "dsr-hint",
										children: "需要先配置扶摇密钥，插件才能拿到全市场股票名单。"
									}) : null,
									basicError ? /* @__PURE__ */ (0, react_jsx_runtime.jsx)(ErrorLine, { text: basicError }) : null
								]
							})]
						}),
						/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("section", {
							className: "dsr-settings-block",
							children: [/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
								className: "dsr-settings-head",
								children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)(Icon, {
									name: "bars",
									size: 15
								}), /* @__PURE__ */ (0, react_jsx_runtime.jsx)("h2", { children: "计算范围" })]
							}), /* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
								className: "dsr-settings-body",
								children: /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
									className: "dsr-facts",
									children: [
										/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
											className: "dsr-fact",
											children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("b", { children: "扶摇数据服务" }), /* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", { children: "全市场现价、成交、涨停池和热榜，需要你自己的访问密钥。" })]
										}),
										/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
											className: "dsr-fact",
											children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("b", { children: "东方财富公开行情" }), /* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", { children: "补充行业、市盈率、市净率、换手率和总/流通市值，不需要密钥。" })]
										}),
										/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
											className: "dsr-fact",
											children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("b", { children: "盘中预览" }), /* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", { children: "盘中只把快照叠在最近完整交易日上，顶部会标「盘中预览」；不推进数据日，也不写入榜单历史。" })]
										}),
										/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
											className: "dsr-fact",
											children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("b", { children: "近 6 个月基础历史" }), /* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", { children: "第一次初始化回补约 120 个交易日的公开日 K，用来算 60 日涨跌停、最高连板、RSI、KDJ、BOLL 和 CCI。" })]
										}),
										/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
											className: "dsr-fact",
											children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("b", { children: "近 10 个交易日" }), /* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", { children: "五日、十日涨幅和量比只用这段窗口，第一次计算会多等几秒。" })]
										})
									]
								})
							})]
						}),
						/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("section", {
							className: "dsr-settings-block",
							children: [/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
								className: "dsr-settings-head",
								children: [
									/* @__PURE__ */ (0, react_jsx_runtime.jsx)(Icon, {
										name: "settings",
										size: 15
									}),
									/* @__PURE__ */ (0, react_jsx_runtime.jsx)("h2", { children: "关于" }),
									/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("span", {
										className: "dsr-chip",
										children: ["版本 ", PLUGIN_VERSION]
									})
								]
							}), /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
								className: "dsr-settings-body",
								children: [
									/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
										className: "dsr-setting-row",
										children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
											className: "dsr-label",
											children: "数据来源"
										}), /* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
											className: "dsr-setting-value",
											children: "扶摇（需密钥）+ 新浪、腾讯、东方财富公开行情（免密钥）"
										})]
									}),
									/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
										className: "dsr-setting-row",
										children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
											className: "dsr-label",
											children: "数据去向"
										}), /* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
											className: "dsr-setting-value",
											children: "只在本机查询和计算，不上传榜单、自选或筛选条件"
										})]
									}),
									/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
										className: "dsr-setting-row",
										children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
											className: "dsr-label",
											children: "本机文件"
										}), /* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
											className: "dsr-setting-value",
											children: "榜单保存在本机；移除密钥不会删除已有榜单"
										})]
									}),
									/* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
										className: "dsr-danger-zone",
										children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
											className: "dsr-muted",
											children: "模型也能读写这些榜单，方便你用一句话调整条件。"
										})
									})
								]
							})]
						})
					]
				})]
			});
		}
		// src/client/ui/WallScreen.tsx
		const GUIDE_LINES = [
			"榜单是一组筛选条件加一个排序，盘中有新行情就自动重算。",
			"先圈范围，再定强弱；条件越少越稳，先跑出结果再加。",
			"点卡片看完整名单，点编辑改条件，改完立刻生效。"
		];
		function WallScreen({ rankings, wall, loading, error, busy, phaseLabel, phaseLive, dataDate, previewAt, onFocus, onEdit, onDuplicate, onDelete, onNew, onRefresh, onSettings, onTemplate }) {
			const [pendingDelete, setPendingDelete] = (0, react.useState)(null);
			const [guideOpen, setGuideOpen] = (0, react.useState)(false);
			return /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
				className: "dsr-page fk-page",
				children: [
					/* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
						className: "fk-page-head",
						children: /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
							className: "fk-page-title",
							children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("h1", { children: "榜单" }), /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("button", {
								type: "button",
								className: `fk-guide-chip ${guideOpen ? "on" : ""}`,
								onClick: () => setGuideOpen((value) => !value),
								"aria-expanded": guideOpen,
								children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)(Icon, {
									name: guideOpen ? "chevron" : "search",
									size: 12
								}), "3 句话看懂榜单"]
							})]
						})
					}),
					guideOpen ? /* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
						className: "fk-guide-box",
						children: GUIDE_LINES.map((line, index) => /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("p", { children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("b", { children: index + 1 }), line] }, line))
					}) : null,
					/* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
						className: "fk-tabs",
						role: "tablist",
						"aria-label": "榜单页签",
						children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)("button", {
							type: "button",
							role: "tab",
							"aria-selected": "true",
							className: "fk-tab active",
							children: "榜单"
						})
					}),
					/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
						className: "fk-toolbar",
						children: [
							/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("span", {
								className: "fk-toolbar-item",
								children: [
									/* @__PURE__ */ (0, react_jsx_runtime.jsx)(Icon, {
										name: "groups",
										size: 14
									}),
									rankings.length,
									" 个榜单"
								]
							}),
							/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("span", {
								className: "fk-toolbar-item",
								children: ["数据日", /* @__PURE__ */ (0, react_jsx_runtime.jsx)("b", {
									className: "fk-mono",
									children: dataDate ?? "—"
								})]
							}),
							previewAt ? /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("span", {
								className: `fk-preview-chip ${phaseLive ? "live" : ""}`,
								children: [
									phaseLive ? "盘中预览" : "最近快照",
									" · ",
									/* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
										className: "fk-mono",
										children: formatClock(previewAt)
									}),
									phaseLive ? " · 不入历史" : ""
								]
							}) : null,
							/* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
								className: "fk-toolbar-dim",
								children: "墙面模式 · 每卡预览前 8 只"
							}),
							/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("span", {
								className: `fk-market ${phaseLive ? "live" : ""}`,
								children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", { className: "fk-market-dot" }), phaseLabel]
							}),
							/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
								className: "fk-toolbar-actions",
								children: [
									/* @__PURE__ */ (0, react_jsx_runtime.jsx)("button", {
										type: "button",
										className: "fk-icon-btn",
										"aria-label": "设置",
										title: "设置",
										onClick: onSettings,
										children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)(Icon, {
											name: "settings",
											size: 15
										})
									}),
									/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("button", {
										type: "button",
										className: "fk-btn",
										onClick: onRefresh,
										disabled: loading || busy,
										children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)(Icon, {
											name: "refresh",
											size: 14
										}), "刷新"]
									}),
									/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("button", {
										type: "button",
										className: "fk-btn primary",
										onClick: onNew,
										children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)(Icon, {
											name: "plus",
											size: 14
										}), "添加榜单"]
									})
								]
							})
						]
					}),
					error ? /* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
						style: { marginBottom: 12 },
						children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)(ErrorLine, { text: error })
					}) : null,
					rankings.length > 0 ? /* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
						className: "fk-name-strip",
						children: rankings.map((ranking) => {
							const total = wall?.entries.find((item) => item.id === ranking.id)?.result?.matched;
							return /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("button", {
								type: "button",
								className: "fk-name-tab",
								title: `聚焦「${ranking.name}」`,
								onClick: () => onFocus(ranking.id),
								children: [
									/* @__PURE__ */ (0, react_jsx_runtime.jsx)("i", { style: { background: accentColor(ranking.accent) } }),
									ranking.name,
									/* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
										className: "fk-mono",
										children: total == null ? "-" : total
									})
								]
							}, ranking.id);
						})
					}) : null,
					rankings.length === 0 ? /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
						className: "fk-empty-wall",
						children: [
							/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
								className: "fk-empty-head",
								children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("h2", { children: "还没有榜单" }), /* @__PURE__ */ (0, react_jsx_runtime.jsx)("p", { children: "榜单是你自己定的选股规则，盘中按最新行情算出名单。先从模板一键生成，或者从空白开始搭。" })]
							}),
							/* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
								className: "fk-template-grid",
								children: TEMPLATES.map((template) => /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("button", {
									type: "button",
									className: "fk-template-card",
									style: { "--tpl-accent": accentColor(template.accent) },
									onClick: () => onTemplate(template),
									title: template.description,
									children: [/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("span", {
										className: "fk-template-title",
										children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("i", {}), template.name]
									}), /* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
										className: "fk-template-desc",
										children: template.description
									})]
								}, template.id))
							}),
							/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("button", {
								type: "button",
								className: "fk-btn primary fk-empty-action",
								onClick: onNew,
								children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)(Icon, {
									name: "plus",
									size: 14
								}), "从空白开始配一个"]
							})
						]
					}) : /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
						className: "fk-wall-grid",
						children: [rankings.map((ranking) => {
							const entry = wall?.entries.find((item) => item.id === ranking.id);
							const result = entry?.result;
							const accent = accentColor(ranking.accent);
							const deletePending = pendingDelete === ranking.id;
							const shown = result?.rows.slice(0, 8) ?? [];
							const previewResult = result ? {
								...result,
								rows: shown
							} : null;
							const more = result ? Math.max(0, (result.matched || 0) - shown.length) : 0;
							return /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("article", {
								className: "fk-card",
								children: [
									/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
										className: "fk-card-head",
										children: [
											/* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
												className: "fk-card-accent",
												style: { background: accent }
											}),
											/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
												className: "fk-card-title-box",
												children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("button", {
													type: "button",
													className: "fk-card-name",
													title: ranking.name,
													onClick: () => onFocus(ranking.id),
													children: ranking.name
												}), /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
													className: "fk-card-meta",
													children: [
														/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("span", {
															className: "fk-card-hit",
															children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("b", { children: result ? result.matched : "-" }), /* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", { children: "只" })]
														}),
														result ? /* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
															className: "fk-mono",
															children: result.dataDate ?? "—"
														}) : null,
														loading && !result ? /* @__PURE__ */ (0, react_jsx_runtime.jsx)(Spinner, {}) : null
													]
												})]
											}),
											/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
												className: "fk-card-actions",
												children: [
													/* @__PURE__ */ (0, react_jsx_runtime.jsx)("button", {
														type: "button",
														className: "fk-card-action",
														"aria-label": "聚焦查看",
														title: "聚焦查看完整名单",
														onClick: () => onFocus(ranking.id),
														children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)(Icon, {
															name: "eye",
															size: 14
														})
													}),
													/* @__PURE__ */ (0, react_jsx_runtime.jsx)("button", {
														type: "button",
														className: "fk-card-action",
														"aria-label": "编辑榜单",
														title: "编辑配置",
														onClick: () => onEdit(ranking.id),
														children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)(Icon, {
															name: "edit",
															size: 14
														})
													}),
													/* @__PURE__ */ (0, react_jsx_runtime.jsx)("button", {
														type: "button",
														className: "fk-card-action",
														"aria-label": "复制榜单",
														title: "复制为新榜单",
														onClick: () => onDuplicate(ranking.id),
														children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)(Icon, {
															name: "copy",
															size: 14
														})
													}),
													deletePending ? /* @__PURE__ */ (0, react_jsx_runtime.jsxs)(react_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("button", {
														type: "button",
														className: "fk-card-action danger-text",
														title: "确认删除",
														onClick: () => {
															setPendingDelete(null);
															onDelete(ranking.id);
														},
														children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)(Icon, {
															name: "check",
															size: 14
														})
													}), /* @__PURE__ */ (0, react_jsx_runtime.jsx)("button", {
														type: "button",
														className: "fk-card-action",
														title: "取消删除",
														onClick: () => setPendingDelete(null),
														children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)(Icon, {
															name: "close",
															size: 14
														})
													})] }) : /* @__PURE__ */ (0, react_jsx_runtime.jsx)("button", {
														type: "button",
														className: "fk-card-action danger",
														"aria-label": "删除榜单",
														title: "删除榜单",
														onClick: () => setPendingDelete(ranking.id),
														children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)(Icon, {
															name: "trash",
															size: 14
														})
													})
												]
											})
										]
									}),
									entry?.error ? /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
										className: "fk-card-error",
										children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)(ErrorLine, { text: entry.error }), /* @__PURE__ */ (0, react_jsx_runtime.jsx)("button", {
											type: "button",
											className: "fk-btn small",
											onClick: onRefresh,
											children: "重新计算"
										})]
									}) : previewResult && shown.length > 0 ? /* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
										className: "fk-card-view-body",
										children: viewOf(ranking.view, previewResult, ranking, true)
									}) : result ? /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
										className: "fk-card-empty",
										children: ["当前没有股票满足这组条件。可以放宽一两个数值，或者去掉一个条件。", /* @__PURE__ */ (0, react_jsx_runtime.jsx)("button", {
											type: "button",
											className: "fk-btn small",
											onClick: () => onEdit(ranking.id),
											children: "调整条件"
										})]
									}) : /* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
										className: "fk-card-skeleton",
										children: [
											88,
											76,
											82,
											64,
											72,
											56
										].map((width, index) => /* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
											className: "dsr-skeleton",
											style: { width: `${width}%` }
										}, index))
									}),
									/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
										className: "fk-card-foot",
										children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
											className: "fk-card-conditions",
											children: ranking.conditions.length > 0 ? /* @__PURE__ */ (0, react_jsx_runtime.jsxs)(react_jsx_runtime.Fragment, { children: [ranking.conditions.slice(0, 4).map((clause, index) => /* @__PURE__ */ (0, react_jsx_runtime.jsx)("button", {
												type: "button",
												className: `fk-cond ${clause.negate ? "negate" : ""}`,
												title: formatCondition(clause),
												onClick: () => onEdit(ranking.id),
												children: formatCondition(clause)
											}, `${clause.key}-${index}`)), ranking.conditions.length > 4 ? /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("button", {
												type: "button",
												className: "fk-cond more",
												onClick: () => onEdit(ranking.id),
												children: ["+", ranking.conditions.length - 4]
											}) : null] }) : /* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
												className: "fk-card-nocond",
												children: "没有条件（等于全市场）"
											})
										}), /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
											className: "fk-card-sub",
											children: [
												/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("span", { children: [
													"前 ",
													ranking.limit,
													" 只"
												] }),
												/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("span", {
													className: "fk-truncate",
													children: ["按", formatSort(ranking.sortKey, ranking.sortDir)]
												}),
												more > 0 ? /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("button", {
													type: "button",
													className: "fk-card-more",
													onClick: () => onFocus(ranking.id),
													children: [
														"还有 ",
														more,
														" 只 ›"
													]
												}) : null,
												/* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
													className: "fk-card-view",
													children: viewLabel(ranking.view)
												})
											]
										})]
									})
								]
							}, ranking.id);
						}), /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("button", {
							type: "button",
							className: "fk-new-card",
							onClick: onNew,
							children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)(Icon, {
								name: "plus",
								size: 18
							}), /* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", { children: "再建一个榜单" })]
						})]
					}),
					busy ? /* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
						style: { marginTop: 12 },
						children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)(Spinner, { label: "正在保存…" })
					}) : null
				]
			});
		}
		// src/client/ui/styles.ts
		const STYLES = String.raw`
.dsr-overlay {
  --dsr-bg: var(--dsw-alias-bg-base, #111216);
  --dsr-panel: var(--dsw-alias-bg-layer-1, #191a1f);
  --dsr-panel-2: var(--dsw-alias-bg-layer-2, #212228);
  --dsr-text: var(--dsw-alias-label-primary, #ededf1);
  --dsr-text-2: var(--dsw-alias-label-secondary, #b8b9c3);
  --dsr-text-3: var(--dsw-alias-label-tertiary, #858793);
  --dsr-border: var(--dsw-alias-border-l4, rgba(255,255,255,.09));
  --dsr-hover: var(--dsw-alias-interactive-bg-hover, rgba(255,255,255,.06));
  --dsr-up: #e05555;
  --dsr-down: #35b37e;
  --dsr-amber: #d99a3d;
  --dsr-radius: 14px;
  position: fixed;
  inset: 0;
  z-index: 1200;
  display: flex;
  flex-direction: column;
  background: var(--dsr-bg);
  color: var(--dsr-text);
  font-family: inherit;
  pointer-events: auto;
}

@keyframes dsr-spin { to { transform: rotate(360deg); } }

.dsr-overlay *, .dsr-overlay *::before, .dsr-overlay *::after { box-sizing: border-box; }

.dsr-topbar {
  height: 64px;
  flex: 0 0 64px;
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 0 22px;
  border-bottom: 1px solid var(--dsr-border);
  background: var(--dsr-bg);
}

.dsr-brand { display: flex; align-items: center; gap: 10px; min-width: 0; color: var(--dsr-text); }
.dsr-brand-mark { display: flex; color: var(--dsr-text); }
.dsr-brand-text { display: flex; flex-direction: column; gap: 1px; min-width: 0; }
.dsr-brand-title { font-size: 15px; font-weight: 650; letter-spacing: .02em; }
.dsr-brand-sub { font-size: 11px; color: var(--dsr-text-3); letter-spacing: .06em; }

.dsr-topbar-right { margin-left: auto; display: flex; align-items: center; gap: 8px; }

.dsr-status {
  display: inline-flex; align-items: center; gap: 6px;
  height: 26px; padding: 0 9px;
  border: 1px solid var(--dsr-border);
  border-radius: 999px;
  color: var(--dsr-text-3);
  font-size: 11px;
  font-variant-numeric: tabular-nums;
  white-space: nowrap;
}
.dsr-status-dot { width: 6px; height: 6px; border-radius: 50%; background: color-mix(in srgb, var(--dsr-text-3) 60%, transparent); }
.dsr-status.live { color: var(--dsr-text-2); }
.dsr-status.live .dsr-status-dot { background: var(--dsr-up); box-shadow: 0 0 0 3px rgba(224,85,85,.12); }

.dsr-btn {
  display: inline-flex; align-items: center; justify-content: center; gap: 6px;
  height: 32px; padding: 0 12px;
  border: 1px solid var(--dsr-border);
  border-radius: 9px;
  background: transparent;
  color: var(--dsr-text-2);
  font: inherit; font-size: 12px; font-weight: 500;
  cursor: pointer;
  white-space: nowrap;
  transition: background .15s ease, color .15s ease, border-color .15s ease;
}
.dsr-btn:hover { background: var(--dsr-hover); color: var(--dsr-text); }
.dsr-btn:active { background: color-mix(in srgb, var(--dsr-text) 12%, transparent); }
.dsr-btn:disabled { cursor: not-allowed; color: var(--dsr-text-3); border-color: var(--dsr-border); background: transparent; }
.dsr-btn.primary { background: var(--dsr-text); color: var(--dsr-bg); border-color: transparent; }
.dsr-btn.primary:hover { background: color-mix(in srgb, var(--dsr-text) 90%, var(--dsr-bg)); }
.dsr-btn.primary:disabled { background: color-mix(in srgb, var(--dsr-text) 20%, var(--dsr-bg)); color: var(--dsr-text-2); }
.dsr-btn.small { height: 27px; padding: 0 9px; font-size: 11px; border-radius: 8px; }
.dsr-btn.quiet { border-color: transparent; color: var(--dsr-text-3); }
.dsr-btn.quiet:hover { color: var(--dsr-text-2); }
.dsr-btn.danger { color: #e98484; border-color: rgba(224,85,85,.22); }
.dsr-btn.danger:hover { background: rgba(224,85,85,.09); }

.dsr-icon-btn {
  width: 32px; height: 32px; padding: 0;
  display: inline-flex; align-items: center; justify-content: center;
  border: 1px solid transparent; border-radius: 9px;
  background: transparent; color: var(--dsr-text-3); cursor: pointer;
  transition: background .15s ease, color .15s ease;
}
.dsr-icon-btn:hover { background: var(--dsr-hover); color: var(--dsr-text); }
.dsr-icon-btn.bordered { border-color: var(--dsr-border); }
.dsr-icon-btn:disabled { cursor: not-allowed; color: color-mix(in srgb, var(--dsr-text-3) 55%, transparent); }

.dsr-main { flex: 1 1 auto; overflow: auto; overscroll-behavior: contain; }
.dsr-page { max-width: 1280px; margin: 0 auto; padding: 28px 24px 48px; }
.dsr-page.narrow { max-width: 980px; }

.dsr-sr { position: absolute; width: 1px; height: 1px; overflow: hidden; clip: rect(0 0 0 0); }

.dsr-muted { color: var(--dsr-text-3); font-size: 12px; line-height: 1.6; }
.dsr-error {
  display: flex; align-items: flex-start; gap: 8px;
  padding: 10px 12px; border-radius: 10px;
  border: 1px solid rgba(224,85,85,.24);
  background: rgba(224,85,85,.08);
  color: #eea1a1; font-size: 12px; line-height: 1.55;
}
.dsr-error svg { flex: 0 0 auto; margin-top: 1px; }
.dsr-loading { display: inline-flex; align-items: center; gap: 8px; color: var(--dsr-text-3); font-size: 12px; }
.dsr-spinner { width: 15px; height: 15px; border: 1.5px solid var(--dsr-border); border-top-color: var(--dsr-text-2); border-radius: 50%; animation: dsr-spin .9s linear infinite; }

.dsr-toast {
  display: inline-flex; align-items: center; max-width: 320px; height: 26px;
  padding: 0 10px; border-radius: 999px;
  background: var(--dsr-panel-2); border: 1px solid var(--dsr-border);
  color: var(--dsr-text-2); font-size: 11px; white-space: nowrap;
  overflow: hidden; text-overflow: ellipsis;
}

.dsr-chip {
  display: inline-flex; align-items: center; gap: 5px;
  height: 24px; padding: 0 8px;
  border-radius: 7px; border: 1px solid var(--dsr-border);
  background: color-mix(in srgb, var(--dsr-panel) 72%, transparent);
  color: var(--dsr-text-3); font-size: 11px; white-space: nowrap;
}
.dsr-tag {
  display: inline-flex; align-items: center; height: 19px; padding: 0 6px;
  border-radius: 5px; background: color-mix(in srgb, var(--dsr-text) 8%, transparent);
  color: var(--dsr-text-3); font-size: 10px; white-space: nowrap;
}
.dsr-pct { font-variant-numeric: tabular-nums; font-weight: 600; }
.dsr-pct.up { color: var(--dsr-up); }
.dsr-pct.down { color: var(--dsr-down); }
.dsr-pct.flat { color: var(--dsr-text-3); }
.dsr-code { color: var(--dsr-text-3); font-size: 10px; font-variant-numeric: tabular-nums; letter-spacing: .02em; }

/* 首次连接 */
.dsr-setup { max-width: 1040px; min-height: 100%; margin: 0 auto; padding: 48px 24px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; }
.dsr-setup-card {
  display: grid; grid-template-columns: minmax(0, 1.05fr) minmax(0, .95fr);
  border: 1px solid var(--dsr-border); border-radius: 20px; overflow: hidden;
  background: var(--dsr-panel);
  box-shadow: 0 30px 80px rgba(0,0,0,.22);
}
.dsr-setup-visual {
  padding: 42px 40px;
  background:
    radial-gradient(120% 90% at 0% 0%, rgba(224,85,85,.13), transparent 60%),
    radial-gradient(100% 80% at 100% 100%, rgba(58,175,169,.10), transparent 62%),
    var(--dsr-panel);
  border-right: 1px solid var(--dsr-border);
  display: flex; flex-direction: column; justify-content: center; min-height: 520px;
}
.dsr-setup-kicker { font-size: 11px; letter-spacing: .18em; color: var(--dsr-text-3); text-transform: uppercase; }
.dsr-setup-title { margin: 14px 0 12px; font-size: 30px; line-height: 1.25; letter-spacing: -.02em; font-weight: 680; max-width: 380px; }
.dsr-setup-desc { margin: 0; max-width: 390px; color: var(--dsr-text-2); font-size: 13px; line-height: 1.8; }
.dsr-setup-points { display: flex; flex-direction: column; gap: 12px; margin-top: 30px; }
.dsr-point { display: flex; gap: 10px; align-items: flex-start; font-size: 12px; color: var(--dsr-text-2); line-height: 1.65; }
.dsr-point-dot { width: 22px; height: 22px; flex: 0 0 22px; border-radius: 7px; display: flex; align-items: center; justify-content: center; background: color-mix(in srgb, var(--dsr-text) 7%, transparent); color: var(--dsr-text-2); }
.dsr-setup-bars { margin-top: auto; padding-top: 34px; display: flex; align-items: flex-end; gap: 9px; }
.dsr-setup-bars span { width: 28px; border-radius: 5px 5px 3px 3px; background: linear-gradient(180deg, color-mix(in srgb, var(--dsr-text) 14%, transparent), color-mix(in srgb, var(--dsr-text) 3%, transparent)); }
.dsr-setup-bars span:nth-child(1) { height: 38px; }
.dsr-setup-bars span:nth-child(2) { height: 64px; background: linear-gradient(180deg, rgba(58,175,169,.55), rgba(58,175,169,.08)); }
.dsr-setup-bars span:nth-child(3) { height: 46px; }
.dsr-setup-bars span:nth-child(4) { height: 88px; background: linear-gradient(180deg, rgba(224,85,85,.62), rgba(224,85,85,.08)); }
.dsr-setup-bars span:nth-child(5) { height: 58px; }

.dsr-setup-form { padding: 44px 38px; display: flex; flex-direction: column; justify-content: center; }
.dsr-form-title { font-size: 17px; font-weight: 620; margin: 0 0 6px; }
.dsr-form-sub { margin: 0 0 26px; color: var(--dsr-text-3); font-size: 12px; line-height: 1.7; }
.dsr-field { display: flex; flex-direction: column; gap: 7px; }
.dsr-label { font-size: 11px; color: var(--dsr-text-3); letter-spacing: .03em; }
.dsr-input, .dsr-select, .dsr-textarea {
  width: 100%; height: 38px; padding: 0 11px;
  border: 1px solid var(--dsr-border); border-radius: 9px;
  background: color-mix(in srgb, var(--dsr-bg) 62%, transparent);
  color: var(--dsr-text); font: inherit; font-size: 13px;
  outline: none; transition: border-color .15s ease, box-shadow .15s ease;
}
.dsr-input:focus, .dsr-select:focus { border-color: color-mix(in srgb, var(--dsr-text) 35%, var(--dsr-border)); box-shadow: 0 0 0 3px color-mix(in srgb, var(--dsr-text) 7%, transparent); }
.dsr-input::placeholder { color: color-mix(in srgb, var(--dsr-text-3) 64%, transparent); }
.dsr-select { appearance: none; background-image: linear-gradient(45deg, transparent 50%, var(--dsr-text-3) 50%), linear-gradient(135deg, var(--dsr-text-3) 50%, transparent 50%); background-position: calc(100% - 15px) 16px, calc(100% - 10px) 16px; background-size: 5px 5px; background-repeat: no-repeat; padding-right: 28px; }
.dsr-key-row { display: flex; gap: 8px; }
.dsr-key-row .dsr-input { font-family: ui-monospace, SFMono-Regular, Menlo, monospace; letter-spacing: .04em; }
.dsr-eye { flex: 0 0 38px; width: 38px; height: 38px; border-radius: 9px; border: 1px solid var(--dsr-border); background: transparent; color: var(--dsr-text-3); cursor: pointer; }
.dsr-eye:hover { background: var(--dsr-hover); color: var(--dsr-text); }
.dsr-hint { font-size: 11px; color: var(--dsr-text-3); line-height: 1.65; }
.dsr-privacy { margin-top: 14px; padding: 10px 11px; border-radius: 9px; background: color-mix(in srgb, var(--dsr-text) 5%, transparent); color: var(--dsr-text-3); font-size: 11px; line-height: 1.65; }
.dsr-setup-actions { margin-top: 18px; display: flex; align-items: center; gap: 10px; }
.dsr-setup-actions .dsr-btn.primary { height: 38px; padding: 0 16px; font-size: 13px; border-radius: 10px; }
.dsr-setup-note { margin-top: 22px; padding-top: 18px; border-top: 1px solid var(--dsr-border); color: var(--dsr-text-3); font-size: 11px; line-height: 1.7; }

/* 榜单墙 */
.dsr-wall-head { display: flex; align-items: flex-end; gap: 14px; margin-bottom: 22px; }
.dsr-wall-head h1 { margin: 0; font-size: 22px; letter-spacing: -.02em; font-weight: 660; }
.dsr-wall-head .dsr-muted { margin: 0 0 3px; }
.dsr-wall-head-actions { margin-left: auto; display: flex; gap: 8px; }
.dsr-wall-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(330px, 1fr)); gap: 14px; }
.dsr-card {
  display: flex; flex-direction: column; min-width: 0;
  border: 1px solid var(--dsr-border); border-radius: var(--dsr-radius);
  background: var(--dsr-panel); overflow: hidden;
  transition: border-color .18s ease, box-shadow .18s ease;
}
.dsr-card:hover { border-color: color-mix(in srgb, var(--dsr-text) 18%, var(--dsr-border)); box-shadow: 0 16px 38px rgba(0,0,0,.18); }
.dsr-card-accent { height: 3px; flex: 0 0 3px; background: var(--dsr-accent, #e05555); }
.dsr-card-head { padding: 16px 16px 10px; display: flex; gap: 10px; align-items: flex-start; }
.dsr-card-name { margin: 0; font-size: 15px; font-weight: 630; letter-spacing: -.01em; line-height: 1.35; min-width: 0; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
.dsr-card-meta { margin-top: 4px; display: flex; gap: 6px; align-items: center; color: var(--dsr-text-3); font-size: 10px; }
.dsr-card-head-actions { margin-left: auto; display: flex; gap: 1px; visibility: hidden; }
.dsr-card:hover .dsr-card-head-actions, .dsr-card:focus-within .dsr-card-head-actions { visibility: visible; }
.dsr-card-stat { margin-left: auto; text-align: right; flex: 0 0 auto; }
.dsr-card-stat strong { display: block; font-size: 22px; line-height: 1.05; font-variant-numeric: tabular-nums; letter-spacing: -.03em; }
.dsr-card-stat span { font-size: 10px; color: var(--dsr-text-3); }
.dsr-card-rows { padding: 2px 8px 6px; display: flex; flex-direction: column; }
.dsr-card-row {
  display: grid; grid-template-columns: 20px minmax(0, 1fr) 68px 76px;
  align-items: center; gap: 8px;
  height: 34px; padding: 0 8px; border-radius: 7px;
}
.dsr-card-row:hover { background: var(--dsr-hover); }
.dsr-rank { font-size: 10px; color: var(--dsr-text-3); font-variant-numeric: tabular-nums; text-align: right; }
.dsr-rank.top { color: var(--dsr-amber); font-weight: 650; }
.dsr-name { min-width: 0; display: flex; align-items: baseline; gap: 6px; }
.dsr-name b { font-size: 12px; font-weight: 580; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
.dsr-name .dsr-code { flex: 0 0 auto; }
.dsr-card-row .dsr-pct { font-size: 11px; text-align: right; }
.dsr-card-value { font-size: 10px; color: var(--dsr-text-3); text-align: right; font-variant-numeric: tabular-nums; white-space: nowrap; }
.dsr-card-foot { margin-top: auto; padding: 10px 16px 13px; display: flex; align-items: center; gap: 8px; border-top: 1px solid var(--dsr-border); }
.dsr-card-foot .dsr-btn { height: 25px; padding: 0 8px; font-size: 10px; }
.dsr-card-foot .dsr-muted { margin-left: auto; font-size: 10px; }
.dsr-card-error { padding: 12px 16px 18px; display: flex; flex-direction: column; gap: 8px; }
.dsr-card-empty { padding: 18px 16px 24px; color: var(--dsr-text-3); font-size: 11px; line-height: 1.7; }
.dsr-card-skeleton { padding: 16px; display: flex; flex-direction: column; gap: 9px; }
.dsr-skeleton { height: 10px; border-radius: 4px; background: color-mix(in srgb, var(--dsr-text) 10%, transparent); }

.dsr-new-card {
  min-height: 220px; border: 1px dashed color-mix(in srgb, var(--dsr-text) 16%, transparent);
  border-radius: var(--dsr-radius); background: transparent; color: var(--dsr-text-3);
  display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 8px;
  cursor: pointer; font: inherit; transition: border-color .18s ease, background .18s ease, color .18s ease;
}
.dsr-new-card:hover { border-color: color-mix(in srgb, var(--dsr-text) 30%, transparent); background: color-mix(in srgb, var(--dsr-text) 3%, transparent); color: var(--dsr-text-2); }
.dsr-new-card span { font-size: 12px; }
.dsr-wall-empty { padding: 44px 20px; border: 1px dashed var(--dsr-border); border-radius: 18px; text-align: center; }
.dsr-wall-empty h2 { margin: 8px 0 6px; font-size: 18px; font-weight: 620; }
.dsr-wall-empty p { margin: 0 auto 18px; max-width: 460px; color: var(--dsr-text-3); font-size: 12px; line-height: 1.75; }
.dsr-template-row { display: flex; justify-content: center; flex-wrap: wrap; gap: 7px; }
.dsr-template-chip { height: 27px; padding: 0 10px; border-radius: 7px; border: 1px solid var(--dsr-border); background: transparent; color: var(--dsr-text-2); font: inherit; font-size: 11px; cursor: pointer; }
.dsr-template-chip:hover { background: var(--dsr-hover); color: var(--dsr-text); }

/* 聚焦榜单 */
.dsr-focus-head { display: flex; align-items: flex-start; gap: 12px; margin-bottom: 14px; }
.dsr-focus-head .dsr-icon-btn { margin-top: 2px; }
.dsr-focus-title { min-width: 0; flex: 1 1 auto; }
.dsr-focus-title h1 { margin: 0; font-size: 24px; letter-spacing: -.02em; font-weight: 670; line-height: 1.2; }
.dsr-focus-meta { display: flex; flex-wrap: wrap; gap: 7px; align-items: center; margin-top: 7px; color: var(--dsr-text-3); font-size: 11px; }
.dsr-focus-actions { display: flex; gap: 7px; flex: 0 0 auto; }
.dsr-conditions { display: flex; flex-wrap: wrap; gap: 6px; margin: 14px 0 18px; }
.dsr-cond-chip { display: inline-flex; align-items: center; gap: 5px; height: 26px; padding: 0 9px; border-radius: 7px; background: color-mix(in srgb, var(--dsr-text) 5%, transparent); color: var(--dsr-text-2); font-size: 11px; }
.dsr-cond-chip.exclude { color: var(--dsr-text-3); text-decoration: line-through; }
.dsr-view-tabs { display: flex; gap: 2px; padding: 3px; border: 1px solid var(--dsr-border); border-radius: 9px; width: fit-content; margin-bottom: 14px; }
.dsr-view-tab { display: inline-flex; align-items: center; gap: 5px; height: 27px; padding: 0 10px; border: none; border-radius: 7px; background: transparent; color: var(--dsr-text-3); font: inherit; font-size: 11px; cursor: pointer; }
.dsr-view-tab.active { background: color-mix(in srgb, var(--dsr-text) 9%, transparent); color: var(--dsr-text); }
.dsr-view-tab:hover { color: var(--dsr-text-2); }

.dsr-result { }
.dsr-table-wrap { border: 1px solid var(--dsr-border); border-radius: 12px; overflow: auto; background: var(--dsr-panel); }
.dsr-table { width: 100%; border-collapse: separate; border-spacing: 0; table-layout: fixed; }
.dsr-table th {
  height: 36px; padding: 0 12px; text-align: right;
  background: color-mix(in srgb, var(--dsr-panel-2) 92%, transparent);
  color: var(--dsr-text-3); font-size: 10px; font-weight: 500; letter-spacing: .02em; white-space: nowrap;
  border-bottom: 1px solid var(--dsr-border);
}
.dsr-table th:first-child, .dsr-table td:first-child { text-align: center; width: 46px; }
.dsr-table th:nth-child(2), .dsr-table td:nth-child(2) { text-align: left; width: 190px; }
.dsr-table td { height: 40px; padding: 0 12px; border-bottom: 1px solid color-mix(in srgb, var(--dsr-border) 70%, transparent); text-align: right; font-size: 12px; font-variant-numeric: tabular-nums; color: var(--dsr-text-2); white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
.dsr-table tr:last-child td { border-bottom: none; }
.dsr-table tbody tr { transition: background .12s ease; }
.dsr-table tbody tr:hover { background: var(--dsr-hover); }
.dsr-table .stock-cell { display: flex; align-items: center; gap: 8px; min-width: 0; text-align: left; }
.dsr-table .stock-cell .dsr-name { display: block; }
.dsr-table .stock-cell b { font-size: 12px; }
.dsr-table .dsr-rank { width: 20px; text-align: center; font-size: 10px; }
.dsr-table .dsr-rank.medal { color: var(--dsr-amber); font-weight: 700; }
.dsr-table td .dsr-tag { margin-left: 4px; vertical-align: middle; }
.dsr-empty-result { padding: 56px 20px; border: 1px dashed var(--dsr-border); border-radius: 14px; text-align: center; }
.dsr-empty-result h3 { margin: 0 0 6px; font-size: 16px; font-weight: 600; }
.dsr-empty-result p { margin: 0 0 16px; color: var(--dsr-text-3); font-size: 12px; }

.dsr-cards-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(260px, 1fr)); gap: 10px; }
.dsr-stock-card { border: 1px solid var(--dsr-border); border-radius: 11px; background: var(--dsr-panel); padding: 13px 13px 12px; min-width: 0; }
.dsr-stock-card-head { display: flex; align-items: flex-start; gap: 8px; }
.dsr-stock-card-head .dsr-rank { width: auto; text-align: left; }
.dsr-stock-card-head b { display: block; font-size: 13px; font-weight: 620; }
.dsr-stock-card-head .dsr-code { display: block; margin-top: 2px; }
.dsr-stock-card-head .dsr-pct { margin-left: auto; font-size: 14px; }
.dsr-stock-spark { margin: 10px 0 8px; height: 26px; display: flex; align-items: center; }
.dsr-stock-spark { display: block; width: 100%; height: 26px; overflow: hidden; }
.dsr-stock-spark svg { width: 100%; height: 100%; }
.dsr-metrics { display: flex; flex-wrap: wrap; gap: 5px 10px; }
.dsr-metric { display: flex; align-items: baseline; gap: 4px; font-size: 10px; color: var(--dsr-text-3); }
.dsr-metric strong { font-size: 11px; color: var(--dsr-text-2); font-weight: 550; font-variant-numeric: tabular-nums; }
.dsr-stock-tags { margin-top: 9px; display: flex; flex-wrap: wrap; gap: 4px; }

.dsr-podium {
  display: grid;
  grid-template-columns: minmax(0, 1fr) minmax(0, 1.12fr) minmax(0, 1fr);
  align-items: end;
  gap: 10px;
  padding: 22px 12px 6px;
}
.dsr-podium-card {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 3px;
  min-height: 96px;
  padding: 12px 10px 10px;
  border: 1px solid var(--fk-border);
  border-radius: 10px 10px 4px 4px;
  background: color-mix(in srgb, var(--fk-card) 88%, var(--dsr-text) 4%);
  text-align: center;
}
.dsr-podium-card.podium-1 {
  order: 2;
  min-height: 118px;
  border-color: color-mix(in srgb, #f5b942 48%, var(--fk-border));
  background: linear-gradient(180deg, rgba(245, 185, 66, .14), color-mix(in srgb, var(--fk-card) 88%, var(--dsr-text) 4%) 58%);
}
.dsr-podium-card.podium-2 { order: 1; border-color: color-mix(in srgb, #c7d2de 42%, var(--fk-border)); }
.dsr-podium-card.podium-3 { order: 3; border-color: color-mix(in srgb, #c78b62 42%, var(--fk-border)); }
.dsr-podium-rank {
  position: absolute;
  top: -10px;
  left: 50%;
  transform: translateX(-50%);
  width: 24px;
  height: 24px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border: 1px solid var(--fk-border-light);
  border-radius: 50%;
  background: var(--fk-elevated);
  color: var(--fk-heading);
  font-family: "JetBrains Mono", ui-monospace, monospace;
  font-size: 12px;
  font-weight: 700;
}
.dsr-podium-card.podium-1 .dsr-podium-rank { background: #f5b942; border-color: #f5b942; color: #201703; }
.dsr-podium-card b { max-width: 100%; overflow: hidden; white-space: nowrap; text-overflow: ellipsis; font-size: 13px; }
.dsr-podium-value { margin-top: 2px; color: var(--fk-muted); font-size: 10px; font-variant-numeric: tabular-nums; }

.dsr-bars { display: flex; flex-direction: column; gap: 5px; }
.dsr-bar-row { display: grid; grid-template-columns: 28px 150px minmax(80px, 1fr) 86px; align-items: center; gap: 10px; height: 31px; }
.dsr-bar-label { display: flex; align-items: baseline; gap: 7px; min-width: 0; }
.dsr-bar-label b { font-size: 12px; font-weight: 560; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
.dsr-bar-track { height: 7px; border-radius: 4px; overflow: hidden; }
.dsr-bar-value { text-align: right; font-size: 11px; color: var(--dsr-text-2); font-variant-numeric: tabular-nums; }
.dsr-bar-row .dsr-pct { font-size: 11px; width: 64px; text-align: right; }

.dsr-groups { display: flex; flex-direction: column; gap: 18px; }
.dsr-group { border: 1px solid var(--dsr-border); border-radius: 12px; overflow: hidden; background: var(--dsr-panel); }
.dsr-group-head { display: flex; align-items: center; gap: 8px; padding: 10px 14px; background: color-mix(in srgb, var(--dsr-text) 4%, transparent); border-bottom: 1px solid var(--dsr-border); }
.dsr-group-head h3 { margin: 0; font-size: 12px; font-weight: 600; }
.dsr-group-head .dsr-muted { margin-left: auto; font-size: 10px; }
.dsr-group-rows { display: grid; grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); }
.dsr-group-row { display: grid; grid-template-columns: 22px minmax(0,1fr) 64px 74px; gap: 7px; align-items: center; padding: 8px 14px; border-bottom: 1px solid color-mix(in srgb, var(--dsr-border) 55%, transparent); }
.dsr-group-row:last-child { border-bottom: none; }

/* 编辑器 */
.dsr-editor { height: 100%; display: flex; flex-direction: column; background: var(--dsr-bg); }
.dsr-editor-head { height: 60px; flex: 0 0 60px; display: flex; align-items: center; gap: 10px; padding: 0 20px; border-bottom: 1px solid var(--dsr-border); }
.dsr-editor-head h1 { margin: 0; font-size: 16px; font-weight: 630; }
.dsr-editor-head .dsr-muted { font-size: 11px; }
.dsr-editor-body { flex: 1 1 auto; overflow: auto; display: grid; grid-template-columns: minmax(0, 1fr) 340px; gap: 0; }
.dsr-form { padding: 22px 24px 30px; display: flex; flex-direction: column; gap: 22px; min-width: 0; }
.dsr-form-section { display: flex; flex-direction: column; gap: 10px; }
.dsr-section-title { display: flex; align-items: baseline; gap: 8px; }
.dsr-section-title h2 { margin: 0; font-size: 13px; font-weight: 620; }
.dsr-section-title .dsr-muted { font-size: 10px; }
.dsr-form-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; }
.dsr-form-grid.three { grid-template-columns: 1.2fr .8fr .8fr; }
.dsr-templates { display: flex; flex-wrap: wrap; gap: 6px; }
.dsr-templates .dsr-template-chip { height: 25px; font-size: 10px; }

.dsr-cond-list { display: flex; flex-direction: column; gap: 7px; }
.dsr-cond-row { display: flex; gap: 7px; align-items: flex-start; padding: 8px 9px; border: 1px solid var(--dsr-border); border-radius: 10px; background: color-mix(in srgb, var(--dsr-panel) 75%, transparent); }
.dsr-cond-label { flex: 0 0 112px; font-size: 11px; color: var(--dsr-text-2); line-height: 1.4; padding-top: 8px; }
.dsr-cond-controls { flex: 1 1 auto; display: flex; flex-wrap: wrap; align-items: center; gap: 6px; min-width: 0; }
.dsr-cond-op { flex: 0 0 62px; height: 30px; padding: 0 6px; border-radius: 7px; border: 1px solid var(--dsr-border); background: var(--dsr-panel-2); color: var(--dsr-text-2); font: inherit; font-size: 11px; }
.dsr-num { width: 82px; height: 30px; padding: 0 8px; border: 1px solid var(--dsr-border); border-radius: 7px; background: var(--dsr-bg); color: var(--dsr-text); font: inherit; font-size: 12px; font-variant-numeric: tabular-nums; outline: none; }
.dsr-num:focus { border-color: color-mix(in srgb, var(--dsr-text) 35%, var(--dsr-border)); }
.dsr-unit { flex: 0 0 auto; font-size: 10px; color: var(--dsr-text-3); min-width: 16px; }
.dsr-between-sep { font-size: 10px; color: var(--dsr-text-3); }
.dsr-seg { display: inline-flex; padding: 2px; border: 1px solid var(--dsr-border); border-radius: 8px; }
.dsr-seg button { height: 24px; padding: 0 10px; border: none; border-radius: 6px; background: transparent; color: var(--dsr-text-3); font: inherit; font-size: 10px; cursor: pointer; }
.dsr-seg button.active { background: color-mix(in srgb, var(--dsr-text) 10%, transparent); color: var(--dsr-text); }
.dsr-negate { height: 25px; padding: 0 7px; border: 1px solid transparent; border-radius: 6px; background: transparent; color: var(--dsr-text-3); font: inherit; font-size: 10px; cursor: pointer; white-space: nowrap; }
.dsr-negate:hover { background: var(--dsr-hover); color: var(--dsr-text-2); }
.dsr-negate.on { border-color: rgba(224,85,85,.25); color: #e98484; background: rgba(224,85,85,.07); }
.dsr-remove { width: 25px; height: 25px; flex: 0 0 25px; border: none; border-radius: 6px; background: transparent; color: var(--dsr-text-3); cursor: pointer; display: inline-flex; align-items: center; justify-content: center; }
.dsr-remove:hover { background: rgba(224,85,85,.08); color: #e98484; }
.dsr-add-cond { height: 34px; border: 1px dashed color-mix(in srgb, var(--dsr-text) 18%, transparent); border-radius: 9px; background: transparent; color: var(--dsr-text-3); font: inherit; font-size: 11px; cursor: pointer; display: flex; align-items: center; justify-content: center; gap: 6px; }
.dsr-add-cond:hover { border-color: color-mix(in srgb, var(--dsr-text) 32%, transparent); color: var(--dsr-text-2); background: color-mix(in srgb, var(--dsr-text) 2%, transparent); }
.dsr-cond-empty { padding: 18px; border: 1px dashed var(--dsr-border); border-radius: 10px; text-align: center; color: var(--dsr-text-3); font-size: 11px; line-height: 1.7; }

.dsr-popover { display: flex; flex-direction: column; gap: 6px; }
.dsr-popover-panel {
  width: 100%; max-height: 300px; display: flex; flex-direction: column;
  border: 1px solid var(--dsr-border); border-radius: 11px;
  background: var(--dsr-panel-2); box-shadow: 0 18px 50px rgba(0,0,0,.4);
  overflow: hidden;
}
.dsr-pop-search { flex: 0 0 auto; padding: 8px; border-bottom: 1px solid var(--dsr-border); }
.dsr-pop-search .dsr-input { height: 30px; font-size: 11px; }
.dsr-pop-list { overflow: auto; padding: 5px; }
.dsr-pop-item { display: flex; align-items: center; gap: 8px; width: 100%; min-height: 30px; padding: 5px 7px; border: none; border-radius: 6px; background: transparent; color: var(--dsr-text-2); font: inherit; font-size: 11px; text-align: left; cursor: pointer; }
.dsr-pop-item:hover { background: var(--dsr-hover); }
.dsr-pop-item.disabled { color: var(--dsr-text-3); background: transparent; cursor: not-allowed; }
.dsr-pop-item.selected { background: color-mix(in srgb, var(--dsr-text) 8%, transparent); color: var(--dsr-text); }
.dsr-pop-item .dsr-check { width: 14px; height: 14px; flex: 0 0 14px; border: 1px solid var(--dsr-border); border-radius: 4px; display: inline-flex; align-items: center; justify-content: center; }
.dsr-pop-item.selected .dsr-check { background: var(--dsr-text); border-color: var(--dsr-text); color: var(--dsr-bg); }
.dsr-pop-item small { margin-left: auto; color: var(--dsr-text-3); font-size: 9px; }
.dsr-pop-foot { flex: 0 0 auto; padding: 7px 8px; border-top: 1px solid var(--dsr-border); display: flex; justify-content: space-between; align-items: center; }
.dsr-board-trigger { height: 30px; max-width: 100%; padding: 0 9px; border: 1px solid var(--dsr-border); border-radius: 7px; background: var(--dsr-bg); color: var(--dsr-text-2); font: inherit; font-size: 11px; cursor: pointer; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
.dsr-board-trigger:hover { border-color: color-mix(in srgb, var(--dsr-text) 30%, var(--dsr-border)); }

.dsr-picker-modal {
  flex: 1 1 auto; min-height: 0; overflow: auto;
  display: flex; align-items: flex-start; justify-content: center;
  padding: 20px; background: transparent;
}
.dsr-picker { width: min(760px, 94vw); max-height: min(680px, 86vh); display: flex; flex-direction: column; border: 1px solid var(--dsr-border); border-radius: 16px; background: var(--dsr-panel); box-shadow: 0 30px 90px rgba(0,0,0,.45); overflow: hidden; }
.dsr-picker-head { padding: 14px 16px; border-bottom: 1px solid var(--dsr-border); display: flex; align-items: center; gap: 10px; }
.dsr-picker-head h2 { margin: 0; font-size: 14px; font-weight: 620; }
.dsr-picker-head .dsr-icon-btn { margin-left: auto; }
.dsr-picker-body { overflow: auto; padding: 12px 14px 18px; }
.dsr-picker-group { margin-bottom: 16px; }
.dsr-picker-group h3 { margin: 0 0 7px; font-size: 11px; color: var(--dsr-text-3); font-weight: 500; }
.dsr-picker-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(170px, 1fr)); gap: 5px; }
.dsr-picker-item { min-height: 44px; padding: 7px 9px; border: 1px solid var(--dsr-border); border-radius: 8px; background: transparent; color: var(--dsr-text-2); font: inherit; text-align: left; cursor: pointer; display: flex; flex-direction: column; gap: 2px; }
.dsr-picker-item:hover { background: var(--dsr-hover); border-color: color-mix(in srgb, var(--dsr-text) 22%, var(--dsr-border)); }
.dsr-picker-item b { font-size: 11px; font-weight: 560; }
.dsr-picker-item small { color: var(--dsr-text-3); font-size: 9px; }
.dsr-picker-item:disabled { color: var(--dsr-text-3); border-color: var(--dsr-border); background: transparent; cursor: not-allowed; }

.dsr-preview { border-left: 1px solid var(--dsr-border); background: color-mix(in srgb, var(--dsr-panel) 45%, transparent); padding: 20px 16px; display: flex; flex-direction: column; gap: 10px; overflow: auto; }
.dsr-preview-head { display: flex; align-items: baseline; gap: 7px; }
.dsr-preview-head h2 { margin: 0; font-size: 13px; font-weight: 600; }
.dsr-preview-head .dsr-muted { margin-left: auto; font-size: 10px; }
.dsr-preview-stat { display: flex; align-items: baseline; gap: 6px; padding: 10px 12px; border-radius: 9px; background: color-mix(in srgb, var(--dsr-text) 5%, transparent); }
.dsr-preview-stat strong { font-size: 23px; line-height: 1; font-variant-numeric: tabular-nums; }
.dsr-preview-stat span { font-size: 10px; color: var(--dsr-text-3); }
.dsr-preview-list { display: flex; flex-direction: column; }
.dsr-preview-row { display: grid; grid-template-columns: 18px minmax(0,1fr) 58px 66px; gap: 6px; align-items: center; height: 31px; padding: 0 4px; border-bottom: 1px solid color-mix(in srgb, var(--dsr-border) 60%, transparent); font-size: 10px; }
.dsr-preview-row:last-child { border-bottom: none; }
.dsr-preview-row b { font-size: 11px; font-weight: 560; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
.dsr-preview-hint { padding: 10px 11px; border-radius: 8px; background: color-mix(in srgb, var(--dsr-text) 4%, transparent); color: var(--dsr-text-3); font-size: 10px; line-height: 1.7; }
.dsr-editor-footer { flex: 0 0 62px; height: 62px; border-top: 1px solid var(--dsr-border); background: color-mix(in srgb, var(--dsr-bg) 92%, transparent); display: flex; align-items: center; gap: 9px; padding: 0 22px; }
.dsr-editor-footer .dsr-error { margin-right: auto; max-width: 56%; }
.dsr-editor-footer .dsr-spacer { margin-right: auto; }

.dsr-columns { display: flex; flex-wrap: wrap; gap: 5px; }
.dsr-col-chip { height: 27px; padding: 0 9px; border: 1px solid var(--dsr-border); border-radius: 7px; background: transparent; color: var(--dsr-text-3); font: inherit; font-size: 10px; cursor: pointer; }
.dsr-col-chip:hover { border-color: color-mix(in srgb, var(--dsr-text) 26%, var(--dsr-border)); color: var(--dsr-text-2); }
.dsr-col-chip.on { background: color-mix(in srgb, var(--dsr-text) 9%, transparent); color: var(--dsr-text); border-color: color-mix(in srgb, var(--dsr-text) 22%, var(--dsr-border)); }
.dsr-col-chip:disabled { color: color-mix(in srgb, var(--dsr-text-3) 65%, transparent); border-color: var(--dsr-border); cursor: not-allowed; }
.dsr-accent-row { display: flex; gap: 7px; }
.dsr-swatch { width: 24px; height: 24px; border-radius: 7px; border: 2px solid transparent; cursor: pointer; padding: 0; background: var(--swatch); }
.dsr-swatch.on { border-color: color-mix(in srgb, var(--dsr-text) 55%, transparent); }
.dsr-name-input { max-width: 320px; }

/* 设置 */
.dsr-settings { display: flex; flex-direction: column; gap: 18px; }
.dsr-settings-block { border: 1px solid var(--dsr-border); border-radius: 13px; background: var(--dsr-panel); overflow: hidden; }
.dsr-settings-head { padding: 14px 16px; border-bottom: 1px solid var(--dsr-border); display: flex; align-items: center; gap: 8px; }
.dsr-settings-head h2 { margin: 0; font-size: 13px; font-weight: 620; }
.dsr-settings-head .dsr-chip { margin-left: auto; }
.dsr-settings-body { padding: 16px; display: flex; flex-direction: column; gap: 12px; }
.dsr-setting-row { display: flex; align-items: center; gap: 12px; }
.dsr-setting-row .dsr-label { flex: 0 0 120px; }
.dsr-setting-value { flex: 1 1 auto; font-size: 12px; color: var(--dsr-text-2); }
.dsr-facts { display: grid; grid-template-columns: repeat(auto-fill, minmax(170px, 1fr)); gap: 8px; }
.dsr-fact { padding: 11px 12px; border-radius: 9px; background: color-mix(in srgb, var(--dsr-text) 4%, transparent); }
.dsr-fact b { display: block; font-size: 12px; font-weight: 600; }
.dsr-fact span { display: block; margin-top: 3px; color: var(--dsr-text-3); font-size: 10px; line-height: 1.6; }
.dsr-key-form { display: flex; flex-direction: column; gap: 8px; max-width: 440px; }
.dsr-danger-zone { display: flex; align-items: center; gap: 10px; }
.dsr-danger-zone .dsr-muted { flex: 1 1 auto; }

@media (max-width: 980px) {
  .dsr-setup-card { grid-template-columns: 1fr; }
  .dsr-setup-visual { min-height: 360px; border-right: none; border-bottom: 1px solid var(--dsr-border); padding: 32px 28px; }
  .dsr-setup-form { padding: 30px 28px; }
  .dsr-editor-body { grid-template-columns: 1fr; }
  .dsr-preview { border-left: none; border-top: 1px solid var(--dsr-border); }
  .dsr-form-grid { grid-template-columns: 1fr; }
  .dsr-form-grid.three { grid-template-columns: 1fr 1fr; }
  .dsr-cond-row { flex-wrap: wrap; }
  .dsr-cond-label { flex-basis: 100%; }
}

@media (max-width: 720px) {
  .dsr-topbar { padding: 0 12px; gap: 8px; }
  .dsr-brand-sub { display: none; }
  .dsr-status { display: none; }
  .dsr-page { padding: 20px 12px 36px; }
  .dsr-wall-grid { grid-template-columns: 1fr; }
  .dsr-wall-head { align-items: center; }
  .dsr-focus-actions .dsr-btn span { display: none; }
  .dsr-focus-actions .dsr-btn { width: 32px; padding: 0; }
  .dsr-table th:nth-child(2), .dsr-table td:nth-child(2) { width: 130px; }
  .dsr-table td, .dsr-table th { padding: 0 8px; }
  .dsr-bar-row { grid-template-columns: 20px 92px 1fr 62px; gap: 7px; }
  .dsr-form { padding: 16px 14px 24px; }
  .dsr-editor-head { padding: 0 12px; }
  .dsr-editor-footer { padding: 0 12px; }
}

/* ─────────────────────────────────────────────────────────────
   方块量化 · 榜单页视觉层
   与 frontend/src/index.css 的 zinc + indigo 设计系统对齐：
   背景 #09090b / 卡片 #18181b / 表头 #27272a / 主色 #6366f1
   ───────────────────────────────────────────────────────────── */
.dsr-panel {
  --dsr-bg: #09090b;
  --dsr-panel: #18181b;
  --dsr-panel-2: #27272a;
  --dsr-text: #e4e4e7;
  --dsr-text-2: #a1a1aa;
  --dsr-text-3: #93939e;
  --dsr-border: #27272a;
  --dsr-hover: rgba(39, 39, 42, .6);
  --dsr-up: #ef4444;
  --dsr-down: #10b981;
  --dsr-amber: #f59e0b;
  --dsr-radius: 8px;
  --dsr-accent: #6366f1;
  --fk-heading: #f4f4f5;
  --fk-muted: #a1a1aa;
  --fk-dim: #93939e;
  --fk-border: #27272a;
  --fk-border-light: #3f3f46;
  --fk-card: #18181b;
  --fk-elevated: #27272a;
  --fk-hover: rgba(39, 39, 42, .6);
  --fk-accent: #6366f1;
  --fk-accent-hover: #4f46e5;
  --fk-accent-muted: #818cf8;
  --fk-accent-glow: rgba(99, 102, 241, .1);
  --fk-rise: #ef4444;
  --fk-fall: #10b981;
  --fk-warning: #f59e0b;
  position: relative;
  height: 100%;
  min-height: 0;
  display: flex;
  flex-direction: column;
  background: var(--dsr-bg);
  color: var(--dsr-text);
  font-family: Inter, system-ui, -apple-system, "PingFang SC", "Microsoft YaHei", sans-serif;
  font-size: 12px;
  -webkit-font-smoothing: antialiased;
  overflow: hidden;
}
.dsr-panel *, .dsr-panel *::before, .dsr-panel *::after { box-sizing: border-box; }
.dsr-panel .dsr-main {
  flex: 1 1 auto;
  min-height: 0;
  overflow: auto;
  overscroll-behavior: contain;
  background: var(--dsr-bg);
  scrollbar-width: thin;
  scrollbar-color: var(--fk-border-light) transparent;
}
.dsr-panel ::-webkit-scrollbar { width: 5px; height: 5px; }
.dsr-panel ::-webkit-scrollbar-track { background: transparent; }
.dsr-panel ::-webkit-scrollbar-thumb { background: var(--fk-border-light); border-radius: 3px; }
.dsr-panel ::-webkit-scrollbar-thumb:hover { background: var(--fk-dim); }
.dsr-panel ::-webkit-scrollbar-corner { background: transparent; }

.dsr-panel .dsr-page {
  width: 100%;
  max-width: 1440px;
  min-height: 100%;
  margin: 0 auto;
  padding: 12px 16px 32px;
}
.dsr-panel .dsr-page.narrow { max-width: 1040px; }
.dsr-panel .fk-focus-page { display: flex; flex-direction: column; min-height: 100%; }
.dsr-panel .fk-focus-page .dsr-result-card { min-height: 0; flex: 1 1 auto; }
.dsr-panel .fk-focus-page .dsr-result-card .dsr-table-wrap { flex: 1 1 auto; min-height: 0; }
.dsr-panel .fk-focus-page .dsr-result-card .dsr-table { height: auto; }

/* 页头 / 页签 / 工具条 */
.fk-page-head {
  display: flex;
  align-items: center;
  gap: 8px;
  min-height: 30px;
  margin-bottom: 2px;
}
.fk-page-title { display: flex; align-items: center; gap: 8px; min-width: 0; }
.fk-page-title h1 {
  margin: 0;
  color: var(--fk-heading);
  font-size: 20px;
  font-weight: 600;
  letter-spacing: -.015em;
  line-height: 1.2;
}
.fk-page-count {
  margin-left: auto;
  color: var(--fk-dim);
  font-size: 12px;
  white-space: nowrap;
}
.fk-guide-chip {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  height: 22px;
  padding: 0 7px;
  border: 1px solid transparent;
  border-radius: 4px;
  background: #1f1f24;
  color: var(--fk-dim);
  font: inherit;
  font-size: 11px;
  cursor: pointer;
  white-space: nowrap;
  transition: background .15s ease, color .15s ease;
}
.fk-guide-chip:hover, .fk-guide-chip.on { background: var(--fk-elevated); color: var(--dsr-text); }
.fk-guide-box {
  margin: 6px 0 2px;
  padding: 9px 12px;
  border: 1px solid var(--fk-border);
  border-radius: 6px;
  background: #141416;
  color: var(--fk-muted);
  font-size: 11px;
  line-height: 1.75;
}
.fk-guide-box p { margin: 0; display: flex; gap: 7px; }
.fk-guide-box b { color: var(--fk-accent-muted); font-weight: 500; }
.fk-tabs {
  display: flex;
  align-items: center;
  gap: 22px;
  height: 34px;
  margin: 2px 0 10px;
  border-bottom: 1px solid var(--fk-border);
}
.fk-tab {
  position: relative;
  height: 34px;
  padding: 0 1px;
  border: none;
  background: transparent;
  color: var(--fk-dim);
  font: inherit;
  font-size: 12px;
  cursor: pointer;
}
.fk-tab.active { color: var(--fk-accent-muted); font-weight: 500; }
.fk-tab.active::after {
  content: "";
  position: absolute;
  left: 0;
  right: 0;
  bottom: -1px;
  height: 2px;
  background: var(--fk-accent);
}
.fk-toolbar {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 10px;
  margin-bottom: 12px;
}
.fk-toolbar-item {
  display: inline-flex;
  align-items: center;
  gap: 5px;
  color: var(--fk-muted);
  font-size: 12px;
  white-space: nowrap;
}
.fk-toolbar-item svg { color: var(--fk-dim); }
.fk-toolbar-item b { color: var(--dsr-text); font-weight: 400; font-size: 12px; }
.fk-toolbar-dim { color: var(--fk-dim); font-size: 11px; white-space: nowrap; }
.fk-mono { font-family: "JetBrains Mono", ui-monospace, SFMono-Regular, Menlo, monospace; font-variant-numeric: tabular-nums; }
.fk-market {
  display: inline-flex;
  align-items: center;
  gap: 5px;
  color: var(--fk-dim);
  font-size: 11px;
  white-space: nowrap;
}
.fk-market-dot { width: 5px; height: 5px; border-radius: 50%; background: var(--fk-border-light); }
.fk-market.live { color: var(--fk-muted); }
.fk-market.live .fk-market-dot { background: var(--fk-rise); box-shadow: 0 0 0 3px rgba(239, 68, 68, .1); }
.fk-toolbar-actions { margin-left: auto; display: flex; align-items: center; gap: 8px; }

/* 按钮 / 输入，统一成主项目尺寸 */
.dsr-panel .dsr-btn, .fk-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  height: 32px;
  padding: 0 12px;
  border: 1px solid var(--fk-border);
  border-radius: 6px;
  background: #18181b;
  color: var(--fk-muted);
  font: inherit;
  font-size: 12px;
  font-weight: 400;
  white-space: nowrap;
  cursor: pointer;
  transition: background .15s ease, border-color .15s ease, color .15s ease;
}
.dsr-panel .dsr-btn:hover, .fk-btn:hover { background: var(--fk-elevated); color: var(--dsr-text); }
.dsr-panel .dsr-btn:disabled, .fk-btn:disabled { opacity: .45; cursor: not-allowed; }
.dsr-panel .dsr-btn.primary, .fk-btn.primary {
  border-color: var(--fk-accent);
  background: var(--fk-accent);
  color: #fff;
}
.dsr-panel .dsr-btn.primary:hover, .fk-btn.primary:hover { border-color: var(--fk-accent-hover); background: var(--fk-accent-hover); }
.dsr-panel .dsr-btn.small, .fk-btn.small { height: 26px; padding: 0 8px; font-size: 11px; border-radius: 4px; }
.dsr-panel .dsr-btn.quiet { border-color: transparent; background: transparent; color: var(--fk-dim); }
.dsr-panel .dsr-btn.quiet:hover { background: var(--fk-elevated); color: var(--dsr-text); }
.dsr-panel .dsr-btn.danger { border-color: rgba(239, 68, 68, .25); color: #f87171; background: transparent; }
.dsr-panel .dsr-btn.danger:hover { background: rgba(239, 68, 68, .08); }
.fk-icon-btn {
  width: 32px;
  height: 32px;
  padding: 0;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border: none;
  border-radius: 5px;
  background: transparent;
  color: var(--fk-dim);
  cursor: pointer;
  transition: background .15s ease, color .15s ease;
}
.fk-icon-btn:hover { background: var(--fk-elevated); color: var(--dsr-text); }
.dsr-panel .dsr-icon-btn {
  width: 30px;
  height: 30px;
  border-radius: 5px;
  color: var(--fk-dim);
}
.dsr-panel .dsr-icon-btn:hover { background: var(--fk-elevated); color: var(--dsr-text); }
.dsr-panel .dsr-input, .dsr-panel .dsr-select, .dsr-panel .dsr-textarea {
  height: 32px;
  padding: 0 8px;
  border: 1px solid var(--fk-border);
  border-radius: 6px;
  background: var(--fk-elevated);
  color: var(--dsr-text);
  font-size: 12px;
}
.dsr-panel .dsr-input:focus, .dsr-panel .dsr-select:focus { border-color: var(--fk-accent); box-shadow: 0 0 0 1px var(--fk-accent); }
.dsr-panel .dsr-label { font-size: 11px; color: var(--fk-dim); }

/* 空榜单：与主项目空状态同一张面板、同一套模板卡 */
.fk-empty-wall {
  margin-top: 2px;
  padding: 26px 24px 22px;
  border: 1px solid var(--fk-border);
  border-radius: 8px;
  background: var(--fk-card);
}
.fk-empty-head { text-align: center; margin-bottom: 20px; }
.fk-empty-head h2 { margin: 0 0 4px; color: var(--fk-heading); font-size: 16px; font-weight: 600; }
.fk-empty-head p { max-width: 540px; margin: 0 auto; color: var(--fk-dim); font-size: 12px; line-height: 1.7; }
.fk-template-grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 8px;
  max-width: 1120px;
  margin: 0 auto;
}
.fk-template-card {
  min-height: 84px;
  padding: 11px 12px;
  text-align: left;
  border: 1px solid var(--fk-border);
  border-radius: 6px;
  background: #1c1c20;
  cursor: pointer;
  transition: background .15s ease, border-color .15s ease;
}
.fk-template-card:hover { border-color: var(--fk-border-light); background: #232328; }
.fk-template-title { display: flex; align-items: center; gap: 6px; color: var(--fk-muted); font-size: 13px; font-weight: 500; }
.fk-template-title i { width: 6px; height: 6px; border-radius: 50%; background: var(--tpl-accent); flex: 0 0 6px; }
.fk-template-desc { display: block; margin-top: 6px; color: var(--fk-dim); font-size: 11px; line-height: 1.65; }
.fk-empty-action { display: flex; margin: 22px auto 0; }

/* 榜单名标签条：与主项目墙面上方的一排榜单标签一致 */
.fk-name-strip {
  display: flex;
  align-items: center;
  gap: 4px;
  margin: -2px 0 10px;
  padding-bottom: 1px;
  border-bottom: 1px solid var(--fk-border);
  overflow-x: auto;
  scrollbar-width: none;
}
.fk-name-strip::-webkit-scrollbar { display: none; }
.fk-name-tab {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  height: 30px;
  padding: 0 10px;
  border: none;
  border-bottom: 2px solid transparent;
  margin-bottom: -1px;
  background: transparent;
  color: var(--fk-muted);
  font: inherit;
  font-size: 12px;
  white-space: nowrap;
  cursor: pointer;
  transition: color .15s ease, border-color .15s ease;
}
.fk-name-tab:hover { color: var(--dsr-text); }
.fk-name-tab.active { color: var(--fk-accent-muted); border-bottom-color: var(--fk-accent); }
.fk-name-tab i { width: 6px; height: 6px; border-radius: 50%; flex: 0 0 6px; }
.fk-name-tab .fk-mono { color: var(--fk-dim); font-size: 10px; }

/* 榜单墙卡片 */
.fk-wall-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  align-items: start;
  gap: 16px;
}
.fk-card {
  position: relative;
  display: flex;
  flex-direction: column;
  min-width: 0;
  height: 420px;
  border: 1px solid var(--fk-border);
  border-radius: 8px;
  background: var(--fk-card);
  overflow: hidden;
  transition: border-color .15s ease;
}
.fk-card:hover { border-color: var(--fk-border-light); }
.fk-card-accent { width: 4px; align-self: stretch; border-radius: 999px; flex: 0 0 4px; }
.fk-card-head { display: flex; align-items: flex-start; gap: 8px; padding: 10px 12px 8px; flex: 0 0 auto; }
.fk-card-title-box { min-width: 0; flex: 1 1 auto; }
.fk-card-name {
  display: block;
  max-width: 100%;
  padding: 0;
  border: none;
  background: transparent;
  color: var(--fk-heading);
  font: inherit;
  font-size: 14px;
  font-weight: 600;
  line-height: 1.35;
  text-align: left;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  cursor: pointer;
  transition: color .15s ease;
}
.fk-card-name:hover { color: var(--fk-accent-muted); }
.fk-card-meta { display: flex; align-items: baseline; gap: 8px; margin-top: 2px; color: var(--fk-dim); font-size: 10px; }
.fk-card-hit { display: inline-flex; align-items: baseline; gap: 3px; }
.fk-card-hit b { color: var(--dsr-accent); font-family: "JetBrains Mono", ui-monospace, monospace; font-size: 18px; font-weight: 600; line-height: 1; }
.fk-card-hit span { color: var(--fk-dim); font-size: 10px; }
.fk-card-meta .fk-mono { color: var(--fk-dim); font-size: 10px; }
.fk-card-actions { display: flex; align-items: center; gap: 0; margin-left: auto; flex: 0 0 auto; opacity: 1; }
.fk-card-action {
  width: 24px;
  height: 24px;
  padding: 0;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border: none;
  border-radius: 4px;
  background: transparent;
  color: var(--fk-dim);
  cursor: pointer;
  transition: background .15s ease, color .15s ease;
}
.fk-card-action:hover { background: var(--fk-elevated); color: var(--dsr-text); }
.fk-card-action.danger:hover { background: rgba(239, 68, 68, .1); color: #f87171; }
.fk-card-action.danger-text { color: #f87171; }
.fk-card-table { padding: 0 8px 8px; flex: 1 1 auto; min-height: 92px; overflow-x: auto; scrollbar-width: none; }
.fk-card-table::-webkit-scrollbar { display: none; }
.fk-card-row {
  display: grid;
  grid-template-columns: 24px 58px minmax(0, 1fr) 54px 64px 70px;
  align-items: center;
  gap: 6px;
  height: 28px;
  padding: 0 4px;
  border-radius: 3px;
  min-width: 0;
}
.fk-card-row:hover { background: var(--fk-hover); }
.fk-rank-badge {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 20px;
  height: 20px;
  border-radius: 3px;
  background: var(--fk-elevated);
  color: var(--fk-dim);
  font: 600 11px/1 "JetBrains Mono", ui-monospace, monospace;
}
.fk-rank-badge.podium-1 { background: rgba(245, 158, 11, .15); color: #fcd34d; }
.fk-rank-badge.podium-2 { background: var(--fk-elevated); color: var(--dsr-text); }
.fk-rank-badge.podium-3 { background: rgba(249, 115, 22, .14); color: #fb923c; }
.fk-code { color: var(--fk-accent-muted); font-size: 11px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
.fk-name { color: var(--dsr-text); font-size: 12px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
.fk-price { color: var(--fk-muted); font-size: 11px; text-align: right; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
.fk-pct {
  display: inline-flex;
  align-items: center;
  justify-content: flex-end;
  min-width: 52px;
  height: 20px;
  padding: 0 4px;
  border-radius: 2px;
  font-size: 11px;
  font-weight: 500;
  text-align: right;
  white-space: nowrap;
}
.fk-pct.up { color: var(--fk-rise); background: rgba(239, 68, 68, .1); }
.fk-pct.down { color: var(--fk-fall); background: rgba(16, 185, 129, .1); }
.fk-pct.flat { color: var(--fk-dim); background: var(--fk-elevated); }
.fk-card-value { color: var(--fk-dim); font-size: 10px; text-align: right; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
.fk-card-empty { padding: 18px 16px 20px; color: var(--fk-dim); font-size: 11px; line-height: 1.7; display: flex; flex-direction: column; align-items: flex-start; gap: 10px; }
.fk-card-error { padding: 10px 14px 14px; display: flex; flex-direction: column; gap: 8px; }
.fk-card-skeleton { padding: 10px 16px 16px; display: flex; flex-direction: column; gap: 7px; }
.fk-card-foot { margin-top: auto; padding: 8px 12px; border-top: 1px solid var(--fk-border); flex: 0 0 auto; }
.fk-card-conditions { display: flex; flex-wrap: wrap; gap: 4px; min-height: 18px; }
.fk-cond {
  max-width: 170px;
  height: 18px;
  padding: 0 5px;
  border: none;
  border-radius: 3px;
  background: color-mix(in srgb, var(--dsr-accent) 13%, transparent);
  color: var(--dsr-accent);
  font: inherit;
  font-size: 10px;
  line-height: 18px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  cursor: pointer;
}
.fk-cond:hover { filter: brightness(1.15); }
.fk-cond.negate { color: var(--fk-dim); background: var(--fk-elevated); text-decoration: line-through; }
.fk-cond.more { color: var(--fk-dim); background: var(--fk-elevated); }
.fk-card-nocond { color: var(--fk-dim); font-size: 10px; }
.fk-card-sub { display: flex; align-items: center; gap: 8px; margin-top: 5px; color: var(--fk-dim); font-size: 10px; white-space: nowrap; min-width: 0; }
.fk-card-sub .fk-truncate { min-width: 0; flex: 1 1 auto; overflow: hidden; text-overflow: ellipsis; }
.fk-card-sub > span { flex: 0 0 auto; }
.fk-card-more { padding: 0; border: none; background: transparent; color: var(--fk-accent-muted); font: inherit; font-size: 10px; cursor: pointer; white-space: nowrap; }
.fk-card-more:hover { color: var(--dsr-text); }
.fk-card-view { margin-left: auto; flex: 0 0 auto; color: var(--fk-dim); }
.fk-new-card {
  min-height: 180px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 7px;
  border: 1px dashed var(--fk-border-light);
  border-radius: 6px;
  background: transparent;
  color: var(--fk-dim);
  font: inherit;
  font-size: 12px;
  cursor: pointer;
  transition: border-color .15s ease, background .15s ease, color .15s ease;
}
.fk-new-card:hover { border-color: var(--fk-accent); background: rgba(99, 102, 241, .04); color: var(--fk-muted); }

/* 聚焦页：与主项目同一套卡片头 + 密集表格 */
.dsr-panel .dsr-focus-head {
  display: block;
  margin-bottom: 12px;
  padding: 12px 16px;
  border: 1px solid var(--fk-border);
  border-radius: 8px;
  background: var(--fk-card);
  flex: 0 0 auto;
}
.fk-focus-bar { display: flex; flex-wrap: wrap; align-items: center; gap: 8px; min-width: 0; }
.fk-back {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  height: 24px;
  padding: 0;
  border: none;
  background: transparent;
  color: var(--fk-dim);
  font: inherit;
  font-size: 12px;
  cursor: pointer;
  white-space: nowrap;
  transition: color .15s ease;
}
.fk-back:hover { color: var(--fk-accent-muted); }
.fk-focus-accent { width: 4px; height: 20px; border-radius: 999px; flex: 0 0 4px; }
.fk-focus-bar h1 { margin: 0; color: var(--fk-heading); font-size: 16px; font-weight: 600; line-height: 1.3; white-space: nowrap; }
.fk-focus-hit { display: inline-flex; align-items: baseline; gap: 3px; margin-left: 2px; }
.fk-focus-hit b { color: var(--fk-accent-muted); font-size: 20px; font-weight: 600; line-height: 1; }
.fk-focus-hit span { color: var(--fk-dim); font-size: 11px; }
.fk-focus-date { color: var(--fk-dim); font-size: 11px; white-space: nowrap; }
.fk-focus-actions { display: flex; align-items: center; flex-wrap: wrap; gap: 6px; margin-left: auto; }
.fk-focus-actions .fk-btn { height: 28px; padding: 0 9px; font-size: 11px; border-radius: 4px; }
.fk-focus-actions .fk-btn.danger { color: #f87171; border-color: transparent; background: var(--fk-elevated); }
.fk-focus-actions .fk-btn.danger:hover { background: rgba(239, 68, 68, .1); }
.dsr-panel .dsr-conditions { display: flex; flex-wrap: wrap; gap: 5px; margin: 9px 0 0; }
.dsr-panel .dsr-cond-chip {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  height: 22px;
  padding: 0 6px 0 7px;
  border-radius: 4px;
  background: color-mix(in srgb, var(--fk-accent) 13%, transparent);
  color: var(--fk-accent-muted);
  font-size: 11px;
  white-space: nowrap;
}
.dsr-panel .dsr-cond-chip.exclude { color: var(--fk-dim); background: var(--fk-elevated); text-decoration: line-through; }
.fk-cond-remove {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 14px;
  height: 14px;
  padding: 0;
  border: none;
  border-radius: 2px;
  background: transparent;
  color: var(--fk-dim);
  cursor: pointer;
}
.fk-cond-remove:hover { background: rgba(239, 68, 68, .12); color: #f87171; }
.dsr-panel .dsr-result-card {
  display: flex;
  flex-direction: column;
  flex: 1 1 auto;
  min-height: 240px;
  padding: 12px;
  border: 1px solid var(--fk-border);
  border-radius: 8px;
  background: var(--fk-card);
}
.fk-result-foot {
  display: flex;
  align-items: center;
  gap: 14px;
  margin-top: 10px;
  color: var(--fk-dim);
  font-size: 11px;
}
.fk-result-foot .fk-mono { margin-left: auto; }
.dsr-panel .dsr-view-tabs { display: none; }
.dsr-panel .dsr-table-wrap {
  border: 1px solid var(--fk-border);
  border-radius: 6px;
  overflow: auto;
  background: var(--fk-card);
}
.dsr-panel .dsr-table { width: 100%; border-collapse: separate; border-spacing: 0; table-layout: fixed; }
.dsr-panel .dsr-table th {
  height: 32px;
  padding: 0 8px;
  border-bottom: 1px solid var(--fk-border);
  background: var(--fk-elevated);
  color: var(--fk-muted);
  font-size: 11px;
  font-weight: 500;
  letter-spacing: 0;
  text-align: right;
  white-space: nowrap;
}
.dsr-panel .dsr-table th:first-child, .dsr-panel .dsr-table td:first-child { width: 42px; text-align: center; }
.dsr-panel .dsr-table th:nth-child(2), .dsr-panel .dsr-table td:nth-child(2) { width: 84px; text-align: left; }
.dsr-panel .dsr-table th:nth-child(3), .dsr-panel .dsr-table td:nth-child(3) { width: 108px; text-align: left; }
.dsr-panel .dsr-table th:nth-child(4), .dsr-panel .dsr-table td:nth-child(4) { width: 68px; }
.dsr-panel .dsr-table th:nth-child(5), .dsr-panel .dsr-table td:nth-child(5) { width: 76px; }
.dsr-panel .dsr-table th:nth-child(6), .dsr-panel .dsr-table td:nth-child(6) { width: 54px; }
.dsr-panel .dsr-table th:last-child { width: 92px; text-align: left; }
.dsr-panel .dsr-table td:last-child { text-align: left; }
.dsr-panel .dsr-table td {
  height: 32px;
  padding: 0 8px;
  border-bottom: 1px solid #1f1f24;
  color: var(--dsr-text);
  font-size: 12px;
  text-align: right;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  font-variant-numeric: tabular-nums;
}
.dsr-panel .dsr-table tbody tr:hover { background: var(--fk-hover); }
.dsr-panel .dsr-table tr:last-child td { border-bottom: none; }
.dsr-panel .dsr-table .fk-cell-name { text-align: left; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
.dsr-panel .dsr-table .fk-cell-name .fk-name { display: inline-block; vertical-align: middle; }
.dsr-panel .dsr-table .fk-cell-name .dsr-tag { display: inline-flex; vertical-align: middle; }
.dsr-panel .dsr-table .fk-cell-code, .dsr-panel .dsr-table .fk-cell-tags { text-align: left; }
.dsr-panel .dsr-table .fk-cell-tags { white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
.dsr-panel .dsr-table .fk-cell-tags .dsr-tag { margin-left: 0; }
.dsr-panel .dsr-table .fk-name { font-size: 13px; font-weight: 500; color: var(--dsr-text); overflow: hidden; text-overflow: ellipsis; }
.dsr-panel .dsr-table .fk-code { font-size: 12px; }
.dsr-panel .dsr-table .dsr-pct {
  display: inline-flex;
  justify-content: flex-end;
  min-width: 56px;
  height: 21px;
  padding: 0 5px;
  border-radius: 2px;
  font-size: 12px;
  line-height: 21px;
}
.dsr-panel .dsr-table .dsr-pct.up { background: rgba(239, 68, 68, .1); }
.dsr-panel .dsr-table .dsr-pct.down { background: rgba(16, 185, 129, .1); }
.dsr-panel .dsr-table .dsr-pct.flat { background: var(--fk-elevated); }
.dsr-panel .dsr-table .dsr-tag.tag-up { color: #fbbf24; background: rgba(245, 158, 11, .12); }
.dsr-panel .dsr-table .dsr-tag.tag-burst { color: #fb923c; background: rgba(249, 115, 22, .12); }
.dsr-panel .dsr-table .dsr-rank { width: 20px; text-align: center; font-size: 10px; color: var(--fk-dim); }
.dsr-panel .dsr-table .dsr-rank.medal { color: var(--fk-warning); font-weight: 600; }
.dsr-panel .dsr-table td .dsr-tag {
  display: inline-flex;
  align-items: center;
  height: 17px;
  margin-left: 3px;
  padding: 0 5px;
  border-radius: 3px;
  background: var(--fk-elevated);
  color: var(--fk-dim);
  font-size: 10px;
}
.dsr-panel .dsr-pct { font-family: "JetBrains Mono", ui-monospace, monospace; font-weight: 500; }
.dsr-panel .dsr-pct.up { color: var(--fk-rise); }
.dsr-panel .dsr-pct.down { color: var(--fk-fall); }
.dsr-panel .dsr-pct.flat { color: var(--fk-dim); }
.dsr-panel .dsr-empty-result { padding: 46px 20px; border: 1px dashed var(--fk-border); border-radius: 6px; text-align: center; background: var(--fk-card); }
.dsr-panel .dsr-empty-result h3 { margin: 0 0 5px; color: var(--fk-heading); font-size: 15px; font-weight: 500; }
.dsr-panel .dsr-empty-result p { margin: 0 0 14px; color: var(--fk-dim); font-size: 12px; }
.dsr-panel .dsr-hint { font-size: 11px; color: var(--fk-dim); line-height: 1.65; }
.dsr-panel .dsr-muted { color: var(--fk-dim); font-size: 11px; line-height: 1.6; }
.dsr-panel .dsr-error {
  padding: 8px 10px;
  border: 1px solid rgba(239, 68, 68, .2);
  border-radius: 6px;
  background: rgba(239, 68, 68, .08);
  color: #fca5a5;
  font-size: 11px;
  line-height: 1.6;
}
.dsr-panel .dsr-code { color: var(--fk-dim); font-size: 10px; }

/* 其他视图保持同一套密度 */
.dsr-panel .dsr-cards-grid { grid-template-columns: repeat(auto-fill, minmax(240px, 1fr)); gap: 8px; }
.dsr-panel .dsr-stock-card { border-radius: 6px; background: var(--fk-card); padding: 11px; }
.dsr-panel .dsr-stock-card-head b { font-size: 12px; }
.dsr-panel .dsr-stock-card-head .dsr-pct { font-size: 13px; }
.dsr-panel .dsr-metric strong { font-family: "JetBrains Mono", ui-monospace, monospace; }
.dsr-panel .dsr-groups { gap: 12px; }
.dsr-panel .dsr-group { border-radius: 6px; background: var(--fk-card); }
.dsr-panel .dsr-group-head { padding: 8px 12px; }
.dsr-panel .dsr-bar-row { height: 28px; }

/* 编辑页与设置页，收成主项目的圆角和字号 */
.dsr-editor-backdrop {
  position: absolute;
  inset: 0;
  z-index: 20;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 22px;
  background: rgba(0, 0, 0, .58);
  backdrop-filter: blur(2px);
}
.dsr-panel .dsr-editor {
  width: min(896px, 100%);
  height: min(780px, calc(100% - 8px));
  max-height: calc(100% - 8px);
  border: 1px solid var(--fk-border-light);
  border-radius: 12px;
  background: var(--fk-card);
  box-shadow: 0 24px 80px rgba(0, 0, 0, .55);
  overflow: hidden;
}
.dsr-panel .dsr-editor-head { height: 52px; flex: 0 0 52px; padding: 0 16px; gap: 8px; border-bottom-color: var(--fk-border); }
.dsr-panel .dsr-editor-head h1 { font-size: 15px; font-weight: 600; color: var(--fk-heading); }
.dsr-panel .dsr-editor-head .fk-editor-mark { color: var(--fk-accent-muted); flex: 0 0 auto; }
.dsr-panel .dsr-editor-head .dsr-icon-btn { margin-left: auto; }
.dsr-panel .dsr-editor-head .dsr-muted { font-size: 11px; color: var(--fk-dim); }
.dsr-panel .dsr-editor-body { flex: 1 1 auto; min-height: 0; grid-template-columns: minmax(0, 1fr) 300px; width: 100%; overflow: hidden; }
.dsr-panel .dsr-form { padding: 18px 20px 24px; gap: 18px; overflow: auto; min-height: 0; }
.dsr-panel .dsr-form-section { gap: 8px; }
.dsr-panel .dsr-section-title h2 { font-size: 12px; font-weight: 500; color: var(--fk-muted); }
.dsr-panel .dsr-form-title { font-size: 16px; font-weight: 600; }
.dsr-panel .dsr-cond-row { border-radius: 6px; padding: 7px 8px; background: #141416; }
.dsr-panel .dsr-cond-label { flex-basis: 104px; font-size: 11px; color: var(--fk-muted); padding-top: 7px; }
.dsr-panel .dsr-cond-op, .dsr-panel .dsr-num, .dsr-panel .dsr-board-trigger { height: 28px; border-radius: 4px; font-size: 11px; }
.dsr-panel .dsr-add-cond { height: 30px; border-radius: 4px; font-size: 11px; }
.dsr-panel .dsr-cond-empty { border-radius: 6px; font-size: 11px; }
.dsr-panel .dsr-preview { border-left-color: var(--fk-border); background: #141416; padding: 16px 14px; }
.dsr-panel .dsr-preview-head h2 { font-size: 12px; font-weight: 500; }
.dsr-panel .dsr-preview-stat { border-radius: 4px; background: var(--fk-elevated); }
.dsr-panel .dsr-preview-stat strong { font-size: 20px; }
.dsr-panel .dsr-preview-row { height: 28px; font-size: 10px; border-bottom-color: #1f1f24; }
.dsr-panel .dsr-editor-footer { height: 52px; flex-basis: 52px; padding: 0 16px; border-top-color: var(--fk-border); background: var(--dsr-bg); }
/* 条件选择器：搜索 + 常用 14 个先露，进阶条件按需展开 */
.dsr-panel .dsr-picker-modal {
  position: absolute;
  inset: 0;
  z-index: 40;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 24px;
  background: rgba(0, 0, 0, .55);
}
.dsr-panel .dsr-picker { width: min(720px, 94vw); max-height: min(660px, 86vh); border-radius: 12px; background: var(--fk-card); }
.dsr-panel .dsr-picker-head { padding: 11px 14px; }
.dsr-panel .dsr-picker-head h2 { font-size: 13px; font-weight: 500; color: var(--fk-heading); }
.dsr-picker-count { color: var(--fk-dim); font-size: 11px; }
.dsr-panel .dsr-picker-head .dsr-icon-btn { width: 24px; height: 24px; }
.dsr-panel .dsr-picker-body { padding: 12px 14px 16px; }
.dsr-picker-search { margin-bottom: 12px; }
.dsr-panel .dsr-picker-group { margin-bottom: 13px; }
.dsr-panel .dsr-picker-group h3 { margin: 0 0 6px; font-size: 11px; font-weight: 400; color: var(--fk-dim); }
.dsr-panel .dsr-picker-grid { grid-template-columns: repeat(auto-fill, minmax(180px, 1fr)); gap: 5px; }
.dsr-panel .dsr-picker-item {
  min-height: 40px;
  padding: 6px 8px;
  border: 1px solid var(--fk-border);
  border-radius: 4px;
  background: #1c1c20;
  color: var(--dsr-text);
}
.dsr-panel .dsr-picker-item:hover { border-color: var(--fk-border-light); background: #232328; }
.dsr-panel .dsr-picker-item b { font-size: 11px; font-weight: 500; }
.dsr-panel .dsr-picker-item small { font-size: 10px; color: var(--fk-dim); }
.fk-picker-more {
  display: flex;
  align-items: center;
  gap: 6px;
  width: 100%;
  height: 32px;
  margin: -2px 0 12px;
  padding: 0 9px;
  border: 1px dashed var(--fk-border-light);
  border-radius: 4px;
  background: transparent;
  color: var(--fk-muted);
  font: inherit;
  font-size: 11px;
  cursor: pointer;
}
.fk-picker-more:hover { border-color: var(--fk-accent); color: var(--dsr-text); }
.fk-picker-more > span { color: var(--fk-dim); }
.fk-picker-more > small { margin-left: auto; color: var(--fk-dim); }
.fk-picker-more svg { transition: transform .15s ease; }
.fk-picker-more[aria-expanded="true"] svg { transform: rotate(180deg); }
.dsr-panel .fk-picker-advanced { padding-left: 10px; border-left: 1px solid var(--fk-border); }
.dsr-panel .dsr-settings { max-width: 900px; margin: 0 auto; gap: 12px; }.dsr-panel .dsr-settings-block { border-radius: 6px; background: var(--fk-card); }
.dsr-panel .dsr-settings-head { padding: 11px 14px; }
.dsr-panel .dsr-settings-head h2 { font-size: 12px; font-weight: 500; }
.dsr-panel .dsr-settings-body { padding: 14px; gap: 10px; }
.dsr-panel .dsr-fact { border-radius: 4px; background: #1f1f24; }
.dsr-panel .dsr-setup { max-width: 940px; padding: 36px 20px; }
.dsr-panel .dsr-setup-card { border-radius: 8px; box-shadow: none; }
.dsr-panel .dsr-setup-visual { padding: 30px 32px; min-height: 430px; background: var(--fk-card); }
.dsr-panel .dsr-setup-title { font-size: 24px; font-weight: 600; }
.dsr-panel .dsr-setup-form { padding: 30px 30px; }
.dsr-panel .dsr-form-sub { margin-bottom: 18px; font-size: 12px; }
.dsr-panel .dsr-input, .dsr-panel .dsr-select { height: 32px; }
.dsr-panel .dsr-setup-actions .dsr-btn.primary { height: 34px; font-size: 12px; border-radius: 6px; }
.dsr-panel .dsr-privacy { border-radius: 4px; }

/* 浮层提示（面板内的轻提示，不挡操作） */
.dsr-toast-float {
  position: absolute;
  top: 10px;
  right: 14px;
  z-index: 30;
  height: 26px;
  padding: 0 10px;
  display: inline-flex;
  align-items: center;
  border: 1px solid var(--fk-border-light);
  border-radius: 4px;
  background: var(--fk-elevated);
  color: var(--dsr-text);
  font-size: 11px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, .35);
}

@media (max-width: 980px) {
  .fk-template-grid { grid-template-columns: repeat(2, minmax(0, 1fr)); }
  .fk-wall-grid { grid-template-columns: repeat(auto-fill, minmax(300px, 1fr)); }
  .dsr-panel .dsr-editor-body { grid-template-columns: 1fr; }
}
@media (max-width: 720px) {
  .dsr-panel .dsr-page { padding: 10px 10px 24px; }
  .fk-template-grid { grid-template-columns: 1fr; }
  .fk-wall-grid { columns: 1; }
  .fk-toolbar-actions { width: 100%; margin-left: 0; }
  .fk-toolbar-actions .fk-btn { flex: 1 1 auto; }
  .dsr-panel .dsr-focus-actions .dsr-btn span { display: none; }
  .dsr-panel .dsr-focus-actions .dsr-btn { width: 30px; padding: 0; }
}

/* 主项目同款三段式配置弹窗 */
.dsr-panel .fk-editor-modal {
  width: min(896px, 100%);
  max-height: min(900px, calc(100% - 8px));
  height: min(860px, calc(100% - 8px));
  display: flex;
  flex-direction: column;
  overflow: hidden;
  border: 1px solid var(--fk-border-light);
  border-radius: 12px;
  background: var(--fk-card);
  box-shadow: 0 24px 80px rgba(0, 0, 0, .55);
}
.fk-editor-head {
  flex: 0 0 62px;
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 0 18px;
  border-bottom: 1px solid var(--fk-border);
}
.fk-editor-head h1 { margin: 0; font-size: 15px; font-weight: 620; }
.fk-editor-head .dsr-muted { display: block; margin-top: 2px; font-size: 10px; }
.fk-editor-head > div { min-width: 0; }
.fk-editor-head .dsr-icon-btn { margin-left: auto; }
.fk-editor-mark {
  width: 30px;
  height: 30px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: 7px;
  background: var(--fk-accent-glow);
  color: var(--fk-accent);
  flex: 0 0 30px;
}
.fk-editor-scroll { flex: 1 1 auto; min-height: 0; overflow: auto; padding: 14px 18px 18px; }
.fk-editor-section { padding: 0 0 16px; margin-bottom: 14px; border-bottom: 1px solid var(--fk-border); }
.fk-editor-section:last-child { border-bottom: none; margin-bottom: 0; }
.fk-editor-label { margin-bottom: 8px; color: var(--fk-dim); font-size: 11px; letter-spacing: .02em; }
.fk-editor-label-row { display: flex; align-items: center; gap: 8px; }
.fk-editor-label-row .fk-editor-label { margin-bottom: 8px; flex: 1 1 auto; }
.fk-basic-row { display: flex; align-items: flex-start; gap: 12px; flex-wrap: wrap; }
.fk-basic-name { display: flex; flex-direction: column; gap: 4px; width: 180px; }
.fk-basic-note { display: flex; flex-direction: column; gap: 4px; flex: 1 1 220px; min-width: 160px; }
.fk-basic-accent { display: flex; flex-direction: column; gap: 4px; }
.fk-basic-row .dsr-name-input { width: 100%; }
.fk-template-row { margin-bottom: 10px; }
.fk-cond-toolbar { display: flex; align-items: center; gap: 10px; margin-bottom: 9px; }
.fk-cond-toolbar .dsr-muted { flex: 1 1 auto; font-size: 10px; }
.fk-cond-hit { margin-left: 6px; color: var(--fk-dim); font-size: 9px; font-variant-numeric: tabular-nums; }
.fk-cond-hit.zero { color: var(--fk-fall); }
.fk-display-row { display: flex; align-items: flex-end; gap: 12px; flex-wrap: wrap; }
.fk-display-field { display: flex; flex-direction: column; gap: 4px; min-width: 126px; }
.fk-view-grid { display: grid; grid-template-columns: repeat(5, minmax(0, 1fr)); gap: 7px; margin: 12px 0 10px; }
.fk-view-option {
  height: 62px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 7px;
  border: 1px solid var(--fk-border);
  border-radius: 7px;
  background: #1d1d21;
  color: var(--fk-muted);
  font: inherit;
  cursor: pointer;
  transition: border-color .15s ease, background .15s ease, color .15s ease;
}
.fk-view-option b { font-size: 11px; font-weight: 500; }
.fk-view-option:hover { border-color: var(--fk-border-light); color: var(--dsr-text); }
.fk-view-option.on { border-color: var(--fk-accent); background: var(--fk-accent-glow); color: var(--fk-accent); }
.fk-group-row { display: flex; align-items: center; gap: 8px; flex-wrap: wrap; margin-bottom: 10px; }
.fk-columns-field { margin-top: 4px; }
.fk-editor-previewbar {
  flex: 0 0 46px;
  min-height: 46px;
  display: flex;
  align-items: center;
  padding: 0 18px;
  border-top: 1px solid var(--fk-border);
  background: #19191d;
}
.fk-preview-content { display: flex; align-items: center; gap: 12px; width: 100%; min-width: 0; font-size: 11px; }
.fk-preview-count { flex: 0 0 auto; color: var(--fk-muted); }
.fk-preview-count b { margin-right: 3px; color: var(--fk-accent); font-size: 17px; font-variant-numeric: tabular-nums; }
.fk-preview-names { flex: 1 1 auto; min-width: 0; overflow: hidden; white-space: nowrap; text-overflow: ellipsis; color: var(--dsr-text); }
.fk-preview-meta { flex: 0 0 auto; color: var(--fk-dim); font-variant-numeric: tabular-nums; }
.fk-preview-loading { display: inline-flex; align-items: center; gap: 8px; color: var(--fk-muted); font-size: 11px; }
.fk-preview-empty { color: var(--fk-dim); font-size: 11px; }
.fk-editor-footer {
  flex: 0 0 58px;
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 0 18px;
  border-top: 1px solid var(--fk-border);
  background: var(--fk-card);
}
.fk-editor-footer .dsr-spacer { flex: 1 1 auto; }
.fk-editor-footer .dsr-error { margin-right: auto; max-width: 56%; }
.fk-editor-shortcut { margin-left: auto; margin-right: 4px; color: var(--fk-dim); font-size: 10px; }
.fk-editor-footer .dsr-btn { flex: 0 0 auto; }

/* 数据日 / 盘中预览标识 */
.fk-preview-chip {
  display: inline-flex;
  align-items: center;
  gap: 2px;
  height: 22px;
  padding: 0 7px;
  border: 1px solid var(--fk-border-light);
  border-radius: 4px;
  color: var(--fk-muted);
  font-size: 10px;
  white-space: nowrap;
}
.fk-preview-chip.live { border-color: rgba(245, 158, 11, .38); background: rgba(245, 158, 11, .1); color: #f5b544; }
.fk-focus-note { max-width: 280px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; color: var(--fk-dim); font-size: 10px; }
.fk-pager { display: inline-flex; align-items: center; gap: 6px; margin-left: auto; }
.fk-page-btn {
  height: 22px;
  padding: 0 7px;
  border: 1px solid var(--fk-border);
  border-radius: 4px;
  background: #1d1d21;
  color: var(--fk-muted);
  font: inherit;
  font-size: 10px;
  cursor: pointer;
}
.fk-page-btn:hover:not(:disabled) { border-color: var(--fk-border-light); color: var(--dsr-text); }
.fk-page-btn:disabled { opacity: .4; cursor: not-allowed; }
.fk-logic-chip {
  height: 23px;
  display: inline-flex;
  align-items: center;
  padding: 0 7px;
  border: 1px solid var(--fk-border-light);
  border-radius: 4px;
  color: var(--fk-muted);
  font-size: 10px;
}
.fk-logic-chip.or { border-color: rgba(14, 165, 233, .38); background: rgba(14, 165, 233, .1); color: #5cc8f5; }
.fk-source-list { display: flex; flex-direction: column; gap: 6px; }
.fk-source-row {
  display: flex;
  align-items: center;
  gap: 9px;
  padding: 8px 10px;
  border: 1px solid var(--fk-border);
  border-radius: 5px;
  background: #1d1d21;
}
.fk-source-row > div { flex: 1 1 auto; min-width: 0; display: flex; flex-direction: column; gap: 2px; }
.fk-source-row b { font-size: 11px; font-weight: 560; }
.fk-source-row span:not(.fk-source-dot):not(.fk-source-state) { color: var(--fk-dim); font-size: 9px; }
.fk-source-dot { width: 6px; height: 6px; flex: 0 0 6px; border-radius: 50%; background: var(--fk-warning); }
.fk-source-dot.ready { background: #35b37e; }
.fk-source-dot.pending { background: var(--fk-muted); }
.fk-source-dot.pending { background: #f5b544; }
.fk-source-dot.running { background: #5aa7ff; }
.fk-source-state { flex: 0 0 auto; padding: 2px 5px; border-radius: 3px; background: var(--fk-hover); color: var(--fk-muted); font-size: 9px; }
.fk-source-state.ready { color: #62d3a6; }
.fk-source-state.need_key { color: #f5b544; }
.fk-source-state.pending { color: #f5b544; }
.fk-source-state.running { color: #7bb8ff; }

.dsr-basic-progress { display: flex; flex-direction: column; gap: 5px; }
.dsr-basic-track { height: 6px; border-radius: 999px; background: var(--fk-hover); overflow: hidden; }
.dsr-basic-fill { height: 100%; border-radius: inherit; background: #5aa7ff; transition: width .3s ease; }
.dsr-basic-progress span { color: var(--fk-dim); font-size: 10px; }

/* 墙面卡片内嵌榜单看法 */
.fk-card-view-body { flex: 1 1 auto; min-height: 0; padding: 2px 10px 10px; overflow: hidden; }
.fk-card-view-body .dsr-table-wrap { max-height: 224px; }
.fk-card-view-body .dsr-cards-grid { grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 6px; }
.fk-card-view-body .dsr-stock-card { padding: 7px 9px; border-radius: 5px; }
.fk-card-view-body .dsr-stock-spark,
.fk-card-view-body .dsr-stock-tags { display: none; }
.fk-card-view-body .dsr-metrics { margin-top: 3px; gap: 2px 7px; font-size: 9px; flex-wrap: nowrap; overflow: hidden; }
.fk-card-view-body .dsr-metric:nth-child(n+3) { display: none; }
.fk-card-view-body .dsr-stock-card-head b { font-size: 11px; }
.fk-card-view-body .dsr-podium { padding: 12px 4px 2px; gap: 4px; }
.fk-card-view-body .dsr-podium-card { min-height: 74px; padding: 7px 6px; }
.fk-card-view-body .dsr-podium-card.podium-1 { min-height: 84px; }
.fk-card-view-body .dsr-podium-card b { font-size: 11px; }
.fk-card-view-body .dsr-bar-row { height: 21px; grid-template-columns: 18px 92px minmax(36px, 1fr) 48px; gap: 4px; }
.fk-card-view-body .dsr-bar-label .dsr-code { display: none; }
.fk-card-view-body .dsr-bar-value .dsr-pct { display: none; }
.fk-card-view-body .dsr-bars { gap: 3px; }
.fk-card-view-body .dsr-group-block { margin: 0 0 6px; }
.fk-card-view-body .dsr-groups { gap: 6px; }
.fk-card-view-body .dsr-group { border-radius: 5px; }
.fk-card-view-body .dsr-group-head { padding: 4px 8px; }
.fk-card-view-body .dsr-group-head h3 { font-size: 10px; }
.fk-card-view-body .dsr-group-row { grid-template-columns: 18px minmax(0,1fr) 54px 62px; gap: 4px; padding: 3px 8px; font-size: 10px; }
.fk-card-view-body .dsr-group-rows { grid-template-columns: repeat(2, minmax(0, 1fr)); }
.fk-card-view-body .dsr-group-row { grid-template-columns: 16px minmax(0,1fr) 50px; }
.fk-card-view-body .dsr-group-row .dsr-bar-value { display: none; }
.fk-card-view-body .dsr-chip-wall { gap: 4px; padding: 2px 0 0; }
.fk-card-view-body .dsr-chip-stock { min-height: 96px; padding: 7px 8px; }
.fk-preview-table { border: none; border-radius: 0; background: transparent; max-height: 224px; }
.fk-preview-table .dsr-table { table-layout: fixed; }
.fk-preview-table .dsr-table th, .fk-preview-table .dsr-table td { padding: 0 5px; }
.fk-preview-table .dsr-table th:nth-child(2), .fk-preview-table .dsr-table td:nth-child(2) { width: auto; text-align: left; }
.fk-preview-table .dsr-table th:nth-child(3), .fk-preview-table .dsr-table td:nth-child(3) { width: 66px; }
.fk-preview-table .dsr-table th:nth-child(4), .fk-preview-table .dsr-table td:nth-child(4) { width: 78px; }
.fk-preview-table .dsr-table td { height: 26px; font-size: 10px; }
.fk-preview-table .dsr-table th { height: 26px; font-size: 9px; }
.fk-preview-name { display: inline-block; max-width: 100%; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; color: var(--dsr-text); font-size: 11px; font-weight: 560; }
.fk-preview-table .fk-code { margin-left: 5px; color: var(--fk-dim); font-size: 9px; }
.dsr-panel .fk-editor-modal .dsr-swatch { width: 18px; height: 18px; border-radius: 50%; border-width: 2px; }
.dsr-panel .fk-editor-modal .dsr-swatch.on { box-shadow: 0 0 0 1px var(--fk-accent); border-color: #fff; }

/* 芯片墙 */
.dsr-chip-wall { display: grid; grid-template-columns: repeat(auto-fill, minmax(104px, 1fr)); gap: 6px; }
.dsr-chip-stock {
  position: relative;
  min-height: 60px;
  padding: 8px 9px;
  display: flex;
  flex-direction: column;
  gap: 2px;
  border: 1px solid var(--fk-border);
  border-radius: 5px;
  background: #1d1d21;
  overflow: hidden;
}
.dsr-chip-stock::before { content: ""; position: absolute; inset: 0 auto 0 0; width: 3px; background: var(--fk-border-light); opacity: .9; }
.dsr-chip-stock.up::before { background: var(--fk-rise); }
.dsr-chip-stock.down::before { background: var(--fk-fall); }
.dsr-chip-rank { position: absolute; top: 5px; right: 7px; color: var(--fk-dim); font-size: 9px; font-variant-numeric: tabular-nums; }
.dsr-chip-stock b { max-width: calc(100% - 22px); overflow: hidden; white-space: nowrap; text-overflow: ellipsis; font-size: 11px; font-weight: 560; }
.dsr-chip-code { color: var(--fk-dim); font-size: 9px; }
.dsr-chip-stock .dsr-pct { margin-top: auto; font-size: 13px; font-weight: 600; }
.dsr-chip-badge { align-self: flex-start; margin-top: 2px; padding: 1px 4px; border-radius: 3px; background: var(--fk-hover); color: var(--fk-muted); font-size: 8px; }
.dsr-chip-value { color: var(--fk-muted); font-size: 9px; font-variant-numeric: tabular-nums; }

@media (max-width: 760px) {
  .fk-view-grid { grid-template-columns: repeat(3, minmax(0, 1fr)); }
  .fk-editor-scroll { padding: 12px 12px 16px; }
  .fk-editor-head, .fk-editor-footer, .fk-editor-previewbar { padding-left: 12px; padding-right: 12px; }
  .fk-editor-shortcut { display: none; }
}
`;
		// src/client/ui/RankingPanel.tsx
		function draftOfConfig(config) {
			return {
				name: config.name,
				note: config.note,
				accent: config.accent,
				logic: config.logic,
				conditions: config.conditions,
				sortKey: config.sortKey,
				sortDir: config.sortDir,
				limit: config.limit,
				view: config.view,
				columns: config.columns,
				groupBy: config.groupBy
			};
		}
		function RankingPanel() {
			const [boot, setBoot] = (0, react.useState)(null);
			const [bootError, setBootError] = (0, react.useState)("");
			const [bootLoading, setBootLoading] = (0, react.useState)(false);
			const [wall, setWall] = (0, react.useState)(null);
			const [wallLoading, setWallLoading] = (0, react.useState)(false);
			const [wallError, setWallError] = (0, react.useState)("");
			const [screen, setScreen] = (0, react.useState)("wall");
			const [activeId, setActiveId] = (0, react.useState)(null);
			const [focusResult, setFocusResult] = (0, react.useState)(null);
			const [focusLoading, setFocusLoading] = (0, react.useState)(false);
			const [focusError, setFocusError] = (0, react.useState)("");
			const [editor, setEditor] = (0, react.useState)(null);
			const [busy, setBusy] = (0, react.useState)(false);
			const [toast, setToast] = (0, react.useState)("");
			(0, react.useEffect)(() => {
				const handler = (event) => {
					if (event.key !== "Escape") return;
					if (screen === "editor") return;
					if (screen === "settings") setScreen("wall");
					else if (screen === "focus") setScreen("wall");
				};
				window.addEventListener("keydown", handler);
				return () => window.removeEventListener("keydown", handler);
			}, [screen]);
			(0, react.useEffect)(() => {
				if (!toast) return;
				const timer = window.setTimeout(() => setToast(""), 2400);
				return () => window.clearTimeout(timer);
			}, [toast]);
			const loadBoot = (0, react.useCallback)(async () => {
				setBootLoading(true);
				setBootError("");
				try {
					const data = await api.bootstrap();
					setBoot(data);
					return data;
				} catch (issue) {
					setBootError(issue instanceof UiError ? issue.message : "本地服务暂时不可用");
					return null;
				} finally {
					setBootLoading(false);
				}
			}, []);
			const loadWall = (0, react.useCallback)(async (force) => {
				setWallLoading(true);
				setWallError("");
				try {
					const data = await api.wall(void 0, force);
					setWall(data);
				} catch (issue) {
					setWallError(issue instanceof UiError ? issue.message : "榜单暂时算不出来");
				} finally {
					setWallLoading(false);
				}
			}, []);
			(0, react.useEffect)(() => {
				loadBoot().then((data) => {
					if (data?.connection.configured) loadWall(false);
				});
			}, [loadBoot, loadWall]);
			async function openFocus(id) {
				if (!boot?.rankings.find((item) => item.id === id)) return;
				setActiveId(id);
				setScreen("focus");
				const cached = wall?.entries.find((entry) => entry.id === id)?.result ?? null;
				setFocusResult(cached);
				setFocusLoading(true);
				setFocusError("");
				try {
					const result = await api.evaluate(id, false);
					setFocusResult(result);
					setWall((current) => current ? {
						...current,
						entries: current.entries.map((entry) => entry.id === id ? {
							...entry,
							result
						} : entry)
					} : current);
				} catch (issue) {
					setFocusError(issue instanceof UiError ? issue.message : "这个榜单暂时算不出来");
				} finally {
					setFocusLoading(false);
				}
			}
			async function refreshFocus(force) {
				if (!activeId) return;
				setFocusLoading(true);
				setFocusError("");
				try {
					const result = await api.evaluate(activeId, force);
					setFocusResult(result);
					setWall((current) => current ? {
						...current,
						entries: current.entries.map((entry) => entry.id === activeId ? {
							...entry,
							result
						} : entry)
					} : current);
				} catch (issue) {
					setFocusError(issue instanceof UiError ? issue.message : "这个榜单暂时算不出来");
				} finally {
					setFocusLoading(false);
				}
			}
			function startNew(template) {
				const draft = template ? draftFromTemplate(template) : baseDraft();
				setEditor({ draft });
				setScreen("editor");
			}
			function editRanking(id) {
				const config = boot?.rankings.find((item) => item.id === id);
				if (!config) return;
				setEditor({
					id,
					draft: draftOfConfig(config)
				});
				setScreen("editor");
			}
			async function afterSaved(config, created) {
				setEditor(null);
				setScreen("wall");
				setToast(created ? `已创建「${config.name}」` : "榜单已保存");
				if ((await loadBoot())?.connection.configured) loadWall(false);
			}
			async function removeRanking(id) {
				setBusy(true);
				try {
					await api.remove(id);
					setToast("榜单已删除");
					if (screen === "focus" && activeId === id) {
						setScreen("wall");
						setActiveId(null);
					}
					if ((await loadBoot())?.connection.configured) loadWall(false);
				} catch (issue) {
					setToast(issue instanceof UiError ? issue.message : "删除没有成功");
				} finally {
					setBusy(false);
				}
			}
			async function duplicateRanking(id) {
				const config = boot?.rankings.find((item) => item.id === id);
				if (!config) return;
				setBusy(true);
				try {
					const draft = draftOfConfig(config);
					const copy = await api.create({
						...draft,
						name: `${config.name} 副本`
					});
					setToast(`已复制为「${copy.name}」`);
					if ((await loadBoot())?.connection.configured) loadWall(false);
				} catch (issue) {
					setToast(issue instanceof UiError ? issue.message : "复制没有成功");
				} finally {
					setBusy(false);
				}
			}
			async function removeCondition(key) {
				const config = boot?.rankings.find((item) => item.id === activeId);
				if (!config) return;
				if (config.conditions.length <= 1) {
					setToast("至少保留一个条件，要清空请在编辑里重建");
					return;
				}
				try {
					const updated = await api.update(config.id, { conditions: config.conditions.filter((clause) => clause.key !== key) });
					setBoot((current) => current ? {
						...current,
						rankings: current.rankings.map((item) => item.id === config.id ? updated : item)
					} : current);
					setFocusResult((current) => current ? {
						...current,
						ranking: updated
					} : current);
					setToast("已移除这个条件");
					refreshFocus(false);
				} catch (issue) {
					setToast(issue instanceof UiError ? issue.message : "条件没有保存成功");
				}
			}
			async function onConnected(message) {
				setToast(message);
				setScreen("wall");
				if ((await loadBoot())?.connection.configured) loadWall(false);
			}
			async function onSettingsChanged(message) {
				setToast(message);
				if (!(await loadBoot())?.connection.configured) {
					setScreen("wall");
					setWall(null);
				} else if (screen === "settings") {
					setScreen("wall");
					loadWall(false);
				}
			}
			const activeConfig = boot?.rankings.find((item) => item.id === activeId) ?? null;
			const phase = marketPhase();
			const dataDate = wall?.dataDate ?? null;
			const previewAt = wall?.previewAt ?? null;
			(0, react.useEffect)(() => {
				document.querySelector(".dsr-main")?.scrollTo({ top: 0 });
				window.scrollTo({ top: 0 });
			}, [screen, activeId]);
			return /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
				className: "dsr-panel",
				"aria-label": "方块榜单",
				children: [
					/* @__PURE__ */ (0, react_jsx_runtime.jsx)("style", { children: STYLES }),
					toast ? /* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
						className: "dsr-toast dsr-toast-float",
						children: toast
					}) : null,
					/* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
						className: "dsr-main",
						children: !boot ? /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
							className: "dsr-page narrow",
							children: [bootError ? /* @__PURE__ */ (0, react_jsx_runtime.jsx)(ErrorLine, { text: bootError }) : /* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
								style: {
									padding: 60,
									textAlign: "center"
								},
								children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)(Spinner, { label: "正在准备榜单…" })
							}), bootError ? /* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
								style: {
									marginTop: 14,
									textAlign: "center"
								},
								children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)("button", {
									type: "button",
									className: "dsr-btn",
									onClick: () => void loadBoot(),
									children: "重新加载"
								})
							}) : null]
						}) : !boot.connection.configured ? /* @__PURE__ */ (0, react_jsx_runtime.jsx)(SetupScreen, {
							onConnected: (message) => void onConnected(message),
							writable: boot.connection.writable
						}) : screen === "editor" && editor ? /* @__PURE__ */ (0, react_jsx_runtime.jsx)(EditorScreen, {
							...editor.id ? { id: editor.id } : {},
							initial: editor.draft,
							historyReady: wall?.historyReady ?? false,
							onCancel: () => {
								setEditor(null);
								setScreen("wall");
							},
							onSaved: (config, created) => void afterSaved(config, created)
						}) : screen === "settings" ? /* @__PURE__ */ (0, react_jsx_runtime.jsx)(SettingsScreen, {
							connection: boot.connection,
							sources: boot.sources,
							basic: boot.basic,
							onBack: () => setScreen("wall"),
							onChanged: (message) => void onSettingsChanged(message)
						}) : screen === "focus" && activeConfig ? /* @__PURE__ */ (0, react_jsx_runtime.jsx)(FocusScreen, {
							config: activeConfig,
							result: focusResult,
							loading: focusLoading,
							error: focusError,
							onBack: () => setScreen("wall"),
							onEdit: () => editRanking(activeConfig.id),
							onDuplicate: () => void duplicateRanking(activeConfig.id),
							onDelete: () => void removeRanking(activeConfig.id),
							onRemoveCondition: (key) => void removeCondition(key),
							onRefresh: () => void refreshFocus(true)
						}) : /* @__PURE__ */ (0, react_jsx_runtime.jsx)(WallScreen, {
							rankings: boot.rankings,
							wall,
							loading: wallLoading || bootLoading,
							error: wallError,
							busy,
							phaseLabel: phase.label,
							phaseLive: phase.live && isTodayShanghai(previewAt),
							dataDate,
							previewAt,
							onFocus: (id) => void openFocus(id),
							onEdit: editRanking,
							onDuplicate: (id) => void duplicateRanking(id),
							onDelete: (id) => void removeRanking(id),
							onNew: () => startNew(),
							onRefresh: () => void loadWall(true),
							onSettings: () => setScreen("settings"),
							onTemplate: (template) => startNew(template)
						})
					})
				]
			});
		}
		// src/client/index.tsx
		const inject = ["slots"];
		const PANEL_ID = "fangkuai-ranking";
		/** 侧栏图标：与应用图标同源，选中态跟随主题。 */
		function PanelIcon({ size }) {
			return /* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
				style: {
					display: "inline-flex",
					opacity: 1
				},
				children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)(BrandMark, { size })
			});
		}
		/** 浏览器半边：注册为 DSH 的全局面板，页面内容按方块量化的榜单页复刻。 */
		function apply(ctx) {
			ctx.slots.inject("sidebar.panellist", () => ctx.slots.register({
				name: "sidebar.panellist",
				id: PANEL_ID,
				order: 20,
				label: "方块榜单"
			}, PanelIcon));
			ctx.slots.inject("main", () => ctx.slots.register({
				name: "main",
				key: PANEL_ID
			}, RankingPanel));
		}
		exports.apply = apply;
		exports.inject = inject;
		return module.exports;
	}
});

//# sourceMappingURL=client.js.map