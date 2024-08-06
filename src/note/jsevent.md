


# JS事件流简述

**事件流**

```
页面除了静态的UI，还有动态的事件

事件按交互分类可分为交互事件，和非交互事件

点击，移动，拖拽属于交互事件。
而页面加载完成，动画播放完毕，声音开始播放等等都属于非交互事件。

在javascript中，事件是可以被侦测的行为。
```

**顺序**

```
事情的执行总有先后顺序。
现阶段规范：完整的事件流是从 window 开始,到捕获阶段，目标阶段，冒泡过程，再回到window的过程。

在常见网站中，冒泡和捕获是频率使用最高的事件。

事件冒泡：子元素事件会一直向父元素传递，一直到最底层根结点停止。
事件捕获：和“事件冒泡”相反，从根节点开始执行，一直向子节点传递，直到目标节点。

在事件冒泡中每一个每个节点捕获到的冒泡事件，可以用stopPropagation终止冒泡。
在事件绑定时候，我们使用 addEventListener 进行事件绑定，addEventListener默认使用冒泡流，第三个参数设为true的时候，则使用捕获流
```

**DOM**

**通过DOM的level来区分事件绑定的方法会更清晰，关于dom的绑定事件的方法有值得理解的地方。**

1. **0级DOM分为两种**

   ```javascript
   // 行内事件:在标签中写事件
   // 元素.on事件名=函数
   <div class="contant" onclick="con_fun()"></div> 
   function con_fun() {
           let len = arguments.length;
           e = arguments[len - 1];
           e = e || e.event;
           console.log(arguments);
           console.log("main_fun");
           e.stopPropagation();
       }
   const con_dom = document.querySelector('.contant');
   con_dom.onclick = () => {
           console.log("con_dom");
       };
   ```

2. **DOM1级问题**

   ```
   为什么没有1级DOM?
   根据资料显示1级DOM标准中并没有定义事件相关的内容
   ```

3. **DOM2级事件**

   ```javascript
   addEventListener监听方法，有两个方法用来添加和移除事件处理程序addEventListener()和removeEventListener()。
   
   con_dom.addEventListener('click', con_fun.bind(this, `冒泡流:false`), false)
   ```

**DOM2 级**：`addEventListener`，它定义了`DOM`事件流，捕获 + 冒泡。

**DOM0 级**：

- 直接在 html 标签内绑定`on`事件
- 在 JS 中绑定`on`系列事件

**注意**：如下优点,通用使用`DOM2`级事件，

1. 可以绑定 / 卸载事件
2. 支持事件流
3. 冒泡 + 捕获：相当于每个节点同一个事件，至少 2 次处理机会
4. 同一类事件，可以绑定多个函数



**例子**

```html
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Document</title>
    <style>
        .main {
            height: 100px;
            width: 100px;
            margin: 100px;
            background-color: antiquewhite;
        }

        .contant {
            height: 40px;
            width: 40px;
            background-color: cadetblue;
        }
    </style>
</head>

<body>
    <div class="main">
        <div class="contant"></div>
    </div>
</body>
<script>
    const main_dom = document.querySelector('.main');
    const con_dom = document.querySelector('.contant');
    main_dom.onclick = () => {
        console.log("main_dom");
    };
    function con_fun() {
        let len = arguments.length;
        e = arguments[len - 1];
        e = e || e.event;
        console.log(arguments);
        console.log("main_fun");

        e.stopPropagation();

    }
    con_dom.addEventListener('click', con_fun.bind(this, `冒泡流:false`), false)
    con_dom.addEventListener('click', con_fun.bind(this, `冒泡流:true`), true)
    con_dom.removeEventListener();
</script>

</html>
```




