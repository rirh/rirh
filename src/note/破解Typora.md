1. # Typora Mac 安装与激活详细教程

   ## 1. 从官网下载 Typora

   前往 [Typora 官网](https://typora.io/) 下载最新版的 Typora 安装包（*.dmg 文件），并按照提示将 Typora 拖入“应用程序”文件夹完成安装。

   ---

   ## 2. 修改 License 文件实现激活

   ### 2.1 定位并编辑 License 文件

   1. 打开 Finder，进入 `/Applications/Typora.app`。
   2. 右键点击 Typora 图标，选择“显示包内容”。
   3. 依次进入 `Contents/Resources/TypeMark/page-dist/static/js/` 目录。
   4. 在该目录下，找到文件名以 `LicenseIndex` 开头的 `.js` 文件（如 `LicenseIndex123.js`）。
   5. 用文本编辑器（如 VS Code 或 Sublime Text）打开此文件。
   6. 搜索 `hasActivated` 关键词，找到如下代码：

      ```
      hasActivated="true"==e.hasActivated
      ```

   7. 将该行修改为：

      ```
      hasActivated="true"=="true"
      ```

      这样可以绕过正版激活检测。

   ---

   ### 2.2 屏蔽激活弹窗（可选）

   修改 License 文件后，每次启动 Typora 可能会弹出激活提示窗口。可以通过以下方法自动关闭弹窗：

   1. 返回到 `Contents/Resources/TypeMark/page-dist/` 目录。
   2. 用编辑器打开 `license.html` 文件。
   3. 在 `</body>` 标签前，插入如下代码：

      ```html
      <script>
        window.close()
      </script>
      ```

      保存并关闭文件。这样弹窗会自动关闭，不再干扰使用。

   ---

   ## 3. 解决“已损坏，无法打开”问题

   首次运行未签名或已修改的应用时，macOS 可能会提示“已损坏，无法打开”，可按以下方式解决：

   1. 打开终端，输入以下命令（需要管理员权限）：

      ```
      sudo xattr -rd com.apple.quarantine /Applications/Typora.app
      ```

   2. 再次尝试打开 Typora。如果遇到安全提示，请在“系统设置” > “隐私与安全性”中，选择“仍要打开”。

   ---

   ## 总结说明

   - 本教程仅供学习和研究使用，请支持正版软件。
   - 若遇到版本升级或激活失效，建议重新按上述步骤操作。
   - 修改应用包内容有一定风险，建议提前备份原始文件。

   