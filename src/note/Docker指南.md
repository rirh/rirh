# Docker指南

1. ### 安装 Docker：
   
   - ##### 在 Linux 上：
     
     - ##### 执行以下命令以安装 Docker：
       
       ```
       sudo apt-get update
       sudo apt-get install docker-ce docker-ce-cli containerd.io
       ```
     - ##### 验证 Docker 是否已正确安装：
       
       ```
       docker --version
       ```
   - ##### 在 macOS 上：
     
     - ##### 下载 Docker Desktop for Mac 安装包，并双击运行安装程序。
     - ##### 安装完成后，在 Launchpad 中找到 Docker 图标并启动。
   - ##### 在 Windows 上：
     
     - ##### 下载 Docker Desktop for Windows 安装程序，并双击运行安装程序。
     - ##### 安装完成后，在开始菜单中找到 Docker 图标并启动。
   
2. ### 验证 Docker 安装：
   
   - ##### 在终端或命令提示符中运行以下命令以验证 Docker 是否正确安装并正在运行：
     
     ```
     docker run hello-world
     ```
   
3. ### 使用 Docker Hub：
   
   - ##### Docker Hub 是一个容器镜像的注册表，您可以在其中找到各种公共镜像。
   - ##### 访问 Docker Hub 网站：https://hub.docker.com/
   - ##### 搜索并选择您需要的镜像。例如，我们选择 `nginx` 镜像。
   
4. ### 下载和运行镜像：
   
   - ##### 执行以下命令以从 Docker Hub 下载并运行 `nginx` 镜像：
     
     ```
     docker run -d -p 8080:80 nginx
     ```
      - `-d` 参数表示容器在后台运行。
      - `-p` 参数指定端口映射，将容器的端口 80 映射到主机的端口 8080。
   
5. ### 验证镜像是否正在运行：
   
   - ##### 执行以下命令以查看正在运行的容器：
     
     ```
     docker ps
     ```
   
6. ### 访问应用程序：
   
   - ##### 在浏览器中访问 `http://localhost:8080`，您应该能够看到 Nginx 的默认欢迎页面。
   
7. ### 停止和删除容器：
   
   - ##### 执行以下命令以停止并删除容器：
     
     ```
     docker stop CONTAINER_ID
     docker rm CONTAINER_ID
     ```
     其中，`CONTAINER_ID` 是您在第 5 步中获得的容器 ID。

### Docker常用命令

```shell
# 以Ubuntu为例
# Step 1: 移除之前docker版本并更新更新 apt 包索引
sudo apt-get remove docker docker-engine docker.io
sudo apt-get update

# Step 2: 安装 apt 依赖包，用于通过HTTPS来获取仓库
sudo apt-get install apt-transport-https ca-certificates curl software-properties-common

# Step 3: 添加 Docker 的官方 GPG 密钥
curl -fsSL https://mirrors.aliyun.com/docker-ce/linux/ubuntu/gpg | sudo apt-key add -

# Step 4: 设置docker稳定版仓库，这里使用了阿里云仓库
sudo add-apt-repository "deb [arch=amd64] https://mirrors.aliyun.com/docker-ce/linux/ubuntu $(lsb_release -cs) stable"
sudo apt-get update

# Step 5: 安装免费的docker Community版本docker-ce
sudo apt-get -y install docker-ce
# sudo apt-get install -y docker-ce=<VERSION> #该命令可以选择docker-ce版本

# Step 6: 查看docker版本及运行状态
sudo docker -v
sudo systemctl status docker

# Step 7：本步非必需。使用阿里云设置Docker镜像加速，注意下面链接请使用阿里云给自己的URL
sudo mkdir -p /etc/docker 
sudo tee /etc/docker/daemon.json <<-'EOF' 
{  "registry-mirrors": ["https://ua3456xxx.mirror.aliyuncs.com"] } 
EOF 
sudo systemctl daemon-reload 
sudo systemctl restart docker
```

接下来，我们来看下Docker的主要命令。

## Docker镜像操作

