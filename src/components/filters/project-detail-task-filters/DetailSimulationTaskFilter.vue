<template>
  <div class="label-task-filter">
    <el-form
      ref="formProject"
      :model="formData"
      label-width="140px"
      :inline="true"
    >
      <el-col
        :span="6"
        style="padding-top: 6px"
      >
        <el-form-item
          label="Title"
          size="mini"
        >
          <el-input
            v-model="formData.title"
            size="small"
            style="width: 200px"
            clearable
            placeholder="Enter project to search"
          />
        </el-form-item>
        <el-form-item label="Phase">
          <el-input
            v-model="formData.phase"
            size="small"
            style="width: 200px"
            clearable
            placeholder="Enter project to search"
          />
        </el-form-item>
        <el-form-item
          label="Simulation due date"
          label-width="138px"
        >
          <DataRangePicker
            v-model="simulationDuedate"
            type="simulation-due-date"
            input-width="90px"
            @input-start-date="addDate"
            @input-end-date="addDate"
          />
        </el-form-item>
      </el-col>
      <el-col :span="6">
        <el-form-item label="Project name">
          <el-input
            v-model="formData.project_name"
            disabled
            size="small"
            style="width: 200px"
            clearable
            placeholder="Enter project to search"
          />
        </el-form-item>
        <el-form-item label="Solution">
          <el-select
            v-model="formData.solution"
            filterable
            clearable
            placeholder="Please input and select"
            size="small"
            style="width: 200px"
          >
            <el-option
              v-for="item in solutionOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item>
        <el-form-item
          label="Simulation team due date"
          label-width="180px"
        >
          <DataRangePicker
            v-model="simulationTeamDuedate"
            type="simulation-team-due-date"
            input-width="75px"
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
            style="width: 200px"
            clearable
            placeholder="Enter project to search"
          />
        </el-form-item>
        <el-form-item label="Simulation team">
          <el-select
            v-model="formData.team_id"
            filterable
            clearable
            placeholder="Please input and select"
            size="small"
            style="width: 200px"
          >
            <el-option
              v-for="item in teamOptions"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="Creation date">
          <DataRangePicker
            v-model="creationTime"
            input-width="95px"
            type="creation-date"
            @input-start-date="addDate"
            @input-end-date="addDate"
          />
        </el-form-item>
      </el-col>
      <el-col :span="6">
        <el-form-item label="Phase No.">
          <el-input
            v-model="formData.progress_no"
            size="small"
            style="width: 200px"
            clearable
            placeholder="Enter project to search"
          />
        </el-form-item>
        <el-form-item label="Simulation status">
          <el-select
            v-model="formData.progress_status"
            filterable
            clearable
            placeholder="Please input and select"
            size="small"
            style="width: 200px"
          >
            <el-option
              v-for="item in simulationStatusOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="Creator">
          <el-select
            v-model="formData.creator"
            filterable
            clearable
            placeholder="Please input and select"
            size="small"
            style="width: 200px"
          >
            <el-option
              v-for="(item, key) in creatorList"
              :key="key"
              :label="item.name"
              :value="item.id"
            />
          </el-select>
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
    </el-form>
  </div>
</template>
  
  <script>
  import DataRangePicker from '../components/DateRangePicker.vue';
  import { SIMULATION_STATUS_LIST } from '@/utils/constants';
  
  import { customerAll, teamList, salesList, userList } from '@/api/index.js';
  
  export default {
    components: {
      DataRangePicker
    },
    data() {
      return {
        simulationDuedate: [],
        simulationTeamDuedate: [],
        formData: {
          type: '',
          status: '',
          title: '',
          project: '',
          progress: '',
          progress_status: '',
          team_id: '',
          due_date_start: '',
          due_date_end: '',
          inner_date_start: '',
          inner_date_end: '',
          team_due_date_start: '',
          team_due_date_end: '',
          creation_date_start: '',
          creation_date_end: '',
          solution: '',
          completer: '',
          completed_date_start: '',
          completed_date_end: '',
          progress_no: ''
        },
        customerDueDate: [],
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
        simulationStatusOptions: SIMULATION_STATUS_LIST,
  
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
        let num = Object.values(this.formData).filter(
          (value) => {return value !== '' && value !== undefined && value !== null}
        ).length;
        return num;
      }
    },
    created() {
      this.getCustomers();
      this.getTeamData();
      this.getSalesList();
      this.getWholeUserList();
      this.getStoredFilter();
      this.resetForm();
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
        //creation date
        if (dueDateType === 'creation-date') {
          if (startOrEnd === 'start') {
            this.formData.creation_date_start = val;
          } else {
            this.formData.creation_date_end = val;
          }
        }
        //simulation team due date
        if (dueDateType === 'simulation-team-due-date') {
          if (startOrEnd === 'start') {
            this.formData.team_due_date_start = val;
          } else {
            this.formData.team_due_date_end = val;
          }
        }
        // simulation due date
        if (dueDateType === 'simulation-due-date') {
          if (startOrEnd === 'start') {
            this.formData.inner_date_start = val;
          } else {
            this.formData.inner_date_end = val;
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
            return err
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
      //       return err
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
            return err
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
            return err
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
            return err
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
          team_id: '',
          archiving: ''
        };
        this.simulationDuedate = [];
        this.simulationTeamDuedate = [];
        this.creationTime = [];
      }
    }
  };
  </script>
  
  <style lang="less" scoped>
  .label-task-filter {
    margin-left: 25px;
    
    .submit-btns {
      display: flex;
      align-items: center;
      justify-content: flex-end;
      margin-right: 40px;
      margin-bottom: 25px;
    }
  }
  </style>
  