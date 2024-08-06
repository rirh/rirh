




### javascript高级程序设计笔记

念完书依靠自己的回忆写出来才算是记住了。

##### 完整的页面

1. 页面的组成：核心（ECMAscript） 、文档对象模型（DOM）是针对 XML 经过扩展用于 HTML 的程序编程 API、浏览器对象模型（BOM）控制浏览器显示的页面以外部分
2. 常见的 Web 浏览器知识 ECMAScript 实现的**宿主环境**之一，其他环境包括 Node、Adobe Flash

##### 在HTML中使用javascript

下面两个属性可以控制 script 加载，它们不能严格保证执行顺序：

1. async：不阻塞页面，下载并且执行脚本
2. defer：脚本延迟到文档被完全解析和显示后再执行。

script 脚本中不要嵌入出现`""` 字符串，会被错误识别为结束标签。正确写法是：`"<\/script>"`。

如果 script 标签中既有代码内容，并且也引入了外部脚本（src 属性）。浏览器只会执行外部脚本。

##### 可扩展超文本标记语言 XHTML

XHTML 编写比 HTML 更严格，例如 `>` 等符号都需要转义。为了保证 js 正常运行，用 `CDATA` 来包裹。

下面代码在不兼容 xml 的浏览器可以平稳退化：

```javascript
<script type="text/javascript">
  //<![CDATA[
  function compare(a, b) {
    if (a < b) {
      console.log("a is less than b");
    }
  }
  //]]>
</script>
```
对于script关闭的过滤，下面写法更加友好。
```html
<body>
  <noscript>
    <p>请启用JavaScript</p>
  </noscript>
</body>
```

针对 ES3 的不确定行为，ES5 增加了严格模式，它是“编译指示”，用来告知 Js 引擎切换到严格模式，需要在代码顶部添加：`"use strict";`

保留字是之后可能被用作关键字的标识符

`var` 声明的变量存在声明提升

```javascript
var a = 1;
function test() {
  console.log(a);
  var a = 2;
  a = 3;
}
test();

===============解释为以下代码=============
  
var a = 1;

function test() {
  var a = undefined;
  console.log(a);
  a = 2;
  a = 3;
}

test();
```

`null` 和 `undefined` 不相同，区别如下：

- null：空对象指针，`typeof null` 返回 `"object"`，常用于定义空变量
- undefined：未定义，变量只声明时，默认赋值`undefined`

`number`类型：

- 8 进制：0 开头，例如 070
- 16 进制：0x 开头，例如 0x1f
- 科学计数法：1ex，例如 1e2 = 100

所有 8 和 16 进制值在运算时，都会被转化为 10 进制。

`Number.MIN_VALUE` 和 `Number.MAX_VALUE` 分别返回最小值和最大值。超出范围的会被转化为 `Infinity` 。

不合法的数，比如 1/0 ，会返回 `NaN`，需要用 `isNaN` 判断。对于对象，`isNaN` 先调用 `valueOf` ，再掉用 `toString` 。

`parseInt` 应该在第二个参数指明进制

字符串变量的值是不可变的，当改变值时，会销毁之前的字符串，然后用包含新值的字符串填充变量。

调用数值的 `toString` 方法，给定参数代表进制。

特殊编码：

- `\xnn`：以 16 进制代码 nn 表示字符
- `\unnnn`：以 16 进制代码 nnnn 表示 Unicode 字符

Object 实例都有以下属性：

- constructor: 指向创建对象的函数
- hasOwnProperty
- obj1.isPrototypeOf(obj2): obj1 是不是在 obj2 的原型链上
- propertyIsEnumerable(propName): propName 能否用 for-in 枚举

对于 BOM、DOM 等宿主环境提供的对象，可能并不继承 Object

**位操作**

- `~`: 按位非。`~110 => 001`
- `&`: 按位与。
- `|`: 按位或。
- `^`: 异或操作。位数相同返回 0，不同返回 1。
- `<<`: 左移
- `>>`: 默认情况，有符号右移，保留符号位（符合正常逻辑）
- `>>>`: 无符号右移，在移动时候忽略符号位。

正因为移动时候忽略符号位，因此例如 -64 = 111111..11100000，负数的补码会被当做正数的二进制码

布尔一般直接使用 `!!` 进行转化

`arguments` 是类数组对象，严格模式下不能重写或者重新定义其中的值。

`arguments.callee` 指向函数自身，用于编写递归函数。

**注意**：js 的函数没有重载。ts 可以重载，但是也只是多类型声明，不符合传统意义的函数重载



##### 执行环境和作用域

