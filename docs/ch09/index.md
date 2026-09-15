---
title: "测试：单元测试、切片测试与 Testcontainers"
---

# 测试：单元测试、切片测试与 Testcontainers

::: info 本篇对应官方章节
[测试总览](https://docs.spring.io/spring-boot/reference/testing/index.html) · [测试 Spring 应用](https://docs.spring.io/spring-boot/reference/testing/spring-applications.html) · [测试 Spring Boot 应用](https://docs.spring.io/spring-boot/reference/testing/spring-boot-applications.html) · [测试模块](https://docs.spring.io/spring-boot/reference/testing/test-modules.html) · [测试工具](https://docs.spring.io/spring-boot/reference/testing/test-utilities.html) · [Testcontainers](https://docs.spring.io/spring-boot/reference/testing/testcontainers.html)
:::


前面八篇写下了 58 个测试。它们能跑，但一直没讲过为什么有的测试要起 Spring、有的不起，为什么有的连数据库、有的只造假对象——这些选择其实是分层的，选错了不会报错，只会让你花 10 秒等一个本该 10 毫秒跑完的断言。

这一篇把测试本身当成主题，回答四个问题：

- **该在哪一层测**：什么代码用普通单元测试，什么必须起容器
- **切片怎么切**：`@WebMvcTest` / `@DataJpaTest` 各自装配了什么，以及 Boot 4 把这批注解的包名搬到了哪里
- **端到端怎么做**：`RestTestClient` 替代 `TestRestTemplate` 的实际用法，以及 `TestRestTemplate` 到底是被废弃还是被搬走
- **真实数据库怎么办**：Testcontainers 从 1.x 升到 2.0 之后的模块与包名变化，以及没有 Docker 的环境怎么收场

配套工程是 `resource-hub-testing`，它是本篇的独立工程，只保留最小一套分层代码（Controller / Service / Repository / Entity），把篇幅全部留给测试。全篇 31 个用例，覆盖下面的每一层。

---

## 本篇小节

- [9.1 四层测试：先划线，再动手写](/ch09/01)
- [9.2 依赖怎么引：总入口与 4.x 的细粒度测试模块](/ch09/02)
- [9.3 第一层：纯单元测试，不启动任何容器](/ch09/03)
- [9.4 第二层：Web 切片与一批包名的迁移](/ch09/04)
- [9.5 数据访问切片：`@DataJpaTest`](/ch09/05)
- [9.6 第三层：整体测试，Mock 环境与真实端口](/ch09/06)
- [9.7 HTTP 测试客户端怎么选](/ch09/07)
- [9.8 条件装配怎么测：`ApplicationContextRunner`](/ch09/08)
- [9.9 第四层：Testcontainers，让测试跑在真实数据库上](/ch09/09)
- [9.10 Testcontainers 2.0：一次比 Boot 4 更彻底的模块拆分](/ch09/10)
- [9.11 没有 Docker 的环境，怎么收场](/ch09/11)
- [9.12 几个顺手就能用上的测试工具](/ch09/12)
- [9.13 问题速查](/ch09/13)
- [9.14 小结与下一步](/ch09/14)
