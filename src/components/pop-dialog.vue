<template>
  <div class="public-dialog-container">
    <div
      v-if="dialog.type == 'message'"
      class="public-dialog-message"
    >
      <el-dialog
        :title="dialog.title"
        :visible.sync="dialogVisible"
        :width="dialog.width"
      >
        <div class="public-dialog-wrapper">
          <div class="dialog-clicle">
            <i class="el-icon-warning icon" />
          </div>
          <slot name="dialog-content" />
        </div>
        <span
          slot="footer"
          class="dialog-footer"
        >
          <slot name="dialog-btn" />
        </span>
      </el-dialog>
    </div>
    <div
      v-if="dialog.type == 'dialog'"
      class="public-dialog-form"
    >
      <el-dialog
        :title="dialog.title"
        :visible.sync="dialogVisible"
        :width="dialog.width"
        :close-on-click-modal="false"
      >
        <div class="public-dialog-wrapper">
          <slot name="dialog-content" />
        </div>
        <span
          slot="footer"
          class="dialog-footer"
        >
          <slot name="dialog-btn" />
        </span>
      </el-dialog>
    </div>
  </div>
</template>

<script>
export default {
  name: '',
  components: {},
  props: {
    dialog: {
      type: Object,
      default: () => {
        return {
          title: 'Tips',
          type: 'message',
          width: '560px',
          visible: false
        };
      }
    }
  },
  computed: {
    dialogVisible: {
      get() {
        return this.dialog.visible;
      },
      set(val) {
        this.$emit('dialogClosed', val);
      }
    }
  },
  methods: {}
};
</script>

<style scoped lang="less">
.public-dialog-container {
  /deep/ .el-dialog {
    border-radius: 8px;
  }
  /deep/ .el-dialog__footer {
    padding: 32px 24px 40px 0px;
  }
  /deep/ .el-button {
    height: 39px;
    border-radius: 4px;
    border: 1px solid #eeeeee;
    color: #303133;
    font-size: 16px;
    transition: 0.5s;
    transition-property: all;
    transition-duration: 0.5s;
    transition-timing-function: ease;
    transition-delay: 0s;
  }
  /deep/ .el-button--default:hover {
    border: 1px solid #007bff;
    color: #007bff;
  }
  /deep/ .el-button--primary {
    color: #ffffff;
    background: #007bff;
  }
  /deep/ .el-button--primary:hover {
    opacity: 0.8;
  }
}
.public-dialog-message {
  .public-dialog-wrapper {
    position: relative;
    .dialog-clicle {
      position: absolute;
      top: -45px;
      left: -25px;
      .icon {
        color: #e6a23c;
        font-size: 16px;
      }
    }
  }
  /deep/ .el-dialog__header {
    padding: 16px 16px 0px 40px;
  }
  /deep/ .el-dialog__title {
    font-size: 16px;
    font-weight: 550;
    color: #303133;
  }
  /deep/ .el-dialog__headerbtn .el-dialog__close {
    font-weight: 550;
    color: #303133;
  }
  /deep/ .el-dialog__body {
    padding: 22px 52px 0px 40px;
    font-size: 14px;
    font-family: PingFang SC, PingFang SC;
    color: #606266;
    line-height: 24px;
  }
}
.public-dialog-form {
  /deep/ .el-dialog__header {
    padding: 16px 16px 0px 24px;
  }
  /deep/ .el-dialog__title {
    font-size: 16px;
    font-weight: 550;
    color: #303133;
  }
  /deep/ .el-dialog__headerbtn .el-dialog__close {
    font-weight: 550;
    color: #303133;
  }
  /deep/ .el-dialog__body {
    padding: 22px 24px 0px 24px;
  }
}
</style>
