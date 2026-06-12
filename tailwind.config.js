/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{vue,js}'],
  theme: {
    extend: {
      colors: {
        // 與 SCSS 變數對應的品牌色（Pikmin Bloom 風格）
        leaf: '#5bb318',
        petal: '#ff7eb6',
        sky: '#56b4e9'
      }
    }
  },
  // 避免與 Element Plus 樣式衝突
  corePlugins: { preflight: false },
  plugins: []
}
