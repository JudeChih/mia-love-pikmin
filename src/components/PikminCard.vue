<script setup>
import PikminAvatar from '@/components/PikminAvatar.vue'
import FavoriteButton from '@/components/FavoriteButton.vue'

// 皮克敏圖鑑卡片
defineProps({
  pikmin: { type: Object, required: true }
})
</script>

<template>
  <div class="pikmin-card" :style="{ '--accent': pikmin.colorHex }">
    <FavoriteButton type="pikmin" :id="pikmin.id" class="pikmin-card__fav" />

    <div class="pikmin-card__head">
      <PikminAvatar :pikmin="pikmin" :size="72" />
      <div>
        <h3 class="pikmin-card__name">{{ pikmin.name }}</h3>
        <p class="pikmin-card__weight">{{ pikmin.weightHint }}</p>
      </div>
    </div>

    <ul class="pikmin-card__traits">
      <li v-for="t in pikmin.traits" :key="t">{{ t }}</li>
    </ul>
    <p class="pikmin-card__decor">🎀 {{ pikmin.decorNote }}</p>
    <div class="pikmin-card__tags">
      <el-tag v-for="tag in pikmin.tags" :key="tag" size="small" effect="plain" round>
        #{{ tag }}
      </el-tag>
    </div>
  </div>
</template>

<style scoped lang="scss">
@use '@/styles/variables' as *;
@use '@/styles/mixins' as *;

.pikmin-card {
  @include card-base;
  position: relative;
  padding: 18px;
  border-top: 4px solid var(--accent, $color-leaf);

  &:hover { transform: translateY(-3px); box-shadow: $shadow-hover; }

  &__fav { position: absolute; top: 12px; right: 12px; z-index: 1; }

  &__head { display: flex; align-items: center; gap: 12px; margin-bottom: 10px; }
  &__name { margin: 0 0 2px; font-size: 1.05rem; color: $color-text; }
  &__weight { margin: 0; font-size: 0.8rem; color: $color-text-muted; }
  &__traits {
    margin: 0 0 10px;
    padding-left: 18px;
    font-size: 0.85rem;
    color: $color-text;
    li { margin-bottom: 4px; }
  }
  &__decor { margin: 0 0 10px; font-size: 0.82rem; color: $color-text-muted; }
  &__tags { display: flex; flex-wrap: wrap; gap: 6px; }
}
</style>
