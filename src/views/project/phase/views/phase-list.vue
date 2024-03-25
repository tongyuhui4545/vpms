<template>
  <div>
    <div v-if="tableData && tableData.length > 0">
      <!--Phase列表-->
      <div class="phase-list-wrapper">
        <div class="swiper-container">
          <div
            class="swiper-wrapper"
            :style="swiperWidth()"
          >
            <div
              v-for="(item, key) in tableData"
              :key="key"
              :class="
                activePhase == item.id
                  ? 'row-container-active'
                  : 'row-container'
              "
              @click="handlePhase(item)"
            >
              <div
                v-if="item.win === 1"
                class="hat-container"
              >
                <img
                  src="@/assets/image/hat.png"
                  alt=""
                  class="image"
                >
              </div>
              <div
                v-if="activePhase == item.id"
                class="operate-container"
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
                    <!--<el-dropdown-item
                      v-if="limits.phase_add"
                      :disabled="!operateRole"
                      command="new_phase"
                    >
                      <i class="el-icon-plus" />
                      New phase
                    </el-dropdown-item>-->
                    <el-dropdown-item
                      v-if="limits.phase_edit"
                      :disabled="!operateRole"
                      command="edit_phase"
                    >
                      <i class="el-icon-edit-outline" />
                      Edit phase
                    </el-dropdown-item>
                    <el-dropdown-item
                      v-if="limits.phase_archive && item.archiving === 0"
                      command="archive_phase"
                    >
                      <i class="el-icon-link" />
                      Archive phase
                    </el-dropdown-item>
                    <el-dropdown-item
                      v-if="limits.phase_archive && item.archiving === 1"
                      command="unarchive_phase"
                    >
                      <i class="el-icon-link" />
                      Unarchive phase
                    </el-dropdown-item>
                    <el-dropdown-item command="quote_file">
                      <i class="el-icon-download" />
                      Quote file
                    </el-dropdown-item>
                    <el-dropdown-item command="comfirmation_file">
                      <i class="el-icon-download" />
                      Comfirmation file
                    </el-dropdown-item>
                  </el-dropdown-menu>
                </el-dropdown>
              </div>
              <div class="row-wrapper">
                <div
                  :class="
                    activePhase == item.id
                      ? 'title-wrapper-active'
                      : 'title-wrapper'
                  "
                >
                  <div class="label">
                    {{ item.phase_no ? item.phase_no : '' }}
                  </div>
                  <div
                    v-if="item.phase"
                    class="value"
                  >
                    <el-tooltip
                      class="item"
                      effect="dark"
                      :content="item.phase"
                      placement="top-start"
                    >
                      <span>
                        {{ item.phase }}
                      </span>
                    </el-tooltip>
                  </div>
                  <div
                    :class="
                      activePhase == item.id
                        ? 'rate-wrapper-active'
                        : 'rate-wrapper'
                    "
                  >
                    <div
                      class="rate"
                      :style="progressWidth(item)"
                    >
                      <div class="bar" />
                    </div>
                  </div>
                </div>

                <div
                  v-for="(tableRow, tableKey) in phaseInfo"
                  :key="tableKey"
                >
                  <div
                    v-if="tableRow.type === 'date'"
                    :class="
                      activePhase == item.id ? 'due-date-active' : 'due-date'
                    "
                  >
                    <div class="label">
                      {{ tableRow.label }}
                    </div>
                    <div 
                      v-if="item[tableRow.value]" 
                      class="value"
                    >
                      <span>
                        {{ item[tableRow.value] }}
                      </span>
                      <span class="clock-wrapper">
                        <el-tooltip
                          v-if="justifyDanger(item[tableRow.value])"
                          class="item"
                          effect="dark"
                          :content="dangerTime(item[tableRow.value])"
                          placement="top-start"
                        >
                          <img
                            src="@/assets/IconDesigns/yellow_clock.png"
                            alt=""
                            class="image"
                          >
                        </el-tooltip>

                        <el-tooltip
                          v-if="justifyOverdue(item[tableRow.value])"
                          class="item"
                          effect="dark"
                          :content="overDueTime(item[tableRow.value])"
                          placement="top-start"
                        >
                          <img
                            v-if="item[tableRow.value]"
                            src="@/assets/IconDesigns/red_clock.png"
                            alt=""
                            class="image"
                          >
                        </el-tooltip>
                      </span>
                    </div>
                  </div>
                  <div
                    v-if="tableRow.type === 'status'"
                    :class="
                      activePhase == item.id
                        ? 'quote-status-active'
                        : 'quote-status'
                    "
                  >
                    <div class="label">
                      {{ tableRow.label }}
                    </div>
                    <div
                      v-if="item[tableRow.value]"
                      :class="
                        tableRow.value === 'status_label'
                          ? 'value-wrapper'
                          : 'cal-value-wrapper'
                      "
                    >
                      <div class="value">
                        <el-tooltip
                          class="item"
                          effect="dark"
                          :content="item[tableRow.value]"
                          placement="top-start"
                        >
                          <span>
                            {{ item[tableRow.value] }}
                          </span>
                        </el-tooltip>
                      </div>
                    </div>

                    <div style="clear: both" />
                  </div>
                </div>

                <div class="footer-wrapper">
                  <div class="auther">
                    {{ item.creator_name }}
                  </div>
                  <div
                    v-if="activePhase == item.id"
                    class="date"
                  >
                    {{ item.created_at }}
                  </div>
                </div>
              </div>
            </div>
            <div style="clear: both" />
          </div>
        </div>
        <div
          v-if="limits.phase_add"
          class="add-container"
          @click="handleAddPhase"
        >
          <div class="icon-wrapper">
            <i class="el-icon-plus icon" />
          </div>
          <div class="label">
            New
          </div>
        </div>
      </div>
    </div>

    <div
      v-else
      class="no-data-container"
      data-aos="fade"
    >
      <div class="no-data-wrapper">
        <div class="image-wrapper">
          <img
            src="@/assets/image/no-data.png"
            alt=""
            class="image"
          >
        </div>
        <div class="label">
          No Phase
        </div>
      </div>
      <div
        v-if="operateRole && limits.phase_add"
        class="add-container"
        @click="handleAddPhase"
      >
        <div class="icon-wrapper">
          <i class="el-icon-plus icon" />
        </div>
        <div class="label">
          New
        </div>
      </div>
    </div>

    <!--归档-->
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

    <PhaseModal
      ref="phase-modal"
      :mode="phaseModalMode"
      :phase-data="phaseData"
      @refresh="handlePhaseListRefresh"
    />
  </div>
