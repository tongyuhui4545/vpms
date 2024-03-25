<template>
  <div>
    <el-form
      ref="taskForm"
      :model="taskForm"
      class="task-form"
      label-width="150px"
      :rules="formRules"
    >
      <el-row>
        <el-col :span="24">
          <el-form-item
            label="Title"
            class="title"
            prop="title"
          >
            <el-input
              v-model="taskForm.title"
              placeholder="Please enter task title"
              maxlength="100"
              show-word-limit
              clearable
            />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item
            label="Task description"
            class="block-item textarea"
            prop="description"
          >
            <el-input
              v-model="taskForm.description"
              type="textarea"
              placeholder="Please enter task description"
              maxlength="800"
              show-word-limit
              :rows="
                filesListCopy.concat(filesCopy) &&
                  filesListCopy.concat(filesCopy).length
                  ? 8
                  : 3
              "
              clearable
            />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item
            label="Files"
            class="block-item files"
          >
            <div class="form-component">
              <file-upload
                :form-type="type"
                class-name="task-form"
                :file-list="filesCopy"
                height="100px"
                @get-files="getFiles"
              />
            </div>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item
            label="Task type"
            prop="task_type"
          >
            <el-select
              v-model="taskForm.task_type"
              placeholder="Please select"
              :disabled="type === 'restart'"
              filterable
              clearable
            >
              <el-option
                v-for="taskType in taskTypeOptions"
                :key="taskType.value"
                :label="taskType.label"
                :value="taskType.value"
              />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item
            label="Project name"
            prop="project_id"
          >
            <!-- <el-select
              v-model="taskForm.project_id"
              placeholder="Please select"
              :disabled="type === 'restart'"
              clearable
              filterable
            >
              <el-option
                v-for="project in allProjectOptions"
                :key="project.id"
                :label="`${project.description} （${project.project_no}）`"
                :value="project.id"
              />
            </el-select> -->
            <lazyLoadingProjectSelector 
              ref="project-selector"
              :style-obj="{width: '450px'}"
              :type="type"
              :picked-project-for-refill="pickedProjectForRefill"
              @select-project="handleSelectProject"
            />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item
            ref="phase"
            label="Phase"
            prop="progress_id"
          >
            <el-select
              v-model="progressId"
              placeholder="Please select"
              :disabled="type === 'restart'"
              filterable
              clearable
            >
              <el-option
                v-for="progress in progressOptions"
                :key="progress.id"
                :label="`${progress.phase_no}  ${progress.phase}`"
                :value="progress.id"
              />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item
            label="Priority"
            prop="priority"
          >
            <el-select
              v-model="taskForm.priority"
              placeholder="Please select"
              filterable
              clearable
            >
              <el-option
                v-for="priority in priorityOptions"
                :key="priority.value"
                :label="priority.label"
                :value="priority.value"
              />
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item
            label="Tag"
            prop="tag"
          >
            <el-select
              ref="sel"
              v-model="taskForm.tag"
              placeholder="Please select"
              filterable
              clearable
              multiple
              collapse-tags
              @visible-change="visibleChange"
            >
              <div>
                <el-option
                  v-for="tag in tagList"
                  :key="tag.id"
                  :label="tag.tag_name"
                  :value="tag.id"
                />
              </div>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item
            label="Task due date"
            prop="task_due_date"
            class="task-date"
          >
            <el-date-picker
              v-model="taskForm.task_due_date"
              type="datetime"
              placeholder="Please select"
              clearable
              default-time="23:59:59"
            />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item
            label="Estimated start date"
            prop="estimated_start_date"
            class="task-date"
          >
            <el-date-picker
              v-model="taskForm.estimated_start_date"
              type="datetime"
              placeholder="Please select"
              clearable
            />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item
            label="Assign to"
            prop="recipient"
          >
            <el-select
              v-model="taskForm.recipient"
              placeholder="Please select"
              filterable
              clearable
            >
              <el-option
                v-for="user in userOptions"
                :key="user.id"
                :label="user.name"
                :value="user.id"
              />
            </el-select>
            <div 
              v-if="ganttVisible"
              class="view-team-gantt"
              @click="handleViewGantt"
            >
              View onging tasks of team members
            </div>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item
            label="CC"
            prop="copy_to"
          >
            <el-select
              v-model="taskForm.copy_to"
              placeholder="Please select"
              multiple
              filterable
              clearable
            >
              <el-option
                v-for="user in userOptions"
                :key="user.id"
                :label="user.name"
                :value="String(user.id)"
              >
                {{ user.name }}
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <div class="submit-btns">
        <el-button
          size="small"
          class="cancel"
          @click="closeFormDialog"
        >
          Cancel
        </el-button>
        <el-button
          class="form-confirm-btn"
          size="small"
          @click="submitTask"
        >
          Confirm
        </el-button>
      </div>
    </el-form>
  </div>
