<template>
  <div class="change-team-container">
    <div class="team-container">
      <div class="title">
        Teams
      </div>
      <div class="team-wrapper">
        <div class="team-content">
          <div class="checkbox-wrapper">
            <el-checkbox-group
              v-model="teamValue"
              :max="1"
              @change="changeTeams"
            >
              <el-checkbox
                v-for="(item, key) in teamOptions"
                :key="key"
                :label="item.id"
              >
                {{ item.name }}
              </el-checkbox>
            </el-checkbox-group>
          </div>
          <div class="team-list">
            <div
              v-if="activeTeam.manager_id"
              class="team-row-wrapper"
            >
              <div class="team-row">
                <div class="img">
                  {{ activeTeam['manager']['initials'] }}
                </div>
                <div class="name">
                  {{ activeTeam['manager']['name'] }}
                </div>
                <div class="leader">
                  Team leader
                </div>
              </div>
            </div>
            <div class="team-row-wrapper">
              <div
                v-for="(item, key) in activeTeam['members']"
                :key="key"
                class="team-row"
              >
                <div class="img">
                  {{ item.initials }}
                </div>
                <div class="name">
                  {{ item.name }}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div
          class="view-team-gantt"
          @click="handleViewGantt"
        >
          View onging tasks
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { teamList } from '@/api/index.js';

export default {
  name: '',
  components: {},
  props: {
    activeMode: {
      type: Number,
      default: null
    },
    dept: {
      type: String,
      default: null
    },
    phase: {
      type: Object,
      default: null
    }
  },
  data() {
    return {
      phaseData: {},
      projectMode: '',
      activeDept: '',
      teamOptions: [],
      activeTeam: {},
      teamValue: []
    };
  },
  watch: {
    activeMode: {
      handler(newValue) {
        this.projectMode = newValue;
      },
      deep: true,
      immediate: true
    },
    dept: {
      handler(newValue) {
        this.activeDept = newValue;
        if (newValue && this.phaseData && this.phaseData.id) {
          this.getTeamsList();
        }
      },
      deep: true,
      immediate: true
    },
    phase: {
      handler(newValue) {
        this.phaseData = newValue;
        if (this.phaseData && this.phaseData.id) {
          this.getTeamsList();
        }
      },
      deep: true,
      immediate: true
    }
  },
  methods: {
    getTeamsList() {
      teamList({
        type: this.activeDept
      }).then((res) => {
        if (res.code === 200) {
          let { data } = res.data;
          this.teamOptions = data;
          this.getDefaultValue();
        }
      });
    },
    changeTeams() {
      let { teamValue } = this;
      if (teamValue.length > 0) {
        let [activeTeamId] = teamValue;
        this.$emit('teamsForm', activeTeamId);
        this.getTeamsDetail(activeTeamId);
      } else {
        this.$emit('teamsForm', '');
      }
    },
    getTeamsDetail(id) {
      let { teamOptions } = this;
      for (let i = 0; i < teamOptions.length; i++) {
        let item = teamOptions[i];
        if (item.id === id) {
          this.activeTeam = item;
        }
      }
    },
    getDefaultValue() {
      if (this.teamOptions.length === 1) {
        let [activeTeam] = this.teamOptions;
        this.teamValue = [activeTeam.id];
        this.changeTeams();
      }
      let { activeMode } = this;
      let { phaseData } = this;
      let projectData = localStorage.getItem('project');
      let project = JSON.parse(projectData);
      if (activeMode === 1) {
        if (this.activeDept === '2D') {
          let { team_id } = phaseData;
          if (team_id && team_id !== '') {
            this.teamValue = [team_id];
            this.changeTeams();
          }
        }
        if (this.activeDept === '3D') {
          let team_id = phaseData['3d_team_id'];
          if (team_id && team_id !== '') {
            this.teamValue = [team_id];
            this.changeTeams();
          }
        }
      }
      if (activeMode === 2) {
        if (this.activeDept === '2D') {
          let team_id = project['label_team'];
          if (team_id && team_id !== '') {
            this.teamValue = [team_id];
            this.changeTeams();
          }
        }
        if (this.activeDept === '3D') {
          let team_id = phaseData['simulation_team_id'];
          if (team_id && team_id !== '') {
            this.teamValue = [team_id];
            this.changeTeams();
          }
        }
      }
    },
    handleViewGantt(){
      let { activeDept } = this;
      const url = this.$router.resolve({ name: 'ProjectGantt' }).href;
      const target = `${url}?mode=2&dept=${activeDept}&type=1`;
      window.open(target, '_blank');
    }
  }
};
</script>

<style scoped lang="less">
.change-team-container {
  .team-container {
    margin-bottom: 16px;
    .title {
      font-size: 14px;
      color: #303133;
      line-height: 24px;
      margin-bottom: 8px;
    }
    .team-wrapper {
      border-radius: 4px;
      border: 1px solid #eeeeee;
      display: flex;
      .team-content {
        margin: 0px 16px 0px 16px;
        padding: 16px 0px 16px 0px;
        .checkbox-wrapper {
          /deep/ .el-checkbox {
            font-size: 14px;
            font-family: PingFang SC, PingFang SC;
            color: #303133;
          }
          /deep/ .el-checkbox__input.is-checked + .el-checkbox__label {
            color: #007bff;
          }
          /deep/ .el-checkbox__input.is-checked .el-checkbox__inner,
          .el-checkbox__input.is-indeterminate .el-checkbox__inner {
            color: #007bff !important;
          }
          /deep/ .el-checkbox__inner {
            width: 16px;
            height: 16px;
          }
          /deep/ .el-checkbox__inner::after {
            position: absolute;
            top: 2px !important;
            left: 5px !important;
          }
        }
        .team-list {
          .team-row-wrapper {
            display: flex;
            flex-wrap: wrap;
            .team-row {
              display: flex;
              align-items: center;
              margin-top: 16px;
              margin-right: 40px;
              .img {
                width: 32px;
                height: 32px;
                background: #f3c940;
                display: flex;
                justify-content: center;
                align-items: center;
                font-size: 13px;
                color: #ffffff;
                margin-right: 24px;
                border-radius: 50%;
              }
              .name {
                font-size: 13px;
                color: #606266;
              }
              .leader {
                width: 88px;
                height: 24px;
                background: #ffffff;
                border-radius: 4px;
                border: 1px solid #007bff;
                display: flex;
                justify-content: center;
                align-items: center;
                font-size: 13px;
                color: #007bff;
                margin-left: 16px;
              }
            }
          }
        }
      }
      .view-team-gantt {
        height:20px;
        margin: 17px 0px 0px 10px;
        font-size: 14px;
        color: #007bff;
        transition: 0.5s;
        transition-property: all;
        transition-duration: 0.5s;
        transition-timing-function: ease;
        transition-delay: 0s;
        display: inline-block;
      }
      .view-team-gantt:hover {
        cursor: pointer;
        opacity: 0.8;
      }
    }
  }
}
</style>
