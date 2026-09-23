---
title: "工程结构、自动配置与依赖注入"
---

# 工程结构、自动配置与依赖注入

::: info 本篇对应官方章节
[代码结构](https://docs.spring.io/spring-boot/reference/using/structuring-your-code.html) · [自动配置](https://docs.spring.io/spring-boot/reference/using/auto-configuration.html) · [配置类](https://docs.spring.io/spring-boot/reference/using/configuration-classes.html) · [@SpringBootApplication](https://docs.spring.io/spring-boot/reference/using/using-the-springbootapplication-annotation.html) · [Bean 与依赖注入](https://docs.spring.io/spring-boot/reference/using/spring-beans-and-dependency-injection.html) · [运行应用](https://docs.spring.io/spring-boot/reference/using/running-your-application.html)
:::


> 上一篇的应用能跑起来，但它是“魔法”—— 你没写一行配置，Tomcat、DispatcherServlet、JSON 转换器就都就位了。这一篇把魔法拆开：代码为什么必须这么放，自动配置凭什么猜到你的意图，以及 Bean 是怎样被组装起来的。

## 本篇小节

- [一、代码结构：官方建议与背后的机制](/ch02/01)
- [二、@SpringBootApplication 三段式拆解](/ch02/02)
- [三、自动配置是怎么工作的](/ch02/03)
- [四、Bean 与依赖注入](/ch02/04)
- [五、实战：把 activity-server 的分层落下来](/ch02/05)
- [六、常见问题](/ch02/06)
