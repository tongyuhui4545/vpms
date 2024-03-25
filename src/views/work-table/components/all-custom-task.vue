<template>
  <div class="content-right-table">
    <el-table
      v-if="tableVisible === 'List'"
      :data="handledTableData"
      border
      empty-text=" "
      @row-click="rowClick"
    >
      <template
        v-if="handledTableData.length === 0"
        slot="append"
      >
        <div class="no-data-area">
          <img
            src="@/assets/image/no-data.png"
            alt="no_data"
          >
        </div>
      </template>
      <el-table-column
        label="Title"
        prop="title"
        width="290px"
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
              >Title</span>
              <FastFilter
                fast-filter-type="InputFastFilter"
                filter-for="title"
                @fast-filter="handleFastFilter"
              />
            </el-popover>
            <Sorter
              ref="custom_task_title"
              sorter-type="custom_task_title"
              sort-by="title"
              @on-sort="handleSort"
            />
            <FastFilteredIcon
              ref="fast_filtered_icon_task_title"
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
                v-if="scope.row.title.length > 15"
                :content="scope.row.title"
                placement="top-start"
              >
                <p v-if="scope.row.title">
                  {{ truncatedTitle(scope.row.title) }}
                </p>
              </el-tooltip>
              <p v-else>
                {{ scope.row.title }}
              </p>
            </div>
            <DueDateTag
              v-if="scope.row.status < 4"
              :tag-data="scope.row"
              tag-type="task"
            />
          </div>
        </template>
      </el-table-column>
      <el-table-column
        label="Type"
        :show-overflow-tooltip="true"
        prop="task_type_value"
        width="99px"
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
              >Type</span>
              <FastFilter
                fast-filter-type="SelectFastFilter"
                filter-for="task_type"
                :options="taskTypeOptions"
                @fast-filter="handleFastFilter"
              />
            </el-popover>
            <Sorter
              ref="custom_task_type"
              sorter-type="custom_task_type"
              sort-by="task_type"
              @on-sort="handleSort"
            />
            <FastFilteredIcon
              ref="fast_filtered_icon_task_type"
              @cancel="handleCancelFastFilter"
            />
          </div>
        </template>
      </el-table-column>
      <el-table-column
        label="Task No."
        :show-overflow-tooltip="true"
        prop="task_no"
        width="120px"
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
              >Task No.</span>
              <FastFilter
                fast-filter-type="InputFastFilter"
                filter-for="task_no"
                @fast-filter="handleFastFilter"
              />
            </el-popover>
            <Sorter
              ref="custom_task_no"
              sorter-type="custom_task_no"
              sort-by="task_no"
              @on-sort="handleSort"
            />
            <FastFilteredIcon
              ref="fast_filtered_icon_task_no"
              @cancel="handleCancelFastFilter"
            />
          </div>
        </template>
      </el-table-column>
      <el-table-column
        label="Priority"
        prop="priority_value"
        width="110px"
        :show-overflow-tooltip="true"
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
              >Priority</span>
              <FastFilter
                fast-filter-type="SelectFastFilter"
                filter-for="priority"
                :options="priorityOptions"
                @fast-filter="handleFastFilter"
              />
            </el-popover>
            <Sorter
              ref="custom_task_priority"
              sorter-type="custom_task_priority"
              sort-by="priority"
              @on-sort="handleSort"
            />
            <FastFilteredIcon
              ref="fast_filtered_icon_task_priority"
              @cancel="handleCancelFastFilter"
            />
          </div>
        </template>
        <template slot-scope="scope">
          <div>
            <span
              class="circle"
              :style="{
                background:
                  scope.row.priority === 1
                    ? '#F56C6C'
                    : scope.row.priority === 2
                      ? '#5ABDFF'
                      : '#DCDFE6'
              }"
            /><span>{{ scope.row.priority_value }}</span>
          </div>
        </template>
      </el-table-column>
      <el-table-column
        label="Tag"
        prop="tags"
        width="108px"
        :show-overflow-tooltip="true"
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
              >Tag</span>
              <FastFilter
                fast-filter-type="SelectFastFilter"
                filter-for="tag"
                :options="$store.state.app.tags"
                @fast-filter="handleFastFilter"
              />
            </el-popover>
            <Sorter
              ref="custom_task_tag"
              sorter-type="custom_task_tag"
              sort-by="tag"
              @on-sort="handleSort"
            />
            <FastFilteredIcon
              ref="fast_filtered_icon_task_tag"
              @cancel="handleCancelFastFilter"
            />
          </div>
        </template>
      </el-table-column>
      <el-table-column
        label="Status"
        width="120px"
        :show-overflow-tooltip="true"
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
              >Status</span>
              <FastFilter
                fast-filter-type="SelectFastFilter"
                filter-for="status"
                :options="statusOptions"
                @fast-filter="handleFastFilter"
              />
            </el-popover>
            <Sorter
              ref="custom_task_status"
              sorter-type="custom_task_status"
              sort-by="status"
              @on-sort="handleSort"
            />
            <FastFilteredIcon
              ref="fast_filtered_icon_task_status"
              @cancel="handleCancelFastFilter"
            />
          </div>
        </template>
        <template slot-scope="scope">
          <el-tag
            v-if="scope.row.status && scope.row.status_value.length <= 7"
            :color="mapStatusColor(scope.row.status)"
            class="status-tag"
            :style="{
              'border-color': mapStatusColor(scope.row.status)
            }"
          >
            {{ scope.row.status_value }}
          </el-tag>
          <el-tooltip
            v-else
            :content="scope.row.status_value"
            placement="top-start"
          >
            <el-tag
              :color="mapStatusColor(scope.row.status)"
              class="status-tag"
              :style="{
                'border-color': mapStatusColor(scope.row.status)
              }"
            >
              {{
                scope.row.status_value.length >= 7
                  ? scope.row.status_value.substring(0, 6) + '...'
                  : scope.row.status_value
              }}
            </el-tag>
          </el-tooltip>
        </template>
      </el-table-column>
      <el-table-column
        label="Assign to"
        width="130px"
        prop="recipient_name"
        :show-overflow-tooltip="true"
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
              >Assign to</span>
              <FastFilter
                fast-filter-type="SelectFastFilter"
                filter-for="recipient"
                :options="$store.state.app.users"
                @fast-filter="handleFastFilter"
              />
            </el-popover>
            <Sorter
              ref="custom_task_recipient"
              sorter-type="custom_task_recipient"
              sort-by="recipient"
              @on-sort="handleSort"
            />
            <FastFilteredIcon
              ref="fast_filtered_icon_task_recipient"
              @cancel="handleCancelFastFilter"
            />
          </div>
        </template>
      </el-table-column>
      <el-table-column
        label="Complete date"
        width="170px"
        prop="complete_date"
        :show-overflow-tooltip="true"
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
              >Complete date</span>
              <FastFilter
                fast-filter-type="DateRangeFastFilter"
                filter-for="complete_date"
                @fast-filter="handleFastFilter"
              />
            </el-popover>
            <Sorter
              ref="custom_task_complete_date"
              sorter-type="custom_task_complete_date"
              sort-by="complete_date"
              @on-sort="handleSort"
            />
            <FastFilteredIcon
              ref="fast_filtered_icon_task_complete_date"
              @cancel="handleCancelFastFilter"
            />
          </div>
        </template>
      </el-table-column>
      <el-table-column
        label="Task due date"
        width="170px"
        prop="task_due_date"
        :show-overflow-tooltip="true"
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
              >Task due date</span>
              <FastFilter
                fast-filter-type="DateRangeFastFilter"
                filter-for="task_due_date"
                @fast-filter="handleFastFilter"
              />
            </el-popover>
            <Sorter
              ref="custom_task_due_date"
              sorter-type="custom_task_due_date"
              sort-by="task_due_date"
              @on-sort="handleSort"
            />
            <FastFilteredIcon
              ref="fast_filtered_icon_task_due_date"
              @cancel="handleCancelFastFilter"
            />
          </div>
        </template>
      </el-table-column>
      <el-table-column
        label="Actual start date"
        width="200px"
        prop="actual_start_date"
        :show-overflow-tooltip="true"
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
              >Actual start date</span>
              <FastFilter
                fast-filter-type="DateRangeFastFilter"
                filter-for="actual_start_date"
                @fast-filter="handleFastFilter"
              />
            </el-popover>
            <Sorter
              ref="custom_task_actual_start_date"
              sorter-type="custom_task_actual_start_date"
              sort-by="actual_start_date"
              @on-sort="handleSort"
            />
            <FastFilteredIcon
              ref="fast_filtered_icon_actual_start_date"
              @cancel="handleCancelFastFilter"
            />
          </div>
        </template>
      </el-table-column>
      <el-table-column
        label="Estimated start date"
        width="220px"
        prop="estimated_start_date"
        :show-overflow-tooltip="true"
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
              >Estimated start date</span>
              <FastFilter
                fast-filter-type="DateRangeFastFilter"
                filter-for="estimated_start_date"
                @fast-filter="handleFastFilter"
              />
            </el-popover>
            <Sorter
              ref="custom_task_estimated_start_date"
              sorter-type="custom_task_estimated_start_date"
              sort-by="estimated_start_date"
              @on-sort="handleSort"
            />
            <FastFilteredIcon
              ref="fast_filtered_icon_estimated_start_date"
              @cancel="handleCancelFastFilter"
            />
          </div>
        </template>
      </el-table-column>
      <el-table-column
        label="Project No."
        width="140px"
        :show-overflow-tooltip="true"
        prop="project_no"
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
              >Project No.</span>
              <FastFilter
                fast-filter-type="InputFastFilter"
                filter-for="project_no"
                @fast-filter="handleFastFilter"
              />
            </el-popover>
            <Sorter
              ref="custom_task_project_no"
              sorter-type="custom_task_project_no"
              sort-by="project_no"
              @on-sort="handleSort"
            />
            <FastFilteredIcon
              ref="fast_filtered_icon_task_project_no"
              @cancel="handleCancelFastFilter"
            />
          </div>
        </template>
      </el-table-column>
      <el-table-column
        label="Project name"
        width="150px"
        :show-overflow-tooltip="true"
        prop="project_name"
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
              >Project name</span>
              <FastFilter
                fast-filter-type="InputFastFilter"
                filter-for="project_name"
                @fast-filter="handleFastFilter"
              />
            </el-popover>
            <Sorter
              ref="custom_task_project_name"
              sorter-type="custom_task_project_name"
              sort-by="project_name"
              @on-sort="handleSort"
            />
            <FastFilteredIcon
              ref="fast_filtered_icon_task_project_name"
              @cancel="handleCancelFastFilter"
            />
          </div>
        </template>
      </el-table-column>
      <el-table-column
        label="Phase No."
        width="130px"
        :show-overflow-tooltip="true"
        prop="progress_no"
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
              >Phase No.</span>
              <FastFilter
                fast-filter-type="InputFastFilter"
                filter-for="progress_no"
                @fast-filter="handleFastFilter"
              />
            </el-popover>
            <Sorter
              ref="custom_task_progress_no"
              sorter-type="custom_task_progress_no"
              sort-by="progress_no"
              @on-sort="handleSort"
            />
            <FastFilteredIcon
              ref="fast_filtered_icon_task_progress_no"
              @cancel="handleCancelFastFilter"
            />
          </div>
        </template>
      </el-table-column>
      <el-table-column
        label="Phase"
        width="110px"
        :show-overflow-tooltip="true"
        prop="progress"
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
              >Phase</span>
              <FastFilter
                fast-filter-type="InputFastFilter"
                filter-for="progress"
                @fast-filter="handleFastFilter"
              />
            </el-popover>
            <Sorter
              ref="custom_task_progress"
              sorter-type="custom_task_progress"
              sort-by="progress"
              @on-sort="handleSort"
            />
            <FastFilteredIcon
              ref="fast_filtered_icon_task_progress"
              @cancel="handleCancelFastFilter"
            />
          </div>
        </template>
      </el-table-column>
      <el-table-column
        label="CC"
        width="95px"
        :show-overflow-tooltip="true"
        prop="copy_to_name"
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
              >CC</span>
              <FastFilter
                fast-filter-type="SelectFastFilter"
                filter-for="copy_to"
                :options="$store.state.app.users"
                @fast-filter="handleFastFilter"
              />
            </el-popover>
            <Sorter
              ref="custom_task_copy_to"
              sorter-type="custom_task_copy_to"
              sort-by="copy_to"
              @on-sort="handleSort"
            />
            <FastFilteredIcon
              ref="fast_filtered_icon_task_copy_to"
              @cancel="handleCancelFastFilter"
            />
          </div>
        </template>
      </el-table-column>
      <el-table-column
        label="Creator"
        width="110px"
        prop="creator_name"
        :show-overflow-tooltip="true"
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
              >Creator</span>
              <FastFilter
                fast-filter-type="SelectFastFilter"
                filter-for="creator"
                :options="$store.state.app.users"
                @fast-filter="handleFastFilter"
              />
            </el-popover>
            <Sorter
              ref="custom_task_creator"
              sorter-type="custom_task_creator"
              sort-by="creator"
              @on-sort="handleSort"
            />
            <FastFilteredIcon
              ref="fast_filtered_icon_task_creator"
              @cancel="handleCancelFastFilter"
            />
          </div>
        </template>
      </el-table-column>
      <el-table-column
        label="Creation date"
        width="150px"
        prop="created_at"
        :show-overflow-tooltip="true"
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
              >Creation date</span>
              <FastFilter
                fast-filter-type="DateRangeFastFilter"
                filter-for="created_at"
                @fast-filter="handleFastFilter"
              />
            </el-popover>
            <Sorter
              ref="custom_task_created_at"
              sorter-type="custom_task_created_at"
              sort-by="created_at"
              @on-sort="handleSort"
            />
            <FastFilteredIcon
              ref="fast_filtered_icon_created_at"
              @cancel="handleCancelFastFilter"
            />
          </div>
        </template>
      </el-table-column>
    </el-table>
    <div v-show="tableVisible === 'Gantt'">
      <Gantt
        :gantt-params="{
          mode: 3,
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
        @refresh-list="refreshList"
      />
    </el-drawer>
  </div>
