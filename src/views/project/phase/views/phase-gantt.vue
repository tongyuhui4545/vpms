<template>
  <div class="project-gantt-container">
    <div class="project-gantt-wrapper">
      <Gantt
        :setting="ganttData"
      />
    </div>
  </div>
</template>

<script>
import Gantt from '@/components/gantt/gantt.vue';
export default {
  name: '',
  components: {
    Gantt
  },
  data() {
    return {
      ganttData: {
        dept: '',
        type: 0
      }
    };
  },
  mounted() {
    this.ganttInit();
  },
  methods: {
    ganttInit(){
      let { mode } = this.$route.query;
      let { dept } = this.$route.query;
      let { type } = this.$route.query;
      this.ganttData = {
        mode: parseInt(mode),
        dept,
        type: parseInt(type)
      };
    }
  }
};
</script>

<style scoped lang="less">
.project-gantt-container {
  min-height: calc(100vh - 91px);
  background: #fff;
  border-radius: 8px;
  border: 1px solid #f0f0f3;
  .project-gantt-wrapper {
    padding: 16px 16px 16px 24px;
    position: relative;
  }
}
</style>
