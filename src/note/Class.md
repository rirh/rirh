

# JavaScript中的class

```
javascript是一门非常灵活的语言。如果你是保守派的开发者。这门语言有时候会让你摸不着头脑。
当然每个语言都有基本类型，js也不例外。但是我认为引用类型是javascript最最让人摸不着头脑的，也是难点之一
```

**基本类型**

```
undefind
Null
Boolean
Number
String
Symbol
```

**引用类型**

```
引用类型统称为Object类型
细分下来有很多种类型
比较常见的为：
Function 
Object
Array
Date
...
```

**类型检测**

```javascript
js提供了 typeof 检测数据是否属于基本数据类型

typeof "hello world" // string

提供了 instanceof 检测数据的引用类型

[] instanceof Array   // true

// 对于更为细致的类型 使用以下hack更为准确
Object.prototype.toString.call()

// 应用场景
typeof(new Array())  // "object"
typeof(new Date())   // "object"
typeof(new RegExp()) // "object"

Object.prototype.toString.call(new Array()).slice(8, -1)  // "Array";
Object.prototype.toString.call(new Date()).slice(8, -1)   // "Date";
Object.prototype.toString.call(new RegExp()).slice(8, -1) // "RegExp";
```

**在js中原本是没有class关键字的 因为使用引用类型就能够实现class**

```javascript
function Person(name,age){
   this.name=name;
   this.age=age;
}

Person.prototype.shut="这是说话的实例属性";

Person.prototype.say=function(){
  console.log('这是说话的实例方法');
}

Person.shut="这是说话的静态属性";

Person.say=function(){
  console.log('这是说话的静态方法');
}

var p = new Person('小明', 10);

console.log(p.shut);
console.log(p.say());
console.log(Person.shut);
console.log(Person.say());

```

**但是这种写法凌乱，不便于维护。js的发展趋势接近规范化。后来class也出现在js中。**

```javascript
class Person{
  constructor(name,age){
    this.shut='这是说话的实例属性';
    this.name=name;
    this.age=age;
  }
  static shut ='这是说话的静态属性';
  static say(){
     console.log('这是说话的静态方法');

  }
  say(){
     console.log('这是说话的实例方法');
  }
}

var p = new Person('小明', 10);

console.log(p.shut);
console.log(p.say());
console.log(Person.shut);
console.log(Person.say());
```

**对于原始的实现来说class属于语法糖，本质还是使用原来的方法来实现。**

**继承**

```javascript
使用继承子类继承父类的的构造函数
如果不写构造函数默认使用父类的构造函数
如果需要新增修改子类的构造函数可以使用 super 关键字实现

class Person{
   constructor(name,age){
    this.name=name;
    this.age=age;
  }
}

class Chinese extends Person{
 constructor(name,age,skin){
   super(name,age);
   this.skin=skin;
 }
}

const p = new Chinese("小明",20,"黄皮肤");

console.log(p.name);
console.log(p.age);
console.log(p.skin);
```

