<template>
  <div class="quote-list-container">
    <div class="filter-wrapper">
      <transition
        name="fade"
        mode="out-in"
      >
        <TableFilterV2
          v-show="showFilter"
          ref="tableFilterV2"
          class="filter-area"
          filter-name="ProjectQuoteFilter"
          @on-filter="handleOnFilter"
        />
      </transition>
    </div>
    <div class="title-part">
      <span class="title">Quote</span>
      <div
        class="return-btn"
        @click="goBackToProjectList"
      >
        <i class="el-icon-back" />
        <span style="font-size: 16px">Return</span>
      </div>
    </div>
    <div class="header-part">
      <!-- <span>Quote</span> -->
      <div class="header-right">
        <div
          v-if="mode === 'table'"
          class="operation-wrapper"
        >
          <div class="operation-group-1">
            <TogglableSearchBar
              :placeholder="'Enter project to search'"
              @on-search="handleSearch"
            />
            <div
              class="filter-icon"
              @click="toggleFilterDisplay"
            >
              <el-badge
                v-if="filterNum !== 0"
                :value="filterNum"
              >
                <FilterIcon />
              </el-badge>
              <FilterIcon v-else />
            </div>
          </div>
          <DividerVertical />
        </div>
        <TableDisplaySelector
          :options="quoteDisplayOptions"
          @on-select="handleOnDisplayTypeChange"
        />
      </div>
    </div>
    <div
      v-show="mode === 'table'"
      class="list-part"
    >
      <el-table
        ref="quoteTable"
        :data="tableData"
        style="overflow-x: auto"
        :table-key="tableKey"
        stripe
        size="small"
        border
      >
        <!-- Version -->
        <el-table-column
          min-width="100"
          :show-overflow-tooltip="true"
        >
          <template slot="header">
            <div
              class="header-wrapper"
              style="
                display: flex;
                justify-content: flex-start;
                align-items: center;
                order: -1;
              "
            >
              <el-popover
                placement="bottom-start"
                width="260"
                popper-class="el-popover-self"
                trigger="hover"
                :visible-arrow="false"
              >
                <span
                  slot="reference"
                  class="column-on-hover"
                  @click="closePopover"
                >Version</span>
                <FastFilter
                  fast-filter-type="InputFastFilter"
                  filter-for="version"
                  @fast-filter="handleFastFilter"
                />
              </el-popover>
              <Sorter
                ref="version"
                sorter-type="version"
                sort-by="version"
                @on-sort="handleSort"
              />
              <FastFilteredIcon
                ref="fast_filtered_icon_version"
                @cancel="handleCancelFastFilter"
              />
            </div>
          </template>
          <template slot-scope="scope">
            <p
              v-if="scope.row.version"
              class="project-name"
            >
              V{{ scope.row.version }}
            </p>
          </template>
        </el-table-column>
        <!-- Type -->
        <el-table-column
          min-width="100"
          :show-overflow-tooltip="true"
        >
          <template slot="header">
            <div
              class="header-wrapper"
              style="
                display: flex;
                justify-content: flex-start;
                align-items: center;
                order: -1;
              "
            >
              <el-popover
                ref="projectNoPopover"
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
                >Type</span>
                <FastFilter
                  fast-filter-type="SelectFastFilter"
                  :options="productTypeOptions"
                  filter-for="type"
                  @fast-filter="handleFastFilter"
                />
              </el-popover>
              <Sorter
                ref="type"
                sorter-type="type"
                sort-by="type"
                @on-sort="handleSort"
              />
              <FastFilteredIcon
                ref="fast_filtered_icon_type"
                @cancel="handleCancelFastFilter"
              />
            </div>
          </template>
          <template slot-scope="scope">
            <p
              v-if="scope.row.type"
              class="project-name"
            >
              {{ scope.row.type }}
            </p>
          </template>
        </el-table-column>
        <!-- Phase No. -->
        <el-table-column
          min-width="120"
          :show-overflow-tooltip="true"
        >
          <template slot="header">
            <div
              class="header-wrapper"
              style="
                display: flex;
                justify-content: flex-start;
                align-items: center;
                order: -1;
              "
            >
              <el-popover
                placement="bottom-start"
                width="260"
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
                ref="phase_no"
                sorter-type="phase_no"
                sort-by="phase_no"
                @on-sort="handleSort"
              />
              <FastFilteredIcon
                ref="fast_filtered_icon_phase_no"
                @cancel="handleCancelFastFilter"
              />
            </div>
          </template>
          <template slot-scope="scope">
            <p
              v-if="scope.row.phase_no"
              class="project-name"
            >
              {{ scope.row.phase_no }}
            </p>
          </template>
        </el-table-column>
        <!-- Phase -->
        <el-table-column
          min-width="120"
          :show-overflow-tooltip="true"
        >
          <template slot="header">
            <div
              class="header-wrapper"
              style="
                display: flex;
                justify-content: flex-start;
                align-items: center;
                order: -1;
              "
            >
              <el-popover
                placement="bottom-start"
                width="260"
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
                ref="phase"
                sorter-type="phase"
                sort-by="phase"
                @on-sort="handleSort"
              />
              <FastFilteredIcon
                ref="fast_filtered_icon_phase"
                @cancel="handleCancelFastFilter"
              />
            </div>
          </template>
          <template slot-scope="scope">
            <p
              v-if="scope.row.phase"
              class="project-name"
            >
              {{ scope.row.phase }}
            </p>
          </template>
        </el-table-column>
        <!-- Quote status -->
        <el-table-column
          min-width="160"
          :show-overflow-tooltip="true"
        >
          <template slot="header">
            <div
              class="header-wrapper"
              style="
                display: flex;
                justify-content: flex-start;
                align-items: center;
                order: -1;
              "
            >
              <el-popover
                placement="bottom-start"
                width="260"
                popper-class="el-popover-self"
                trigger="hover"
                :visible-arrow="false"
              >
                <span
                  slot="reference"
                  class="column-on-hover"
                  @click="closePopover"
                >Quote status</span>
                <FastFilter
                  fast-filter-type="SelectFastFilter"
                  :options="quoteStatus"
                  filter-for="quote_status"
                  @fast-filter="handleFastFilter"
                />
              </el-popover>
              <Sorter
                ref="quote_status"
                sorter-type="quote_status"
                sort-by="quote_status"
                @on-sort="handleSort"
              />
              <FastFilteredIcon
                ref="fast_filtered_icon_quote_status"
                @cancel="handleCancelFastFilter"
              />
            </div>
          </template>
          <template slot-scope="scope">
            <p
              v-if="scope.row.quote_status"
              class="project-name"
            >
              <QuoteStatusTag
                :tag-text="scope.row.quote_status"
                type="quote"
              />
            </p>
          </template>
        </el-table-column>
        <!-- Project No. -->
        <el-table-column
          min-width="120"
          :show-overflow-tooltip="true"
        >
          <template slot="header">
            <div
              class="header-wrapper"
              style="
                display: flex;
                justify-content: flex-start;
                align-items: center;
                order: -1;
              "
            >
              <el-popover
                placement="bottom-start"
                width="260"
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
                ref="project_no"
                sorter-type="project_no"
                sort-by="project_no"
                @on-sort="handleSort"
              />
              <FastFilteredIcon
                ref="fast_filtered_icon_project_no"
                @cancel="handleCancelFastFilter"
              />
            </div>
          </template>
          <template slot-scope="scope">
            <p
              v-if="scope.row.project_no"
              class="project-name"
            >
              {{ scope.row.project_no }}
            </p>
          </template>
        </el-table-column>
        <!-- Project name -->
        <el-table-column
          min-width="120"
          :show-overflow-tooltip="true"
        >
          <template slot="header">
            <div
              class="header-wrapper"
              style="
                display: flex;
                justify-content: flex-start;
                align-items: center;
                order: -1;
              "
            >
              <el-popover
                placement="bottom-start"
                width="260"
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
                ref="project_name"
                sorter-type="project_name"
                sort-by="project_name"
                @on-sort="handleSort"
              />
              <FastFilteredIcon
                ref="fast_filtered_icon_project_name"
                @cancel="handleCancelFastFilter"
              />
            </div>
          </template>
          <template slot-scope="scope">
            <p
              v-if="scope.row.project_name"
              class="project-name"
            >
              {{ scope.row.project_name }}
            </p>
          </template>
        </el-table-column>
        <!-- Team -->
        <el-table-column
          min-width="80"
          :show-overflow-tooltip="true"
        >
          <template slot="header">
            <div
              class="header-wrapper"
              style="
                display: flex;
                justify-content: flex-start;
                align-items: center;
                order: -1;
              "
            >
              <el-popover
                placement="bottom-start"
                width="260"
                popper-class="el-popover-self"
                trigger="hover"
                :visible-arrow="false"
              >
                <span
                  slot="reference"
                  class="column-on-hover"
                  @click="closePopover"
                >Team</span>
                <FastFilter
                  fast-filter-type="SelectFastFilter"
                  :options="teamOptions"
                  filter-for="team"
                  @fast-filter="handleFastFilter"
                />
              </el-popover>
              <Sorter
                ref="team_id"
                sorter-type="team_id"
                sort-by="team_id"
                @on-sort="handleSort"
              />
              <FastFilteredIcon
                ref="fast_filtered_icon_team"
                @cancel="handleCancelFastFilter"
              />
            </div>
          </template>
          <template slot-scope="scope">
            <p
              v-if="scope.row.team_name"
              class="project-name"
            >
              {{ scope.row.team_name }}
            </p>
          </template>
        </el-table-column>
        <!-- Quote file -->
        <el-table-column
          min-width="120"
          :show-overflow-tooltip="true"
        >
          <template slot="header">
            <div
              class="header-wrapper"
              style="
                display: flex;
                justify-content: flex-start;
                align-items: center;
                order: -1;
              "
            >
              <el-popover
                placement="bottom-start"
                width="260"
                popper-class="el-popover-self"
                trigger="hover"
                :visible-arrow="false"
              >
                <span
                  slot="reference"
                  class="column-on-hover"
                  @click="closePopover"
                >Quote file</span>
                <FastFilter
                  fast-filter-type="InputFastFilter"
                  filter-for="files"
                  @fast-filter="handleFastFilter"
                />
              </el-popover>
              <Sorter
                ref="files"
                sorter-type="files"
                sort-by="files"
                @on-sort="handleSort"
              />
              <FastFilteredIcon
                ref="fast_filtered_icon_quote_file"
                @cancel="handleCancelFastFilter"
              />
            </div>
          </template>
          <template slot-scope="scope">
            <p
              v-if="scope.row.files[0]"
              class="ellipsis"
            >
              {{ scope.row.files[0].name }}
            </p>
          </template>
        </el-table-column>
        <!-- Total price($) -->
        <el-table-column
          min-width="130"
          :show-overflow-tooltip="true"
        >
          <template #header>
            <div
              class="header-wrapper"
              style="
                display: flex;
                justify-content: flex-start;
                align-items: center;
                order: -1;
              "
            >
              <el-popover
                placement="bottom-start"
                min-width="280"
                popper-class="el-popover-self"
                trigger="hover"
                :visible-arrow="false"
              >
                <span
                  slot="reference"
                  class="column-on-hover"
                  @click="closePopover"
                >Total price {{ formedCurrency }}</span>
                <FastFilter
                  fast-filter-type="InputFastFilter"
                  filter-for="total_price"
                  @fast-filter="handleFastFilter"
                />
                <!-- </el-popover> -->
                <Sorter
                  ref="total_price"
                  sorter-type="total_price"
                  sort-by="total_price"
                  @on-sort="handleSort"
                />
                <FastFilteredIcon
                  ref="fast_filtered_icon_total_price"
                  @cancel="handleCancelFastFilter"
                />
              </el-popover>
            </div>
          </template>
          <template slot-scope="scope">
            <p
              v-if="scope.row.total_price"
              class="project-name"
            >
              {{ scope.row.total_price }}
            </p>
          </template>
        </el-table-column>
        <!-- per watt price($) -->
        <el-table-column
          min-width="170"
          :show-overflow-tooltip="true"
        >
          <template slot="header">
            <div
              class="header-wrapper"
              style="
                display: flex;
                justify-content: flex-start;
                align-items: center;
                order: -1;
              "
            >
              <el-popover
                placement="bottom-start"
                width="280"
                popper-class="el-popover-self"
                trigger="hover"
                :visible-arrow="false"
              >
                <span
                  slot="reference"
                  class="column-on-hover"
                  @click="closePopover"
                >Per watt price {{ formedCurrency }}</span>
                <FastFilter
                  fast-filter-type="InputFastFilter"
                  filter-for="per_watt_price"
                  @fast-filter="handleFastFilter"
                />
              </el-popover>
              <Sorter
                ref="per_watt_price"
                sorter-type="per_watt_price"
                sort-by="per_watt_price"
                @on-sort="handleSort"
              />
              <FastFilteredIcon
                ref="fast_filtered_icon_per_watt_price"
                @cancel="handleCancelFastFilter"
              />
            </div>
          </template>
          <template slot-scope="scope">
            <p
              v-if="scope.row.per_watt_price"
              class="project-name"
            >
              {{ scope.row.per_watt_price }}
            </p>
          </template>
        </el-table-column>
        <!-- Creator -->
        <el-table-column
          min-width="100"
          :show-overflow-tooltip="true"
        >
          <template slot="header">
            <div
              class="header-wrapper"
              style="
                display: flex;
                justify-content: flex-start;
                align-items: center;
                order: -1;
              "
            >
              <el-popover
                placement="bottom-start"
                width="260"
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
                  fast-filter-type="SelectFastFilter"
                  :options="userList"
                  filter-for="creation_id"
                  @fast-filter="handleFastFilter"
                />
              </el-popover>
              <Sorter
                ref="creation_id"
                sorter-type="creation_id"
                sort-by="creation_id"
                @on-sort="handleSort"
              />
              <FastFilteredIcon
                ref="fast_filtered_icon_creator"
                @cancel="handleCancelFastFilter"
              />
            </div>
          </template>
          <template slot-scope="scope">
            <p
              v-if="scope.row.creation_name"
              class="project-name"
            >
              {{ scope.row.creation_name }}
            </p>
          </template>
        </el-table-column>
        <!-- Creation date -->
        <el-table-column
          min-width="130"
          :show-overflow-tooltip="true"
        >
          <template slot="header">
            <div
              class="header-wrapper"
              style="
                display: flex;
                justify-content: flex-start;
                align-items: center;
                order: -1;
              "
            >
              <el-popover
                placement="bottom-start"
                width="260"
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
                ref="created_at"
                sorter-type="created_at"
                sort-by="created_at"
                @on-sort="handleSort"
              />
              <FastFilteredIcon
                ref="fast_filtered_icon_created_at"
                @cancel="handleCancelFastFilter"
              />
            </div>
          </template>
          <template slot-scope="scope">
            <p
              v-if="scope.row.created_at"
              class="project-name"
            >
              {{ scope.row.created_at }}
            </p>
          </template>
        </el-table-column>
        <!-- Action -->
        <el-table-column
          fixed="right"
          label="Action"
          min-width="120"
        >
          <template slot-scope="scope">
            <i
              v-if="scope.row.files[0]"
              class="el-icon-view table-icon animate"
              @click="handleView(scope.row)"
            />
            <i
              v-if="scope.row.files[0]"
              class="el-icon-download table-icon animate"
              @click="handleDownload(scope.row)"
            />
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div
      v-if="mode === 'chart'"
      class="chart-part"
    >
      <div class="chart-wrapper">
        <QuoteBarChart
          :raw-data="quoteChartDataBar"
          :currency="formedCurrency"
        />
      </div>
      <div class="chart-wrapper">
        <div class="line-chart-type-selector">
          <el-select
            v-model="lineChartType"
            size="mini"
            style="width: 120px; height: 32px; border-radius: 4px"
            @change="handleLineDisplayTypeChange"
          >
            <el-option value="All">
              All
            </el-option>
            <el-option value="Harness">
              Harness
            </el-option>
            <el-option value="Lynx">
              Lynx
            </el-option>
            <el-option value="Alex">
              Alex
            </el-option>
          </el-select>
        </div>
        <QuoteLineChart
          ref="line-chart"
          :currency="formedCurrency"
          :raw-data="quoteChartDataLine"
        />
      </div>
    </div>
    <div class="pagination-part">
      <NormalPagination
        v-if="mode === 'table'"
        :total-rows="pageInfo.totalRows"
        :page-size="pageInfo.pageSize"
        :current-page="pageInfo.currentPage"
        @page-change="handlePageChange"
        @page-size-change="handlePageSizeChange"
      />
    </div>
  </div>
