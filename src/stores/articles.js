import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import rawArticles from '@/data/articles.json'

// 教學分類定義（顯示順序與圖示集中管理，方便擴充）
const CATEGORIES = [
  { key: 'expedition', label: '遠征攻略', emoji: '🍄', desc: '派皮克敏出任務、打蘑菇' },
  { key: 'flower', label: '種花瓣與賞花', emoji: '🌸', desc: '花瓣來源、種花賺獎勵' },
  { key: 'seedling', label: '幼苗培養', emoji: '🌱', desc: '花苗養成、步數門檻' },
  { key: 'walk', label: '散步與步數', emoji: '👣', desc: '每日習慣、好友互動' },
  { key: 'decor', label: '裝飾品', emoji: '🎀', desc: '友好度與特殊遠征' },
  { key: 'faq', label: '常見問題', emoji: '❓', desc: '新手最常卡關解答' }
]

export const useArticlesStore = defineStore('articles', () => {
  // --- state ---
  const articles = ref([])
  const loading = ref(false)
  const error = ref('')
  const keyword = ref('')

  // --- actions ---
  // 模擬非同步載入，並以 try-catch 做錯誤防呆（未來換成 API 時介面不變）
  async function load() {
    if (articles.value.length) return // 已載入則略過，避免重複
    loading.value = true
    error.value = ''
    try {
      // 此處資料為本地 JSON；保留 await 介面以便日後串接後端
      await Promise.resolve()
      articles.value = rawArticles
    } catch (e) {
      error.value = '教學資料載入失敗，請稍後再試。'
      console.error('[articles] load failed:', e)
    } finally {
      loading.value = false
    }
  }

  // --- getters ---
  const categories = computed(() =>
    CATEGORIES.map((c) => ({
      ...c,
      count: articles.value.filter((a) => a.category === c.key).length
    }))
  )

  const getByCategory = (cat) =>
    articles.value.filter((a) => a.category === cat)

  const getById = (id) => articles.value.find((a) => a.id === id) || null

  const categoryMeta = (cat) => CATEGORIES.find((c) => c.key === cat) || null

  // 全站關鍵字搜尋（標題 / 摘要 / 標籤）
  const searchResults = computed(() => {
    const kw = keyword.value.trim().toLowerCase()
    if (!kw) return []
    return articles.value.filter((a) => {
      const haystack = [a.title, a.summary, ...(a.tags || [])].join(' ').toLowerCase()
      return haystack.includes(kw)
    })
  })

  return {
    articles, loading, error, keyword,
    categories, searchResults,
    load, getByCategory, getById, categoryMeta
  }
})
