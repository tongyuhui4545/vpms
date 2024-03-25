<template>
  <div class="table-content-container">
    <el-table
      :data="handledTableData"
      border
      empty-text=" "
      @row-click="rowClick"
    >
      <template
        v-if="handledTableData.length == 0"
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
        :show-overflow-tooltip="true"
        min-width="286px"
        fixed
      >
        <template slot-scope="scope">
          <div class="center">
            <div>{{ scope.row.title }}</div>
            <div class="title-wrapper">
              <ClockTag
                :due-date="pickDueDate(scope.row)"
                class="clock-tag"
              />
            </div>
          </div>
        </template>
      </el-table-column>
      <el-table-column
        label="Type"
        :show-overflow-tooltip="true"
        min-width="128px"
        prop="task_type_value"
      />
      <el-table-column
        label="Task No."
        min-width="114px"
        :show-overflow-tooltip="true"
        prop="task_no"
      />
      <el-table-column
        label="Priority"
        :show-overflow-tooltip="true"
        prop="priority_value"
        min-width="102px"
      />
      <el-table-column
        label="Tag"
        :show-overflow-tooltip="true"
        prop="tags"
        min-width="125px"
      />
      <el-table-column
        label="Status"
        min-width="122px"
        :show-overflow-tooltip="true"
      >
        <template slot-scope="scope">
          <el-tag
            v-if="scope.row.status && scope.row.status_value.length <= 7"
            :color="mapStatusColor(scope.row.status)"
            class="status-tag"
            :style="{ 'border-color': mapStatusColor(scope.row.status) }"
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
              :style="{ 'border-color': mapStatusColor(scope.row.status) }"
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
        label="Task due date"
        width="176px"
        :show-overflow-tooltip="true"
        prop="task_due_date"
      />
      <el-table-column
        label="Estimated start date"
        min-width="180px"
        :show-overflow-tooltip="true"
        prop="estimated_start_date"
      />
    </el-table>

    <el-drawer
      :visible.sync="taskDetailVisible"
      :with-header="false"
      size="1440px"
      :show-close="true"
      @close="taskDetailVisible = false"
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
import { getCustomTaskDetail } from '@/api/index';
import TaskDetail from './task-detail.vue';
export default {
  components: {
    ClockTag,
    TaskDetail
  },
  props: {
    tableData: {
      type: Array,
      default: () => {
        return [];
      }
    }
  },
  emits: ['refresh'],
  data() {
    return {
      handledTableData: [],
      taskDetailVisible: false,
      taskDetailData: {}
    };
  },
  watch: {
    tableData: {
      handler(val) {
        this.handledTableData = val;
      },
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
    pickDueDate(row) {
      return row.task_due_date;
    },
    rowClick(row) {
      this.getCustomTaskDetail(row.id);
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
    closeTaskDetailDrawer() {
      this.taskDetailVisible = false;
    },
    showTaskDetailDrawer() {
      this.taskDetailVisible = true;
    },
    refreshList() {
      this.$emit('refresh');
    }
  }
};
</script>

<style lang="less" scoped>
.table-content-container {
  :deep(.el-table) {
    border-radius: 8px 8px 8px 8px;
  }

  :deep(.el-table th.el-table__cell > .cell) {
    font-weight: 550;
  }

  :deep(thead .el-table__cell) {
    height: 40px;
    font-size: 14px;
    font-weight: 400;
    color: #303133;
  }

  :deep(.el-table__row .el-table__cell) {
    height: 64px;
    font-size: 14px;
    font-weight: 400;
    color: #606266;
  }

  :deep(.el-table__body tr:hover > td) {
    background-color: #fafafa !important;
  }

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

  .status-tag {
    color: #fff;
    width: 81px;
    height: 32px;
    border-radius: 4px;
    text-align: center;
    font-size: 14px;
  }

  .clock-tag {
    margin-left: 3px;
  }

  .title-wrapper {
    display: flex;
    justify-content: flex-start;
    align-items: center;
  }

  .center {
    display: flex;
    align-items: center;
  }
}
</style>