</template>

<script>
import TogglableSearchBar from '@/components/common/TogglableSearchBar.vue';
import FilterIcon from '@/components/filters/FilterIcon.vue';
import DividerVertical from '@/components/common/DividerVertical.vue';
import TableDisplaySelector from '@/components/buttons-and-selectors/TableDisplaySelector.vue';
import Sorter from '@/views/project/components/Sorter.vue';
import FastFilter from '@/views/project/components/FastFilter.vue';
import FastFilteredIcon from '@/views/project/components/FastFilteredIcon.vue';
import TableFilterV2 from '@/components/filters/TableFilterV2.vue';
import QuoteStatusTag from '@/views/work-table/components/QuoteStatusTag.vue';
import NormalPagination from '@/components/NormalPagination.vue';

import QuoteBarChart from './components/QuoteBarChart.vue';
import QuoteLineChart from './components/QuoteLineChart.vue';
import { getQuoteList, teamList, userList } from '@/api';

import { directDownload } from '@/utils/commons';
import {
  PRODUCT_TYPE_OPTIONS,
  QUOTE_STATUS_OPTIONS,
  PHASE_VALUES
} from '@/utils/constants';

export default {
  name: '',
  components: {
    TogglableSearchBar,
    FilterIcon,
    DividerVertical,
    NormalPagination,
    TableDisplaySelector,
    QuoteStatusTag,
    Sorter,
    FastFilter,
    FastFilteredIcon,
    TableFilterV2,
    QuoteBarChart,
    QuoteLineChart
  },
  props: {},
  data() {
    return {
      fast_icons_ref: [
        'fast_filtered_icon_version',
        'fast_filtered_icon_type',
        'fast_filtered_icon_phase_no',
        'fast_filtered_icon_phase',
        'fast_filtered_icon_quote_status',
        'fast_filtered_icon_project_no',
        'fast_filtered_icon_project_name',
        'fast_filtered_icon_team',
        'fast_filtered_icon_quote_file',
        'fast_filtered_icon_total_price',
        'fast_filtered_icon_per_watt_price',
        'fast_filtered_icon_creator',
        'fast_filtered_icon_created_at'
      ],
      sorter_refs: [
        'version',
        'type',
        'phase_no',
        'phase',
        'quote_status',
        'project_no',
        'project_name',
        'team_id',
        'files',
        'total_price',
        'per_watt_price',
        'creation_id',
        'created_at'
      ],
      currency: 'USD',
      formedCurrency:'($)',
      tableKey: 0,
      quoteStatus: QUOTE_STATUS_OPTIONS,
      order: '',
      orderBy: '',
      filterNum: 0,
      productTypeOptions: PRODUCT_TYPE_OPTIONS,
      mode: 'table',
      lineChartType: 'All',
      typeOptions: [
        {
          id: 1,
          label: 'Alex'
        }
      ],
      phaseList: PHASE_VALUES,
      userList: [],
      teamOptions: [],
      pageInfo: { totalRows: 0, currentPage: 1, pageSize: 20 },
      projectId: this.$route.params.project_id || '',
      quoteChartDataBar: {},
      quoteChartDataLine: {},
      tableData: [
        // {
        //   version: 'v0.8.0',
        //   type: 'Harness',
        //   phase_no: '1',
        //   phase: 'P01',
        //   quote_status: 'Quote released',
        //   quote_status_label: 'Quote released',
        //   project_no: '23-360',
        //   project_name: 'pudge project',
        //   team: 'team1',
        //   quote_file:
        //     'kgiihaiahiakklweokgiihaiahiakklweokgiihaiahiakklweokgiihaiahiakklweokgiihaiahiakklweokgiihaiahiakklweokgiihaiahiakklweo',
        //   total_price: 845698,
        //   per_watt_price: 9854,
        //   creator: 'Josh',
        //   created_at: '2023-12-24 09:45:15'
        // }
      ],
      showFilter: false,
      quoteDisplayOptions: [
        {
          label: 'List',
          value: 'table'
        },
        {
          label: 'Chart',
          value: 'chart'
        }
      ],
      filterForm: {
        version: '',
        type: '',
        phase_no: '',
        phase: '',
        quote_status: '',
        project_no: '',
        project_name: '',
        team_id: '',
        files: '',
        total_price: '',
        per_watt_price: '',
        creation_id: '',
        created_at: ''
      }
    };
  },
  watch: {
    currency: {
      handler(val) {
        if(val === 'USD') {this.formedCurrency = '($)'; }
        if(val === 'CAD') {this.formedCurrency = '(CAD)'; }
      }
    }
  },
  created() {
    this.getQuoteListData();
  },
  mounted() {
    this.getQuoteListData();
    this.getTeamOptions();
    this.getUserList();
  },
  methods: {
    goBackToProjectList() {
      let project_type = this.$route.params.project_type || 'bidding';
      this.$router.push(`/index/project/${project_type}`);
    },
    handleLineDisplayTypeChange(val) {
      this.$refs['line-chart'].dispatchLegends(val);
    },
    handleLineChartData(val) {
      let lineData = this.quoteChartDataLine;
      if (val === 'Harness') {
        // eslint-disable-next-line prefer-destructuring
        let data = lineData.data[0];
        lineData.data = data;
      }
      if (val === 'Alex') {
        return;
      }
      if (val === 'Lynx') {
        return;
      }
    },
    handlePageChange(page) {
      this.pageInfo.currentPage = page;
      this.getQuoteListData();
    },
    handleSearch(val) {
      this.filterForm.project_name = val;
      this.getQuoteListData();
    },
    handlePageSizeChange(size) {
      this.pageInfo.pageSize = size;
      this.getQuoteListData();
    },
    getQuoteListData() {
      let params = {
        page: this.pageInfo.currentPage,
        limit: this.pageInfo.pageSize,
        order: this.order,
        orderBy: this.orderBy,
        mode: this.mode,
        project_id: this.projectId,
        ...this.filterForm
      };
      getQuoteList(params)
        .then((res) => {
          if (res.code === 200) {
            if (this.mode === 'chart') {
              this.quoteChartDataBar = res.data.bar || {};
              this.quoteChartDataLine = res.data.line.total || {};
              this.currency = res.data.currency; 
            }
            if (this.mode === 'table') {
              this.tableData = res.data.list;
              this.pageInfo.totalRows = res.data.total;
              this.currency = res?.data?.currency;
              this.tableKey ++;             
            }
          }
        })
        .catch((err) => {
          return err;
        });
    },
    //预览文件，和项目中的其他预览文件公用这个方法
    previewFile(url, name, flag, index) {
      if (!flag) {
        const { href } = this.$router.resolve({
          path: '/file-preview',
          query: {
            path: url,
            name
          }
        });
        window.open(href, '_blank');
      } else {
        this.$refs[`previewImg${index}`][0].showViewer = true;
      }
    },
    handleDownload(row) {
      let url = row.files[0].url || '';
      let name = row.files[0].name || '';
      directDownload(url, name);
    },
    handleView(row) {
      let url = row.files[0] ? row.files[0].url : '';
      let name = row.files[0] ? row.files[0].name : '';
      let flat = 0;
      let index = 0;

      this.previewFile(url, name, flat, index);
    },
    toggleFilterDisplay() {
      this.showFilter = !this.showFilter;
    },
    handleCancelFastFilter() {
      if (this.$refs[this.fastFilteredIconName]) {
        this.$refs[this.fastFilteredIconName].hide();
      }
      this.fastFilteredIconName = '';
      this.pageInfo.currentPage = 1;
      this.resetFilterForm();
      this.getQuoteListData();
    },
    //其中一个sorter作用时候，其他sorter的状态清空
    clearOtherSorterStyle(sorterType) {
      this.sorter_refs.forEach((item) => {
        if (this.$refs[item] && item !== sorterType) {
          this.$refs[item].reset();
        }
      });
    },
    handleSort(order, sorterType, sortBy) {
      this.order = order;
      this.orderBy = order ? sortBy : '';
      this.clearOtherSorterStyle(sorterType);
      this.getQuoteListData();
    },
    resetFilterForm() {
      this.filterForm = {
        version: '',
        type: '',
        phase_no: '',
        phase: '',
        quote_status: '',
        project_no: '',
        project_name: '',
        team_id: '',
        files: '',
        total_price: '',
        per_watt_price: '',
        creation_id: '',
        created_at: ''
      };
    },
    showFastFilterIcon(filterIconContent) {
      this.fast_icons_ref.forEach((item) => {
        if (item === this.fastFilteredIconName) {
          this.$refs[item].applyContent(filterIconContent);
          this.$refs[item].show();
        }
        if (item !== this.fastFilteredIconName) {
          if (this.$refs[item]) {
            this.$refs[item].hide();
          }
        }
      });
    },
    handleFastFilter(val, filterType, filterFor) {
      if (this.$refs.tableFilterV2) {
        this.$refs.tableFilterV2.resetFilterForm();
        this.showFilter = false;
        this.filterNum = 0;
      }
      let filterIconContent = 'fast_filtered_icon_version';
      switch (filterFor) {
        case 'version':
          this.filterForm.version = val;
          filterIconContent = val;
          this.fastFilteredIconName = 'fast_filtered_icon_version';
          break;
        case 'type':
          this.filterForm.type = val.value;
          filterIconContent = val.label;
          this.fastFilteredIconName = 'fast_filtered_icon_type';
          break;
        case 'phase_no':
          this.filterForm.phase_no = val;
          filterIconContent = val;
          this.fastFilteredIconName = 'fast_filtered_icon_phase_no';
          break;
        case 'phase':
          this.filterForm.phase = val.value;
          filterIconContent = val.label;
          this.fastFilteredIconName = 'fast_filtered_icon_phase';
          break;
        case 'quote_status':
          this.filterForm.status = val.value;
          filterIconContent = val.label;
          this.fastFilteredIconName = 'fast_filtered_icon_quote_status';
          break;
        case 'project_no':
          this.filterForm.project_no = val;
          filterIconContent = val;
          this.fastFilteredIconName = 'fast_filtered_icon_project_no';
          break;
        case 'project_name':
          this.filterForm.project_name = val;
          filterIconContent = val;
          this.fastFilteredIconName = 'fast_filtered_icon_project_name';
          break;
        case 'team':
          this.filterForm.team_id = val.value;
          filterIconContent = val.label;
          this.fastFilteredIconName = 'fast_filtered_icon_team';
          break;
        case 'files':
          this.filterForm.quote_file = val;
          filterIconContent = val;
          this.fastFilteredIconName = 'fast_filtered_icon_quote_file';
          break;
        case 'total_price':
          this.filterForm.total_price = val;
          filterIconContent = val;
          this.fastFilteredIconName = 'fast_filtered_icon_total_price';
          break;
        case 'per_watt_price':
          this.filterForm.per_watt_price = val;
          filterIconContent = val;
          this.fastFilteredIconName = 'fast_filtered_icon_per_watt_price';
          break;
        case 'creation_id':
          this.filterForm.creation_id = val.value;
          // eslint-disable-next-line no-param-reassign
          val = val.label;
          filterIconContent = val;
          this.fastFilteredIconName = 'fast_filtered_icon_creator';
          break;
        case 'created_at':
          // eslint-disable-next-line prefer-destructuring
          this.filterForm.created_at_start = val[0];
          // eslint-disable-next-line prefer-destructuring
          this.filterForm.created_at_end = val[1];
          filterIconContent = `from ${val[0]} to ${val[1]}`;
          this.fastFilteredIconName = 'fast_filtered_icon_created_at';
          break;

        default:
          break;
      }
      let params = {
        mode: 'table',
        project_id: this.projectId,
        page: 1,
        limit: this.pageInfo.pageSize
      };
      params = { ...params, ...this.filterForm };
      getQuoteList(params)
        .then((res) => {
          if (res.code === 200) {
            this.tableData = res.data.data;
            this.totalRows = res.total;
            this.pageInfo.currentPage = 1;
            this.fastFilteredContent = filterIconContent;
            this.showFastFilterIcon(filterIconContent);
          }
        })
        .catch((err) => {
          return err;
        });
    },
    closePopover() {
      return;
    },
    handleOnFilter(formData, filterNum) {
      this.filterNum = filterNum;
      this.filterForm = { ...formData };
      if (this.fastFilteredIconName) {
        if (this.$refs[this.fastFilteredIconName]) {
          this.$refs[this.fastFilteredIconName].hide();
        }
      }
      this.pageInfo.currentPage = 1;
      this.getQuoteListData();
    },
    handleOnDisplayTypeChange(val) {
      if (this.$refs.tableFilterV2) {
        this.$refs.tableFilterV2.resetFilterForm();
        this.showFilter = false;
        this.filterNum = 0;
      }
      if (val === 'List') {
        this.mode = 'table';
      }
      if (val === 'Chart') {
        this.mode = 'chart';
      }

      this.mode = val;
      this.lineChartType = 'All';
      if (val === 'Chart') {
        this.showFilter = false;
      }
      this.getQuoteListData();
    },
    getTeamOptions() {
      teamList({ type: '2D' }).then((res) => {
        if (res.code === 200) {
          let teamData = res.data.data;
          teamData.forEach((item) => {
            this.teamOptions.push({
              label: item.name,
              value: item.id
            });
          });
        }
      });
    },
    getUserList() {
      userList().then((res) => {
        if (res.code === 200) {
          let userData = res.data.data;
          userData.forEach((item) => {
            this.userList.push({
              label: item.name,
              value: item.id
            });
          });
        }
      });
    }
  }
};
</script>

