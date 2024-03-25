<template>
  <div
    ref="pieChart"
    class="pie-chart"
  />
</template>

<script>
import * as echarts from 'echarts';

export default {
  name: 'PieChart',
  props: {
    rawData: {
      type: Object,
      default: () => {
        return {
         
        };
      }
    }
  },
  data() {
    return {
      titleMap: {
        overdue_in_one: '1 day close to overdue',
        overdue_in_two: '2 days close to overdue',
        overdue_in_three: '3 days close to overdue',
        overdue: 'Overdue',
        normal: 'Normal'
      },
      colorMap: {
        overdue_in_one: '#34E2F6',
        overdue_in_two: '#07B1EE',
        overdue_in_three: '#0561C6',
        overdue: '#FAC042',
        normal: '#88D412'
      }
    };
  },
  watch: {
    rawData: {
      deep: true,
      handler() { 
        this.drawPieChart();
      }
    }
  },
  mounted() {
    this.drawPieChart();
  },
  methods: {
    drawPieChart() {
      // 初始化 echarts 实例
      const pieChart = echarts.init(this.$refs.pieChart);

      // 格式化数据
      const formattedData = Object.keys(this.rawData).map((key) => {
        return {
          name: this.titleMap[key],
          value: this.rawData[key],
          itemStyle: {
            color: this.colorMap[key]
          }
        };
      });

      // 配置饼图的选项
      const option = {
        tooltip: {
          trigger: 'item',
          formatter: (params) => {
      const {color} = params;
      const {name} = params;
      const {value} = params;
      const percent = params.percent.toFixed(2);
      return `<div style="background-color:${color}; width: 12px; height: 12px; border-radius: 50%; display: inline-block; margin-right: 5px;"></div>${name}: ${value} (${percent}%)`;
    },
          textStyle: {
            color: '#303133',
            fontSize: 14
          },
          backgroundColor: '#FFFFFF',
          extraCssText:
            'border-radius: 4px;  overflow-x: hidden; height: 24px; box-shadow: 0px 2px 4px 1px rgba(0,0,0,0.1);'
        },
        legend: {
          bottom: 10,
          itemGap: 20,
          data: formattedData.map((item) => {
            return item.name;
          })
        },
        series: [
          {
            name: 'Task Status',
            type: 'pie',
            radius: '72%',
            center: ['50%', '42%'],
            data: formattedData,
            label: {
              show: false
            },
            emphasis: {
              scale: 5,
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
              }
            }
          }
        ]
      };

      // 使用配置项渲染饼图
      pieChart.setOption(option);
    }
  }
};
</script>

<style scoped>
.pie-chart {
  margin: 0 auto;
  width: 650px; 
  height: 450px
}
</style>
