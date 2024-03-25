<template>
  <div id="app">
    <router-view />
    <div
      v-if="loadingStatus"
      class="loading-overlay"
    >
      <div class="spinner" />
    </div>
  </div>
</template>

<script>
export default {
  name: 'App',
  data() {
    return {
      loading: false
    };
  },
  computed: {
    loadingStatus() {
      return this.$store.state.app.isLoading;
    }
  },
  created() {
    // // 设计时的宽度
    // const designWidth = 1920;
    // // 可用宽度
    // const screenWidth = window.screen.width;

    // const scaleX = screenWidth / designWidth;

    // document.body.style.zoom = scaleX;

    // const m = detectZoom();
    // document.body.style.zoom = 100 / Number(m);

    // remConvertor();
  }
};
</script>
<style>
.loading-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(241 242 245 0.3);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;
}

.spinner {
  background: url('@/assets/IconDesigns/loading.gif') no-repeat;
  background-size: 81px 81px;
  width: 100%;
  height: 100%;
  position: relative;
  top: 50%;
  left: 50%;
}
</style>

<style lang="less">
html,
body {
  margin: 0;
  padding: 0;
  background: rgb(245 246 246);
  overflow-x: auto;
}

#app {
  // font-family: 'Poppins',sans-serif;
  font-family: 'Helvetica Neue', Helvetica, 'PingFang SC', 'Hiragino Sans GB',
    'Microsoft YaHei', '微软雅黑', Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
}

/* stylelint-disable-next-line selector-class-pattern */
.el-textarea__inner {
  font-family: 'Helvetica Neue', Helvetica, 'PingFang SC', 'Hiragino Sans GB',
    'Microsoft YaHei', '微软雅黑', Arial, sans-serif;
}

.animate {
  transition: 0.5s;
  transition-property: all;
  transition-duration: 0.5s;
  transition-timing-function: ease;
  /* stylelint-disable-next-line declaration-block-no-redundant-longhand-properties */
  transition-delay: 0s;
}

.btn-disabled {
  pointer-events: none;
  opacity: 0.5;
}

// card相关
.card-gap {
  margin-top: 15px;
}

.card-btn {
  font-size: 14px;
  color: rgb(0 123 255);
  border-radius: 6px;
  font-weight: 400;

  .btn-label {
    margin-left: 3px;
  }
}

.card-btn:hover {
  cursor: pointer;
  opacity: 0.8;
}

.search-container {
  display: flex;
  justify-content: space-between;
  background: #fff;
  border-radius: 8px;
  padding: 20px 20px 0;
  border: 1px solid #f0f0f3;

  .btn-wrapper {
    width: 200px;
    position: relative;
    top: 5px;
    display: flex;
    justify-content: flex-end;

    .card-search-btn {
      width: 80px;
      height: 32px;
    }
  }
}

.form-submit-btn {
  display: flex;
  align-items: center;

  .btn {
    width: 108px;
    font-size: 12px;
    font-family: 'PingFang SC-Regular', 'PingFang SC', sans-serif;
    border-radius: 6px;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .submit {
    height: 32px;
    background-color: #007bff;
    border-color: #007bff;
    color: #fff;
  }

  .submit:hover {
    cursor: pointer;
    opacity: 0.8;
  }

  .cancel {
    height: 30px;
    border: 1px solid #007bff;
    color: #007bff;
    margin-right: 20px;
  }

  .cancel:hover {
    cursor: pointer;
    background: #007bff;
    color: #fff;
  }

  .loading {
    cursor: default;
    opacity: 0.6;
  }
}

.table-icon {
  font-size: 16px;
  margin-right: 20px;
}

.table-icon:hover {
  cursor: pointer;
  color: rgb(0 123 255);
}

::-webkit-scrollbar {
  // 滚动条整体样式
  width: 6px;
  // 高宽分别对应横竖滚动条的尺寸
  height: 6px;
}

::-webkit-scrollbar-thumb {
  // 滚动条里面小方块
  border-radius: 10px;
  box-shadow: inset 0 0 7px rgba(97 184 179 0.1);
  background: #ebeef5;
}

::-webkit-scrollbar-track {
  // 滚动条里面轨道
  box-shadow: inset 0 0 7px rgba(87 175 187 0.1);
  border-radius: 10px;
  background: #fff;
}
</style>
