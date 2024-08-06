






# HTML

📒 HTML(HyperTextMark-upLanguage)即超文本标记语言，是WWW的描述语言。 
知道xml文件，对于html文件也不陌生。
前者作为配置语言已经有一定的地位，后者则是一种标记语言！结构和书写方式都很类似，但本质却完全不同。

html大多数时候因为太简单而被忽略学习，其实简单的东西学问很大，就像Iphone设计原理一样，简单却强大，每一个细节都经得起琢磨。

这里有一个例子：

![image-20191202152912145](https://c18e-1257416358.cos.accelerate.myqcloud.com/uPic/image-20191202152912145.png)

这样布局div中的文字并不能如愿的渲染成红色，调试结果发现编译出来的布局有点奇怪

![image-20191202153405887](https://c18e-1257416358.cos.accelerate.myqcloud.com/uPic/image-20191202153405887.png)

原因是块元素可以包含内联元素或某些块元素，但内联元素却不能包含块元素

在HTML5中标签分为七大类：

1. Metadata（元数据内容）
2. Flow（流式元素）
3. Sectioning（章节元素）
4. Heading（标题元素）
5. Phrasing（段落元素）
6. Embedded（嵌入元素）
7. Interactive（交互元素）

关系如下图

![image-20191202154109922](https://c18e-1257416358.cos.accelerate.myqcloud.com/uPic/image-20191202154109922.png)

#### Metadata（元数据元素）

顾名思义，**Metadata元素意指那些定义文档元数据信息的元素** — 其作用包括：影响文档中其它节点的展现与行为、定义文档与其它外部资源之间的关系等。以下元素属于Metadata：`base`, `link`, `meta`, `noscript`, `script`, `style`, `template`, `title`。

#### Flow（流式元素）

**所有可以放在body标签内**，构成文档内容的元素均属于Flow元素。因此，除了`base`, `link`, `meta`, `style`, `title`等只能放在`head`标签内的元素外，剩下的所有元素均属于Flow元素。具体包含：

```
a， abbr， address， area（如果它是map元素的后裔）， article， aside， audio， b，
bdi， bdo， blockquote， br， button， canvas， cite， code， command， datalist， 
del， details， dfn， div， dl，em， embed， fieldset， figure， footer， form，
h1， h2， h3， h4， h5， h6， header， hgroup， hr， i， iframe， img， input， 
ins， kbd， keygen， label， map， mark， math， menu， meter，nav， noscript， 
object， ol， output， p， pre， progress， q， ruby， s， samp， script， section，
select， small， span， strong， style（如果该元素设置了scoped属性）， sub， sup，
svg， table，textarea， time， u， ul， var， video， wbr， text
```



#### Sectioning（章节元素）

Sectioning意指定义页面结构的元素，具体包含以下四个：`article`, `aside`, `nav`, `section`。

#### Heading（标题元素）

所有标题元素属于Heading，也即以下6个元素：`h1`, `h2`, `h3`, `h4`, `h5`, `h6`。

#### Phrasing（段落元素）

**所有可以放在p标签内，构成段落内容的元素均属于Phrasing元素**。因此，所有Phrasing元素均属于Flow元素。在HTML5标准文档中，关于Phrasing元素的原始定义为：

> Phrasing content is the text of the document, as well as elements that mark up that text at the intra-paragraph level. Runs of phrasing content form paragraphs.

对于这一定义，个人认为不应当使用“text”这一容易引起误解的词，事实上，一个元素即使不是文本，只要能包含在p标签中成为段落内容的一部分，就可以称之为Phrasing元素。比如：`audio`、`video`、`img`、`select`、`input`等元素(经测试，这些元素都可以放置在p标签中)。
具体包含如下：

```
a（如果其只包含段落式元素）， abbr， area（如果它是map元素的后裔）， audio， b，
bdi， bdo， br， button， canvas， cite， code， command， datalist， 
del（如果其只包含段落式元素）， dfn， em， embed， i，iframe， img， input， 
ins（如果其只包含段落式元素）， kbd， keygen， label， map（如果其只包含段落式元素），
mark， math， meter， noscript， object， output， progress， q， ruby， s，
samp， script，select， small， span， strong， sub， sup， svg， textarea，
time， u， var， video， wbr， text
```



Phrasing元素内部一般只能包含别的Phrasing元素。
关于Phrasing元素，[Stackoverflow上有一个比较精彩的问答](https://stackoverflow.com/questions/30233447/what-is-the-difference-between-phrasing-content-and-flow-content)，可供参考。

#### Embedded（嵌入元素）

所有用于在网页中**嵌入外部资源的元素**均属于Embedded元素，具体包含以下9个：`audio`, `video`, `img`, `canvas`, `svg`, `iframe`, `embed`, `object`, `math`。

#### Interactive（交互元素）

所有与用户交互有关的元素均属于Interactive元素，包括`a`, `input`, `textarea`, `select`等。
具体包含如下：

```
a， audio（如果设置了controls属性）， button， details， embed， iframe，
img（如果设置了usemap属性）， input（如果type属性不为hidden状态）， keygen， label，
menu（如果type属性为toolbar状态），object（如果设置了usemap属性）， select， 
textarea， video（如果设置了controls属性）
```



### HTML5内容模型(Content Model)

根据以上元素分类，HTML5标准文档定义了任何元素的内容模型 — 对于该元素而言，何种子元素才是合法的。
比如，对于p元素而言，其内容模型为Phrasing, 这意味着`p`元素只接受Phrasing元素为子元素，而对于像`div`这样的非Phrasing元素则并不接受。类似的，`li`元素的内容模型为Flow，因此任何可以放置在`body`中的元素都可以作为`li`元素的子元素。

#### 透明内容模型(Transparent content models)

值得注意的是，HTML5标准文档在定义元素的内容模型时，会使用一类特殊的分类：**透明内容模型(transparent) — 对于内容模型为透明(transparent)的元素而言，其子元素的合法性由其父元素所决定；如果其父元素的内容模型仍为透明，则查看其祖父元素的情况，并依此类推；如果向上推演至body标签仍未找到任何内容模型非透明的父级元素，则该透明元素内部可包含任何Flow元素。**
透明元素目前W3C中也没有给出明确的包含哪些元素，从段落元素中推断透明内容模型元素有：

```
a, ins, del, map
```



**典型的具有透明内容模型的元素为`a`元素**。因此，当`a`出现在`p`标签中时，`a`不能接受`div`作为子元素；而当`a`出现在`div`标签中时，`a`可以接受`div`作为子元素。对此，[知乎上有一个问答解释了这种现象](http://www.zhihu.com/question/34952563)。