</template>

<script>
import NormalPagination from '@/components/NormalPagination.vue';
import TaskDetail from './task-detail.vue';
import { getCustomTaskDetail, getCustomTaskList } from '@/api/index';
import FastFilter from '@/views/project/components/FastFilter.vue';
import Sorter from '@/views/project/components/Sorter.vue';
import FastFilteredIcon from '@/views/project/components/FastFilteredIcon.vue';
import Gantt from '@/components/gantt/index.vue';
import {
  TASK_TYPE,
  PRIORITY_OPTIONS,
  STATUS_OPTIONS
} from '@/utils/constants.js';
import DueDateTag from './DueDateTag.vue';

export default {
  components: {
    NormalPagination,
    TaskDetail,
    DueDateTag,
    FastFilter,
    Sorter,
    FastFilteredIcon,
    Gantt
  },
  props: {
    tableData: {
      type: Array,
      default: () => {
        return [];
      }
    },
    type: {
      type: String,
      default: 'create'
    },
    currentTaskCategory: {
      type: Number,
      default: null
    },
    total: {
      type: Number,
      default: 0
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
  emits: ['page-change', 'refresh'],
  data() {
    return {
      handledTableData: [],
      pageInfo: {
        pageSize: 20,
        currentPage: 1,
        total: 0
      },
      totalRows: 0,
      taskDetailVisible: false,
      taskDetailData: {},
      fastFilteredIconName: '',
      fastFilteredContent: '',
      fetchTaskListParams: {},
      filterNum: 0,
      taskFastFilterIcons: [
        'fast_filtered_icon_task_title',
        'fast_filtered_icon_task_type',
        'fast_filtered_icon_task_no',
        'fast_filtered_icon_task_priority',
        'fast_filtered_icon_task_tag',
        'fast_filtered_icon_task_status',
        'fast_filtered_icon_task_recipient',
        'fast_filtered_icon_task_complete_date',
        'fast_filtered_icon_task_due_date',
        'fast_filtered_icon_actual_start_date',
        'fast_filtered_icon_estimated_start_date',
        'fast_filtered_icon_task_project_no',
        'fast_filtered_icon_task_project_name',
        'fast_filtered_icon_task_progress_no',
        'fast_filtered_icon_task_progress',
        'fast_filtered_icon_task_copy_to',
        'fast_filtered_icon_task_creator',
        'fast_filtered_icon_created_at'
      ],
      sorterList: [
        'custom_task_title',
        'custom_task_type',
        'custom_task_no',
        'custom_task_priority',
        'custom_task_tag',
        'custom_task_status',
        'custom_task_recipient',
        'custom_task_complete_date',
        'custom_task_due_date',
        'custom_task_actual_start_date',
        'custom_task_estimated_start_date',
        'custom_task_project_no',
        'custom_task_project_name',
        'custom_task_progress_no',
        'custom_task_progress',
        'custom_task_copy_to',
        'custom_task_creator',
        'custom_task_created_at'
      ],
      currentParams: {},
      taskTypeOptions: TASK_TYPE,
      priorityOptions: PRIORITY_OPTIONS,
      statusOptions: STATUS_OPTIONS,
      // userOptions: [],
      isClose: false,
      ganttRange: {
        start_date: '',
        end_date: ''
      },
      tableVisible: 'List'
    };
  },
  watch: {
    tableData: {
      handler(val) {
        this.handledTableData = val;
        this.totalRows = this.total;
      },
      immediate: true
    },
    currentTaskCategory: {
      handler() {
        this.pageInfo.currentPage = 1;
        this.pageInfo.pageSize = 20;
      },
      immediate: true
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
  methods: {
    mapStatusColor(status) {
      // 1:Pending 2:Processing 3:Completed 4:cancel 5:end
      switch (status) {
        case 1:
        case 2:
          return '#409EFF';
        case 3:
          return '#22D9AE';
        case 4:
        case 5:
          return '#C0C4CC';
        default:
          return '';
      }
    },
    handlePage(val) {
      this.pageInfo.currentPage = val;
      this.$emit('page-change', this.pageInfo, this.fetchTaskListParams);
    },
    handlePageSizeChange(size) {
      this.pageInfo.pageSize = Number(size);
      this.pageInfo.currentPage = 1;
      this.$emit('page-change', this.pageInfo, this.fetchTaskListParams);
    },
    async getCustomTaskDetail(id) {
      let params = {
        id
      };
      await getCustomTaskDetail(params).then((res) => {
        if (res.code === 200) {
          this.taskDetailData = res.data;
          this.taskDetailVisible = true;
        }
      });
    },
    rowClick(row) {
      this.getCustomTaskDetail(row.id);
    },
    closeTaskDetailDrawer() {
      this.taskDetailVisible = false;
      this.isClose = false;
    },
    showTaskDetailDrawer() {
      this.taskDetailVisible = true;
    },
    refreshList() {
      this.$emit('refresh');
    },
    truncatedTitle(title) {
      if (title.length > 15) {
        return `${title.slice(0, 15)}...`;
      } else {
        return title;
      }
    },
    clearOtherSorterStyle(currentSorterType) {
      this.sorterList.forEach((item) => {
        if (this.$refs[item] && item !== currentSorterType) {
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
      this.fetchTaskListParams.task_category = this.currentTaskCategory;
      this.getCustomTaskList();
    },
    handleOnFilter(formData, filterNum) {
      this.filterNum = filterNum;
      if (this.fastFilteredIconName) {
        if (this.$refs[this.fastFilteredIconName]) {
          this.$refs[this.fastFilteredIconName].hide();
        }
      }
      this.fetchTaskListParams = { ...formData };
      this.fetchTaskListParams.page = 1;
    },
    handleFastFilter(val, _, filterFor) {
      let string = val;
      let formData = {
        title: '',
        task_type: '',
        task_no: '',
        priority: '',
        tag: '',
        status: '',
        recipient: '',
        project_no: '',
        project_name: '',
        progress_no: '',
        progress: '',
        max_complete_date: '',
        min_complete_date: '',
        min_task_due_date: '',
        max_task_due_date: '',
        min_actual_start_date: '',
        max_actual_start_date: '',
        min_created_at: '',
        max_created_at: '',
        estimated_start_date: '',
        task_due_date: '',
        created_at: '',
        copy_to: '',
        creator: ''
      };
      switch (filterFor) {
        case 'title':
          formData.title = val;
          this.fastFilteredIconName = 'fast_filtered_icon_task_title';
          break;
        case 'task_type':
          formData.task_type = val.value;
          string = val.label;
          this.fastFilteredIconName = 'fast_filtered_icon_task_type';
          break;
        case 'priority':
          formData.priority = val.value;
          string = val.label;
          this.fastFilteredIconName = 'fast_filtered_icon_task_priority';
          break;
        case 'task_no':
          formData.task_no = val;
          this.fastFilteredIconName = 'fast_filtered_icon_task_no';
          break;
        case 'tag':
          // formData.tag = val;
          formData.tag = val.value;
          string = val.label;
          this.fastFilteredIconName = 'fast_filtered_icon_task_tag';
          break;
        case 'status':
          formData.status = val.value;
          string = val.label;
          this.fastFilteredIconName = 'fast_filtered_icon_task_status';
          break;
        case 'recipient':
          formData.recipient = val.value;
          string = val.label;
          this.fastFilteredIconName = 'fast_filtered_icon_task_recipient';
          break;
        case 'complete_date':
          // eslint-disable-next-line prefer-destructuring
          formData.min_complete_date = val[0];
          // eslint-disable-next-line prefer-destructuring
          formData.max_complete_date = val[1];
          string = `${val[0]} - ${val[1]}`;
          this.fastFilteredIconName = 'fast_filtered_icon_task_complete_date';
          break;
        case 'task_due_date':
          // eslint-disable-next-line prefer-destructuring
          formData.min_task_due_date = val[0];
          // eslint-disable-next-line prefer-destructuring
          formData.max_task_due_date = val[1];
          string = `${val[0]} - ${val[1]}`;
          this.fastFilteredIconName = 'fast_filtered_icon_task_due_date';
          break;
        case 'actual_start_date':
          // eslint-disable-next-line prefer-destructuring
          formData.min_actual_start_date = val[0];
          // eslint-disable-next-line prefer-destructuring
          formData.max_actual_start_date = val[1];
          string = `${val[0]} - ${val[1]}`;
          this.fastFilteredIconName = 'fast_filtered_icon_actual_start_date';
          break;
        case 'estimated_start_date':
          // eslint-disable-next-line prefer-destructuring
          formData.min_estimated_start_date = val[0];
          // eslint-disable-next-line prefer-destructuring
          formData.max_estimated_start_date = val[1];
          string = `${val[0]} - ${val[1]}`;
          this.fastFilteredIconName = 'fast_filtered_icon_estimated_start_date';
          break;
        case 'project_no':
          formData.project_no = val;
          this.fastFilteredIconName = 'fast_filtered_icon_task_project_no';
          break;
        case 'project_name':
          formData.project_name = val;
          this.fastFilteredIconName = 'fast_filtered_icon_task_project_name';
          break;
        case 'progress_no':
          formData.progress_no = val;
          this.fastFilteredIconName = 'fast_filtered_icon_task_progress_no';
          break;
        case 'progress':
          formData.progress = val;
          this.fastFilteredIconName = 'fast_filtered_icon_task_progress';
          break;
        case 'copy_to':
          formData.copy_to = val.value;
          string = val.label;
          this.fastFilteredIconName = 'fast_filtered_icon_task_copy_to';
          break;
        case 'creator':
          formData.creator = val.value;
          string = val.label;
          this.fastFilteredIconName = 'fast_filtered_icon_task_creator';
          break;
        case 'created_at':
          // eslint-disable-next-line prefer-destructuring
          formData.min_created_at = val[0];
          // eslint-disable-next-line prefer-destructuring
          formData.max_created_at = val[1];
          string = `${val[0]} - ${val[1]}`;
          this.fastFilteredIconName = 'fast_filtered_icon_created_at';
          break;
        default:
          break;
      }
      this.currentParams = { ...formData };
      this.fetchTaskListParams = {
        page: 1,
        limit: this.pageInfo.pageSize,
        ...this.currentParams,
        task_category: this.currentTaskCategory
      };
      this.getCustomTaskList();
      this.fastFilteredContent = string;
      this.showFastFilterIcon();
    },
    showFastFilterIcon() {
      this.taskFastFilterIcons.forEach((item) => {
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
    close() {
      // this.taskDetailVisible = false;
      this.isClose = true;
    },
    handleCancelFastFilter() {
      if (this.$refs[this.fastFilteredIconName]) {
        this.$refs[this.fastFilteredIconName].hide();
      }
      this.pageInfo.currentPage = 1;
      this.currentParams = {};
      this.resetFetchTaskListParams();
      this.fetchTaskListParams.task_category = this.currentTaskCategory;
      this.getCustomTaskList();
    },
    removeEmptyProperties(obj) {
      for (let key in obj) {
        if (obj[key] === null || obj[key] === undefined || obj[key] === '') {
          delete obj[key];
        }
      }
      return obj;
    },
    async getCustomTaskList() {
      let params = this.fetchTaskListParams;
      let newParams = this.removeEmptyProperties(params);
      //v0.8.0,tyh添加，在projectDetail里的任务列表页，需要传project_id
      newParams.project_id = this.$route.params.project_id || '';
      await getCustomTaskList(newParams).then((res) => {
        if (res.code === 200) {
          this.handledTableData = res.data.task_list;
          //v0.9.0往上一层传一下data, 甘特图要用
          this.$emit('on-get-table-data', res.data.task_list);
          this.totalRows = res.data.count;
        }
      });
    },
    resetFetchTaskListParams() {
      this.fetchTaskListParams = {};
      this.fetchTaskListParams.page = 1;
      this.fetchTaskListParams.limit = 20;
    }
  }
};
</script>

<style lang="less" scoped>
.content-right-table {
  :deep(.el-table) {
    border-radius: 4px 4px 0 0;
  }

  :deep(thead .el-table__cell) {
    height: 40px;
    font-size: 14px;
    font-weight: 400;
    color: #303133;
  }

  :deep(.el-table__row .el-table__cell) {
    height: 40px;
    font-size: 14px;
    font-weight: 400;
    color: #606266;
  }

  :deep(.el-table th.el-table__cell > .cell) {
    font-weight: 550;
  }

  :deep(.el-table__body tr:hover > td) {
    background-color: #fafafa !important;
  }

  .no-data-area {
    height: 264px;
    display: flex;
    align-items: center;
    justify-content: center;

    img {
      width: 120px;
      height: 120px;
    }
  }

  .status-tag {
    color: #fff;
    width: 80px;
    height: 24px;
    border-radius: 4px;
    text-align: center;
    font-size: 13px;
    line-height: 23px;
  }

  .circle {
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background: #000;
    display: inline-block;
    margin-right: 3px;
  }
}
</style>
