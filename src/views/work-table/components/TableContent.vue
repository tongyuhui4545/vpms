<template>
  <div class="table-content-container">
    <!-- *****************************Bidding************************************************************ -->
    <el-table
      v-if="tableType == 'quote'"
      :data="handledTableData"
      border
      empty-text=" "
    >
      <template
        v-if="tableData.length == 0"
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
        :width="computedWidth"
      >
        <template slot-scope="scope">
          <div class="title-wrapper">
            <p
              v-if="scope.row.title"
              class="table-project-clickable-text"
              @click="goToPhase('quote', scope.row)"
            >
              {{ scope.row.title }}
            </p>
            <ClockTag
              v-if="workItemType == 1"
              :due-date="pickDueDate(scope.row)"
              class="clock-tag"
            />
          </div>
        </template>
      </el-table-column>
      <el-table-column
        label="Project name"
        min-width="80"
      >
        <template slot-scope="scope">
          <p
            v-if="scope.row.project_name"
            class="table-project-clickable-text"
            @click="goToProject('quote', scope.row)"
          >
            {{ scope.row.project_name }}
          </p>
        </template>
      </el-table-column>
      <el-table-column
        label="Project No."
        min-width="80"
      >
        <template slot-scope="scope">
          <p
            v-if="scope.row.project_no"
            class="table-project-clickable-text"
            @click="goToProject('quote', scope.row)"
          >
            {{ scope.row.project_no }}
          </p>
        </template>
      </el-table-column>
      <el-table-column
        label="Phase No."
        min-width="80"
      >
        <template slot-scope="scope">
          <p
            v-if="scope.row.progress_no"
            class="table-project-clickable-text"
            @click="goToPhase('quote', scope.row)"
          >
            {{ scope.row.progress_no }}
          </p>
        </template>
      </el-table-column>
      <el-table-column
        label="Phase"
        width="80"
      >
        <template
          v-if="scope.row.phase"
          slot-scope="scope"
        >
          <p
            v-if="scope.row.phase"
            class="table-project-clickable-text"
            @click="goToPhase('quote', scope.row)"
          >
            {{ scope.row.phase }}
          </p>
        </template>
      </el-table-column>
      <el-table-column
        label="Solution"
        width="100"
      >
        <template slot-scope="scope">
          <div v-if="scope.row.solution">
            {{ formatSolution(scope.row.solution) }}
          </div>
        </template>
      </el-table-column>
      <el-table-column
        label="Team"
        width="80"
      >
        <template slot-scope="scope">
          <p v-if="scope.row.team_name">
            {{ scope.row.team_name }}
          </p>
        </template>
      </el-table-column>
      <el-table-column
        label="Quote status"
        min-width="120"
      >
        <template slot-scope="scope">
          <div
            v-if="scope.row.progress_status"
            class="quote-status-wrapper"
          >
            <QuoteStatusTag
              v-if="
                scope.row.progress_status &&
                  mapStatus(scope.row.progress_status).length <= 15
              "
              :tag-text="mapStatus(scope.row.progress_status)"
              type="quote"
            />
            <el-tooltip
              v-else
              :content="mapStatus(scope.row.progress_status)"
              placement="top-start"
            >
              <QuoteStatusTag
                :tag-text="mapStatus(scope.row.progress_status)"
                type="quote"
              />
            </el-tooltip>
          </div>
        </template>
      </el-table-column>
      <el-table-column
        v-if="workItemType == 2"
        label="Completion time"
        min-width="100"
      >
        <template slot-scope="scope">
          <p v-if="scope.row.completed_at">
            {{ scope.row.completed_at }}
          </p>
        </template>
      </el-table-column>
      <el-table-column
        v-if="workItemType == 2"
        label="Completer"
        min-width="70"
      >
        <template slot-scope="scope">
          <p v-if="scope.row.completer">
            {{ scope.row.completer }}
          </p>
        </template>
      </el-table-column>
    </el-table>
    <!-- ******************************Formal*********************************************************** -->
    <el-table
      v-if="tableType == 'formal-project'"
      :data="handledTableData"
      border
      empty-text=" "
    >
      <el-table-column
        prop="title"
        label="Title"
        :width="computedWidth"
      >
        <template slot-scope="scope">
          <div class="title-wrapper">
            <p
              v-if="scope.row.title"
              class="table-project-clickable-text"
              @click="goToPhase('formal', scope.row)"
            >
              {{ scope.row.title }}
            </p>
            <ClockTag
              v-if="workItemType == 1"
              :due-date="pickDueDate(scope.row)"
              class="clock-tag"
            />
          </div>
        </template>
      </el-table-column>
      <el-table-column
        label="Project name"
        min-width="80"
      >
        <template slot-scope="scope">
          <p
            v-if="scope.row.project_name"
            class="table-project-clickable-text"
            @click="goToProject('formal', scope.row)"
          >
            {{ scope.row.project_name }}
          </p>
        </template>
      </el-table-column>
      <el-table-column
        label="Project No."
        min-width="80"
      >
        <template slot-scope="scope">
          <p
            v-if="scope.row.project_no"
            class="table-project-clickable-text"
            @click="goToProject('formal', scope.row)"
          >
            {{ scope.row.project_no }}
          </p>
        </template>
      </el-table-column>
      <el-table-column
        prop="progress_no"
        label="Phase No."
        min-width="80"
      >
        <template slot-scope="scope">
          <p
            v-if="scope.row.progress_no"
            class="table-project-clickable-text"
            @click="goToPhase('formal', scope.row)"
          >
            {{ scope.row.progress_no }}
          </p>
        </template>
      </el-table-column>
      <el-table-column
        label="Phase"
        width="80"
      >
        <template
          v-if="scope.row.phase"
          slot-scope="scope"
        >
          <p
            v-if="scope.row.phase"
            class="table-project-clickable-text"
            @click="goToPhase('formal', scope.row)"
          >
            {{ scope.row.phase }}
          </p>
        </template>
      </el-table-column>
      <el-table-column
        label="Solution"
        width="100"
      >
        <template slot-scope="scope">
          <div v-if="scope.row.solution">
            {{ formatSolution(scope.row.solution) }}
          </div>
        </template>
      </el-table-column>
      <el-table-column
        label="Team"
        width="80"
      >
        <template slot-scope="scope">
          <p v-if="scope.row.team_name">
            {{ scope.row.team_name }}
          </p>
        </template>
      </el-table-column>
      <el-table-column
        label="Quote Status"
        min-width="100"
      >
        <template slot-scope="scope">
          <div
            v-if="scope.row.progress_status"
            class="quote-status-wrapper"
          >
            <QuoteStatusTag
              v-if="
                scope.row.progress_status &&
                  mapStatus(scope.row.progress_status).length <= 15
              "
              :tag-text="mapStatus(scope.row.progress_status)"
              type="formal"
            />
            <el-tooltip
              :content="mapStatus(scope.row.progress_status)"
              placement="top-start"
            >
              <QuoteStatusTag
                :tag-text="mapStatus(scope.row.progress_status)"
                type="formal"
              />
            </el-tooltip>
          </div>
        </template>
      </el-table-column>
      <el-table-column
        v-if="workItemType == 2"
        label="Completion time"
        min-width="120"
      >
        <template slot-scope="scope">
          <p v-if="scope.row.completed_at">
            {{ scope.row.completed_at }}
          </p>
        </template>
      </el-table-column>
      <el-table-column
        v-if="workItemType == 2"
        label="Completer"
        min-width="70"
      >
        <template slot-scope="scope">
          <p v-if="scope.row.completer">
            {{ scope.row.completer }}
          </p>
        </template>
      </el-table-column>
    </el-table>
    <!-- ******************************Label********************************************************* -->
    <el-table
      v-if="tableType == 'label'"
      :data="handledTableData"
      border
      empty-text=" "
    >
      <template
        v-if="tableData.length == 0"
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
        prop="title"
        label="Title"
        :width="computedWidth"
      >
        <template slot-scope="scope">
          <div class="title-wrapper">
            <p
              v-if="scope.row.title"
              class="table-project-clickable-text"
              @click="goToPhase('formal', scope.row)"
            >
              {{ scope.row.title }}
            </p>
            <ClockTag
              v-if="workItemType == 1"
              :due-date="scope.row.work_due_date"
              class="clock-tag"
            />
          </div>
        </template>
      </el-table-column>
      <el-table-column
        label="Project name"
        min-width="80"
      >
        <template slot-scope="scope">
          <p
            v-if="scope.row.project_name"
            class="table-project-clickable-text"
            @click="goToProject('formal', scope.row)"
          >
            {{ scope.row.project_name }}
          </p>
        </template>
      </el-table-column>
      <el-table-column
        label="Project No."
        min-width="80"
      >
        <template slot-scope="scope">
          <p
            v-if="scope.row.project_no"
            class="table-project-clickable-text"
            @click="goToProject('formal', scope.row)"
          >
            {{ scope.row.project_no }}
          </p>
        </template>
      </el-table-column>
      <el-table-column
        prop="progress_no"
        label="Phase No."
        min-width="80"
      >
        <template slot-scope="scope">
          <p
            v-if="scope.row.progress_no"
            class="table-project-clickable-text"
            @click="goToPhase('formal', scope.row)"
          >
            {{ scope.row.progress_no }}
          </p>
        </template>
      </el-table-column>
      <el-table-column
        label="Phase"
        width="80"
      >
        <template
          v-if="scope.row.phase"
          slot-scope="scope"
        >
          <p
            v-if="scope.row.phase"
            class="table-project-clickable-text"
            @click="goToPhase('formal', scope.row)"
          >
            {{ scope.row.phase }}
          </p>
        </template>
      </el-table-column>
      <el-table-column
        label="Solution"
        min-width="80"
      >
        <template slot-scope="scope">
          <div v-if="scope.row.solution">
            {{ formatSolution(scope.row.solution) }}
          </div>
        </template>
      </el-table-column>
      <el-table-column
        label="Label Team"
        width="100"
      >
        <template slot-scope="scope">
          <p v-if="scope.row.team_name">
            {{ scope.row.team_name }}
          </p>
        </template>
      </el-table-column>
      <el-table-column
        label="Label status"
        min-width="140"
      >
        <template slot-scope="scope">
          <div
            v-if="scope.row.progress_status"
            class="quote-status-wrapper"
          >
            <QuoteStatusTag
              v-if="
                scope.row.progress_status &&
                  mapStatus(scope.row.progress_status).length <= 15
              "
              :tag-text="mapStatus(scope.row.progress_status)"
              type="formal"
            />
            <el-tooltip
              :content="mapStatus(scope.row.progress_status)"
              placement="top-start"
            >
              <QuoteStatusTag
                :tag-text="mapStatus(scope.row.progress_status)"
                type="formal"
              />
            </el-tooltip>
          </div>
        </template>
      </el-table-column>
      <el-table-column
        v-if="workItemType == 2"
        label="Completion time"
        min-width="120"
      >
        <template slot-scope="scope">
          <p v-if="scope.row.completed_at">
            {{ scope.row.completed_at }}
          </p>
        </template>
      </el-table-column>
      <el-table-column
        v-if="workItemType == 2"
        label="Completer"
        min-width="70"
      >
        <template slot-scope="scope">
          <p v-if="scope.row.completer">
            {{ scope.row.completer }}
          </p>
        </template>
      </el-table-column>
    </el-table>
    <!-- ******************************3D Bidding********************************************************* -->
    <ThreeDBiddingTaskOverview
      v-if="tableType == '3d-bidding'"
      :table-data="tableData"
      :work-item-type="workItemType"
    />
    <!-- ******************************3D Formal********************************************************* -->
    <ThreeDFormalTaskOverview
      v-if="tableType == '3d-formal'"
      :table-data="tableData"
      :work-item-type="workItemType"
    />
    <!-- ******************************Simulation********************************************************* -->
    <SimulationTaskOverview
      v-if="tableType == 'simulation'"
      :table-data="tableData"
      :work-item-type="workItemType"
    />
  </div>
