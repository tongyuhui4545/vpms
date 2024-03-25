<template>
  <div class="work-overview-list-wrapper">
    <div class="filter-area">
      <transition
        name="fade"
        mode="out-in"
      >
        <TableFilterV2
          v-show="showFilter"
          ref="new-project-and-phase-list"
          class="filter-area"
          :filter-name="computedFilterName"
          style="margin-left: 15px"
          @on-filter="handleFilter"
        />
      </transition>
    </div>
    <div class="title-row">
      <div class="title">
        Project
      </div>
      <div
        class="return-btn"
        @click="$router.push({ name: 'WorkOverview', query: { from: 'list' } })"
      >
        <i
          class="el-icon-back"
          i
        >
          <span>Return</span>
        </i>
      </div>
    </div>
    <div class="operation-row">
      <div class="tabs">
        <div
          :class="{ tab: true, selected: tabSelected === 'new-project' }"
          @click="
            handleTabSelected('new-project');
          "
        >
          <span>New project</span>
        </div>
        <div
          :class="{ tab: true, selected: tabSelected === 'new-phase' }"
          @click="
            handleTabSelected('new-phase');
          "
        >
          <span>New-added phase 60%</span>
        </div>
      </div>
      <div class="icons">
        <TogglableSearchBar
          placeholder="Enter to search"
          @on-search="handleOnSearch"
        />
        <div
          style="display: flex; align-items: center; padding-top: 3px"
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
      <div
        class="export-btn"
        @click="handleDownload"
      >
        <i class="el-icon-download" />
        <span>Excel</span>
      </div>
    </div>
    <div
      v-if="tabSelected === 'new-project'"
      class="table-wrapper"
    >
      <el-table
        :data="tableData"
        table-key="new-project-table"
        border
      >
        <!-- Project No. -->
        <el-table-column
          fixed="left"
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
                  filter-for="project_project_no"
                  @fast-filter="handleFastFilter"
                />
              </el-popover>
              <Sorter
                ref="new_project_no"
                sorter-type="new_project_no"
                sort-by="no"
                @on-sort="handleSort"
              />
              <FastFilteredIcon
                ref="fast_filter_icon_new_project_project_no"
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
                  :content="scope.row.project_no"
                  placement="top-start"
                >
                  <p
                    v-if="scope.row.project_no"
                    class="table-project-clickable-text"
                  >
                    {{ scope.row.project_no }}
                  </p>
                </el-tooltip>
              </div>
            </div>
          </template>
        </el-table-column>
        <!-- Project name -->
        <el-table-column>
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
                  filter-for="project_project_name"
                  @fast-filter="handleFastFilter"
                />
              </el-popover>
              <Sorter
                ref="new_project_name"
                sorter-type="new_project_name"
                sort-by="name"
                @on-sort="handleSort"
              />
              <FastFilteredIcon
                ref="fast_filter_icon_new_project_project_name"
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
                  :content="scope.row.name"
                  placement="top-start"
                >
                  <p
                    v-if="scope.row.name"
                    class="table-project-clickable-text"
                  >
                    {{ scope.row.name }}
                  </p>
                </el-tooltip>
              </div>
            </div>
          </template>
        </el-table-column>
        <!-- Creation date -->
        <el-table-column>
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
                  filter-for="project_created_at"
                  @fast-filter="handleFastFilter"
                />
              </el-popover>
              <Sorter
                ref="new_project_created_at"
                sorter-type="new_project_created_at"
                sort-by="created_at"
                @on-sort="handleSort"
              />
              <FastFilteredIcon
                ref="fast_filter_icon_new_project_project_created_at"
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
                  :content="scope.row.created_at"
                  placement="top-start"
                >
                  <p
                    v-if="scope.row.created_at"
                    class="table-project-clickable-text"
                  >
                    {{ scope.row.created_at }}
                  </p>
                </el-tooltip>
              </div>
            </div>
          </template>
        </el-table-column>
        <!-- Quote status -->
        <el-table-column>
          <template slot="header">
            <div style="display: flex; align-items: center">
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
                >Quote status</span>
                <FastFilter
                  fast-filter-type="SelectFastFilter"
                  :options="quoteStatusOptions"
                  filter-for="project_quote_status"
                  @fast-filter="handleFastFilter"
                />
              </el-popover>
              <Sorter
                ref="new_project_quote_status"
                sorter-type="new_project_quote_status"
                sort-by="quote_status"
                @on-sort="handleSort"
              />
              <FastFilteredIcon
                ref="fast_filter_icon_new_project_project_quote_status"
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
                  :content="scope.row.status_label"
                  placement="top-start"
                >
                  <p
                    v-if="scope.row.status_label"
                    class="table-project-clickable-text"
                  >
                    {{ scope.row.status_label }}
                  </p>
                </el-tooltip>
              </div>
            </div>
          </template>
        </el-table-column>
        <!-- Status -->
        <el-table-column>
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
                  :options="salesStatusOptions"
                  filter-for="project_sales_status"
                  @fast-filter="handleFastFilter"
                />
              </el-popover>
              <Sorter
                ref="new_project_sales_status"
                sorter-type="new_project_sales_status"
                sort-by="sales_status"
                @on-sort="handleSort"
              />
              <FastFilteredIcon
                ref="fast_filter_icon_new_project_project_sales_status"
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
                  :content="scope.row.sales_status_label"
                  placement="top-start"
                >
                  <p
                    v-if="scope.row.sales_status_label"
                    class="table-project-clickable-text"
                  >
                    {{ scope.row.sales_status_label }}
                  </p>
                </el-tooltip>
              </div>
            </div>
          </template>
        </el-table-column>
        <!-- Size DC(MW) -->
        <el-table-column>
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
                >Size DC(MW)</span>
                <FastFilter
                  fast-filter-type="Size"
                  filter-for="project_size"
                  @fast-filter="handleFastFilter"
                />
              </el-popover>
              <Sorter
                ref="new_project_size"
                sorter-type="new_project_size"
                sort-by="size"
                @on-sort="handleSort"
              />
              <FastFilteredIcon
                ref="fast_filter_icon_new_project_project_size"
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
                  :content="scope.row.size"
                  placement="top-start"
                >
                  <p
                    v-if="scope.row.size"
                    class="table-project-clickable-text"
                  >
                    {{ scope.row.size }}
                  </p>
                </el-tooltip>
              </div>
            </div>
          </template>
        </el-table-column>
        <!-- Customer -->
        <el-table-column>
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
                >Customer</span>
                <FastFilter
                  fast-filter-type="SelectFastFilter"
                  :options="customerOptions"
                  filter-for="project_client_id"
                  @fast-filter="handleFastFilter"
                />
              </el-popover>
              <Sorter
                ref="new_project_client_id"
                sorter-type="new_project_client_id"
                sort-by="client_id"
                @on-sort="handleSort"
              />
              <FastFilteredIcon
                ref="fast_filter_icon_new_project_project_client_id"
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
                  :content="scope.row.client_name"
                  placement="top-start"
                >
                  <p
                    v-if="scope.row.client_name"
                    class="table-project-clickable-text"
                  >
                    {{ scope.row.client_name }}
                  </p>
                </el-tooltip>
              </div>
            </div>
          </template>
        </el-table-column>
        <!-- Sales -->
        <el-table-column>
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
                >Sales</span>
                <FastFilter
                  fast-filter-type="SelectFastFilter"
                  :options="salesOptions"
                  filter-for="project_sales_id"
                  @fast-filter="handleFastFilter"
                />
              </el-popover>
              <Sorter
                ref="new_project_sales_id"
                sorter-type="new_project_sales_id"
                sort-by="sales_id"
                @on-sort="handleSort"
              />
              <FastFilteredIcon
                ref="fast_filter_icon_new_project_project_sales_id"
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
                  :content="scope.row.sales_name"
                  placement="top-start"
                >
                  <p
                    v-if="scope.row.sales_name"
                    class="table-project-clickable-text"
                  >
                    {{ scope.row.sales_name }}
                  </p>
                </el-tooltip>
              </div>
            </div>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div
      v-show="tabSelected === 'new-phase'"
      class="table-wrapper"
    >
      <el-table
        :data="tableData"
        table-key="new-phase-table"
        border
      >
        <!-- Phase -->
        <el-table-column
          fixed="left"
          label="Phase"
        >
          <template slot="header">
            <div style="display: flex; align-items: center">
              <span
                slot="reference"
                class="column-on-hover"
              >Phase</span>
              <Sorter
                ref="new_phase_phase"
                sorter-type="new_phase_phase"
                sort-by="phase"
                @on-sort="handleSort"
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
                  :content="scope.row.phase"
                  placement="top-start"
                >
                  <p
                    v-if="scope.row.phase"
                    class="table-project-clickable-text"
                  >
                    {{ scope.row.phase }}
                  </p>
                </el-tooltip>
              </div>
            </div>
          </template>
        </el-table-column>
        <!-- Phase creation date -->
        <el-table-column>
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
                >Phase creation date</span>
                <FastFilter
                  fast-filter-type="DateRangeFastFilter"
                  filter-for="phase_created_at"
                  @fast-filter="handleFastFilter"
                />
              </el-popover>
              <Sorter
                ref="new_phase_created_at"
                sorter-type="new_phase_created_at"
                sort-by="created_at"
                @on-sort="handleSort"
              />
              <FastFilteredIcon
                ref="fast_filter_icon_new_phase_phase_created_at"
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
                  v-if="scope.row.created_at"
                  class="table-project-clickable-text"
                >
                  {{ scope.row.created_at }}
                </p>
              </div>
            </div>
          </template>
        </el-table-column>
        <!-- Quote status -->
        <el-table-column>
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
                >Quote status</span>
                <FastFilter
                  fast-filter-type="SelectFastFilter"
                  :options="quoteStatusOptions"
                  filter-for="phase_quote_status"
                  @fast-filter="handleFastFilter"
                />
              </el-popover>
              <Sorter
                ref="new_phase_quote_status"
                sorter-type="new_phase_quote_status"
                sort-by="status"
                @on-sort="handleSort"
              />
              <FastFilteredIcon
                ref="fast_filter_icon_new_phase_phase_quote_status"
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
                  v-if="scope.row.status_label"
                  class="table-project-clickable-text"
                >
                  {{ scope.row.status_label }}
                </p>
              </div>
            </div>
          </template>
        </el-table-column>
        <!-- Project No. -->
        <el-table-column>
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
                  filter-for="phase_project_no"
                  @fast-filter="handleFastFilter"
                />
              </el-popover>
              <Sorter
                ref="new_phase_project_no"
                sorter-type="new_phase_project_no"
                sort-by="project_no"
                @on-sort="handleSort"
              />
              <FastFilteredIcon
                ref="fast_filter_icon_new_phase_phase_project_no"
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
                  v-if="scope.row.project_no"
                  class="table-project-clickable-text"
                >
                  {{ scope.row.project_no }}
                </p>
              </div>
            </div>
          </template>
        </el-table-column>
        <!-- Project name -->
        <el-table-column>
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
                  filter-for="phase_project_name"
                  @fast-filter="handleFastFilter"
                />
              </el-popover>
              <Sorter
                ref="new_phase_project_name"
                sorter-type="new_phase_project_name"
                sort-by="project_name"
                @on-sort="handleSort"
              />
              <FastFilteredIcon
                ref="fast_filter_icon_new_phase_phase_project_name"
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
                  v-if="scope.row.project_name"
                  class="table-project-clickable-text"
                >
                  {{ scope.row.project_name }}
                </p>
              </div>
            </div>
          </template>
        </el-table-column>
        <!-- Status -->
        <el-table-column>
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
                  :options="salesStatusOptions"
                  filter-for="phase_sales_status"
                  @fast-filter="handleFastFilter"
                />
              </el-popover>
              <Sorter
                ref="new_phase_sales_status"
                sorter-type="new_phase_sales_status"
                sort-by="status"
                @on-sort="handleSort"
              />
              <FastFilteredIcon
                ref="fast_filter_icon_new_phase_phase_sales_status"
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
                  v-if="scope.row.status_label"
                  class="table-project-clickable-text"
                >
                  {{ scope.row.status_label }}
                </p>
              </div>
            </div>
          </template>
        </el-table-column>
        <!-- Size DC(MW) -->
        <el-table-column>
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
                >Size DC(MW)</span>
                <FastFilter
                  fast-filter-type="Size"
                  filter-for="phase_size"
                  @fast-filter="handleFastFilter"
                />
              </el-popover>
              <Sorter
                ref="new_phase_size"
                sorter-type="new_phase_size"
                sort-by="size"
                @on-sort="handleSort"
              />
              <FastFilteredIcon
                ref="fast_filter_icon_new_phase_phase_size"
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
                  :content="scope.row.size"
                  placement="top-start"
                >
                  <p
                    v-if="scope.row.size"
                    class="table-project-clickable-text"
                  >
                    {{ scope.row.size }}
                  </p>
                </el-tooltip>
              </div>
            </div>
          </template>
        </el-table-column>
        <!-- Customer -->
        <el-table-column>
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
                >Customer</span>
                <FastFilter
                  fast-filter-type="SelectFastFilter"
                  :options="customerOptions"
                  filter-for="phase_client_id"
                  @fast-filter="handleFastFilter"
                />
              </el-popover>
              <Sorter
                ref="new_phase_client_id"
                sorter-type="new_phase_client_id"
                sort-by="client_id"
                @on-sort="handleSort"
              />
              <FastFilteredIcon
                ref="fast_filter_icon_new_phase_phase_client_id"
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
                  v-if="scope.row.client_name"
                  class="table-project-clickable-text"
                >
                  {{ scope.row.client_name }}
                </p>
              </div>
            </div>
          </template>
        </el-table-column>
        <!-- Sales -->
        <el-table-column>
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
                >Sales</span>
                <FastFilter
                  fast-filter-type="SelectFastFilter"
                  :options="salesOptions"
                  filter-for="phase_sales_id"
                  @fast-filter="handleFastFilter"
                />
              </el-popover>
              <Sorter
                ref="new_phase_sales_id"
                sorter-type="new_phase_sales_id"
                sort-by="sales_id"
                @on-sort="handleSort"
              />
              <FastFilteredIcon
                ref="fast_filter_icon_new_phase_phase_sales_id"
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
                  v-if="scope.row.sales_name"
                  class="table-project-clickable-text"
                >
                  {{ scope.row.sales_name }}
                </p>
              </div>
            </div>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="pagination-wrapper">
      <NormalPagination
        :current-page="pageInfo.page"
        :total-rows="totalRows"
        :page-size="pageInfo.limit"
        @page-change="handlePageChange"
        @page-size-change="handlePageSizeChange"
      />
    </div>
  </div>
