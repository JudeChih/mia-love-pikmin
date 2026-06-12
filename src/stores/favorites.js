import { defineStore } from 'pinia'
import { ref, computed, watch } from 'vue'

const STORAGE_KEY = 'pikmin-bloom-favorites'

// 從 localStorage 安全讀取（防呆：解析失敗或無權限時回退預設值）
function loadFromStorage() {
  const fallback = { pikmin: [], article: [] }
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return fallback
    const parsed = JSON.parse(raw)
    return {
      pikmin: Array.isArray(parsed.pikmin) ? parsed.pikmin : [],
      article: Array.isArray(parsed.article) ? parsed.article : []
    }
  } catch (e) {
    console.warn('[favorites] 讀取收藏失敗，使用空清單：', e)
    return fallback
  }
}

export const useFavoritesStore = defineStore('favorites', () => {
  const saved = loadFromStorage()

  // --- state（以陣列保存，方便序列化）---
  const pikmin = ref(saved.pikmin)
  const article = ref(saved.article)

  // 寫回 localStorage（同樣加上 try-catch，避免無痕模式等情境拋錯）
  watch(
    [pikmin, article],
    () => {
      try {
        localStorage.setItem(
          STORAGE_KEY,
          JSON.stringify({ pikmin: pikmin.value, article: article.value })
        )
      } catch (e) {
        console.warn('[favorites] 儲存收藏失敗：', e)
      }
    },
    { deep: true }
  )

  // --- helpers ---
  const listOf = (type) => (type === 'pikmin' ? pikmin : article)

  const isFavorite = (type, id) => listOf(type).value.includes(id)

  function toggle(type, id) {
    const list = listOf(type)
    const idx = list.value.indexOf(id)
    if (idx === -1) list.value.push(id)
    else list.value.splice(idx, 1)
  }

  // --- getters ---
  const pikminCount = computed(() => pikmin.value.length)
  const articleCount = computed(() => article.value.length)
  const totalCount = computed(() => pikminCount.value + articleCount.value)

  return {
    pikmin, article,
    pikminCount, articleCount, totalCount,
    isFavorite, toggle
  }
})
