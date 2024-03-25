<template>
  <div class="page-container">
    <Card class="card-templete">
      <template #filterArea>
        <transition
          name="fade"
          mode="out-in"
        >
          <TableFilterV2
            v-show="showFilter"
            ref="tableFilterV2"
            class="filter-area"
            @on-filter="handleOnFilter"
          />
        </transition>
      </template>
      <template #cardHeader>
        <span style="color: #303133; font-weight: 500; line-height: 20px">Bidding</span>
      </template>
      <template #cardOperate>
        <div class="table-search">
          <TogglableSearchBar
            placeholder="Enter project to search"
            style="margin-right: 15px"
            @on-search="handleSearch"
          />
          <div @click="toggleFilterDisplay">
            <el-badge
              v-if="filterNum !== 0"
              :value="filterNum"
            >
              <FilterIcon />
            </el-badge>
            <FilterIcon v-else />
          </div>
          <DividerVertical
            divider-height="24"
            style="margin: 0 24px"
          />
          <TableDisplaySelector
            style="margin-right: 16px"
            @on-select="getTableSelector"
          />
          <div
            v-if="userLimits.project_add"
            class="card-btn animate new-btn"
            style="margin-right: 5px"
          >
            <AddNewButton @add-new="handleAdd" />
          </div>
          <div class="customizer-wrapper">
            <TableCustomizer
              :fixed-columns="fixedColumns"
              :alternative-columns="alternativeColumns"
              belong-to="bidding"
              @table-customized="handleTableCustomization"
            />
          </div>
        </div>
      </template>
      <template #cardContent>
        <div v-show="tableMode === 'List'">
          <div
            v-if="tableVisible"
            class="table-wrapper"
          >
            <el-table
              :data="tableData"
              stripe
              size="small"
              style="width: 100%; overflow: auto"
              border
            >
              <!-- Project No. -->
              <template v-if="customizedTableColumns.includes('No.')">
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
                        ref="projectNoPopover"
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
                        >No.</span>
                        <FastFilter
                          fast-filter-type="ProjectNo"
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
                      @click="handleView(scope.row)"
                    >
                      {{ scope.row.project_no }}
                    </p>
                  </template>
                </el-table-column>
              </template>
              <!-- Project Name -->
              <template v-if="customizedTableColumns.includes('Name')">
                <el-table-column min-width="120">
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
                        ref="projectNumberPopover"
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
                        >Name</span>
                        <FastFilter
                          fast-filter-type="ProjectName"
                          @fast-filter="handleFastFilter"
                        />
                      </el-popover>
                      <Sorter
                        ref="project-name"
                        sorter-type="project-name"
                        sort-by="name"
                        @on-sort="handleSort"
                      />
                      <FastFilteredIcon
                        ref="fast_filtered_icon_project_name"
                        @cancel="handleCancelFastFilter"
                      />
                    </div>
                  </template>
                  <div slot-scope="scope">
                    <el-tooltip
                      v-if="scope.row.name && scope.row.name.length > 10"
                      :content="scope.row.name"
                      placement="top"
                    >
                      <p
                        v-if="scope.row.name"
                        class="project-name"
                        @click="handleView(scope.row)"
                      >
                        {{ scope.row.name.slice(0, 9) + '...' }}
                      </p>
                    </el-tooltip>
                    <p
                      v-else
                      class="project-name"
                      @click="handleView(scope.row)"
                    >
                      {{ scope.row.name }}
                    </p>
                  </div>
                </el-table-column>
              </template>
              <!-- Project Status -->
              <template v-if="customizedTableColumns.includes('Status')">
                <el-table-column
                  min-width="100"
                  :show-overflow-tooltip="true"
                >
                  <template slot="header">
                    <el-popover
                      ref="projectNumberPopover"
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
                      >Status</span>
                      <FastFilter
                        fast-filter-type="Status"
                        @fast-filter="handleFastFilter"
                      />
                    </el-popover>
                    <Sorter
                      ref="sales_status"
                      sorter-type="sales_status"
                      sort-by="sales_status"
                      @on-sort="handleSort"
                    />
                    <FastFilteredIcon
                      ref="fast_filtered_icon_sales_status"
                      @cancel="handleCancelFastFilter"
                    />
                  </template>
                  <template slot-scope="scope">
                    <span
                      v-for="(item, key) in salesStatusOptions"
                      :key="key"
                    >
                      <span v-if="item.value == scope.row.sales_status">{{
                        item.label
                      }}</span>
                    </span>
                  </template>
                </el-table-column>
              </template>
              <!-- Sales -->
              <template v-if="customizedTableColumns.includes('Sales')">
                <el-table-column
                  prop="sales"
                  min-width="110"
                >
                  <template slot="header">
                    <el-popover
                      ref="salesPopover"
                      placement="bottom-start"
                      width="150"
                      popper-class="el-popover-self"
                      trigger="hover"
                      :visible-arrow="false"
                    >
                      <span
                        slot="reference"
                        class="column-on-hover"
                        @click="closePopover"
                      >Sales</span>
                      <FastFilter
                        fast-filter-type="Sales"
                        @fast-filter="handleFastFilter"
                      />
                    </el-popover>
                    <Sorter
                      ref="sales_name"
                      sorter-type="sales_name"
                      sort-by="sales_name"
                      @on-sort="handleSort"
                    />
                    <FastFilteredIcon
                      ref="fast_filtered_icon_sales_name"
                      @cancel="handleCancelFastFilter"
                    />
                  </template>
                  <template slot-scope="scope">
                    <div v-if="scope.row.sales_name">
                      {{ scope.row.sales_name }}
                    </div>
                  </template>
                </el-table-column>
              </template>
              <!-- Customer Name -->
              <template v-if="customizedTableColumns.includes('Customer')">
                <el-table-column
                  min-width="140"
                  prop="client_name"
                  :show-overflow-tooltip="true"
                >
                  <template slot="header">
                    <el-popover
                      ref="projectNumberPopover"
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
                      >Customer</span>
                      <FastFilter
                        fast-filter-type="Customer"
                        @fast-filter="handleFastFilter"
                      />
                    </el-popover>
                    <Sorter
                      ref="client_name"
                      sorter-type="client_name"
                      sort-by="client_name"
                      @on-sort="handleSort"
                    />
                    <FastFilteredIcon
                      ref="fast_filtered_icon_client_name"
                      @cancel="handleCancelFastFilter"
                    />
                  </template>
                </el-table-column>
              </template>
              <!-- Size DC -->
              <template v-if="customizedTableColumns.includes('Size DC(MW)')">
                <el-table-column min-width="120">
                  <template slot="header">
                    <el-popover
                      ref="projectNumberPopover"
                      placement="bottom-start"
                      width="370"
                      popper-class="el-popover-self"
                      trigger="hover"
                      :visible-arrow="false"
                    >
                      <span
                        slot="reference"
                        class="column-on-hover"
                        @click="closePopover"
                      >Size DC(MW)</span>
                      <FastFilter
                        fast-filter-type="Size"
                        @fast-filter="handleFastFilter"
                      />
                    </el-popover>
                    <Sorter
                      ref="size"
                      sorter-type="size"
                      sort-by="size"
                      @on-sort="handleSort"
                    />
                    <FastFilteredIcon
                      ref="fast_filtered_icon_size"
                      @cancel="handleCancelFastFilter"
                    />
                  </template>
                  <template slot-scope="scope">
                    <el-tag
                      v-if="scope.row.size"
                      size="small"
                      class="table-tag"
                    >
                      {{ scope.row.size }}
                    </el-tag>
                  </template>
                </el-table-column>
              </template>
              <!-- Latest phase -->
              <template v-if="customizedTableColumns.includes('Latest phase')">
                <el-table-column
                  min-width="140"
                  :show-overflow-tooltip="true"
                >
                  <template slot="header">
                    <el-popover
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
                      >Latest phase</span>
                      <FastFilter
                        fast-filter-type="SelectFastFilter"
                        filter-for="progress"
                        :options="phaseList"
                        @fast-filter="handleFastFilter"
                      />
                    </el-popover>
                    <Sorter
                      ref="progress"
                      sorter-type="progress"
                      sort-by="progress"
                      @on-sort="handleSort"
                    />
                    <FastFilteredIcon
                      ref="fast_filtered_icon_latest_phase"
                      @cancel="handleCancelFastFilter"
                    />
                  </template>
                  <template
                    v-if="scope.row.progress"
                    slot-scope="scope"
                  >
                    <span>{{ scope.row.progress }}</span>
                  </template>
                </el-table-column>
              </template>
              <!-- Technical details -->
              <template
                v-if="customizedTableColumns.includes('Technical details')"
              >
                <el-table-column
                  label="Technical details upload"
                  min-width="150"
                  :show-overflow-tooltip="true"
                  prop="technical_details"
                >
                  <template slot="header">
                    <el-popover
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
                      >Technical details</span>
                      <FastFilter
                        fast-filter-type="SelectFastFilter"
                        filter-for="technical_details_upload"
                        :options="yesOrNo"
                        @fast-filter="handleFastFilter"
                      />
                    </el-popover>
                    <Sorter
                      ref="technical_details_upload"
                      sorter-type="technical_details_upload"
                      sort-by="technical_details_upload"
                      @on-sort="handleSort"
                    />
                    <FastFilteredIcon
                      ref="fast_filtered_icon_technical_details"
                      @cancel="handleCancelFastFilter"
                    />
                  </template>
                  <template
                    v-if="scope.row.technical_details_upload"
                    slot-scope="scope"
                  >
                    <div
                      class="yes-or-no-tag"
                      :class="{
                        yes: scope.row.technical_details_upload === 'Yes',
                        no: scope.row.technical_details_upload === 'No'
                      }"
                    >
                      <span>{{ scope.row.technical_details_upload }}</span>
                    </div>
                  </template>
                </el-table-column>
              </template>
              <!-- Golden row files -->
              <template
                v-if="customizedTableColumns.includes('Golden row files')"
              >
                <el-table-column
                  label="Golden row files"
                  min-width="140"
                  :show-overflow-tooltip="true"
                  prop="golden_row_files"
                >
                  <template slot="header">
                    <el-popover
                      ref="projectNumberPopover"
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
                      >Golden row files</span>
                      <FastFilter
                        fast-filter-type="SelectFastFilter"
                        filter-for="golden_row_files_upload"
                        :options="yesOrNo"
                        @fast-filter="handleFastFilter"
                      />
                    </el-popover>
                    <Sorter
                      ref="golden_row_files_upload"
                      sorter-type="golden_row_files_upload"
                      sort-by="golden_row_files_upload"
                      @on-sort="handleSort"
                    />
                    <FastFilteredIcon
                      ref="fast_filtered_icon_golden_row_files"
                      @cancel="handleCancelFastFilter"
                    />
                  </template>
                  <template
                    v-if="scope.row.golden_row_files_upload"
                    slot-scope="scope"
                  >
                    <div
                      class="yes-or-no-tag"
                      :class="{
                        yes: scope.row.golden_row_files_upload === 'Yes',
                        no: scope.row.golden_row_files_upload === 'No'
                      }"
                    >
                      <span>{{ scope.row.golden_row_files_upload }}</span>
                    </div>
                  </template>
                </el-table-column>
              </template>
              <!-- Project schedule -->
              <template
                v-if="customizedTableColumns.includes('Project schedule')"
              >
                <el-table-column
                  label="Project schedule"
                  min-width="150"
                  :show-overflow-tooltip="true"
                  prop="project_schedule"
                >
                  <template slot="header">
                    <el-popover
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
                      >Project schedule</span>
                      <FastFilter
                        fast-filter-type="SelectFastFilter"
                        filter-for="project_schedule_upload"
                        :options="yesOrNo"
                        @fast-filter="handleFastFilter"
                      />
                    </el-popover>
                    <Sorter
                      ref="project_schedule_upload"
                      sorter-type="project_schedule_upload"
                      sort-by="project_schedule_upload"
                      @on-sort="handleSort"
                    />
                    <FastFilteredIcon
                      ref="fast_filtered_icon_project_schedule"
                      @cancel="handleCancelFastFilter"
                    />
                  </template>
                  <template
                    v-if="scope.row.project_schedule_upload"
                    slot-scope="scope"
                  >
                    <div
                      class="yes-or-no-tag"
                      :class="{
                        yes: scope.row.project_schedule_upload === 'Yes',
                        no: scope.row.project_schedule_upload === 'No'
                      }"
                    >
                      <span>{{ scope.row.project_schedule_upload }}</span>
                    </div>
                  </template>
                </el-table-column>
              </template>
              <!-- Solution -->
              <template v-if="customizedTableColumns.includes('Solution')">
                <el-table-column
                  prop="solution"
                  label="Solution"
                  min-width="140"
                  :show-overflow-tooltip="true"
                >
                  <template slot="header">
                    <el-popover
                      ref="projectNumberPopover"
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
                      >Solution</span>
                      <FastFilter
                        fast-filter-type="Solution"
                        @fast-filter="handleFastFilter"
                      />
                    </el-popover>
                    <Sorter
                      ref="solution"
                      sorter-type="solution"
                      sort-by="solution"
                      @on-sort="handleSort"
                    />
                    <FastFilteredIcon
                      ref="fast_filtered_icon_solution"
                      @cancel="handleCancelFastFilter"
                    />
                  </template>
                  <template slot-scope="scope">
                    {{ scope.row.solution }}
                  </template>
                </el-table-column>
              </template>
              <!-- Quote Status -->
              <template v-if="customizedTableColumns.includes('Quote status')">
                <el-table-column
                  label="Quote status"
                  min-width="180"
                >
                  <template slot="header">
                    <el-popover
                      ref="projectNumberPopover"
                      placement="bottom-start"
                      width="310"
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
                        fast-filter-type="QuoteStatus"
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
                  </template>
                  <template
                    v-if="scope.row.status_label"
                    slot-scope="scope"
                  >
                    <el-tooltip
                      :content="scope.row.status_label"
                      placement="top"
                    >
                      <QuoteStatusTag
                        :tag-text="scope.row.status_label"
                        type="quote"
                      />
                    </el-tooltip>
                  </template>
                </el-table-column>
              </template>
              <!-- Team -->
              <template v-if="customizedTableColumns.includes('Team')">
                <el-table-column
                  label="Team"
                  min-width="100"
                >
                  <template slot="header">
                    <el-popover
                      ref="projectNumberPopover"
                      placement="bottom-start"
                      width="130"
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
                        fast-filter-type="Team"
                        @fast-filter="handleFastFilter"
                      />
                    </el-popover>
                    <Sorter
                      ref="team_name"
                      sorter-type="team_name"
                      sort-by="team_name"
                      @on-sort="handleSort"
                    />
                    <FastFilteredIcon
                      ref="fast_filtered_icon_team_name"
                      @cancel="handleCancelFastFilter"
                    />
                  </template>
                  <template slot-scope="scope">
                    {{ scope.row.team_name }}
                  </template>
                </el-table-column>
              </template>
              <!-- 3d calculation status -->
              <template
                v-if="customizedTableColumns.includes('3D calculation status')"
              >
                <el-table-column
                  label="3D calculation status"
                  min-width="185"
                >
                  <template slot="header">
                    <el-popover
                      ref="project3dCalculationStatusPopover"
                      placement="bottom-start"
                      width="350"
                      popper-class="el-popover-self"
                      trigger="hover"
                      :visible-arrow="false"
                    >
                      <span
                        slot="reference"
                        class="column-on-hover"
                        @click="closePopover"
                      >3D calculation status</span>
                      <FastFilter
                        fast-filter-type="CalculationStatus"
                        @fast-filter="handleFastFilter"
                      />
                    </el-popover>
                    <Sorter
                      ref="3d_calculation_status"
                      sorter-type="3d_calculation_status"
                      sort-by="3d_calculation_status"
                      @on-sort="handleSort"
                    />
                    <FastFilteredIcon
                      ref="fast_filtered_icon_3d_calculation_status"
                      @cancel="handleCancelFastFilter"
                    />
                  </template>
                  <template
                    v-if="scope.row['3d_calculation_status']"
                    slot-scope="scope"
                  >
                    <el-tooltip
                      :content="scope.row['3d_calculation_status_label']"
                      placement="top"
                    >
                      <QuoteStatusTag
                        :tag-text="scope.row['3d_calculation_status_label']"
                        type="3d-bidding"
                      />
                    </el-tooltip>
                  </template>
                </el-table-column>
              </template>
              <!-- 3d Team -->
              <template v-if="customizedTableColumns.includes('3D team')">
                <el-table-column
                  label="3D team"
                  min-width="120"
                >
                  <template slot="header">
                    <el-popover
                      ref="projectTeamPopover"
                      placement="bottom-start"
                      width="130"
                      popper-class="el-popover-self"
                      trigger="hover"
                      :visible-arrow="false"
                    >
                      <span
                        slot="reference"
                        class="column-on-hover"
                        @click="closePopover"
                      >3D team</span>
                      <FastFilter
                        fast-filter-type="SelectFastFilter"
                        filter-for="3d-team"
                        :options="D3TeamOptions"
                        @fast-filter="handleFastFilter"
                      />
                    </el-popover>
                    <Sorter
                      ref="3d_team_name"
                      sorter-type="3d_team_name"
                      sort-by="3d_team_name"
                      @on-sort="handleSort"
                    />
                    <FastFilteredIcon
                      ref="fast_filtered_icon_3d_team"
                      @cancel="handleCancelFastFilter"
                    />
                  </template>
                  <template
                    v-if="scope.row['3d_team_name']"
                    slot-scope="scope"
                  >
                    {{ scope.row['3d_team_name'] }}
                  </template>
                </el-table-column>
              </template>
              <!-- Customer due date -->
              <template
                v-if="customizedTableColumns.includes('Customer due date')"
              >
                <el-table-column
                  label="Customer due date"
                  sort-by="due_date"
                  min-width="160"
                >
                  <template slot="header">
                    <el-popover
                      ref="customerDuedatePopover"
                      placement="bottom-start"
                      width="250"
                      popper-class="el-popover-self"
                      trigger="hover"
                      :visible-arrow="false"
                    >
                      <span
                        slot="reference"
                        class="column-on-hover"
                        @click="closePopover"
                      >Customer due date</span>
                      <FastFilter
                        fast-filter-type="CustomerDuedate"
                        @fast-filter="handleFastFilter"
                      />
                    </el-popover>
                    <Sorter
                      ref="due_date"
                      sorter-type="due_date"
                      sort-by="due_date"
                      @on-sort="handleSort"
                    />
                    <FastFilteredIcon
                      ref="fast_filtered_icon_due_date"
                      @cancel="handleCancelFastFilter"
                    />
                  </template>
                  <template slot-scope="scope">
                    <span
                      v-if="scope.row.due_date"
                      style="
                        display: flex;
                        justify-content: flex-start;
                        align-items: center;
                      "
                    >
                      <!-- {{ formatDates(scope.row.due_date, "due_date") }} -->
                      {{ scope.row.due_date }}
                      <span
                        v-if="
                          (scope.row.sales_status == 1 ||
                            scope.row.sales_status == 3 ||
                            scope.row.sales_status == 2) &&
                            scope.row.archiving == 0 &&
                            judgeDisplayClock('due_date', scope.row.status_label)
                        "
                        style="margin-left: 3px"
                      >
                        <ClockTag
                          v-if="scope.row.due_date"
                          :due-date="scope.row.due_date"
                        />
                      </span>
                    </span>
                  </template>
                </el-table-column>
              </template>
              <!-- Internal due date -->
              <template
                v-if="customizedTableColumns.includes('Internal due date')"
              >
                <el-table-column
                  label="Internal due date"
                  sort-by="inner_date"
                  min-width="160"
                >
                  <template slot="header">
                    <el-popover
                      ref="initialDueDatePopover"
                      placement="bottom-start"
                      width="250"
                      popper-class="el-popover-self"
                      trigger="hover"
                      :visible-arrow="false"
                    >
                      <span
                        slot="reference"
                        class="column-on-hover"
                        @click="closePopover"
                      >Internal due date</span>
                      <FastFilter
                        fast-filter-type="InternalDuedate"
                        @fast-filter="handleFastFilter"
                      />
                    </el-popover>
                    <Sorter
                      ref="inner_date"
                      sorter-type="inner_date"
                      sort-by="inner_date"
                      @on-sort="handleSort"
                    />
                    <FastFilteredIcon
                      ref="fast_filtered_icon_inner_date"
                      @cancel="handleCancelFastFilter"
                    />
                  </template>
                  <template slot-scope="scope">
                    <span
                      v-if="scope.row.inner_date"
                      style="
                        display: flex;
                        justify-content: flex-start;
                        align-items: center;
                      "
                    >
                      <!-- {{ formatDates(scope.row.inner_date, "inner_date") }} -->
                      <span>{{ scope.row.inner_date }}</span>
                      <span
                        v-if="
                          (scope.row.sales_status == 1 ||
                            scope.row.sales_status == 3 ||
                            scope.row.sales_status == 2) &&
                            scope.row.archiving == 0 &&
                            judgeDisplayClock(
                              'inner_date',
                              scope.row.status_label
                            )
                        "
                        style="margin-left: 3px"
                      >
                        <ClockTag
                          v-if="scope.row.inner_date"
                          :due-date="scope.row.inner_date"
                        />
                      </span>
                    </span>
                  </template>
                </el-table-column>
              </template>
              <!-- Team due date -->
              <template v-if="customizedTableColumns.includes('Team due date')">
                <el-table-column
                  label="Team due date"
                  sort-by="team_due_date"
                  min-width="160"
                >
                  <template slot="header">
                    <el-popover
                      ref="projectNumberPopover"
                      placement="bottom-start"
                      width="250"
                      popper-class="el-popover-self"
                      trigger="hover"
                      :visible-arrow="false"
                    >
                      <span
                        slot="reference"
                        class="column-on-hover"
                        @click="closePopover"
                      >Team due date</span>
                      <FastFilter
                        fast-filter-type="TeamDuedate"
                        @fast-filter="handleFastFilter"
                      />
                    </el-popover>
                    <Sorter
                      ref="team_due_date"
                      sorter-type="team_due_date"
                      sort-by="team_due_date"
                      @on-sort="handleSort"
                    />
                    <FastFilteredIcon
                      ref="fast_filtered_icon_team_due_date"
                      @cancel="handleCancelFastFilter"
                    />
                  </template>
                  <template slot-scope="scope">
                    <span
                      v-if="scope.row.team_due_date"
                      style="
                        display: flex;
                        justify-content: flex-start;
                        align-items: center;
                      "
                    >
                      <!-- {{ formatDates(scope.row.team_due_date, "team_due_date") }} -->
                      {{ scope.row.team_due_date }}
                      <span
                        v-if="
                          (scope.row.sales_status == 1 ||
                            scope.row.sales_status == 3 ||
                            scope.row.sales_status == 2) &&
                            scope.row.archiving == 0 &&
                            judgeDisplayClock(
                              'team_due_date',
                              scope.row.status_label
                            )
                        "
                        style="margin-left: 3px"
                      >
                        <ClockTag
                          v-if="scope.row.team_due_date"
                          :due-date="scope.row.team_due_date"
                          style="margin-left: 3px"
                        />
                      </span>
                    </span>
                  </template>
                </el-table-column>
              </template>
              <!-- 3D internal due date -->
              <template
                v-if="customizedTableColumns.includes('3D internal due date')"
              >
                <el-table-column
                  label="3D internal due date"
                  sort-by="3d_inner_date"
                  min-width="180"
                >
                  <template slot="header">
                    <el-popover
                      ref="project3dInternalDueDatePopover"
                      placement="bottom-start"
                      width="250"
                      popper-class="el-popover-self"
                      trigger="hover"
                      :visible-arrow="false"
                    >
                      <span
                        slot="reference"
                        class="column-on-hover"
                        @click="closePopover"
                      >3D internal due date</span>
                      <FastFilter
                        fast-filter-type="DateRangeFastFilter"
                        filter-for="3d-internal-due-date"
                        @fast-filter="handleFastFilter"
                      />
                    </el-popover>
                    <Sorter
                      ref="3d_internal_due_date"
                      sorter-type="3d_internal_due_date"
                      sort-by="3d_inner_date"
                      @on-sort="handleSort"
                    />
                    <FastFilteredIcon
                      ref="fast_filtered_icon_3d_internal_due_date"
                      @cancel="handleCancelFastFilter"
                    />
                  </template>
                  <template slot-scope="scope">
                    <span
                      v-if="scope.row['3d_inner_date']"
                      style="
                        display: flex;
                        justify-content: flex-start;
                        align-items: center;
                      "
                    >
                      {{ scope.row['3d_inner_date'] }}
                      <span
                        v-if="
                          (scope.row.sales_status == 1 ||
                            scope.row.sales_status == 3 ||
                            scope.row.sales_status == 2) &&
                            scope.row.archiving == 0 &&
                            judgeDisplayClock(
                              'calculation',
                              scope.row['3d_calculation_status_label']
                            )
                        "
                        style="margin-left: 3px"
                      >
                        <ClockTag
                          v-if="scope.row.team_due_date"
                          :due-date="scope.row['3d_inner_date']"
                          style="margin-left: 3px"
                        />
                      </span>
                    </span>
                  </template>
                </el-table-column>
              </template>
              <!-- 3D team due date -->
              <template
                v-if="customizedTableColumns.includes('3D team due date')"
              >
                <el-table-column
                  label="3D team due date"
                  sort-by="3d_team_due_date"
                  min-width="180"
                >
                  <template slot="header">
                    <el-popover
                      ref="project3dTeamDueDatePopover"
                      placement="bottom-start"
                      width="250"
                      popper-class="el-popover-self"
                      trigger="hover"
                      :visible-arrow="false"
                    >
                      <span
                        slot="reference"
                        class="column-on-hover"
                        @click="closePopover"
                      >3D team due date</span>
                      <FastFilter
                        fast-filter-type="DateRangeFastFilter"
                        filter-for="3d-team-due-date"
                        @fast-filter="handleFastFilter"
                      />
                    </el-popover>
                    <Sorter
                      ref="3d_team_due_date"
                      sorter-type="3d_team_due_date"
                      sort-by="3d_team_due_date"
                      @on-sort="handleSort"
                    />
                    <FastFilteredIcon
                      ref="fast_filtered_icon_3d_team_due_date"
                      @cancel="handleCancelFastFilter"
                    />
                  </template>
                  <template slot-scope="scope">
                    <span
                      v-if="scope.row['3d_team_due_date']"
                      style="
                        display: flex;
                        justify-content: flex-start;
                        align-items: center;
                      "
                    >
                      {{ scope.row['3d_team_due_date'] }}
                      <span
                        v-if="
                          (scope.row.sales_status == 1 ||
                            scope.row.sales_status == 3 ||
                            scope.row.sales_status == 2) &&
                            scope.row.archiving == 0 &&
                            judgeDisplayClock(
                              'team_due_date',
                              scope.row['3d_team_due_date']
                            )
                        "
                        style="margin-left: 3px"
                      >
                        <ClockTag
                          v-if="scope.row['3d_team_due_date']"
                          :due-date="scope.row['3d_team_due_date']"
                          style="margin-left: 3px"
                        />
                      </span>
                    </span>
                  </template>
                </el-table-column>
              </template>
              <!-- Creator -->
              <template v-if="customizedTableColumns.includes('Creator')">
                <el-table-column
                  label="Creator"
                  min-width="115"
                  :show-overflow-tooltip="true"
                >
                  <template slot="header">
                    <el-popover
                      ref="projectNumberPopover"
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
                      >Creator</span>
                      <FastFilter
                        fast-filter-type="Creator"
                        @fast-filter="handleFastFilter"
                      />
                    </el-popover>
                    <Sorter
                      ref="creation_name"
                      sorter-type="creation_name"
                      sort-by="creation_name"
                      @on-sort="handleSort"
                    />
                    <FastFilteredIcon
                      ref="fast_filtered_icon_creation_name"
                      @cancel="handleCancelFastFilter"
                    />
                  </template>
                  <template slot-scope="scope">
                    {{ scope.row.creation_name }}
                  </template>
                </el-table-column>
              </template>
              <!-- Creation date -->
              <template v-if="customizedTableColumns.includes('Creation date')">
                <el-table-column
                  label="Creation date"
                  sort-by="creation_date"
                  min-width="160"
                >
                  <template slot="header">
                    <el-popover
                      ref="creationDatePopover"
                      placement="bottom-start"
                      width="250"
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
                      ref="3d_team_due_date"
                      sorter-type="creation_date"
                      sort-by="creation_date"
                      @on-sort="handleSort"
                    />
                    <FastFilteredIcon
                      ref="fast_filtered_icon_creation_date"
                      @cancel="handleCancelFastFilter"
                    />
                  </template>
                  <template slot-scope="scope">
                    <span
                      v-if="scope.row.created_at"
                      style="
                        display: flex;
                        justify-content: flex-start;
                        align-items: center;
                      "
                    >
                      {{ scope.row.created_at }}
                    </span>
                  </template>
                </el-table-column>
              </template>
              <!-- Action -->
              <template v-if="true">
                <el-table-column
                  label="Action"
                  min-width="120"
                >
                  <template slot-scope="scope">
                    <i
                      class="el-icon-view table-icon animate"
                      @click="handleView(scope.row)"
                    />
                    <i
                      v-if="userLimits.project_edit"
                      class="el-icon-edit table-icon animate"
                      @click="handleEdit(scope.row)"
                    />
                    <!-- <i v-if="showDeleteProject" class="el-icon-delete table-icon animate" @click="handleDelete(scope.row)"></i> -->
                    <img
                      v-if="showAddingWorkingHours"
                      src="@/assets/IconDesigns/add-working-hours-in-list.png"
                      style="width: 14px; height: 14px; cursor: pointer"
                      @click="showRegisterHoursModal(scope.row)"
                    >
                  </template>
                </el-table-column>
              </template>
            </el-table>
          </div>
        </div>
        <div v-show="tableMode === 'Gantt'">
          <Gantt
            :gantt-params="{
              mode: 0,
              group: false,
              start_date: ganttRange.start_date,
              end_date: ganttRange.end_date,
              data: tableData
            }"
          />
        </div>
        <NormalPagination
          :total-rows="totalRows"
          :current-page="currentPage"
          :page-size.sync="pageSize"
          @page-change="handlePage"
          @page-size-change="handlePageSizeChange"
        />
      </template>
    </Card>
    <ProjectModal
      ref="projectModal"
      :mode="projectActionMode"
      :form-data="projectForm"
      @refresh="getTableData"
    />
    <RegisterHoursModal
      ref="registerHoursModal"
      :project-id="registerWorkingHoursProjectId"
    />
  </div>
