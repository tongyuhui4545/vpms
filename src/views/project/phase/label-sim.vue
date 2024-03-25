<template>
  <div class="page-cpntainer">
    <div class="page-wrapper">
      <!--头部-->
      <div class="header-container">
        <div class="header-wrapper">
          <div class="title">
            Label&Sim
          </div>
        </div>
        <div
          class="return-wrapper animate"
          @click="handleBack"
        >
          <i class="el-icon-back back-icon" />
          Return
        </div>
      </div>

      <div>
        <!--Tab-->
        <div class="dept-header-container">
          <div class="tab-container">
            <div class="tab-wrapper">
              <div
                v-for="(item, key) in deptOptions"
                :key="key"
                :class="
                  item.value == activeDept ? 'tab-item-active' : 'tab-item'
                "
                @click="handleDeptTab(item.value)"
              >
                {{ item.label }}
                <div
                  v-if="item.value == activeDept"
                  class="line"
                />
              </div>
            </div>
          </div>
          <div
            class="new-task-btn"
            @click="handleAddNewTask"
          >
            Add new task
          </div>
        </div>

        <!--内容区域-->
        <div class="page-content">
          <!--phase列表-->
          <div 
            v-if="activeDept === '2D' || (activeDept === '3D' && tableData.length > 0)"
            class="phase-list-model"
          >
            <PhaseList
              :options="phaseOptions"
              :list="tableData"
              :phase-mode="phaseMode"
              @archivePhase="getArchivePhase"
              @refreshTable="getRefreshTable"
            />
          </div>
          <div v-if="tableData && tableData.length > 0">
            <!--phase详情-->
            <PhaseDetail :phase="phaseData" />
            <WorkFiles
              :mode="2"
              :dept="activeDept"
              :phase="phaseData"
            />
            <!--工作流转-->
            <WorkCheck
              :mode="2"
              :dept="activeDept"
              :progress="phaseData"
              @phaseStatus="getPhaseStatus"
            />
            <!--Comments & Updates-->
            <WorkUpdates
              :mode="2"
              :dept="activeDept"
              :progress="phaseData"
            />
          </div>
          <!--Working Hours-->
          <div v-if="activeDept === '2D' || (activeDept === '3D' && tableData.length > 0)">
            <RegisterHoursSummary />
          </div>
        </div>
      </div>
      <div
        v-if="activeDept === '3D' && tableData.length == 0"
        class="sim-no-data-wrapper"
      >
        <div class="no-data-img">
          <img
            src="@/assets/image/no-data.png"
            class="image"
            alt=""
          >
        </div>
        <div class="label">
          No simulation
        </div>
        <div
          v-if="limits['3d_simulation_add'] && tableData.length == 0"
          class="button"
          @click="addSimulation"
        >
          Generate simulation
        </div>
      </div>
    </div>

    <!--生成simulation-->
    <POPDialog
      :dialog="{
        title: 'Generate simulation',
        type: 'dialog',
        visible: simulationVisible,
        width: '560px'
      }"
      @dialogClosed="
        (val) => {
          simulationVisible = val;
        }
      "
    >
      <template #dialog-content>
        <div class="simulation-form">
          <el-form
            ref="form"
            :rules="simRules"
            :model="simForm"
            label-width="150px"
          >
            <el-form-item
              label="Simulation due date"
              prop="due_date"
            >
              <el-date-picker
                v-model="simForm.due_date"
                type="datetime"
                placeholder="Please enter date"
                size="small"
                value-format="yyyy-MM-dd HH:mm:ss"
                default-time="23:59:59"
                style="width: 280px"
              />
            </el-form-item>
            <el-form-item
              label="Phase"
              prop="progress_id"
            >
              <el-select
                v-model="simForm.progress_id"
                placeholder="Please select phase"
                size="small"
                style="width: 280px"
              >
                <el-option
                  v-for="(item, key) in phaseListOptions"
                  :key="key"
                  :label="`${item.phase_no} ${item.phase}`"
                  :value="item.id"
                />
              </el-select>
            </el-form-item>
          </el-form>
        </div>
      </template>
      <template #dialog-btn>
        <el-button
          type="primary"
          size="small"
          @click="handleSimulation"
        >
          Submit
        </el-button>
      </template>
    </POPDialog>

    <!-- 新建任务弹框 -->
    <el-dialog
      v-if="createTaskVisible"
      title="New task"
      :visible.sync="createTaskVisible"
      width="1280px"
      :close-on-click-modal="false"
      :destroy-on-close="false"
      @close="closeNewTaskDialog"
    >
      <task-form
        ref="task-form"
        type="create"
        :project-info="projectInfo"
        :task-data="projectInfo"
        @open-tab-setting="openTabSetting"
        @close="closeNewTaskDialog"
        @refresh="closeNewTaskDialog"
      />
    </el-dialog>
    <!-- tab管理 -->
    <el-dialog
      v-if="tagSettingVisible"
      title="Tag setting"
      :visible.sync="tagSettingVisible"
      width="1080px"
      :close-on-click-modal="false"
      :destroy-on-close="true"
      @close="openTaskFormDialog"
    >
      <tag-setting />
    </el-dialog>
  </div>
