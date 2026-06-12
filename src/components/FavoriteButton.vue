<script setup>
import { computed } from 'vue'
import { useFavoritesStore } from '@/stores/favorites'

// 通用收藏（愛心）切換按鈕
const props = defineProps({
  type: { type: String, required: true }, // 'pikmin' | 'article'
  id: { type: String, required: true }
})

const favorites = useFavoritesStore()
const active = computed(() => favorites.isFavorite(props.type, props.id))

// 阻止冒泡：卡片本身是連結，避免點愛心時觸發跳頁
function onClick(e) {
  e.preventDefault()
  e.stopPropagation()
  favorites.toggle(props.type, props.id)
}
</script>

<template>
  <button
    type="button"
    class="fav-btn"
    :class="{ 'is-active': active }"
    :aria-label="active ? '取消收藏' : '加入收藏'"
    :title="active ? '取消收藏' : '加入收藏'"
    @click="onClick"
  >
    <span class="fav-btn__icon">{{ active ? '❤️' : '🤍' }}</span>
  </button>
</template>

<style scoped lang="scss">
.fav-btn {
  border: none;
  background: rgba(255, 255, 255, 0.85);
  border-radius: 999px;
  width: 34px;
  height: 34px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.12);
  transition: transform 0.15s ease;

  &:hover { transform: scale(1.12); }
  &:active { transform: scale(0.92); }
  &.is-active &__icon { animation: pop 0.25s ease; }
  &__icon { font-size: 1.1rem; line-height: 1; }
}

@keyframes pop {
  0% { transform: scale(0.6); }
  60% { transform: scale(1.25); }
  100% { transform: scale(1); }
}
</style>
