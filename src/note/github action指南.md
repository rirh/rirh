# [Github Action](https://docs.github.com/zh/actions) 指南

持续集成和持续交付（CI/CD）的工具。

常见于自动执行生成，部署和测试。

## 规则

1. `.github/workflows`的文件默认为action文件
2. 工作流文件为yml文件

### 工作流（workflows）

工作流是一个大概念，从事件的开始到结束为一个工作流

## 事件（event）

特定的动作，最常见的为push（提交代码）。可以通过传统的操作自动触发事件，也可以手动触发事件。例如使用[api触发](https://docs.github.com/zh/rest/repos/repos?apiVersion=2022-11-28#create-a-repository-dispatch-event)

## 作业（jobs）

作业是action最核心的部件，他描述当前应该执行的操作和流程。当有多个作业的时候，配置多个作业之间的流程和依赖关系，让一个作业有另外一个丛属作业，等待丛属作业完成，这个作业才能完成。