```shell
# 搜索镜像：docker search + 镜像名字
$ docker search nginx

# 从registry拉取镜像：docker pull + 镜像名字:版本号
$ docker pull nginx:latest

# 从registry仓库提交镜像：docker push + 仓库名:标签
$ docker push repro1:v1.0

# 查看本地镜像: docker images
$ docker images

# 使用Dockerfile创建镜像: docker build + 目录，.代表当前目录，-t表示加标签
$ docker build -t mynginx:1.0 .

# 删除一个或多个镜像: docker rmi + 镜像1 + 镜像2
$ docker rmi mynginx:1.0 mynginx:2.0

# 删除未标记或未用过的镜像
$ docker image prune

# 删除未使用过的镜像
$ docker image prune -a

# 给镜像加标记： docker tag 镜像标签 新镜像标签名
$ docker tag mynginx:1.0 nginx1

# 把镜像保存为.tar文件: docker save 镜像 > 文件
$ docker save mynginx:1.0 > mynginx_v1.tar

# 从.tar文件载入镜像: docker load -i .tar文件
$ docker load -i mynginx_v1.tar

# 根据容器创建镜像：docker commit 容器名 镜像名
$ docker commit 
```

## Docker容器操作

```shell
# 创建容器: docker create + 选项(-i, -t, -d, -p, -v, -e) + 镜像
$ docker create --name mynginx_1 -it -p 8080:80 mynginx:1.0

# 各选项含义
# -i:以交互模式运行容器，通常与-t 同时使用；
# -d:后台运行容器，并返回容器ID；
# -p:端口隐射, 宿主机在前，容器在后
# -P:随机映射宿主机端口
# -t:为容器重新分配一个伪输入终端，通常与-i 同时使用；
# -v:目录挂载
# --entrypoint: 指定进入点
# --restart=always: 服务重启

# 启动容器：docker start + 容器名
$ docker start mynginx_1

# 创建 + 运行容器: docker run + 选项 + 镜像 + 命令
$ docker run --name mynginx_1 -it -p 8080:80 mynginx:1.0
$ docker run -it ubuntu /bin/bash

# 查看正在运行中的容器：docker ps
$ docker ps

# 查看所有容器，包括停止运行的容器: docker ps -a
$ docker ps -a

# 停止一个正在运行的容器: docker stop 容器
$ docker stop mynginx_1

# 重启容器：docker restart + 容器名
$ docker restart mynginx_1

# 容器重命名：docker rename 老名字 新名字
$ docker rename mynginx_1 mynginx_2

# 删除一个容器：docker rm 容器名
$ docker rm mynginx_1

# 强制删除一个正在运行的容器：docker rm -f 容器名
$ docker rm -f mynginx_1

# 删除已停止运行的所有容器: docker container prune
$ docker container prune

# 拷贝文件，从容器到宿主机：docker cp 容器名:容器内路径 宿主机文件路径
$ docker cp myweb_1:/index.html index.html

# 拷贝文件，从宿主机到容器：docker cp 宿主机文件路径 容器名:容器内路径
$ docker cp index.html myweb_1:/index.html 

# 进入运行的容器，执行命令: docker exec + 选项 + 容器名 + 命令 + 参数
# 推荐大家使用 docker exec命令，使用此命令即使exit容器终端，也不会导致容器的停止
$ docker exec -it mynginx_1 /bin/bash
$ docker exec -it mynginx_1 /bin/bash start.sh

# 查看容器端口映射：docker port 容器名
$ docker port mynginx_1

# 查看容器内已修改文件：docker diff 容器名
$ docker diff mynginx_1

# 查看容器日志：docker logs + 容器名
$ docker logs web

# 查看容器内运行进程：docker top + 容器名
$ docker top web

# 查看容器的底层信息：docker inspect + 容器名
$ docker inspect web

# 利用inspect命令查看容器的IP地址
$ docker inspect web | grep "IPAddress"

# 查看运行容器的统计数据：docker stats
$ docker stats
```

## Dockerfile详解
使用`$ docker build`命令构建镜像时需要用到Dockerfile，它通常会包含如下命令：

