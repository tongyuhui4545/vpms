<template>
  <div class="work-item-page-container">
    <div class="content-left">
      <div class="content-left-title">
        <span><img
          src="@/assets/IconDesigns/Sales_tools.png"
          alt="folder"
        ></span>
        <span>Work item</span>
      </div>
      <div class="content-left-options">
        <div
          v-for="option in workItemTypes"
          :key="option.title"
          class="option"
          :style="{
            background:
              currentWorkItemType === option.title
                ? 'rgba(0,123,255,0.1)'
                : '#ffffff',
            color: currentWorkItemType === option.title ? '#007BFF' : '#303133'
          }"
          @click="changeWorkItemType(option)"
        >
          <span>{{ option.title }}</span>
          <span>{{ option.number }}</span>
        </div>
      </div>
    </div>
    <div class="content-right">
      <div
        :class="{
          'filter-area': true,
          transformed: [
            'ThreeDBiddingTaskFilter',
            'ThreeDFormalTaskFilter',
            'SimulationTaskFilter'
          ].includes(filterName)
        }"
      >
        <transition
          name="fade"
          mode="out-in"
        >
          <TableFilterV2
            v-show="showFilter"
            ref="tableFilter"
            :current-task-type="currentTaskCategory"
            :filter-name="filterName"
            style="margin-left: 15px"
            @on-filter="handleOnFilter"
          />
        </transition>
      </div>
      <div class="content-right-title">
        {{ currentWorkItemType }}
      </div>
      <div
        class="content-right-header"
        :style="{
          'justify-content':
            currentWorkItemType === 'Pending for me' ||
            currentWorkItemType === 'Handled by me' ||
            currentWorkItemType === 'Public tasks'
              ? 'space-between'
              : 'right'
        }"
      >
        <div
          v-if="
            currentWorkItemType === 'Pending for me' ||
              currentWorkItemType === 'Handled by me' ||
              currentWorkItemType === 'Public tasks'
          "
          class="tabs-wrapper"
        >
          <div
            v-for="tab in workItemTabs"
            :key="tab.id"
            :class="['content-right-tab', { active: tab.id === tabActive }]"
            @click="handleChooseTab(tab)"
          >
            <span class="tab-title">{{ tab.title }}</span>
            <span class="round-symbol" />
            <span>{{ tab.number }}</span>
          </div>
        </div>
        <div class="content-right-operations">
          <TogglableSearchBar
            style="margin-bottom: 3px"
            @on-search="handleOnSearch"
          />
          <!-- <TableFilter ref="tableFilter" @onFilter="handleOnFilter" :filterFor="filterFor" /> -->
          <div @click="toggleFilterDisplay">
            <el-badge
              v-if="filterNum !== 0"
              :value="filterNum"
            >
              <FilterIcon />
            </el-badge>
            <FilterIcon v-else />
          </div>
          <span class="vertical-divider" />
          <el-select
            v-model="infoDisplayType"
            size="mini"
            style="width: 120px"
          >
            <template slot="prefix">
              <img
                src="@/assets/IconDesigns/list_icon.png"
                alt="list_icon"
                style="
                  width: 16px;
                  height: 16px;
                  display: flex;
                  align-items: center;
                "
              >
            </template>
            <el-option
              label="List"
              value="List"
            >
              List
            </el-option>
            <el-option
              v-if="currentTaskCategory === 5"
              label="Gantt"
              value="Gantt"
            >
              Gantt
            </el-option>
          </el-select>
          <el-button
            v-if="currentWorkItemType === 'Created by me'"
            type="primary"
            class="new-task-btn"
            @click="showCreateTaskDialog"
          >
            + New
          </el-button>
        </div>
      </div>

      <div>
        <!-- ***************************bidding*********************************** -->
        <div
          v-if="
            tabTitle == 'Bidding' &&
              (currentTaskCategory < 3 || currentTaskCategory === 5)
          "
          class="content-right-table"
        >
          <el-table
            v-if="infoDisplayType === 'List'"
            :data="tableData"
            border
          >
            <el-table-column
              :min-width="titleWidth"
            >
              <template slot="header">
                <div style="display: flex; align-items: center">
                  <el-popover
                    ref="quoteTitlePopover"
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
                      fast-filter-type="QuoteTitle"
                      @fast-filter="handleFastFilter"
                    />
                  </el-popover>
                  <Sorter
                    ref="quote_title_sorter"
                    sorter-type="quote_title_sorter"
                    sort-by="title"
                    @on-sort="handleSort"
                  />
                  <FastFilteredIcon
                    ref="fast_filtered_icon_quote_title"
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
                      v-if="scope.row.title"
                      class="table-project-clickable-text"
                      @click="goToProject('quote', scope.row)"
                    >
                      {{ scope.row.title }}
                    </p>
                  </div>
                  <DueDateTag
                    v-if="currentStatus != 2"
                    :tag-data="scope.row"
                    :tag-type="tagType"
                  />
                </div>
              </template>
            </el-table-column>
            <!-- //assign to -->
            <el-table-column
              v-if="currentWorkItemType === 'Public tasks'"
              min-width="120"
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
                      @click="closePopover"
                    >Assign to</span>
                    <FastFilter
                      fast-filter-type="SelectFastFilter"
                      :options="userOptions"
                      filter-for="assign_to"
                      @fast-filter="handleFastFilter"
                    />
                  </el-popover>
                  <Sorter
                    ref="quote_assign_to_sorter"
                    sorter-type="quote assign_to_sorter"
                    sort-by="receiver_name"
                    @on-sort="handleSort"
                  />
                  <FastFilteredIcon
                    ref="fast_filtered_icon_assign_to"
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
                      v-if="scope.row.receiver_name"
                    >
                      {{ scope.row.receiver_name }}
                    </p>
                  </div>
                </div>
              </template>
            </el-table-column>

            <el-table-column
              label="Project name"
              width="160"
            >
              <template slot="header">
                <div style="display: flex; align-items: center">
                  <el-popover
                    ref="quoteProjectNamePopover"
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
                      fast-filter-type="QuoteProjectName"
                      @fast-filter="handleFastFilter"
                    />
                  </el-popover>
                  <Sorter
                    ref="quote_project_name_sorter"
                    sorter-type="quote_project_name_sorter"
                    sort-by="project_name"
                    @on-sort="handleSort"
                  />
                  <FastFilteredIcon
                    ref="fast_filtered_icon_quote_project_name"
                    @cancel="handleCancelFastFilter"
                  />
                </div>
              </template>
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
              label="Project No"
              width="120"
            >
              <template slot="header">
                <div style="display: flex; align-items: center">
                  <el-popover
                    ref="quoteProjectNoPopover"
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
                    >Project No</span>
                    <FastFilter
                      fast-filter-type="QuoteProjectNo"
                      @fast-filter="handleFastFilter"
                    />
                  </el-popover>
                  <Sorter
                    ref="quote_project_no_sorter"
                    sorter-type="quote_project_no_sorter"
                    sort-by="project_no"
                    @on-sort="handleSort"
                  />
                  <FastFilteredIcon
                    ref="fast_filtered_icon_quote_project_no"
                    @cancel="handleCancelFastFilter"
                  />
                </div>
              </template>
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
              label="Phase No"
              width="110"
            >
              <template slot="header">
                <div style="display: flex; align-items: center">
                  <el-popover
                    ref="quotePhaseNoPopover"
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
                    >Phase No</span>
                    <FastFilter
                      fast-filter-type="QuotePhaseNo"
                      @fast-filter="handleFastFilter"
                    />
                  </el-popover>
                  <Sorter
                    ref="quote_phase_no_sorter"
                    sorter-type="quote_phase_no_sorter"
                    sort-by="progress_no"
                    @on-sort="handleSort"
                  />
                  <FastFilteredIcon
                    ref="fast_filtered_icon_quote_phase_no"
                    @cancel="handleCancelFastFilter"
                  />
                </div>
              </template>
              <template
                v-if="scope.row.progress_no"
                slot-scope="scope"
              >
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
              width="100"
            >
              <template slot="header">
                <div style="display: flex; align-items: center">
                  <el-popover
                    ref="quotePhasePopover"
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
                    >Phase</span>
                    <FastFilter
                      fast-filter-type="QuotePhase"
                      @fast-filter="handleFastFilter"
                    />
                  </el-popover>
                  <Sorter
                    ref="quote_phase_sorter"
                    sorter-type="quote_phase_sorter"
                    sort-by="phase"
                    @on-sort="handleSort"
                  />
                  <FastFilteredIcon
                    ref="fast_filtered_icon_quote_phase"
                    @cancel="handleCancelFastFilter"
                  />
                </div>
              </template>
              <template
                v-if="scope.row.phase"
                slot-scope="scope"
              >
                <p
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
              <template slot="header">
                <div style="display: flex; align-items: center">
                  <el-popover
                    ref="quoteSolutionPopover"
                    placement="bottom-start"
                    width="115"
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
                      fast-filter-type="QuoteSolution"
                      @fast-filter="handleFastFilter"
                    />
                  </el-popover>
                  <Sorter
                    ref="quote_solution_sorter"
                    sorter-type="quote_solution_sorter"
                    sort-by="solution"
                    @on-sort="handleSort"
                  />
                  <FastFilteredIcon
                    ref="fast_filtered_icon_quote_solution"
                    @cancel="handleCancelFastFilter"
                  />
                </div>
              </template>
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
              <template slot="header">
                <div style="display: flex; align-items: center">
                  <el-popover
                    ref="quoteTeamPopover"
                    placement="bottom-start"
                    width="125"
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
                      fast-filter-type="QuoteTeam"
                      @fast-filter="handleFastFilter"
                    />
                  </el-popover>
                  <Sorter
                    ref="quote_team_sorter"
                    sorter-type="quote_team_sorter"
                    sort-by="team_name"
                    @on-sort="handleSort"
                  />
                  <FastFilteredIcon
                    ref="fast_filtered_icon_quote_team"
                    @cancel="handleCancelFastFilter"
                  />
                </div>
              </template>
              <template slot-scope="scope">
                <p v-if="scope.row.team_name">
                  {{ scope.row.team_name }}
                </p>
              </template>
            </el-table-column>

            <el-table-column
              label="Quote status"
              width="220"
            >
              <template slot="header">
                <div style="display: flex; align-items: center">
                  <el-popover
                    ref="quoteTaskStatusPopover"
                    placement="bottom-start"
                    width="330"
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
                      fast-filter-type="QuoteTaskStatus"
                      @fast-filter="handleFastFilter"
                    />
                  </el-popover>
                  <Sorter
                    ref="quote_quote_status_sorter"
                    sorter-type="quote_quote_status_sorter"
                    sort-by="progress_status"
                    @on-sort="handleSort"
                  />
                  <FastFilteredIcon
                    ref="fast_filtered_icon_quote_task_status"
                    @cancel="handleCancelFastFilter"
                  />
                </div>
              </template>
              <template
                v-if="scope.row.progress_status"
                slot-scope="scope"
              >
                <el-tooltip
                  :content="scope.row.progress_status_label"
                  placement="top"
                >
                  <QuoteStatusTag
                    :tag-text="scope.row.progress_status_label"
                    type="quote"
                  />
                </el-tooltip>
              </template>
            </el-table-column>

            <el-table-column
              label="Customer due date"
              width="180"
            >
              <template slot="header">
                <div style="display: flex; align-items: center">
                  <el-popover
                    ref="quoteCustomerDuedatePopover"
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
                    >Customer due date</span>
                    <FastFilter
                      fast-filter-type="QuoteCustomerDuedate"
                      @fast-filter="handleFastFilter"
                    />
                  </el-popover>
                  <Sorter
                    ref="quote_customer_duedate_sorter"
                    sorter-type="quote_customer_duedate_sorter"
                    sort-by="due_date"
                    @on-sort="handleSort"
                  />
                  <FastFilteredIcon
                    ref="fast_filtered_icon_quote_customer_due_date"
                    @cancel="handleCancelFastFilter"
                  />
                </div>
              </template>
              <template slot-scope="scope">
                <p v-if="scope.row.due_date">
                  {{ scope.row.due_date }}
                </p>
              </template>
            </el-table-column>

            <el-table-column
              label="Internal due date"
              width="160"
            >
              <template slot="header">
                <div style="display: flex; align-items: center">
                  <el-popover
                    ref="quoteInternalDuedatePopover"
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
                    >Internal due date</span>
                    <FastFilter
                      fast-filter-type="QuoteInternalDuedate"
                      @fast-filter="handleFastFilter"
                    />
                  </el-popover>
                  <Sorter
                    ref="quote_internal_duedate_sorter"
                    sorter-type="quote_internal_duedate_sorter"
                    sort-by="inner_date"
                    @on-sort="handleSort"
                  />
                  <FastFilteredIcon
                    ref="fast_filtered_icon_quote_internal_due_date"
                    @cancel="handleCancelFastFilter"
                  />
                </div>
              </template>
              <template slot-scope="scope">
                <p v-if="scope.row.inner_date">
                  {{ scope.row.inner_date }}
                </p>
              </template>
            </el-table-column>

            <el-table-column
              label="Team due date"
              width="160"
            >
              <template slot="header">
                <div style="display: flex; align-items: center">
                  <el-popover
                    ref="quoteTeamDuedatePopover"
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
                    >Team due date</span>
                    <FastFilter
                      fast-filter-type="QuoteTeamDuedate"
                      @fast-filter="handleFastFilter"
                    />
                  </el-popover>
                  <Sorter
                    ref="quote_team_duedate_sorter"
                    sorter-type="quote_team_duedate_sorter"
                    sort-by="team_due_date"
                    @on-sort="handleSort"
                  />
                  <FastFilteredIcon
                    ref="fast_filtered_icon_quote_team_due_date"
                    @cancel="handleCancelFastFilter"
                  />
                </div>
              </template>
              <template slot-scope="scope">
                <p v-if="scope.row.team_due_date">
                  {{ scope.row.team_due_date }}
                </p>
              </template>
            </el-table-column>

            <el-table-column
              label="Creation date"
              width="160"
            >
              <template slot="header">
                <div style="display: flex; align-items: center">
                  <el-popover
                    ref="quoteCreationDatePopover"
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
                    >Creation date</span>
                    <FastFilter
                      fast-filter-type="QuoteCreationDate"
                      @fast-filter="handleFastFilter"
                    />
                  </el-popover>
                  <Sorter
                    ref="quote_creation_date_sorter"
                    sorter-type="quote_creation_date_sorter"
                    sort-by="created_at"
                    @on-sort="handleSort"
                  />
                  <FastFilteredIcon
                    ref="fast_filtered_icon_quote_creation_date"
                    @cancel="handleCancelFastFilter"
                  />
                </div>
              </template>
              <template slot-scope="scope">
                <p v-if="scope.row.created_at">
                  {{ formatCreationTime(scope.row.created_at) }}
                </p>
              </template>
            </el-table-column>

            <el-table-column
              label="Creator"
              width="100"
            >
              <template slot="header">
                <div style="display: flex; align-items: center">
                  <el-popover
                    ref="quoteCreatorPopover"
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
                      fast-filter-type="QuoteCreator"
                      @fast-filter="handleFastFilter"
                    />
                  </el-popover>
                  <Sorter
                    ref="quote_creator_sorter"
                    sorter-type="quote_creator_sorter"
                    sort-by="creation_name"
                    @on-sort="handleSort"
                  />
                  <FastFilteredIcon
                    ref="fast_filtered_icon_quote_creator"
                    @cancel="handleCancelFastFilter"
                  />
                </div>
              </template>
              <template slot-scope="scope">
                <p v-if="scope.row.creation_name">
                  {{ scope.row.creation_name }}
                </p>
              </template>
            </el-table-column>
            <el-table-column
              v-if="currentStatus == 2"
              label="Completion time"
              width="100"
            >
              <template slot="header">
                <div style="display: flex; align-items: center">
                  <el-popover
                    ref="quoteCompletionTimePopover"
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
                    >Completion time</span>
                    <FastFilter
                      fast-filter-type="DateRangeFastFilter"
                      filter-for="bidding_completion_time"
                      @fast-filter="handleFastFilter"
                    />
                  </el-popover>
                  <Sorter
                    ref="quote_completion_time_sorter"
                    sorter-type="quote_completion_time_sorter"
                    sort-by="completed_at"
                    @on-sort="handleSort"
                  />
                  <FastFilteredIcon
                    ref="fast_filtered_icon_completion_time"
                    @cancel="handleCancelFastFilter"
                  />
                </div>
              </template>
              <template slot-scope="scope">
                <p v-if="scope.row.creation_name">
                  {{ scope.row.completed_at }}
                </p>
              </template>
            </el-table-column>
            <el-table-column
              v-if="currentStatus == 2"
              label="Completer"
              min-width="120"
            >
              <template slot="header">
                <div style="display: flex; align-items: center">
                  <el-popover
                    ref="quoteCompleterPopover"
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
                    >Completer</span>
                    <FastFilter
                      fast-filter-type="Completer"
                      @fast-filter="handleFastFilter"
                    />
                  </el-popover>
                  <Sorter
                    ref="quote_completer_sorter"
                    sorter-type="quote_completer_sorter"
                    sort-by="completer"
                    @on-sort="handleSort"
                  />
                  <FastFilteredIcon
                    ref="fast_filtered_icon_completer"
                    @cancel="handleCancelFastFilter"
                  />
                </div>
              </template>
              <template slot-scope="scope">
                <p v-if="scope.row.creation_name">
                  {{ scope.row.completer }}
                </p>
              </template>
            </el-table-column>
          </el-table>
          <div
            v-show="infoDisplayType === 'Gantt'"
            class="content-right-table"
          >
            <Gantt
              :gantt-params="{
                mode: tabActive === 7 ? 3 : 2,
                group: false,
                start_date: ganttRange.start_date,
                end_date: ganttRange.end_date,
                data: tableData
              }"
            />
          </div>
          <div
            class="page-gatation"
            style="padding-bottom: 15px"
          >
            <NormalPagination
              :total-rows="totalRows"
              :current-page="pageInfo.currentPage"
              :page-size="pageInfo.pageSize"
              @page-change="handlePage"
              @page-size-change="handlePageSizeChange"
            />
          </div>
        </div>
        <!-- ***************************formal*********************************** -->
        <div
          v-if="
            tabTitle == 'Formal' &&
              (currentTaskCategory < 3 || currentTaskCategory === 5)
          "
          class="content-right-table"
        >
          <el-table
            v-if="infoDisplayType === 'List'"
            :data="tableData"
            border
          >
            <el-table-column
              :min-width="titleWidth"
            >
              <template slot="header">
                <el-popover
                  ref="formalTaskTitlePopover"
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
                    fast-filter-type="QuoteTitle"
                    filter-for="title"
                  />
                </el-popover>
                <Sorter
                  ref="formal_task_title"
                  sorter-type="formal_task_title"
                  @on-sort="handleSort"
                />
                <FastFilteredIcon
                  ref="fast_filtered_icon_formal_task_title"
                  @cancel="handleCancelFastFilter"
                />
              </template>
              <template slot-scope="scope">
                <div
                  class="row-title"
                  style="display: flex; align-items: center; gap: 5px"
                >
                  <div style="flex: 1">
                    <p
                      v-if="scope.row.title"
                      class="table-project-clickable-text"
                      @click="goToProject('formal', scope.row)"
                    >
                      {{ scope.row.title }}
                    </p>
                  </div>
                  <DueDateTag
                    v-if="currentStatus != 2"
                    :tag-data="scope.row"
                    :tag-type="tagType"
                  />
                </div>
              </template>
            </el-table-column>
            <!-- //assign to -->
            <el-table-column
              v-if="currentWorkItemType === 'Public tasks'"
              min-width="120"
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
                      @click="closePopover"
                    >Assign to</span>
                    <FastFilter
                      fast-filter-type="SelectFastFilter"
                      :option="userOptions"
                      filter-for="assign_to"
                      @fast-filter="handleFastFilter"
                    />
                  </el-popover>
                  <Sorter
                    ref="quote_assign_to_sorter"
                    sorter-type="quote assign_to_sorter"
                    sort-by="receiver_name"
                    @on-sort="handleSort"
                  />
                  <FastFilteredIcon
                    ref="fast_filtered_icon_assign_to"
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
                      v-if="scope.row.receiver_name"
                    >
                      {{ scope.row.receiver_name }}
                    </p>
                  </div>
                </div>
              </template>
            </el-table-column>

            <el-table-column
              label="Project name"
              width="160"
            >
              <template slot="header">
                <el-popover
                  ref="formalTaskProjectNamePopover"
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
                    fast-filter-type="QuoteProjectName"
                    @fast-filter="handleFastFilter"
                  />
                </el-popover>
                <Sorter
                  ref="formal_task_project_name"
                  sorter-type="formal_task_project_name"
                  @on-sort="handleSort"
                />
                <FastFilteredIcon
                  ref="fast_filtered_icon_formal_project_name"
                  @cancel="handleCancelFastFilter"
                />
              </template>
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
              label="Project No"
              width="120"
            >
              <template slot="header">
                <el-popover
                  ref="formalTaskProjectNoPopover"
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
                  >Project No</span>
                  <FastFilter
                    fast-filter-type="QuoteProjectNo"
                    @fast-filter="handleFastFilter"
                  />
                </el-popover>
                <Sorter
                  ref="formal_task_project_no"
                  sorter-type="formal_task_project_no"
                  @on-sort="handleSort"
                />
                <FastFilteredIcon
                  ref="fast_filtered_icon_formal_project_no"
                  @cancel="handleCancelFastFilter"
                />
              </template>
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
              label="Phase No"
              width="110"
            >
              <template slot="header">
                <el-popover
                  ref="formalTaskPhaseNoPopover"
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
                  >Phase No</span>
                  <FastFilter
                    fast-filter-type="QuotePhaseNo"
                    @fast-filter="handleFastFilter"
                  />
                </el-popover>
                <Sorter
                  ref="formal_task_phase_no"
                  sorter-type="formal_task_phase_no"
                  @on-sort="handleSort"
                />
                <FastFilteredIcon
                  ref="fast_filtered_icon_formal_phase_no"
                  @cancel="handleCancelFastFilter"
                />
              </template>
              <template
                v-if="scope.row.progress_no"
                slot-scope="scope"
              >
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
              width="100"
            >
              <template slot="header">
                <el-popover
                  ref="formalTaskPhasePopover"
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
                  >Phase</span>
                  <FastFilter
                    fast-filter-type="QuotePhase"
                    @fast-filter="handleFastFilter"
                  />
                </el-popover>
                <Sorter
                  ref="formal_task_phase"
                  sorter-type="formal_task_phase"
                  @on-sort="handleSort"
                />
                <FastFilteredIcon
                  ref="fast_filtered_icon_formal_phase"
                  @cancel="handleCancelFastFilter"
                />
              </template>
              <template
                v-if="scope.row.phase"
                slot-scope="scope"
              >
                <p
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
              <template slot="header">
                <el-popover
                  ref="formalTaskSolutionPopover"
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
                  >Solution</span>
                  <FastFilter
                    fast-filter-type="QuoteSolution"
                    @fast-filter="handleFastFilter"
                  />
                </el-popover>
                <Sorter
                  ref="formal_task_solution"
                  sorter-type="formal_task_solution"
                  @on-sort="handleSort"
                />
                <FastFilteredIcon
                  ref="fast_filtered_icon_formal_solution"
                  @cancel="handleCancelFastFilter"
                />
              </template>
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
              <template slot="header">
                <el-popover
                  ref="formalTaskTeamPopover"
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
                  >Team</span>
                  <FastFilter
                    fast-filter-type="QuoteTeam"
                    @fast-filter="handleFastFilter"
                  />
                </el-popover>
                <Sorter
                  ref="formal_task_team"
                  sorter-type="formal_task_team"
                  @on-sort="handleSort"
                />
                <FastFilteredIcon
                  ref="fast_filtered_icon_formal_team"
                  @cancel="handleCancelFastFilter"
                />
              </template>
              <template slot-scope="scope">
                <p v-if="scope.row.team_name">
                  {{ scope.row.team_name }}
                </p>
              </template>
            </el-table-column>

            <el-table-column
              label="Quote status"
              width="220"
            >
              <template slot="header">
                <el-popover
                  ref="formalTaskQuoteStatusPopover"
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
                  >Quote status</span>
                  <FastFilter
                    fast-filter-type="QuoteStatus"
                    @fast-filter="handleFastFilter"
                  />
                </el-popover>
                <Sorter
                  ref="formal_task_quote_status"
                  sorter-type="formal_task_quote_status"
                  @on-sort="handleSort"
                />
                <FastFilteredIcon
                  ref="fast_filtered_icon_formal_task_status"
                  @cancel="handleCancelFastFilter"
                />
              </template>
              <template
                v-if="scope.row.progress_status"
                slot-scope="scope"
              >
                <el-tooltip
                  :content="scope.row.progress_status_label"
                  placement="top"
                >
                  <QuoteStatusTag
                    :tag-text="scope.row.progress_status_label"
                    type="quote"
                  />
                </el-tooltip>
              </template>
            </el-table-column>

            <el-table-column
              label="Customer due date"
              width="180"
            >
              <template slot="header">
                <el-popover
                  ref="formalTaskCustomerDuedatePopover"
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
                  >Customer due date</span>
                  <FastFilter
                    fast-filter-type="QuoteCustomerDuedate"
                    @fast-filter="handleFastFilter"
                  />
                </el-popover>
                <Sorter
                  ref="formal_task_customer_due_date"
                  sorter-type="formal_task_customer_due_date"
                  @on-sort="handleSort"
                />
                <FastFilteredIcon
                  ref="fast_filtered_icon_formal_customer_due_date"
                  @cancel="handleCancelFastFilter"
                />
              </template>
              <template slot-scope="scope">
                <p v-if="scope.row.due_date">
                  {{ scope.row.due_date }}
                </p>
              </template>
            </el-table-column>

            <el-table-column
              label="Internal due date"
              width="160"
            >
              <template slot="header">
                <el-popover
                  ref="formalTaskInternalDuedatePopover"
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
                  >Internal due date</span>
                  <FastFilter
                    fast-filter-type="QuoteInternalDuedate"
                    @fast-filter="handleFastFilter"
                  />
                </el-popover>
                <Sorter
                  ref="formal_task_internal_due_date"
                  sorter-type="formal_task_internal_due_date"
                  @on-sort="handleSort"
                />
                <FastFilteredIcon
                  ref="fast_filtered_icon_formal_internal_due_date"
                  @cancel="handleCancelFastFilter"
                />
              </template>
              <template slot-scope="scope">
                <p v-if="scope.row.inner_date">
                  {{ scope.row.inner_date }}
                </p>
              </template>
            </el-table-column>

            <el-table-column
              label="Team due date"
              width="160"
            >
              <template slot="header">
                <el-popover
                  ref="formalTaskTeamDueDatePopover"
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
                  >Team due date</span>
                  <FastFilter
                    fast-filter-type="QuoteTeamDuedate"
                    @fast-filter="handleFastFilter"
                  />
                </el-popover>
                <Sorter
                  ref="formal_task_team_due_date"
                  sorter-type="formal_task_team_due_date"
                  @on-sort="handleSort"
                />
                <FastFilteredIcon
                  ref="fast_filtered_icon_formal_team_due_date"
                  @cancel="handleCancelFastFilter"
                />
              </template>
              <template slot-scope="scope">
                <p v-if="scope.row.team_due_date">
                  {{ scope.row.team_due_date }}
                </p>
              </template>
            </el-table-column>

            <el-table-column
              label="Creation date"
              width="160"
            >
              <template slot="header">
                <el-popover
                  ref="formalTaskCreationDatePopover"
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
                  >Creation date</span>
                  <FastFilter
                    fast-filter-type="QuoteCreationDate"
                    @fast-filter="handleFastFilter"
                  />
                </el-popover>
                <Sorter
                  ref="formal_task_creation_date"
                  sorter-type="formal_task_creation_date"
                  @on-sort="handleSort"
                />
                <FastFilteredIcon
                  ref="fast_filtered_icon_formal_creation_date"
                  @cancel="handleCancelFastFilter"
                />
              </template>
              <template slot-scope="scope">
                <p v-if="scope.row.created_at">
                  {{ formatCreationTime(scope.row.created_at) }}
                </p>
              </template>
            </el-table-column>

            <el-table-column
              label="Creator"
              width="100"
            >
              <template slot="header">
                <el-popover
                  ref="formalTaskCreatorPopover"
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
                    fast-filter-type="QuoteCreator"
                    @fast-filter="handleFastFilter"
                  />
                </el-popover>
                <Sorter
                  ref="formal_task_creator"
                  sorter-type="formal_task_creator"
                  @on-sort="handleSort"
                />
                <FastFilteredIcon
                  ref="fast_filtered_icon_formal_creator"
                  @cancel="handleCancelFastFilter"
                />
              </template>
              <template slot-scope="scope">
                <p v-if="scope.row.creation_name">
                  {{ scope.row.creation_name }}
                </p>
              </template>
            </el-table-column>

            <el-table-column
              v-if="currentStatus == 2"
              label="Completion time"
              min-width="180"
            >
              <template slot="header">
                <div style="display: flex; align-items: center">
                  <el-popover
                    ref="formalCompletionTimePopover"
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
                    >Completion time</span>
                    <FastFilter
                      fast-filter-type="DateRangeFastFilter"
                      filter-for="formal_completion_time"
                      @fast-filter="handleFastFilter"
                    />
                  </el-popover>
                  <Sorter
                    ref="formal_completion_time_sorter"
                    sorter-type="formal_completion_time_sorter"
                    sort-by="completed_at"
                    @on-sort="handleSort"
                  />
                  <FastFilteredIcon
                    ref="fast_filtered_icon_completion_time"
                    @cancel="handleCancelFastFilter"
                  />
                </div>
              </template>
              <template slot-scope="scope">
                <p v-if="scope.row.creation_name">
                  {{ scope.row.completed_at }}
                </p>
              </template>
            </el-table-column>

            <el-table-column
              v-if="currentStatus == 2"
              label="Completer"
              min-width="120"
            >
              <template slot="header">
                <div style="display: flex; align-items: center">
                  <el-popover
                    ref="formalCompleterPopover"
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
                    >Completer</span>
                    <FastFilter
                      fast-filter-type="Completer"
                      @fast-filter="handleFastFilter"
                    />
                  </el-popover>
                  <Sorter
                    ref="formal_completer_sorter"
                    sorter-type="formal_completer_sorter"
                    sort-by="completed_at"
                    @on-sort="handleSort"
                  />
                  <FastFilteredIcon
                    ref="fast_filtered_icon_completer"
                    @cancel="handleCancelFastFilter"
                  />
                </div>
              </template>
              <template slot-scope="scope">
                <p v-if="scope.row.creation_name">
                  {{ scope.row.completer }}
                </p>
              </template>
            </el-table-column>
          </el-table>
          <div
            v-show="infoDisplayType === 'Gantt'"
            class="content-right-table"
          >
            <Gantt
              :gantt-params="{
                mode: tabActive === 7 ? 3 : 2,
                group: false,
                start_date: ganttRange.start_date,
                end_date: ganttRange.end_date,
                data: tableData
              }"
            />
          </div>
          <div
            class="page-gatation"
            style="padding-bottom: 15px"
          >
            <NormalPagination
              :total-rows="totalRows"
              :current-page="pageInfo.currentPage"
              :page-size="pageInfo.pageSize"
              @page-change="handlePage"
              @page-size-change="handlePageSizeChange"
            />
          </div>
        </div>
        <!-- *****************************label********************************* -->
        <LabelTaskList
          v-if="
            tabTitle == 'Label' &&
              (currentTaskCategory < 3 || currentTaskCategory === 5)
          "
          ref="label_task_list"
          :current-status="currentStatus"
          :range="ganttRange"
          :mode="infoDisplayType"
          @on-get-table-data="assignTableData"
        />
        <!-- *****************************3D bidding********************************* -->
        <ThreeDBiddingTaskList
          v-if="
            tabTitle == '3D bidding' &&
              (currentTaskCategory < 3 || currentTaskCategory === 5)
          "
          ref="three_d_bidding_task_list"
          :current-status="currentStatus"
          :range="ganttRange"
          :mode="infoDisplayType"
          @on-get-table-data="assignTableData"
        />
        <!-- *****************************3D formal********************************* -->
        <ThreeDFormalTaskList
          v-if="
            tabTitle == '3D formal' &&
              (currentTaskCategory < 3 || currentTaskCategory === 5)
          "
          ref="three_d_formal_task_list"
          :current-status="currentStatus"
          :range="ganttRange"
          :mode="infoDisplayType"
          @on-get-table-data="assignTableData"
        />
        <!-- *****************************Simulation********************************* -->
        <SimulationTaskList
          v-if="
            tabTitle == 'Simulation' &&
              (currentTaskCategory < 3 || currentTaskCategory === 5)
          "
          ref="simulation_task_list"
          :current-status="currentStatus"
          :range="ganttRange"
          :mode="infoDisplayType"
          @on-get-table-data="assignTableData"
        />
        <!-- *****************************Others********************************* -->
        <custom-task
          v-if="
            currentWorkItemType === 'Created by me' ||
              currentWorkItemType === 'Related to me' ||
              (tabTitle === 'Others' &&
                (currentWorkItemType === 'Pending for me' ||
                  currentWorkItemType === 'Handled by me' ||
                  currentWorkItemType === 'Public tasks'))
          "
          ref="custom-task"
          :table-data="taskData"
          :total="totalRows"
          :current-task-category="currentTaskCategory"
          :range="ganttRange"
          :mode="infoDisplayType"
          @page-change="handleCustomTaskPage"
          @refresh="refreshAll"
          @on-get-table-data="assignTableData"
        />

        <!-- 自定义任务弹窗 -->
        <el-dialog
          v-if="createTaskVisible"
          title="New task"
          :visible.sync="createTaskVisible"
          width="1280px"
          :close-on-click-modal="false"
          :destroy-on-close="true"
          class="task-dialog"
          @close="closeNewTaskDialog"
        >
          <task-form
            ref="createForm"
            type="create"
            :task-data="storeFormData"
            @open-tab-setting="openTabSetting"
            @close="closeNewTaskDialog"
            @open-task-drawer="openDetailDrawer"
            @refresh="refreshAll"
          />
        </el-dialog>

        <!-- tab管理 -->
        <el-dialog
          v-if="tagSettingVisible"
          title="Tag setting"
          :visible.sync="tagSettingVisible"
          width="1080px"
          :close-on-click-modal="false"
          :destroy-on-close="true"
          @close="openTaskFormDialog"
        >
          <tag-setting />
        </el-dialog>

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
            @refresh-list="refreshAll"
          />
        </el-drawer>
      </div>
    </div>
  </div>
