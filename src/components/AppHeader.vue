<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useFavoritesStore } from '@/stores/favorites'

const router = useRouter()
const favorites = useFavoritesStore()
const q = ref('')

// 從頁首搜尋：導向首頁並帶上關鍵字，由首頁顯示結果
function onSearch() {
  const kw = q.value.trim()
  router.push({ name: 'home', query: kw ? { q: kw } : {} })
}
</script>

<template>
  <header class="site-header">
    <div class="site-header__inner app-container">
      <router-link to="/" class="brand">
        <span class="brand__logo">🌱</span>
        <span class="brand__name">Pikmin Bloom 教學</span>
      </router-link>

      <div class="site-header__actions">
        <el-input
          v-model="q"
          placeholder="搜尋教學…"
          clearable
          class="search-box"
          @keyup.enter="onSearch"
          @clear="onSearch"
        />
        <router-link to="/pikdex" class="nav-link">圖鑑</router-link>
        <router-link to="/favorites" class="nav-link">
          <el-badge :value="favorites.totalCount" :hidden="favorites.totalCount === 0" type="danger">
            ❤️ 收藏
          </el-badge>
        </router-link>
      </div>
    </div>
  </header>
</template>

<style scoped lang="scss">
@use '@/styles/variables' as *;
@use '@/styles/mixins' as *;

.site-header {
  position: sticky;
  top: 0;
  z-index: 10;
  background: rgba(255, 255, 255, 0.92);
  backdrop-filter: blur(8px);
  border-bottom: 1px solid $color-border;

  &__inner {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 12px;
    padding-top: 12px;
    padding-bottom: 12px;
  }

  &__actions {
    display: flex;
    align-items: center;
    gap: 12px;
  }
}

.brand {
  display: flex;
  align-items: center;
  gap: 8px;
  font-weight: 800;
  color: $color-leaf-dark;

  &__logo { font-size: 1.4rem; }
  &__name { font-size: 1rem; @include respond-to(md) { font-size: 1.15rem; } }
}

.search-box {
  width: 120px;
  @include respond-to(md) { width: 200px; }
}

.nav-link {
  font-weight: 600;
  color: $color-leaf;
  white-space: nowrap;
  &:hover { color: $color-leaf-dark; }
}
</style>
