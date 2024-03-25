<template>
  <div
    v-if="showSummaryBody"
    class="register-hours-summary-container"
  >
    <div class="summary-header">
      <p class="title">
        Working-Hours registration
      </p>
      <div class="operations">
        <p
          class="operations-title"
          @click="openDetailsModal"
        >
          Working hours details
        </p>
        <el-select
          v-model="hoursType"
          size="small"
          style="width: 120px"
          @change="onSummaryTypeChange"
        >
          <el-option
            :value="1"
            label="Member"
          />
          <el-option
            :value="2"
            label="Phase"
          />
          <el-option
            :value="3"
            label="Type"
          />
        </el-select>
        <AddNewButton
          v-if="limits.project_phase_detail.working_hours_add"
          @add-new="openRegisterModal"
        />
      </div>
    </div>
    <div class="summary-body">
      <div class="summary-cards">
        <HoursSummaryCard
          type="hours"
          :content-number="totalHours"
        />
        <HoursSummaryCard
          v-if="showTotalCost"
          type="cost"
          :content-number="totalCost"
        />
      </div>
      <div
        v-if="
          chartData.xAxisData.length == 0 && chartData.yAxisData.length == 0
        "
        class="no-data-wrapper"
      >
        <img
          class="no-data-png"
          src="@/assets/image/no-data.png"
          alt="no-data"
        >
        <div class="label">
          No data
        </div>
      </div>
      <div
        v-else
        class="summary-chart"
      >
        <RegisterHoursChart
          :summary-type="hoursType"
          :chart-data="chartData"
          :show-total-cost="showTotalCost"
        />
      </div>
    </div>
    <RegisterHoursModal
      ref="register-hours-modal-summary"
      :project-id="projectId"
      @refresh="refresh"
    />
    <WorkingHoursDetails
      ref="register-hours-detail-modal"
      :show-work-expenses="showTotalCost"
      @refresh="refresh"
    />
  </div>
</template>

<script>
import { getWorkingHoursSummary } from '@/api';
import AddNewButton from '@/components/buttons-and-selectors/AddNewButton.vue';
import WorkingHoursDetails from './WorkingHoursDetails.vue';
import HoursSummaryCard from './HoursSummaryCard.vue';
import RegisterHoursModal from './RegisterHoursModal.vue';
import RegisterHoursChart from './RegisterHoursChart.vue';

export default {
  name: 'RegisterHoursSummary',
  components: {
    AddNewButton,
    HoursSummaryCard,
    RegisterHoursModal,
    RegisterHoursChart,
    WorkingHoursDetails
  },
  data() {
    return {
      showSummaryBody: false,
      showTotalCost: false,
      hoursType: 1,
      projectId: Number(this.$route.params.project_id),
      summaryData: [],
      limits: {},
      chartData: {
        xAxisData: [],
        yAxisData: []
      },
      totalHours: 0,
      totalCost: 0
    };
  },
  mounted() {
    this.justifyRole();
    this.getWorkingHoursSummary();
  },
  methods: {
    justifyRole() {
      let limits = JSON.parse(localStorage.getItem('limits'));
      this.limits = limits;
      let projectDetailLimits = limits.project_phase_detail;
      if (projectDetailLimits.view_working_hours) {
        this.showSummaryBody = true;
      }
      if (projectDetailLimits.view_working_hours_total_cost) {
        this.showTotalCost = true;
      }
    },
    refresh() {
      this.$nextTick(() => {
        this.chartData = {
          xAxisData: [],
          yAxisData: []
        };
        this.getWorkingHoursSummary();
      });
    },
    onSummaryTypeChange() {
      this.getWorkingHoursSummary();
    },
    makeChartData(data) {
      if (data && data.length > 0 && this.hoursType === 1) {
        data.forEach((item) => {
          this.chartData.xAxisData.push(item.work_hours);
          let personObj = {
            name: item.creation_name,
            totalCost: item.total_price
          };
          this.chartData.yAxisData.push(personObj);
        });
      }
      if (data && data.length > 0 && this.hoursType === 2) {
        data.forEach((item) => {
          this.chartData.xAxisData.push(item.work_hours);
          let phaseObj = {
            name: `${item.progress_no} ${item.progress}%`,
            totalCost: item.total_price
          };
          this.chartData.yAxisData.push(phaseObj);
        });
      }
      if (data && data.length > 0 && this.hoursType === 3) {
        data.forEach((item) => {
          this.chartData.xAxisData.push(item.work_hours);
          let teamTypeObj = {
            name: item.team_type,
            totalCost: item.total_price
          };
          this.chartData.yAxisData.push(teamTypeObj);
        });
      }
    },
    getWorkingHoursSummary() {
      getWorkingHoursSummary({
        type: this.hoursType,
        project_id: this.projectId
      }).then((res) => {
        this.summaryData = res.data.data;
        this.chartData = {
          xAxisData: [],
          yAxisData: []
        };
        this.makeChartData(res.data.data);
        this.totalHours = res.data.total_work_hours;
        this.totalCost = res.data.total_cost;
      });
    },
    openDetailsModal() {
      this.$refs['register-hours-detail-modal'].show();
      this.$refs['register-hours-detail-modal'].getWorkingHoursList();
    },
    openRegisterModal() {
      this.$refs['register-hours-modal-summary'].show();
    }
  }
};
</script>

<style lang="less" scoped>
.register-hours-summary-container {
  // width: 1736px;
  background: #fff;
  padding: 0;
  margin-top: 16px;

  .summary-header {
    // width: 114rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 15px;
    line-height: 100%;

    .title {
      font-size: 18px;
      font-weight: 550;
      color: #303133;
      font-size: 18px;
      font-family: PingFang SC, PingFang SC;
      line-height: 20px;
    }

    .operations {
      display: flex;
      align-items: center;
      justify-content: flex-end;
      gap: 24px;

      .operations-title {
        font-size: 16px;
        color: #007bff;
        cursor: pointer;
        font-family: PingFang SC, PingFang SC;
        font-weight: 400;
      }
    }
  }

  .summary-body {
    display: flex;
    align-items: flex-start;
    justify-content: flex-start;
    // width: 114rem;
    height: 260px;
    border: 1px solid #e4e7ed;
    border-radius: 4px;

    .no-data-wrapper {
      width:100%;
      height:100%;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      .no-data-png {
        width: 120px;
        height: 120px;
      }
      .label {
        font-size: 13px;
        color: #909399;
        margin-top: 5px;
        margin-bottom: 16px;
      }
    }

    .summary-cards {
      display: flex;
      align-items: flex-start;
      justify-content: space-between;
      flex-direction: column;
      gap: 16px;
      padding: 0;
      margin-top: 16px;
      margin-left: 24px;
    }

    .summary-chart {
      width: 100%;
      height: 100%;
      padding: 0;
      margin: 0;
      // overflow-y: auto;
    }
  }
}
</style>
