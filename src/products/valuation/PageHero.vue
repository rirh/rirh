<script setup lang="ts"></script>

<template>
  <div class="PartnerHero">
    <div class="container">
      <slot name="logo" />
      <h1 class="title">
        <slot name="title" />
      </h1>
      <br />
      <p class="lead">
        <slot name="lead" />
      </p>
    </div>
  </div>
  <!-- <img class="GettrImg" src="/public/images/gettr.jpg" alt="gettr" /> -->
</template>

<style scoped>
.PartnerHero {
  padding: 48px 24px;
}
.GettrImg {
  width: 100%;
}

@media (min-width: 768px) {
  .PartnerHero {
    padding: 64px 32px;
    background-size: 100% 100%;
  }
}

.container {
  margin: 0 auto;
  max-width: 540px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.title,
.lead,
.PartnerHero :deep(.link) {
  transition: color 0.25s;
}

.title {
  line-height: 32px;
  font-size: 32px;
  font-weight: 500;
  margin-top: 10px;
}

@media (min-width: 768px) {
  .title {
    line-height: 40px;
    font-size: 40px;
  }
}

.lead {
  padding-top: 8px;
  font-size: 16px;
  font-weight: 500;
  color: var(--vt-c-text-2);
}

.PartnerHero :deep(.link) {
  color: var(--vt-c-brand);
}

.PartnerHero :deep(.link:hover) {
  color: var(--vt-c-brand-dark);
}
</style>
