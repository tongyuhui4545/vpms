<template>
  <div class="quote-task-filter">
    <el-form
      ref="formProject"
      label-position="right"
      :model="formData"
      :inline="true"
      label-width="120"
    >
      <el-row>
        <el-col :span="6">
          <el-form-item
            label="Version"
            prop="version"
            :rules="[{ type: 'number', message: 'enter version is valid' }]"
          >
            <el-input
              v-model.number="formData.version"
              size="small"
              style="width: 225px"
              clearable
              placeholder="Enter version to search"
            >
              <template slot="prepend">
                V
              </template>
            </el-input>
          </el-form-item>
          <el-form-item
            label="Quote status"
            prop="status"
          >
            <el-select
              v-model="formData.status"
              size="small"
              style="width: 225px"
              clearable
              placeholder="Please select"
            >
              <el-option
                v-for="opt in quoteStatusOptions"
                :key="opt.value"
                :label="opt.label"
                :value="opt.value"
              />
            </el-select>
          </el-form-item>
          <el-form-item
            label="Quote file"
            prop="quote_file"
          >
            <el-input
              v-model="formData.quote_file"
              size="small"
              style="width: 225px"
              clearable
              placeholder="Enter quote file to search"
            />
          </el-form-item>
          <el-form-item label="Creation date">
            <DateRangePicker
              v-model="creationTime"
              input-width="105px"
              type="creation-date"
              @input-start-date="addDate"
              @input-end-date="addDate"
            />
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item
            label="Type"
            prop="type "
          >
            <el-select
              v-model="formData.type"
              size="small"
              style="width: 225px"
              clearable
              placeholder="Please select"
            >
              <el-option value="Harness">
                Harness
              </el-option>
              <el-option value="Alex">
                Alex
              </el-option>
              <el-option value="Lynx">
                Lynx
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item
            label="Project No."
            prop="project_no"
          >
            <el-input
              v-model="formData.project_no"
              size="small"
              style="width: 225px"
              clearable
              placeholder="Enter project name to search"
            />
          </el-form-item>
          <el-form-item
            label="Total price($)"
            prop="total_price"
          >
            <el-input
              v-model="formData.total_price"
              size="small"
              style="width: 225px"
              clearable
              placeholder="Enter total price($) to search"
            />
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item
            label="Phase No."
            prop="phase_no "
          >
            <el-input
              v-model="formData.phase_no"
              size="small"
              style="width: 230px"
              clearable
              placeholder="Please enter phase no. to search"
            />
          </el-form-item>
          <el-form-item
            label="Project name"
            prop="project_name"
          >
            <el-input
              v-model="formData.project_name"
              size="small"
              style="width: 230px"
              clearable
              placeholder="Please enter project name to search"
            />
          </el-form-item>
          <el-form-item
            label="Per watt price($)"
            prop="per_watt_price "
            label-width="120px"
          >
            <el-input
              v-model="formData.per_watt_price"
              size="small"
              style="width: 230px"
              clearable
              placeholder="Enter per watt price($) to search"
            />
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item
            label="Phase"
            prop="phase "
          >
            <el-select
              v-model="formData.phase"
              size="small"
              style="width: 275px"
              clearable
              placeholder="Please select"
            >
              <el-option
                v-for="option in phaseOptions"
                :key="option.value"
                :label="option.label"
                :value="option.value"
              />
            </el-select>
          </el-form-item>
          <el-form-item
            label="Team"
            prop="team"
          >
            <el-select
              v-model="formData.team_id"
              size="small"
              style="width: 275px"
              clearable
              placeholder="Please select"
            >
              <el-option
                v-for="team in teamOptions"
                :key="team.id"
                :label="team.name"
                :value="team.id"
              />
            </el-select>
          </el-form-item>
          <el-form-item
            label="Creator"
            prop="creator"
          >
            <el-select
              v-model="formData.creation_id"
              size="small"
              style="width: 275px"
              filterable
              clearable
              placeholder="Please select"
            >
              <el-option
                v-for="user in userList"
                :key="user.id"
                :label="user.name"
                :value="user.id"
              />
            </el-select>
          </el-form-item>
          <div class="btns-group">
            <el-button
              class="reset-btn"
              size="mini"
              @click="handleReset"
            >
              Reset
            </el-button>
            <el-button
              class="confirm-btn"
              size="mini"
              @click="handleFilter"
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
import DateRangePicker from './components/DateRangePicker.vue';
import { teamList, userList } from '@/api/index.js';
import { PHASE_VALUES } from '@/utils/constants';

