# Vue CLI 优化秘籍：减小体积、提高性能

:::warning 作者环境仅供参考（本文只讨论VUE2.0版本下的体积优化 ）

vue-cli版本：@vue/cli 5.0.8

npm版本： 8.19.4

node版本： v16.20.1

:::

### 启用UI面板分析项目

```shell
# // 启动命令 vue cli 自带的工具
vue ui
# // 如果未安装 进行安装
pnpm install -g @vue/cli
```

##### 启用分析面板

![image-20231018110115078](https://c18e-1257416358.cos.accelerate.myqcloud.com/image-20231018110115078.png)

1. ### 压缩

   - ##### 修改默认配置

     Vue CLI 在生产环境模式下会默认启用压缩,无需额外配置。

     可以通过 `vue.config.js` 中的 `productionSourceMap` 选项控制源映射的生成,一般建议设为 `false` 以减少打包后的文件体积。

     ```js
     module.exports = {
       productionSourceMap: false
     }
     ```

   - ##### 开启gzip压缩

     Gzip是一种压缩算法，它可以显著减小传输文件的大小。Vue CLI支持Gzip压缩，但需要服务器支持。通常，你可以在服务器配置中启用Gzip。

     :::warning 注意

     开启Gzip 需要web server配合开启本文以nginx为例

     成功开启gzip后，请求文件的Response Headers中的Content-Encoding中应包含gzip字样

     :::

     示例：在Nginx服务器配置中启用Gzip压缩。

     ```nginx
     http {
         gzip on; # 开启 gzip，Default: off
         gzip_comp_level 5; # 压缩级别： 1-9。5 是推荐的压缩级别，Default: 1
         gzip_min_length 1k; # gzip 压缩文件体积的最小值。如果文件已经足够小了，就不需要压缩了，因为即便压缩了，效果也不明显，而且会占用 CPU 资源。Default: 20
         gzip_buffers 4 16k; # 设置用于压缩响应的 number 和 size 的缓冲区。默认情况下，缓冲区大小等于一个内存页。根据平台的不同，它也可以是4K或8K。 
         gzip_proxied any; # 是否开启对代理资源的压缩。很多时候，nginx 会作为反向代理服务器，实际的静态资源在上有服务器上，只有开启了 gzip_proxied 才会对代理的资源进行压缩。Default: off
         gzip_vary on; # 每当客户端的 Accept-Encoding-capabilities 头发生变化时，告诉代理缓存 gzip 和常规版本的资源。避免了不支持 gzip 的客户端（这在今天极为罕见）在代理给它们 gzip 版本时显示乱码的问题。如果指令gzip， gzip_static 或 gunzip 处于活动状态， 则启用或禁用插入“ Vary：Accept-Encoding”响应标头字段。Default: off
         gzip_types
           application/javascript
           application/x-javascript
           text/javascript
           text/css
           text/xml
           application/xhtml+xml
           application/xml
           application/atom+xml
           application/rdf+xml
           application/rss+xml
           application/geo+json
           application/json
           application/ld+json
           application/manifest+json
           application/x-web-app-manifest+json
           image/svg+xml
           text/x-cross-domain-policy; # 压缩文件的 MIME 类型。`text/html` 默认就会开启 gzip 压缩，所以不用特别显示配置 `text/html` 的 MIME 类型。Default: text/html
         gzip_static on; # 服务器开启对静态文件（ CSS, JS, HTML, SVG, ICS, and JSON）的压缩。但是，要使此部分与之相关，需要在 gzip_types 设置 MIME 类型，，仅仅设置 gzip_static 为 on 是不会自动压缩静态文件的。
         gzip_disable "MSIE [1-6]\."; # IE6 以下的浏览器禁用 gzip 压缩。
     }
     ```

     示例：在`vue.config.js`配置中启用Gzip压缩。

     ```javascript
     const CompressionWebpackPlugin = require('compression-webpack-plugin');
     // 是否为生产环境
     const isProduction = process.env.NODE_ENV !== 'development';
     module.exports = {
         productionSourceMap: false,
         configureWebpack: config => {
             // 生产环境相关配置
             if (isProduction) {
               //gzip压缩
               const productionGzipExtensions = ['html', 'js', 'css']
               config.plugins.push(
                   new CompressionWebpackPlugin({
                       filename: '[path].gz[query]',
                       algorithm: 'gzip',
                       test: new RegExp(
                           '\\.(' + productionGzipExtensions.join('|') + ')$'
                       ),
                       threshold: 10240, // 只有大小大于该值的资源会被处理 10240
                       minRatio: 0.8, // 只有压缩率小于这个值的资源才会被处理
                       deleteOriginalAssets: false // 删除原文件
                   })
               )
           }
       }
     };
     ```

     ![image-20231019103751709](https://c18e-1257416358.cos.accelerate.myqcloud.com/image-20231019103751709.png)

     

   - ##### 开启br压缩

     Brotli是另一种压缩算法，通常比Gzip更高效。你需要确保服务器支持Brotli，并配置Vue CLI以生成Brotli压缩文件。

     示例：Vue CLI配置中开启Brotli。

     ```js
     // vue.config.js
     module.exports = {
       configureWebpack: {
         plugins: [
           new CompressionPlugin({
             algorithm: 'brotliCompress',
             test: /\.(js|css|html|svg)$/,
             threshold: 10240,
             minRatio: 0.8,
           }),
         ],
       },
     };
     ```

   - ##### 启用js代码压缩

     使用Webpack的`TerserPlugin`来压缩JavaScript代码。

     示例：在Vue CLI配置中启用JS代码压缩。

     ```javascript
     javascriptCopy code
     // vue.config.js
     module.exports = {
       configureWebpack: {
         optimization: {
           minimizer: [new TerserPlugin()],
         },
       },
     };
     ```

   - ##### 压缩html代码

     使用`html-minifier`插件来压缩HTML代码。

     示例：在Vue CLI配置中启用HTML代码压缩。

     ```javascript
     // vue.config.js
     module.exports = {
       chainWebpack: (config) => {
         if (process.env.NODE_ENV === 'production') {
           config.plugin('html').tap((args) => {
             args[0].minify = {
               removeComments: true,
               collapseWhitespace: true,
               removeAttributeQuotes: true,
             };
             return args;
           });
         }
       },
     };
     ```

   - ##### 删除未使用的css

     使用`PurgeCSS`来删除未使用的CSS。

     示例：在Vue CLI配置中启用PurgeCSS。

     ```
     javascriptCopy code
     // vue.config.js
     const PurgeCSSPlugin = require('purgecss-webpack-plugin');
     const glob = require('glob-all');
     const path = require('path');
     
     module.exports = {
       configureWebpack: {
         plugins: [
           new PurgeCSSPlugin({
             paths: glob.sync([path.join(__dirname, './src/**/*.vue')]),
           }),
         ],
       },
     };
     ```

     1. **压缩和优化CSS代码**：

     使用`optimize-css-assets-webpack-plugin`插件来优化和压缩CSS代码。

     示例：在Vue CLI配置中启用CSS代码压缩和优化。

     ```javascript
     // vue.config.js
     const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
     module.exports = {
       configureWebpack: {
         optimization: {
           minimizer: [new OptimizeCSSAssetsPlugin()],
         },
       },
     };
     ```

     通过执行以上步骤，你可以有效地优化Vue CLI项目的打包体积。记住，确保在适当的时机执行这些步骤，通常在生产环境构建时进行。同时，根据你的项目需求和服务器配置进行相应的调整和优化。

   - ##### 压缩和优化css代码

     使用`optimize-css-assets-webpack-plugin`插件来优化和压缩CSS代码。

     示例：在Vue CLI配置中启用CSS代码压缩和优化。

     ```javascript
     // vue.config.js
     const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
     
     module.exports = {
       configureWebpack: {
         optimization: {
           minimizer: [new OptimizeCSSAssetsPlugin()],
         },
       },
     };
     ```

     通过执行以上步骤，你可以有效地优化Vue CLI项目的打包体积。记住，确保在适当的时机执行这些步骤，通常在生产环境构建时进行。同时，根据你的项目需求和服务器配置进行相应的调整和优化。

2. ### CDN加载第三方模块

   可以将项目中依赖的第三方模块提取出来,通过 CDN 引入,无需打包该模块的代码。

   例如可以通过 `externals` 配置用 CDN 加载 vue:

   ```js
   const cdn = {
     // cdn：模块名称和模块作用域命名（对应window里面挂载的变量名称）
     externals: {
       vue: 'Vue',
       vuex: 'Vuex',
       'vue-router': 'VueRouter',
       'marked': 'marked',
       'highlight.js': 'hljs',
       'nprogress': 'NProgress',
       'axios': 'axios',
       'element-ui': 'ELEMENT',
       echarts: 'echarts',
       quill: 'Quill'
     },
     // cdn的css链接
     css: [
       'https://cdn.bootcss.com/nprogress/0.2.0/nprogress.min.css',
       'https://cdn.bootcdn.net/ajax/libs/element-ui/2.15.14/theme-chalk/index.css',
       'https://cdn.bootcdn.net/ajax/libs/quill/1.3.7/quill.bubble.min.css',
       'https://cdn.bootcdn.net/ajax/libs/quill/1.3.7/quill.snow.min.css',
       'https://cdn.bootcdn.net/ajax/libs/quill/1.3.7/quill.core.min.css'
     ],
     // cdn的js链接
     js: [
       'https://cdn.bootcss.com/vue/2.7.10/vue.min.js',
       'https://cdn.bootcss.com/vuex/3.1.2/vuex.min.js',
       'https://cdn.bootcss.com/vue-router/3.1.3/vue-router.min.js',
       'https://cdn.bootcss.com/marked/0.8.0/marked.min.js',
       'https://cdn.bootcss.com/highlight.js/9.18.1/highlight.min.js',
       'https://cdn.bootcss.com/nprogress/0.2.0/nprogress.min.js',
       'https://cdn.bootcss.com/axios/0.19.2/axios.min.js',
       'https://cdn.bootcdn.net/ajax/libs/element-ui/2.15.14/index.min.js',
       'https://cdn.bootcdn.net/ajax/libs/echarts/5.4.3/echarts.common.min.js',
       'https://cdn.bootcdn.net/ajax/libs/quill/1.3.7/quill.min.js'
     ]
   }
   // vue.config.js
   module.exports = {
     configureWebpack: {
       externals: process.env.NODE_ENV === 'production' ? cdn.externals : {},
     },
     chainWebpack(config) {
       if (process.env.NODE_ENV === 'production') {
         config.plugin('html').tap(args => {
           // 生产环境或本地需要cdn时，才注入cdn
           args[0].cdn = cdn
           return args
         })
       }
     }
   }
   ```

   然后在 index.html 中添加:

   ```html
   <% for (var i in htmlWebpackPlugin.options.cdn && htmlWebpackPlugin.options.cdn.css) { %>
             <link href="<%= htmlWebpackPlugin.options.cdn.css[i] %>" rel="preload" as="style">
             <link href="<%= htmlWebpackPlugin.options.cdn.css[i] %>" rel="stylesheet">
   <% } %>
   <% for (var i in htmlWebpackPlugin.options.cdn && htmlWebpackPlugin.options.cdn.js) { %>
             <script src="<%= htmlWebpackPlugin.options.cdn.js[i] %>"></script>
    <% } %>
   ```

   按需为项目其他大型依赖也采用 CDN 加载可以有效减小打包体积。

3. ### 代码分割

   代码分割是一种优化策略，它允许将应用代码分成多个块，以便按需加载，从而减小初始加载时的体积。Vue CLI使用Webpack来实现代码分割。

   示例：在Vue CLI项目中进行代码分割。

   在你的Vue组件中，你可以使用动态`import()`语法来指定要延迟加载的模块。

   ```js
   const LazyLoadedComponent = () => import(/* webpackChunkName: "lazy-component" */ './LazyLoadedComponent.vue');
   ```

   这将使Webpack生成一个单独的块（chunk）来包含`LazyLoadedComponent`，并且只在需要时加载。

4. ### **使用 Tree Shaking** 

   Tree Shaking是一种优化策略，它通过静态分析识别和删除未使用的代码，以减小打包体积。Vue CLI通过Babel和Webpack提供Tree Shaking支持。

   示例：确保Tree Shaking在Vue CLI项目中正常工作。

   - 确保你的ES6模块是静态导入的，例如：

   ```javascript
   import { something } from 'some-module';
   ```

   - 在项目的`package.json`中，确保`"sideEffects"`字段设置为`false`或指定需要被保留的文件。

   ```javascript
   "sideEffects": [
     "*.css",
     "*.vue"
   ]
   ```

   - 在Webpack配置中，确保`mode`设置为`production`以启用优化。

   ```javascript
   // vue.config.js
   module.exports = {
     mode: 'production',
   };
   ```

   你可以显著减小Vue CLI项目的打包体积，提高应用的性能和加载速度。确保根据项目需求和特点进行相应的调整和优化。

![image-20231018113229782](https://c18e-1257416358.cos.accelerate.myqcloud.com/image-20231018113229782.png)