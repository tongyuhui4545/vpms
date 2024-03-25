<template>
  <div
    class="test-div"
  >
    <component
      :is="fastFilterType"
      :options="options"
      :filter-for="filterFor"
      :placeholder="placeholder"
      @fast-filter="handleFastFilter"
      @date-picker-opened="handleDatePickerOpened"
    />
  </div>
</template>

<script>
import InputFastFilter from './fast-filters/InputFastFilter.vue';
import SelectFastFilter from './fast-filters/SelectFastFilter.vue';
import DateRangeFastFilter from './fast-filters/DateRangeFastFilter.vue';

import Phase from './fast-filters/Phase.vue';
import CalculationStatus from './fast-filters/CalculationStatus.vue';
import SimulationStatus from './fast-filters/SimulationStatus.vue';

import ProjectName from './fast-filters/ProjectName.vue';
import CreationTime from './fast-filters/CreationTime.vue';
import Creator from './fast-filters/Creator.vue';
import Customer from './fast-filters/Customer.vue';
import CustomerDuedate from './fast-filters/CustomerDuedate.vue';
import InternalDuedate from './fast-filters/InternalDuedate.vue';
import QuoteStatus from './fast-filters/QuoteStatus.vue';
import ProjectNo from './fast-filters/ProjectNo.vue';
import Sales from './fast-filters/Sales.vue';
import Size from './fast-filters/Size.vue';
import Solution from './fast-filters/Solution.vue';
import Status from './fast-filters/Status.vue';
import Team from './fast-filters/Team.vue';
import TeamDuedate from './fast-filters/TeamDuedate.vue';
import AssignTo from './AssignTo.vue';

import CompletionTime from './fast-filters/CompletionTime.vue';
import Completer from './fast-filters/Completer.vue';

import LabelTeam from './fast-filters/LabelTeam.vue';
import LabelDuedate from './fast-filters/LabelDuedate.vue';
import LabelSolution from './fast-filters/LabelSolution.vue';
import LabelStatus from './fast-filters/LabelStatus.vue';

import QuoteTitle from './quote-fast-filters/QuoteTitle.vue';
import QuoteProjectName from './quote-fast-filters/QuoteProjectName.vue';
import QuoteProjectNo from './quote-fast-filters/QuoteProjectNo.vue';
import QuotePhaseNo from './quote-fast-filters/QuotePhaseNo.vue';
import QuotePhase from './quote-fast-filters/QuotePhase.vue';
import QuoteSolution from './quote-fast-filters/QuoteSolution.vue';
import QuoteTeam from './quote-fast-filters/QuoteTeam.vue';
import QuoteTaskStatus from './quote-fast-filters/QuoteTaskStatus.vue';
import QuoteCustomerDuedate from './quote-fast-filters/QuoteCustomerDuedate.vue';
import QuoteInternalDuedate from './quote-fast-filters/QuoteInternalDuedate.vue';
import QuoteTeamDuedate from './quote-fast-filters/QuoteTeamDuedate.vue';
import QuoteCreationDate from './quote-fast-filters/QuoteCreationDate.vue';
import QuoteCreator from './quote-fast-filters/QuoteCreator.vue';

import LabelTaskTitle from './label-fast-filters/LabelTaskTitle.vue';
import LabelTaskProjectName from './label-fast-filters/LabelTaskProjectName.vue';
import LabelTaskProjectNo from './label-fast-filters/LabelTaskProjectNo.vue';
import LabelTaskTeam from './label-fast-filters/LabelTaskTeam.vue';
import LabelTaskCreationDate from './label-fast-filters/LabelTaskCreationDate.vue';

import SimulationTeam from './fast-filters/SimulationTeam.vue';

export default {
  components: {
    InputFastFilter,
    SelectFastFilter,
    DateRangeFastFilter,
    SimulationTeam,
    AssignTo,

    CalculationStatus,
    SimulationStatus,
    Phase,

    ProjectName,
    ProjectNo,
    CreationTime,
    Creator,
    Customer,
    CustomerDuedate,
    InternalDuedate,
    QuoteStatus,
    Sales,
    Size,
    Solution,
    Status,
    Team,
    TeamDuedate,
    LabelTeam,
    LabelDuedate,
    LabelSolution,
    LabelStatus,

    CompletionTime,
    Completer,

    QuoteTitle,
    QuoteProjectName,
    QuoteProjectNo,
    QuotePhaseNo,
    QuotePhase,
    QuoteSolution,
    QuoteTeam,
    QuoteTaskStatus,
    QuoteCustomerDuedate,
    QuoteInternalDuedate,
    QuoteTeamDuedate,
    QuoteCreationDate,
    QuoteCreator,

    LabelTaskTitle,
    LabelTaskProjectName,
    LabelTaskProjectNo,
    LabelTaskTeam,
    LabelTaskCreationDate
  },
  props: {
    fastFilterType: {
      type: String,
      default: ''
    },
    placeholder: {
      type: String,
      default: 'please input'
    },
    filterFor: {
      type: String,
      default: ''
    },
    options: {
      type: Array,
      default: () => {return []}
    }
  },
  data() {
    return {
      visible: false,
      hasChildPopover: false
    };
  },
  methods: {
    handleDatePickerOpened() {
      this.hasChildPopover = true;
    },
    judgeMoseLeave() {
      if (!this.hasChildPopover) {
        this.setPopover(0);
      }
      return;
    },
    setPopover(num) {
      if(num === 1) {
        this.visible = true
      }
      else {
        this.visible = false
      }
    },
    handleFastFilter(val) {
      this.$emit('fast-filter', val, this.fastFilterType, this.filterFor);
    }
  }
};
</script>

<style lang="less" scoped>
// .fast-filter-container {
//   display: flex;
//   align-items: center;
//   justify-content: space-between;
//   height: 36px;
//   margin: 8px 0;
//   color: #606266;

//   .test-div {
//     position: absolute;
//     max-height: 260px;
//     overflow: auto;
//     width: 100%;
//     left: 0;
//     top: 100%;
//     background: #fff;
//     box-shadow: 0 2px 4px 1px rgba(0 0 0 0.1);
//     border-radius: 4px;
//   }

//   .test-div::-webkit-scrollbar {
//     width: 3px;
//     height: 3px;
//   }

//   &:hover {
//     cursor: pointer;
//     background: #f2f6fc;
//     color: #007bff;
//   }
// }
</style>
