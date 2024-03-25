<!-- eslint-disable no-param-reassign -->
<template>
  <div class="performance-appraisal-table-container">
    <div class="filter-area">
      <transition
        name="fade"
        mode="out-in"
      >
        <TableFilterV2
          v-if="showFilter"
          ref="tableFilter"
          class="filter-area"
          :filter-name="computedFilterName"
          style="margin-left: 15px"
          @on-filter="handleFilter"
        />
      </transition>
    </div>
    <div class="table-header-lv1">
      <span class="task-text">Task</span>
      <div
        class="return-wrapper"
        @click="goBackToChart"
      >
        <i class="el-icon-back" />
        <span>Return</span>
      </div>
    </div>
    <div class="table-header-lv2">
      <div class="tabs-wrapper">
        <div
          v-for="tab in performanceAppraisalTabs"
          :key="tab.id"
          :class="['content-tab', { active: tab.id === tabActive }]"
          @click="handleChooseTab(tab)"
        >
          <span class="tab-title">{{ tab.title }}</span>
        </div>
      </div>
      <div class="content-operations">
        <TogglableSearchBar 
          :placeholder="'Enter to search'"
          @on-search="handleSearch" 
        />
        <div
          class="filter-icon"
          @click="toggleFilterDisplay"
        >
          <el-badge
            v-if="filterNum != 0"
            :value="filterNum"
          >
            <FilterIcon />
          </el-badge>
          <FilterIcon v-else />
        </div>
        <div
          class="excel-download-btn"
          @click="downloadExcel"
        >
          <i class="el-icon-download" />
          <span>Excel</span>
        </div>
      </div>
    </div>
    <div class="table-wrapper">
      <el-table
        v-if="tableType == 1"
        :data="tableData"
        border
        width="100%"
      >
        <!-- Role -->
        <el-table-column :min-width="80">
          <template slot="header">
            <div style="display: flex; align-items: center">
              <el-popover
                ref="performanceRolePopover"
                placement="bottom-start"
                width="180"
                popper-class="el-popover-self"
                trigger="hover"
                :visible-arrow="false"
              >
                <span
                  slot="reference"
                  class="column-on-hover"
                  @click="closePopover"
                >Role</span>
                <FastFilter
                  fast-filter-type="SelectFastFilter"
                  filter-for="role"
                  :options="roleOptions"
                  @fast-filter="handleFastFilter"
                />
              </el-popover>
              <Sorter
                ref="performance_role_sorter"
                sorter-type="performance_role_sorter"
                sort-by="user_role"
                @on-sort="handleSort"
              />
              <FastFilteredIcon
                ref="fast_filtered_icon_performance_role"
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
                <p>{{ scope.row.user_role }}</p>
              </div>
            </div>
          </template>
        </el-table-column>
        <!-- Name -->
        <el-table-column :min-width="80">
          <template slot="header">
            <div style="display: flex; align-items: center">
              <el-popover
                ref="performanceNamePopover"
                placement="bottom-start"
                width="220"
                popper-class="el-popover-self"
                trigger="hover"
                :visible-arrow="false"
              >
                <span
                  slot="reference"
                  class="column-on-hover"
                  @click="closePopover"
                >Name</span>
                <FastFilter
                  fast-filter-type="InputFastFilter"
                  filter-for="name"
                  @fast-filter="handleFastFilter"
                />
              </el-popover>
              <Sorter
                ref="performance_name_sorter"
                sorter-type="performance_name_sorter"
                sort-by="user_name"
                @on-sort="handleSort"
              />
              <FastFilteredIcon
                ref="fast_filtered_icon_performance_name"
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
                <p>{{ scope.row.user_name }}</p>
              </div>
            </div>
          </template>
        </el-table-column>
        <!-- Due date -->
        <el-table-column :min-width="100">
          <template slot="header">
            <div style="display: flex; align-items: center">
              <el-popover
                ref="performanceDuedatePopover"
                placement="bottom-start"
                width="220"
                popper-class="el-popover-self"
                trigger="hover"
                :visible-arrow="false"
              >
                <span
                  slot="reference"
                  class="column-on-hover"
                  @click="closePopover"
                >Due date</span>
                <FastFilter
                  fast-filter-type="DateRangeFastFilter"
                  filter-for="duedate"
                  @fast-filter="handleFastFilter"
                />
              </el-popover>
              <Sorter
                ref="performance_duedate_sorter"
                sorter-type="performance_duedate_sorter"
                sort-by="due_date"
                @on-sort="handleSort"
              />
              <FastFilteredIcon
                ref="fast_filtered_icon_performance_duedate"
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
                <p>{{ scope.row.work_due_date }}</p>
              </div>
            </div>
          </template>
        </el-table-column>
        <!-- submit time -->
        <el-table-column :min-width="120">
          <template slot="header">
            <div style="display: flex; align-items: center">
              <el-popover
                ref="performanceTeamSubmitTimePopover"
                placement="bottom-start"
                width="220"
                popper-class="el-popover-self"
                trigger="hover"
                :visible-arrow="false"
              >
                <span
                  slot="reference"
                  class="column-on-hover"
                  @click="closePopover"
                >Submit time</span>
                <FastFilter
                  fast-filter-type="DateRangeFastFilter"
                  filter-for="submit_time"
                  @fast-filter="handleFastFilter"
                />
              </el-popover>
              <Sorter
                ref="performance_submit_time_sorter"
                sorter-type="performance_submit_time_sorter"
                sort-by="completed_at"
                @on-sort="handleSort"
              />
              <FastFilteredIcon
                ref="fast_filtered_icon_performance_team_submit_time"
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
                <p>{{ scope.row.completed_at }}</p>
              </div>
            </div>
          </template>
        </el-table-column>
        <!-- Overdue or not -->
        <el-table-column :min-width="90">
          <template slot="header">
            <div style="display: flex; align-items: center">
              <el-popover
                ref="performanceOverdueOrNotPopover"
                placement="bottom-start"
                width="180"
                popper-class="el-popover-self"
                trigger="hover"
                :visible-arrow="false"
              >
                <span
                  slot="reference"
                  class="column-on-hover"
                  @click="closePopover"
                >Overdue or not</span>
                <FastFilter
                  fast-filter-type="SelectFastFilter"
                  filter-for="overdue_or_not"
                  :options="yesOrNoOptions"
                  @fast-filter="handleFastFilter"
                />
              </el-popover>
              <Sorter
                ref="performance_overdue_or_not_sorter"
                sorter-type="performance_overdue_or_not_sorter"
                sort-by="is_overdue"
                @on-sort="handleSort"
              />
              <FastFilteredIcon
                ref="fast_filtered_icon_performance_overdue_or_not"
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
                <el-tag :type="isOverdueType(scope.row.is_overdue)">
                  {{
                    scope.row.is_overdue == 1 ? 'Yes' : 'No'
                  }}
                </el-tag>
              </div>
            </div>
          </template>
        </el-table-column>
        <!-- Overdue time -->
        <el-table-column :min-width="110">
          <template slot="header">
            <div style="display: flex; align-items: center">
              <el-popover
                ref="performanceOverdueTimePopover"
                placement="bottom-start"
                width="220"
                popper-class="el-popover-self"
                trigger="hover"
                :visible-arrow="false"
              >
                <span
                  slot="reference"
                  class="column-on-hover"
                  @click="closePopover"
                >Overdue time</span>
                <FastFilter
                  fast-filter-type="InputFastFilter"
                  filter-for="overdue_time"
                  @fast-filter="handleFastFilter"
                />
              </el-popover>
              <Sorter
                ref="performance_overdue_time_sorter"
                sorter-type="performance_overdue_time_sorter"
                sort-by="overdue_time"
                @on-sort="handleSort"
              />
              <FastFilteredIcon
                ref="fast_filtered_icon_performance_overdue_time"
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
                  :style="{
                    fontSize: 14,
                    color: scope.row.is_overdue == 1 ? '#F56C6C' : '#67C23A'
                  }"
                >
                  {{ computeTimeText(scope.row.overdue_time) }}
                </p>
              </div>
            </div>
          </template>
        </el-table-column>
        <!-- Type -->
        <el-table-column :min-width="80">
          <template slot="header">
            <div style="display: flex; align-items: center">
              <el-popover
                ref="performanceTypePopover"
                placement="bottom-start"
                width="180"
                popper-class="el-popover-self"
                trigger="hover"
                :visible-arrow="false"
              >
                <span
                  slot="reference"
                  class="column-on-hover"
                  @click="closePopover"
                >Type</span>
                <FastFilter
                  fast-filter-type="SelectFastFilter"
                  filter-for="type"
                  :options="typeOptions"
                  @fast-filter="handleFastFilter"
                />
              </el-popover>
              <Sorter
                ref="performance_type_sorter"
                sorter-type="performance_type_sorter"
                sort-by="type"
                @on-sort="handleSort"
              />
              <FastFilteredIcon
                ref="fast_filtered_icon_performance_type"
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
                <p>{{ mapType(scope.row.type) }}</p>
              </div>
            </div>
          </template>
        </el-table-column>
        <!-- Project No. -->
        <el-table-column :min-width="100">
          <template slot="header">
            <div style="display: flex; align-items: center">
              <el-popover
                ref="performanceProjectNoPopover"
                placement="bottom-start"
                width="220"
                popper-class="el-popover-self"
                trigger="hover"
                :visible-arrow="false"
              >
                <span
                  slot="reference"
                  class="column-on-hover"
                  @click="closePopover"
                >Project No.</span>
                <FastFilter
                  fast-filter-type="InputFastFilter"
                  filter-for="project_no"
                  @fast-filter="handleFastFilter"
                />
              </el-popover>
              <Sorter
                ref="performance_project_no_sorter"
                sorter-type="performance_project_no_sorter"
                sort-by="project_no"
                @on-sort="handleSort"
              />
              <FastFilteredIcon
                ref="fast_filtered_icon_performance_project_no"
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
                  class="table-project-clickable-text"
                  @click="
                    goToProject(
                      scope.row.type == 2 ? 'formal' : 'others',
                      scope.row
                    )
                  "
                >
                  {{ scope.row.project_no }}
                </p>
              </div>
            </div>
          </template>
        </el-table-column>
        <!-- Project name -->
        <el-table-column :min-width="110">
          <template slot="header">
            <div style="display: flex; align-items: center">
              <el-popover
                ref="performanceProjectNamePopover"
                placement="bottom-start"
                width="220"
                popper-class="el-popover-self"
                trigger="hover"
                :visible-arrow="false"
              >
                <span
                  slot="reference"
                  class="column-on-hover"
                  @click="closePopover"
                >Project name</span>
                <FastFilter
                  fast-filter-type="InputFastFilter"
                  filter-for="project_name"
                  @fast-filter="handleFastFilter"
                />
              </el-popover>
              <Sorter
                ref="performance_project_name_sorter"
                sorter-type="performance_project_name_sorter"
                sort-by="project_name"
                @on-sort="handleSort"
              />
              <FastFilteredIcon
                ref="fast_filtered_icon_performance_project_name"
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
                  class="table-project-clickable-text"
                  @click="
                    goToProject(
                      scope.row.type == 2 ? 'formal' : 'others',
                      scope.row
                    )
                  "
                >
                  {{ scope.row.project_name }}
                </p>
              </div>
            </div>
          </template>
        </el-table-column>
        <!-- Phase No. -->
        <el-table-column :min-width="90">
          <template slot="header">
            <div style="display: flex; align-items: center">
              <el-popover
                ref="performancePhaseNoPopover"
                placement="bottom-start"
                width="220"
                popper-class="el-popover-self"
                trigger="hover"
                :visible-arrow="false"
              >
                <span
                  slot="reference"
                  class="column-on-hover"
                  @click="closePopover"
                >Phase No.</span>
                <FastFilter
                  fast-filter-type="InputFastFilter"
                  filter-for="phase_no"
                  @fast-filter="handleFastFilter"
                />
              </el-popover>
              <Sorter
                ref="performance_phase_no_sorter"
                sorter-type="performance_phase_no_sorter"
                sort-by="progress_no"
                @on-sort="handleSort"
              />
              <FastFilteredIcon
                ref="fast_filtered_icon_performance_phase_no"
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
                  class="table-project-clickable-text"
                  @click="
                    goToPhase(
                      scope.row.type == 2 ? 'formal' : 'others',
                      scope.row
                    )
                  "
                >
                  {{ scope.row.progress_no }}
                </p>
              </div>
            </div>
          </template>
        </el-table-column>
        <!-- Phase -->
        <el-table-column :min-width="80">
          <template slot="header">
            <div style="display: flex; align-items: center">
              <el-popover
                ref="performancePhasePopover"
                placement="bottom-start"
                width="180"
                popper-class="el-popover-self"
                trigger="hover"
                :visible-arrow="false"
              >
                <span
                  slot="reference"
                  class="column-on-hover"
                  @click="closePopover"
                >Phase</span>
                <FastFilter
                  fast-filter-type="SelectFastFilter"
                  :options="phaseList"
                  filter-for="phase"
                  @fast-filter="handleFastFilter"
                />
              </el-popover>
              <Sorter
                ref="performance_phase_sorter"
                sorter-type="performance_phase_sorter"
                sort-by="phase"
                @on-sort="handleSort"
              />
              <FastFilteredIcon
                ref="fast_filtered_icon_performance_phase"
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
                  class="table-project-clickable-text"
                  @click="
                    goToPhase(
                      scope.row.type == 2 ? 'formal' : 'others',
                      scope.row
                    )
                  "
                >
                  {{ scope.row.phase }}
                </p>
              </div>
            </div>
          </template>
        </el-table-column>
      </el-table>
      <ErrorRateTable
        v-if="tableType == 2"
        ref="errorRateTable"
        :table-data="tableData"
        :fast-filtered-icon-name="fastFilteredIconName"
        :fast-filtered-content="fastFilteredContent"
        @fast-filter="handleFastFilter"
        @on-sort="handleSort"
        @cancel-fast-filter="handleCancelFastFilter"
      />
      <NormalPagination
        :total-rows="totalRows"
        :page-size="pageSize"
        :current-page="currentPage"
        @page-change="handlePageChange"
        @page-size-change="handlePageSizeChange"
      />
    </div>
  </div>
