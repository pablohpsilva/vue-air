<template>
  <div class="air-showcase-container">
    <slot name="preview"></slot>

    <slot name="info"></slot>
  </div>
</template>

<script>
  export default {
    name: 'air-showcase',
  };
</script>

<style>
  .air-showcase-container {
    display: block;
    min-width: 200px;
    min-height: 100px;
  }
</style>
