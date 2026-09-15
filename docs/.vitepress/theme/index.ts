import DefaultTheme from 'vitepress/theme'
import type { Theme } from 'vitepress'
import './style.css'

// 教程正文全部是 Markdown，暂时没有需要注册的组件。
// 以后若要加可运行示例（例如把某段代码做成可交互演示），
// 在 components/ 下建 .vue，然后在这里 app.component('名字', 组件) 注册。
export default {
  extends: DefaultTheme
} satisfies Theme
