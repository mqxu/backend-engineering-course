// 此文件由 tools/build-site.py 生成，不要手改。
// 改篇章标题或分组请改 build.py 的 PAGES 表，再跑一次同步脚本。
import type { DefaultTheme } from 'vitepress'

type Item = DefaultTheme.SidebarItem

const guide: Item[] = [
  { text: '课程导读', link: '/guide/' },
  { text: '篇章地图与学习路径', link: '/guide/roadmap' }
]

const project: Item[] = [
  { text: '案例工程一览', link: '/project/' }
]

const chapters: Record<string, { title: string; group: string; items: Item[] }> = {
  "00": {
    title: "开篇：版本核实与学习地图",
    group: "起步",
    items: [
      { text: "本篇导学", link: "/ch00/" },
      { text: "一、先确认你在用哪个版本", link: "/ch00/01" },
      { text: "二、4.x 相对 3.x 变了什么", link: "/ch00/02" },
      { text: "三、环境准备", link: "/ch00/03" },
      { text: "四、贯穿全教程的案例项目", link: "/ch00/04" },
      { text: "五、本教程的代码约定", link: "/ch00/05" },
    ]
  },
  "01": {
    title: "入门：环境、构建系统与第一个应用",
    group: "起步",
    items: [
      { text: "本篇导学", link: "/ch01/" },
      { text: "一、对照官方教程：从零到 Hello World", link: "/ch01/01" },
      { text: "二、Maven 构建系统：parent、starter、plugin 三者关系", link: "/ch01/02" },
      { text: "三、案例项目 activity-server 起步", link: "/ch01/03" },
      { text: "四、DevTools：改完代码不用手动重启", link: "/ch01/04" },
      { text: "五、常见问题排查", link: "/ch01/05" },
    ]
  },
  "02": {
    title: "工程结构、自动配置与依赖注入",
    group: "起步",
    items: [
      { text: "本篇导学", link: "/ch02/" },
      { text: "一、代码结构：官方建议与背后的机制", link: "/ch02/01" },
      { text: "二、@SpringBootApplication 三段式拆解", link: "/ch02/02" },
      { text: "三、自动配置是怎么工作的", link: "/ch02/03" },
      { text: "四、Bean 与依赖注入", link: "/ch02/04" },
      { text: "五、实战：把 activity-server 的分层落下来", link: "/ch02/05" },
      { text: "六、常见问题", link: "/ch02/06" },
    ]
  },
  "03": {
    title: "核心特性：外部化配置、Profiles 与日志",
    group: "核心",
    items: [
      { text: "本篇导学", link: "/ch03/" },
      { text: "一、外部化配置：搞清楚谁覆盖谁", link: "/ch03/01" },
      { text: "二、@ConfigurationProperties：类型安全的配置绑定", link: "/ch03/02" },
      { text: "三、Profiles：多环境隔离", link: "/ch03/03" },
      { text: "四、日志", link: "/ch03/04" },
      { text: "五、JSON 序列化", link: "/ch03/05" },
      { text: "六、国际化", link: "/ch03/06" },
      { text: "七、AOP：切面编程", link: "/ch03/07" },
      { text: "八、任务执行与调度", link: "/ch03/08" },
      { text: "九、其他特性要点", link: "/ch03/09" },
      { text: "十、常见问题", link: "/ch03/10" },
    ]
  },
  "04": {
    title: "Web 层：MVC、REST 接口与异常处理",
    group: "核心",
    items: [
      { text: "本篇导学", link: "/ch04/" },
      { text: "一、一次请求在 Spring MVC 里经过了什么", link: "/ch04/01" },
      { text: "二、统一响应体", link: "/ch04/02" },
      { text: "三、REST 接口设计", link: "/ch04/03" },
      { text: "四、参数校验", link: "/ch04/04" },
      { text: "五、全局异常处理", link: "/ch04/05" },
      { text: "六、分页与多条件查询", link: "/ch04/06" },
      { text: "七、文件上传与读取", link: "/ch04/07" },
      { text: "八、拦截器实战：请求耗时统计", link: "/ch04/08" },
      { text: "九、跨域（CORS）", link: "/ch04/09" },
      { text: "十、静态资源与错误页", link: "/ch04/10" },
      { text: "十一、优雅停机", link: "/ch04/11" },
      { text: "十二、本章实测汇总", link: "/ch04/12" },
      { text: "十三、常见问题", link: "/ch04/13" },
    ]
  },
  "05": {
    title: "安全：Spring Security 与 JWT 认证",
    group: "核心",
    items: [
      { text: "本篇导学", link: "/ch05/" },
      { text: "一、认证与授权是两个问题", link: "/ch05/01" },
      { text: "二、引入 starter 之后的默认行为", link: "/ch05/02" },
      { text: "三、过滤链配置", link: "/ch05/03" },
      { text: "四、密码怎么存", link: "/ch05/04" },
      { text: "五、JWT 是什么，以及它的代价", link: "/ch05/05" },
      { text: "六、认证流程", link: "/ch05/06" },
      { text: "七、授权：两种配置方式", link: "/ch05/07" },
      { text: "八、401/403 要返回 JSON", link: "/ch05/08" },
      { text: "九、不把实体直接返回", link: "/ch05/09" },
      { text: "十、测试怎么带身份", link: "/ch05/10" },
      { text: "十一、实测抓到的真实 bug：`ROLE_` 前缀", link: "/ch05/11" },
      { text: "十二、本章实测汇总", link: "/ch05/12" },
      { text: "十三、常见问题", link: "/ch05/13" },
    ]
  },
  "06": {
    title: "数据访问：SQL、JPA 与 MyBatis-Plus",
    group: "核心",
    items: [
      { text: "本篇导学", link: "/ch06/" },
      { text: "一、官方 Data 一章覆盖了什么", link: "/ch06/01" },
      { text: "二、数据源：从自动配置到连接池", link: "/ch06/02" },
      { text: "三、SQL 初始化：schema.sql 与 data.sql", link: "/ch06/03" },
      { text: "四、JPA 之前：JdbcTemplate 与 JdbcClient", link: "/ch06/04" },
      { text: "五、实体映射：把案例项目的实体讲透", link: "/ch06/05" },
      { text: "六、Repository：从派生查询到 Specification", link: "/ch06/06" },
      { text: "七、事务：边界、脏检查与失效场景", link: "/ch06/07" },
      { text: "八、N+1 问题：实测对比", link: "/ch06/08" },
      { text: "九、并发写入：不要读-改-写", link: "/ch06/09" },
      { text: "十、H2 控制台", link: "/ch06/10" },
      { text: "十一、MyBatis-Plus 接入 Spring Boot 4", link: "/ch06/11" },
      { text: "十二、NoSQL 要点", link: "/ch06/12" },
      { text: "十三、常见问题", link: "/ch06/13" },
      { text: "附：本篇涉及的官方章节", link: "/ch06/14" },
    ]
  },
  "07": {
    title: "缓存、校验与外部服务调用",
    group: "核心",
    items: [
      { text: "本篇导学", link: "/ch07/" },
      { text: "一、官方 IO 一章覆盖了什么", link: "/ch07/01" },
      { text: "二、缓存：把热点查询挡在数据库前面", link: "/ch07/02" },
      { text: "三、参数校验：从 DTO 到配置项", link: "/ch07/03" },
      { text: "四、调用外部服务：RestClient", link: "/ch07/04" },
      { text: "五、配置里的 Duration：一个不会报错的坑", link: "/ch07/05" },
      { text: "六、定时任务", link: "/ch07/06" },
      { text: "七、发送邮件", link: "/ch07/07" },
      { text: "八、Quartz：需要持久化的定时任务", link: "/ch07/08" },
      { text: "九、常见问题速查表", link: "/ch07/09" },
      { text: "附：本篇涉及的官方章节", link: "/ch07/10" },
    ]
  },
  "08": {
    title: "消息与实时通信：Kafka、AMQP 与 WebSocket",
    group: "核心",
    items: [
      { text: "本篇导学", link: "/ch08/" },
      { text: "8.1 先想清楚：什么时候真的需要消息队列", link: "/ch08/01" },
      { text: "8.2 Kafka：依赖、配置与主题声明", link: "/ch08/02" },
      { text: "8.3 生产者：key 决定分区，返回的 Future 默认不等确认", link: "/ch08/03" },
      { text: "8.4 消费者：容器工厂、并发度与偏移量", link: "/ch08/04" },
      { text: "8.5 消费失败：不配的话，一条坏消息能堵死整个分区", link: "/ch08/05" },
      { text: "8.6 RabbitMQ：和 Kafka 不是替代关系", link: "/ch08/06" },
      { text: "8.7 消息转换器：Jackson 2 与 Jackson 3 在这里分岔", link: "/ch08/07" },
      { text: "8.8 发布确认与退回：RabbitMQ 的“发出即忘”", link: "/ch08/08" },
      { text: "8.9 消费者确认、prefetch 与重投", link: "/ch08/09" },
      { text: "8.10 WebSocket 与 STOMP：三种前缀的分工", link: "/ch08/10" },
      { text: "8.11 测试这三条链路", link: "/ch08/11" },
      { text: "8.12 选型与问题速查", link: "/ch08/12" },
      { text: "8.13 小结与下一步", link: "/ch08/13" },
    ]
  },
  "09": {
    title: "测试：单元测试、切片测试与 Testcontainers",
    group: "工程化",
    items: [
      { text: "本篇导学", link: "/ch09/" },
      { text: "9.1 四层测试：先划线，再动手写", link: "/ch09/01" },
      { text: "9.2 依赖怎么引：总入口与 4.x 的细粒度测试模块", link: "/ch09/02" },
      { text: "9.3 第一层：纯单元测试，不启动任何容器", link: "/ch09/03" },
      { text: "9.4 第二层：Web 切片与一批包名的迁移", link: "/ch09/04" },
      { text: "9.5 数据访问切片：`@DataJpaTest`", link: "/ch09/05" },
      { text: "9.6 第三层：整体测试，Mock 环境与真实端口", link: "/ch09/06" },
      { text: "9.7 HTTP 测试客户端怎么选", link: "/ch09/07" },
      { text: "9.8 条件装配怎么测：`ApplicationContextRunner`", link: "/ch09/08" },
      { text: "9.9 第四层：Testcontainers，让测试跑在真实数据库上", link: "/ch09/09" },
      { text: "9.10 Testcontainers 2.0：一次比 Boot 4 更彻底的模块拆分", link: "/ch09/10" },
      { text: "9.11 没有 Docker 的环境，怎么收场", link: "/ch09/11" },
      { text: "9.12 几个顺手就能用上的测试工具", link: "/ch09/12" },
      { text: "9.13 问题速查", link: "/ch09/13" },
      { text: "9.14 小结与下一步", link: "/ch09/14" },
    ]
  },
  "10": {
    title: "生产就绪：Actuator 与可观测性",
    group: "工程化",
    items: [
      { text: "本篇导学", link: "/ch10/" },
      { text: "10.1 依赖与暴露面：先把该藏的藏起来", link: "/ch10/01" },
      { text: "10.2 4.x 把 Actuator 拆成了什么样", link: "/ch10/02" },
      { text: "10.3 健康检查：内置组件与自定义实现", link: "/ch10/03" },
      { text: "10.4 存活与就绪：接 K8s 探针", link: "/ch10/04" },
      { text: "10.5 info 端点：为什么配了 `info.*` 却看不到", link: "/ch10/05" },
      { text: "10.6 指标：Micrometer 与自定义 Meter", link: "/ch10/06" },
      { text: "10.7 Prometheus 端点：实测输出与命名转换", link: "/ch10/07" },
      { text: "10.8 测试环境里指标导出被换掉了", link: "/ch10/08" },
      { text: "10.9 运行时改日志级别", link: "/ch10/09" },
      { text: "10.10 自定义端点：`@Endpoint`", link: "/ch10/10" },
      { text: "10.11 可观测性与追踪", link: "/ch10/11" },
      { text: "10.12 端点安全：把暴露面收回来", link: "/ch10/12" },
      { text: "10.13 问题速查", link: "/ch10/13" },
      { text: "10.14 小结与下一步", link: "/ch10/14" },
    ]
  },
  "11": {
    title: "打包与部署：可执行 jar、容器与原生镜像",
    group: "工程化",
    items: [
      { text: "本篇导学", link: "/ch11/" },
      { text: "11.1 可执行 jar 里装了什么", link: "/ch11/01" },
      { text: "11.2 jarmode 从 layertools 换成了 tools", link: "/ch11/02" },
      { text: "11.3 四层是按“变化频率”切的", link: "/ch11/03" },
      { text: "11.4 JVM 上的 AOT：把 Bean 定义在构建期算好", link: "/ch11/04" },
      { text: "11.5 CDS：把类加载的结果存下来", link: "/ch11/05" },
      { text: "11.6 容器化：两个容易被忽略的细节", link: "/ch11/06" },
      { text: "11.7 Buildpacks：不写 Dockerfile 的路线", link: "/ch11/07" },
      { text: "11.8 GraalVM 原生镜像", link: "/ch11/08" },
      { text: "11.9 从“能跑”到“能在生产上跑”", link: "/ch11/09" },
      { text: "11.10 问题速查", link: "/ch11/10" },
      { text: "11.11 小结与下一步", link: "/ch11/11" },
    ]
  },
}