</template>

<script>
import config from '@/config';
import POPDialog from '@/components/pop-dialog.vue';
import PhaseModal from '@/components/common/phase-modal.vue';
import registerListeners from '../controller/listener';
import {
  progressDetail,
  archivePhase,
  unarchivePhase,
  downloadQuote,
  downloadConfirmation
} from '@/api/index.js';

export default {
  name: '',
  components: {
    POPDialog,
    PhaseModal
  },
  props: {
    phaseMode: {
      type: Number,
      default: null
    },
    options: {
      type: Array,
      default: null
    },
    list: {
      type: Array,
      default: null
    }
  },
  data() {
    return {
      limits: null,
      operateRole: true,
      phaseVisible: null,
      projectData: {},
      tableData: [],
      phaseData: {},
      activePhase: null,
      archiveVisible: false,
      unarchiveVisible: false,
      tableVisible: null,
      phaseInfo: [],
      phaseModalMode: '',
      dialogMessage: '',
      refreshMode: ''
    };
  },
  watch: {
    phaseMode: {
      handler(newValue) {
        this.phaseVisible = newValue;
      },
      deep: true,
      immediate: true
    },
    options: {
      handler(newValue) {
        this.phaseInfo = newValue;
      },
      deep: true,
      immediate: true
    },
    list: {
      handler(newValue) {
        this.getPhaseInfo(newValue);
      },
      deep: true,
      immediate: true
    }
  },
  methods: {
    getPhaseInfo(list) {
      this.limits = registerListeners('project_phase_detail');
      this.projectData = JSON.parse(localStorage.getItem('project'));
      this.tableData = list;
      if (list && list.length > 0) {
        let [ phaseData ] = this.tableData;
        let phase_id = null;
        if(this.phaseVisible === 1){
          phase_id = phaseData.id;
        }
        if(this.phaseVisible === 2){
          phase_id = this.activePhase;
        }
        this.activePhase = phase_id;
        if(phase_id){
          this.getPhaseDetail(phase_id);
        }
      } else {
        this.$emit('archivePhase', null);
      }
    },
    getPhaseDetail(phase_id) {
      this.phaseData = null;
      this.operateRole = true;
      progressDetail({
        id: phase_id
      }).then((res) => {
        if (res.code === 200) {
          this.phaseData = res.data;
          if (
            this.projectData.archiving === 1 ||
            this.phaseData.archiving === 1
          ) {
            this.operateRole = false;
          }
          this.$emit('archivePhase', res.data);
        }
      });
    },
    handlePhase(row) {
      if(this.activePhase !== row.id){
        this.activePhase = row.id;
        this.operateRole = true;
        if (
          this.projectData.archiving === 1 || 
          this.phaseData.archiving === 1
        ) {
          this.operateRole = false;
        }
        this.getPhaseDetail(row.id);
        }
    },
    phaseDefault(callback) {
      for (let i = 0; i < this.tableData.length; i++) {
        let item = this.tableData[i];
        if (item.id === this.activePhase) {
          this.phaseData = item;
          callback(item);
        }
      }
    },
    changeProjectStatus() {
      let that = this;
      this.getTableData(() => {
        for (let i = 0; i < that.tableData.length; i++) {
          let item = that.tableData[i];
          if (item.id === that.activePhase) {
            that.phaseData = item;
          }
        }
        that.$message({
          message: 'Done',
          type: 'success'
        });
      });
    },

    handlePhaseListRefresh() {
      let mode = 2;
      if(this.refreshMode === 'phase'){
        if(this.phaseModalMode === 'add'){
            mode = 1;
        }
      }
      let timestamp = new Date().getTime();
      let refreshData = `${mode}-${timestamp}`;
      this.$emit('refreshTable', refreshData);
    },

    /**swiper样式 */
    progressWidth(row) {
      let { id } = row;
      let { phase } = row;
      let phaseValue = parseInt(phase);
      if (isNaN(phaseValue)) {
        if (phase === 'Site Plan') {
          phaseValue = 5;
        } else {
          phaseValue = 100;
        }
      }
      let width = 0;
      if (!isNaN(phaseValue)) {
        if (id === this.activePhase) {
          width = 264 * (phaseValue / 100);
        } else {
          width = 106 * (phaseValue / 100);
        }
      }
      return `width: ${width}px`;
    },
    swiperWidth() {
      let { tableData } = this;
      let width = `${258 * (tableData.length - 1) + 432}px`;
      return `min-width: ${width}`;
    },
    // v0.8.0-tyh添加
    showPhaseModal() {
      this.refreshMode = 'phase';
      this.$refs['phase-modal'].show();
      this.$refs['phase-modal'].setData();
    },
    handleAddPhase() {
      this.phaseModalMode = 'add';
      this.showPhaseModal();
    },
    handleCommand(command) {
      switch (command) {
        case 'new_phase':
          this.phaseModalMode = 'add';
          this.showPhaseModal();
          break;
        case 'edit_phase':
          this.phaseModalMode = 'edit';
          this.showPhaseModal();
          break;
        case 'archive_phase':
          this.archiveVisible = true;
          break;
        case 'unarchive_phase':
          this.unarchiveVisible = true;
          break;
        case 'quote_file':
          this.getQuoteFiles();
          break;
        case 'comfirmation_file':
          this.getComfirmationFile();
          break;
        default:
          break;
      }
    },

    /**归档 */
    handleArchive() {
      archivePhase({
        progress_id: this.activePhase
      }).then((res) => {
        if (res.code === 200) {
          this.refreshMode = 'archive';
          this.handlePhaseListRefresh();
          this.archiveVisible = false;
        }
      });
    },

    /**解档 */
    handleUnarchive() {
      unarchivePhase({
        progress_id: this.activePhase
      }).then((res) => {
        if (res.code === 200) {
          this.refreshMode = 'archive';
          this.handlePhaseListRefresh();
          this.unarchiveVisible = false;
        }
      });
    },

    /**下载报价文件 */
    getQuoteFiles() {
      downloadQuote({
        progress_id: this.activePhase
      }).then((res) => {
        if (res.code === 200) {
          if (res.data) {
            let { files } = res.data;
            if (files && files.length > 0) {
              let [data] = files;
              const anchor = document.createElement('a');
              let url = `${config.baseUrl}/${data.url}`;
              anchor.href = url;
              anchor.setAttribute('target', '_blank');
              anchor.setAttribute('download', data.name);
              anchor.click();
            } else {
              this.$message.error('No files available');
            }
          } else {
            this.$message.error('No files available');
          }
        }
      });
    },

    /**下载Comfirmation文件 */
    getComfirmationFile() {
      let progress_id = this.activePhase;
      let { projectData } = this;
      downloadConfirmation(this, progress_id, projectData.description);
    },
    justifyOverdue(params) {
      let is_overdue = false;
      let timestamp = new Date().getTime();
      let datetime = new Date(params).getTime();
      let gap = datetime - timestamp;
      if (gap < 0) {
        is_overdue = true;
      }
      return is_overdue;
    },
    justifyDanger(params) {
      let is_danger = false;
      let timestamp = new Date().getTime();
      let cardinal = 1000 * 60 * 60 * 24 * 2;
      let datetime = new Date(params).getTime();
      let gap = datetime - timestamp;
      if (gap >= 0) {
        if (gap <= cardinal) {
          is_danger = true;
        }
      }
      return is_danger;
    },
    overDueTime(params) {
      let time = '';
      let timestamp = new Date().getTime();
      let datetime = new Date(params).getTime();
      let gap = datetime - timestamp;
      let tag = 1000 * 60 * 60 * 24;
      if (gap < 0) {
        gap = gap * -1;
        let day = Math.floor(gap / tag);
        let totalHours = gap - tag * day;
        let hours = Math.floor(totalHours / (1000 * 60 * 60));
        time = `Overdue by ${day} days ${hours} hours`;
      }
      return time;
    },
    dangerTime(params) {
      let time = '';
      let timestamp = new Date().getTime();
      let cardinal = 1000 * 60 * 60 * 24 * 2;
      let datetime = new Date(params).getTime();
      let gap = datetime - timestamp;
      let tag = 1000 * 60 * 60 * 24;
      if (gap >= 0 && gap <= cardinal) {
        let day = Math.floor(gap / tag);
        let totalHours = gap - tag * day;
        let hours = Math.floor(totalHours / (1000 * 60 * 60));
        time = `${day} days ${hours} hours left before the deadline`;
      }
      return time;
    }
  }
};
</script>

