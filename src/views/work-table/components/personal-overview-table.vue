<template>
  <div class="personal-table-wrapper">
    <el-table
      :data="computedTableData"
      table-key="work-table-tasks"
      border
    >
      <div v-if="tableType !== 7">
        <!-- title -->
        <el-table-column
          min-width="120"
          prop="title"
          label="Title"
          fixed="left"
        >
          <template slot-scope="scope">
            <div class="title-wrapper">
              <span
                class="table-text clickable"
                @click="goToPhase(scope.row.type, scope.row)"
              >{{ scope.row.title }}</span>
              <span
                v-if="scope.row.due_date"
              ><ClockTag :due-date="scope.row.work_due_date" /></span>
            </div>
          </template>
        </el-table-column>
        <!-- project-name -->
        <el-table-column
          prop="project_name"
          label="Project name"
        >
          <template slot-scope="scope">
            <span
              class="table-text clickable"
              @click="goToProject(scope.row.type, scope.row)"
            >{{ scope.row.project_name }}</span>
          </template>
        </el-table-column>
        <!-- project-no -->
        <el-table-column   
          prop="project_no"
          label="Project No."
        >
          <template slot-scope="scope">
            <span
              class="table-text clickable"
              @click="goToPhase(scope.row.type, scope.row)"
            >{{ scope.row.project_no }}</span>
          </template>
        </el-table-column>
        <!-- phase-no -->
        <el-table-column
          prop="progress_no"
          label="Phase No."
        >
          <template slot-scope="scope">
            <span
              class="table-text clickable"
              @click="goToPhase(scope.row.type, scope.row)"
            >{{ scope.row.progress_no }}</span>
          </template>
        </el-table-column>
        <!-- phase -->
        <el-table-column
          prop="phase"
          label="Phase"
        >
          <template slot-scope="scope">
            <span
              class="clickable"
              @click="goToPhase(scope.row.type, scope.row)"
            >{{ scope.row.phase }}</span>
          </template>
        </el-table-column>
        <!-- solution -->
        <el-table-column
          prop="solution"
          label="Solution"
        />
        <!-- team-name -->
        <el-table-column       
          prop="team_name"
          :label="computedTeamNameLabel"
        />
      </div>
      <div v-if="tableType === 7">
        <el-table-column
          fixed="left"
          prop="task_no"
          label="Task No."
        >
          <template slot-scope="scope">
            <div style="display: flex; align-items: center; gap: 3px">
              <span
                vif="scope.row.task_no"
                class="clickable"
                @click="getCustomTaskDetail(scope.row.id)"
              >{{ scope.row.task_no }}</span>
              <span
                v-if="scope.row.task_due_date"
              ><ClockTag :due-date="scope.row.task_due_date" /></span>
            </div>
          </template>
        </el-table-column>
        <el-table-column
          prop="title"
          label="Title"
        >
          <template slot-scope="scope">
            <span
              class="clickable"
              @click="getCustomTaskDetail(scope.row.id)"
            >{{ scope.row.title }}</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="task_type"
          label="Type"
        />
        <el-table-column
          prop="priority"
          label="Priority"
        />
        <el-table-column
          prop="task_due_date"
          label="Task due date"
        />
      </div>
    </el-table>
    <el-drawer
      :visible.sync="taskDetailVisible"
      :with-header="false"
      size="1440px"
      :show-close="true"
      :destroy-on-close="isClose"
      @close="isClose = true"
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
import ClockTag from '@/components/common/ClockTag.vue';
import TaskDetail from '@/views/work-table/components/task-detail.vue';
import {getCustomTaskDetail} from '@/api'