延长作用域链的情景

1. `try-catch`中的`catch`：作用域链前端新增错误对象
2. `with`：作用域链前端新增指定对象
3. 函数闭包

##### 垃圾回收(GC)

#### 标记清除和引用计数

浏览器的实现有两种：

1. **标记清除**：所有变量打标记；去掉环境中变量的标记，以及被环境中变量引用变量的标记；之后，清除还有标记的变量。
2. **引用计数**：跟踪每个变量引用次数，被引用的变量就加 1；如果此变量又取了另一个变量，减 1。

```javascript
const value = 1; // 引用0
const copy = value; // 引用+1
const obj = {
  copy // 引用 + 1
};
obj.copy = null; // 引用 -1
// 最后，引用次数为1
```
引用计数无法处理“循环引用”的情况，例如：
```javascript
function problem() {
  const obja = {},
    objb = {};

  obja.prop = objb; // objb的引用次数和obja的引用次数都+1
  objb.prop = obja; // objb的引用次数和obja的引用次数再+1
  // obja 和 obj2 的引用次数均是2
  // 变量永远不会被清除，造成内存泄漏
}
```

##### 性能优化

在**优化性能问题**上，IE6 根据固定的内存分配量来触发 gc。但是如果脚本中声明了很多变量，并且都没有被释放，那么一直会达到触发标准，gc 会高频率触发，效率低下。

es7 做出了改进：临界值是动态计算的。如果一次垃圾回收的内存量低于 15%，那么临界值会翻倍；如果高于 85%，重置临界值。

##### 管理内存

解除引用：不使用的变量，设置为`null`。

解除引用不意味变量内存回收，而是让其脱离执行环境，方便下次 gc 回收



##### 引用类型

ECMAScript 是面向对象语言，但不是传统的面向对象。提供构造函数，专门对接传统对象编程



##### Object 类型

`new Object()` 和 `{}` 声明等效



##### Array 类型

创建有`Array` `[]`。

`length` 是可读写的，置 0 可以清空数组。



##### 栈和队列

- 栈：`push` && `pop`
- 队列：`push` && `shift

concat：参数会被自动展开

```javascript
const colors = [1];
const colors2 = colors.concat(2, [3, 4]); // [1, 2, 3, 4]
```

slice(star, end): 切片，返回新数组。

splice(start, count, ...items):

- 删除：不需要第三个参数
- 插入：第二参数置 0
- 替换：第二个和第三个参数要用
- 

##### Date 类型

Date.now() 和 new Date().gewNow() 等价。

Date.parse(string): 返回 string 代表的日期的毫秒数。`年/月/日`，请不要使用`-`连接！

Date 实例可以直接比较大小，因为`valueOf`返回毫秒数



##### RegExp 类型

不推荐 `new RegExp(string)` 来声明正则，因为 string 是字符串，元字符需要双重转义。比如`\n`，就是`\\n`。

每个实例拥有以下属性：

- global：g

- ignoreCase: i

- multiline: m

- **lastIndex**: 搜索下一匹配项的字符位置

- **source**: 正则的字符串表示

  

##### Function 类型

代码求值时，js 引擎会将声明函数提升到源码顶部。

`arguments`上重要属性：

- length：参数长度
- callee: 函数自身引用

函数上重要属性：

- caller: 调用此函数的函数引用。全局访问返回 null
- length：函数希望接受的参数个数（不算默认参数）

```javascript
function outer() {
  inner();
}
function inner(a, b = 1) {
  console.log(arguments.callee.caller === outer);
}

