# CURL

CURL是一个非常受欢迎的命令行工具，能够通过多种协议进行数据传输。它支持HTTP、FTP、SMTP等协议，是许多开发者和系统管理员的首选工具之一。本文将详细介绍CURL的使用方法，包括命令行参数、常用技巧和注意事项等内容。

### 一、什么是CURL？

CURL（全称：Client URL）是一个基于命令行的数据传输工具，可以通过多种协议进行数据传输。它最初是由Daniel Stenberg开发的，并得到了广泛的应用和推广。CURL可以用来实现HTTP、FTP、SMTP等协议的数据传输，非常适合需要通过网络进行数据交互的开发任务。CURL程序的源代码是开放的，可以在多种操作系统上使用。

### 二、CURL的命令行参数

CURL的命令行参数非常多，这里列出一些最常用的参数，供读者参考。

##### 1、-I/--head

使用该参数可以只发送HTTP头信息，而不下载HTTP数据。比如：

$ curl -I www.example.com

这个命令只会显示HTTP头信息，不会下载网页源代码。

##### 2、-L/--location

如果一个网页返回的是重定向信息，那么CURL默认是不会跟随重定向的。例如：

$ curl http://www.example.com

如果该网页返回的是重定向信息，那么就会提示“301 Moved Permanently”，但不会跳转到新的地址。如果想要跟随重定向，就需要使用-L参数，例如：

$ curl -L http://www.example.com

##### 3、-o/--output

使用该参数可以将下载的内容保存在本地文件中。比如：

$ curl -o test.html http://www.example.com

这个命令会将www.example.com的源代码保存在test.html文件中。

##### 4、-O/--remote-name

如果CURL下载的内容是一个文件，那么该文件会被保存在当前目录下，并使用与下载文件相同的名称。如果希望使用默认名称保存文件，可以使用-O参数，例如：

##### $ curl -O http://www.example.com/test.pdf

这个命令会下载www.example.com/test.pdf文件，并将其保存在当前目录下，文件名为test.pdf。

5、-v/--verbose

使用该参数可以显示CURL的详细处理过程，包括向服务器发送的请求、服务器响应、网络协议信息等。比如：

$ curl -v http://www.example.com

这个命令会显示CURL向www.example.com发送的请求、服务器返回的响应、以及网络协议信息。

##### 6、-A/--user-agent

使用该参数可以指定CURL发送请求时使用的User-Agent。User-Agent是HTTP协议中的一个标识符，用于标识发送请求的浏览器类型。比如：

$ curl -A 'Mozilla/5.0 (Windows NT 10.0; WOW64; Trident/7.0; rv:11.0) like Gecko' http://www.example.com

该命令会发送一个User-Agent为Mozilla/5.0 (Windows NT 10.0; WOW64; Trident/7.0; rv:11.0) like Gecko的请求，类似于IE浏览器的请求。

##### 7、-u/--user

使用该参数可以让CURL发送HTTP基本认证信息。HTTP基本认证是一种通过用户名和密码进行的简单认证方式。比如：

$ curl -u username:password http://www.example.com

该命令会向www.example.com发送一个带有用户名和密码的认证请求。

### 三、CURL的常用技巧

除了命令行参数，CURL还有一些常用的技巧，可以提高开发效率和数据传输质量。下面列出一些常用技巧，供读者参考。

##### 1、使用Cookie

HTTP协议中有一个Cookie机制，可以用来跟踪用户的会话状态。在CURL中，可以使用-cookie参数来处理Cookie。比如：

$ curl -b 'name=value' http://www.example.com

该命令会向www.example.com发送一个带有Cookie信息的请求。需要注意的是，如果Cookie信息中包含空格或其他特殊字符，需要使用双引号或单引号将其括起来。

##### 2、处理POST请求

在HTTP协议中，POST请求是一种将数据提交到服务器的方式。在CURL中，可以使用-d参数来处理POST请求。比如：

$ curl -d 'name=value' http://www.example.com

该命令会向www.example.com发送一条POST请求，数据为name=value。如果要发送多个数据，可以使用多个-d参数，例如：

$ curl -d 'name=value1' -d 'age=18' http://www.example.com

该命令会发送两条数据到www.example.com，分别为name=value1和age=18。

##### 3、使用代理服务器

如果需要在CURL中使用代理服务器，可以使用参数-x/--proxy。比如：

$ curl -x http://www.example.com:8080 http://www.baidu.com

该命令会将www.baidu.com的请求发送到代理服务器www.example.com:8080，并由代理服务器转发给www.baidu.com。需要注意的是，如果代理服务器需要进行认证，可以使用参数--proxy-user和--proxy-password来指定代理服务器的用户名和密码。

##### 4、下载文件并控制速度

如果需要限制CURL下载数据的速度，可以使用参数--limit-rate。该参数可以控制CURL的下载速度，其单位为每秒字节数。比如：

$ curl --limit-rate 100K -O http://www.example.com/bigfile.zip

该命令会限制CURL下载bigfile.zip文件的速度不超过100KB/s。

##### 5、通过DNS解析器访问网络

如果需要使用自己指定的DNS解析器，可以使用参数--dns-servers。比如：

$ curl --dns-servers 8.8.8.8 http://www.example.com

该命令会使用Google的DNS解析器8.8.8.8来解析www.example.com的IP地址。

### 四、CURL的注意事项

使用CURL需要注意以下一些事项。

##### 1、安全性问题

CURL的设计目标是方便和易用，但也存在一定的安全性问题。特别是，在通过CURL发送HTTP请求时需要慎重处理，避免被黑客利用进行攻击。如需要发送敏感信息，建议使用加密方式进行传输。

##### 2、认证问题