</template>

<script>
import FastFilteredIcon from '@/views/project/components/FastFilteredIcon.vue';
import {
  SORTER_REFS_LIST,
  FAST_FILTER_ICON_REFS,
  FAST_FILTER_REFS
} from '@/utils/constants.js';
import Sorter from '@/views/project/components/Sorter.vue';
import TogglableSearchBar from '@/components/common/TogglableSearchBar.vue';
import DueDateTag from './components/DueDateTag.vue';
import QuoteStatusTag from './components/QuoteStatusTag.vue';
import FilterIcon from '@/components/filters/FilterIcon.vue';
import NormalPagination from '@/components/NormalPagination.vue';
import LabelTaskList from './LabelTaskList.vue';
import ThreeDBiddingTaskList from './ThreeDBiddingTaskList.vue';
import ThreeDFormalTaskList from './ThreeDFormalTaskList.vue';
import SimulationTaskList from './SimulationTaskList.vue';
import Gantt from '@/components/gantt/index.vue';
import {
  taskList,
  getCustomTaskDetail,
  getCustomTaskList,
  getTaskTotal,
  getTaskCount,
  userList,
  getCustomTaskTagList
} from '@/api/index';

// import TableFilter from '@/components/TableFilter.vue';
import TableFilterV2 from '@/components/filters/TableFilterV2.vue';
import { formatTime } from '@/utils/format-time.js';
import dayjs from 'dayjs';
import FastFilter from '@/views/project/components/FastFilter.vue';
import CustomTask from './components/all-custom-task.vue';
import TaskForm from './components/task-form.vue';
import TagSetting from './components/tag-setting.vue';
import TaskDetail from './components/task-detail.vue';

