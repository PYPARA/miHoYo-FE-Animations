<template>
  <div class="canvas-container" ref="spineRef">
    <el-select v-model="animation" class="animation-select" placeholder="Select" size="large">
      <el-option
        v-for="item in animationList"
        :key="item"
        :label="item"
        :value="item"
        @change="animationChange"
      />
    </el-select>
  </div>
  
</template>

<script setup>
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import * as spine from "@esotericsoftware/spine-threejs";
import { AutoBone, BoneSpeedConfig } from './mhy_spine.ts';
import { ref, onMounted } from 'vue';
import { Color } from 'three';
// spine test

const spineRef = ref(null);
const props = defineProps({
  config: {
    type: Object,
    default: () => {},
  },
});

let scene, camera, renderer;
let geometry, material, mesh, skeletonMesh;
let assetManager;
let canvas;
let controls;
let lastFrameTime = Date.now() / 1000;

let spineName = 'naxitan_shouye';
let baseUrl = `/assets/${spineName}/`;
let skeletonFile = `${spineName}.json`;
let atlasFile = `${spineName}.atlas`;
let animation = ref('');
let width = 700;
let height = 500;
let scale = 1;
const animationList = ref([]);

onMounted(() => {
  getConfig();
  initSpine();
});

const getConfig = () => {
  spineName = props.config.id;
  baseUrl = `/assets/${spineName}/`;
  skeletonFile = `${spineName}.json`;
  atlasFile = `${spineName}.atlas`;
  animation.value = props.config.animation;
  width = props.config.width;
  height = props.config.height;
  scale = props.config.scale;
};

const initThree = () => {
  // let width = window.innerWidth, height = window.innerHeight;
  camera = new THREE.PerspectiveCamera(75, width / height, 1, 3000);
  camera.position.y = 100;
  camera.position.z = 400;
  scene = new THREE.Scene();
  scene.background = new THREE.Color('#242424');
  renderer = new THREE.WebGLRenderer();
  renderer.setSize(width, height);
  spineRef.value.appendChild(renderer.domElement);
  // document.body.appendChild(renderer.domElement);
  canvas = renderer.domElement;
  controls = new OrbitControls(camera, renderer.domElement);
};

const initSpine = () => {
  initThree();

  assetManager = new spine.AssetManager(baseUrl);
  assetManager.loadText(skeletonFile);
  assetManager.loadTextureAtlas(atlasFile);

  requestAnimationFrame(load);
};

function load() {
  if (assetManager.isLoadingComplete()) {
    
    geometry = new THREE.BoxGeometry(200, 200, 200);
    material = new THREE.MeshBasicMaterial({ color: '0xff0000', wireframe: true });
    mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    let atlas = assetManager.require(atlasFile);
    let atlasLoader = new spine.AtlasAttachmentLoader(atlas);
    let skeletonJson = new spine.SkeletonJson(atlasLoader);
    skeletonJson.scale = scale || 1;

    let skeleton = JSON.parse(assetManager.require(skeletonFile));
    let skeletonData = skeletonJson.readSkeletonData(skeleton);

    //  ---------- mihoyo start ----------
    skeletonData.extra = skeleton.extra || {};
    skeletonData.extraConfig = skeleton.extraConfig || {};
    //  ---------- mihoyo end ----------
    
    skeletonMesh = new spine.SkeletonMesh(skeletonData, (parameters) => {
      // parameters.depthTest = true;
      // parameters.depthWrite = true;
      // parameters.alphaTest = 0.001;
    });

    //  ---------- mihoyo start ----------
    // 添加 AutoBone
    skeletonMesh.autoBone = Object.values(skeletonData.extra || {}).map(value => {
      return new AutoBone(value, skeletonMesh);
    });

    // 添加 BoneSpeedConfig
    skeletonMesh.autoBoneSpeed = new BoneSpeedConfig(skeletonData.extraConfig || {});

    //  ---------- mihoyo end ----------

    console.log(Object.keys(skeleton.animations));
    animationList.value = Object.keys(skeleton.animations);
    if(!animation.value && animationList.value.length) {
      animation.value = animationList.value[0];
    }

    skeletonMesh.state.setAnimation(0, animation.value, true);
    mesh.add(skeletonMesh);

    requestAnimationFrame(render);
  } else requestAnimationFrame(load);
}

function render() {
  // calculate delta time for animation purposes
  let now = Date.now() / 1000;
  let delta = now - lastFrameTime;
  lastFrameTime = now;

  // resize canvas to use full page, adjust camera/renderer
  // resize();

  // Update orbital controls
  controls.update();

  // update the animation
  skeletonMesh.update(delta);

  //  ---------- mihoyo start ----------
  let i = 1;
  let a = null;
  const o = lastFrameTime * skeletonMesh.autoBoneSpeed.timeScale * skeletonMesh.state.timeScale;

  if (skeletonMesh.state.tracks.length) {
    i = skeletonMesh.state.tracks[0].mixDuration ? Math.min(1, skeletonMesh.state.tracks[0].mixTime / skeletonMesh.state.tracks[0].mixDuration) : 1;

    if (i < 1 && skeletonMesh.state.tracks[0].mixingFrom) {
      a = skeletonMesh.state.tracks[0].mixingFrom.animation.name;
    }
  }

  const s = Math.min(2, Math.abs(o - skeletonMesh.prevTime) / .0167);

  skeletonMesh.prevTime = o;

  skeletonMesh.autoBone.forEach(bone => bone.render(s, o, i, a));
  //  ---------- mihoyo end ----------

  // render the scene
  renderer.render(scene, camera);

  requestAnimationFrame(render);
}

function resize() {
  let w = window.innerWidth;
  let h = window.innerHeight;
  if (canvas.width != w || canvas.height != h) {
    canvas.width = w;
    canvas.height = h;
  }

  camera.aspect = w / h;
  camera.updateProjectionMatrix();

  renderer.setSize(w, h);
}

const animationChange = (val) => {
  animation.value = val;
  // skeletonMesh.state.clearTrack(0);
  // skeletonMesh.state.setAnimation(0, animation.value, true);
  // requestAnimationFrame(render);
};
</script>

<style scoped lang="scss">
</style>
