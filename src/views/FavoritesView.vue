<script setup>
import { onMounted, computed } from 'vue'
import { useArticlesStore } from '@/stores/articles'
import { usePikminStore } from '@/stores/pikmin'
import { useFavoritesStore } from '@/stores/favorites'
import ArticleCard from '@/components/ArticleCard.vue'
import PikminCard from '@/components/PikminCard.vue'
import LoadingState from '@/components/LoadingState.vue'
import EmptyState from '@/components/EmptyState.vue'

const articlesStore = useArticlesStore()
const pikminStore = usePikminStore()
const favorites = useFavoritesStore()

// 兩個資料來源都要載入，才能依收藏 id 還原內容
onMounted(() => {
  articlesStore.load()
  pikminStore.load()
})

const loading = computed(() => articlesStore.loading || pikminStore.loading)

const favArticles = computed(() =>
  favorites.article
    .map((id) => articlesStore.getById(id))
    .filter(Boolean) // 過濾掉已不存在的 id（防呆）
)
const favPikmin = computed(() =>
  favorites.pikmin
    .map((id) => pikminStore.list.find((p) => p.id === id))
    .filter(Boolean)
)
</script>

<template>
  <h2 class="section-title">❤️ 我的收藏</h2>

  <LoadingState v-if="loading" :rows="4" />

  <template v-else>
    <EmptyState
      v-if="favorites.totalCount === 0"
      text="還沒有任何收藏，逛逛教學與圖鑑、點愛心收藏吧"
      emoji="🤍"
    >
      <router-link to="/" class="link">← 回首頁逛逛</router-link>
    </EmptyState>

    <template v-else>
      <section v-if="favPikmin.length" class="fav-section">
        <h3 class="fav-section__title">皮克敏（{{ favPikmin.length }}）</h3>
        <div class="grid-cards">
          <PikminCard v-for="p in favPikmin" :key="p.id" :pikmin="p" />
        </div>
      </section>

      <section v-if="favArticles.length" class="fav-section">
        <h3 class="fav-section__title">教學文章（{{ favArticles.length }}）</h3>
        <div class="grid-cards">
          <ArticleCard v-for="a in favArticles" :key="a.id" :article="a" />
        </div>
      </section>
    </template>
  </template>
</template>

<style scoped lang="scss">
@use '@/styles/variables' as *;

.fav-section { margin-bottom: 28px; &__title { font-size: 1.05rem; color: $color-leaf-dark; margin: 0 0 12px; } }
.link { color: $color-leaf; font-weight: 600; }
</style>
