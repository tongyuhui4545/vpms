<template>
  <div 
    v-if="ganttShow" 
    class="gantt-card-container"
  >
    <div class="gantt-card">
      <Gantt :setting="ganttData" />
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
      ganttShow: false,
      ganttData: {
        mode: 1,
        dept: '',
        type: 0
      }
    };
  },
  mounted() {
    this.getUserInfo();
  },
  methods: {
    getUserInfo() {
      let roleArr1 = ['CN Engineer Manager'];
      let roleArr2 = ['3D Manager'];
      let roleArr3 = ['Team Leader'];
      let roleArr4 = ['3D Team Leader'];
      let user = localStorage.getItem('user');
      if (user && user !== '') {
        let userInfo = JSON.parse(user);
        let { role } = userInfo;
        if (roleArr1.indexOf(role) >= 0) {
          this.ganttShow = true;
          this.ganttData = {
            mode: 1,
            dept: '2D',
            type: 1
          };
        }
        if (roleArr2.indexOf(role) >= 0) {
          this.ganttShow = true;
          this.ganttData = {
            mode: 1,
            dept: '3D',
            type: 1
          };
        }
        if (roleArr3.indexOf(role) >= 0) {
          this.ganttShow = true;
          this.ganttData = {
            mode: 1,
            dept: '2D',
            type: 2
          };
        }
        if (roleArr4.indexOf(role) >= 0) {
          this.ganttShow = true;
          this.ganttData = {
            mode: 1,
            dept: '3D',
            type: 2
          };
        }
      }
    }
  }
};
</script>

<style scoped lang="less">
.gantt-card-container {
  min-height: calc(96vh - 514px);
  background: #ffffff;
  border-radius: 8px;
  padding: 16px 0px 16px 0px;
  .gantt-card {
    margin: 0px 16px 0px 16px;
  }
}
</style>
