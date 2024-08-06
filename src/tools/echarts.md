# Echarts
ECharts 是一个由百度开源的数据可视化库，它可以帮助开发者通过 JavaScript 实现各种交互式的图表和可视化效果，包括折线图、柱状图、散点图、热力图、地图等等。ECharts 具有良好的兼容性、易于使用和高度的自定义性。

## 快速开始

- [github](https://github.com/apache/echarts)
- [issuse（常见的问题这里都能找到）](https://github.com/apache/echarts/issues)
- [CDN(跳转网页复制最新版本地址)](https://www.jsdelivr.com/package/npm/echarts)
- [定制包(减少包体积方案)](https://echarts.apache.org/zh/builder.html)

## 安装

```
npm install echarts --save
```

## 简单实用

### 举例使用方法：

1. ##### 嵌入 ECharts 的 JavaScript 代码到 HTML 页面中；

2. ##### 通过 JavaScript API 构建数据模型，如：

```javascript
var myChart = echarts.init(document.getElementById('chart'));

var option = {
    title: {
        text: 'ECharts 示例'
    },
    tooltip: {},
    legend: {
        data:['销量']
    },
    xAxis: {
        data: ["衬衫","羊毛衫","雪纺衫","裤子","高跟鞋","袜子"]
    },
    yAxis: {},
    series: [{
        name: '销量',
        type: 'bar',
        data: [5, 20, 36, 10, 10, 20]
    }]
};

myChart.setOption(option);
```

3. ##### 渲染图表并展示在页面上。

以上代码创建了一个柱状图，包括标题、提示框、图例、坐标轴以及系列数据。当鼠标悬浮在柱子上时，会显示对应的数值。这只是 ECharts 提供的众多功能之一，开发者还可以自由添加各种效果和交互方式，以满足不同的需求。

## FAQ

## 如何设置tooltip在图表内？

配置项`tooltip.position`计算位置。具体实现函数如下：

```javascript
//使tooltip在图表内部 不被切割
position: function (point, params, dom, rect, size) {
      // 鼠标坐标和提示框位置的参考坐标系是：以外层div的左上角那一点为原点，x轴向右，y轴向下
      // 提示框位置
      var x = 0; // x坐标位置
      var y = 0; // y坐标位置

      // 当前鼠标位置
      var pointX = point[0];
      var pointY = point[1];

      // 外层div大小
      // var viewWidth = size.viewSize[0];
      // var viewHeight = size.viewSize[1];

      // 提示框大小
      var boxWidth = size.contentSize[0];
      var boxHeight = size.contentSize[1];

      // boxWidth > pointX 说明鼠标左边放不下提示框
      if (boxWidth > pointX) {
        x = 5;
      } else {
        // 左边放的下
        x = pointX - boxWidth;
      }

      // boxHeight > pointY 说明鼠标上边放不下提示框
      if (boxHeight > pointY) {
        y = 5;
      } else {
        // 上边放得下
        y = pointY - boxHeight;
      }

      return [x, y];
    },
```
