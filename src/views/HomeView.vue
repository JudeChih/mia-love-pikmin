<script setup>
import { onMounted, computed, watch } from 'vue'
import { useRoute } from 'vue-router'
import { useArticlesStore } from '@/stores/articles'
import CategoryCard from '@/components/CategoryCard.vue'
import ArticleCard from '@/components/ArticleCard.vue'
import LoadingState from '@/components/LoadingState.vue'
import EmptyState from '@/components/EmptyState.vue'

const route = useRoute()
const store = useArticlesStore()

onMounted(() => store.load())

// 同步網址上的搜尋關鍵字到 store（支援頁首搜尋導向）
watch(
  () => route.query.q,
  (q) => { store.keyword = (q || '').toString() },
  { immediate: true }
)

const isSearching = computed(() => store.keyword.trim().length > 0)
</script>

<template>
  <LoadingState v-if="store.loading" :rows="4" />

  <el-alert v-else-if="store.error" :title="store.error" type="error" show-icon :closable="false" />

  <template v-else>
    <!-- 搜尋模式：顯示結果 -->
    <section v-if="isSearching">
      <h2 class="section-title">搜尋「{{ store.keyword }}」的結果</h2>
      <div v-if="store.searchResults.length" class="grid-cards">
        <ArticleCard v-for="a in store.searchResults" :key="a.id" :article="a" />
      </div>
      <EmptyState v-else text="找不到相符的教學，換個關鍵字試試" />
    </section>

    <!-- 一般模式：分類導覽 -->
    <template v-else>
      <section class="hero">
        <h1 class="hero__title">🌱 Pikmin Bloom 新手入門</h1>
        <p class="hero__sub">遠征、種花瓣、幼苗培養、裝飾品圖鑑與常見問題，一站查清楚。</p>
      </section>

      <section>
        <h2 class="section-title">教學分類</h2>
        <div class="grid-cards">
          <CategoryCard v-for="c in store.categories" :key="c.key" :category="c" />
        </div>
      </section>
    </template>
  </template>
</template>

<style scoped lang="scss">
@use '@/styles/variables' as *;
@use '@/styles/mixins' as *;

.hero {
  text-align: center;
  padding: 28px 12px 8px;

  &__title { margin: 0 0 8px; font-size: 1.6rem; color: $color-leaf-dark;
    @include respond-to(md) { font-size: 2.1rem; } }
  &__sub { margin: 0 auto; max-width: 560px; color: $color-text-muted; font-size: 0.95rem; }
}
</style>
