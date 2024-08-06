<script setup lang="ts">
import { ref } from 'vue'
import VTLink from '../../../.vitepress/theme/components/VTLink.vue'
import VTIconLink from '../../../.vitepress/theme/components/VTIconLink.vue'
import btcalory1 from '../../public/images/btcalory-1.png'
import btcalory2 from '../../public/images/btcalory-2.gif'
import btcalory3 from '../../public/images/btcalory-3.gif'
import btcalory4 from '../../public/images/btcalory-4.png'
const props = defineProps({
  partner: { type: Object }
})
const data = ref([
  {
    image: btcalory1
  },
  {
    image: btcalory2
  },
  {
    image: btcalory3
  },
  {
    image: btcalory4
  }
])
</script>

<template>
  <article class="ProductsItem">
    <div class="container">
      <div class="content">
        <h1 class="title">项目简介</h1>
        <p class="description">币傲-是可以同时支持三大交易所的“外挂”</p>
        <p class="description">
          币傲项目基于 React 16 开发，并已全面迁移至新版生命周期和 Ref
          API。同时，还应用了 ErrorBoundary、Fragment、memo
          等新特性，以提升项目的性能和可靠性。在后续开发中，采用了 Hooks +
          TypeScript 来实现新组件，进一步提升了开发效率和代码质量。
        </p>
        <p class="description">
          整个项目使用了现代化的开发工具和技术。使用 ES Next + SCSS
          进行开发，让代码更具可读性和可维护性。在绘制交易图表方面，采用了
          TradingView 来绘制 K 线图，使用 ECharts
          绘制深度图和影响力指数雷达图等。通过使用 WebSocket
          技术，能够实时更新交易数据，确保用户获取最新的市场动态。此外，还运用
          WebWorker 技术进行性能优化，提升用户体验。
        </p>
        <p class="description">
          为了保证代码质量和团队协作的高效性，严格遵循了 Standard
          风格的代码规范，并使用 ESLint 和 Stylelint
          对团队的编码风格进行约束和规范化。此外，还采用了 Jest
          进行单元测试，以确保代码的可靠性和稳定性。在版本控制方面，严格遵循
          Git Workflow 和 Conventional
          规范，以确保团队成员之间的协作顺畅和代码版本的管理清晰。
        </p>
        <p class="description">
          通过以上的工具和技术的运用，币傲项目能够以高效、可靠的方式为用户提供优质的交易体验。持续关注最新的技术发展和用户需求，并不断优化和改进项目，以满足用户的期待和需求。
        </p>

        <br />
        <h1 class="title">周期</h1>
        <p class="description">2019-03 ～ 2020-01</p>

        <section class="data">
          <ul class="data-list">
            <h1 class="title">相关链接</h1>
            <li class="data-item">
              <div class="data-icon">
                <VTIconLink class="data-icon-svg" />
              </div>

              <VTLink
                class="data-link proficiency-item"
                href="https://www.btcalory.com/"
                no-icon
              >
                已下线
              </VTLink>
              <VTLink
                class="data-link proficiency-item"
                href="https://docs.qq.com/sheet/DQVZzSnNXSXVwclJu?tab=BB08J2"
                no-icon
              >
                BUG 列表
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
