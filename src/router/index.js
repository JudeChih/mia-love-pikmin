import { createRouter, createWebHashHistory } from 'vue-router'

// 使用 hash 模式：靜態託管（GitHub Pages / Netlify）免設定 rewrite 即可正常重新整理
const routes = [
  { path: '/', name: 'home', component: () => import('@/views/HomeView.vue') },
  { path: '/category/:category', name: 'category', component: () => import('@/views/CategoryView.vue'), props: true },
  { path: '/article/:id', name: 'article', component: () => import('@/views/ArticleView.vue'), props: true },
  { path: '/pikdex', name: 'pikdex', component: () => import('@/views/PikdexView.vue') },
  { path: '/favorites', name: 'favorites', component: () => import('@/views/FavoritesView.vue') },
  { path: '/:pathMatch(.*)*', name: 'not-found', component: () => import('@/views/NotFoundView.vue') }
]

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes,
  scrollBehavior: () => ({ top: 0 })
})

export default router
