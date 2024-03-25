<template>
  <div class="bar-chart">
    <div
      ref="manager-chart"
      class="chart-container"
    />
  </div>
</template>

<script>
import * as echarts from 'echarts';

export default {
  props: {
    displayType: {
      type: Number,
      default: 1
    },
    extraData: {
      type: Object,
      default: () => {
        return {};
      }
    },
    rawData: {
      type: Array,
      default: () => {
        return [];
      }
    },
    chartType: {
      type: String,
      default: ''
    },
    chartMonths: {
      type: Array,
      default: () => {
        return [];
      }
    }
  },
  data() {
    return {
      chart: null,
      data: [],
      months: ['2023-07', '2023-08', '2023-09', '2023-10'],
      // barColors: ['#9E87E9', '#22D9AE', '#5B8FF9'],
      // 横坐标轴线颜色
      xAxisLineColor: '#DCDFE6',
      // 横坐标轴线颜色
      xAxisLabelColor: '#303133',
      barData: [],
      lineData: []
    };
  },
  computed: {
    barColors() {
    if(this.data.length === 1) {
      return ['#FFD36A']
    }
    if(this.data.length > 1 && this.displayType === 1) {
      return ['#9E87E9', '#22D9AE', '#5B8FF9']   
    }
    if(this.data.length > 1 && this.displayType === 3) { 
      return ['#76ED90', '#5EC6FF']
    }
    return ['#9E87E9', '#22D9AE', '#5B8FF9', '#76ED90', '#5EC6FF']
    },
    computedTooltipHeight() {
      return this.data.length > 1 ? '191px' : '89px';
    },
    computedTextLeft() {
      return this.chartType === 'overdue' ? 'Overdue tasks' : 'Total errors';
    },
    computedTextRight() {
      return this.chartType === 'overdue' ? 'Total tasks' : 'Total tasks';
    }
    // computedFigureLeft() {
    //   if (this.chartType == 'overdue') {
    //     let arr = this.extraData.map(item => item.overdue_tasks);
    //     return arr
    //   }
    //   if (this.chartType == 'error-rate') {
    //     let arr = this.extraData.map(item => item.total_errors);
    //     return arr
    //   }
    // },
    // computedFigureRight() {
    //   let arr = this.extraData.map(item => item.total_tasks);
    //   return arr
    // }
  },
  watch: {
    rawData: {
      handler(val) {
        this.clearData();
        this.data = [...val];
        // this.drawChart();
        this.recreateChart();
      }
    }
  },
  mounted() {
    // this.chart = echarts.init(this.$refs['manager-chart']);
    this.recreateChart();
  },
  methods: {
    recreateChart() {
    if (this.chart) {
      // 销毁当前的 ECharts 实例
      this.chart.dispose();
    }
    // 重新初始化 ECharts 实例
    this.chart = echarts.init(this.$refs['manager-chart']);
    // 绘制图表
    this.drawChart();
  },
    computedFigureLeft(month, index) {
      if (this.chartType === 'overdue') {
        let targetData = this.extraData.value[index].data;
        targetData = targetData[month];
        return targetData.overdue_tasks || 0;
      }
      if (this.chartType === 'error-rate') {
        let targetData = this.extraData.value[index].data;
        targetData = targetData[month];
        return targetData.total_errors || 0;
      }
    },
    computedFigureRight(month, index) {
      if (this.chartType === 'overdue') {
        let targetData = this.extraData.value[index].data;
        targetData = targetData[month];
        return targetData.total_phase || 0;
      }
      if (this.chartType === 'error-rate') {
        let targetData = this.extraData.value[index].data;
        targetData = targetData[month];
        return targetData.total_tasks || 0;
      }
    },
    clearData() {
      this.data = [];
      this.barData = [];
      this.lineData = [];
      this.months = [];
    },
    processBarData() {
      if(this.data.length > 0) {
        this.barData = this.data.map((item, index) => {
        return {
          name: item.name,
          type: 'bar',
          // 调整柱状图的宽度
          barWidth: '30px',
          data: item.data.map((rate) => {
            return (rate * 100).toFixed(2);
          }),
          barGap: 0,
          // 使用不同颜色以区分不同组
          itemStyle: {
            color: this.barColors[index]
          }
        };
      });
      }
    },
    processLineData() {
      if(this.data.length > 0) {
        this.lineData = this.data.map((item, index) => {
        return {
          name: item.name,
          type: 'line',
          data: item.data.map((rate) => {
            return (1.1 * rate * 100).toFixed(2);
          }),
          // 使用不同颜色以区分不同组
          itemStyle: {
            normal: {
              color: this.barColors[index],
              lineStyle: {
                type: 'dotted'
              }
            }
          },
          symbol: 'circle',
          symbolSize: 5
        };
      });
     }
    },
    createTooltip(params) {
      let { dataIndex } = params;
      let tooltipContent = `
      <div>
        <div>${params.name}</div>
        <div style='margin-left: 7px'>
    `;

      // Loop through each team leader data
      for (let i = 0; i < this.data.length; i++) {
        let leaderData = this.data[i];
        let barColor = this.barColors[i];

        tooltipContent += `
        <div style="display: flex; justify-content: flex-start; margin-bottom: 5px; align-items: center; gap: 16px">
          <div style="display: flex; align-items: center;">
            <div style="width: 8px; height: 8px; border-radius: 50%; background-color: ${barColor}; margin-right: 4px;"></div>
            <div>${leaderData.name}</div>
          </div>
          <div>${leaderData.data[dataIndex]}%</div>
        </div>
        <div style="display: flex; justify-content: space-around; align-items: center; margin-bottom: 8px;">
          <div>
            <span style="color:#606266; font-size: 13px">${
              this.computedTextLeft
            }</span> <span style='color: #007BFF'>${this.computedFigureLeft(
          params.name,
          i
        )}</span>  
          </div>
          <div>
            <span style="color:#606266; font-size: 13px">${
              this.computedTextRight
            }</span> <span style='color: #007BFF'>${this.computedFigureRight(
          params.name,
          i
        )}</span>  
          </div>
        </div>
      `;
      }

      tooltipContent += '</div></div>';

      return tooltipContent;
    },
    drawChart() {
      // const chart = echarts.init(this.$refs.chart);
      this.processBarData();
      this.processLineData();

      let that = this;
      // 配置图表
      const option = {
        tooltip: {
          trigger: 'item',
          formatter(params) {
            return that.createTooltip(params);
          },
          backgroundColor: '#FFFFFF',
          textStyle: {
            color: '#303133',
            fontSize: 14
          },
          extraCssText: `border-radius: 4px; width: 264px; height: ${that.computedTooltipHeight}; overflow-y:auyo; overflow-x:hidden; box-shadow: 0px 2px 4px 1px rgba(0,0,0,0.1)`
        },
        xAxis: {
          name: 'Month',
          nameTextStyle: {
            color: '#909399 ',
            fontSize: 14
          },
          type: 'category',
          data: this.chartMonths,
          axisLabel: {
            formatter: '{value}',
            // 设置横坐标轴标签颜色
            color: this.xAxisLabelColor,
            fontSize: 14
          },
          axisTick: {
            // 刻度线与标签对齐
            alignWithLabel: true
          },
          axisLine: {
            lineStyle: {
              // 设置轴线颜色
              color: this.xAxisLineColor
            }
          }
        },
        yAxis: {
          name: 'Percentage',
          axisLabel: {
            color: '#303133',
            fontSize: 14,
            formatter(value) {
              // 格式化刻度为百分比形式
              return `${value / 100}%`;
            }
          },
          nameTextStyle: {
            color: '#606266',
            fontSize: 14
          },
          type: 'value',
          axisTick: {
            // 不显示刻度线
            show: false
          },
          axisLine: {
            // 不显示轴线
            show: false
          },
          splitLine: {
            show: true,
            lineStyle: {
              // 设置刻度线颜色
              color: '#DCDFE6',
              // 设置刻度线宽度
              width: 1,
              // 设置刻度线样式
              type: 'solid'
            }
          }
        },
        series: [...this.barData, ...this.lineData],
        legend: {
          itemWidth: 12,
          itemHeight: 4,
          left: '160',
          top: '28',
          itemGap: 3
        }
      };

      // 使用配置项显示图表
      this.chart.setOption(option);
    }
  }
};
</script>

<style scoped>
.chart-container {
  width: 850px;
  height: 400px;
  margin: 0 auto;
}
</style>
