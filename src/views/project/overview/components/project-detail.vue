<template>
  <div class="project-detail-wrapper">
    <img
      v-if="showWinEffect"
      src="@/assets/image/win_effect.gif"
      style="width: 800px; height: 600px; position: absolute; left: 50%; top: 35%; transform: translate(-50%, -50%); z-index: 99999"
    >
    <!--项目详情-头部-->
    <div class="project-header-wrapper">
      <div class="peoject-name-wrapper">
        <div
          class="project-name"
          data-aos="zoom-in"
        >
          <span class="project-no">
            {{ projectDetail.project_no }}
          </span>
          <span>
            {{ projectDetail.description }}
          </span>
        </div>
        <div
          class="peroject-mode"
          @click="handleSalesStatus"
        >
          <div class="label">
            <span
              v-for="(item, key) in salesStatusOptions"
              :key="key"
            >
              <span v-if="item.value == salesStatus">
                {{ item.label }}
              </span>
            </span>
          </div>
          <div class="icon-wrapper">
            <i class="el-icon-arrow-down" />
          </div>
        </div>
      </div>
      <div
        v-if="limits.project_archive || limits.project_edit"
        class="project_operate"
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
              v-if="limits.project_edit"
              :disabled="projectDetail.archiving === 1 ? true : false"
              command="edit"
            >
              Edit
            </el-dropdown-item>
            <el-dropdown-item
              v-if="projectDetail.archiving === 0 && limits.project_archive"
              command="archive"
            >
              Archive
            </el-dropdown-item>
            <el-dropdown-item
              v-if="projectDetail.archiving === 1 && limits.project_archive"
              command="unarchive"
            >
              Unarchive
            </el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
    </div>
    <div class="project-content-container">
      <!--项目详情-内容-->
      <div class="project-content-wrapper">
        <div class="project-content-row">
          <div class="title">
            <div class="circle" />
            <div class="label">
              Creator
            </div>
          </div>
          <div class="content">
            <div class="auther">
              {{ projectDetail.initials }}
            </div>
            <div
              class="label"
              data-aos="fade"
            >
              <el-tooltip
                class="item"
                effect="dark"
                :content="`${projectDetail.creation_name} created at ${projectDetail.created_at}`"
                placement="top-start"
              >
                <span>
                  {{ projectDetail.creation_name }} created at
                  {{ projectDetail.created_at }}
                </span>
              </el-tooltip>
            </div>
          </div>
        </div>
        <div class="project-content-row">
          <div class="title">
            <div class="circle" />
            <div class="label">
              Sales
            </div>
          </div>
          <div class="content">
            <div class="auther">
              {{ projectSales.initials }}
            </div>
            <div
              class="label"
              data-aos="fade"
            >
              <el-tooltip
                class="item"
                effect="dark"
                :content="`Email: ${projectSales.email}`"
                placement="top-start"
              >
                <span>
                  {{ projectSales.name }}
                </span>
              </el-tooltip>
            </div>
          </div>
        </div>
        <div class="project-content-row">
          <div class="title">
            <div class="circle" />
            <div class="label">
              Customer
            </div>
          </div>
          <div class="content">
            <div class="auther">
              {{ projectClient.initials }}
            </div>
            <div
              class="label"
              data-aos="fade"
            >
              <el-tooltip
                class="item"
                effect="dark"
                placement="top-start"
              >
                <div slot="content">
                  <div>Tel: {{ projectClient.tel }}</div>
                  <div>Address: {{ projectClient.address }}</div>
                </div>
                <span>
                  {{ projectClient.name }}
                </span>
              </el-tooltip>
            </div>
          </div>
        </div>
        <div class="project-content-row">
          <div class="title">
            <div class="circle" />
            <div class="label">
              Address
            </div>
          </div>
          <div class="content">
            <div
              class="label"
              data-aos="fade"
            >
              <el-tooltip
                class="item"
                effect="dark"
                placement="top-start"
              >
                <div slot="content">
                  <span>
                    {{ projectDetail.address }}
                    {{ projectDetail.city }}
                    {{ projectDetail.county }}
                    {{ projectDetail.state }}
                    {{ projectDetail.zipcode }}
                  </span>
                </div>
                <span>
                  {{ projectDetail.address }}
                  {{ projectDetail.city }}
                  {{ projectDetail.county }}
                  {{ projectDetail.state }}
                  {{ projectDetail.zipcode }}
                </span>
              </el-tooltip>
            </div>
          </div>
        </div>
      </div>
      <div class="project-content-wrapper">
        <div class="project-content-row">
          <div class="title">
            <div class="circle" />
            <div class="label">
              Quote status
            </div>
          </div>
          <div
            v-if="projectDetail['quote_status']"
            class="status-wrapper"
            data-aos="fade"
          >
            <div class="status">
              <el-tooltip
                class="item"
                effect="dark"
                :content="projectDetail['quote_status']"
                placement="top-start"
              >
                <span>
                  {{ projectDetail['quote_status'] }}
                </span>
              </el-tooltip>
            </div>
          </div>
        </div>
        <div class="project-content-row">
          <div class="title">
            <div class="circle" />
            <div class="label">
              3D calculation status
            </div>
          </div>
          <div
            v-if="projectDetail['3d_calculation_status_label']"
            class="status-wrapper"
            data-aos="fade"
          >
            <div class="status">
              <el-tooltip
                class="item"
                effect="dark"
                :content="projectDetail['3d_calculation_status_label']"
                placement="top-start"
              >
                <span>
                  {{ projectDetail['3d_calculation_status_label'] }}
                </span>
              </el-tooltip>
            </div>
          </div>
        </div>
        <div class="project-content-row">
          <div class="title">
            <div class="circle" />
            <div class="label">
              Label status
            </div>
          </div>
          <div
            v-if="projectDetail['label_status_label']"
            class="status-wrapper"
            data-aos="fade"
          >
            <div class="status">
              <el-tooltip
                class="item"
                effect="dark"
                :content="projectDetail['label_status_label']"
                placement="top-start"
              >
                <span>
                  {{ projectDetail['label_status_label'] }}
                </span>
              </el-tooltip>
            </div>
          </div>
        </div>
        <div class="project-content-row">
          <div class="title">
            <div class="circle" />
            <div class="label">
              3D simulation status
            </div>
          </div>
          <div
            v-if="projectDetail['simulation_status_label']"
            class="status-wrapper"
            data-aos="fade"
          >
            <div class="status">
              <el-tooltip
                class="item"
                effect="dark"
                :content="projectDetail['simulation_status_label']"
                placement="top-start"
              >
                <span>
                  {{ projectDetail['simulation_status_label'] }}
                </span>
              </el-tooltip>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!--归档/解档-->
    <ProjectModal
      ref="projectModal"
      mode="edit"
      :form-data="projectForm"
      @refresh-updates="refreshUpdates"
    />
    <POPDialog
      :dialog="{
        title: 'tips',
        type: 'message',
        visible: archiveVisible,
        width: '560px'
      }"
      @dialogClosed="archiveVisible = false"
    >
      <template #dialog-content>
        Are you sure to archive this project? The relevant quote tasks will be
        automatically canceled after archiving and the phase under this project
        will not be available for editing
      </template>
      <template #dialog-btn>
        <el-button
          size="small"
          @click="archiveVisible = false"
        >
          Cancel
        </el-button>
        <el-button
          type="primary"
          size="small"
          @click="handleArchive"
        >
          Confirm
        </el-button>
      </template>
    </POPDialog>

    <!--解档-->
    <POPDialog
      :dialog="{
        title: 'tips',
        type: 'message',
        visible: unarchiveVisible,
        width: '560px'
      }"
      @dialogClosed="unarchiveVisible = false"
    >
      <template #dialog-content>
        After unarchiving, the related quote tasks will be automatically
        activated and other phases will be automatically archived
      </template>
      <template #dialog-btn>
        <el-button
          size="small"
          @click="unarchiveVisible = false"
        >
          Cancel
        </el-button>
        <el-button
          type="primary"
          size="small"
          @click="handleUnarchive"
        >
          Confirm
        </el-button>
      </template>
    </POPDialog>

    <!--销售状态-->
    <POPDialog
      :dialog="{
        title: 'Status',
        type: 'dialog',
        visible: saleStatusVisible,
        width: '800px'
      }"
      @dialogClosed="
        (val) => {
          saleStatusVisible = val;
        }
      "
    >
      <template #dialog-content>
        <div class="form-container">
          <el-radio-group v-model="saleStatusRadio">
            <el-radio
              v-for="(item, key) in salesStatusOptions"
              :key="key"
              :label="item.value"
              @change="changeSales"
            >
              {{ item.label }}
            </el-radio>
          </el-radio-group>
          <div
            v-if="saleStatusRadio === 2 || saleStatusRadio === 3"
            class="form-sales-wrapper"
          >
            <el-form
              :model="salesForm"
              :rules="salesRules"
              class="demo-ruleForm"
            >
              <el-form-item
                label="Phase"
                prop="progress_id"
              >
                <el-select
                  v-model="salesForm.progress_id"
                  size="small"
                  class="input"
                  @change="changePhase"
                >
                  <el-option
                    v-for="(item, key) in phaseOptions"
                    :key="key"
                    :label="`${item.phase_no} ${item.phase}`"
                    :value="item.id"
                  />
                </el-select>
              </el-form-item>
              <el-form-item
                label="Quote"
                prop="quote_id"
              >
                <el-select
                  v-model="salesForm.quote_id"
                  size="small"
                  class="input"
                >
                  <el-option
                    v-for="(item, key) in quoteOptions"
                    :key="key"
                    :label="item.label"
                    :value="item.id"
                  />
                </el-select>
              </el-form-item>
            </el-form>
          </div>
        </div>
      </template>
      <template #dialog-btn>
        <el-button
          size="small"
          @click="saleStatusVisible = false"
        >
          Cancel
        </el-button>
        <el-button
          type="primary"
          size="small"
          @click="requestSalesStatus"
        >
          Confirm
        </el-button>
      </template>
    </POPDialog>
  </div>
