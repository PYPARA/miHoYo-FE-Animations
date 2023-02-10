<template>
  <div class="spine-list">
    <SpineView class="spine-item" v-for="spine in spineList" :key="spine.id" :config="spine" />
  </div>
</template>

<script setup>
import SpineView from '@/components/SpineView/SpineView.vue';

const spineList = [
  {
    id: 'naxitan_shouye',
    width: 700,
    height: 500,
    animation: 'animation',
    scale: 0.4,
  },
  {
    id: 'naxitan_Q',
    width: 700,
    height: 1000,
    animation: 'speak',
    scale: 0.5,
  },
];
</script>

<style lang="scss" scoped>
.spine-list {
  height: 100vh;
  display: flex;
  .spine-item {
    height: 100%;
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    justify-content: center;
    align-content: center;
  }
}
</style>
