

# 包管理工具

本文对mac上npm开发的一些使用和配置分享， 假定阅读者已经有一定shell基础和前端工作流的知识。



### Pack 管理器  [brew](http://brew.sh/%20%20)

#### 安装：

```text
/usr/bin/ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"
```

| 命令 | 注释 |
| :--- | :--- |
| `brew –help` | 查看brew的帮助 |
| `brew install git` | 安装软件 |
| `brew uninstall git` | 卸载软件 |
| `brew search git` | 搜索软件 |
| `brew list` | 显示已经安装软件列表 |
| `brew update` | 更新软件，把所有的Formula目录更新，并且会对本机已经安装并有更新的软件用\*标明。 |
| `brew upgrade git` | 更新某具体软件 |
| `brew info git` | 显示软件内容信息 |
| `brew home` | 用浏览器打开网站 |
| `brew deps` | 显示包依赖 |
| `brew deps --installed --tree` | 显示包的依赖树 |
| `brew cleanup git` `brew cleanup` | 删除程序，和upgrade一样，单个软件删除和所有程序老版删除。 |
| `brew outdated` | 查看需要更新的已安装程序 |



## Node

#### 安装

```text
brew install nvm
```

 推荐安装安装nvm来管理Node版本；其次推荐brew来对node和npm版本进行管理。

 默认终端是在 `~/.bash_profile`文件下配置以下环境变量：

```text
# For NVM
export NVM_DIR=~/.nvm
source $(brew --prefix nvm)/nvm.sh
```

如果mac中没有该文件执行以下操作：



```text
 cd ~
 touch .bash_profile
 open -e .bash_profile
 source .bash_profile
 //查看配置是否成功
 echo $PATH
```

打开一个新的终端并输入nvm查看配置是否成功。



## NVM

#### 列出远程服务器上所有的可用版本



```text
nvm ls-remote
##### 执行结果

   $ nvm ls-remote
        v0.1.14
        v0.1.15
        v0.1.16
        v0.1.17
        v0.1.18
        v0.1.19
    ...
        v12.6.0
        v12.7.0
```

#### 安装对应的版本

```text
nvm install x.x.x
```

#### 查看已安装的列表

```text
//显示已安装的版本列表
nvm list;
```

#### 执行结果

```text
 $ nvm list
->       v4.1.0
       v10.16.0
default -> v10.16.0
node -> stable (-> v10.16.0) (default)
stable -> 10.16 (-> v10.16.0) (default)
iojs -> N/A (default)
unstable -> N/A (default)
lts/* -> lts/dubnium (-> v10.16.0)
lts/argon -> v4.9.1 (-> N/A)
lts/boron -> v6.17.1 (-> N/A)
lts/carbon -> v8.16.0 (-> N/A)
lts/dubnium -> v10.16.0
```

#### 切换node版本

```text
nvm use v10.16.0
```

#### nvm常用命令

| 命令 | 注释 |
| :--- | :--- |
| `nvm install` | 下载 |
| `nvm use 版本号` | 切换版本 |
| `nvm ls` | 已下载的版本 |
| `nvm ls-remote` | 远程版本列表 |
| `nvm alias default 版本` | 设置默认的版本 |

由于天朝网络被墙，npm安装国外包就会变的很慢，有时需要安装某个在国外的包将会耗费大量的时间。为了解决这个问题有很多勤劳无私开发者，使用国内镜像解决！并且服务都是免费的。这个操作被称为换源。但是换源是配置操作，经常操作会导致多处配置不一致，有些时候需要多个文件修改。如果不熟悉架构原理的程序员很容易遗忘某一处导致npm无法正常工作。因此，推荐使用nrm源管理工具

#### 安装

```text
npm install -g nrm
```

#### 使用

```text
//列出可选的源
nrm ls                                                                                                                                    

* npm ---- https://registry.npmjs.org/
  cnpm --- http://r.cnpmjs.org/
  taobao - http://registry.npm.taobao.org/
  eu ----- http://registry.npmjs.eu/
  au ----- http://registry.npmjs.org.au/
  sl ----- http://npm.strongloop.com/
  nj ----- https://registry.nodejitsu.com/
//带 * 的是当前使用的源，上面的输出表明当前源是官方源。

//切换
nrm use taobao 

//你可以增加定制的源，特别适用于添加企业内部的私有源。私有源可以使用cnpmjs架设。
nrm add  <registry> <url> [home]

//删除源
nrm del <registry>

//测试源的响应时间
//测试单个
nrm test npm 
//测试所有
nrm test   
//注意，为了取得较准确的结果，可以考虑多次测试取平均值。
```

#### npm 常用命令

```text
//1.一般情况下 一路enter
 $ npm init

 //2.全部使用默认配置
 $npm init --yes
 //全局安装
$ npm install 模块名 -g
//本地安装
$ npm install 模块名
//一次性安装多个
$ npm install 模块1 模块2 模块n --save

//安装运行时依赖包
$ npm install 模块名 --save
//安装开发时依赖包
$ npm install 模块名 --save-dev
//查看本地安装的目录
$ npm root

//查看全局安装的目录
$ npm root -g
//卸载本地模块
$ npm uninstall 模块名

//卸载全局模块
$ npm uninstall -g 模块名

$ npm update 模块名

$ npm update 模块名 -g
$ npm ls

$ npm ls -g
```

```text
package.json文件的配置说明：
{
  "name": "blog",  //项目名称
  "version": "0.0.0",   //版本
  "description": "",   //项目描述
  "private": true,  
  "main": "index.js",  //入口文件
  "scripts": {   //配置一些通用的命令脚本
    "start": "node ./bin/www"
  },
  "keywords": [],  //项目的关键字
  "author": "",  //作者
  "dependencies": {   //开发时的依赖
    "body-parser": "~1.16.0",
    "cookie-parser": "~1.4.3",
    "debug": "~2.6.0",
    "ejs": "~2.5.5",
    "express": "~4.14.1",
    "morgan": "~1.7.0",
    "serve-favicon": "~2.3.2"
  },
  "devDependencies": {   //运行时的依赖
    "express-session": "^1.15.1"
  }
}
```

[关于npm的安装机制](http://www.ruanyifeng.com/blog/2016/01/npm-install.html)


