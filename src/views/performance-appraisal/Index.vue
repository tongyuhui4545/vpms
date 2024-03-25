<template>
  <div class="performance-appraisal-container">
    <div class="personnel-tabs-container">
      <div
        v-for="tab in personnelTabs"
        :key="tab.value"
        class="tab-wrapper"
      >
        <PersonnelTab       
          :tab="tab"
          @click-tab="handlePersonnelTabClick"
        />
        <span class="separator" />
      </div>
    </div>
    <div class="performance-appraisal-left">
      <div class="header-level-one">
        <p>Performance appraisal</p>
        <!-- <div class="personnel-tabs-container">
          <PersonnelTab
            v-for="tab in personnelTabs"
            :key="tab.value"
            :tab="tab"
            @click-tab="handlePersonnelTabClick"
          />
        </div> -->
      </div>
      <div class="header-level-two">
        <div class="task-type-selector">
          <el-select
            size="mini"
            style="width: 120px"
            :visible-arrow="false"
            :value="projectType"
            @change="handleChangeProjectType"
          >
            <el-option
              v-for="option in projectTypeOptions"
              :key="option.value"
              :label="option.label"
              :value="option.value"
            />
          </el-select>
          <el-button
            v-if="performance_add_btn"
            type="primary"
            plain
            size="small"
            class="performance-add-btn"
            @click="handleAddPerformance"
          >
            重置绩效
          </el-button>
        </div>
      </div>
      <div class="on-time-rate">
        <OnTimeRate
          :display-type="displayType"
          :project-type="projectType"
          :summary-data="summaryData"
          :user-ids="userIds"
          :month-range="monthRange"
        />
      </div>
      <div class="error-rate">
        <ErrorRate
          :display-type="displayType"
          :project-type="projectType"
          :summary-data="summaryData"
          :user-ids="userIds"
          :month-range="monthRange"
        />
      </div>
    </div>
    <div class="performance-appraisal-right">
      <div class="date-picker-wrapper">
        <el-date-picker
          v-model="monthRange"
          value-format="yyyy-MM"
          type="monthrange"
          range-separator="to"
          start-placeholder="start"
          end-placeholder="end"
          size="mini"
          style="width: 200px"
          @change="handleMonthChange"
        />
      </div>
      <div
        style="
          margin-top: 20px;
          margin-bottom: 0;
          padding: 0;
          position: relative;
        "
      >
        <div
          class="excel-download-btn"
          @click="handleDownloadExcel(1)"
        >
          <i class="el-icon-download" />
          <span>Excel</span>
        </div>
        <PerformanceStatsChart
          v-if="displayType === 1 || displayType === 3"
          id="performance-chart-overdue"
          :display-type="displayType"
          :raw-data="overdueData"
          :extra-data="chartData"
          :chart-months="chartMonths"
          chart-type="overdue"
        />
        <PerformanceStatsChartManager
          v-if="displayType === 2 || displayType === 4"
          id="performance-chart-manager-overdue"
          :display-type="displayType"
          :raw-data="overdueData"
          :extra-data="chartData"
          :chart-months="chartMonths"
          chart-type="overdue"
        />
      </div>
      <div style="margin-top: -40px; display: relative; position: relative">
        <div
          class="excel-download-btn"
          @click="handleDownloadExcel(2)"
        >
          <i class="el-icon-download" />
          <span>Excel</span>
        </div>
        <PerformanceStatsChart
          v-if="displayType === 1 || displayType === 3"
          id="performance-chart-error-rate"
          :display-type="displayType"
          :raw-data="errorRateData"
          :extra-data="chartData"
          :chart-months="chartMonths"
          chart-type="error-rate"
        />
        <PerformanceStatsChartManager
          v-if="displayType === 2 || displayType === 4"
          id="performance-chart-manager-error-rate"
          :display-type="displayType"
          :raw-data="errorRateData"
          :extra-data="chartData"
          :chart-months="chartMonths"
          chart-type="error-rate"
        />
      </div>
    </div>
  </div>
</template>

<script>
import PersonnelTab from './components/PersonnelTab.vue';
import OnTimeRate from './components/OnTimeRate.vue';
import ErrorRate from './components/ErrorRate.vue';
import PerformanceStatsChart from './components/PerformanceStatsChart.vue';
import PerformanceStatsChartManager from './components/PerformanceStatsChartManager.vue';
import { monthDifference } from '@/utils/format-time.js';
import {
  getPerformanceSummary,
  downloadPerformanceFile,
  performanceSummaryAdd
} from '@/api';