const groups: { text: string; nums: string[] }[] = [
  { text: "起步篇", nums: ["00", "01", "02"] },
  { text: "核心能力篇", nums: ["03", "04", "05", "06", "07", "08"] },
  { text: "工程化篇", nums: ["09", "10", "11"] },
]

/** 所属分组展开、当前篇展开，其余收起 */
function chapterSidebar(active: string): Item[] {
  const mods: Item[] = groups.map((g) => ({
    text: g.text,
    collapsed: false,
    items: g.nums.map((n) => ({
      text: '第 ' + Number(n) + ' 篇 · ' + chapters[n].title,
      collapsed: n !== active,
      items: chapters[n].items
    }))
  }))
  return [{ text: '课程导学', collapsed: true, items: guide }, ...mods]
}

export const sidebar: DefaultTheme.Sidebar = {
  '/guide/': [{ text: '课程导学', items: guide }],
  '/ch00/': chapterSidebar("00"),
  '/ch01/': chapterSidebar("01"),
  '/ch02/': chapterSidebar("02"),
  '/ch03/': chapterSidebar("03"),
  '/ch04/': chapterSidebar("04"),
  '/ch05/': chapterSidebar("05"),
  '/ch06/': chapterSidebar("06"),
  '/ch07/': chapterSidebar("07"),
  '/ch08/': chapterSidebar("08"),
  '/ch09/': chapterSidebar("09"),
  '/ch10/': chapterSidebar("10"),
  '/ch11/': chapterSidebar("11"),
  '/project/': [{ text: '案例工程', items: project }]
}
