# TypeScript

1. ##### 把对象的每个值转变为不可变类型

   ```typescript
   type DeepReadOnly<T extends Record<string | symbol, any>> = {
     readonly [K in keyof T]: DeepReadOnly<T[K]>
   }
   ```

2. ##### 联合类型转换为交叉类型

   ```typescript
   type UnionToIntersection<T> = (
     T extends any ? (x: T) => any : never
   ) extends (x: infer R) => any
     ? R
     : unknown
   ```

3. ##### TS中的协变和逆变

   在 TypeScript 中，协变（covariance）和逆变（contravariance）是用来描述类型之间的关系的概念。

   **协变（Covariance）**：表示类型之间的继承关系和赋值兼容关系。如果类型 A 是类型 B 的子类型（或者可以赋值给类型 B），则称类型 A 在该位置上是协变的。

   **逆变（Contravariance）**：表示类型之间的反向继承关系和赋值兼容关系。如果类型 A 是类型 B 的父类型（或者可以赋值给类型 B），则称类型 A 在该位置上是逆变的。

   在函数参数类型和返回值类型的上下文中，可以更好地理解协变和逆变。

   - **参数类型中的协变**：对于函数参数，如果传递的参数类型是函数期望的子类型，则参数类型是协变的。也就是说，可以传递一个子类型的参数给一个期望父类型参数的函数。

   - **返回值类型中的逆变**：对于函数返回值，如果函数返回的类型是函数期望的父类型，则返回值类型是逆变的。也就是说，可以返回一个父类型的值给一个期望子类型返回值的函数。

   以下是一个使用 TypeScript 的示例，展示了协变和逆变的使用：

   ```typescript
   // 协变示例
   type Animal = {
     name: string;
   };
   
   type Dog = {
     name: string;
     breed: string;
   };
   
   type AnimalFunc = (animal: Animal) => void;
   
   // 可以将 Dog 类型的参数传递给 AnimalFunc 类型的参数，因为 Dog 是 Animal 的子类型
   const printAnimal: AnimalFunc = (animal: Dog) => {
     console.log(animal.name);
   };
   
   // 逆变示例
   type Logger = {
     log: (message: string) => void;
   };
   
   type ConsoleLogger = {
     log: (message: string) => void;
     error: (message: string) => void;
   };
   
   type LoggerFunc = () => Logger;
   
   // 可以将返回类型为 Logger 的函数赋值给返回类型为 ConsoleLogger 的函数，
   // 因为 ConsoleLogger 是 Logger 的父类型
   const createConsoleLogger: LoggerFunc = (): ConsoleLogger => {
     return {
       log: (message: string) => {
         console.log(message);
       },
       error: (message: string) => {
         console.error(message);
       },
     };
   };
   ```

   在上述示例中，`Dog` 是 `Animal` 的子类型，因此可以将 `Dog` 类型的参数传递给期望 `Animal` 类型参数的函数。这体现了参数类型的协变性。

   而在返回值类型中，`ConsoleLogger` 是 `Logger` 的父类型，因此可以将返回类型为 `Logger` 的函数赋值给期望返回类型为 `ConsoleLogger` 的函数。这体现了返回值类型的逆变性。

   协变和逆变在 TypeScript 中的灵活应用可以帮助我们更好地处理类型之间的关系，提高代码的可复用性和灵活性。

4. ##### TS中的Infer

   在 TypeScript 中，`infer` 是一个用于类型推断的关键字。它通常与条件类型（Conditional Types）一起使用，在泛型类型中根据传入的类型参数推断出其他类型。

   `infer` 关键字用于定义一个类型参数占位符，在条件类型中将根据条件推断出的类型赋给该占位符，然后可以在条件类型的结果中使用这个推断出的类型。

   下面是一个使用 `infer` 的示例：

   ```typescript
   type ReturnType<T> = T extends (...args: any[]) => infer R ? R : never;
   
   function sum(a: number, b: number): number {
     return a + b;
   }
   
   type SumReturnType = ReturnType<typeof sum>; // SumReturnType 类型为 number
   ```

   在上面的示例中，我们定义了一个 `ReturnType` 条件类型，它接受一个类型参数 `T`。在条件类型中，我们使用了 `infer R`，将 `R` 作为类型参数占位符。通过判断 `T` 是否可调用（`T extends (...args: any[]) => infer R`），如果是可调用类型，则将函数的返回类型 `R` 赋给 `infer R`，否则返回 `never` 类型。

   然后我们定义了一个 `sum` 函数，并使用 `typeof sum` 获取它的类型。最后，我们使用 `ReturnType<typeof sum>` 将 `sum` 函数的返回类型推断为 `number` 类型。

   使用 `infer` 关键字可以在条件类型中提取、推断出更具体的类型，并进行灵活的类型转换和操作。这在编写泛型类型和复杂类型转换时非常有用。

