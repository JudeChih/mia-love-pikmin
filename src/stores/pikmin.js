import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import rawPikmin from '@/data/pikmin.json'

export const usePikminStore = defineStore('pikmin', () => {
  // --- state ---
  const list = ref([])
  const loading = ref(false)
  const error = ref('')
  const keyword = ref('')       // 關鍵字過濾
  const activeColor = ref('all') // 顏色過濾

  // --- actions ---
  async function load() {
    if (list.value.length) return
    loading.value = true
    error.value = ''
    try {
      await Promise.resolve()
      list.value = rawPikmin
    } catch (e) {
      error.value = '圖鑑資料載入失敗，請稍後再試。'
      console.error('[pikmin] load failed:', e)
    } finally {
      loading.value = false
    }
  }

  function resetFilters() {
    keyword.value = ''
    activeColor.value = 'all'
  }

  // --- getters ---
  const colorOptions = computed(() => {
    const colors = [...new Set(list.value.map((p) => p.color))]
    return ['all', ...colors]
  })

  // 即時過濾：顏色 + 關鍵字（名稱 / 特性 / 標籤）
  const filtered = computed(() => {
    const kw = keyword.value.trim().toLowerCase()
    return list.value.filter((p) => {
      const colorOk = activeColor.value === 'all' || p.color === activeColor.value
      if (!colorOk) return false
      if (!kw) return true
      const haystack = [p.name, ...(p.traits || []), ...(p.tags || [])].join(' ').toLowerCase()
      return haystack.includes(kw)
    })
  })

  return {
    list, loading, error, keyword, activeColor,
    colorOptions, filtered,
    load, resetFilters
  }
})
