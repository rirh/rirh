# Python

 构建一项软件设计有两种方式：一种是将软件设计得足够简单以至于明显找不到缺陷；另一种是软件设计得足够复杂以至于找不到明显的缺陷。

​                                                                                                  ——查尔斯·安东尼·理查德·霍尔爵士（C. A. R. Hoare）

## Python 版本管理工具

**pyenv通过在PATH头部插入shims路径来实现对python版本的控制.**

```shell
# macOs
brew install pyenv 
# .zshrc
export PYENV_ROOT="$HOME/.pyenv"
export PATH=$PYENV_ROOT/shims:$PATH
eval "$(pyenv init -)"
eval "$(pyenv virtualenv-init -)"

# 查看当前版本
pyenv version

# 查看所有版本
pyenv versions

# 查看所有可安装的版本
pyenv install --list

# 安装指定版本
pyenv install 3.6.5
# 安装新版本后rehash一下
pyenv rehash

# 删除指定版本
pyenv uninstall 3.5.2

# 指定全局版本
pyenv global 3.6.5

# 指定多个全局版本, 3版本优先
pyenv global 3.6.5 2.7.14

# 实际上当你切换版本后, 相应的pip和包仓库都是会自动切换过去的

```



## QuickStart 

```shell
mkdir z-movie && cd z-movie && virtualenv .env && source .env/bin/activate &&  pip3 install django djangorestframework mysqlclient pipreqs autopep8 django-filter django_redis && django-admin.py startproject apps . 
```

## DateBase

```python
# 配置数据库
DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.mysql',
        'HOST': '127.0.0.1',
        'PORT': 3306,
        'USER': 'root',
        'PASSWORD': 'ctleryes',
        'NAME': 'z-movie',
        'OPTIONS': {
            'charset': 'utf8mb4'
        }
    }
}
# 配置redis
CACHES = {
    'default': {
        'BACKEND': 'django_redis.cache.RedisCache',
         # redis://:密码@ip:端口/项目
        'LOCATION': 'redis://:q1w2e3r4T%Y^U&@127.0.0.1:6379/1',
        'OPTIONS': {
            'CLIENT_CLASS': 'django_redis.client.DefaultClient'
        }
    }
}
python3 manage.py migrate && python manage.py createsuperuser
```



## Setup

```python
# 安装虚拟环境
pip install virtualenv
pip install virtualenvwrapper
# 进入django项目文件夹执行
virtualenv .env
# vscode选择刚刚设置的虚拟环境路径
command+shift+p > python:select interpreter

#进入虚拟环境
cd .env/bin
#激活虚拟环境
source activate
#退出虚拟环境Ï
deactivate
##
pip3 freeze | sort | uniq > requirements.txt
```



## Django rest framework 

```shell
# 当有增量的model修改或者删除的时候 先删除编译缓存文件
find . -path "*/migrations/*.py" -not -name "__init__.py" -delete
find . -path "*/migrations/*.pyc"  -delete
#重新生成 makemigrations
python manage.py makemigrations

# 当已有数据添加字段时
python manage.py migrate --fake

# 创建超级管理员
python manage.py createsuperuser
# 后台部署 后台文件夹 /data/c18e/backend
ps aux|grep uwsgi
# 停止后台uwsgi服务
sudo pkill -f uwsgi -9
# 启动服务
# 需要进入项目文件夹执行命令
uwsgi -d --ini application/uwsgi.ini
# 停止服务
uwsgi --stop PIDFILE
# 重启uwsgi
sudo service uwsgi restart
# 前端部署 
yarn deploy
```

- 模型的增删改查
- 了解redis的使用
- 了解定时任务的使用

## 生产requirement.txt

```shell
pip3 install pipreqs
pipreqs
pipreqs . --encoding=utf8 --force
<<<<<<< HEAD
或者
pip freeze > requirements.txt
=======
// or
pip3 freeze >> requirements.txt
>>>>>>> 2ab96a363e106c980cb330f70c8c905aa05ac3fd
```