</template>

<!-- eslint-disable prefer-destructuring -->
<!-- eslint-disable no-param-reassign -->
<script>
import {
  SORTER_REFS_LIST,
  FAST_FILTER_ICON_REFS,
  FAST_FILTER_REFS,
  PHASE_VALUES
} from '@/utils/constants.js';
import TableCustomizer from '@/components/table-customizer/index.vue';
import Sorter from './components/Sorter.vue';
import Card from '@/components/Card.vue';
import FastFilteredIcon from './components/FastFilteredIcon.vue';
import RegisterHoursModal from './components/RegisterHoursModal.vue';
// import FilterArea from "@/components/FilterArea.vue";
import AddNewButton from '@/components/buttons-and-selectors/AddNewButton.vue';
import ProjectModal from './components/ProjectModal.vue';
import TableDisplaySelector from '@/components/buttons-and-selectors/TableDisplaySelector.vue';
import DividerVertical from '@/components/common/DividerVertical.vue';
import ClockTag from '@/components/common/ClockTag.vue';
// import TableFilter from "@/components/TableFilter.vue";
import FilterIcon from '@/components/filters/FilterIcon.vue';
import TableFilterV2 from '@/components/filters/TableFilterV2.vue';
import FastFilter from './components/FastFilter.vue';
import TogglableSearchBar from '@/components/common/TogglableSearchBar.vue';
import NormalPagination from '@/components/NormalPagination.vue';
import { judgeDisplayClock, mapStatus } from '@/utils/commons.js';
import {
  customerAll,
  salesList,
  projectsList,
  deleteProject,
  projectDetail
} from '@/api/index.js';
import QuoteStatusTag from '@/views/work-table/components/QuoteStatusTag.vue';
import Gantt from '@/components/gantt/index.vue';
import dayjs from 'dayjs';

