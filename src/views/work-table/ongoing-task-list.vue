<template>
  <div class="ongoing-task-list-wrapper">
    <div class="filter-area">
      <transition
        name="fade"
        mode="out-in"
      >
        <TableFilterV2
          v-show="showFilter"
          ref="on-going-task-filter"
          class="filter-area"
          filter-name="OngoingTasksFilter"
          style="margin-left: 15px"
          @on-filter="handleFilter"
        />
      </transition>
    </div>
    <div class="title-row">
      <div class="title">
        Ongoing tasks
      </div>
      <div
        class="return-btn"
        @click="$router.push({ name: 'WorkOverview', query: { from: 'list' } })"
      >
        <i
          class="el-icon-back"
          i
        >
          <span>Return</span>
        </i>
      </div>
    </div>
    <div class="operation-row">
      <div class="icons">
        <TogglableSearchBar
          placeholder="Enter to search"
          @on-search="handleOnSearch"
        />
        <div
          style="display: flex; align-items: center; padding-top: 3px"
          @click="toggleFilterDisplay"
        >
          <el-badge
            v-if="filterNum !== 0"
            :value="filterNum"
          >
            <FilterIcon />
          </el-badge>
          <FilterIcon v-else />
        </div>
      </div>
      <div
        class="export-btn"
        @click="handleDownload"
      >
        <i class="el-icon-download" />
        <span>Excel</span>
      </div>
    </div>
    <div class="table-wrapper">
      <el-table
        :data="tableData"
        :table-key="tableKey"
        border
      >
        <!-- Category -->
        <el-table-column>
          <template slot="header">
            <div style="display: flex; align-items: center">
              <el-popover
                placement="bottom-start"
                width="220"
                popper-class="el-popover-self"
                trigger="hover"
                :visible-arrow="false"
              >
                <span
                  slot="reference"
                >Category</span>
                <FastFilter
                  fast-filter-type="SelectFastFilter"
                  :options="categoryOptions"
                  filter-for="category"
                  @fast-filter="handleFastFilter"
                />
              </el-popover>
              <!-- <Sorter
                ref="ongoing_task_category"
                sorter-type="ongoing_task_category"
                sort-by="category"
                @on-sort="handleSort"
              /> -->
              <FastFilteredIcon
                ref="fast_filtered_icon_ongoing_task_category"
                @cancel="handleCancelFastFilter"
              />
            </div>
          </template>
          <template slot-scope="scope">
            <div
              class="row-title"
              style="display: flex; align-items: center; gap: 5px"
            >
              <div style="flex: 1">
                <el-tooltip
                  :content="scope.row.category"
                  placement="top-start"
                >
                  <p
                    v-if="scope.row.category"
                  >
                    {{ scope.row.category }}
                  </p>
                </el-tooltip>
              </div>
            </div>
          </template>
        </el-table-column>
        <!-- Task title -->
        <el-table-column>
          <template slot="header">
            <div style="display: flex; align-items: center">
              <el-popover
                placement="bottom-start"
                width="220"
                popper-class="el-popover-self"
                trigger="hover"
                :visible-arrow="false"
              >
                <span
                  slot="reference"
                >Task title</span>
                <FastFilter
                  fast-filter-type="InputFastFilter"
                  filter-for="title"
                  @fast-filter="handleFastFilter"
                />
              </el-popover>
              <!-- <Sorter
                ref="ongoing_task_title"
                sorter-type="ongoing_task_title"
                sort-by="title"
                @on-sort="handleSort"
              /> -->
              <FastFilteredIcon
                ref="fast_filtered_icon_ongoing_task_title"
                @cancel="handleCancelFastFilter"
              />
            </div>
          </template>
          <template slot-scope="scope">
            <div
              class="row-title"
              style="display: flex; align-items: center; gap: 5px"
            >
              <div style="flex: 1">
                <el-tooltip
                  :content="scope.row.title"
                  placement="top-start"
                >
                  <p
                    v-if="scope.row.title"
                    class="clickable"
                    @click="linkTo(scope.row)"
                  >
                    {{ scope.row.title }}
                  </p>
                </el-tooltip>
              </div>
            </div>
          </template>
        </el-table-column>
        <!-- Task recipient -->
        <el-table-column>
          <template slot="header">
            <div style="display: flex; align-items: center">
              <el-popover
                placement="bottom-start"
                width="220"
                popper-class="el-popover-self"
                trigger="hover"
                :visible-arrow="false"
              >
                <span
                  slot="reference"
                >Task recipient</span>
                <FastFilter
                  fast-filter-type="SelectFastFilter"
                  :options="receiverOptions"
                  filter-for="receiver"
                  @fast-filter="handleFastFilter"
                />
              </el-popover>
              <!-- <Sorter
                ref="ongoing_task_receiver"
                sorter-type="ongoing_task_receiver"
                sort-by="receiver"
                @on-sort="handleSort"
              /> -->
              <FastFilteredIcon
                ref="fast_filtered_icon_ongoing_task_receiver"
                @cancel="handleCancelFastFilter"
              />
            </div>
          </template>
          <template slot-scope="scope">
            <div
              class="row-title"
              style="display: flex; align-items: center; gap: 5px"
            >
              <div style="flex: 1">
                <el-tooltip
                  :content="scope.row.receiver_name"
                  placement="top-start"
                >
                  <p
                    v-if="scope.row.receiver_name"
                  >
                    {{ scope.row.receiver_name }}
                  </p>
                </el-tooltip>
              </div>
            </div>
          </template>
        </el-table-column>
        <!-- Due date -->
        <el-table-column>
          <template slot="header">
            <div style="display: flex; align-items: center">
              <el-popover
                placement="bottom-start"
                width="220"
                popper-class="el-popover-self"
                trigger="hover"
                :visible-arrow="false"
              >
                <span
                  slot="reference"
                >Due date</span>
                <FastFilter
                  fast-filter-type="DateRangeFastFilter"
                  filter-for="due_date"
                  @fast-filter="handleFastFilter"
                />
              </el-popover>
              <!-- <Sorter
                ref="ongoing_task_duedate"
                sorter-type="ongoing_task_duedate"
                sort-by="due_date"
                @on-sort="handleSort"
              /> -->
              <FastFilteredIcon
                ref="fast_filtered_icon_ongoing_task_duedate"
                @cancel="handleCancelFastFilter"
              />
            </div>
          </template>
          <template slot-scope="scope">
            <div
              class="row-title"
              style="display: flex; align-items: center; gap: 5px"
            >
              <div style="flex: 1">
                <p
                  v-if="scope.row.due_date"
                >
                  {{ scope.row.due_date }}
                </p>
              </div>
            </div>
          </template>
        </el-table-column>
        <!-- Project No. -->
        <el-table-column>
          <template slot="header">
            <div style="display: flex; align-items: center">
              <el-popover
                placement="bottom-start"
                width="220"
                popper-class="el-popover-self"
                trigger="hover"
                :visible-arrow="false"
              >
                <span
                  slot="reference"
                >Project No.</span>
                <FastFilter
                  fast-filter-type="InputFastFilter"
                  filter-for="project_no"
                  @fast-filter="handleFastFilter"
                />
              </el-popover>
              <!-- <Sorter
                ref="ongoing_task_project_no"
                sorter-type="ongoing_task_project_no"
                sort-by="project_no"
                @on-sort="handleSort"
              /> -->
              <FastFilteredIcon
                ref="fast_filtered_icon_ongoing_task_project_no"
                @cancel="handleCancelFastFilter"
              />
            </div>
          </template>
          <template slot-scope="scope">
            <div
              class="row-title"
              style="display: flex; align-items: center; gap: 5px"
            >
              <div style="flex: 1">
                <p
                  v-if="scope.row.project_no"
                >
                  {{ scope.row.project_no }}
                </p>
              </div>
            </div>
          </template>
        </el-table-column>
        <!-- Project name -->
        <el-table-column>
          <template slot="header">
            <div style="display: flex; align-items: center">
              <el-popover
                placement="bottom-start"
                width="220"
                popper-class="el-popover-self"
                trigger="hover"
                :visible-arrow="false"
              >
                <span
                  slot="reference"
                >Project name</span>
                <FastFilter
                  fast-filter-type="InputFastFilter"
                  filter-for="project_name"
                  @fast-filter="handleFastFilter"
                />
              </el-popover>
              <!-- <Sorter
                ref="ongoing_task_project_name"
                sorter-type="ongoing_task_project_name"
                sort-by="project_name"
                @on-sort="handleSort"
              /> -->
              <FastFilteredIcon
                ref="fast_filtered_icon_ongoing_task_project_name"
                @cancel="handleCancelFastFilter"
              />
            </div>
          </template>
          <template slot-scope="scope">
            <div
              class="row-title"
              style="display: flex; align-items: center; gap: 5px"
            >
              <div style="flex: 1">
                <el-tooltip
                  :content="scope.row.project_name"
                  placement="top-start"
                >
                  <p
                    v-if="scope.row.project_name"
                  >
                    {{ scope.row.project_name }}
                  </p>
                </el-tooltip>
              </div>
            </div>
          </template>
        </el-table-column>
        <!-- Phase -->
        <el-table-column>
          <template slot="header">
            <div style="display: flex; align-items: center">
              <el-popover
                placement="bottom-start"
                width="220"
                popper-class="el-popover-self"
                trigger="hover"
                :visible-arrow="false"
              >
                <span
                  slot="reference"
                >Phase</span>
                <FastFilter
                  fast-filter-type="SelectFastFilter"
                  :options="phaseOptions"
                  filter-for="phase"
                  @fast-filter="handleFastFilter"
                />
              </el-popover>
              <!-- <Sorter
                ref="ongoing_task_phase"
                sorter-type="ongoing_task_phase"
                sort-by="phase"
                @on-sort="handleSort"
              /> -->
              <FastFilteredIcon
                ref="fast_filtered_icon_ongoing_task_phase"
                @cancel="handleCancelFastFilter"
              />
            </div>
          </template>
          <template slot-scope="scope">
            <div
              class="row-title"
              style="display: flex; align-items: center; gap: 5px"
            >
              <div style="flex: 1">
                <p
                  v-if="scope.row.phase"
                >
                  {{ scope.row.phase }}
                </p>
              </div>
            </div>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="pagination-wrapper">
      <NormalPagination
        :current-page="pageInfo.page"
        :total-rows="totalRows"
        :page-size="pageInfo.limit"
        @page-change="handlePageChange"
        @page-size-change="handlePageSizeChange"
      />
    </div>
    <el-drawer
      :visible.sync="taskDetailVisible"
      :with-header="false"
      size="1440px"
      :show-close="true"
      :destroy-on-close="isClose"
      append-to-body
      @close="close"
    >
      <task-detail
        :task-detail="taskDetailData"
        @close-drawer="closeTaskDetailDrawer"
        @open-drawer="showTaskDetailDrawer"
      />
    </el-drawer>
  </div>
