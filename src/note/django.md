
##### Django 简易教程

##### 介绍

django构建更好的web app。更快、编写的代码更少。

常用命令

| 命令                                    | 解释               |
| --------------------------------------- | ------------------ |
| `python -m django --version`            | 查看版本           |
| `django-admin startproject projectname` | 创建django项目     |
| `python manage.py runserver`            | 启动本地服务       |
| `python manage.py startapp moudlename`  | 创建包模块         |
| `python manage.py check`                | 检查语法错误       |
| `python manage.py makemigrations`       | 为改动创建迁移记录 |
| `python manage.py migrate`              | 将操作同步到数据库 |

##### **后台主要常用功能**

- 部署服务器
- 数据库操作
- REST API
- 定时任务

目录结构

```
mysite/
    manage.py  管理Django的命令行工具
    mysite/
        __init__.py
        settings.py   项目配置文件 
        urls.py       目录文件 restapi的链接或者页面的链接可以放在这里
        asgi.py       部署配置文件asgi兼容
        wsgi.py       部署配置文件wsgi模式
```

##### url

```python
from django.urls import path
# url 文件使用掌握api数量很少
# 本文件重要的是参数urlpatterns序列的序列
# 序列中的每一项则是一个path函数对象的返回值

```

##### 安装mysqlclient报错

```
centos系统使用yum安装 mysql-devel

yum install mysql-devel

ubuntu 系统apt-get 安装libmysqlclient-dev

apt-get update
apt-get upgrade
apt-get install libmysqlclient-dev

debian 系统

apt install -y libmariadbd18
apt install -y libmariadbd-dev
```