## Python多进程和多线程哪个快?

## 进程(process)

```python
from multiprocessing import Process,Pool
import time

def p_task(i):
    time.sleep(2)
    
if __name__=='__main__':
    # 单个
    p = Process(target=p_task, args=())
    
    p.start()
    p.join()
    
    # 多个
    pools = Pool(4)
    pools.apply_async(p_task, args=())
    pools.apply_async(p_task, args=())
    pools.close()
    pools.join()
```

## 线程(process)

```python
import threading
import time

def t_task(i):
    time.sleep(2)


if __name__=='__main__':
    t1 = threading.Thread(target=t_task, args=(1,))
    t2 = threading.Thread(target=t_task, args=(2,))
    t1.start()
    t2.start()

```



- 对CPU密集型代码(比如循环计算) - 多进程效率更高
- 对IO密集型代码(比如文件操作，网络爬虫) - 多线程效率更高

对于IO密集型操作，大部分消耗时间其实是等待时间，在等待时间中CPU是不需要工作的，那你在此期间提供双CPU资源也是利用不上的，相反对于CPU密集型代码，2个CPU干活肯定比一个CPU快很多。那么为什么多线程会对IO密集型代码有用呢？这时因为python碰到等待会释放GIL供新的线程使用，实现了线程间的切换。



- 安装

  ```shell
  $ brew install python3
  $ python3 -V
  Python 3.7.6
  ```

- 第一步

  在你的操作系统中打开终端（Terminal）程序输入 `python3`进入 *Python 解释器*
  可以在此练习python的相关基本语法和流程语句

- 基础

  ```python
  print('hello world') #注意到 print 是一个函数
  # 这是注释
  # 字面常量
  例如一个数字，一串字符串都属于字面常量（Literal Constants）
  因为它的值不能被改变。因此，所有的这些都被称作字面常量
  # 数字
  数字主要分为两种类型——整数（Integers）与浮点数（Floats）
  （没有单独的 long 类型。int 类型可以指任何大小的整数。）
  # 字符串
  一串字符串（String）是 字符（Characters） 的 序列（Sequence）
  通俗的来说是普通的一串字符串，（注意里面的换行转移及其其他的处理）
  单引号 双引号 三引号 分别是三种字符串的用法
  例：
  'Quote me on this'
  "What's your name?" 
  '''
  This is the second line.
  "What's your name?," I asked.
  He said "Bond, James Bond."
  '''
  （ps:字符串是不可变的）
  字符串格式化
  例：
  age = 20
  name = 'Swaroop'
  print('{0} was {1} years old when he wrote this book'.format(name, age))
  print('Why is {0} playing with that python?'.format(name))
  输出
  Swaroop was 20 years old when he wrote this book
  Why is Swaroop playing with that python
  原始字符串
  需要在字符串前增加 r 或 R 来指定一个 原始（Raw） 字符串
  例：
  r"Newlines are indicated by \n"
  #逻辑行与物理行
  所谓物理行（Physical Line）是你在编写程序时 你所看到 的内容。所谓逻辑行（Logical Line）是 Python 所看到 的单个语句。Python 会假定每一 物理行 会对应一个 逻辑行。
  例：
  i = \
  5
  》〉》〉》
  i = 5
  强烈建议对于每一行物理行最多只写入一行逻辑行
  #缩进
  缩进对于python语句来说非常重要，代码运行的逻辑和缩进有密切的关系
  例如
  i = 5
  # 下面将发生错误，注意行首有一个空格
   print('Value is', i)
  print('I repeat, the value is', i)
  这段代码由于缩进问题无法通过编译，输出为：
   File "xxx.py", line 3
      print('Value is', i)
      ^
  IndentationError: unexpected indent
  # 缩进错误：意外缩进
  ```
  