当使用CURL发送HTTP请求时，如果需要进行认证，需要注意认证信息的保密性。为了保护用户的信息安全，建议使用加密方式进行传输，并且定期更新密码。

##### 3、网络状况

CURL的性能和稳定性受网络状况的影响很大。在使用CURL时，需要注意网络状况是否稳定，避免网络故障导致数据传输失败。

##### 4、命令行参数

CURL的命令行参数非常多，具有一定的复杂性。在使用CURL时，需要详细了解每一个命令行参数的含义和用法，以免出现无法预料的问题。



### 常用技巧

1. ##### 结合管道拷贝返回的数据到剪切板（适用于返回数据太大无法显示）

   ```
    curl http://www.example.com | pbcopy
   ```

2. ##### 发送POST请求：

```
curl -X POST -d '{"key1":"value1", "key2":"value2"}' https://example.com/api/
```

3. ##### 设置HTTP头部：

```
curl -H "Authorization: Bearer TOKEN" https://example.com/api/
```

4. ##### 下载文件：

```
curl -O https://example.com/file.csv
```

5. ##### 设置代理：

```
curl --proxy http://proxy.example.com:8080 https://example.com/api/
```

6. ##### 发送JSON数据：

```
curl -H "Content-Type: application/json" -d '{"key1":"value1", "key2":"value2"}' https://example.com/api/
```

7. ##### 设置超时时间：

```
curl --connect-timeout 10 https://example.com/api/
```

8. ##### 显示HTTP响应头部：

```
curl --head https://example.com/api/
```

9. ##### 显示HTTP响应状态码：

```
curl -o /dev/null -w "%{http_code}" https://example.com/api/
```

10. ##### 发送FormData数据：

```
curl -F 'key1=value1' -F 'key2=value2' https://example.com/api/
```

11. ##### 发送PUT请求：

```
curl -X PUT -d '{"key1":"value1", "key2":"value2"}' https://example.com/api/
```

12. ##### 配合chrome调试面板使用

![image-20230707181815328](https://c18e-1257416358.cos.accelerate.myqcloud.com/image-20230707181815328.png)

```
curl 'https://www.google.com.hk/complete/search?q=curl%E7%9A%84%E7%94%A8%E6%B3%95&cp=0&client=desktop-gws-wiz-on-focus-serp&xssi=t&gs_pcrt=3&hl=zh-CN&authuser=0&pq=curl%E7%9A%84%E7%94%A8%E6%B3%95&psi=KuanZLupFtPbkPIP-eez8AI.1688725034734&dpr=1&ofp=EAEYlIPkhe718NByGLL7-47f35Ck9gEY89-jovPo1K6gARicj4z1hZf_vmkYr__a8OqR97npATKwAQoGCgRDdXJsCgwKCmN1cmzoj5zpuJ8KEQoPY3VybCBwb3N06K-35rGCChkKF2N1cmwgZ2V06K-35rGC5bim5Y-C5pWwChIKEGN1cmzoj5zpuJ_mlZnnqIsKDAoKY3VybOW3peWFtwoQCg5jdXJsIGdldOWPguaVsAoMCgpjdXJs5Zyo57q_ChIKEGN1cmzlkb3ku6Tor6bop6MKEgoQY3VybOayoeaciei_lOWbnhBH&newwindow=1' \
  -H 'authority: www.google.com.hk' \
  -H 'accept: */*' \
  -H 'accept-language: zh-CN,zh;q=0.9,en;q=0.8,de;q=0.7' \
  -H 'cookie: OTZ=7078008_24_24__24_; ANID=AHWqTUmxJ7J54da9yPgt4rc2oKtR1dxnTIB7dYRA7OkFW2kXrbQJ-NYYykmpWyu3; 1P_JAR=2023-07-07-10; AEC=Ad49MVEbAr31Fc73qW_Ubv_06IrOw_DfKwRDJzWgaJYTHDpzyjGzR7fChw; NID=511=aDLzh4ITuKXbQCTvDUVSl07-_KI-cqzVPIxjA0qLxnmoVi36S3Q_omnDOERtOr9TlPGRaOl0mRqk1da7RLFLJSRwIFtC1x8_JeMhqtc-QstIYDM0CX369sfBtGihmhI9nPhBarZwVCvu2FWt_JOAqOn7tbgxL950KYhHPpH9Y1AxFaYyXzCGaDw8FCvsb3YoVcKghp59uA' \
  -H 'referer: https://www.google.com.hk/' \
  -H 'sec-ch-ua: "Not.A/Brand";v="8", "Chromium";v="114", "Google Chrome";v="114"' \
  -H 'sec-ch-ua-arch: "arm"' \
  -H 'sec-ch-ua-bitness: "64"' \
  -H 'sec-ch-ua-full-version: "114.0.5735.198"' \
  -H 'sec-ch-ua-full-version-list: "Not.A/Brand";v="8.0.0.0", "Chromium";v="114.0.5735.198", "Google Chrome";v="114.0.5735.198"' \
  -H 'sec-ch-ua-mobile: ?0' \
  -H 'sec-ch-ua-model: ""' \
  -H 'sec-ch-ua-platform: "macOS"' \
  -H 'sec-ch-ua-platform-version: "13.4.1"' \
  -H 'sec-ch-ua-wow64: ?0' \
  -H 'sec-fetch-dest: empty' \
  -H 'sec-fetch-mode: cors' \
  -H 'sec-fetch-site: same-origin' \
  -H 'user-agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Safari/537.36' \
  -H 'x-client-data: CJC2yQEIpLbJAQipncoBCPzkygEIlaHLAQiEk80BCIagzQEI5LDNAQjus80BCNq0zQEI3L3NAQi8vs0BCNe+zQEIpb/NAQi8v80BCP6/zQEY2J3NAQ==' \
  --compressed ｜ 
```