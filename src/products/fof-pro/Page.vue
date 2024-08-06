<script setup lang="ts">
import VTLink from '../../../.vitepress/theme/components/VTLink.vue'

import PageHero from './PageHero.vue'
import PageDetail from './PageDetail.vue'
import PageApp from './PageApp.vue'
</script>

<template>
  <div class="GettrPage">
    <PageHero>
      <template #logo
        ><img
          style="height: 120px"
          src="/public/images/fof-pro-logo.png"
          alt=""
      /></template>
      <template #title>基金投研投顾平台</template>
      <template #lead>
        <p>
          <VTLink href="https://pro.fofinvesting.com/" no-icon
            >Fof Pro</VTLink
          >
          是一款专业的系统解决方案，旨在为FOF（基金中的基金）、MOM（多管理人）以及委外投资等提供全面的投前、投中和投后流程覆盖。致力于为基金行业提供各种专业分析解决方案，涵盖收益和持仓等方面的需求。
        </p>
        <br />
        <p>
          Fof Pro注重用户体验和易用性。界面设计简洁直观，操作流程清晰， 强大的功能和功能模块，能够满足基金行业的多样化需求。无论是在投资决策阶段还是投资执行和监控阶段，的系统都能提供准确、及时的数据和分析报告。的目标是帮助基金管理人和投资者进行有效的资产配置和风险管理，以实现更好的投资回报。
        </p>

      </template>
    </PageHero>
    <PageDetail />
    <PageApp />
  </div>
</template>

<style scoped>
.GettrPage {
  padding-bottom: 16px;
}
</style>
