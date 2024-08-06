# Git 优雅指南

#### 约定式提交的出现

起初git提交写commit不是为了别人能看懂，而是能顺利的让程序跑起来。但随着项目的规模逐渐庞大，大家提交各写各的commit会很乱，今天我们的主角[`Conventional Commits`](https://link.juejin.cn/?target=https%3A%2F%2Fwww.conventionalcommits.org%2Fen%2Fv1.0.0%2F)登场。他是一个提交格式规范，按照这个提交。你的提交记录也会变的很优雅



#### 规范规则

> <类型>[可选 范围]: <描述>

它总共分为三个部分

- 标题行 描述修改的类型、简短的描述 （必填）
- 主题内容 描述修改的内容 （可选）
- 页脚注释 通常用于放`issues` （可选）



#### 添加依赖

```shell
pnpm i -D commitizen cz-conventional-changelog cz-conventional-changelog-zh && commitizen init cz-conventional-changelog --save --save-exact
```

##### 添加中文版本

```shell
pnpm i -D cz-conventional-changelog-zh
```

##### 修改package.json中的 config.commitizen.path字段的值为"./node_modules/cz-conventional-changelog-zh"

```json
"config": {
    "commitizen": {
       "path": "./node_modules/cz-conventional-changelog-zh"
    }
  }
```

##### 修改package.json中script的值

```json
 "scripts": {
    "git": "git add . && pnpm exec cz && git push",
    "changelog": "rm -rf CHANGELOG.md && conventional-changelog -p angular -i CHANGELOG.md -s -r 0"
  },
```

