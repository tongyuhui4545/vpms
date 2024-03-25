<template>
  <div class="customer-files-container">
    <div class="customer-files-wrapper">
      <div class="customer-header">
        <div class="title-wrapper">
          <div class="icon">
            <i class="el-icon-folder-opened" />
          </div>
          <div class="title">
            Customer files
          </div>
        </div>
        <div
          class="operate-wrapper"
          @click="donwloadAll('all')"
        >
          <i class="el-icon-download" />
          Download all
        </div>
      </div>
      <div class="files-container">
        <div class="files-row">
          <div class="label-wrapper">
            <div class="label">
              Technical details
            </div>
          </div>
          <div class="files-wrapper">
            <div v-if="phaseData && phaseData['technical_details_files']">
              <div
                v-for="(item, key) in phaseData[
                  'technical_details_files'
                ].slice(0, 3)"
                :key="key"
                class="file-item"
              >
                <div class="file_name">
                  <i class="el-icon-document icon" />
                  <el-tooltip
                    effect="dark"
                    placement="top-start"
                  >
                    <div slot="content">
                      <p>File: {{ item.name }}</p>
                      <p>File capacity: {{ item.size }}</p>
                      <p>Creator: {{ item.creator }}</p>
                      <p>Creation date: {{ item.created_at }}</p>
                    </div>
                    <span style="cursor: pointer">{{ item.name }}</span>
                  </el-tooltip>
                </div>
                <div class="operate">
                  <i
                    v-if="determineFilePreview(item.name) && item.is_preview"
                    class="el-icon-view view-icon"
                    @click="previewFile(item.url, item.name, item.is_image)"
                  />
                  <i
                    class="el-icon-download download-icon"
                    @click="handleDownload(item.url, item.name)"
                  />
                </div>
              </div>
              <div
                v-if="
                  phaseData &&
                    phaseData['technical_details_files'] &&
                    phaseData['technical_details_files'].length > 3
                "
                class="arrow-down"
              >
                <img
                  src="@/assets/image/arrow-expand.png"
                  alt=""
                  @click="
                    openListDialog(
                      'Technical details files',
                      phaseData['technical_details_files']
                    )
                  "
                >
              </div>
            </div>
          </div>
        </div>
        <div class="files-row">
          <div class="label-wrapper">
            <div class="label">
              Project schedule
            </div>
          </div>
          <div class="files-wrapper">
            <div v-if="phaseData && phaseData['project_schedule_files']">
              <div
                v-for="(item, key) in phaseData['project_schedule_files'].slice(
                  0,
                  3
                )"
                :key="key"
                class="file-item"
              >
                <div class="file_name">
                  <i class="el-icon-document icon" />
                  <el-tooltip
                    effect="dark"
                    placement="top-start"
                  >
                    <div slot="content">
                      <p>File: {{ item.name }}</p>
                      <p>File capacity: {{ item.size }}</p>
                      <p>Creator: {{ item.creator }}</p>
                      <p>Creation date: {{ item.created_at }}</p>
                    </div>
                    <span style="cursor: pointer">{{ item.name }}</span>
                  </el-tooltip>
                </div>
                <div class="operate">
                  <i
                    v-if="determineFilePreview(item.name) && item.is_preview"
                    class="el-icon-view view-icon"
                    @click="previewFile(item.url, item.name, item.is_image)"
                  />
                  <i
                    class="el-icon-download download-icon"
                    @click="handleDownload(item.url, item.name)"
                  />
                </div>
              </div>
              <div
                v-if="
                  phaseData &&
                    phaseData['project_schedule_files'] &&
                    phaseData['project_schedule_files'].length > 3
                "
                class="arrow-down"
              >
                <img
                  src="@/assets/image/arrow-expand.png"
                  alt=""
                  @click="
                    openListDialog(
                      'Project schedule files',
                      phaseData['project_schedule_files']
                    )
                  "
                >
              </div>
            </div>
          </div>
        </div>
        <div class="files-row">
          <div class="label-wrapper">
            <div class="label">
              Golden row files
            </div>
          </div>
          <div class="files-wrapper">
            <div v-if="phaseData && phaseData['golden_row_files']">
              <div
                v-for="(item, key) in phaseData['golden_row_files'].slice(0, 3)"
                :key="key"
                class="file-item"
              >
                <div class="file_name">
                  <i class="el-icon-document icon" />
                  <el-tooltip
                    effect="dark"
                    placement="top-start"
                  >
                    <div slot="content">
                      <p>File: {{ item.name }}</p>
                      <p>File capacity: {{ item.size }}</p>
                      <p>Creator: {{ item.creator }}</p>
                      <p>Creation date: {{ item.created_at }}</p>
                    </div>
                    <span style="cursor: pointer">{{ item.name }}</span>
                  </el-tooltip>
                </div>
                <div class="operate">
                  <i
                    v-if="determineFilePreview(item.name) && item.is_preview"
                    class="el-icon-view view-icon"
                    @click="previewFile(item.url, item.name, item.is_image)"
                  />
                  <i
                    class="el-icon-download download-icon"
                    @click="handleDownload(item.url, item.name)"
                  />
                </div>
              </div>
              <div
                v-if="
                  phaseData &&
                    phaseData['golden_row_files'] &&
                    phaseData['golden_row_files'].length > 3
                "
                class="arrow-down"
              >
                <img
                  src="@/assets/image/arrow-expand.png"
                  alt=""
                  @click="
                    openListDialog(
                      'Golden row files',
                      phaseData['golden_row_files']
                    )
                  "
                >
              </div>
            </div>
          </div>
        </div>
        <div class="files-row">
          <div class="label-wrapper">
            <div class="label">
              Other files
            </div>
          </div>
          <div class="files-wrapper">
            <div v-if="phaseData && phaseData['other_files']">
              <div
                v-for="(item, key) in phaseData['other_files'].slice(0, 3)"
                :key="key"
                class="file-item"
              >
                <div class="file_name">
                  <i class="el-icon-document icon" />
                  <el-tooltip
                    effect="dark"
                    placement="top-start"
                  >
                    <div slot="content">
                      <p>File: {{ item.name }}</p>
                      <p>File capacity: {{ item.size }}</p>
                      <p>Creator: {{ item.creator }}</p>
                      <p>Creation date: {{ item.created_at }}</p>
                    </div>
                    <span style="cursor: pointer">{{ item.name }}</span>
                  </el-tooltip>
                </div>
                <div class="operate">
                  <i
                    v-if="determineFilePreview(item.name) && item.is_preview"
                    class="el-icon-view view-icon"
                    @click="previewFile(item.url, item.name, item.is_image)"
                  />
                  <i
                    class="el-icon-download download-icon"
                    @click="handleDownload(item.url, item.name)"
                  />
                </div>
              </div>
              <div
                v-if="
                  phaseData &&
                    phaseData['other_files'] &&
                    phaseData['other_files'].length > 3
                "
                class="arrow-down"
              >
                <img
                  src="@/assets/image/arrow-expand.png"
                  alt=""
                  @click="
                    openListDialog('Other files', phaseData['other_files'])
                  "
                >
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <el-image
      v-show="false"
      ref="previewImg"
      :preview-src-list="linkList"
    />

    <!--files list-->
    <POPDialog
      :dialog="{
        title: dialogTitle,
        type: 'dialog',
        width: '800px',
        visible: filesVisible
      }"
      @dialogClosed="
        (val) => {
          filesVisible = val;
        }
      "
    >
      <template #dialog-content>
        <div class="files-dialog-container">
          <div class="table-container">
            <div class="table-header">
              <div class="title">
                File name
              </div>
              <div class="operate">
                Action
              </div>
            </div>
            <div
              v-for="(file, index) in fileList"
              :key="index"
              class="table-content"
            >
              <div class="table-row">
                <div class="content">
                  <div class="icon">
                    <i class="el-icon-document" />
                  </div>
                  <div class="label">
                    <el-tooltip
                      effect="dark"
                      placement="top-start"
                    >
                      <div slot="content">
                        <p>File: {{ file.name }}</p>
                        <p>File capacity: {{ file.size }}</p>
                        <p>Creator: {{ file.creator }}</p>
                        <p>Creation date: {{ file.created_at }}</p>
                      </div>
                      <span style="cursor: pointer">{{ file.name }}</span>
                    </el-tooltip>
                  </div>
                </div>
                <div class="operate">
                  <i
                    v-if="determineFilePreview(file.name) && file.is_preview"
                    class="el-icon-view icon"
                    @click="previewFile(file.url, file.name, file.is_image)"
                  />
                  <i
                    class="el-icon-download icon"
                    @click="handleDownload(file.url, file.name)"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </template>
      <template #dialog-btn>
        <el-button
          type="primary"
          size="small"
          @click="donwloadAll('current')"
        >
          Download all
        </el-button>
      </template>
    </POPDialog>
  </div>
