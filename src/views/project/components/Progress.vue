<template>
  <div v-loading="fullscreenLoading">
    <Card class="card-min">
      <template #cardHeader>
        <span class="iconfont icon-jihuarenwu1 card-icon" />
        {{ cardTitle }}
      </template>
      <template #cardOperate>
        <div
          class="card-btn animate"
          @click="handleBack"
        >
          <i class="el-icon-back" />
          Return
        </div>
      </template>
      <template #cardContent>
        <div class="add-form-container">
          <!--progress表单详情-->
          <el-form
            ref="form"
            :rules="rules"
            :model="form"
            label-width="170px"
            size="mini"
            class="new-progress-dialog"
          >
            <el-form-item
              label="Phase"
              prop="progress"
            >
              <el-select
                v-model="form.progress"
                filterable
                allow-create
                default-first-option
                placeholder="Please input and select"
                style="width: 220px"
              >
                <el-option
                  v-for="item in progressOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
            </el-form-item>
            <el-form-item
              label="Customer due date"
              prop="due_date"
            >
              <el-date-picker
                v-model="form.due_date"
                type="datetime"
                placeholder="Select date"
              />
            </el-form-item>
            <!-- 2023/08/29新增inner_due_date, 用于中国技术给内部组员设置截止日期 -->
            <el-form-item
              label="Internal due date"
              prop="inner_date"
            >
              <el-date-picker
                v-model="form.inner_date"
                type="datetime"
                placeholder="Select date"
              />
            </el-form-item>
            <el-form-item
              label="Solution(Multiple-choice)"
              prop="product_type"
            >
              <el-checkbox-group v-model="form.product_type">
                <el-checkbox
                  label="Harness"
                  name="type"
                />
                <el-checkbox
                  label="Alex"
                  name="type"
                />
                <el-checkbox
                  label="Lynx"
                  name="type"
                />
              </el-checkbox-group>
            </el-form-item>
            <el-form-item label="Electrical drawing files">
              <el-upload
                ref="upload"
                :action="uploadURL"
                :multiple="true"
                :on-progress="handleDrawingFilesProgresss"
                :on-success="updateDrawingFiles"
                :on-error="failUpdate"
                :on-preview="viewDrawingFiles"
                :on-remove="deleteDrawingFiles"
                :headers="uploadHeaders"
                :file-list="electrical_drawing_files"
              >
                <div class="page-title-btn">
                  <el-button
                    ref="electricalDrawingFilesBtn"
                    size="mini"
                    type="primary"
                  >
                    Click to upload
                  </el-button>
                </div>
              </el-upload>
              <el-progress
                v-if="progressDrawingFiles"
                :percentage="loadDrawingFilesProgress"
              />
            </el-form-item>
            <el-form-item label="Golden Row files">
              <el-upload
                ref="upload"
                :action="uploadURL"
                :multiple="true"
                :on-progress="handleGoldenFilesProgresss"
                :on-success="updateGoldenFiles"
                :on-error="failUpdate"
                :on-preview="viewGoldenFiles"
                :on-remove="deleteGoldenFiles"
                :headers="uploadHeaders"
                :file-list="golden_row_files"
              >
                <div class="page-title-btn">
                  <el-button
                    ref="goldenRowFilesBtn"
                    size="mini"
                    type="primary"
                  >
                    Click to upload
                  </el-button>
                </div>
              </el-upload>
              <el-progress
                v-if="progressGoldenFiles"
                :percentage="loadGoldenFilesProgress"
              />
            </el-form-item>
            <el-form-item label="Sequence file">
              <el-upload
                ref="upload"
                :action="uploadURL"
                :multiple="false"
                :limit="1"
                :on-progress="handleSequenceFileProgresss"
                :on-success="updateSequenceFile"
                :on-error="failUpdate"
                :on-preview="viewSequenceFile"
                :on-remove="deleteSequenceFile"
                :headers="uploadHeaders"
                :file-list="sequence_file"
              >
                <div class="page-title-btn">
                  <el-button
                    ref="sequenceFileBtn"
                    size="mini"
                    type="primary"
                  >
                    Click to upload
                  </el-button>
                </div>
              </el-upload>
              <el-progress
                v-if="progressSequenceFile"
                :percentage="loadSequenceFileProgress"
              />
            </el-form-item>
            <el-form-item label="Other files">
              <el-upload
                ref="upload"
                :action="uploadURL"
                :multiple="true"
                :on-progress="handleOtherFilesProgresss"
                :on-success="updateOtherFiles"
                :on-error="failUpdate"
                :on-preview="viewOtherFiles"
                :on-remove="deleteOtherFiles"
                :headers="uploadHeaders"
                :file-list="other_files"
              >
                <div class="page-title-btn">
                  <el-button
                    ref="otherFilesBtn"
                    size="mini"
                    type="primary"
                  >
                    Click to upload
                  </el-button>
                </div>
              </el-upload>
              <el-progress
                v-if="progressOtherFiles"
                :percentage="loadOtherFilesProgress"
              />
            </el-form-item>
            <el-form-item label="Comment">
              <el-input
                ref="commentArea"
                v-model="form.remarks"
                type="textarea"
                :rows="5"
                @keyup.native="handleKeyup"
              />
              <TagPerson
                v-if="atTagPerson"
                ref="tagPerson"
                :style="{
                  position: 'absolute',
                  top: '20px',
                  'z-index': 3,
                  left: leftPosition
                }"
                @person-chosen="handleChoosePerson"
              />
            </el-form-item>
            <el-form-item>
              <div class="form-submit-btn">
                <div
                  class="btn cancel animate"
                  @click="handleBack"
                >
                  Cancel
                </div>
                <div
                  v-if="formMode == 'add'"
                  class="btn submit animate"
                  :class="{ 'btn-disabled': uploading }"
                  @click="handleAdd"
                >
                  Submit
                </div>
                <div
                  v-if="formMode == 'edit'"
                  class="btn submit animate"
                  :class="{ 'btn-disabled': uploading }"
                  @click="handleEdit"
                >
                  Submit
                </div>
              </div>
            </el-form-item>
          </el-form>
        </div>
      </template>
    </Card>
  </div>
