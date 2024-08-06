# SSH 不完整使用指南

## 免密登陆操作步骤

1. #### 在本地生成密钥对
    
    1. ##### 打开终端或命令行窗口，输入以下命令： 
    ```
    ssh-keygen -t rsa
    ```
    2. ##### 按 Enter 键确认默认文件名和文件位置。
    3. ##### 当提示输入密码时，可以选择不输入任何密码，直接按 Enter。
    
2. #### 把生成的公钥复制到服务器上
    
    1. ##### 使用 SSH 远程连接服务器。
    2. ##### 在服务器上创建 SSH 登录用户的 .ssh 目录，如果已存在，则跳过此步骤。
    ```
    mkdir ~/.ssh
    chmod 700 ~/.ssh
    ```
    3. ##### 将本地机的公钥文件的内容添加到服务器用户目录下的 .ssh/authorized_keys 文件中。
    ```
    touch ~/.ssh/authorized_keys
    chmod 600 ~/.ssh/authorized_keys
    cat id_rsa.pub >> ~/.ssh/authorized_keys
    ```
    
3. #### 关闭密码登录并测试
    
    1. ##### 修改 SSH 配置文件 /etc/ssh/sshd_config。
    ```
    vim /etc/ssh/sshd_config
    ```
    2. ##### 将下列语句的注释号 # 去掉，并修改后面的yes为no来禁用 SSH 密码登录。
    ```
    PasswordAuthentication no
    ```
    3. ##### 重新启动 SSH 服务。
    ```
    systemctl restart sshd
    ```
    4. ##### 从本地再次登录服务器，如果可以直接登录则说明 SSH 免密登录已成功。

## 本地链接SSH

| 代码                                  | 含义                           |
|---------------------------------------|--------------------------------|
| `ssh-keygen -t rsa -f`     **NAME**   | 生成密钥                       |
| `scp blog.pub root@101.201.234.154:.` | 拷贝文件到指定服务器默认路径   |
| cat FILE1 >> FILE2                    | 将文件一的内容追加的文件二里面 |
| `systemctl restart sshd`              | 重启ssh服务                    |
| `ssh-keygen -t rsa -C`     **EMAIL**  | 生成git ssh key                |

## 免密码登录服务器步骤

#### 1. 进入`~/.ssh/`文件夹生存密钥

   ```shell
   ssh-keygen -t rsa -f  NAME
   ```

#### 2. 拷贝共钥到服务器默认路径（生成的pub结尾文件）

   ```
   scp FILENAME root@101.201.234.154:.
   ```

## 3. 登录服务器并进入服务器`~/.ssh/`文件夹 

#### 4. .ssh文件夹下的authorized_keys尾部追加公钥文件内容

   ```shell
   cat FILE1 >> FILE2
   ```

#### 5. 重启服务端ssh服务

   ```
   systemctl restart sshd
   ```

#### 6. 回到客户端在`~/.ssh/`下新建config文件

   ```shell
   Host blog
      HostName 101.201.234.154 //服务器ip
      port 22                  //默认的端口
      User root                //用户名
      IdentityFile ~/.ssh/blog //私钥文件
   ```

   ```
   此时使用 ssh blog 将直接登录服务器 如果有错误可能是需要删除原来生成的known_hosts的文件就可以了
   ```

   ## 完整脚本流程

   ```shell
   cd ~/.ssh/;
   ssh-keygen -t rsa -f blog;
   scp blog.pub root@101.201.234.154:.;
   ssh root@101.201.234.154 -p 22;
   cd ~/.ssh/;
   cat ~/blog.pub >> ~/.ssh/authorized_keys;
   systemctl restart sshd;
   exit;
   cd ~/.ssh/;
   touch config;
   
   *********************** config *********************
   
   Host blog
      HostName 101.201.234.154 //服务器ip
      port 22                  //默认的端口
      User root                //用户名
      IdentityFile ~/.ssh/blog //私钥文件
      
   *********************** config *********************
   
   vim known_hosts 
   删除内容 dd后esc 冒号wq
   ssh blog
   
   ```

## 常用的 ssh 脚本：

1. #### 连接 ssh：
```
ssh user@hostname
```

2. #### 执行远程命令：
```
ssh user@hostname "command"
```

3. #### 复制文件到远程主机：
```
scp filename user@hostname:/remote/directory
```

4. #### 从远程主机下载文件：
```
scp user@hostname:/remote/file /local/directory
```

5. #### 复制目录到远程主机：
```
scp -r directory user@hostname:/remote/directory
```

6. #### 从远程主机下载目录：
```
scp -r user@hostname:/remote/directory /local/directory
```

7. #### 创建 ssh 密钥：
```
ssh-keygen
```

8. #### 将公钥复制到远程主机：
```
ssh-copy-id user@hostname
```

9. #### 开启 ssh 代理：
```
ssh -D 8080 user@hostname
```

10. #### 转发本地端口到远程主机：
```
ssh -L local_port:remote_host:remote_port user@hostname
```

