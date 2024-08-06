<script setup lang="ts">
import { ref } from 'vue'
import VTLink from '../../../.vitepress/theme/components/VTLink.vue'
import VTIconLink from '../../../.vitepress/theme/components/VTIconLink.vue'
import image1 from '../../public/images/fof-pro-1.png'
import image2 from '../../public/images/fof-pro-2.png'
import image3 from '../../public/images/fof-pro-3.png'
import image4 from '../../public/images/fof-pro-4.png'
import image5 from '../../public/images/fof-pro-shejitu.jpg'
import image6 from '../../public/images/table-au.png'
const props = defineProps({
  partner: { type: Object }
})

const data = ref([
  {
    image: image1
  },
  {
    image: image2
  },
  {
    image: image3
  },
  {
    image: image4
  }
])
</script>

<template>
  <article class="ProductsItem">
    <div class="container">
      <div class="content">
        <h1 class="title">项目简介</h1>
        <p class="description">
          FOF PRO 基于<VTLink
            class="data-link proficiency-item"
            href="https://www.fofinvesting.com"
            no-icon
          >
            FOFinvesting </VTLink
          >的升级版本，它是多年来我们公司业务和经验的积累的结晶。作为我们公司的成果，我们致力于打造行业标杆产品，以提高自身的竞争力并优化用户体验。
          FOF PRO
          2.0在FOFinvesting的基础上进行了全面升级和改进。我们深入倾听用户的反馈和需求，结合市场趋势和行业标准，对系统进行了全面的优化和升级。我们的目标是提供更高效、更智能的功能，使用户能够更轻松地进行FOF投资和管理。
          FOF PRO
          2.0不仅保留了FOFinvesting的优点和功能，还引入了新的特性和创新。我们提升了系统的性能和稳定性，增加了更多的分析工具和数据指标，使用户能够更全面地了解FOF投资的情况。同时，我们还优化了用户界面和交互设计，使系统更加直观和易于使用。
        </p>
        <p class="description">
          项目一共299个页面，上百张图表，千余个模块，项目中我主要负责项目前端架构搭建，投研模版模块。
        </p>
        <br />
        <h1 class="title">项目整体设计图</h1>
        <a :href="image5" target="_blank" rel="noopener noreferrer">
          <img :src="image5" alt="" />
        </a>
        <br />
        <h1 class="title">投研模版架构设计</h1>
        <a :href="image6" target="_blank" rel="noopener noreferrer">
          <img :src="image6" alt="" />
        </a>
        <br />
        <h1 class="title">技术选型</h1>
        <p class="description">
          FOF
          PRO项目采用了先进的技术栈，包括React、TypeScript、Umi和Antd，充分利用了这些技术的优势。我们完全拥抱了React的最新特性，例如使用hooks进行开发,
          通过合理的架构和开发方式，为用户提供高质量、稳定可靠的应用。我们持续关注技术的发展和用户需求的变化，不断优化和改进FOF
          PRO，以提供更好的投资体验和服务
        </p>
        <br />
        <h1 class="title">周期</h1>
        <p class="description">2021-06 ～ 至今</p>

        <section class="data">
          <ul class="data-list">
            <h1 class="title">相关链接</h1>
            <li class="data-item">
              <div class="data-icon">
                <VTIconLink class="data-icon-svg" />
              </div>
              <VTLink
                class="data-link proficiency-item"
                href="https://pro.fofinvesting.com/"
                no-icon
              >
                线上地址
              </VTLink>
              <VTLink
                class="data-link proficiency-item"
                href="https://docs.qq.com/doc/DQWRqWUpXZ2xUbnFs"
                no-icon
              >
                投研模版文档
              </VTLink>
              <VTLink class="data-link proficiency-item" href="#" no-icon>
                微信关注“FOF PRP”
              </VTLink>
              <VTLink class="data-link proficiency-item" href="/log/FOF-PRO.html" no-icon>
                开发日志
              </VTLink>
            </li>

            <br />
            <h1 class="title">项目截图</h1>
            <a
              v-for="it in data"
              :key="it.image"
              :href="it.image"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img :src="it.image" alt="" />
              <br />
            </a>
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
  .screenshot img {
    width: 25%;
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
