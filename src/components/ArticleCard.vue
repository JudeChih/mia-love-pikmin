<script setup>
import FavoriteButton from '@/components/FavoriteButton.vue'

// 教學文章卡片
defineProps({
  article: { type: Object, required: true }
})
</script>

<template>
  <router-link
    :to="{ name: 'article', params: { id: article.id } }"
    class="article-card"
  >
    <div class="article-card__head">
      <el-tag size="small" type="success" effect="light">{{ article.level }}</el-tag>
      <FavoriteButton type="article" :id="article.id" />
    </div>
    <h3 class="article-card__title">{{ article.title }}</h3>
    <p class="article-card__summary">{{ article.summary }}</p>
    <div class="article-card__tags">
      <el-tag
        v-for="t in article.tags"
        :key="t"
        size="small"
        effect="plain"
        round
      >#{{ t }}</el-tag>
    </div>
  </router-link>
</template>

<style scoped lang="scss">
@use '@/styles/variables' as *;
@use '@/styles/mixins' as *;

.article-card {
  @include card-base;
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding: 18px;

  &:hover { transform: translateY(-3px); box-shadow: $shadow-hover; }

  &__head { display: flex; align-items: center; justify-content: space-between; }
  &__title { margin: 0; font-size: 1.05rem; color: $color-text; }
  &__summary { margin: 0; font-size: 0.85rem; color: $color-text-muted; @include line-clamp(2); }
  &__tags { display: flex; flex-wrap: wrap; gap: 6px; margin-top: auto; padding-top: 8px; }
}
</style>
