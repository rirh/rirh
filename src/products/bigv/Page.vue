<script setup lang="ts">
import VTLink from '../../../.vitepress/theme/components/VTLink.vue'
import VTIconLink from '../../../.vitepress/theme/components/VTIconLink.vue'
import PageHero from './PageHero.vue'
import PageDetail from './PageDetail.vue'
</script>

<template>
  <div class="GettrPage">
    <PageHero>
      <template #logo>
        <img
          style="height: 64px"
          src="/public/images/bigv-logo.jpeg"
          alt=""
      /></template>
      <template #title>笨嘴神器</template>
      <template #lead>
        <p>
          笨嘴神器的独特之处在于它与基金大V紧密合作，通过共同努力和协作，打造了一个能够满足大V个性化需求的平台。该系统汇集了大量的投研产品和数据科技，使大V能够更好地分析市场趋势、评估投资机会，并提供精准的投资建议。这种产品化的方法不仅能够提高大V的工作效率，还能够为他们带来更高的收益和回报。
        </p>
        <br />
        <p>
          同时，笨嘴神器也注重用户体验和用户参与。通过小程序或网站的形式，它提供了一个便捷的交流平台，使大V能够与粉丝进行互动、分享理财经验和知识。这种交流互动的方式不仅能够增加用户的黏性，还能够促进用户的学习和成长。
        </p>
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
