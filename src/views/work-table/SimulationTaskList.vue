<template>
  <div class="content-right-table">
    <el-table
      v-if="tableVisible === 'List'"
      :data="tableData"
      border
    >
      <el-table-column
        label="Title"
        :min-width="titleWidth"
      >
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
                class="column-on-hover"
                @click="closePopover"
              >Title</span>
              <FastFilter
                fast-filter-type="InputFastFilter"
                filter-for="title"
                @fast-filter="handleFastFilter"
              />
            </el-popover>
            <Sorter
              ref="simu_task_title"
              sorter-type="simu_task_title"
              sort-by="title"
              @on-sort="handleSort"
            />
            <FastFilteredIcon
              ref="fast_filtered_icon_simu_title"
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
                  class="table-project-clickable-text"
                  @click="goToPhase('simulation', scope.row)"
                >
                  {{ truncatedTitle(scope.row.title) }}
                </p>
              </el-tooltip>
            </div>
            <DueDateTag
              v-if="currentStatus != 2"
              :tag-data="scope.row"
              tag-type="label"
            />
          </div>
        </template>
      </el-table-column>

      <!-- //assign to -->
      <el-table-column
        v-if="currentStatus === 5"
        min-width="120"
      >
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
                class="column-on-hover"
                @click="closePopover"
              >Assign to</span>
              <FastFilter
                fast-filter-type="AssignTo"
                @fast-filter="handleFastFilter"
              />
            </el-popover>
            <Sorter
              ref="quote_assign_to_sorter"
              sorter-type="quote assign_to_sorter"
              sort-by="receiver_name"
              @on-sort="handleSort"
            />
            <FastFilteredIcon
              ref="fast_filtered_icon_simu_assign_to"
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
                v-if="scope.row.receiver_name"
              >
                {{ scope.row.receiver_name }}
              </p>
            </div>
          </div>
        </template>
      </el-table-column>

      <el-table-column
        label="Project name"
        width="160"
      >
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
              ref="simu_task_project_name"
              sorter-type="simu_task_project_name"
              sort-by="project_name"
              @on-sort="handleSort"
            />
            <FastFilteredIcon
              ref="fast_filtered_icon_simu_project_name"
              @cancel="handleCancelFastFilter"
            />
          </div>
        </template>
        <template slot-scope="scope">
          <p
            v-if="scope.row.project_name"
            class="table-project-clickable-text"
            @click="goToProject('simulation', scope.row)"
          >
            {{ scope.row.project_name }}
          </p>
        </template>
      </el-table-column>

      <el-table-column
        label="Project No"
        width="150"
      >
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
                class="column-on-hover"
                @click="closePopover"
              >Project No</span>
              <FastFilter
                fast-filter-type="InputFastFilter"
                filter-for="project_no"
                @fast-filter="handleFastFilter"
              />
            </el-popover>
            <Sorter
              ref="simu_task_project_no"
              sorter-type="simu_task_project_no"
              sort-by="project_no"
              @on-sort="handleSort"
            />
            <FastFilteredIcon
              ref="fast_filtered_icon_simu_project_no"
              @cancel="handleCancelFastFilter"
            />
          </div>
        </template>
        <template slot-scope="scope">
          <p
            v-if="scope.row.project_no"
            class="table-project-clickable-text"
            @click="goToProject('simulation', scope.row)"
          >
            {{ scope.row.project_no }}
          </p>
        </template>
      </el-table-column>

      <el-table-column
        label="Phase No"
        width="110"
      >
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
                class="column-on-hover"
                @click="closePopover"
              >Phase No</span>
              <FastFilter
                fast-filter-type="InputFastFilter"
                filter-for="progress_no"
                @fast-filter="handleFastFilter"
              />
            </el-popover>
            <Sorter
              ref="simu_phase_no_sorter"
              sorter-type="simu_phase_no_sorter"
              sort-by="progress_no"
              @on-sort="handleSort"
            />
            <FastFilteredIcon
              ref="fast_filtered_icon_simu_phase_no"
              @cancel="handleCancelFastFilter"
            />
          </div>
        </template>
        <template
          v-if="scope.row.progress_no"
          slot-scope="scope"
        >
          <p
            v-if="scope.row.progress_no"
            class="table-project-clickable-text"
            @click="goToPhase('simulation', scope.row)"
          >
            {{ scope.row.progress_no }}
          </p>
        </template>
      </el-table-column>

      <el-table-column
        label="Phase"
        width="100"
      >
        <template slot="header">
          <div style="display: flex; align-items: center">
            <el-popover
              placement="bottom-start"
              width="150"
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
                fast-filter-type="Phase"
                @fast-filter="handleFastFilter"
              />
            </el-popover>
            <Sorter
              ref="simu_phase_sorter"
              sorter-type="simu_phase_sorter"
              sort-by="phase"
              @on-sort="handleSort"
            />
            <FastFilteredIcon
              ref="fast_filtered_icon_simu_phase"
              @cancel="handleCancelFastFilter"
            />
          </div>
        </template>
        <template
          v-if="scope.row.phase"
          slot-scope="scope"
        >
          <p
            class="table-project-clickable-text"
            @click="goToPhase('simulation', scope.row)"
          >
            {{ scope.row.phase }}
          </p>
        </template>
      </el-table-column>

      <el-table-column
        label="Solution"
        width="150"
      >
        <template slot="header">
          <div style="display: flex; align-items: center">
            <el-popover
              placement="bottom-start"
              width="115"
              popper-class="el-popover-self"
              trigger="hover"
              :visible-arrow="false"
            >
              <span
                slot="reference"
                class="column-on-hover"
                @click="closePopover"
              >Solution</span>
              <FastFilter
                fast-filter-type="Solution"
                @fast-filter="handleFastFilter"
              />
            </el-popover>
            <Sorter
              ref="simu_task_solution"
              sorter-type="simu_task_solution"
              sort-by="solution"
              @on-sort="handleSort"
            />
            <FastFilteredIcon
              ref="fast_filtered_icon_simu_solution"
              @cancel="handleCancelFastFilter"
            />
          </div>
        </template>
        <template slot-scope="scope">
          <p v-if="scope.row.solution">
            {{ scope.row.solution }}
          </p>
        </template>
      </el-table-column>

      <el-table-column
        label="Simulation Team"
        min-width="160"
      >
        <template slot="header">
          <div style="display: flex; align-items: center">
            <el-popover
              placement="bottom-start"
              width="120"
              popper-class="el-popover-self"
              trigger="hover"
              :visible-arrow="false"
            >
              <span
                slot="reference"
                class="column-on-hover"
                @click="closePopover"
              >Simulation Team</span>
              <FastFilter
                fast-filter-type="SelectFastFilter"
                filter-for="team_id"
                :options="d3TeamList"
                @fast-filter="handleFastFilter"
              />
            </el-popover>
            <Sorter
              ref="simu_task_team"
              sorter-type="simu_task_team"
              sort-by="team_id"
              @on-sort="handleSort"
            />
            <FastFilteredIcon
              ref="fast_filtered_icon_simu_team"
              @cancel="handleCancelFastFilter"
            />
          </div>
        </template>
        <template slot-scope="scope">
          <p v-if="scope.row.team_name">
            {{ scope.row.team_name }}
          </p>
        </template>
      </el-table-column>

      <el-table-column
        label="Simulation status"
        min-width="170"
      >
        <template slot="header">
          <div style="display: flex; align-items: center">
            <el-popover
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
              >Simulation status</span>
              <FastFilter
                fast-filter-type="SimulationStatus"
                @fast-filter="handleFastFilter"
              />
            </el-popover>
            <Sorter
              ref="simu_task_simulation_status"
              sorter-type="simu_task_simulation_status"
              sort-by="progress_status"
              @on-sort="handleSort"
            />
            <FastFilteredIcon
              ref="fast_filtered_icon_simulation_status"
              @cancel="handleCancelFastFilter"
            />
          </div>
        </template>
        <template slot-scope="scope">
          <el-tooltip
            v-if="scope.row.progress_status_label"
            :content="scope.row.progress_status_label"
            placement="top"
          >
            <QuoteStatusTag
              :tag-text="scope.row.progress_status_label"
              type="simulation"
            />
          </el-tooltip>
        </template>
      </el-table-column>

      <el-table-column
        label="Simulation due date"
        width="180"
      >
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
                class="column-on-hover"
                @click="closePopover"
              >Simulation due date</span>
              <FastFilter
                fast-filter-type="DateRangeFastFilter"
                filter-for="simu_due_date"
                @fast-filter="handleFastFilter"
              />
            </el-popover>
            <Sorter
              ref="simu_task_due_date"
              sorter-type="simu_task_due_date"
              sort-by="inner_date"
              @on-sort="handleSort"
            />
            <FastFilteredIcon
              ref="fast_filtered_icon_simulation_due_date"
              @cancel="handleCancelFastFilter"
            />
          </div>
        </template>
        <template slot-scope="scope">
          <p v-if="scope.row.due_date">
            {{ scope.row.inner_date }}
          </p>
        </template>
      </el-table-column>

      <el-table-column
        label="Simulation team due date"
        width="220"
      >
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
                class="column-on-hover"
                @click="closePopover"
              >Simulation team due date</span>
              <FastFilter
                fast-filter-type="DateRangeFastFilter"
                filter-for="team_due_date"
                @fast-filter="handleFastFilter"
              />
            </el-popover>
            <Sorter
              ref="simu_task_team_due_date"
              sorter-type="simu_task_team_due_date"
              sort-by="team_due_date"
              @on-sort="handleSort"
            />
            <FastFilteredIcon
              ref="fast_filtered_icon_simulation_team_due_date"
              @cancel="handleCancelFastFilter"
            />
          </div>
        </template>
        <template slot-scope="scope">
          <p v-if="scope.row.due_date">
            {{ scope.row.team_due_date }}
          </p>
        </template>
      </el-table-column>

      <el-table-column
        label="Creation date"
        width="150"
      >
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
                class="column-on-hover"
                @click="closePopover"
              >Creation date</span>
              <FastFilter
                fast-filter-type="DateRangeFastFilter"
                filter-for="created_at"
                @fast-filter="handleFastFilter"
              />
            </el-popover>
            <Sorter
              ref="label_task_creation_date"
              sorter-type="simu_task_creation_date"
              sort-by="created_at"
              @on-sort="handleSort"
            />
            <FastFilteredIcon
              ref="fast_filtered_icon_simu_creation_date"
              @cancel="handleCancelFastFilter"
            />
          </div>
        </template>
        <template slot-scope="scope">
          <p v-if="scope.row.created_at">
            {{ formatCreationTime(scope.row.created_at) }}
          </p>
        </template>
      </el-table-column>

      <el-table-column
        label="Creator"
        width="150"
      >
        <template slot="header">
          <div style="display: flex; align-items: center">
            <el-popover
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
              >Creator</span>
              <FastFilter
                fast-filter-type="Creator"
                @fast-filter="handleFastFilter"
              />
            </el-popover>
            <Sorter
              ref="simu_task_creator"
              sorter-type="simu_task_creator"
              sort-by="creation_name"
              @on-sort="handleSort"
            />
            <FastFilteredIcon
              ref="fast_filtered_icon_simu_creator"
              @cancel="handleCancelFastFilter"
            />
          </div>
        </template>
        <template slot-scope="scope">
          <p v-if="scope.row.creation_name">
            {{ scope.row.creation_name }}
          </p>
        </template>
      </el-table-column>

      <!-- 如果是查看completed by me 的条件下 -->
      <el-table-column
        v-if="currentStatus == 2"
        label="Completion time"
        width="100"
      >
        <template slot="header">
          <div style="display: flex; align-items: center">
            <el-popover
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
              >Completion time
              </span>
              <FastFilter
                fast-filter-type="CompletionTime"
                @fast-filter="handleFastFilter"
              />
            </el-popover>
            <Sorter
              ref="d3_simu_task_completed_at"
              sorter-type="d3_simu_task_completed_at"
              sort-by="completed_at"
              @on-sort="handleSort"
            />
            <FastFilteredIcon
              ref="fast_filtered_icon_d3_simu_completed_at"
              @cancel="handleCancelFastFilter"
            />
          </div>
        </template>
        <template slot-scope="scope">
          <p v-if="scope.row.completed_at">
            {{ scope.row.completed_at }}
          </p>
        </template>
      </el-table-column>
      <el-table-column
        v-if="currentStatus == 2"
        label="Completer"
        min-width="120"
      >
        <template slot="header">
          <div style="display: flex; align-items: center">
            <el-popover
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
              >Completer</span>
              <FastFilter
                fast-filter-type="Completer"
                @fast-filter="handleFastFilter"
              />
            </el-popover>
            <Sorter
              ref="d3_simu_task_completor"
              sorter-type="d3_simu_task_completor"
              sort-by="completer"
              @on-sort="handleSort"
            />
            <FastFilteredIcon
              ref="fast_filtered_icon_d3_simu_completer"
              @cancel="handleCancelFastFilter"
            />
          </div>
        </template>
        <template slot-scope="scope">
          <p v-if="scope.row.completer">
            {{ scope.row.completer }}
          </p>
        </template>
      </el-table-column>
    </el-table>
    <div v-show="tableVisible === 'Gantt'">
      <Gantt
        :gantt-params="{
          mode: 2,
          group: false,
          start_date: ganttRange.start_date,
          end_date: ganttRange.end_date,
          data: tableData
        }"
      />
    </div>
    <div
      class="page-gatation"
      style="padding-bottom: 15px"
    >
      <NormalPagination
        :total-rows="totalRows"
        :current-page="pageInfo.currentPage"
        :page-size="pageInfo.pageSize"
        @page-change="handlePage"
        @page-size-change="handlePageSizeChange"
      />
    </div>
  </div>
