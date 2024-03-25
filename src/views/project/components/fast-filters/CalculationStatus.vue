<template>
  <div class="status-wrapper">
    <div
      v-for="item in simulationStatusOptions"
      :key="item.value"
      class="options"
      @click="testClick(item)"
    >
      {{ item.label }}
    </div>
  </div>
</template>

<script>
import { CALCULATION_STATUS_LIST } from '@/utils/constants';
export default {
  data() {
    return {
      simulationStatusOptions: CALCULATION_STATUS_LIST
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
.status-wrapper {
  max-height: 280px;
  overflow-y: auto;
  .options {
  min-width: 150px;
  white-space: nowrap;
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
}

</style>
