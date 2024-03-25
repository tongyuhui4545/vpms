<template>
  <div style="margin-right: 24px">
    <el-form
      ref="filterForm"
      label-width="140px"
      class="task-form"
      :model="formData"
    >
      <el-row>
        <el-col :span="6">
          <el-form-item label="Title">
            <el-input
              v-model="formData.title"
              size="small"
              style="width: 240px"
              clearable
              placeholder="Enter title to search"
            />
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="Type">
            <el-select
              v-model="formData.task_type"
              filterable
              clearable
              placeholder="Please input and select"
              size="small"
              style="width: 240px"
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
        <el-col :span="6">
          <el-form-item label="Task No.">
            <el-input
              v-model="formData.task_no"
              size="small"
              style="width: 240px"
              clearable
              placeholder="Enter project to search"
            />
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="Priority">
            <el-select
              v-model="formData.priority"
              filterable
              clearable
              placeholder="Please input and select"
              size="small"
              style="width: 240px"
            >
              <el-option
                v-for="user in priorityOptions"
                :key="user.value"
                :label="user.label"
                :value="user.value"
              />
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="6">
          <el-form-item label="Tag">
            <el-select
              v-model="formData.tag"
              filterable
              clearable
              placeholder="Please input and select"
              size="small"
              style="width: 240px"
              multiple
              collapse-tags
            >
              <el-option
                v-for="tag in tagList"
                :key="tag.id"
                :label="tag.tag_name"
                :value="tag.id"
              />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="Status">
            <el-select
              v-model="formData.status"
              filterable
              clearable
              placeholder="Please input and select"
              size="small"
              style="width: 240px"
            >
              <el-option
                v-for="tag in statusOptions"
                :key="tag.value"
                :label="tag.label"
                :value="tag.value"
              />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="Assign to">
            <el-select
              v-model="formData.recipient"
              filterable
              clearable
              placeholder="Please input and select"
              size="small"
              style="width: 240px"
            >
              <el-option
                v-for="user in userOptions"
                :key="user.id"
                :label="user.name"
                :value="user.id"
              />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="Complete date">
            <DataRangePicker
              v-model="completeDate"
              type="complete_date"
              @input-start-date="addDate"
              @input-end-date="addDate"
            />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="6">
          <el-form-item label="Task due date">
            <DataRangePicker
              v-model="taskDueDate"
              type="task_due_date"
              @input-start-date="addDate"
              @input-end-date="addDate"
            />
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="Actual start date">
            <DataRangePicker
              v-model="actualStartDate"
              type="actual_start_date"
              @input-start-date="addDate"
              @input-end-date="addDate"
            />
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="Estimated start date">
            <DataRangePicker
              v-model="estimatedStartDate"
              type="estimated_start_date"
              @input-start-date="addDate"
              @input-end-date="addDate"
            />
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="Project No.">
            <el-input
              v-model="formData.project_no"
              disabled
              size="small"
              style="width: 240px"
              clearable
              placeholder="Enter project No. to search"
            />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="6">
          <el-form-item label="Project name">
            <el-input
              v-model="formData.project_name"
              disabled
              size="small"
              style="width: 240px"
              clearable
              placeholder="Enter project name to search"
            />
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="Phase No.">
            <el-input
              v-model="formData.progress_no"
              size="small"
              style="width: 240px"
              clearable
              placeholder="Enter phase No. to search"
            />
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="Phase">
            <el-input
              v-model="formData.progress"
              size="small"
              style="width: 240px"
              clearable
              placeholder="Enter phase to search"
            />
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="CC">
            <el-select
              v-model="formData.copy_to"
              filterable
              clearable
              placeholder="Please input and select"
              size="small"
              style="width: 240px"
            >
              <el-option
                v-for="user in userOptions"
                :key="user.id"
                :label="user.name"
                :value="user.id"
              />
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="6">
          <el-form-item label="Creator">
            <el-select
              v-model="formData.creator"
              filterable
              clearable
              placeholder="Please input and select"
              size="small"
              style="width: 240px"
            >
              <el-option
                v-for="user in userOptions"
                :key="user.id"
                :label="user.name"
                :value="user.id"
              />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="Creation date">
            <DataRangePicker
              v-model="createDate"
              type="create_date"
              @input-start-date="addDate"
              @input-end-date="addDate"
            />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <div class="submit-btns">
            <el-button
              size="small"
              class="reset"
              @click="resetForm"
            >
              Reset
            </el-button>
            <el-button
              class="form-confirm-btn"
              size="small"
              @click="confirmFilter"
            >
              Confirm
            </el-button>
          </div>
        </el-col>
      </el-row>
    </el-form>
  </div>
