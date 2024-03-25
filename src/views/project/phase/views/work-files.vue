<template>
  <div>
    <!--Solution-->
    <div class="solution-container">
      <div class="solution-header">
        <div class="title-wrapper">
          <div class="icon">
            <i class="el-icon-folder-opened" />
          </div>
          <div class="title">
            {{ optionsInfo.label }}
          </div>
        </div>
      </div>

      <!--calculation-->
      <div
        v-if="fileType === 3"
        class="files-line-container"
      >
        <div
          v-for="(item, key) in optionsInfo.data"
          :key="key"
          class="files-row"
        >
          <div class="label-wrapper">
            <div class="label">
              {{ item.label }}
            </div>
            <div
              v-if="operateRole && uploadRole"
              class="upload-wrapper"
              @click="handleUpload(item)"
            >
              <i class="el-icon-upload2" />
              Upload
            </div>
          </div>
          <div class="files-wrapper">
            <div
              v-for="(filesItem, filesKey) in filesData"
              :key="filesKey"
              class="file-item-wrapper"
            >
              <div v-if="filesItem.type == item.value">
                <div
                  v-for="(fileRow, fileKey) in filesItem.files"
                  :key="fileKey"
                  class="file-item"
                  style="width: 95%"
                >
                  <div
                    class="file-name-wrapper"
                    style="display: flex"
                  >
                    <div class="file_name">
                      <i class="el-icon-document icon" />
                      <el-tooltip
                        effect="dark"
                        placement="top-start"
                      >
                        <div slot="content">
                          <p>File: {{ fileRow.name }}</p>
                          <p>File capacity: {{ fileRow.size }}</p>
                          <p>Creator: {{ fileRow.creator }}</p>
                          <p>Creation date: {{ fileRow.created_at }}</p>
                        </div>
                        <span style="cursor: pointer">{{ fileRow.name }}</span>
                      </el-tooltip>
                    </div>
                    <div class="operate">
                      <i
                        v-if="
                          determineFilePreview(fileRow.name) &&
                            fileRow.is_preview
                        "
                        class="el-icon-view view-icon"
                        @click="
                          previewFile(
                            fileRow.url,
                            fileRow.name,
                            fileRow.is_image
                          )
                        "
                      />
                      <i
                        class="el-icon-download download-icon"
                        @click="handleDownload(fileRow.url, fileRow.name)"
                      />
                    </div>
                  </div>
                  <!-- <div class="quote-wrapper">
                    <div class="quote-price">
                      Total price($) : {{ filesItem.total_price }}
                    </div>
                    <div class="quote-price-per">
                      Per watt price($) : {{ filesItem.per_watt_price }}
                    </div>
                  </div> -->
                  <div
                    v-if="operateRole && uploadRole"
                    class="delete-wrapper"
                    style="margin-left: 16px"
                    @click="
                      showDeleteDialog(
                        filesItem.id,
                        fileRow.id,
                        'files',
                        filesItem.file_type
                      )
                    "
                  >
                    <i class="el-icon-delete delete-icon" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!--2D/simulation-->
      <div
        v-else
        class="files-single-container"
      >
        <div
          v-for="(item, key) in optionsInfo.data"
          :key="key"
          class="files-row"
        >
          <div class="label-wrapper">
            <div class="label">
              {{ item.label }}
            </div>
            <div
              v-if="operateRole && uploadRole"
              class="upload-wrapper"
              @click="handleUpload(item)"
            >
              <i class="el-icon-upload2" />
              Upload
            </div>
          </div>
          <div class="files-wrapper">
            <div
              v-for="(filesItem, filesKey) in filesData"
              :key="filesKey"
              class="file-item-wrapper"
            >
              <div
                v-if="filesItem.type == item.value"
                style="width: 95%; margin: 0 auto"
              >
                <div
                  v-for="(fileRow, fileKey) in filesItem.files"
                  :key="fileKey"
                  class="file-item"
                >
                  <div
                    v-if="filesItem.file_type < 3"
                    style="
                      display: flex;
                      width: 110px;
                      justify-content: space-between;
                    "
                  >
                    <div>
                      <span v-if="filesItem.file_type === 1">V{{ filesItem.version }}</span>
                      <img
                        v-if="filesItem.file_type === 1 && filesItem.win === 1"
                        src="@/assets/image/hat.png"
                        alt=""
                        style="width: 16px; height: 16px; margin-right: 10px"
                      >
                    </div>
                    <div v-if="filesItem.file_type === 1">
                      Quote file:
                    </div>
                  </div>
                  <div
                    class="file-name-wrapper"
                    :style="{
                      flex: filesItem.file_type === 4 ? 'none' : 1
                    }"
                  >
                    <div class="file_name">
                      <i class="el-icon-document icon" />
                      <el-tooltip
                        effect="dark"
                        placement="top-start"
                      >
                        <div slot="content">
                          <p>File: {{ fileRow.name }}</p>
                          <p>File capacity: {{ fileRow.size }}</p>
                          <p>Creator: {{ fileRow.creator }}</p>
                          <p>Creation date: {{ fileRow.created_at }}</p>
                        </div>
                        <span style="cursor: pointer">{{ fileRow.name }}</span>
                      </el-tooltip>
                    </div>
                    <div class="operate">
                      <i
                        v-if="
                          determineFilePreview(fileRow.name) &&
                            fileRow.is_preview
                        "
                        class="el-icon-view view-icon"
                        @click="
                          previewFile(
                            fileRow.url,
                            fileRow.name,
                            fileRow.is_image
                          )
                        "
                      />
                      <i
                        class="el-icon-download download-icon"
                        @click="handleDownload(fileRow.url, fileRow.name)"
                      />
                    </div>
                  </div>
                  <div
                    v-if="filesItem.file_type === 1"
                    class="quote-wrapper"
                  >
                    <div class="quote-price">
                      Total price({{
                        uploadForm.currency === 'USD' ? '$' : 'CAD'
                      }}) : {{ filesItem.total_price }}
                    </div>
                    <div class="quote-price-per">
                      Per watt price({{
                        uploadForm.currency === 'USD' ? '$' : 'CAD'
                      }}) : {{ filesItem.per_watt_price }}
                    </div>
                  </div>
                  <div
                    v-if="operateRole && uploadRole"
                    class="delete-wrapper"
                    @click="
                      showDeleteDialog(
                        filesItem.id,
                        fileRow.id,
                        'files',
                        filesItem.file_type
                      )
                    "
                  >
                    <i
                      class="el-icon-delete delete-icon"
                      :style="{
                        marginLeft: filesItem.file_type === 4 ? '16px' : 'auto'
                      }"
                    />
                  </div>
                </div>
                <div v-if="filesItem.other_files && filesItem.other_files">
                  <div
                    v-for="(fileRow, fileKey) in filesItem.other_files"
                    :key="fileKey"
                    class="file-item"
                  >
                    <div
                      v-if="filesItem.file_type === 1"
                      style="width: 110px; text-align: end"
                    >
                      Other file:
                    </div>
                    <div class="file-name-wrapper">
                      <div class="file_name">
                        <i class="el-icon-document icon" />
                        <el-tooltip
                          effect="dark"
                          placement="top-start"
                        >
                          <div slot="content">
                            <p>File: {{ fileRow.name }}</p>
                            <p>File capacity: {{ fileRow.size }}</p>
                            <p>Creator: {{ fileRow.creator }}</p>
                            <p>Creation date: {{ fileRow.created_at }}</p>
                          </div>
                          <span style="cursor: pointer">{{
                            fileRow.name
                          }}</span>
                        </el-tooltip>
                      </div>
                      <div class="operate">
                        <i
                          v-if="
                            determineFilePreview(fileRow.name) &&
                              fileRow.is_preview
                          "
                          class="el-icon-view view-icon"
                          @click="
                            previewFile(
                              fileRow.url,
                              fileRow.name,
                              fileRow.is_image
                            )
                          "
                        />
                        <i
                          class="el-icon-download download-icon"
                          @click="handleDownload(fileRow.url, fileRow.name)"
                        />
                      </div>
                    </div>
                    <div class="quote-wrapper">
                      <div class="quote-price">
                        Total price({{
                          uploadForm.currency === 'USD' ? '$' : 'CAD'
                        }}) : {{ filesItem.total_price }}
                      </div>
                      <div class="quote-price-per">
                        Per watt price({{
                          uploadForm.currency === 'USD' ? '$' : 'CAD'
                        }}) : {{ filesItem.per_watt_price }}
                      </div>
                    </div>
                    <div
                      v-if="operateRole && uploadRole"
                      class="delete-wrapper"
                      @click="
                        showDeleteDialog(
                          filesItem.id,
                          fileRow.id,
                          'other_files',
                          filesItem.file_type
                        )
                      "
                    >
                      <i class="el-icon-delete delete-icon" />
                    </div>
                  </div>
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
    </div>
    <!--upload-->
    <POPDialog
      v-if="uploadVisible"
      :dialog="{
        title: `${uploadTitle} upload`,
        type: 'dialog',
        visible: uploadVisible,
        width: '1280px'
      }"
      @dialogClosed="
        (val) => {
          uploadVisible = val;
        }
      "
    >
      <template #dialog-content>
        <div class="upload-dialog-container">
          <el-form
            ref="uploadForm"
            :inline="true"
            :rules="uploadRules"
            :model="uploadForm"
            class="demo-form-inline"
          >
            <div v-if="fileType === 1">
              <el-form-item label="Currency">
                <el-input
                  v-model="uploadForm.currency"
                  class="input"
                  size="small"
                  :disabled="true"
                  style="width: 315px"
                />
              </el-form-item>
              <el-form-item
                :label="`Total price(
                        ${uploadForm.currency === 'USD' ? '$' : 'CAD'}
                      )`"
                prop="total_price"
                style="margin-left: 30px"
              >
                <el-input
                  v-model="uploadForm.total_price"
                  size="small"
                  class="input"
                  placeholder="Please input total price"
                  style="width: 255px"
                  @blur="changeTotalPrice"
                />
              </el-form-item>
              <el-form-item
                :label="`Per watt price(${
                  uploadForm.currency === 'USD' ? '$' : 'CAD'
                })`"
                prop="per_watt_price"
                style="margin-left: 30px"
              >
                <el-input
                  ref="perWattPrice"
                  v-model="uploadForm.per_watt_price"
                  size="small"
                  class="input"
                  placeholder="Please input Per watt price"
                  style="width: 255px"
                  @blur="changePerWattPrice"
                />
              </el-form-item>
              <div class="upload-file">
                <el-form-item
                  label="Quote file"
                  prop="files"
                  :class="{ 'min-file-height': quoteFile.length }"
                >
                  <file-upload
                    @get-files="(file) => getFiles(file, 'quote files')"
                  />
                </el-form-item>
                <el-form-item
                  label="Other files"
                  :class="{ 'min-file-height': otherFiles.length }"
                >
                  <file-upload
                    @get-files="(file) => getFiles(file, 'other files')"
                  />
                </el-form-item>
              </div>
            </div>
            <div
              v-else
              class="upload-file"
            >
              <el-form-item
                :label="uploadTitle"
                :class="{ 'min-file-height': uploadFiles.length }"
                prop="files"
              >
                <file-upload
                  @get-files="(file) => getFiles(file, uploadTitle)"
                />
              </el-form-item>
            </div>
          </el-form>
        </div>
      </template>
      <template #dialog-btn>
        <el-button
          size="small"
          @click="uploadVisible = false"
        >
          Cancel
        </el-button>
        <el-button
          type="primary"
          size="small"
          @click="submitFileUpload"
        >
          Confirm
        </el-button>
      </template>
    </POPDialog>

    <!-- 确认删除 -->
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
        The file will be deleted, are you sure to continue?
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
          @click="deleteFile"
        >
          Confirm
        </el-button>
      </template>
    </POPDialog>
  </div>
</template>

<script>
import POPDialog from '@/components/pop-dialog.vue';
import FileUpload from '@/components/file-upload.vue';
import { directDownload, determineFilePreview } from '@/utils/commons';
import registerListeners from '../controller/listener';
import {
  progressFileList,
  progressFile,
  upload3Dfiles,
  removeSingleProgressFile,
  deleteProgressFile
} from '@/api/index.js';

export default {
  name: '',
  components: {
    POPDialog,
    FileUpload
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
      optionsInfo: {
        label: 'Solution',
        data: []
      },
      projectType: '',
      projectMode: 0,
      fileType: 0,
      activeDept: '',
      phaseData: {},
      productType: [],
      filesData: [],
      uploadRole: false,
      uploadVisible: false,
      uploadForm: {
        currency: '',
        total_price: '',
        per_watt_price: '',
        files: []
      },
      uploadRules: {
        total_price: [
          {
            required: true,
            message: 'Please input total price',
            trigger: 'submit'
          }
        ],
        per_watt_price: [
          {
            required: true,
            message: 'Please input per watt price',
            trigger: 'submit'
          }
        ],
        files: [
          {
            required: true,
            message: 'Please upload file',
            trigger: 'submit'
          }
        ]
      },
      quoteFile: [],
      otherFiles: [],
      DCsize: null,
      uploadTitle: '',
      uploadFiles: [],
      quoteFilesView: [],
      deleteVisible: false,
      deleteType: '',
      deleteRecordId: 0,
      deleteFileId: 0,
      deleteFileType: 0,
      linkList: []
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
          this.getOptionsData();
        }
      },
      deep: true,
      immediate: true
    },
    phase: {
      handler(newValue) {
        this.phaseData = newValue;
        if (this.phaseData && this.phaseData.id) {
          this.getOptionsData();
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
    determineFilePreview,
    getOptionsData() {
      this.project_id = this.$route.params.project_id;
      this.projectType = this.$route.params.project_type;
      if (this.phaseData) {
        let { activeDept } = this;
        if (this.projectMode === 1) {
          if (activeDept === '2D') {
            this.fileType = 1;
            this.optionsInfo = {
              label: 'Solution',
              data: []
            };
            this.getProductType();
          }
          if (activeDept === '3D') {
            this.fileType = 3;
            this.optionsInfo = {
              label: '3D calculation files',
              data: [
                {
                  value: '3D display file',
                  label: '3D display file',
                  mode: 'phase'
                },
                {
                  value: '3D video',
                  label: '3D video',
                  mode: 'phase'
                },
                {
                  value: 'Calculation file',
                  label: 'Calculation file',
                  mode: 'phase'
                },
                {
                  value: 'Other files',
                  label: 'Other files',
                  mode: 'phase'
                }
              ]
            };
          }
        }
        if (this.projectMode === 2) {
          if (activeDept === '2D') {
            this.fileType = 2;
            this.optionsInfo = {
              label: 'Solution',
              data: []
            };
            this.getProductType();
            progressFileList({
              id: this.phaseData.id,
              file_type: 1
            }).then((res) => {
              if (res.code === 200) {
                this.quoteFilesView.length = 0;
                this.quoteFilesView = this.quoteFilesView.concat(res.data);
                this.getFilesList();
              }
            });
          }
          if (activeDept === '3D') {
            this.fileType = 4;
            this.optionsInfo = {
              label: '3D simulation files',
              data: [
                {
                  value: '3D site file',
                  label: '3D site file',
                  mode: 'label&sim'
                },
                {
                  value: '3D video',
                  label: '3D video',
                  mode: 'label&sim'
                },
                {
                  value: 'Other files',
                  label: 'Other files',
                  mode: 'label&sim'
                }
              ]
            };
          }
        }
        if (this.phaseData) {
          this.getUploadRole();
          this.getFilesList();
        }
      }
    },
    getProductType() {
      let { product_type } = this.phaseData;
      let data = [];
      for (let i = 0; i < product_type.length; i++) {
        let productItem = product_type[i];
        let params = {
          value: productItem,
          label: productItem,
          mode: 'phase'
        };
        data.push(params);
        if (i === product_type.length - 1) {
          if (this.projectMode === 2) {
            let labelOption = {
              value: 'Label',
              label: 'Label files',
              mode: 'label&sim'
            };
            data.push(labelOption);
          }
          this.optionsInfo.data = data;
        }
      }
    },
    getUploadRole() {
      let { phaseData } = this;
      this.operateRole = true;
      let projectData = localStorage.getItem('project');
      let project = JSON.parse(projectData);
      if (project.archiving === 1 || phaseData.archiving === 1) {
        if (this.projectMode !== 2) {
          this.operateRole = false;
        }
      }
      this.uploadRole = false;
      this.uploadForm['currency'] = project.currency;
      this.DCsize = Number(project.size);
      let userData = localStorage.getItem('user');
      let user = JSON.parse(userData);
      if (this.projectMode === 1) {
        if (this.activeDept === '2D') {
          if (user.role === 'CN Engineer Manager') {
            if (phaseData['status'] === 'CN_TEAM_ALREADY_APPLIED') {
              this.uploadRole = true;
            }
          }
          if (user.role === 'Team Leader') {
            if (
              phaseData['status'] === 'CN_ASSIGNED' ||
              phaseData['status'] === 'CN_REJECTED'
            ) {
              if (user.team_id === phaseData['team_id']) {
                this.uploadRole = true;
              }
            }
          }
        }
        if (this.activeDept === '3D') {
          if (user.role === '3D Manager') {
            if (
              phaseData['3d_calculation_status'] ===
              'CAL_CN_TEAM_ALREADY_APPLIED'
            ) {
              this.uploadRole = true;
            }
          }
          if (user.role === '3D Team Leader') {
            if (
              phaseData['3d_calculation_status'] === 'CAL_CN_ASSIGNED' ||
              phaseData['3d_calculation_status'] === 'CAL_CN_REJECTED'
            ) {
              if (user.team_id === phaseData['3d_team_id']) {
                this.uploadRole = true;
              }
            }
          }
        }
      }
      if (this.projectMode === 2) {
        if (this.activeDept === '2D') {
          if (user.role === 'CN Engineer Manager') {
            if (project['label_status'] === 'FORMAL_LABEL_SEND') {
              this.uploadRole = true;
            }
          }
          if (user.role === 'Team Leader') {
            if (
              project['label_status'] === 'FORMAL_DESIGN_LABEL' ||
              project['label_status'] === 'FORMAL_LABEL_REJECTED'
            ) {
              if (user.team_id === project['label_team']) {
                this.uploadRole = true;
              }
            }
          }
        }
        if (this.activeDept === '3D') {
          if (user.role === '3D Manager') {
            if (
              project['simulation_status'] === 'SIM_CN_TEAM_ALREADY_APPLIED'
            ) {
              this.uploadRole = true;
            }
          }
          if (user.role === '3D Team Leader') {
            if (
              project['simulation_status'] === 'SIM_CN_ASSIGNED' ||
              project['simulation_status'] === 'SIM_CN_REJECTED'
            ) {
              if (user.team_id === project['simulation_team_id']) {
                this.uploadRole = true;
              }
            }
          }
        }
      }
    },
    getFilesList() {
      progressFileList({
        id: this.phaseData.id,
        file_type: this.fileType
      }).then((res) => {
        if (res.code === 200) {
          this.filesData = res.data;
          if (this.fileType === 2) {
            this.filesData = this.quoteFilesView.concat(this.filesData);
          } else {
            this.quoteFilesView.length = 0;
          }
        }
      });
    },
    showDeleteDialog(recordId, fileId, type, fileType) {
      this.deleteRecordId = recordId;
      this.deleteFileId = fileId;
      this.deleteType = type;
      this.deleteVisible = true;
      this.deleteFileType = fileType;
    },
    async deleteFile() {
      if (this.deleteFileType === 1 && this.deleteType === 'files') {
        await deleteProgressFile({
          progress_file_id: this.deleteRecordId
        }).then((res) => {
          if (res.code === 200) {
            this.deleteVisible = false;
            this.getFilesList();
          }
        });
      } else {
        await removeSingleProgressFile({
          id: this.deleteRecordId,
          type: this.deleteType,
          file_id: this.deleteFileId
        }).then((res) => {
          if (res.code === 200) {
            this.deleteVisible = false;
            this.getFilesList();
          }
        });
      }
    },
    handleUpload(item) {
      let projectData = localStorage.getItem('project');
      let project = JSON.parse(projectData);
      this.uploadForm.currency = project.currency;
      this.DCsize = Number(project.size);
      this.uploadFiles.length = 0;
      this.uploadVisible = true;
      this.uploadTitle = item.label;
    },
    handleFiles(file) {
      if (file && file.length) {
        return JSON.stringify(file);
      } else {
        return '[]';
      }
    },
    async uploadProgressFiles() {
      let body = { ...this.uploadForm };
      body.progress_id = this.phaseData.id;
      body.project_id = this.project_id;
      body.file_type = this.fileType;
      switch (this.fileType) {
        case 1:
          body.total_price = this.removeThousandsSeparator(body.total_price);
          body.per_watt_price = parseFloat(body.per_watt_price);
          body.files = this.handleFiles(this.quoteFile);
          body.other_files = this.handleFiles(this.otherFiles);
          body.type = this.uploadTitle;
          break;
        case 2:
          body.files = this.handleFiles(this.uploadFiles);
          body.type = 'Label';
          body.other_files = '[]';
          delete body.total_price;
          delete body.per_watt_price;
          delete body.currency;
          break;
        case 3:
        case 4:
          body.files = this.handleFiles(this.uploadFiles);
          body.type = this.uploadTitle;
          body.other_files = '[]';
          delete body.total_price;
          delete body.per_watt_price;
          delete body.currency;
          break;
        default:
      }
      if (this.fileType < 3) {
        await progressFile(body).then((res) => {
          if (res.code === 200) {
            this.$message.success(res.message);
            this.uploadVisible = false;
            this.quoteFile.length = 0;
            this.otherFiles.length = 0;
            this.uploadForm = {
              currency: '',
              total_price: '',
              per_watt_price: '',
              files: []
            };
            this.uploadFiles.length = [];
            this.getFilesList();
          }
        });
      } else {
        await upload3Dfiles(body).then((res) => {
          if (res.code === 200) {
            this.$message.success(res.message);
            this.uploadVisible = false;
            this.uploadForm = {
              currency: '',
              total_price: '',
              per_watt_price: '',
              files: []
            };
            this.getFilesList();
          }
        });
      }
    },
    submitFileUpload() {
      this.$refs.uploadForm.validate((valid) => {
        if (valid) {
          this.uploadProgressFiles();
        }
      });
    },
    getFiles(files, fileType) {
      if (fileType === 'quote files') {
        this.quoteFile = files;
        this.uploadForm.files = files;
      } else if (fileType === 'other files') {
        this.otherFiles = files;
        this.uploadForm.other_files = files;
      } else {
        this.uploadFiles = files;
        this.uploadForm.files = files;
      }
    },
    formatNumberToThousands(num) {
      // 先将数字转换成字符串
      let numStr = String(num);
      // 检查是否含有小数部分
      let decimalPart = '';
      const decimalIndex = numStr.indexOf('.');
      if (decimalIndex !== -1) {
        decimalPart = numStr.slice(decimalIndex);
        numStr = numStr.slice(0, decimalIndex);
      }
      // 正则表达式匹配千分位
      const reg = /\B(?=(\d{3})(?!\d))/g;
      numStr = numStr.replace(reg, ',');
      // 将小数部分重新拼接回去
      return numStr + decimalPart;
    },
    //将千分位数字字符串转化回数字
    removeThousandsSeparator(numberString) {
      // 使用正则表达式将千分位的逗号替换为空字符串
      let numStr = numberString.replace(/,/g, '');
      return parseFloat(numStr);
    },
    changeTotalPrice(e) {
      let inputVal = this.removeThousandsSeparator(e.target.value);
      inputVal = inputVal.toString();
      let indexOfDot = inputVal.indexOf('.');
      let integerPart = '';
      if (indexOfDot > -1) {
        integerPart = inputVal.substring(0, indexOfDot);
      } else {
        integerPart = inputVal;
      }
      if (integerPart.length > 11) {
        this.$message.error('The price should not exceed 11 figures');
        return;
      }
      if (isNaN(e.target.value)) {
        let { value } = e.target;
        // eslint-disable-next-line no-useless-escape
        const regex = /^[\d,\.]*$/;
        let isNumberString = regex.test(value);

        if (typeof value === 'string' && isNumberString) {
          let removedThousandsVal = this.removeThousandsSeparator(value);
          removedThousandsVal = removedThousandsVal.toString();
          this.convertPriceFormat(removedThousandsVal);
          return;
        }
        this.$message.error('Please enter a valid number');
        return;
      }
      if (e.target.value === '') {
        return;
      }
      if (this.DCsize) {
        this.convertPriceFormat(e.target.value);
      }
    },
    convertPriceFormat(value) {
      let pureNumberValue = this.removeThousandsSeparator(value);
      this.uploadForm.per_watt_price =
        pureNumberValue / (this.DCsize * 1000000);
      this.uploadForm.per_watt_price =
        this.uploadForm.per_watt_price.toFixed(6);
      this.uploadForm.total_price =
        this.formatNumberToThousands(pureNumberValue);
      this.$refs.perWattPrice.focus();
      this.$refs.perWattPrice.blur();
    },
    changePerWattPrice(e) {
      if (isNaN(e.target.value)) {
        return;
      } else if ((e.target.value && e.target.value.trim()) === '') {
        return;
      }
      let perWattPrice = parseFloat(this.uploadForm.per_watt_price);
      this.uploadForm.per_watt_price = perWattPrice.toFixed(6);
    },
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
        this.linkList = [url];
        this.$refs.previewImg.showViewer = true;
      }
    }
  }
};
</script>

<style scoped lang="less">
.solution-container {
  margin-top: 16px;
  border-radius: 4px 4px 0px 0px;
  border: 1px solid #eeeeee;
  border-bottom: 0px;
  .solution-header {
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
  .files-single-container {
    .files-row {
      border-bottom: 1px solid #eeeeee;
      display: flex;
      flex-wrap: wrap;
    }
    .label-wrapper {
      flex: 1;
      min-height: 32px;
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      justify-content: space-between;
      border-right: 1px solid #eeeeee;
      padding-left: 32px;
      .label {
        font-size: 13px;
        color: #606266;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
      .upload-wrapper {
        font-size: 13px;
        font-family: PingFang SC, PingFang SC;
        font-weight: 400;
        color: #007bff;
        margin-right: 32px;
        transition: 0.5s;
        transition-property: all;
        transition-duration: 0.5s;
        transition-timing-function: ease;
        transition-delay: 0s;
      }
      .upload-wrapper:hover {
        cursor: pointer;
        opacity: 0.8;
      }
    }
    .files-wrapper {
      flex: 5;
      min-height: 32px;
      padding-top: 8px;
      border-right: 1px solid #eeeeee;
      .file-item {
        font-size: 13px;
        color: #606266;
        // width: 90%;
        margin: 0 auto;
        display: flex;
        flex-wrap: wrap;
        .file-name-wrapper {
          display: flex;
          align-items: center;
          flex: 1;
          margin-bottom: 8px;
          margin-left: 8px;
        }
        .file_name {
          margin-right: 24px;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          .icon {
            margin-right: 5px;
          }
        }
        .quote-wrapper {
          flex: 1;
          display: flex;
          align-items: center;
          margin-bottom: 8px;
          .quote-price {
            min-width: 156px;
            margin-right: 80px;
          }
          .quote-price-per {
            min-width: 156px;
          }
        }
        .operate {
          display: flex;
          align-items: center;
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

  .delete-icon {
    transition: 0.5s;
    transition-property: all;
    transition-duration: 0.5s;
    transition-timing-function: ease;
    transition-delay: 0s;
  }
  .delete-icon:hover {
    cursor: pointer;
    color: #f56c6c;
  }
  .files-line-container {
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
      flex-wrap: wrap;
      align-items: center;
      justify-content: space-between;
      border-right: 1px solid #eeeeee;
      padding-left: 32px;
      .label {
        font-size: 13px;
        color: #606266;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
      .upload-wrapper {
        font-size: 13px;
        font-family: PingFang SC, PingFang SC;
        font-weight: 400;
        color: #007bff;
        margin-right: 32px;
        transition: 0.5s;
        transition-property: all;
        transition-duration: 0.5s;
        transition-timing-function: ease;
        transition-delay: 0s;
      }
      .upload-wrapper:hover {
        cursor: pointer;
        opacity: 0.8;
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
        // width: 90%;
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
.upload-dialog-container {
  .input {
    width: 298px;
  }
}

.upload-file {
  display: flex;
  :deep(.el-form-item__content) {
    display: initial;
    line-height: 20px !important;
  }
  :deep(.el-form-item) {
    flex: 1;
  }
  :deep(.el-form-item:last-child) {
    margin-right: 0;
  }
  :deep(.el-form-item:first-child) {
    margin-right: 24px;
  }
  :deep(.el-form-item__error) {
    left: auto;
  }
  .min-file-height {
    :deep(.el-upload-dragger) {
      height: 72px;
    }
  }
  :deep(.el-upload-list) {
    font-weight: 400;
    color: #606266;
    max-height: 104px;
    overflow-y: auto;
    .file-item {
      font-size: 13px;
    }
  }
}

:deep(.el-form--inline .el-form-item) {
  margin-right: 0;
}
</style>
