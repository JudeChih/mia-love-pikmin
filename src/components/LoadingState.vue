<script setup>
// 載入中防呆元件（骨架）
defineProps({ rows: { type: Number, default: 3 } })
</script>

<template>
  <div class="loading-state">
    <el-skeleton :rows="rows" animated />
  </div>
</template>

<style scoped>
.loading-state { padding: 16px 0; }
</style>
