# MacOS连接公司自带vpn



# VPN

1. 打开Mac偏好设置 > 网络

   ![在这里插入图片描述](https://c18e-1257416358.cos.accelerate.myqcloud.com/uPic/20190214142801606.png)

2. 点击右下角添加按钮,并选择vpn

   ![在这里插入图片描述](https://c18e-1257416358.cos.accelerate.myqcloud.com/uPic/20190214142908348.png)

3. 选择VPN类型：L2TP/IPSec，输入任意服务器名称，单击创建

   ![在这里插入图片描述](https://c18e-1257416358.cos.accelerate.myqcloud.com/uPic/20190214142955148.png)

   
4. 输入服务器地址 账户名称，先点击应用，然后点击连接

   ![在这里插入图片描述](https://c18e-1257416358.cos.accelerate.myqcloud.com/uPic/20190214143828561.png)

5. 输入密码点击好

   :::tip

   可能出现的问题呢

   IPSec 共享密钥”丢失。请验证您的设置并尝试重新连接。

   打开终端

   ```shell
    cd /etc/ppp
    sudo touch options
    //输入密码
    sudo vim options
    // 在vim中通过输入i 进入插入模式。粘贴下面内容后按(“esc“ ＋ “：“ 退出，"wq"保存)
   
   plugin L2TP.ppp
   
   l2tpnoipsec
   ```

   ##### 做完上面的这些步骤返回偏好设置再进行连接就可以正常使用了

   :::

   ![在这里插入图片描述](https://c18e-1257416358.cos.accelerate.myqcloud.com/uPic/20190214143907162.png)

   



##### 2019-08-15

## 正文

##### 1.打开Mac偏好设置 > 网络

![在这里插入图片描述](https://c18e-1257416358.cos.accelerate.myqcloud.com/uPic/20190214142801606.png)

##### **2.点击右下角添加按钮,并选择vpn**

![在这里插入图片描述](https://c18e-1257416358.cos.accelerate.myqcloud.com/uPic/20190214142908348.png)
##### 选择VPN类型：L2TP/IPSec，输入任意服务器名称，单击创建
![在这里插入图片描述](https://c18e-1257416358.cos.accelerate.myqcloud.com/uPic/20190214142955148.png)
##### 输入服务器地址 账户名称，先点击应用，然后点击连接

![在这里插入图片描述](https://c18e-1257416358.cos.accelerate.myqcloud.com/uPic/20190214143828561.png)
##### 输入密码点击好

![在这里插入图片描述](https://c18e-1257416358.cos.accelerate.myqcloud.com/uPic/20190214143907162.png)
##### 一般来说会有这样的错误

> IPSec 共享密钥”丢失。请验证您的设置并尝试重新连接。

##### 如下操作

> 打开终端

```js
 cd /etc/ppp
 sudo touch options
 //输入密码
 sudo vim options
 // 在vim中通过输入i 进入插入模式。粘贴下面内容后按(“esc“ ＋ “：“ 退出，"wq"保存)

plugin L2TP.ppp

l2tpnoipsec
 
```
##### 做完上面的这些步骤返回偏好设置再进行连接就可以正常使用了
（2019-08-15）
>>>>>>> e6a717cd2f17b8e336dd37784613576f99447179
（ps：有的连接上以后还是访问不了 并且ping出现只有第一条有数据 就超时了）
这个可能是DNS污染问题，请按如下步骤操作:

![在这里插入图片描述](https://c18e-1257416358.cos.accelerate.myqcloud.com/uPic/20190815113037702.png)
![在这里插入图片描述](https://c18e-1257416358.cos.accelerate.myqcloud.com/uPic/20190815113149465.png)
**1.选择你所用的vpn进入高级选项**
 **2.选择DNS添加两条ip `8.8.4.4` 和 `208.67.222.222`**  
 **3.打开终端输入命令`dscacheutil -flushcache`** 

 重新链接一下就可以使用了



