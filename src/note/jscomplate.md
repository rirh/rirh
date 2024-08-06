


## 序言

> 网页中有很多的第三方插件都是通过直接引入script库的方式进行加载，由于加载脚本需要时间，如果script还没有加载完成，便使用库中的对象就会有错误。

**解决方案**

 1. 获取script DOM 对象
 2. 绑定onload事件异步回调

> 总体的思路

```javascript
  asyncComplete() {
    return new Promise((reject, resole) => {
    //获取HTMLCollection 
    //我这边已经确定对象第一个就是要加载的js 便取第一个对象
      const [twscript,] = document.getElementsByTagName('script');
      //ie
      if (twscript.readyState) {
        twscript.onreadystatechange = () => {
          if (twscript.readyState === "complete" || twscript.readyState === 'loaded') {
            reject()
          }
        }
      } else {
        twscript.onload = reject()
      }
    })
  }
  
```

> 使用方法

```javascript
//使用方法

  async mountd() {
    await this.asyncComplete();
    //TODO
  }

```