| 命令                | 描述                                    | 示例                                          |
| ------------------- | --------------------------------------- | --------------------------------------------- |
| FROM                | 指定基础镜像                            | FROM python:3.8.3-alpine            |
| MAINTAINER          | 镜像创建者                             | MAINTAINER  大江狗                   |
| COPY       | 添加宿主机文件到容器，复制 | COPY .  /html/myapp |
| ADD | 添加宿主机文件到容器，复制+解压 | ADD myfile.tar /html/myapp |
| RUN            | 创建镜像时要执行的命令                  | RUN pip install -r requirements.txt |
| USER           | 切换执行后续命令的用户和用户组, 但这个用户必需首先已使用RUN的命令进行创建好了。 | RUN groupadd -r redis && useradd -r -g redis redis; USER redis(切换用户) |
| WORKDIR        | 指定工作目录                            | WORKDIR /html/myapp                           |
| CMD            | 容器启动时默认要运行的程序。如果执行 docker run 后面跟启动命令会被覆盖掉。 | CMD ["/bin/bash"] |
| ENV                 | 设置环境变量                            | ENV APP_HOME /html/myapp  |
| ENTRYPOINT          | 同CMD，但其不会被覆盖，可以和docker run命令传递的参数进行拼接执行。 | 如果设置：ENTRYPOINT ["nginx", "-c"] ， 运行`$ docker run  mynginx_1 -c /etc/nginx/myweb.conf`将默认执行命令：`nginx -c /etc/nginx/myweb.conf`。 |
| VOLUME              | 定义匿名数据卷。在启动容器时忘记挂载数据卷，会自动挂载到匿名卷。 | VOLUME /tmp |
| EXPOSE              | 容器暴露端口，供link到当前容器或通过docker network的容器，不会和宿主机端口映射关系。 | EXPOSE 8080 |

## Docker网络操作

Docker network 是主要是用做容器之间的通信，即组建容器之间的局域网，然后加入这个网络的容器可以使用别名(network-alias, 比如web, db)或者IP地址进行通信，就如同局域网中主机之间的相互访问。

**备注**：使用`-link` 也可以实现容器之间简单的网络，但是容器较多而且通信关系较为复杂时，使用network就更有条理。除此以外，官方也已经很早不建议使用`-link`方式进行容器互联，-link未来可能会被删除。

### 网络驱动程序

Docker 的网络驱动程序默认情况下有四个：`bridge`、`host`、`overlay `和 `macvlan`，还有一个特殊的网络驱动 none 用于禁止容器访问网络。

- `bridge`：默认的网络驱动程序。如果在创建的时候没有指定网络驱动，则默认使用 bridge，也就是桥接网络。跟虚拟机的网络地址转换差不多，通过一个内部的子网向容器提供 IP 和网络。
- `host`：容器会直接与宿主系统共享 IP 地址和网络，但是其它（例如存储，进程命名空间和用户命名空间）相对宿主机隔离的。
- `overlay`：覆盖网络模式可以将不同的Dockerd守护进程连接在一起，该网络模式支持集群容器之间相互通信，以及集群和某个单机版独立容器直接相互通信。该网络模式使用场景比较广泛，通常集群部署时会使用该模式。
- `macvlan`：这个网络驱动有点像虚拟机的桥接模式，它可以让你的容器直接连接到你的物理网络，比如连接到你的路由器，让物理网络来提供 IP 地址和网络。
- `none`: 禁用容器所有网络。通常与自定义网络驱动程序一起使用。

### 创建一个network

```shell
# mysite1-network是局域网的名字，可以自定义。默认bridge模式。
$ docker network create mysite1-network 

# 利用--driver或-d指定使用bridge驱动，创建mysite2-network网络
$ docker network create –-driver bridge mysite2-network

# 查看已创建的network列表
$ docker network ls  

# 查看网络详情
$ docker network inspect mysite1-network

```

### 将容器连接到network

```shell
# 运行新的容器，并加入到mysite1-network网络中
# --network 表示这个容器要连接到的网络
# --network-alias 表示这个容器在此网络中的名称，也可以使用--ip来指定容器的ip
$ docker run --name=docker-web -d --network=mysite1-network 
--network-alias=web docker-web-image

# 将已经在运行的容器加入网络使用以下命令, 容器名为docker-web，别名为web
$ docker network connect --alias=web --network=mysite1-network docker-web

# 连接网络时为docker-web容器指定ip地址
$ docker network connect --ip=192.10.36.122 multi-host-network docker-web

# 断开docker-web容器与mysite1-network的连接
$ docker network disconnet mysite1-network docker-web
```

### 删除network
```shell
# 删除mysite1-network网络
$ docker network rm mysite1-network
```

## Docker数据卷操作

```shell
# 列出所有数据卷
$ docker volume ls
# 使用过滤，列出所有未使用的数据卷
$ docker volume ls --filter dangling=true
# 删除一个数据卷
# 容器正在使用的数据卷不能删除，绑定挂载的无法删除。
$ docker volume rm <volume_name>
```

