<script setup lang="ts">
import VTLink from '../../../.vitepress/theme/components/VTLink.vue'
import VTIconLink from '../../../.vitepress/theme/components/VTIconLink.vue'
import PageHero from './PageHero.vue'
import PageDetail from './PageDetail.vue'
</script>

<template>
  <div class="GettrPage">
    <PageHero>
      <template #logo
        ><img
          style="height: 100px"
          src="/public/images/btcalory.ico"
          alt=""
      /></template>
      <template #title>币傲</template>
      <template #lead>
        <p>
          币傲是为个人用户设计的量化交易终端。与其说是要替代交易所，不如说它是为您的交易所提供一个强力的"外挂"。这个终端能够同时连接三大交易所，使您能够更便捷地进行交易操作。比特卡路里的操作速度超越了传统交易所，让您能够以更快的速度抢先下单，抓住交易机会。而且，比特卡路里还提供了更优秀的止盈止损方法，帮助您更精准地控制风险和获得利润。
        </p>
        <br>
        <p>
          币傲作为面向个人用户的量化交易终端，不仅能够连接多个交易所提供更便捷的交易操作，还具备快速的操作速度和更优秀的止盈止损方法。它为个人用户提供了更高效、智能的交易体验，帮助他们制定科学的交易策略并在市场中取得更好的效果。通过币傲，您可以成为一个更聪明、更成功的交易者。
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
