---
title: "缓存、校验与外部服务调用"
---

# 缓存、校验与外部服务调用

::: info 本篇对应官方章节
[缓存](https://docs.spring.io/spring-boot/reference/io/caching.html) · [校验](https://docs.spring.io/spring-boot/reference/io/validation.html) · [REST Client](https://docs.spring.io/spring-boot/reference/io/rest-client.html) · [邮件](https://docs.spring.io/spring-boot/reference/io/email.html) · [Quartz 调度](https://docs.spring.io/spring-boot/reference/io/quartz.html) · [任务执行与调度](https://docs.spring.io/spring-boot/reference/features/task-execution-and-scheduling.html)
:::


> 第 6 篇把数据落盘了，接口也稳了。这一篇处理的是“应用与外部世界打交道”的那一层：怎么让热点查询不要每次都打数据库（缓存），怎么保证进来的数据是干净的（校验），怎么可靠地调用别人的接口（REST Client），以及怎么按时间表自己干活（定时任务）。
>
> 这一篇里有一个特别值得留意的点：**缓存和定时任务都不会让程序报错**。它们失效的时候是静默的——你改了数据，用户看到的还是旧值；你写了预热任务，它压根没执行。这类问题的排查成本远高于一个直接抛出来的异常，所以本篇的实测部分会格外关注“怎么证明它真的生效了”。

## 本篇小节

- [一、官方 IO 一章覆盖了什么](/ch07/01)
- [二、缓存：把热点查询挡在数据库前面](/ch07/02)
- [三、参数校验：从 DTO 到配置项](/ch07/03)
- [四、调用外部服务：RestClient](/ch07/04)
- [五、配置里的 Duration：一个不会报错的坑](/ch07/05)
- [六、定时任务](/ch07/06)
- [七、发送邮件](/ch07/07)
- [八、Quartz：需要持久化的定时任务](/ch07/08)
- [九、常见问题速查表](/ch07/09)
- [附：本篇涉及的官方章节](/ch07/10)
