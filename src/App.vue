<script setup>
// 根元件：固定頁首 + router-view
import AppHeader from '@/components/AppHeader.vue'
</script>

<template>
  <AppHeader />
  <main class="app-container">
    <!--
      淡入動畫做法說明：
      不使用 <transition>，因為各頁面最外層為 v-if/v-else（多根節點 fragment），
      <transition> 僅支援單一根節點，會導致切換路由時新頁面不顯示（需刷新）。
      改用「keyed 包裹 div + CSS 動畫」：route.path 改變時包裹層整個重建，
      CSS animation 於掛載時自動播放淡入，穩定且不破壞畫面。
    -->
    <router-view v-slot="{ Component, route }">
      <div :key="route.path" class="route-view">
        <component :is="Component" />
      </div>
    </router-view>
  </main>
  <footer class="site-footer">
    <p>Pikmin Bloom 新手入門教學 · 內容僅供學習參考，遊戲版權屬 Niantic / Nintendo</p>
  </footer>
</template>

<style scoped lang="scss">
@use '@/styles/variables' as *;

.route-view {
  animation: route-fade 0.22s ease;
}

@keyframes route-fade {
  from { opacity: 0; transform: translateY(4px); }
  to { opacity: 1; transform: none; }
}

// 尊重使用者「減少動態效果」的系統設定（無障礙）
@media (prefers-reduced-motion: reduce) {
  .route-view { animation: none; }
}

.site-footer {
  text-align: center;
  padding: 24px 16px 40px;
  color: $color-text-muted;
  font-size: 0.8rem;
}
</style>
