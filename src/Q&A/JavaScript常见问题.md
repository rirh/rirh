# JS常见问题

### Q: js中的计时器是否精准？

在JavaScript中，计时器（Timer）并不是完全精准的，其精确性受到多个因素的影响。以下是一些影响计时器精确性的因素：

1. ##### 执行环境：

   JavaScript计时器的精确性受到执行环境的影响。在浏览器中，由于JavaScript是单线程的，计时器可能受到其他任务的阻塞而延迟执行。例如，如果JavaScript引擎正在执行一个长时间运行的脚本或处理大量计算，计时器的执行可能会延迟。

2. ##### 定时器类型：

   在JavaScript中，有两种常用的计时器类型：`setTimeout`和`setInterval`。这两种计时器的精确性略有不同。`setTimeout`用于在一定延迟后执行一次任务，而`setInterval`用于按照指定的时间间隔重复执行任务。虽然这两种计时器都受到执行环境的影响，但`setInterval`更容易受到延迟，并可能出现间隔不准确的情况。

3. ##### 系统资源和负载：

   计时器的精确性还受到系统资源和负载的影响。如果设备的资源有限或正在处理其他重要任务，计时器的执行可能会受到限制。例如，在移动设备上或资源受限的设备上，计时器的精确性可能会受到更大的影响。

4. ##### 视觉感知：

   由于人类对时间的感知有限，小幅度的延迟通常并不会被察觉。对于大多数应用程序而言，计时器提供的精确度已经足够满足需求。但是，对于某些特定的应用程序，如音频/视频同步或精确的动画控制，可能需要使用更精确的时间管理方法，如Web Audio API或requestAnimationFrame。

在JavaScript中，要实现更精准的计时器，可以采用以下方法：

1. ##### 使用`requestAnimationFrame`：

   `requestAnimationFrame`是浏览器提供的用于执行动画的方法，它在浏览器的重绘之前执行回调函数。相比于`setTimeout`和`setInterval`，`requestAnimationFrame`能够更精确地控制动画的执行。可以使用`requestAnimationFrame`来替代常规的计时器，特别适用于需要精确控制动画的场景。

2. ##### 使用`performance.now()`：

   `performance.now()`方法返回当前时间戳，以毫秒为单位。相较于`Date.now()`或`new Date().getTime()`，`performance.now()`提供了更高精度的时间测量。可以使用`performance.now()`来计算计时器的精确间隔。

3. ##### 避免阻塞操作：

   JavaScript是单线程的，长时间的计算或其他阻塞操作可能会延迟计时器的执行。为了确保计时器的精确性，应该尽量避免在计时器回调函数中执行耗时的操作，或者将这些操作放到Web Worker等单独的线程中进行。

4. ##### 使用Web Worker：

   Web Worker是在后台运行的JavaScript脚本，不会阻塞主线程。可以将计时器相关的操作放在Web Worker中，以避免对主线程的阻塞，从而提高计时器的精确性。

5. ##### 基于服务器时间：

   如果需要更精确的时间控制，可以从服务器获取准确的时间戳，并在客户端基于该时间戳进行计时。通过与服务器时间同步，可以更准确地控制计时器的行为。

需要注意的是，尽管上述方法可以提高计时器的精确性，但仍然无法完全消除执行环境和系统资源等因素对计时器的影响。在实际开发中，应根据需求和场景选择合适的方法，并权衡精确性和性能之间的平衡。

### Q：JS中为什么2.55.toFixed(1) 为2.5，如何解决？



