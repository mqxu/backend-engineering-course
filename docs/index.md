---
layout: home

hero:
  name: 后端工程化开发
  text: Spring Boot 4.1 完整教程
  tagline: 按官方文档的章节顺序重写，每一节都配同一个项目里的真实实现。全文的版本号、启动耗时、镜像体积、内存占用都在本机跑过一遍。
  actions:
    - theme: brand
      text: 从课程导学开始
      link: /guide/
    - theme: alt
      text: 直奔第 0 篇
      link: /ch00/
    - theme: alt
      text: 案例工程
      link: /project/

features:
  - icon: 📖
    title: 跟着官方章节走
    details: 每篇开头列出对应的官方章节，链接可直接点开核对。教程保留官方的组织顺序，只把参考手册补成能照着做的教材。
  - icon: 🧪
    title: 数字都是实测的
    details: 启动耗时、jar 体积、镜像层大小、内存占用、测试耗时，全部来自本机实际运行，不写记不准的数。
  - icon: 🎯
    title: 一个业务贯穿全程
    details: 只讲校园活动服务平台。从第 1 篇的 Hello World 开始，一路加上校验、认证、缓存、消息、监控、容器化，最后接上 Vue 3 管理端。
  - icon: 🔎
    title: 4.x 的变化讲清楚了
    details: starter 改名、模块拆分、Jackson 3、测试包迁移、Actuator 三类搬迁、jarmode 换名，容易踩的地方单独列出来。
  - icon: 🛠
    title: 每篇都有排查表
    details: 常见报错按“症状、原因、解法”列成表，遇到问题先查表，不用从头读。
  - icon: 🚀
    title: 一直做到能上线
    details: 测试策略、健康检查、指标、打包、容器化、GraalVM 原生镜像，讲的是制品怎么从“能跑”变成“能在生产上跑”。
  - icon: 🧩
    title: 前后端连起来
    details: 后端接口写完后接 Vue 3 + Element Plus 管理端，解决联调、认证贯通和一体化部署的问题。
---

## 这份教程讲什么

Spring Boot 官方文档写得严谨，但它是参考手册，不是教材：每个特性单独成节，读完之后仍然不知道这些特性在一个项目里怎么拼起来。这份教程保留官方的章节顺序（方便随时回原文查证），在每一节后面补上**同一个项目里的真实实现**，并且把实测结果写进正文。

全程只讲一个业务：**校园活动服务平台**。它足够简单——场地、活动、报名三个概念；也足够真实——涉及分页检索、权限控制、名额控制、文件上传这类高频场景。

::: tip 三种读法
- **从头学**：从第 0 篇读起，按顺序往下走。第 3 篇的配置管理和第 6 篇的数据访问决定后面所有代码的风格，不建议跳。
- **带问题查**：直接跳到对应篇章，每篇开头标了官方章节，拿不准的地方回官方原文核对。
- **跟着敲一遍**：打开案例工程，对着小节里的文件路径改代码，每篇末尾的"本章实测汇总"用来验结果。
:::

## 十四篇一览

四个阶段，每个阶段结束都有一个能验证的产出，不必等到最后才看到成果。

| 阶段 | 篇 | 主题 | 产出 |
| --- | --- | --- | --- |
| 一 · 起步 | [第 0 篇](/ch00/) | 开篇：版本核实与学习地图 | — |
| | [第 1 篇](/ch01/) | 入门：环境、构建系统与第一个应用 | 一个能跑起来的 REST 接口 |
| | [第 2 篇](/ch02/) | 工程结构、自动配置与依赖注入 | |
| 二 · 核心能力 | [第 3 篇](/ch03/) | 核心特性：外部化配置、Profiles 与日志 | 带认证、能读写数据库、有缓存的完整后端 |
| | [第 4 篇](/ch04/) | Web 层：MVC、REST 接口与异常处理 | |
| | [第 5 篇](/ch05/) | 安全：Spring Security 与 JWT 认证 | |
| | [第 6 篇](/ch06/) | 数据访问：SQL、JPA 与 MyBatis-Plus | |
| | [第 7 篇](/ch07/) | 缓存、校验与外部服务调用 | |
| | [第 8 篇](/ch08/) | 消息与实时通信：Kafka、AMQP 与 WebSocket | |
| 三 · 工程化 | [第 9 篇](/ch09/) | 测试：单元测试、切片测试与 Testcontainers | 可测试、可监控、可部署的制品 |
| | [第 10 篇](/ch10/) | 生产就绪：Actuator 与可观测性 | |
| | [第 11 篇](/ch11/) | 打包与部署：可执行 jar、容器与原生镜像 | |
| 四 · 全端交付 | 第 12 篇 | 全端实战（一）：Vue 3 + Element Plus 前端 | 前后端分离、能交付使用的全端项目 |
| | 第 13 篇 | 全端实战（二）：联调、认证贯通与交付 | |

第 12、13 篇与附录正在整理中，正文写完会同步上线。完整目录与学习路径见[篇章地图](/guide/roadmap)。

## 案例工程

| 工程 | 技术要点 | 端口 | 首次出现 |
| --- | --- | --- | --- |
| `activity-server` | Spring Data JPA 版本，后端主线 | 8080 | 第 1 篇 |
| `activity-server-mybatisplus` | 等价实现的 MyBatis-Plus 版本，用于对照 | 8081 | 第 6 篇 |
| `activity-server-messaging` | 专题工程：Kafka、RabbitMQ、WebSocket/STOMP | — | 第 8 篇 |
| `activity-server-testing` | 专题工程：四层测试与 Testcontainers | — | 第 9 篇 |
| `activity-server-observability` | 专题工程：Actuator 端点、健康检查、指标 | — | 第 10 篇 |
| `activity-server-web` | Vue 3 + Element Plus 管理端 | 5173 | 第 12 篇 |

第 8、9、10 篇各有一个专题工程，只保留最小一套分层代码，把篇幅留给当篇主题，互不依赖，可以单独运行与测试。第 11 篇不新增工程，直接对主线工程做打包与容器化。工程说明见[案例工程一览](/project/)。

## 技术选型

| 类别 | 选型 | 版本 |
| --- | --- | --- |
| 框架 | Spring Boot | 4.1.1（最新 GA） |
| 运行环境 | Java | 21 LTS（官方支持 17–26） |
| 构建 | Maven | 3.9.11 |
| 数据访问 | Spring Data JPA / MyBatis-Plus | Hibernate 7.4.5 / 3.5.17 |
| 安全 | Spring Security + jjwt | 7.1.1 / 0.13.0 |
| 测试 | JUnit Jupiter + Testcontainers | 6.0.3 / 2.0.5 |
| 监控 | Actuator + Micrometer | 1.17.1 |
| 管理端 | Vue 3 + Element Plus + Vite | 见第 12 篇 |

::: warning 关于版本
表格里的版本号都在 2026 年 9 月核对过，核实手段写在第 0 篇。Spring Boot 与依赖组件的版本属于易变信息，若在几个月后读到本页，建议先看官方 [System Requirements](https://docs.spring.io/spring-boot/system-requirements.html)，再对照本地工程的启动日志。正文里的写法（注解、API、配置项）比版本号稳定得多。
:::
