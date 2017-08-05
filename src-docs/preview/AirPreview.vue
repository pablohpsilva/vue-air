<template>
  <div
    :class="classShape"
    class="air-preview-container">
    <div
      :style="carouselStyle"
      class="air-preview-image"></div>

    <div
      v-if="hasCarousel"
      class="air-preview-control">
      <div class="control-left">
        <air-button @click="movePrevious">
          <svg viewBox="0 0 18 18" role="img" aria-label="Previous" focusable="false" style="display:block;fill:#ffffff;height:24px;width:24px;"
            data-reactid="305">
            <path fill-rule="evenodd" d="M13.703 16.293a1 1 0 1 1-1.415 1.414l-7.995-8a1 1 0 0 1 0-1.414l7.995-8a1 1 0 1 1 1.415 1.414L6.413 9l7.29 7.293z"
              data-reactid="306"></path>
          </svg>
        </air-button>
      </div>

      <div class="control-right">
        <air-button @click="moveNext">
          <svg viewBox="0 0 18 18" role="img" aria-label="Next" focusable="false" style="display:block;fill:#ffffff;height:24px;width:24px;"
            data-reactid="309">
            <path fill-rule="evenodd" d="M4.293 1.707A1 1 0 1 1 5.708.293l7.995 8a1 1 0 0 1 0 1.414l-7.995 8a1 1 0 1 1-1.415-1.414L11.583 9l-7.29-7.293z"
              data-reactid="310"></path>
          </svg>
        </air-button>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'air-preview',
    props: {
      preview: [String, Array],
      squared: {
        type: Boolean,
        default: false,
      },
    },
    data() {
      return {
        carouselIndex: 0,
      };
    },
    computed: {
      classShape() {
        return {
          squared: this.squared,
          rectangled: !this.squared,
        };
      },
      hasCarousel() {
        return this.preview instanceof Array;
      },
      carouselImage() {
        return this.hasCarousel
          ? this.preview[this.carouselIndex]
          : this.preview;
      },
      carouselStyle() {
        return {
          'background-image': `url('${this.carouselImage}')`,
        };
      },
    },
    methods: {
      movePrevious() {
        const previous = this.carouselIndex - 1;
        this.carouselIndex = (previous <= 0)
          ? 0
          : previous;
      },
      moveNext() {
        const next = this.carouselIndex + 1;
        this.carouselIndex = (next >= this.preview.length)
          ? this.preview.length - 1
          : next;
      },
    },
  };

</script>

<style>
  .air-preview-container {
    position: relative;
    display: flex;
    justify-content: space-around;
    align-content: center;
    flex-direction: column;
  }

  .air-preview-container.squared,
  .air-preview-image {
    min-width: 212px;
    min-height: 212px;
  }

  .air-preview-container.rectangled,
  .air-preview-image {
    min-width: 192px;
    min-height: 212px;
  }

  .air-preview-image {
    background-position: center;
    background-size: cover;
    background-repeat: no-repeat;
  }

  .air-preview-control {
    display: flex;
    justify-content: space-between;
    flex-direction: row;
    width: 100%;
    height: 100%;
    min-height: 25px;
    position: absolute;
    top: 0;
    left: 0;
  }

  .air-preview-control .control-left,
  .air-preview-control .control-right {
    display: flex;
    align-items: center;
    justify-content: center;
  }
</style>
