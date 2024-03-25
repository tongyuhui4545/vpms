<template>
  <div class="pie-chart-container">
    <div
      ref="chart"
      class="chart"
    />
  </div>
</template>

<script>
import echarts from 'echarts';

export default {
  name: 'PieChart',
  props: {
    data: {
      type: Array,
      required: true
    }
  },
  mounted() {
    this.drawChart();
  },
  methods: {
    drawChart() {
      const chart = echarts.init(this.$refs.chart);
      const options = {
        series: [
          {
            type: 'pie',
            radius: '70%',
            data: this.data
          }
        ]
      };
      chart.setOption(options);
    }
  }
};
</script>

<style scoped>
.pie-chart-container {
  width: 100%;
  height: 300px;
  border: solid red 1px;
}

.chart {
  width: 100%;
  height: 100%;
}
</style>
