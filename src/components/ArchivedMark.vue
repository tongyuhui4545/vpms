<template>
  <div class="archived-mark">
    <div
      class="archived-phase-mark-icon"
      style="margin-left: 8px"
    >
      <img
        src="@/assets/IconDesigns/reminder.png"
        style="width: 14px; height: 14px"
      >
    </div>
    <div class="archived-phase-mark-text">
      <span>
        {{ markText }}
      </span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ArchivedMark',

  props: {
    markType: {
      type: String,
      default: 'phase'
    }
  },
  data() {
    return {
      markText: ''
    };
  },
  watch: {
    markType: {
      handler (val) {
        if (val === 'phase') {
          this.markText =
            'The current phase has been archived and can only be viewed. Please unarchive it if you want to edit it';
        } else if (val === 'project') {
          this.markText =
            'The current project has been archived and can only be viewed. Please unarchive it if you want to edit it';
        }
      },
      immediate: true
    }
  }
};
</script>

<style lang="less" scoped>
.archived-mark {
  padding: 5px;
  background: rgba(0 123 255 / 10%);
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: 10px;
  margin-left: -12px;
  margin-bottom: -10px;

  .archived-mark-icon {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .archived-mark-text {
    font-size: 14px;
    font-family: 'PingFang SC-Regular', 'PingFang SC', sans-serif;
    font-weight: 400;
    color: #007bff;
  }
}
</style>