</template>

<script>
import POPDialog from '@/components/pop-dialog.vue';
import ProjectModal from '@/views/project/components/ProjectModal.vue';

import {
  projectDetail,
  archiveProject,
  unarchiveProject,
  changeProjectStatus,
  phaseList,
  progressFileList
} from '@/api/index.js';
export default {
  name: '',
  components: {
    POPDialog,
    ProjectModal
  },
  emits: ['refresh-updates'],
  data() {
    return {
      showWinEffect: false,
      //project-detail的相关权限，v0.8.0tyh
      limits: {},
      project_id: null,
      projectDetail: {},
      projectSales: {},
      projectClient: {},
      salesStatusOptions: [
        {
          value: 1,
          label: 'Bidding'
        },
        {
          value: 2,
          label: 'Win'
        },
        {
          value: 3,
          label: 'Win Via Another EPC'
        },
        {
          value: 4,
          label: 'Lost'
        },
        {
          value: 5,
          label: 'On-hold'
        },
        {
          value: 6,
          label: 'Canceled'
        }
      ],
      projectForm: {
        project_no: '',
        description: '',
        client_id: '',
        contact_id: 1,
        sales_id: '',
        us_engineer_id: '1',
        cn_engineer_id: '1',
        cn_engineer_team_id: '1',
        size: undefined,
        address: '',
        city: '',
        county: '',
        state: '',
        zipcode: '',
        remark: '',
        creation_id: '',
        creation_name: '',
        sales_status: 1,
        currency: 'USD'
      },
      salesStatus: 0,
      archiveVisible: false,
      unarchiveVisible: false,
      saleStatusVisible: false,
      saleStatusRadio: null,
      salesForm: {
        progress_id: '',
        quote_id: ''
      },
      salesRules: {
        progress_id: [
          {
            required: true,
            message: 'Please select phase',
            trigger: 'change'
          }
        ],
        quote_id: [
          {
            required: true,
            message: 'Please select quote',
            trigger: 'change'
          }
        ]
      },
      phaseOptions: [],
      quoteOptions: []
    };
  },
  created() {
    this.project_id = this.$route.params.project_id;
  },
  mounted() {
    this.getProjectDetail();
    this.limits = JSON.parse(localStorage.getItem('limits'))['Bidding_Project_List'];
  },
  methods: {
    getProjectDetail() {
      projectDetail({
        id: this.project_id
      }).then((res) => {
        if (res.code === 200) {
          this.projectDetail = res.data;
          this.projectSales = res.data.sales;
          this.projectClient = res.data.client;
          this.salesStatus = res.data.sales_status;
          this.$emit('archiveStatus', this.projectDetail.archiving);
          //v0.8.0 初始化项目详情表单,编辑项目用
          this.initProjectDetailForm(this.projectDetail);
        }
      });
    },
    initProjectDetailForm(data) {
      this.projectForm = {
        id: this.project_id,
        project_no: data.project_no,
        description: data.description,
        client_id: data.client_id,
        sales_id: data.sales_id,
        size: data.size,
        currency: data.currency,
        address: data.address,
        city: data.city,
        county: data.county,
        state: data.state,
        zipcode: data.zipcode,
        remark: data.remark
      };
    },
    changeSales() {
      let { saleStatusRadio } = this;
      if (saleStatusRadio === 2 || saleStatusRadio === 3) {
        this.getPhaseList();
      }
    },
    getPhaseList() {
      phaseList({
        project_id: this.project_id
      }).then((res) => {
        if (res.code === 200) {
          this.phaseOptions = res.data;
        }
      });
    },
    changePhase() {
      this.salesForm.quote_id = '';
      this.quoteOptions = [];
      let { progress_id } = this.salesForm;
      if (progress_id && progress_id !== '') {
        progressFileList({
          id: this.salesForm.progress_id,
          file_type: 1
        }).then((res) => {
          if (res.code === 200) {
            let { data } = res;
            if (data.length > 0) {
              for (let i = 0; i < data.length; i++) {
                let item = data[i];
                if (item.files && item.files.length > 0) {
                  let { files } = item;
                  let [file] = files;
                  let row = {
                    id: item.id,
                    label: `V${item.version} ${item.type} ${file.name}`
                  };
                  this.quoteOptions.push(row);
                }
              }
            }
          }
        });
      }
    },
    handleCommand(command) {
      if (command === 'edit') {
        this.$refs['projectModal'].show();
        this.$refs['projectModal'].setFormData(this.projectForm);
      }
      if (command === 'archive') {
        this.archiveVisible = true;
      }
      if (command === 'unarchive') {
        this.unarchiveVisible = true;
      }
    },

    /**归档 */
    handleArchive() {
      archiveProject({
        id: this.project_id
      }).then((res) => {
        if (res.code === 200) {
          this.getProjectDetail();
          this.archiveVisible = false;
          this.$emit('archiveStatus', 1);
        }
      });
    },
    handleUnarchive() {
      unarchiveProject({
        id: this.project_id
      }).then((res) => {
        if (res.code === 200) {
          this.getProjectDetail();
          this.unarchiveVisible = false;
          this.$emit('archiveStatus', 0);
        }
      });
    },

    /**销售状态 */
    handleSalesStatus() {
      this.saleStatusRadio = this.salesStatus;
      this.saleStatusVisible = true;
    },
    requestSalesStatus() {
      let { saleStatusRadio } = this;
      if (saleStatusRadio === 2 || saleStatusRadio === 3) {
        if (this.salesForm.progress_id === '') {
          this.$message({
            message: 'Please select phase',
            type: 'warning'
          });
          return;
        }
        if (this.salesForm.quote_id === '') {
          this.$message({
            message: 'Please select quote',
            type: 'warning'
          });
          return;
        }
      }
      changeProjectStatus({
        project_id: this.project_id,
        progress_id: this.salesForm.progress_id,
        status: this.saleStatusRadio,
        quote_id: this.salesForm.quote_id
      }).then((res) => { 
        let salesStatusRadioSent = this.saleStatusRadio;
        if (res.code === 200) {
          this.saleStatusVisible = false;
          this.saleStatusRadio = null;
          this.getProjectDetail();
          this.$emit('sales-status-changed');
          if(salesStatusRadioSent === 2 || salesStatusRadioSent === 3) {
         //展示win动效3秒
         setTimeout(() => {
            this.showWinEffect = true;
            setTimeout(() => {
              this.showWinEffect = false;
            }, 2000)
          }, 500);
          }
        }
      });
    },
    refreshUpdates() {
      this.$emit('refresh-updates');
    }
  }
};
</script>