- 运算符

  ```python
  加减乘除
  2+3 >>> 5
  3-2 >>> 1
  2*3 >>> 6
  4/2 >>> 2
  // （整除）
  x 除以 y 并对结果向下取整至最接近的整数
  20/3 >>> 6
  % （取模）
  返回除法运算后的余数
  14%3 >>> 2
  << （左移）
  将数字的位向左移动指定的位数。（每个数字在内存中以二进制数表示，即 0 和1）
  2<<4 >>> 32
  >> （右移）
  将数字的位向右移动指定的位数
  32 >> 2 >>> 8
  & （按位与）
  对数字进行按位与操作
  3 & 1 输出 1
  | （按位或）
  对数字进行按位或操作
  5 | 3 >>> 7
  ^（按位异或）
  对数字进行按位异或操作
  2^3 >>>1
  ~（按位取反）
  x 的按位取反结果为 -(x+1)。
  ~7 >>> -8
  逻辑判断
  以下运算均返回布尔值
  < （小于）
  > （大于）
  <= （小于等于）
  >= （大于等于）
  == （等于）
  != （不等于）
  not （布尔“非”）
  and （布尔“与”）
  or（布尔“或”）
  
  求值顺序
  2 + 3 * 4  >>>  3*4 >>> 2+12 >>>14
  当然 使用小括号可以改变运算顺序
  下面列出优先级权重（从高到低）
  :=    ：Assignment 表达式
  lambda：Lambda  表达式
  if - else ：条件表达式
  or：布尔“或”
  ：布尔“与”
  not x：布尔“非”
  in, not in, is, is not, <, <=, >, >=, !=, ==：比较，包括成员资格测试（Membership Tests）和身份测试（Identity Tests）。
  |：按位或
  ^：按位异或
  &：按位与
  <<, >>：移动
  +, -：加与减
  *, /, //, %：乘、除、整除、取余
  +x, -x, ~x：正、负、按位取反
  **：求幂
  x[index], x[index:index], x(arguments...), x.attribute：下标、切片、调用、属性引用
  (expressions...), [expressions...], {key: value...}, {expressions...}：表示绑定或元组、表示列表、表示字典、表示集合
  ```

- 控制流

  ```python
  # 在 Python 中有三种控制流语句——if for 和 while。
  if 语句
  number = 23
  guess = int(input('Enter an integer : '))
  
  if guess == number:
      # 新块从这里开始
      print('Congratulations, you guessed it.')
      print('(but you do not win any prizes!)')
      # 新块在这里结束
  elif guess < number:
      # 另一代码块
      print('No, it is a little higher than that')
      # 你可以在此做任何你希望在该代码块内进行的事情
  else:
      print('No, it is a little lower than that')
      # 你必须通过猜测一个大于（>）设置数的数字来到达这里。
  
  print('Done')
  # 这最后一句语句将在
  # if 语句执行完毕后执行。
  
  while语句
  number = 23
  running = True
  while running:
      guess = int(input('Enter an integer : '))
  
      if guess == number:
          print('Congratulations, you guessed it.')
          # 这将导致 while 循环中止
          running = False
      elif guess < number:
          print('No, it is a little higher than that.')
      else:
          print('No, it is a little lower than that.')
  else:
      print('The while loop is over.')
      # 在这里你可以做你想做的任何事
  
  print('Done')
  
  for 语句
  for i in range(1, 5):
      print(i)
  else:
      print('The for loop is over')
      
  break 和 continue 也具有控制流程的能力
  
  while True:
      s = input('Enter something : ')
      if s == 'quit':
          break
      print('Length of the string is', len(s))
  print('Done')
  
  while True:
      s = input('Enter something : ')
      if s == 'quit':
          break
      if len(s) < 3:
          print('Too small')
          continue
      print('Input is of sufficient length')
      # 自此处起继续进行其它任何处理
  ```

- 函数