</template>
  
  <script>
  import DataRangePicker from '../components/DateRangePicker.vue';
  import { userList, getCustomTaskTagList } from '@/api/index';
  import {
    TASK_TYPE,
    PRIORITY_OPTIONS,
    STATUS_OPTIONS
  } from '@/utils/constants.js';
  export default {
    components: {
      DataRangePicker
    },
    emits: ['on-filter'],
    data() {
      return {
        formData: {},
        taskTypeOptions: TASK_TYPE,
        priorityOptions: PRIORITY_OPTIONS,
        userOptions: [],
        tagList: [],
        statusOptions: STATUS_OPTIONS,
        createDate: [],
        actualStartDate: [],
        completeDate: [],
        taskDueDate: [],
        estimatedStartDate: []
      };
    },
    computed: {
      filterFieldSelected() {
        let num = Object.values(this.formData).filter((value) => {
          return (
            value !== '' && value !== undefined && value !== null && value !== 0
          );
        }).length;
        return num;
      }
    },
    mounted() {
      this.getCustomTaskTagList();
      this.getUserOptions();
      this.getStoredFilter();
    },
    methods: {
      getStoredFilter() {
        let filter = this.$store.state.app.projectFilter;
        if (filter) {
          this.formData = filter;
          this.estimatedStartDate = [
            filter.min_estimated_start_date,
            filter.max_estimated_start_date
          ];
          this.createDate = [filter.min_created_at, filter.max_created_at];
          this.actualStartDate = [
            filter.min_actual_start_date,
            filter.max_actual_start_date
          ];
          this.completeDate = [
            filter.min_complete_date,
            filter.max_complete_date
          ];
          this.taskDueDate = [filter.min_task_due_date, filter.max_task_due_date];
        }
      },
      confirmFilter() {
        let body = JSON.parse(JSON.stringify(this.formData));
        body.tag = body.tag ? body.tag.join(',') : '';
        this.$emit('on-filter', { ...body }, this.filterFieldSelected);
        this.$store.dispatch(
          'app/changeProjectFilterNum',
          this.filterFieldSelected
        );
        this.filterNum = this.$store.state.app.projectFilterNum;
      },
      async getUserOptions() {
        await userList().then((res) => {
          this.userOptions = res.data.data;
        });
      },
      async getCustomTaskTagList() {
        await getCustomTaskTagList().then((res) => {
          if (res.code === 200) {
            this.tagList = res.data.tagList;
          }
        });
      },
      resetForm() {
        this.formData = {};
        this.createDate = [];
        this.actualStartDate = [];
        this.completeDate = [];
        this.taskDueDate = [];
        this.estimatedStartDate = [];
        this.$emit('on-filter', { ...this.formData }, 0);
      },
      addDate(val, dueDateType, startOrEnd) {
        //internal due date
        // if (dueDateType === 'create-date') {
        //由于自定义任务那边creation date的字段改为了created_at,因此做了一下处理
        if (dueDateType === 'create_date') {
          if (startOrEnd === 'start') {
            this.formData['min_created_at'] = val;
            delete this.formData['min_create_date'];
          } else {
            this.formData['max_created_at'] = val;
            delete this.formData['max_create_date'];
          }
        } else {
          if (startOrEnd === 'start') {
            this.formData[`min_${dueDateType}`] = val;
          } else {
            this.formData[`max_${dueDateType}`] = val;
          }
        }
        // }
      }
    }
  };
  </script>
  
  <style lang="less" scoped>
  .task-form {
    :deep(.el-select) {
      width: 270px !important;
    }
  
    :deep(.el-input) {
      width: 257px !important;
    }
  
    :deep(.el-form-item__label) {
      color: #303133;
      font-weight: 400;
    }
  
    .submit-btns {
      display: flex;
      align-items: center;
      justify-content: flex-end;
  
      :deep(.el-button) {
        width: 80px;
        font-size: 14px;
        font-weight: 400;
      }
  
      .reset {
        color: #007bff;
        border-color: #007bff;
      }
    }
  }
  </style>
  