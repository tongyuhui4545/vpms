<template>
  <div class="error-rate-container">
    <div class="title-area">
      <div class="title-left-group">
        <span>Error rate</span>
        <el-tooltip
          trigger="hover"
          placement="top-start"
        >
          <template
            slot="content"
          >
            <span style="width: 250px; line-height: 1.5; display:inline-block;">
              The data of error rate is based on all the tasks which have
              already been reviewed.
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
      v-if="summaryData.length > 1"
      class="team-leader-data-wrapper"
    >
      <el-row style="display: flex">
        <div
          v-for="(leader, index) in summaryData"
          :id="'team-leader-' + (index + 1)"
          :key="index"
          class="team-leader-column"
        >
          <div class="leader-name">
            <span>{{ leader.team_name }} leader / {{ leader.user_name }}</span>
          </div>
          <AppraisalDisplayNumber
            :number="computedErrorRate(leader.error_rate)"
            :status="computedStatus(leader.error_rate)"
          />
          <div class="overdue-tasks">
            <span class="text-normal">Total errors</span>
            <span class="colored-figure">{{ leader.total_errors }}</span>
          </div>
          <div class="total-tasks">
            <span class="text-normal">Total tasks</span>
            <span class="colored-figure">{{ leader.total_tasks }}</span>
          </div>
        </div>
      </el-row>
    </div>
    <div
      v-if="summaryData.length == 1"
      style="
        display: flex;
        justify-content: space-between;
        margin-left: 10px;
        margin-top: 45px;
      "
    >
      <div class="project-error-rate-col">
        <AppraisalDisplayNumber
          :number="computedErrorRate(summaryData[0].error_rate)"
        />
      </div>
      <div class="project-error-rate-col">
        <AppraisalDisplayNumber :number="summaryData[0].total_errors" />
        <p :style="{ 'font-size': '14px', color: totalErrorsColor }">
          Total errors
        </p>
      </div>
      <div class="project-error-rate-col">
        <AppraisalDisplayNumber :number="summaryData[0].total_tasks" />
        <p :style="{ 'font-size': '14px', color: totalTasksColor }">
          Total tasks
        </p>
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
      default: () => {return []}
    },
    userIds: {
      type: Array,
      default: () => {return []}
    },
    monthRange: {
      type: Array,
      default: () => {return []}
    }
  },
  data() {
    return {
      totalErrorsColor: '#67C23A',
      totalTasksColor: '#67C23A',
      tooltipContent:
        'The data of error rate is based on all the tasks which have already been reviewed.'
    };
  },
  methods: {
    goToList() {
      this.$router.push({
        path: '/index/users/performance-appraisal/list',
        query: {
          type: this.displayType,
          list: 2,
          projectType: this.projectType,
          // userIds: this.userIds,
          months: this.monthRange
        }
      });
    },
    computedErrorRate(number) {
      if (number) {
        return `${number}%`;
      } else {
        return '0%';
      }
    },
    computedStatus(rate) {
      let rateArr = [];
      for (let item of this.summaryData) {
        rateArr.push(item.error_rate);
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
   border-radius: 2px;
}
</style>

<style lang="less" scoped>
#team-leader-1 {
  margin-top: -3px;
}

#team-leader-3 {
  margin-top: 2px;
}

.error-rate-container {
  width: 916px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  margin-left: 24px;

  .project-error-rate-col {
    width: 300px;
  }

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
      width: 300px;

      .leader-name {
        font-size: 14px;
        font-family: 'PingFang SC-Medium', 'PingFang SC', Helvetica, 'Arial Bold',
          sans-serif;
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
    }

    :last-child {
      margin-right: 15px;
    }
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
}
</style>
