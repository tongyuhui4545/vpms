<template>
  <div class="bidding-project-filter">
    <el-form
      ref="formProject"
      :model="formData"
      :inline="true"
      label-width="140px"
    >
      <el-row>
        <el-col :span="6">
          <!-- Project Name/No. -->
          <el-form-item label="Project Name/No.">
            <el-input
              v-model="formData.project"
              size="small"
              style="width: 285px"
              clearable
              placeholder="Enter project to search"
            />
          </el-form-item>
          <!-- Size DC -->
          <el-form-item
            label="Size DC (MW)"
            prop="size"
          >
            <el-input-number
              v-model="formData.sizeFrom"
              size="small"
              placeholder="Min"
              :min="0"
            />
            <span style="margin: 0 5px">To</span>
            <el-input-number
              v-model="formData.sizeTo"
              size="small"
              placeholder="Max"
              :min="0"
            />
          </el-form-item>
          <!-- Project schedule -->
          <el-form-item
            label="Project schedule"
            prop="project_schedule_upload"
          >
            <el-select
              v-model="formData.project_schedule_upload"
              filterable
              clearable
              placeholder="Please select"
              size="small"
              style="width: 285px"
            >
              <el-option
                :value="1"
                label="Yes"
              >
                Yes
              </el-option>
              <el-option
                :value="0"
                label="No"
              >
                No
              </el-option>
            </el-select>
          </el-form-item>
          <!-- Label due date -->
          <el-form-item
            label="Label due date"
            prop="labelStatus"
          >
            <DataRangePicker
              v-model="labelDueDate"
              input-width="140px"
              type="label-due-date"
              @input-start-date="addDate"
              @input-end-date="addDate"
            />
          </el-form-item>
          <!-- Simulation team due date -->
          <el-form-item
            label="Simulation team due date"
            label-width="180px"
          >
            <DataRangePicker
              v-model="simulationTeamDueDate"
              type="simulation-team-due-date"
              @input-start-date="addDate"
              @input-end-date="addDate"
            />
          </el-form-item>
          <!-- 3D team -->
          <el-form-item label="3D team">
            <el-select
              v-model="formData['3d_team_id']"
              filterable
              clearable
              placeholder="Please input and select"
              size="small"
              style="width: 285px"
            >
              <el-option
                v-for="(item, key) in teamOptions"
                :key="key"
                :label="item.name"
                :value="item.id"
              />
            </el-select>
          </el-form-item>
          <!-- 3D internal due date -->
          <el-form-item label="3D internal due date">
            <DataRangePicker
              v-model="teamDueDate"
              input-width="135px"
              type="3d-internal-due-date"
              @input-start-date="addDate"
              @input-end-date="addDate"
            />
          </el-form-item>
          <!-- archiving status -->
          <el-form-item label="Archiving status">
            <el-select
              v-model="formData['archiving']"
              clearable
              style="width: 280px"
              size="small"
            >
              <el-option
                label="Archived"
                value="1"
              />
              <el-option
                label="Unarchived"
                value="0"
              />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <!-- Status -->
          <el-form-item
            label="Status"
            prop="projectStatus"
          >
            <el-select
              v-model="formData.sales_status"
              filterable
              clearable
              placeholder="Please input and select"
              size="small"
              style="width: 260px"
            >
              <el-option
                v-for="item in projectStatusOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </el-form-item>
          <!-- Latest phase -->
          <el-form-item
            label="Latest phase"
            prop="progress"
          >
            <el-select
              v-model="formData.progress"
              filterable
              clearable
              placeholder="Please select"
              size="small"
              style="width: 255px"
            >
              <el-option
                v-for="opt in phaseList"
                :key="opt.value"
                :value="opt.value"
                :label="opt.label"
              />
            </el-select>
          </el-form-item>
          <!-- Solution  -->
          <el-form-item
            label="Solution"
            prop="solution"
          >
            <el-select
              v-model="formData.solution"
              filterable
              clearable
              placeholder="Please input and select"
              size="small"
              style="width: 255px"
            >
              <el-option
                v-for="item in solutionOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </el-form-item>
          <!-- Simulation status -->
          <el-form-item
            label="Simulation status"
            label-width="140px"
          >
            <el-select
              v-model="formData['simulation_status']"
              filterable
              clearable
              placeholder="Please input and select"
              size="small"
              style="width: 255px"
            >
              <el-option
                v-for="item in simulationStatusOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </el-form-item>
          <!-- Quote status -->
          <el-form-item
            label="Quote status"
            prop="quoteStatus"
          >
            <el-select
              v-model="formData.quoteStatus"
              filterable
              clearable
              placeholder="Please select quote status"
              size="small"
              style="width: 260px"
            >
              <el-option
                v-for="item in quoteStatusOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </el-form-item>
          <!-- Customer due date -->
          <el-form-item
            label="Customer due date"
            prop="customerDueDate"
          >
            <DataRangePicker
              v-model="customerDueDate"
              type="quote-due-date"
              @input-start-date="addDate"
              @input-end-date="addDate"
            />
          </el-form-item>
          <!-- 3D team due date -->
          <el-form-item label="3D team due date">
            <DataRangePicker
              v-model="d3TeamDueDate"
              type="3d-team-due-date"
              @input-start-date="addDate"
              @input-end-date="addDate"
            />
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <!-- Sales -->
          <el-form-item label="Sales">
            <el-select
              v-model="formData.sales"
              filterable
              clearable
              placeholder="Please input and select"
              size="small"
              style="width: 260px"
            >
              <el-option
                v-for="(item, key) in salesOptions"
                :key="key"
                :label="item.name"
                :value="item.id"
              />
            </el-select>
          </el-form-item>
          <!-- Technical details -->
          <el-form-item
            label="Technical details"
            prop="technical_details_upload"
          >
            <el-select
              v-model="formData.technical_details_upload"
              filterable
              clearable
              placeholder="Please select"
              size="small"
              style="width: 255px"
            >
              <el-option
                :value="1"
                label="Yes"
              >
                Yes
              </el-option>
              <el-option
                :value="0"
                label="No"
              >
                No
              </el-option>
            </el-select>
          </el-form-item>
          <!-- Label status -->
          <el-form-item
            label="Label status"
            prop="labelStatus"
          >
            <el-select
              v-model="formData.label_status"
              filterable
              clearable
              placeholder="Please input and select"
              size="small"
              style="width: 255px"
            >
              <el-option
                v-for="item in labelStatusOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </el-form-item>
          <!-- Simulation team -->
          <el-form-item label="Simulation team">
            <el-select
              v-model="formData['simulation_team_id']"
              filterable
              clearable
              placeholder="Please input and select"
              size="small"
              style="width: 255px"
            >
              <el-option
                v-for="item in teamOptions"
                :key="item.id"
                :label="item.name"
                :value="item.id"
              />
            </el-select>
          </el-form-item>
          <!-- Team -->
          <el-form-item
            label="Team"
            prop="team"
          >
            <el-select
              v-model="formData.team_id"
              filterable
              clearable
              placeholder="Please input and select"
              size="small"
              style="width: 255px"
            >
              <el-option
                v-for="item in teamOptions"
                :key="item.id"
                :label="item.name"
                :value="item.id"
              />
            </el-select>
          </el-form-item>
          <!-- Internal due date -->
          <el-form-item label="Internal due date">
            <DataRangePicker
              v-model="internalDueDate"
              type="internal-due-date"
              @input-start-date="addDate"
              @input-end-date="addDate"
            />
          </el-form-item>
          <!-- Creator -->
          <el-form-item
            label="Creator"
            prop="creator"
          >
            <el-select
              v-model="formData.creator"
              filterable
              clearable
              placeholder="Please input and select"
              size="small"
              style="width: 260px"
            >
              <el-option
                v-for="(item, key) in creatorList"
                :key="key"
                :label="item.name"
                :value="item.id"
              />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <!-- Customers -->
          <el-form-item
            label="Customers"
            prop="customers"
          >
            <el-select
              v-model="formData.customer"
              filterable
              clearable
              placeholder="Please input and select"
              size="small"
              style="width: 255px"
            >
              <el-option
                v-for="(item, key) in customerOptions"
                :key="key"
                :label="item.name"
                :value="item.id"
              />
            </el-select>
          </el-form-item>
          <!-- Golden row files -->
          <el-form-item
            label="Golden row files"
            prop="golden_row_files_upload"
          >
            <el-select
              v-model="formData.golden_row_files_upload"
              filterable
              clearable
              placeholder="Please select"
              size="small"
              style="width: 255px"
            >
              <el-option
                :value="1"
                label="Yes"
              >
                Yes
              </el-option>
              <el-option
                :value="0"
                label="No"
              >
                No
              </el-option>
            </el-select>
          </el-form-item>
          <!-- Label team -->
          <el-form-item
            label="Label team"
            prop="labelTeam"
          >
            <el-select
              v-model="formData.label_team"
              filterable
              clearable
              placeholder="Please input and select"
              size="small"
              style="width: 255px"
            >
              <el-option
                v-for="item in teamOptions"
                :key="item.id"
                :label="item.name"
                :value="item.id"
              />
            </el-select>
          </el-form-item>
          <!-- Simulation due date -->
          <el-form-item label="Simulation due date">
            <DataRangePicker
              v-model="simulationDueDate"
              type="simulation-due-date"
              @input-start-date="addDate"
              @input-end-date="addDate"
            />
          </el-form-item>
          <!-- 3D calculation status -->
          <el-form-item
            label="3D calculation status"
            label-width="150px"
          >
            <el-select
              v-model="formData['3d_calculation_status']"
              filterable
              clearable
              placeholder="Please input and select"
              size="small"
              style="width: 275px"
            >
              <el-option
                v-for="item in calculationStatusOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </el-form-item>
          <!-- Team due date -->
          <el-form-item
            label="Team due date"
            prop="teamDueDate"
            label-width="170px"
          >
            <DataRangePicker
              v-model="teamDueDate"
              type="team-due-date"
              @input-start-date="addDate"
              @input-end-date="addDate"
            />
          </el-form-item>
          <!-- Creation date -->
          <el-form-item
            label="Creation date"
            prop="created_at"
            label-width="170px"
          >
            <DataRangePicker
              v-model="creationTime"
              type="creation-date"
              @input-start-date="addDate"
              @input-end-date="addDate"
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
              @click="filterBiddingProjects"
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
import {
  CALCULATION_STATUS_LIST,
  LABEL_STATUS_LIST,
  PHASE_VALUES,
  SIMULATION_STATUS_LIST
} from '@/utils/constants.js';

