# K3s 高可用集群使用指南

本指南适用于内存较小、需高可用的 K3s 集群部署，涵盖所有前置准备、主节点和 Server/Agent 节点加入方法，并包含 Netmaker 自托管虚拟内网的自动化组网方案，适合跨地域、跨云、无内网直连环境。

---

## 一、前置准备

### 1. 激进的日志管理（适合小内存）

编辑 `/etc/systemd/journald.conf`，添加或修改如下内容：

```conf
[Journal]
Storage=persistent
SystemMaxUse=2G
Compress=yes
MaxRetentionSec=7d
MaxLevelStore=info
```

重启 journald 以生效：

```sh
sudo systemctl restart systemd-journald
```

---

### 2. 启用桥接网络和 IP 转发（支持容器网络）

```sh
sudo modprobe br_netfilter
echo 'net.bridge.bridge-nf-call-iptables=1' | sudo tee -a /etc/sysctl.conf
echo 'net.ipv4.ip_forward=1' | sudo tee -a /etc/sysctl.conf
sudo sysctl -p
```

---

### 3. 开放防火墙端口

编辑 `/etc/iptables/rules.v4` 或直接执行以下命令开放必要端口：

```sh
# 安装持久化工具
sudo apt install iptables-persistent
# 允许常用端口
sudo iptables -I INPUT -p tcp -m multiport --dports 22,80,443,6443,27382,27383,27384,2379,2380,10250 -j ACCEPT
sudo iptables -I INPUT -p udp --dport 8472 -j ACCEPT
# Netmaker WireGuard (51821/UDP) 与 gRPC (8081/TCP)
sudo iptables -I INPUT -p udp --dport 51821 -j ACCEPT
sudo iptables -I INPUT -p tcp --dport 8081 -j ACCEPT
sudo iptables -I INPUT -p tcp --dport 1883  -j ACCEPT

# 保存并生效
sudo netfilter-persistent save
sudo netfilter-persistent reload
```

> 如需开放其他端口（如 80/443/NodePort），请按需增加规则。

```sh
#  查看现有开放端口命令  iptables -L -n
# 简洁的防火墙规则
*filter
:INPUT DROP [0:0]
:FORWARD ACCEPT [0:0]
:OUTPUT ACCEPT [0:0]

# 本地回环放行
-A INPUT -i lo -j ACCEPT

# 允许已建立连接和相关连接
-A INPUT -m conntrack --ctstate ESTABLISHED,RELATED -j ACCEPT

# 允许 SSH、HTTP、HTTPS、K8s API、业务端口
-A INPUT -p tcp -m multiport --dports 22,80,443,6443,27382,27383,27384,2379,2380,10250 -j ACCEPT

# 允许 K8s flannel VXLAN
-A INPUT -p udp --dport 8472 -j ACCEPT

# 允许 Netmaker WireGuard
-A INPUT -p udp --dport 51821 -j ACCEPT

# 允许 Netmaker gRPC
-A INPUT -p tcp --dport 8081 -j ACCEPT

# 允许 ICMP（可选）
-A INPUT -p icmp -j ACCEPT

COMMIT
```

---

### 4. 设置主机名和 hosts 文件（使用 Netmaker 内网 IP）

#### 设置主机名（每台主机唯一）

```sh
sudo hostnamectl set-hostname <新主机名>
```

#### 配置 /etc/hosts（所有 server 必须包含所有 master 节点的 IP 与主机名）

```conf
127.0.0.1       localhost
::1             localhost ip6-localhost ip6-loopback
ff02::1         ip6-allnodes
ff02::2         ip6-allrouters

# 以下为所有 server 节点的内网/公网IP与主机名
188.209.141.139 panel-hk-01
129.151.228.240 panel-fr-02
8.222.219.84    panel-sg-03
```

---

### 5. 设置时间一致

```sh
sudo timedatectl set-ntp true
```

> 如果未安装 timedatectl

```sh
sudo apt update
sudo apt install systemd-timesyncd
sudo systemctl enable systemd-timesyncd
sudo systemctl start systemd-timesyncd
```

---

## 二、Netmaker 虚拟内网自托管组网（推荐跨云/跨地域场景）

### 1. Netmaker Server 部署（以 panel-hk-01 为例）

#### 安装 Docker & Docker Compose

