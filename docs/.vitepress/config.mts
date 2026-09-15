import { defineConfig } from 'vitepress'
import { sidebar } from './sidebar.mts'

// 部署在 GitHub Pages 的子路径下，base 要与仓库名一致。
// 以后若换自定义域名（站点在根路径），构建时把 DOCS_BASE 设成 /：
//   DOCS_BASE=/ npm run build
const base = process.env.DOCS_BASE ?? '/backend-engineering-course/'

export default defineConfig({
  lang: 'zh-CN',
  title: '后端工程化开发',
  description: 'Spring Boot 4.1 完整教程 · 按官方文档章节顺序重写，每一节配可运行代码 · 资源分享应用项目驱动',

  head: [
    ['meta', { name: 'theme-color', content: '#6db33f' }],
    ['meta', { name: 'author', content: '后端工程化开发课程组' }],
    ['link', { rel: 'icon', type: 'image/svg+xml', href: `${base}logo.svg` }]
  ],

  base,

  lastUpdated: true,

  // 关闭 cleanUrls：GitHub Pages 是否把 /foo 映射到 /foo.html 没有稳定保证，
  // 赌错的后果是点任何链接都 404。这里直接生成带 .html 的链接。
  cleanUrls: false,
  ignoreDeadLinks: true,

  markdown: {
    lineNumbers: false,
    theme: { light: 'github-light', dark: 'github-dark' },
    headers: { level: [2, 3] },
    config(md) {
      md.set({ linkify: true, breaks: false })

      // 给行内 <code> 加 v-pre。
      // VitePress 把 Markdown 当 Vue 模板编译，行内代码里的 {{ }} 会被当成插值真的执行，
      // 写 `` `{{ doneCount }}` `` 会在构建期报 "doneCount is not a function"，
      // 写了空插值则渲染成空白。本教程正文暂时没有这种写法，加着是为了以后贴模板代码时不必回头查。
      const rules = md.renderer.rules
      const original = rules.code_inline
      rules.code_inline = (tokens, idx, options, env, self) => {
        const html = original
          ? original(tokens, idx, options, env, self)
          : `<code>${md.utils.escapeHtml(tokens[idx].content)}</code>`
        return html.replace(/^<code/, '<code v-pre')
      }
    }
  },

  themeConfig: {
    logo: '/logo.svg',
    siteTitle: '后端工程化开发',

    nav: [
      { text: '课程导学', link: '/guide/', activeMatch: '^/guide/' },
      { text: '教程正文', link: '/ch00/', activeMatch: '^/ch' },
      { text: '案例工程', link: '/project/', activeMatch: '^/project/' }
    ],

    sidebar,

    outline: { level: [2, 3], label: '本页目录' },

    search: {
      provider: 'local',
      options: {
        translations: {
          button: { buttonText: '搜索教程', buttonAriaLabel: '搜索教程' },
          modal: {
            displayDetails: '显示详情',
            resetButtonTitle: '清除条件',
            backButtonTitle: '返回',
            noResultsText: '没有找到相关内容',
            footer: {
              selectText: '选择',
              navigateText: '切换',
              closeText: '关闭'
            }
          }
        }
      }
    },

    socialLinks: [
      { icon: 'github', link: 'https://github.com/mqxu/backend-engineering-course' }
    ],

    docFooter: { prev: '上一篇', next: '下一篇' },
    darkModeSwitchLabel: '主题',
    sidebarMenuLabel: '目录',
    returnToTopLabel: '回到顶部',
    lastUpdatedText: '最后更新',
    outlineTitle: '本页目录',

    footer: {
      message: '配套教材 · 依据 Spring Boot 官方文档与实测结果编写',
      copyright: '后端工程化开发 · Spring Boot 4.1 完整教程'
    }
  }
})
