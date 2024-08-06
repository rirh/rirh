

##### 页面性能优化方案（ **Web Application**）

- 客户端开启gzip打包
- 服务端配置gzipe

**判断是否开启gziped**

- 查看控制台network下请求的资源文件response-headers的content-encoding属性是否为gzip

**Nginx开启配置**

```shell
  代码片段
  ##
  # Gzip Settings
  ##

  gzip on;
  gzip_disable "msie6";
  gzip_comp_level 5;
  gzip_min_length 256;
  gzip_vary on;
  gzip_proxied any;
  # gzip_buffers 16 8k;
  # gzip_http_version 1.1;
  gzip_types
    application/atom+xml
    application/javascript
    application/x-javascript
    application/json
    application/ld+json
    application/manifest+json
    application/rss+xml
    application/vnd.geo+json
    application/vnd.ms-fontobject
    application/x-font-ttf
    application/x-web-app-manifest+json
    application/xhtml+xml
    application/xml
    font/opentype
    image/bmp
    image/svg+xml
    image/x-icon
    text/cache-manifest
    text/css
    text/plain
    text/vcard
    text/vnd.rim.location.xloc
    text/vtt
    text/x-component
    text/x-cross-domain-policy;
```

**完整示例**

```shell
user root;
worker_processes auto;
pid /var/run/nginx.pid;

events {
  worker_connections 1024;
  # multi_accept on;
}

http {

  ##
  # Basic Settings
  ##

  sendfile on;
  tcp_nopush on;
  tcp_nodelay on;
  keepalive_timeout 65;
  types_hash_max_size 2048;
  # server_tokens off;
  client_max_body_size 100m;
  server_names_hash_bucket_size 128;
  # server_name_in_redirect off;

  include /etc/nginx/mime.types;
  default_type application/octet-stream;
  proxy_intercept_errors on;
  ##
  # Logging Settings
  ##

  log_format  access  '$remote_addr - $remote_user [$time_local] "$request" '
        '$status $body_bytes_sent "$http_referer" '
        '"$http_user_agent" $http_x_forwarded_for '
        '$http_host， $upstream_addr，$upstream_response_time ，$request_time';

  access_log /data/logs/nginx_access.log  access;

  ##
  # Gzip Settings
  ##

  gzip on;
  gzip_disable "msie6";
  gzip_comp_level 5;
  gzip_min_length 256;
  gzip_vary on;
  gzip_proxied any;
  # gzip_buffers 16 8k;
  # gzip_http_version 1.1;
  gzip_types
    application/atom+xml
    application/javascript
    application/x-javascript
    application/json
    application/ld+json
    application/manifest+json
    application/rss+xml
    application/vnd.geo+json
    application/vnd.ms-fontobject
    application/x-font-ttf
    application/x-web-app-manifest+json
    application/xhtml+xml
    application/xml
    font/opentype
    image/bmp
    image/svg+xml
    image/x-icon
    text/cache-manifest
    text/css
    text/plain
    text/vcard
    text/vnd.rim.location.xloc
    text/vtt
    text/x-component
    text/x-cross-domain-policy;
 # text/html is always compressed by gzip module

  ##
  # nginx-naxsi config
  ##
  # Uncomment it if you installed nginx-naxsi
  ##

  #include /etc/nginx/naxsi_core.rules;

  ##
  # nginx-passenger config
  ##
  # Uncomment it if you installed nginx-passenger
  ##

  #passenger_root /usr;
  #passenger_ruby /usr/bin/ruby;

  ##
  # Virtual Host Configs
  ##

  include /etc/nginx/conf.d/*.conf;

  server {
    if ($host = qtflows.com) {
        set $domain $1;
        #rewrite ^(.*) https://$domain$1 break;
        rewrite ^ https://$http_host$request_uri? permanent;
    }
    if ($host = www.qtflows.com) {
        return 301 https://$host$request_uri;
    }
    
    listen 80;
    server_name qtflows.com www.qtflows.com;
    return 404;
  }

  upstream qcluster {
    ip_hash;
    server 127.0.0.1:81;
  }
  upstream backup {
    ip_hash;
    server 172.31.13.246:81;
  }

  server {
    listen 443 ssl;

    ssl_certificate /etc/nginx/cert/www.qtflows.com.pem;
    ssl_certificate_key /etc/nginx/cert/www.qtflows.com.key;

    ssl_protocols TLSv1 TLSv1.1 TLSv1.2;
    ssl_prefer_server_ciphers on;
    ssl_dhparam /etc/ssl/certs/dhparam.pem;
    ssl_ciphers 'ECDHE-RSA-AES128-GCM-SHA256:ECDHE-ECDSA-AES128-GCM-SHA256:ECDHE-RSA-AES256-GCM-SHA384:ECDHE-ECDSA-AES256-GCM-SHA384:DHE-RSA-AES128-GCM-SHA256:DHE-DSS-AES128-GCM-SHA256:kEDH+AESGCM:ECDHE-RSA-AES128-SHA256:ECDHE-ECDSA-AES128-SHA256:ECDHE-RSA-AES128-SHA:ECDHE-ECDSA-AES128-SHA:ECDHE-RSA-AES256-SHA384:ECDHE-ECDSA-AES256-SHA384:ECDHE-RSA-AES256-SHA:ECDHE-ECDSA-AES256-SHA:DHE-RSA-AES128-SHA256:DHE-RSA-AES128-SHA:DHE-DSS-AES128-SHA256:DHE-RSA-AES256-SHA256:DHE-DSS-AES256-SHA:DHE-RSA-AES256-SHA:AES128-GCM-SHA256:AES256-GCM-SHA384:AES128-SHA256:AES256-SHA256:AES128-SHA:AES256-SHA:AES:CAMELLIA:DES-CBC3-SHA:!aNULL:!eNULL:!EXPORT:!DES:!RC4:!MD5:!PSK:!aECDH:!EDH-DSS-DES-CBC3-SHA:!EDH-RSA-DES-CBC3-SHA:!KRB5-DES-CBC3-SHA';
    ssl_session_timeout 1h;
    ssl_session_cache shared:SSL:50m;
    ssl_stapling on;
    ssl_stapling_verify on;
    # add_header Strict-Transport-Security max-age=15768000;

    server_name qtflows.com www.qtflows.com;            # 站点名称

    location / {
      proxy_pass http://qcluster;
      proxy_set_header X-Real-IP $remote_addr;
      proxy_set_header Host $host;
      proxy_set_header Protocol-qutke $scheme;
      proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
      proxy_http_version 1.1;
      proxy_redirect ~^http://(.*?):\d+(.*)$ https://$1$2;
      error_page 404 403 502 504 = @fallback;
    }
    location @fallback {
      proxy_pass http://backup;
      proxy_set_header X-Real-IP $remote_addr;
      proxy_set_header Host $host;
      proxy_set_header Protocol-qutke $scheme;
      proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
      proxy_http_version 1.1;
    }
  }
}

```



