<template>
  <div class="page-container">
    <!--我的工作台-->
    <MyWork />
    <!--<div class="work-table-container">
            <div class="info-container">
                <div class="project-table">
                    <Project></Project>
                </div>
                <div class="dynamic-table">
                    <Dynamic></Dynamic>
                </div>
            </div>
            <div class="data-container">
                <div class="canvas-container">
                    <Exponent></Exponent>
                </div>
                <div class="team-container">
                    <Team></Team>
                </div>
            </div>
        </div>-->
    <div class="work-table-container">
      <div class="info-container">
        <div class="project-table">
          <Project />
        </div>
        <div class="team-container">
          <Team />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import MyWork from './MyWork.vue';
import Project from './Project.vue';
import Team from './Team.vue';
export default {
  name: '',
  components: {
    MyWork,
    Project,
    Team
  },
  data() {
    return {};
  },
  methods: {}
};
</script>

<style lang="less" scoped>
.page-container {
  display: flex;
  flex-direction: column;
  margin-bottom: 15px;

  .work-table-container {
    display: flex;
    justify-content: space-between;
    margin-top: 15px;

    .info-container {
      flex: 1;
      display: flex;
    }

    .project-table {
      flex: 1;
      margin-right: 15px;
    }

    .dynamic-table {
      flex: 1;
      margin-top: 15px;
    }

    .data-container {
      display: flex;
      flex-direction: column;
      width: 540px;
    }

    .canvas-container {
      height: 396px;
    }

    .team-container {
      flex: 1;
    }
  }
}
</style>
