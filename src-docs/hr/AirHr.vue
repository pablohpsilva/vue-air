<template>
  <div class="air-hr-container">
    <hr
      class="air-hr"
      :class="lineClass"/>
    <span v-if="text"
      class="air-hr-text"
      :class="spanClass"
      v-text="text"></span>
  </div>
</template>

<script>
  export default {
    name: 'air-hr',
    props: {
      text: {},
      lineClass: [String, Array, Object],
      spanClass: [String, Array, Object],
    },
    data() {
      return {};
    },
  };
</script>

<style>
  .air-hr-container {
    margin: 16px 0;
    height: 20px;
    position: relative;
    display: flex;
    justify-content: center;
    align-content: center;
  }

  .air-hr {
    width: 100%;
    border: 1px solid #e4e4e4;
    border-bottom: 0px solid #e4e4e4;
  }

  .air-hr-text {
    position: absolute;
    z-index: 5;
    top: -4px;
    background: white;
    padding: 0 10px;
  }
</style>
