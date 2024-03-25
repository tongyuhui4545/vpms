<template>
  <!--步骤条-->
  <div class="step-container">
    <div
      v-for="(item, index) in stepList"
      :key="`setp-${index}`"
      :class="
        activeStep == index ? 'step-item active animate' : 'step-item animate'
      "
      @click="handleStep(item, index)"
    >
      <div
        v-if="index != 0"
        class="line-left"
      />
      <div
        v-if="index != stepList.length - 1"
        class="line-right"
      />
      <div class="step-icon-wrapper">
        <img
          :src="
            activeStep == index
              ? require('@/assets/image/circle_active.png')
              : require('@/assets/image/circle.png')
          "
          alt=""
          :class="activeStep == index ? 'step-icon-active' : 'step-icon'"
        >
      </div>

      <div
        :class="activeStep == index ? 'step-index index-active' : 'step-index'"
      />
      <div class="step-label">
        {{ item.progress }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: '',
  components: {},
  props: {

 /**步骤条内容选项 */
  stepList: {
      type: Array,
      default: () => {return []}
    }
  },
  data() {
    return {

      /**步骤条当前步骤 */
      activeStep: null
    };
  },
  mounted() {
    this.activeStep = this.stepList.length - 1;
  },
  methods: {

    /**点击步骤条 */
    handleStep(row, index) {
      this.activeStep = index;
      this.$emit('step', JSON.stringify(row));
    }
  }
};
</script>

<style lang="less" scoped>
.step-container {
  display: flex;

  .step-item {
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    position: relative;
    color: #c9c6c6;

    .step-icon-wrapper {
      height: 42px;
      position: relative;

      .step-icon {
        display: inline-block;
        width: 33px;
        height: 41px;
        position: relative;
        top: -5px;
      }

      .step-icon-active {
        animation: move 0.5s;
        position: relative;
        top: -5px;
      }

      @keyframes move {
        0% {
          top: -12px;
        }

        100% {
          top: -5px;
        }
      }
    }

    .line-left {
      width: 50%;
      height: 2px;
      background: #c9c6c6;
      position: absolute;
      left: 0;
      top: 45px;
    }

    .line-right {
      width: 50%;
      height: 2px;
      background: #c9c6c6;
      position: absolute;
      right: 0;
      top: 45px;
    }

    .step-index {
      width: 10px;
      height: 10px;
      background: #c9c6c6;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 14px;
      font-family: 'PingFang SC-Regular', 'PingFang SC', sans-serif;
      font-weight: 400;
      color: #fff;
      border-radius: 50%;
      position: relative;
    }

    .index-active {
      background: rgb(0 123 255);
    }

    .step-label {
      font-size: 13px;
      font-family: 'PingFang SC-Regular', 'PingFang SC', sans-serif;
      font-weight: 600;
      margin-top: 8px;
      position: relative;
    }

    .step-info {
      font-size: 13px;
      font-family: 'PingFang SC-Regular', 'PingFang SC', sans-serif;
      font-weight: 400;
      margin-top: 3px;
    }
  }

  .step-item:hover {
    cursor: pointer;
  }

  .active {
    color: rgb(0 123 255 / 70%);
  }
}
</style>
