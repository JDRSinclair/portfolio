<template>
    <v-app class="fill-height color-transition" :style="{ background: 'var(--background)' }">
      <v-container fluid class="d-flex justify-center align-center fill-height pa-0">
        <div class="animation-wrapper">
          <canvas ref="canvas" class="animation-canvas"></canvas>
          <div class="text-overlay">
            <h1 class="headline">{{ title }}</h1>
            <h2 class="subheadline">{{ subtitle }}</h2>
          </div>
        </div>
      </v-container>
    </v-app>
  </template>
  
  <script>
  export default {
    name: 'TextBanner',
    props: {
      title: {
        type: String,
        required: true
      },
      subtitle: {
        type: String,
        required: true
      }
    }
  };
  </script>
  
  <script setup>
  import { onMounted, onUnmounted, shallowRef } from 'vue';
  
  const canvas = shallowRef(null);
  let canvasWidth = window.innerWidth;
  let canvasHeight = window.innerHeight;
  let animationArray = [];
  
  /**
   * Extrait les composantes RGB d'une variable CSS (rgb, rgba ou hexadécimal).
   */
  function getColorComponents(variableName) {
    const themeElement =
      document.querySelector('.theme--light, .theme--dark') || document.documentElement;
    const computedStyle = getComputedStyle(themeElement).getPropertyValue(variableName).trim();
  
    if (computedStyle.startsWith('rgba')) {
      const rgba = computedStyle.slice(computedStyle.indexOf('(') + 1, computedStyle.lastIndexOf(')'));
      const parts = rgba.split(',').map(p => parseFloat(p.trim()));
      return { r: parts[0] || 0, g: parts[1] || 0, b: parts[2] || 0 };
    }
    if (computedStyle.startsWith('rgb')) {
      const rgb = computedStyle.slice(computedStyle.indexOf('(') + 1, computedStyle.lastIndexOf(')'));
      const parts = rgb.split(',').map(p => parseFloat(p.trim()));
      return { r: parts[0] || 0, g: parts[1] || 0, b: parts[2] || 0 };
    }
    if (computedStyle.startsWith('#') && computedStyle.length === 7) {
      return {
        r: parseInt(computedStyle.substr(1, 2), 16),
        g: parseInt(computedStyle.substr(3, 2), 16),
        b: parseInt(computedStyle.substr(5, 2), 16)
      };
    }
    return { r: 0, g: 0, b: 0 };
  }
  
  /* === Animation : feuilles tombantes === */
  class Leaf {
    constructor(width, height) {
      this.width = width;
      this.height = height;
      this.reset();
    }
    reset() {
      this.x = Math.random() * this.width;
      this.y = -Math.random() * this.height;
      this.size = Math.random() * 20 + 10;
      this.speedX = Math.random() * 1 - 0.5;
      this.speedY = Math.random() * 1 + 1;
      this.rotation = Math.random() * Math.PI * 2;
      this.rotationSpeed = Math.random() * 0.02 - 0.01;
    }
    update() {
      this.x += this.speedX;
      this.y += this.speedY;
      this.rotation += this.rotationSpeed;
      if (this.y > this.height + this.size) {
        this.reset();
        this.y = -this.size;
      }
    }
    draw(ctx, color) {
      ctx.save();
      ctx.translate(this.x, this.y);
      ctx.rotate(this.rotation);
      ctx.beginPath();
      // Dessine une ellipse représentant une feuille
      ctx.ellipse(0, 0, this.size * 0.6, this.size, 0, 0, Math.PI * 2);
      ctx.fillStyle = color;
      ctx.fill();
      ctx.restore();
    }
  }
  
  /**
   * Initialise l'animation en créant 30 feuilles.
   */
  function initAnimation() {
    animationArray = [];
    for (let i = 0; i < 30; i++) {
      animationArray.push(new Leaf(canvasWidth, canvasHeight));
    }
  }
  
  /**
   * Boucle d'animation.
   */
  function animate(ctx) {
    ctx.clearRect(0, 0, canvasWidth, canvasHeight);
  
    const { r, g, b } = getColorComponents('--primary');
    const fillColor = `rgb(${r}, ${g}, ${b})`;
  
    animationArray.forEach(leaf => {
      leaf.update();
      leaf.draw(ctx, fillColor);
    });
  
    requestAnimationFrame(() => animate(ctx));
  }
  
  onMounted(() => {
    const ctx = canvas.value.getContext('2d');
  
    const setCanvasSize = () => {
      canvasWidth = window.innerWidth;
      canvasHeight = window.innerHeight;
      canvas.value.width = canvasWidth;
      canvas.value.height = canvasHeight;
      initAnimation();
    };
  
    setCanvasSize();
    window.addEventListener('resize', setCanvasSize);
    initAnimation();
    animate(ctx);
  
    onUnmounted(() => {
      window.removeEventListener('resize', setCanvasSize);
    });
  });
  </script>
  
  <style scoped>
  .animation-wrapper {
    position: relative;
    width: 100%;
    height: 100%;
  }
  
  .animation-canvas {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 1;
  }
  
  .text-overlay {
    position: relative;
    z-index: 2;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100%;
  }
  
  .headline {
    font-size: 4rem;
    font-weight: bold;
    color: var(--primary);
    text-align: center;
    text-shadow: 0 0 15px var(--effect-shadow), 0 0 30px var(--effect-shadow);
    margin: 0;
  }
  
  .subheadline {
    font-size: 2rem;
    font-weight: bold;
    color: var(--primary);
    text-align: center;
    text-shadow: 0 0 15px var(--effect-shadow), 0 0 30px var(--effect-shadow);
    margin: 0;
  }
  </style>
  