</template>

<script>
import TogglableSearchBar from '@/components/common/TogglableSearchBar.vue';
import NormalPagination from '@/components/NormalPagination.vue';
import FastFilteredIcon from '@/views/project/components/FastFilteredIcon.vue';
import FilterIcon from '@/components/filters/FilterIcon.vue';
import Sorter from '@/views/project/components/Sorter.vue';
import TableFilterV2 from '@/components/filters/TableFilterV2.vue';
import FastFilter from '@/views/project/components/FastFilter.vue';
import ErrorRateTable from './components/ErrorRateTable.vue';
import dayjs from 'dayjs';

import {
  getPerformanceList,
  downloadPerformanceListFile
} from '@/api';
import { getLastDay } from '@/utils/commons.js';

export default {
  components: {
    TogglableSearchBar,
    NormalPagination,
    FilterIcon,
    FastFilter,
    Sorter,
    TableFilterV2,
    FastFilteredIcon,
    ErrorRateTable
  },
  data() {
    return {
      //搜索值
      searchVal: '',
      //从外部进来下钻页面的时候，需要设置role
      toSetRole: true,
      fastFilterFormData: [],
      phaseList: [
        {
          value: 'Site Plan',
          label: 'Site Plan'
        },
        {
          value: '10%',
          label: '10%'
        },
        {
          value: '30%',
          label: '30%'
        },
        {
          value: '50%',
          label: '50%'
        },
        {
          value: '60%',
          label: '60%'
        },
        {
          value: '75%',
          label: '75%'
        },
        {
          value: '90%',
          label: '90%'
        },
        {
          value: 'IFP',
          label: 'IFP'
        },
        {
          value: 'IFC',
          label: 'IFC'
        },
        {
          value: 'IFC Rev1',
          label: 'IFC Rev1'
        },
        {
          value: 'IFC Rev2',
          label: 'IFC Rev2'
        },
        {
          value: 'IFC Rev3',
          label: 'IFC Rev3'
        },
        {
          value: 'IFC Rev4',
          label: 'IFC Rev4'
        },
        {
          value: 'IFC Rev5',
          label: 'IFC Rev5'
        }
      ],
      fastFilteredIconName: '',
      fastFilteredContent: '',
      tableType: 1,
      // userIds: '1',
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
        }
      ],
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
        }
      ],
      yesOrNoOptions: [
        {
          id: 1,
          label: 'Yes',
          value: 1
        },
        {
          id: 2,
          label: 'No',
          value: 0
        }
      ],
      showFilter: false,
      tableData: [],
      filterNum: 0,
      type: 1,
      order: '',
      orderBy: '',
      tabActive: 1,
      pageSize: 20,
      currentPage: 1,
      totalRows: 0,
      performanceAppraisalTabs: [
        {
          id: 1,
          title: 'Overdue rate'
        },
        {
          id: 2,
          title: 'Error rate'
        }
      ],
      fastIconRefs: [
        'fast_filtered_icon_performance_role',
        'fast_filtered_icon_performance_name',
        'fast_filtered_icon_performance_duedate',
        'fast_filtered_icon_performance_team_submit_time',
        'fast_filtered_icon_performance_manager_approve_time',
        'fast_filtered_icon_performance_phase_no',
        'fast_filtered_icon_performance_phase',
        'fast_filtered_icon_performance_type',
        'fast_filtered_icon_performance_overdue_or_not',
        'fast_filtered_icon_performance_overdue_time',
        'fast_filtered_icon_performance_project_name',
        'fast_filtered_icon_performance_project_no'
      ],
      sorterRefs: [
        'performance_role_sorter',
        'performance_name_sorter',
        'performance_duedate_sorter',
        'performance_submit_time_sorter',
        'performance_manager_approve_time_sorter',
        'performance_phase_no_sorter',
        'performance_phase_sorter',
        'performance_type_sorter',
        'performance_overdue_or_not_sorter',
        'performance_overdue_time_sorter',
        'performance_project_name_sorter',
        'performance_project_no_sorter'
      ],
      filterParams: {
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
      }
    };
  },
  computed: {
    computedFilterName() {
      return this.tableType === 1
        ? 'PerformanceAppraisalFilterOverdueRate'
        : 'PerformanceAppraisalFilterErrorRate';
    }
  },
  created() {
    this.setFilter();
  },
  methods: {
    //toggleSearchbar的搜索
    handleSearch(searchVal) {
      this.currentPage = 1;
      this.searchVal = searchVal;
      this.getListData();
    },
    computeTimeText(hour) {
      const hourVal = Number(hour);
      let dayText = Math.floor(hourVal / 24);
      let hourText = (hourVal % 24).toFixed(1);

      if (dayText === 0) {
        dayText = '';
      }
      if (dayText > 0) {
        dayText = dayText === 1 ? `${dayText}day` : `${dayText}days`;
      }

      hourText = hourText === 1 ? `${hourText}hour` : `${hourText}hours`;
      return `${dayText} ${hourText}`;
    },
    isOverdueType(value) {
      return value === 1 ? 'danger' : 'success';
    },
    handlePageChange(page) {
      this.currentPage = page;
      if (this.fastFilteredIconName) {
        let params = this.fastFilterFormData;
        params.mode = this.tableType;
        params.page = page;
        params.limit = this.pageSize;
        getPerformanceList(params).then((res) => {
          if (res.code === 200) {
            this.tableData = res.data.data;
            this.totalRows = res.data.total;
          }
        });
      } else {
        this.getListData();
      }
    },
    handlePageSizeChange(size) {
      this.pageSize = size;
      this.getListData();
    },

    goToProject(type, row) {
      this.$router.push({
        path:
          type === 'formal'
          ? `/index/project/formal/detail/overview/${row.project_id}`
            : `/index/project/bidding/detail/overview/${row.project_id}`
        // query: {
        //   projectId: row.project_id
        // }
      });
    },
    goToPhase(type, row) {
      this.$router.push({
        path:
          type === 'formal'
          ? `/index/project/formal/detail/phase/${row.project_id}`
            : `/index/project/bidding/detail/phase/${row.project_id}`,
        query: {
          projectId: row.project_id,
          phaseNo: row.progress_no ? row.progress_no : ''
        }
      });
    },
    validateDate(dueDateStart, dueDateEnd, completeDateStart, completeDateEnd) { 
      let duedateStart = (dueDateStart);
      let duedateEnd = dayjs(dueDateEnd);
      let completedateStart = (completeDateStart);
      let completedateEnd = dayjs(completeDateEnd);

      if(duedateEnd.diff(duedateStart) < 0 || completedateEnd.diff(completedateStart) < 0){
        this.$message.error('Incorrect date range');
        return false
      } 
      if(completedateEnd.diff(completedateStart, 'day') > 61 || duedateEnd.diff(duedateStart, 'day') > 61){
        this.$message.error('Time span should be no more than 2 months');
        return false
      }
      return true
    },
    downloadExcel() {
      let params = {
        type: this.type,
        mode: this.tableType,
        // user: this.userIds,
        order: this.order,
        orderBy: this.orderBy
      };
      if (this.fastFilteredIconName) {
        params = { ...params, ...this.fastFilterFormData };
        let dueDateStart = this.fastFilterFormData.due_date_start || '';
        let dueDateEnd = this.fastFilterFormData.due_date_end || '';
        let completeDateStart = this.fastFilterFormData.completed_at_start || '';
        let completeDateEnd = this.fastFilterFormData.completed_at_end || '';

        if(this.validateDate(dueDateStart, dueDateEnd, completeDateStart, completeDateEnd)) {
          downloadPerformanceListFile(this, params);
        }
      } else {
        params = { ...params, ...this.filterParams };
        let dueDateStart = this.filterParams.due_date_start || '';
        let dueDateEnd = this.filterParams.due_date_end || '';
        let completeDateStart = this.filterParams.completed_at_start || '';
        let completeDateEnd = this.filterParams.completed_at_end || '';

        if(this.validateDate(dueDateStart, dueDateEnd, completeDateStart, completeDateEnd)) {
          downloadPerformanceListFile(this, params);
        }
      }
      // downloadPerformanceListFile(this, params);
    },
    mapType(type) {
      switch (type) {
        case 1:
          return 'Bidding';
        case 2:
          return 'Formal';
        case 3:
          return 'Label';
        default:
          return '';
      }
    },
    handleFilter(formData, filterNum) {
      this.toSetRole = false;
      this.filterParams = formData;
      this.cancelAllFastFilter();
      if (this.$refs.errorRateTable) {
        this.$refs.errorRateTable.cancelAllFastFilter();
      }
      this.filterNum = filterNum;
      this.currentPage = 1;
      this.getListData();
    },
    cancelAllFastFilter() {
      this.fastIconRefs.forEach((item) => {
        if(this.$refs[item]) {
          this.$refs[item].hide()
        }
      });
      this.resetFastFilterData();
      this.fastFilteredIconName = '';
      this.currentPage = 1;
    },
    setFilter() {
      let projectType = Number(this.$route.query.projectType) || '';
      let listType = Number(this.$route.query.list) || 1;
      //从query传入的type是一个字符串类型
      if (Number(this.$route.query.type) === 1) {
        this.filterParams.user_role = 'Team Leader';
      }
      //从query传入的type是一个字符串类型
      if (Number(this.$route.query.type) === 2) {
        this.filterParams.user_role = 'CN Engineer Manager';
      }
      if (Number(this.$route.query.type) === 3) {
        this.filterParams.user_role = '3D Team Leader';
      }
      if (Number(this.$route.query.type) === 4) {
        this.filterParams.user_role = '3D Manager';
      }

      this.filterNum = 3;

      this.tabActive = listType;
      this.tableType = listType;
      this.projectType = projectType;

      let [monthFrom, monthTo] = this.$route.query.months;
      
      let firstDayofMonthFrom = `${monthFrom}-01`;
      let lastDayofMonthTo = getLastDay(
        Number(monthTo.split('-')[0]),
        Number(monthTo.split('-')[1])
      );
      let from = `${firstDayofMonthFrom} ` + '00:00:00';
      let to = `${monthTo}-${lastDayofMonthTo}` + ' ' + '23:59:59';

      this.filterParams.task_type = projectType;

      //如果是ontime rate, 就按due_date的起止来搜
      if (listType === 1) {
        this.filterParams.due_date_start = from;
        this.filterParams.due_date_end = to;
      }
      //如果是ontime rate, 就按completed_at的起止来搜
      if (listType === 2) {
        this.filterParams.completed_at_start = from;
        this.filterParams.completed_at_end = to;
      }
      this.getListData();
    },
    getListData() {
      let params = {
        limit: this.pageSize,
        page: this.currentPage,
        mode: this.tableType,
        // user: this.userIds,
        order: this.order,
        orderBy: this.orderBy
      };
      //如果有搜索值，就搜索title
      if(this.searchVal){
        params = {...params, title: this.searchVal}
      }
      // 如果有快速筛选值，就按快速筛选值来搜
      if (this.fastFilteredIconName) {
        params = { ...params, ...this.fastFilterFormData };
      }
      // 如果有筛选值，就按筛选值来搜
      else {
        params = { ...params, ...this.filterParams };
      }
      getPerformanceList(params).then((res) => {
        if (res.code === 200) {
          this.tableData = res.data.data;
          this.totalRows = res.data.total;
        }
      });
    },
    goBackToChart() {
      this.$router.push({
        name: 'performanceAppraisal'
      });
    },
    toggleFilterDisplay() {
      this.showFilter = !this.showFilter;
      if (this.showFilter && this.toSetRole) {
        this.$nextTick(() => {
          let {months} = this.$route.query;
          this.$refs['tableFilter'].setRole(
            Number(this.$route.query.type),
            months,
            this.projectType
          );
        });
      }
      if (this.fastFilteredIconName) {
        this.$nextTick(() => {
          this.$refs.tableFilter.resetFilterForm();
        });
      }
    },
    handleChooseTab(tab) {
      this.resetFastFilterData();
      this.resetFilterParams();
      this.tabActive = tab.id;
      this.tableType = tab.id;
      this.toSetRole = false;
      this.showFilter = false;
      this.resetFastFilterData();
      this.resetFilterParams();
      this.filterNum = 0;
      if (this.$refs['tableFilter']) {
        this.$refs['tableFilter'].resetFilterForm();
      }
      this.getListData();
    },
    closePopover() { return },
    handleFastFilter(val, filterType, filterFor) {
      let finalVal = '';
      this.filterNum = 0;
      this.showFilter = false;
      this.resetFilterParams();
      if (this.$refs.tableFilterV2) {
        this.$refs.tableFilterV2.resetFilterForm();
        this.showFilter = false;
        this.filterNum = 0;
      }
      let formData = {
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

      let due_date_start = '';
      let due_date_end = '';
      let completed_date_start = '';
      let completed_date_end = '';

      if (Array.isArray(val)) {
        [due_date_start, due_date_end] = val;
        [completed_date_start, completed_date_end] = val;
      }
      switch (filterFor) {
        case 'role':
          formData.user_role = val.value;
          finalVal = val.label;
          this.fastFilteredIconName = 'fast_filtered_icon_performance_role';
          break;
        case 'name':
          formData.user_name = val;
          this.fastFilteredIconName = 'fast_filtered_icon_performance_name';
          break;
        case 'title':
          formData.title = val;
          this.fastFilteredIconName = 'fast_filtered_icon_performance_title';
          break;
        case 'reason':
          formData.reason = val.value;
          finalVal = val.value;
          this.fastFilteredIconName = 'fast_filtered_icon_performance_reason';
          break;
        case 'duedate':
          formData.due_date_start = due_date_start;
          formData.due_date_end = due_date_end;
          finalVal = `${val[0]} to ${val[1]}`;
          this.fastFilteredIconName = 'fast_filtered_icon_performance_duedate';
          break;
        case 'submit_time':
          formData.completed_at_start = completed_date_start;
          formData.completed_at_end = completed_date_end;
          finalVal = `${val[0]} to ${val[1]}`;
          this.fastFilteredIconName =
            'fast_filtered_icon_performance_submit_time';
          break;
        case 'review_time':
          formData.completed_at_start = completed_date_start;
          formData.completed_at_end = completed_date_end;
          finalVal = `${val[0]} to ${val[1]}`;
          this.fastFilteredIconName =
            'fast_filtered_icon_performance_review_time';
          break;
        case 'phase_no':
          formData.progress_no = val;
          this.fastFilteredIconName = 'fast_filtered_icon_performance_phase_no';
          break;
        case 'phase':
          formData.phase = val.value;
          finalVal = val.label;
          this.fastFilteredIconName = 'fast_filtered_icon_performance_phase';
          break;
        case 'type':
          formData.type = val.value;
          finalVal = val.label;
          this.fastFilteredIconName = 'fast_filtered_icon_performance_type';
          break;
        case 'overdue_or_not':
          formData.is_overdue = val.value;
          finalVal = val.label;
          this.fastFilteredIconName =
            'fast_filtered_icon_performance_overdue_or_not';
          break;
        case 'rejected_or_not':
          formData.is_rejected = val.value;
          finalVal = val.label;
          this.fastFilteredIconName =
            'fast_filtered_icon_performance_rejected_or_not';
          break;
        case 'overdue_time':
          formData.overdue_time_start = 0;
          formData.overdue_time_end = val;
          finalVal = `0hours to ${val}`;
          this.fastFilteredIconName =
            'fast_filtered_icon_performance_overdue_time';
          break;
        case 'project_name':
          formData.project_name = val;
          this.fastFilteredIconName =
            'fast_filtered_icon_performance_project_name';
          break;
        case 'project_no':
          formData.project_no = val;
          this.fastFilteredIconName =
            'fast_filtered_icon_performance_project_no';
          break;

        default:
          break;
      }
      getPerformanceList({
        mode: this.tableType,
        page: 1,
        search: '',
        limit: this.pageSize,
        // user: this.userIds,
        ...formData
      }).then((res) => {
        if (res.code === 200) {
          this.fastFilterFormData = formData;
          this.tableData = res.data.data;
          this.totalRows = res.data.total;
          this.currentPage = 1;
          this.fastFilteredContent = finalVal ? finalVal : val;
          this.showFastFilterIcon();
        }
      });
    },
    showFastFilterIcon() {
      this.fastIconRefs.forEach((item) => {
        if (item === this.fastFilteredIconName) {
          if(this.$refs[item]) {
            this.$refs[item].show();
            this.$refs[item].applyContent(this.fastFilteredContent)
          }
        }
        if (item !== this.fastFilteredIconName) {
          if(this.$refs[item]) {
            this.$refs[item].hide()
          }
        }
      });
    },
    handleSort(order, sorterType, sortBy) {
      if (!this.toSetRole) {
        this.filterNum = 0;
      }
      this.order = order;
      this.orderBy = order ? sortBy : '';
      this.clearOtherSorterStyle(sorterType);
      this.getListData();
    },
    clearOtherSorterStyle(currentSorterType) {
      this.sorterRefs.forEach((item) => {
        if (this.$refs[item] && item !== currentSorterType) {
          this.$refs[item].reset();
        }
      });
    },
    resetFilterParams() {
      this.filterParams = {
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
    },
    resetFastFilterData() {
      this.fastFilterFormData = {
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
    },
    handleCancelFastFilter() {
      if(this.$refs[this.fastFilteredIconName]) {
        this.$refs[this.fastFilteredIconName].hide()
      }
      this.fastFilteredIconName = '';
      this.currentPage = 1;
      this.resetFilterParams();
      this.resetFastFilterData();
      this.getListData();
    }
  }
};
</script>

<style>
.table-wrapper .el-table thead {
  color: #303133;
  font-size: 12px;
}

/* stylelint-disable-next-line selector-class-pattern */
.table-wrapper .el-table--border .el-table__cell {
  border-right: none !important;
}

/* stylelint-disable-next-line selector-class-pattern */
.table-wrapper .el-table th.el-table__cell {
  background-color: #f5f7fa !important;
}

/* stylelint-disable-next-line selector-class-pattern */
.content-right-operations .el-input__prefix {
  height: 100%;
  left: 5px;
  transition: all 0.3s;
  display: flex;
  align-items: center;
}

/* stylelint-disable-next-line selector-class-pattern */
.table-wrapper .el-table .el-table__cell {
  padding: 6px 0;
}

/* stylelint-disable-next-line selector-class-pattern */
.table-wrapper .el-table__empty-block {
  min-height: 0;
}
</style>

<style scoped lang="less">
@import url('@/css/variables.less');

.performance-appraisal-table-container {
  width: 1888px;
  background-color: #fff;
  border-radius: 8px;
  margin: 16px;
  padding-bottom: 16px;

  .table-project-clickable-text {
    color: black;
    text-decoration: none;

    &:hover {
      color: #409eff;
      text-decoration: underline;
      cursor: pointer;
    }
  }

  .filter-area {
    width: calc(100% - 32px);
    padding-top: 16px;
    display: flex;
    justify-content: center;
  }

  .table-header-lv1 {
    display: flex;
    justify-content: space-between;
    padding: 16px 16px 0;

    .task-text {
      font-size: 18px;
      font-family: 'PingFang SC-Medium', 'PingFang SC', sans-serif;
      font-weight: 500;
      color: #303133;
      line-height: 20px;
    }

    .return-wrapper {
      font-size: 16px;
      font-family: 'PingFang SC-Regular', 'PingFang SC', sans-serif;
      font-weight: 400;
      color: #007bff;
      line-height: 24px;
      display: flex;
      justify-content: center;
      align-items: center;
      gap: 3px;
      cursor: pointer;
    }
  }

  .table-header-lv2 {
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-bottom: 2px solid #f0f0f3;
    margin: 8px 16px 16px;

    .tabs-wrapper {
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 25px;

      .content-tab {
        height: 30px;
        display: flex;
        align-items: center;

        .round-symbol {
          display: inline-block;
          width: 2px;
          height: 2px;
          background-color: black;
          border-radius: 50%;
          margin: 0 4px;
        }

        &.active {
          color: @color-text-blue;
          border-bottom: 3px solid @color-text-blue;
          padding-bottom: 5px;
          margin-bottom: -8px;
        }

        &:hover {
          cursor: pointer;
        }
      }
    }

    .content-operations {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 7px;
      padding-bottom: 10px;
      transform: translateY(4px);

      .filter-icon {
        display: flex;
        align-items: center;
        justify-content: center;
        padding-top: 3px;
      }

      .excel-download-btn {
        z-index: 5;
        margin-left: 24px;
        display: flex;
        justify-content: center;
        gap: 3px;
        align-items: center;
        width: 80px;
        height: 32px;
        border-radius: 4px;
        border: 1px solid #007bff;
        color: #007bff;
        font-size: 14px;
        cursor: pointer;

        &:hover {
          opacity: 0.8;
        }
      }
    }
  }

  .table-wrapper {
    width: 1856px;
    margin: 0 16px;

    .page-gatation {
      text-align: center;
      margin-top: 20px;
    }

    /* stylelint-disable-next-line selector-class-pattern */
    .el-table--border, .el-table--group {
      border-radius: 0 0 4px 4px;
      border: 0 1px solid #eee;
    }
  }
}
</style>
