```shell
# golang  优化打包
 go build -o [File name] -ldflags="-s -w" [path/to/you/codefile]
 #对于x86的机器
 env GOOS=linux GOARCH=amd64 go build -o hosthatch -ldflags="-s -w" test/hosthatch/main.go
 # 压缩编译文件
 tar -czvf [Build file name].tar.gz [Build file] 
#后台运行程序
 nohup ./[Build file] > [Log file name].log 2>&1 &
ps aux | grep twaliray_amd64

```



```shell
ps aux --sort=-%mem | head -n 11

ps aux --sort=-%mem | awk 'NR==1 || NR<=11 {printf "%-10s %-7s %6s %6s %8.2fMB %8.2fMB %s\n", $1, $2, $3, $4, $5/1024, $6/1024, $11}'
```

