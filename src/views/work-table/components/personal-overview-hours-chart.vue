<template>
  <div
    id="personal-overview-hours-chart"
    class="personal-overview-hours-chart"
  />
</template>

<script>
import echarts from 'echarts';

export default {
  props: {
    chartData: {
      type: Array,
      default: () => {return []}
    }
  },
  watch: {
    chartData: {
      handler() { 
        this.initChart();
      }
    }
  },
  mounted() {
    this.initChart();
  },
  methods: {
    initChart() {
      // 基于准备好的dom，初始化echarts实例
      const myChart = echarts.init(document.getElementById('personal-overview-hours-chart'));
      // let that = this;

      // 指定图表的配置项和数据
      const option = {
        color: ['#67D6CA', '#409EFF', '#FFD36A'],
        title: {
          text: 'Working hours',
          left: '15px',
          textStyle: {
            fontSize: 14
          }
        },
        grid: {
          top: '60px',
          left: '50px',
          bottom: '25px',
          right: '35px'
        },
        tooltip: {
          trigger: 'item',
          // formatter(params) {
          //   return that.createTooltip(params);
          // },
          backgroundColor: '#FFFFFF',
          textStyle: {
            color: '#303133',
            fontSize: 14
          },
          extraCssText:
            'border-radius: 4px;  overflow-x: hidden; width: 145px; box-shadow: 0px 2px 4px 1px rgba(0,0,0,0.1)'
        },
        legend: {
          data: ['design', 'check', 'other'],
          itemWidth: 12,
          itemHeight: 4,
          left: '85',
          top: '28'
        },
        xAxis: {
          name: 'Date',
          axisLine: {
            show: true,
            lineStyle: {
                color: '#DCDFE6'
            }
          },
          nameLocation: 'end',
          nameGap: -20,
          nameTextStyle: {
            padding: [40, 0, 0, 0],
            fontSize: 14,
            fontWeight: 450,
            color: '#909399'
          },
          axisLabel: {
            margin: 15,
            textStyle: {
              padding: [-4, 0, 0, 0],
              fontSize: 14,
              color: '#303133'
            }
          },
          data: this.chartData.map((item) => {
            return item.date;
          })
        },
        yAxis: {
          name: 'Hours',
          axisLine: {
            show: false
          },
          axisTick: {
            show: false
          },
          nameTextStyle: {
            fontSize: 14,
            fontWeight: 450,
            color: '#909399'
          },
          max: 24
        },
        series: [
          {
            name: 'design',
            type: 'bar',
            data: this.chartData.map((item) => {
              return item.design;
            })
          },
          {
            name: 'check',
            type: 'bar',
            data: this.chartData.map((item) => {
              return item.check;
            })
          },
          {
            name: 'other',
            type: 'bar',
            data: this.chartData.map((item) => {
              return item.other;
            })
          }
        ]
      };

      // 使用刚指定的配置项和数据显示图表。
      myChart.setOption(option);
    }
  //   createTooltip(params) {
  //     let { dataIndex } = params;
  //     let tooltipContent = `
  //   <div>
  //     <div>${params.name}</div>
  //     <div style='margin-left: 7px'>
  // `;

  //     // Loop through each team leader data
  //     for (let i = 0; i < this.data.length; i++) {
  //       let leaderData = this.data[i];
  //       let barColor = this.barColors[i];

  //       tooltipContent += `
  //     <div style="display: flex; justify-content: flex-start; margin-bottom: 5px; align-items: center; gap: 16px">
  //       <div style="display: flex; align-items: center;">
  //         <div style="width: 8px; height: 8px; border-radius: 50%; background-color: ${barColor}; margin-right: 4px;"></div>
  //         <div>${leaderData.name} Leader</div>
  //       </div>
  //       <div>${leaderData.data[dataIndex]}%</div>
  //     </div>
  //     <div style="display: flex; justify-content: space-around; align-items: center; margin-bottom: 8px;">
  //       <div>
  //         <span style="color:#606266; font-size: 13px">${
  //           this.computedTextLeft
  //         }</span> <span style='color: #007BFF'>${this.computedFigureLeft(
  //         params.name,
  //         i
  //       )}</span>  
  //       </div>
  //       <div>
  //         <span style="color:#606266; font-size: 13px">${
  //           this.computedTextRight
  //         }</span> <span style='color: #007BFF'>${this.computedFigureRight(
  //         params.name,
  //         i
  //       )}</span>  
  //       </div>
  //     </div>
  //   `;
  //     }

  //     tooltipContent += '</div></div>';

  //     return tooltipContent;
  //   }
  }
};
</script>

<style scoped>
#chart {
  margin: 0 auto;
}
.personal-overview-hours-chart {
  width: 1280px; height: 270px
}
</style>
