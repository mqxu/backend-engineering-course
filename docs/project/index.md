---
title: 案例工程一览
---

# 案例工程一览

整套教程只讲一个业务：**资源分享应用**。它足够简单——分类、资源、下载量三个概念；也足够真实——涉及分页检索、权限控制、文件上传、下载计数这类后端开发的高频场景。

| 工程 | 技术要点 | 端口 | 首次出现 |
| --- | --- | --- | --- |
| `resource-hub` | Spring Data JPA 版本，后端主线 | 8080 | [第 1 篇](/ch01/) |
| `resource-hub-mybatisplus` | 等价实现的 MyBatis-Plus 版本，用于对照 | 8081 | [第 6 篇](/ch06/) |
| `resource-hub-messaging` | 专题工程：Kafka、RabbitMQ、WebSocket/STOMP | — | [第 8 篇](/ch08/) |
| `resource-hub-testing` | 专题工程：四层测试与 Testcontainers | — | [第 9 篇](/ch09/) |
| `resource-hub-observability` | 专题工程：Actuator 端点、健康检查、指标 | — | [第 10 篇](/ch10/) |
| `resource-hub-web` | Vue 3 + Element Plus 管理端 | 5173 | 第 12 篇 |

## 怎么组织

`resource-hub` 与 `resource-hub-mybatisplus` 是同一业务的两套实现，用于对照两种数据访问方式的写法差异。

第 8、9、10 篇各有一个专题工程。它们只保留最小一套分层代码，把篇幅留给当篇主题，互不依赖，可以单独运行与测试。这样安排是因为主线工程的测试要保持"零外部依赖"——需要 broker、需要 Docker 的代码不适合塞进去。

第 11 篇不新增工程，直接对主线工程 `resource-hub` 做打包与容器化。工程根目录下的四个 `Dockerfile` 分别是分层、单层、CDS 三种写法，外加一个 `chown` 位置的反例，`.dockerignore` 配合它们使用；`pom.xml` 里额外声明了 `native-maven-plugin`，用于 GraalVM 原生镜像构建。

## 工程约定

六个工程共用同一套约定，读代码时按这个约定找位置：

| 项 | 约定 |
| --- | --- |
| 根包 | `com.example.resourcehub` |
| 分层 | `web` / `service` / `repository` / `domain` / `dto` / `common` / `config` |
| 统一响应 | `ApiResponse<T>`，`code = 0` 表示成功 |
| 分页 | 自定义 `PageResult<T>` |
| JPA 配置 | 始终配 `spring.jpa.open-in-view: false` |

分层依据与包结构的更多说明见[第 2 篇](/ch02/)。

## 测试规模

| 工程 | 测试数 | 说明 |
| --- | --- | --- |
| `resource-hub` | 58 | 单元测试、Web 切片、JPA 切片、整体启动 |
| `resource-hub-messaging` | 7 | 三条消息链路的测试手法 |
| `resource-hub-testing` | 31 | 四层测试与 Testcontainers |
| `resource-hub-observability` | 22 | 端点、健康检查、指标 |

这些数字是各篇写作过程中实际跑出来的，测试策略与耗时对照见[第 9 篇](/ch09/)。