```python
def foo():
    # 该块属于这一函数
    print('hello world')
# 函数结束

foo()  # 调用函数
foo()  # 再次调用函数

# 参数
def print_max(a, b):
    if a > b:
        print(a, 'is maximum')
    elif a == b:
        print(a, 'is equal to', b)
    else:
        print(b, 'is maximum')

# 直接传递字面值
print_max(3, 4)

x = 5
y = 7

# 以参数的形式传递变量
print_max(x, y)
# 局部变量
x = 50
def func(x):
    print('x is', x)
    x = 2
    print('Changed local x to', x)
func(x)
print('x is still', x)
# python function_local.py
# 3x is 50
# Changed local x to 2
# x is still 50

global 语句
x = 50
def func():
    global x

    print('x is', x)
    x = 2
    print('Changed global x to', x)
func()
print('Value of x is', x)

# python function_global.py
# x is 50
# Changed global x to 2
# Value of x is 2
# global 语句用以声明 x 是一个全局变量——因此，当我们在函数中为 x 进行赋值时，这一改动将影响到我们在主代# # 码块中使用的 x 的值


# 默认参数值
def say(message, times=1):
    print(message * times)
say('Hello')
say('World', 5)
# python function_default.py
# Hello
# WorldWorldWorldWorldWorld

# 关键字参数
def func(a, b=5, c=10):
    print('a is', a, 'and b is', b, 'and c is', c)

func(3, 7)
func(25, c=24)
func(c=50, a=100)

# a is 3 and b is 7 and c is 10
# a is 25 and b is 5 and c is 24
# a is 100 and b is 5 and c is 50
# 这个传值方式很神奇是我很喜欢的一种方式
# *numbers一个星代表返回元组
# **phonebook两个星代表返回字典
def total(a=5, *numbers, **phonebook):
    print('a', a)

    #遍历元组中的所有项目
    for single_item in numbers:
        print('single_item', single_item)

    #遍历字典中的所有项目
    for first_part, second_part in phonebook.items():
        print(first_part,second_part)

print(total(10,1,2,3,Jack=1123,John=2231,Inge=1560))
# python function_varargs.py
# a 10
# single_item 1
# single_item 2
# single_item 3
# Inge 1560
# John 2231
# Jack 1123
# None

def maximum(x, y):
    if x > y:
        return x
    elif x == y:
        return 'The numbers are equal'
    else:
        return y

print(maximum(2, 3))
# 匿名函数
# 语法
lambda [arg1 [,arg2,.....argn]]:expression
# 可写函数说明
sum = lambda arg1, arg2: arg1 + arg2
 
# 调用sum函数
print ("相加后的值为 : ", sum( 10, 20 ))
print ("相加后的值为 : ", sum( 20, 20 ))

```



- 模块
  模块的概念是非常核心的，如果想对python了如指掌，运筹帷幄。信手捏来。模块的思维和掌握必不可少。
  
  ```python
  # 系统自带的模块导入
  import sys
  
  print('The command line arguments are:')
  for i in sys.argv:
      print(i)
  
  print('\n\nThe PYTHONPATH is', sys.path, '\n')
  
  # python module_using_sys.py we are arguments
  # The command line arguments are:
  # we
  # are
  # arguments
  from..import 语句
  如果你希望直接将 argv 变量导入你的程序（为了避免每次都要输入 sys.），那么你可以通过使用 from sys import argv 语句来实现这一点。
  
  if __name__ == '__main__':
      print('This program is being run by itself')
  else:
      print('I am being imported from another module')
      
  def say_hi():
      print('Hi, this is mymodule speaking.')
  
  __version__ = '0.1'
  import mymodule
  
  mymodule.say_hi()
  print('Version', mymodule.__version__)
  __init__ __main__
  # 函数是程序中的可重用部分那般，模块是一种可重用的程序。包是用以组织模块的另一种层次结构
  ```
  
