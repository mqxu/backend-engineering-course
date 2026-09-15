---
title: "数据访问：SQL、JPA 与 MyBatis-Plus"
---

# 数据访问：SQL、JPA 与 MyBatis-Plus

::: info 本篇对应官方章节
[数据访问总览](https://docs.spring.io/spring-boot/reference/data/index.html) · [SQL 数据库](https://docs.spring.io/spring-boot/reference/data/sql.html) · [NoSQL](https://docs.spring.io/spring-boot/reference/data/nosql.html)
:::


> 这一篇对应官方 Reference 的 Data 一章。前五篇把接口和安全做完了，但数据一直是存在内存里的：应用一重启，新增的资源就没了。这一篇解决持久化，并且要把两个绕不开的问题讲透——**N+1 查询**和**事务失效**。这两件事不会让程序报错，只会让它在数据量上来之后莫名其妙地变慢、或者改了数据却存不进去。

## 本篇小节

- [一、官方 Data 一章覆盖了什么](/ch06/01)
- [二、数据源：从自动配置到连接池](/ch06/02)
- [三、SQL 初始化：schema.sql 与 data.sql](/ch06/03)
- [四、JPA 之前：JdbcTemplate 与 JdbcClient](/ch06/04)
- [五、实体映射：把案例项目的实体讲透](/ch06/05)
- [六、Repository：从派生查询到 Specification](/ch06/06)
- [七、事务：边界、脏检查与失效场景](/ch06/07)
- [八、N+1 问题：实测对比](/ch06/08)
- [九、并发写入：不要读-改-写](/ch06/09)
- [十、H2 控制台](/ch06/10)
- [十一、MyBatis-Plus 接入 Spring Boot 4](/ch06/11)
- [十二、NoSQL 要点](/ch06/12)
- [十三、常见问题](/ch06/13)
- [附：本篇涉及的官方章节](/ch06/14)
