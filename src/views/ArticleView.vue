<script setup>
import { onMounted, computed } from 'vue'
import { useArticlesStore } from '@/stores/articles'
import LoadingState from '@/components/LoadingState.vue'
import EmptyState from '@/components/EmptyState.vue'

const props = defineProps({ id: { type: String, required: true } })
const store = useArticlesStore()

onMounted(() => store.load())

const article = computed(() => store.getById(props.id))
const meta = computed(() => (article.value ? store.categoryMeta(article.value.category) : null))
</script>

<template>
  <LoadingState v-if="store.loading" :rows="6" />

  <template v-else>
    <template v-if="article">
      <el-breadcrumb separator="/" class="crumb">
        <el-breadcrumb-item :to="{ name: 'home' }">首頁</el-breadcrumb-item>
        <el-breadcrumb-item :to="{ name: 'category', params: { category: article.category } }">
          {{ meta?.label }}
        </el-breadcrumb-item>
        <el-breadcrumb-item>{{ article.title }}</el-breadcrumb-item>
      </el-breadcrumb>

      <article class="article">
        <header class="article__header">
          <el-tag size="small" type="success" effect="light">{{ article.level }}</el-tag>
          <h1 class="article__title">{{ article.title }}</h1>
          <p class="article__summary">{{ article.summary }}</p>
          <div class="article__tags">
            <el-tag v-for="t in article.tags" :key="t" size="small" effect="plain" round>#{{ t }}</el-tag>
          </div>
        </header>

        <section v-for="(sec, i) in article.sections" :key="i" class="article__section">
          <h2 class="article__h2">{{ sec.heading }}</h2>
          <p v-for="(p, pi) in sec.paragraphs" :key="pi" class="article__p">{{ p }}</p>
          <div v-if="sec.tips && sec.tips.length" class="article__tips">
            <p class="article__tips-title">💡 小技巧</p>
            <ul>
              <li v-for="(tip, ti) in sec.tips" :key="ti">{{ tip }}</li>
            </ul>
          </div>
        </section>
      </article>
    </template>

    <EmptyState v-else text="找不到這篇教學" emoji="🔍">
      <router-link to="/" class="back-link">← 回首頁</router-link>
    </EmptyState>
  </template>
</template>

<style scoped lang="scss">
@use '@/styles/variables' as *;
@use '@/styles/mixins' as *;

.crumb { margin-bottom: 16px; }

.article {
  background: $color-card;
  border: 1px solid $color-border;
  border-radius: $radius-lg;
  padding: 24px;
  box-shadow: $shadow-card;

  @include respond-to(md) { padding: 36px; }

  &__title { margin: 12px 0 8px; font-size: 1.5rem; color: $color-text;
    @include respond-to(md) { font-size: 1.9rem; } }
  &__summary { margin: 0 0 12px; color: $color-text-muted; }
  &__tags { display: flex; flex-wrap: wrap; gap: 6px; }

  &__section { margin-top: 28px; }
  &__h2 {
    font-size: 1.15rem;
    color: $color-leaf-dark;
    border-left: 4px solid $color-leaf;
    padding-left: 10px;
    margin: 0 0 10px;
  }
  &__p { margin: 0 0 10px; line-height: 1.8; color: $color-text; }

  &__tips {
    background: #eaf7dd;
    border-radius: $radius-md;
    padding: 14px 16px;
    margin-top: 12px;

    &-title { margin: 0 0 6px; font-weight: 700; color: $color-leaf-dark; }
    ul { margin: 0; padding-left: 20px; }
    li { margin-bottom: 6px; line-height: 1.7; }
  }
}

.back-link { color: $color-leaf; font-weight: 600; }
</style>
