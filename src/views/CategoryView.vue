<script setup>
import { onMounted, computed } from 'vue'
import { useArticlesStore } from '@/stores/articles'
import ArticleCard from '@/components/ArticleCard.vue'
import LoadingState from '@/components/LoadingState.vue'
import EmptyState from '@/components/EmptyState.vue'

const props = defineProps({ category: { type: String, required: true } })
const store = useArticlesStore()

onMounted(() => store.load())

const meta = computed(() => store.categoryMeta(props.category))
const articles = computed(() => store.getByCategory(props.category))
</script>

<template>
  <LoadingState v-if="store.loading" :rows="4" />
  <template v-else>
    <el-breadcrumb separator="/" class="crumb">
      <el-breadcrumb-item :to="{ name: 'home' }">首頁</el-breadcrumb-item>
      <el-breadcrumb-item>{{ meta?.label || '分類' }}</el-breadcrumb-item>
    </el-breadcrumb>

    <h2 class="section-title">
      <span v-if="meta">{{ meta.emoji }} </span>{{ meta?.label || '找不到分類' }}
    </h2>

    <div v-if="articles.length" class="grid-cards">
      <ArticleCard v-for="a in articles" :key="a.id" :article="a" />
    </div>
    <EmptyState v-else text="這個分類還沒有教學文章" />
  </template>
</template>

<style scoped>
.crumb { margin-bottom: 12px; }
</style>
