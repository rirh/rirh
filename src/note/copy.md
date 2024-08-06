
# 拷贝

**示例**

```javascript
const foo = {a:1,b:1};
const coo = foo;
coo.a=2;
console.log(foo.a) //2
```

**引子**

```
深拷贝，浅拷贝，赋值。
很常见的几个名字。但是要说出区别深入理解，可不是一件简单的事情！
```

**概念**

```
在谈论区别之前需要知道几个基本概念：

栈（stack）：队列优先,先进先出；由操作系统自动分配释放 ，存放函数的参数值，局部变量的值等。其操作方式类似于数据结构中的栈
堆（heap）：先进后出；动态分配的空间 一般由代码语句分配释放， 若不释放，程序结束时可能由OS回收，分配方式倒是类似于链表

js按类型分为基本类型和引用类型

基本类型一般都是保存在栈内存中（闭包其他特殊情况除外），引用类型的命名和值保存在栈内存中，但是栈中对应的值比较特殊，因为引用类型的值是一个推内存地址。

所以引用类型会在栈内存通过命名找到堆地址，再用地址在栈内存中找到实例
```

```
赋值会在栈内存中重新分配内存，以新的变量命名，所对应的值是和赋值的对象一致的。但foo和coo的值都是引用类型。所以两个值指向的是同一个推地址。
```

**拷贝**

```
拷贝一个引用类型的对象，希望在栈内存也有一份新数据。这便是深拷贝。

但是函数类型是一个特殊的类型，于是拷贝便已函数为界限
不包括函数类型的拷贝为浅拷贝
```

```javascript
			function cloneShallow(params){
        var object = {};
        for (var variable in params) {
              if (params.hasOwnProperty(variable)) {
                    object[variable]=params[variable]
                  }
          }
      }
```

##### 手写一个深拷贝函数

```javascript
/**
 * 数组的深拷贝函数
 * @param {Array} src
 * @param {Array} target
 */
function cloneArr(src, target) {
  for (let item of src) {
    if (Array.isArray(item)) {
      target.push(cloneArr(item, []));
    } else if (typeof item === "object") {
      target.push(deepClone(item, {}));
    } else {
      target.push(item);
    }
  }
  return target;
}

/**
 * 对象的深拷贝实现
 * @param {Object} src
 * @param {Object} target
 * @return {Object}
 */
function deepClone(src, target) {
  const keys = Reflect.ownKeys(src);
  let value = null;

  for (let key of keys) {
    value = src[key];

    if (Array.isArray(value)) {
      target[key] = cloneArr(value, []);
    } else if (typeof value === "object") {
      // 如果是对象而且不是数组, 那么递归调用深拷贝
      target[key] = deepClone(value, {});
    } else {
      target[key] = value;
    }
  }

  return target;
}

// 这个对象a是一个囊括以上所有情况的对象
let a = {
  age: 19,
  jobs: {
    first: "EF"
  },
  schools: [
    {
      name: "candy"
    },
    {
      name: "tom"
    }
  ],
  arr: [
    [
      {
        value: "foo"
      }
    ],
    [
      {
        value: "boo"
      }
    ]
  ]
};

let b = {};
deepClone(a, b);

a.jobs.first = "native";
a.schools[0].name = "SZU";
a.arr[0][0].value = "100";

console.log(a.jobs.first, b.jobs.first); // output: native EF
console.log(a.schools[0], b.schools[0]); // output: { name: 'SZU' } { name: 'tom' }
console.log(a.arr[0][0].value, b.arr[0][0].value); // output: 100 foo
console.log(Array.isArray(a.arr[0])); // output: true
```


