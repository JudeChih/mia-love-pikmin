<script setup>
// 空狀態防呆元件
defineProps({
  text: { type: String, default: '目前沒有資料' },
  emoji: { type: String, default: '🍂' }
})
</script>

<template>
  <div class="empty-state">
    <div class="empty-state__emoji">{{ emoji }}</div>
    <p class="empty-state__text">{{ text }}</p>
    <slot />
  </div>
</template>

<style scoped lang="scss">
@use '@/styles/variables' as *;

.empty-state {
  text-align: center;
  padding: 48px 16px;
  color: $color-text-muted;

  &__emoji { font-size: 3rem; margin-bottom: 12px; }
  &__text { font-size: 1rem; }
}
</style>
