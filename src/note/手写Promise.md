# 手写Promise

手写Promise让Promise理解到达顶级

## 什么是Promise？

只要符合[Promise/a+规范](https://promisesaplus.com/)的都是Promise

### 原文

**An open standard for sound, interoperable JavaScript promises—by implementers, for implementers.**

A *promise* represents the eventual result of an asynchronous operation. The primary way of interacting with a promise is through its `then` method, which registers callbacks to receive either a promise’s eventual value or the reason why the promise cannot be fulfilled.

This specification details the behavior of the `then` method, providing an interoperable base which all Promises/A+ conformant promise implementations can be depended on to provide. As such, the specification should be considered very stable. Although the Promises/A+ organization may occasionally revise this specification with minor backward-compatible changes to address newly-discovered corner cases, we will integrate large or backward-incompatible changes only after careful consideration, discussion, and testing.

Historically, Promises/A+ clarifies the behavioral clauses of the earlier [Promises/A proposal](http://wiki.commonjs.org/wiki/Promises/A), extending it to cover *de facto* behaviors and omitting parts that are underspecified or problematic.

Finally, the core Promises/A+ specification does not deal with how to create, fulfill, or reject promises, choosing instead to focus on providing an interoperable `then` method. Future work in companion specifications may touch on these subjects.

### 译文

1. 拥有构造函数
2. 并且拥有`then`方法

由此可以写一个简单的判断方法

```javascript
  const isPromiseLike=(value)=>{
    if (
      value !== null &&
      (typeof value === 'object' || typeof value === 'function')
    ) {
      return typeof value.then === 'function'
    }
    return false
  }
```

### 检验库

[`Promise/A+`测试工具]( https://github.com/promises-aplus/promises-tests)

## 核心

1. 构造函数
2. then方法
3. 微队列执行函数
4. 链式调用

### `then`方法

`then`方法是Promise最核心的方法，它甚至决定该对象符不符合A+规范。

### `then`方法的两个参数：

1. **onFulfilled**
   - 不是函数
     - 直接reslove当前值
   - 是函数
     -  `promise` 执行结束后必须被调用，其第一个参数为 `promise` 的终值`value`
     -  `promise` 执行结束前不可被调用
     - 能且只能调用一次，后续调用不执行
2.  **onRejected**
   - 不是函数
     - 直接reject当前值
   - 是函数
     -  `promise` 执行结束后必须被调用，其第一个参数为 `promise` 的终值`value`
     -  `promise` 执行结束前不可被调用
     - 能且只能调用一次，后续调用不执行

### `then`方法的链式调用：

then方法返回一个自身对象

- 如果 `onFulfilled` 或者 `onRejected` 返回一个值 `x` ，则运行 **Promise 解决过程**：`[[Resolve]](promise2, x)`
- 如果 `onFulfilled` 或者 `onRejected` 抛出一个异常 `e` ，则 `promise2` 必须拒绝执行，并返回 `e`
- 如果 `onFulfilled` 不是函数且 `promise1` 成功执行， `promise2` 必须成功执行并返回相同的值
- 如果 `onRejected` 不是函数且 `promise1` 拒绝执行， `promise2` 必须拒绝执行并返回相同的e

## 目标

- 使用new 关键字创建MyPromise并传递function
- 需要根据传递的方法和函数状态 返回对应的 `pending` 、`fufilled` 、`rejected`状态
- 可链式调用then方法

## 实现方案设计图

![image-20230614111030409](https://c18e-1257416358.cos.accelerate.myqcloud.com/image-20230614111030409.png)

## 实现思路

1. ### 满足new 关键字使用类实现

2. ### 构造函数的实现

   构造函数传入的是一个方法，方法中传入[两个参数](#then方法的两个参数)

   :::tip
   在 [核心](#核心) 一节中已经详细描述，这里不赘述
   :::

3. ### 私有变量

   - state:当前Promise状态
   - result:当前调用结果 完成则是回调数据 拒绝表述拒绝理由
   - handlers 执行队列

4. ### 私有方法

   - changeState 负责改变状态和结果
   - isPromiseLike 传入的对象是不是Promise
   - runMicroTask 根据不同的环境把任务放入微队列执行
   - runOne 执行封装的公共方法 减少代码冗余
   - run 执行方法入口

5. ### 静态方法

   - then方法
   - catch 获取异常
   - finally最后执行
   - 

6. ### 实例方法

   - reslove 直接返回
   - reject 拒绝

   

   

   

## 实现源码

```javascript
//参照 promise a+ 规范 https://promisesaplus.com/
const PENDING = 'pending'
const FULFILLED = 'fulfilled'
const REJECTED = 'rejected'
class MyPromise {
  #state = PENDING
  #result = void 0
  #handlers = []

  constructor(executor) {
    const reslove = (data) => {
      this.#changeState(FULFILLED, data)
    }
    const reject = (msg) => {
      this.#changeState(REJECTED, msg)
    }
    try {
      executor(reslove, reject)
    } catch (error) {
      this.#changeState(REJECTED, error)
    }
  }

  #changeState(state, result) {
    if (this.#state !== PENDING) return
    this.#state = state
    this.#result = result
    this.#run()
  }

  #isPromiseLike(value) {
    if (
      value !== null &&
      (typeof value === 'object' || typeof value === 'function')
    ) {
      return typeof value.then === 'function'
    }
    return false
  }
  #runMicroTask(func) {
    if (
      typeof process === 'object' &&
      typeof process.nextTick === 'function'
    ) {
      process.nextTick(func)
    } else if (typeof MutationObserver === 'function') {
      const ob = new MutationObserver(func)
      const textNode = document.createTextNode('1')
      ob.observe(textNode, { characterData: true })
      textNode.data = '2'
    } else {
      setTimeout(func, 0)
    }
  }
  #runOne(callback, reslove, reject) {
    this.#runMicroTask(() => {
      if (typeof callback === 'function') {
        const settled = this.#state === FULFILLED ? reslove : reject
        settled(this.#result)
      }
      try {
        const data = callback(this.#result)
        if (this.#isPromiseLike(data)) {
          data.then(reslove, reject)
        } else {
          reslove(data)
        }
      } catch (error) {
        reject(error)
      }
    })
  }
  #run() {
    if (this.#state === PENDING) return
    while (this.#handlers.length) {
      const { onFulfilled, onRejected, reject, reslove } =
        this.#handlers.shift()
      if (this.#state === FULFILLED) {
        this.#runOne(onFulfilled, reslove, reject)
      } else {
        this.#runOne(onRejected, reslove, reject)
      }
    }
  }
  then(onFulfilled, onRejected) {
    return new MyPromise((reslove, reject) => {
      this.#handlers.push({
        onFulfilled,
        onRejected,
        reject,
        reslove
      })
      this.#run()
    })
  }
  catch(onRejected) {
    return this.then(void 0, onRejected)
  }
  finally(onFinally) {
    this.then(
      (data) => {
        onFinally()
        return data
      },
      (error) => {
        onFinally()
        throw error
      }
    )
  }
  static reslove(value) {
    if (value instanceof MyPromise) return value
    let _reslove, _reject
    const p = new MyPromise((reslove, reject) => {
      _reslove = reslove
      _reject = reject
    })
    if (p.#isPromiseLike(value)) {
      value.then(_reslove, _reject)
    } else {
      _reslove(value)
    }
    return p
  }
  static reject(value) {
    return new MyPromise((reslove, reject) => {
      reject(value)
    })
  }
}
const p = new MyPromise((reslove, reject) => {
  setTimeout(() => {
    reslove(1)
  }, 1000)
})

p.then((data) => {
  console.log('ok1', data)
  return new Promise((reslove, reject) => {
    setTimeout(() => {
      reslove(data * 2)
    }, 1000)
  })
}).then((data) => {
  console.log('ok2', data)
})
```

## 测试

### promises-aplus-tests 使用

使用Promise/A+官方的测试工具[promises-aplus-tests](https://github.com/promises-aplus/promises-tests)来对`MyPromise`进行测试，要使用这个工具我们必须实现一个静态方法`deferred`，官方对这个方法的定义如下:

```javascript
MyPromise.deferred = function() {
  var result = {};
  result.promise = new MyPromise(function(resolve, reject){
    result.resolve = resolve;
    result.reject = reject;
  });

  return result;
}
```

然后用npm将`promises-aplus-tests`下载下来，再配置下package.json就可以跑测试了:

```json
{
  "devDependencies": {
    "promises-aplus-tests": "^2.1.2"
  },
  "scripts": {
    "test": "promises-aplus-tests MyPromise"
  }
}
```
