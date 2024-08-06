


## 引子

> 因为公司的电脑是之前同事用过的电脑小L同学把电脑带回家重装系统，来到公司准备重新安装公司的webpack项目发现使用以下命令报错文件夹中也没有`node_modules`

```javascript
npm install -D 
```

## 解决方案

```
npm remove nativescript -g
npm cache clear --force
npm install nativescript -g

//如果使用没有效果

npm cache clear --force 
npm install --no-shrinkwrap --update-binary

```


