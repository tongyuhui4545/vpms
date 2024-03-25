<template>
  <div>
    <div
      :id="chartId"
      class="quote-bar-chart"
    />
  </div>
</template>

<script>
import * as echarts from 'echarts';

export default {
  props: {
    rawData: {
      type: Object,
      default: () => {return {}}
    },
    currency: {
      type: String, 
      default: 'USD'
    }
  },
  data() {
    return {
      details: [],
      chartId: 'bar',
      myChart: null,
      option: {
        legend: {
          con: 'rect',
          itemWidth: 12,
          itemHeight: 4,
          left: '240',
          top: '10'
        },
        tooltip: {
          trigger: 'item',
          formatter: (params) => {
            let dataIdx = params.dataIndex;
            let seriesIdx = params.seriesIndex;
            let { color } = params;

            let type = params.seriesName;
            let { version } = this.details[dataIdx][seriesIdx];
            let { total_price } = this.details[dataIdx][seriesIdx];
            total_price = total_price.toLocaleString();
            let { per_watt_price } = this.details[dataIdx][seriesIdx];
            let phase = params.name;
            let { creator } = this.details[dataIdx][seriesIdx];
            let { created_at } = this.details[dataIdx][seriesIdx];

            return `<div style="width: 95%">
              <div style="margin-left: 16px; position: relative; margin-top: 8px;">
              <div style="margin-bottom: 5px; display: flex; align-items: center;"><span style="border-radius: 50%; margin-right: 3px; display: inline-block; width: 6px; height: 6px; background-color: ${color}"></span><span><strong>${type} ${version}</strong></span></div>
              <div style="margin-left: 10px"><span style="color:#606266; font-size: 13px">Total Price:</span>  &nbsp &nbsp <span style="color:#303133; font-size: 13px">${total_price}</span></div>
              <div style="margin-left: 10px"><span style="color:#606266; font-size: 13px">Per Watt Price:</span>  &nbsp &nbsp <span style="color:#303133; font-size: 13px">${per_watt_price}</span></div>
              <div style="margin-left: 10px"><span style="color:#606266; font-size: 13px">Phase:</span>  &nbsp &nbsp <span style="color:#303133; font-size: 13px">${phase}</span></div>
              </div>
              <div style="margin-left: 16px; margin-top: 12px;  display: flex; align-items: center; justify-content: space-between;color:#606266; font-size: 13px"><span>${creator}</span> <span>${created_at}</span></div>
              </div>`;
          },
          backgroundColor: '#FFFFFF',
          textStyle: {
            color: '#303133',
            fontSize: 14
          },
          extraCssText:
            'border-radius: 4px;  width: 248px; height: 149px; box-shadow: 0px 2px 4px 1px rgba(0,0,0,0.1)'
        },
        dataset: {
          source: []
          //  [
          //   ['Quote Files', 'Harness', 'Alex', 'Lynx'],
          //   ['P01 (10%)', 12546, 26256, 58758],
          //   ['P02 (20%)', 78545, 0, 58758],
          //   ['P03 (30%)', 55798, 26256, 0]
          // ]
        },
        xAxis: {
          type: 'category',
          name: 'Phase',
          nameGap: -5,
          axisTick: {
            show: false
          },
          axisLine: {
            lineStyle: {
              color: '#DCDFE6'
            }
          },
          axisLabel:{
            color:'#303133'
          },
          nameTextStyle: {
            padding: [40, 0, 0, 0],
            fontSize: 14,
            fontWeight: 450,
            color: '#606266'
          }
        },
        yAxis: {
          name: `Total price${this.currency}`,
          nameGap: 18,
          axisTick: {
            show: false
          },
          nameTextStyle: {
            padding: [0, 55, 15, 0],
            fontSize: 14,
            fontWeight: 450,
            color: '#606266'
          },
          axisLine: { show: false }
        },
        series: [
          { type: 'bar', itemStyle: { color: '#FFD36A' } },
          { type: 'bar', itemStyle: { color: '#22D9AE' } },
          { type: 'bar', itemStyle: { color: '#5B8FF9' } }
        ],
        // 调整柱子的宽度
        barWidth: '24px',
        // 柱子之间无间隔
        barGap: '0%',
        // 不同类别柱子之间有间隔
        barCategoryGap: '30%'
      }
    };
  },
  watch: {
    rawData: {
      handler(newVal) {
        this.details = newVal.detail;
        this.option.dataset.source = newVal.data;
        this.initChart();
        this.renderChart();
      }
  }
},
  mounted() {
    this.initChart();
    this.renderChart();
  },
  methods: {
    initChart() {
      this.myChart = echarts.init(document.getElementById(this.chartId));
    },
    renderChart() {
      this.myChart.setOption(this.option);
    }
  }
};
</script>

<style>
/* Add any styles if needed */
.quote-bar-chart {
  width: 2020px; height: 380px; transform: translateX(-115px)
}
</style>
