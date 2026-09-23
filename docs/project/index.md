---
title: 案例工程一览
---

# 案例工程一览

整套教程只讲一个业务：**校园活动服务平台**。它足够简单——场地、活动、报名三个概念；也足够真实——涉及分页检索、权限控制、名额控制、文件上传这类后端开发的高频场景。

| 工程 | 技术要点 | 端口 | 首次出现 |
| --- | --- | --- | --- |
| `activity-server` | Spring Data JPA 版本，后端主线 | 8080 | [第 1 篇](/ch01/) |
| `activity-server-mybatisplus` | 等价实现的 MyBatis-Plus 版本，用于对照 | 8081 | [第 6 篇](/ch06/) |
| `activity-server-messaging` | 专题工程：Kafka、RabbitMQ、WebSocket/STOMP | — | [第 8 篇](/ch08/) |
| `activity-server-testing` | 专题工程：四层测试与 Testcontainers | — | [第 9 篇](/ch09/) |
| `activity-server-observability` | 专题工程：Actuator 端点、健康检查、指标 | — | [第 10 篇](/ch10/) |
| `activity-server-web` | Vue 3 + Element Plus 管理端 | 5173 | 第 12 篇 |

## 怎么组织

`activity-server` 与 `activity-server-mybatisplus` 是同一业务的两套实现，用于对照两种数据访问方式的写法差异。

第 8、9、10 篇各有一个专题工程。它们只保留最小一套分层代码，把篇幅留给当篇主题，互不依赖，可以单独运行与测试。这样安排是因为主线工程的测试要保持“零外部依赖”——需要 broker、需要 Docker 的代码不适合塞进去。

第 11 篇不新增工程，直接对主线工程 `activity-server` 做打包与容器化。工程根目录下的四个 `Dockerfile` 分别是分层、单层、CDS 三种写法，外加一个 `chown` 位置的反例，`.dockerignore` 配合它们使用；`pom.xml` 里额外声明了 `native-maven-plugin`，用于 GraalVM 原生镜像构建。

## 工程约定

六个工程共用同一套约定，读代码时按这个约定找位置：

| 项 | 约定 |
| --- | --- |
| 根包 | `com.example.activity` |
| 分层 | `web` / `service` / `repository` / `domain` / `dto` / `common` / `config` |
| 统一响应 | `ApiResponse<T>`，`code = 0` 表示成功 |
| 分页 | 自定义 `PageResult<T>`，`page` 从 1 开始 |
| JPA 配置 | 始终配 `spring.jpa.open-in-view: false` |
| 时间格式 | 接口统一 `yyyy-MM-dd HH:mm:ss` |

分层依据与包结构的更多说明见[第 2 篇](/ch02/)。

## 业务规则落点

这套业务里有几条规则值得单独记住，后面各篇会反复用到：

| 规则 | 落点 |
| --- | --- |
| 只有审核通过的报名占名额 | `SignupService.approve`，名额满时返回 2005 |
| 下架是独立标记，不是状态 | `Activity.offShelf` 与 `ActivityStatus` 两个字段分开 |
| 同一场地同一时段不能有两个场次 | `[start, end)` 半开区间判重叠，边界相接不算冲突 |
| 报名截止后不能再报名 | `Activity.acceptsSignup`，实体里判，不由 Controller 判 |

## 测试规模

| 工程 | 测试数 | 说明 |
| --- | --- | --- |
| `activity-server` | 84 | 单元测试、Web 切片、JPA 切片、整体启动 |
| `activity-server-mybatisplus` | 13 | 逻辑删除、自动填充、条件构造器与原子自增 |
| `activity-server-messaging` | 7 | 三条消息链路的测试手法 |
| `activity-server-testing` | 31 | 四层测试与 Testcontainers |
| `activity-server-observability` | 22 | 端点、健康检查、指标 |

这些数字是各篇写作过程中实际跑出来的，测试策略与耗时对照见[第 9 篇](/ch09/)。
