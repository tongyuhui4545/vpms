<template>
  <div class="header-container">
    <!--logo-->
    <div class="logo-container">
      <img
        class="logo"
        src="@/assets/IconDesigns/Logo_blue.png"
        alt=""
      >
    </div>
    <!-- text -->
    <div class="logo-text">
      <el-divider direction="vertical" />
      <div class="text">
        <p>Voltage<span>|</span>PMS</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: '',
  components: {},
  data() {
    return {};
  }
};
</script>

<style lang="less" scoped>
.header-container {
  width: 100%;
  height: 64px;
  background: #fff;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  position: fixed;
  left: 0;
  top: 0;
  z-index: 80;
  font-family: 'PingFang SC-Medium', 'PingFang SC', sans-serif;
  font-weight: 500;

  .logo-container {
    width: 60px;
    height: 60px;
    display: flex;
    align-items: center;
    justify-content: center;

    .logo {
      width: 56px;
      height: 56px;
      margin-left: 10px;
    }
  }

  .logo-text {
    display: flex;
    align-items: center;
    justify-content: center;

    .text {
      padding: 0;
      font-size: 20px;
      color: #303133;
      line-height: 20px;
      letter-spacing: 2px;
      margin-left: 10px;

      span {
        margin: 0 10px;
        color: #303133;
      }
    }
  }

  /* stylelint-disable-next-line selector-class-pattern */
  .el-divider--vertical {
    display: inline-block;
    width: 1px;
    height: 32px;
    margin: 0 8px;
    vertical-align: middle;
    position: relative;
  }
}
</style>
