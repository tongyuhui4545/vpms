<template>
  <div class="work-summary-container">
    <div class="header-part">
      <div class="header-title">
        <p>Work summary</p>
        <el-select
          v-model="workSummaryPeriod"
          size="mini"
          class="work-summary-select"
          @change="handleCHangeDate"
        >
          <el-option
            label="Last 7 days"
            value="7"
          />
          <el-option
            label="Last 14 days"
            value="14"
          />
          <el-option
            label="Last 30 days"
            value="30"
          />
          <el-option
            label="Last 90 days"
            value="90"
          />
        </el-select>
      </div>
      <div class="header-btn">
        <el-button
          type="primary"
          size="mini"
          @click="goToWorkHandled"
        >
          All
        </el-button>
      </div>
    </div>
    <div class="content-part">
      <div class="sumary-wrapper">
        <div class="sumary-content">
          <span class="num">{{ sumaryTotal }}</span>
          <span class="unit">Items</span>
          <div class="line" />
        </div>
        <div class="handle">
          Handled
        </div>
      </div>
      <div class="pie-chart-container">
        <div
          ref="chart"
          class="chart"
        />
      </div>
    </div>
  </div>
</template>

<script>
import echarts from 'echarts';
import { workSummary } from '@/api/index.js';
export default {
  name: 'WorkSummary',
  components: {},
  data() {
    return {
      workSummaryPeriod: '7',
      pieChartData: [],
      sumaryTotal: 0,
      userLimits: []
    };
  },
  created() {
    this.userLimits = JSON.parse(localStorage.getItem('limits'));
  },
  mounted() {
    this.getWorkSummary();
  },
  methods: {
    goToWorkHandled() {
      this.$router.push({
        path: '/index/work-item'
      });
    },
    async getWorkSummary() {
      await workSummary({
        range: this.workSummaryPeriod
      })
        .then((res) => {
          if (res.code === 200) {
            this.sumaryTotal = res.data.total;
            this.pieChartData = res.data.data;
            this.echartsInit();
          }
          return;
        })
        .catch((err) => {
          return err;
        });
    },
    handleCHangeDate() {
      this.getWorkSummary();
    },
    echartsInit() {
      let has2DTask = false;
      let has3DTask = false;

      if (this.userLimits['Nav_List']) {
        has2DTask = this.userLimits['Nav_List']['show_2d_task_tab'];
        has3DTask = this.userLimits['Nav_List']['show_3d_task_tab'];
      }

      const corlorArr = [
        '#5470C6',
        '#73de9c',
        '#FAC858',
        '#73C0DE',
        '#9E87E9',
        '#FC8452',
        '#EE6666'
      ];
      let yData = this.pieChartData;
      let labelArr = [];
      // const labelArr = yData.map((item) => {
      //   return item.name;
      // });
      if (has2DTask && !has3DTask) {
        labelArr = ['Bidding', 'Formal', 'Label', 'Others'];
        yData = yData.filter((item) => {
          return ['Bidding', 'Formal', 'Label', 'Others'].includes(item.name);
        });
      }
      if (!has2DTask && has3DTask) {
        labelArr = ['3D bidding', '3D formal', 'Simulation', 'Others'];
        yData = yData.filter((item) => {
          return ['3D bidding', '3D formal', 'Simulation', 'Others'].includes(
            item.name
          );
        });
      }
      if (has2DTask && has3DTask) {
        labelArr = [
          'Bidding',
          'Formal',
          'Label',
          '3D bidding',
          '3D formal',
          'Simulation',
          'Others'
        ];
        yData = yData.filter((item) => {
          return [
            'Bidding',
            'Formal',
            'Label',
            '3D bidding',
            '3D formal',
            'Simulation',
            'Others'
          ].includes(item.name);
        });
      }
      const myChart = echarts.init(this.$refs.chart);
      myChart.setOption(
        {
          tooltip: {
            trigger: 'item',
            backgroundColor: 'rgba(255, 255, 255, 0.9)',
            textStyle: {
              color: '#000'
            }
            // formatter: '{a} {b}: {c}'
          },
          color: corlorArr,
          legend: [
            {
              show: true,
              orient: 'vertical',
              itemHeight: 12,
              itemWidth: 25,
              selectedMode: false,
              data: labelArr,
              textStyle: {
                color: '#606266',
                fontSize: '12'
              },
              left: 'right',
              padding: [20, 0, 0, 0],
              itemGap: 17
            }
          ],
          series: [
            {
              name: '',
              type: 'pie',
              radius: '70%',
              data: yData,
              itemStyle: {
                normal: {
                  label: {
                    show: true,
                    formatter: '{a} {b}',
                    fontSize: '10',
                    color: '#606266'
                  },
                  labelLine: {
                    show: true
                  }
                }
              }
            }
          ]
        },
        true
      );
    }
  }
};
</script>

<style lang="less" scoped>
/* stylelint-disable-next-line import-notation */
@import '@/css/variables.less';

.work-summary-container {
  margin-left: 25px;

  .header-part {
    display: flex;
    align-items: center;
    justify-content: space-between;

    .header-title {
      display: flex;
      align-items: center;
      justify-content: space-between;

      p {
        font-size: @title;
        font-family: @font-family;
        font-weight: @font-weight-bold;
        color: @color-text-primary;
      }

      .work-summary-select {
        width: 120px;
        margin-left: 8px;
        padding-top: 3px;
      }
    }

    .header-btn {
      margin-top: 5px;
      margin-right: 16px
    }
  }

  .content-part {
    position: relative;

    .sumary-wrapper {
      position: absolute;
      .sumary-content {
        height: 56px;
        position: relative;

        .num {
          font-size: 36px;
          color: #007bff;
        }

        .unit {
          font-size: 14px;
          font-family: 'PingFang SC-Regular', 'PingFang SC', sans-serif;
          font-weight: 400;
          color: #606266;
          margin-left: 5px;
        }

        .line {
          width: 24px;
          height: 8px;
          background: #007bff;
          border-radius: 4px;
          margin: 5px 0 0;
        }
      }

      .handle {
        font-size: 14px;
        font-family: 'PingFang SC-Regular', 'PingFang SC', sans-serif;
        font-weight: 400;
        color: #606266;
        margin-top: 8px;
      }
    }

    .pie-chart-container {
      width: 100%;
      height: 330px;
      margin-top: 30px;
      .chart {
        width: 95%;
        height: 95%;
        padding-top: 55px;
      }
    }
  }
}
</style>
