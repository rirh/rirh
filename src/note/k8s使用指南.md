# K8s使用指南

#### 系统要求

- CPU: 2核以上
- 内存: 2GB以上
- 硬盘: 20GB以上
- 操作系统: Ubuntu/debian 20.04/22.04, CentOS 7/8

##### 初始化配置

```bash
# 关闭swap 立即关闭所有 swap 分区。swap 分区是 Linux 系统在内存不足时使用的磁盘空间，但 K8s 运行对 swap 的支持不好，甚至可能导致问题，因此需要关闭。
swapoff -a
# 永久禁用 swap。/etc/fstab 文件记录了系统启动时需要挂载的文件系统，这行命令会删除其中所有包含 "swap" 的行，防止系统重启后重新启用 swap。
sed -i '/swap/d' /etc/fstab
# 配置内核参数
# 创建一个名为 k8s.conf 的文件，并写入内容。这个文件用于指定系统启动时需要加载的内核模块。
# overlay 文件系统，用于容器镜像的分层存储，是 Docker 和 K8s 的重要组成部分。
# bridge netfilter 模块，用于在 Linux 网桥上进行网络过滤和 NAT，是 K8s 网络的重要依赖。
cat > /etc/modules-load.d/k8s.conf << EOF
overlay
br_netfilter
EOF
# =============================================================================
# 对于基于 Debian/Ubuntu 的系统 (如 Ubuntu 20.04/22.04)： 有可能找不到文件
sudo apt update
sudo apt install kmod
# 对于基于 RHEL/CentOS 的系统 (如 CentOS 7/8)
# sudo yum install kmod
# 或使用 dnf (CentOS 8 及更高版本)
# sudo dnf install kmod
# =============================================================================

# 手动加载 overlay 和 br_netfilter 模块，使其立即生效
sudo modprobe overlay
sudo modprobe br_netfilter
# 创建一个名为 k8s.conf 的文件，并写入内容。这个文件用于配置 Linux 内核的网络参数
# net.bridge.bridge-nf-call-iptables = 1：允许网桥流量通过 iptables 规则进行过滤。
# net.bridge.bridge-nf-call-ip6tables = 1：允许网桥流量通过 ip6tables 规则进行过滤 (IPv6)。
# net.ipv4.ip_forward = 1：启用 IP 转发，允许 Linux 系统作为路由器转发网络流量，这是 K8s 网络通信的基础。
cat > /etc/sysctl.d/k8s.conf << EOF
net.bridge.bridge-nf-call-iptables  = 1
net.bridge.bridge-nf-call-ip6tables = 1
net.ipv4.ip_forward = 1
net.netfilter.nf_conntrack_max = 262144
net.nf_conntrack_max = 262144
EOF
# 重新加载系统参数，使上述配置立即生效
sysctl --system
```

##### 安装容器运行时

```bash
# 安装依赖
sudo apt-get update
sudo apt-get install -y apt-transport-https ca-certificates curl gnupg lsb-release
# =================================uubuntu===========================
# # ubuntu 
# curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo gpg --dearmor -o /usr/share/keyrings/docker-archive-keyring.gpg
# # 添加 Docker 仓库
# echo "deb [arch=$(dpkg --print-architecture) signed-by=/usr/share/keyrings/docker-archive-keyring.gpg] https://download.docker.com/linux/ubuntu $(lsb_release -cs) stable" | sudo tee /etc/apt/sources.list.d/docker.list > /dev/null
# =================================uubuntu===========================
# 添加 Docker 官方 GPG 密钥
curl -fsSL https://download.docker.com/linux/debian/gpg | sudo gpg --dearmor -o /usr/share/keyrings/docker-archive-keyring.gpg
# 添加 Docker 仓库（修正了语法）
echo "deb [arch=$(dpkg --print-architecture) signed-by=/usr/share/keyrings/docker-archive-keyring.gpg] https://download.docker.com/linux/debian $(lsb_release -cs) stable" | sudo tee /etc/apt/sources.list.d/docker.list

# 更新软件包列表并安装 containerd
sudo apt-get update
sudo apt-get install -y containerd.io

# 创建默认配置目录
sudo mkdir -p /etc/containerd

# 生成默认配置文件
containerd config default | sudo tee /etc/containerd/config.toml

# 修改配置以使用 systemd cgroup 驱动
sudo sed -i 's/SystemdCgroup = false/SystemdCgroup = true/' /etc/containerd/config.toml

# 重启 containerd
sudo systemctl enable containerd
sudo systemctl restart containerd
```

##### 安装Kubernetes组件 1.32版本

```bash
sudo apt-get install -y apt-transport-https ca-certificates curl gpg
sudo mkdir -p -m 755 /etc/apt/keyrings
curl -fsSL https://pkgs.k8s.io/core:/stable:/v1.32/deb/Release.key | sudo gpg --dearmor -o /etc/apt/keyrings/kubernetes-apt-keyring.gpg
echo 'deb [signed-by=/etc/apt/keyrings/kubernetes-apt-keyring.gpg] https://pkgs.k8s.io/core:/stable:/v1.32/deb/ /' | sudo tee /etc/apt/sources.list.d/kubernetes.list
sudo apt-get update
sudo apt-get install -y kubelet kubeadm kubectl
sudo apt-mark hold kubelet kubeadm kubectl
```

