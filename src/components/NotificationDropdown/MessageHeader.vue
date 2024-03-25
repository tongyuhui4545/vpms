<template>
  <div class="message-header">
    <el-select
      v-model="selectedOption"
      size="small"
      class="select-box"
      placeholder="Select option"
      @change="onChange"
    >
      <el-option
        v-for="item in options"
        :key="item.value"
        :label="item.label"
        :value="item.value"
      />
    </el-select>
    <div class="icon-wrapper">
      <el-dropdown
        trigger="hover"
        @command="handleCommand"
      >
        <img
          class="icon"
          src="@/assets/IconDesigns/more.png"
          alt="dots"
        >
        <el-dropdown-menu
          slot="dropdown"
          @mouseover.native="hoverOption"
          @mouseout.native="leaveOption"
        >
          <el-dropdown-item
            class="dropdown-item"
            command="setAllAsRead"
          >
            <img
              class="read-icon"
              :src="readIconSrc"
              alt="read-icon"
            >
            Set all as read
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </div>
</template>

<script>
import { noticeRead } from '@/api';
export default {
  data() {
    return {
      selectedOption: 'all',
      optionHovered: false,
      options: [
        { label: 'All', value: 'all' },
        { label: 'Unread', value: 'unread' }
      ]
    };
  },
  computed: {
    readIconSrc() {
      return this.optionHovered
        ? require('@/assets/IconDesigns/read_selected.png')
        : require('@/assets/IconDesigns/read_mark.png');
    }
  },
  methods: {
    hoverOption() {
      this.optionHovered = true;
    },
    leaveOption() {
      this.optionHovered = false;
    },
    handleCommand(command) {
      if (command === 'setAllAsRead') {
        noticeRead().then((res) => {
          if (res.code === 200) {
            this.$emit('setAllAsRead');
          } else {
            this.$message({
              message: 'Failed to mark all messages as read',
              type: 'error'
            });
          }
        });
      }
    },
    onChange() {
      this.$emit('messageTypeChanged', this.selectedOption);
    }
  }
};
</script>

<style scoped>
.message-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
}

.select-box {
  width: 160px;
  height: 32px !important;
  border-radius: 4px;
  margin-right: 16px;
}

/* stylelint-disable-next-line selector-class-pattern */
::v-deep .el-input__inner {
  font-family: 'PingFang SC-Regular', sans-serif;
  font-size: 13px;
  color: #c0c4cc;
}

.icon-wrapper {
  margin-right: 16px;
}

.read-icon {
  width: 14px;
  height: 14px;
}

.dropdown-item {
  display: flex;
  align-items: center;
  justify-content: center;
}

.dropdown-item .read-icon {
  width: 14px;
  height: 14px;
  margin-right: 7px;
}

.icon {
  width: 24px;
  height: 24px;
  cursor: pointer;
}
</style>
