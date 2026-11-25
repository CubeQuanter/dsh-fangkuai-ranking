import { copyFileSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = dirname(dirname(fileURLToPath(import.meta.url)));
const pkg = JSON.parse(readFileSync(join(root, "package.json"), "utf8"));
const timestamp = Number(process.env.PUBLISH_TIMESTAMP ?? Math.floor(Date.now() / 1000));

const index = {
  format: 1,
  title: {
    zh: "方块榜单插件索引",
    en: "FangKuai Ranking plugin index",
  },
  description: {
    zh: "方块榜单及其后续版本的安装索引。",
    en: "Install index for FangKuai Ranking and its releases.",
  },
  plugins: [
    {
      name: pkg.name,
      title: {
        zh: "方块榜单",
        en: "FangKuai Ranking",
      },
      description: {
        zh: "在 DeepSeek Harness 中创建、保存和查看自己的 A 股选股榜单。",
        en: "Create, save, and browse personalized A-share ranking boards in DeepSeek Harness.",
      },
      icon: "icons/icon.svg",
      author: "sifan184",
      homepage: pkg.homepage,
      repository: {
        url: "https://github.com/sifan184/dsh-fangkuai-ranking",
      },
      versions: [
        {
          version: pkg.version,
          publishTimestamp: timestamp,
          source: {
            type: "npm",
          },
          engines: {
            dsh: pkg.engines.dsh,
          },
        },
      ],
    },
  ],
};

mkdirSync(join(root, "docs", "icons"), { recursive: true });
copyFileSync(join(root, "icon.svg"), join(root, "docs", "icons", "icon.svg"));
writeFileSync(join(root, "docs", "index.json"), `${JSON.stringify(index, null, 2)}\n`, "utf8");
console.log(`docs/index.json generated for ${pkg.name}@${pkg.version}`);
