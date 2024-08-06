# CSS常见问题

## Q:如何自动填充剩余空间？

CSS自动填充剩余空间有以下几种方法：

1. ##### flexbox布局

Flexbox是一种CSS布局模式，可以使用它来轻松地实现自适应布局和自动填充剩余空间。具体实现方式是在父容器上添加`display: flex;`属性，同时利用`justify-content`和`align-items`属性来控制子元素的排布及大小。

例如，可以使用以下代码使一个元素根据剩余空间自适应：

``` css
.container {
  display: flex;
  justify-content: center;
  align-items: center;
}
```

2. ##### grid布局

Grid布局是另一种CSS布局模式，也可以用于实现自适应布局和自动填充剩余空间。在Grid布局中，使用`grid-template-columns`和`grid-template-rows`属性来定义每一行和每一列的大小。

例如，可以使用以下代码使一个元素在父容器中自适应：

``` css
.container {
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 1fr;
}
```

3. ##### 使用calc()函数

使用CSS的calc()函数也可以实现自动填充剩余空间。例如，可以使用以下代码使一个元素根据父容器的剩余高度自适应：

``` css
.container {
  height: 300px;
}
.element {
  height: calc(100% - 100px);
}
```

其中，`.container`元素的高度为300px，而`.element`元素的高度通过`calc()`函数计算为父元素高度减去100px。

### Q:如何设置不规则图形或svg图形阴影?

CSS 的 `drop-shadow` 属性可以用来创建元素的投影效果，实现阴影效果。`drop-shadow` 属性可以应用于元素的边界框，并指定阴影的颜色、模糊半径、偏移量等参数。

以下是使用 `drop-shadow` 属性设置阴影的示例：

```css
.shadow {
  filter: drop-shadow(2px 2px 4px rgba(0, 0, 0, 0.5));
}
```

在上面的示例中，`.shadow` 类选择器用于选中需要添加阴影的元素。`drop-shadow` 函数的参数包括：

- 水平偏移量：指定阴影相对于元素的水平偏移量。正值表示向右偏移，负值表示向左偏移。
- 垂直偏移量：指定阴影相对于元素的垂直偏移量。正值表示向下偏移，负值表示向上偏移。
- 模糊半径：指定阴影的模糊半径，数值越大表示阴影越模糊。
- 颜色：指定阴影的颜色，可以使用颜色名称、十六进制值或 RGBA 值。

在示例中，阴影的水平偏移量为 2 像素，垂直偏移量为 2 像素，模糊半径为 4 像素，颜色为半透明的黑色。

你可以根据需要调整 `drop-shadow` 属性的参数值来实现不同的阴影效果。还可以在同一个元素上多次应用 `drop-shadow` 属性来叠加多个阴影效果。

```css
.shadow {
  filter: drop-shadow(2px 2px 4px rgba(0, 0, 0, 0.5))
          drop-shadow(-2px -2px 4px rgba(255, 0, 0, 0.5));
}
```

在上面的示例中，`.shadow` 类选择器应用了两个 `drop-shadow` 属性，分别创建了黑色和红色的阴影效果，形成了叠加的阴影效果。

请注意，`drop-shadow` 属性是一个 CSS 滤镜，不是所有浏览器都支持该属性。在使用 `drop-shadow` 属性时，请确保在需要的情况下提供适当的回退方案或使用其他技术来创建阴影效果。