export default {
  name: 'PerformanceAppraisal',
  components: {
    PersonnelTab,
    OnTimeRate,
    ErrorRate,
    PerformanceStatsChart,
    PerformanceStatsChartManager
  },
  data() {
    return {
      userIds: [],
      defaultMonthRange: [],
      chartMonths: [],
      overdueData: [],
      errorRateData: [],
      monthRange: [],
      summaryData: [],
      chartData: {},
      userId: undefined,
      personnelTabs: [
        {
          text: 'Team Leader',
          value: 1,
          chosen: true
        },
        {
          text: 'CN Engineer Manager',
          value: 2,
          chosen: false
        },
        {
          text: '3D team leader',
          value: 3,
          chosen: false
        },
        {
          text: '3D Manager',
          value: 4,
          chosen: false
        }
      ],
      displayType: 1,
      projectType: '',
      // projectTypeOptions: [
      //     {
      //         label: 'All',
      //         value: ''
      //     },
      //     {
      //         label: 'Bidding',
      //         value: 1
      //     },
      //     {
      //         label: 'Formal',
      //         value: 2
      //     },
      //     {
      //         label: 'Label',
      //         value: 3
      //     }
      // ],
      statsForOptions: [
        {
          label: 'Team leader',
          value: 1
        },
        {
          label: 'Engineer Manager',
          value: 2
        }
      ],
      performance_add_btn: false
    };
  },
  computed: {
    projectTypeOptions() {
      switch(this.displayType) {
        case 1:
          return [
              {
                label: 'All',
                value: ''
              },
              {
                label: 'Bidding',
                value: 1
              },
              {
                label: 'Formal',
                value: 2
              },
              {
                label: 'Label',
                value: 3
              }
          ]
        case 2:
          return [
          {
                label: 'All',
                value: ''
              },
              {
                label: 'Bidding',
                value: 1
              },
              {
                label: 'Formal',
                value: 2
              }
            ]
        case 3:
        case 4:
          return [
          {
                label: 'All',
                value: ''
              },
              {
                label: '3D bidding',
                value: 4
              },
              {
                label: '3D formal',
                value: 5
              },
              {
                label: 'Simulation',
                value: 6
              }
            ]
          default:
            return [
            {
                label: 'All',
                value: ''
              },
              {
                label: 'Bidding',
                value: 1
              },
              {
                label: 'Formal',
                value: 2
              },
              {
                label: 'Label',
                value: 3
              }
            ]
      }
      // let options =
      //   this.displayType === 1
      //     ? [
      //         {
      //           label: 'All',
      //           value: ''
      //         },
      //         {
      //           label: 'Bidding',
      //           value: 1
      //         },
      //         {
      //           label: 'Formal',
      //           value: 2
      //         },
      //         {
      //           label: 'Label',
      //           value: 3
      //         }
      //       ]
      //     : [
      //         {
      //           label: 'All',
      //           value: ''
      //         },
      //         {
      //           label: 'Bidding',
      //           value: 1
      //         },
      //         {
      //           label: 'Formal',
      //           value: 2
      //         }
      //       ];
      // return options;
    }
  },
  watch: {
    monthRange: {
      handler(val) {
        if (val[0] && val[1]) {
          let monthDiff = monthDifference(val[0], val[1]);
          if (monthDiff > 12) {
            this.$message.warning({
              message: 'The time range should be within 12 month',
              type: 'warning'
            });
            this.monthRange = this.defaultMonthRange;
            return;
          }
          this.getPerformanceSummary();
        }
      },
      deep: true
    },
    displayType: {
      handler() {
        this.getPerformanceSummary();
      }
    }
  },
  mounted() {
    let currentDate = new Date();
    let currentYear = currentDate.getFullYear();
    let currentMonth = currentDate.getMonth() + 1; 
    currentMonth = currentMonth < 10 ? `0${currentMonth}` : currentMonth;
    let prevMonth = currentMonth - 1;
    prevMonth = prevMonth < 10 ? `0${prevMonth}` : prevMonth;
    let firstMonthVal;
    let secondMonthVal;
    //考虑跨年情况
    //如果当前月份是1月，则上一年的12月是上一年的最后一个月
    if (prevMonth === 0) {
      prevMonth = 12;
      firstMonthVal = `${currentYear - 1}-${prevMonth}`;
      secondMonthVal = `${currentYear}-${currentMonth}`;
    }
    //否则则选取当前月份和上一个月份
    else {
      firstMonthVal = `${currentYear}-${prevMonth}`;
      secondMonthVal = `${currentYear}-${currentMonth}`;
    }
    this.defaultMonthRange = [`${firstMonthVal}`, `${secondMonthVal}`];
    this.monthRange = [`${firstMonthVal}`, `${secondMonthVal}`]; 
    const appMode = process.env.VUE_APP_CURRENTMODE;
    if (appMode === 'development' || appMode === 'test') {
      this.performance_add_btn = true;
    }
  },
  methods: {
    handleMonthChange(range) {
      // let monthDiff = monthDifference(range[0], range[1]);
      // if (monthDiff > 12) {
      //     this.$message.warning({
      //         message: "The time range should be within 12 month",
      //         type: "warning"
      //     });
      //     this.monthRange = this.defaultMonthRange;
      //     return
      // }
      this.monthRange = range;
    },
    goToList() {
      this.$router.push({
        path: '/index/users/performance-appraisal/list'
      });
    },
    handlePersonnelTabClick(item) {
      this.personnelTabs.forEach((tab) => {
        if (tab.value === item.value) {
          tab.chosen = true;
        } else {
          tab.chosen = false;
        }
      });
      this.projectType = '';
      this.displayType = item.value;
    },
    handleChangeProjectType(type) {
      this.projectType = type;
      this.getPerformanceSummary();
    },
    handleDownloadExcel(mode) {
      downloadPerformanceFile(
        this,
        mode,
        this.displayType,
        this.monthRange[0],
        this.monthRange[1],
        this.projectType
      );
    },
    getPerformanceSummary() {
      let params = {
        type: this.displayType,
        date_start: this.monthRange[0],
        date_end: this.monthRange[1],
        user_id: this.userId,
        task_type: this.projectType
      };
      getPerformanceSummary(params)
        .then((res) => {
          if (res.code === 200) {
            this.chartMonths = res.data.chart.label;
            this.handleOverdueData(res.data.chart);
            this.handleErrorRateData(res.data.chart);
            this.summaryData = res.data.summary;
            this.chartData = { ...res.data.chart };

            let performanceUserIds = [];
            for (let item of res.data.summary) {
              performanceUserIds.push(item.user_id);
            }
            this.$store.dispatch(
              'app/storePerformanceUserIds',
              performanceUserIds
            );
            this.userIds = performanceUserIds;
          }
        })
        .catch((err) => {
          return err;
        });
    },
    handleOverdueData(data) {
      let overdueData = [];
      for (let item of data.value) {
        let obj = {
          name: item.name,
          data: item.overdue
        };
        overdueData.push(obj);
      }
      this.overdueData = overdueData;
    },
    handleErrorRateData(data) {
      let errorRateData = [];
      for (let item of data.value) {
        let obj = {
          name: item.name,
          data: item.error
        };
        errorRateData.push(obj);
      }
      this.errorRateData = errorRateData;
    },
    handleAddPerformance() {
      performanceSummaryAdd()
        .then((res) => {
          if (res.code === 200) {
            //console.log('新增 performance');
          }
        })
        .catch((err) => {
          return err;
        });
    }
  }
};
</script>