##### 配置第一个 Master 节点

```bash
# 设置 Master 节点 IP
MASTER_IP="192.168.64.29"

# 初始化集群
sudo kubeadm init \
  --control-plane-endpoint="$MASTER_IP:6443" \
  --pod-network-cidr="10.244.0.0/16" \
  --upload-certs

# 配置 kubectl
mkdir -p $HOME/.kube
sudo cp -i /etc/kubernetes/admin.conf $HOME/.kube/config
sudo chown $(id -u):$(id -g) $HOME/.kube/config

# 安装最新版本的 Calico 网络插件
kubectl create -f https://raw.githubusercontent.com/projectcalico/calico/v3.29.1/manifests/calico.yaml

```

#### ubuntu

```bash
# 关闭swap 立即关闭所有 swap 分区。swap 分区是 Linux 系统在内存不足时使用的磁盘空间，但 K8s 运行对 swap 的支持不好，甚至可能导致问题，因此需要关闭。
swapoff -a
# 永久禁用 swap。/etc/fstab 文件记录了系统启动时需要挂载的文件系统，这行命令会删除其中所有包含 "swap" 的行，防止系统重启后重新启用 swap。
sed -i '/swap/d' /etc/fstab
# 配置内核参数
# 创建一个名为 k8s.conf 的文件，并写入内容。这个文件用于指定系统启动时需要加载的内核模块。
# overlay 文件系统，用于容器镜像的分层存储，是 Docker 和 K8s 的重要组成部分。
# bridge netfilter 模块，用于在 Linux 网桥上进行网络过滤和 NAT，是 K8s 网络的重要依赖。
cat > /etc/modules-load.d/k8s.conf << EOF
overlay
br_netfilter
EOF
# =============================================================================
# 对于基于 Debian/Ubuntu 的系统 (如 Ubuntu 20.04/22.04)： 有可能找不到文件
sudo apt update
sudo apt install kmod
# 对于基于 RHEL/CentOS 的系统 (如 CentOS 7/8)
# sudo yum install kmod
# 或使用 dnf (CentOS 8 及更高版本)
# sudo dnf install kmod
# =============================================================================

# 手动加载 overlay 和 br_netfilter 模块，使其立即生效
sudo modprobe overlay
sudo modprobe br_netfilter
# 创建一个名为 k8s.conf 的文件，并写入内容。这个文件用于配置 Linux 内核的网络参数
# net.bridge.bridge-nf-call-iptables = 1：允许网桥流量通过 iptables 规则进行过滤。
# net.bridge.bridge-nf-call-ip6tables = 1：允许网桥流量通过 ip6tables 规则进行过滤 (IPv6)。
# net.ipv4.ip_forward = 1：启用 IP 转发，允许 Linux 系统作为路由器转发网络流量，这是 K8s 网络通信的基础。
cat > /etc/sysctl.d/k8s.conf << EOF
net.bridge.bridge-nf-call-iptables  = 1
net.bridge.bridge-nf-call-ip6tables = 1
net.ipv4.ip_forward = 1
net.netfilter.nf_conntrack_max = 262144
net.nf_conntrack_max = 262144
EOF
# 重新加载系统参数，使上述配置立即生效
sysctl --system
# 安装依赖
sudo apt-get update
sudo apt-get install -y apt-transport-https ca-certificates curl gnupg lsb-release
# =================================ubuntu===========================
# ubuntu 
 curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo gpg --dearmor -o /usr/share/keyrings/docker-archive-keyring.gpg
# 添加 Docker 仓库
 echo "deb [arch=$(dpkg --print-architecture) signed-by=/usr/share/keyrings/docker-archive-keyring.gpg] https://download.docker.com/linux/ubuntu $(lsb_release -cs) stable" | sudo tee /etc/apt/sources.list.d/docker.list > /dev/null
# ===================================================================

# 更新软件包列表并安装 containerd
sudo apt-get update
sudo apt-get install -y containerd.io

# 创建默认配置目录
sudo mkdir -p /etc/containerd

# 生成默认配置文件
containerd config default | sudo tee /etc/containerd/config.toml

# 修改配置以使用 systemd cgroup 驱动
sudo sed -i 's/SystemdCgroup = false/SystemdCgroup = true/' /etc/containerd/config.toml

# 重启 containerd
sudo systemctl enable containerd
sudo systemctl restart containerd
sudo apt-get install -y apt-transport-https ca-certificates curl gpg
sudo mkdir -p -m 755 /etc/apt/keyrings
curl -fsSL https://pkgs.k8s.io/core:/stable:/v1.32/deb/Release.key | sudo gpg --dearmor -o /etc/apt/keyrings/kubernetes-apt-keyring.gpg
echo 'deb [signed-by=/etc/apt/keyrings/kubernetes-apt-keyring.gpg] https://pkgs.k8s.io/core:/stable:/v1.32/deb/ /' | sudo tee /etc/apt/sources.list.d/kubernetes.list
sudo apt-get update
sudo apt-get install -y kubelet kubeadm kubectl
sudo apt-mark hold kubelet kubeadm kubectl
```

