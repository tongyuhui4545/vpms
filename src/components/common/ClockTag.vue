<template>
  <div
    v-if="dueDate"
    class="clock-tag-container"
  >
    <template v-if="dueStatus == 'close-due' && dayDiff >= 0 && dayDiff <= 2">
      <el-tooltip placement="top">
        <img
          style="height: 16px; width: 16px"
          src="@/assets/IconDesigns/yellow_clock.png"
          alt="close-due"
        >
        <div slot="content">
          <p v-if="dayDiff != 0">
            Due in {{ dayDiff }} {{ dayDiff > 1 ? 'days' : 'day' }}
            {{ hourRemainder }} {{ hourRemainder > 1 ? 'hours' : 'hour' }}
          </p>
          <p v-if="dayDiff == 0">
            Due today
          </p>
        </div>
      </el-tooltip>
    </template>
    <template v-if="dueStatus == 'over-due'">
      <el-tooltip placement="top">
        <img
          style="height: 16px; width: 16px"
          src="@/assets/IconDesigns/red_clock.png"
          alt="over-due"
        >
        <div slot="content">
          <p>
            Overdue by {{ -dayDiff }} {{ -dayDiff > 1 ? 'days' : 'day' }}
            {{ -hourRemainder }} {{ -hourRemainder > 1 ? 'hours' : 'hour' }}
          </p>
        </div>
      </el-tooltip>
    </template>
  </div>
</template>

<script>
import {
  formatTime,
  dayDifference,
  hourDifference,
  compareIsSameOrBefore
} from '@/utils/format-time.js';
import dayjs from 'dayjs';

export default {
  props: {
    dueDate: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      dayDiff: 0,
      dueStatus: '',
      hourRemainder: 0
    };
  },
  watch: {
    dueDate: {
      handler() {
        this.calcDueStatus();
      },
      immediate: true
    }
  },
  methods: {
    calcDueStatus() {
      let formattedDueDate = formatTime(this.dueDate);
      formattedDueDate = dayjs(formattedDueDate);
      formattedDueDate = formattedDueDate.endOf('day');
      let dayComparison = compareIsSameOrBefore(formattedDueDate);

      let dd = dayDifference(formattedDueDate);
      let hourRemainder = hourDifference(formattedDueDate) % 24;
      hourRemainder = Math.ceil(hourRemainder);
      this.hourRemainder = hourRemainder;

      if (dayComparison) {
        this.dayDiff = dd;
        if (formattedDueDate === dayjs().format('YYYY-MM-DD')) {
          this.dayDiff = 0;
        } else {
          this.dayDiff = Math.ceil(dd);
        }
        this.dueStatus = 'close-due';
      }
      if (!dayComparison) { 
        this.dayDiff = Math.ceil(dd);
        this.dueStatus = 'over-due';
      }
    }
  }
};
</script>

<style lang="less" scoped>
.clock-tag-container {
  display: flex;
  justify-content: center;
  align-items: center;
}

.clock-tag {
  margin-left: 3px;
}
</style>