outer(); // true
inner.length; // 2 - 1 = 1
```

函数 prototype 属性无法枚举，不能用 for-in 枚举

- 可以使用 `Object.getOwnPropertyNames` ，返回一个由指定对象的所有自身属性的属性名（包括不可枚举属性但不包括 Symbol 值作为名称的属性）组成的数组。
- 可以使用 `Reflect.ownKeys`，返回包括所有自身属性的属性名的数组



##### 基本包装类型

num.toFixed(位数)：自动舍入，返回字符串。

num.toExponential(位数)：转化为科学计数法，返回字符串。

String.fromCharCode(...charcodes): 将字符编码转化为字符串。

String.charCodeAt(index): 将 index 的字符转化为字符编码



##### 面向对象的程序设计

ECMA-62 对象定义：无序属性集合，其属性可以包括基本值、对象和函数

ECMA 有 2 种属性：数据属性和访问器属性。它们可以通过 `Object.getOwnPropertyDescriptor` 来读取。



**1.数据属性**

通过 `Object.defineProperty(对象, 属性名, {属性: 值})` 来修改，可修改的属性是：configurable(是否可通过`delete`删除)、enumerable(能否 for-in 循环)、writable(能否修改)、value。

可以多次调用 api 修改上述属性，除了将 `configurable` 设置为 false。

**2.访问器属性**

访问器属性不包含数据值，也是通过 `Object.defineProperty(对象, 属性名, {属性: 值})` 来修改。

可修改的属性是：configurable、enumerable、get、set。其中，只指定 get 不指定 set，那么就是不可写；反过来，不能读。

##### 理解原型对象

原型模式中，实例的 `__proto__` 指向构造函数的 `prototype`，因此，`构造函数.prototype.isPrototypeOf(实例)`返回 true。

因为原型链有下端“屏蔽”上端的机制，可以通过逐步 `delete` 来暴露上端属性。

##### 原型与 `in` 操作符

如果对象可以访问给定属性，那么 `in` 返回 true

```javascript
function Person() {}
Person.prototype.name = "student";
const person = new Person();
console.log("name" in person); // output
```

检测 `prototype` 是否位于 原型链上，而不位于实例上

```javascript
function hasPropertyInPrototype(object, prototype) {
  // hasOwnProperty 是否位于实例上
  return prototype in object && !object.hasOwnProperty(prototype);
}
```

##### 函数表达式

##### 闭包

```javascript
function createFunction() {
  var result = new Array();

  for (var i = 0; i < 10; ++i) {
    result[i] = function() {
      return i;
    };
  }

  return result;
}
```

调用 result 中的函数，返回值均是 10。这是因为 `var` 不是块级作用域，闭包声明造成了内函数可以访问 `createFunction` 的作用域，并且在结束函数后，变量`i`的生命被延长了下来。例如，当调用 `result[0]` 的时候，就会访问并且返回 `createFunction` 中的 变量`i`的值。

如果将 `var` 换成 `let`，则不存在这个问题。虽然变量`i`生命被延长，也属于 `createFunction`作用域，但是`let`本身是“**块级作用域**”。也就是说，闭包中返回的`i`是当前循环下的`i`，没有发生污染。

##### 模仿块级作用域

下面写法内存占用低，标记清除的`gc`在函数运行完，检测到不被使用，会立即销毁作用域链

```javascript
(function() {
  // ...
})();
```

##### 私有变量

利用闭包，可以很巧妙地实现静态私有变量、私有函数方法等

```javascript
(function() {
  var name = ""; // 静态私有变量

  return {
    name() {
      return name + "123";
    }
  };
})();
```

##### window 对象

双重角色：js 访问浏览器的 api + ECMAScript 规定的 global 对象

##### 全局作用域

定义在全局的变量不能被 delete, 定义在 window 上的属性可以被 delete

##### 窗口关系及框架

对于 window 的`frames`，为了保证兼容性，请使用：`top.frames`。因为`top`是绝对的。

除了`top`外，还有`parent`，在没有任何框架情况下，`top === window`。

最后，还有`self`。在 sw 中，常用 self 访问 window 上的 api。

##### 系统对话框

它们是浏览器决定的，是同步和模态的。显示的时候，会终止代码执行

#####  location 对象

location.href(最常用) 和 window.location 本质都是调用 location.assign()。

除此之外，修改 location 上的其他属性，也可以改变当前加载的页面，比如 `location.hash='#setion'`

以上方法，会在浏览器中生成新的历史记录。使用`location.replace()`方法，不会在浏览器中生成历史记录。

location.reload(true)：强制重新加载

##### navigator 对象

`navigator.plugins` 存放插件信息

```javascript
// 通用检测方法
function hasPlugin(name = "") {
  name = name.toLocaleLowerCase();
  for (var i = 0; i < navigator.plugins.length; ++i) {
    if (navigator.plugins[i].name.toLocaleLowerCase().indexOf(name) > -1) {
      return true;
    }
  }
  return false;
}
```

但由于 IE 浏览器的兼容，最好针对不同浏览器封装不同的插件检测方法



##### 注册处理程序

google 支持 registerProtocolHandler 自定义协议。比如打开`https://www.baidu.com`的控制台，在其中输入：

```javascript
// 理论上是这样，但是效果不好
navigator.registerProtocolHandler(
  "web+baidu",
  "https://www.baidu.com/s?wd=%s",
  "Baidu handler"
);
```

##### history 对象

history.go(): 任意跳转。数字代表前后跳转，字符串会自动找寻历史中最近的位置跳转。

history.length: 保存历史记录的数量




