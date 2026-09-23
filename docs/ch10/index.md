---
title: "生产就绪：Actuator 与可观测性"
---

# 生产就绪：Actuator 与可观测性

::: info 本篇对应官方章节
[Actuator 总览](https://docs.spring.io/spring-boot/reference/actuator/index.html) · [启用端点](https://docs.spring.io/spring-boot/reference/actuator/enabling.html) · [端点清单](https://docs.spring.io/spring-boot/reference/actuator/endpoints.html) · [指标](https://docs.spring.io/spring-boot/reference/actuator/metrics.html) · [日志运行时调整](https://docs.spring.io/spring-boot/reference/actuator/loggers.html) · [可观测性](https://docs.spring.io/spring-boot/reference/actuator/observability.html) · [追踪](https://docs.spring.io/spring-boot/reference/actuator/tracing.html)
:::


代码写完、测试跑绿，接下来要面对的是另一个问题：**它上线以后，你怎么知道它好不好？**

日志只能事后翻，报错要等用户来投诉。真正能提前发现问题的，是三类东西：进程还能不能接流量（健康检查）、活动用得怎么样（指标）、出问题时能不能不改配置地拿到更多线索（运行时调日志级别）。Actuator 把这三件事做成了现成的端点。

这一篇回答四个问题：

- **暴露哪些、藏起哪些**：默认值是什么，为什么不该写通配符，以及为什么“没暴露的端点”返回 404 而不是 403
- **健康检查怎么写**：内置了哪些组件、存活探针与就绪探针为什么必须分开、自定义检查怎么把细节带出来
- **指标怎么读怎么写**：`MeterRegistry` 的正确用法、指标名到 Prometheus 文本的转换规则，以及测试环境里指标被换掉这件事
- **端点本身怎么防护**：`EndpointRequest` 在 4.x 换了模块和包名，以及端点安全该怎么配

配套工程是 `activity-server-observability`，它复用前面几篇的分层代码，把篇幅留给可观测性本身。全篇 22 个用例，**6.9 秒全绿**，不需要任何外部中间件。

---

## 本篇小节

- [10.1 依赖与暴露面：先把该藏的藏起来](/ch10/01)
- [10.2 4.x 把 Actuator 拆成了什么样](/ch10/02)
- [10.3 健康检查：内置组件与自定义实现](/ch10/03)
- [10.4 存活与就绪：接 K8s 探针](/ch10/04)
- [10.5 info 端点：为什么配了 `info.*` 却看不到](/ch10/05)
- [10.6 指标：Micrometer 与自定义 Meter](/ch10/06)
- [10.7 Prometheus 端点：实测输出与命名转换](/ch10/07)
- [10.8 测试环境里指标导出被换掉了](/ch10/08)
- [10.9 运行时改日志级别](/ch10/09)
- [10.10 自定义端点：`@Endpoint`](/ch10/10)
- [10.11 可观测性与追踪](/ch10/11)
- [10.12 端点安全：把暴露面收回来](/ch10/12)
- [10.13 问题速查](/ch10/13)
- [10.14 小结与下一步](/ch10/14)
