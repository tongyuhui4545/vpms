<template>
  <div class="phase-dialog-wrapper">
    <el-dialog
      :close-on-click-modal="false"
      :title="dialogTitle"
      :visible.sync="showDialog"     
      @close="close"
    >
      <div class="content">
        <el-form
          ref="form"
          :model="form"
          :rules="rules"
        >
          <el-row :span="24">
            <el-col :span="8">
              <el-form-item
                label="Phase"
                prop="phase"
                label-width="180"
              >
                <el-select
                  v-model="form.phase"
                  placeholder="Please select"
                  size="mini"
                >
                  <el-option
                    v-for="item in phaseList"
                    :key="item.id"
                    :label="item.label"
                    :value="item.value"
                  />
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item
                label="Customer due date"
                prop="customerDuedate"
              >
                <el-date-picker
                  v-model="form.customerDuedate"
                  size="mini"
                  type="datetime"
                  value-format="yyyy-MM-dd HH:mm:ss"
                  default-time="23:59:59"
                  placeholder="Select date "
                />
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item
                label="Internal due date"
                prop="internalDuedate"
              >
                <el-date-picker
                  v-model="form.internalDuedate"
                  prop="internalDuedate"
                  size="mini"
                  placeholder="Select date"
                  type="datetime"
                  value-format="yyyy-MM-dd HH:mm:ss"
                  default-time="23:59:59"
                />
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :span="24">
            <el-col :span="24">
              <el-form-item
                label="Solution (Multiple choice)"
                prop="solution"
              >
                <el-checkbox-group
                  v-model="form.solution"
                  multiple
                >
                  <el-checkbox label="Harness" />
                  <el-checkbox label="Alex" />
                  <el-checkbox label="Lynx" />
                </el-checkbox-group>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :span="24">
            <el-col
              :span="12"
              style="display: flex; align-items: center; gap: 8px"
            >
              <ChosenMarkHorizontal
                :height="24"
                :width="8"
              />
              <span>Customer files</span>
            </el-col>
          </el-row>
          <el-row :span="24">
            <el-col :span="12">
              <div class="file-upload-area">
                <p>Technical details</p>
                <div class="file-uploader">
                  <FileUpload
                    ref="technical-details-upload"
                    :file-list="technicalDetailsUploaded"
                    source="technical"
                    @upload-project-files="handleUploadFile"
                    @delete-project-file="handleDeleteFile"
                  />
                </div>
              </div>
            </el-col>
            <el-col :span="12">
              <div class="file-upload-area">
                <p>Golden row files</p>
                <div class="file-uploader">
                  <FileUpload
                    ref="golden-row-upload"
                    :file-list="goldenRowUploaded"
                    source="golden"
                    @upload-project-files="handleUploadFile"
                    @delete-project-file="handleDeleteFile"
                  />
                </div>
              </div>
            </el-col>
          </el-row>
          <el-row :span="24">
            <el-col :span="12">
              <div class="file-upload-area">
                <p>Project schedule</p>
                <div class="file-uploader">
                  <FileUpload
                    ref="project-schedule-upload"
                    :file-list="projectScheduleUploaded"
                    source="project"
                    @upload-project-files="handleUploadFile"
                    @delete-project-file="handleDeleteFile"
                  />
                </div>
              </div>
            </el-col>
            <el-col :span="12">
              <div class="file-upload-area">
                <p>Other files</p>
                <div class="file-uploader">
                  <FileUpload
                    ref="other-files-upload"
                    :file-list="otherUploaded"
                    source="other"
                    @upload-project-files="handleUploadFile"
                    @delete-project-file="handleDeleteFile"
                  />
                </div>
              </div>
            </el-col>
          </el-row>
          <el-row :span="24">
            <el-col :span="24">
              <p>Comment</p>
              <el-input
                v-model="form.remarks"
                type="textarea"
                rows="4"
              />
            </el-col>
          </el-row>
        </el-form>
      </div>
      <div slot="footer">
        <el-button
          size="mini"
          @click="close"
        >
          Cancel
        </el-button>
        <el-button
          size="mini"
          type="primary"
          @click="handleSubmit"
        >
          Submit
        </el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import ChosenMarkHorizontal from '@/components/marks/ChosenMarkHorizontal.vue';