- 类

  ```python
  class Amin:
    pass  # 一个空的代码块
  
  p = Amin()
  # 自动执行类的构造方法 __init__
  print(p)
  
  # 类的实例化
  class Amin:
    def __init__(self,name){
        self.name = name
    }
    def say_hi(self):
         print('Hello, my name is', self.name)
        
  p = Amin('dog')
  p.say_hi()
  # 机器人类变量和对象变量
  # coding=UTF-8
  
  class Robot:
      """表示有一个带有名字的机器人。"""
  
      # 一个类变量，用来计数机器人的数量
      population = 0
  
      def __init__(self, name):
          """初始化数据"""
          self.name = name
          print("(Initializing {})".format(self.name))
  
          # 当有人被创建时，机器人
          # 将会增加人口数量
          Robot.population += 1
  
      def die(self):
          """我挂了。"""
          print("{} is being destroyed!".format(self.name))
  
          Robot.population -= 1
  
          if Robot.population == 0:
              print("{} was the last one.".format(self.name))
          else:
              print("There are still {:d} robots working.".format(
                  Robot.population))
  
      def say_hi(self):
          """来自机器人的诚挚问候
  
          没问题，你做得到。"""
          print("Greetings, my masters call me {}.".format(self.name))
  
      @classmethod
      def how_many(cls):
          """打印出当前的人口数量"""
          print("We have {:d} robots.".format(cls.population))
  
  
  droid1 = Robot("R2-D2")
  droid1.say_hi()
  Robot.how_many()
  
  droid2 = Robot("C-3PO")
  droid2.say_hi()
  Robot.how_many()
  
  print("\nRobots can do some work here.\n")
  
  print("Robots have finished their work. So let's destroy them.")
  droid1.die()
  droid2.die()
  
  Robot.how_many()
  # (Initializing R2-D2)
  # Greetings, my masters call me R2-D2.
  # We have 1 robots.
  # (Initializing C-3PO)
  # Greetings, my masters call me C-3PO.
  # We have 2 robots.
  # Robots can do some work here.
  # Robots have finished their work. So let's destroy them.
  # R2-D2 is being destroyed!
  # There are still 1 robots working.
  # C-3PO is being destroyed!
  # C-3PO was the last one.
  # We have 0 robots.
  
  #继承
  # coding=UTF-8
  
  class SchoolMember:
      '''代表任何学校里的成员。'''
      def __init__(self, name, age):
          self.name = name
          self.age = age
          print('(Initialized SchoolMember: {})'.format(self.name))
  
      def tell(self):
          '''告诉我有关我的细节。'''
          print('Name:"{}" Age:"{}"'.format(self.name, self.age), end=" ")
  
  
  class Teacher(SchoolMember):
      '''代表一位老师。'''
      def __init__(self, name, age, salary):
          SchoolMember.__init__(self, name, age)
          self.salary = salary
          print('(Initialized Teacher: {})'.format(self.name))
  
      def tell(self):
          SchoolMember.tell(self)
          print('Salary: "{:d}"'.format(self.salary))
  
  
  class Student(SchoolMember):
      '''代表一位学生。'''
      def __init__(self, name, age, marks):
          SchoolMember.__init__(self, name, age)
          self.marks = marks
          print('(Initialized Student: {})'.format(self.name))
  
      def tell(self):
          SchoolMember.tell(self)
          print('Marks: "{:d}"'.format(self.marks))
  
  t = Teacher('Mrs. Shrividya', 40, 30000)
  s = Student('Swaroop', 25, 75)
  
  # 打印一行空白行
  print()
  
  members = [t, s]
  for member in members:
      # 对全体师生工作
      member.tell()
  # (Initialized SchoolMember: Mrs. Shrividya)
  # (Initialized Teacher: Mrs. Shrividya)
  # (Initialized SchoolMember: Swaroop)
  # (Initialized Student: Swaroop)
  # Name:"Mrs. Shrividya" Age:"40" Salary: "30000"
  # Name:"Swaroop" Age:"25" Marks: "75"
  ```

  