export default {
  name: '',
  components: { ClockTag, TaskDetail },
  props: {
    tableType: {
      type: Number,
      default: 1
    },
    displayTenRows: {
      type: Boolean,
      default: false
    },
    tableData: {
      type: Array,
      default: () => {
        return [
          {
            title: 'colllllak1',
            project_name: 'pjtnam',
            project_no: 'pjtno_kalg',
            progress_no: 'pgsno_wqw',
            phase: '89%',
            solution: 'Harness',
            team_name: 'tamamamakna'
          },
          {
            title: 'colllllak2',
            project_name: 'pjtnam',
            project_no: 'pjtno_kalg',
            progress_no: 'pgsno_wqw',
            phase: '89%',
            solution: 'Harness',
            team_name: 'tamamamakna'
          },
          {
            title: 'colllllak3',
            project_name: 'pjtnam',
            project_no: 'pjtno_kalg',
            progress_no: 'pgsno_wqw',
            phase: '89%',
            solution: 'Harness',
            team_name: 'tamamamakna'
          },
          {
            title: 'colllllak4',
            project_name: 'pjtnam',
            project_no: 'pjtno_kalg',
            progress_no: 'pgsno_wqw',
            phase: '89%',
            solution: 'Harness',
            team_name: 'tamamamakna'
          },
          {
            title: 'colllllak5',
            project_name: 'pjtnam',
            project_no: 'pjtno_kalg',
            progress_no: 'pgsno_wqw',
            phase: '89%',
            solution: 'Harness',
            team_name: 'tamamamakna'
          },
          {
            title: 'colllllak6',
            project_name: 'pjtnamagags2',
            project_no: 'pjtno_kalg_kolomo',
            progress_no: 'pgsno_wqw',
            phase: '89%',
            solution: 'Harness',
            team_name: 'tamamamakna'
          },
          {
            title: 'colllllak6',
            project_name: 'pjtnamagags2',
            project_no: 'pjtno_kalg_kolomo',
            progress_no: 'pgsno_wqw',
            phase: '89%',
            solution: 'Harness',
            team_name: 'tamamamakna'
          },
          {
            title: 'colllllak6',
            project_name: 'pjtnamagags2',
            project_no: 'pjtno_kalg_kolomo',
            progress_no: 'pgsno_wqw',
            phase: '89%',
            solution: 'Harness',
            team_name: 'tamamamakna'
          },
          {
            title: 'colllllak6',
            project_name: 'pjtnamagags2',
            project_no: 'pjtno_kalg_kolomo',
            progress_no: 'pgsno_wqw',
            phase: '89%',
            solution: 'Harness',
            team_name: 'tamamamakna'
          },
          {
            title: 'colllllak6',
            project_name: 'pjtnamagags2',
            project_no: 'pjtno_kalg_kolomo',
            progress_no: 'pgsno_wqw',
            phase: '89%',
            solution: 'Harness',
            team_name: 'tamamamakna'
          }
        ];
      }
    }
  },
  data() {
    return {
      taskDetailVisible: false,
      isClose: false,
      taskDetailData: {}
    }
  },
  computed: {
    computedTeamNameLabel() {
      switch (this.tableType) {
        case 1:
        case 2:
          return 'Team';
        case 3:
        case 4:
          return '3D team';
        case 5:
          return 'Label team';
        case 6:
          return 'Simulation team';
        default:
          return 'team';
      }
    },
    computedTableData() {
      let data = [];
      if (this.displayTenRows) {
        data = this.tableData.slice(0, 10);
      } else {
        data = this.tableData.slice(0, 6);
      }
      return data;
    }
  },
  watch: {},
  methods: {
    refreshList() {
      this.$emit('refresh-list');
    },
    closeTaskDetailDrawer() {
      this.taskDetailVisible = false;
      this.isClose = false;
    },
    showTaskDetailDrawer() {
      this.taskDetailVisible = true;
    },
    goToProject(type, row) { 
      this.$router.push({
        path:
          (type === 2 || type === 3 || type === 5)
          ? `/index/project/formal/detail/overview/${row.project_id}`
            : `/index/project/bidding/detail/overview/${row.project_id}`
      });
    },
    goToPhase(type, row) {
      this.$router.push({
        path:
          (type === 2 || type === 3 || type === 5)
          ? `/index/project/formal/detail/phase/${row.project_id}`
            : `/index/project/bidding/detail/phase/${row.project_id}`,
        query: {
          projectId: row.project_id,
          phaseNo: row.progress_no ? row.progress_no : ''
        }
      });
    },
        // v0.9.0获取自定义任务详情
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
    }
  }
};
</script>
<style lang="less">
.personal-table-wrapper {
  .el-table--border .el-table__cell,
  .el-table__body-wrapper
    .el-table--border.is-scrolling-left
    ~ .el-table__fixed {
    padding: 6px;
  }
  .el-table--border .el-table__cell,
  .el-table__body-wrapper
    .el-table--border.is-scrolling-left
    ~ .el-table__fixed {
    border-right: none;
  }
  .el-table--border th.el-table__cell,
  .el-table__fixed-right-patch {
    background: #eeeeee;
  }
  .el-table th.el-table__cell > .cell {
    font-weight: 550;
    font-size: 14px;
    color: #303133;
  }
}
</style>
<style lang="less" scoped>
.personal-table-wrapper {
  width: 100%;

  .clickable {

    &:hover {
      color: #007BFF;
      text-decoration: underline;
      cursor: pointer
    }
  }

  .table-text {
    white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
  }

  .title-wrapper {
    display: flex;
    justify-content: justify-start;
    align-items: center;
    gap: 5px
  }
}
</style>