5. ##### TS中的联合类型和交叉类型

   在 TypeScript 中，联合类型（Union Types）和交叉类型（Intersection Types）是用来组合多个类型的工具。

   **联合类型**表示一个值可以是多个类型中的一种。使用 `|` 运算符将多个类型组合在一起形成联合类型。例如：

   ```typescript
   type MyType = string | number;
   ```

   上面的代码定义了一个类型 `MyType`，它可以是 `string` 类型或 `number` 类型中的一种。

   在使用联合类型时，我们可以根据类型的共有属性或方法来进行操作，但只能使用联合类型中所有类型的共有部分。

   **交叉类型**表示一个值具有多个类型的特性，可以将多个类型合并为一个类型。使用 `&` 运算符将多个类型组合在一起形成交叉类型。例如：

   ```typescript
   type MyType = { foo: number } & { bar: string };
   ```

   上面的代码定义了一个类型 `MyType`，它同时具有 `{ foo: number }` 和 `{ bar: string }` 两个类型的属性。

   在使用交叉类型时，我们可以访问交叉类型中所有类型的属性和方法，它们会合并成一个更具体的类型。

   当两个对象联合时，可能会出现一些奇怪的现象。这是因为联合类型的属性和方法只能访问所有类型的共有部分。如果两个对象联合时，它们具有不同的属性或方法，那么在联合类型中访问这些属性或方法时会产生问题。

   例如，假设有两个对象 `obj1` 和 `obj2`：

   ```typescript
   const obj1 = { foo: 1 };
   const obj2 = { bar: 'hello' };
   
   const objUnion: typeof obj1 | typeof obj2 = obj1;
   
   console.log(objUnion.foo); // 正常，可以访问共有的属性 foo
   console.log(objUnion.bar); // 错误，objUnion 不一定具有属性 bar
   ```

   在上面的代码中，我们将 `obj1` 和 `obj2` 进行联合，赋值给 `objUnion`。由于 `objUnion` 是联合类型，它可能是 `obj1` 或 `obj2` 中的一种，所以只能访问它们共有的属性 `foo`。如果尝试访问 `bar` 属性，会在编译时报错。

   要解决这个问题，可以使用类型断言（Type Assertion）将联合类型断言为特定的类型，以便可以访问特定类型的属性或方法。例如：

   ```typescript
   if ('bar' in objUnion) {
     console.log((objUnion as typeof obj2).bar); // 类型断言为 obj2，可以访问属性 bar
   }
   ```

   上面的代码中，我们使用 `in` 运算符检查 `objUnion` 是否具有属性 `bar`，然后使用类型断言将 `objUnion` 断言为 `typeof obj2`，这样就可以访问属性 `bar` 了。

   需要注意的是，当使用联合类型时，需要格外注意对属性和方法的访问，确保只访问联合类型中所有类型的共有部分，或使用类型断言进行特定类型的访问。

6. ##### 防抖节流函数类型推断

   ```typescript
   declare function debounce<A extends any[], R>(
     func: (...args: A) => R,
     delay?: number
   ): (...args: A) => void
   ```

7. ##### 柯里化函数推断

   ```typescript
   type Curry<A, R> = A extends []
     ? () => R
     : A extends [infer ARG]
     ? (params: ARG) => R
     : A extends [infer ARG, ...infer REST]
     ? (params: ARG) => Curry<REST, R>
     : never
   ```

8. 