import { customerAll, teamList, salesList, userList } from '@/api/index.js';

export default {
  components: {
    DataRangePicker
  },
  data() {
    return {
      phaseList: PHASE_VALUES,
      simulationDueDate: [],
      simulationTeamDueDate: [],
      d3TeamDueDate: [],
      labelStatusOptions: LABEL_STATUS_LIST,
      calculationStatusOptions: CALCULATION_STATUS_LIST,
      simulationStatusOptions: SIMULATION_STATUS_LIST,
      formData: {
        project: '',
        sales: '',
        customer: '',
        sales_status: '',
        quoteStatus: '',
        quoteDueDateStart: '',
        quoteDueDateEnd: '',
        inner_date_start: '',
        inner_date_end: '',
        team_due_date_start: '',
        team_due_date_end: '',
        sizeFrom: undefined,
        sizeTo: undefined,
        creationTimeFrom: '',
        simulation_team_id: '',
        creationTimeTo: '',
        solution: '',
        team_id: '',
        archiving: '',
        label_status: '',
        label_due_date_start: '',
        label_due_date_end: '',
        label_solution: '',
        label_team: '',
        progress:''
      },
      customerDueDate: [],
      labelDueDate: [],
      internalDueDate: [],
      salesOptions: [],
      creationTime: [],
      teamDueDate: [],
      customerOptions: [],
      teamOptions: [],
      creatorList: [],
      projectStatusOptions: [
        {
          value: 1,
          label: 'Bidding'
        },
        {
          value: 2,
          label: 'Win'
        },
        {
          value: 3,
          label: 'Win Via Another EPC'
        },
        {
          value: 4,
          label: 'Lost'
        },
        {
          value: 5,
          label: 'On-hold'
        },
        {
          value: 6,
          label: 'Canceled'
        }
      ],
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
      ],

      solutionOptions: [
        {
          value: 'Harness',
          label: 'Harness'
        },
        {
          value: 'Lynx',
          label: 'Lynx'
        },
        {
          value: 'Alex',
          label: 'Alex'
        }
      ],
      archivingOptions: [
        {
          value: 1,
          label: 'Archived'
        },
        {
          value: 0,
          label: 'Unarchived'
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
    this.getCustomers();
    this.getTeamData();
    this.getSalesList();
    this.getWholeUserList();
    this.getStoredFilter();
  },
  methods: {
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
      //internal due date
      if (dueDateType === 'internal-due-date') {
        if (startOrEnd === 'start') {
          this.formData.inner_date_start = val;
        } else {
          this.formData.inner_date_end = val;
        }
      }
      if (dueDateType === 'creation-date') {
        if (startOrEnd === 'start') {
          this.formData.created_at_start = val;
        } else {
          this.formData.created_at_end = val;
        }
      }
      //Customer due date
      if (dueDateType === 'quote-due-date') {
        if (startOrEnd === 'start') {
          this.formData.quoteDueDateStart = val;
        } else {
          this.formData.quoteDueDateEnd = val;
        }
      }
      //team due date
      if (dueDateType === 'team-due-date') {
        if (startOrEnd === 'start') {
          this.formData.team_due_date_start = val;
        } else {
          this.formData.team_due_date_end = val;
        }
      }
      //label-due date
      if (dueDateType === 'label-due-date') {
        if (startOrEnd === 'start') {
          this.formData.label_due_date_start = val;
        } else {
          this.formData.label_due_date_end = val;
        }
      }
      //simulation-team-due-date
      if (dueDateType === 'simulation-team-due-date') {
        if (startOrEnd === 'start') {
          this.formData['simulation_team_due_date_start'] = val;
        } else {
          this.formData['simulation_team_due_date_end'] = val;
        }
      }
      //simulation-inner-date
      if (dueDateType === 'simulation-due-date') {
        if (startOrEnd === 'start') {
          this.formData['simulation_inner_date_start'] = val;
        } else {
          this.formData['simulation_inner_date_end'] = val;
        }
      }
      //3d team due date
      if (dueDateType === '3d-team-due-date') {
        if (startOrEnd === 'start') {
          this.formData['3d_team_due_date_start'] = val;
        } else {
          this.formData['3d_team_due_date_end'] = val;
        }
      }
      //3d-internal-due-date
      if (dueDateType === '3d-internal-due-date') {
        if (startOrEnd === 'start') {
          this.formData['3d_inner_date_start'] = val;
        } else {
          this.formData['3d_inner_date_end'] = val;
        }
      }
    },
    getWholeUserList() {
      userList()
        .then((res) => {
          if (res.code === 200) {
            let pageNum = res.data.total / res.data.per_page;
            this.totalUserPage = Math.ceil(pageNum);
            this.creatorList = res.data.data;
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
    filterBiddingProjects() {
      this.$emit('on-filter', { ...this.formData }, this.filterFieldSelected);
      this.$store.dispatch(
        'app/changeProjectFilterNum',
        this.filterFieldSelected
      );
      this.filterNum = this.$store.state.app.projectFilterNum;
      //暂存projectList页面中的filter
      this.$store.dispatch('app/storeProjectFilter', this.formData);
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
    //获取销售列表
    async getSalesList() {
      await salesList()
        .then((res) => {
          if (res.code === 200) {
            this.salesOptions = res.data;
          } else {
            // this.$message.error(res.message);
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
        project: '',
        sales: '',
        customer: '',
        projectStatus: '',
        quoteStatus: '',
        quoteDueDateStart: '',
        quoteDueDateEnd: '',
        inner_date_start: '',
        inner_date_end: '',
        team_due_date_start: '',
        team_due_date_end: '',
        sizeFrom: undefined,
        sizeTo: undefined,
        creationTimeFrom: '',
        creationTimeTo: '',
        solution: '',
        simulation_team_id: '',
        team_id: '',
        archiving: '',
        label_status: '',
        label_solution: '',
        label_team: '',
        label_due_date_start: '',
        label_due_date_end: '',
        '3d_inner_date_start': '',
        '3d_inner_date_end': '',
        '3d_team_due_date_start': '',
        '3d_team_due_date_end': '',
        simulation_inner_date_start: '',
        simulation_inner_date_end: ''
      };
      this.customerDueDate = [];
      this.internalDueDate = [];
      this.creationTime = [];
      this.teamDueDate = [];
      this.labelDueDate = [];
      this.simulationDueDate = [];
      this.simulationTeamDueDate = [];
      this.d3TeamDueDate = [];
    }
  }
};
</script>

<style lang="less" scoped>
.bidding-project-filter {
  margin-left: 25px;

  .submit-btns {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    margin-right: 68px;
  }
}
</style>
