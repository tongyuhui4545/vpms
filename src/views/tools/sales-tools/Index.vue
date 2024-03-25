<template>
  <div class="container">
    <div class="left-column">
      <div class="title">
        <img
          src="@/assets/IconDesigns/Sales_tools.png"
          alt=""
          class="sales-tools-logo"
        >
        <span class="sales-tools-text">Sales Tools</span>
      </div>
      <div
        v-for="option in options"
        :key="option.text"
        :class="['option', { 'selected-option': atOption === option.text }]"
        @click="handleOption(option)"
      >
        <span class="option-text">
          {{ option.text }}
        </span>
      </div>
    </div>
    <div class="right-column">
      <router-view />
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      atOption: 'Cable Segment',
      options: [
        {
          text: 'Cable Segment',
          route: '/tools/supporting-sales/cable-segment'
        }
        // {
        //   text: "Sales Tool2",
        //   route: "/tools/supporting-sales/cable-segment",
        // },
        // {
        //   text: "Sales Tool3",
        //   route: "/tools/supporting-sales/cable-segment",
        // },
        // {
        //   text: "Sales Tool4",
        //   route: "/tools/supporting-sales/cable-segment",
        // },
      ]
    };
  },
  methods: {
    handleOption(option) {
      this.atOption = option.text;
      this.$router.push(option.route);
    }
  }
};
</script>

<style lang="less" scoped>
.option-text {
  margin-left: 43px;
}

.container {
  overflow-x: auto;
  display: flex;
  padding: 0;

  .left-column,
  .right-column {
    min-height: 80vh;
    background: #fff;
    border-radius: 8px;
    border: 1px solid #f0f0f3;
    padding: 30px 30px 30px 0;
  }

  .left-column {
    flex: 0 0 200px;

    .title {
      display: flex;
      align-items: center;
      justify-content: flex-start;
      margin-top: -12px;

      .sales-tools-logo {
        margin-left: 30px;
        width: 20px;
        height: 20px;
      }

      .sales-tools-text {
        margin-left: 10px;
        font-family: 'PingFang SC-Medium', 'PingFang SC', sans-serif;
        font-weight: bold;
        color: #303133;
        font-size: 16px;
      }
    }

    .option {
      width: 196px;
      height: 40px;
      margin: 16px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      color: #303133;
      font-weight: 500;
      font-family: 'PingFang SC-Regular', 'PingFang SC', sans-serif;
      font-size: 14px;

      &:hover,
      &.selected-option {
        background: rgba(0 123 255 0.1);
        border-radius: 4px;
        background-color: rgba(0 123 255 0.1);
        cursor: pointer;

        .option-text {
          color: #007bff; /* Change text color on hover */
        }
      }
    }
  }

  .right-column {
    flex: 1 1 auto;
    margin-left: 10px;
  }
}
</style>
