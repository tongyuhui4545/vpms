<template>
  <div>
    <!-- 绘制折线图的容器 -->
    <div
      ref="dashboard-line-chart"
      class="line-chart"
    />
  </div>
</template>
  
  <script>
  import * as echarts from 'echarts';
  
  export default {
    name: 'LineChart',
    props: {
      rawData: {
        type: Array,
        default: () => {return [
              {
                  'date': '2024-01',
                  'project_count': 24,
                  'phase_count': 7
              },
              {
                  'date': '2024-02',
                  'project_count': 15,
                  'phase_count': 20
              },
              {
                  'date': '2024-03',
                  'project_count': 16,
                  'phase_count': 19
              }
          ]}
      }
    },
    data() {
      return {
        myChart: null
      }
    },
    watch: {
      // 监听rawData的变化，当rawData变化时更新图表数据
      rawData: {
        handler() {
          this.updateChart();
        },
        deep: true 
    }
  },
    mounted() {
      // 基于准备好的dom，初始化echarts实例
      this.myChart = echarts.init(this.$refs['dashboard-line-chart']);
      this.updateChart();
    },
    beforeDestroy() {
      // 销毁图表实例，释放资源
      if (this.myChart) {
        this.myChart.dispose();
      }
    },
    methods: {
      updateChart() {
          // 使用rawData更新图表的x轴数据和系列数据
          const xAxisData = this.rawData.map((item) => {return item.date});
        const projectData = this.rawData.map((item) => {return item.project_count});
        const phaseData = this.rawData.map((item) => {return item.phase_count});
  
        const option = {
          color: ['#FF8D52', '#FFAC2E'],
          tooltip: {
            trigger: 'axis',
          backgroundColor: '#FFFFFF',
          textStyle: {
            color: '#303133',
            fontSize: 14
          },
          extraCssText:
            'border-radius: 4px;  overflow-x: hidden; width: 211px; height: 100px; box-shadow: 0px 2px 4px 1px rgba(0,0,0,0.1)',
            formatter: (params) => {let content = `${params[0].axisValueLabel}`;
    params.forEach((item) => {
      // 添加每个数据项并换行
      content += `<br>${item.marker} ${item.seriesName}: ${item.value}<br>`;
    });
    return content;}
          },

          grid: {
            left: 35,
            right: 20
          },
          legend: {
            data: ['New project', 'New-added phase 60%'],
            top: '17',
            left: '75',
            itemWidth: 15,
            itemHeight: 6,
            textStyle: {
              fontSize: 13,
              color: '#303133'
            }
          },
          xAxis: {
            name: 'Month',
            nameLocation: 'end',
            nameGap: -28,
            nameTextStyle: {
              padding: [40, 0, 0, 0],
              fontSize: 14,
              fontWeight: 450,
              color: '#909399'
            },
            type: 'category',
            axisLine: {
              lineStyle: {
                color:'#DCDFE6',
                width: 1,
                type: 'solid'
              }
            },
            axisLabel: {
              fontSize: 14, 
              color: '#303133',
              align: 'center',
              padding: [5, 0, 0, 0] 
            },
            axisTick: {
              alignWithLabel: true 
            },
            data: xAxisData
          },
          yAxis: {
            name: 'Quantity',
            nameTextStyle: {
              fontSize: 14, 
              color: '#606266', 
              padding: [0, 0, 10, 0] 
            },
            axisLine: {
              show: false 
            },
            axisTick: {
              show: false 
            },
            axisLabel: {
              fontSize: 14, 
              color: '#303133' 
            },
            splitLine: {
              lineStyle: {
                color: '#DCDFE6' ,
                width: 1, 
                type: 'solid'
              }
            },
            type: 'value'
          },
          series: [
            {
              symbolSize: 4,
              itemStyle: {
                emphasis: {
                  color: '#FF8D52'
                }
              },
              emphasis: {
                itemStyle: {
                  color: '#FF8D52'
                }
              },    
              name: 'New project',
              type: 'line',
              data: projectData
            },
            {
              symbolSize: 4,
              itemStyle: {
                emphasis: {
                  color: '#FFAC2E'
                }
              },
              emphasis: {
                itemStyle: {
                  color: '#FFAC2E'
                }
              }, 
              name: 'New-added phase 60%',
              type: 'line',
              data: phaseData
            }
          ]
        };
  
        // 使用刚指定的配置项和数据更新图表。
        this.myChart.setOption(option);
      }
    }
  };
  </script>
  
  <style>
  /* 可选的样式 */
  .line-chart {
    width: 900px;height:280px;
  }
  </style>