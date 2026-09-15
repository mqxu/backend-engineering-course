---
title: "核心特性：外部化配置、Profiles 与日志"
---

# 核心特性：外部化配置、Profiles 与日志

::: info 本篇对应官方章节
[SpringApplication](https://docs.spring.io/spring-boot/reference/features/spring-application.html) · [外部化配置](https://docs.spring.io/spring-boot/reference/features/external-config.html) · [Profiles](https://docs.spring.io/spring-boot/reference/features/profiles.html) · [日志](https://docs.spring.io/spring-boot/reference/features/logging.html) · [JSON](https://docs.spring.io/spring-boot/reference/features/json.html) · [AOP](https://docs.spring.io/spring-boot/reference/features/aop.html) · [任务执行与调度](https://docs.spring.io/spring-boot/reference/features/task-execution-and-scheduling.html)
:::


> 这一篇对应官方 Reference 的 Core Features 一章（14 个页面）。配置管理是其中最容易被低估的部分 —— 大多数“配置没生效”的问题，根源都是不清楚配置从哪里来、谁覆盖谁。我们先把优先级讲透，再讲类型安全绑定、多环境隔离和日志。

## 本篇小节

- [一、外部化配置：搞清楚谁覆盖谁](/ch03/01)
- [二、@ConfigurationProperties：类型安全的配置绑定](/ch03/02)
- [三、Profiles：多环境隔离](/ch03/03)
- [四、日志](/ch03/04)
- [五、JSON 序列化](/ch03/05)
- [六、国际化](/ch03/06)
- [七、AOP：切面编程](/ch03/07)
- [八、任务执行与调度](/ch03/08)
- [九、其他特性要点](/ch03/09)
- [十、常见问题](/ch03/10)
