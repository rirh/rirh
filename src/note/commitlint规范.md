## 使用 `commitlint` 提高代码规范

```shell
# 1.全局安装commitizen
pnpm i -g commitizen	 
# 2.项目安装 cz-conventional-changelog 
pnpm i cz-conventional-changelog  
# 配置根目录下package.json
"config": {
   "commitizen": {
        "path": "node_modules/cz-conventional-changelog"
    }
}

#
"cz": "git add . && git cz && git push"

```
