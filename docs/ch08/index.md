---
title: "消息与实时通信：Kafka、AMQP 与 WebSocket"
---

# 消息与实时通信：Kafka、AMQP 与 WebSocket

::: info 本篇对应官方章节
[消息总览](https://docs.spring.io/spring-boot/reference/messaging/index.html) · [Kafka](https://docs.spring.io/spring-boot/reference/messaging/kafka.html) · [AMQP / RabbitMQ](https://docs.spring.io/spring-boot/reference/messaging/amqp.html) · [WebSocket](https://docs.spring.io/spring-boot/reference/messaging/websockets.html) · [RSocket](https://docs.spring.io/spring-boot/reference/messaging/rsocket.html)
:::


第 7 篇让应用能主动去调别人的接口。这一篇反过来处理“别人要通知我”和“我要通知别人”的场景：资源上新了要广播给在线的浏览器，用户提交了内容要异步去建索引、发通知，这些都不该卡在 HTTP 请求里做。

这一篇与前面几篇有个根本不同：**Kafka 和 RabbitMQ 都需要外部中间件**。所以本篇的代码单独放一个工程 `resource-hub-messaging`（端口 8082），而不是塞进 `resource-hub`。理由很实际——`resource-hub` 那 58 个测试能在任何一台机器上跑起来，一个中间件都不需要；把需要 broker 的代码混进去，这套“零依赖测试”就没了。

三条链路各有一个可运行的测试，全部不需要你在本机装东西：

| 链路 | 测试手段 | 是否需要本机装中间件 |
| --- | --- | --- |
| Kafka | `@EmbeddedKafka` 在同 JVM 里起真 broker | 否 |
| RabbitMQ | `TestRabbitTemplate`，不往 broker 发 | 否 |
| WebSocket | STOMP 客户端连真实端口 | 否 |

---

## 本篇小节

- [8.1 先想清楚：什么时候真的需要消息队列](/ch08/01)
- [8.2 Kafka：依赖、配置与主题声明](/ch08/02)
- [8.3 生产者：key 决定分区，返回的 Future 默认不等确认](/ch08/03)
- [8.4 消费者：容器工厂、并发度与偏移量](/ch08/04)
- [8.5 消费失败：不配的话，一条坏消息能堵死整个分区](/ch08/05)
- [8.6 RabbitMQ：和 Kafka 不是替代关系](/ch08/06)
- [8.7 消息转换器：Jackson 2 与 Jackson 3 在这里分岔](/ch08/07)
- [8.8 发布确认与退回：RabbitMQ 的“发出即忘”](/ch08/08)
- [8.9 消费者确认、prefetch 与重投](/ch08/09)
- [8.10 WebSocket 与 STOMP：三种前缀的分工](/ch08/10)
- [8.11 测试这三条链路](/ch08/11)
- [8.12 选型与问题速查](/ch08/12)
- [8.13 小结与下一步](/ch08/13)