</template>

<script>
import FileUpload from '@/components/file-upload.vue';
import lazyLoadingProjectSelector from '@/components/lazy-loading-project-selector.vue';
import dayjs from 'dayjs';
import { TASK_TYPE, PRIORITY_OPTIONS } from '@/utils/constants.js';

import {
  projectsTotal,
  phaseList,
  createCustomTask,
  editCustomTask,
  userList,
  getCustomTaskTagList,
  restartTaskStatus
} from '@/api/index';
export default {
  components: {
    FileUpload,
    lazyLoadingProjectSelector
  },
  props: {
    type: {
      type: String,
      default: 'create'
    },
    taskData: {
      type: Object,
      default: () => {
        return {};
      }
    },
    projectId: {
      type: Number,
      default: 0
    },
    parentId: {
      type: Number,
      default: 0
    },
    // v0.8.0-yuhui, 用于在phase详情里的新建task入口，打开的时候就带入project_id和progressId
    projectInfo: {
      type: Object,
      default: () => {
        return {};
      }
    },
    // ******************************
    comment: {
      type: String,
      default: ''
    }
  },
  emits: ['open-tab-setting', 'open-task-drawer', 'refresh'],
  data() {
    return {
      //v0.8.0,yuhui, 初始化的时候，判断是否从project详情来，如果从详情来，要默认填入一些信息，flag要置true
      initiatedFlag: false,
      // ****************************
      ganttVisible: false,
      pickedProjectForRefill: {id: '', name: ''},
      activeDept: null,
      taskForm: {},
      formRules: {
        task_type: [
          {
            required: true,
            message: 'Please select',
            trigger: 'submit'
          }
        ],
        priority: [
          {
            required: true,
            message: 'Please select',
            trigger: 'submit'
          }
        ],
        title: [
          {
            required: true,
            message: 'Please enter',
            trigger: 'submit'
          }
        ],
        description: [
          {
            required: true,
            message: 'Please enter',
            trigger: 'submit'
          }
        ],
        task_due_date: [
          {
            required: true,
            message: 'Please select',
            trigger: 'submit'
          }
        ],
        recipient: [
          {
            required: true,
            message: 'Please select',
            trigger: 'submit'
          }
        ]
      },
      tagOptionVisible: true,
      files: [],
      rows: 4,
      taskTypeOptions: TASK_TYPE,
      priorityOptions: PRIORITY_OPTIONS,
      allProjectOptions: [],
      progressOptions: [],
      userOptions: [],
      detail: {},
      filesCopy: [],
      filesListCopy: [],
      tagList: [],
      progressId: '',
      body: {
        files: null
      }
    };
  },
  watch: {
    'taskForm.project_id': {
      handler(val) {
        if (val) {
          this.progressId = '';
          this.getProgressOptions(val);
        }
      },
      immediate: true
    },
    taskData: {
      handler(val) { 
        this.detail = val || {};
        if(this.detail.project_id && this.detail.project_name) {
           this.pickedProjectForRefill = {
            id: this.detail.project_id,
            name: this.detail.project_name
           }
        }
        if (this.detail.files) {
          this.filesCopy = this.detail.files;
        }
      },
      immediate: true,
      deep: true
    },
    projectInfo: {
      handler(val) {
        this.taskForm.project_id = val.project_id;
      },
      immediate: true,
      deep: true
    }
  },
  mounted() {
    this.getCustomTaskTagList();
    this.getAllProject();
    this.getUserOptions();
    this.ganttVisibleInit();
    this.taskForm = this.detail;
    if (this.type === 'create' && this.detail.files) {
      this.filesCopy = this.detail.files;
    }
  },
  methods: {
    handleSelectProject(projectId) {  
      this.taskForm.project_id = projectId;
      phaseList({ project_id: projectId })
        .then((res) => {
          if (res.code === 200) {
            this.progressOptions = res.data;
          }
        })
        .catch((err) => {
          return err;
        });
    },
    showTabSetting() {
      this.tagOptionVisible = false;
      this.$refs.sel.blur();
      let info = {
        ...this.taskForm,
        files: this.filesListCopy.length ? this.filesListCopy : this.filesCopy,
        progressId: this.progressId
      };
      this.$store.commit('app/setCustomTaskInfo', info);
      this.$emit('open-tab-setting');
    },
    closeFormDialog() {
      this.$refs['project-selector'].resetSelector();
      this.$refs.taskForm.resetFields();
      this.$emit('close');
    },
    changeDateFormate(val) {
      if (val) {
        return dayjs(val).format('YYYY-MM-DD HH:mm:ss');
      } else {
        return '';
      }
    },
    handleData() {
      this.taskForm.progress_id = this.progressId;
      let body = JSON.parse(JSON.stringify(this.taskForm));
      body.task_due_date = this.changeDateFormate(body.task_due_date);
      body.estimated_start_date = this.changeDateFormate(
        body.estimated_start_date
      );
      let files = this.filesListCopy.length
        ? this.filesListCopy
        : this.filesCopy;
      body.files = files && files.length ? JSON.stringify(files) : null;
      if (body.tag) {
        body.tag = body.tag.join(',');
      }
      body.parent_id = this.parentId;
      return body;
    },
    async createCustomTask() {
      let body = this.handleData();
      if (this.type === 'copy' || this.type === 'create-sub') {
        delete body.sub_tasks;
        delete body.p_task;
        delete body.status;
        body.id = this.detail.id;
      }
      let files = [];
      if (body.files) {
        files.length = JSON.parse(body.files).length;
        for (let i = 0; i < JSON.parse(body.files).length; i++) {
          if (JSON.parse(body.files)[i].id) {
            files[i] = {
              name: JSON.parse(body.files)[i].name,
              url: JSON.parse(body.files)[i].url
            };
          }
        }
        body.files = JSON.stringify(files);
      }
      await createCustomTask(body).then((res) => {
        if (res.code === 200) {
          this.$message.success(res.message);
          this.$emit('refresh');
          this.$emit('open-task-drawer', res.data.id);
          this.$refs.taskForm.resetFields();
        }
      });
    },
    async editCustomTask() {
      let body = this.handleData();
      delete body.sub_tasks;
      delete body.p_task;
      body.id = this.detail.id;
      let files = [];
      if (body.files) {
        files.length = JSON.parse(body.files).length;
        for (let i = 0; i < JSON.parse(body.files).length; i++) {
          if (JSON.parse(body.files)[i].id) {
            files[i] = {
              name: JSON.parse(body.files)[i].name,
              url: JSON.parse(body.files)[i].url
            };
          }
        }
        body.files = JSON.stringify(files);
      }
      await editCustomTask(body).then((res) => {
        if (res.code === 200) {
          this.$message.success(res.message);
          this.$emit('refresh');
          this.$emit('open-task-drawer', res.data.id);
        }
      });
    },
    async restartTaskStatus() {
      let body = this.handleData();
      body.id = this.detail.id;
      body.comment = this.comment;
      delete body.sub_tasks;
      delete body.p_task;
      delete body.status;
      body.id = this.detail.id;
      let files = [];
      if (body.files) {
        files.length = JSON.parse(body.files).length;
        for (let i = 0; i < JSON.parse(body.files).length; i++) {
          if (JSON.parse(body.files)[i].id) {
            files[i] = {
              name: JSON.parse(body.files)[i].name,
              url: JSON.parse(body.files)[i].url
            };
          }
        }
        body.files = JSON.stringify(files);
      }
      await restartTaskStatus(body).then((res) => {
        if (res.code === 200) {
          this.$message.success(res.message);
          this.$emit('refresh');
          this.$emit('open-task-drawer', res.data.id);
        }
      });
    },
    getFiles(files) {
      this.filesListCopy = files;
    },
    submitTask() {
      this.$refs.taskForm.validate((valid) => {
        if (valid) {
          if (
            this.type === 'create' ||
            this.type === 'create-sub' ||
            this.type === 'copy'
          ) {
            this.createCustomTask();
          } else if (this.type === 'edit') {
            this.editCustomTask();
          } else if (this.type === 'restart') {
            this.restartTaskStatus();
          }
        }
      });
    },
    async getUserOptions() {
      await userList().then((res) => {
        this.userOptions = res.data.data;
      });
    },
    async getAllProject() {
      await projectsTotal().then((res) => {
        if (res.code === 200) {
          this.allProjectOptions = res.data.reverse();
        }
      });
    },
    async getProgressOptions(projectId) {
      if (projectId) {
        await phaseList({
          project_id: projectId
        }).then((res) => {
          if (res.code === 200) {
            this.progressOptions = res.data;
            if (this.detail.progress_id) {
              this.progressId = this.detail.progress_id;
            }
            //v0.8.0,yuhui, phase详情里要在打开的时候填默认值
            if (this.projectInfo.progressId && !this.initiatedFlag) {
              this.progressId = this.projectInfo.progressId;
              this.initiatedFlag = true;
            }
          }
        });
      } else {
        this.progressOptions = [];
      }
    },
    async getCustomTaskTagList() {
      await getCustomTaskTagList().then((res) => {
        if (res.code === 200) {
          this.tagList = res.data.tagList;
          setTimeout(() => {
            if (this.detail.tag) {
              let tags = JSON.parse(JSON.stringify(this.detail.tag));
              if (typeof tags === 'string') {
                this.detail.tag = tags.split(',').map(Number);
              }
            }
          }, 500);
        }
      });
    },
    visibleChange(visible) {
      if (visible) {
        let refArr = ['sel'];
        refArr.forEach((v) => {
          const ref = this.$refs[v];
          let { popper } = ref.$refs;
          if (popper.$el) {
            popper = popper.$el;
          }
          if (
            !Array.from(popper.children).some((v) => {
              return v.className === 'setting-btn';
            })
          ) {
            const el = document.createElement('div');
            el.className = 'setting-btn';
            el.innerHTML = `<a class="btn" style="display:block; line-height:40px; cursor: pointer; border-top: 1px solid #dcdfe6; text-align: right; padding-right: 24px; font-size: 14px; font-weight: 400; color: #007bff" >
                            Setting
                          </a>`;
            let limits = JSON.parse(localStorage.getItem('limits'));
            if (limits.custom_task.show_tab_setting) {
              popper.appendChild(el);
            }
            el.onclick = () => {
              this.showTabSetting();
            };
          } else {
            if (ref.options.length === 0) {
              popper.removeChild(popper.querySelector('.setting-btn'));
            }
          }
        });
      }
    },
    ganttVisibleInit(){
      let user = localStorage.getItem('user');
      if(user && user !== ''){
        let userInfo = JSON.parse(user);
        let { role } = userInfo;
        let dept_2d = ['Team Leader'];
        let dept_3d = ['3D Team Leader'];
        if(dept_2d.indexOf(role) >= 0){
          this.ganttVisible = true;
          this.activeDept = '2D';
        }
        if(dept_3d.indexOf(role) >= 0){
          this.ganttVisible = true;
          this.activeDept = '3D';
        }
      }
    },
    handleViewGantt(){
      let { activeDept } = this;
      const url = this.$router.resolve({ name: 'ProjectGantt' }).href;
      const target = `${url}?mode=2&dept=${activeDept}&type=2`;
      window.open(target, '_blank');
    }
  }
};
</script>

