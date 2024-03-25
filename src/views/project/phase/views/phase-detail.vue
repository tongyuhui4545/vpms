<template>
  <div class="phase-detail-wrapper">
    <!--Configuration-->
    <div class="configuration-header-container">
      <div class="configuration-tab">
        <div
          v-for="(item, key) in seriesOption"
          :key="key"
          :class="activeSeries == item.id ? 'tab-item-active' : 'tab-item'"
          @click="handleSeriesTab(item)"
        >
          Configuration {{ phaseData.version }}-{{ item.version }}
        </div>
      </div>
      <div class="configuration-operate">
        <div
          v-if="seriesOption.length > 0"
          class="creater-info"
          data-aos="flip-left"
        >
          <div
            v-if="seriesData.user"
            class="creater"
          >
            {{ seriesData.user.name }}
          </div>
          <div class="date">
            {{ seriesData.created_at }}
          </div>
        </div>
        <div
          v-if="(limits.configuration_add || limits.configuration_edit || limits.configuration_delete) && phaseData"
          class="operate"
        >
          <el-dropdown
            size="small"
            trigger="click"
            @command="handleCommand"
          >
            <span class="el-dropdown-link">
              <i class="el-icon-setting operate-icon" />
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item
                v-if="limits.configuration_add"
                :disabled="!operateRole"
                command="new"
              >
                <div class="menu">
                  <i class="el-icon-plus icon" />
                  New configuration
                </div>
              </el-dropdown-item>
              <el-dropdown-item
                v-if="limits.configuration_add"
                :disabled="!operateRole"
                command="copy"
              >
                <div class="menu">
                  <i class="el-icon-copy-document icon" />
                  Copy configuration
                </div>
              </el-dropdown-item>
              <el-dropdown-item
                v-if="limits.configuration_edit && seriesOption.length > 0"
                :disabled="!operateRole"
                command="edit"
              >
                <div class="menu">
                  <i class="el-icon-edit-outline icon" />
                  Edit configuration
                </div>
              </el-dropdown-item>
              <el-dropdown-item
                v-if="limits.configuration_delete && seriesOption.length > 0"
                :disabled="!operateRole"
                command="delete"
              >
                <div class="menu">
                  <i class="el-icon-delete icon" />
                  Delete configuration
                </div>
              </el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </div>
      </div>
    </div>
    <Configuration :configuration-data="seriesData" />
    <CustomerFiles :progress="phaseData" />
    <!--Comment-->
    <div class="comments-container">
      <div class="comments-header">
        <div class="title-wrapper">
          <div class="icon">
            <i class="el-icon-chat-square" />
          </div>
          <div class="title">
            Comment
          </div>
        </div>
      </div>
      <div class="comments-content">
        <div
          v-if="phaseData && phaseData.remarks"
          class="content"
        >
          {{ phaseData.remarks }}
        </div>
        <div
          v-else
          class="no-data-wrapper"
        >
          <div class="img-wrapper">
            <img
              src="@/assets/image/no-data.png"
              alt=""
              class="no-data-img"
            >
          </div>
          <div class="label">
            No data
          </div>
        </div>
      </div>
    </div>

    <!--Copy configuration-->
    <POPDialog
      :dialog="{
        title: 'Copy configuration',
        type: 'dialog',
        visible: copyVisible,
        width: '560px'
      }"
      @dialogClosed="handleClose"
    >
      <template #dialog-content>
        <div class="copy-configuration-container">
          <el-form
            ref="form"
            :rules="copyRules"
            :model="copyForm"
            label-width="115px"
          >
            <el-form-item
              label="Project"
              prop="project_id"
            >
              <el-select
                ref="elSelect"
                v-model="copyForm.project_id"   
                clearable
                remote
                :remote-method="handleSearchProject"
                name="projectSelectInput"
                placeholder="Please select"
                size="small"
                class="input"
                filterable
                @visible-change="handleSelectVisibleChange"
                @change="getPhaseList"
              >
                <el-option
                  v-for="item in projectOptions"
                  :key="item.id"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
              <!-- <LazyLoadingProjectSelector
                ref="project-selector"
                @select-project="handleSelectProject"
              /> -->
            </el-form-item>
            <el-form-item
              label="Phase"
              prop="progress_id"
            >
              <el-select
                v-model="copyForm.progress_id"
                placeholder="Please select"
                size="small"
                class="input"
                @change="getConfigurationList"
              >
                <el-option
                  v-for="(item, key) in phaseOptions"
                  :key="key"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
            </el-form-item>
            <el-form-item
              label="Configuration"
              prop="series_id"
            >
              <el-select
                v-model="copyForm.series_id"
                placeholder="Please select"
                size="small"
                class="input"
                filterable
                @change="handleChooseConfiguration"
              >
                <el-option
                  v-for="(item, key) in configurationOptions"
                  :key="key"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
            </el-form-item>
          </el-form>
        </div>
      </template>
      <template #dialog-btn>
        <el-button
          size="small"
          @click="handleClose"
        >
          Cancel
        </el-button>
        <el-button
          type="primary"
          size="small"
          @click="handleConfirmCopy"
        >
          Confirm
        </el-button>
      </template>
    </POPDialog>

    <!--删除， v0.8.0 tyh加-->
    <POPDialog
      :dialog="{
        title: 'Tips',
        type: 'message',
        visible: deleteVisible,
        width: '560px'
      }"
      @dialogClosed="
        (val) => {
          deleteVisible = val;
        }
      "
    >
      <template #dialog-content>
        Are you sure to delete?
      </template>
      <template #dialog-btn>
        <el-button
          size="small"
          @click="deleteVisible = false"
        >
          Cancel
        </el-button>
        <el-button
          type="primary"
          size="small"
          @click="requestDelete"
        >
          Confirm
        </el-button>
      </template>
    </POPDialog>
  </div>
