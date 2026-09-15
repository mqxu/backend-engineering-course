---
title: "安全：Spring Security 与 JWT 认证"
---

# 安全：Spring Security 与 JWT 认证

::: info 本篇对应官方章节
[Web 安全](https://docs.spring.io/spring-boot/reference/web/spring-security.html) · [Security 总览](https://docs.spring.io/spring-boot/reference/security/index.html) · [OAuth2](https://docs.spring.io/spring-boot/reference/security/oauth2.html) · [Session](https://docs.spring.io/spring-boot/reference/web/spring-session.html)
:::


> 这一篇对应官方 Reference 的 Web 安全章节。第 4 篇结束时，任何人都能不登录就删掉资源——这显然不能上线。本篇给整套接口加上认证与授权：过滤链配置、BCrypt 密码存储、JWT 无状态认证、角色权限控制，以及前后端分离场景下的 401/403 响应格式。

## 本篇小节

- [一、认证与授权是两个问题](/ch05/01)
- [二、引入 starter 之后的默认行为](/ch05/02)
- [三、过滤链配置](/ch05/03)
- [四、密码怎么存](/ch05/04)
- [五、JWT 是什么，以及它的代价](/ch05/05)
- [六、认证流程](/ch05/06)
- [七、授权：两种配置方式](/ch05/07)
- [八、401/403 要返回 JSON](/ch05/08)
- [九、不把实体直接返回](/ch05/09)
- [十、测试怎么带身份](/ch05/10)
- [十一、实测抓到的真实 bug：`ROLE_` 前缀](/ch05/11)
- [十二、本章实测汇总](/ch05/12)
- [十三、常见问题](/ch05/13)