// let clearFilterRouteNames = [
//   'ProjectList',
//   'FormalProjectList',
//   'SolarList',
//   'trackerList',
//   'customerList',
//   'personnelList',
//   'teamList',
//   'Dashboard'
// ];

export default {
  name: '',
  components: {
    RegisterHoursModal,
    FastFilteredIcon,
    Card,
    Sorter,
    ClockTag,
    TableFilterV2,
    FilterIcon,
    TogglableSearchBar,
    QuoteStatusTag,
    FastFilter,
    AddNewButton,
    TableDisplaySelector,
    ProjectModal,
    DividerVertical,
    NormalPagination,
    TableCustomizer,
    Gantt
  },
  beforeRouteEnter(to, from, next) {
    next((vm) => { 
      let detailsRouteName = ['overview', 'phase', 'label&sim', 'quote', 'task'];
      if(detailsRouteName.includes(from.name)) {
        vm.getTableData(); 
      }
    });
  },
  //离开页面时记录滚动条位置,当从编辑/查看页面再回来的时候，回到最近的浏览位置
  beforeRouteLeave(to, from, next) {
    if (
      to.path.includes('index/project/detail') ||
      to.path.includes('index/project/form')
    ) {
      this.$store.dispatch('app/changeProjectListLastPosition', this.yPosition);
    }
    next();
  },
  data() {
    return {
      //从编辑页面回列表页的话，因为有一些持久化的数据，比如保留页码，筛选条件等，因此不希望页面进行初始化数据获取，否则会覆盖。
      fixedColumns: ['No.', 'Name', 'Status', 'Size DC(MW)'],
      test: true,
      alternativeColumns: [
        'Customer',
        'Technical details',
        'Golden row files',
        'Project schedule',
        'Sales',
        'Quote status',
        'Latest phase',
        'Team',
        '3D calculation status',
        '3D team',
        'Solution',
        'Customer due date',
        'Internal due date',
        'Team due date',
        '3D internal due date',
        '3D team due date',
        'Creator',
        'Creation date'
      ],
      yesOrNo: [
        {
          label: 'Yes',
          value: 1
        },
        {
          label: 'No',
          value: 0
        }
      ],
      //定制化的表头
      customizedTableColumns: [],
      //快速筛选的内容
      fastFilteredIconName: '',
      //添加或者编辑项目
      projectActionMode: 'add',
      showAddingWorkingHours: false,
      fastFilteredContent: '',
      registerWorkingHoursProjectId: undefined,
      filterNum: 0,
      showFilter: false,
      preventInitialList: false,
      showFastFilterName: '',
      searchVal: '',
      customerOptions: [],
      salesOptions: [],
      D2TeamOptions: [],
      D3TeamOptions: [],
      fullscreenLoading: true,
      keepCurrentPage: true,
      tableData: [],
      currentPage: 1,
      pageSize: 20,
      totalRows: 0,
      yPosition: 0,
      absoluteLeft: 0,
      //可否新增project
      showAddProject: false,
      //可否编辑project
      showEditProject: false,
      //可否删除project
      showDeleteProject: false,
      createVisible: false,
      filterFormData: {},
      underFilter: false,
      filterFor: 'bidding-project',
      userLimits: null,
      projectForm: {
        project_no: '',
        description: '',
        client_id: '',
        contact_id: 1,
        sales_id: '',
        us_engineer_id: '1',
        cn_engineer_id: '1',
        cn_engineer_team_id: '1',
        size: undefined,
        address: '',
        city: '',
        county: '',
        state: '',
        zipcode: '',
        remark: '',
        creation_id: '',
        creation_name: '',
        sales_status: 1,
        currency: 'USD'
      },
      salesStatusOptions: [
        {
          label: 'Bidding',
          value: 1
        },
        {
          label: 'Win',
          value: 2
        },
        {
          label: 'Win Via Another EPC',
          value: 3
        },
        {
          label: 'Lost',
          value: 4
        },
        {
          label: 'On-hold',
          value: 5
        },
        {
          label: 'Canceled',
          value: 6
        }
      ],
      phaseList: PHASE_VALUES,
      currentParams: {},
      tableVisible: true,
      tableMode: 'List',
      ganttRange: {
        start_date: '',
        end_date: ''
      }
    };
  },
  watch: {
    tableData: {
      handler() {
        this.tableData.forEach((item) => {
          if (item.inner_date) {
            item.displayInnerDateClock = judgeDisplayClock(
              'inner_date',
              item.quote_status
            );
          } else {
            item.displayInnerDateClock = false;
          }
          if (item.team_due_date) {
            item.displayTeamDueDateClock = judgeDisplayClock(
              'team_due_date',
              item.quote_status
            );
          } else {
            item.displayTeamDueDateClock = false;
          }
        });
      },
      immediate: true
    }
  },
  created() {
    this.justifyRole();
  },
  // activated() {
  //   if (this.$route.meta.isEdit) {
  //     this.tableData = [];
  //     this.getTableData();
  //   }
  //   this.$route.meta.isEdit = false;
  // },
  mounted() {
    this.justifyRole();
    this.getCustomerList();
    this.getSalesList();
    if (!this.preventInitialList) {
      this.getTableData();
    }
    //监听滚动条位置
    window.addEventListener('scroll', this.getYposition);
  },
  //销毁监听滚动条位置
  beforeDestroy() {
    window.removeEventListener('scroll', this.getYposition, false);
  },
  methods: {
    //处理表头定制化
    handleTableCustomization(customizedTableColumns) {
      this.handleCancelFastFilter();
      this.customizedTableColumns = customizedTableColumns;
      this.tableVisible = false;
      setTimeout(() => {
        this.tableVisible = true;
      }, 100);
    },
    mapStatus(status) {
      return mapStatus(status);
    },
    mapProjectStatus(val) {
      let status = '';
      switch (val) {
        case 1:
          status = 'Bidding';
          break;
        case 2:
          status = 'Win';
          break;
        case 3:
          status = 'Win Via Another EPC';
          break;
        case 4:
          status = 'Lost';
          break;
        case 5:
          status = 'On-hold';
          break;

        case 6:
          status = 'Canceled';
          break;

        default:
          this.status = '';
          break;
      }
      return status;
    },
    handleCancelFastFilter() {
      if (this.$refs[this.fastFilteredIconName]) {
        this.$refs[this.fastFilteredIconName].hide();
      }
      this.fastFilteredIconName = '';
      this.currentPage = 1;
      this.currentParams = {};
      this.getTableData();
    },
    //其中一个sorter作用时候，其他sorter的状态清空
    clearOtherSorterStyle(currentSorterType) {
      SORTER_REFS_LIST.forEach((item) => {
        if (this.$refs[item] && item !== currentSorterType) {
          this.$refs[item].reset();
        }
      });
    },
    handleSort(order, sorterType, sortBy) {
      this.currentParams.order = order;
      this.currentParams.orderBy = order ? sortBy : '';
      this.clearOtherSorterStyle(sorterType);
      let params = {
        type: 1,
        page: 1,
        limit: this.pageSize,
        archiving: 0,
        ...this.currentParams
      };
      projectsList(params)
        .then((res) => {
          if (res.code === 200) {
            this.ganttRange = {
              start_date: res.data.total_start_date,
              end_date: res.data.total_end_date
            };
            this.tableData = res.data.data;
            this.totalRows = res.data.total;
            this.currentPage = 1;
          }
        })
        .catch((err) => {
          return err;
        });
    },
    handleFastFilter(val, filterType, filterFor) {
      if (this.$refs.tableFilterV2) {
        this.$refs.tableFilterV2.resetFilterForm();
        this.showFilter = false;
        this.filterNum = 0;
      }
      let formData = {
        name: '',
        project_status: '',
        size: '',
        client_id: '',
        sales_id: '',
        status: '',
        solution: '',
        size_start: '',
        size_end: '',
        due_date_start: '',
        due_date_end: '',
        inner_date_start: '',
        inner_date_end: '',
        team_due_date_start: '',
        team_due_date_end: '',
        team_id: '',
        creation_id: '',
        created_at: ''
      };
      switch (filterFor) {
        case 'progress':
          formData['progress'] = val.value;
          val = val.label;
          this.fastFilteredIconName = 'fast_filtered_icon_latest_phase';
          break;
        case 'technical_details_upload':
          formData['technical_details_upload'] = val.value;
          val = val.label;
          this.fastFilteredIconName = 'fast_filtered_icon_technical_details';
          break;
        case 'golden_row_files_upload':
          formData['golden_row_files_upload'] = val.value;
          val = val.label;
          this.fastFilteredIconName = 'fast_filtered_icon_golden_row_files';
          break;
        case 'project_schedule_upload':
          formData['project_schedule_upload'] = val.value;
          val = val.label;
          this.fastFilteredIconName = 'fast_filtered_icon_project_schedule';
          break;
        case '3d-team':
          formData['3d_team_id'] = val.value;
          val = val.label;
          this.fastFilteredIconName = 'fast_filtered_icon_3d_team';
          break;
        case '3d-internal-due-date':
          formData['3d_inner_date_start'] = val[0];
          formData['3d_inner_date_end'] = val[1];
          val = `${val[0]} ` + 'to' + ` ${val[1]}`;
          this.fastFilteredIconName = 'fast_filtered_icon_3d_internal_due_date';
          break;
        case '3d-team-due-date':
          formData['3d_team_due_date_start'] = val[0];
          formData['3d_team_due_date_end'] = val[1];
          val = `${val[0]} ` + 'to' + ` ${val[1]}`;
          this.fastFilteredIconName = 'fast_filtered_icon_3d_team_due_date';
          break;
        case 'created_at':
          formData['creation_date_start'] = val[0];
          formData['creation_date_end'] = val[1];
          val = `${val[0]} ` + 'to' + ` ${val[1]}`;
          this.fastFilteredIconName = 'fast_filtered_icon_created_at';
          break;
        default:
          break;
      }
      //此前代码中，fast-filter组件只涉及了filter-type,每个fast-filter都要单独写一个组件。 后来抽离成几种类型，如SelectFastFilter等。不再关心filterType, 直接用filterFor来判断
      switch (filterType) {
        case 'CalculationStatus':
          formData['3d_calculation_status'] = val.value;
          val = val.label;
          this.fastFilteredIconName =
            'fast_filtered_icon_3d_calculation_status';
          break;
        case 'ProjectNo':
          formData.project_no = val;
          this.fastFilteredIconName = 'fast_filtered_icon_project_no';
          break;
        case 'ProjectName':
          formData.name = val;
          this.fastFilteredIconName = 'fast_filtered_icon_project_name';
          break;
        case 'Status':
          formData.sales_status = val.toString();
          val = this.mapProjectStatus(val);
          this.fastFilteredIconName = 'fast_filtered_icon_sales_status';
          break;
        case 'Size':
          formData.size_start = val[0];
          formData.size_end = val[1];
          val = `${val[0]} ` + 'to' + ` ${val[1]}`;
          this.fastFilteredIconName = 'fast_filtered_icon_size';
          break;
        case 'Customer':
          formData.client_id = val.id;
          val = val.name;
          this.fastFilteredIconName = 'fast_filtered_icon_client_name';
          break;
        case 'Sales':
          formData.sales_id = val.id;
          val = val.name;
          this.fastFilteredIconName = 'fast_filtered_icon_sales_name';
          break;
        case 'QuoteStatus':
          formData.status = val.value;
          val = val.label;
          this.fastFilteredIconName = 'fast_filtered_icon_quote_status';
          break;
        case 'Solution':
          formData.solution = val.value;
          val = val.label;
          this.fastFilteredIconName = 'fast_filtered_icon_solution';
          break;
        case 'CustomerDuedate':
          formData.due_date_start = val[0];
          formData.due_date_end = val[1];
          val = `${val[0]} ` + 'to' + ` ${val[1]}`;
          this.fastFilteredIconName = 'fast_filtered_icon_due_date';
          break;
        case 'InternalDuedate':
          formData.inner_date_start = val[0];
          formData.inner_date_end = val[1];
          val = `${val[0]} ` + 'to' + ` ${val[1]}`;
          this.fastFilteredIconName = 'fast_filtered_icon_inner_date';
          break;
        case 'TeamDuedate':
          formData.team_due_date_start = val[0];
          formData.team_due_date_end = val[1];
          val = `${val[0]} ` + 'to' + ` ${val[1]}`;
          this.fastFilteredIconName = 'fast_filtered_icon_team_due_date';
          break;
        case 'Team':
          formData.team_id = val.id;
          val = val.name;
          this.fastFilteredIconName = 'fast_filtered_icon_team_name';
          break;
        case 'Creator':
          formData.creation_id = val.id;
          val = val.name;
          this.fastFilteredIconName = 'fast_filtered_icon_creation_name';
          break;

        default:
          break;
      }

      this.currentParams = { ...formData };
      projectsList({
        type: 1,
        page: 1,
        search: this.searchVal,
        limit: this.pageSize,
        archiving: 0,
        ...this.currentParams
      }).then((res) => {
        if (res.code === 200) {
          this.ganttRange = {
              start_date: res.data.total_start_date,
              end_date: res.data.total_end_date
            };
          this.tableData = res.data.data;
          this.totalRows = res.data.total;
          this.currentPage = 1;
          this.fastFilteredContent = val;
          this.showFastFilterIcon();
        }
      });
    },
    showFastFilterIcon() {
      FAST_FILTER_ICON_REFS.forEach((item) => {
        let that = this;
        if (item === this.fastFilteredIconName) {
          this.$refs[item].applyContent(that.fastFilteredContent);
          this.$refs[item].show();
        }
        if (item !== this.fastFilteredIconName) {
          if (this.$refs[item]) {
            this.$refs[item].hide();
          }
        }
      });
    },
    showRegisterHoursModal(row) {
      this.registerWorkingHoursProjectId = row.id;
      this.$refs.registerHoursModal.show();
    },
    toggleFilterDisplay() {
      this.showFilter = !this.showFilter;
    },
    handlePageSizeChange(size) {
      this.currentPage = 1;
      this.pageSize = size;
      this.$store.dispatch('app/storeProjectListCurrentPage', 1);
      if (this.underFilter) {
        this.toFilter();
      } else {
        this.getTableData();
      }
    },
    closePopover() {
      // 通过 ref 找到 el-popover 并触发鼠标移出事件以关闭它
      FAST_FILTER_REFS.forEach((item) => {
        if (this.$refs[item]) {
          this.$nextTick(() => {
            this.$refs[item].doClose();
          });
        }
      });
    },
    showFastFilter(e) {
      // eslint-disable-next-line no-unused-expressions
      this.showFastFilterName === e.target.innerHTML;
    },
    clearFastFilter() {
      this.showFastFilterName = '';
    },
    formatDates(date, dateType) {
      return dateType === 'created_at'
        ? dayjs(date).format('YYYY-MM-DD HH:mm:ss')
        : dayjs(date).format('YYYY-MM-DD');
    },
    //获取滚动条位置
    getYposition() {
      let { scrollY } = window;
      this.yPosition = scrollY;
    },
    scrollPage() {
      this.$nextTick(() => {
        //从vuex中拿数据，滚动条回到之前的位置，并且重置vuex中的位置
        window.scrollTo(0, this.$store.state.app.projectListLastPosition);
        this.$store.dispatch('app/changeProjectListLastPosition', 0);
      });
    },
    justifyRole() {
      let limits = JSON.parse(localStorage.getItem('limits'));
      if (limits.Bidding_Project_List) {
        this.userLimits = limits.Bidding_Project_List;
      }
      if (limits.Bidding_Project_List.register_hours) {
        this.showAddingWorkingHours = true;
      }
    },

    /**获取project列表数据 */
    async getTableData() {
      this.underFilter = false;
      const { salesStatusOptions } = this;
      await projectsList({
        type: 1,
        page: this.currentPage,
        search: this.searchVal,
        limit: this.pageSize,
        archiving: 0,
        ...this.currentParams
      })
        .then((res) => {
          if (res.code === 200) {
            let { data } = res.data;
            this.ganttRange = {
              start_date: res.data.total_start_date,
              end_date: res.data.total_end_date
            };
            this.totalRows = res.data.total;
            this.tableData = data.map((item) => {
              let status = item.sales_status;
              item['sales_status_text'] = status;
              if (Number(status)) {
                for (let i = 0; i < salesStatusOptions.length; i++) {
                  let itemOption = salesStatusOptions[i];
                  if (itemOption.value === Number(status)) {
                    item['sales_status_text'] = itemOption.label;
                  }
                }
              }
              return item;
            });
          }
          return;
        })
        .catch((err) => {
          return err;
        })
        .finally(() => {
          this.scrollPage();
        });
    },
    handlePage(num) {
      this.currentPage = num;
      this.$store.dispatch('app/storeProjectListCurrentPage', num);
      if (this.underFilter) {
        this.toFilter();
      } else {
        this.getTableData();
      }
    },
    handleSearch(searchVal) { 
      this.$refs['tableFilterV2'].resetFilterForm();
      this.currentParams = {};
      this.filterNum = 0;
      this.showFilter = false;
      this.currentPage = 1;
      this.searchVal = searchVal;
      this.getTableData();
    },
    async getCustomerList() {
      await customerAll()
        .then((res) => {
          if (res.code === 200) {
            this.customerOptions = res.data;
          }
          return;
        })
        .catch((err) => {
          return err;
        });
    },
    async getSalesList() {
      await salesList({ is_delete: 'all' })
        .then((res) => {
          if (res.code === 200) {
            this.salesOptions = res.data;
          } else {
            // this.$message.error(res.message);
          }
          return;
        })
        .catch((err) => {
          return err;
        });
    },

    /**切换List/Gantt */
    getTableSelector(params) {
      this.tableMode = params;
    },

    /**点击新增project按钮 */
    handleAdd() {
      this.projectActionMode = 'add';
      this.$refs.projectModal.show();
    },

    /**点击查看project详情按钮 */
    handleView(row) {
      this.$router.push(`/index/project/bidding/detail/overview/${row.id}`);
    },

    /**点击project编辑按钮 */
    handleEdit(row) {
      //新版本的编辑采用和新增Project一样的弹窗
      this.projectActionMode = 'edit';
      projectDetail({ id: row.id }).then((res) => {
        if (res.code === 200) {
          let data = res.data;
          let formData = {
            id: row.id,
            project_no: data.project_no,
            description: data.description,
            client_id: data.client_id,
            sales_id: data.sales_id,
            size: data.size,
            currency: data.currency,
            address: data.address,
            city: data.city,
            county: data.county,
            state: data.state,
            zipcode: data.zipcode,
            remark: data.remark
          };
          this.projectForm = { ...formData };
          this.$refs.projectModal.show();
        }
      });
    },

    /**点击project删除按钮 */
    handleDelete(row) {
      this.$confirm('Are you sure to delete this item?', 'Tips', {
        confirmButtonText: 'Confirm',
        cancelButtonText: 'Cancel',
        type: 'warning'
      })
        .then(() => {
          this.removeProject(row);
        })
        .catch(() => {
          return;
        });
    },
    async removeProject(row) {
      await deleteProject(row.id)
        .then((res) => {
          if (res.code === 200) {
            this.$message({
              message: 'Done',
              type: 'success'
            });
            this.getTableData();
          } else {
            // this.$message.error(res.message);
          }
          return;
        })
        .catch((err) => {
          return err;
        });
    },
    transFormat(time) {
      // let date = new Date(time);
      // let year = date.getFullYear();
      // let month = date.getMonth() + 1;
      // let day = date.getDate();
      // let hour = date.getHours();
      // let minute = date.getMinutes();
      // let second = date.getSeconds();
      // if (month < 10) {
      //   month = `0${month}`;
      // }
      // if (day < 10) {
      //   day = `0${day}`;
      // }
      // if (hour < 10) {
      //   hour = `0${hour}`;
      // }
      // if (minute < 10) {
      //   minute = `0${minute}`;
      // }
      // if (second < 10) {
      //   second = `0${second}`;
      // }
      // //判断是否为截至日期项，该项的分和秒要写成当天的23时59分59秒，否则正常传
      // if (endTime) {
      //   return `${year}-${month}-${day} 23:59:59`;
      // } else {
      //   return `${year}-${month}-${day} ${hour}:${minute}:${second}`;
      // }
      return time;
    },
    transTableTimeFormat(time, mode) {
      let date = new Date(time);
      let year = date.getFullYear();
      let month = date.getMonth() + 1;
      let day = date.getDate();
      // let hour = date.getHours()-8;
      let hour = date.getHours();
      let minute = date.getMinutes();
      let second = date.getSeconds();
      if (month < 10) {
        month = `0${month}`;
      }
      if (day < 10) {
        day = `0${day}`;
      }
      if (hour < 10) {
        hour = `0${hour}`;
      }
      if (minute < 10) {
        minute = `0${minute}`;
      }
      if (second < 10) {
        second = `0${second}`;
      }
      let msg = `${year}-${month}-${day} ${hour}:${minute}:${second}`;
      if (mode === 'date') {
        msg = `${year}-${month}-${day}`;
      }
      return msg;
    },
    handleOnFilter(formData, filterNum) {
      this.filterNum = filterNum;
      this.filterFormData = { ...formData };
      // this.formatTimeRange();
      if (this.fastFilteredIconName) {
        if (this.$refs[this.fastFilteredIconName]) {
          this.$refs[this.fastFilteredIconName].hide();
        }
      }
      this.roundDCnumber();
      this.underFilter = true;
      this.currentPage = 1;
      this.toFilter();
    },
    formatTimeRange() {
      if (this.filterFormData.quoteDueDateStart) {
        this.filterFormData.quoteDueDateStart = this.filterFormData
          .quoteDueDateStart
          ? this.transFormat(this.filterFormData.quoteDueDateStart)
          : '';
      }
      if (this.filterFormData.quoteDueDateEnd) {
        this.filterFormData.quoteDueDateEnd = this.filterFormData
          .quoteDueDateEnd
          ? this.transFormat(this.filterFormData.quoteDueDateEnd, true)
          : '';
      }
      if (this.filterFormData.inner_date_start) {
        this.filterFormData.inner_date_start = this.filterFormData
          .inner_date_start
          ? this.transFormat(this.filterFormData.inner_date_start)
          : '';
      }
      if (this.filterFormData.inner_date_end) {
        this.filterFormData.inner_date_end = this.filterFormData.inner_date_end
          ? this.transFormat(this.filterFormData.inner_date_end, true)
          : '';
      }
      if (this.filterFormData.creationTimeFrom) {
        this.filterFormData.creationTimeFrom = this.filterFormData
          .creationTimeFrom
          ? this.transFormat(this.filterFormData.creationTimeFrom)
          : '';
      }
      if (this.filterFormData.creationTimeTo) {
        this.filterFormData.creationTimeTo = this.filterFormData.creationTimeTo
          ? this.transFormat(this.filterFormData.creationTimeTo, true)
          : '';
      }
    },
    //将DC_Size这一栏的数据保留两位小数
    roundDCnumber() {
      let { sizeFrom } = this.filterFormData;
      let { sizeTo } = this.filterFormData;
      if (sizeFrom) {
        const num = this.filterFormData.sizeFrom.toFixed(2);
        this.filterFormData.sizeFrom = parseFloat(num);
      }
      if (sizeTo) {
        const num = this.filterFormData.sizeTo.toFixed(2);
        this.filterFormData.sizeTo = parseFloat(num);
      }
    },
    //进行筛选
    toFilter() {
      let params = {
        type: 1,
        page: this.currentPage,
        limit: this.pageSize,
        search: this.filterFormData.project,
        sales_id: this.filterFormData.sales,
        client_id: this.filterFormData.customer,
        creation_id: this.filterFormData.creator,
        sales_status: this.filterFormData.projectStatus,
        status: this.filterFormData.quoteStatus,
        due_date_start: this.filterFormData.quoteDueDateStart,
        due_date_end: this.filterFormData.quoteDueDateEnd,
        inner_date_start: this.filterFormData.inner_date_start,
        inner_date_end: this.filterFormData.inner_date_end,
        size_start: this.filterFormData.sizeFrom,
        size_end: this.filterFormData.sizeTo,
        creation_date_start: this.filterFormData['creation_date_start'],
        creation_date_end: this.filterFormData['creation_date_end'],
        team_due_date_start: this.filterFormData.team_due_date_start,
        team_due_date_end: this.filterFormData.team_due_date_end,
        archiving: this.filterFormData.archiving
          ? this.filterFormData.archiving
          : 0,
        solution: this.filterFormData.solution,
        team_id: this.filterFormData.team_id,
        '3d_calculation_status': this.filterFormData['3d_calculation_status'],
        '3d_team_id': this.filterFormData['3d_team_id'],
        '3d_inner_date_start': this.filterFormData['3d_inner_date_start'],
        '3d_inner_date_end': this.filterFormData['3d_inner_date_end'],
        '3d_team_due_date_start': this.filterFormData['3d_team_due_date_start'],
        '3d_team_due_date_end': this.filterFormData['3d_team_due_date_end'],
        simulation_inner_date_start:
          this.filterFormData['simulation_inner_date_start'],
        simulation_inner_date_end:
          this.filterFormData['simulation_inner_date_end'],
        simulation_team_due_date_start:
          this.filterFormData['simulation_team_due_date_start'],
        simulation_team_due_date_end:
          this.filterFormData['simulation_team_due_date_end'],
        technical_details_upload:
          this.filterFormData['technical_details_upload'],
        golden_row_files_upload: this.filterFormData['golden_row_files_upload'],
        project_schedule_upload: this.filterFormData['project_schedule_upload'],
        progress: this.filterFormData['progress']
      };
      projectsList(params)
        .then((res) => {
          if (res.code === 200) {
            this.ganttRange = {
              start_date: res.data.total_start_date,
              end_date: res.data.total_end_date
            };
            this.tableData = res.data.data;
            this.totalRows = res.data.total;
            this.currentParams = { ...params };
            // this.pageSize = this.pageSize;
          }
        })
        .catch((err) => {
          return err;
        })
        .finally(() => {
          this.scrollPage();
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
        return solution;
      }
    },
    judgeDisplayClock(dateType, quoteStatus) {
      return judgeDisplayClock(dateType, quoteStatus);
    }
  }
};
</script>
<style>
/* stylelint-disable-next-line selector-class-pattern */
.page-container .el-table--border .el-table__cell {
  border-right: none;
}

/* stylelint-disable-next-line selector-class-pattern */
.page-container .el-table th.el-table__cell > .cell {
  display: flex;
  align-items: center;
  background-color: #f5f7fa;
}

/* stylelint-disable-next-line selector-class-pattern */
.page-container .el-table th.el-table__cell {
  background-color: #f5f7fa;
}

/* stylelint-disable-next-line selector-class-pattern */
.page-container .el-table--border {
  border-radius: 4px;
}

.el-popover.el-popper.el-popover-self {
  min-width: 20px !important;
  padding: 0;
}

/* stylelint-disable-next-line selector-class-pattern */
.page-container .el-table .el-table__cell {
  padding: 6px 0;
}

.page-container .el-table thead {
  color: #303133;
}

/* stylelint-disable-next-line selector-class-pattern */
.page-container .el-table__empty-block {
  min-height: 0;
}
</style>
<style lang="less" scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
}

