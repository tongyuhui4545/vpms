<template>
  <div style="padding-right: 3%; padding-top: 1%">
    <el-form
      ref="filterForm"
      label-width="140px"
      class="ongoing-task-form"
      :model="formData"
    >
      <el-row>
        <el-col :span="6">
          <el-form-item label="Category">
            <el-select
              v-model="formData.category"
              size="small"
              style="width: 340px"
              clearable
              placeholder="Enter title to search"
            >
              <el-option
                v-for="opt in categoryList"
                :key="opt.value"
                :value="opt.value"
                :label="opt.label"
              />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="Task title">
            <el-input
              v-model="formData.title"
              filterable
              clearable
              placeholder="Please input and select"
              size="small"
              style="width: 340px"
            />
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="Task recipient">
            <el-select
              v-model="formData.receiver"
              size="small"
              style="width: 340px"
              clearable
              filterable
              placeholder="Enter project to search"
            >
              <el-option
                v-for="person in userOptions"
                :key="person.id"
                :label="person.name"
                :value="person.id"
              />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="Due date">
            <div
              style="display: flex; justify-content: space-between; gap: 5px"
            >
              <el-date-picker
                v-model="formData.due_date_start"
                size="small"
              />
              <span>-</span>
              <el-date-picker
                v-model="formData.due_date_end"
                size="small"
              />
            </div>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="6">
          <el-form-item label="Project Name/No.">
            <el-input
              v-model="formData.search"
              filterable
              clearable
              placeholder="Please input and select"
              size="small"
              style="width: 340px"
              multiple
              collapse-tags
            />
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="Phase">
            <el-select
              v-model="formData.phase"
              filterable
              clearable
              placeholder="Please input and select"
              size="small"
              style="width: 340px"
            >
              <el-option
                v-for="phase in phaseOptionList"
                :key="phase.value"
                :label="phase.label"
                :value="phase.value"
              />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <div class="btns-wrapper">
            <div
              class="reset-btn"
              @click="resetForm"
            >
              Reset
            </div>
            <div
              class="submit-btn"
              @click="handleConfirm"
            >
              Confirm
            </div>
          </div>
        </el-col>
      </el-row>
    </el-form>
  </div>
</template>

<script>
import { userList } from '@/api/index';
import dayjs from 'dayjs';
import {
  PHASE_VALUES
} from '@/utils/constants.js';
export default {
  emits: ['on-filter'],
  data() {
    return {
      formData: {
        category: undefined,
        receiver: undefined,
        due_date_start: '',
        due_date_end: '',
        search: '',
        phase: undefined,
        title: ''
      },
      userOptions: [],
      phaseOptionList:PHASE_VALUES,
      categoryList: [
        {label: 'Quote', value: 1},
        {label: 'Label', value: 2},
        {label: '3D calculation', value: 3},
        {label: '3D simulation', value: 4},
        {label: 'Others', value: 5}
      ]
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
  created() {
    this.getUserOptions();
  },
  // mounted() {
  //   this.getUserOptions();
  // },
  methods: {
    handleConfirm() {
      this.formData.due_date_start = this.formData.due_date_start ? dayjs(this.formData.due_date_start).format('YYYY-MM-DD') : '';
this.formData.due_date_end = this.formData.due_date_end ? dayjs(this.formData.due_date_end).format('YYYY-MM-DD') : '';
      this.$emit('on-filter', this.formData, this.filterFieldSelected);
    },
    resetForm() {
      this.formData = {
        category: undefined,
        receiver: undefined,
        due_date_start: '',
        due_date_end: '',
        search: '',
        phase: undefined,
        title: '',
        page: undefined,
        limit: undefined
      }
      // this.$emit('on-filter', { ...this.formData }, 0);
    },
    async getUserOptions() {
      await userList().then((res) => {
        this.userOptions = res.data.data;
      });
    }
  }
};
</script>

<style lang="less" scoped>
.ongoing-task-form {
  .btns-wrapper {
    padding-top: 5px;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    gap: 24px;

    .reset-btn,
    .submit-btn {
      width: 80px;
      height: 30px;
      border-radius: 4px;
      text-align: center;
      line-height: 30px;
      cursor: pointer;
      border: 1px solid #007BFF;
    }

    .reset-btn {
      color: #007bff;
    }
    .submit-btn {
      background: #007BFF;
      color: #fff
    }
  }
}
</style>
