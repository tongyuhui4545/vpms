<template>
  <div class="bidding-project-filter">
    <el-form
      ref="formProject"
      :model="formData"
      :inline="true"
      label-width="140"
      style="margin-left: 15px"
    >
      <el-row>
        <el-col :span="6">
          <el-form-item label="Role">
            <el-select
              v-model="userRole"
              filterable
              clearable
              placeholder="Please input and select"
              size="small"
              style="width: 280px"
            >
              <el-option
                v-for="item in roleOptions"
                :key="item.id"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </el-form-item>
          <el-form-item label="Overdue or not">
            <el-select
              v-model="formData.is_overdue"
              filterable
              clearable
              placeholder="Please input and select"
              size="small"
              style="width: 280px"
            >
              <el-option
                label="Yes"
                value="1"
              />
              <el-option
                label="No"
                value="0"
              />
            </el-select>
          </el-form-item>
          <el-form-item label="Project name">
            <el-input
              v-model="formData.project_name"
              size="small"
              style="width: 280px"
              clearable
              placeholder="Please enter project name"
            />
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item
            label="Name"
            prop="name"
          >
            <el-input
              v-model="formData.user_name"
              size="small"
              style="width: 280px"
              clearable
              placeholder="Please enter user name"
            />
          </el-form-item>
          <el-form-item label="Overdue time(hours)">
            <el-input-number
              v-model="formData.overdue_time_start"
              :min="0"
              size="small"
              style="width: 100px"
            />
            <span
              style="
                font-size: 14px;
                color: #414a43;
                margin-left: 4px;
                margin-right: 4px;
              "
            >to</span>
            <el-input-number
              v-model="formData.overdue_time_end"
              :min="0"
              size="small"
              style="width: 100px"
            />
          </el-form-item>
          <el-form-item label="Phase No.">
            <el-input
              v-model="formData.progress_no"
              size="small"
              style="width: 280px"
              clearable
              placeholder="Enter Phase No. to search"
            />
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="Due date">
            <DataRangePicker
              v-model="workDuedate"
              type="due-date"
              @input-start-date="addDate"
              @input-end-date="addDate"
            />
          </el-form-item>
          <el-form-item label="Type">
            <el-select
              v-model="formData.type"
              filterable
              clearable
              placeholder="Please input and select"
              size="small"
              style="width: 280px"
            >
              <el-option
                v-for="(item, key) in typeOptions"
                :key="key"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </el-form-item>
          <el-form-item label="Phase">
            <el-select
              v-model="formData.phase"
              filterable
              clearable
              placeholder="Please input and select"
              size="small"
              style="width: 280px"
            >
              <el-option
                v-for="(item, key) in phaseList"
                :key="key"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="Submit time">
            <DataRangePicker
              v-model="submitTime"
              type="submit-time"
              @input-start-date="addDate"
              @input-end-date="addDate"
            />
          </el-form-item>
          <el-form-item label="Project No.">
            <el-input
              v-model="formData.project_no"
              size="small"
              style="width: 280px"
              clearable
              placeholder="Enter project No. to search"
            />
          </el-form-item>
          <div class="submit-btns">
            <el-button
              size="small"
              @click="resetForm"
            >
              Reset
            </el-button>
            <el-button
              class="form-confirm-btn"
              size="small"
              @click="filterList"
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
import DataRangePicker from './components/DateRangePicker.vue';
import { PHASE_LIST } from '@/utils/constants';
import { getLastDay } from '@/utils/commons.js';
import { customerAll, teamList, userList } from '@/api/index.js';

