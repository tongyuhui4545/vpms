<template>
  <div class="customized-tab-container">
    <div
      v-for="tab in tabs"
      :key="tab.id"
      class="customized-tab"
    >
      <div
        class="tab-title"
        :class="{ active: tab.active }"
        @click="handleClickTab(tab)"
      >
        <p>{{ tab.title }}</p>
        <span class="dot" />
        <p>{{ tab.number }}</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    tabs: {
      type: Array,
      default: () => {
        return [];
      }
    }
  },
  data() {
    return {
      tabNums: []
    };
  },
  methods: {
    handleClickTab(tab) {
      this.$emit('tab-clicked', tab);
    }
  }
};
</script>

<style lang="less" scoped>
/* stylelint-disable-next-line import-notation */
@import '@/css/variables.less';

.customized-tab-container {
  display: flex;
  align-items: center;
  justify-content: flex-start;

  .customized-tab {
    height: 35px;
    padding: 5px 12px;
    background: #fff;
    border-radius: 4px 4px 0 0;
    border: 1px solid #eee;
    border-bottom: none;
    display: flex;
    align-items: center;
    justify-content: center;

    .tab-title {
      font-family: @font-family;
      font-size: 16px;
      line-height: 20px;
      font-weight: 530;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;

      .dot {
        width: 2px;
        height: 2px;
        background-color: #000;
        border-radius: 50%;
        margin: 0 5px;
        
        /* 调整点与文字之间的间距 */
      }
    }

    .active {
      color: #007bff;
    }
  }
}
</style>
