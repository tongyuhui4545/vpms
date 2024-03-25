<template>
  <el-table
    :data="errorRateTableData"
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
            sort-by="title"
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
    <!-- Title -->
    <el-table-column :min-width="100">
      <template slot="header">
        <div style="display: flex; align-items: center">
          <el-popover
            ref="performanceTitlePopover"
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
            ref="performance_title_sorter"
            sorter-type="performance_title_sorter"
            sort-by="title"
            @on-sort="handleSort"
          />
          <FastFilteredIcon
            ref="fast_filtered_icon_performance_title"
            filter-for="title"
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
            <p>{{ scope.row.title }}</p>
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
              :options="typeOptions"
              filter-for="type"
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
            <p>{{ computedType(scope.row.type) }}</p>
          </div>
        </div>
      </template>
    </el-table-column>
    <!-- Reject or not -->
    <el-table-column :min-width="120">
      <template slot="header">
        <div style="display: flex; align-items: center">
          <el-popover
            ref="performanceRejectOrNotPopover"
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
            >Reject or not</span>
            <FastFilter
              fast-filter-type="SelectFastFilter"
              :options="yesOrNoOptions"
              filter-for="rejected_or_not"
              @fast-filter="handleFastFilter"
            />
          </el-popover>
          <Sorter
            ref="performance_reject_or_not_sorter"
            sorter-type="performance_reject_or_not_sorter"
            sort-by="is_rejected"
            @on-sort="handleSort"
          />
          <FastFilteredIcon
            ref="fast_filtered_icon_performance_rejected_or_not"
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
            <el-tag :type="scope.row.is_rejected == 1 ? 'danger' : 'success'">
              {{ scope.row.is_rejected == 1 ? 'Yes' : 'No' }}
            </el-tag>
          </div>
        </div>
      </template>
    </el-table-column>
    <!-- Reject reason -->
    <el-table-column :min-width="80">
      <template slot="header">
        <div style="display: flex; align-items: center">
          <el-popover
            ref="performanceRejectReasonPopover"
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
            >Reject reason</span>
            <FastFilter
              fast-filter-type="SelectFastFilter"
              :options="rejectReasonList"
              filter-for="reason"
              @fast-filter="handleFastFilter"
            />
          </el-popover>
          <Sorter
            ref="performance_reject_reason_sorter"
            sorter-type="performance_reject_reason_sorter"
            sort-by="reason"
            @on-sort="handleSort"
          />
          <FastFilteredIcon
            ref="fast_filtered_icon_performance_reason"
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
            <p>{{ scope.row.reason }}</p>
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
            sort-by="title"
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
            sort-by="title"
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
            sort-by="title"
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
                goToPhase(scope.row.type == 2 ? 'formal' : 'others', scope.row)
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
            width="220"
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
              filter-for="phase"
              :options="phaseList"
              @fast-filter="handleFastFilter"
            />
          </el-popover>
          <Sorter
            ref="performance_phase_sorter"
            sorter-type="performance_phase_sorter"
            sort-by="title"
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
                goToPhase(scope.row.type == 2 ? 'formal' : 'others', scope.row)
              "
            >
              {{ scope.row.phase }}
            </p>
          </div>
        </div>
      </template>
    </el-table-column>
    <!--Review time -->
    <el-table-column :min-width="140">
      <template slot="header">
        <div style="display: flex; align-items: center">
          <el-popover
            ref="performanceReviewTimePopover"
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
            >Review time</span>
            <FastFilter
              fast-filter-type="DateRangeFastFilter"
              filter-for="review_time"
              @fast-filter="handleFastFilter"
            />
          </el-popover>
          <Sorter
            ref="performance_review_time_sorter"
            sorter-type="performance_review_time_sorter"
            sort-by="completed_at"
            @on-sort="handleSort"
          />
          <FastFilteredIcon
            ref="fast_filtered_icon_performance_review_time"
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
  </el-table>
</template>

<script>
import FastFilteredIcon from '@/views/project/components/FastFilteredIcon.vue';
import Sorter from '@/views/project/components/Sorter.vue';
import FastFilter from '@/views/project/components/FastFilter.vue';

export default {
  components: {
    FastFilter,
    Sorter,
    FastFilteredIcon
  },
  props: {
    tableData: {
      type: Array,
      default: () => {
        return [];
      }
    },
    fastFilteredIconName: {
      type: String,
      default: ''
    },
    fastFilteredContent: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      fastIconRefs: [
        'fast_filtered_icon_performance_role',
        'fast_filtered_icon_performance_name',
        'fast_filtered_icon_performance_title',
        'fast_filtered_icon_performance_type',
        'fast_filtered_icon_performance_rejected_or_not',
        'fast_filtered_icon_performance_reason',
        'fast_filtered_icon_performance_project_name',
        'fast_filtered_icon_performance_project_no',
        'fast_filtered_icon_performance_phase_no',
        'fast_filtered_icon_performance_phase',
        'fast_filtered_icon_performance_review_time'
      ],
      sorterRefs: [
        'performance_role_sorter',
        'performance_name_sorter',
        'performance_title_sorter',
        'performance_type_sorter',
        'performance_reject_or_not_sorter',
        'performance_reject_reason_sorter',
        'performance_project_name_sorter',
        'performance_project_no_sorter',
        'performance_phase_no_sorter',
        'performance_phase_sorter',
        'performance_review_time_sorter'
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
      rejectReasonList: [
        {
          key: 1,
          label: 'Customer updates',
          value: 'Customer updates'
        },
        {
          key: 2,
          label: 'Drawing errors',
          value: 'Drawing errors'
        },
        {
          key: 3,
          label: 'Quote errors',
          value: 'Quote errors'
        },
        {
          key: 4,
          label: 'Others',
          value: 'Others'
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
      showFilter: false,
      filterNum: 0,
      tabActive: 1,
      errorRateTableData: []
    };
  },
  watch: {
    tableData: {
      handler(val) {
        this.errorRateTableData = val;
      },
      immediate: true
    },
    fastFilteredContent: {
      handler() {
        this.showFastFilterIcon();
      },
      immediate: true
    }
  },
  mounted() {
    // this.getRoleList();
  },
  methods: {
    cancelAllFastFilter() {
      this.fastIconRefs.forEach((item) => {
        if (this.$refs[item]) {
          this.$refs[item].hide();
        }
      });
      this.resetFastFilterData();
      this.currentPage = 1;
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
    showFastFilterIcon() {
      this.fastIconRefs.forEach((item) => {
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
    computedType(type) {
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
    goBackToChart() {
      this.$router.push({
        name: 'performanceAppraisal'
      });
    },
    toggleFilterDisplay() {
      this.showFilter = !this.showFilter;
    },
    handleChooseTab(tab) {
      this.tabActive = tab.id;
    },
    closePopover() {
      return;
    },
    handleFastFilter(val, filterType, filterFor) {
      this.$emit('fast-filter', val, filterType, filterFor);
    },
    handleSort(order, sorterType, sortBy) {
      this.$emit('on-sort', order, sorterType, sortBy);
      this.clearOtherSorterStyle(sorterType);
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
      this.$emit('cancel-fast-filter');
    }
  }
};
</script>

<style lang="less" scoped>
.table-project-clickable-text {
  color: black;
  text-decoration: none;

  &:hover {
    color: #409eff;
    text-decoration: underline;
    cursor: pointer;
  }
}
</style>