</template>

<script>
import POPDialog from '@/components/pop-dialog.vue';
import { directDownload, determineFilePreview } from '@/utils/commons';

export default {
  name: '',
  components: {
    POPDialog
  },
  props: {
    progress: {
      type: Object,
      default: null
    }
  },
  data() {
    return {
      phaseData: {},
      filesVisible: false,
      fileList: [],
      dialogTitle: '',
      linkList: []
    };
  },
  watch: {
    progress: {
      handler(newValue) {
        if(newValue){
          this.phaseData = newValue;
        }
      },
      deep: true,
      immediate: true
    }
  },
  methods: {
    determineFilePreview,
    handleDownload(url, name) {
      directDownload(url, name);
    },
    previewFile(url, name, flag) {
      if (!flag) {
        const { href } = this.$router.resolve({
          path: '/file-preview',
          query: {
            path: url,
            name
          }
        });
        window.open(href, '_blank');
      } else {
        this.$refs.previewImg.showViewer = true;
        this.linkList = [url];
      }
    },
    openListDialog(title, list) {
      this.dialogTitle = title;
      this.fileList = list;
      this.filesVisible = true;
    },
    donwloadAll(type) {
      if (type === 'current') {
        this.fileList.forEach((file) => {
          this.handleDownload(file.url, file.name);
        });
      } else {
        let fieldArr = [
          'technical_details_files',
          'project_schedule_files',
          'golden_row_files',
          'other_files'
        ];
        if (
          (!this.phaseData['technical_details_files'] ||
            !this.phaseData['technical_details_files'].length) &&
          (!this.phaseData['project_schedule_files'] ||
            !this.phaseData['project_schedule_files'].length) &&
          (!this.phaseData['golden_row_files'] ||
            !this.phaseData['golden_row_files'].length) &&
          (!this.phaseData['other_files'] ||
            !this.phaseData['other_files'].length)
        ) {
          this.$message.warning('No file to download');
        } else {
          fieldArr.forEach((field) => {
            if (this.phaseData[field] && this.phaseData[field].length) {
              this.phaseData[field].forEach((file) => {
                this.handleDownload(file.url, file.name);
              });
            }
          });
        }
      }
    }
  }
};
</script>

