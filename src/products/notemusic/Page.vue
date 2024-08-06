<script setup lang="ts">
import VTLink from '../../../.vitepress/theme/components/VTLink.vue'

import PageHero from './PageHero.vue'
import PageDetail from './PageDetail.vue'
</script>

<template>
  <div class="GettrPage">
    <PageHero>
      <template #logo><img style="height: 64px;border-radius: 12px;"
          src="https://c18e-1257416358.cos.accelerate.myqcloud.com/image/64x64.png" alt="" /></template>
      <template #title>MUSIC ZORG</template>
      <template #lead> 一款在线高颜值音乐播放器 </template>
    </PageHero>
    <PageDetail />
  </div>
</template>

<style scoped>
.GettrPage {
  padding-bottom: 16px;
}
</style>
