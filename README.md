# Pikmin Bloom 新手入門教學站（平衡版）

純前端教學站，提供 **分類教學 + 皮克敏圖鑑 + 即時搜尋／過濾**。給新手（例如你太太）隨時查閱 Pikmin Bloom 的玩法機制。

## 技術棧

- **Vue 3**（Composition API, `<script setup>`）
- **Vite 5** 建構工具
- **Pinia** 狀態管理（搜尋／過濾狀態集中管理）
- **Vue Router**（hash 模式，靜態託管免設定 rewrite）
- **Element Plus**（按需引入 auto-import）
- **SCSS**（變數 / mixin 階層式樣式）+ **Tailwind CSS**（快速佈局）

## 專案結構

```
src/
├─ data/          # 內容資料（articles.json 教學、pikmin.json 圖鑑）
├─ stores/        # Pinia：articles.js / pikmin.js（含 loading、error 防呆）
├─ components/    # 卡片、Loading、空狀態等可重用元件
├─ views/         # 頁面：首頁 / 分類 / 內文 / 圖鑑 / 404
├─ router/        # 路由設定
└─ styles/        # _variables.scss / _mixins.scss / main.scss
```

## 本地開發

```bash
npm install
npm run dev      # 開發伺服器
npm run build    # 產出 dist/
npm run preview  # 預覽 build 結果
```

## 新增 / 修改教學內容

直接編輯 `src/data/articles.json`：每篇文章含 `id`、`category`、`title`、`summary`、`tags`、`sections`（每段可帶 `tips`）。
分類定義在 `src/stores/articles.js` 的 `CATEGORIES`，要新增分類在此擴充即可。

圖鑑資料在 `src/data/pikmin.json`，依顏色／特性／標籤即時過濾。

## 部署

### Netlify（推薦）
1. 把專案推到 GitHub。
2. Netlify → New site → 選 repo。
3. Build command：`npm run build`；Publish directory：`dist`。
4. 已附 `netlify.toml`，可直接讀取設定。

### GitHub Pages
1. 把 `vite.config.js` 的 `base` 改成 `'/<你的 repo 名稱>/'`。
2. `npm run build`，將 `dist/` 內容推到 `gh-pages` 分支。

> 採用 hash 路由（`/#/article/...`），重新整理不會 404，靜態託管零設定。

## 內容正確性

教學內容已對照 Pikmin Bloom 實際機制校正（遠征 Lv3 解鎖、蘑菇 Lv8／每日 3 次、花苗步數門檻、飾品需友好度 4 心特殊遠征等）。遊戲會持續更新，建議定期回頭校對。

## 後續可擴充（升級到激進版）

- 串接 Headless CMS（如 Supabase）做後台內容管理
- 收藏 / 進度記錄 / 留言互動
- 圖鑑加入官方或自繪圖片