- 数据结构

  ```python
  # 列表 元组 字典 集合
  1	len(iterable)
  迭代系列元素个数
  2	max(iterable)
  返回迭代系列元素最大值
  3	min(iterable)
  返回迭代系列元素最小值
  
  # 列表
  # 序列是Python中最基本的数据结构
  list = [1,2,3]
  list.append(x)	把一个元素添加到列表的结尾，相当于 a[len(a):] = [x]。
  list.extend(L)	通过添加指定列表的所有元素来扩充列表，相当于 a[len(a):] = L。
  list.insert(i, x)	在指定位置插入一个元素。第一个参数是准备插入到其前面的那个元素的索引，例如 a.insert(0, x) 会插入到整个列表之前，而 a.insert(len(a), x) 相当于 a.append(x) 。
  list.remove(x)	删除列表中值为 x 的第一个元素。如果没有这样的元素，就会返回一个错误。
  list.pop([i])	从列表的指定位置移除元素，并将其返回。如果没有指定索引，a.pop()返回最后一个元素。元素随即从列表中被移除。（方法中 i 两边的方括号表示这个参数是可选的，而不是要求你输入一对方括号，你会经常在 Python 库参考手册中遇到这样的标记。）
  list.clear()	移除列表中的所有项，等于del a[:]。
  list.index(x)	返回列表中第一个值为 x 的元素的索引。如果没有匹配的元素就会返回一个错误。
  list.count(x)	返回 x 在列表中出现的次数。
  list.sort()	对列表中的元素进行排序。
  list.reverse()	倒排列表中的元素。
  list.copy()	返回列表的浅复制，等于a[:]。
  list(seq)
  将元组转换为列表
  
  # 元组
  # 元组与列表类似，不同之处在于元组的元素不能修改
  tup = (1,2,3)
  tuple(iterable)
  将可迭代系列转换为元组。
  # 字典
  # 字典是另一种可变容器模型，且可存储任意类型对象。
  dict = {"a":1,"b":2,"c":3}
  1	radiansdict.clear()
  删除字典内所有元素
  2	radiansdict.copy()
  返回一个字典的浅复制
  3	radiansdict.fromkeys()
  创建一个新字典，以序列seq中元素做字典的键，val为字典所有键对应的初始值
  4	radiansdict.get(key, default=None)
  返回指定键的值，如果值不在字典中返回default值
  5	key in dict
  如果键在字典dict里返回true，否则返回false
  6	radiansdict.items()
  以列表返回可遍历的(键, 值) 元组数组
  7	radiansdict.keys()
  返回一个迭代器，可以使用 list() 来转换为列表
  8	radiansdict.setdefault(key, default=None)
  和get()类似, 但如果键不存在于字典中，将会添加键并将值设为default
  9	radiansdict.update(dict2)
  把字典dict2的键/值对更新到dict里
  10	radiansdict.values()
  返回一个迭代器，可以使用 list() 来转换为列表
  11	pop(key[,default])
  删除字典给定键 key 所对应的值，返回值为被删除的值。key值必须给出。 否则，返回default值。
  12	popitem()
  随机返回并删除字典中的最后一对键和值。
  # 集合
  # 可以使用大括号 { } 或者 set() 函数创建集合，注意：创建一个空集合必须用 set() 而不是 { }，因为 { } # 是用来创建一个空字典
  s = {1,2,3}
  s = set((1,2,3))
  add()	为集合添加元素
  clear()	移除集合中的所有元素
  copy()	拷贝一个集合
  difference()	返回多个集合的差集
  difference_update()	移除集合中的元素，该元素在指定的集合也存在。
  discard()	删除集合中指定的元素
  intersection()	返回集合的交集
  intersection_update()	返回集合的交集。
  isdisjoint()	判断两个集合是否包含相同的元素，如果没有返回 True，否则返回 False。
  issubset()	判断指定集合是否为该方法参数集合的子集。
  issuperset()	判断该方法的参数集合是否为指定集合的子集
  pop()	随机移除元素
  remove()	移除指定元素
  symmetric_difference()	返回两个集合中不重复的元素集合。
  symmetric_difference_update()	移除当前集合中在另外一个指定集合相同的元素，并将另外一个指定集合中不同的元素插入到当前集合中。
  union()	返回两个集合的并集
  update()	给集合添加元素
  ```

  



