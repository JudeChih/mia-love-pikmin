<script setup>
import { computed } from 'vue'

// 原創 SVG 角色插圖（非任何既有作品，避免版權問題）
// 依皮克敏資料的顏色與類型繪製：可愛芽寶造型 + 不同頭飾/特徵
const props = defineProps({
  pikmin: { type: Object, required: true },
  size: { type: Number, default: 96 }
})

const accent = computed(() => props.pikmin.colorHex || '#5bb318')
const color = computed(() => props.pikmin.color)

// 依顏色微調肚子亮色（淺一階）
const belly = computed(() => `${accent.value}33`)
</script>

<template>
  <svg
    :width="size" :height="size" viewBox="0 0 100 100"
    role="img" :aria-label="pikmin.name" class="pikmin-avatar"
  >
    <!-- 影子 -->
    <ellipse cx="50" cy="90" rx="24" ry="5" fill="#000" opacity="0.08" />

    <!-- 粉色羽毛：身體兩側翅膀 -->
    <g v-if="color === 'pink'" opacity="0.9">
      <ellipse cx="20" cy="58" rx="12" ry="7" fill="#ffd6e8" transform="rotate(-20 20 58)" />
      <ellipse cx="80" cy="58" rx="12" ry="7" fill="#ffd6e8" transform="rotate(20 80 58)" />
    </g>

    <!-- 腳 -->
    <ellipse cx="40" cy="86" rx="6" ry="4" :fill="accent" />
    <ellipse cx="60" cy="86" rx="6" ry="4" :fill="accent" />

    <!-- 身體 -->
    <ellipse cx="50" cy="62" rx="26" ry="25" :fill="accent" />
    <!-- 肚子亮塊 -->
    <ellipse cx="50" cy="66" rx="16" ry="15" :fill="belly" />

    <!-- 灰色岩石：身上紋路 -->
    <g v-if="color === 'gray'" stroke="#0000001a" stroke-width="2" fill="none">
      <path d="M38 55 L46 62 L40 70" />
      <path d="M62 52 L56 60 L64 66" />
    </g>

    <!-- 眼睛 -->
    <ellipse cx="42" cy="58" rx="5.5" ry="6.5" fill="#fff" />
    <ellipse cx="58" cy="58" rx="5.5" ry="6.5" fill="#fff" />
    <circle cx="42.5" cy="59" r="2.8" fill="#2c2c2c" />
    <circle cx="58.5" cy="59" r="2.8" fill="#2c2c2c" />
    <circle cx="43.5" cy="58" r="0.9" fill="#fff" />
    <circle cx="59.5" cy="58" r="0.9" fill="#fff" />

    <!-- 腮紅 -->
    <ellipse cx="34" cy="66" rx="3.5" ry="2.2" fill="#ff9bbd" opacity="0.7" />
    <ellipse cx="66" cy="66" rx="3.5" ry="2.2" fill="#ff9bbd" opacity="0.7" />

    <!-- 莖 -->
    <rect x="48.5" y="20" width="3" height="20" rx="1.5" fill="#4a8c1c" />

    <!-- 頭飾：白色用花、紫色用花苞、其餘用葉子 -->
    <g v-if="color === 'white'">
      <!-- 五瓣花 -->
      <g fill="#fff" stroke="#ffd54a" stroke-width="1">
        <circle cx="50" cy="12" r="5" />
        <circle cx="42" cy="17" r="5" />
        <circle cx="58" cy="17" r="5" />
        <circle cx="45" cy="25" r="5" />
        <circle cx="55" cy="25" r="5" />
      </g>
      <circle cx="50" cy="19" r="4" fill="#ffcf3f" />
    </g>
    <g v-else-if="color === 'purple'">
      <!-- 花苞 -->
      <ellipse cx="50" cy="16" rx="7" ry="10" fill="#7d3fae" />
      <path d="M50 6 q5 6 0 14 q-5 -8 0 -14" fill="#9b59b6" />
    </g>
    <g v-else>
      <!-- 葉子（兩片）-->
      <path d="M50 22 q-16 -4 -18 -18 q14 0 18 14 z" fill="#5bb318" />
      <path d="M50 22 q16 -4 18 -18 q-14 0 -18 14 z" fill="#6fc92a" />
    </g>
  </svg>
</template>

<style scoped>
.pikmin-avatar { display: block; }
</style>
