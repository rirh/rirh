


### 类型的验证

ECMAScript 中定义了 7 种原始类型：

- Boolean
- String
- Number
- Null
- Undefined
- Symbol（新定义）
- BigInt（新定义）

**注意**：原始类型不包含 Object 和 Function

在进行判断的时候有`typeof`、`instanceof`。对于数组的判断，使用`Array.isArray()`

typeof：

- typeof 基本都可以正确判断数据类型
- `typeof null`和`typeof [1, 2, 3]`均output"object"
- ES6 新增：`typeof Symbol()`output"symbol"

instanceof：

- 专门用于实例和构造函数对应

```javascript
function Obj(value) {
  this.value = value;
}
let obj = new Obj("test");
console.log(obj instanceof Obj); // output: true
```

判断是否是数组：`[1, 2, 3] instanceof Array`

`Array.isArray()`es6方法，用来判断是否是'Array' 



### 关于计算中的类型转换

在进行数学操作的时候，会涉及到基础对象的转化问题。

如果操作对象是原始类型，那么就不会进行转换，如果不是将会进行从上倒下方法规则的转换。

规则如下：

1. 调用实例`valueOf()`方法
2. 调用实例`toString()`方法
3. 都没output原始类型，就会报错

```javascript
let a = {
  toString: function() {
    return "a";
  }
};

let b = {
  valueOf: function() {
    return 100;
  },
  toString: function() {
    return "b";
  }
};

let c = Object.create(null); // 创建一个空对象

console.log(a + "123"); // output: a123
console.log(b + 1); // output: 101
console.log(c + "123"); // 报错

//除了valueOf和toString，es6 还提供了Symbol.toPrimitive供对象向原始类型转化，并且它的优先级最高
let b = {
  valueOf: function() {
    return 100;
  },
  toString: function() {
    return "b";
  },
  [Symbol.toPrimitive]: function() {
    return 10000;
  }
};

console.log(b + 1); // output: 10001

//关于instanceof判断是否是某个对象的实例，es6 也提供了Symbol.hasInstance接口，代码如下：

class Even {
  static [Symbol.hasInstance](num) {
    return Number(num) % 2 === 0;
  }
}

const Odd = {
  [Symbol.hasInstance](num) {
    return Number(num) % 2 !== 0;
  }
};

console.log(1 instanceof Even); // output: false
console.log(1 instanceof Odd); // output: true
```

### 类型转换

```javascript
//将数字转换为字符串
const a = 1;
String(a) // output: "1"
`${a}`    // output: "1"
a+''      // output: "1"

//将字符串转换为数字
Number("3.14")    // output 3.14
Number(" ")       // output 0
Number("")        // output 0
Number("99 88")   // output NaN

5 + null    // 返回 5         null 转换为 0
"5" + null  // 返回"5null"   null 转换为 "null"
"5" + 1     // 返回 "51"      1 转换为 "1" 
"5" - 1     // 返回 4         "5" 转换为 5

//由于上面的转化特性，一些特殊的类型自动转化为字符串

const val = {name:"Fjohn"}  // toString 转换为 "[object Object]"
const val = [1,2,3,4]       // toString 转换为 "1,2,3,4"
const val = new Date()      // toString 转换为 "Fri Jul 18 2014 09:08:55 GMT+0200"


//转换为boolen
var a = new Boolean(false)
var b = new Boolean(0)
var c = new Boolean("")

var d = Boolean(a && b && c)    //true
// 如果需要判断变量foo是否等于"false"
const isfoo = foo === "false";
//除了上面的办法还真没有什么好办法
//问题来自做医疗项目后台时药物校验的判断

```



