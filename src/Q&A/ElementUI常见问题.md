

# [ElementUI常见问题](https://github.com/ElemeFE/element/issues)

1. ### VUE2中如何使用国际化？

   ##### 在Vue 2中使用国际化通常需要以下步骤：

   1. ##### 安装 `vue-i18n` 库，可以通过npm或yarn进行安装。

   2. ##### 创建一个 `i18n` 实例，在其中定义翻译消息和语言选项。例如：

   ```vue
   import Vue from 'vue';
   import VueI18n from 'vue-i18n';
   
   Vue.use(VueI18n);
   
   const messages = {
     en: {
       message: {
         hello: 'Hello, world!'
       }
     },
     zh: {
       message: {
         hello: '你好，世界！'
       }
     }
   };
   
   const i18n = new VueI18n({
     locale: 'zh', // 设置默认语言
     fallbackLocale: 'en', // 设置回退语言
     messages // 注册消息
   });
   
   export default i18n;
   ```

   ##### 在Vue组件中使用 `$t` 方法获取翻译消息。例如：

   ```html
   <template>
     <div>
       <p>{{ $t('message.hello') }}</p>
     </div>
   </template>
   ```

   ##### 切换语言，可以通过 `i18n.locale` 属性进行设置，例如：

   ```javascript
   methods: {
     switchLanguage(lang) {
       this.$i18n.locale = lang;
     }
   }
   ```

   这是一个基本的使用国际化的示例。您可以根据您的需要进行调整和扩展。

2. ### El-Table配合flex布局时不缩小?

   原因是EL-Table的父容器设置了`flex:1`

   ```
   设置flex:1的元素 overflow:auto
   或者
   min-width:0
   ```

   
