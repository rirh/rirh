


#### Electron 通信

主进程（IPCMain）、子进程（IPCRenderer）、页面之间的通信有以下几种常见场景

1. IPCRenderer发送消息至IPCMain
2. IPCMain回复IPCRenderer已成功收到消息
3. IPCMain发送消息至IPCRenderer
4. IPCRenderer回复IPCMain已成功收到消息
5. 两个渲染页面之间的通信

**1.IPCRenderer发送消息至IPCMain**

```javascript
// IPCRenderer
import { ipcRenderer } from 'electron';
ipcRenderer.send('ipc-to-main', 'TigerZH');


// IPCMain
import { ipcMain } from 'electron';
ipcMain.on('ipc-to-main', (event, data) => {
    console.log(data) //TigerZH
})
```



**2.IPCMain回复IPCRenderer已成功收到消息**

```javascript
// IPCRenderer
import { ipcRenderer } from 'electron';
//方法一
ipcRenderer.send('ipc-to-main', 'TigerZH');
ipcRenderer.on('main-reply-ipc',(event, data)=>{
      console.log(data) //done
})
//方法二
const returnValue=ipcRenderer.sendSync('ipc-to-main', 'TigerZH');
console.log(returnValue) //done



// IPCMain
import { ipcMain } from 'electron';
//方法一
ipcMain.on('ipc-to-main', (event, data) => {
    console.log(data) //TigerZH
    event.sender.send('main-reply-ipc', 'done');
})

//方法二
ipcMain.on('ipc-to-main', (event, data) => {
    console.log(data) //TigerZH
    event.returnValue = 'done';
})

```

**3.IPCMain发送消息至IPCRenderer**

```javascript
//IPCMain发送消息至IPCRenderer 是通过获取IPCRenderer的实例 进行发送消息

// IPCMain 
// 获取当前的IPCRenderer 一般来说往往都是发送消息给当前的窗口
import { remote } from 'electron';

const win = remote.getCurrentWindow();
//如果需要发送消息给指定窗口可以通过id获取
// const win = remote.BrowserWindow.fromId('IPCRenderer窗口ID');
win.webContents.send('main-to-ipc', 'TigerZH');

// IPCRenderer
import { ipcRenderer } from 'electron';

ipcRenderer.on('main-to-ipc', (event,data)=>{
   console.log(data) //TigerZH
});
```

**4.IPCRenderer回复IPCMain已成功收到消息**

类似第二种处理

**5.两个渲染页面之间的通信**

```javascript
// A页面
import { ipcRenderer,remote } from 'electron';
const data = { name:'TigerZH' };
data.id = remote.getCurrentWindow().id;
ipcRenderer.send('a-to-main', data );

ipcRenderer.on('main-to-b', (event, arg) => {
    console.log(arg) // { state:'done', id_a:xxx,id_b:xxx }
})

//IPCMain
import { ipcMain } from 'electron';

let BipcRenderer;
ipcMain.on('a-to-main', ( event , data ) => {
  if(BipcRenderer){
    BipcRenderer.webContents.send('main-to-b', data);
  }else{
    //创建B页面 然后发送消息
    //TODO
  }
})；
ipcMain.on('b-to-main', ( event , data ) => {
     const a = remote.BrowserWindow.fromId(data.id_a);
     a.webContents.send('main-to-a', data);
  
})；

//B页面
import { ipcRenderer, remote, BrowserWindow } from 'electron';

ipcRenderer.on('main-to-b', (event, arg) => {
  console.log(arg) // { name:'TigerZH', id:xxx }
  const data = { state:'done' };
  data.id_a=arg.id;
  data.id_b = remote.getCurrentWindow().id;
  ipcRenderer.send('b-to-main',data)
 })
//这是A页面发送消息给B页面 如果需要B页面回消息给A页面 解决方法如下
//A页面发送消息时通过 remote.getCurrentWindow().id 获取当前页面的ID传入携带的参数中
//B页面发送
```