```sh
sudo apt update && sudo apt install -y docker.io docker-compose git
sudo systemctl enable --now docker
```

#### 获取 Netmaker 部署包并启动服务

```sh
git clone https://github.com/gravitl/netmaker.git
cd netmaker
cp docker-compose.yml.example docker-compose.yml
# 修改 docker-compose.yml：将 SERVER_NAME、MQ_HOST、API_HOST、GRPC_HOST、NETMAKER_BASE_DOMAIN 改为你的公网 IP（如 188.209.141.139），如有域名更好。
docker-compose up -d
```

#### 首次初始化

- 浏览器访问 `https://188.209.141.139`，按提示设置管理员账号。

---

### 2. 创建虚拟网络并添加节点

#### 在面板新建网络（如 k3s-net，分配 10.10.0.0/24）

#### 添加主机

- 在面板点击“添加主机”，生成加入命令（带 token）

#### 在 panel-fr-02 和 panel-sg-03 节点执行：

```sh
curl -sfL https://raw.githubusercontent.com/gravitl/netclient/master/scripts/install.sh | sudo bash -s -- -t <token> -s https://188.209.141.139
```
> `<token>` 和 `-s` 参数在 Netmaker 面板自动生成。

---

### 3. 验证虚拟内网连通性

- 每台服务器会获得一个虚拟网段 IP（如 10.10.0.2、10.10.0.3、10.10.0.4）
- 各节点互相 `ping 10.10.0.x` 测试，确认虚拟内网已打通

---

## 三、K3s 高可用主节点部署（使用 Netmaker 虚拟内网 IP）

> **所有 k3s/etcd Server 节点间通信，推荐全部使用 Netmaker 分配的虚拟内网 IP！**

### 1. 初始化第一个 server 节点

```sh
curl -sfL https://get.k3s.io | sh -s - server \
    --cluster-init \
    --node-ip=<本机虚拟IP> \
    --advertise-address=<本机虚拟IP> \
    --tls-san=k3s.h06i.com
```
> `<本机虚拟IP>` 为 Netmaker 分配的 IP，例如 10.10.0.2

---

### 2. 加入额外 server 节点（高可用 HA）

1. 在主节点获取 `server/token`：

   ```sh
   cat /var/lib/rancher/k3s/server/token
   # 复制输出内容，赋值给 K3S_TOKEN
   ```

2. 在新 server 节点执行：

   ```sh
   K3S_TOKEN="复制的token"
   curl -sfL https://get.k3s.io | K3S_TOKEN=$K3S_TOKEN sh -s - server \
       --server https://<第一个节点虚拟IP>:6443 \
       --node-ip=<本机虚拟IP> \
       --advertise-address=<本机虚拟IP> \
       --tls-san=k3s.h06i.com
   ```
   > `<第一个节点虚拟IP>` 为如 10.10.0.2，`<本机虚拟IP>` 为本节点分配的虚拟IP

---

### 3. 加入 agent 节点

1. 获取主节点 `server/token`：

   ```sh
   cat /var/lib/rancher/k3s/server/token
   ```

2. 在 agent 节点执行：

   ```sh
   K3S_TOKEN="复制的token"
   curl -sfL https://get.k3s.io | K3S_TOKEN=$K3S_TOKEN sh -s - agent \
       --server https://<任一server虚拟IP>:6443 \
       --node-ip=<本机虚拟IP>
   ```

---

## 四、常见问题与建议

- **所有 server 节点 hostname 必须唯一，且 `/etc/hosts` 能被其他 server 正确解析。**
- **时间同步**：建议所有节点开启 NTP，保证时间一致。
- **防火墙端口**需全部互通（server 之间尤其是 etcd 2379、2380 端口）。
- **token 一定要用 server/token，不是 agent/token。**
- **Netmaker 网络问题可通过 `netclient status` 检查，或重启 netclient 服务排查故障。**
- **K3s 相关参数均建议用虚拟内网 IP，避免公网流量和 NAT 问题。**

---

## 五、参考

- [Netmaker 官方文档](https://docs.netmaker.io/)
- [K3s 官方文档](https://rancher.com/docs/k3s/latest/en/)
- [WireGuard 安全加速虚拟内网](https://www.wireguard.com/)

---

> 本指南持续完善，欢迎反馈实践经验或补充建议！