</template>
<!-- eslint-disable prefer-destructuring -->
<!-- eslint-disable no-param-reassign -->
<script>
import FastFilteredIcon from '@/views/project/components/FastFilteredIcon.vue';
import { FAST_FILTER_REFS } from '@/utils/constants.js';
import Sorter from '@/views/project/components/Sorter.vue';
import DueDateTag from './components/DueDateTag.vue';
import QuoteStatusTag from './components/QuoteStatusTag.vue';
import NormalPagination from '@/components/NormalPagination.vue';

import { getUserInfo, formatDate } from '@/utils/commons.js';
import { taskList, teamList } from '@/api';

// import TableFilter from '@/components/TableFilter.vue';
import { formatTime } from '@/utils/format-time.js';
import dayjs from 'dayjs';
import FastFilter from '@/views/project/components/FastFilter.vue';
import Gantt from '@/components/gantt/index.vue';
export default {
  components: {
    DueDateTag,
    QuoteStatusTag,
    NormalPagination,
    FastFilter,
    Sorter,
    FastFilteredIcon,
    Gantt
  },
  props: {
    currentStatus: {
      type: Number,
      default: 1
    },
    range: {
      type: Object,
      default: null
    },
    mode: {
      type: String,
      default: 'List'
    }
  },
  data() {
    return {
      sorterList: [
        'simu_task_title',
        'simu_task_project_name',
        'simu_task_project_no',
        'simu_phase_no_sorter',
        'simu_phase_sorter',
        'simu_task_solution',
        'simu_task_team',
        'simu_task_simulation_status',
        'simu_task_due_date',
        'simu_task_team_due_date',
        'simu_task_creation_date',
        'simu_task_creator',
        'd3_simu_task_completed_at',
        'd3_simu_task_completor'
      ],
      simulationFastFilterIcons: [
        'fast_filtered_icon_d3_simu_completer',
        'fast_filtered_icon_simu_title',
        'fast_filtered_icon_simu_project_name',
        'fast_filtered_icon_simu_project_no',
        'fast_filtered_icon_simu_phase_no',
        'fast_filtered_icon_simu_phase',
        'fast_filtered_icon_simu_solution',
        'fast_filtered_icon_simu_team',
        'fast_filtered_icon_simulation_status',
        'fast_filtered_icon_simulation_due_date',
        'fast_filtered_icon_simulation_team_due_date',
        'fast_filtered_icon_simu_creation_date',
        'fast_filtered_icon_simu_creator',
        'fast_filtered_icon_d3_simu_completed_at',
        'fast_filtered_icon_d3_simu_completor',
        'fast_filtered_icon_simu_assign_to'
      ],
      d3TeamList: [],
      filterName: 'QuoteTaskFilter',
      fastFilteredContent: '',
      currentParams: {},
      totalRows: 0,
      filterNum: 0,
      showFilter: false,
      fetchTaskListParams: {
        page: 1,
        limit: 20
      },
      currentType: 6,
      userInfo: {},
      tagType: 'quote',
      hasProjectTab: false,
      workItemTabs: [
        {
          id: 1,
          title: 'Bidding',
          number: 0
        },
        {
          id: 2,
          title: 'Formal',
          number: 0
        }
      ],
      tabTitle: 'Bidding',
      totalTaskNumber: 0,
      filterFor: 'work-item-quote',
      workItemTypes: [
        {
          title: 'Pending for me',
          number: 0
        },
        {
          title: 'Handled by me',
          number: 0
        }
      ],
      currentWorkItemType: 'Pending for me',
      showSearch: false,
      tabActive: 1,
      infoDisplayType: 'List',
      fastFilteredIconName: '',
      tableData: [],
      pageInfo: {
        pageSize: 20,
        currentPage: 1,
        total: 0
      },
      ganttRange: {
        start_date: '',
        end_date: ''
      },
      tableVisible: 'List'
    };
  },
  computed: {
    titleWidth() {
      if (this.currentStatus === 1) {
        return '350';
      }
      if (this.currentStatus === 2) {
        return '160';
      }
      return '350';
    }
  },
  watch: {
    currentStatus() {
      this.pageInfo.currentPage = 1;
      this.getTaskList();
    },
    range: {
      handler(val) {
        if(val){
          this.ganttRange = val;
        }
      },
      deep: true,
      immediate: true
    },
    mode: {
      handler(val) {
        if(val){
          this.tableVisible = val;
        }
      },
      deep: true,
      immediate: true
    }
  },
  created() {
    this.userInfo = getUserInfo();
    if (
      this.userInfo.role === 'CN Engineer Manager' ||
      this.userInfo.role === 'CN Engineer'
    ) {
      this.hasProjectTab = true;
    }
    this.resetFetchTaskListParams();
    this.fetchTaskListParams.type = 6;
    this.getTaskList();
    this.getD3TeamList();
  },
  methods: {
    getD3TeamList() {
      teamList({ type: '3D' }).then((res) => {
        if (res.code === 200) {
          this.d3TeamList = res.data.data.map((item) => {
            return {
              value: item.id,
              label: item.name
            };
          });
        }
      });
    },
    truncatedTitle(title) {
      if (title.length > 15) {
        return `${title.slice(0, 15)}...`;
      } else {
        return title;
      }
    },
    handleCancelFastFilter() {
      if (this.$refs[this.fastFilteredIconName]) {
        this.$refs[this.fastFilteredIconName].hide();
      }
      this.pageInfo.currentPage = 1;
      this.currentParams = {};
      this.resetFetchTaskListParams();
      this.fetchTaskListParams.type = this.currentType;
      this.getTaskList();
    },
    closePopover() {
      // 通过 ref 找到 el-popover 并触发鼠标移出事件以关闭它
      FAST_FILTER_REFS.forEach((item) => {
        if (this.$refs[item]) {
          this.$nextTick(() => {
            this.$refs[item].doClose();
          });
        }
      });
    },
    handleFastFilter(val, filterType, filterFor) {
      if (this.$refs.tableFilter) {
        // this.$refs.tableFilter.resetFilterForm();
        this.showFilter = false;
        this.filterNum = 0;
      }
      let formData = {
        title: '',
        project_no: '',
        project_name: '',
        progress_no: '',
        phase: '',
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
        completed_date_end: ''
      };
      switch (filterType) {
        case 'AssignTo':
         formData.receiver = val.id;
         val = val.name;
         this.fastFilteredIconName = 'fast_filtered_icon_simu_assign_to';
         break;
        case 'Phase':
          formData.phase = val.value;
          val = val.label;
          this.fastFilteredIconName = 'fast_filtered_icon_simu_phase';
          break;
        case 'Solution':
          formData.solution = val.value;
          val = val.label;
          this.fastFilteredIconName = 'fast_filtered_icon_simu_solution';
          break;
        case 'SimulationStatus':
          formData.progress_status = val.value;
          val = val.label;
          this.fastFilteredIconName = 'fast_filtered_icon_simulation_status';
          break;
        case 'Creator':
          formData.creator = val.id;
          val = val.name;
          this.fastFilteredIconName = 'fast_filtered_icon_simu_creator';
          break;
        case 'CompletionTime':
          formData.completed_date_start = val[0];
          formData.completed_date_end = val[1];
          val = `${formatDate(val[0])} - ${formatDate(val[1])}`;
          this.fastFilteredIconName = 'fast_filtered_icon_d3_simu_completed_at';
          break;
        case 'Completer':
          formData.completer = val.id;
          val = val.name;
          this.fastFilteredIconName = 'fast_filtered_icon_d3_simu_completer';
          break;
        default:
          break;
      }
      switch (filterFor) {
        case 'title':
          formData.title = val;
          this.fastFilteredIconName = 'fast_filtered_icon_simu_title';
          break;
        case 'project_name':
          formData.project_name = val;
          this.fastFilteredIconName = 'fast_filtered_icon_simu_project_name';
          break;
        case 'project_no':
          formData.project_no = val;
          this.fastFilteredIconName = 'fast_filtered_icon_simu_project_no';
          break;
        case 'progress_no':
          formData.progress_no = val;
          this.fastFilteredIconName = 'fast_filtered_icon_simu_phase_no';
          break;
        case 'team_id':
          formData.team_id = val.value;
          val = val.label;
          this.fastFilteredIconName = 'fast_filtered_icon_simu_team';
          break;
        case 'simu_due_date':
          formData.inner_date_start = val[0];
          formData.inner_date_end = val[1];
          val = `${val[0]} - ${val[1]}`;
          this.fastFilteredIconName = 'fast_filtered_icon_simulation_due_date';
          break;
        case 'team_due_date':
          formData.team_due_date_start = val[0];
          formData.team_due_date_end = val[1];
          val = `${val[0]} - ${val[1]}`;
          this.fastFilteredIconName =
            'fast_filtered_icon_simulation_team_due_date';
          break;
        case 'created_at':
          formData.creation_date_start = val[0];
          formData.creation_date_end = val[1];
          val = `${val[0]} - ${val[1]}`;
          this.fastFilteredIconName = 'fast_filtered_icon_simu_creation_date';
          break;
        default:
          break;
      }
      this.currentParams = { ...formData };
      this.fetchTaskListParams = {
        page: 1,
        limit: this.pageInfo.pageSize,
        type: this.currentType,
        status: this.currentStatus,
        ...this.currentParams
      };
      this.getTaskList();
      this.fastFilteredContent = val;
      this.showFastFilterIcon();
    },
    showFastFilterIcon() {
      this.simulationFastFilterIcons.forEach((item) => {
        if (item === this.fastFilteredIconName) {
          if (this.$refs[item]) {
            this.$refs[item].show();
            this.$refs[item].applyContent(this.fastFilteredContent);
          }
        }
        if (item !== this.fastFilteredIconName) {
          if (this.$refs[item]) {
            this.$refs[item].hide();
          }
        }
      });
    },
    clearOtherSorterStyle(currentSorterType) {
      this.sorterList.forEach((item) => {
        if (this.$refs[item] && item !== currentSorterType) {
          this.$refs[item].reset();
        }
      });
    },
    clearAllSorterStyle() {
      this.sorterList.forEach((item) => {
        if (this.$refs[item]) {
          this.$refs[item].reset();
        }
      });
    },
    handleSort(order, sorterType, sortBy) {
      this.currentParams.orderBy = sortBy;
      this.currentParams.orderBy = order ? sortBy : '';
      this.clearOtherSorterStyle(sorterType);
      this.fetchTaskListParams.orderBy = this.currentParams.orderBy;
      this.fetchTaskListParams.order = order;
      this.fetchTaskListParams.status = this.currentStatus;
      this.getTaskList();
    },
    handlePageSizeChange(size) {
      this.pageInfo.pageSize = Number(size);
      this.pageInfo.currentPage = 1;
      this.fetchTaskListParams.page = 1;
      this.fetchTaskListParams.limit = size;
      this.getTaskList();
    },
    resetFilter() {
      this.filterNum = 0;
      this.showFilter = false;
    },
    changeWorkItemType(option) {
      this.resetFilter();
      this.currentWorkItemType = option.title;
      this.fetchTaskListParams.status = this.currentStatus;
      this.fetchTaskListParams.type = 1;
      this.handleChooseTab(this.workItemTabs[0]);
      // this.resetFetchTaskListParams();
      this.getTaskList();
    },
    toggleFilterDisplay() {
      this.showFilter = !this.showFilter;
    },
    formatCreationTime(date) {
      return dayjs(date).format('YYYY-MM-DD HH:mm:ss');
    },
    formatTime(date, type) {
      return formatTime(date, type);
    },
    resetFetchTaskListParams() {
      this.fetchTaskListParams = {};
      // this.fetchTaskListParams.receiver = this.userInfo.id || '';
      this.fetchTaskListParams.status = 1;
      this.fetchTaskListParams.type = 1;
      this.fetchTaskListParams.page = 1;
      this.fetchTaskListParams.limit = 20;
    },
    toggleShowSearch() {
      this.showSearch = !this.showSearch;
    },
    handleChooseTab(tab) {
      if (tab.id !== this.tabActive) {
        this.showFilter = false;
        this.filterNum = 0;
      }
      this.totalTaskNumber = 0;
      this.tabTitle = tab.title;
      this.tabActive = tab.id;
      if (this.tabActive === 1) {
        // this.resetFetchTaskListParams();
        this.filterName = 'QuoteTaskFilter';
        this.fetchTaskListParams.type = 1;
        this.currentType = 1;
        this.filterFor = 'work-item-quote';
        this.tagType = 'quote';
      } else if (this.tabActive === 2) {
        // this.resetFetchTaskListParams();
        this.filterName = 'FormalTaskFilter';
        this.fetchTaskListParams.type = 2;
        this.currentType = 2;
        this.filterFor = 'work-item-project';
        this.tagType = 'formal';
      } else if (this.tabActive === 3) {
        // this.resetFetchTaskListParams();
        this.filterName = 'LabelTaskFilter';
        this.fetchTaskListParams.type = 3;
        this.currentType = 3;
        this.filterFor = 'work-item-label';
        this.tagType = 'label';
      }
      // this.$refs.tableFilter.resetForm();
      // this.$refs.tableFilter.clearFilterNum();
      //tag
      this.handleCancelFastFilter();
      this.clearAllSorterStyle();
      this.resetFetchTaskListParams();
      this.fetchTaskListParams.type = this.currentType;
      this.fetchTaskListParams.status = this.currentStatus;
      this.getTaskList();
    },
    handlePage(val) {
      this.pageInfo.currentPage = val;
      this.totalTaskNumber = 0;
      this.getTaskList();
    },
    getTaskList() {
      this.fetchTaskListParams.limit = this.pageInfo.pageSize;
      this.fetchTaskListParams.page = this.pageInfo.currentPage;
      this.fetchTaskListParams.status = this.currentStatus;
      //如果是项目详情里的列表，按projectId查询
      this.fetchTaskListParams.project_id = this.$route.params.project_id || '';
        //如果选择了public task, 把is_public变成1，把status变成1，点击的时候会置为5，但是这个传参也应该是1
        this.fetchTaskListParams.is_public = this.currentStatus === 5 ? 1 : 0;
        this.fetchTaskListParams.status = this.currentStatus === 5 ? 1 : this.currentStatus;
        if(this.currentStatus !== 5){this.fetchTaskListParams.receiver = ''}
      taskList({...this.fetchTaskListParams}).then((res) => {
        this.tableData = res.data.data;
         //把拿到的tableData网上传，因为甘特图要用，v0.9.0
         this.$emit('on-get-table-data', this.tableData)
        this.totalRows = res.data.total;
        this.tableData.forEach((item) => {
          if (item.project) {
            item.project.solution = item.project.solution
              ? item.project.solution
              : null;
          }
        });
        if (this.fetchTaskListParams.status === 1) {
          let numbersData = res.data.task_count;
          this.workItemTabs[0].number = numbersData.qoute_doing;
          if (this.workItemTabs[1]) {
            this.workItemTabs[1].number = numbersData.formal_doing;
          }
          if (this.workItemTabs[2]) {
            this.workItemTabs[2].number = numbersData.label_doing;
          }
          this.workItemTypes[0].number =
            numbersData.qoute_doing +
            numbersData.formal_doing +
            numbersData.label_doing;
          this.workItemTypes[1].number =
            numbersData.qoute_done +
            numbersData.formal_done +
            numbersData.label_done;
        }
        if (this.fetchTaskListParams.status === 2) {
          let numbersData = res.data.task_count;
          this.workItemTabs[0].number = numbersData.qoute_done;
          if (this.workItemTabs[1]) {
            this.workItemTabs[1].number = numbersData.formal_done;
          }
          if (this.workItemTabs[2]) {
            this.workItemTabs[2].number = numbersData.label_done;
          }
          this.workItemTypes[1].number =
            numbersData.qoute_done +
            numbersData.formal_done +
            numbersData.label_done;
          this.workItemTypes[0].number =
            numbersData.qoute_doing +
            numbersData.formal_doing +
            numbersData.label_doing;
        }
      });
    },
    getTabNumbers() {
      taskList({
        receiver: this.fetchTaskListParams.receiver,
        status: 1,
        type: 1
      }).then((res) => {
        this.totalTaskNumber = 0;
        if (this.workItemTabs[0]) {
          this.workItemTabs[0].number = res.data.total;
        }
        this.totalTaskNumber = this.totalTaskNumber + res.data.total;
        taskList({
          receiver: this.fetchTaskListParams.receiver,
          status: 1,
          type: 2
        }).then((res) => {
          if (this.workItemTabs[1]) {
            this.workItemTabs[1].number = res.data.total;
            this.totalTaskNumber = this.totalTaskNumber + res.data.total;
          }
          taskList({
            receiver: this.fetchTaskListParams.receiver,
            status: 1,
            type: 3
          }).then((res) => {
            if (this.workItemTabs[2]) {
              this.workItemTabs[2].number = res.data.total;
              this.totalTaskNumber = this.totalTaskNumber + res.data.total;
            }
          });
        });
      });
    },
    handleOnFilter(formData, filterNum) {
      this.filterNum = filterNum;
      if (this.fastFilteredIconName) {
        if (this.$refs[this.fastFilteredIconName]) {
          this.$refs[this.fastFilteredIconName].hide();
        }
      }
      this.fetchTaskListParams = { ...formData };
      this.fetchTaskListParams.receiver = this.userInfo.id || '';
      this.fetchTaskListParams.type = this.currentType;
      this.fetchTaskListParams.status = this.currentStatus;
      this.fetchTaskListParams.page = 1;
      this.getTaskList();
    },
    handleOnSearch(val) {
      this.fetchTaskListParams.title = val;
      this.totalTaskNumber = 0;
      this.getTaskList();
    },

    goToProject(type, row) {
      this.$router.push({
        path:
          type === 'formal'
          ? `/index/project/formal/detail/${row.project_id}`
            : `/index/project/bidding/detail/${row.project_id}`,
        query: {
          projectId: row.project_id || ''
        }
      });
    },
    goToPhase(type, row) {
      if (type === 'simulation') {
        this.$router.push({
          path:
            row.project_type && row.project_type === 2
            ? `/index/project/formal/detail/phase/${row.project_id}`
            : `/index/project/bidding/detail/phase/${row.project_id}`,
          query: {
            projectId: row.project_id,
            phaseNo: row.progress_no ? row.progress_no : ''
          }
        });
      } else {
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
      }
    },
    testJSON(obj) {
      try {
        JSON.parse(obj);
        return true;
      } catch (e) {
        return false;
      }
    },
    formatSolution(solution) {
      if (JSON.parse(solution)) {
        return JSON.parse(solution).join('&');
      } else {
        return '';
      }
    }
  }
};
</script>

