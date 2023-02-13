<template>
  <div class="spine-list">
    <SpineView class="spine-item" v-for="spine in spineList" :key="spine.id" :config="spine" :pathRoot="pathRoot" />
  </div>
</template>

<script setup>
import SpineView from '@/components/SpineView/SpineView.vue';

const spineList = [
  {
    id: 'mengde_p10_fiexieer',
    width: 300,
    height: 500,
    scale: 0.6,
  },
  {
    id: 'mengde_p10_mona',
    width: 300,
    height: 500,
    scale: 0.6,
  },
  {
    id: 'mengde_p13_keli',
    width: 300,
    height: 500,
    scale: 0.9,
    positionY: -100,
  },
];

const pathRoot = 'hyxc';
</script>

<style lang="scss" scoped>
.spine-list {
  height: 100vh;
  display: flex;
  .spine-item {
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    // flex-wrap: wrap;
    justify-content: center;
    // align-content: center;
  }
}
</style>
