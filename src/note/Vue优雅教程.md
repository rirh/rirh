# Vue优雅指南

- ### 组件的二次封装

  Vue 组件的二次封装是指在现有的 Vue 组件基础上进行进一步的封装，以满足特定的需求或提供更高级的功能。二次封装可以包括组件属性的定制、事件的扩展、样式的增强等。然而，在进行事件传递时，库容易 `v-model` 时，可能会出现一些不够优雅的情况。下面介绍一些解决方法：

  - **属性的传递**

    在 Vue 3 的 `setup` 中，可以使用 `useAttrs` 函数来获取属性：

    ```vue
    <script setup>
    import { useAttrs } from 'vue'
    
    const attrs = useAttrs()
    </script>
    ```

    这样可以方便地将父组件传递的属性应用到子组件中。

  - **插槽的传递**

    对于 UI 组件的二次封装，经常需要传递插槽内容。如果按照 UI 组件的方式在二次封装组件中定义所有插槽，会有一些潜在的问题：

    1. 不够优雅，如果插槽数量很多，意味着需要在二次封装组件中定义相同数量的插槽。
    2. 如果 UI 组件中有逻辑依赖于插槽是否存在，由于定义了所有插槽，可能会导致逻辑错误。

    可以使用 `$slots` 来获取插槽对象，并动态绑定插槽内容：

    ```vue
    <script setup>
    import { useSlots } from 'vue'
    
    const slots = useSlots()
    </script>
    ```

    在二次封装组件中，可以通过处理插槽数据并统一返回，以达到动态传递插槽内容的目的。

  - **`ref` 的传递**

    在模板中，可以使用 `ref` 来引用子组件，并将父组件的属性绑定到子组件：

    ```vue
    <template>
      <el-input ref="childRef" v-bind="$attrs"></el-input>
    </template>
    
    <script lang="ts" setup>
      import { onMounted, reactive, ref, defineExpose } from 'vue';
    
      const childRef = ref();
      const options = reactive<{[K: string]: any}>({});
    
      onMounted(() => {
        const entries = Object.entries(childRef.value);
        for (let [key, value] of entries) {
          if (!value || typeof value !== 'function') {
            continue;
          }
          options[key] = value;
        }
      });
    
      defineExpose(options);
    </script>
    ```

    在上述代码中，我们使用 `ref` 来创建一个子组件的引用 `childRef`，然后在 `onMounted` 钩子中遍历引用对象的属性，并将其赋值给 `options` 对象。最后，使用 `defineExpose` 将 `options` 对象暴露给父组件。

  举例`El-Input`的二次封装

  ```vue
  <template>
    <el-input ref="childRef" v-bind="attrs">
      <template v-for="(value, name) in slots" :key="value" #[name]="slotData">
        <slot :name="name" :bind="slotData || {}"></slot>
      </template>
    </el-input>
  </template>
  
  <script lang="ts" setup>
  import {
    onMounted,
    reactive,
    ref,
    defineExpose,
    useAttrs,
    useSlots
  } from 'vue'
  
  const childRef = ref<HTMLElement | null>(null)
  const attrs = useAttrs()
  const slots = useSlots()
  const options = reactive<{ [key: string]: any }>({})
  
  onMounted(() => {
    const entries = Object.entries(childRef.value || {})
    for (const [key, value] of entries) {
      if (!value || typeof value !== 'function') {
        continue
      }
      options[key] = value
    }
  })
  
  defineExpose(options)
  </script>
  ```

  