<style>
/* stylelint-disable-next-line selector-class-pattern */
.quote-list-container .el-table--border .el-table__cell {
  border-right: none;
}

/* stylelint-disable-next-line selector-class-pattern */
.quote-list-container .el-table th.el-table__cell > .cell {
  display: flex;
  align-items: center;
  background-color: #f5f7fa;
}

/* stylelint-disable-next-line selector-class-pattern */
.quote-list-container .el-table th.el-table__cell {
  background-color: #f5f7fa;
}

/* stylelint-disable-next-line selector-class-pattern */
.quote-list-container .el-table--border {
  border-radius: 4px;
}

.el-popover.el-popper.el-popover-self {
  min-width: 20px !important;
  padding: 0;
}

/* stylelint-disable-next-line selector-class-pattern */
.quote-list-container .el-table .el-table__cell {
  padding: 6px 0;
}

.quote-list-container .el-table thead {
  color: #303133;
}

/* stylelint-disable-next-line selector-class-pattern */
.quote-list-container .el-table__empty-block {
  min-height: 0;
}
</style>
<style lang="less" scoped>
.ellipsis {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.quote-list-container {
  margin-left: 16px;
  margin-top: 16px;
  display: flex;
  flex-direction: column;
  width: 1770px;
  min-height: 805px;
  background: #ffffff;
  border-radius: 8px;
  .filter-area {
    transform: translateX(14px);
    margin-bottom: 24px;
  }

  .title-part {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 25px;
    padding: 0 30px 16px 0;
    .title {
      font-size: 16px;
      font-weight: 550;
      color: #303133;
    }
    .return-btn {
      cursor: pointer;
      color: #007bff;
      span {
        font-size: 16px;
        font-weight: 500;
        color: #007bff;
      }
    }
  }
  .header-part {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    height: 25px;
    padding: 0 30px 0 0px;

    span {
      font-size: 16px;
      font-weight: 550;
      color: #303133;
    }
    .header-right {
      display: flex;
      align-items: center;
      gap: 16px;

      .operation-wrapper {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 24px;
        .operation-group-1 {
          display: flex;
          align-items: center;
          gap: 16px;

          .filter-icon {
            display: flex;
            align-items: center;
            justify-content: center;
            transform: translateY(1px);
          }
        }
        .el-badge {
          margin-left: 10px;
          .el-icon {
            font-size: 18px;
          }
        }
      }
    }
  }
  .list-part {
    max-height: 690px;
    overflow-y: scroll;
    flex: 1;
    padding: 0 20px 10px 0;
    margin-top: 20px;
  }
  .chart-part {
    // width: 1750px;
    .chart-wrapper {
      position: relative;
      width: 1750px;
      height: 365px;
      border: 1px solid #eeeeee;
      background: #fff;
      border-radius: 4px;
      // 普通样式
      &:first-of-type {
        margin-top: 10px; // 第一个.chart-wrapper的样式
      }
    }

    .line-chart-type-selector {
      position: absolute;
      right: 15px;
      top: 15px;
      z-index: 99;
    }
    .chart-wrapper + .chart-wrapper {
      margin-top: 16px; // 从第二个.chart-wrapper开始的样式
    }
  }
  .pagination-part {
    position: fixed;
    bottom: 26px;
    right: 40px;
    width: 100%;
    z-index: 999;
  }
}
</style>
