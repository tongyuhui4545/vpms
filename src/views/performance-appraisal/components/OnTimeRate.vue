<template>
  <div class="on-time-rate-container">
    <div class="title-area">
      <div class="title-left-group">
        <span>Overdue rate</span>
        <el-tooltip
          trigger="hover"
          placement="top-start"
        >
          <template slot="content">
            <span style="width: 250px; text-align: start; display: inline-block">
              The data of overdue rate is based on the tasks which is submitted
              for the first time by the team leader in teach phase
            </span>
          </template>
          <i class="el-icon-question" />
        </el-tooltip>
      </div>
      <div
        class="view-list-btn"
        @click="goToList"
      >
        <p>View list</p>
      </div>
    </div>
    <div
      v-if="fetchedSummaryData.length > 1"
      class="team-leader-data-wrapper"
    >
      <el-row style="display: flex">
        <div
          v-for="(leader, index) in fetchedSummaryData"
          :id="'team-leader-' + (index + 1)"
          :key="index"
          class="team-leader-column"
        >
          <div class="leader-name">
            <span>{{ leader.team_name }} leader / {{ leader.user_name }}</span>
          </div>
          <AppraisalDisplayNumber
            :number="computedOverdueRate(leader.overdue_rate)"
            :status="computedStatus(leader.overdue_rate)"
          />
          <div class="overdue-tasks">
            <span class="text-normal">Overdue tasks</span>
            <span class="colored-figure">{{ leader.overdue_tasks }}</span>
          </div>
          <div class="total-tasks">
            <span class="text-normal">Total tasks</span>
            <span class="colored-figure">{{ leader.total_phase }}</span>
          </div>

          <div class="lower-part-stats">
            <div class="left-block">
              <div class="text-gray">
                Total overdue time
              </div>
              <div class="text-gray">
                Average overdue hours
              </div>
            </div>

            <div class="right-block">
              <div>
                <span
                  class="colored-figure"
                  style="margin-right: 4px"
                >{{
                  leader.overdue_hours
                }}</span><span class="text-gray">hours</span>
              </div>
              <div>
                <span
                  class="colored-figure"
                  style="margin-right: 4px"
                >{{
                  leader.average_overdue_hours
                }}</span><span class="text-gray">hours/per phase</span>
              </div>
            </div>
          </div>
        </div>
      </el-row>
    </div>

    <div
      v-if="summaryData.length == 1"
      class="project-on-time-rate-wrapper"
    >
      <div
        class="col-1"
        style="width: 300px"
      >
        <div class="total-on-time-rate-number">
          <AppraisalDisplayNumber
            :number="computedOverdueRate(summaryData[0].overdue_rate)"
          />
        </div>
      </div>
      <div
        class="col-2"
        style="width: 300px"
      >
        <div class="on-time-rate-overdue-tasks">
          <AppraisalDisplayNumber :number="summaryData[0].overdue_tasks" />
          <p :style="{ 'font-size': '14px', color: totalTasksColor }">
            Overdue tasks
          </p>
        </div>
        <div class="on-time-rate-total-overdue-time">
          <div style="display: flex; align-items: center">
            <AppraisalDisplayNumber
              :number="summaryData[0].overdue_hours"
              status="hours"
            />
            <span
              style="
                font-size: 14px;
                font-family: PingFang, 'Arial Bold', sans-serif;
                font-weight: 'Regular';
                color: #303133;
                margin-left: 8px;
              "
            >hours</span>
          </div>
          <p :style="{ 'font-size': '14px', color: blueTextColor }">
            Total overdue time
          </p>
        </div>
      </div>
      <div
        class="col-3"
        style="width: 300px"
      >
        <div class="on-time-rate-total-tasks">
          <AppraisalDisplayNumber :number="summaryData[0].total_phase" />
          <p :style="{ 'font-size': '14px', color: totalTasksColor }">
            Total tasks
          </p>
        </div>
        <div class="on-time-rate-average-working-hours">
          <div style="display: flex; align-items: center">
            <AppraisalDisplayNumber
              :number="summaryData[0].average_overdue_hours"
              status="hours"
            />
            <span style="font-size: 14px; color: '#303133'; margin-left: 8px">hours/per phase</span>
          </div>
          <p :style="{ 'font-size': '14px', color: blueTextColor }">
            Average working hours
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import AppraisalDisplayNumber from './AppraisalDisplayNumber.vue';

