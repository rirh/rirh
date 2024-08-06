<script setup lang="ts">
import { ref } from 'vue'
import VTLink from '../../../.vitepress/theme/components/VTLink.vue'
import VTIconLink from '../../../.vitepress/theme/components/VTIconLink.vue'
import bigv1 from '../../public/images/bigv-1.png'
import bigv2 from '../../public/images/bigv-2.png'
import bigv3 from '../../public/images/bigv-3.png'
import bigv4 from '../../public/images/bigv-4.png'
const props = defineProps({
  partner: { type: Object }
})

const data = ref([
  {
    image: bigv1
  },
  {
    image: bigv2
  },
  {
    image: bigv3
  },
  {
    image: bigv4
  }
])
</script>

<template>
  <article class="ProductsItem">
    <div class="container">
      <div class="content">
        <h1 class="title">项目简介</h1>
        <p class="description">
          考虑到金融行业系统审核困难、国家监管严格且审核流程时间较长，为了确保企业能够灵活控制页面内容并保障用户的使用体验，本项目采用了以下整体架构：
        </p>
        <p class="description">
          1、在小程序中，使用原生API支持用户授权相关功能，以确保用户在使用过程中的安全和便利性。
        </p>
        <p class="description">
          2、页面工具内容采用Webview展示的方式，使得能够灵活地发布、部署、更新和回滚页面内容。通过这种方式，能够在不影响整体应用的情况下，快速调整和优化页面内容。
        </p>
        <p class="description">
          3、将Webview模块拆分为单一工具微服务，以便同时进行开发和部署。这种模块化的设计使得能够更加高效地开发和维护各个工具模块。
        </p>
        <p class="description">
          4、在单一工具模块的页面开发中，统一采用了Vue 3 + TypeScript +
          Pinia的技术栈。这样的选择不仅能够提供良好的开发体验和代码可维护性，还能够保证页面的性能和稳定性
        </p>
        <p class="description">
          5、为了实现灵活的数据通信，统一使用URL参数和持久化储存的方式来进行数据传递和存储。这样的设计使得页面之间的数据交互更加方便，同时也能够保证数据的安全性和一致性。
        </p>
        <p class="description">
          通过以上架构和设计，能够在审核页面时发布符合审核要求的相关页面。一旦小程序上线，就可以替换审核页面，完成审核流程。根据本模式，的项目在两个月内已经进行了21次迭代，而小程序只需要经历了一次审核过程。同时，还接入了20多家大V合作伙伴，其中包括知名的笨嘴神器等。在合作中，的项目取得了显著的成绩，日收益峰值达到了10万元，月收益更是达到了100万元。
        </p>
        <br />
        <h1 class="title">周期</h1>
        <p class="description">2021-10 ～ 至今</p>

        <section class="data">
          <ul class="data-list">
            <h1 class="title">相关链接</h1>
            <li class="data-item">
              <img
                style="height: 150px; padding: 10px"
                src="https://c18e-1257416358.cos.accelerate.myqcloud.com/IMG_4492.JPG"
                alt=""
              />

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
.screenshot,
a {
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
  background-color: var(--vt-c-bg-soft);
  transition: background-color 0.5s;
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
    margin-right: 10px;
  }
  .screenshot img {
    width: 100%;
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
