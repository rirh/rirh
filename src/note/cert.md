

# HTTPS 配置示例
## 准备

**环境: CentOS Linux release 7.5.1804 (Core)**
**阿里云 服务器**

- 按照本文的配置能够服务器添加ssl证书
- 开启关闭防火墙
- 根据设置开启防火墙白名单

 ## 1. **进入阿里云后台 进入`管理控制台`>`域名`**
 ## 2. **点击`蓝色域名`进入下面页面**
![在这里插入图片描述](https://c18e-1257416358.cos.accelerate.myqcloud.com/uPic/20190415095220405.png)
 ## 3. **`免费开启SSL证书`>`选择证书`>填写要申请的前缀(例如: api 证书:api.XXX.com)**

![在这里插入图片描述](https://c18e-1257416358.cos.accelerate.myqcloud.com/uPic/20190415095926933.png)
![在这里插入图片描述](https://c18e-1257416358.cos.accelerate.myqcloud.com/uPic/20190415100205440.png)

## 4. **下载证书**
![在这里插入图片描述](https://c18e-1257416358.cos.accelerate.myqcloud.com/uPic/20190415100326713.png)
**选择服务器类型下载完是zip文件 文件名的三段代表 `id_域名_服务器 重命名文件和文件夹为方便记忆的`** 

> **有很多方式可以把证书放入服务器 
> LZ选择的是放在项目中 通过github的方式上传至服务器**
>

 - **把证书文件夹 放入`/etc/nginx` (默认配置文件夹)**
 - `cp -rf 证书文件夹 /etc/nginx `
 - **打开nginx位置文件`/etc/nginx/nginx.conf` (默认配置文件夹)**
 -  **` vim /etc/nginx/nginx.conf`**

```
  server {
    listen 443;
    server_name www.abc.com;
    ssl on;
    root /usr/share/nginx/html;
    ssl_certificate  cert/www.abc.com.pem;
    ssl_certificate_key cert/www.abc.com.key;
    ssl_session_timeout 5m;
    ssl_ciphers ECDHE-RSA-AES128-GCM-SHA256:ECDHE:ECDH:AES:HIGH:!NULL:!aNULL:!MD5:!ADH:!RC4;
    ssl_protocols TLSv1 TLSv1.1 TLSv1.2;
    ssl_prefer_server_ciphers on;
    location / {
         try_files $uri $uri/ /index.html;
         access_log  /var/log/nginx/blog.log  main;
      }
    }
    
```
 **配置完成保存退出**

##  **测试配置是否可用**

> **`nginx -t`**

> **如果出现下面的字样说明配置可用**![在这里插入图片描述](https://c18e-1257416358.cos.accelerate.myqcloud.com/uPic/20190415102446978.png)


 - **重载配置(重启nginx)**

> **`nginx -s reload`**

## 防火墙配置

**因为安全问题打开服务器防火墙**

    启动一个服务：systemctl start firewalld.service
    关闭一个服务：systemctl stop firewalld.service
    重启一个服务：systemctl restart firewalld.service
    显示一个服务的状态：systemctl status firewalld.service
    在开机时启用一个服务：systemctl enable firewalld.service
    在开机时禁用一个服务：systemctl disable firewalld.service
    查看服务是否开机启动：systemctl is-enabled firewalld.service;echo $?
    查看已启动的服务列表：systemctl list-unit-files|grep enabled

**因为项目中使用到数据库有关工具 
所以打开防火墙 导致网站端口无法访问**
 - **解决方法:添加端口80 443过滤**

> **` firewall-cmd --zone=public --add-port=80/tcp --permanent`**

> **`iptables -I INPUT -p tcp --dport 80 -j ACCEPT`**

> **` firewall-cmd --zone=public --add-port=443/tcp --permanent`**

>  **`iptables -I INPUT -p tcp --dport 443 -j ACCEPT`**

**重新启动nginx大功告成**


**关于防火墙**

>  **`firewall-cmd --list-ports`**

**开启端口**

>  **`firewall-cmd --zone=public --add-port=80/tcp --permanent`**

**命令含义**

>  **`firewall-cmd --zone=public --add-port=80/tcp --permanent`**

## 命令含义：

`–zone` #作用域

`–add-port=80/tcp` #添加端口，格式为：端口/通讯协议

`–permanent` #永久生效，没有此参数重启后失效

## 重启防火墙

`firewall-cmd --reload` #重启firewall
`systemctl stop firewalld.service` #停止firewall
`systemctl disable firewalld.service` #禁止firewall开机启动
`firewall-cmd --state` #查看默认防火墙状态（关闭》notrunning，开启》running
