


##### 部署文件的原理

在本地创建文件`nc.txt`

```html
HTTP/1.1 200 OK
Content-Type: text/html
Server: linuxtime

<html>
<head>
<meta charset=UTF-8">
<title>hello nc</title>
</head>
<body>
<p>hello nc</p>
</body>
</html>
```

命令行工具

```shell
cat nc.txt | nc -l 8888
```

打开浏览器输入`http://localhost:8888`访问




