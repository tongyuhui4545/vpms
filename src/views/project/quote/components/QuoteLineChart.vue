<template>
  <div>
    <div
      :id="chartId"
      class="quote-line-chart"
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
      details:[],
      chartId: 'line',
      myChart: null,
      option: {
        tooltip: {
          trigger: 'item',
          formatter: (params) => {
            let dataIdx = params.dataIndex;
            let seriesIdx = params.seriesIndex;
            let { color } = params;

            let type = params.seriesName;
            let version = this.details[dataIdx][seriesIdx] === null ? `V${dataIdx + 1}` : this.details[dataIdx][seriesIdx].version; 
            let total_price = this.details[dataIdx][seriesIdx] === null ? '0' : this.details[dataIdx][seriesIdx].total_price;
            if(total_price) {
              total_price = total_price.toLocaleString();
            }
            let per_watt_price = this.details[dataIdx][seriesIdx] === null ? 0 : this.details[dataIdx][seriesIdx].per_watt_price;
            let phase = this.details[dataIdx][seriesIdx] === null ? ' ' : this.details[dataIdx][seriesIdx].phase;
            let creator = this.details[dataIdx][seriesIdx] === null ? ' ' : this.details[dataIdx][seriesIdx].creator;
            let created_at = this.details[dataIdx][seriesIdx] === null ? ' ' : this.details[dataIdx][seriesIdx].created_at;

            return `<div style="width: 95%">
              <div style="margin-left: 16px; position: relative; margin-top: 8px;">
              <div style="margin-bottom: 5px; display: flex; align-items: center;"><span style="border-radius: 50%; margin-right: 3px; display: inline-block; width: 6px; height: 6px; background-color: ${color}"></span><span><strong>${type} ${version}</strong></span></div>
              <div style="margin-left: 10px"><span style="color:#606266; font-size: 13px">Total Price($):</span>  &nbsp &nbsp <span style="color:#303133; font-size: 13px">${total_price}</span></div>
              <div style="margin-left: 10px"><span style="color:#606266; font-size: 13px">Per Watt Price($):</span>  &nbsp &nbsp <span style="color:#303133; font-size: 13px">${per_watt_price}</span></div>
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
        legend: {
          data: ['Harness', 'Alex', 'Lynx'],
          selected: { Alex: true, Lynx: true, Harness: true },
          icon: 'rect',
          itemWidth: 12,
          itemHeight: 4,
          left: 230,
          top: 15
        },
        xAxis: {
          type: 'category',
          name: 'Version',
          axisTick: {
            show: false
          },
          axisLabel: {
            color: '#303133'
          },
          axisLine: {
            lineStyle: {
              color: '#DCDFE6'
            }
          },
          nameGap: -8,
          nameTextStyle: {
            fontSize: 14,
            padding: [40, 0, 0, 0],
            color: '#606266'
          },
          boundaryGap: true,
          data: []
          // ['V1', 'V2', 'V3', 'V4', 'V5', 'V6', 'V7']
        },
        yAxis: {
          type: 'value',
          name: `Total price${this.currency}`,
          nameGap: 28,
          axisLine: {
            show: false
          },
          axisTick: {
            show: false
          },
          nameTextStyle: {
            fontSize: 14,
            padding: [0, 85, 0, 0],
            color: '#606266'
          }
        },
        series: [
          {
            name: 'Harness',
            type: 'line',
            data: [],
            itemStyle: {
              color: '#FFD36A'
            },
            symbol: 'circle',
            symbolSize: 8
          },
          {
            name: 'Alex',
            type: 'line',
            data: [], 
            itemStyle: {
              color: '#22D9AE'
            },
            symbol: 'circle',
            symbolSize: 8
          },
          {
            name: 'Lynx',
            type: 'line',
            data: [], 
            itemStyle: {
              color: '#5B8FF9'
            },
            symbol: 'circle',
            symbolSize: 8
          }
        ]
      }
    };
  },
  watch: {
    rawData: {
      handler(newVal) {
        this.details = newVal.detail;
        this.option.xAxis.data = newVal.label;
        // eslint-disable-next-line prefer-destructuring
        this.option.series[0].data = newVal.data[0];
        // eslint-disable-next-line prefer-destructuring
        this.option.series[1].data = newVal.data[1];
        // eslint-disable-next-line prefer-destructuring
        this.option.series[2].data = newVal.data[2];

        this.renderChart();
      }
  }
},
  mounted() {
    this.initChart();
    // this.renderChart();
  },
  methods: {
    initChart() {
      this.myChart = echarts.init(document.getElementById(this.chartId));
    },
    renderChart() {
      this.myChart.setOption(this.option);
    },
    dispatchLegends(legend) { 
      let legendSelected = {
        Harness: true,
        Alex: true,
        Lynx: true
      }
      if(legend !== 'All') {
        let unselectedValues = ['Harness', 'Lynx', 'Alex'].filter((item) => {return item !== legend})
      unselectedValues.forEach((item) => {
        legendSelected[item] = false
      })
      }
      this.option.legend.selected = legendSelected
      this.renderChart();
    }
  }
};
</script>

<style>
/* #line {
  z-index: 1
} */
.quote-line-chart {
  width: 2000px; height: 385px; transform: translateX(-105px)
}
</style>
