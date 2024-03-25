<template>
  <div class="status-wrapper">
    <div
      v-for="item in quoteStatusOptions"
      :key="item.value"
      class="options"
      @click="testClick(item)"
    >
      <span style="margin-right: 2px">
        {{ item.label }}
      </span>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      quoteStatusOptions: [
        {
          label: 'Pending US engineer review',
          value: 'US_TO_BE_SEND'
        },
        {
          label: 'Pending assign design team',
          value: 'US_HAS_BEEN_SEND'
        },
        {
          label: 'Team assigned & Pending quote',
          value: 'CN_ASSIGNED'
        },
        {
          label: 'Quote submited & Pending CN approval',
          value: 'CN_TEAM_ALREADY_APPLIED'
        },
        {
          label: 'Quote rejected & Pending re-quote',
          value: 'CN_REJECTED'
        },
        {
          label: 'Pending US approval',
          value: 'CN_PASSED'
        },
        {
          label: 'US engineer rejected',
          value: 'US_REJECTED'
        },
        {
          label: 'Quote released',
          value: 'US_PASSED'
        },
        {
          label: 'Quote sent',
          value: 'QUOTE_SENT'
        },
        {
          label: 'Win & Pending US engineer final review',
          value: 'WIN'
        },
        {
          label: 'Final review approval',
          value: 'US_FINAL_PASSED'
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
  width: 280px;
  white-space: nowrap;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  padding-left: 24px;
  padding-right: 2px;
  color: #606266;

  &:hover {
    cursor: pointer;
    background: #f2f6fc;
    color: #007bff;
  }
}
</style>
