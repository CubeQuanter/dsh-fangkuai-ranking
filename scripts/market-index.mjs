import { copyFileSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = dirname(dirname(fileURLToPath(import.meta.url)));
const pkg = JSON.parse(readFileSync(join(root, "package.json"), "utf8"));
const timestamp = Number(process.env.PUBLISH_TIMESTAMP ?? Math.floor(Date.now() / 1000));
const sourceType = process.env.MARKET_SOURCE === "git" ? "git" : "npm";
const commit = process.env.GIT_COMMIT ?? "";

if (sourceType === "git" && !/^[0-9a-f]{40}$/i.test(commit)) {
  throw new Error("GIT_COMMIT must be a 40-character SHA when MARKET_SOURCE=git");
}

const source =
  sourceType === "git"
    ? {
        type: "git",
        url: "https://github.com/CubeQuanter/dsh-fangkuai-ranking.git",
        commit: commit.toLowerCase(),
      }
    : { type: "npm" };

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
      author: "lenscape",
      homepage: pkg.homepage,
      repository: {
        url: "https://github.com/CubeQuanter/dsh-fangkuai-ranking",
      },
      versions: [
        {
          version: pkg.version,
          publishTimestamp: timestamp,
          source,
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