</template>

<script>
import PhaseList from './views/phase-list.vue';
import PhaseDetail from './views/phase-detail.vue';
import WorkFiles from './views/work-files.vue';
import WorkCheck from './views/work-check.vue';
import WorkUpdates from './views/work-updates.vue';
import RegisterHoursSummary from '../components/RegisterHoursSummary.vue';
import TaskForm from '@/views/work-table/components/task-form.vue';
import TagSetting from '@/views/work-table/components/tag-setting.vue';
import registerListeners from './controller/listener';
import POPDialog from '@/components/pop-dialog.vue';
import {
  projectDetail,
  phaseList,
  simulationTaskGeneration
} from '@/api/index.js';

export default {
  name: '',
  components: {
    PhaseList,
    PhaseDetail,
    WorkFiles,
    WorkCheck,
    WorkUpdates,
    RegisterHoursSummary,
    POPDialog,
    TaskForm,
    TagSetting
  },
  data() {
    return {
      limits: null,
      phaseMode: 1,
      projectType: '',
      archiveVisible: 0,
      deptOptions: [],
      activeDept: '2D',
      phaseOptions: [],
      phaseType: null,
      tableData: [],
      phaseData: null,
      activePhase: null,
      simulationVisible: false,
      simForm: {
        due_date: '',
        progress_id: ''
      },
      simRules: {
        due_date: [
          {
            required: true,
            message: 'Please enter team due date',
            trigger: 'change'
          }
        ],
        progress_id: [
          { required: true, message: 'Please select phase', trigger: 'change' }
        ]
      },
      phaseListOptions: [],
      //v0.8.0, yuhui, 新增任务
      createTaskVisible: false,
      tagSettingVisible: false,
      storeFormData: []
      // ************************
    };
  },
  computed: {
    projectInfo() {
      return {
        project_id: Number(this.$route.params.project_id),
        progressId: this.activePhase
      };
    }
  },
  created() {
    this.deptInit();
    this.getProjectData();
  },
  methods: {
    handleBack() {
      let { project_type } = this.$route.params;
      this.$router.push({
        path: `/index/project/${project_type}`
      });
    },
    deptInit() {
      this.limits = registerListeners('project_phase_detail');
      this.projectType = this.$route.params.project_type;
      if (this.projectType === 'bidding') {
        this.deptOptions = [
          {
            value: '3D',
            label: '3D Simulation'
          }
        ];
        this.activeDept = '3D';
      }
      if (this.projectType === 'formal') {
        let user = JSON.parse(localStorage.getItem('user'));
        let { role } = user;
        if(role && role.indexOf('3D') >= 0){
          this.deptOptions = [
            {
              value: '3D',
              label: '3D Simulation'
            }
          ];
          this.activeDept = '3D';
        }else{
          this.deptOptions = [
            {
              value: '2D',
              label: 'Label'
            },
            {
              value: '3D',
              label: '3D Simulation'
            }
          ];
          this.activeDept = '2D';
        }
      }
      this.phaseOptionsInit();
    },
    phaseOptionsInit() {
      let { activeDept } = this;
      if (activeDept === '2D') {
        this.phaseOptions = [
          {
            type: 'date',
            value: 'label_due_date',
            label: 'Label due date :'
          },
          {
            type: 'status',
            value: 'label_status_label',
            label: 'Label status :'
          }
        ];
        this.phaseType = 2;
      }
      if (activeDept === '3D') {
        this.phaseOptions = [
          {
            type: 'date',
            value: 'simulation_inner_date',
            label: 'Simulation due date :'
          },
          {
            type: 'status',
            value: 'simulation_status_label',
            label: 'Simulation status :'
          }
        ];
        this.phaseType = 3;
      }
    },

    /**project详情 */
    getProjectData() {
      projectDetail({
        id: this.$route.params.project_id
      }).then((res) => {
        if (res.code === 200) {
          localStorage.setItem('project', JSON.stringify(res.data));
          this.getTableData();
        }
      });
    },

    /**phase列表 */
    getTableData() {
      this.tableData = [];
      phaseList({
        project_id: this.$route.params.project_id,
        type: this.phaseType
      }).then((res) => {
        if (res.code === 200) {
          this.tableData = res.data;
        }
      });
    },
    handleDeptTab(value) {
      this.activeDept = value;
      this.phaseOptionsInit();
      this.getTableData();
    },

    /**刷新phase列表 */
    getRefreshTable(){
      this.getTableData();
    },
    getPhaseStatus() {
      this.getTableData();
    },

    addSimulation() {
      phaseList({
        project_id: this.$route.params.project_id
      }).then((res) => {
        if (res.code === 200) {
          this.phaseListOptions = res.data;
          this.simulationVisible = true;
        }
      });
    },
    handleSimulation() {
      let { simForm } = this;
      if (simForm.due_date === '') {
        this.$message({
          message: 'Please enter team due date',
          type: 'warning'
        });
        return;
      }
      if (simForm.progress_id === '') {
        this.$message({
          message: 'Please select phase',
          type: 'warning'
        });
        return;
      }
      simulationTaskGeneration({
        project_id: this.$route.params.project_id,
        progress_id: simForm.progress_id,
        due_date: simForm.due_date
      }).then((res) => {
        if (res.code === 200) {
          this.simulationVisible = false;
          this.getTableData();
        }
      });
    },
    getArchivePhase(val) {
      if(val){
        this.phaseData = val;
        this.activePhase = val.id;
      }else{
        this.phaseData = val;
        this.activePhase = null;
      }
    },

    //*******v0.8.0, yuhui, 新建task***
    handlePhaseListRefresh() {
      this.phaseMode = 2;
      this.getTableData();
    },
    openTaskFormDialog() {
      this.storeFormData = this.$store.state.app.customTaskInfo;
      this.createTaskVisible = true;
      this.tagSettingVisible = false;
    },
    handleAddNewTask() {
      this.createTaskVisible = true;
    },
    closeNewTaskDialog() {
      this.createTaskVisible = false;
    },
    openTabSetting() {
      this.createTaskVisible = false;
      this.tagSettingVisible = true;
    }
    // ***********end**************
  }
};
</script>