## Docker-Compose

安装docker-compose前必需先安装好docker。Docker-compose的下载和安装很简单，网上有很多教程，我就不再详述了。这里只记录下ubuntu系统下docker-compose的安装过程。

```shell
# Step 1: 以ubuntu为例，下载docker-compose
$ sudo curl -L https://github.com/docker/compose/releases/download/1.17.0/docker-compose-`uname -s`-`uname -m` -o /usr/local/bin/docker-compose
# Step 2: 给予docker-compose可执行权限
$ sudo chmod +x /usr/local/bin/docker-compose
# Step 3: 查看docker-compose版本
$ docker-compose --version
```

## Docker-compose.yml配置文件

```shell
# 第一部分: Building(构建镜像)
web:
  # 使用当前目录下的Dockerfile
  build: .
  args: # 增加额外参数
    APP_HOME: app
  volumes: # 目录挂载
    - .:/code
  depends_on: # 依赖db和redis
    - db
    - redis
    
  # 使用定制化的Dockerfile，指定新目录相对路径和文件名
  build:
    context: ./dir 
    dockerfile: Dockerfile.dev
    container_name: app # 自定义容器名
    
  # 基于现有镜像构建
  image: ubuntu
  image: ubuntu:14.04
  image: remote-registry:4000/postgresql
  image: bcbc65fd
  
# 第二部分: Ports(端口)
  ports: # 指定端口映射，HOST:Container
    - "6379" # 指定容器的端口6379，宿主机会随机映射端口
    - "8080:80"  # 宿主机端口8080，对应容器80

  # 暴露端口给-link或处于同一网络的容器，不暴露给宿主机。
  expose: ["3000"]
  
# 第三部分: Environment Variables(环境变量)
  environment:
    MODE: development
    SHOW: 'true'
    
  # 等同于
  environment:
    - MODE=development
    - SHOW: 'true'
  
  # 使用环境变量.env文件
  env_file: .env
  env_file:
    - ./common.env
    - ./apps/web.env

# 第四部分：commands (命令)
  # 容器启动后默认执行命令
  command: bundle exec thin -p 3000
  command: ['/bin/bash/', 'start.sh']
 
  # 容器启动后程序入口
  entrypoint: /code/entrypoint.sh
  
# 第五部分：Networks(网络)
  networks: # 使用bridge驱动创建名为frontend的网络
    frontend:
      driver: bridge
    
    networks: # 使用创建的网络进行通信
      - frontend
      
    # 加入已经存在的外部网络
    networks: 
      default:
        external:
          name: my-pre-existing-network

# 第六部分：Volumes(数据卷)
  volumes: # 创建名为postgres_data的数据卷
    postgres_data:
    
    db:
      image: postgres:latest
      volumes:
        - postgres_data:/var/lib/postgresql/data
      
# 第七部分：External Links(外部链接)
# 目的是让Compose能够连接那些不在docker-compose.yml中定义的单独运行容器
  services:
    web:
      external_links:
        - redis_1
        - project_db_1:mysql
```

## Docker-compose指南

```shell
# 默认使用docker-compose.yml构建镜像
$ docker-compose build
$ docker-compose build --no-cache # 不带缓存的构建

# 指定不同yml文件模板用于构建镜像
$ docker-compose build -f docker-compose1.yml

# 列出Compose文件构建的镜像
$ docker-compose images                          

# 启动所有编排容器服务
$ docker-compose up -d

# 查看正在运行中的容器
$ docker-compose ps 

# 查看所有编排容器，包括已停止的容器
$ docker-compose ps -a

# 进入指定容器执行命令
$ docker-compose exec nginx bash 
$ docker-compose exec web python manage.py migrate --noinput

# 查看web容器的实时日志
$ docker-compose logs -f web

# 停止所有up命令启动的容器
$ docker-compose down 

# 停止所有up命令启动的容器,并移除数据卷
$ docker-compose down -v

# 重新启动停止服务的容器
$ docker-compose restart web

# 暂停web容器
$ docker-compose pause web

# 恢复web容器
$ docker-compose unpause web

# 删除web容器，删除前必需停止stop web容器服务
$ docker-compose rm web  

# 查看各个服务容器内运行的进程 
$ docker-compose top                            
```