<style lang="less" scoped>
.task-form {
  font-family: PingFang SC, PingFang SC;
  :deep(.el-select .el-input__inner),
  :deep(.el-date-editor .el-input__inner) {
    height: 32px;
    width: 455px;
  }

  :deep(.el-form__label) {
    font-size: 14px;
    font-weight: 400;
    color: #303133;
  }

  .title {
    :deep(.el-input__inner) {
      height: 32px;
      width: 1163px;
    }
    :deep(.el-form-item__label) {
      width: 60px !important;
    }
    :deep(.el-form-item__content) {
      margin-left: 60px !important;
    }
    :deep(.el-input__suffix) {
      right: 15px;
    }
  }

  .block-item {
    :deep(.el-form-item__label) {
      float: none;
      word-break: break-word;
    }

    :deep(.el-textarea) {
      margin-left: -148px;
      width: 604px;
    }

    :deep(.el-upload-dragger) {
      width: 604px;
      margin-left: -148px;
      height: 75px;
      background-color: #f5f7fa;
      border: 1px solid #f5f7fa;
      border-radius: 4px;
    }

    :deep(.el-upload__text) {
      color: #909399;
      font-size: 14px;
      font-weight: 400;
    }
  }

  .task-date {
    :deep(.el-input__suffix) {
      right: -232px;
    }
  }

  .textarea {
    :deep(.el-form-item__label) {
      display: inline-block;
      margin-left: -10px;
    }

    :deep(.el-form-item__error) {
      margin-left: -148px;
    }
  }

  .files {
    :deep(.el-form-item__label) {
      display: inline-block;
      margin-left: -105px;
    }
  }

  .submit-btns {
    display: flex;
    align-items: center;
    justify-content: flex-end;

    :deep(.el-button) {
      width: 104px;
      font-size: 14px;
      font-weight: 400;
      height: 40px;
    }

    .cancel {
      color: #007bff;
      border-color: #007bff;
    }
  }
}
.files {
  :deep(.el-form-item__content) {
    line-height: 20px !important;
  }
}
.view-team-gantt{
  height:20px;
  font-size: 14px;
  color: #007bff;
  transition: 0.5s;
  transition-property: all;
  transition-duration: 0.5s;
  transition-timing-function: ease;
  transition-delay: 0s;
  display: inline-block;
}
.view-team-gantt:hover {
  cursor: pointer;
  opacity: 0.8;
}
</style>
