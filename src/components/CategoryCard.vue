<script setup>
// 首頁分類卡片
defineProps({
  category: { type: Object, required: true }
})
</script>

<template>
  <router-link
    :to="{ name: 'category', params: { category: category.key } }"
    class="category-card"
  >
    <span class="category-card__emoji">{{ category.emoji }}</span>
    <div class="category-card__body">
      <h3 class="category-card__title">{{ category.label }}</h3>
      <p class="category-card__desc">{{ category.desc }}</p>
      <span class="category-card__count">{{ category.count }} 篇</span>
    </div>
  </router-link>
</template>

<style scoped lang="scss">
@use '@/styles/variables' as *;
@use '@/styles/mixins' as *;

.category-card {
  @include card-base;
  display: flex;
  align-items: center;
  gap: 14px;
  padding: 18px;

  &:hover { transform: translateY(-3px); box-shadow: $shadow-hover; }

  &__emoji {
    font-size: 2.2rem;
    flex-shrink: 0;
  }
  &__title { margin: 0 0 4px; font-size: 1.05rem; color: $color-text; }
  &__desc { margin: 0; font-size: 0.85rem; color: $color-text-muted; @include line-clamp(1); }
  &__count {
    display: inline-block;
    margin-top: 6px;
    font-size: 0.75rem;
    color: $color-leaf;
    font-weight: 600;
  }
}
</style>
