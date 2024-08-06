<script setup lang="ts">
import VTLink from '../../../.vitepress/theme/components/VTLink.vue'
import PageHero from './PageHero.vue'
import PageDetail from './PageDetail.vue'
import PagePatient from './PagePatient.vue'
</script>

<template>
  <div class="GettrPage">
    <PageHero>
      <template #logo
        ><img
          style="height: 120px"
          src="/public/images/dling.png"
          alt=""
      /></template>
      <template #title>叮铃医生</template>
      <template #lead>
        <p>
          <VTLink href="https://www.51dling.com/" no-icon> 叮铃医生</VTLink
          >采用PPP合作模式，通过智能自助终端、云平台和服务的产品形态，迅速改善了病人的就医体验，推动了分级诊疗，实现了医疗资源的充分下沉。结合慢病的家庭医生计划，广大市民可以在家里或家门口获得高质量的医疗服务。
        </p>
        <br />
        <p>
          叮铃医生还为各级政府及部门提供全面、准确、及时的信息，为病人提供高质量的智慧医疗卫生服务。我们对原文进行了润色和修正，以提高表达的准确性和语法的正确性，并强调了叮铃医生在医疗领域的贡献
        </p>
      </template>
    </PageHero>
    <PageDetail />
    <PagePatient />
  </div>
</template>

<style scoped>
.GettrPage {
  padding-bottom: 16px;
}
</style>
