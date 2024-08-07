# Liunx 常用命令

Linux是一种常见的操作系统，它是一个开源软件，可以免费获得，并且可以自由修改和分发。 Linux被广泛用于服务器、个人计算机、移动设备和嵌入式系统。它是一个**高度可定制且安全的操作系统**，

##### 优点：

 1.安全性： Linux操作系统非常安全，因为它开发了一个强大的安全系统，可以有效地保护系统免受恶意软件和黑客攻击。

 2.稳定性： Linux平台是非常稳定的，这使得它成为服务器和高可用性系统的首选操作系统。

 3.开放性： Linux是一种开放的操作系统，任何人都可以参与开发和改进这个操作系统。

 4.免费性： Linux是免费的，因此它比其他操作系统更具成本效益。

 5.移植性： Linux操作系统可以在不同的硬件平台上运行，包括PC、MAC、嵌入式设备等。

##### 实用性：

1.服务器应用：Linux是一个出色的服务器平台。它具有高性能、稳定性和可靠性，非常适合用于企业级的Web服务器、邮件服务器和档案管理服务器。

2.开发应用：Linux具有各种编程语言和开发工具，例如GCC编译器，Eclipse集成开发环境等。

3.安全应用：Linux被广泛用于安全应用程序和安全审计工具。例如，破解工具如kali Linux可以用来评估网络的安全程度。

4.嵌入式系统：Linux被广泛应用于嵌入式系统和智能设备。因为它可以运行在不同的硬件平台上，并提供了丰富的服务，例如连接、多线程处理和多媒体处理等。

## vim命令

```shell
sudo vim file1
# 默认进入普通模式，可以移动光标，删除文本等等
# 连续两次dd删除当前行

# 进入编辑模式：按”a”（append／追加）键或者”i”（insert／插入）
# 模式切换：ESC 键回到普通模式
# 退出保存: 按ESC键, :wq

i —— 插入模式，这个模式让你你可以像记事本一样的输入文本，如果已经输入完了，按ESC返回Normal模式。
x —— 删除当前光标所在处的字符
:w —— 存盘
:q —— 退出，你可以使用 :wq来同时进行这两个操作
dd —— 剪切当前行
p —— 粘贴
hjkl —— 效果等同于←↓↑→，用于移动光标
:help<command> —— 显示相关命令的帮助
```


## 文件和目录操作

## 切换工作目录
```bash
cd /home 进入/home目录
cd .. 返回上一级目录
cd ../.. 返回上两级目录
cd ~user1 进入user1的主目录
cd - 返回上次所在的目录
pwd 显示当前工作目录
```
## 查看文件及目录
```bash
ls 查看目录中的文件
ls -F 查看目录中的文件
ls -l 显示文件和目录的详细资料
ls -a 显示隐藏文件
ls *［0-9］* 显示包含数字的文件名和目录名
cat 查看文件内容
more、less  分页显示文本文件内容
head、tail   显示文件头、尾内容
basename 显示文件名或目录名
dirname 显示文件或目录路径。
tree 显示文件和目录由根目录开始的树形结构
```

##  文件及目录的创建与删除
```bash
touch 创建空文件
echo 创建带有内容的文件
mkdir dir1 创建dir1目录
mkdir dir1 dir2 同时创建两个目录
mkdir -p /tmp/dir1/dir2 逐级创建多个目录
rm -f file1 删除file1文件，-f强制删除
rmdir dir1 删除dir1空目录
rm -rf dir1 强制删除dir1目录及其子目录及文件，-r表示递归删除
```

## 文件与目录的移动及复制
```bash
mv dir1 new_dir 重命名/移动一个目录
cp file1 file2 复制一个文件
cp dir/* . 复制一个目录下的所有文件到当前工作目录
cp -a /tmp/dir1. 复制一个目录到当前工作目录, -a表示所有
ln -s file1 lnk1 创建一个指向文件或目录的软链接
ln file1 lnk1 创建一个指向文件或目录的物理链接
```

## 文件查找与统计

```bash
# 在/下搜索名为file1的文件和目录
find / -name file1 

# 在/下搜索属于用户user1的文件和目录
find / -user user1 

# 在目录/home/user1中搜索带有.bin结尾的文件
find /home/user1 -name \*.bin 

# 搜索在过去100天内未被使用过的执行文件
find /usr/bin -type f -atime +100 

# 搜索在10天内被创建或者修改过的文件
find /usr/bin -type f -mtime -10 

# 搜索以.rpm结尾的文件并定义其权限
find / -name \*.rpm -exec chmod 755 ‘{}’ \; 

# 在所有txt文件中查找包含有python的文件。-l表示以列表显示
grep -l python *.txt  

# 查找etc及子目录包含python的文件，-i表示不区分大小写，-R表示递归
grep -iR python /etc/* 

# 寻找以.ps结尾的文件 
locate \*.ps 

# 显示一个二进制文件、源码或man的位置,比如bash命令
whereis bash 

# 显示一个二进制文件或可执行文件(比如bash)的完整路径
which bash 

# 统计text.txt中行数、字数、字符数
wc test.txt 
```