</template>

<script>
import Configuration from './configuration.vue';
import CustomerFiles from './customer-files.vue';
import POPDialog from '@/components/pop-dialog.vue';
import registerListeners from '../controller/listener';

import {
  progressDetail,
  deleteSeries,
  projectsList,
  phaseList,
  projectDetail
} from '@/api/index.js';

export default {
  name: '',
  components: {
    POPDialog,
    Configuration,
    CustomerFiles
  },
  props: {
    phase: {
      type: Object,
      default: null
    }
  },
  data() {
    return {
      limits: null,
      operateRole: true,
      project_id: '',
      branchInfo: [],
      phaseData: null,
      seriesOption: [],
      activeSeries: null,
      // v0.8.0tyh
      search: '',
      projectOptions: [],
      phaseOptions: [],
      configurationOptions: [],
      configurationData: [],
      configurationForCopy: {},
      // *************
      seriesData: {},
      copyVisible: false,
      //v0.8.0,tyh加
      deleteVisible: false,
      noMore: false,
      page: 1,
      //v0.8.0, tyh加，本页面可能会有多种删除操作，确认框弹出的时候，标记一下删除的对象
      deleteTarget: '',
      copyForm: {
        project_id: '',
        progress_id: '',
        series_id: ''
      },
      copyRules: {
        project_id: [
          { required: true, message: 'Please select project', trigger: 'blur' }
        ],
        progress_id: [
          { required: true, message: 'Please select phase', trigger: 'blur' }
        ],
        series_id: [
          {
            required: true,
            message: 'Please select configuration',
            trigger: 'blur'
          }
        ]
      }
    };
  },
  watch: {
    phase: {
      handler(newValue) { 
        if(newValue){
          this.getOptionsInfo(newValue);
        }
      },
      deep: true,
      immediate: true
    }
  },
  created() {
    this.limits = registerListeners('project_phase_detail');
  },
  methods: {
    handleSelectProject(projectId) {
      this.form.project_id = projectId;
      phaseList({ project_id: projectId })
        .then((res) => {
          if (res.code === 200) {
            this.phaseList = res.data;
          }
        })
        .catch((err) => {
          return err;
        });
    },
    // v0.8.0-yuhui-copy
    handleConfirmCopy() {
      let valid = this.copyForm.progress_id && this.copyForm.series_id;
      if (!valid) {
        this.$message.error('Please fill in all the fields required');
        return;
      }
      this.$router.push({
        path: '/index/project/series/form',
        query: {
          mode: 'copy',
          progressId: this.phaseData.id,
          seriesId: this.configurationForCopy.id,
          progressRate: this.phaseData.progress
        }
      });
    },
    handleSearchProject(val) {
      this.search = val;
      this.page = 1;
      this.phaseOptions = [];
      this.configurationOptions = [];
      projectsList({ page: 1, search: val }).then((res) => {
        if (res.code === 200) {
          let rawData = res.data.data;
          rawData = rawData.map((item) => {
            return { label: item.name, value: item.id };
          });
          this.projectOptions = rawData;
        }
      });
    },
    handleClose() {
      this.copyForm = {
        project_id: this.$route.params.project_id,
        progress_id: '',
        series_id: ''
      };
      this.copyVisible = false;
    },
    handleSelectVisibleChange(visible) {
      if (visible) {
        this.page = 1;
        this.search = '';
        let that = this;
        // 下拉框打开时的处理逻辑
        this.$nextTick(() => {
          const dropdown =
            that.$refs['elSelect'].$refs['scrollbar'].$refs['wrap'];
          dropdown.addEventListener('scroll', that.handleDropdownScroll);
        });
      }
    },
    handleDropdownScroll() {
      // 下拉框滚动时的处理逻辑
      let e = this.$refs['elSelect'].$refs['scrollbar'].$refs['wrap'];
      if (this.noMore) {
        return;
      }
      let loadMore = e.scrollHeight - e.scrollTop <= e.clientHeight;
      if (loadMore) {
        this.loadMore();
      }
    },
    loadMore() {
      this.page++;
      this.getProjectList(this.page, this.search);
    },
    getProjectList(page, search) {
      let params = search ? { page, search } : { page };
      projectsList(params).then((res) => {
        if (res.code === 200) {
          let rawData = res.data.data;
          rawData = rawData.map((item) => {
            return { label: item.name, value: item.id };
          });
          this.projectOptions =
            this.projectOptions.length === 0
              ? rawData
              : this.projectOptions.concat(rawData);
        }
      });
    },
    //打开copyFrom, 默认选中当前project, 并通过这个projectId去获取phaseList
    selectDefaultProject() { 
      let projectId = this.$route.params.project_id;
      projectDetail({ id: projectId }).then((res) => {
        if (res.code === 200) {
          this.$nextTick(() => {
            //  this.copyForm.project_id = projectId;
            let el = document.getElementsByName('projectSelectInput');
            el[0].value = res.data.description;
            this.getPhaseList(projectId);
          });
        }
      });
    },
    getPhaseList(val) {
      if(val) {
        this.copyForm.progress_id = undefined;
      this.copyForm.series_id = undefined;
      phaseList({ project_id: val }).then((res) => {
        if (res.code === 200) {
          let rawData = res.data;
          rawData = rawData.map((item) => {
            return { value: item.id, label: `${item.phase_no} ${item.phase}` };
          });
          this.phaseOptions = rawData;
        }
      });
      }
    },
    getConfigurationList(val) {
      this.copyForm.series_id = undefined;
      progressDetail({ id: val }).then((res) => {
        if (res.code === 200) {
          let { version } = res.data;
          let rawData = res.data.series;
          this.configurationData = rawData;
          rawData = rawData.map((item) => {
            return {
              value: item.id,
              label: `Configuration ${version}-${item.version}`
            };
          });
          this.configurationOptions = rawData;
        }
      });
    },
    handleChooseConfiguration(val) {
      let target = this.configurationData.find((item) => {
        return item.id === val;
      });
      this.configurationForCopy = target;
    },
    getOptionsInfo(phase) { 
      this.project_id = this.$route.params.project_id;
      let project = localStorage.getItem('project');
      this.projectData = JSON.parse(project);
      this.phaseData = phase;
      if (phase) {
        this.operateRole = true;
        if (
          this.projectData.archiving === 1 ||
          this.phaseData.archiving === 1
        ) {
          this.operateRole = false;
        }
        let { series } = phase;
        //显示默认series
        if (series.length > 0) {
          this.seriesOption = series;
          let [ seriesData ] = series;
          this.seriesData = seriesData;
          this.activeSeries = seriesData.id;
        }
        //v0.8.0, yuhui, 操作configuration后刷新，如果没有series就置空
        if (series.length === 0) {
          this.seriesOption = [];
          this.seriesData = {};
          this.activeSeries = null;
        }
      } else {
        this.seriesData = {};
        this.seriesOption = [];
        this.activeSeries = null;
      }
    },
    handleSeriesTab(item) {
      this.seriesData = item;
      this.activeSeries = item.id;
    },
    handleCommand(val) {
      switch (val) {
        case 'new':
          this.$router.push({
            path: '/index/project/series/form',
            query: {
              mode: 'add',
              seriesId: this.activeSeries,
              progressId: this.phaseData.id,
              progressRate: this.phaseData.progress
            }
          });
          break;
        case 'copy':
          this.copyVisible = true;
          this.selectDefaultProject();
          this.getProjectList(1);
          break;
        case 'edit':
          this.$router.push({
            path: '/index/project/series/form',
            query: {
              mode: 'edit',
              seriesId: this.activeSeries,
              progressId: this.phaseData.id,
              progressRate: this.phaseData.progress
            }
          });
          break;
        case 'delete':
          this.handleDeleteConfiguration();
          break;
        default:
          break;
      }
    },
    changePhaseStatus(status) {
      let { phaseData } = this;
      this.getPhaseDetail(phaseData);
      this.$emit('projectStatus', status);
    },
    //删除configuration, v0.8.0, tyh添加
    handleDeleteConfiguration() {
      this.deleteVisible = true;
      this.deleteTarget = 'configuration';
    },
    //确认删除configuration, v0.8.0, tyh添加
    confirmDeleteConfiguration() {
      deleteSeries({ id: this.activeSeries }).then((res) => {
        if (res.code === 200) {
          this.deleteVisible = false;
          this.$message.success('delete successful');
          this.getOptionsInfo(this.phaseData);
        }
      });
    },
    requestDelete() {
      switch (this.deleteTarget) {
        case 'configuration':
          this.confirmDeleteConfiguration();
          break;
        default:
          break;
      }
    }
  }
};
</script>