</template>

<script>
import Card from '@/components/Card.vue';
import {
  progressDetail,
  addProgress,
  editProgress,
  configParams,
  sendEmail,
  projectStatus
} from '@/api/index.js';
// import updateStatus from '@/utils/status.js';
import TagPerson from '@/components/CommentsAndUpdates/TagPerson.vue';
import baseUrl from '@/config.js';
export default {
  name: '',
  components: {
    Card,
    TagPerson
  },
  data() {
    return {
      referredUsers: [],
      atTagPerson: false,
      leftPosition: 0,
      fullscreenLoading: false,
      uploading: false,
      formMode: '',
      cardTitle: 'New phase',
      btnDisabled: {
        electricalDrawingFilesBtn: false,
        goldenRowFilesBtn: false,
        sequenceFileBtn: false,
        otherFilesBtn: false
      },
      form: {
        project_id: '',
        progress: '',
        due_date: '',
        inner_date: '',
        product_type: [],
        remarks: '',
        electrical_drawing_files: [],
        golden_row_files: [],
        sequence_file: '',
        other_files: []
      },
      rules: {
        progress: [
          { required: true, message: 'Please select phase', trigger: 'change' }
        ],
        due_date: [
          {
            required: true,
            message: 'Please select customer due date',
            trigger: 'change'
          }
        ],
        inner_date: [
          {
            required: true,
            message: 'Please select internal due date',
            trigger: 'change'
          }
        ],
        product_type: [
          {
            required: true,
            message: 'Please select product type',
            trigger: 'change'
          }
        ]
      },
      progressForm: {},
      progressId: '',
      electrical_drawing_files: [],
      golden_row_files: [],
      sequence_file: [],
      other_files: [],

      /**progress进程状态 */
      progressOptions: [],
      uploadURL: `${baseUrl}/api/upload-files`,
      uploadHeaders: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      },
      loadDrawingFilesProgress: 0,
      progressDrawingFiles: false,
      loadGoldenFilesProgress: 0,
      progressGoldenFiles: false,
      loadSequenceFileProgress: 0,
      progressSequenceFile: false,
      loadOtherFilesProgress: 0,
      progressOtherFiles: false
    };
  },
  created() {
    this.uploadURL = `${baseUrl.baseUrl}/api/upload-files`;
    this.getProgressInfo();
  },
  mounted() {
    let params = this.$route.query;
    this.form.project_id = params.projectId;
    this.formMode = params.mode;
    switch (params.mode) {
      case 'add':
        this.cardTitle = 'New phase';
        break;
      case 'edit':
        this.cardTitle = 'Edit phase';
        this.progressId = params.progressId;
        this.getProgressDetail();
        break;
      default:
        break;
    }
  },
  methods: {
    handleKeyup(e) {
      if (e.key === '@') {
        let {length} = this.form.remarks;
        this.leftPosition = `${length * 8 * 0.8 + 15}px`;
        this.atTagPerson = true;
      }
      if (e.key === 'Backspace') {
        this.atTagPerson = false;
      }
    },
    handleChoosePerson(person) {
      this.form.remarks += `${person.name}`;
      this.referredUsers.push(person.id);
      this.$refs.commentArea.$refs.textarea.focus();
      this.atTagPerson = false;
    },
    handleBack() {
      this.$router.go(-1);
    },
    //发送邮件, 2023/08/29修改为新增时前端不调用发送邮件接口，由后端统一处理
    handleSendEmail(progress_id) {
      let project_id = this.$route.query.projectId;
      let userInfo = JSON.parse(localStorage.getItem('user'));
      let params = {
        status: 'US_TO_BE_SEND',
        status_last: 'US_TO_BE_SEND',
        project_id,
        progress_id,
        user_id: userInfo.id
      };
      sendEmail(params)
        .then((res) => {
          if (res.code === 200) {
            return
          }
          return;
        })
        .catch((err) => {
          return err
        });
    },
    async getProgressInfo() {
      await configParams()
        .then((res) => {
          let data = res.progress;
          for (let i in data) {
            let item = data[i];
            this.progressOptions.push({
              value: i,
              label: item
            });
          }
          return;
        })
        .catch((err) => {
          return err
        });
    },

    /**上传文件 */
    //Electrical drawing files
    handleDrawingFilesProgresss(event) {
      this.uploading = true;
      this.btnDisabled.electricalDrawingFilesBtn = true;
      if (event.lengthComputable) {
        let val = ((event.loaded / event.total) * 100).toFixed(0);
        this.loadDrawingFilesProgress = parseInt(val);
      }
    },
    updateDrawingFiles(res) {
      this.uploading = false;
      this.btnDisabled.electricalDrawingFilesBtn = false;
      if (res.code === 200) {
        let data = res.data.files;
        this.form.electrical_drawing_files.push(data);
      }
    },
    viewDrawingFiles(file) {
      let {url} = file;
      window.open(url);
    },
    deleteDrawingFiles(file, fileList) {
      this.form.electrical_drawing_files = fileList.map((item) => {
        if (item.uid !== file.uid) {
          let row = {
            uid: item.uid,
            name: item.name,
            url: item.url
          };
          return row;
        }
      });
    },
    //Golden Row files
    handleGoldenFilesProgresss(event) {
      this.uploading = true;
      if (event.lengthComputable) {
        let val = ((event.loaded / event.total) * 100).toFixed(0);
        this.loadGoldenFilesProgress = parseInt(val);
      }
    },
    updateGoldenFiles(res) {
      this.uploading = false;
      if (res.code === 200) {
        let data = res.data.files;
        this.form.golden_row_files.push(data);
      }
    },
    viewGoldenFiles(file) {
      let res = file.response;
      if (res.code === 200) {
        let {url} = res.data.files;
        window.open(url);
      }
    },
    deleteGoldenFiles(file, fileList) {
      if (this.formMode === 'edit') {
        this.form.golden_row_files = fileList;
        this.uploading = false;
      } else {
        this.form.golden_row_files = fileList.map((item) => {
          let res = item.response;
          let itemFile = res.data.files;
          return itemFile;
        });
      }
    },
    //Sequence file
    handleSequenceFileProgresss(event) {
      this.uploading = true;
      this.btnDisabled.sequenceFileBtn = true;
      if (event.lengthComputable) {
        let val = ((event.loaded / event.total) * 100).toFixed(0);
        this.loadSequenceFileProgress = parseInt(val);
      }
    },
    updateSequenceFile(res) {
      this.uploading = false;
      this.btnDisabled.sequenceFileBtn = false;
      if (res.code === 200) {
        let data = res.data.files;
        this.form.sequence_file = JSON.stringify(data);
      }
    },
    viewSequenceFile(file) {
      let res = file.response;
      if (res.code === 200) {
        let {url} = res.data.files;
        window.open(url);
      }
    },
    deleteSequenceFile(file, fileList) {
      if (this.formMode === 'edit') {
        if (fileList.length === 0) {
          this.form.sequence_file = '';
          this.uploading = false;
          this.btnDisabled.sequenceFileBtn = false;
        } else {
          this.form.sequence_file = fileList;
        }
      } else {
        this.form.sequence_file = fileList.map((item) => {
          let res = item.response;
          let itemFile = res.data.files;
          return itemFile;
        });
      }
    },
    //Other files
    handleOtherFilesProgresss(event) {
      this.uploading = true;
      this.btnDisabled.otherFilesBtn = true;
      if (event.lengthComputable) {
        let val = ((event.loaded / event.total) * 100).toFixed(0);
        this.loadOtherFilesProgress = parseInt(val);
      }
    },
    updateOtherFiles(res) {
      this.uploading = false;
      this.btnDisabled.otherFilesBtn = false;
      if (res.code === 200) {
        let data = res.data.files;
        this.form.other_files.push(data);
      }
    },
    viewOtherFiles(file) {
      let res = file.response;
      if (res.code === 200) {
        let {url} = res.data.files;
        window.open(url);
      }
    },
    deleteOtherFiles(file, fileList) {
      if (this.formMode === 'edit') {
        this.form.other_files = fileList;
        this.uploading = false;
        this.btnDisabled.otherFilesBtn = false;
      } else {
        this.form.other_files = fileList.map((item) => {
          let res = item.response;
          let itemFile = res.data.files;
          return itemFile;
        });
      }
    },
    failUpdate() {
      this.$message.error('file upload failed, file size is too large');
      this.uploading = false;
      this.btnDisabled.otherFilesBtn = false;
      this.btnDisabled.sequenceFileBtn = false;
      this.btnDisabled.goldenRowFilesBtn = false;
      this.btnDisabled.electricalDrawingFilesBtn = false;
    },

    /**新增 */
    async handleAdd() {
      let {form} = this;
      if (form.progress === '') {
        this.$message({
          message: 'Please select phase',
          type: 'warning'
        });
        return false;
      }
      if (form.due_date === '') {
        this.$message({
          message: 'Please select customer due date',
          type: 'warning'
        });
        return false;
      }
      if (form.inner_date === '') {
        this.$message({
          message: 'Please select internal due date',
          type: 'warning'
        });
        return false;
      }
      if (form.product_type.length === 0) {
        this.$message({
          message: 'Please select solution',
          type: 'warning'
        });
        return false;
      }
      this.fullscreenLoading = true;
      form.due_date = this.transFormat(form.due_date);
      //2023/08/29新增inner_due_date, 用于中国技术给内部组员设置截止日期
      form.inner_date = this.transFormat(form.inner_date);
      form['status'] = 'US_TO_BE_SEND';
      let type =
        this.$route.query.type && this.$route.query.type === 'formal' ? 2 : 1;
      let refer_user = this.referredUsers;
      await addProgress({ type, refer_user, ...form })
        .then((res) => {
          if (res.code === 200) {
            let {data} = res;
            // this.progress
            //20230911修改：新增Phase的时候不要调用更改状态的接口
            // this.updateProjectStatus(data);
            this.fullscreenLoading = false;
            this.$message({
              message: 'Added',
              type: 'success'
            });
            if (this.$route.query.type && this.$route.query.type === 'formal') {
              this.$router.push({
                path: '/index/project/formal-project-detail',
                query: {
                  projectId: data.project_id
                }
              });
            } else {
              this.$router.push({
                path: '/index/project/detail',
                query: {
                  projectId: data.project_id
                }
              });
            }

            //    this.handleSendEmail(data.id);
          } else {
            this.fullscreenLoading = false;
            this.$message.error(res.message);
          }
          return;
        })
        .catch((err) => {
          return err
        });
    },
    async updateProjectStatus(data) {
      await projectStatus({
        id: data.project_id,
        progress_id: data.id,
        due_date: data.due_date,
        status: data.status
      })
        .then((res) => {
          if (res.code === 200) {
            //已设置Activate phase
            this.$router.push({
              path: '/index/project/detail',
              query: {
                projectId: data.project_id
              }
            });
          }
          return;
        })
        .catch((err) => {
          return err
        })
        .finally(() => {
          window.location.reload();
        });
    },
    transFormat(time) {
      let date = new Date(time);
      let year = date.getFullYear();
      let month = date.getMonth() + 1;
      let day = date.getDate();
      let hours = date.getHours();
      let minutes = date.getMinutes();
      let seconds = date.getSeconds();
      if (month < 10) {
        month = `0${month}`;
      }
      if (day < 10) {
        day = `0${day}`;
      }
      if (hours < 10) {
        hours = `0${hours}`;
      }
      if (minutes < 10) {
        minutes = `0${minutes}`;
      }
      if (seconds < 10) {
        seconds = `0${seconds}`;
      }
      return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
    },
    async getProgressDetail() {
      let id = this.progressId;
      await progressDetail(id)
        .then((res) => {
          if (res.code === 200) {
            let {data} = res;
            this.progressForm = data;
            let progressVal = this.progressOptions.filter((item) => {
              return item.label === data.progress ? item.value : null;
            });

            this.form = {
              id: data.id,
              project_id: data.project_id,
              progress: progressVal[0]['value'],
              due_date: data.due_date,
              inner_date: data.inner_date,
              product_type: data.product_type,
              remarks: data.remarks,
              electrical_drawing_files: data.electrical_drawing_files,
              golden_row_files: data.golden_row_files,
              sequence_file: data.sequence_file,
              other_files: data.other_files
            };

            this.electrical_drawing_files = data.electrical_drawing_files.map(
              (item) => {
                let file = {
                  name: item.name,
                  url: item.url
                };
                return file;
              }
            );
            this.golden_row_files = data.golden_row_files.map((item) => {
              let file = {
                name: item.name,
                url: item.url
              };
              return file;
            });
            this.sequence_file = [];
            if (data.sequence_file && data.sequence_file !== '') {
              this.sequence_file = [JSON.parse(data.sequence_file)];
            }

            this.other_files = data.other_files.map((item) => {
              let file = {
                name: item.name,
                url: item.url
              };
              return file;
            });
          }
          return;
        })
        .catch((err) => {
          return err
        });
    },
    async handleEdit() {
      let {form} = this;
      form.due_date = this.transFormat(form.due_date);
      //2023/08/29新增inner_due_date, 用于中国技术给内部组员设置截止日期
      form.inner_date = this.transFormat(form.inner_date);
      await editProgress(form)
        .then((res) => { 
          if (res.code === 200) {
            const that = this;
            // updateStatus(
            //   {
            //     id: this.progressForm.id,
            //     status: 'US_HAS_BEEN_SEND'
            //   },
            //   () => {
            //     that.$message({
            //       message: 'Done',
            //       type: 'success'
            //     });
            //     that.$router.go(-1);
            //   }
            // );
            that.$message({
              message: 'Done',
              type: 'success'
            });
            that.$router.go(-1);
          } else {
            // this.$message.error(res.message);
          }
          return;
        })
        .catch((err) => {
          return err
        });
    }
  }
};
</script>

<style lang="less" scoped>
.add-form-container {
  width: 90%;
  min-height: calc(100vh - 196px);

  /* stylelint-disable-next-line selector-class-pattern */
  :deep(.el-form-item__label) {
    text-align: left;
  }

  .site-info-container {
    table,
    td {
      border: 1px solid #f0f0f3;
      border-collapse: collapse;
      padding-left: 15px;
    }

    .series-item {
      font-size: 12px;
      color: #606266;

      .series-item-label {
        width: 200px;
        border-top-left-radius: 4px;
        background: #fafafa;
      }

      .series-item-content {
        padding-left: 15px;
      }

      .series-item-content:hover {
        cursor: pointer;
        color: #409eff;
      }
    }

    .series-item-btn {
      width: 60px;
      border-left: 0;
      border: 0;

      .btn-icon {
        font-size: 14px;
      }

      .btn-icon:hover {
        cursor: pointer;
        opacity: 0.8;
      }

      .edit {
        color: #409eff;
      }

      .delete {
        color: #f56c6c;
        margin-left: 20px;
      }
    }
  }
}
</style>
