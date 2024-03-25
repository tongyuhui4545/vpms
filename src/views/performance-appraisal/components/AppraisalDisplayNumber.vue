<template>
  <div class="appraisal-display-number-container">
    <div
      class="appraisal-number"
      :style="{ color: computedColor }"
    >
      {{ number }}
    </div>
    <div
      class="little-bar"
      :style="{ background: computedColor }"
    />
  </div>
</template>

<script>
export default {
  props: {
    number: {
      type: [Number, String],
      default: 0
    },
    status: {
      type: String,
      default: 'normal'
    }
  },
  data() {
    return { computedColor: '#67C23A' };
  },
  watch: {
    status: {
      handler (val) {
        if (val === 'normal') {
          this.computedColor = '#67C23A';
        } else if (val === 'hours') {
          this.computedColor = '#007BFF';
        } else if (val === 'worst') {
          this.computedColor = '#F56C6C';
        }
      },
      immediate: true
    }
  }
};
</script>

<style lang="less" scoped>
.appraisal-display-number-container {
  padding: 0;
  margin-bottom: 24px;

  .appraisal-number {
    font-size: 38px;
    font-family: 'PingFang SC-Medium', 'PingFang SC', sans-serif;
    font-weight: 500;
    // color: #67C23A;
  }

  .little-bar {
    width: 32px;
    height: 8px;
    // background: #67C23A;
    border-radius: 4px;
    margin-top: 5px;
  }
}
</style>
