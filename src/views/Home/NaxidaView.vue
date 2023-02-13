<template>
  <div class="spine-list">
    <SpineView class="spine-item" v-for="spine in spineList" :key="spine.id" :config="spine" :pathRoot="pathRoot" />
  </div>
</template>

<script setup>
import SpineView from '@/components/SpineView/SpineView.vue';

const spineList = [
  {
    id: 'blue_boy',
    width: 300,
    height: 900,
    scale: 0.5,
    positionY: -100,
  },
  {
    id: 'dog',
    width: 300,
    height: 900,
    scale: 0.5,
  },
  {
    id: 'girl',
    width: 300,
    height: 900,
    scale: 0.5,
    positionY: -100,
  },
  {
    id: 'little_boy',
    width: 300,
    height: 900,
    scale: 0.5,
    positionY: -100,
  },
  {
    id: 'little_girl',
    width: 300,
    height: 900,
    scale: 0.5,
    positionY: -100,
  },
  {
    id: 'naxitan_shouye',
    width: 700,
    height: 500,
    animation: 'animation',
    scale: 0.4,
  },
  {
    id: 'naxitan_Q',
    width: 300,
    height: 700,
    animation: 'speak',
    scale: 0.5,
    positionX: 0,
    positionY: -100,
  },
  {
    id: 'naxida_sleep',
    width: 400,
    height: 400,
    animation: 'sleeping',
    scale: 0.5,
  },
  {
    id: 'loading',
    width: 200,
    height: 500,
    animation: 'animation',
    scale: 0.5,
  },
  {
    id: 'scene_1',
    width: 1000,
    height: 500,
    animation: 'animation',
    scale: 0.3,
  },
  {
    id: 'scene_2',
    width: 600,
    height: 500,
    animation: 'animation',
    scale: 0.3,
  },
  {
    id: 'scene_2_grass',
    width: 600,
    height: 500,
    animation: 'animation',
    scale: 0.3,
  },
  {
    id: 'scene_3',
    width: 600,
    height: 500,
    animation: 'animation',
    scale: 0.3,
  },
  {
    id: 'walk_boy',
    width: 300,
    height: 900,
    scale: 0.5,
    positionY: -100,
  },
  {
    id: 'walk_girl',
    width: 300,
    height: 900,
    scale: 0.5,
    positionY: -100,
  },
  {
    id: 'yelliow_boy',
    width: 300,
    height: 900,
    scale: 0.5,
    positionY: -100,
  },
];

const pathRoot = 'naxida';
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
