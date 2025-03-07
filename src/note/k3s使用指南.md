# k3s使用指南

#### 安装

##### Mac 系统使用mulitpass安装虚拟机模拟服务器

```
multipass launch -n k3s-master -c 2 -m 2G -d 10G
multipass launch -n k3s-agent-01  -c 1 -m 1G -d 10G
multipass launch -n k3s-agent-02  -c 1 -m 1G -d 10G
```

##### 安装主节点

```shell
#!/bin/bash
# 设置 Token
K3S_TOKEN="UZusxsweWvSCw4xdI/4emg=="
PORT="27390"

# 安装 K3S
curl -sfL "https://get.k3s.io" | \
    K3S_TOKEN="$K3S_TOKEN" \
    sh -s - server \
    --write-kubeconfig-mode 644 \
    --kubelet-arg="time-zone-file=/etc/localtime" \
    --bind-address=0.0.0.0 \  # 绑定所有可用网络接口
    --advertise-address=$(hostname -I | awk '{print $1}')  # 广播本机的外部 IP 地址
    --https-listen-port="$PORT"  # 设置 K3S API 服务器监听的端口为 27390


# 创建 .kube 目录
mkdir -p ~/.kube

# 复制配置文件并设置权限
sudo k3s kubectl config view --raw > ~/.kube/config
chmod 600 ~/.kube/config

# 确保 K3S 服务正常启动
sudo systemctl status k3s

``````

##### 获取主节点TOKEN

```shell
 cat /var/lib/rancher/k3s/server/node-token
 # K1088e57dc546ba14e8bda05f1c6dd1554f1faf42758258c61f727fb4091c8942c9::server:UZusxsweWvSCw4xdI/4emg==
```

##### 获取主节点IP

```shell
# 尽量获取内网IP 速度更快
root@k3s-master: hostname -I
# 192.168.64.20 10.42.0.0 10.42.0.1 fde0:5bd0:38f4:f2e3:5054:ff:fe0e:cf61 
这里的ip为192.168.64.20
```

##### 安装agent节点

```shell
MASTER_IP="10.0.0.216"
MASTER_TOKEN="K105c082fd549f80a7bfb98082463f0829400cbfeba5af8c1738bbc28ac2135eceb::server:UZusxsweWvSCw4xdI/4emg=="
curl -sfL https://get.k3s.io | sh -s agent --server "https://$MASTER_IP:6443" --token $MASTER_TOKEN
```

##### 安装helm（包管理工具）

```shell
curl https://raw.githubusercontent.com/helm/helm/main/scripts/get-helm-3 | bash
```

##### 安装Kubernetes Dashboard

```bash
kubectl apply -f https://raw.githubusercontent.com/kubernetes/dashboard/v2.7.0/aio/deploy/recommended.yaml
```

##### 创建serviceaccount 和 clusterrolebinding

```bash
kubectl create serviceaccount dashboard-admin -n kubernetes-dashboard
kubectl create clusterrolebinding dashboard-admin --clusterrole=cluster-admin --serviceaccount=kubernetes-dashboard:dashboard-admin
```

##### 应用服务账号配置：

```bash
kubectl proxy
```

##### 获取token

```bash
kubectl -n kubernetes-dashboard create token dashboard-admin --duration=720h
```

#### 部署VOH

##### 创建命名空间

```shell
kubectl create namespace voh
```

##### 设置密钥信息

```shell
kubectl create secret generic config \
  --namespace=voh \
  --from-literal=password="SUq+xmsFg7SwoBwfCYuUFw==" \
  --from-literal=db_url="postgresql://postgres:SUq+xmsFg7SwoBwfCYuUFw==@postgresql:5432/voh?sslmode=disable&timezone=Asia/Shanghai"\
  --from-literal=redis_url="redis://:SUq+xmsFg7SwoBwfCYuUFw==@redis:6379/0"
```

##### 部署数据库

```shell
kubectl apply -f postgres.yml -n voh 
kubectl apply -f redis.yml -n voh 
```

##### 定位pod启动问题

1. ##### 启动时

   ```
   kubectl describe pod <pod-name> -n <namespace>
   ```

2. ##### 启动后

   ```
   kubectl logs <pod-name> -n <namespace>
   ```




##### 查看所有的pods 

``` 
kubectl get pods -A
```

##### 重新部署某个组件

```
kubectl rollout restart deployment [deployment name] -n [namespace]
```









