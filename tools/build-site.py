#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""从教程正文源生成 VitePress 页面与侧边栏。

用法：
    python3 tools/build-site.py          # 全量同步
    python3 tools/build-site.py 04 11    # 只同步指定篇号

数据流：
    正文源  <工作区>/.workbuddy/tutorial-build-mk/content/<slug>.md
        ↓  按二级标题切页 + 补 frontmatter
    站点页  docs/chXX/index.md、docs/chXX/NN.md
        ↓
    侧边栏  docs/.vitepress/sidebar.mts

篇章编号、标题、分组、官方章节链接都取自 build.py 的 PAGES 表，不在这里另写一份。
正文一律改在 content/ 下的源文件，改完跑一次本脚本；直接改 docs/chXX 下的页面，
下次同步会被覆盖。
"""
import os
import re
import sys
from pathlib import Path

# 教程正文源与它的构建脚本（PAGES 表的出处）。
# 默认指向写作工作区，换机器时用环境变量覆盖：
#     TUTORIAL_SRC=/path/to/tutorial-build-mk python3 tools/build-site.py
SRC_DIR = Path(
    os.environ.get("TUTORIAL_SRC", Path.home() / "WorkBuddy/2026-09-13-15-05-23/.workbuddy/tutorial-build-mk")
).expanduser()
CONTENT_DIR = SRC_DIR / "content"

SITE_DIR = Path(__file__).resolve().parent.parent
DOCS_DIR = SITE_DIR / "docs"

OFFICIAL_ROOT = "https://docs.spring.io/spring-boot"

# 侧边栏里的分组：分组名 → 篇号前缀
GROUP_ORDER = ["起步", "核心", "工程化", "全端实战", "参考"]
GROUP_LABEL = {
    "起步": "起步篇",
    "核心": "核心能力篇",
    "工程化": "工程化篇",
    "全端实战": "全端实战篇",
    "参考": "参考"
}


def load_pages():
    """从 build.py 读出篇章表。"""
    sys.path.insert(0, str(SRC_DIR))
    import build  # noqa: E402  （脚本有 __main__ 保护，import 不会执行构建）
    return build.PAGES


def split_chapter(text):
    """把一篇正文切成 (一级标题, 导语, [(小节标题, 小节正文)])。

    只在围栏代码块之外识别标题行，避免把 bash 注释里的 # 当成标题。
    """
    lines = text.split("\n")
    h1 = ""
    h1_at = -1
    heads = []
    in_fence = False
    for i, ln in enumerate(lines):
        if ln.lstrip().startswith("```"):
            in_fence = not in_fence
            continue
        if in_fence:
            continue
        if h1_at < 0 and ln.startswith("# "):
            h1 = ln[2:].strip()
            h1_at = i
            continue
        if ln.startswith("## "):
            heads.append((i, ln[3:].strip()))

    if h1_at < 0:
        raise ValueError("正文里没有一级标题")

    intro_end = heads[0][0] if heads else len(lines)
    intro = "\n".join(lines[h1_at + 1:intro_end]).strip()

    sections = []
    for n, (at, title) in enumerate(heads):
        end = heads[n + 1][0] if n + 1 < len(heads) else len(lines)
        body = "\n".join(lines[at + 1:end]).strip()
        sections.append((title, body))
    return h1, intro, sections


def yaml_str(s):
    """frontmatter 里的字符串一律加双引号，标题里有冒号、括号也不会解析出错。"""
    return '"' + s.replace("\\", "\\\\").replace('"', '\\"') + '"'


def official_block(official):
    if not official:
        return ""
    items = " · ".join(f"[{name}]({OFFICIAL_ROOT}/{path})" for name, path in official)
    return f"::: info 本篇对应官方章节\n{items}\n:::\n"


def write_chapter(page, only):
    num = page["slug"][:2]
    if only and num not in only:
        return None

    src = CONTENT_DIR / f"{page['slug']}.md"
    if not src.exists():
        return None

    h1, intro, sections = split_chapter(src.read_text(encoding="utf-8"))
    out_dir = DOCS_DIR / f"ch{num}"
    out_dir.mkdir(parents=True, exist_ok=True)

    # 清掉上一轮生成的分节页（篇内小节数量可变）
    for old in out_dir.glob("*.md"):
        old.unlink()

    # 导学页：官方章节 + 正文导语 + 小节索引
    parts = [f"---\ntitle: {yaml_str(page['title'])}\n---", "", f"# {page['title']}", ""]
    block = official_block(page["official"])
    if block:
        parts += [block, ""]
    if intro:
        parts += [intro, ""]
    if sections:
        parts += ["## 本篇小节", ""]
        for n, (title, _) in enumerate(sections, start=1):
            parts.append(f"- [{title}](/ch{num}/{n:02d})")
        parts.append("")
    (out_dir / "index.md").write_text("\n".join(parts).rstrip() + "\n", encoding="utf-8")

    # 分节页
    items = [{"text": "本篇导学", "link": f"/ch{num}/"}]
    for n, (title, body) in enumerate(sections, start=1):
        page_text = "\n".join([
            "---",
            f"title: {yaml_str(title)}",
            "---",
            "",
            f"# {title}",
            "",
            body,
            ""
        ])
        (out_dir / f"{n:02d}.md").write_text(page_text, encoding="utf-8")
        items.append({"text": title, "link": f"/ch{num}/{n:02d}"})

    return {
        "num": num,
        "title": page["title"],
        "group": page["group"],
        "items": items,
    }


def write_sidebar(chapters):
    by_group = {g: [] for g in GROUP_ORDER}
    for c in chapters:
        by_group.setdefault(c["group"], []).append(c)

    out = [
        "// 此文件由 tools/build-site.py 生成，不要手改。",
        "// 改篇章标题或分组请改 build.py 的 PAGES 表，再跑一次同步脚本。",
        "import type { DefaultTheme } from 'vitepress'",
        "",
        "type Item = DefaultTheme.SidebarItem",
        "",
        "const guide: Item[] = [",
        "  { text: '课程导读', link: '/guide/' },",
        "  { text: '篇章地图与学习路径', link: '/guide/roadmap' }",
        "]",
        "",
        "const project: Item[] = [",
        "  { text: '案例工程一览', link: '/project/' }",
        "]",
        "",
        "const chapters: Record<string, { title: string; group: string; items: Item[] }> = {",
    ]
    for c in chapters:
        out.append(f"  {yaml_str(c['num'])}: {{")
        out.append(f"    title: {yaml_str(c['title'])},")
        out.append(f"    group: {yaml_str(c['group'])},")
        out.append("    items: [")
        for it in c["items"]:
            out.append(f"      {{ text: {yaml_str(it['text'])}, link: {yaml_str(it['link'])} }},")
        out.append("    ]")
        out.append("  },")
    out += ["}", ""]

    # 分组定义
    out.append("const groups: { text: string; nums: string[] }[] = [")
    for g in GROUP_ORDER:
        nums = [c["num"] for c in by_group.get(g, [])]
        if not nums:
            continue
        out.append(f"  {{ text: {yaml_str(GROUP_LABEL[g])}, nums: [{', '.join(yaml_str(n) for n in nums)}] }},")
    out += ["]", ""]

    out += [
        "/** 所属分组展开、当前篇展开，其余收起 */",
        "function chapterSidebar(active: string): Item[] {",
        "  const mods: Item[] = groups.map((g) => ({",
        "    text: g.text,",
        "    collapsed: false,",
        "    items: g.nums.map((n) => ({",
        "      text: '第 ' + Number(n) + ' 篇 · ' + chapters[n].title,",
        "      collapsed: n !== active,",
        "      items: chapters[n].items",
        "    }))",
        "  }))",
        "  return [{ text: '课程导学', collapsed: true, items: guide }, ...mods]",
        "}",
        "",
        "export const sidebar: DefaultTheme.Sidebar = {",
        "  '/guide/': [{ text: '课程导学', items: guide }],",
    ]
    for c in chapters:
        out.append(f"  '/ch{c['num']}/': chapterSidebar({yaml_str(c['num'])}),")
    out += [
        "  '/project/': [{ text: '案例工程', items: project }]",
        "}",
        ""
    ]

    path = DOCS_DIR / ".vitepress" / "sidebar.mts"
    path.parent.mkdir(parents=True, exist_ok=True)
    path.write_text("\n".join(out), encoding="utf-8")
    return path


def main():
    only = set(a for a in sys.argv[1:])
    pages = [p for p in load_pages() if re.match(r"^\d\d-", p["slug"])]
    chapters = []
    skipped = []
    for p in pages:
        got = write_chapter(p, only)
        if got is None:
            skipped.append(p["slug"])
        else:
            chapters.append(got)

    sidebar_path = write_sidebar(chapters)
    total = sum(len(c["items"]) - 1 for c in chapters)
    print(f"站点目录：{SITE_DIR}")
    for c in chapters:
        print(f"  ✓ ch{c['num']:<3} {c['title']:<44} {len(c['items']) - 1:>2} 个小节")
    if skipped:
        print(f"  - 正文未写、已跳过：{', '.join(skipped)}")
    print(f"  侧边栏：{sidebar_path.relative_to(SITE_DIR)}")
    print(f"  合计 {len(chapters)} 篇 / {total} 个小节页")


if __name__ == "__main__":
    main()