</template>

<script>
import TableFilterV2 from '@/components/filters/TableFilterV2.vue';
import FilterIcon from '@/components/filters/FilterIcon.vue';
import TogglableSearchBar from '@/components/common/TogglableSearchBar.vue';
// import Sorter from '@/views/project/components/Sorter.vue';
import FastFilter from '@/views/project/components/FastFilter.vue';
import FastFilteredIcon from '@/views/project/components/FastFilteredIcon.vue';
import NormalPagination from '@/components/NormalPagination.vue';
import { getOngoingTaskList, exportListData, userList, getCustomTaskDetail } from '@/api';
import TaskDetail from './components/task-detail.vue';
import {PHASE_VALUES} from '@/utils/constants';
import dayjs from 'dayjs';

export default {
  name: '',
  components: {
    TableFilterV2,
    TogglableSearchBar,
    FilterIcon,
    FastFilter,
    FastFilteredIcon,
    NormalPagination,
    TaskDetail
  },
  props: {},
  data() {
    return {
      //others task drawer
      taskDetailData: {},
      taskDetailVisible: false,
      isClose: true,
      // **************************
      currentPage: 1,
      fastFilterIcons:[
      'fast_filtered_icon_ongoing_task_category',
      'fast_filtered_icon_ongoing_task_title',
      'fast_filtered_icon_ongoing_task_receiver',
      'fast_filtered_icon_ongoing_task_duedate',
      'fast_filtered_icon_ongoing_task_project_no',
      'fast_filtered_icon_ongoing_task_project_name',
      'fast_filtered_icon_ongoing_task_phase'
      ],
      sorterRefs:[
      'ongoing_task_category',
'ongoing_task_title',
'ongoing_task_receiver',
'ongoing_task_duedate',
'ongoing_task_project_no',
'ongoing_task_project_name',
'ongoing_task_phase'
      ],
      tableKey: 1,
      categoryOptions: [
        {label: 'Quote', value: 1},
        {label: 'Label', value: 2},
        {label: '3D calculation', value: 3},
        {label: '3D simulation', value: 4},
        {label: 'Others', value: 5}
      ],
      receiverOptions: [],
      phaseOptions: PHASE_VALUES,
      fastFilteredIconName: '',
      showFilter: false,
      filterNum: 0,
      totalTasks: 58,
      tableData: [],
      filterForm: {
        category:'',
        receiver:'',
        due_date_start:'',
        due_date_end:'',
        search:'',
        phase:'',
        title:''
      },
      pageInfo: {
        page: 1,
        limit: 20
      },
      sort: {
        order: '',
        orderBy: ''
      },
      totalRows: 0
    };
  },
  computed: {},
  watch: {},
  mounted() {
    this.getTableData(); 
  },
  created () {
    this.getUserList();
  },
  methods: {
    // v0.9.0 自定义任务跳转
    close() {
      // this.taskDetailVisible = false;
      this.isClose = true;
    },
    closeTaskDetailDrawer() {
      this.taskDetailVisible = false;
      this.isClose = false;
    },
    showTaskDetailDrawer() {
      this.taskDetailVisible = true;
    },
    // *********************************
    linkTo(task) {
      let taskType = task.category || '';
      let taskId = task.id || '';
      let projectId = task.project_id || '';
      let isBidding = task.is_bidding || 1;

      switch(taskType) {
        case 'Quote':
        if(isBidding === 1) {
          this.$router.push(`/index/project/bidding/detail/phase/${projectId}`)
        }
        if(isBidding === 0) {
          this.$router.push(`/index/project/formal/detail/phase/${projectId}`)
        }
        break;
        case 'Label':
        if(isBidding === 1) {
          this.$router.push(`/index/project/bidding/detail/label&sim/${projectId}`)
        }
        if(isBidding === 0) {
          this.$router.push(`/index/project/bidding/detail/label&sim/${projectId}`)
        }
        break;
        case '3D calculation':
        if(isBidding === 1) {
          this.$router.push(`/index/project/bidding/detail/phase/${projectId}`)
        }
        if(isBidding === 0) {
          this.$router.push(`/index/project/formal/detail/phase/${projectId}`)
        }
        break;
        case '3D simulation':
        if(isBidding === 1) {
          this.$router.push(`/index/project/bidding/detail/label&sim/${projectId}`)
        }
        if(isBidding === 0) {
          this.$router.push(`/index/project/bidding/detail/label&sim/${projectId}`)
        }
        break;
        case 'Others':
        getCustomTaskDetail({id: taskId}).then((res) => {
        if (res.code === 200) {
          this.taskDetailData = res.data;
          this.taskDetailVisible = true;
        }
      });
          break;
        default: return
      }
    },
    getUserList() {
      let users = [];
userList().then((res) => {
  if (res.code === 200) {
    users = res.data.data;
  }
  users.forEach((user) => {
    this.receiverOptions.push({label: user.name, value: user.id});
  });
}).catch((err) => {return err});
    },
    handlePageChange(page) { 
      this.pageInfo.page = page;
      this.getTableData(); 
    },
    handlePageSizeChange(pageSize) {
      this.pageInfo.limit = pageSize;
      this.getTableData(); 
    },
    toggleFilterDisplay() {
      this.showFilter = !this.showFilter;
    },
    handleOnSearch(val) {
      this.$refs['on-going-task-filter'].resetFilterForm();
      this.filterNum = 0;
      this.showFilter = false;
      this.filterForm.search = val;
      this.pageInfo.page = 1;
      this.getTableData(); 
    },
    handleFilter(formData, filterNum) {
      this.filterForm = { ...formData };
      this.pageInfo.page = 1;
      this.filterNum = filterNum;
      this.getTableData(); 
    },
    //表头的快捷筛选相关操作
    handleFastFilter(val, filterType, filterFor) {
      if (this.$refs['on-going-task-filter']) {
        this.$refs['on-going-task-filter'].resetFilterForm();
        this.showFilter = false;
        this.filterNum = 0;
      }
      let content = ''
      let formData = {
        category: undefined,
        receiver: undefined,
        due_date_start: '',
        due_date_end: '',
        search: '',
        phase: undefined,
        title: ''
      };
      switch (filterFor) {
        case 'category':
          formData.category = val.value;
          content = val.label;
          this.fastFilteredIconName =
            'fast_filtered_icon_ongoing_task_category';
          break;
        case 'title':
          formData.title = val;
          content = val;
          this.fastFilteredIconName =
            'fast_filtered_icon_ongoing_task_title';
          break;
        case 'receiver':
          formData.category = val.value;
          content = val.label;
          this.fastFilteredIconName =
            'fast_filtered_icon_ongoing_task_receiver';
          break;
        case 'due_date':
          [formData.due_date_start, formData.due_date_end] = val
          // eslint-disable-next-line no-param-reassign
          content = `${val[0]} to ${val[1]}`;
          this.fastFilteredIconName =
            'fast_filtered_icon_ongoing_task_duedate';
          break;
        case 'project_no':
          formData.search = val;
          content = val;
          this.fastFilteredIconName = 
            'fast_filtered_icon_ongoing_task_project_no';
          break;
        case 'project_name':
          formData.search = val;
          content = val;
          this.fastFilteredIconName =
            'fast_filtered_icon_ongoing_task_project_name';
          break;
        case 'phase':
          formData.phase = val.value;
          content = val.label;
          this.fastFilteredIconName =
            'fast_filtered_icon_ongoing_task_phase';
          break;
        default:
          break;
      }
      this.filterForm = { ...formData };
      this.pageInfo.page = 1;
      this.fastFilteredContent = content;
          this.showFastFilterIcon();
      this.getTableData();
    },
    showFastFilterIcon() {
      this.fastFilterIcons.forEach((item) => {
        let that = this;
        if (item === this.fastFilteredIconName) {
          this.$refs[item].applyContent(that.fastFilteredContent);
          this.$refs[item].show();
        }
        if (item !== this.fastFilteredIconName) {
          if (this.$refs[item]) {
            this.$refs[item].hide();
          }
        }
      });
    },
    handleSort(order, sorterType, sortBy) {
      this.sort.order = order;
      this.sort.orderBy = order ? sortBy : '';
      this.clearOtherSorterStyle(sorterType);
      this.filterForm = {...this.filterForm, ...this.sort}
      this.getTableData(); 
    },
    clearOtherSorterStyle(currentSorterType) {
      this.sorterRefs.forEach((item) => {
        if (this.$refs[item] && item !== currentSorterType) {
          this.$refs[item].reset();
        }
      });
    },
    handleCancelFastFilter() {
      if (this.$refs[this.fastFilteredIconName]) {
        this.$refs[this.fastFilteredIconName].hide();
      }
      this.filterForm = {};
      this.pageInfo.page = 1;
      this.getTableData(); 
    },
    getTableData() {
      let params = { ...this.filterForm, ...this.pageInfo };
      getOngoingTaskList(params)
        .then((res) => {
          if (res.code === 200) {
            this.tableKey++;
            this.tableData = res.data.list || [];
            this.totalRows = res.data.total || 0
          }
        })
        .catch((err) => {
          return err;
        });
    },
    handleDownload() {
      let {due_date_start, due_date_end} = this.filterForm;
      due_date_start = dayjs(due_date_start);
      due_date_end = dayjs(due_date_end);
      let monthDiff = due_date_end.diff(due_date_start, 'month', true);
      if (monthDiff > 2) {
        this.$message.error('Time span should be no more than 2 months');
        return
      }
      let params = { ...this.filterForm };
      for (const key in params) {
    if (Object.prototype.hasOwnProperty.call(params, key) && params[key] === undefined) {
      params[key] = '';
    }
  }
      exportListData(this, params, '/api/dashboard/ongoing-tasks/list/download');
    }
    // ********************************************
  }
};
</script>
<style lang="less" scoped>
.ongoing-task-list-wrapper /deep/ .el-table--border {
  border-radius: 4px;
}