export default {
  components: {
    TogglableSearchBar,
    TableFilterV2,
    DueDateTag,
    LabelTaskList,
    ThreeDBiddingTaskList,
    ThreeDFormalTaskList,
    SimulationTaskList,
    QuoteStatusTag,
    FilterIcon,
    NormalPagination,
    FastFilter,
    Sorter,
    FastFilteredIcon,
    CustomTask,
    TaskForm,
    TagSetting,
    TaskDetail,
    Gantt
  },
  //如果keepAlive 为true，则重新获取一下列表数据
//  beforeRouteUpdate(to, from, next) {
//   if(['overview', 'workflow'].includes(to.name)) { 
//     next()
//   }
//   else {
//     next((vm) => {
//       vm.getTaskList()
//     })
//   }
//  },
  data() {
    return {
      currentStatus: 1,
      filterName: 'QuoteTaskFilter',
      fastFilteredContent: '',
      currentParams: {},
      totalRows: 0,
      filterNum: 0,
      showFilter: false,
      fetchTaskListParams: {
        page: 1,
        limit: 20
      },
      currentType: 1,
      userInfo: {},
      tagType: 'quote',
      hasBasicTaskTab: false,
      has2DTaskTab: false,
      has3DTaskTab: false,
      tabTitle: 'Bidding',
      workItemTabs: [],
      userOptions:[],
      totalTaskNumber: 0,
      filterFor: 'work-item-quote',
      workItemTypes: [
        {
          id: 1,
          title: 'Pending for me',
          number: 0
        },
        {
          id: 2,
          title: 'Handled by me',
          number: 0
        },
        {
          id: 3,
          title: 'Created by me',
          number: 0
        },
        {
          id: 4,
          title: 'Related to me',
          number: 0
        },
        {
          id: 5,
          title: 'Public tasks',
          number: 0
        }
      ],
      currentWorkItemType: 'Pending for me',
      showSearch: false,
      tabActive: 1,
      infoDisplayType: 'List',
      fastFilteredIconName: '',
      tableData: [],
      pageInfo: {
        pageSize: 20,
        currentPage: 1,
        total: 0
      },
      createTaskVisible: false,
      tagSettingVisible: false,
      taskDetailVisible: false,
      taskDetailData: {},
      currentTaskCategory: 1,
      storeFormData: {},
      taskData: [],
      taskNumber: {},
      isClose: false,
      ganttRange: {
        start_date: '',
        end_date: ''
      }
    };
  },
  computed: {
    titleWidth() {
      switch (this.currentWorkItemType) {
        case 'Pending for me':
          return '360';
        case 'Handled by me':
          return '200';
        case 'Public tasks':
          return '400';
        default:
          return '360';
      }
    }
  },
  watch: {
    '$route.query': {
      handler(newQuery) {
        // 监听查询参数变化
        const hasQuery = Object.keys(newQuery).length > 0;

        if (hasQuery && this.$route.query.id) {
          // 自定义任务详情跳转
          this.getCustomTaskDetail(this.$route.query.id); 
          this.taskDetailVisible = true;
          this.changeWorkItemType({
            id: 1,
            title: 'Pending for me',
            number: 0
          });
        }
      },
      deep: true,
      immediate: true
    }
  },
  async mounted() {
    this.getUserOptions();
    this.getCustomTaskTagList();
    let limits = JSON.parse(localStorage.getItem('limits'));
    if (limits.Nav_List.show_basic_task_tab) {
      this.hasBasicTaskTab = true;
    }
    if (limits.Nav_List.show_3d_task_tab) {
      this.has3DTaskTab = true;
    }
    if (limits.Nav_List.show_2d_task_tab) {
      this.has2DTaskTab = true;
    }
    await this.getWorkItemTabs();
    // this.getCustomTaskList();
    // this.resetFetchTaskListParams();
    if (this.tabActive !== 7) {
      this.fetchTaskListParams.type = 1;
    }
    if (
      this.$route.query.workType &&
      this.$route.query.workType === 'handled'
    ) {
      this.changeWorkItemType({
        id: 2,
        title: 'Handled by me',
        number: 0
      });
    } else {
      this.changeWorkItemType({
        id: 1,
        title: 'Pending for me',
        number: 0
      });
    }
    this.handleChooseTab(this.workItemTabs[0]);
    await this.getTaskTotal();
    this.getTaskList();
  },
  methods: {
    assignTableData(tableData) {
      this.tableData = tableData;
    },
    async getTaskTotal() {
      await getTaskTotal().then((res) => {
        if (res.code === 200) {
          this.taskTotal = res.data;
          this.workItemTypes[0].number = res.data.pending_total;
          this.workItemTypes[1].number = res.data.handled_total;
          this.workItemTypes[2].number = res.data.created_total;
          this.workItemTypes[3].number = res.data.related_total;
          this.workItemTypes[4].number = res.data.public_total;
        }
      });
    },
    async getTaskCount(type) {
      let params = {
        task_type: type
      };
      await getTaskCount(params).then((res) => {
        if (res.code === 200) {
          this.taskNumber = res.data;
        }
      });
    },
    getWorkItemTabs() {
      let tabs = [
        {
          id: 1,
          title: 'Bidding',
          number: 0
        },
        {
          id: 2,
          title: 'Formal',
          number: 0
        },
        {
          id: 7,
          title: 'Others',
          number: 0
        }
      ];
      //可以看见label任务的情况，2d的某些人员
      if (this.has2DTaskTab) {
        tabs = [
          {
            id: 1,
            title: 'Bidding',
            number: 0
          },
          {
            id: 2,
            title: 'Formal',
            number: 0
          },
          {
            id: 3,
            title: 'Label',
            number: 0
          },
          {
            id: 7,
            title: 'Others',
            number: 0
          }
        ];
      }
      if (this.has3DTaskTab) {
        tabs = [
          {
            id: 4,
            title: '3D bidding',
            number: 0
          },
          {
            id: 5,
            title: '3D formal',
            number: 0
          },
          {
            id: 6,
            title: 'Simulation',
            number: 0
          },
          {
            id: 7,
            title: 'Others',
            number: 0
          }
        ];
      }
      if (this.hasBasicTaskTab && !this.has2DTaskTab) {
        tabs = [
          {
            id: 1,
            title: 'Bidding',
            number: 0
          },
          {
            id: 2,
            title: 'Formal',
            number: 0
          },
          {
            id: 7,
            title: 'Others',
            number: 0
          }
        ];
      }
      if (this.has2DTaskTab && this.has3DTaskTab) {
        tabs = [
          {
            id: 1,
            title: 'Bidding',
            number: 0
          },
          {
            id: 4,
            title: '3D bidding',
            number: 0
          },
          {
            id: 2,
            title: 'Formal',
            number: 0
          },
          {
            id: 5,
            title: '3D formal',
            number: 0
          },
          {
            id: 3,
            title: 'Label',
            number: 0
          },
          {
            id: 6,
            title: 'Simulation',
            number: 0
          },
          {
            id: 7,
            title: 'Others',
            number: 0
          }
        ];
      }
      this.workItemTabs = tabs;
    },
    handleCancelFastFilter(tag) {
      if (this.$refs[this.fastFilteredIconName]) {
        this.$refs[this.fastFilteredIconName].hide();
      }
      this.pageInfo.currentPage = 1;
      this.currentParams = {};
      this.resetFetchTaskListParams();
      if (this.tabActive !== 7) {
        this.fetchTaskListParams.type = this.currentType;
        this.fetchTaskListParams.status = this.currentStatus;
      }
      if (tag !== 'after-work') {
        this.getTaskList();
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
    handleFastFilter(val, filterType, filterFor) {
      let finalVal = '';
      if (this.$refs.tableFilter) {
        // this.$refs.tableFilter.resetFilterForm();
        this.showFilter = false;
        this.filterNum = 0;
      }
      let formData = {
        title: '',
        project: '',
        project_no: '',
        project_name: '',
        progress_no: '',
        progress: '',
        progress_status: '',
        team_id: '',
        receiver:'',
        due_date_start: '',
        due_date_end: '',
        inner_date_start: '',
        inner_date_end: '',
        team_due_date_start: '',
        team_due_date_end: '',
        creation_date_start: '',
        creation_date_end: '',
        solution: '',
        completer: '',
        completed_date_start: '',
        completed_date_end: ''
      };
      let due_date_start = '';
      let due_date_end = '';
      let inner_date_start = '';
      let inner_date_end = '';
      let team_due_date_start = '';
      let team_due_date_end = '';
      let creation_date_start = '';
      let creation_date_end = '';
      let completed_date_start = '';
      let completed_date_end = '';

      if (Array.isArray(val)) {
        [due_date_start, due_date_end] = val;
        [inner_date_start, inner_date_end] = val;
        [team_due_date_start, team_due_date_end] = val;
        [creation_date_start, creation_date_end] = val;
        [completed_date_start, completed_date_end] = val;
      }
      //对due_date_start和due_date_end进行解构赋值
      switch (filterType) {
        case 'LabelSolution':
          formData.solution = val;
          this.fastFilteredIconName = 'fast_filtered_icon_label_solution';
          break;
        case 'QuoteTitle':
          formData.title = val;
          this.fastFilteredIconName = 'fast_filtered_icon_quote_title';
          break;
        case 'QuoteProjectName':
          formData.project_name = val;
          this.fastFilteredIconName = 'fast_filtered_icon_quote_project_name';
          break;
        case 'QuoteProjectNo':
          formData.project_no = val;
          this.fastFilteredIconName = 'fast_filtered_icon_quote_project_no';
          break;
        case 'QuotePhaseNo':
          formData.progress_no = val;
          this.fastFilteredIconName = 'fast_filtered_icon_quote_phase_no';
          break;
        case 'QuotePhase':
          formData.phase = val.value;
          finalVal = val.name;
          this.fastFilteredIconName = 'fast_filtered_icon_quote_phase';
          break;
        case 'QuoteSolution':
          formData.solution = val;
          this.fastFilteredIconName = 'fast_filtered_icon_quote_solution';
          break;
        case 'QuoteTeam':
          formData.team_id = val.id;
          finalVal = val.name;
          this.fastFilteredIconName = 'fast_filtered_icon_quote_team';
          break;
        case 'QuoteTaskStatus':
          formData.progress_status = val.value;
          finalVal = val.label;
          this.fastFilteredIconName = 'fast_filtered_icon_quote_task_status';
          break;
        case 'QuoteCustomerDuedate':
          formData.due_date_start = due_date_start;
          formData.due_date_end = due_date_end;
          finalVal = `${val[0]} ` + 'to' + ` ${val[1]}`;
          this.fastFilteredIconName =
            'fast_filtered_icon_quote_customer_due_date';
          break;
        case 'QuoteInternalDuedate':
          formData.inner_date_start = inner_date_start;
          formData.inner_date_end = inner_date_end;
          finalVal = `${val[0]} ` + 'to' + ` ${val[1]}`;
          this.fastFilteredIconName =
            'fast_filtered_icon_quote_internal_due_date';
          break;
        case 'QuoteTeamDuedate':
          formData.team_due_date_start = team_due_date_start;
          formData.team_due_date_end = team_due_date_end;
          finalVal = `${val[0]} ` + 'to' + ` ${val[1]}`;
          this.fastFilteredIconName = 'fast_filtered_icon_quote_team_due_date';
          break;
        case 'QuoteCreationDate':
          formData.creation_date_start = creation_date_start;
          formData.creation_date_end = creation_date_end;
          finalVal = `${val[0]} ` + 'to' + ` ${val[1]}`;
          this.fastFilteredIconName = 'fast_filtered_icon_quote_creation_date';
          break;

        case 'QuoteCreator':
          formData.creator = val.id;
          finalVal = val.name;
          this.fastFilteredIconName = 'fast_filtered_icon_quote_creator';
          break;

        case 'LabelStatus':
          formData.progress_status = val.value;
          finalVal = val.name;
          this.fastFilteredIconName = 'fast_filtered_icon_quote_status';
          break;

        case 'CompletionTime':
          formData.completed_date_start = completed_date_start;
          formData.completed_date_end = completed_date_end;
          this.fastFilteredIconName = 'fast_filtered_icon_completion_time';
          break;

        case 'Completer':
          formData.completer = val.id;
          finalVal = val.name;
          this.fastFilteredIconName = 'fast_filtered_icon_completer';
          break;

        case 'FormalTitle':
          formData.title = val;
          this.fastFilteredIconName = 'fast_filtered_icon_formal_title';
          break;
        case 'FormalProjectName':
          formData.project_name = val;
          this.fastFilteredIconName = 'fast_filtered_icon_formal_project_name';
          break;
        case 'FormalProjectNo':
          formData.project_no = val;
          this.fastFilteredIconName = 'fast_filtered_icon_formal_project_no';
          break;
        case 'FormalPhaseNo':
          formData.progress_no = val.id;
          finalVal = val.name;
          this.fastFilteredIconName = 'fast_filtered_icon_formal_phase_no';
          break;
        case 'FormalPhase':
          formData.phase = val.id;
          finalVal = val.name;
          this.fastFilteredIconName = 'fast_filtered_icon_formal_phase';
          break;
        case 'FormalSolution':
          formData.solution = val;
          this.fastFilteredIconName = 'fast_filtered_icon_formal_solution';
          break;
        case 'FormalTeam':
          formData.team_id = val.id;
          finalVal = val.name;
          this.fastFilteredIconName = 'fast_filtered_icon_formal_team';
          break;
        case 'FormalTaskStatus':
          formData.progress_status = val;
          this.fastFilteredIconName = 'fast_filtered_icon_formal_task_status';
          break;
        case 'FormalCustomerDuedate':
          formData.due_date_start = due_date_start;
          formData.due_date_end = due_date_end;
          finalVal = `${due_date_start} ` + 'to' + ` ${due_date_end}`;
          this.fastFilteredIconName =
            'fast_filtered_icon_formal_customer_due_date';
          break;
        case 'FormalInternalDuedate':
          formData.inner_date_start = inner_date_start;
          formData.inner_date_end = inner_date_end;
          finalVal = `${inner_date_start} ` + 'to' + ` ${inner_date_end}`;
          this.fastFilteredIconName =
            'fast_filtered_icon_formal_internal_due_date';
          break;
        case 'FormalTeamDuedate':
          formData.team_due_date_start = team_due_date_start;
          formData.team_due_date_end = team_due_date_end;
          finalVal = `${team_due_date_start} ` + 'to' + ` ${team_due_date_end}`;
          this.fastFilteredIconName = 'fast_filtered_icon_formal_team_due_date';
          break;
        case 'FormalCreationDate':
          formData.creation_date_start = creation_date_start;
          formData.creation_date_end = creation_date_end;
          finalVal = `${creation_date_start} ` + 'to' + ` ${creation_date_end}`;
          this.fastFilteredIconName = 'fast_filtered_icon_formal_creation_date';
          break;
        case 'FormalCreator':
          formData.creator = val.id;
          finalVal = val.name;
          this.fastFilteredIconName = 'fast_filtered_icon_formal_creator';
          break;

        case 'LabelDuedate':
          formData.due_date_start = due_date_start;
          formData.due_date_end = due_date_end;
          this.fastFilteredIconName = 'fast_filtered_icon_label_due_date';
          break;

        case 'LabelTaskTitle':
          formData.title = val;
          this.fastFilteredIconName = 'fast_filtered_icon_label_title';
          break;

        case 'LabelTaskProjectName':
          formData.project_name = val;
          this.fastFilteredIconName = 'fast_filtered_icon_label_project_name';
          break;

        case 'LabelTaskProjectNo':
          formData.project_no = val;
          this.fastFilteredIconName = 'fast_filtered_icon_label_project_no';
          break;

        case 'LabelTaskTeam':
          formData.team_id = val.id;
          finalVal = val.name;
          this.fastFilteredIconName = 'fast_filtered_icon_label_team';
          break;

        default:
          break;
      }
      switch (filterFor) {
        case 'formal_completion_time':
          formData.completed_date_start = completed_date_start;
          formData.completed_date_end = completed_date_end;
          this.fastFilteredIconName = 'fast_filtered_icon_completion_time';
          break;
        case 'bidding_completion_time':
          formData.completed_date_start = completed_date_start;
          formData.completed_date_end = completed_date_end;
          this.fastFilteredIconName = 'fast_filtered_icon_completion_time';
          break;
        case 'assign_to': 
           formData.receiver = val.value; 
           finalVal = val.label;
           this.fastFilteredIconName = 'fast_filtered_icon_assign_to'; 
           break;
        default:
          break;
      }
      this.currentParams = { ...formData }; 
      if (this.tabActive !== 7) {
        this.fetchTaskListParams = {
          page: 1,
          limit: this.pageInfo.pageSize,
          type: this.currentType,
          status: this.currentStatus,
          ...this.currentParams
        }; 
      this.getTaskList();
      } else { 
        this.fetchTaskListParams = {
          page: 1,
          limit: this.pageInfo.pageSize,
          ...this.currentParams
        };
      this.getTaskList();
      }
      // this.getTaskList();
      this.fastFilteredContent = finalVal ? finalVal : val;
      this.showFastFilterIcon();
    },
    showFastFilterIcon() {
      FAST_FILTER_ICON_REFS.forEach((item) => {
        if (item === this.fastFilteredIconName) {
          this.$nextTick(() => {
            if (this.$refs[item]) {
              this.$refs[item].show();
              this.$refs[item].applyContent(this.fastFilteredContent);
            }
          });
        }
        if (item !== this.fastFilteredIconName) {
          if (this.$refs[item]) {
            this.$refs[item].hide();
          }
        }
      });
    },
    clearOtherSorterStyle(currentSorterType) {
      SORTER_REFS_LIST.forEach((item) => {
        if (this.$refs[item] && item !== currentSorterType) {
          this.$refs[item].reset();
        }
      });
    },
    clearAllSorterStyle() {
      SORTER_REFS_LIST.forEach((item) => {
        if (this.$refs[item]) {
          this.$refs[item].reset();
        }
      });
    },
    handleSort(order, sorterType, sortBy) {
      this.currentParams.orderBy = sortBy;
      this.currentParams.orderBy = order ? sortBy : '';
      this.fetchTaskListParams.orderBy = this.currentParams.orderBy;
      this.fetchTaskListParams.order = order;
      this.clearOtherSorterStyle(sorterType);
      this.getTaskList();
    },
    handlePageSizeChange(size) {
      this.pageInfo.pageSize = Number(size);
      this.pageInfo.currentPage = 1;
      this.fetchTaskListParams.page = 1;
      this.fetchTaskListParams.limit = size;
      this.getTaskList();
    },
    resetFilter() {
      this.filterNum = 0;
      this.showFilter = false;
    },
    changeWorkItemType(option) {
      this.currentTaskCategory = option.id;
      this.pageInfo.currentPage = 1;
      this.fetchTaskListParams.page = 1;
      this.resetFilter();
      // this.currentTaskCategory = option.id
      this.currentWorkItemType = option.title;
      // this.tabTitle = option.title;
      if (option.id < 3 || option.id === 5) {
        this.currentStatus = option.id;
        this.fetchTaskListParams.status =
          this.currentStatus === 5 ? 1 : this.currentStatus;
        this.fetchTaskListParams.type = 1;
        if (
          this.currentWorkItemType === 'Pending for me' ||
          this.currentWorkItemType === 'Handled by me' ||
          this.currentWorkItemType === 'Public tasks'
        ) {
          this.handleChooseTab(this.workItemTabs[0]);
          this.getTaskCount(this.currentStatus);
        }
      } else {
        delete this.fetchTaskListParams.type;
        delete this.fetchTaskListParams.status;
        this.filterName = 'CustomTaskFilter';
        this.$refs.tableFilter.resetFilterForm();
      }
      // this.$refs.tableFilter.resetFilterForm();
      // this.$refs.tableFilter.clearFilterNum();
      // this.resetFetchTaskListParams();
      this.getTaskList();
      this.$router.push({ query: {} });
    },
    toggleFilterDisplay() {
      this.showFilter = !this.showFilter;
    },
    formatCreationTime(date) {
      return dayjs(date).format('YYYY-MM-DD HH:mm:ss');
    },
    formatTime(date, type) {
      return formatTime(date, type);
    },
    resetFetchTaskListParams() {
      this.fetchTaskListParams = {};
      if (this.tabActive !== 7) {
        // this.fetchTaskListParams.receiver = this.userInfo.id || '';
        this.fetchTaskListParams.status = 1;
        this.fetchTaskListParams.type = 1;
      }

      this.fetchTaskListParams.page = 1;
      this.fetchTaskListParams.limit = 20;
    },
    toggleShowSearch() {
      this.showSearch = !this.showSearch;
    },
    handleChooseTab(tab) {
      if (tab.id !== this.tabActive) {
        this.showFilter = false;
        this.filterNum = 0;
      }
      this.totalTaskNumber = 0;
      this.tabTitle = tab.title;
      this.tabActive = tab.id;
      if (this.tabActive === 1) {
        // this.resetFetchTaskListParams();
        this.filterName = 'QuoteTaskFilter';
        this.fetchTaskListParams.type = 1;
        this.currentType = 1;
        this.filterFor = 'work-item-quote';
        this.tagType = 'quote';
      } else if (this.tabActive === 2) {
        // this.resetFetchTaskListParams();
        this.filterName = 'FormalTaskFilter';
        this.fetchTaskListParams.type = 2;
        this.currentType = 2;
        this.filterFor = 'work-item-project';
        this.tagType = 'formal';
      } else if (this.tabActive === 3) {
        // this.resetFetchTaskListParams();
        this.filterName = 'LabelTaskFilter';
        this.fetchTaskListParams.type = 3;
        this.currentType = 3;
        this.filterFor = 'work-item-label';
        this.tagType = 'label';
      } else if (this.tabActive === 4) {
        // this.resetFetchTaskListParams();
        this.filterName = 'ThreeDBiddingTaskFilter';
        this.fetchTaskListParams.type = 4;
        this.currentType = 4;
        this.filterFor = 'work-item-3d-bidding';
        this.tagType = 'bidding';
      } else if (this.tabActive === 5) {
        // this.resetFetchTaskListParams();
        this.filterName = 'ThreeDFormalTaskFilter';
        this.fetchTaskListParams.type = 5;
        this.currentType = 5;
        this.filterFor = 'work-item-3d-formal';
        this.tagType = 'formal';
      } else if (this.tabActive === 6) {
        // this.resetFetchTaskListParams();
        this.filterName = 'SimulationTaskFilter';
        this.fetchTaskListParams.type = 6;
        this.currentType = 6;
        this.filterFor = 'work-item-simulation';
        this.tagType = 'simulation';
      } else if (this.tabActive === 7) {
        this.filterFor = 'CustomTaskFilter';
        this.$refs.tableFilter.resetFilterForm();
        this.fetchTaskListParams = {};
        this.filterName = 'CustomTaskFilter';
        this.currentType = 7;
        this.fetchTaskListParams.type = '';
        this.fetchTaskListParams.status = this.currentStatus;
        this.tagType = 'Others';
      }

      this.handleCancelFastFilter('after-work');
      this.clearAllSorterStyle();
      this.resetFetchTaskListParams();
      if (this.tabActive !== 7) {
        this.fetchTaskListParams.type = this.currentType;
        this.fetchTaskListParams.status =
          this.currentStatus === 5 ? 1 : this.currentStatus;
        this.fetchTaskListParams.is_public = this.currentStatus === 5 ? 1 : 0;
      }
      if (
        this.tabActive !== 3 &&
        this.tabActive !== 4 &&
        this.tabActive !== 5 &&
        this.tabActive !== 6
      ) {
        this.getTaskList();
      }
    },
    handlePage(val) {
      this.pageInfo.currentPage = val;
      this.totalTaskNumber = 0;
      this.getTaskList();
    },
    async getCustomTaskTagList() {
      await getCustomTaskTagList().then((res) => {
        if (res.code === 200) {
          let tags = res.data.tagList.map((item) => {
            return {
              value: item.id,
              label: item.tag_name
            };
          });
          this.$store.commit('app/setTags', tags);
        }
      });
    },
    async getCustomTaskList() {
      let params = {
        task_category: this.currentTaskCategory,
        ...this.fetchTaskListParams
      };
      await getCustomTaskList(params).then((res) => {
        if (res.code === 200) {
          this.taskData = res.data.task_list;
          this.assignTableData(this.taskData);
          this.totalRows = res.data.count;
        }
      });
    },
    getTaskList() {
      this.fetchTaskListParams.limit = this.pageInfo.pageSize;
      this.fetchTaskListParams.page = this.pageInfo.currentPage;
      if (
        (this.currentTaskCategory < 3 || this.currentTaskCategory === 5) &&
        this.tabTitle !== 'Others'
      ) {
        //如果选择了public task, 把is_public变成1，把status变成1，点击的时候会置为5，但是这个传参也应该是1
        this.fetchTaskListParams.is_public =
          this.currentTaskCategory === 5 ? 1 : 0;
        this.fetchTaskListParams.status =
          this.currentTaskCategory === 5 ? 1 : this.currentTaskCategory;
        if(this.currentTaskCategory !== 5) {this.fetchTaskListParams.receiver = ''}
        taskList({ ...this.fetchTaskListParams }).then((res) => {
          this.ganttRange = {
            start_date: res.data.total_start_date,
            end_date: res.data.total_end_date
          };
          this.tableData = res.data.data;
          this.totalRows = res.data.total;
          this.tableData.forEach((item) => {
            if (item.project) {
              item.project.solution = item.project.solution
                ? item.project.solution
                : null;
            }
          });
        });
      } else {
        this.getCustomTaskList();
      }
      // v0.7.0版本将3D人员加入，tab数量产生变化，需要重新获和计算取任务数
      //如果不存在3Dtask,只计算2D相关的
      setTimeout(() => {
        if (!this.has3DTaskTab && this.has2DTaskTab) {
          this.calc2DTaskNumbers();
        }
        //如果有3D的task没有2D的task, 就计算3D相关的
        if (this.has3DTaskTab && !this.has2DTaskTab) {
          this.calc3DTaskNumbers();
        }
        //如果有3D的task和2D的task, 就计算3D和2D相关的，该类型只在US Engineer的情况下出现
        if (this.has3DTaskTab && this.has2DTaskTab) {
          this.calcUSTaskNumbers();
        }
        if (!this.has3DTaskTab && !this.has2DTaskTab) {
          this.calcNumbers();
        }
      }, 500);
    },
    calcNumbers() {
      let numbersData = this.taskNumber;
      this.workItemTabs[0].number = numbersData.quote;
      if (this.workItemTabs[1]) {
        this.workItemTabs[1].number = numbersData.formal;
      }
      this.workItemTabs[2].number = numbersData.others;
    },
    calc2DTaskNumbers() {
      let numbersData = this.taskNumber;

      // 2d有3个可见模块
      this.workItemTabs[0].number = numbersData.quote;
      if (this.workItemTabs[1]) {
        this.workItemTabs[1].number = numbersData.formal;
      }
      if (this.workItemTabs[2]) {
        this.workItemTabs[2].number = numbersData.label;
      }
      this.workItemTabs[3].number = numbersData.others;
    },
    calc3DTaskNumbers() {
      let numbersData = this.taskNumber;

      // 3d有3个可见模块
      this.workItemTabs[0].number = numbersData['3d_bidding'];
      this.workItemTabs[1].number = numbersData['3d_formal'];
      this.workItemTabs[2].number = numbersData.simulation;
      this.workItemTabs[3].number = numbersData.others;
    },
    calcUSTaskNumbers() {
      let numbersData = this.taskNumber;
      //US engineer 有6个可见模块
      this.workItemTabs[0].number = numbersData.quote;
      if (this.workItemTabs[1]) {
        this.workItemTabs[1].number = numbersData['3d_bidding'];
      }
      if (this.workItemTabs[2]) {
        this.workItemTabs[2].number = numbersData.formal;
      }
      if (this.workItemTabs[3]) {
        this.workItemTabs[3].number = numbersData['3d_formal'];
      }
      if (this.workItemTabs[4]) {
        this.workItemTabs[4].number = numbersData.label;
      }
      if (this.workItemTabs[5]) {
        this.workItemTabs[5].number = numbersData['simulation'];
      }
      this.workItemTabs[6].number = numbersData.others;
    },
    handleOnFilter(formData, filterNum) {
      this.filterNum = filterNum;
      if (this.fastFilteredIconName) {
        if (this.$refs[this.fastFilteredIconName]) {
          this.$refs[this.fastFilteredIconName].hide();
        }
      }
      this.fetchTaskListParams = { ...formData };
      if (this.tabTitle !== 'Others' && this.currentTaskCategory < 3 || this.currentTaskCategory === 5) {
        // this.fetchTaskListParams.receiver = this.userInfo.id || '';
        if(this.currentTaskCategory) {this.fetchTaskListParams.receiver = formData.receiver;}
        this.fetchTaskListParams.type = this.currentType;
        this.fetchTaskListParams.status = this.currentStatus;
      }
      this.fetchTaskListParams.page = 1;
      this.pageInfo.currentPage = 1;
      //对于通过组件引入的Lists
      if (this.tabTitle && this.currentTaskCategory < 3 || this.currentTaskCategory === 5) {
        switch (this.tabTitle) {
          case 'Label':
            this.$refs['label_task_list'].handleOnFilter(
              formData,
              this.filterNum
            );
            break;
          case '3D bidding':
            this.$refs['three_d_bidding_task_list'].handleOnFilter(
              formData,
              this.filterNum
            );
            break;
          case '3D formal':
            this.$refs['three_d_formal_task_list'].handleOnFilter(
              formData,
              this.filterNum
            );
            break;
          case 'Simulation':
            this.$refs['simulation_task_list'].handleOnFilter(
              formData,
              this.filterNum
            );
            break;
          case 'Others':
            this.$refs['custom-task'].handleOnFilter(formData, this.filterNum);
            this.getTaskList();
            break;
          default:
            // this.$refs['custom-task'].handleOnFilter(formData, this.filterNum);
            this.getTaskList();
            break;
        }
      } else {
        this.$refs['custom-task'].handleOnFilter(formData, this.filterNum);
        this.getTaskList();
      }
    },
    handleOnSearch(val) {
      this.fetchTaskListParams.title = val;
      this.totalTaskNumber = 0;
      this.getTaskList();
    },

    goToProject(type, row) {
      this.$router.push({
        path:
          type === 'formal'
            ? `/index/project/formal/detail/overview/${row.project_id}`
            : `/index/project/bidding/detail/overview/${row.project_id}`
        // query: {
        //   projectId: row.project_id || ''
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
      if (JSON.parse(solution)) {
        return JSON.parse(solution).join('&');
      } else {
        return '';
      }
    },
    handleCustomTaskPage(page, params) {
      this.pageInfo.currentPage = page.currentPage;
      this.pageInfo.pageSize = page.pageSize;
      this.fetchTaskListParams = { ...params };
      this.getTaskList();
    },
    showCreateTaskDialog() {
      this.createTaskVisible = true;
    },
    openTabSetting() {
      this.createTaskVisible = false;
      this.tagSettingVisible = true;
    },
    openTaskFormDialog() {
      this.storeFormData = this.$store.state.app.customTaskInfo;
      this.createTaskVisible = true;
      this.tagSettingVisible = false;
    },
    closeNewTaskDialog() {
      this.createTaskVisible = false;
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
    openDetailDrawer(id = null) {
      this.closeNewTaskDialog();
      setTimeout(() => {
        this.taskDetailVisible = true;
        this.getCustomTaskDetail(id);
      }, 500);
    },
    closeTaskDetailDrawer() {
      this.taskDetailVisible = false;
      this.isClose = false;
    },
    showTaskDetailDrawer() {
      this.taskDetailVisible = true;
    },
    async refreshAll() {
      this.getTaskList();
      await this.getTaskTotal();
      this.getTaskCount(this.currentStatus);
      setTimeout(() => {
        if (!this.has3DTaskTab && this.has2DTaskTab) {
          this.calc2DTaskNumbers();
        }
        //如果有3D的task没有2D的task, 就计算3D相关的
        if (this.has3DTaskTab && !this.has2DTaskTab) {
          this.calc3DTaskNumbers();
        }
        //如果有3D的task和2D的task, 就计算3D和2D相关的，该类型只在US Engineer的情况下出现
        if (this.has3DTaskTab && this.has2DTaskTab) {
          this.calcUSTaskNumbers();
        }
      }, 500);
    },
    async getUserOptions() {
      userList().then((res) => {
        let userOptions = res.data.data.map((item) => {
          return {
            value: item.id,
            label: item.name
          };
        });
        this.userOptions = userOptions;
        this.$store.commit('app/setUsers', userOptions);
      });
    }
  }
};
</script>

<style>
/* stylelint-disable-next-line selector-class-pattern */
.content-right-table .el-table--border .el-table__cell {
  border-right: none !important;
}

/* stylelint-disable-next-line selector-class-pattern */
.content-right-table .el-table th.el-table__cell {
  background-color: #f5f7fa !important;
}

/* stylelint-disable-next-line selector-class-pattern */
.content-right-operations .el-input__prefix {
  height: 100%;
  left: 5px;
  transition: all 0.3s;
  display: flex;
  align-items: center;
}

/* stylelint-disable-next-line selector-class-pattern */
.content-right-table .el-table .el-table__cell {
  padding: 6px 0;
}

.content-right-table .el-table thead {
  color: #303133;
}

/* stylelint-disable-next-line selector-class-pattern */
.content-right-table .el-table__empty-block {
  min-height: 0;
}
</style>

<style lang="less" scoped>
@import url('@/css/variables.less');

.work-item-page-container {
  min-height: 813px;

  .table-project-clickable-text {
    color: black;
    text-decoration: none;

    &:hover {
      color: #409eff;
      text-decoration: underline;
      cursor: pointer;
    }
  }

  display: flex;
  gap: 8px;

  .content-left,
  .content-right {
    min-height: calc(85vh - 15);
    background: #fff;
    border-radius: 8px;
    border: 1px solid #f0f0f3;
    padding: 16px 0;
  }

  .content-right {
    width: 985px;
    flex: 8.4;

    .content-right-title {
      transform: translateY(-15px);
      margin: 0 16px;
      font-family: @font-family;
      font-size: @title-small;
      font-weight: @font-weight-bold;
      color: @color-text-primary;
    }

    .filter-area {
      width: 1642px;
      margin-left: 15px;
      margin-bottom: 16px;
      display: flex;
      align-items: center;
    }

    .transformed {
      /* 当 filterName 包含 '3D' 时的样式 */
      transform: translateX(-15px);
    }

    .content-right-header {
      transform: translateY(-17px);
      display: flex;
      align-items: center;
      justify-content: space-between;
      border-bottom: 2px solid #f0f0f3;
      margin: 25px 16px;

      .tabs-wrapper {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 25px;

        .content-right-tab {
          height: 30px;
          display: flex;
          align-items: center;

          .round-symbol {
            display: inline-block;
            width: 2px;
            height: 2px;
            background-color: black;
            border-radius: 50%;
            margin: 0 4px;
          }

          &.active {
            color: @color-text-blue;
            border-bottom: 3px solid @color-text-blue;
            padding-bottom: 5px;
            margin-bottom: -8px;
          }

          &:hover {
            cursor: pointer;
          }
        }
      }

      .content-right-operations {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 15px;
        padding-bottom: 10px;

        .vertical-divider {
          width: 2px;
          height: 24px;
          background-color: #eee;
          border-radius: 50%;
          margin: 0 8px;
        }

        .new-task-btn {
          height: 32px;
          width: 80px;
          background: #007bff;
          border-radius: 4px;
          line-height: 0;
        }
      }
    }

    .content-right-table {
      transform: translateY(-15px);
      margin: 0 16px;

      .page-gatation {
        text-align: center;
        margin-top: 20px;
      }

      /* stylelint-disable-next-line selector-class-pattern */
      .el-table--border,
      .el-table--group {
        border-radius: 0 0 4px 4px;
        border: 0 1px solid #eee;
      }
    }
  }

  .content-left {
    flex: 1;

    .content-left-title {
      display: flex;
      align-items: center;
      font-size: 16px;
      font-weight: 550;
      color: #000;
      margin-bottom: 20px;
      margin-left: 18px;

      span:first-child {
        margin-right: 10px;
      }

      img {
        width: 20px;
        height: 20px;
      }
    }

    .content-left-options {
      .option {
        width: 168px;
        height: 40px;
        margin-left: 16px;
        margin-right: 16px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        color: #303133;
        background: #eee;
        border-radius: 4px;
        font-weight: 500;
        font-family: 'PingFang SC-Regular', 'PingFang SC', sans-serif;
        font-size: 14px;
        margin-bottom: 5px;

        &:hover,
        &.active {
          opacity: 0.75;
          border-radius: 4px;
          cursor: pointer;
        }

        span {
          padding: 10px;
        }
      }
    }
  }
}

.task-dialog {
  :deep(.el-dialog__body) {
    padding: 16px 24px 40px 24px;
  }
  :deep(.el-dialog__header) {
    padding-bottom: 0;
  }
}
</style>