<style scoped lang="less">
.project-detail-wrapper {
  margin: 16px 0px 0px 24px;
  .project-header-wrapper {
    display: flex;
    align-items: center;
    justify-content: space-between;
    .peoject-name-wrapper {
      display: flex;
      animation: show 0.5s;
      overflow: hidden;
      .project-name {
        height: 24px;
        font-size: 18px;
        font-weight: 550;
        color: #303133;
        margin-right: 16px;
        transition: 0.5s;
        transition-property: all;
        transition-duration: 0.5s;
        transition-timing-function: ease;
        transition-delay: 0s;
        .project-no {
          margin-right: 8px;
        }
      }
      .peroject-mode {
        height: 24px;
        display: flex;
        justify-content: center;
        align-items: center;
        background: #409eff;
        border-radius: 4px;
        font-size: 14px;
        color: #ffffff;
        padding: 0px 8px 0px 8px;
        transition: 0.5s;
        transition-property: all;
        transition-duration: 0.5s;
        transition-delay: 0s;
        .label {
          margin-right: 19px;
        }
        .icon-wrapper {
          .icon {
            font-size: 12px;
          }
        }
      }
      .peroject-mode:hover {
        cursor: pointer;
        opacity: 0.8;
      }
    }
    @keyframes show {
      0% {
        width: 0;
      }
      100% {
        width: 100%;
      }
    }
    .project_operate {
      margin-right: 16px;
      .operate-icon {
        font-size: 16px;
        color: #909399;
      }
      .operate-icon:hover {
        cursor: pointer;
      }
    }
  }
  .project-content-container {
    overflow: hidden;
    .project-content-wrapper {
      display: flex;
      flex-wrap: wrap;
      .project-content-row {
        width: 25%;
        margin-top: 24px;
        .title {
          display: flex;
          align-items: center;
          margin-bottom: 16px;
          font-size: 14px;
          font-weight: 550;
          color: #303133;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          .circle {
            width: 8px;
            height: 8px;
            background: #007bff;
            border-radius: 50%;
            margin-right: 6px;
          }
        }
        .content {
          margin-right: 22px;
          display: flex;
          font-size: 14px;
          color: #606266;
          line-height: 24px;
          transition: 0.5s;
          transition-property: all;
          transition-duration: 0.5s;
          transition-timing-function: ease;
          transition-delay: 0s;
          .auther {
            width: 24px;
            height: 24px;
            background: #67d6ca;
            display: flex;
            align-items: center;
            justify-content: center;
            border-radius: 50%;
            margin-right: 8px;
            font-size: 10px;
            color: #ffffff;
          }
          .label {
            flex: 1;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
          }
        }
        .status-wrapper {
          width: 176px;
          height: 24px;
          background: #409eff;
          border-radius: 4px;
          font-size: 14px;
          color: #ffffff;
          display: flex;
          align-items: center;
          transition: 0.5s;
          transition-property: all;
          transition-duration: 0.5s;
          transition-timing-function: ease;
          transition-delay: 0s;
        }
        .status {
          width: 159px;
          margin-left: 8px;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
      }
    }
  }
}
.form-sales-wrapper {
  margin-top: 32px;
  .input {
    width: 280px;
  }
  /deep/ .el-form-item__label {
    text-align: left;
  }
}
</style>
