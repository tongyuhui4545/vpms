<template>
  <div class="register-hours-container">
    <el-dialog
      class="register-housrs-modal"
      :close-on-click-modal="false"
      :visible.sync="showModal"
      append-to-body
      width="560px"
      @close="close"
    >
      <template #title>
        <p
          style="
            font-weight: 550;
            color: #303133;
            line-height: 0px;
            font-size: 16px;
          "
        >
          {{ computedTitle }}
        </p>
      </template>
      <el-form
        ref="registerHoursForm"
        style="width: 560px"
        :model="formData"
        label-width="100"
      >
        <el-row>
          <el-col :span="24">
            <el-form-item
              label=" "
              required
            >
              <el-radio-group v-model="hourType">
                <el-radio label="2D" />
                <el-radio label="3D" />
              </el-radio-group>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item
              label="Phase"
              required
            >
              <el-select
                ref="phaseSelector"
                v-model="formData.phase"
                size="small"
                style="width: 248px"
              >
                <el-option
                  v-for="item in phaseOptions"
                  :key="item.value"
                  :value="item.value"
                  :label="item.label"
                />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item
              label="Category"
              required
            >
              <el-select
                v-model="formData.jobCategory"
                size="small"
                style="width: 248px"
              >
                <el-option
                  v-for="item in jobCategoryOptions"
                  :key="item.value"
                  :value="item.value"
                  :label="item.label"
                />
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row style="margin-bottom: 16px">
          <el-col :span="12">
            <el-form-item
              label="Hour"
              required
            >
              <el-input-number
                v-model="formData.hoursWorked"
                :min="0"
                :precision="1"
                style="width: 245px"
                size="small"
              />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item
              label="Date"
              required
            >
              <div style="transform: translateX(-16px)">
                <DateRangePicker
                  v-model="workingDate"
                  input-width="115px"
                  picker-time="date"
                  @input-start-date="handleInputStartDate"
                  @input-end-date="handleInputEndDate"
                />
              </div>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row label="Task description">
          <el-form-item :span="24">
            <el-input
              v-model="formData.workDescription"
              style="width: 526px"
              type="textarea"
              :rows="5"
              placeholder="Please describe your task here"
              size="small"
            />
          </el-form-item>
        </el-row>
      </el-form>
      <template #footer>
        <div class="opt-btns">
          <el-button
            size="small"
            @click="close"
          >
            Cancel
          </el-button>
          <el-button
            class="form-confirm-btn"
            size="small"
            @click="handleConfirm"
          >
            Confirm
          </el-button>
        </div>
      </template>
    </el-dialog>
  </div>
</template>

<script>
import DateRangePicker from '@/components/filters/components/DateRangePicker.vue';
import {
  registerWorkingHours,
  editWorkingHours,
  phaseList
} from '@/api/index.js';
import { formatTime } from '@/utils/format-time.js';

export default {
  components: {
    DateRangePicker
  },
  props: {
    projectId: {
      type: Number,
      default: undefined
    },
    type: {
      type: String,
      default: 'add'
    },
    formDataForEdit: {
      type: Object,
      default: () => {
        return {
          phase: '',
          jobCategory: '',
          hoursWorked: 0,
          workDescription: '',
          working_date: ['', '']
        };
      }
    }
  },
  data() {
    let todayDate = formatTime();
    return {
      todayDate,
      recordId: undefined,
      showModal: false,
      hourType: '',
      formData: {
        phase: '',
        jobCategory: '',
        hoursWorked: 0,
        workDescription: ''
      },
      workingDate: [todayDate, todayDate],
      phaseOptions: [],
      jobCategoryOptions: [
        {
          value: 'design',
          label: 'Design'
        },
        {
          value: 'check',
          label: 'Check'
        },
        {
          value: 'other',
          label: 'Other'
        }
      ]
    };
  },
  computed: {
    computedTitle() {
      return this.type === 'add'
        ? 'Record working hours'
        : 'Edit working hours';
    }
  },
  watch: {
    projectId: {
      handler(val) {
        if (val) {
          this.getProjectDetail();
        }
      },
      immediate: true
    },
    formDataForEdit: {
      handler(val) {
        if (val) {
          this.recordId = val.id;
          this.formData.jobCategory = val.job_category;
          this.formData.phase = val.progress_id;
          this.formData.hoursWorked = val.work_hours;
          this.formData.workDescription = val.description;
          this.workingDate = [val.working_date[0], val.working_date[1]];
          this.hourType = val.type;
        }
      }
    }
  },
  methods: {
    handleInputStartDate(val) {
      this.workingDate[0] = val;
    },
    handleInputEndDate(val) {
      this.workingDate[1] = val;
    },
    getProjectDetail() {
      phaseList({ project_id: this.projectId }).then((res) => {
        let detail = res.data;
        if (detail && detail.length > 0) {
          this.phaseOptions = detail.map((item) => {
            return {
              label: `${item.phase_no} ${item.phase}`,
              value: item.id
            };
          });
        }
      });
    },
    show() {
      this.showModal = true;
    },
    close() {
      this.formData = {
        phase: '',
        jobCategory: '',
        hoursWorked: 0,
        workDescription: ''
      };
      this.workingDate = [this.todayDate, this.todayDate];
      this.$emit('refresh');
      this.showModal = false;
    },
    handleConfirm() {
      if (!this.workingDate[0] || !this.workingDate[1]) {
        this.$message.error('Please enter working date');
        return;
      }
      if (this.formData.hoursWorked === 0) {
        this.$message.error('Please enter hours worked');
        return;
      }
      if (this.formData.jobCategory === '') {
        this.$message.error('Please select job category');
        return;
      }
      if (this.formData.phase === '') {
        this.$message.error('Please select phase');
        return;
      }
      let data = {
        project_id: this.projectId,
        progress_id: this.formData.phase,
        job_category: this.formData.jobCategory,
        work_date_start: this.workingDate[0],
        work_date_end: this.workingDate[1],
        work_hours: this.formData.hoursWorked,
        description: this.formData.workDescription,
        type: this.hourType
      };
      if (this.type === 'add') {
        registerWorkingHours(data).then((res) => {
          if (res.code === 200) {
            this.$message.success('Register hours successfully');
          }
          this.close();
        });
      }
      if (this.type === 'edit') {
        if (this.formData.hoursWorked === 0) {
          this.$message.error('Please enter hours worked');
          return;
        }
        if (this.formData.hoursWorked === 0) {
          this.$message.error('Please enter hours worked');
          return;
        }
        if (this.formData.jobCategory === '') {
          this.$message.error('Please select job category');
          return;
        }
        if (this.formData.phase === '') {
          this.$message.error('Please select phase');
          return;
        }
        editWorkingHours({ id: this.recordId, ...data }).then((res) => {
          this.$emit('work-hour-edited');
          if (res.code === 200) {
            this.$message.success('Edit hours successfully');
            this.close();
          }
        });
      }
    }
  }
};
</script>

<style>
.register-housrs-modal .el-form-item {
  margin-bottom: 0;
  padding-bottom: 0;
}
.register-housrs-modal .el-dialog {
  border-radius: 8px;
}
.register-housrs-modal .el-dialog__body {
  padding: 0 20px;
}

.register-housrs-modal .opt-btns {
  margin-right: -7px;
}
</style>
