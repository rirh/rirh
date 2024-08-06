


# COMPOSE

**我所理解的函数式编程**

```
一个形态转化为另一个形态，转化的过程就叫函数
```

**函数的合成**

```javascript
假设我们有一个加法函数
function add(x){
 return x+1;
}
有一个减法函数
function subtraction(x){
 return x-1;
}
```



**如果一个值要经过多个转化为另外一个形态，那可以把中间多个函数合并成一个函数，这个过程叫做函数的合并**

```javascript
function compose(add, subtraction) {
  return function (x) {
    return subtraction(add(x));
  };
}
```

**函数的合并必须满足合并律**

```javascript
 x+y+z
(x+y)+z
x+(y+z)
```

**这里的加减函数合成有一个隐藏的前提就是add和subtraction接受一个参数如果有多个参数参数的结合会变的非常的麻烦。**

**这个时候就需要函数的柯里化，简单可以理解柯里化为把多个参数转化为一个参数的过程。**

```javascript
// 柯里化之前
function add(x, y) {
  return x + y;
}

add(1, 2) // 3

// 柯里化之后
function addX(y) {
  return function (x) {
    return x + y;
  };
}

addX(2)(1) // 3
```

**有了柯里化所有的函数就只接收一个参数也就是需要处理的值**

**理解了这些基础，就具备了了解目前流行的包工具运行原理的基础。**