</template>

<script>
import TableFilterV2 from '@/components/filters/TableFilterV2.vue';
import dayjs from 'dayjs';
import FilterIcon from '@/components/filters/FilterIcon.vue';
import TogglableSearchBar from '@/components/common/TogglableSearchBar.vue';
import Sorter from '@/views/project/components/Sorter.vue';
import FastFilter from '@/views/project/components/FastFilter.vue';
import FastFilteredIcon from '@/views/project/components/FastFilteredIcon.vue';
import NormalPagination from '@/components/NormalPagination.vue';
import {getDashboardProjectList, customerAll, salesList, getDashboardPhaseList, exportListData} from '@/api'
import {QUOTE_STATUS_OPTIONS, SALES_STATUS, PHASE_VALUES} from '@/utils/constants'

export default {
  name: '',
  components: {
    TableFilterV2,
    TogglableSearchBar,
    FilterIcon,
    Sorter,
    FastFilter,
    FastFilteredIcon,
    NormalPagination
  },
  props: {},
  data() {
    return {
      fastFilterIcons: [
      'fast_filter_icon_new_project_project_no',
        'fast_filter_icon_new_project_project_name',
        'fast_filter_icon_new_project_project_created_at',
        'fast_filter_icon_new_project_project_quote_status',
        'fast_filter_icon_new_project_project_sales_status',
        'fast_filter_icon_new_project_project_size',
        'fast_filter_icon_new_project_project_client_id',
        'fast_filter_icon_new_project_project_sales_id',
        'fast_filter_icon_new_phase_phase_created_at',
        'fast_filter_icon_new_phase_phase_quote_status',
        'fast_filter_icon_new_phase_phase_project_no',
        'fast_filter_icon_new_phase_phase_project_name',
        'fast_filter_icon_new_phase_phase_sales_status',
        'fast_filter_icon_new_phase_phase_size',
        'fast_filter_icon_new_phase_phase_client_id',
        'fast_filter_icon_new_phase_phase_sales_id'
      ],
      tableKey: 1,
      fastFilteredIconName: '',
      showFilter: false,
      filterNum: 0,
      totalTasks: 58,
      tabSelected: 'new-project',
      tableData: [],
      quoteStatusOptions: QUOTE_STATUS_OPTIONS,
      salesStatusOptions:SALES_STATUS,
      phaseOptions: PHASE_VALUES,
      salesOptions: [],
      customerOptions:[],
      filterForm: {
        creation_time_start: '',
        creation_time_end: '',
        search: '',
        sales_status: '',
        size_start: '',
        size_end: '',
        client_id: '',
        sales_id:'',
        quote_status: ''
      },
      pageInfo: {
        page: 1,
        limit: 20
      },
      totalRows: 0,
      sort: {
        order:'ASC',
        orderBy:''
      }
    };
  },
  computed: {
    computedFilterName() {
      if (this.tabSelected === 'new-project') {
        return 'NewProjectFilter';
      }
      if (this.tabSelected === 'new-phase') { 
        return 'NewPhaseFilter';
      }
      return 'NewProjectFilter';
    },
    // fastFilterIcons() { console.log('ewewe23sdfsdfaef');
    //   if(this.tabSelected === 'new-project') { console.log('ewewe111');
    //     return [
    //     'fast_filter_icon_new_project_project_no',
    //     'fast_filter_icon_new_project_project_name',
    //     'fast_filter_icon_new_project_project_created_at',
    //     'fast_filter_icon_new_project_project_status',
    //     'fast_filter_icon_new_project_project_sales_status',
    //     'fast_filter_icon_new_project_project_size',
    //     'fast_filter_icon_new_project_project_client_id',
    //     'fast_filter_icon_new_project_project_sales_id'
    //     ];
    //   }
    //   if (this.tabSelected === 'new-phase') { console.log('ewewe222');
    //     return [
    //     'fast_filter_icon_new_phase_created_at',
    //     'fast_filter_icon_new_phase_quote_status',
    //     'fast_filter_icon_new_phase_project_no',
    //     'fast_filter_icon_new_phase_project_name',
    //     'fast_filter_icon_new_phase_sales_status',
    //     'fast_filter_icon_new_phase_size',
    //     'fast_filter_icon_new_phase_client_id',
    //     'fast_filter_icon_new_phase_sales_id'
    //     ];
    //   }
    //   return []
    // },
    sorterRefs() {
      if(this.tabSelected === 'new-project') {
        return [
        'new_project_no',
'new_project_name',
'new_project_created_at',
'new_project_quote_status',
'new_project_sales_status',
'new_project_size',
'new_project_client_id',
'new_project_sales_id'
        ]
      }
      if (this.tabSelected === 'new-phase') {
        return [
        'new_phase_phase',
'new_phase_created_at',
'new_phase_quote_status',
'new_phase_project_no',
'new_phase_project_name',
'new_phase_sales_status',
'new_phase_size',
'new_phase_client_id',
'new_phase_sales_id'
        ]
      }
      return []
    }
  },
  created () {
    this.getCustomerList();
    this.getSalesList();
  },
  mounted () {
    this.selectTabFromQuery();
    this.initDateRange();
  },
  methods: {
    handleTabSelected(tabName) {
      this.tabSelected = tabName; 
      this.tableKey++;
      this.pageInfo.page = 1;
        this.pageInfo.limit = 20;
        this.filterNum = 0;
        this.showFilter = false;
        this.resetFilterForm();
        this.$nextTick(() => {
      // this.$refs['new-project-and-phase-list'].setDateRange([this.filterForm.creation_time_start, this.filterForm.creation_time_end])      
      });     
        this.getTableData();
    },
    getCustomerList() {
      customerAll().then((res) => {
        let options = res.code === 200 ? res.data : [];
        options.forEach((item) => {
          this.customerOptions.push({label: item.name, value: item.id})
        })
      }).catch((err) => {return err})
    },
    getSalesList() {
      salesList().then((res) => { 
        let options = res.code === 200 ? res.data : [];
       options.forEach((item) => {
        this.salesOptions.push({label: item.name, value: item.id})
       })
      }).catch((err) => {return err})
    },
    handlePageChange(page) {
      this.pageInfo.page = page;
      this.getTableData();
    },
    handlePageSizeChange(pageSize) {
      this.pageInfo.limit = pageSize;
      this.getTableData();
    },
    //初始进来的时候，带进来默认的日期范围，作为筛选条件
    initDateRange() {
      let query = this.$route.query || {};
      let dateRange = query.date_range || [];
      this.filterForm.creation_time_start = dayjs(dateRange[0]).isValid() ? dayjs(dateRange[0]).format('YYYY-MM-DD') : '';
      this.filterForm.creation_time_end = dayjs(dateRange[1]).isValid() ? dayjs(dateRange[1]).format('YYYY-MM-DD') : '';
      this.filterNum = 2; 
      this.$nextTick(() => {
      this.$refs['new-project-and-phase-list'].setDateRange([dateRange[0], dateRange[1]])      
      });
      this.getTableData(); 
    },
    resetFilterForm() {
      const filterForm = {
        creation_time_start: '',
        creation_time_end: '',
        search: '',
        sales_status: '',
        size_start: '',
        size_end: '',
        client_id: '',
        sales_id:'',
        quote_status: ''   
  };

  this.filterForm = {...filterForm};
    },
    handleDownload() {
      if(this.tabSelected === 'new-project') {
        let {creation_time_start, creation_time_end} = this.filterForm; 
      creation_time_start = dayjs(creation_time_start).isValid() ? dayjs(creation_time_start).format('YYYY-MM-DD') : '';
      creation_time_end = dayjs(creation_time_end).isValid() ? dayjs(creation_time_end).format('YYYY-MM-DD') : ''; 
        let monthDiff = dayjs(creation_time_end).diff(dayjs(creation_time_start), 'month', true);
      if (monthDiff > 2) {
        this.$message.error('Time span should be no more than 2 months');
        return
      }
        exportListData(this, this.filterForm, '/api/dashboard/project/list/download')
      }
      if(this.tabSelected === 'new-phase') {
        let {creation_time_start, creation_time_end} = this.filterForm;
      creation_time_start = dayjs(creation_time_start).isValid() ? dayjs(creation_time_start).format('YYYY-MM-DD') : '';
      creation_time_end = dayjs(creation_time_end).isValid() ? dayjs(creation_time_end).format('YYYY-MM-DD') : '';
      let monthDiff = dayjs(creation_time_end).diff(dayjs(creation_time_start), 'month', true);
      if (monthDiff > 2) {
        this.$message.error('Time span should be no more than 2 months');
        return
      }
        exportListData(this, this.filterForm, '/api/dashboard/phase/list/download')
      }
    },
    //列表数据获取 v0.9.0
    getTableData() {
      let params = {...this.filterForm, ...this.pageInfo}
      if(this.tabSelected === 'new-project') {
          getDashboardProjectList(params).then((res) => {
             if(res.code === 200) {
              this.totalRows = res.data.total || 0;
              this.tableData = res.data.list || [];
             }
          }).catch((err) => {return err})
      }
      if(this.tabSelected === 'new-phase') { 
        getDashboardPhaseList(params).then((res) => {
             if(res.code === 200) {
              this.totalRows = res.data.total || 0;
              this.tableData = res.data.list || [];
             }
          }).catch((err) => {return err})
      }
    },
    //列表数据导出 v0.9.0
     selectTabFromQuery() {
      let {query} = this.$route || {};
      if(query.target === 'project') { this.tabSelected = 'new-project'}
      if(query.target === 'phase') {this.tabSelected = 'new-phase'}
    },
    toggleFilterDisplay() {
      this.showFilter = !this.showFilter;
    },
    handleOnSearch(val) {
      this.pageInfo.page = 1;
      this.resetFilterForm();
      this.$refs['new-project-and-phase-list'].resetFilterForm();
      this.filterNum = 0;
      this.displayFilter = false;
      this.filterForm.search = val;

      this.getTableData();
    },
    handleFilter(formData, filterNum) {
      this.filterForm = { ...formData };
      this.pageInfo.page = 1;
      this.filterNum = filterNum;
      this.getTableData();
    },
    //表头的快捷筛选相关操作
    handleFastFilter(val, filterType, filterFor) {
      this.tableKey++;
      this.$forceUpdate()
      if (this.$refs['new-project-and-phase-list']) {
        this.$refs['new-project-and-phase-list'].resetFilterForm();
        this.showFilter = false;
        this.filterNum = 0;
      }
      let content = '';
      let formData = {};
      switch(filterFor) {
        case 'project_project_no':
          formData.search = val;
          content = val;
          this.fastFilteredIconName =
            'fast_filter_icon_new_project_project_no';
          break;
          case 'project_project_name':
          formData.search = val;
          content = val;
          this.fastFilteredIconName =
            'fast_filter_icon_new_project_project_name';
          break;
          case 'project_created_at':
          formData.created_at = val;
          content = `${val[0]} to ${val[1]}`;
          this.fastFilteredIconName =
            'fast_filter_icon_new_project_project_created_at';
          break;
          case 'project_quote_status':
          formData.quote_status = val.value;
          content = val.label;
          this.fastFilteredIconName =
            'fast_filter_icon_new_project_project_quote_status';
          break;
          case 'project_sales_status':
          formData.sales_status = val.value;
          content = val.label;
          this.fastFilteredIconName =
            'fast_filter_icon_new_project_project_sales_status';
          break;
          case 'project_size':
          [formData.size_start, formData.size_end] = val;
          content = `${val[0]} to ${val[1]}`;
          this.fastFilteredIconName =
            'fast_filter_icon_new_project_project_size';
          break;
          case 'project_client_id':
          formData.client_id = val.value;
          content = val.label;
          this.fastFilteredIconName =
            'fast_filter_icon_new_project_project_client_id';
          break;
          case 'project_sales_id':
          formData.sales_id = val.value;
          content = val.label;
          this.fastFilteredIconName =
            'fast_filter_icon_new_project_project_sales_id';
          break; 
          // ***********************************************
          case 'phase_created_at':
          [formData.created_at_start, formData.created_at_end] = val;
          content = `${val[0]} to ${val[1]}`;
          this.fastFilteredIconName = 'fast_filter_icon_new_phase_phase_created_at';
          break;
          case 'phase_quote_status':
          formData.quote_status = val.value;
          content = val.label;
          this.fastFilteredIconName = 'fast_filter_icon_new_phase_phase_quote_status';
          break;
          case 'phase_project_no':
          formData.search = val;
          content = val;
          this.fastFilteredIconName = 'fast_filter_icon_new_phase_phase_project_no';
          break;
          case 'phase_project_name':
          formData.search = val;
          content = val;
          this.fastFilteredIconName = 'fast_filter_icon_new_phase_phase_project_name';
          break;
          case 'phase_sales_status':
          formData.sales_status = val.value;
          content = val.label;
          this.fastFilteredIconName = 'fast_filter_icon_new_phase_phase_sales_status';
          break;
          case 'phase_size':
          [formData.size_start, formData.size_end] = val;
          content = `from ${val[0]} to ${val[1]}`;
          this.fastFilteredIconName = 'fast_filter_icon_new_phase_phase_size';
          break;
          case 'phase_client_id':
          formData.client_id = val.value;
          content = val.label;
          this.fastFilteredIconName = 'fast_filter_icon_new_phase_phase_client_id';
          break;
          case 'phase_sales_id':
          formData.sales_id = val.value;
          content = val.label;
          this.fastFilteredIconName = 'fast_filter_icon_new_phase_phase_sales_id';
          break;
        default: break;
      }
      this.filterForm = { ...formData };
      this.pageInfo.page = 1;
      this.fastFilteredContent = content;
      this.showFastFilterIcon();
      this.getTableData();
    },
    showFastFilterIcon(){
      this.fastFilterIcons.forEach((item) => {
        if (item === this.fastFilteredIconName) {
          this.$refs[item].applyContent(this.fastFilteredContent);
          this.$refs[item].show();
        }
        if (item !== this.fastFilteredIconName) {
          if (this.$refs[item]) {
            this.$refs[item].hide();
          }
        }
        this.tableKey++;
        this.$forceUpdate();
      });
    },
    handleSort(order, sorterType, sortBy) { 
      this.sort.order = order;
      this.sort.orderBy = order ? sortBy : '';
      this.filterForm = {...this.filterForm, ...this.sort};
      this.clearOtherSorterStyle(sorterType);
      this.getTableData();
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
      this.filterForm = {};
      this.pageInfo.page = 1;
      this.getTableData();
    }
    // **********************
  }
};
</script>
<style>
.el-table--border {
  border-radius: 4px;
}

