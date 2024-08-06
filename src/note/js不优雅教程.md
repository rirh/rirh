
# 不优雅代码指南

## 如何编写

在 GitHub 上有一个新项目，它描述了「最佳垃圾代码」的十九条关键准则。从变量命名到注释编写。这些准则将指导你写出最亮眼的烂代码。



为了保持与原 GitHub 项目一致的风格，下文没有进行转换。读者们可以以相反的角度来理解所有观点，这样就能完美避免写出垃圾代码。



项目地址：https://github.com/trekhleb/state-of-the-art-shitcode



当然，以下十九条垃圾代码书写准则并没有面面俱到，如果读者们发现有一些难以忍受的烂代码习惯，也可以发表你的看法。



##  第一条：**打字越少越好**



如果我们键入的东西越少，那么就有越多的时间去思考代码逻辑等问题。如下所示，「Good」表示遵循该规则的示例，Bad 表示没遵循该规则的示例。



![img](https://c18e-1257416358.cos.accelerate.myqcloud.com/uPic/code1.png)



##  第二条：**变量/函数混合命名风格**


我们需要混合命名方法与变量，这样才能体现命名的多样性。



![img](https://c18e-1257416358.cos.accelerate.myqcloud.com/uPic/code2.png)


##  第三条：**不要写注释**



反正代码都看得懂，为什么要写注释？或者说，反正没人看我的代码，为什么要写注释？



![img](https://c18e-1257416358.cos.accelerate.myqcloud.com/uPic/code3.png)



##  第四条：**使用母语写注释**



如果你违反了第三条规则，那么至少写注释需要用你的母语或者其它语言。如果你的母语是英语，那么你也算违反了这条规则。既然编程语言绝大多数都是用英文，那么为什么不用其它语言注释一下？



![img](https://c18e-1257416358.cos.accelerate.myqcloud.com/uPic/code4.png)



##  第五条：**尽可能混合不同的格式**



同样，为了代码的多样性，我们需要尽可能混合不同的格式，例如单引号或双引号。如果它们的语义相同，那就应该混用。



![img](https://c18e-1257416358.cos.accelerate.myqcloud.com/uPic/code5.png)



##  第六条：**尽可能把代码写成一行**



如果一系列参数与方法都是一起实现的，那么代码也要写在一起。



![img](https://c18e-1257416358.cos.accelerate.myqcloud.com/uPic/code6.png)



##  第七条：**发现错误要保持静默**



当你发现某些错误时，其他人不需要了解它，因此不需要打印出日志或 Traceback。



![img](https://c18e-1257416358.cos.accelerate.myqcloud.com/uPic/code7.png)



##  第八条：**广泛使用全局变量**



使用全局变量，是面向「全球化」不可或缺的部分。



![img](https://c18e-1257416358.cos.accelerate.myqcloud.com/uPic/code9.png)



##  第九条：**构建备用变量**



以防万一，我们需要创建一些备用变量，在需要时随时调用它们。



![img](https://c18e-1257416358.cos.accelerate.myqcloud.com/uPic/code10.png)



##  第十条：**Type 使用需谨慎**



一般不要指定变量类型或者经常做类型检查，无类型才是最好的类型。



![img](https://c18e-1257416358.cos.accelerate.myqcloud.com/uPic/code11.png)



##  第十一条：**准备「Plan B」**



你需要准备一些运行不到的代码（unreachable code），它们可以作为你的「Plan B」。



![img](data:image/gif;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVQImWNgYGBgAAAABQABh6FO1AAAAABJRU5ErkJggg==)



##  第十二条：**嵌套的三角法则**



如果代码有一些嵌套结构，或者说缩进空行的结构，三角法则是最漂亮的。



![img](data:image/gif;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVQImWNgYGBgAAAABQABh6FO1AAAAABJRU5ErkJggg==)



##  第十三条：**混合缩进**



我们需要避免采用缩进，因为缩进会使复杂代码在编辑器中占用更多的空间。如果一定要采用缩进，那么就使用混合缩进策略。当然，这种策略在 Python 中是行不通的，因为它靠缩进来确定代码结构。



![img](data:image/gif;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVQImWNgYGBgAAAABQABh6FO1AAAAABJRU5ErkJggg==)



##  第十四条：**不要锁住依赖项**



每一次要安装新库时，更新已有的依赖项。为什么要维持之前的版本呢，我们需要时刻保持最新的第三方代码库。



![img](https://c18e-1257416358.cos.accelerate.myqcloud.com/uPic/code13.png)



##  第十五条：**长函数比短函数好**



不要将程序整体逻辑分割为一些代码块，要是 IDE 突然不行了，它找不到必要的文件或函数怎么办。因此把代码写在一个主体函数中，并且不再维护额外的函数导入或代码文件，那么这样的方法是最稳定的。



单个文件一万行代码是没问题的，单个函数一千行代码也是没问题的。



##  第十六条：**代码不需要做特定测试**



这些测试通常是重复且无意义的工作。



##  第十七条：**尽量避免重复代码**



按你的想法写代码，尤其是在小团队中，毕竟这是「自由」准则。



##  第十八条：**构建新项目不需要 README 文档**



在项目前期，我们可以暂时保持这种状态。



##  第十九条：**保存不必要的代码**



在写代码的过程中，经常会产生很多测试代码。这些代码也是非常重要的资料，因此不能删除掉，最多只能注释掉。

