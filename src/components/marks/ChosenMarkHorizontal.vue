<template>
  <div class="container">
    <div :style="markStyle" />
  </div>
</template>

<script>
export default {
  props: {
    width: {
      type: Number,
      default: 64
    },
    height: {
      type: Number,
      default: 4
    },
    color: {
      type: String,
      default: '#007BFF'
    }
  },
  computed: {
    markStyle() {
      return {
        width: `${this.width}px`,
        height: `${this.height}px`,
        backgroundColor: this.color,
        'border-radius': '4px'
      };
    }
  }
};
</script>
