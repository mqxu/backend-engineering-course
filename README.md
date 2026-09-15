# 后端工程化开发 · 教程站点

《后端工程化开发》课程配套的在线教程，内容为 Spring Boot 4.1 完整教程。用 VitePress 构建，
发布在 GitHub Pages 上。

站点地址：<https://mqxu.github.io/backend-engineering-course/>

## 环境

- Node.js 20.19 及以上（本机用的是 22.22.2 与 24.20.0，都能跑）
- npm 10 及以上
- 需要 Python 3 的只有内容同步脚本 `tools/build-site.py`，它只用标准库

## 常用命令

```bash
npm install        # 首次
npm run dev        # 本地开发，默认 http://localhost:5173
npm run build      # 构建到 docs/.vitepress/dist
npm run preview    # 预览构建产物，验证发布后的效果用这个
npm run sync       # 从教程正文源同步页面与侧边栏
./deploy.sh        # 构建并推送到 gh-pages 分支
```

## 目录结构

```
docs/                       站点内容（VitePress 的 srcDir）
├─ index.md                 首页
├─ guide/                   课程导学：课程导读、篇章地图
├─ project/                 案例工程一览
├─ ch00/ … ch11/            教程正文，一篇一个目录
│   ├─ index.md             本篇导学：官方章节、本篇导语、小节索引
│   └─ 01.md … NN.md        按二级标题切出来的小节页
├─ public/logo.svg          站点图标
└─ .vitepress/
    ├─ config.mts           站点配置：base、导航、搜索、Markdown 行为
    ├─ sidebar.mts          侧边栏，脚本生成，不要手改
    └─ theme/               主题样式
tools/build-site.py         正文源 → 站点的同步脚本
deploy.sh                   构建并发布
```

## 内容怎么维护

教程正文的写作源不在这个仓库里，站点页面是从源同步生成出来的：

```
正文源 content/<slug>.md   →   tools/build-site.py   →   docs/chXX/*.md 与 sidebar.mts
```

同步脚本做三件事：按二级标题把每一篇切成"导学页 + 若干小节页"、给页面补 `title`
与"本篇对应官方章节"提示块、按分组生成侧边栏。篇章编号、标题、分组、官方章节链接取自源仓库
`build.py` 的 `PAGES` 表，脚本不另存一份，改标题只需改那一处。

因此有两个约定：

- 改正文请改源文件，改完跑一次 `npm run sync`；直接编辑 `docs/chXX/` 下的页面会在下次同步时被覆盖。
- `docs/.vitepress/sidebar.mts` 由脚本生成，手改同样会被覆盖。

正文源默认位置写在脚本顶部，换机器时用环境变量指过去：

```bash
TUTORIAL_SRC=/path/to/tutorial-build-mk python3 tools/build-site.py
```

新增一篇的流程：在源的 `PAGES` 表里加一条（连同标题、分组、官方章节链接）→ 在源目录的
`content/` 下写好 `<slug>.md` → 跑 `npm run sync` → `npm run build`。源里没有正文的篇章会被
跳过，不会生成空页面，也不会出现在侧边栏。

## 发布

发布方式是本地构建加推送产物分支，不走 GitHub Actions：

1. `./deploy.sh` 构建，把 `docs/.vitepress/dist` 的内容推到 `gh-pages` 分支（强制推送，产物不保留历史）；
2. GitHub Pages 从 `gh-pages` 分支的根目录读取。

`.github/workflows/deploy.yml` 默认只保留手动触发。这个账号名下的仓库分配不到 Actions
runner，推上去的工作流会在几秒内以 failure 结束，且 `steps` 数为 0，属于账号层面的限制。
以后若 Actions 可用，把工作流里 `on.push` 取消注释，并把仓库 Pages 的 Source 改回
"GitHub Actions" 即可。

仓库地址 <https://github.com/mqxu/backend-engineering-course>，Pages 的来源已设为
`gh-pages` 分支根目录，一般不用再动。换仓库或想改写来源分支时：

```bash
curl -X PATCH -H "Authorization: Bearer $TOKEN" -H "Accept: application/vnd.github+json" \
  "https://api.github.com/repos/<owner>/<repo>/pages" \
  -d '{"build_type":"legacy","source":{"branch":"gh-pages","path":"/"}}'
```

切换来源之后不会自动构建，要手动触发一次：

```bash
curl -X POST -H "Authorization: Bearer $TOKEN" -H "Accept: application/vnd.github+json" \
  "https://api.github.com/repos/<owner>/<repo>/pages/builds"
```

刚发布完不要立刻下结论：Pages 的 CDN 有 1 到 2 分钟延迟，这期间新页面返回 404、老页面返回
上一次的内容。判断依据是拿线上的字节数和本地 `dist` 对比，不是看状态码。

本机访问 github.com 要经代理，走默认的 HTTP/2 会随机报 `Error in the HTTP2 framing layer`
或 `Empty reply from server`，同一个命令重试几次有时能过。`deploy.sh` 里已用
`GIT_CONFIG_*` 环境变量把 `http.version` 降到 HTTP/1.1，脚本外手动推产物时也要加上。

## 写作与配置约定

- 中文行文用全角引号与全角标点，西文与数字两侧加空格。
- 给链接加属性（如 `{target="_blank"}`）之后，构建时不会再补 `base` 前缀，线上会 404。
  需要新窗口打开或下载的链接，一律写成相对路径，例如 `./download/x.html`。
- 代码块的语言标记要用 Shiki 认识的（`bash`、`java`、`yaml`、`xml`、`properties`、`sql`、
  `json`、`dockerfile` 等）。写 `.gitignore` 的内容用 `bash`，注释符号一致，高亮正常。
- `cleanUrls` 保持关闭。GitHub Pages 对无扩展名 URL 的映射没有稳定保证，开着的话链接会 404。
- 正文里若出现 `{{ }}` 形式的内容（模板语法讲解），写在行内反引号里即可，配置里已经给行内
  代码加了 `v-pre`，不会被当成 Vue 插值执行。

## 内容范围

已上线第 0 至第 11 篇，共 12 篇、128 个小节页。第 12 篇（Vue 3 + Element Plus 前端）、
第 13 篇（联调与交付）和附录正在整理，源里写好后跑一次同步即可上线。
