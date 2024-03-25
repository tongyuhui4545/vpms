<template>
  <div
    v-if="dueDate"
    class="tag-container"
    :style="tagContainerStyle"
  >
    <div class="due-date-icon">
      <img
        v-if="dueDateStatus == 'close-due'"
        style="height: 16px; width: 16px; margin-left: 3px"
        src="@/assets/IconDesigns/close_due_white.png"
        alt="yellow_clock"
      >
      <img
        v-if="dueDateStatus == 'over-due'"
        style="height: 16px; width: 16px; margin-left: 3px"
        src="@/assets/IconDesigns/over_due_white.png"
        alt="red_clock"
      >
    </div>
    <div class="due-date-text">
      {{ dueDateText }}
    </div>
  </div>
</template>
<script>
import { getUserInfo } from '@/utils/commons.js';
import { formatTime, hourDifference } from '@/utils/format-time.js';
import dayjs from 'dayjs';

export default {
  props: {
    tagData: {
      type: Object,
      default: () => {
        return {};
      }
    },
    tagType: {
      type: String,
      default: 'quote'
    }
  },
  data() {
    return {
      dueDateStatus: '',
      dayDiff: 0,
      userInfo: {},
      dueDateText: '',
      dueDate: ''
    };
  },
  computed: {
    tagContainerStyle() {
      if (this.dueDateStatus === 'close-due') {
        return { background: '#E6A23C' };
      } else if (this.dueDateStatus === 'over-due') {
        return { background: '#F56C6C' };
      } else {
        // 默认情况下不设置背景颜色
        return {};
      }
    }
  },
  watch: {
    tagData: {
      handler() {
        this.calcDueDateStatus();
      }
    }
  },
  created() {
    this.userInfo = getUserInfo();
    this.calcDueDateStatus();
  },
  methods: {
    calcDueDateStatus() {
      let dayDiff = 0;
      if (this.tagType !== 'task') {
        this.dueDate = this.tagData.work_due_date;
      } else {
        this.dueDate = this.tagData.task_due_date;
      }
      let today = dayjs().format('YYYY-MM-DD');
      let formattedDueDate = formatTime(this.dueDate);
      if (today === formattedDueDate) {
        this.dayDiff = 0;
      } else {
        dayDiff = hourDifference(this.dueDate);
        dayDiff = Math.ceil(dayDiff);
      }
      this.dayDiff = dayDiff;

      if (dayDiff >= 0 && dayDiff <= 2 * 24) {
        this.dueDateStatus = 'close-due';
      } else if (dayDiff < 0) {
        this.dueDateStatus = 'over-due';
      } else {
        this.dueDateStatus = 'normal';
      }
      this.getDueDateText(dayDiff);
    },
    getDueDateText(dayDiff) {
      let remainder = dayDiff % 24;
      let dayPart = Math.ceil(dayDiff / 24);
      if (this.dueDateStatus === 'close-due') {
        // eslint-disable-next-line no-unused-expressions
        dayDiff === 0
          ? (this.dueDateText = 'Due today')
          : (this.dueDateText = `Due in ${dayPart} day${
              dayPart > 1 ? 's' : ''
            } ${remainder} hour${remainder > 1 ? 's' : ''}`);
      }
      if (this.dueDateStatus === 'over-due') {
        this.dueDateText = `Overdue by ${-dayPart} day${
          -dayDiff > 1 ? 's' : ''
        } ${-remainder} hour${-remainder > 1 ? 's' : ''}`;
      }
    }
  }
};
</script>
<style lang="less" scoped>
.tag-container {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: 3px;
  height: 20px;
  // width: 112px;
  border-radius: 4px;

  .due-date-icon {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .due-date-text {
    font-size: 12px;
    font-weight: 500;
    margin-right: 3px;
    color: #fff;
  }
}
</style>