.ongoing-task-list-wrapper {
  /deep/ .el-table--border .el-table__cell:first-child .cell {
    padding: 6px;
  }
}

.clickable {
  cursor: pointer;
  &:hover {
    text-decoration: underline;
    color: #007BFF
  }
}

.ongoing-task-list-wrapper {
  width: calc(100% - 8px);
  height: calc(100vh - 8rem);
  margin-bottom: 48px;
  overflow-y: auto;
  background: #ffffff;
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;

  .pagination-wrapper {
    position: absolute;
    bottom: -5px;
    right: 8px;
    width: 100vw;
    z-index: 99;
    border-top: 1px solid #ebeef5;
    border-bottom: 1px solid #ebeef5;
    background-color: #ffffff;
  }

  .title-row {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 12px 16px;
    .title {
      font-size: 18px;
      color: #303133;
    }
    .return-btn {
      font-size: 16px;
      color: #007bff;
      cursor: pointer;
    }
  }
  .operation-row {
    display: flex;
    justify-content: flex-end;
    padding-right: 16px;
    gap: 24px;

    .icons {
      display: flex;
      align-items: center;
      gap: 10px;
    }

    .export-btn {
      width: 76px;
      height: 30px;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 4px;
      background: #ffffff;
      border-radius: 4px 4px 4px 4px;
      border: 1px solid #007bff;
      font-weight: 400;
      font-size: 14px;
      color: #007bff;
      cursor: pointer;

      i {
        font-size: 16px;
      }
    }
  }
  .table-wrapper {
    padding: 12px 16px;
    margin-bottom: 45px;
    // position: relative;
  }
}
</style>
