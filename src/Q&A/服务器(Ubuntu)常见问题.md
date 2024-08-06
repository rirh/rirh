# 服务器(Ubantu)常见问题



### Ubuntu简介

Ubuntu近年来最热的操作系统。基于非常正统的Debian发行版，使用和Debian一样便捷的软件包管理。这个管理发行机制被认为是Linux/Unix下设计 最为完善的。它的apt-get和apitute命令， 不仅可以和yum一样，非常迅速的安装软件，还会自动设置用户和用户组的以及其他相关的配置信息，即使不是IT专业人士，对者手册或者Google, 也能像模像样的建起一个基本的服务器环境。这点体贴对于缺少IT专业支持的小公司而言，还是非常有帮助的。和Cent OS主要依靠社区提供支持不同，Ubuntu的背后是Canoical，这个公司本身也没什么，但它的老板是Mark Shuttleworth，偶像级的创业典范。他的数字认证公司曾经一度占据全球50％的份额，后来在1999年以5.75亿美元卖给了 VeriSign。当时他才刚从大学毕业3年，只有24岁！！

​	   他还是全球第二个自费的太空游客，关于他的详细事迹，请看这里。简单的说，这个老板是年轻，懂技术，有理想有追求又不缺钱的人，你愿意用他公司的产品吗？



## Q:如何服务器初始化？

1. 更新系统软件包：首先打开终端，然后输入以下命令来更新您的系统软件包：

   ```shell
   # 添加公钥匙并重启sshd
   echo 'ssh-ed25519 AAAAC3NzaC1lZDI1NTE5AAAAIJAGDmWcbssk5mCEbAyljKDjuHlnoogUWiCLJGvX8BGL only_tierhu@163.com' >> ~/.ssh/authorized_keys && systemctl restart sshd;
   
   # 更新软件
   sudo apt update 
   sudo apt upgrade 
   # 安装更新软件
   apt-get install software-properties-common
   # 获取源
   sudo add-apt-repository 'deb http://archive.ubuntu.com/ubuntu trusty universe'
   echo 'deb http://cz.archive.ubuntu.com/ubuntu xenial main' >> /etc/apt/sources.list
   # 安装mysql
   sudo apt-get update
   sudo apt install mysql-server-5.6
   sudo apt install mysql-client-5.6
   ```



## Q:如何快速登录服务器？

- #### 默认端口登录

  `ssh USER@SERVER_IP`（默认22端口）

- #### 指定端口登录

  `ssh -p PORT USER@SERVER_IP`（指定端口）

- #### 免密登录服务

  1. ##### 创建密钥文件并将公钥传输给服务器 

     ```
     cd ~/.ssh/ && ssh-keygen -t rsa -f KEY_NAME;
     //公钥传输给服务器 
     scp KEY_NAME.pub USER@SERVER_IP:.;
     ```

  2. ##### 进入服务器 公钥加入authorized_keys

     ```
     ssh USER@SERVER_IP ;
     cat ~/KEY_NAME.pub >> ~/.ssh/authorized_keys;
     重启sshd
     systemctl restart sshd;
     ```

  3. ##### 本地添加免密登录并验证

     ```shell
     在~/.ssh/config 文件添加以下内容
     
     Host SERVER_NAME
        HostName SERVER_IP           //服务器ip
        port SERVER_PORT             //默认的端口 22
        User USER                    //用户名
        IdentityFile ~/.ssh/KEY_NAME //私钥文件
        
     ```

  4. ##### 使用`ssh SERVER_NAME ` 进入服务区验证是否成功

     

## Q:如何安装MYSQL并远程连接NAVCAT?

