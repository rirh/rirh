<script setup lang="ts">
import VTLink from '../../../.vitepress/theme/components/VTLink.vue'
import GettrHero from './GettrHero.vue'
import GettrDetail from './GettrDetail.vue'
</script>

<template>
  <div class="GettrPage">
    <GettrHero>
      <template #title>GETTR</template>
      <template #lead>
        <p>
          <VTLink href="https://www.gettr.com/" no-icon>GETTR</VTLink>
          （中文名为盖特）是源于美国的社群网络服务及社会化媒体网站，总部位于美国纽约州，由前美国总统唐纳德·特朗普的助手和发言人杰森·米勒创建。
        </p>
        <br />
        <p>
          GETTR
          是一个全新的社交媒体平台，其创立基于言论自由、独立思考以及反对政治审查和“文化取消”的原则。凭借最先进的技术，的目标是创建一个思想交流的市场，以分享自由和民主的理念，让其在全球范围内传播。
        </p>
      </template>
    </GettrHero>
    <GettrDetail />
  </div>
</template>

<style scoped>
.GettrPage {
  padding-bottom: 16px;
}
</style>