</style>

<style lang="less" scoped>
.work-overview-list-wrapper/deep/ .el-table--border {
  border-radius: 4px;
}
.work-overview-list-wrapper {
  width: calc(100% - 8px);
  height: calc(100vh - 8.3rem);
  margin-bottom: 55px;
  overflow-y: auto;
  background: #ffffff;
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;

  .pagination-wrapper {
    position: absolute;
    bottom: 0;
    right: 8px;
    width: 100vw;
    z-index: 99;
    border-top: 1px solid #ebeef5;
    border-bottom: 1px solid #ebeef5;
    background-color: #ffffff;
  }

  .title-row {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 12px 16px;
    .title {
      font-size: 18px;
      color: #303133;
    }
    .return-btn {
      font-size: 16px;
      color: #007bff;
      cursor: pointer;
    }
  }
  .operation-row {
    position: relative;
    display: flex;
    justify-content: space-between;
    padding-right: 16px;
    gap: 24px;

    &::after {
      content: '';
      position: absolute;
      bottom: -2px; /* 距离文字下方的距离 */
      left: 15px; /* 起始位置 */
      width: calc(100% - 30px);
      height: 1px; /* 高度 */
      background-color: #eeeeee; /* 颜色 */
    }

    .tabs {
      flex: 1;
      display: flex;
      align-items: center;
      justify-content: flex-start;
      padding-left: 16px;
      gap: 40px;

      .tab {
        font-size: 16px;
        position: relative;
        cursor: pointer;

        &.selected {
          color: #007bff;
          &::after {
            content: ''; /* 添加内容 */
            position: absolute; /* 绝对定位 */
            bottom: -8px; /* 距离文字下方的距离 */
            left: 0; /* 起始位置 */
            width: 100%; /* 宽度与父元素相同 */
            height: 2px; /* 高度 */
            background-color: #007bff; /* 颜色 */
          }
        }
      }
    }
    .icons {
      flex: 0;
      display: flex;
      align-items: center;
      gap: 10px;
    }

    .export-btn {
      width: 76px;
      height: 30px;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 4px;
      background: #ffffff;
      border-radius: 4px 4px 4px 4px;
      border: 1px solid #007bff;
      font-weight: 400;
      font-size: 14px;
      color: #007bff;
      cursor: pointer;

      i {
        font-size: 16px;
      }
    }
  }
  .table-wrapper {
    padding: 12px 16px;
    margin-bottom: 28px
  }
}
</style>
