<template>
  <div
    @keyup.esc.stop="closeOnEsc"
    class="air-pop-container"
    tabindex="0">

    <div
      class="air-pop-content"
      :style="styles"
      :class="dialogClasses"
      ref="dialog">
      <div class="air-pop-close">
        <button @click="close">
          <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false" style="display: block; fill: rgb(118, 118, 118); height: 16px; width: 16px;">
            <path fill-rule="evenodd" d="M23.25 24a.744.744 0 0 1-.53-.22L12 13.062 1.28 23.782a.75.75 0 0 1-1.06-1.06L10.94 12 .22 1.28A.75.75 0 1 1 1.28.22L12 10.94 22.72.22a.749.749 0 1 1 1.06 1.06L13.062 12l10.72 10.72a.749.749 0 0 1-.53 1.28"></path>
          </svg>
        </button>
      </div>
      <slot></slot>
    </div>

    <div class="air-pop-backdrop"></div>
  </div>
</template>

<script>
  import transitionEndEventName from './transitionEndEventName';

  export default {
    name: 'air-pop',
    props: {
      clickOutsideToClose: {
        type: Boolean,
        default: true,
      },
      escToClose: {
        type: Boolean,
        default: true,
      },
      openFrom: String,
      closeTo: String,
    },
    data() {
      return {
        active: false,
        transitionOff: false,
        dialogTransform: '',
      };
    },
    computed: {
      dialogClasses() {
        return {
          'air-pop-reference': this.openFrom || this.closeTo,
        };
      },
      styles() {
        return {
          transform: this.dialogTransform,
        };
      },
    },
    methods: {
      removeDialog() {
        if (document.body.contains(this.dialogElement)) {
          this.$el.parentNode.removeChild(this.$el);
        }
      },
      calculateDialogPos(ref) {
        const reference = document.querySelector(ref);
        if (reference) {
          const openFromRect = reference.getBoundingClientRect();
          const dialogRect = this.dialogInnerElement.getBoundingClientRect();
          const widthInScale = openFromRect.width / dialogRect.width;
          const heightInScale = openFromRect.height / dialogRect.height;
          const distance = {
            top: -(dialogRect.top - openFromRect.top), // eslint-disable-line
            left: -(dialogRect.left - openFromRect.left + openFromRect.width), // eslint-disable-line
          };
          if (openFromRect.top > dialogRect.top + dialogRect.height) {
            distance.top = openFromRect.top - dialogRect.top;
          }
          if (openFromRect.left > dialogRect.left + dialogRect.width) {
            distance.left = openFromRect.left - dialogRect.left - openFromRect.width;
          }
          this.dialogTransform = `translate3D(${distance.left}px, ${distance.top}px, 0) scale(${widthInScale}, ${heightInScale})`;
        }
      },
      open() {
        document.body.appendChild(this.dialogElement);
        this.transitionOff = true;
        this.calculateDialogPos(this.openFrom);
        window.setTimeout(() => {
          this.dialogElement.focus();
          this.transitionOff = false;
          this.active = true;
        });
        this.$emit('open');
      },
      closeOnEsc() {
        if (this.escToClose) {
          this.close();
        }
      },
      close() {
        if (document.body.contains(this.dialogElement)) {
          this.$nextTick(() => {
            const cleanElement = () => {
              this.dialogInnerElement.removeEventListener(transitionEndEventName, cleanElement);
              document.body.removeChild(this.dialogElement);
              this.dialogTransform = '';
            };
            this.transitionOff = true;
            this.dialogTransform = '';
            this.calculateDialogPos(this.closeTo);
            window.setTimeout(() => {
              this.transitionOff = false;
              this.active = false;
              this.dialogInnerElement.addEventListener(transitionEndEventName, cleanElement);
            });
            this.removeDialog();
            this.$emit('close');
          });
        }
      },
    },
    beforeDestroy() {
      this.removeDialog();
    },
    mounted() {
      this.$nextTick(() => {
        this.dialogElement = this.$el;
        this.dialogInnerElement = this.$refs.dialog;
        this.removeDialog();
      });
    },
  };

</script>

<style>
  .air-pop-container {
    display: -ms-flexbox;
    display: flex;
    flex-flow: column;
    justify-content: center;
    align-items: center;
    pointer-events: none;
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: 8;
    pointer-events: auto;
  }

  .air-pop-content {
    background-color: #ffffff;
    padding: 32px;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
    z-index: 10;
    min-width: 400px;
  }

  .air-pop-close {
    display: flex;
    width: 100%;
    justify-content: start;
    align-items: center;
    margin-bottom: 12px;
  }

  .air-pop-close button {
    background: none;
    background-color: transparent;
    border: none;
    outline: none;
    cursor: pointer;
  }

  .air-pop-backdrop {
    opacity: 1;
    pointer-events: auto;
    position: fixed;
    z-index: 9;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    pointer-events: none;
    background-color: rgba(0, 0, 0, .54);
    transform: translateZ(0);
    transition: all .5s cubic-bezier(.35, 0, .25, 1);
  }
</style>
