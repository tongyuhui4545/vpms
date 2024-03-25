<template>
  <div class="form-container">
    <el-form
      :rules="workRules"
      :model="workForm"
      label-width="130px"
    >
      <el-form-item
        :label="dateLabel"
        prop="team_due_date"
      >
        <div class="form-inline">
          <el-date-picker
            v-model="workForm.team_due_date"
            type="datetime"
            placeholder="Please enter date"
            size="small"
            value-format="yyyy-MM-dd HH:mm:ss"
            default-time="23:59:59"
            class="form-gap"
            style="width: 280px"
            @change="handleSend"
          />
          <el-checkbox 
            v-model="workForm.is_approve"
            @change="handleSend"
          >
            Approve automatically
          </el-checkbox>
        </div>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
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
      dateLabel: 'Team due date',
      workForm: {
        'team_due_date': '',
        'is_approve': false
      },
      workRules: {
        'team_due_date': [
          {
            required: true,
            message: 'Please select team due date',
            trigger: 'change'
          }
        ]
      }
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
          this.getDefaultValue();
        }
      },
      deep: true,
      immediate: true
    },
    phase: {
      handler(newValue) {
        this.phaseData = newValue;
        if (this.phaseData && this.phaseData.id) {
          this.getDefaultValue();
        }
      },
      deep: true,
      immediate: true
    }
  },
  methods: {
    handleSend(){
      let {workForm} = this;
      this.$emit('teamDueDateForm', workForm);
    },
    getDefaultValue(){
      let { projectMode } = this;
      let { phaseData } = this;
      let projectData = localStorage.getItem('project');
      let project = JSON.parse(projectData);
      
      if (projectMode === 1) {
        if (this.activeDept === '2D') {
          this.dateLabel = 'Team due date';
          if(phaseData['team_due_date'] && phaseData['team_due_date'] !== ''){
            this.workForm.team_due_date = phaseData['team_due_date'];
            if(phaseData['2d_auto_approve'] && phaseData['2d_auto_approve'] === 1){
              this.workForm.is_approve = true;
            }
            this.handleSend();
          }
        }
        if (this.activeDept === '3D') {
          this.dateLabel = '3D Calculation due date';
          if(phaseData['3d_team_due_date'] && phaseData['3d_team_due_date'] !== ''){
            this.workForm.team_due_date = phaseData['3d_team_due_date'];
            if(phaseData['3d_cal_auto_approve'] && phaseData['3d_cal_auto_approve'] === 1){
              this.workForm.is_approve = true;
            }
            this.handleSend();
          }
        }
      }
      if (projectMode === 2) {
        if (this.activeDept === '2D') {
          this.dateLabel = 'Label due date';
          if(project['label_due_date'] && project['label_due_date'] !== ''){
            this.workForm.team_due_date = project['label_due_date'];
            if(phaseData['label_auto_approve'] && phaseData['label_auto_approve'] === 1){
              this.workForm.is_approve = true;
            }
            this.handleSend();
          }
        }
        if (this.activeDept === '3D') {
          this.dateLabel = '3D Simulation due date';
          if(project['simulation_team_due_date'] && project['simulation_team_due_date'] !== ''){
            this.workForm.team_due_date = project['simulation_team_due_date'];
            if(phaseData['3d_sim_auto_approve'] && phaseData['3d_sim_auto_approve'] === 1){
              this.workForm.is_approve = true;
            }
            this.handleSend();
          }
        }
      }
    }
  }
};
</script>

<style scoped lang="less">
.form-container {
  .form-gap {
    margin-right: 16px;
  }
  /deep/ .el-form-item__label{
    text-align: left;
  }
}
</style>