<style scoped lang="less">
.phase-list-wrapper {
  display: flex;
  font-family: PingFang SC, PingFang SC;
  height: 191px;
  .swiper-container {
    flex: 1;
    padding-bottom: 4px;
    overflow-x: auto;
    overflow-y: hidden;
    .swiper-wrapper {
      .row-container {
        width: 240px;
        height: 182px;
        border-radius: 8px;
        border: 1px solid #eeeeee;
        margin-right: 16px;
        color: #606266;
        float: left;
        overflow: hidden;
        position: relative;
        transition: 0.5s;
        transition-property: all;
        transition-duration: 0.5s;
        transition-timing-function: ease;
        transition-delay: 0s;
      }
      .row-container:hover {
        cursor: pointer;
      }
      .row-container-active {
        width: 416px;
        height: 182px;
        background: linear-gradient(180deg, #007bff 0%, #409eff 100%);
        border-radius: 8px;
        margin-right: 16px;
        float: left;
        color: #ffffff;
        animation: show 0.5s;
        overflow: hidden;
        position: relative;
      }
      @keyframes show {
        0% {
          width: 240px;
        }
        100% {
          width: 416px;
        }
      }
      .clock-image {
        width: 16px;
        height: 16px;
        display: inline-block;
        position: relative;
        top: 2px;
      }
      .hat-container {
        position: absolute;
        top: 4px;
        left: 4px;
        .image {
          width: 18px;
          height: 18px;
          transform: rotate(-30deg);
        }
      }
      .operate-container {
        position: absolute;
        top: 4px;
        right: 16px;
        .operate-icon {
          color: #fff;
          cursor: pointer;
        }
      }
      .row-wrapper {
        margin: 0px 8px 0px 16px;
      }
      .title-wrapper {
        display: flex;
        align-items: center;
        margin-bottom: 8px;
        font-size: 18px;
        color: #303133;
        line-height: 24px;
        margin-top: 16px;
        .label {
          margin-right: 8px;
        }
        .value {
          margin-right: 8px;
          width: 40px;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
      }
      .title-wrapper-active {
        display: flex;
        align-items: center;
        margin-top: 16px;
        margin-bottom: 8px;
        font-size: 18px;
        color: #ffffff;
        line-height: 24px;
        font-weight: 550;
        .label {
          margin-right: 8px;
        }
        .value {
          margin-right: 8px;
          width: 40px;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
      }
      .rate-wrapper {
        width: 106px;
        height: 12px;
        background: #f5f5f5;
        border-radius: 8px;
        position: relative;
        .rate {
          height: 12px;
          position: absolute;
          left: 0px;
          top: 0px;
          .bar {
            width: 100%;
            height: 12px;
            background: #c0c4cc;
            border-radius: 8px;
          }
        }
      }
      .rate-wrapper-active {
        width: 264px;
        height: 12px;
        background: #136ab9;
        border-radius: 8px;
        position: relative;
        .rate {
          height: 12px;
          border-radius: 8px;
          position: absolute;
          left: 0px;
          top: 0px;
          .bar {
            width: 100%;
            height: 12px;
            background: #ffffff;
            border-radius: 8px;
            animation: slide 0.5s;
          }
          @keyframes slide {
            0% {
              width: 0px;
            }
            100% {
              width: 100%;
            }
          }
        }
      }
      .due-date {
        height: 24px;
        display: flex;
        align-items: center;
        margin: 0px 8px 6px 0px;
        font-size: 14px;
        height: 24px;
        .label {
          margin-right: 16px;
        }
        .value {
          width: 45px;
          display: flex;
          align-items: center;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          font-size: 14px;
          height: 24px;
        }
      }
      .due-date-active {
        display: flex;
        align-items: center;
        margin: 0px 8px 6px 0px;
        font-size: 14px;
        height: 24px;
        .label {
          margin-right: 16px;
        }
        .value {
          flex: 1;
          display: flex;
          align-items: center;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          font-size: 14px;
          height: 24px;
          animation: fade 0.5s;
        }
      }
      .quote-status {
        height: 24px;
        display: flex;
        align-items: center;
        flex-wrap: nowrap;
        margin: 0px 8px 6px 0px;
        font-size: 14px;
        line-height: 24px;
        .label {
          margin-right: 16px;
        }
        .value-wrapper {
          width: 86px;
          height: 24px;
          background: #f5f5f5;
          border-radius: 12px;
          display: flex;
          align-items: center;
          .value {
            width: 70px;
            font-size: 13px;
            color: #909399;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            margin-left: 8px;
          }
        }
        .cal-value-wrapper {
          width: 32px;
          height: 24px;
          background: #f5f5f5;
          border-radius: 12px;
          display: flex;
          align-items: center;
          .value {
            flex: 1;
            font-size: 13px;
            color: #909399;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            margin-left: 8px;
          }
        }
      }
      .quote-status-active {
        margin: 0px 8px 6px 0px;
        font-size: 14px;
        line-height: 24px;
        height: 24px;
        overflow: hidden;
        .label {
          margin-right: 16px;
          float: left;
        }
        .value-wrapper {
          float: left;
          height: 24px;
          background: #41b3ff;
          border-radius: 12px;
          display: flex;
          align-items: center;
          animation: fade 0.5s;
          .value {
            font-size: 13px;
            color: #ffffff;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            margin: 0px 8px 0px 8px;
          }
        }
        .cal-value-wrapper {
          float: left;
          height: 24px;
          background: #41b3ff;
          border-radius: 12px;
          display: flex;
          align-items: center;
          animation: fade 0.5s;
          max-width: 215px;
          .value {
            flex: 1;
            font-size: 13px;
            color: #ffffff;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            margin: 0px 8px 0px 8px;
          }
        }
      }
      .footer-wrapper {
        width: 100%;
        position: absolute;
        left: 0px;
        bottom: 16px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        font-size: 12px;
        .auther {
          margin-left: 16px;
        }
        .date {
          margin-right: 16px;
          animation: fade 0.5s;
        }
      }
      @keyframes fade {
        0% {
          opacity: 0;
        }
        100% {
          opacity: 1;
        }
      }
    }
  }
}
.clock-wrapper {
  margin-left: 5px;
  width: 16px;
  height: 16px;
  .image {
    width: 100%;
    height: 100%;
  }
}
.no-data-container {
  border-radius: 8px;
  border: 1px solid #eeeeee;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 182px;
  .no-data-wrapper {
    flex: 1;
    text-align: center;
  }
  .image-wrapper {
    .image {
      width: 120px;
      height: 120px;
    }
  }
  .label {
    font-size: 13px;
    color: #909399;
    margin-top: 5px;
    margin-bottom: 16px;
  }
}
.add-container {
  width: 88px;
  height: 182px;
  margin-left: 18px;
  border-radius: 8px;
  border: 1px solid #eeeeee;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: #007bff;
  transition: 0.5s;
  transition-property: all;
  transition-duration: 0.5s;
  transition-timing-function: ease;
  transition-delay: 0s;
  .icon-wrapper {
    margin-bottom: 8px;
    .icon {
      font-size: 16px;
    }
  }
  .label {
    font-size: 16px;
    text-align: center;
  }
}
.add-container:hover {
  cursor: pointer;
  opacity: 0.8;
}
</style>
