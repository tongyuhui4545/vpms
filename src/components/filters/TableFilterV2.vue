<template>
  <div class="filter-area">
    <div :class="filterWrapperClass">
      <component
        :is="filterName"
        ref="filterComponent"
        :current-task-type="currentTaskType"
        @on-filter="handleFilter"
      />
    </div>
  </div>
</template>

<script>
import BiddingProjectFilter from './BiddingProjectFilter.vue';
import FormalProjectFilter from './FormalProjectFilter.vue';
import QuoteTaskFilter from './QuoteTaskFilter.vue';
import FormalTaskFilter from './FormalTaskFilter.vue';
import LabelTaskFilter from './LabelTaskFilter.vue';
import PerformanceAppraisalFilterOverdueRate from './PerformanceAppraisalFilterOverdueRate.vue';
import PerformanceAppraisalFilterErrorRate from './PerformanceAppraisalFilterErrorRate.vue';
//3d的任务过滤器
import ThreeDBiddingTaskFilter from './3d-task-filters/ThreeDBiddingTaskFilter.vue';
import ThreeDFormalTaskFilter from './3d-task-filters/ThreeDFormalTaskFilter.vue';
import SimulationTaskFilter from './3d-task-filters/SimulationTaskFilter.vue';
//项目详情中的Quote列表中的filter
import ProjectQuoteFilter from './ProjectQuoteFilter.vue';
import CustomTaskFilter from './custom-task-filter.vue';
//项目详情中Task里面的所有filters
import DetailQuoteTaskFilter from './project-detail-task-filters/DetailQuoteTaskFilter.vue';
import DetailFormalTaskFilter from './project-detail-task-filters/DetailFormalTaskFilter.vue';
import DetailLabelTaskFilter from './project-detail-task-filters/DetailLabelTaskFilter.vue';
import DetailSimulationTaskFilter from './project-detail-task-filters/DetailSimulationTaskFilter.vue';
import DetailThreeDBiddingTaskFilter from './project-detail-task-filters/DetailThreeDBiddingTaskFilter.vue';
import DetailThreeDFormalTaskFilter from './project-detail-task-filters/DetailThreeDFormalTaskFilter.vue';
import DetailCustomTaskFilter from './project-detail-task-filters/DetailCustomTaskFilter.vue';

//首页dashboard中的 ongoing tasks filter
import OngoingTasksFilter from './work-table/ongoing-tasks-filter.vue';
import NewProjectFilter from './work-table/new-project-filter.vue';
import NewPhaseFilter from './work-table/new-phase-filter.vue';

export default {
  name: 'TableFilter',
  components: {
    BiddingProjectFilter,
    FormalProjectFilter,
    QuoteTaskFilter,
    FormalTaskFilter,
    LabelTaskFilter,
    PerformanceAppraisalFilterOverdueRate,
    PerformanceAppraisalFilterErrorRate,

    ThreeDBiddingTaskFilter,
    ThreeDFormalTaskFilter,
    SimulationTaskFilter,
    ProjectQuoteFilter,
    CustomTaskFilter,

    DetailQuoteTaskFilter,
    DetailFormalTaskFilter,
    DetailLabelTaskFilter,
    DetailSimulationTaskFilter,
    DetailThreeDBiddingTaskFilter,
    DetailThreeDFormalTaskFilter,
    DetailCustomTaskFilter,

    OngoingTasksFilter,
    NewProjectFilter,
    NewPhaseFilter
  },
  props: {
    filterName: {
      type: String,
      default: 'BiddingProjectFilter'
    },
    currentTaskType: {
      type: Number, 
      default: 0
    }
  },
  computed: {
    filterWrapperClass() {
      let taskFilters = [
        'QuoteTaskFilter',
        'FormalTaskFilter',
        'LabelTaskFilter'
      ];
      return {
        'filter-wrapper': true,
        'task-filter': taskFilters.includes(this.filterName)
      };
    }
  },
  methods: {
    handleFilter(formData, filterNum) {
      this.$emit('on-filter', formData, filterNum);
    },
    setDateRange(range) {
      this.$nextTick(() => {
        this.$refs.filterComponent.setDateRange(range);
      })
    },
    setRole(role, months, projectType) {
      this.$refs.filterComponent.setRole(role, months, projectType);
    },
    resetFilterForm() {
      let filterRefs = [
        'BiddingProjectFilter',
        'FormalProjectFilter',
        'QuoteTaskFilter',
        'FormalTaskFilter',
        'LabelTaskFilter',
        'CustomTaskFilter'
      ];
      filterRefs.forEach((item) => {
        if (this.$refs[item]) {
          this.$refs[item].resetForm();
        }
      });
      this.$refs.filterComponent.resetForm();
      this.$store.dispatch('app/changeProjectFilterNum', 0);
      this.$store.dispatch('app/changeFormalProjectFilterNum', 0);
    }
  }
};
</script>

<style lang="less" scoped>
.filter-area {
  border-radius: 4px;
  background: #f5f7fa;
  margin-right: 25px;

  .filter-wrapper {
    width: 1856px;
    margin-top: 15px;
    flex: 1;
  }

  .task-filter {
    width: 1600px;
  }
}
</style>
