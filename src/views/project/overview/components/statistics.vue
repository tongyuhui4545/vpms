<template>
  <div class="statistics-container">
    <div class="header">
      Statistics
    </div>
    <div class="statistics-wrapper">
      <div class="row-wrapper">
        <div class="row">
          <div class="line" />
          <div class="title">
            Total quote / Total phase
          </div>
          <div class="content">
            <IOdometer
              class="iOdometer num"
              :value="statisticsData.total_quote"
            />
            <div class="dividing-line">
              /
            </div>
            <IOdometer
              class="iOdometer num"
              :value="statisticsData.total_phase"
            />
          </div>
        </div>
      </div>
      <div class="row-wrapper">
        <div class="row">
          <div class="line" />
          <div class="title">
            Overdue / Task
          </div>
          <div class="content">
            <IOdometer
              class="iOdometer error-num"
              :value="statisticsData.overdue"
            />
            <div class="dividing-line">
              /
            </div>
            <IOdometer
              class="iOdometer"
              :value="statisticsData.task"
            />
          </div>
        </div>
      </div>
      <div class="row-wrapper">
        <div class="row">
          <div class="line" />
          <div class="title">
            Total error / Total task
          </div>
          <div class="content">
            <IOdometer
              class="iOdometer error-num"
              :value="statisticsData.total_error"
            />
            <div class="dividing-line">
              /
            </div>
            <IOdometer
              class="iOdometer"
              :value="statisticsData.total_task"
            />
          </div>
        </div>
      </div>
      <div 
        v-if="limits.view_working_hours_total_cost"
        class="row-wrapper">
        <div class="row">
          <div class="line" />
          <div class="title">
            Total working hours / Total cost
          </div>
          <div class="content">
            <IOdometer
              class="iOdometer"
              :value="statisticsData.total_working_hours"
            />
            <div class="dividing-line">
              /
            </div>
            <IOdometer
              class="iOdometer"
              :value="statisticsData.total_cost"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import IOdometer from 'vue-odometer';
import 'odometer/themes/odometer-theme-default.css';
import { statisticsList } from '@/api/index.js';
export default {
  name: '',
  components: {
    IOdometer
  },
  data() {
    return {
      limits: {},
      project_id: null,
      statisticsData: {
        total_quote: 0,
        total_phase: 0,
        overdue: 0,
        task: 0,
        total_error: 0,
        total_task: 0,
        total_work_hours: 0,
        total_coast: 0
      }
    };
  },
  created() {
    this.project_id = this.$route.params.project_id;
  },
  mounted() {
    this.getStatisticsData();
    this.limits = JSON.parse(localStorage.getItem('limits'))['project_phase_detail'];
  },
  methods: {
    getStatisticsData() {
      statisticsList({
        project_id: this.project_id
      }).then((res) => {
        if (res.code === 200) {
          this.statisticsData = res.data;
        }
      });
    },
    handleMembers(row) {
      this.membersValue = row.value;
    }
  }
};
</script>

<style scoped lang="less">
.statistics-container {
  flex: 1;
  height: 200px;
  border-radius: 8px 8px 8px 8px;
  border: 1px solid #eeeeee;
  .header {
    font-size: 16px;
    font-family: PingFang SC, PingFang SC;
    font-weight: 550;
    color: #303133;
    padding: 16px 0px 0px 16px;
    line-height: 20px;
    margin-bottom: 16px;
  }
  .statistics-wrapper {
    display: flex;
    .row-wrapper {
      flex: 1;
      display: flex;
      justify-content: center;
      .row {
        width: 70%;
        max-width: 280px;
        height: 120px;
        background: rgba(0, 123, 255, 0.05);
        border-radius: 8px;
        position: relative;
        .line {
          width: 8px;
          height: 40px;
          background: #007bff;
          border-radius: 4px;
          position: absolute;
          top: 40px;
          left: -4px;
        }
        .title {
          width: 90%;
          font-size: 14px;
          color: #303133;
          text-align: center;
          padding-top: 8px;
          line-height: 20px;
          margin: 0 auto;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
        .content {
          display: flex;
          justify-content: center;
          align-items: center;
          padding-top: 8px;
          font-size: 48px;
          font-weight: 550;
          color: #303133;
          line-height: 20px;
          .error-num {
            color: #f56c6c;
          }
          .dividing-line {
            position: relative;
            top: -3px;
          }
        }
      }
    }
  }
}
</style>
