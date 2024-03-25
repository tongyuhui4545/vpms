<template>
  <div class="horizontal-bar-chart">
    <div
      ref="chart"
      class="chart-container"
    />
  </div>
</template>

<script>
import echarts from 'echarts';

export default {
  props: {
    chartData: {
      type: Object,
      default: () => {
        return {
          xAxisData: [],
          yAxisData: []
        };
      }
    },
    showTotalCost: {
      type: Boolean,
      default: false
    }
  },
  watch: {
    chartData: {
      handler () {
        this.updateChart();
      },
      deep: true
    }
  },
  mounted() {
    this.initChart();
  },
  methods: {
    initChart() {
      this.chart = echarts.init(this.$refs.chart);
      this.updateChart();
    },
    updateChart() {
      let that = this;
      // 处理纵坐标数据，截取超过20个字符的名称
      const option = {
        xAxis: {
          type: 'value',
          axisLine: { show: false },
          axisLabel: {
            color: '#606266',
            // 使用驼峰命名
            fontWeight: 400, 
            fontSize: 14
          },
          axisTick: {
            show: true,
            lineStyle: {
              color: '#DCDFE6',
              width: 1,
              type: 'solid'
            }
          }
        },
        yAxis: {
          type: 'category',
          data: that.chartData.yAxisData.map((item) => {return item.name}),
          axisLine: {
            show: true,
            lineStyle: { color: '#DCDFE6', width: 1, type: 'solid' }
          },
          axisTick: {
            show: false
          },
          axisLabel: {
            color: '#303133',
            fontWeight: 400,
            fontSize: 16,
            formatter (value) {
              const itemData = that.chartData.yAxisData.find(
                (item) => {return item.name === value}
              );
              return itemData && itemData.name.length > 15
                ? `${itemData.name.slice(0, 10)}...`
                : value;
            }
          }
        },
        series: [
          {
            name: 'Hours',
            data: this.chartData.xAxisData,
            type: 'bar',
            barMaxWidth: 24,
            itemStyle: {
              color: '#5B8FF9'
            },
            emphasis: {
              // Hover 高亮样式
              itemStyle: {
                color: '#5B8FF9'
              }
            }
          }
        ],
        tooltip: {
          trigger: 'item',
          formatter (params) {
            const itemData = that.chartData.yAxisData[params.dataIndex];
            let totalCostInfo = '';
            if (that.showTotalCost) {
              totalCostInfo = `<span>Total cost: $${itemData.totalCost}</span>`;
            }
            return `
          <div style="display: flex; align-items:stretch ; justify-content: center; flex-direction: column; margin-left: 15px">
            <p style='color: #007BFF; font-size: 14px; font-weight: 500; line-height: 20px'>${params.name}</p>
            <div style="display: flex; flex-direction: column; justify-content: flex-start; gap: 2px; color: #606266; font-size: 13px; font-weight: 400;">
              <span>Actual hours worked: ${params.value}</span>
              ${totalCostInfo}
            </div>
          </div>
           `;
          },
          backgroundColor: '#FFFFFF',
          textStyle: {
            color: '#303133',
            fontSize: 14
          },
          extraCssText:
            'border-radius: 4px; width: 240px; height: 103px; box-shadow: 0px 2px 4px 1px rgba(0,0,0,0.1)'
        }
      };
      this.chart.setOption(option);
    }
  }
};
</script>

<style scoped>
.horizontal-bar-chart {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 300px;
}

.chart-container {
  width: 100%;
  height: 100%;
  margin-top: -70px;
}
</style>