## 用户、群组和权限

##  群组的创建与删除
```bash
groupadd group_name 创建一个新用户组
groupdel group_name 删除一个用户组
groupmod -n new_group old_group 重命名一个用户组
newgrp group_name 登陆进一个新的群组以改变新创建文件的预设群组
```
##  用户的管理
```bash
useradd user1 创建一个新用户，可结合如下选项使用：
    -u 指定用户的UID
    -g 指定用户所属的群组
    -d 指定用户的home目录
    -c 指定用户的备注信息
    -s 指定用户所用的shell

# 修改用户属性
usermod -c “FTP User” -g system -d /ftp/user1 -s /bin/nologin user1 

# 删除一个用户
userdel user1 

# 密码管理
passwd 修改口令
passwd user1 修改一个用户的口令 （只允许root执行）
change -E 2020-12-31 user1 设置用户口令的失效期限

# 用户切换
id 查看用户的uid,gid及归属的用户组。
su 切换用户身份。
visudo 编辑/etc/sudoers文件的专属命令。
sudo 以另外一个用户身份（默认root用户）执行事先在sudoers文件允许的命令。
```

##  权限的分配

主要有两个命令：`chmod`是用来设置文件夹和文件权限，`chown`是用来设置用户组。

```bash
# 显示权限
ls -lh 

# 增加目录的所有人（u）、群组（g）以及其他人（o）读、写和执行的权限
# r, w, x分别代表读、写和执行
chmod ugo+rwx directory1 

# 删除群组（g）与其他人（o）对目录的读写执行权限，
chmod go-rwx directory1 

# 给文件aaa.sh可执行权限,+ 代表增加权限，-代表移除权限
chmod +x aaa.sh

# 给文件file1设置可读、可写和可执行的权限(r=4,w=2,x=1)
chmod 777 file1

# 改变一个文件的所有人属性
chown user1 file1

# 改变一个目录的所有人属性并同时改变改目录下所有文件的属性
chown -R user1 directory1 

# 改变文件的群组
chgrp group1 file1 

# 改变一个文件的所有人和群组属性
chown user1:group1 file1 
```

## 系统管理命令
系统管理命令中最重要的是服务器性能监控命令和进程管理命令，尤其是监控CPU和当前负载信息的`uptime`, 监控内存使用情况的 `free`, 监控磁盘使用情况的 `df`, 以管理进程的`top`, `ps`和 `kill`命令。
## 基础命令
```bash
who   显示在线登陆用户
whoami   显示当前操作用户
hostname   显示主机名
uname   显示系统信息
clear   清屏
alias   对命令重命名 如：alias showmeit="ps -aux" ，另外解除使用unaliax showmeit
ifconfig 查看网络情况
ping 测试网络连通
```

##  性能监控
```bash
chkconfig 管理Linux系统开机启动项
uptime 获取CPU运行时间和查询Linux系统负载等信息
free 监控内存及交换分区的使用
sar 全面地获取系统的CPU、运行队列、磁盘 I/O、内存和网络等性能数据。
df 查看磁盘使用情况 df -h 带有单位显示磁盘信息
netstat 显示网络状态信息，netstat -t可查看tcp连接
vmstat 虚拟内存统计
mpstat 显示各个可用CPU的状态统计
du 查看目录大小 du -h /home带有单位显示目录信息
iostat 统计系统IO
```

## 进程管理 
```bash
top 动态显示当前耗费资源最多进程信息
  - P: CPU 占用率大小的顺序排列进程列表  
  - M: 以内存占用率大小的顺序排列进程列表  
ps 显示瞬间进程状态 
ps -aux 全格式显示进程信息,BSD风格
ps -ef 全格式显示进程信息,System V风格
kill 杀死进程，可以先用ps 或 top命令查看进程的id，然后再用kill命令杀死进程。
killall 通过进程名终止进程
```

## 开机、关机与注销
```bash
shutdown -h hours:minutes & 按预定时间关闭系统 
shutdown -c 取消按预定时间关闭系统 
shutdown -r now 重启
reboot	重启
poweroff 关闭电源。
logout 注销。
```
