<template>
  <div class="card-container">
    <div class="figure">
      <span
        class="content-number"
        :style="{ color: computedTextColor }"
      >{{
        contentNumber
      }}</span>
      <span class="unit"> {{ computedUnit }}</span>
    </div>
    <div class="description">
      {{ computedDescription }}
    </div>
  </div>
</template>

<script>
export default {
  name: 'HoursSummaryCard',
  props: {
    type: {
      type: String,
      default: 'hours'
    },
    contentNumber: {
      type: Number,
      default: 0
    }
  },
  computed: {
    computedDescription() {
      if (this.type === 'hours') {
        return 'Total working hours';
      } else if (this.type === 'cost') {
        return 'Total cost';
      }
      return 'hours';
    },
    computedUnit() {
      if (this.type === 'hours') {
        return 'hours';
      } else if (this.type === 'cost') {
        return '$';
      }
      return 'hours';
    },
    computedTextColor() {
      return this.type === 'hours' ? '#F56C6C' : '#007BFF';
    }
  }
};
</script>

<style lang="less" scoped>
.card-container {
  width: 200px;
  height: 93px;
  background: #f5f7fa;
  color: #303133;
  border-radius: 4px;
  display: flex;
  align-items: center;
  flex-direction: column;
  gap: 5px;

  .figure {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    margin-top: 15px;

    .unit {
      font-size: 14px;
      font-family: 'PingFang SC-Medium', 'PingFang SC', sans-serif;
      font-weight: 400;
      color: #606266;
      line-height: 20px;
    }

    .content-number {
      font-size: 28px;
      font-weight: 550;
      line-height: 100%;
      font-family: PingFang SC, PingFang SC;
      color: #f56c6c;
      line-height: 20px;
    }
  }

  .description {
    font-size: 13px;
    font-family: 'PingFang SC-Regular', 'PingFang SC', sans-serif;
    font-weight: 400;
    color: #303133;
    line-height: 19px;
  }
}
</style>
