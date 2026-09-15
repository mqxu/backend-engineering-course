---
title: "打包与部署：可执行 jar、容器与原生镜像"
---

# 打包与部署：可执行 jar、容器与原生镜像

::: info 本篇对应官方章节
[打包总览](https://docs.spring.io/spring-boot/reference/packaging/index.html) · [高效打包](https://docs.spring.io/spring-boot/reference/packaging/efficient.html) · [Dockerfile](https://docs.spring.io/spring-boot/reference/packaging/container-images/dockerfiles.html) · [Buildpacks](https://docs.spring.io/spring-boot/reference/packaging/container-images/cloud-native-buildpacks.html) · [AOT 处理](https://docs.spring.io/spring-boot/reference/packaging/aot.html) · [GraalVM 原生镜像](https://docs.spring.io/spring-boot/reference/packaging/native-image/index.html) · [生产环境打包](https://docs.spring.io/spring-boot/reference/using/packaging-for-production.html)
:::


上一篇把应用变得可观测了，但还有个更前面的问题没回答：**它现在只能在你机器的 IDE 里跑。**

交付一个后端应用，要的不是“在我这儿能跑”，而是一个可以复制、可以分发、可以在别人机器上启动的东西。这一篇就从 `mvn package` 产出的那个 jar 开始，一路走到容器镜像和原生可执行文件。

具体回答五个问题：

- **那个 62MB 的 jar 里到底装了什么**：为什么 `BOOT-INF`、`org/springframework/boot/loader` 这些目录不能删，`Main-Class` 为什么指向框架的类而不是你的主类
- **分层是怎么工作的**：`layers.idx` 把 jar 分成四层的依据是什么，4.x 的 `jarmode` 换成了什么，为什么解压之后启动更快
- **容器化的两个细节**：为什么分层镜像和单层镜像大小一样却不一样快，为什么 `chown` 写错位置会让镜像凭空多出 64MB
- **JVM 上的 AOT 与 CDS**：不编译原生镜像也能做的两项优化，实测能把启动从 4.8 秒压到 1.65 秒，以及它们各自的限制
- **GraalVM 原生镜像**：构建代价、运行时取舍，以及它和 Spring 的封闭世界假设冲突在哪里

实测环境是本机 Java 21（Liberica）、Maven 3.9.11、Docker 29.4.0，另外单独装了 GraalVM 25.0.4 用于原生编译。所有启动耗时都是同一台机器上三次运行的结果，取中位数作参考。

---

## 本篇小节

- [11.1 可执行 jar 里装了什么](/ch11/01)
- [11.2 jarmode 从 layertools 换成了 tools](/ch11/02)
- [11.3 四层是按“变化频率”切的](/ch11/03)
- [11.4 JVM 上的 AOT：把 Bean 定义在构建期算好](/ch11/04)
- [11.5 CDS：把类加载的结果存下来](/ch11/05)
- [11.6 容器化：两个容易被忽略的细节](/ch11/06)
- [11.7 Buildpacks：不写 Dockerfile 的路线](/ch11/07)
- [11.8 GraalVM 原生镜像](/ch11/08)
- [11.9 从“能跑”到“能在生产上跑”](/ch11/09)
- [11.10 问题速查](/ch11/10)
- [11.11 小结与下一步](/ch11/11)