<style>
/* stylelint-disable-next-line selector-class-pattern */
.content-right-table .el-table--border .el-table__cell {
  border-right: none !important;
}

/* stylelint-disable-next-line selector-class-pattern */
.content-right-table .el-table th.el-table__cell {
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
.content-right-table .el-table .el-table__cell {
  padding: 6px 0;
}

.content-right-table .el-table thead {
  color: #303133;
}

/* stylelint-disable-next-line selector-class-pattern */
.content-right-table .el-table__empty-block {
  min-height: 0;
}
</style>

<style lang="less" scoped>
@import url('@/css/variables.less');

.work-item-page-container {
  .table-project-clickable-text {
    color: black;
    text-decoration: none;

    &:hover {
      color: #409eff;
      text-decoration: underline;
      cursor: pointer;
    }
  }

  display: flex;
  gap: 8px;
  height: calc(100vh - 90px);

  .content-left,
  .content-right {
    min-height: 80vh;
    background: #fff;
    border-radius: 8px;
    border: 1px solid #f0f0f3;
    padding: 30px 0;
  }

  .content-right {
    overflow-x: auto;
    flex: 8.4;

    .content-right-title {
      margin: 0 16px;
      font-family: @font-family;
      font-size: @title-small;
      font-weight: @font-weight-bold;
      color: @color-text-primary;
    }

    .filter-area {
      width: 1606px;
      //    display: flex;
      //       align-items: center;
      //       justify-content: center;
      margin-left: 15px;
    }

    .content-right-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      border-bottom: 2px solid #f0f0f3;
      margin: 25px 16px;

      .tabs-wrapper {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 25px;

        .content-right-tab {
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

      .content-right-operations {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 15px;
        padding-bottom: 10px;

        .vertical-divider {
          width: 2px;
          height: 24px;
          background-color: #eee;
          border-radius: 50%;
          margin: 0 8px;
        }
      }
    }

    .content-right-table {
      // margin: 0 16px;
      // height: 80vh;

      .page-gatation {
        text-align: center;
        margin-top: 20px;
      }

      /* stylelint-disable-next-line selector-class-pattern */
      .el-table--border,
      .el-table--group {
        border-radius: 0 0 4px 4px;
        border: 0 1px solid #eee;
      }
    }
  }

  .content-left {
    flex: 1;

    .content-left-title {
      display: flex;
      align-items: center;
      font-size: 16px;
      font-weight: 550;
      color: #000;
      margin-bottom: 20px;
      margin-left: 18px;

      span:first-child {
        margin-right: 10px;
      }

      img {
        width: 20px;
        height: 20px;
      }
    }

    .content-left-options {
      .option {
        width: 168px;
        height: 40px;
        margin-left: 16px;
        margin-right: 16px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        color: #303133;
        background: #eee;
        border-radius: 4px;
        font-weight: 500;
        font-family: 'PingFang SC-Regular', 'PingFang SC', sans-serif;
        font-size: 14px;
        margin-bottom: 5px;

        &:hover,
        &.active {
          opacity: 0.75;
          border-radius: 4px;
          cursor: pointer;
        }

        span {
          padding: 10px;
        }
      }
    }
  }
}
</style>