export default {
  components: {
    DataRangePicker
  },
  data() {
    return {
      phaseList: PHASE_LIST,
      userRole: '',
      formData: {
        user_role: '',
        user_name: '',
        type: '',
        title: '',
        is_overdue: '',
        overdue_time_start: '',
        overdue_time_end: '',
        project_name: '',
        project_no: '',
        progress_no: '',
        phase: '',
        due_date_start: '',
        due_date_end: '',
        completed_at_start: '',
        completed_at_end: '',
        work_due_date_start: '',
        work_due_date_end: '',
        is_rejected: '',
        reason: ''
      },
      managerApproveTime: [],
      customerDueDate: [],
      internalDueDate: [],
      roleOptions: [
        {
          id: 1,
          label: 'Team Leader',
          value: 'Team Leader'
        },
        {
          id: 2,
          label: 'CN Engineer Manager',
          value: 'CN Engineer Manager'
        },
        {
          id: 3,
          label: '3D Team Leader',
          value: '3D Team Leader'
        },
        {
          id: 4,
          label: '3D Manager',
          value: '3D Manager'
        }
      ],
      creationTime: [],
      submitTime: [],
      customerOptions: [],
      typeOptions: [
        {
          id: 1,
          label: 'Bidding',
          value: 1
        },
        {
          id: 2,
          label: 'Formal',
          value: 2
        },
        {
          id: 3,
          label: 'Label',
          value: 3
        },
        {
          id: 4,
          label: '3D bidding',
          value: 4
        },
        {
          id: 5,
          label: '3D formal',
          value: 5
        },
        {
          id: 6,
          label: 'Simulation',
          value: 6
        }
      ],
      creatorList: [],
      workDuedate: [],
      overdueTime: []
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
    this.getCustomers();
    this.getTeamData();
    this.getWholeUserList();
  },
  methods: {
    setRole(role, months, projectType) {
      switch(role) {
        case 1:
this.userRole = 'Team Leader';
        break;
        case 2:
this.userRole = 'CN Engineer Manager';
        break;
        case 3:
this.userRole = '3D Team Leader';
        break;
        case 4:
this.userRole = '3D Manager';
          break
          default:
            break
      }
      let firstDayofMonthFrom = `${months[0]}-01`;
      let lastDayofMonthTo = getLastDay(
        Number(months[1].split('-')[0]),
        Number(months[1].split('-')[1])
      );
      let from = `${firstDayofMonthFrom} ` + '00:00:00';
      let to = `${months[1]}-${lastDayofMonthTo}` + ' ' + '23:59:59';
      this.workDuedate = [from, to];
      this.formData.due_date_start = from;
      this.formData.due_date_end = to;
      this.formData.user_role = this.userRole;
      this.formData.type = projectType;
    },
    addDate(val, dueDateType, startOrEnd) {
      if (dueDateType === 'due-date') {
        if (startOrEnd === 'start') {
          this.formData.due_date_start = val;
        } else {
          this.formData.due_date_end = val;
        }
      }
      if (dueDateType === 'submit-time') {
        if (startOrEnd === 'start') {
          this.formData.completed_at_start = val;
        } else {
          this.formData.completed_at_end = val;
        }
      }
    },
    getWholeUserList() {
      userList()
        .then((res) => {
          if (res.code === 200) {
            let pageNum = res.data.total / res.data.per_page;
            this.totalUserPage = Math.ceil(pageNum);
            // for (let i = 0; i < this.totalUserPage; i++) {
            //   this.getUserList(i + 1);
            // }
            this.creatorList = res.data.data
          }
        })
        .catch((err) => {
          return err;
        });
    },
    // getUserList(pageNum) {
    //   userList({ page: pageNum })
    //     .then((res) => {
    //       if (res.code === 200) {
    //         this.creatorList = this.creatorList.concat(res.data.data);
    //       }
    //       return;
    //     })
    //     .catch((err) => {
    //       return err;
    //     });
    // },
    filterList() {
      if (this.formData.overdue_time_start > this.formData.overdue_time_end) {
        this.$message.error('Invalid overdue time range');
        return;
      }
      this.formData.overdue_time_start =
        this.formData.overdue_time_start === 0
          ? (this.formData.overdue_time_start = '')
          : this.formData.overdue_time_start;
      this.formData.overdue_time_end =
        this.formData.overdue_time_end === 0
          ? (this.formData.overdue_time_end = '')
          : this.formData.overdue_time_end;
      this.formData.user_role = this.userRole;
      this.$emit('on-filter', { ...this.formData }, this.filterFieldSelected);
    },
    getCustomers() {
      customerAll()
        .then((res) => {
          if (res.code === 200) {
            this.customerOptions = res.data;
          }
          return;
        })
        .catch((err) => {
          return err;
        });
    },
    getTeamData() {
      teamList()
        .then((res) => {
          if (res.code === 200) {
            this.teamOptions = res.data.data;
          }
          return;
        })
        .catch((err) => {
          return err;
        });
    },
    resetForm() {
      this.formData = {
        user_role: '',
        user_name: '',
        type: '',
        title: '',
        is_overdue: '',
        overdue_time_start: '',
        overdue_time_end: '',
        project_name: '',
        project_no: '',
        progress_no: '',
        phase: '',
        due_date_start: '',
        due_date_end: '',
        completed_at_start: '',
        completed_at_end: '',
        work_due_date_start: '',
        work_due_date_end: '',
        is_rejected: '',
        reason: ''
      };
      this.userRole = '';
      this.customerDueDate = [];
      this.internalDueDate = [];
      this.workDuedate = [];
      this.submitTime = [];
    }
  }
};
</script>

<style lang="less" scoped>
.bidding-project-filter {
  margin-right: 5px;

  .submit-btns {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    margin-right: 65px;
    margin-bottom: 16px;
  }
}
</style>
