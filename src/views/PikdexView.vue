<script setup>
import { onMounted, ref, computed } from 'vue'
import { usePikminStore } from '@/stores/pikmin'
import { useFavoritesStore } from '@/stores/favorites'
import PikminCard from '@/components/PikminCard.vue'
import LoadingState from '@/components/LoadingState.vue'
import EmptyState from '@/components/EmptyState.vue'

const store = usePikminStore()
const favorites = useFavoritesStore()
onMounted(() => store.load())

const onlyFav = ref(false) // 只看收藏

// 在 store 過濾結果上，再依「只看收藏」過濾
const displayList = computed(() =>
  onlyFav.value
    ? store.filtered.filter((p) => favorites.isFavorite('pikmin', p.id))
    : store.filtered
)

const emptyText = computed(() =>
  onlyFav.value ? '還沒有收藏任何皮克敏，點卡片右上角的愛心加入吧' : '沒有符合條件的皮克敏'
)

function clearAll() {
  store.resetFilters()
  onlyFav.value = false
}

// 顏色標籤對應顯示文字
const COLOR_LABEL = {
  all: '全部', red: '紅', yellow: '黃', blue: '藍',
  white: '白', pink: '粉', purple: '紫', gray: '灰'
}
</script>

<template>
  <h2 class="section-title">🎀 皮克敏圖鑑</h2>

  <LoadingState v-if="store.loading" :rows="4" />
  <el-alert v-else-if="store.error" :title="store.error" type="error" show-icon :closable="false" />

  <template v-else>
    <div class="filters">
      <el-input
        v-model="store.keyword"
        placeholder="搜尋名稱 / 特性 / 標籤…"
        clearable
        class="filters__search"
      />
      <div class="filters__colors">
        <el-tag
          v-for="c in store.colorOptions"
          :key="c"
          :effect="store.activeColor === c ? 'dark' : 'plain'"
          class="filters__color"
          round
          @click="store.activeColor = c"
        >{{ COLOR_LABEL[c] || c }}</el-tag>
        <el-tag
          :effect="onlyFav ? 'dark' : 'plain'"
          type="danger"
          class="filters__color"
          round
          @click="onlyFav = !onlyFav"
        >❤️ 只看收藏 ({{ favorites.pikminCount }})</el-tag>
      </div>
    </div>

    <div v-if="displayList.length" class="grid-cards">
      <PikminCard v-for="p in displayList" :key="p.id" :pikmin="p" />
    </div>
    <EmptyState v-else :text="emptyText" emoji="🔍">
      <el-button text type="success" @click="clearAll">清除過濾條件</el-button>
    </EmptyState>
  </template>
</template>

<style scoped lang="scss">
@use '@/styles/variables' as *;
@use '@/styles/mixins' as *;

.filters {
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-bottom: 20px;

  @include respond-to(md) { flex-direction: row; align-items: center; justify-content: space-between; }

  &__search { max-width: 320px; }
  &__colors { display: flex; flex-wrap: wrap; gap: 8px; }
  &__color { cursor: pointer; user-select: none; }
}
</style>
