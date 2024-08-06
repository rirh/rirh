# MYSQL入门指南

## 安装

1. ### 进入mysql官网（mysql.com）

   ![image-20230617142101224](https://c18e-1257416358.cos.accelerate.myqcloud.com/image-20230617142101224.png)

2. ### 顶部点击downloads页面并滑动底部选择[MySQL Community (GPL) Downloads »](https://dev.mysql.com/downloads/)

   ![image-20230617142137366](https://c18e-1257416358.cos.accelerate.myqcloud.com/image-20230617142137366.png)

   

3. ### [MySQL Community (GPL) Downloads »](https://dev.mysql.com/downloads/)选择页面中社区版本

   ![image-20230617142232559](https://c18e-1257416358.cos.accelerate.myqcloud.com/image-20230617142232559.png)

4. 版本选择
   :::tip

   进入后页面会默认给我们推荐最新版本，但是做过后端开发的人都知道一条不成文的规则

   **不选最新的，只选最稳的**

   所以这里我选择5.7.24版本
   :::

   ![image-20230617142534276](https://c18e-1257416358.cos.accelerate.myqcloud.com/image-20230617142534276.png)

5. 点击下载并解压，小白建议选择安装包

   ![image-20230617143333461](https://c18e-1257416358.cos.accelerate.myqcloud.com/image-20230617143333461.png)

## 在 Windows 操作系统上安装 MySQL 的步骤：

1. ### 按照上述步骤安装获取安装包 网站会根据不同的系统安装不同的版本

在上述官网下载适用于 Windows 的 MySQL 安装包。下载后的文件应该是以 .msi 或者 .zip 结尾的。

2. ### 安装 MySQL

双击下载好的安装包，按照提示进行安装。在安装过程中，你将会被要求输入 root 用户的密码。请确保为 root 用户设置一个强密码，以保证 MySQL 数据库的安全。

3. ### 配置 MySQL

安装完成后，你需要进行一些配置工作。首先，打开一个命令提示符窗口，转到 MySQL 安装文件的 bin 目录中。

接下来，输入以下命令以启动 MySQL：

```
mysql -u root -p
```

此命令将使用 root 用户的凭据连接到 MySQL 服务器。当提示输入密码时，请输入您为 root 用户设置的密码。

4. ### 创建和管理数据库

现在，你已经可以创建和管理数据库了。在 MySQL 命令提示符下，输入以下命令创建新的数据库：

```
CREATE DATABASE mydatabase;
```

在上面的命令中，“mydatabase” 是你要创建的数据库名称。您可以将其更改为任何名称。

5. ### 连接到数据库

要连接到已创建的数据库，输入以下命令：

```
USE mydatabase;
```

在上面的命令中，“mydatabase” 是您要连接的数据库名称。

现在，你已经成功的安装和使用了 MySQL 数据库。

## Ubuntu 安装 MySQL：

1. ### 打开终端，执行以下命令更新 apt-get：

   ```
   sudo apt-get update
   ```

2. ### 执行以下命令安装 MySQL：

   ```
   sudo apt-get install mysql-server
   ```

3. ### 安装过程中会提示设置 root 账户的密码。

4. ### 安装完成后，可以检查 MySQL 是否已经成功安装：

   ```
   sudo systemctl status mysql
   ```

5. ### 若显示 "active (running)"，则说明 MySQL 已经成功安装并在运行。

   注：在 Ubuntu 18.04 中，MySQL 被 MariaDB 替代作为默认的数据库系统，在命令中只需将 "mysql-server" 改为 "mariadb-server" 即可安装 MariaDB。

6. ### 创建远程访问用户并授权：

   ```
   GRANT ALL PRIVILEGES ON *.* TO '你的用户名'@'%' IDENTIFIED BY '你的密码' WITH GRANT OPTION;
   FLUSH PRIVILEGES;
   ```

   修改 MySQL 配置文件：

   ```
   vi /etc/my.cnf
   ```

   在 `[mysqld]` 段中添加以下内容：

   ```
   bind-address=0.0.0.0
   ```

   保存并退出。重启 MySQL：

   ```
   service mysqld restart
   ```

## 使用 Navicat 远程链接 MySQL：

1. ### 打开 Navicat，点击“连接”。

2. ### 在“新建连接”界面填写连接信息：

   - 连接名：随意命名
   - 主机名/IP地址：输入 CentOS 的 IP 地址
   - 端口：默认为 3306，如果修改了 MySQL 的端口，需要修改此处
   - 用户名：刚才创建的远程访问用户的用户名
   - 密码：刚才创建的远程访问用户的密码

3. ### 点击“测试连接”按钮，测试连接是否成功。

4. ### 如果测试连接成功，点击“保存并连接”按钮，即可将连接保存并连接到数据库。

### Navicat 远程链接 MySQL：

1. ### 打开 Navicat，点击 "连接"，选择 "MySQL"。

2. ### 在 "连接属性" 中，输入以下信息：

   - 主机名或 IP: 要连接的 Linux 主机的 IP 地址
   - 端口号: 默认为 3306
   - 用户名: MySQL 的用户名
   - 密码: MySQL 的密码

3. #### 点击 "测试连接" 按钮，若出现 "Connection successful"，则说明连接成功，即可点击 "连接" 按钮开始使用。

注：在 Ubuntu 中，MySQL 默认只监听本地地址，不允许远程连接，需要更改 MySQL 的配置文件，将 "bind-address" 设置为 "0.0.0.0"，并开放 3306 端口，才能允许远程连接。若不需远程连接，可以跳过这一步。

## 初始化 MySQL 密码

1. ### 打开终端，并使用以下命令停止 MySQL 服务：

```
sudo /usr/local/mysql/support-files/mysql.server stop
```

2. ### 使用以下命令再次启动 MySQL 服务，但是使用 `--skip-grant-tables` 选项跳过授权表检查，这样就可以无需密码访问 MySQL 服务器了：

```
sudo /usr/local/mysql/bin/mysqld_safe --skip-grant-tables &
```

注意：此时 MySQL 服务不会以守护进程方式运行，因此终端将锁定。

3. ### 打开另一个终端窗口，使用以下命令连接到 MySQL 服务器：

```
mysql -u root
```

如果成功连接到服务器，会看到以下命令提示符：

```
mysql>
```

4. ### 运行以下命令设置新的密码，例如，设置密码为 `123456`：

```
UPDATE mysql.user SET authentication_string=PASSWORD('123456') WHERE User='root';
```

5. ### 运行以下命令，刷新 MySQL 权限表：

```
FLUSH PRIVILEGES;
```

6. ### 使用以下命令停止 MySQL 服务：

```
sudo /usr/local/mysql/support-files/mysql.server stop
```

7. ### 使用以下命令启动 MySQL 服务，让新密码生效：

```
sudo /usr/local/mysql/support-files/mysql.server start
```

现在，您可以使用 `root` 用户和新密码连接到 MySQL 服务器了。



## 设置 MySQL 的字符集：

1. ### 打开终端，进入 MySQL 安装目录：

```
cd /usr/local/mysql/bin/
```

2. ### 启动 MySQL 客户端：

```
./mysql -u root -p
```

3. ### 输入 MySQL 的 root 用户密码。

4. ### 进入 MySQL 命令行后，执行以下语句来设置 MySQL 字符集：

```
set character_set_server=utf8mb4;
set collation_server=utf8mb4_unicode_ci;
```

5. ### 执行完毕后，可以通过以下语句来查看是否设置成功：

```
show variables like '%character%';
show variables like '%collation%';
```

如果查看结果中的 character_set_server 和 collation_server 的值为 utf8mb4 和 utf8mb4_unicode_ci，则说明设置成功。

## 以下是 MySQL 命令的一些常用操作，以及一些重要的参数。

1. ### 连接 MySQL 服务器

```bash
mysql -h hostname -u username -p
```

2. ### 显示帮助信息

```bash
mysql --help
```

3. ### 退出 MySQL

```bash
exit
```

4. ### 创建数据库

```bash
CREATE DATABASE database_name;
```

5. ### 删除数据库

```bash
DROP DATABASE database_name;
```

6. ### 显示数据库列表

```bash
SHOW DATABASES;
```

7. ### 使用指定数据库

```bash
USE database_name;
```

8. ### 显示所有数据表

```bash
SHOW TABLES;
```

9. ### 创建数据表

```bash
CREATE TABLE table_name (column1 datatype, column2 datatype,....);
```

10. ### 删除数据表

```bash
DROP TABLE table_name;
```

11. ### 插入数据

```bash
INSERT INTO table_name (column1, column2, column3, ...) VALUES (value1, value2, value3, ...);
```

12. ### 更新数据

```bash
UPDATE table_name SET column1 = value1, column2 = value2, ... WHERE condition;
```

13. ### 删除数据

```bash
DELETE FROM table_name WHERE condition;
```

14. ### 查询数据

```bash
SELECT column1, column2, ... FROM table_name WHERE condition;
```

15. ### 创建索引

```bash
CREATE INDEX index_name ON table_name (column1, column2, ...);
```

16. ### 删除索引

```bash
DROP INDEX index_name ON table_name;
```

17. ### 显示 MySQL 版本信息

```bash
SELECT VERSION();
```

### 高级的 MySQL 命令：

1. EXPLAIN命令：用于查看MySQL查询执行的详细信息，如表的连接类型、执行顺序、访问类型和索引使用情况等。

2. SHOW PROFILE命令：用于分析查询性能，可以查看MySQL服务器执行查询语句的各项性能指标，如CPU、内存、IO等。

3. SHOW ENGINE命令：用于查看MySQL存储引擎的详细信息。

4. SET命令：用于修改MySQL服务器的配置选项，如字符编码、缓存大小、查询缓存等。

5. HANDLER命令：用于查看或操作表处理器中的统计信息，如行数、索引值等。

6. CREATE FUNCTION命令：用于创建自定义的MySQL函数。

7. CREATE TRIGGER命令：用于创建触发器，以在执行INSERT、UPDATE、DELETE操作时自动执行一段SQL代码。

8. CREATE VIEW命令：用于创建虚拟表，以便于查询和管理数据。

9. CREATE INDEX命令：用于创建索引以加快MySQL数据库的查询速度。

10. LOAD DATA INFILE命令：用于将外部数据文件导入到MySQL数据库中。

11. OPTIMIZE TABLE命令：用于优化MySQL数据库中的表结构、数据和索引等，以提高查询性能和存储空间利用率。

12. LOCK TABLES和UNLOCK TABLES命令：用于在操作MySQL数据库时锁定或解锁一张表，以避免数据的并发访问导致的问题。

13. SHOW MASTER STATUS和SHOW SLAVE STATUS命令：用于在MySQL数据库中查看主从复制的状态和信息。

14. BACKUP和RESTORE命令：用于备份和恢复MySQL数据库，保证数据的可靠性和完整性。

15. CHECK命令：用于检查MySQL数据库的完整性和一致性，以保证数据的质量和正确性。

16. UNION/UNION ALL: 合并查询结果，UNION会去重，UNION ALL不会去重。

2. CROSS JOIN: 返回两个表的笛卡尔积。

3. INNER JOIN: 只返回两个表中都存在的数据（交集）。

4. LEFT JOIN: 返回左表中的所有数据和右表中匹配的数据。

5. RIGHT JOIN: 返回右表中的所有数据和左表中匹配的数据。

6. FULL OUTER JOIN: 返回左表和右表中所有的数据，不匹配的位置为NULL。

7. GROUP BY: 按照指定字段分组。

8. HAVING: 对分组后的结果进行筛选。

9. ORDER BY: 对结果进行排序。

10. LIMIT: 限制结果返回的行数。

11. IN/NOT IN: 在一个范围内查询数据。

12. EXISTS/NOT EXISTS: 判断子查询中是否存在数据。

13. LIKE: 模糊查询，常用通配符为%和_。

14. BETWEEN AND: 在一个范围内查询数据。

15. CASE WHEN: 在查询中根据条件返回不同的值。

16. WITH RECURSIVE: 递归查询。

17. INSERT INTO SELECT: 把查询出来的结果插入到一个新表中。

18. UPDATE JOIN: 根据另一个表的数据更新当前表中的数据。

19. DELETE JOIN: 根据另一个表的数据删除当前表中的数据。

20. CREATE VIEW: 创建视图。

21. TRUNCATE TABLE: 删除表中所有数据。

22. REPLACE INTO: 如果主键或唯一索引已经存在则替换掉原来的数据。

23. LOAD DATA INFILE: 从文件中导入数据。

24. UNION/UNION ALL: 合并查询结果。

### 注意事项：

1. MySQL 命令需要使用管理员权限运行。
2. 所有 SQL 语句都必须以分号结尾。
3. 在 MySQL 中，表名和列名区分大小写，但是 SQL 语句不区分大小写。
4. 如果你在命令行输入一个不完整的 SQL 语句，则命令行会等待你输入下一条语句，直到它看到一个完整的语句为止。你可以使用 `ctrl + c` 或 `quit` 命令退出语句构建模式。






