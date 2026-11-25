import { defineConfig, type UserConfig } from 'tsdown'

// 宿主半边：Node 库。只把 DSH 运行时提供的包留作外部依赖，其余（Parquet 读取）
// 全部内联，保证插件目录独立安装后无需再解析第三方依赖。
const lib: UserConfig = {
  entry: ['src/index.ts'],
  outDir: 'lib',
  format: ['esm'],
  platform: 'node' as const,
  target: 'es2022',
  dts: true,
  clean: true,
  fixedExtension: false,
  external: [/^@deepseek-ai\//, /^node:/],
  noExternal: [/^hyparquet/, /^hyparquet-compressors/, /^fzstd/, /^hysnappy/],
  sourcemap: false,
}

// 浏览器半边：DSH 的浏览器模块表只提供 react，其他一律内联。
const CLIENT_EXTERNALS = ['react', 'react/jsx-runtime']
const client: UserConfig = {
  name: 'dsh-fangkuai-ranking/client',
  entry: { client: 'src/client/index.tsx' },
  outDir: 'lib',
  format: 'cjs' as const,
  platform: 'browser' as const,
  dts: false,
  clean: false,
  sourcemap: true,
  external: CLIENT_EXTERNALS,
  noExternal: (id: string) => !CLIENT_EXTERNALS.includes(id),
  define: {
    'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV ?? 'production'),
  },
  outputOptions: {
    entryFileNames: 'client.js',
    banner: 'window.__ModuleLoader__.load({ id: "dsh-fangkuai-ranking", factory: (require) => {',
    footer: 'return module.exports; } });',
    intro: 'var module = { exports: {} }; var exports = module.exports;',
  },
}

export default defineConfig([lib, client])