export default {
  components: {
    AppraisalDisplayNumber
  },
  props: {
    projectType: {
      type: [Number, String],
      default: 0
    },
    displayType: {
      type: Number,
      default: 1
    },
    summaryData: {
      type: Array,
      default: () => {
        return [];
      }
    },
    userIds: {
      type: Array,
      default: () => {
        return [];
      }
    },
    monthRange: {
      type: Array,
      default: () => {
        return [];
      }
    }
  },
  data() {
    return {
      overdueTasksColor: '#F56C6C',
      totalTasksColor: '#67C23A',
      blueTextColor: '#007BFF',

      fetchedSummaryData: []
    };
  },
  watch: {
    summaryData: {
      handler(val) {
        this.fetchedSummaryData = val;
      },
      immediate: true
    }
    // monthRange: {
    //     handler: function (val) {
    //         this.months = val
    //     },
    //     immediate: true
    // }
  },
  methods: {
    goToList() {
      this.$router.push({
        path: '/index/users/performance-appraisal/list',
        query: {
          type: this.displayType,
          list: 1,
          projectType: this.projectType,
          months: this.monthRange
        }
      });
    },
    computedOverdueRate(number) {
      return `${number}%`;
    },
    computedStatus(rate) {
      let rateArr = [];
      for (let item of this.fetchedSummaryData) {
        rateArr.push(item.overdue_rate);
      }
      let maxRate = Math.max(...rateArr);
      if (rate === 0) {
        return 'normal';
      } else if (rate === maxRate) {
        return 'worst';
      } else {
        return 'normal';
      }
    }
  }
};
</script>
<style>
.el-tooltip__popper {
   border-radius: 2px !important;
}
</style>
<style lang="less" scoped>
#team-leader-1 {
  margin-top: -3px;
}

#team-leader-3 {
  margin-top: 2px;
}
.on-time-rate-container {
  width: 916px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  margin-left: 24px;

  .colored-figure {
    align-items: center;
    font-size: 14px;
    font-family: 'PingFang SC-Medium', 'PingFang SC', Helvetica, 'Arial Bold',
      sans-serif;
    font-weight: bold;
    color: #007bff;
  }

  .text-normal {
    font-size: 14px;
    font-family: 'PingFang SC-Regular', 'PingFang SC', Helvetica, 'Arial Bold',
      sans-serif;
    font-weight: 400;
    color: #303133;
  }

  .text-gray {
    align-items: center;
    font-size: 13px;
    font-family: 'PingFang SC-Regular', 'PingFang SC', Helvetica, 'Arial Bold',
      sans-serif;
    font-weight: 400;
    color: #909399;
  }

  // .title-area {
  //     font-size: 16px;
  //     font-family: 'PingFang SC-Medium', 'PingFang SC', Helvetica, Arial Bold, sans-serif;
  //     font-weight: 550;
  //     color: #303133;
  //     margin-left: 10px;
  //     margin-top: 16px;
  // }
  .title-area {
    position: absolute;
    transform: translateY(-5px);
    width: 800px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 16px;
    font-family: 'PingFang SC-Medium', 'PingFang SC', Helvetica, 'Arial Bold',
      sans-serif;
    font-weight: 550;
    color: #303133;
    margin-left: 10px;
    margin-top: 16px;

    .title-left-group {
      display: flex;
      align-items: center;
      gap: 8px;
    }

    i {
      font-size: 16px;
      margin-left: 8px;
      color: #007bff;
    }

    .view-list-btn {
      font-size: 14px;
      font-family: 'PingFang SC-Regular', 'PingFang SC', sans-serif;
      font-weight: bold;
      color: #007bff;
      line-height: 0px;
      cursor: pointer;
    }
  }

  .team-leader-data-wrapper {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    margin-top: 35px;
    margin-left: 10px;

    .team-leader-column {
      display: flex;
      flex-direction: column;
      justify-content: flex-start;
      align-items: flex-start;
      max-width: 300px;

      .leader-name {
        font-size: 14px;
        font-family: 'PingFang SC-Medium', 'PingFang SC', Helvetica,
          'Arial Bold', sans-serif;
        font-weight: 550;
        color: #303133;
        display: flex;
        justify-content: flex-start;
        align-items: center;
        margin-top: 24px;
        margin-bottom: 16px;
      }

      .overdue-tasks,
      .total-tasks {
        width: 140px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-top: 8px;
        margin-bottom: 8px;
      }

      .lower-part-stats {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-top: 8px;

        .left-block,
        .right-block {
          display: flex;
          flex-direction: column;
          white-space: nowrap;
          justify-content: flex-start;
          align-items: flex-start;
          gap: 8px;
        }
      }
    }

    :last-child {
      margin-right: 15px;
    }
  }

  .project-on-time-rate-wrapper {
    margin-top: 45px;
    margin-left: 10px;
    display: flex;
    justify-content: space-between;
  }

  team-leader-column {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;

    span {
      font-size: 14px;
      font-family: 'PingFang SC-Medium', 'PingFang SC', sans-serif;
      font-weight: 500;
      color: #303133;
      padding: 0;
      margin: 0;
    }
  }

  // :first-child {
  //     margin-left: 10px;
  // }
}
</style>
