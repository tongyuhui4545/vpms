<template>
  <div class="filter-wrapper">
    <el-table
      :data="tableData"
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
              @click="goToPhase('formal', scope.row)"
            >
              {{ scope.row.title }}
            </p>
            <ClockTag
              v-if="workItemType == 1"
              :due-date="scope.row.work_due_date || ''"
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
            {{ scope.row.solution }}
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
                scope.row.progress_status_label &&
                  scope.row.progress_status_label.length <= 15
              "
              :tag-text="scope.row.progress_status_label"
              type="3d-formal"
            />
            <el-tooltip
              v-else
              :content="scope.row.progress_status_label"
              placement="top-start"
            >
              <QuoteStatusTag
                :tag-text="scope.row.progress_status_label"
                type="3d-formal"
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
  </div>
</template>

<script>
import QuoteStatusTag from '../QuoteStatusTag.vue';
import ClockTag from '@/components/common/ClockTag.vue';

export default {
  name: 'ThreeDBiddingTaskOverview',
  components: {
    QuoteStatusTag,
    ClockTag
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
    }
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
  methods: {
    goToPhase(type, row) {
      this.$router.push({
        path:
          type === 'formal'
            ? `/index/project/formal/detail/overview/${row.project_id}`
            : `/index/project/bidding/detail/overview/${row.project_id}`
        // query: {
        //   projectId: row.project_id,
        //   phaseNo: row.progress_no ? row.progress_no : ''
        // }
      });
    },
    goToProject(type, row) {
      this.$router.push({
        path:
          type === 'formal'
            ? `/index/project/formal/detail/phase/${row.project_id}`
            : `/index/project/bidding/detail/phase/${row.project_id}`,
        query: {
          projectId: row.project_id
        }
      });
    }
  }
};
</script>

<style lang="less" scoped>
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
</style>