1. #### 安装mysql

   ```
   sudo apt-get install mysql-server mysql-client
   // 执行初始化命令 用于设置密码
   mysql_secure_installation
   ```

   [安装提示](服务器(Ubuntu)常见问题.html#安装提示)

2. #### 测试是否安装成功(下图为安装成功)

   `sudo netstat -tap | grep mysql`
   ![image-20230302100512774](https://c18e-1257416358.cos.accelerate.myqcloud.com/image-20230302100512774.png)

   

3. #### 配置远程可访问（**配置完记得去云控制台规则开放3306端口**）

   ```
   # 注意：不同 mysql 版本此配置文件位置和名字可能不同（找有内容的配置文件）
   sudo vim /etc/mysql/mysql.conf.d/mysqld.cnf
   # 修改bind-address 和 mysqlx-bind-address
   bind-address            = 0.0.0.0
   mysqlx-bind-address     = 0.0.0.0
   ```

4. #### 重启服务并修改用户权限

   ```
   sudo /etc/init.d/mysql restart
   # mysql 添加用户并赋予远程访问权限
   mysql -u root -p;
   use mysql;
   create user 'v2board'@'%' identified by 'v2board';
   grant all on *.* to 'v2board'@'%';
   flush privileges;
   exit;
   ```

5. #### 测试是否配置成功

   `netstat -nlt|grep 3306`

   ![image-20230302101335947](https://c18e-1257416358.cos.accelerate.myqcloud.com/image-20230302101335947.png)

6. #### 使用navcat 或者mysql访问数据库

   ```
   mysql -h SERVER_IP -P 3306 -u root -p
   ```




## Q:如何安装python包管理工具，并使用虚拟目录管理环境？

1. #### 安装 Python 编译需要的依赖文件

   ```sh
   sudo apt-get install -y build-essential libbz2-dev libssl-dev libreadline-dev libsqlite3-dev tk-dev
   # for Numpy, Matplotlib, SciPy, etc.
   sudo apt-get install -y libpng-dev libfreetype6-dev 
   ```

2. #### 安装 pyenv

   ```sh
   curl -L https://raw.githubusercontent.com/yyuu/pyenv-installer/master/bin/pyenv-installer | bash
   ```

3. #### 写入配置文件

   把以下内容写入 ~/.bashrc。如果后面不能使用，考虑放入 ~/.profile 或者 ~/.bash_profile

   ```sh
   export PYENV_ROOT="$HOME/.pyenv"
   export PATH="$PYENV_ROOT/bin:$PATH"
   eval "$(pyenv init -)"
   eval "$(pyenv virtualenv-init -)"
   ```

4. ##### [pyenv常用命令](python.md#Python 版本管理工具)



## [Q:服务器免密登录github配置](https://docs.github.com/zh/authentication/connecting-to-github-with-ssh/generating-a-new-ssh-key-and-adding-it-to-the-ssh-agent?platform=linux)

1. ##### 生成新 SSH 密钥

   ```
   cd ~/.ssh && ssh-keygen -t ed25519 -C "your_email@example.com"
   ```

2. ##### 在后台启动 ssh 代理。

   ```sh
   eval "$(ssh-agent -s)"
   输出
   > Agent pid 59566
   ssh-add ~/.ssh/id_ed25519
   ```

3. ##### [打开github添加ssh-key](https://github.com/settings/keys)

## Q：如何解决ubuntu环境下uwsgi启动报错问题？

#### uwsgi成功访问返回502

```shell
apt-get install uwsgi-plugin-python
```



## Q:Ubantu 如何日志文件常用操作有哪些？

1. 查看日志文件前50行

   ```shell
   head -n 50 FILENAME
   ```

2. 查看日志文件后50行

   ```shell
   tail -n 50 FILENAME
   ```

3. 查看文件信息（文件大小为M）

   ```shell
   ls -lh FILENAME
   ```

4. 清空日志文件

   ```shell
   :> FILENAME
   ```

   

## Q: 如何申请免费证书

服务器网站申请免费证书需要使用 [acme.sh](https://github.com/acmesh-official/acme.sh)

##### [官方说明文档](https://github.com/acmesh-official/acme.sh/wiki/%E8%AF%B4%E6%98%8E)

1. ##### 安装软件

   ```shell
   curl https://get.acme.sh | sh -s email=my@example.com
   ```

2. ##### 配置dns

   ```shell
   ~/.acme.sh/ # 文件夹地址
   ~/.acme.sh/account.conf  # 账户配置地址
   ```

3. ##### 生成证书

   ```shell
   acme.sh   --issue   --dns dns_dp   -d aicbe.com -d *.bleoty.com
   acme.sh   --issue   --dns dns_dp   -d chat.aicbe.com 
   
   ```

   ##### 阿里云签发证书  唯一不同点 dns下划线后面的[名字](https://github.com/acmesh-official/acme.sh/wiki/dnsapi) 

   ```
   # 阿里云
   acme.sh   --issue   --dns dns_ali   -d shiniya.tigerzh.com 
   # cloudflare
   acme.sh   --issue   --dns dns_cf   -d api.aicbe.com 
   ```

   

4. ##### nginx配置到具体目录并重启服务

   ```shell
   acme.sh --install-cert -d hugsin.pp.ua \
   --key-file       /etc/nginx/cert/hugsin.pp.ua.key  \
   --fullchain-file /etc/nginx/cert/hugsin.pp.ua.pem \
   --reloadcmd     "service nginx force-reload"
   
   acme.sh --install-cert -d aicbe.com \
   --key-file       /etc/nginx/cert/aicbe.com.key  \
   --fullchain-file /etc/nginx/cert/aicbe.com.pem \
   --reloadcmd     "service nginx force-reload"
   ```

## Q: SSH一直超时 nginx 网址一直超时

**不排除防火墙开启 未开启22端口的可能性** 

## Q:SSH终端自动断开连接？

SSH终端自动断开的问题可能是由于以下几个原因造成：

1. 服务器端设置的超时时间过短导致连接被断开；
2. 客户端设置的KeepAlive时间过长或过短；
3. 防火墙或网络设备断开了连接；
4. SSH客户端和服务器端版本不兼容；
5. 系统休眠或断电等原因导致SSH连接断开。

解决此问题的方法如下：

1. ##### 在服务端将SSH连接超时的时间设置为较长时间（例如3600秒）：

```
sudo nano /etc/ssh/sshd_config
```

修改以下两行：
```
ClientAliveInterval 300
ClientAliveCountMax 3
```

变成：

```
ClientAliveInterval 3600
ClientAliveCountMax 0
```

2. ##### 在客户端的SSH配置文件`~/.ssh/config`中添加以下内容：

```
Host *
  ServerAliveInterval 60
```

3. ##### 检查防火墙或网络设备有没有限制SSH连接的时间，尝试关闭限制。

4. ##### 确保SSH客户端和服务器端版本兼容。

5. ##### 避免系统休眠或断电等情况，尽量保持连接的稳定。

## Q:服务器如何判文本全部上传完成？

可以通过一些方法来判断3个文件是否已经全部上传完毕：

1. 检查服务器文件系统中是否已经出现了这3个文件，可以使用命令`ls`来检查这些文件是否已经存在。

2. 检查上传的3个文件的大小是否和本地文件大小一致，可以使用命令`ls -l`来查看文件大小。

3. 检查3个文件的MD5值是否与本地文件的MD5值相同，在本地计算出这3个文件的MD5值并与上传到服务器后的文件进行比较，如果相同则说明文件已经上传完毕。

4. 可以在上传完3个文件后，在服务器端创建一个标志文件，并在执行其他脚本之前检查该标志文件是否存在，如果存在则说明3个文件已经全部上传完毕，可以开始执行其他脚本。

以上是几个常见的判断文件上传完毕的方法，可以根据实际需求选择一种或多种方法来实现。

python脚本举例一种可行的方法是使用文件锁。在上传每个文件之前，创建一个空的锁文件。上传完成后，将相应的锁文件更新为所需的内容。当所有的锁文件都被更新时，就可以确定所有的文件都已上传完成。可以使用Python的os模块中的open()和write()函数来创建并更新锁文件。以下是一个示例：

```python
import os

# 创建锁文件
with open('file1.lock', 'w'):
    pass

with open('file2.lock', 'w'):
    pass

with open('file3.lock', 'w'):
    pass

# 更新锁文件
with open('file1.lock', 'w') as f:
    f.write('File 1 uploaded')

with open('file2.lock', 'w') as f:
    f.write('File 2 uploaded')

with open('file3.lock', 'w') as f:
    f.write('File 3 uploaded')

# 检查所有锁文件是否都已更新
if all(os.stat(lockfile).st_size > 0 for lockfile in ['file1.lock', 'file2.lock', 'file3.lock']):
    print('All files uploaded')
else:
    print('Not all files uploaded')
```

在上传文件时，可以使用此类代码对每个文件进行锁定和解锁，以确保在上传过程中其他进程或线程不会修改文件。





##### 安装提示

```
// 保护MySQL服务器部署
Securing the MySQL server deployment.

// 使用空白密码连接到MySQL
Connecting to MySQL using a blank password.

验证密码组件可用于测试密码，
提高安全性。它检查密码的强度，
并且允许用户仅设置那些足够安全的密码。
是否要设置验证密码组件？
VALIDATE PASSWORD COMPONENT can be used to test passwords
and improve security. It checks the strength of password
and allows the users to set only those passwords which are
secure enough. Would you like to setup VALIDATE PASSWORD component?
// 按y或者Y表示是，按任何其他键表示否
Press y|Y for Yes, any other key for No: n



设置root的密码
Please set the password for root here.
New password:

默认情况下，MySQL安装有匿名用户，
允许任何人登录MySQL，而无需
为他们创建的用户帐户。这仅用于测试，
并使安装过程更加顺利。
您应该在进入生产环境之前删除它们。
删除匿名用户？建议 n
By default, a MySQL installation has an anonymous user,
allowing anyone to log into MySQL without having to have
a user account created for them. This is intended only for testing,
and to make the installation go a bit smoother.
You should remove them before moving into a production environment.

Remove anonymous users? (Press y|Y for Yes, any other key for No) : n

Normally, root should only be allowed to connect from 'localhost'. This ensures that someone cannot guess at the root             password from the network. Disallow root login remotely? (Press y|Y for Yes, any other key for No) : n
By default, MySQL comes with a database named 'test' that
anyone can access. This is also intended only for testing,
and should be removed before moving into a production
environment.

Remove test database and access to it? (Press y|Y for Yes, any other key for No) : n
Reloading the privilege tables will ensure that all changes
made so far will take effect immediately.

Reload privilege tables now? (Press y|Y for Yes, any other key for No) : y
```

