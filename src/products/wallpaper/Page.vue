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
          src="/public/images/wallpaper-logo.png"
          alt=""
      /></template>
      <template #title>WALL PAPER</template>
      <template #lead>
        超清无水印壁纸 美好事物尽收眼底
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