import FileUpload from '@/views/work-table/components/file-center.vue';
import { PHASE_VALUES } from '@/utils/constants.js';
import { addProgress, editProgress } from '@/api';

export default {
  name: '',
  components: {
    ChosenMarkHorizontal,
    FileUpload
  },
  props: {
    mode: {
      type: String,
      default: 'add'
    },
    phaseData: {
      type: Object,
      default: () => {return {}}
    }
  },
  data() {
    return {
      showDialog: false,
      phaseList: PHASE_VALUES,
      //上传的文件
      technicalDetailFileList: [],
      goldenRowFilesFileList:[],
      projectScheduleFileList:[],
      otherFilesFileList:[],
      // ***************
      //回显的文件
      technicalDetailsUploaded:[],
      goldenRowUploaded:[],
      projectScheduleUploaded:[],
      otherUploaded:[],
      // *****************
      form: {
        phase: '',
        customerDuedate: '',
        internalDuedate: '',
        solution: [],
        remarks:''
      },
      rules: {
        phase: [{ required: true, message: 'Please select phase', trigger: 'change' }],
        customerDuedate: [{ required: true, message: 'Please select customer duedate', trigger: 'change' }],
        internalDuedate: [{ required: true, message: 'Please select internal duedate', trigger: 'change' }],
        solution: [{ required: true, message: 'Please select solution', trigger: 'change' }]   
      }
    };
  },
  computed: {
    dialogTitle() {
      if(this.mode === 'add') {return 'Add phase'}
      if(this.mode === 'edit') {return 'Edit phase'} 
      return ' '
    }
  },
  watch: {
    mode: {
      handler() {
        this.setData();
      },
      immediate: true
    },
    phaseData: {
      handler() {
        this.setData();
      }
    }
  },
  methods: {
    setData() {
      if(this.mode === 'edit') { 
          let {phaseData} = this; 
          let phase = (this.phaseList.find((item) => {return item.label === phaseData?.progress}))?.value; 
          this.form.phase = phase;
          this.form.customerDuedate = phaseData?.due_date || '';
          this.form.internalDuedate = phaseData?.inner_date || '';
          this.form.solution = phaseData?.product_type || [];
          this.form.remarks = phaseData?.remarks || '';
          this.technicalDetailsUploaded = phaseData?.['technical_details_files'] || [];
          this.goldenRowUploaded = phaseData?.['golden_row_files'] || [];
          this.projectScheduleUploaded = phaseData?.['project_schedule_files'] || [];
          this.otherUploaded = phaseData?.['other_files'] || []
        }
      if(this.mode === 'add') {
        this.resetForm();
      }
    },
    //v0.8.0,tyh
    handleUploadFile(file, source) { 
      let {id, name, url, size} = file
       switch(source) {
        case 'technical':
          this.technicalDetailFileList.push({id, name, url, size})
          break;
        case 'golden':
         this.goldenRowFilesFileList.push({id, name, url, size})
          break;
        case 'project':
        this.projectScheduleFileList.push({id, name, url, size})
          break;
        case 'other':
        this.otherFilesFileList.push({id, name, url, size})
          break;
          default:
            break
       }
    },
     //v0.8.0,tyh
    handleDeleteFile(id, source) {
      switch(source) {
        case 'technical':
          this.technicalDetailFileList = this.technicalDetailFileList.filter((item) => {return item.id !== id});
          break;
        case 'golden':
        this.goldenRowFilesFileList = this.goldenRowFilesFileList.filter((item) => {return item.id !== id})
          break;
        case 'project':
        this.projectScheduleFileList = this.projectScheduleFileList.filter((item) => {return item.id !== id})
          break;
        case 'other':
        this.otherFilesFileList = this.otherFilesFileList.filter((item) => {return item.id !== id})
          break;
          default:
            break
      }
    },
    show() {
      this.showDialog = true;
    },
    close() { 
      // if(this.mode === 'add') {
        this.resetForm();
        this.showDialog = false;
      // }
    },
    resetForm() {
      this.form = {
        phase: '',
        customerDuedate: '',
        internalDuedate: '',
        solution: [],
        remarks:''
      };
        this.technicalDetailFileList = [];
        this.goldenRowFilesFileList = [];
        this.projectScheduleFileList = [];
        this.otherFilesFileList = [];
        this.technicalDetailsUploaded = [];
        this.goldenRowUploaded = [];
        this.projectScheduleUploaded = [];
        this.otherUploaded = [];
        //v0.8.0的bug修复，清空已经上传的但未提交的文件
        this.$refs['technical-details-upload'].handleCancel();
        this.$refs['golden-row-upload'].handleCancel();
        this.$refs['project-schedule-upload'].handleCancel();
        this.$refs['other-files-upload'].handleCancel();
    },
    handleSubmit() {
      this.$refs['form'].validate((valid) => {
        if(valid) {
          if (this.mode === 'add') {
        let type = this.$route.params.project_type === 'bidding' ? 1 : 2;
        let { project_id } = this.$route.params;
        let params = {
          type,
          project_id,
          progress: this.form.phase,
          due_date: this.form.customerDuedate,
          inner_date: this.form.internalDuedate,
          product_type: this.form.solution,
          technical_details_files: JSON.stringify(this.technicalDetailFileList),
          golden_row_files: JSON.stringify(this.goldenRowFilesFileList),
          project_schedule_files: JSON.stringify(this.projectScheduleFileList),
          other_files: JSON.stringify(this.otherFilesFileList),
          remarks: this.form.remarks
        };
        addProgress(params).then((res) => {
          if (res.code === 200) {
            this.$message.success('Add successfully');
            this.close();
            this.$emit('refresh');
          }
        });
      }
      if (this.mode === 'edit') { 
        let type = this.$route.params.project_type === 'bidding' ? 1 : 2;
        let { project_id } = this.$route.params;
        let params = {
          id: this.phaseData.id || null,
          type,
          project_id,
          progress: this.form.phase,
          due_date: this.form.customerDuedate,
          inner_date: this.form.internalDuedate,
          product_type: this.form.solution,
          technical_details_files: JSON.stringify(this.technicalDetailFileList.concat(this.technicalDetailsUploaded)),
          golden_row_files: JSON.stringify(this.goldenRowFilesFileList.concat(this.goldenRowUploaded)),
          project_schedule_files: JSON.stringify(this.projectScheduleFileList.concat(this.projectScheduleUploaded)),
          other_files: JSON.stringify(this.otherFilesFileList.concat(this.otherUploaded)),
          remarks: this.form.remarks
        };
        editProgress(params).then((res) => {
          if (res.code === 200) {
            this.$message.success('Edit successfully');
            this.close();
            this.$emit('refresh');
          }
        })
      }
        }
      }) 
    }
  }
};
</script>
<style>
.phase-dialog-wrapper .el-dialog__body {
    padding: 0 20px
}
.phase-dialog-wrapper .el-form-item {
  margin-bottom: 10px
}
</style>
<style lang="less" scoped>
::v-deep .el-dialog {
  width: 1280px;
}

::v-deep .el-upload-list__item {
  width: 98%;
}
.el-button {
  background: #ffffff;
  color: #007bff;
  border: 1px solid #007bff;
}
::v-deep .el-button--primary {
  color: #fff;
  background-color: #007bff;
  border-radius: 4px;
  border: 1px solid #007bff;
}

::v-deep .el-dialog {
  border-radius: 8px;
}

.phase-dialog-wrapper {
  .content {
    .file-upload-area {
      p {
        font-size: 14px;
        color: #303133;
        font-weight: normal;
        margin-bottom: 16px;
      }
      .file-uploader {
        ::v-deep .el-upload-dragger {
          width: 604px;
          height: 96px;
        }
      }
    }
  }
  .footer {
  }
}
</style>
