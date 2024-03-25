<template>
  <div>
    <div
      v-if="operateRole"
      class="form-container"
    >
      <div
        v-if="modelViewInfo.assignTeams"
        class="form-item"
      >
        <ChangeTeams
          :active-mode="mode"
          :dept="activeDept"
          :phase="phaseData"
          @teamsForm="getTeamsForm"
        />
      </div>
      <div
        v-if="modelViewInfo.calculation"
        class="form-item"
      >
        <Calculation @calculationForm="getCalculationForm" />
      </div>
      <div
        v-if="modelViewInfo.teamDueDate"
        class="form-item"
      >
        <TeamDueDate
          :active-mode="mode"
          :dept="activeDept"
          :phase="phaseData"
          @teamDueDateForm="getTeamDueDateForm"
        />
      </div>
      <div
        v-if="modelViewInfo.comments"
        class="form-item"
      >
        <Comments @commentsForm="getCommentsForm" />
      </div>
      <div>
        <el-form>
          <el-form-item label="">
            <el-button
              v-if="modelViewInfo.rejectBtn"
              size="small"
              class="submitBtn"
              @click="rejectVisible = true"
            >
              Reject
            </el-button>
            <el-button
              v-if="modelViewInfo.changeTeams"
              size="small"
              class="submitBtn"
              @click="changeTeamVisible = true"
            >
              Change team
            </el-button>
            <el-button
              v-if="modelViewInfo.sendBtn"
              type="primary"
              size="small"
              class="submitBtn"
              @click="handleSubmit"
            >
              {{ buttonLabel }}
            </el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>

    <!--提示-->
    <POPDialog
      :dialog="{
        title: 'Confirm',
        type: 'message',
        visible: confirmVisible,
        width: '560px'
      }"
      @dialogClosed="
        (val) => {
          confirmVisible = val;
        }
      "
    >
      <template #dialog-content>
        Are you going to submit the task?
      </template>
      <template #dialog-btn>
        <el-button
          size="small"
          @click="confirmVisible = false"
        >
          Cancel
        </el-button>
        <el-button
          v-if="changeMode === 'work-check'"
          type="primary"
          size="small"
          @click="requestSubmit"
        >
          Confirm
        </el-button>
        <el-button
          v-if="changeMode === 'change-teams'"
          type="primary"
          size="small"
          @click="requestChangeTeams"
        >
          Confirm
        </el-button>
      </template>
    </POPDialog>

    <!--Reject-->
    <POPDialog
      :dialog="{
        title: 'Reject',
        type: 'dialog',
        visible: rejectVisible,
        width: '560px'
      }"
      @dialogClosed="
        (val) => {
          rejectVisible = val;
        }
      "
    >
      <template #dialog-content>
        <RejectModel @rejectForm="getRejectForm" />
      </template>
      <template #dialog-btn>
        <el-button
          size="small"
          @click="rejectVisible = false"
        >
          Cancel
        </el-button>
        <el-button
          type="primary"
          size="small"
          @click="requestReject"
        >
          Submit
        </el-button>
      </template>
    </POPDialog>

    <!--Change team-->
    <POPDialog
      :dialog="{
        title: 'Change team',
        type: 'dialog',
        visible: changeTeamVisible,
        width: '1280px'
      }"
      @dialogClosed="
        (val) => {
          changeTeamVisible = val;
        }
      "
    >
      <template #dialog-content>
        <ChangeTeams
          :active-mode="mode"
          :dept="activeDept"
          :phase="phaseData"
          @teamsForm="getTeamsForm"
        />
        <TeamDueDate
          :active-mode="mode"
          :dept="activeDept"
          :phase="phaseData"
          @teamDueDateForm="getTeamDueDateForm"
        />
        <Comments @commentsForm="getCommentsForm" />
      </template>
      <template #dialog-btn>
        <el-button
          type="primary"
          size="small"
          @click="handleChangeTeams"
        >
          Assign
        </el-button>
      </template>
    </POPDialog>
  </div>
</template>

<script>
import POPDialog from '@/components/pop-dialog.vue';
import ChangeTeams from '../components/change-teams.vue';
import Calculation from '../components/calculation.vue';
import TeamDueDate from '../components/team-due-date.vue';
import Comments from '../components/comments.vue';
import RejectModel from '../components/reject-model.vue';

import { modelsView } from '../models/visualer.js';
import STATUS from '../models/process.js';

import { progressStatus, changeTeam, projectDetail } from '@/api/index.js';

