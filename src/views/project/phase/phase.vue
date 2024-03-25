<template>
  <div class="page-cpntainer">
    <div class="page-wrapper">
      <!--头部-->
      <div class="header-container">
        <div class="header-wrapper">
          <div class="title">
            Phase
          </div>
          <div
            v-if="phaseData && phaseData['archiving'] === 1"
            class="archive-info"
            data-aos="slide-up"
          >
            <i class="el-icon-warning icon" />
            <span class="label">
              The current phase has been automatically/manually archived and can
              only be viewed. Please unarchive it if you want to edit it.
            </span>
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

      <!--内容区域-->
      <div class="page-content">
        <!--phase列表-->
        <div class="phase-list-model">
          <PhaseList
            :options="phaseOptions"
            :phase-mode="phaseMode"
            :list="tableData"
            @archivePhase="getArchivePhase"
            @refreshTable="getRefreshTable"
          />
        </div>
        <div v-if="tableData && tableData.length > 0">
          <!--Tab-->
          <div class="dept-header-container">
            <div class="tab-container">
              <div
                v-if="phaseData && phaseData['3d_send'] === 1"
                class="tab-wrapper"
              >
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
          <!--phase详情-->
          <OverdueModel
            :dept="activeDept"
            :phase="phaseData"
          />
          <PhaseDetail :phase="phaseData" />
          <WorkFiles
            :mode="1"
            :dept="activeDept"
            :phase="phaseData"
          />
          <!--工作流转-->
          <WorkCheck
            :mode="1"
            :dept="activeDept"
            :progress="phaseData"
            @phaseStatus="getPhaseStatus"
            @team-changed="refreshUpdates"
          />
          <!--Comments & Updates-->
          <WorkUpdates
            ref="work-updates"
            :mode="1"
            :dept="activeDept"
            :progress="phaseData"
          />
        </div>
        <!--Working Hours-->
        <RegisterHoursSummary />
      </div>
    </div>

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
import OverdueModel from './components/over-date.vue';
import PhaseDetail from './views/phase-detail.vue';
import WorkFiles from './views/work-files.vue';
import WorkCheck from './views/work-check.vue';
import WorkUpdates from './views/work-updates.vue';
import RegisterHoursSummary from '../components/RegisterHoursSummary.vue';
import TaskForm from '@/views/work-table/components/task-form.vue';
import TagSetting from '@/views/work-table/components/tag-setting.vue';
import { projectDetail, phaseList } from '@/api/index.js';

export default {
  name: '',
  components: {
    PhaseList,
    OverdueModel,
    PhaseDetail,
    WorkFiles,
    WorkCheck,
    WorkUpdates,
    RegisterHoursSummary,
    TaskForm,
    TagSetting
  },
  data() {
    return {
      archiveVisible: 0,
      deptOptions: [
        {
          value: '2D',
          label: '2D'
        },
        {
          value: '3D',
          label: '3D'
        }
      ],
      activeDept: '2D',
      phaseOptions: [
        {
          type: 'date',
          value: 'due_date',
          label: 'Customer due date :'
        },
        {
          type: 'status',
          value: 'status_label',
          label: 'Quote status :'
        },
        {
          type: 'status',
          value: '3d_calculation_status_label',
          label: '3D calculation status :'
        }
      ],
      tableData: [],
      phaseData: null,
      activePhase: null,
      phaseMode: 1,
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
    this.getProjectData();
  },
  methods: {
    refreshUpdates() {
      this.$refs['work-updates'].getUpdates(); 
    },
    handleBack() {
      let { project_type } = this.$route.params;
      this.$router.push({
        path: `/index/project/${project_type}`
      });
    },

    /**project详情 */
    getProjectData() {
      projectDetail({
        id: this.$route.params.project_id
      }).then((res) => {
        if (res.code === 200) {
          localStorage.setItem('project', JSON.stringify(res.data));
          this.phaseMode = 1;
          this.getTableData();
        }
      });
    },

    /**phase列表 */
    getTableData() {
      this.tableData = [];
      phaseList({
        project_id: this.$route.params.project_id
      }).then((res) => {
        if (res.code === 200) {
          this.tableData = res.data;
        }
      });
    },

    handleDeptTab(value) {
      this.activeDept = value;
    },
    getArchivePhase(val) {
      if (val) {
        this.phaseData = val;
        this.activePhase = val.id;
      } else {
        this.phaseData = val;
        this.activePhase = null;
      }
    },

    /**刷新phase列表 */
    getRefreshTable(val) {
      if (val && val !== '') {
        this.phaseMode = 1;
        if (val.indexOf('-') >= 0) {
          let valArr = val.split('-');
          let [ mode ] = valArr;
          this.phaseMode = parseInt(mode);
        }
        this.getTableData();
      }
    },

    getPhaseStatus() {
      this.phaseMode = 2;
      this.getTableData();
    },

    //*******v0.8.0, yuhui, 新建task***
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
  overflow: hidden;
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
        .archive-info {
          margin-left: 16px;
          height: 32px;
          background: rgba(0, 123, 255, 0.1);
          border-radius: 4px;
          display: flex;
          align-items: center;
          padding: 0px 24px 0px 16px;
          transition: 0.5s;
          transition-property: all;
          transition-duration: 0.5s;
          transition-timing-function: ease;
          transition-delay: 0s;
          .icon {
            font-size: 14px;
            margin-right: 8px;
            color: #007bff;
          }
          .label {
            font-size: 14px;
            color: #007bff;
          }
          animation: move 0.5s;
        }
        @keyframes move {
          0% {
            transform: scale(0);
          }
          100% {
            transform: scale(1);
          }
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
  margin: 16px 0px 8px 0px;
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
</style>
