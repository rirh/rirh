

# Mac 定时任务

## **用途**

- 每天重复的工作写成脚本
- 定时提醒吃饭
- 定时下班关机
- 定时自己写周报
- 定时打开页面签到
- 定时开启启动IDE和服务
- 每天早安晚安
- ...

## **设置方法**

1. [crontab](https://linuxtools-rst.readthedocs.io/zh_CN/latest/tool/crontab.html)
2. launchctl

官方推荐的为第二种方式，支持和友好性也更倾向于第二种。

本文主要介绍第二种方式的使用

```shell
# 加载命令
launchctl load xxx.plist
# 退出加载命令
launchctl unload xxx.plist
```

**Plist 文件配置**

**Mac OS X 中支持放 plist 的目录如下：**

- /Library/LaunchDaemons: 系统启动后就会执行
- /Library/LaunchAgents: 当用户登录系统后才会执行
- ~/Library/LaunchAgents: 用户自定义的 plist
- /System/Library/LaunchAgents: 由 Mac OS X 为用户定义的任务
- /System/Library/LaunchDaemons: 由 Mac OS X 定义的守护进程任务

**功课准备好开始**

1. 在对应权限的目录新建`.plist`配置文件
2. 使用加载命令加载定时任务配置文件

**大多数配置都集中在plist文件，plist文件的配置细分来讲**

```xml
<?xml version="1.0" encoding="UTF-8"?> <!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd"> 
<plist version="1.0">
    <dict>
        <!--Plist 名称，必须唯一--> 
        <key>Label</key>
        <string>com.zh.task</string> 
        <!-- 指定要运行的程序的名称，可以是一个程序或者是一段脚本 数组类型 -->   
        <key>ProgramArguments</key>
        <array>
            <string>/Users/zh/Desktop/task.sh</string> 
        </array>
        <!--
   						在 Plist 中，支持两种定时任务的设置：
              StartInterval：定义任务多长时间（单位，秒）执行一次
              StartCalendarInterval：这个配置类似在 crontab 中的配置，
              指定具体的执行日期、星期、每月、每日的各个时间点，
              具体参照上面的配置文件。月份和天数的配置类似。
        <key>StartInterval</key>
        <integer>3600</integer> 
        --> 
        <!-- 执行时间的指定 --> 
        <key>StartCalendarInterval</key> 
        <dict> 
            <!--在第几分钟会被执行 -->
            <key>Minute</key>
            <integer>00</integer>
            <!-- 在第几个小时会被执行-->
            <key>Hour</key> 
            <integer>22</integer> 
        </dict>
        <!-- 运行日志 -->
        <key>StandardOutPath</key>
        <!-- 日志路径 -->
        <string>/path/xxxx.log</string>
        <!-- 错误日志 -->
        <key>StandardErrorPath</key> 
        <!-- 日志路径 -->
        <string>/path/xxxx.err</string>
    </dict> 
</plist>
```





