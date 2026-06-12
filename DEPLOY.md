# 部署說明（GitHub + Netlify 自動部署）

本專案已透過 **GitHub + Netlify** 自動部署。

- 正式網址：<https://mia-pikmin.netlify.app/>
- 部署方式：推送到 GitHub `main` 分支 → Netlify 自動建置並上線

---

## 一、日常更新流程（最常用）

改完內容後，在專案資料夾開終端機執行：

```bash
git add .
git commit -m "更新教學內容"
git push
```

推送後 Netlify 會自動偵測、重新建置（`npm ci` + `npm run build`），約 1～2 分鐘後網站更新，**網址不變**。

> 想看部署進度：登入 Netlify → 進入站台 → Deploys 分頁。
> 綠色 **Published** = 成功；紅色 **Failed** = 失敗，點進去看 log。

---

## 二、本機開發

```bash
npm install      # 第一次或換電腦時
npm run dev      # 本機開發伺服器（會給 localhost 網址）
npm run build    # 產出 dist/（Netlify 會自己跑，本機通常不需手動）
npm run preview  # 預覽 build 結果
```

---

## 三、Netlify 建置設定（已設定好，供參考）

設定來源：專案根目錄的 `netlify.toml`

| 項目 | 值 |
| --- | --- |
| Branch to deploy | `main` |
| Base directory | （留空） |
| Build command | `npm run build` |
| Publish directory | `dist` |
| Node 版本 | 20（由 `netlify.toml` 指定） |

> `dist/` 與 `node_modules/` 已列入 `.gitignore`，不會上傳；Netlify 建置時會自行產生。

---

## 四、改網站名稱 / 網址

Netlify → 站台 → **Site configuration → Change site name**，
例如改成 `pikmin-bloom-guide`，網址即變為 `https://pikmin-bloom-guide.netlify.app`。

（進階）若要綁自有網域：Site configuration → Domain management → Add custom domain。

---

## 五、常見問題

- **Push 要求登入**：第一次 push 用瀏覽器授權 GitHub，或建立 Personal Access Token 當密碼。
- **Netlify 建置 Failed**：多半是程式碼有錯。先在本機 `npm run build` 跑一次，能過再 push。
- **重新整理頁面正常、點擊切換正常**：本站使用 hash 路由（網址含 `#`），靜態託管免額外設定。

---

## 六、技術棧速記

Vue 3（`<script setup>`）+ Vite + Pinia + Vue Router（hash 模式）+ Element Plus + SCSS / Tailwind。
內容資料在 `src/data/`（`articles.json` 教學、`pikmin.json` 圖鑑），改這兩個檔即可更新內容。
