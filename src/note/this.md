


### 理解 this 

一道很经典的问题。

```javascript
function fn() {
  console.log(this); // 1. {a: 100}
  var arr = [1, 2, 3];

  (function() {
    console.log(this); // 2. Window
  })();

  // 普通 JS
  arr.map(function(item) {
    console.log(this); // 3. Window
    return item + 1;
  });
  // 箭头函数
  let brr = arr.map(item => {
    console.log("es6", this); // 4. {a: 100}
    return item + 1;
  });
}
fn.call({ a: 100 });
```

es5 普通函数、es6 的箭头函数以及通过`bind`改变过上下文返回的新函数。

理解这三种状态问题自然引刃而解



**es5 普通函数**

函数被直接调用，上下文this

函数作为对象属性被调用 上下文是obj

函数通过new调用 上下文绑定在返回的实例上



**es6 箭头函数**

本身没有`this`，会沿着作用域向上寻找，直到`global` / `window`

```javascript
function run() {
  const inner = () => {
    return () => {
      console.log(this.a);
    };
  };

  inner()();
}
run.bind({ a: 1 })(); // Output: 1
```



**bind 绑定上下文返回的新函数**

第一个 bind 绑定的上下文， bind 对“箭头函数”无效

```javascript
function run() {
  console.log(this.a);
}

run.bind({ a: 1 })(); // output: 1

// 多次bind，上下文由第一个bind的上下文决定
run.bind({ a: 2 }).bind({ a: 1 })(); // output: 2
```

几种方法的优先级：new > bind > 对象调用 > 直接调用




