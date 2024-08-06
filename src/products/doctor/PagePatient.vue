<script setup lang="ts">
import { ref } from 'vue'
import VTLink from '../../../.vitepress/theme/components/VTLink.vue'
import VTIconLink from '../../../.vitepress/theme/components/VTIconLink.vue'
import image1 from '../../public/images/patient-1.png'
import image2 from '../../public/images/patient-2.png'
const props = defineProps({
  partner: { type: Object }
})

const data = ref([
  {
    image: image1
  },
  {
    image: image2
  }
])
</script>

<template>
  <article class="ProductsItem">
    <div class="container">
      <div class="content">
        <h1 class="title" style="font-size: 22px">患者端</h1>
        <br />
        <h1 class="title">项目简介</h1>
        <p class="description">
          患者端服务是一个面向微信端的Web
          App，旨在提供电话咨询服务，让用户能够快速获得医生的建议和咨询。主要面向一二线城市的白领人群，他们关心并关怀自己的父母的健康。
        </p>
        <p class="description">
          该项目使用Vue
          2.x进行开发，是一个单页面应用（SPA）。我们基于Axios对HTTP客户端进行了封装，使用SCSS
          + PostCSS编写样式，并使用Karma +
          Mocha进行单元测试。在构建过程中，我们使用Webpack进行打包，并使用ESLint来统一代码风格。
        </p>
        <p class="description">
          整个项目的规模较小，交互设计也相对简单。作为该项目的一部分，我负责架构方面的工作，利用transition组件实现了在路由切换时的动画效果，使页面切换有原生应用的感觉。另外，我还利用Webpack的Code
          Split特性实现了组件的异步加载，以优化页面加载时间。
        </p>
        <br />
        <h1 class="title">周期</h1>
        <p class="description">2020-01 ～ 2021-03</p>

        <section class="data">
          <ul class="data-list">
            <h1 class="title">相关链接</h1>
            <li class="data-item">
              <div class="data-icon">
                <VTIconLink class="data-icon-svg" />
              </div>

              <VTLink
                class="data-link proficiency-item"
                href="https://h5.51dling.com/h5"
                no-icon
              >
                线上地址（微信）
              </VTLink>
              <VTLink
                class="data-link proficiency-item"
                href="https://docs.qq.com/sheet/DQVhoUXF5TmZ6cUZ1?tab=BB08J2"
                no-icon
              >
                新里程&智康二期改版联调问题汇总
              </VTLink>
              <VTLink
                class="data-link proficiency-item"
                href="https://docs.qq.com/sheet/DQVVab05SZ3VVZ0xJ?tab=BB08J2"
                no-icon
              >
                一期优化需求问题汇总
              </VTLink>
            </li>
            <br />
            <h1 class="title">项目截图</h1>
            <div class="screenshot">
              <a
                v-for="it in data"
                :key="it.image"
                :href="it.image"
                target="_blank"
                rel="noopener noreferrer"
              >
                <img :src="it.image" alt="" />
              </a>
            </div>
          </ul>
        </section>
      </div>
    </div>
  </article>
</template>

<style scoped>
.screenshot {
  display: block;
  box-sizing: border-box;
}

.screenshot img {
  width: 100%;
  margin-bottom: 10px;
}

img {
  border-radius: 10px;
  box-shadow: rgb(0 0 0 / 20%) 0px 3px 1px -2px,
    rgb(0 0 0 / 14%) 0px 2px 2px 0px, rgb(0 0 0 / 12%) 0px 1px 5px 0px;
}

.ProductsItem {
  padding: 64px 24px;
  /* background-color: var(--vt-c-bg-soft); */
  /* transition: background-color 0.5s; */
}

@media (min-width: 768px) {
  .ProductsItem {
    padding: 64px 32px;
  }

  .screenshot {
    display: flex;
    box-sizing: border-box;
  }

  .screenshot a {
    width: 25%;
    margin-right: 10px;
  }
  .screenshot img {
    margin-right: 10px;
  }
}

.container {
  margin: 0 auto;
  max-width: 392px;
}

@media (min-width: 768px) {
  .container {
    display: flex;
    max-width: 768px;
  }
}

.billboard {
  flex-shrink: 0;
  margin: 0 auto;
  width: 192px;
}

.logo {
  display: block;
  border: 1px solid transparent;
  border-radius: 8px;
  width: 192px;
  height: 192px;
  overflow: hidden;
  transition: border-color 0.25s;
}

.logo:hover {
  border-color: var(--vt-c-brand);
}

.social-links {
  display: flex;
  flex-wrap: wrap;
  padding: 8px 16px;
}

.social-link {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 40px;
  height: 40px;
  color: var(--vt-c-text-2);
  transition: color 0.25s;
}

.social-link:hover {
  color: var(--vt-c-text-1);
}

.social-link-icon {
  width: 20px;
  height: 20px;
  fill: currentColor;
}

.content {
  padding-top: 24px;
  flex-grow: 1;
}

@media (min-width: 768px) {
  .content {
    padding-top: 4px;
    padding-left: 32px;
  }
}

@media (min-width: 960px) {
  .content {
    padding-left: 64px;
  }
}

.title {
  padding-bottom: 8px;
  font-size: 14px;
  font-weight: 700;
}

.description {
  font-size: 14px;
}

.description + .description {
  padding-top: 12px;
}

.proficiencies {
  padding-top: 24px;
}

.proficiency-list {
  display: flex;
  flex-wrap: wrap;
  margin: 0 -4px;
}

.proficiency-item {
  padding: 0 4px;
}

.proficiency-item::after {
  margin-left: 8px;
  content: '•';
  color: var(--vt-c-text-3);
  transition: color 0.25s;
}

.proficiency-item:last-child::after {
  display: none;
}

.proficiency-link,
.proficiency-text {
  font-size: 14px;
  font-weight: 500;
  transition: color 0.25s;
}

.proficiency-link {
  color: var(--vt-c-brand);
}

.proficiency-link:hover {
  color: var(--vt-c-brand-dark);
}

.proficiency-text {
  color: var(--vt-c-text-1);
}

.data {
  padding-top: 24px;
}

.data-item {
  display: flex;
}

.data-item + .data-item {
  padding-top: 12px;
}

.data-icon {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-shrink: 0;
  margin-right: 12px;
  width: 16px;
  height: 24px;
}

.data-icon-svg {
  width: 16px;
  height: 16px;
  fill: var(--vt-c-text-2);
  transition: fill 0.25s;
}

.data-item {
  font-size: 14px;
  font-weight: 500;
}

.data-link {
  line-height: 24px;
  color: var(--vt-c-brand);
  transition: color 0.25s;
}

.data-link:hover {
  color: var(--vt-c-brand-dark);
}

.data-texts {
  display: flex;
  flex-wrap: wrap;
  margin: 0 -4px;
}

.data-text {
  padding: 0 4px;
  line-height: 24px;
  transition: color 0.25s;
}

.data-text::after {
  margin-left: 8px;
  content: '•';
  color: var(--vt-c-text-3);
  transition: color 0.25s;
}

.data-text:last-child::after {
  display: none;
}
</style>