![image-20230707185528812](https://c18e-1257416358.cos.accelerate.myqcloud.com/image-20230707185528812.png)

对于 `2.55.toFixed(1)`，返回值是 `"2.5"`，而不是期望的 `"2.6"`。这是因为 JavaScript 中的浮点数运算存在精度问题，导致舍入错误。

JavaScript 中的数字精度问题是由于浮点数的存储和计算方式导致的。JavaScript 使用 IEEE 754 标准来表示和计算浮点数，这种标准下，浮点数的精度是有限的，无法完全准确地表示某些十进制数。

##### JS数字不精确具体表现在三个层面

1. ##### 储存

   计算机储存的是二进制的数据，数字转换为二进制以后可能会出现无限循环的情况，例如`0.2.toString(2)`为无限循环的`0.001100110011001100110011...（无限循环）`，但是计算器的存储能力有限，计算机存储机制有固定的精度对于超过进度的二进制数据会进行向上舍入操作，验证这个操作可以看看`0.2.toPrecision(20)`

   ![image-20230707185505898](https://c18e-1257416358.cos.accelerate.myqcloud.com/image-20230707185505898.png)

   由于这种不精确也就意味着有一些奇怪的想象的发生。如下图：

   ![image-20230707185839033](https://c18e-1257416358.cos.accelerate.myqcloud.com/image-20230707185839033.png)

   这两个数字在计算机中存储的东西是完全一样的，也就意味着他们是完全相等的

   

   :::tip 向上舍入

   假设计算机用 4 位二进制表示小数，要存储 0.2。实际上，0.2 的二进制表示是 0.001100110011001100110011...`（无限循环），但由于精度限制，只能使用 4 位二进制表示。在进行向上舍入时，小数部分的下一位是 1，大于等于 0.5，所以最终结果是向上舍入到 0.001100110011001100110011001100110011001100110011001101

   :::

   

2. ##### 运算

   计算机中运算的过程是使用存储二进制来进行计算的

   ![image-20230707190218210](https://c18e-1257416358.cos.accelerate.myqcloud.com/image-20230707190218210.png)

   这个情况是因为在二进制在某些计算的时候会出现抵消的，因为是储存按照同一套规则进行保存数据，所以可能会出现某个数字实际存储会大一点，另外一个会小一点，当两个数字进行相加的时候就会出现刚好的情况

   

3. ##### 显示

   既然0.2实际储存的是0.20000000000000001110为什么赋值给一个变量显示的还是精确的呢

   ![image-20230707191045869](https://c18e-1257416358.cos.accelerate.myqcloud.com/image-20230707191045869.png)

   因为在显示的时候js会做近似处理（这里当误差被放大的时候，便不做近似处理啦。而是吧结果直接显示）

   ![image-20230707191230263](https://c18e-1257416358.cos.accelerate.myqcloud.com/image-20230707191230263.png)

   

有了上述理论我们回到问题，看看2.55实际保存的十进制是啥：

![image-20230707191933828](https://c18e-1257416358.cos.accelerate.myqcloud.com/image-20230707191933828.png)

这样一来便可以解释为什么2.55.toFixed(1) =>2.5的问题

##### 解决 JavaScript 数字精度问题的方法：

1. 使用整数运算：将浮点数转换为整数进行运算，最后再将结果转换回浮点数。这可以避免浮点数计算中的舍入误差。

2. 使用专门处理精确数字的库：例如，可以使用 Decimal.js、Big.js 等第三方库来处理精确的数值计算，这些库提供了更高精度的数字表示和计算方法。

3. 四舍五入：对于需要保留特定小数位数的结果，可以使用 `toFixed()` 方法来进行四舍五入。例如，`number.toFixed(2)` 会将数字保留两位小数并返回一个字符串。

4. 避免直接比较浮点数：由于精度问题，直接比较两个浮点数是否相等可能会出现意外的结果。可以使用相对误差或误差范围来比较浮点数。例如，可以定义一个误差范围，如果两个浮点数的差值小于这个范围，则认为它们相等。

5. 使用[decimaljs](https://github.com/MikeMcl/decimal.js/)其原理是存储保存的是字符串，计算的时候循环字符串来计算来保存数据的正确

6. 使用[mathjs](https://github.com/josdejong/mathjs)来计算

总之，在 JavaScript 中处理精确的数值计算需要特别注意浮点数精度问题，并根据具体情况选择合适的解决方案。

### Q: js中执行密集任务如何保证页面不卡顿？

1. ##### 使用`setTimeout`将任务分解为小的子任务：

```javascript
function performIntensiveTask() {
  // 执行密集任务的代码...

  if (还有未完成的任务) {
    setTimeout(performIntensiveTask, 0); // 将剩余任务放入下一个任务队列
  }
}

performIntensiveTask();
```

2. ##### 使用`requestAnimationFrame`在每一帧中执行任务：

```javascript
function performIntensiveTask() {
  // 执行密集任务的代码...

  if (还有未完成的任务) {
    requestAnimationFrame(performIntensiveTask); // 在下一帧执行任务
  }
}

performIntensiveTask();
```

3. ##### 使用`Web Workers`在后台线程中执行任务：

```javascript
// 主线程代码
const worker = new Worker('intensive-task.js');

worker.onmessage = function(event) {
  // 处理来自 Web Worker 的消息
};

// 发送任务给 Web Worker 执行
worker.postMessage({ /* 任务数据 */ });
```

```javascript
// Web Worker 中的 intensive-task.js 文件
self.onmessage = function(event) {
  const data = event.data;
  // 执行密集任务的代码...
  // 将结果发送回主线程
  self.postMessage({ /* 结果数据 */ });
};
```

4. ##### 使用`requestIdleCallback`在浏览器空闲时执行任务：

```javascript

// 定义密集任务函数
function performIntensiveTask() {
  // 执行密集任务的代码...
}

// 定义任务分片函数，将任务分解为小的子任务
function performTaskChunk(deadline) {
  while (deadline.timeRemaining() > 0) {
    performIntensiveTask(); // 执行一小部分任务

    // 检查是否还有未完成的任务
    if (还有未完成的任务) {
      requestIdleCallback(performTaskChunk); // 在浏览器空闲时执行下一个任务分片
    } else {
      console.log("任务已完成");
      break;
    }
  }
}

// 使用 requestIdleCallback 在浏览器空闲时执行任务分片
requestIdleCallback(performTaskChunk);
```

举个例子长时间耗时任务

```javascript
function task() {
    let obj = new Object()
    for (let index = 0; index < 60000000; index++) {
      obj[index] = {}
    }
}
```

js执行完成后，执行时间为6s并且页面大概有3秒钟进入卡死状态

![image-20230708114539003](https://c18e-1257416358.cos.accelerate.myqcloud.com/image-20230708114539003.png)

时间换空间，利用时间分片的方式解决卡死问题，由于它是使用 `for` 循环进行迭代，而 `for` 循环是一个同步操作，无法直接进行时间分片。但是，我们可以通过将任务分解为多个小任务，并使用 `setTimeout` 函数在每个时间片段中执行一部分任务，以达到时间分片的效果。

```javascript
function task() {
  let i = 0;
  let obj = {};

  function doWork() {
    const startTime = performance.now();
    while (i < 60000000) {
      obj[i] = {};
      i++;

      // 检查是否超过时间限制，如果超过则将剩余任务放入下一个时间片段
      if (performance.now() - startTime > 16) {
        setTimeout(doWork, 0);
        return;
      }
    }

    console.log(obj);
  }

  // 调用第一个时间片段
  setTimeout(doWork, 0);
}

// 调用函数开始执行任务
task();
```

`requestAnimationFrame`的写法

```javascript
   function task() {
      let i = 0
      let obj = {}

      function doWork() {
        const startTime = performance.now()
        while (i < 60000000) {
          obj[i] = {}
          i++

          // 检查是否超过时间限制，如果超过则将剩余任务放入下一个时间片段
          if (performance.now() - startTime > 16) {
            requestAnimationFrame(doWork)
            return
          }
        }

        console.log('done', Object.keys(obj).length)
        console.timeEnd()
      }

      // 调用第一个时间片段
      requestAnimationFrame(doWork)
    }
```

`requestIdleCallback`的写法：

```javascript
function task() {
  let i = 0;
  let obj = {};

  function doWork(deadline) {
    while (i < 6000000 && deadline.timeRemaining() > 0) {
      obj[i] = {};
      i++;
    }

    // 如果还有剩余任务，将其放入下一个时间片段
    if (i < 6000000) {
      requestIdleCallback(doWork);
    } else {
      console.log('done', Object.keys(obj).length);
      console.timeEnd();
    }
  }

  // 调用第一个时间片段
  requestIdleCallback(doWork);
}

console.time();
task();
```

演示代码

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta
      name="viewport"
      content="width=device-width, initial-scale=1.0"
    />
    <title>Document</title>
    <style>
      div {
        position: fixed;
        margin: 10vw;
        height: 30px;
        width: 30px;
        background-color: red;
        border-radius: 50%;
        animation: speed linear infinite 5000ms;
        left: 0;
        top: 0;
      }
      @keyframes speed {
        0% {
          left: 0;
        }
        50% {
          left: 50%;
        }
        100% {
          left: 0;
        }
      }
    </style>
  </head>
  <body>
    <div></div>
  </body>
  <script>
    function task() {
      let i = 0
      let obj = {}

      function doWork() {
        const startTime = performance.now()
        while (i < 60000000) {
          obj[i] = {}
          i++

          // 检查是否超过时间限制，如果超过则将剩余任务放入下一个时间片段
          if (performance.now() - startTime > 16) {
            requestAnimationFrame(doWork)
            return
          }
        }

        console.log('done', Object.keys(obj).length)
        console.timeEnd()
      }

      // 调用第一个时间片段
      requestAnimationFrame(doWork)
    }

    task()
  </script>
</html>
```

