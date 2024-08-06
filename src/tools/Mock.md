# 爬虫数据Mock

- 随机生成中国境内地址（node）[chinese-address-generator](https://github.com/moonrailgun/chinese-address-generator)

- 生成伪数据的库（python）[faker](https://github.com/joke2k/faker)

  它可以生成各种类型的随机数据，包括姓名、地址、电子邮件、电话号码、日期、时间和文本等。Faker可以用于测试、数据分析、学习和演示等多个场景。Faker还支持多语言的伪数据生成，包括英语、中文、日语、西班牙语等多种语言。

- 生成userAgent[fake_useragent](https://github.com/fake-useragent/fake-useragent)

## 如何随机生成电话号码？

答：[faker](https://faker.readthedocs.io/en/master/)或许是最好的答案！

```python
from faker import Faker
# 初始化为中文数据
fake = Faker(locale='zh_CN')
phone_num = fake.phone_number()  # 生成手机号
print(phone_num)
```



## 如何随机生成User-Agent？

答：[fake-useragent](https://pypi.org/project/fake-useragent/)提供生成userAgent功能，更多信息请参考文档

```python
from fake_useragent import UserAgent

ua = UserAgent()
print(ua.random)
```



## 如何解析网站？

答：[parsel](https://parsel.readthedocs.io/en/latest/usage.html)像 Scrapy 的 Selector 一样，Parsel 的 `xpath()` 和 `css()` 方法都返回匹配的 SelectorList 对象，该对象是包含所有匹配结果的列表。如果要获取单个匹配结果，则可以使用 `get()` 方法。如果要获取所有匹配结果的字符串列表，则可以使用 `extract()` 方法。另外，Parsel 还支持将正则表达式与 Selector 对象中的文本进行匹配，可以使用 `re()` 方法。

需要注意的是，Parsel 相比于 Scrapy 的 Selector 更适用于大型的数据抓取和爬虫程序，由于它基于 lxml 库引擎，因此在速度和可扩展性方面，它会更加优秀。用法与 Scrapy 的 Selector 有所区别，但也具有一定的易用性。

```python
from parsel import Selector

html = """
<html>
<head>
  <title>Example</title>
</head>
<body>
  <div id="header">
    <h1>Example.com</h1>
  </div>
  <div id="content">
    <h2>Introduction</h2>
    <p>Hello World!</p>
    <a href="http://example.com">More</a>
  </div>
</body>
</html>
"""

# 使用 Parsel 对象加载 HTML 页面
sel = Selector(text=html)

# 从 HTML 页面中选择所需数据
title = sel.xpath('//title/text()').get()  # 提取标题
header = sel.css('#header h1::text').get()  # 提取标题
paragraph = sel.css('#content p::text').get()  # 提取文本
link = sel.css('#content a::attr(href)').get()  # 提取链接

# 打印数据
print("title: ", title)
print("header: ", header)
print("paragraph: ", paragraph)
print("link: ", link)
```

## 如何下载图片？

```python
import httpx

url = 'https://www.example.com/image.jpg'  # 图片的URL地址
filename = 'image.jpg'  # 保存的文件名

with httpx.stream('GET', url) as response:
    with open(filename, 'wb') as f:
        for chunk in response.iter_bytes():
            f.write(chunk)
```

