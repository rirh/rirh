```shell
# 先做快速预热
ab -n 100 -c 10 http://api.example.com/data  
# 持续 60 秒稳定测试
ab -t 60 -c 50 http://api.example.com/data  
# 模拟压缩请求
ab -n 1000 -c 20 -k -H "Accept-Encoding: gzip" http://api.example.com/data  
```