<style scoped lang="less">
.page-cpntainer {
  background: #ffffff;
  border-radius: 8px;
  min-height: calc(100vh - 92px);
  overflow:hidden;
  .page-wrapper {
    padding: 16px 0px 16px 0px;
    margin: 0px 16px 0px 16px;
    .header-container {
      display: flex;
      align-items: center;
      justify-content: space-between;
      .header-wrapper {
        display: flex;
        align-items: center;
        .title {
          line-height: 32px;
          font-weight: 550;
          font-size: 18px;
          color: #303133;
        }
      }
      .return-wrapper {
        display: flex;
        align-items: center;
        font-size: 16px;
        color: #007bff;
        margin-right: 8px;
        .back-icon {
          margin-right: 3px;
        }
      }
      .return-wrapper:hover {
        cursor: pointer;
        opacity: 0.8;
      }
    }
    .page-content {
      padding: 16px 0px 16px 0px;
      .phase-list-model {
        height: 184px;
      }
    }
  }
}
.animate {
  transition: 0.5s;
  transition-property: all;
  transition-duration: 0.5s;
  transition-timing-function: ease;
  transition-delay: 0s;
}
.dept-header-container {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 32px;
  margin: 16px 0px 0px 0px;
  .tab-container {
    display: flex;
    align-items: center;
    .tab-wrapper {
      display: flex;
      align-items: center;
    }
    .tab-item {
      font-size: 16px;
      font-weight: 550;
      color: #303133;
      line-height: 24px;
      padding-bottom: 8px;
      position: relative;
      margin-right: 40px;
      text-align: center;
      transition: 0.5s;
      transition-property: all;
      transition-duration: 0.5s;
      transition-timing-function: ease;
      transition-delay: 0s;
    }
    .tab-item-active {
      font-size: 16px;
      font-weight: 550;
      color: #007bff;
      line-height: 24px;
      padding-bottom: 8px;
      position: relative;
      text-align: center;
      margin-right: 40px;
    }
    .tab-item:hover {
      cursor: pointer;
      color: #007bff;
    }
    .line {
      position: absolute;
      bottom: 0px;
      left: 50%;
      width: 100%;
      height: 4px;
      background: #007bff;
      border-radius: 4px;
      transform: translateX(-50%);
      animation: line 0.3s;
    }
    @keyframes line {
      0% {
        width: 0px;
      }
      100% {
        width: 100%;
      }
    }
  }
  .new-task-btn {
    margin: 16px 0px 8px 0px;
    font-size: 14px;
    color: #007bff;
    line-height: 24px;
    transition: 0.5s;
    transition-property: all;
    transition-duration: 0.5s;
    transition-timing-function: ease;
    transition-delay: 0s;
  }
  .new-task-btn:hover {
    cursor: pointer;
    opacity: 0.8;
  }
}
.sim-no-data-wrapper {
  .no-data-img {
    text-align: center;
    .image {
      width: 200px;
      height: 200px;
    }
  }
  .label {
    font-size: 13px;
    font-family: PingFang SC, PingFang SC;
    font-weight: 400;
    color: #909399;
    text-align: center;
    margin-top: 8px;
  }
  .button {
    width: 160px;
    height: 40px;
    background: #007bff;
    border-radius: 4px;
    border: 1px solid #007bff;
    font-size: 16px;
    color: #ffffff;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0 auto;
    margin-top: 24px;
    transition: 0.5s;
    transition-property: all;
    transition-duration: 0.5s;
    transition-timing-function: ease;
    transition-delay: 0s;
  }
  .button:hover {
    cursor: pointer;
    opacity: 0.8;
  }
}
</style>