.column-on-hover {
  &:hover {
    cursor: pointer;
    color: #007bff;
  }
}

.customizer-wrapper {
  margin-right: 5px;
  margin-left: 3px;
  margin-top: 3px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.page-container {
  display: flex;
  flex-direction: column;
  min-height: calc(100vh - 90px);

  .card-templete {
    flex: 1;

    .filter-area {
      transform: translateX(30px);
      margin-bottom: 24px;
    }

    .table-wrapper {
      position: relative;
      width: 100%;

      .yes-or-no-tag {
        width: 56px;
        height: 24px;
        border-radius: 2px;
        text-align: center;
        font-size: 14px;
        &.yes {
          background: rgba(103, 194, 58, 0.1);
          border: 1px solid rgba(103, 194, 58, 0.5);
          span {
            color: #67c23a;
          }
        }
        &.no {
          border: 1px solid rgba(245, 108, 108, 0.5);
          background: rgba(245, 108, 108, 0.1);
          span {
            color: #f56c6c;
          }
        }
      }

      .table-tag {
        min-width: 50px;
        text-align: center;
      }
    }

    .table-wrapper ::-webkit-scrollbar {
      width: 5px;
      height: 5px;
    }
  }

  .table-search {
    display: flex;
    align-items: center;
    justify-content: space-between;

    .input {
      margin-right: 10px;
      cursor: pointer;
    }

    .new-btn {
      width: 80px;
      text-align: right;
    }
  }

  .project-name {
    text-overflow: ellipsis;
    white-space: nowrap;
    cursor: pointer;
  }

  .project-name:hover {
    color: #007bff;
    text-decoration: underline;
  }
}

.page-pagination {
  text-align: center;
  margin-top: 45px;
  display: flex;
  align-items: center;
  justify-content: flex-end;

  .total-items {
    font-size: 13px;
    font-family: 'PingFang SC-Regular', 'PingFang SC', sans-serif;
    font-weight: 400;
    color: #909399;
    line-height: 0px;
  }

  .page-sizer {
    .page-sizer-text {
      font-size: 13px;
      font-family: 'PingFang SC-Regular', 'PingFang SC', sans-serif;
      font-weight: 400;
      color: #909399;
      line-height: 0px;
      margin-right: 3px;
    }

    display: flex;
    align-items: center;
    justify-content: center;
  }
}
</style>
