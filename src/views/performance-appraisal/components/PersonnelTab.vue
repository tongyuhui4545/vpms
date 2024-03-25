<template>
  <div
    class="personnel-tab-container"
    :class="{ activated: tab.chosen }"
    @click="handleClickTab"
  >
    {{ tab.text }}
  </div>
</template>

<script>
export default {
  name: 'PersonnelTab',
  props: {
    tab: {
      type: Object,
      default: () => {
        return {};
      }
    }
  },
  methods: {
    handleClickTab() {
      this.$emit('click-tab', this.tab);
    }
  }
};
</script>

<style lang="less" scoped>
.personnel-tab-container {
  font-family: 'PingFang SC-Regular', 'PingFang SC', sans-serif;
  width: 160px;
  height: 32px;
  padding: 0;
  border-radius: 4px 0 0 4px;
  opacity: 1;
  font-size: 14px;
  font-weight: 500;
  color: #303133;
  line-height: 0px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;

  &.activated {
    color: #409eff;
  }
}
</style>
