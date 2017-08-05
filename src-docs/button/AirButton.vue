<template>
  <a
    v-if="href"
    :href="href"
    :disabled="disabled"
    :target="target"
    :rel="newRel"
    @click="$emit('click', $event)"
    class="air-button">

    <slot></slot>
  </a>

  <button
    v-else
    :type="type"
    :disabled="disabled"
    @click="$emit('click', $event)"
    class="air-button">

    <slot></slot>
  </button>
</template>

<script>
  export default {
    name: 'air-button',
    props: {
      href: String,
      target: String,
      rel: String,
      type: {
        type: String,
        default: 'button',
      },
      disabled: Boolean,
    },
    computed: {
      newRel() {
        if (this.target === '_blank') {
          return this.rel || 'noopener';
        }
        return this.rel;
      },
    },
  };
</script>

<style>
  .air-button {
    background: transparent;
    cursor: pointer;
    transition: background 0.3s, border-color 0.3s, box-shadow 0.3s;
    position: relative;
    display: flex;
    justify-content: center;
    align-content: center;
    text-align: center;
    text-decoration: none;
    border: 1px solid transparent;
    border-radius: 3px;
    font-family: Circular,-apple-system,BlinkMacSystemFont,Roboto,Helvetica Neue,sans-serif;
    font-size: 19px;
    line-height: 22px;
    padding-top: 12px;
    padding-bottom: 12px;
    color: #484848;
    font-weight: 400;
    padding-right: 24px;
    padding-left: 24px;
    outline: none;
    height: 52px;
  }

  .air-button.full-width {
    width: 100%;
  }

  .air-button.button-default {
    background: #FFF;
    border: 1px solid #484848;
  }

  .button-default.button-outline {
    color: #484848;
    background: transparent;
  }

  .air-button.button-primary {
    color: #FFF;
    background: #5b7ec7;
    border: 1px solid #5b7ec7;
  }

  .button-primary.button-outline {
    color: #5b7ec7;
    background: transparent;
  }


  .air-button.button-danger {
    color: #FFF;
    background: #FF5A5F;
    border: 1px solid #FF5A5F;
  }

  .button-danger.button-outline {
    color: #FF5A5F;
    background: transparent;
  }

  .air-button.button-outline {
    background-color: transparent;
  }

</style>
