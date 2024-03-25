<template>
  <div class="status-wrapper">
    <div
      v-for="item in solutionOptions"
      :key="item.value"
      class="options"
      @click="testClick(item)"
    >
      {{ item.label }}
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      solutionOptions: [
        {
          value: 'Harness',
          label: 'Harness'
        },
        {
          value: 'Lynx',
          label: 'Lynx'
        },
        {
          value: 'Alex',
          label: 'Alex'
        }
      ]
    };
  },
  methods: {
    testClick(val) {
      this.$emit('fast-filter', val, this.fastFilterType);
    }
  }
};
</script>

<style lang="less" scoped>
.options {
  width: 90px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  padding-left: 24px;
  color: #606266;

  &:hover {
    cursor: pointer;
    background: #f2f6fc;
    color: #007bff;
  }
}
</style>
