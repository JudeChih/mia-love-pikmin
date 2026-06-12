<script setup>
// 根元件：固定頁首 + router-view
import AppHeader from '@/components/AppHeader.vue'
</script>

<template>
  <AppHeader />
  <main class="app-container">
    <!--
      註：不在此包 <transition>。
      各頁面最外層為 v-if/v-else（多根節點 fragment），
      而 <transition> 僅支援單一根節點，否則切換路由時新頁面不會掛上畫面（需刷新才出現）。
    -->
    <router-view v-slot="{ Component, route }">
      <component :is="Component" :key="route.path" />
    </router-view>
  </main>
  <footer class="site-footer">
    <p>Pikmin Bloom 新手入門教學 · 內容僅供學習參考，遊戲版權屬 Niantic / Nintendo</p>
  </footer>
</template>

<style scoped lang="scss">
@use '@/styles/variables' as *;

.site-footer {
  text-align: center;
  padding: 24px 16px 40px;
  color: $color-text-muted;
  font-size: 0.8rem;
}
</style>