export default {
  name: '',
  components: {
    ChangeTeams,
    Calculation,
    Comments,
    TeamDueDate,
    POPDialog,
    RejectModel
  },
  props: {
    dept: {
      type: String,
      default: null
    },
    mode: {
      type: Number,
      default: 0
    },
    progress: {
      type: Object,
      default: null
    }
  },
  data() {
    return {
      activeDept: '2D',
      operateRole: true,
      changeMode: 'work-check',
      modelViewInfo: {},
      buttonLabel: '',
      projectData: {},
      projectMode: 0,
      phaseData: null,
      form: {
        project_id: null,
        progress_id: null,
        type: null,
        comment: '',
        files: '[]',
        status: '',
        status_last: '',
        '3d_send': 0,
        '3d_inner_date': '',
        auto_approve: 0
      },
      confirmVisible: false,
      rejectVisible: false,
      changeTeamVisible: false
    };
  },
  watch: {
    mode: {
      handler(newValue) {
        this.projectMode = newValue;
      },
      deep: true,
      immediate: true
    },
    dept: {
      handler(newValue) {
        this.activeDept = newValue;
        if (this.phaseData && this.phaseData.id) {
          this.getModelsView();
        }
      },
      deep: true,
      immediate: true
    },
    progress: {
      handler(newValue) {
        this.phaseData = newValue;
        if (this.phaseData && this.phaseData.id) {
          this.getModelsView();
        }
      },
      deep: true,
      immediate: true
    }
  },
  methods: {
    getModelsView() {
      let { project_type } = this.$route.params;
      let { projectMode } = this;
      let dept = this.activeDept;
      if (project_type === 'bidding') {
        if (dept === '2D') {
          if (projectMode === 1) {
            this.form.type = 1;
          }
          if (projectMode === 2) {
            this.form.type = 3;
          }
        }
        if (dept === '3D') {
          if (projectMode === 1) {
            this.form.type = 4;
          }
          if (projectMode === 2) {
            this.form.type = 6;
          }
        }
      }
      if (project_type === 'formal') {
        if (dept === '2D') {
          if (projectMode === 1) {
            this.form.type = 2;
          }
          if (projectMode === 2) {
            this.form.type = 3;
          }
        }
        if (dept === '3D') {
          if (projectMode === 1) {
            this.form.type = 5;
          }
          if (projectMode === 2) {
            this.form.type = 6;
          }
        }
      }
      projectDetail({
        id: this.$route.params.project_id
      }).then((res) => {
        if (res.code === 200) {
          this.projectData = res.data;
          this.operateRole = true;
          if (
            this.projectData.archiving === 1 ||
            this.phaseData.archiving === 1
          ) {
            let { projectMode } = this;
            if (projectMode !== 2) {
              this.operateRole = false;
            }
          }
          let status = this.getActiveStatus();
          let StatusModule = new STATUS();
          let modelList = StatusModule.view(status);
          this.modelViewInfo = modelsView(modelList);
          this.justifyTeamRole(status);
          let step = StatusModule.step(status);
          this.buttonLabel = step.button;
        }
      });
    },
    justifyTeamRole(status) {
      let { phaseData } = this;
      let { projectData } = this;
      let userData = localStorage.getItem('user');
      let user = JSON.parse(userData);
      let isTeam = false;
      if (user.role === 'Team Leader' || user.role === '3D Team Leader') {
        if (status === 'CN_ASSIGNED' || status === 'CN_REJECTED') {
          if (user.team_id === phaseData['team_id']) {
            isTeam = true;
          }
        }
        if (status === 'CAL_CN_ASSIGNED' || status === 'CAL_CN_REJECTED') {
          if (user.team_id === phaseData['3d_team_id']) {
            isTeam = true;
          }
        }
        if (
          status === 'FORMAL_DESIGN_LABEL' ||
          status === 'FORMAL_LABEL_REJECTED'
        ) {
          if (user.team_id === projectData['label_team']) {
            isTeam = true;
          }
        }
        if (status === 'SIM_CN_ASSIGNED' || status === 'SIM_CN_REJECTED') {
          if (user.team_id === projectData['simulation_team_id']) {
            isTeam = true;
          }
        }
        if (!isTeam) {
          for (let row in this.modelViewInfo) {
            this.modelViewInfo[row] = false;
          }
        }
      }
    },
    getTeamsForm(value) {
      this.form['team_id'] = value;
    },
    getTeamDueDateForm(value) {
      this.form['due_date'] = value.team_due_date;
      this.form['auto_approve'] = 0;
      if (value.is_approve) {
        this.form['auto_approve'] = 1;
      }
    },
    getCalculationForm(value) {
      this.form['3d_send'] = 0;
      if (value.is_send) {
        this.form['3d_send'] = 1;
      }
      this.form['3d_inner_date'] = value.inner_date;
    },
    getCommentsForm(value) {
      this.form['comment'] = value.comment;
      this.form['files'] = value.files.length
        ? JSON.stringify(value.files)
        : '[]';
    },
    getRejectForm(value) {
      this.form['reason'] = value.reason;
      this.form['remarks'] = value.remarks;
    },
    requestReject() {
      this.changeMode = 'work-check';
      let { phaseData } = this;
      let status = this.getActiveStatus();
      let StatusModule = new STATUS();
      let requestStatus = StatusModule.step(status, 'reject');
      this.form['project_id'] = phaseData.project_id;
      this.form['progress_id'] = phaseData.id;
      this.form['status'] = requestStatus.request;
      this.form['status_last'] = requestStatus.status;

      if (!this.form.reason || this.form.reason === '') {
        this.$message({
          message: 'Please select a reason',
          type: 'warning'
        });
        return;
      }
      if (!this.form.remarks || this.form.remarks === '') {
        this.$message({
          message: 'Please enter a comment',
          type: 'warning'
        });
        return;
      }
      this.requestSubmit();
    },
    getActiveStatus() {
      let { type } = this.form;
      let statusValue;
      let { projectData } = this;
      if (type === 1 || type === 2) {
        statusValue = this.phaseData['status'];
      }
      if (type === 3) {
        statusValue = projectData['label_status'];
      }
      if (type === 4 || type === 5) {
        statusValue = this.phaseData['3d_calculation_status'];
      }
      if (type === 6) {
        statusValue = projectData['simulation_status'];
      }
      return statusValue;
    },
    handleSubmit() {
      this.changeMode = 'work-check';
      let { phaseData } = this;
      let status = this.getActiveStatus();
      let StatusModule = new STATUS();
      let requestStatus = StatusModule.step(status);
      this.form['project_id'] = phaseData.project_id;
      this.form['progress_id'] = phaseData.id;
      this.form['status'] = requestStatus.request;
      this.form['status_last'] = requestStatus.status;
      if (this.form['3d_send'] === 1 && this.form['3d_inner_date'] === '') {
        this.$message({
          message: 'Please select 3D internal due date',
          type: 'warning'
        });
        return;
      }
      if (requestStatus.request === 'CN_ASSIGNED') {
        if (!this.form.team_id || this.form.team_id === '') {
          this.$message({
            message: 'Please select team',
            type: 'warning'
          });
          return;
        }
        if (!this.form.due_date || this.form.due_date === '') {
          this.$message({
            message: 'Please select team due date',
            type: 'warning'
          });
          return;
        }
      }
      if (requestStatus.request === 'FORMAL_DESIGN_LABEL') {
        if (!this.form.team_id || this.form.team_id === '') {
          this.$message({
            message: 'Please select team',
            type: 'warning'
          });
          return;
        }
        if (!this.form.due_date || this.form.due_date === '') {
          this.$message({
            message: 'Please select team due date',
            type: 'warning'
          });
          return;
        }
      }
      if (requestStatus.request === 'CAL_CN_ASSIGNED') {
        if (!this.form.team_id || this.form.team_id === '') {
          this.$message({
            message: 'Please select team',
            type: 'warning'
          });
          return;
        }
        if (!this.form.due_date || this.form.due_date === '') {
          this.$message({
            message: 'Please select team due date',
            type: 'warning'
          });
          return;
        }
      }
      if (requestStatus.request === 'SIM_CN_ASSIGNED') {
        if (!this.form.team_id || this.form.team_id === '') {
          this.$message({
            message: 'Please select team',
            type: 'warning'
          });
          return;
        }
        if (!this.form.due_date || this.form.due_date === '') {
          this.$message({
            message: 'Please select team due date',
            type: 'warning'
          });
          return;
        }
      }
      this.confirmVisible = true;
    },
    requestSubmit() {
      let { form } = this;
      progressStatus(form).then((res) => {
        if (res.code === 200) {
          this.$emit('phaseStatus', form.status);
          this.confirmVisible = false;
          this.rejectVisible = false;
        }
      });
    },

    /**更改小组分配 */
    handleChangeTeams() {
      this.changeMode = 'change-teams';
      this.confirmVisible = true;
    },
    requestChangeTeams() {
      if (!this.form.team_id || this.form.team_id === '') {
        this.$message({
          message: 'Please select team',
          type: 'warning'
        });
        return;
      }
      if (!this.form.due_date || this.form.due_date === '') {
        this.$message({
          message: 'Please select team due date',
          type: 'warning'
        });
        return;
      }

      let { phaseData } = this;
      changeTeam({
        project_id: phaseData.project_id,
        type: this.form.type,
        progress_id: phaseData.id,
        team_id: this.form.team_id,
        auto_approve: this.form.auto_approve,
        comment: this.form.comment,
        files: this.form.files,
        team_due_date: this.form.due_date
      }).then((res) => {
        if (res.code === 200) {
          this.getProjectData();
        }
      });
    },

    /**project详情 */
    getProjectData() {
      projectDetail({
        id: this.$route.params.project_id
      }).then((res) => {
        if (res.code === 200) {
          localStorage.setItem('project', JSON.stringify(res.data));
          this.$emit('phaseStatus', 'change-team');
          this.confirmVisible = false;
          this.changeTeamVisible = false;
        }
      });
    }
  }
};
</script>

<style scoped lang="less">
.form-container {
  .form-item {
    margin-top: 16px;
  }
  .submitBtn {
    min-width: 128px;
  }
  /deep/ .el-button {
    height: 40px;
    border-radius: 4px;
    border: 1px solid #eeeeee;
    color: #303133;
    font-size: 16px;
    transition: 0.5s;
    transition-property: all;
    transition-duration: 0.5s;
    transition-timing-function: ease;
    transition-delay: 0s;
  }
  /deep/ .el-button--default:hover {
    border: 1px solid #007bff;
    color: #007bff;
  }
  /deep/ .el-button--primary {
    color: #ffffff;
    background: #007bff;
  }
  /deep/ .el-button--primary:hover {
    opacity: 0.8;
  }
}
</style>