<style scoped lang="less">
.customer-files-container {
  margin-top: 16px;
  .customer-files-wrapper {
    border-top: 1px solid #eeeeee;
    border-left: 1px solid #eeeeee;
    border-radius: 4px 4px 0px 0px;
    .arrow-down {
      text-align: center;

      img {
        width: 16px;
        height: 16px;
        cursor: pointer;
      }
    }
  }
  .customer-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 32px;
    background: #f4f5f9;
    border-radius: 4px 4px 0px 0px;
    opacity: 1;
    border-right: 1px solid #eeeeee;
    border-bottom: 1px solid #eeeeee;
    .title-wrapper {
      font-size: 14px;
      color: #606266;
      margin-left: 24px;
      display: flex;
      align-items: center;
      .title {
        margin-left: 5px;
      }
    }
    .operate-wrapper {
      font-size: 13px;
      font-weight: 400;
      color: #606266;
      margin-right: 40px;
      transition: 0.5s;
      transition-property: all;
      transition-duration: 0.5s;
      transition-timing-function: ease;
      transition-delay: 0s;
    }
    .operate-wrapper:hover {
      cursor: pointer;
      color: #007bff;
    }
  }
  .files-container {
    display: flex;
    flex-wrap: wrap;
    .files-row {
      width: 50%;
      border-bottom: 1px solid #eeeeee;
      display: flex;
      flex-wrap: wrap;
    }
    .label-wrapper {
      flex: 1;
      min-height: 32px;
      display: flex;
      align-items: center;
      border-right: 1px solid #eeeeee;
      .label {
        margin-left: 32px;
        font-size: 13px;
        color: #606266;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
    }
    .files-wrapper {
      flex: 2;
      min-height: 32px;
      padding-top: 8px;
      border-right: 1px solid #eeeeee;
      .file-item {
        font-size: 13px;
        color: #606266;
        width: 90%;
        margin: 0 auto;
        margin-bottom: 8px;
        display: flex;
        flex-wrap: wrap;
        .file_name {
          margin-right: 24px;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          .icon {
            margin-right: 5px;
          }
        }
        .operate {
          .view-icon {
            margin-right: 16px;
            transition: 0.5s;
            transition-property: all;
            transition-duration: 0.5s;
            transition-timing-function: ease;
            transition-delay: 0s;
          }
          .view-icon:hover {
            cursor: pointer;
            color: #007bff;
          }
          .download-icon {
            transition: 0.5s;
            transition-property: all;
            transition-duration: 0.5s;
            transition-timing-function: ease;
            transition-delay: 0s;
          }
          .download-icon:hover {
            cursor: pointer;
            color: #007bff;
          }
        }
      }
    }
  }
}
.files-dialog-container {
  margin-right: 16px;
  .table-container {
    border-radius: 4px 4px 0px 0px;
    border: 1px solid #eeeeee;
    .table-header {
      height: 32px;
      background: #f4f5f9;
      border-radius: 4px 4px 0px 0px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      .title {
        margin-left: 24px;
      }
      .operate {
        margin-right: 48px;
      }
    }
    .table-row {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 6px 0px 6px 0px;
      border-top: 1px solid #eeeeee;
      .content {
        flex: 1;
        display: flex;
        align-items: center;
        font-size: 13px;
        color: #606266;
        margin-left: 24px;
        .icon {
          margin-right: 5px;
        }
        .label {
          flex: 1;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
      }
      .operate {
        margin-right: 42px;
        .icon {
          transition: 0.5s;
          transition-property: all;
          transition-duration: 0.5s;
          transition-timing-function: ease;
          transition-delay: 0s;
          margin-left: 16px;
        }
        .icon:hover {
          cursor: pointer;
          color: #007bff;
        }
      }
    }
  }
}
</style>