<style>
/* stylelint-disable-next-line selector-class-pattern */
.performance-appraisal-left .el-popper .popper__arrow::after {
  display: none;
}
</style>

<style lang="less" scoped>
.performance-appraisal-container {
  width: 1888px;
  position: relative;
  min-height: 400px;
  max-height: 820px;
  padding-bottom: 15px;
  background-color: #fff;
  border-radius: 8px;
  margin-left: 5px;
  display: flex;
  gap: 16px;

  .personnel-tabs-container {
        position: absolute;
        top: 25px;
        left: 650px;
        display: flex;
        justify-content: flex-start;
        align-items: center;
        border: 1px solid #EEEEEE;
        border-radius: 4px;
  .tab-wrapper {
    display: flex;
    align-items: center;
    justify-content: space-between;
    .separator {
          height: 16px;
    width: 1px;
    background-color: #eeeeee;
        }
  }
      }

  .performance-appraisal-left {
    width: 916px;
    margin: 16px 0 0 16px;
    flex: 1;

    .header-level-one {
      display: flex;
      justify-content: flex-start;
      align-items: center;
      gap: 16px;

      p {
        font-weight: 550;
      }

      // .personnel-tabs-container {
      //   display: flex;
      //   justify-content: flex-start;
      //   align-items: center;

      //   :first-child {
      //     border-left: 1px solid #eee;
      //   }
      // }
    }

    .header-level-two {
      width: 912px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 0;
      margin: 16px 0 8px;

      .view-list-btn {
        font-size: 14px;
        font-family: 'PingFang SC-Regular', 'PingFang SC', sans-serif;
        font-weight: bold;
        color: #007bff;
        line-height: 0px;
        cursor: pointer;
      }
    }

    .on-time-rate {
      width: 916px;
      height: 331px;
      background: #f5f7fa;
      border-radius: 8px;
      margin-bottom: 24px;
      overflow-x: auto;

      &::-webkit-scrollbar {
        height: 4px;
      }
    }

    .error-rate {
      width: 916px;
      height: 331px;
      background: #f5f7fa;
      border-radius: 8px;
      margin-bottom: 24px;
      padding: 0;
      overflow-x: auto;

      &::-webkit-scrollbar {
        height: 4px;
      }
    }
  }

  .performance-appraisal-right {
    width: 916px;
    margin: 16px 16px 0 0;
    flex: 1;

    .date-picker-wrapper {
      display: flex;
      justify-content: flex-end;
      align-items: center;
      margin-top: 20px;
    }

    .excel-download-btn {
      z-index: 5;
      position: absolute;
      right: 15px;
      top: 15px;
      display: flex;
      justify-content: center;
      gap: 3px;
      align-items: center;
      width: 80px;
      height: 32px;
      border-radius: 4px;
      border: 1px solid #007bff;
      color: #007bff;
      font-size: 14px;
      cursor: pointer;

      &:hover {
        opacity: 0.8;
      }
    }
  }
}

.performance-add-btn {
  margin-left: 20px;
  height: 30px;
}
</style>