<style scoped lang="less">
.phase-detail-wrapper {
  font-family: PingFang SC, PingFang SC;
  .header-container {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-top: 16px;
    margin-bottom: 8px;
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
  .configuration-header-container {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 16px;
    position: relative;
    .configuration-tab {
      display: flex;
      flex-wrap: wrap;
      border-left: 1px solid #eeeeee;
      .tab-item {
        height: 40px;
        border: 1px solid #eeeeee;
        border-left: 0px;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 14px;
        color: #303133;
        padding: 0px 15px 0px 15px;
        transition: 0.5s;
        transition-property: all;
        transition-duration: 0.5s;
        transition-timing-function: ease;
        transition-delay: 0s;
      }
      .tab-item:hover {
        cursor: pointer;
        background: #f4f5f9;
      }
      .tab-item-active {
        height: 40px;
        border: 1px solid #eeeeee;
        border-left: 0px;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 14px;
        color: #007bff;
        padding: 0px 15px 0px 15px;
        transition: 0.5s;
        transition-property: all;
        transition-duration: 0.5s;
        transition-timing-function: ease;
        transition-delay: 0s;
      }
    }
    .configuration-operate {
      display: flex;
      align-items: center;
      .creater-info {
        display: flex;
        align-items: center;
        font-size: 13px;
        color: #909399;
        margin-right: 24px;
        .creater {
          margin-right: 8px;
        }
      }
      .operate {
        .operate-icon {
          font-size: 16px;
          color: #007bff;
          transition: 0.5s;
          transition-property: all;
          transition-duration: 0.5s;
          transition-timing-function: ease;
          transition-delay: 0s;
        }
        .operate-icon:hover {
          cursor: pointer;
          opacity: 0.8;
        }
      }
    }
  }
  .comments-container {
    margin-top: 16px;
    border-radius: 4px 4px 0px 0px;
    border: 1px solid #eeeeee;
    .comments-header {
      height: 32px;
      background: #f4f5f9;
      border-bottom: 1px solid #eeeeee;
      .title-wrapper {
        height: 100%;
        display: flex;
        align-items: center;
        margin-left: 24px;
        font-size: 14px;
        color: #606266;
        .title {
          margin-left: 5px;
        }
      }
    }
    .comments-content {
      min-height: 32px;
      .content {
        margin: 7px 24px 7px 24px;
        font-size: 13px;
        color: #606266;
        line-height: 24px;
      }
      .no-data-wrapper {
        width: 100%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        .no-data-img {
          width: 120px;
          height: 120px;
        }
        .label {
          font-size: 13px;
          color: #909399;
          margin-top: 5px;
          margin-bottom: 16px;
        }
      }
    }
  }
  .copy-configuration-container {
    /deep/ .el-form-item__label {
      text-align: left;
    }
    .input {
      width: 391px;
    }
  }
}
</style>
