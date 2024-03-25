<template>
  <div class="status-wrapper">
    <div
      v-for="item in designingStatusOptions"
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
      designingStatusOptions: [
        {
          value: 'FORMAL_ASSIGNED_TEAM',
          label: 'Pending assign label team'
        },
        {
          value: 'FORMAL_DESIGN_LABEL',
          label: 'Team assigned & Pending label file'
        },
        {
          value: 'FORMAL_LABEL_SEND',
          label: 'Label file submited & Pending approval'
        },
        {
          value: 'FORMAL_LABEL_REJECTED',
          label: 'Label file rejected & Pending re-label'
        },
        {
          value: 'FORMAL_LABEL_RELEASED',
          label: 'Label file released'
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
.status-wrapper {
  .options {
  width: 270px;
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
