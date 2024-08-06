<script setup lang="ts">
import VTLink from '../../../.vitepress/theme/components/VTLink.vue'

import PageHero from './PageHero.vue'
import PageDetail from './PageDetail.vue'
</script>

<template>
  <div class="GettrPage">
    <PageHero>
      <template #logo>
        <img
          style="height: 64px"
          src="/public/images/openalpha-logo.ico"
          alt=""
      /></template>
      <template #title>基金研究开放平台</template>
      <template #lead>
        <VTLink href="https://datumwealth.com/" no-icon>
          OpenAlpha开放平台
        </VTLink>
        销售基金指标API，支持定制API和深度数据合作，支持会员充值调用和套餐两种模式。包含会员销售，大V入驻支持。主要服务人群：投顾，自媒体，机构，个人，量化。
      </template>
    </PageHero>
    <PageDetail />
  </div>
</template>

<style scoped>
.GettrPage {
  padding-bottom: 16px;
}
</style>
