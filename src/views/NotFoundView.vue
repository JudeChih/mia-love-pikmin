<script setup>
import EmptyState from '@/components/EmptyState.vue'
</script>

<template>
  <EmptyState text="找不到這個頁面" emoji="🐛">
    <router-link to="/" class="back-link">← 回首頁</router-link>
  </EmptyState>
</template>

<style scoped lang="scss">
@use '@/styles/variables' as *;
.back-link { color: $color-leaf; font-weight: 600; }
</style>
