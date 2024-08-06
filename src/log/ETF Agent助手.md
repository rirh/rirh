# ETF Agent助手

### 背景

基于大语言模型做的ETF Agent助手问答机器人，根据用户问的问题



### 组织过程资产

后台基于[wenda](https://github.com/wenda-LLM/wenda)（一个LLM调用平台。目标为针对特定环境的高效内容生成，同时考虑个人和中小企业的计算资源局限性，以及知识安全和私密性问题）

前端基于 [ChatGPT-Next-Web](https://github.com/Yidadaa/ChatGPT-Next-Web)（A well-designed cross-platform ChatGPT UI (Web / PWA / Linux / Win / MacOS). 一键拥有你自己的跨平台 ChatGPT 应用。）



[ETF投顾问题及答案20230907](https://yohegptwuf.feishu.cn/docx/QojrdDabcoXHdZxjhzkcsZVcn1c?from=from_copylink)

[ETF投顾Agent产品文档](https://v1z34hcxct.feishu.cn/docx/ImcZd3Z9Go5YsXx42BacQtMandd)

[ETF投顾问题设计](https://docs.qq.com/sheet/DRFFNSUVzdFlnR3pt?tab=000001)

[ETF BUG 列表](https://docs.qq.com/sheet/DRFFNSUVzdFlnR3pt?tab=e01l6t)





### 产品输出

[测试环境](http://aigle-dev.qutke.cn/etf-agent//)

[正式环境](https://pro.fofinvesting.com/etf-agent/)





## 服务器跑分


---------------------基础信息查询--感谢所有开源项目---------------------
 CPU 型号          : Intel(R) Xeon(R) Platinum 8259CL CPU @ 2.50GHz
 CPU 核心数        : 8
 CPU 频率          : 2499.988 MHz
 CPU 缓存          : L1: 128.00 KB / L2: 4.00 MB / L3: 35.75 MB
 硬盘空间          : 3.31 GiB / 19.20 GiB
 启动盘路径        : /dev/root
 内存              : 597.27 MiB / 31.01 GiB
 Swap              : [ no swap partition or swap file detected ]
 系统在线时间      : 102 days, 1 hour 37 min
 负载              : 0.00, 0.00, 0.00
 系统              : Ubuntu 22.04.2 LTS (x86_64)
 AES-NI指令集      : ✔ Enabled
 VM-x/AMD-V支持    : ❌ Disabled
 架构              : x86_64 (64 Bit)
 内核              : 5.15.0-1031-aws
 TCP加速方式       : cubic
 虚拟化架构        : Amazon Virtualization
 NAT类型           : 独立映射,独立过滤,支持回环
 IPV4 ASN          : AS55960 Beijing Guanghuan Xinwang Digital
 IPV4 位置         : Beijing / Beijing / CN
---------------------CPU测试--感谢lemonbench开源------------------------
 -> CPU 测试中 (Fast Mode, 1-Pass @ 5sec)
 1 线程测试(1核)得分: 		1027 Scores
 8 线程测试(多核)得分: 		6569 Scores
---------------------内存测试--感谢lemonbench开源-----------------------
 -> 内存测试 Test (Fast Mode, 1-Pass @ 5sec)
 单线程读测试:		20414.82 MB/s
 单线程写测试:		17165.66 MB/s
------------------磁盘dd读写测试--感谢lemonbench开源--------------------
 -> 磁盘IO测试中 (4K Block/1M Block, Direct Mode)
 测试操作		写速度					读速度
 100MB-4K Block		7.5 MB/s (1843 IOPS, 13.89s)		13.9 MB/s (3397 IOPS, 7.53s)
 1GB-1M Block		154 MB/s (147 IOPS, 6.81s)		144 MB/s (137 IOPS, 7.29s)
-------------------欺诈分数以及IP质量检测--本脚本原创-------------------
数据仅作参考，不代表100%准确，如果和实际情况不一致请手动查询多个数据库比对
以下为各数据库编号，输出结果后将自带数据库来源对应的编号
ipinfo数据库 ①  | scamalytics数据库 ②  | virustotal数据库 ③  | abuseipdb数据库 ④  | ip2location数据库   ⑤
ip-api数据库 ⑥  | ipwhois数据库     ⑦  | ipregistry数据库 ⑧  | ipdata数据库    ⑨  | ipgeolocation数据库 ⑩
欺诈分数(越低越好): 0②
abuse得分(越低越好): 0④
IP类型: 
  使用类型(usage_type):isp①  Data Center/Web Hosting/Transit⑤  isp⑧  hosting⑨  
  公司类型(company_type):isp①  isp⑧  
  云服务提供商(cloud_provider):  No⑧ 
  数据中心(datacenter):  Yes② ⑨ 
  代理(proxy):  No① ② ⑦ ⑧ ⑨ ⑩ 
  VPN(vpn):  No① ② ⑦ ⑧ 
  TOR(tor):  No① ② ⑦ ⑧ ⑨ 
  TOR出口(tor_exit):  No⑧ 
  搜索引擎机器人(search_engine_robot):  No② 
  匿名代理(anonymous):  No⑦ ⑧ ⑨ 
  攻击方(attacker):  No⑧ ⑨ 
  滥用者(abuser):  No⑧ ⑨ 
  威胁(threat):  No⑧ ⑨ 
  iCloud中继(icloud_relay):  No① ⑧ ⑨ 
  未分配IP(bogon):  No⑧ ⑨ 
黑名单记录统计(有多少个黑名单网站有记录): 无害0 恶意0 可疑0 未检测88 ③
Google搜索可行性：NO
端口25检测:
  本地: No
  163邮箱: Yes
  gmail邮箱：No
-----------------------全国延迟检测--本脚本原创-------------------------
 联通郑州	   14  | 联通太原	   9   | 联通沈阳	   19  |
 联通上海	   22  | 联通长沙	   24  | 联通西宁	   28  |
 联通无锡	   22  | 联通福州	   47  | 联通海南	   52  |
 联通成都	   50  | 电信长沙	   0   | 电信天津	   11  |
 电信苏州	   20  | 电信新乡	   16  | 电信合肥	   20  |
 电信南京	   21  | 电信长春	   21  | 电信武汉	   22  |
 电信上海	   39  | 电信杭州	   36  | 电信宁波	   33  |
 电信福州	   44  | 电信拉萨	   59  | 电信兰州	   69  |
 电信天津	   4   | 电信Nanjing	   20  | 电信江苏	   24  |
 电信重庆	   33  | 移动连云港	   27  | 移动杭州	   30  |
 移动成都	   38  | 移动福州	   35  | 移动兰州	   45  |
--------------------自动更新测速节点列表--本脚本原创--------------------
位置		 上传速度	 下载速度	 延迟
Speedtest.net	 260.21Mbps	 365.66Mbps	 22.57ms	
法兰克福	 220.58Mbps	 142.14Mbps	 21.33ms	
洛杉矶		 288.91Mbps	 251.17Mbps	 22.16ms	
联通郑州5G	 271.59Mbps	 318.75Mbps	 21.68ms	
联通WuXi	 247.19Mbps	 192.59Mbps	 21.62ms	
电信天津5G	 254.95Mbps	 128.00Mbps	 23.77ms	
电信天津	 279.56Mbps	 308.98Mbps	 22.84ms	
移动Chengdu	 288.10Mbps	 468.34Mbps	 21.14ms	

##### 移动Lanzhou	 255.23Mbps	 292.71Mbps	 22.10ms	
 总共花费      : 5 分 53 秒
#####  时间          : Wed Sep 13 06:16:49 UTC 2023



