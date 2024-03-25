<template>
  <div class="page-container">
    <Card class="card-templete">
      <template #cardHeader>
        <span class="iconfont icon-fenxi card-icon" />
        Statistics
      </template>
      <template #cardOperate>
        <div class="card-btn animate">
          View more
        </div>
      </template>
      <template #cardContent>
        <div
          id="myChart"
          style="width: 100%; height: 290px"
        />
      </template>
    </Card>
  </div>
</template>

<script>
import Card from '@/components/Card.vue';
export default {
  name: '',
  components: {
    Card
  },
  data() {
    return {};
  },
  mounted() {
    this.$nextTick(function () {
      this.drawChart();
    });
  },
  methods: {

    /**数据分析图表 */
    drawChart() {
      let myChart = this.$echarts.init(document.getElementById('myChart'));
      let option = {
        legend: {
          data: ['Allocated Budget', 'Actual Spending']
        },
        radar: {
          // shape: 'circle',
          indicator: [
            { name: 'Sales', max: 6500 },
            { name: 'Administration', max: 16000 },
            { name: 'Information Technology', max: 30000 },
            { name: 'Customer Support', max: 38000 },
            { name: 'Development', max: 52000 },
            { name: 'Marketing', max: 25000 }
          ]
        },
        series: [
          {
            name: 'Budget vs spending',
            type: 'radar',
            data: [
              {
                value: [4200, 3000, 20000, 35000, 50000, 18000],
                name: 'Allocated Budget'
              },
              {
                value: [5000, 14000, 28000, 26000, 42000, 21000],
                name: 'Actual Spending'
              }
            ]
          }
        ]
      };
      myChart.setOption(option);
    }
  }
};
</script>

<style lang="less" scoped>
.page-container {
  height: 100%;
  
  .card-templete {
    height: 100%;
  }
}
</style>
