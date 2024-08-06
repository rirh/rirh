<script setup lang="ts">
import VTLink from '../../../.vitepress/theme/components/VTLink.vue'

import PageHero from './PageHero.vue'
import PageDetail from './PageDetail.vue'
</script>

<template>
  <div class="GettrPage">
    <PageHero>
      <template #logo
        ><img
          style="height: 64px"
          src="/public/images/valuation-logo.svg"
          alt=""
      /></template>
      <template #title>净值预估</template>
      <template #lead>
        根据基金根据基金公司公布的前十大重仓股和大盘的走势，预估出基金当日的净值。
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