export default {
  components: {
    DateRangePicker
  },
  data() {
    return {
      formData: {
        version: '',
        type: '',
        phase_no: '',
        phase: '',
        status: '',
        project_no: '',
        project_name: '',
        team_id: '',
        quote_file: '',
        total_price: '',
        per_watt_price: '',
        creation_id: '',
        created_at_start: '',
        created_at_end: ''
      },
      userList: [],
      phaseOptions: PHASE_VALUES,
      creationTime: [],
      teamDueDate: [],
      customerOptions: [],
      teamOptions: [],
      creatorList: [],
      quoteStatusOptions: [
        {
          label: 'Pending US engineer review',
          value: 'US_TO_BE_SEND'
        },
        {
          label: 'Pending assign design team',
          value: 'US_HAS_BEEN_SEND'
        },
        {
          label: 'Team assigned & Pending quote',
          value: 'CN_ASSIGNED'
        },
        {
          label: 'Quote submited & Pending CN approval',
          value: 'CN_TEAM_ALREADY_APPLIED'
        },
        {
          label: 'Quote rejected & Pending re-quote',
          value: 'CN_REJECTED'
        },
        {
          label: 'Pending US approval',
          value: 'CN_PASSED'
        },
        {
          label: 'US engineer rejected',
          value: 'US_REJECTED'
        },
        {
          label: 'Quote released',
          value: 'US_PASSED'
        },
        {
          label: 'Quote sent',
          value: 'QUOTE_SENT'
        },
        {
          label: 'Win & Pending US engineer final review',
          value: 'WIN'
        },
        {
          label: 'Final review approval',
          value: 'US_FINAL_PASSED'
        }
      ]
    };
  },
  computed: {
    filterFieldSelected() {
      let num = Object.values(this.formData).filter((value) => {
        return value !== '' && value !== undefined && value !== null;
      }).length;
      return num;
    }
  },
  created() {
    this.getTeamData();
    this.resetForm();
  },
  mounted() {
    this.getWholeUserList();
  },
  methods: {
    resetForm() {
      return;
    },
    getStoredFilter() {
      let filter = this.$store.state.app.projectFilter;
      if (filter) {
        this.formData = filter;
        this.customerDueDate = [
          filter.quoteDueDateStart,
          filter.quoteDueDateEnd
        ];
        this.internalDueDate = [filter.inner_date_start, filter.inner_date_end];
        this.creationTime = [filter.creationTimeFrom, filter.creationTimeTo];
        this.teamDueDate = [
          filter.team_due_date_start,
          filter.team_due_date_end
        ];
      }
    },
    addDate(val, dueDateType, startOrEnd) {
      if (dueDateType === 'creation-date') {
        if (startOrEnd === 'start') {
          this.formData.created_at_start = val;
        } else {
          this.formData.created_at_end = val;
        }
      }
      if (dueDateType === 'customer-due-date') {
        if (startOrEnd === 'start') {
          this.formData.due_date_start = val;
        } else {
          this.formData.due_date_end = val;
        }
      }
      if (dueDateType === 'internal-due-date') {
        if (startOrEnd === 'start') {
          this.formData.inner_date_start = val;
        } else {
          this.formData.inner_date_end = val;
        }
      }
      if (dueDateType === 'quote-due-date') {
        if (startOrEnd === 'start') {
          this.formData.quoteDueDateStart = val;
        } else {
          this.formData.quoteDueDateEnd = val;
        }
      }
      if (dueDateType === 'team-due-date') {
        if (startOrEnd === 'start') {
          this.formData.team_due_date_start = val;
        } else {
          this.formData.team_due_date_end = val;
        }
      }
      if (dueDateType === 'creation-due-date') {
        if (startOrEnd === 'start') {
          this.formData.creationTimeFrom = val;
        } else {
          this.formData.creationTimeTo = val;
        }
      }
    },
    getWholeUserList() {
      userList()
        .then((res) => {
          if (res.code === 200) {
            this.userList = res.data.data;
          }
        })
        .catch((err) => {
          return err;
        });
    },
    handleFilter() {
      this.$emit('on-filter', { ...this.formData }, this.filterFieldSelected);
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
    handleReset() {
      this.formData = {
        version: '',
        type: '',
        phase_no: '',
        phase: '',
        status: '',
        project_no: '',
        project_name: '',
        team_id: '',
        quote_file: '',
        total_price: '',
        per_watt_price: '',
        creation_id: '',
        created_at_start: '',
        created_at_end: ''
      };
      this.creationTime = [];
      this.filterNum = 0;
      this.$refs.formProject.resetFields();
      // this.$emit('on-filter', this.formData, this.filterNum);
    }
  }
};
</script>

<style lang="less" scoped>
::v-deep .reset-btn {
  width: 80px;
  height: 32px;
  border-radius: 4px;
  background: #ffffff;
  border: 1px solid #007bff;
  color: #007bff;
}
::v-deep .confirm-btn {
  width: 80px;
  height: 32px;
  background: #007bff;
  border: 1px solid #007bff;
  border-radius: 4px;
  color: #fff;
}
.el-form--inline .el-form-item {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  margin-right: 80px;
}
.right-align {
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
}
.quote-task-filter {
  width: 1700px;
  margin-left: 25px;
  margin-top: -15px;
  padding-top: 15px;
  .btns-group {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    margin-right: 81px;
  }
}
</style>
