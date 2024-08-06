# TOTP 在线生成器
## 项目概述

### 项目名称
TOTP 在线生成器

### 项目描述
开发一个基于时间的一次性密码（TOTP）的在线网站。用户可以生成、查看和验证TOTP码，用于双因素身份验证。前端使用Next.js，后端使用Gin。

### 主要功能
1. 访客模式（基于浏览器指纹）
2. 邮箱密码注册与登录（合并成一步）
3. 生成TOTP密钥
4. 显示TOTP二维码
5. 验证TOTP码
6. 用户配置管理

## 系统架构

### 前端
- 框架：Next.js
- 语言：JavaScript/TypeScript
- 功能：用户界面、TOTP二维码显示、TOTP码验证

### 后端
- 框架：Gin
- 语言：Go
- 功能：用户管理、TOTP密钥生成与存储、TOTP码验证、API接口

## 技术栈

### 前端
- Next.js
- React
- Axios（用于API请求）
- Tailwind CSS（用于样式）
- QRCode.js（用于生成二维码）
- FingerprintJS（用于浏览器指纹）

### 后端
- Gin
- Gorm（ORM框架）
- JWT（用于用户认证）
- Redis（用于缓存）
- PostgreSQL（数据库）

## 功能需求

### 访客模式
- 根据浏览器指纹生成唯一ID
- 允许访客使用部分功能

### 邮箱密码注册与登录（合并成一步）
- 用户输入邮箱和密码，如果邮箱不存在，则发送验证码完成注册
- 使用JWT进行身份验证

### 生成TOTP密钥
- 用户登录后可以生成TOTP密钥
- 生成的密钥存储在数据库中
- 返回一个包含TOTP密钥的二维码，用户可以扫描二维码进行配置

### 显示TOTP二维码
- 前端页面显示TOTP二维码，用户可以使用Authenticator App扫描

### 验证TOTP码
- 用户输入TOTP码进行验证
- 后端进行TOTP码验证，并返回验证结果

### 用户配置管理
- 用户可以查看和管理自己的TOTP密钥
- 用户可以删除或重新生成TOTP密钥

## API接口设计

### 用户管理
1. **注册或登录**
   - URL: `/api/auth`
   - 方法: POST
   - 请求参数: `{ "email": "string", "password": "string" }`
   - 响应（邮箱存在）: `{ "token": "JWT token" }`
   - 响应（邮箱不存在）: `{ "message": "Verification code sent" }`

2. **验证验证码**
   - URL: `/api/verify`
   - 方法: POST
   - 请求参数: `{ "email": "string", "code": "string" }`
   - 响应: `{ "token": "JWT token" }`

### 访客管理
1. **获取访客ID**
   - URL: `/api/guest`
   - 方法: GET
   - 响应: `{ "guest_id": "string" }`

### TOTP管理
1. **生成TOTP密钥**
   - URL: `/api/totp/generate`
   - 方法: POST
   - 请求参数: `{ "user_id": "string" }`
   - 响应: `{ "qrcode": "base64 string", "secret": "string" }`
  
2. **验证TOTP码**
   - URL: `/api/totp/verify`
   - 方法: POST
   - 请求参数: `{ "user_id": "string", "totp_code": "string" }`
   - 响应: `{ "valid": "boolean" }`

## 前端页面设计

### 首页
- 功能：展示网站简介，提供注册和登录链接，以及访客模式入口

### 用户仪表盘
- 功能：显示用户TOTP二维码，提供TOTP码验证表单

### TOTP二维码页面
- 功能：显示生成的TOTP二维码，供用户扫描

### TOTP验证页面
- 功能：用户输入TOTP码进行验证，并显示验证结果

## 开发与部署

### 开发环境
- Node.js
- Go
- PostgreSQL
- Redis

### 部署环境
- 前端：Vercel（Next.js的默认托管平台）
- 后端：Docker，Kubernetes
- 数据库：PostgreSQL
- 缓存：Redis

### 开发流程
1. 初始化前端项目，配置Next.js环境
2. 初始化后端项目，配置Gin框架
3. 实现访客模式与浏览器指纹识别
4. 实现注册与登录合并的功能
5. 实现TOTP密钥生成与存储功能
6. 实现TOTP二维码生成与显示功能
7. 实现TOTP码验证功能
8. 测试与调试
9. 部署到生产环境

## 测试计划

### 单元测试
- 对各个模块进行单元测试，确保每个功能正常运行

### 集成测试
- 测试前后端的集成，确保数据流通畅

### 用户测试
- 邀请一部分用户进行测试，收集反馈并改进

## 安全性考虑
- 使用HTTPS加密传输
- 存储用户密码时进行哈希处理
- 使用JWT进行用户认证
- 定期备份数据库