</template>

<script>
import { getUserInfo } from '@/utils/commons.js';
import dayjs from 'dayjs';
import QuoteStatusTag from './QuoteStatusTag.vue';
import ThreeDBiddingTaskOverview from './3d-task-overviews/ThreeDBiddingTaskOverview.vue';
import ThreeDFormalTaskOverview from './3d-task-overviews/ThreeDFormalTaskOverview.vue';
import SimulationTaskOverview from './3d-task-overviews/SimulationTaskOverview.vue';
import ClockTag from '@/components/common/ClockTag.vue';

export default {
  components: {
    ClockTag,
    QuoteStatusTag,
    ThreeDBiddingTaskOverview,
    ThreeDFormalTaskOverview,
    SimulationTaskOverview
  },
  props: {
    tableData: {
      type: Array,
      default: () => {
        return [];
      }
    },
    workItemType: {
      type: Number,
      default: 1
    },
    tableType: {
      type: String,
      default: 'quote'
    }
  },
  data() {
    return {
      userInfo: {},
      handledTableData: []
    };
  },
  computed: {
    computedWidth() {
      if (this.workItemType === 1) {
        return '350';
      }
      if (this.workItemType === 2) {
        return '100';
      }
      return '350';
    }
  },
  watch: {
    tableData: {
      handler(val) {
        this.handledTableData = val;
      },
      immediate: true
    },
    tableType: {
      handler() {
        this.handledTableData = this.tableData;
      }
    }
  },

  created() {
    this.userInfo = getUserInfo();
  },
  methods: {
    formatTime(date) {
      return dayjs(date).format('YYYY-MM-DD');
    },
    pickDueDate(row) {
      //2023/11/15 新版本中，任务里的逾期时间用work_due_date判断
      return row.work_due_date;
    },
    mapStatus(status) {
      switch (status) {
        case 'US_TO_BE_SEND':
          return 'Pending US engineer review';
        case 'CN_REJECTED_MANAGER':
          return 'CN engineer rejected';
        case 'US_HAS_BEEN_SEND':
          return 'Pending assign design team';
        case 'US_REJECTED':
          return 'US engineer rejected';
        case 'US_PASSED':
          return 'Quote released';
        case 'CN_ASSIGNED':
          return 'Team assigned & pending quote';
        case 'CN_TEAM_ALREADY_APPLIED':
          return 'Quote submited & Pending CN approval';
        case 'CN_REJECTED':
          return 'Quote rejected & pending re-quote';
        case 'CN_PASSED':
          return 'Pending US approval';
        case 'WIN':
          return 'Win & Pending US engineer final review';
        case 'QUOTE_SENT':
          return 'Quote sent';
        case 'US_FINAL_PASSED':
          return 'Final review approval';
        case 'FORMAL_ASSIGNED_TEAM':
          return 'Pending assign label team';
        case 'FORMAL_DESIGN_LABEL':
          return 'Team assigned & pending label file';
        case 'FORMAL_LABEL_SEND':
          return 'Label file submited & Pending approval';
        case 'FORMAL_LABEL_REJECTED':
          return 'Label file rejected & pending re-label';
        case 'FORMAL_LABEL_RELEASED':
          return 'Label file released';
        default:
          return '';
      }
    },
    compareDueDate(dayDiff) {
      if (dayDiff < 0) {
        return 'red';
      }
      if (dayDiff >= 0 && dayDiff < 2) {
        return 'yellow';
      }
      if (dayDiff >= 2) {
        return 'normal';
      }
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
    testJSON(obj) {
      try {
        JSON.parse(obj);
        return true;
      } catch (e) {
        return false;
      }
    },
    formatSolution(solution) {
      if (this.testJSON(solution)) {
        return JSON.parse(solution).join('&');
      } else {
        if (Array.isArray(solution)) {
          return solution.join('&');
        }
        return solution;
      }
    }
  }
};
</script>
<style>
.clock-tag {
  margin-left: 3px;
}

/* stylelint-disable-next-line selector-class-pattern */
.table-content-container .el-table--border .el-table__cell {
  border-right: none;
}

/* stylelint-disable-next-line selector-class-pattern */
.table-content-container .el-table th.el-table__cell {
  background-color: #f5f7fa;
}

/* stylelint-disable-next-line selector-class-pattern */
.table-content-container .el-table .el-table__cell {
  padding: 6px 0;
}

.table-content-container .el-table thead {
  color: #303133;
}

/* stylelint-disable-next-line selector-class-pattern */
.table-content-container .el-table__empty-block {
  min-height: 0;
}
</style>
<style lang="less" scoped>
.table-content-container ::-webkit-scrollbar {
  width: 4px;
  height: 4px;
}

.table-content-container {
  padding-bottom: 16px;
  .no-data-area {
    width: 1232px;
    height: 264px;
    display: flex;
    align-items: center;
    justify-content: center;

    img {
      width: 120px;
      height: 120px;
    }
  }

  .table-project-clickable-text {
    color: black;
    text-decoration: none;

    &:hover {
      color: #409eff;
      text-decoration: underline;
      cursor: pointer;
    }
  }

  .title-wrapper {
    display: flex;
    align-items: center;
    justify-content: flex-start;

    &.yellow::after {
      content: '';
      width: 16px;
      height: 16px;
      background-image: url('@/assets/IconDesigns/yellow_clock.png');
      background-size: contain;
      margin-left: 7px;
    }

    &.red::after {
      content: '';
      width: 16px;
      height: 16px;
      background-image: url('@/assets/IconDesigns/red_clock.png');
      background-size: contain;
      margin-left: 7px;
    }
  }
}
</style>
