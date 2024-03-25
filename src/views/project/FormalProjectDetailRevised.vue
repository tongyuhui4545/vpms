<template> 
  <div v-loading="fullscreenLoading">
    <div class="page-container">
      <div class="card-header">
        <div class="card-title-wrapper">
          <div class="title-line" />
          <div class="card-title">
            Project information
          </div>
          <div
            v-if="tagTitle && tagTitle != ''"
            class="sales-status"
          >
            <span v-if="isNaN(tagTitle)">{{ tagTitle }}</span>
            <template v-else>
              <span
                v-for="(item,key) in salesStatusOptions"
                :key="key"
              >
                <span v-if="item.value == tagTitle">{{ item.label }}</span>
              </span>
            </template>
          </div>
          <div
            v-if="archived"
            style="margin-left: 10px; margin-bottom: 8px;"
          >
            <ArchivedMark mark-type="project" />
          </div>
        </div>
        <div
          class="card-btn animate"
          @click="handleBack"
        >
          <i class="el-icon-back" />
          Return
        </div>
      </div>
      <div class="project-detail-container">
        <div class="project-detail-wrapper">
          <div class="project-item">
            <div class="title-wrapper">
              <div class="title-content">
                <span class="iconfont icon-xiangmu1 icon" />
                <div class="title">
                  Project details
                </div>
              </div>
            </div>
            <div class="content-wrapper">
              <div class="info-item">
                <div class="title-label">
                  Project No.
                </div>
                <div class="info-value">
                  {{ projectForm.project_no }}
                </div>
              </div>
              <div class="info-item">
                <div class="title-label">
                  Project name
                </div>
                <div class="info-value">
                  {{ projectForm.description }}
                </div>
              </div>
              <div class="info-item">
                <div class="title-label">
                  Creation time
                </div>
                <div class="info-value">
                  {{ formatCreationTime(projectForm.created_at) }}
                </div>
              </div>
              <div class="info-item">
                <div class="title-label">
                  Address
                </div>
                <div class="info-value">
                  {{ projectForm.address }}
                  {{ projectForm.city }}
                  {{ projectForm.county }}
                  {{ projectForm.state }}
                  {{ projectForm.zipcode }}
                </div>
              </div>
              <div class="info-item">
                <div class="title-label">
                  Comment
                </div>
                <div class="info-value">
                  {{ projectForm.remark }}
                </div>
              </div>
            </div>
          </div>
          <div class="project-item">
            <div class="title-wrapper">
              <div class="title-content">
                <span class="iconfont icon-kehu icon" />
                <div class="title">
                  Customer information
                </div>
              </div>
            </div>
            <div class="content-wrapper">
              <div class="info-item">
                <div class="title-label">
                  Customer No.
                </div>
                <div
                  v-if="projectForm.client"
                  class="info-value"
                >
                  {{ projectForm.client.no }}
                </div>
              </div>
              <div class="info-item">
                <div class="title-label">
                  Customer name
                </div>
                <div
                  v-if="projectForm.client"
                  class="info-value"
                >
                  {{ projectForm.client.name }}
                </div>
              </div>
              <div class="info-item">
                <div class="title-label">
                  Phone number
                </div>
                <div
                  v-if="projectForm.client"
                  class="info-value"
                >
                  {{ projectForm.client.tel }}
                </div>
              </div>
              <div class="info-item">
                <div class="title-label">
                  Customer address
                </div>
                <div
                  v-if="projectForm.client"
                  class="info-value"
                >
                  {{ projectForm.client.address }}
                </div>
              </div>
            </div>
          </div>
          <!--团队信息-->
          <div
            v-if="teamInfo"
            class="project-item"
          >
            <div class="title-wrapper">
              <div class="title-content">
                <span class="iconfont icon-renyuanguanli icon" />
                <div class="title">
                  Team information
                </div>
              </div>
            </div>
            <div class="content-wrapper">
              <div class="info-item">
                <div class="title-label">
                  Team name
                </div>
                <div class="info-value">
                  {{ teamInfo.name }}
                </div>
              </div>
              <div class="info-item">
                <div class="title-label">
                  Group leader
                </div>
                <div class="info-value">
                  {{ teamInfo.manager.name }}
                </div>
              </div>
              <div class="info-item">
                <div class="title-label">
                  Team member
                </div>
                <div class="info-value">
                  <div
                    v-for="(item, key) in teamInfo.members"
                    :key="key"
                    class="member"
                  >
                    {{ item.name }}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="project-item">
            <div class="title-wrapper">
              <div class="title-content">
                <span class="iconfont icon-renyuanguanli icon" />
                <div class="title">
                  Sales information
                </div>
              </div>
              <div
                v-if="userLimits && userLimits.sales_status"
                style="display:flex; align-items: center; justify-content: space-between;"
              >
                <el-button
                  v-if="!archived"
                  style="margin-right: 15px"
                  type="text"
                  @click="onArchiveProject"
                >
                  <i :class="{'el-icon-s-order':!archived, 'el-icon-s-release':archived}" />
                  Archive
                </el-button>
                <el-button
                  v-if="archived"
                  style="margin-right: 15px"
                  type="text"
                  @click="onUnarchiveProject"
                >
                  <i :class="{'el-icon-s-order':!archived, 'el-icon-s-release':archived}" />
                  Unarchive
                </el-button>
                <!-- <div v-if="projectForm.archiving == 0" class="sales-btn" @click="handleSalesTag">
                  <i class="el-icon-setting icon"></i>
                  Status
                </div> -->
              </div>
              <div
                v-if="d3UserLimits && d3UserLimits.assign_simulation_to_CN"
                class="simulation-task-btn"
                :class="{'disabled': simulationSent}"
                @click="initiateSimulationTask"
              >
                <i class="el-icon-plus" />
                <span>Simulation task</span>
              </div>
            </div>
            <div
              class="content-wrapper"
              style="margin-right: 0"
            >
              <div class="info-item">
                <div class="title-label">
                  Sales name
                </div>
                <div
                  v-if="projectForm.sales"
                  class="info-value"
                >
                  {{ projectForm.sales.name }}
                </div>
              </div>
              <div class="info-item">
                <div class="title-label">
                  Sales email
                </div>
                <div
                  v-if="projectForm.sales"
                  class="info-value"
                >
                  {{ projectForm.sales.email }}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="card-header">
        <div class="card-title-wrapper">
          <div class="title-line" />
          <div class="card-title">
            Phase
          </div>
        </div>
        <div
          v-show="userLimits && userLimits.phase_add && progressList.length !== 0"
          class="card-btn animate"
          @click="handleAddProgress('formal')"
        >
          <i class="el-icon-plus" />
          New phase
        </div>
      </div>
      <div
        v-if="progressList.length == 0" 
        class="no-data-wrapper animate"
      >
        <img
          style="width: 250px; height: 250px"
          src="@/assets/IconDesigns/no_data.png"
          alt="no-data"
        >
        <div
          v-if="userLimits && userLimits.phase_add && projectForm.archiving == 0"
          class="label animate"
        >
          <span @click="handleAddProgress('formal')">
            <i class="el-icon-plus" />
            New phase
          </span>
        </div>
      </div>
      <div
        v-if="progressList.length !== 0"
        class="progress-container"
      >
        <div class="tab-container">
          <div class="tab-wrapper">
            <div
              v-for="(item, key) in progressList"
              :key="key"
              :class="
                activeProgress == item.id
                  ? 'tab-item active animate'
                  : 'tab-item animate'
              "
              @click="handleProgress(item)"
            >
              {{ item.version }}
              <span
                v-if="item.win == 1"
                class="badge-crown"
              />
              <!-- <div
                v-if="projectForm.progress_id == item.id"
                class="in-progress"
              >
                Active
              </div> -->
            </div>
          </div>
          <!-- 2023/08/29新版本v0.4.0中，不需要显示“Activate phase”按钮，也不需要显示“Active”标签 -->
          <!-- <div
            v-if="
              projectForm.progress_id != progressForm.id && showActivatePhase
            "
            class="card-btn animate"
            @click="handleActivateProgress"
          >
            <i class="el-icon-star-off"></i>
            Activate phase
          </div> -->
          <div
            v-show="userLimits.phase_edit && projectForm.archiving == 0 && currentPhase.win != 1 && currentPhase.archiving == 0"
            class="card-btn animate"
            style="margin-left: 20px"
            @click="handleEditProgress"
          >
            <i class="el-icon-edit-outline" />
            Edit phase
          </div>
          <!-- 2023/08/29新增，phase只需要归档，解档，不需要删除 -->
          <div
            v-show="userLimits.phase_archive && projectForm.archiving == 0"
            class="card-btn animate"
            style="margin-left: 20px"
            @click="openArchivePhaseConfirm"
          >
            <i :class="{'el-icon-s-order':!archived, 'el-icon-s-release':archived}" />
            {{ currentPhase.archiving == 0 ? 'Archive phase' : 'Unarchive phase' }}
          </div>
          <!-- 2023/08/29新版本v0.4.0中，不需要显示Delete phase按钮，直接归档 -->
          <!-- <div
            v-show="showDeletePhase && !archived"
            class="card-btn animate"
            style="margin-left: 20px"
            @click="handleDeleteProgress"
          >
            <i class="el-icon-delete"></i>
            Delete phase
          </div> -->
          <div
            class="card-btn animate"
            style="margin-left: 20px"
          >
            <el-dropdown
              :show-arrow="false"
              @command="handleDownloadOptions"
            >
              <div class="icon-n-text">
                <img
                  src="@/assets/IconDesigns/download.png"
                  alt="download"
                >
                Download
              </div>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item command="quote">
                  Quote file
                </el-dropdown-item>
                <el-dropdown-item command="confirmation">
                  Confirmation file
                </el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </div>
        </div>
        <div class="progress-wrapper">
          <table style="width: 100%; border-collapse: collapse">
            <tr>
              <td
                v-if="d3Sent"
                colspan="12"
              >
                <div class="team-type-tabs">
                  <div
                    class="team-type-tab"
                    @click="switchViewingType('2D')"
                  >
                    <span
                      class="tab-text"
                      :class="{'selected-tab-text': viewingType == '2D'}"
                    >2D</span>
                    <span
                      v-show="viewingType == '2D'"
                      class="selected-mark"
                    />
                  </div>
                  <div
                    class="team-type-tab"
                    @click="switchViewingType('3D')"
                  >
                    <span
                      class="tab-text"
                      :class="{'selected-tab-text': viewingType == '3D'}"
                    >3D</span>
                    <span
                      v-show="viewingType == '3D'"
                      class="selected-mark"
                    />
                  </div>
                </div>
              </td>
            </tr>
            <tr
              v-if="currentPhase.archiving ==1"
              style="border:none;"
            >
              <td
                colspan="4"
                style="border:none;padding-top:0;"
              >
                <ArchivedMark mark-type="project" />
              </td>
            </tr>
            <!-- 2d浏览的第一行信息 -->
            <template v-if="viewingType == '2D'">
              <tr colspan="12">
                <td
                  class="label"
                  colspan="2"
                >
                  <i class="el-icon-discover icon" />
                  Quote status
                </td>
                <td>
                  {{
                    (progressForm.status_label === "US engineer rejected" || progressForm.status_label === "Quote rejected & Pending re-quote")
                      ? progressForm.status_label + `(${progressForm.reason || 'others'})`
                      : progressForm.status_label
                  }}
                </td>
                <td class="label">
                  <i class="el-icon-data-analysis icon" />
                  Phase
                </td>
                <td>{{ progressForm.progress }}</td>
                <!-- customer due date -->
                <td
                  class="label"
                  style="display: flex; align-items: center"
                >
                  <p>Customer due date</p>
                  <ClockTag
                    v-if="showCustomerDueDateClock && progressForm.due_date"
                    :due-date="progressForm.due_date"
                  />
                </td>
                <td>{{ transFormat(progressForm.due_date, "date") }}</td>
                <!-- internal due date -->
                <td
                  class="label"
                  style="display: flex; align-items: center"
                >
                  <p>Internal due date</p>
                  <ClockTag
                    v-if="showInternalDueDateClock && progressForm.inner_date"
                    :due-date="progressForm.inner_date"
                  />
                </td>
                <td>{{ transFormat(progressForm.inner_date, "date") }}</td>
                <td
                  class="label"
                  style="display: flex; align-items: center"
                >
                  <p>Team due date</p>
                  <ClockTag
                    v-if="showTeamDueDateClock && progressForm.team_due_date"
                    :due-date="progressForm.team_due_date"
                  />
                </td>
                <td>{{ progressForm.team_due_date ? transFormat(progressForm.team_due_date, "date") : '' }}</td>
              </tr>
            </template>   
            <!-- 3d浏览的第一行信息 -->
            <template v-if="viewingType == '3D'">
              <tr colspan="12">
                <td
                  class="label"
                  colspan="2"
                >
                  <i class="el-icon-discover icon" />
                  3D calculation status
                </td>
                <td>
                  {{
                    (progressForm['3d_calculation_status_label'] === "3D calculation rejected & Pending re-submit" || progressForm['3d_calculation_status_label'] === "US engineer rejected 3D calculation")
                      ? progressForm['3d_calculation_status_label'] + `(${progressForm.cal_reject_reason || 'others'})`
                      : progressForm['3d_calculation_status_label']
                  }}
                </td>
                <td class="label">
                  <i class="el-icon-data-analysis icon" />
                  Phase
                </td>
                <td>{{ progressForm.progress }}</td>
                <!-- customer due date -->
                <td
                  class="label"
                  style="display: flex; align-items: center"
                >
                  <p>Customer due date</p>
                  <ClockTag
                    v-if="judgeDisplayClock('calculation', projectForm['3d_calculation_status_label']) && isUnarchived"
                    :due-date="progressForm.due_date"
                  />
                </td>
                <td>{{ progressForm.due_date }}</td>
                <!-- internal due date -->
                <td
                  class="label"
                  style="display: flex; align-items: center"
                >
                  <p>3D Internal due date</p>
                  <ClockTag
                    v-if="judgeDisplayClock('calculation', projectForm['3d_calculation_status_label']) && isUnarchived"
                    :due-date="progressForm['3d_inner_date']"
                  />
                </td>
                <td>{{ progressForm.inner_date }}</td>
                <td
                  class="label"
                  style="display: flex; align-items: center"
                >
                  <p>3D Team due date</p>
                  <ClockTag
                    v-if="judgeDisplayClock('calculation', projectForm['3d_calculation_status_label']) && isUnarchived"
                    :due-date="progressForm['3d_team_due_date']"
                  />
                </td>
                <td>{{ progressForm.team_due_date ? progressForm.team_due_date : '' }}</td>
              </tr>
            </template>
            <tr>
              <td
                colspan="12"
                class="label"
              >
                <div v-if="seriesList.length == 0">
                  <i class="el-icon-connection icon" />
                  Configuration
                </div>
                <div v-else>
                  <div class="series-navbar-container">
                    <div class="series-navbar-wrapper">
                      <i class="el-icon-connection icon" />
                      <div
                        v-for="(item, key) in seriesList"
                        :key="key"
                        :class="
                          activeSeries == item.id
                            ? 'tab-item active animate'
                            : 'tab-item animate'
                        "
                        @click="handleSeriesTab(item)"
                      >
                        Configuration {{ item.version }}
                      </div>
                    </div>
                    <div
                      v-if="userLimits.configuration_add && projectForm.archiving == 0 && currentPhase.archiving == 0"
                      class="series-btn-wrapper"
                    >
                      <div class="add-series-btn">
                        <el-dropdown
                          size="small"
                          @command="handleCmomadSeries"
                        >
                          <span class="el-dropdown-link add-series-btn">
                            <i class="el-icon-plus" />
                          </span>
                          <el-dropdown-menu slot="dropdown">
                            <el-dropdown-item command="new">
                              New
                            </el-dropdown-item>
                            <el-dropdown-item command="copy">
                              Copy from
                            </el-dropdown-item>
                          </el-dropdown-menu>
                        </el-dropdown>
                      </div>
                      <div
                        v-if="userLimits.configuration_edit && projectForm.archiving == 0 && currentPhase.archiving == 0"
                        class="add-series-btn"
                        @click="handleEditSeries"
                      >
                        <i class="el-icon-edit-outline" />
                      </div>
                      <div
                        v-if="userLimits.configuration_delete && projectForm.archiving == 0 && currentPhase.archiving == 0"
                        class="add-series-btn"
                        @click="handleDeleteSeries"
                      >
                        <i class="el-icon-delete" />
                      </div>
                    </div>
                  </div>
                </div>
              </td>
            </tr>
            <tr>
              <td
                colspan="12"
                style="padding: 0 0 10px"
              >
                <div v-if="seriesList.length == 0">
                  <div class="no-data-wrapper animate">
                    <img
                      style=" width: 250px; height: 250px;"
                      src="@/assets/IconDesigns/no_data.png"
                      alt="no-data"
                    >
                    <div
                      v-if="userLimits.configuration_add && projectForm.archiving == 0 && currentPhase.archiving == 0" 
                      class="label animate"
                    >
                      <el-dropdown
                        size="small"
                        @command="handleCmomadSeries"
                      >
                        <span class="el-dropdown-link">
                          <i class="el-icon-plus" />
                          New configuration
                        </span>
                        <el-dropdown-menu slot="dropdown">
                          <el-dropdown-item command="new">
                            New
                          </el-dropdown-item>
                          <el-dropdown-item command="copy">
                            Copy from
                          </el-dropdown-item>
                        </el-dropdown-menu>
                      </el-dropdown>
                    </div>
                  </div>
                </div>
                <div
                  v-if="seriesList.length != 0"
                  class="ports-container"
                >
                  <div class="ports-tab-container">
                    <div
                      v-for="(item, key) in serlesNavbar"
                      :key="key"
                      :class="
                        activePortsTab == item.id
                          ? 'tab-item animate active'
                          : 'tab-item animate'
                      "
                      @click="handlePortsTab(item.id)"
                    >
                      {{ item.label }}
                      <div
                        v-if="item.id == 'solar'"
                        class="navbar-more animate"
                        @click="viewMore"
                      >
                        <i class="el-icon-view" />
                      </div>
                      <div
                        v-if="activePortsTab == item.id"
                        class="line"
                      />
                    </div>
                  </div>
                  <!--Solar Modular-->
                  <div
                    v-if="activePortsTab == 'solar'"
                    class="ports-wrapper"
                  >
                    <div class="item">
                      <div class="ports-label">
                        Manufacturer:
                      </div>
                      <div class="ports-value">
                        {{ solarForm.manufacturer }}
                      </div>
                    </div>
                    <div class="item">
                      <div class="ports-label">
                        Module series:
                      </div>
                      <div class="ports-value">
                        {{ solarForm.module_type }}
                      </div>
                    </div>
                    <div class="item">
                      <div class="ports-label">
                        Bifacial:
                      </div>
                      <div class="ports-value">
                        {{ solarForm.bifacial_gain ? "Yes" : "N/A" }}
                      </div>
                    </div>
                    <div class="item">
                      <div class="ports-label">
                        Model:
                      </div>
                      <div class="ports-value">
                        {{ solarForm.model }}
                      </div>
                    </div>
                    <div
                      v-if="moreSolar"
                      class="ports-mode"
                    >
                      <el-divider content-position="left">
                        Mechanical Parameters
                      </el-divider>
                    </div>
                    <div
                      v-if="moreSolar"
                      class="item"
                    >
                      <div class="ports-label">
                        Cell type:
                      </div>
                      <div class="ports-value">
                        {{ solarForm.cell_orientation }}
                      </div>
                    </div>
                    <div class="item">
                      <div class="ports-label">
                        Junction box location:
                      </div>
                      <div class="ports-value">
                        {{ solarForm.junction_box_location }}
                      </div>
                    </div>
                    <div class="item">
                      <div class="ports-label">
                        Connector:
                        <div
                          v-if="seriesForm.connector_confirm == 1"
                          class="comfirm-icon"
                        >
                          <i class="el-icon-circle-check icon" />
                        </div>
                      </div>
                      <div class="ports-value">
                        <!-- <span
                          v-for="(item, key) in seriesForm.connector"
                          :key="key"
                        >
                          {{ item }}
                        </span> -->
                        {{ seriesForm.connector }}
                      </div>
                    </div>
                    <div class="item">
                      <div class="ports-label">
                        Output cable-positive (mm):
                        <div
                          v-if="seriesForm.output_cable_pos_confirm == 1"
                          class="comfirm-icon"
                        >
                          <i class="el-icon-circle-check icon" />
                        </div>
                      </div>
                      <div class="ports-value">
                        {{ seriesForm.output_cable_pos }}
                      </div>
                    </div>
                    <div class="item">
                      <div class="ports-label">
                        Output cable-negative (mm):
                        <div
                          v-if="seriesForm.output_cable_neg_confirm == 1"
                          class="comfirm-icon"
                        >
                          <i class="el-icon-circle-check icon" />
                        </div>
                      </div>
                      <div class="ports-value">
                        {{ seriesForm.output_cable_neg }}
                      </div>
                    </div>
                    <div
                      v-if="moreSolar"
                      class="item"
                    >
                      <div class="ports-label">
                        Glass:
                      </div>
                      <div class="ports-value">
                        {{ solarForm.glass }}
                      </div>
                    </div>
                    <div
                      v-if="moreSolar"
                      class="item"
                    >
                      <div class="ports-label">
                        Frame:
                      </div>
                      <div class="ports-value">
                        {{ solarForm.frame }}
                      </div>
                    </div>
                    <div
                      v-if="moreSolar"
                      class="item"
                    >
                      <div class="ports-label">
                        Weight (kg):
                      </div>
                      <div class="ports-value">
                        {{ solarForm.weight }}
                      </div>
                    </div>
                    <div class="item">
                      <div class="ports-label">
                        Width (mm):
                      </div>
                      <div class="ports-value">
                        {{ solarForm.width }}
                      </div>
                    </div>
                    <div class="item">
                      <div class="ports-label">
                        Height (mm):
                      </div>
                      <div class="ports-value">
                        {{ solarForm.height }}
                      </div>
                    </div>
                    <div
                      v-if="moreSolar"
                      class="item"
                    >
                      <div class="ports-label">
                        Thickness (mm):
                      </div>
                      <div class="ports-value">
                        {{ solarForm.thickness }}
                      </div>
                    </div>
                    <div
                      v-if="moreSolar"
                      class="ports-mode"
                    >
                      <el-divider content-position="left">
                        Electrical characteristics (STC:AM1.5 1000W/m²
                        25℃)
                      </el-divider>
                    </div>
                    <div class="item">
                      <div class="ports-label">
                        Maximum power (Pmax/W):
                      </div>
                      <div class="ports-value">
                        {{ solarForm.maximum_power }}
                      </div>
                    </div>
                    <div class="item">
                      <div class="ports-label">
                        Open circuit voltage (Voc/V):
                      </div>
                      <div class="ports-value">
                        {{ solarForm.open_circuit_voltage }}
                      </div>
                    </div>
                    <div class="item">
                      <div class="ports-label">
                        Short circuit current (Isc/A):
                      </div>
                      <div class="ports-value">
                        {{ solarForm.short_circuit_current }}
                      </div>
                    </div>
                    <div
                      v-if="moreSolar"
                      class="item"
                    >
                      <div class="ports-label">
                        Voltage at maximum power (Vmp/V):
                      </div>
                      <div class="ports-value">
                        {{ solarForm.voltage_at_maximum_power }}
                      </div>
                    </div>
                    <div
                      v-if="moreSolar"
                      class="item"
                    >
                      <div class="ports-label">
                        Current at maximum power (Imp/A):
                      </div>
                      <div class="ports-value">
                        {{ solarForm.current_at_maximum_power }}
                      </div>
                    </div>
                    <div
                      v-if="moreSolar"
                      class="item"
                    >
                      <div class="ports-label">
                        Module efficiency (%):
                      </div>
                      <div class="ports-value">
                        {{ solarForm.module_efficiency }}
                      </div>
                    </div>
                    <div
                      v-if="moreSolar"
                      class="ports-mode"
                    >
                      <el-divider content-position="left">
                        Operating parameters
                      </el-divider>
                    </div>
                    <div
                      v-if="moreSolar"
                      class="item"
                    >
                      <div class="ports-label">
                        Operational temperature (℃):
                      </div>
                      <div class="ports-value">
                        {{ solarForm.operational_temperature }}
                      </div>
                    </div>
                    <div
                      v-if="moreSolar"
                      class="item"
                    >
                      <div class="ports-label">
                        Power output tolerance (W):
                      </div>
                      <div class="ports-value">
                        {{ solarForm.power_output_tolerance }}
                      </div>
                    </div>
                    <div
                      v-if="moreSolar"
                      class="item"
                    >
                      <div class="ports-label">
                        Voc and isc tolerance (%):
                      </div>
                      <div class="ports-value">
                        {{ solarForm.voc_and_isc_tolerance }}
                      </div>
                    </div>
                    <div
                      v-if="moreSolar"
                      class="item"
                    >
                      <div class="ports-label">
                        Maximum system voltage (V):
                      </div>
                      <div class="ports-value">
                        {{ solarForm.maximum_system_voltage }}
                      </div>
                    </div>
                    <div class="item">
                      <div class="ports-label">
                        Maximum configuration fuse rating (A):
                      </div>
                      <div class="ports-value">
                        {{ solarForm.maximum_series_fuse_rating }}
                      </div>
                    </div>
                    <div
                      v-if="moreSolar"
                      class="item"
                    >
                      <div class="ports-label">
                        Nominal operating cell temperature (℃):
                      </div>
                      <div class="ports-value">
                        {{ solarForm.nominal_operating_cell_temperature }}
                      </div>
                    </div>
                    <div
                      v-if="moreSolar"
                      class="item"
                    >
                      <div class="ports-label">
                        Protection class:
                      </div>
                      <div class="ports-value">
                        {{ solarForm.protection_class }}
                      </div>
                    </div>
                    <div
                      v-if="moreSolar"
                      class="item"
                    >
                      <div class="ports-label">
                        Fire rating:
                      </div>
                      <div class="ports-value">
                        {{ solarForm.fire_rating }}
                      </div>
                    </div>
                    <div class="item">
                      <div class="ports-label">
                        Bifacial gain (%):
                      </div>
                      <div class="ports-value">
                        {{ solarForm.bifacial_gain }}
                      </div>
                    </div>
                    <div
                      v-if="moreSolar"
                      class="ports-mode"
                    >
                      <el-divider content-position="left">
                        Mechanical loading
                      </el-divider>
                    </div>
                    <div
                      v-if="moreSolar"
                      class="item"
                    >
                      <div class="ports-label">
                        Front side maximum static loading (Pa):
                      </div>
                      <div class="ports-value">
                        {{ solarForm.front_side_maximum_static_loading }}
                      </div>
                    </div>
                    <div
                      v-if="moreSolar"
                      class="item"
                    >
                      <div class="ports-label">
                        Rear side maximum static loading (Pa):
                      </div>
                      <div class="ports-value">
                        {{ solarForm.rear_side_maximum_static_loading }}
                      </div>
                    </div>
                    <div
                      v-if="moreSolar"
                      class="item"
                    >
                      <div class="ports-label">
                        Hailstone Test:
                      </div>
                      <div class="ports-value">
                        {{ solarForm.hailstone_test }}
                      </div>
                    </div>
                    <div
                      v-if="moreSolar"
                      class="ports-mode"
                    >
                      <el-divider content-position="left">
                        Temperature ratings (STC)
                      </el-divider>
                    </div>
                    <div
                      v-if="moreSolar"
                      class="item"
                    >
                      <div class="ports-label">
                        Temperature coefficient of isc (%/℃):
                      </div>
                      <div class="ports-value">
                        {{ solarForm.temperature_coefficient_of_isc }}
                      </div>
                    </div>
                    <div
                      v-if="moreSolar"
                      class="item"
                    >
                      <div class="ports-label">
                        Temperature coefficient of voc (%/℃):
                      </div>
                      <div class="ports-value">
                        {{ solarForm.temperature_coefficient_of_voc }}
                      </div>
                    </div>
                    <div
                      v-if="moreSolar"
                      class="item"
                    >
                      <div class="ports-label">
                        Temperature coefficient of pmax (%/℃):
                      </div>
                      <div class="ports-value">
                        {{ solarForm.temperature_coefficient_of_pmax }}
                      </div>
                    </div>
                  </div>
                  <!--Racking/Tracker-->
                  <div
                    v-if="activePortsTab == 'tracker'"
                    class="ports-wrapper"
                  >
                    <div class="item">
                      <div class="ports-label">
                        Manufacturer:
                      </div>
                      <div class="ports-value">
                        {{ trackerForm.manufacturer }}
                      </div>
                    </div>
                    <div class="item">
                      <div class="ports-label">
                        Configuration:
                      </div>
                      <div class="ports-value">
                        {{ trackerForm.series }}
                      </div>
                    </div>
                    <div class="item">
                      <div class="ports-label">
                        BHA gap width (ft):
                        <div
                          v-if="seriesForm.bha_gap_width_confirm == 1"
                          class="comfirm-icon"
                        >
                          <i class="el-icon-circle-check icon" />
                        </div>
                      </div>
                      <div class="ports-value">
                        {{ seriesForm.bha_gap_width }}
                      </div>
                    </div>
                    <div class="item">
                      <div class="ports-label">
                        Motor gap width (ft):
                        <div
                          v-if="seriesForm.motor_gap_width_confirm == 1"
                          class="comfirm-icon"
                        >
                          <i class="el-icon-circle-check icon" />
                        </div>
                      </div>
                      <div class="ports-value">
                        {{ seriesForm.motor_gap_width }}
                      </div>
                    </div>
                    <div class="item">
                      <div class="ports-label">
                        Maximum pier height (ft):
                        <div
                          v-if="seriesForm.maximum_pier_height_confirm == 1"
                          class="comfirm-icon"
                        >
                          <i class="el-icon-circle-check icon" />
                        </div>
                      </div>
                      <div class="ports-value">
                        {{ seriesForm.maximum_pier_height }}
                      </div>
                    </div>
                    <div class="item">
                      <div class="ports-label">
                        Pile position:
                        <div
                          v-if="seriesForm.pile_position_confirm == 1"
                          class="comfirm-icon"
                        >
                          <i class="el-icon-circle-check icon" />
                        </div>
                      </div>
                      <div class="ports-value">
                        {{ seriesForm.pile_position }}
                      </div>
                    </div>
                  </div>
                  <!--Combination parameter-->
                  <div
                    v-if="activePortsTab == 'combination'"
                    class="ports-wrapper"
                  >
                    <div class="item">
                      <div class="ports-label">
                        Module to module spacing (mm):
                        <div
                          v-if="
                            seriesForm.module_to_module_spacing_confirm == 1
                          "
                          class="comfirm-icon"
                        >
                          <i class="el-icon-circle-check icon" />
                        </div>
                      </div>
                      <div class="ports-value">
                        {{ seriesForm.module_to_module_spacing }}
                      </div>
                    </div>
                    <div class="item">
                      <div class="ports-label">
                        BHA gap extender (ft):
                        <div
                          v-if="seriesForm.bha_gap_extender_confirm == 1"
                          class="comfirm-icon"
                        >
                          <i class="el-icon-circle-check icon" />
                        </div>
                      </div>
                      <div class="ports-value">
                        {{ seriesForm.bha_gap_extender }}
                      </div>
                    </div>
                    <div class="item">
                      <div class="ports-label">
                        Motor gap extender (ft):
                        <div
                          v-if="seriesForm.bha_gap_width_confirm == 1"
                          class="comfirm-icon"
                        >
                          <i class="el-icon-circle-check icon" />
                        </div>
                      </div>
                      <div class="ports-value">
                        {{ seriesForm.bha_gap_width }}
                      </div>
                    </div>
                    <div class="item">
                      <div class="ports-label">
                        Number of modules per string (pcs):
                        <div
                          v-if="seriesForm.of_modules_per_string_confirm == 1"
                          class="comfirm-icon"
                        >
                          <i class="el-icon-circle-check icon" />
                        </div>
                      </div>
                      <div class="ports-value">
                        {{ seriesForm.of_modules_per_string }}
                      </div>
                    </div>
                    <div class="item">
                      <div class="ports-label">
                        Row to row spacing (ft):
                        <div
                          v-if="seriesForm.row_to_row_spacing_confirm == 1"
                          class="comfirm-icon"
                        >
                          <i class="el-icon-circle-check icon" />
                        </div>
                      </div>
                      <div class="ports-value">
                        {{ seriesForm.row_to_row_spacing }}
                      </div>
                    </div>
                    <div class="item">
                      <div class="ports-label">
                        Number of modules per tracker (pcs):
                        <div
                          v-if="seriesForm.modules_per_tracker_confirm == 1"
                          class="comfirm-icon"
                        >
                          <i class="el-icon-circle-check icon" />
                        </div>
                      </div>
                      <div class="ports-value">
                        {{ seriesForm.modules_per_tracker }}
                      </div>
                    </div>
                    <div class="item">
                      <div class="ports-label">
                        Maximum current factor:
                        <div
                          v-if="seriesForm.maximum_current_factor_confirm == 1"
                          class="comfirm-icon"
                        >
                          <i class="el-icon-circle-check icon" />
                        </div>
                      </div>
                      <div class="ports-value">
                        {{ seriesForm.maximum_current_factor }}
                      </div>
                    </div>
                    <div class="item">
                      <div class="ports-label">
                        Overload protection factor:
                        <div
                          v-if="
                            seriesForm.overload_protection_factor_confirm == 1
                          "
                          class="comfirm-icon"
                        >
                          <i class="el-icon-circle-check icon" />
                        </div>
                      </div>
                      <div class="ports-value">
                        {{ seriesForm.overload_protection_factor }}
                      </div>
                    </div>
                    <div class="item">
                      <div class="ports-label">
                        Maximum overload protection current (A):
                        <div
                          v-if="
                            seriesForm.maximum_overload_protection_current_confirm ==
                              1
                          "
                          class="comfirm-icon"
                        >
                          <i class="el-icon-circle-check icon" />
                        </div>
                      </div>
                      <div class="ports-value">
                        {{ seriesForm.maximum_overload_protection_current }}
                      </div>
                    </div>
                    <div class="item">
                      <div class="ports-label">
                        Module connection*N:
                        <div
                          v-if="seriesForm.module_connection_confirm == 1"
                          class="comfirm-icon"
                        >
                          <i class="el-icon-circle-check icon" />
                        </div>
                      </div>
                      <div class="ports-value">
                        <span
                          v-for="(item, key) in seriesForm.module_connection"
                          :key="key"
                        >
                          {{ item }}
                        </span>
                      </div>
                    </div>
                    <div class="item">
                      <div class="ports-label">
                        Module orientation:
                        <div
                          v-if="seriesForm.module_orientation_confirm == 1"
                          class="comfirm-icon"
                        >
                          <i class="el-icon-circle-check icon" />
                        </div>
                      </div>
                      <div class="ports-value">
                        {{ seriesForm.module_orientation }}
                      </div>
                    </div>
                    <div class="item">
                      <div class="ports-label">
                        Messenger wire or Trench:
                        <div
                          v-if="seriesForm.cab_or_trench_confirm == 1"
                          class="comfirm-icon"
                        >
                          <i class="el-icon-circle-check icon" />
                        </div>
                      </div>
                      <div class="ports-value">
                        {{
                          seriesForm.cab_or_trench === "CAB"
                            ? "Messenger wire"
                            : seriesForm.cab_or_trench
                        }}
                      </div>
                    </div>
                    <div class="item">
                      <div class="ports-label">
                        CBX outlet length (ft):
                        <div
                          v-if="seriesForm.cbx_outlet_length_confirm == 1"
                          class="comfirm-icon"
                        >
                          <i class="el-icon-circle-check icon" />
                        </div>
                      </div>
                      <div class="ports-value">
                        {{ seriesForm.cbx_outlet_length }}
                      </div>
                    </div>
                    <div class="item">
                      <div class="ports-label">
                        CBX height (ft):
                        <div
                          v-if="seriesForm.cbx_height_confirm == 1"
                          class="comfirm-icon"
                        >
                          <i class="el-icon-circle-check icon" />
                        </div>
                      </div>
                      <div class="ports-value">
                        {{ seriesForm.cbx_height }}
                      </div>
                    </div>
                    <div class="item">
                      <div class="ports-label">
                        Distance from CBX to row head (ft):
                        <div
                          v-if="
                            seriesForm.distance_from_cbx_to_row_head_confirm ==
                              1
                          "
                          class="comfirm-icon"
                        >
                          <i class="el-icon-circle-check icon" />
                        </div>
                      </div>
                      <div class="ports-value">
                        {{ seriesForm.distance_from_cbx_to_row_head }}
                      </div>
                    </div>
                    <div class="item">
                      <div class="ports-label">
                        <span v-if="seriesForm.cab_or_trench == 'CAB'">Hanger height:</span>
                        <span v-else>Trench depth (ft):</span>
                        <div
                          v-if="
                            seriesForm.cab_height_or_trench_depth_confirm == 1
                          "
                          class="comfirm-icon"
                        >
                          <i class="el-icon-circle-check icon" />
                        </div>
                      </div>
                      <div class="ports-value">
                        {{ seriesForm.cab_height_or_trench_depth }}
                      </div>
                    </div>
                  </div>
                </div>
              </td>
            </tr>
            <tr>
              <td
                colspan="12"
                class="label"
              >
                <i class="el-icon-folder icon" />
                Customer files
              </td>
            </tr>
            <tr colspan="12">
              <td
                colspan="1"
                class="file-label"
              >
                Electrical drawing files
              </td>
              <td colspan="5">
                <div
                  v-for="(item, index) in progressForm.electrical_drawing_files"
                  :key="`electrical_drawing_files-${index}`"
                  class="file-item animate"
                  :style="{ marginTop: index == 0 ? '' : '10px' }"
                >
                  <span @click="viewFile(item)">
                    <i class="el-icon-document-checked" /> {{ item.name }}
                  </span>
                  <div style="display: flex; justify-content: center; align-items: center; gap: 2px; margin-left: 10px; margin-top: 4px">
                    <span @click.stop="handleViewFile(item)"><i
                      class="el-icon-view table-icon animate"
                      @click=""
                    /></span>
                    <span
                      @click.stop="viewFile(item)
                      "
                    ><img
                      src="@/assets/IconDesigns/download.png"
                      style="width:14px; height: 14px"
                      alt="view file"
                    ></span>
                  </div>
                </div>
              </td>
              <td
                colspan="1"
                class="file-label"
              >
                Golden row files
              </td>
              <td colspan="5">
                <div
                  v-for="(item, index) in progressForm.golden_row_files"
                  :key="`golden_row_files-${index}`"
                  class="file-item animate"
                  :style="{ marginTop: index == 0 ? '' : '10px' }"
                >
                  <span @click="viewFile(item)">
                    <i class="el-icon-document-checked" /> {{ item.name }}
                  </span>
                  <div style="display: flex; justify-content: center; align-items: center; gap: 2px; margin-left: 10px; margin-top: 4px">
                    <span @click.stop="handleViewFile(item)"><i
                      class="el-icon-view table-icon animate"
                      @click=""
                    /></span>
                    <span
                      @click.stop="viewFile(item)
                      "
                    ><img
                      src="@/assets/IconDesigns/download.png"
                      style="width:14px; height: 14px"
                      alt="view file"
                    ></span>
                  </div>
                </div>
              </td>
            </tr>
            <tr colspan="12">
              <td
                colspan="1"
                class="file-label"
              >
                Sequence file
              </td>
              <td colspan="5">
                <div
                  v-if="
                    progressForm.sequence_file &&
                      progressForm.sequence_file != ''
                  "
                  class="file-item"
                >
                  <span @click="viewFile(progressForm.sequence_file)">
                    <i class="el-icon-document-checked" />
                    {{ progressForm.sequence_file.name }}
                  </span>
                  <div style="display: flex; justify-content: center; align-items: center; gap: 2px; margin-left: 10px; margin-top: 4px">
                    <span @click.stop="handleViewFile(progressForm.sequence_file)"><i
                      class="el-icon-view table-icon animate"
                      @click=""
                    /></span>
                    <span
                      @click.stop="viewFile(progressForm.sequence_file)
                      "
                    ><img
                      src="@/assets/IconDesigns/download.png"
                      style="width:14px; height: 14px"
                      alt="view file"
                    ></span>
                  </div>
                </div>
              </td>
              <td
                colspan="1"
                class="file-label"
              >
                Other files
              </td>
              <td colspan="5">
                <div
                  v-for="(item, index) in progressForm.other_files"
                  :key="`other_files-${index}`"
                  class="file-item animate"
                  :style="{ marginTop: index == 0 ? '' : '10px' }"
                >
                  <span @click="viewFile(item)">
                    <i class="el-icon-document-checked" /> {{ item.name }}
                  </span>
                  <div style="display: flex; justify-content: center; align-items: center; gap: 2px; margin-left: 10px; margin-top: 4px">
                    <span @click.stop="handleViewFile(item)"><i
                      class="el-icon-view table-icon animate"
                      @click=""
                    /></span>
                    <span
                      @click.stop="viewFile(item)
                      "
                    ><img
                      src="@/assets/IconDesigns/download.png"
                      style="width:14px; height: 14px"
                      alt="view file"
                    ></span>
                  </div>
                </div>
              </td>
            </tr>
            <tr colspan="12">
              <td
                colspan="1"
                class="label"
              >
                <i class="el-icon-chat-dot-square icon" />
                Comment
              </td>
              <td colspan="11">
                {{ progressForm.remarks }}
              </td>
            </tr>
            <!--<tr v-if="progressFiles.length==0">
                <td v-for="(item,key) in progressForm.product_type" :key="key">
                    <div class="files-wrapper">
                        <div class="label">
                            <i class="el-icon-folder icon"></i> 
                            {{ item }}
                        </div>
                        <div v-if="cnOperate" class="card-btn animate" @click="handleUpload(item)">
                            <i class="el-icon-upload2"></i> 
                            Upload
                        </div>
                    </div>
                </td>
            </tr>-->
            <template v-if="viewingType == '2D'">
              <tr
                v-for="(item, key) in progressForm.product_type"
                :key="key"
                colspan="12"
              >
                <td>
                  <div class="files-wrapper">
                    <div class="label">
                      <i class="el-icon-folder icon" />
                      {{ item }}
                    </div>
                    <div
                      v-if="showQuoteFileUpload && projectForm.archiving == 0 && currentPhase.archiving == 0"
                      class="card-btn animate"
                      @click="handleUpload(item)"
                    >
                      <i class="el-icon-upload2" />
                      Upload
                    </div>
                  </div>
                </td>
                <td colspan="11">
                  <template v-if="showQuoteFilesArea">
                    <div
                      v-for="(childItem, childKey) in progressFiles"
                      :key="childKey"
                    >
                      <div v-if="childItem.type == item">
                        <div
                          v-if="
                            childItem.files &&
                              childItem.files != ''
                          "
                          class="progress-file-wrapper"
                        >
                          <div class="file-item version">
                            V{{ childItem.version }}
                            <span v-if="childItem.win == 1"><img
                              style="width: 14px; height: 14px"
                              src="@/assets/IconDesigns/icon_crown.png"
                              alt="crown"
                            ></span>
                          </div>
                          <div class="file-item file-name">
                            <div class="label">
                              Quote file:
                            </div>
                            <div
                              class="name"
                              style="display: flex; align-items: center; justify-content: center;"
                            >
                              {{ (childItem.files[0]).name }}
                            </div>
                            <div style="display: flex; justify-content: center; align-items: center; gap: 2px; margin-left: 10px; margin-top: 4px">
                              <span @click.stop="handleViewFile((childItem.files[0]))"><i
                                class="el-icon-view table-icon animate"
                                @click=""
                              /></span>
                              <span
                                @click.stop="viewFile((childItem.files[0]), item)
                                "
                              ><img
                                src="@/assets/IconDesigns/download.png"
                                style="width:14px; height: 14px"
                                alt="view file"
                              ></span>
                            </div>
                          </div>
                          <div class="file-item price">
                            Total price($):
                            {{ Number(childItem.total_price).toLocaleString() }}
                          </div>
                          <div class="file-item price">
                            Per watt price($):
                            {{ childItem.per_watt_price }}
                          </div>
                          <div class="file-item creator">
                            Creator:
                            {{ childItem.creation_name }}
                          </div>
                          <div class="file-item time">
                            Time:
                            {{ transFormat(childItem.created_at, "time") }}
                          </div>
                          <div
                            v-if="userLimits.quote_file_upload && currentPhase.archiving ==0"
                            class="file-item action"
                          >
                            <i
                              v-if="showQuoteFileUpload"
                              class="el-icon-delete icon"
                              @click="handleDeleteProgressFile(childItem)"
                            />
                          </div>
                        </div>
                        <div
                          v-if="
                            childItem.circuit_map_file &&
                              childItem.circuit_map_file != ''
                          "
                          class="progress-file-wrapper"
                        >
                          <div class="file-item version" />
                          <div class="file-item file-name">
                            <div class="label">
                              Circuit map file:
                            </div>
                            <div
                              class="name"
                              @click="viewFile(childItem.circuit_map_file)"
                            >
                              {{ childItem.circuit_map_file.name }}
                            </div>
                          </div>
                          <div class="file-item price" />
                          <div class="file-item price" />
                          <div class="file-item creator" />
                          <div class="file-item time" />
                          <div class="file-item action" />
                        </div>
                        <div>
                          <div
                            v-for="(othertem, index) in childItem.other_files"
                            :key="'other_files' + index"
                            class="progress-file-wrapper"
                          >
                            <div class="file-item version" />
                            <div class="file-item file-name">
                              <div class="label">
                                Other files:
                              </div>
                              <div
                                class="name"
                                @click="viewFile(othertem)"
                              >
                                {{ othertem.name }}
                              </div>
                              <div style="display: flex; justify-content: center; align-items: center; gap: 2px; margin-left: 10px; margin-top: 4px">
                                <span @click.stop="handleViewFile(JSON.parse(childItem.quotation_file))"><i
                                  class="el-icon-view table-icon animate"
                                  @click=""
                                /></span>
                                <span
                                  @click.stop="viewFile(JSON.parse(childItem.quotation_file), item)
                                  "
                                ><img
                                  src="@/assets/IconDesigns/download.png"
                                  style="width:14px; height: 14px"
                                  alt="view file"
                                ></span>
                              </div>
                            </div>
                            <div class="file-item price-block" />
                            <div class="file-item creator" />
                            <div class="file-item time" />
                            <div class="file-item action" />
                          </div>
                        </div>
                      </div>
                    </div>
                  </template>
                </td>
              </tr>
            </template>
            <template v-if="viewingType == '3D'">
              <tr colspan="12">
                <td colspan="12">
                  <i
                    class="el-icon-folder-opened"
                    style="margin-right: 3px"
                  />
                  <span>3D calculation files</span>
                </td>  
              </tr>
              <tr colspan="12">
                <td
                  colspan="1"
                  class="threeD-file-upload-td"
                >
                  <span>3D display file</span>
                  <div
                    v-if="show3DCalculationFileUpload"
                    class="card-btn animate"
                    @click="showFileUpload('3D display file', 'calculation')"
                  >
                    <i class="el-icon-upload2" />
                    Upload
                  </div>
                </td>
                <td colspan="11">
                  <div
                    v-for="(childItem, index) in calDisplayFiles"
                    :key="index"
                  >
                    <div v-if="childItem">
                      <div
                        v-if="
                          childItem &&
                            childItem.name
                        "
                        class="progress-file-wrapper"
                      >
                        <div class="file-item file-name">
                          <div
                            class="name"
                            style="display: flex; align-items: center; justify-content: center;"
                          > 
                            <span class="file-operate-icon">
                              <i class="el-icon-document-checked" />
                            </span>
                            {{ (childItem).name }}
                          </div>
                          <div style="display: flex; justify-content: center; align-items: center; gap: 4px; margin-left: 10px;">
                            <span
                              class="files-operate-icon"
                              @click.stop="handleViewFile((childItem))"
                            ><i class="el-icon-view table-icon animate" /></span>
                            <span
                              class="files-operate-icon"
                              @click.stop="viewFile(childItem)
                              "
                            ><img
                              src="@/assets/IconDesigns/download.png"
                              style="width:14px; height: 14px"
                              alt="view file"
                            ></span>
                            <span
                              v-if="currentPhase.archiving ==0"
                              class="files-operate-icon"
                            >
                              <i
                                v-if="show3DCalculationFileUpload"
                                class="el-icon-delete icon"
                                @click="removeSingleProgressFile(childItem)"
                              />
                            </span>
                          </div>
                        </div>
                        <div
                          class="file-item creator"
                          style="flex: 1"
                        >
                          Creator:
                          {{ childItem.creation_name }}
                        </div>
                        <div class="file-item time">
                          Time:
                          {{ transFormat(childItem.created_at, "time") }}
                        </div>
                      </div>
                    </div>
                  </div>
                </td>
              </tr>
              <tr colspan="12">
                <td
                  colspan="1"
                  class="threeD-file-upload-td"
                >
                  <span>3D video</span>
                  <div
                    v-if="show3DCalculationFileUpload"
                    class="card-btn animate"
                    @click="showFileUpload('3D video', 'calculation')"
                  >
                    <i class="el-icon-upload2" />
                    Upload
                  </div>
                </td>
                <td colspan="11">        
                  <div
                    v-for="(childItem, index) in calVideoFiles"
                    :key="index"
                  >
                    <div v-if="childItem">
                      <div
                        v-if="
                          childItem &&
                            childItem.name
                        "
                        class="progress-file-wrapper"
                      >
                        <div class="file-item file-name">
                          <div
                            class="name"
                            style="display: flex; align-items: center; justify-content: center;"
                          > 
                            <span class="file-operate-icon">
                              <i class="el-icon-document-checked" />
                            </span>
                            {{ (childItem).name }}
                          </div>
                          <div style="display: flex; justify-content: center; align-items: center; gap: 4px; margin-left: 10px;">
                            <span
                              class="files-operate-icon"
                              @click.stop="handleViewFile((childItem))"
                            ><i class="el-icon-view table-icon animate" /></span>
                            <span
                              class="files-operate-icon"
                              @click.stop="viewFile(childItem)
                              "
                            ><img
                              src="@/assets/IconDesigns/download.png"
                              style="width:14px; height: 14px"
                              alt="view file"
                            ></span>
                            <span
                              v-if="currentPhase.archiving ==0"
                              class="files-operate-icon"
                            >
                              <i
                                v-if="show3DCalculationFileUpload"
                                class="el-icon-delete icon"
                                @click="removeSingleProgressFile(childItem)"
                              />
                            </span>
                          </div>
                        </div>
                        <div
                          class="file-item creator"
                          style="flex: 1"
                        >
                          Creator:
                          {{ childItem.creation_name }}
                        </div>
                        <div class="file-item time">
                          Time:
                          {{ transFormat(childItem.created_at, "time") }}
                        </div>
                      </div>
                    </div>
                  </div>      
                </td>
              </tr>
              <tr colspan="12">
                <td
                  colspan="1"
                  class="threeD-file-upload-td"
                >
                  <span>Calculation file</span>
                  <div
                    v-if="show3DCalculationFileUpload"
                    class="card-btn animate"
                    @click="showFileUpload('Calculation file', 'calculation')"
                  >
                    <i class="el-icon-upload2" />
                    Upload
                  </div>
                </td>
                <td colspan="11">
                  <div
                    v-for="(childItem, index) in calculationFiles"
                    :key="index"
                  >
                    <div v-if="childItem">
                      <div
                        v-if="
                          childItem &&
                            childItem.name
                        "
                        class="progress-file-wrapper"
                      >
                        <div class="file-item file-name">
                          <div
                            class="name"
                            style="display: flex; align-items: center; justify-content: center;"
                          > 
                            <span class="file-operate-icon">
                              <i class="el-icon-document-checked" />
                            </span>
                            {{ (childItem).name }}
                          </div>
                          <div style="display: flex; justify-content: center; align-items: center; gap: 4px; margin-left: 10px;">
                            <span
                              class="files-operate-icon"
                              @click.stop="handleViewFile((childItem))"
                            ><i class="el-icon-view table-icon animate" /></span>
                            <span
                              class="files-operate-icon"
                              @click.stop="viewFile(childItem)
                              "
                            ><img
                              src="@/assets/IconDesigns/download.png"
                              style="width:14px; height: 14px"
                              alt="view file"
                            ></span>
                            <span
                              v-if="currentPhase.archiving ==0"
                              class="files-operate-icon"
                            >
                              <i
                                v-if="show3DCalculationFileUpload"
                                class="el-icon-delete icon"
                                @click="removeSingleProgressFile(childItem)"
                              />
                            </span>
                          </div>
                        </div>
                        <div
                          class="file-item creator"
                          style="flex: 1"
                        >
                          Creator:
                          {{ childItem.creation_name }}
                        </div>
                        <div class="file-item time">
                          Time:
                          {{ transFormat(childItem.created_at, "time") }}
                        </div>
                      </div>
                    </div>
                  </div>
                </td>
              </tr>
              <tr colspan="12">
                <td
                  colspan="1"
                  class="threeD-file-upload-td"
                >
                  <span>Other files</span>
                  <div
                    v-if="show3DCalculationFileUpload"
                    class="card-btn animate"
                    @click="showFileUpload('Other files', 'calculation')"
                  >
                    <i class="el-icon-upload2" />
                    Upload
                  </div>
                </td>
                <td colspan="11">
                  <div
                    v-for="(childItem, index) in calOtherFiles"
                    :key="index"
                  >
                    <div v-if="childItem">
                      <div
                        v-if="
                          childItem &&
                            childItem.name
                        "
                        class="progress-file-wrapper"
                      >
                        <div class="file-item file-name">
                          <div
                            class="name"
                            style="display: flex; align-items: center; justify-content: center;"
                          > 
                            <span class="file-operate-icon">
                              <i class="el-icon-document-checked" />
                            </span>
                            {{ (childItem).name }}
                          </div>
                          <div style="display: flex; justify-content: center; align-items: center; gap: 4px; margin-left: 10px;">
                            <span
                              class="files-operate-icon"
                              @click.stop="handleViewFile((childItem))"
                            ><i class="el-icon-view table-icon animate" /></span>
                            <span
                              class="files-operate-icon"
                              @click.stop="viewFile(childItem)
                              "
                            ><img
                              src="@/assets/IconDesigns/download.png"
                              style="width:14px; height: 14px"
                              alt="view file"
                            ></span>
                            <span
                              v-if="currentPhase.archiving ==0"
                              class="files-operate-icon"
                            >
                              <i
                                v-if="show3DCalculationFileUpload"
                                class="el-icon-delete icon"
                                @click="removeSingleProgressFile(childItem)"
                              />
                            </span>
                          </div>
                        </div>
                        <div
                          class="file-item creator"
                          style="flex: 1"
                        >
                          Creator:
                          {{ childItem.creation_name }}
                        </div>
                        <div class="file-item time">
                          Time:
                          {{ transFormat(childItem.created_at, "time") }}
                        </div>
                      </div>
                    </div>
                  </div>
                </td>
              </tr>
            </template>
          </table>
          <!--<div class="card-btn animate record-btn" @click="viewProgressRecord">
              <i class="el-icon-setting"></i>
              Edit Record
          </div>
          <div v-if="progressRecordShow" class="edit-record-container">
              <div class="edit-record-item">
                  <div class="info">
                      <div class="edit-record-line"></div>
                      <div class="date">2023-04-07</div>
                      <div class="name">JU Cai</div>
                  </div>
                  <div class="content">修改了</div>
              </div>
          </div>-->
        </div>
      </div>
      <!-- 如果一个Phase也不存在，显示暂无数据 -->
      <!-- <div
        v-if="progressList.length === 0 && !userLimits.phase_add"
        class="progress-container"
      >
        <div class="no-data-wrapper animate">
          <img src="@/assets/image/noOrder.png" alt="" />
        </div>
      </div> -->
      <div
        v-show="userLimits && userLimits.workflow_view && projectForm.archiving == 0 && currentPhase.archiving == 0 && viewingType == '2D'"
        class="operation-process-container"
      >
        <!--操作流程-->
        <Process
          :progress-detail-for-process="progressDetailForProcess"
          :label-status="labelStatus"
          process-type="Formal"
          @progress="getProgressStatus"
          @email-sent-and-progress-status-changed="refreshUpdates"
        />
      </div>
      <!-- Bidding项目中，3D的操作流程 -->
      <div
        v-show="d3UserLimits && d3UserLimits.view_workflow && projectForm.archiving != 1 && currentPhase.archiving != 1 && viewingType == '3D'"
        class="operation-process-container"
      >
        <!--操作流程-->
        <CalculationProcess
          :progress-detail-for-process="progressDetailForProcess"
          process-type="3d-formal"
          @progress="getProgressStatus"
          @email-sent-and-progress-status-changed="refreshUpdates"
        />
      </div>
      <CommentsAndUpdates
        v-if="progressList.length > 0"
        ref="commentsAndUpdates"
        :progress-id="activeProgress"
        :query-type="updatesType"
        @expand="handleExpand"
      />
      <!-- Simulation Section -->
      <template v-if="projectForm.simulation_phase_id">
        <div
          class="card-header"
          style="margin-top: 55px"
        >
          <div class="card-title-wrapper">
            <div class="title-line" />
            <div class="card-title">
              3D simulation
            </div>
          </div>
        </div>
      
        <div
          v-if="simuPhaseDetail.id"
          class="progress-container"
        >
          <div class="tab-container">
            <div class="tab-wrapper">
              <div class="tab-item animate">
                {{ simuPhaseDetail.version }}
              </div>
            </div>
          </div>
          <div class="progress-wrapper">
            <table style="width: 100%; border-collapse: collapse">
              <tr colspan="12">
                <td
                  class="label"
                  colspan="1"
                >
                  <i class="el-icon-discover icon" />
                  Simulation status
                </td>
                <td colspan="2">
                  {{
                    simuStatus === "SIM_CN_REJECTED"
                      ? projectForm.simulation_status_label + `(${simuPhaseDetail.sim_reject_reason || 'Others'})`
                      : projectForm.simulation_status_label
                  }}
                </td>
                <td
                  class="label"
                  colspan="1"
                >
                  <i class="el-icon-data-analysis icon" />
                  Phase
                </td>
                <td colspan="2">
                  {{ simuPhaseDetail.progress }}
                </td>
                <!-- customer due date -->
                <td
                  class="label"
                  style="display: flex; align-items: center; justify-content:flex-start; gap: 3px"
                  colspan="1"
                >
                  Simulation due date
                  <ClockTag
                    v-if="judgeDisplayClock('formal_project', projectForm.simulation_status_label)"
                    :due-date="simuInternalDuedate"
                  />
                </td>
                <td colspan="2">
                  {{ simuInternalDuedate ? simuInternalDuedate : '' }}
                </td>
                <!-- customer due date -->
                <td
                  class="label"
                  style="display: flex; align-items: center; justify-content:flex-start; gap: 3px"
                  colspan="1"
                >
                  Simulation team due date
                  <ClockTag
                    v-if="judgeDisplayClock('formal_project', projectForm.simulation_status_label)"
                    :due-date="simuTeamDuedate"
                  />
                </td>
                <td colspan="2">
                  {{ simuTeamDuedate ? simuTeamDuedate : '' }}
                </td>
              </tr>
              <tr>
                <td
                  colspan="12"
                  class="label"
                >
                  <div v-if="simuSeriesList.length == 0">
                    <i class="el-icon-connection icon" />
                    Configuration
                  </div>
                  <div v-else>
                    <div class="series-navbar-container">
                      <div class="series-navbar-wrapper">
                        <i class="el-icon-connection icon" />
                        <div
                          v-for="(item, key) in simuSeriesList"
                          :key="key"
                          :class="activeSeries == item.id
                            ? 'tab-item active animate'
                            : 'tab-item animate'
                          "
                          @click="handleSeriesTab(item)"
                        >
                          Configuration {{ item.version }}
                        </div>
                      </div>
                    </div>
                  </div>
                </td>
              </tr>
              <tr>
                <td
                  colspan="12"
                  style="padding: 0 0 10px"
                >
                  <div
                    v-if="simuSeriesList.length != 0"
                    class="ports-container"
                  >
                    <div class="ports-tab-container">
                      <div
                        v-for="(item, key) in serlesNavbar"
                        :key="key"
                        :class="activePortsTab == item.id
                          ? 'tab-item animate active'
                          : 'tab-item animate'
                        "
                        @click="handlePortsTab(item.id)"
                      >
                        {{ item.label }}
                        <div
                          v-if="item.id == 'solar'"
                          class="navbar-more animate"
                          @click="viewMore"
                        >
                          <i class="el-icon-view" />
                        </div>
                        <div
                          v-if="activePortsTab == item.id"
                          class="line"
                        />
                      </div>
                    </div>
                    <!--Solar Modular-->
                    <div
                      v-if="activePortsTab == 'solar'"
                      class="ports-wrapper"
                    >
                      <div class="item">
                        <div class="ports-label">
                          Manufacturer:
                        </div>
                        <div class="ports-value">
                          {{ solarForm.manufacturer }}
                        </div>
                      </div>
                      <div class="item">
                        <div class="ports-label">
                          Module series:
                        </div>
                        <div class="ports-value">
                          {{ solarForm.module_type }}
                        </div>
                      </div>
                      <div class="item">
                        <div class="ports-label">
                          Bifacial:
                        </div>
                        <div class="ports-value">
                          {{ solarForm.bifacial_gain ? "Yes" : "N/A" }}
                        </div>
                      </div>
                      <div class="item">
                        <div class="ports-label">
                          Model:
                        </div>
                        <div class="ports-value">
                          {{ solarForm.model }}
                        </div>
                      </div>
                      <div
                        v-if="moreSolar"
                        class="ports-mode"
                      >
                        <el-divider content-position="left">
                          Mechanical Parameters
                        </el-divider>
                      </div>
                      <div
                        v-if="moreSolar"
                        class="item"
                      >
                        <div class="ports-label">
                          Cell type:
                        </div>
                        <div class="ports-value">
                          {{ solarForm.cell_orientation }}
                        </div>
                      </div>
                      <div class="item">
                        <div class="ports-label">
                          Junction box location:
                        </div>
                        <div class="ports-value">
                          {{ solarForm.junction_box_location }}
                        </div>
                      </div>
                      <div class="item">
                        <div class="ports-label">
                          Connector:
                          <div
                            v-if="seriesForm.connector_confirm == 1"
                            class="comfirm-icon"
                          >
                            <i class="el-icon-circle-check icon" />
                          </div>
                        </div>
                        <div class="ports-value">
                          <!-- <span
                          v-for="(item, key) in seriesForm.connector"
                          :key="key"
                        >
                          {{ item }}
                        </span> -->
                          {{ seriesForm.connector }}
                        </div>
                      </div>
                      <div class="item">
                        <div class="ports-label">
                          Output cable-positive (mm):
                          <div
                            v-if="seriesForm.output_cable_pos_confirm == 1"
                            class="comfirm-icon"
                          >
                            <i class="el-icon-circle-check icon" />
                          </div>
                        </div>
                        <div class="ports-value">
                          {{ seriesForm.output_cable_pos }}
                        </div>
                      </div>
                      <div class="item">
                        <div class="ports-label">
                          Output cable-negative (mm):
                          <div
                            v-if="seriesForm.output_cable_neg_confirm == 1"
                            class="comfirm-icon"
                          >
                            <i class="el-icon-circle-check icon" />
                          </div>
                        </div>
                        <div class="ports-value">
                          {{ seriesForm.output_cable_neg }}
                        </div>
                      </div>
                      <div
                        v-if="moreSolar"
                        class="item"
                      >
                        <div class="ports-label">
                          Glass:
                        </div>
                        <div class="ports-value">
                          {{ solarForm.glass }}
                        </div>
                      </div>
                      <div
                        v-if="moreSolar"
                        class="item"
                      >
                        <div class="ports-label">
                          Frame:
                        </div>
                        <div class="ports-value">
                          {{ solarForm.frame }}
                        </div>
                      </div>
                      <div
                        v-if="moreSolar"
                        class="item"
                      >
                        <div class="ports-label">
                          Weight (kg):
                        </div>
                        <div class="ports-value">
                          {{ solarForm.weight }}
                        </div>
                      </div>
                      <div class="item">
                        <div class="ports-label">
                          Width (mm):
                        </div>
                        <div class="ports-value">
                          {{ solarForm.width }}
                        </div>
                      </div>
                      <div class="item">
                        <div class="ports-label">
                          Height (mm):
                        </div>
                        <div class="ports-value">
                          {{ solarForm.height }}
                        </div>
                      </div>
                      <div
                        v-if="moreSolar"
                        class="item"
                      >
                        <div class="ports-label">
                          Thickness (mm):
                        </div>
                        <div class="ports-value">
                          {{ solarForm.thickness }}
                        </div>
                      </div>
                      <div
                        v-if="moreSolar"
                        class="ports-mode"
                      >
                        <el-divider content-position="left">
                          Electrical characteristics (STC:AM1.5 1000W/m²
                          25℃)
                        </el-divider>
                      </div>
                      <div class="item">
                        <div class="ports-label">
                          Maximum power (Pmax/W):
                        </div>
                        <div class="ports-value">
                          {{ solarForm.maximum_power }}
                        </div>
                      </div>
                      <div class="item">
                        <div class="ports-label">
                          Open circuit voltage (Voc/V):
                        </div>
                        <div class="ports-value">
                          {{ solarForm.open_circuit_voltage }}
                        </div>
                      </div>
                      <div class="item">
                        <div class="ports-label">
                          Short circuit current (Isc/A):
                        </div>
                        <div class="ports-value">
                          {{ solarForm.short_circuit_current }}
                        </div>
                      </div>
                      <div
                        v-if="moreSolar"
                        class="item"
                      >
                        <div class="ports-label">
                          Voltage at maximum power (Vmp/V):
                        </div>
                        <div class="ports-value">
                          {{ solarForm.voltage_at_maximum_power }}
                        </div>
                      </div>
                      <div
                        v-if="moreSolar"
                        class="item"
                      >
                        <div class="ports-label">
                          Current at maximum power (Imp/A):
                        </div>
                        <div class="ports-value">
                          {{ solarForm.current_at_maximum_power }}
                        </div>
                      </div>
                      <div
                        v-if="moreSolar"
                        class="item"
                      >
                        <div class="ports-label">
                          Module efficiency (%):
                        </div>
                        <div class="ports-value">
                          {{ solarForm.module_efficiency }}
                        </div>
                      </div>
                      <div
                        v-if="moreSolar"
                        class="ports-mode"
                      >
                        <el-divider content-position="left">
                          Operating parameters
                        </el-divider>
                      </div>
                      <div
                        v-if="moreSolar"
                        class="item"
                      >
                        <div class="ports-label">
                          Operational temperature (℃):
                        </div>
                        <div class="ports-value">
                          {{ solarForm.operational_temperature }}
                        </div>
                      </div>
                      <div
                        v-if="moreSolar"
                        class="item"
                      >
                        <div class="ports-label">
                          Power output tolerance (W):
                        </div>
                        <div class="ports-value">
                          {{ solarForm.power_output_tolerance }}
                        </div>
                      </div>
                      <div
                        v-if="moreSolar"
                        class="item"
                      >
                        <div class="ports-label">
                          Voc and isc tolerance (%):
                        </div>
                        <div class="ports-value">
                          {{ solarForm.voc_and_isc_tolerance }}
                        </div>
                      </div>
                      <div
                        v-if="moreSolar"
                        class="item"
                      >
                        <div class="ports-label">
                          Maximum system voltage (V):
                        </div>
                        <div class="ports-value">
                          {{ solarForm.maximum_system_voltage }}
                        </div>
                      </div>
                      <div class="item">
                        <div class="ports-label">
                          Maximum configuration fuse rating (A):
                        </div>
                        <div class="ports-value">
                          {{ solarForm.maximum_series_fuse_rating }}
                        </div>
                      </div>
                      <div
                        v-if="moreSolar"
                        class="item"
                      >
                        <div class="ports-label">
                          Nominal operating cell temperature (℃):
                        </div>
                        <div class="ports-value">
                          {{ solarForm.nominal_operating_cell_temperature }}
                        </div>
                      </div>
                      <div
                        v-if="moreSolar"
                        class="item"
                      >
                        <div class="ports-label">
                          Protection class:
                        </div>
                        <div class="ports-value">
                          {{ solarForm.protection_class }}
                        </div>
                      </div>
                      <div
                        v-if="moreSolar"
                        class="item"
                      >
                        <div class="ports-label">
                          Fire rating:
                        </div>
                        <div class="ports-value">
                          {{ solarForm.fire_rating }}
                        </div>
                      </div>
                      <div class="item">
                        <div class="ports-label">
                          Bifacial gain (%):
                        </div>
                        <div class="ports-value">
                          {{ solarForm.bifacial_gain }}
                        </div>
                      </div>
                      <div
                        v-if="moreSolar"
                        class="ports-mode"
                      >
                        <el-divider content-position="left">
                          Mechanical loading
                        </el-divider>
                      </div>
                      <div
                        v-if="moreSolar"
                        class="item"
                      >
                        <div class="ports-label">
                          Front side maximum static loading (Pa):
                        </div>
                        <div class="ports-value">
                          {{ solarForm.front_side_maximum_static_loading }}
                        </div>
                      </div>
                      <div
                        v-if="moreSolar"
                        class="item"
                      >
                        <div class="ports-label">
                          Rear side maximum static loading (Pa):
                        </div>
                        <div class="ports-value">
                          {{ solarForm.rear_side_maximum_static_loading }}
                        </div>
                      </div>
                      <div
                        v-if="moreSolar"
                        class="item"
                      >
                        <div class="ports-label">
                          Hailstone Test:
                        </div>
                        <div class="ports-value">
                          {{ solarForm.hailstone_test }}
                        </div>
                      </div>
                      <div
                        v-if="moreSolar"
                        class="ports-mode"
                      >
                        <el-divider content-position="left">
                          Temperature ratings (STC)
                        </el-divider>
                      </div>
                      <div
                        v-if="moreSolar"
                        class="item"
                      >
                        <div class="ports-label">
                          Temperature coefficient of isc (%/℃):
                        </div>
                        <div class="ports-value">
                          {{ solarForm.temperature_coefficient_of_isc }}
                        </div>
                      </div>
                      <div
                        v-if="moreSolar"
                        class="item"
                      >
                        <div class="ports-label">
                          Temperature coefficient of voc (%/℃):
                        </div>
                        <div class="ports-value">
                          {{ solarForm.temperature_coefficient_of_voc }}
                        </div>
                      </div>
                      <div
                        v-if="moreSolar"
                        class="item"
                      >
                        <div class="ports-label">
                          Temperature coefficient of pmax (%/℃):
                        </div>
                        <div class="ports-value">
                          {{ solarForm.temperature_coefficient_of_pmax }}
                        </div>
                      </div>
                    </div>
                    <!--Racking/Tracker-->
                    <div
                      v-if="activePortsTab == 'tracker'"
                      class="ports-wrapper"
                    >
                      <div class="item">
                        <div class="ports-label">
                          Manufacturer:
                        </div>
                        <div class="ports-value">
                          {{ trackerForm.manufacturer }}
                        </div>
                      </div>
                      <div class="item">
                        <div class="ports-label">
                          Configuration:
                        </div>
                        <div class="ports-value">
                          {{ trackerForm.series }}
                        </div>
                      </div>
                      <div class="item">
                        <div class="ports-label">
                          BHA gap width (ft):
                          <div
                            v-if="seriesForm.bha_gap_width_confirm == 1"
                            class="comfirm-icon"
                          >
                            <i class="el-icon-circle-check icon" />
                          </div>
                        </div>
                        <div class="ports-value">
                          {{ seriesForm.bha_gap_width }}
                        </div>
                      </div>
                      <div class="item">
                        <div class="ports-label">
                          Motor gap width (ft):
                          <div
                            v-if="seriesForm.motor_gap_width_confirm == 1"
                            class="comfirm-icon"
                          >
                            <i class="el-icon-circle-check icon" />
                          </div>
                        </div>
                        <div class="ports-value">
                          {{ seriesForm.motor_gap_width }}
                        </div>
                      </div>
                      <div class="item">
                        <div class="ports-label">
                          Maximum pier height (ft):
                          <div
                            v-if="seriesForm.maximum_pier_height_confirm == 1"
                            class="comfirm-icon"
                          >
                            <i class="el-icon-circle-check icon" />
                          </div>
                        </div>
                        <div class="ports-value">
                          {{ seriesForm.maximum_pier_height }}
                        </div>
                      </div>
                      <div class="item">
                        <div class="ports-label">
                          Pile position:
                          <div
                            v-if="seriesForm.pile_position_confirm == 1"
                            class="comfirm-icon"
                          >
                            <i class="el-icon-circle-check icon" />
                          </div>
                        </div>
                        <div class="ports-value">
                          {{ seriesForm.pile_position }}
                        </div>
                      </div>
                    </div>
                    <!--Combination parameter-->
                    <div
                      v-if="activePortsTab == 'combination'"
                      class="ports-wrapper"
                    >
                      <div class="item">
                        <div class="ports-label">
                          Module to module spacing (mm):
                          <div
                            v-if="seriesForm.module_to_module_spacing_confirm == 1
                            "
                            class="comfirm-icon"
                          >
                            <i class="el-icon-circle-check icon" />
                          </div>
                        </div>
                        <div class="ports-value">
                          {{ seriesForm.module_to_module_spacing }}
                        </div>
                      </div>
                      <div class="item">
                        <div class="ports-label">
                          BHA gap extender (ft):
                          <div
                            v-if="seriesForm.bha_gap_extender_confirm == 1"
                            class="comfirm-icon"
                          >
                            <i class="el-icon-circle-check icon" />
                          </div>
                        </div>
                        <div class="ports-value">
                          {{ seriesForm.bha_gap_extender }}
                        </div>
                      </div>
                      <div class="item">
                        <div class="ports-label">
                          Motor gap extender (ft):
                          <div
                            v-if="seriesForm.bha_gap_width_confirm == 1"
                            class="comfirm-icon"
                          >
                            <i class="el-icon-circle-check icon" />
                          </div>
                        </div>
                        <div class="ports-value">
                          {{ seriesForm.bha_gap_width }}
                        </div>
                      </div>
                      <div class="item">
                        <div class="ports-label">
                          Number of modules per string (pcs):
                          <div
                            v-if="seriesForm.of_modules_per_string_confirm == 1"
                            class="comfirm-icon"
                          >
                            <i class="el-icon-circle-check icon" />
                          </div>
                        </div>
                        <div class="ports-value">
                          {{ seriesForm.of_modules_per_string }}
                        </div>
                      </div>
                      <div class="item">
                        <div class="ports-label">
                          Row to row spacing (ft):
                          <div
                            v-if="seriesForm.row_to_row_spacing_confirm == 1"
                            class="comfirm-icon"
                          >
                            <i class="el-icon-circle-check icon" />
                          </div>
                        </div>
                        <div class="ports-value">
                          {{ seriesForm.row_to_row_spacing }}
                        </div>
                      </div>
                      <div class="item">
                        <div class="ports-label">
                          Number of modules per tracker (pcs):
                          <div
                            v-if="seriesForm.modules_per_tracker_confirm == 1"
                            class="comfirm-icon"
                          >
                            <i class="el-icon-circle-check icon" />
                          </div>
                        </div>
                        <div class="ports-value">
                          {{ seriesForm.modules_per_tracker }}
                        </div>
                      </div>
                      <div class="item">
                        <div class="ports-label">
                          Maximum current factor:
                          <div
                            v-if="seriesForm.maximum_current_factor_confirm == 1"
                            class="comfirm-icon"
                          >
                            <i class="el-icon-circle-check icon" />
                          </div>
                        </div>
                        <div class="ports-value">
                          {{ seriesForm.maximum_current_factor }}
                        </div>
                      </div>
                      <div class="item">
                        <div class="ports-label">
                          Overload protection factor:
                          <div
                            v-if="seriesForm.overload_protection_factor_confirm == 1
                            "
                            class="comfirm-icon"
                          >
                            <i class="el-icon-circle-check icon" />
                          </div>
                        </div>
                        <div class="ports-value">
                          {{ seriesForm.overload_protection_factor }}
                        </div>
                      </div>
                      <div class="item">
                        <div class="ports-label">
                          Maximum overload protection current (A):
                          <div
                            v-if="seriesForm.maximum_overload_protection_current_confirm ==
                              1
                            "
                            class="comfirm-icon"
                          >
                            <i class="el-icon-circle-check icon" />
                          </div>
                        </div>
                        <div class="ports-value">
                          {{ seriesForm.maximum_overload_protection_current }}
                        </div>
                      </div>
                      <div class="item">
                        <div class="ports-label">
                          Module connection*N:
                          <div
                            v-if="seriesForm.module_connection_confirm == 1"
                            class="comfirm-icon"
                          >
                            <i class="el-icon-circle-check icon" />
                          </div>
                        </div>
                        <div class="ports-value">
                          <span
                            v-for="(item, key) in seriesForm.module_connection"
                            :key="key"
                          >
                            {{ item }}
                          </span>
                        </div>
                      </div>
                      <div class="item">
                        <div class="ports-label">
                          Module orientation:
                          <div
                            v-if="seriesForm.module_orientation_confirm == 1"
                            class="comfirm-icon"
                          >
                            <i class="el-icon-circle-check icon" />
                          </div>
                        </div>
                        <div class="ports-value">
                          {{ seriesForm.module_orientation }}
                        </div>
                      </div>
                      <div class="item">
                        <div class="ports-label">
                          Messenger wire or Trench:
                          <div
                            v-if="seriesForm.cab_or_trench_confirm == 1"
                            class="comfirm-icon"
                          >
                            <i class="el-icon-circle-check icon" />
                          </div>
                        </div>
                        <div class="ports-value">
                          {{
                            seriesForm.cab_or_trench === "CAB"
                              ? "Messenger wire"
                              : seriesForm.cab_or_trench
                          }}
                        </div>
                      </div>
                      <div class="item">
                        <div class="ports-label">
                          CBX outlet length (ft):
                          <div
                            v-if="seriesForm.cbx_outlet_length_confirm == 1"
                            class="comfirm-icon"
                          >
                            <i class="el-icon-circle-check icon" />
                          </div>
                        </div>
                        <div class="ports-value">
                          {{ seriesForm.cbx_outlet_length }}
                        </div>
                      </div>
                      <div class="item">
                        <div class="ports-label">
                          CBX height (ft):
                          <div
                            v-if="seriesForm.cbx_height_confirm == 1"
                            class="comfirm-icon"
                          >
                            <i class="el-icon-circle-check icon" />
                          </div>
                        </div>
                        <div class="ports-value">
                          {{ seriesForm.cbx_height }}
                        </div>
                      </div>
                      <div class="item">
                        <div class="ports-label">
                          Distance from CBX to row head (ft):
                          <div
                            v-if="seriesForm.distance_from_cbx_to_row_head_confirm ==
                              1
                            "
                            class="comfirm-icon"
                          >
                            <i class="el-icon-circle-check icon" />
                          </div>
                        </div>
                        <div class="ports-value">
                          {{ seriesForm.distance_from_cbx_to_row_head }}
                        </div>
                      </div>
                      <div class="item">
                        <div class="ports-label">
                          <span v-if="seriesForm.cab_or_trench == 'CAB'">Hanger height:</span>
                          <span v-else>Trench depth (ft):</span>
                          <div
                            v-if="seriesForm.cab_height_or_trench_depth_confirm == 1
                            "
                            class="comfirm-icon"
                          >
                            <i class="el-icon-circle-check icon" />
                          </div>
                        </div>
                        <div class="ports-value">
                          {{ seriesForm.cab_height_or_trench_depth }}
                        </div>
                      </div>
                    </div>
                  </div>
                </td>
              </tr>
              <tr>
                <td
                  colspan="12"
                  class="label"
                >
                  <i class="el-icon-folder icon" />
                  Customer files
                </td>
              </tr>
              <tr colspan="12">
                <td
                  colspan="1"
                  class="file-label"
                >
                  Electrical drawing files
                </td>
                <td colspan="5">
                  <div
                    v-for="(item, index) in winPhaseDetail.electrical_drawing_files"
                    :key="`electrical_drawing_files-${index}`"
                    class="file-item animate"
                    :style="{ marginTop: index == 0 ? '' : '10px' }"
                  >
                    <span @click="viewFile(item)">
                      <i class="el-icon-document-checked" /> {{ item.name }}
                    </span>
                  </div>
                </td>
                <td
                  colspan="1"
                  class="file-label"
                >
                  Golden row files
                </td>
                <td colspan="5">
                  <div
                    v-for="(item, index) in winPhaseDetail.golden_row_files"
                    :key="`golden_row_files-${index}`"
                    class="file-item animate"
                    :style="{ marginTop: index == 0 ? '' : '10px' }"
                  >
                    <span @click="viewFile(item)">
                      <i class="el-icon-document-checked" /> {{ item.name }}
                    </span>
                  </div>
                </td>
              </tr>
              <tr colspan="12">
                <td
                  colspan="1"
                  class="file-label"
                >
                  Sequence file
                </td>
                <td colspan="5">
                  <div
                    v-if="winPhaseDetail.sequence_file &&
                      winPhaseDetail.sequence_file != ''
                    "
                    class="file-item"
                  >
                    <span @click="viewFile(winPhaseDetail.sequence_file)">
                      <i class="el-icon-document-checked" />
                      {{ winPhaseDetail.sequence_file.name }}
                    </span>
                  </div>
                </td>
                <td
                  colspan="1"
                  class="file-label"
                >
                  Other files
                </td>
                <td colspan="5">
                  <div
                    v-for="(item, index) in winPhaseDetail.other_files"
                    :key="`other_files-${index}`"
                    class="file-item animate"
                    :style="{ marginTop: index == 0 ? '' : '10px' }"
                  >
                    <span @click="viewFile(item)">
                      <i class="el-icon-document-checked" /> {{ item.name }}
                    </span>
                  </div>
                </td>
              </tr>
              <tr colspan="12">
                <td
                  colspan="1"
                  class="label"
                >
                  <i class="el-icon-chat-dot-square icon" />
                  Comment
                </td>
                <td colspan="11">
                  {{ winPhaseDetail.remarks }}
                </td>
              </tr>
              <tr colspan="12" /><tr colspan="12">
                <td colspan="12">
                  <i class="el-icon-folder-opened" />
                  <span>3D simulation files</span>
                </td>  
              </tr>
              <tr colspan="12">
                <td
                  colspan="1"
                  class="threeD-file-upload-td"
                >
                  <span>3D site file</span>
                  <div
                    v-if="show3DSimulationFileUpload"
                    class="card-btn animate "
                    @click="showFileUpload('3D site file', 'simulation')"
                  >
                    <i class="el-icon-upload2" />
                    Upload
                  </div>
                </td>
                <td colspan="11">
                  <div
                    v-for="(childItem, index) in simuSiteFiles"
                    :key="index"
                  >
                    <div v-if="childItem">
                      <div
                        v-if="
                          childItem &&
                            childItem.name
                        "
                        class="progress-file-wrapper"
                      >
                        <div class="file-item file-name">
                          <div
                            class="name"
                            style="display: flex; align-items: center; justify-content: center;"
                          > 
                            <span class="file-operate-icon">
                              <i class="el-icon-document-checked" />
                            </span>
                            {{ (childItem).name }}
                          </div>
                          <div style="display: flex; justify-content: center; align-items: center; gap: 4px; margin-left: 10px;">
                            <span
                              class="files-operate-icon"
                              @click.stop="handleViewFile((childItem))"
                            ><i class="el-icon-view table-icon animate" /></span>
                            <span
                              class="files-operate-icon"
                              @click.stop="viewFile(childItem)
                              "
                            ><img
                              src="@/assets/IconDesigns/download.png"
                              style="width:14px; height: 14px"
                              alt="view file"
                            ></span>
                            <span
                              v-if="currentPhase.archiving ==0"
                              class="files-operate-icon"
                            >
                              <i
                                v-if="show3DSimulationFileUpload"
                                class="el-icon-delete icon"
                                @click="removeSingleProgressFile(childItem)"
                              />
                            </span>
                          </div>
                        </div>
                        <div
                          class="file-item creator"
                          style="flex: 1"
                        >
                          Creator:
                          {{ childItem.creation_name }}
                        </div>
                        <div class="file-item time">
                          Time:
                          {{ transFormat(childItem.created_at, "time") }}
                        </div>
                      </div>
                    </div>
                  </div>
                </td>
              </tr>
              <tr colspan="12">
                <td
                  colspan="1"
                  class="threeD-file-upload-td"
                >
                  <span>3D video</span>
                  <div
                    v-if="show3DSimulationFileUpload"
                    class="card-btn animate "
                    @click="showFileUpload('3D video', 'simulation')"
                  >
                    <i class="el-icon-upload2" />
                    Upload
                  </div>
                </td>
                <td colspan="11">
                  <div
                    v-for="(childItem, index) in simuVideoFiles"
                    :key="index"
                  >
                    <div v-if="childItem">
                      <div
                        v-if="
                          childItem &&
                            childItem.name
                        "
                        class="progress-file-wrapper"
                      >
                        <div class="file-item file-name">
                          <div
                            class="name"
                            style="display: flex; align-items: center; justify-content: center;"
                          > 
                            <span class="file-operate-icon">
                              <i class="el-icon-document-checked" />
                            </span>
                            {{ (childItem).name }}
                          </div>
                          <div style="display: flex; justify-content: center; align-items: center; gap: 4px; margin-left: 10px;">
                            <span
                              class="files-operate-icon"
                              @click.stop="handleViewFile((childItem))"
                            ><i class="el-icon-view table-icon animate" /></span>
                            <span
                              class="files-operate-icon"
                              @click.stop="viewFile(childItem)
                              "
                            ><img
                              src="@/assets/IconDesigns/download.png"
                              style="width:14px; height: 14px"
                              alt="view file"
                            ></span>
                            <span
                              v-if="currentPhase.archiving ==0"
                              class="files-operate-icon"
                            >
                              <i
                                v-if="show3DSimulationFileUpload"
                                class="el-icon-delete icon"
                                @click="removeSingleProgressFile(childItem)"
                              />
                            </span>
                          </div>
                        </div>
                        <div
                          class="file-item creator"
                          style="flex: 1"
                        >
                          Creator:
                          {{ childItem.creation_name }}
                        </div>
                        <div class="file-item time">
                          Time:
                          {{ transFormat(childItem.created_at, "time") }}
                        </div>
                      </div>
                    </div>
                  </div>
                </td>
              </tr>
              <tr colspan="12">
                <td
                  colspan="1"
                  class="threeD-file-upload-td"
                >
                  <span>Other files</span>
                  <div
                    v-if="show3DSimulationFileUpload"
                    class="card-btn animate "
                    @click="showFileUpload('Other files', 'simulation')"
                  >
                    <i class="el-icon-upload2" />
                    Upload
                  </div>
                </td>
                <td colspan="11">
                  <div
                    v-for="(childItem, index) in simuOtherFiles"
                    :key="index"
                  >
                    <div v-if="childItem">
                      <div
                        v-if="
                          childItem &&
                            childItem.name
                        "
                        class="progress-file-wrapper"
                      >
                        <div class="file-item file-name">
                          <div
                            class="name"
                            style="display: flex; align-items: center; justify-content: center;"
                          > 
                            <span class="file-operate-icon">
                              <i class="el-icon-document-checked" />
                            </span>
                            {{ (childItem).name }}
                          </div>
                          <div style="display: flex; justify-content: center; align-items: center; gap: 4px; margin-left: 10px;">
                            <span
                              class="files-operate-icon"
                              @click.stop="handleViewFile((childItem))"
                            ><i class="el-icon-view table-icon animate" /></span>
                            <span
                              class="files-operate-icon"
                              @click.stop="viewFile(childItem)
                              "
                            ><img
                              src="@/assets/IconDesigns/download.png"
                              style="width:14px; height: 14px"
                              alt="view file"
                            ></span>
                            <span
                              v-if="currentPhase.archiving ==0"
                              class="files-operate-icon"
                            >
                              <i
                                v-if="show3DSimulationFileUpload"
                                class="el-icon-delete icon"
                                @click="removeSingleProgressFile(childItem)"
                              />
                            </span>
                          </div>
                        </div>
                        <div
                          class="file-item creator"
                          style="flex: 1"
                        >
                          Creator:
                          {{ childItem.creation_name }}
                        </div>
                        <div class="file-item time">
                          Time:
                          {{ transFormat(childItem.created_at, "time") }}
                        </div>
                      </div>
                    </div>
                  </div>
                </td>
              </tr>
              </tr>
              <FileUpload
                ref="3d-file-upload"
                @on-upload="handle3DfileUpload"
              />
            </table>
          </div>
        </div>

        <div
          v-else
          class="progress-container"
        >
          <div class="no-data-wrapper animate">
            <img
              src="@/assets/image/noOrder.png"
              alt=""
            >
          </div>
        </div>
        <div
          v-if="projectForm.simulation_phase_id && d3UserLimits && d3UserLimits.view_workflow"
          class="operation-process-container"
        >
          <!--操作流程-->
          <SimulationProcess
            :simu-status="simuStatus"
            :progress-detail-for-process="simuPhaseDetail"
            @progress="getProgressStatus"
            @email-sent-and-progress-status-changed="refreshUpdates"
          />
        </div>
        <CommentsAndUpdates
          ref="commentsAndUpdatesSimulation"
          :progress-id="winPhaseDetail.id"
          :query-type="6"
        />
      </template>
      <!-- Label Section -->
      <template v-if="limits.Formal_Project_Detail && limits.Formal_Project_Detail.view_label_section">
        <div
          class="card-header"
          style="margin-top: 55px"
        >
          <div class="card-title-wrapper">
            <div class="title-line" />
            <div class="card-title">
              Label
            </div>
          </div>
        </div>
      
        <div
          v-if="winPhaseDetail.id"
          class="progress-container"
        >
          <div class="tab-container">
            <div class="tab-wrapper">
              <div class="tab-item animate">
                {{ winPhaseDetail.version }}
              </div>
            </div>
          </div>
          <div class="progress-wrapper">
            <table style="width: 100%; border-collapse: collapse">
              <tr colspan="12">
                <td
                  class="label"
                  colspan="1"
                >
                  <i class="el-icon-discover icon" />
                  Label status
                </td>
                <td colspan="3">
                  {{
                    labelStatus === "FORMAL_LABEL_REJECTED"
                      ? mapStatus(labelStatus) + `(${projectForm.reason || "others"})`
                      : mapStatus(labelStatus)
                  }}
                </td>
                <td
                  class="label"
                  colspan="1"
                >
                  <i class="el-icon-data-analysis icon" />
                  Phase
                </td>
                <td colspan="3">
                  {{ winPhaseDetail.progress }}
                </td>
                <!-- customer due date -->
                <td
                  class="label"
                  style="display: flex; align-items: center; justify-content:flex-start; gap: 3px"
                  colspan="1"
                >
                  Label due date
                  <ClockTag
                    v-if="judgeDisplayClock('formal_project', mapStatus(labelStatus))"
                    :due-date="labelDuedate"
                  />
                </td>
                <td colspan="3">
                  {{ labelDuedate ? labelDuedate : '' }}
                </td>
              </tr>
              <tr>
                <td
                  colspan="12"
                  class="label"
                >
                  <div v-if="seriesList.length == 0">
                    <i class="el-icon-connection icon" />
                    Configuration
                  </div>
                  <div v-else>
                    <div class="series-navbar-container">
                      <div class="series-navbar-wrapper">
                        <i class="el-icon-connection icon" />
                        <div
                          v-for="(item, key) in seriesList"
                          :key="key"
                          :class="activeSeries == item.id
                            ? 'tab-item active animate'
                            : 'tab-item animate'
                          "
                          @click="handleSeriesTab(item)"
                        >
                          Configuration {{ item.version }}
                        </div>
                      </div>
                    </div>
                  </div>
                </td>
              </tr>
              <tr>
                <td
                  colspan="12"
                  style="padding: 0 0 10px"
                >
                  <div
                    v-if="seriesList.length != 0"
                    class="ports-container"
                  >
                    <div class="ports-tab-container">
                      <div
                        v-for="(item, key) in serlesNavbar"
                        :key="key"
                        :class="activePortsTab == item.id
                          ? 'tab-item animate active'
                          : 'tab-item animate'
                        "
                        @click="handlePortsTab(item.id)"
                      >
                        {{ item.label }}
                        <div
                          v-if="item.id == 'solar'"
                          class="navbar-more animate"
                          @click="viewMore"
                        >
                          <i class="el-icon-view" />
                        </div>
                        <div
                          v-if="activePortsTab == item.id"
                          class="line"
                        />
                      </div>
                    </div>
                    <!--Solar Modular-->
                    <div
                      v-if="activePortsTab == 'solar'"
                      class="ports-wrapper"
                    >
                      <div class="item">
                        <div class="ports-label">
                          Manufacturer:
                        </div>
                        <div class="ports-value">
                          {{ solarForm.manufacturer }}
                        </div>
                      </div>
                      <div class="item">
                        <div class="ports-label">
                          Module series:
                        </div>
                        <div class="ports-value">
                          {{ solarForm.module_type }}
                        </div>
                      </div>
                      <div class="item">
                        <div class="ports-label">
                          Bifacial:
                        </div>
                        <div class="ports-value">
                          {{ solarForm.bifacial_gain ? "Yes" : "N/A" }}
                        </div>
                      </div>
                      <div class="item">
                        <div class="ports-label">
                          Model:
                        </div>
                        <div class="ports-value">
                          {{ solarForm.model }}
                        </div>
                      </div>
                      <div
                        v-if="moreSolar"
                        class="ports-mode"
                      >
                        <el-divider content-position="left">
                          Mechanical Parameters
                        </el-divider>
                      </div>
                      <div
                        v-if="moreSolar"
                        class="item"
                      >
                        <div class="ports-label">
                          Cell type:
                        </div>
                        <div class="ports-value">
                          {{ solarForm.cell_orientation }}
                        </div>
                      </div>
                      <div class="item">
                        <div class="ports-label">
                          Junction box location:
                        </div>
                        <div class="ports-value">
                          {{ solarForm.junction_box_location }}
                        </div>
                      </div>
                      <div class="item">
                        <div class="ports-label">
                          Connector:
                          <div
                            v-if="seriesForm.connector_confirm == 1"
                            class="comfirm-icon"
                          >
                            <i class="el-icon-circle-check icon" />
                          </div>
                        </div>
                        <div class="ports-value">
                          <!-- <span
                          v-for="(item, key) in seriesForm.connector"
                          :key="key"
                        >
                          {{ item }}
                        </span> -->
                          {{ seriesForm.connector }}
                        </div>
                      </div>
                      <div class="item">
                        <div class="ports-label">
                          Output cable-positive (mm):
                          <div
                            v-if="seriesForm.output_cable_pos_confirm == 1"
                            class="comfirm-icon"
                          >
                            <i class="el-icon-circle-check icon" />
                          </div>
                        </div>
                        <div class="ports-value">
                          {{ seriesForm.output_cable_pos }}
                        </div>
                      </div>
                      <div class="item">
                        <div class="ports-label">
                          Output cable-negative (mm):
                          <div
                            v-if="seriesForm.output_cable_neg_confirm == 1"
                            class="comfirm-icon"
                          >
                            <i class="el-icon-circle-check icon" />
                          </div>
                        </div>
                        <div class="ports-value">
                          {{ seriesForm.output_cable_neg }}
                        </div>
                      </div>
                      <div
                        v-if="moreSolar"
                        class="item"
                      >
                        <div class="ports-label">
                          Glass:
                        </div>
                        <div class="ports-value">
                          {{ solarForm.glass }}
                        </div>
                      </div>
                      <div
                        v-if="moreSolar"
                        class="item"
                      >
                        <div class="ports-label">
                          Frame:
                        </div>
                        <div class="ports-value">
                          {{ solarForm.frame }}
                        </div>
                      </div>
                      <div
                        v-if="moreSolar"
                        class="item"
                      >
                        <div class="ports-label">
                          Weight (kg):
                        </div>
                        <div class="ports-value">
                          {{ solarForm.weight }}
                        </div>
                      </div>
                      <div class="item">
                        <div class="ports-label">
                          Width (mm):
                        </div>
                        <div class="ports-value">
                          {{ solarForm.width }}
                        </div>
                      </div>
                      <div class="item">
                        <div class="ports-label">
                          Height (mm):
                        </div>
                        <div class="ports-value">
                          {{ solarForm.height }}
                        </div>
                      </div>
                      <div
                        v-if="moreSolar"
                        class="item"
                      >
                        <div class="ports-label">
                          Thickness (mm):
                        </div>
                        <div class="ports-value">
                          {{ solarForm.thickness }}
                        </div>
                      </div>
                      <div
                        v-if="moreSolar"
                        class="ports-mode"
                      >
                        <el-divider content-position="left">
                          Electrical characteristics (STC:AM1.5 1000W/m²
                          25℃)
                        </el-divider>
                      </div>
                      <div class="item">
                        <div class="ports-label">
                          Maximum power (Pmax/W):
                        </div>
                        <div class="ports-value">
                          {{ solarForm.maximum_power }}
                        </div>
                      </div>
                      <div class="item">
                        <div class="ports-label">
                          Open circuit voltage (Voc/V):
                        </div>
                        <div class="ports-value">
                          {{ solarForm.open_circuit_voltage }}
                        </div>
                      </div>
                      <div class="item">
                        <div class="ports-label">
                          Short circuit current (Isc/A):
                        </div>
                        <div class="ports-value">
                          {{ solarForm.short_circuit_current }}
                        </div>
                      </div>
                      <div
                        v-if="moreSolar"
                        class="item"
                      >
                        <div class="ports-label">
                          Voltage at maximum power (Vmp/V):
                        </div>
                        <div class="ports-value">
                          {{ solarForm.voltage_at_maximum_power }}
                        </div>
                      </div>
                      <div
                        v-if="moreSolar"
                        class="item"
                      >
                        <div class="ports-label">
                          Current at maximum power (Imp/A):
                        </div>
                        <div class="ports-value">
                          {{ solarForm.current_at_maximum_power }}
                        </div>
                      </div>
                      <div
                        v-if="moreSolar"
                        class="item"
                      >
                        <div class="ports-label">
                          Module efficiency (%):
                        </div>
                        <div class="ports-value">
                          {{ solarForm.module_efficiency }}
                        </div>
                      </div>
                      <div
                        v-if="moreSolar"
                        class="ports-mode"
                      >
                        <el-divider content-position="left">
                          Operating parameters
                        </el-divider>
                      </div>
                      <div
                        v-if="moreSolar"
                        class="item"
                      >
                        <div class="ports-label">
                          Operational temperature (℃):
                        </div>
                        <div class="ports-value">
                          {{ solarForm.operational_temperature }}
                        </div>
                      </div>
                      <div
                        v-if="moreSolar"
                        class="item"
                      >
                        <div class="ports-label">
                          Power output tolerance (W):
                        </div>
                        <div class="ports-value">
                          {{ solarForm.power_output_tolerance }}
                        </div>
                      </div>
                      <div
                        v-if="moreSolar"
                        class="item"
                      >
                        <div class="ports-label">
                          Voc and isc tolerance (%):
                        </div>
                        <div class="ports-value">
                          {{ solarForm.voc_and_isc_tolerance }}
                        </div>
                      </div>
                      <div
                        v-if="moreSolar"
                        class="item"
                      >
                        <div class="ports-label">
                          Maximum system voltage (V):
                        </div>
                        <div class="ports-value">
                          {{ solarForm.maximum_system_voltage }}
                        </div>
                      </div>
                      <div class="item">
                        <div class="ports-label">
                          Maximum configuration fuse rating (A):
                        </div>
                        <div class="ports-value">
                          {{ solarForm.maximum_series_fuse_rating }}
                        </div>
                      </div>
                      <div
                        v-if="moreSolar"
                        class="item"
                      >
                        <div class="ports-label">
                          Nominal operating cell temperature (℃):
                        </div>
                        <div class="ports-value">
                          {{ solarForm.nominal_operating_cell_temperature }}
                        </div>
                      </div>
                      <div
                        v-if="moreSolar"
                        class="item"
                      >
                        <div class="ports-label">
                          Protection class:
                        </div>
                        <div class="ports-value">
                          {{ solarForm.protection_class }}
                        </div>
                      </div>
                      <div
                        v-if="moreSolar"
                        class="item"
                      >
                        <div class="ports-label">
                          Fire rating:
                        </div>
                        <div class="ports-value">
                          {{ solarForm.fire_rating }}
                        </div>
                      </div>
                      <div class="item">
                        <div class="ports-label">
                          Bifacial gain (%):
                        </div>
                        <div class="ports-value">
                          {{ solarForm.bifacial_gain }}
                        </div>
                      </div>
                      <div
                        v-if="moreSolar"
                        class="ports-mode"
                      >
                        <el-divider content-position="left">
                          Mechanical loading
                        </el-divider>
                      </div>
                      <div
                        v-if="moreSolar"
                        class="item"
                      >
                        <div class="ports-label">
                          Front side maximum static loading (Pa):
                        </div>
                        <div class="ports-value">
                          {{ solarForm.front_side_maximum_static_loading }}
                        </div>
                      </div>
                      <div
                        v-if="moreSolar"
                        class="item"
                      >
                        <div class="ports-label">
                          Rear side maximum static loading (Pa):
                        </div>
                        <div class="ports-value">
                          {{ solarForm.rear_side_maximum_static_loading }}
                        </div>
                      </div>
                      <div
                        v-if="moreSolar"
                        class="item"
                      >
                        <div class="ports-label">
                          Hailstone Test:
                        </div>
                        <div class="ports-value">
                          {{ solarForm.hailstone_test }}
                        </div>
                      </div>
                      <div
                        v-if="moreSolar"
                        class="ports-mode"
                      >
                        <el-divider content-position="left">
                          Temperature ratings (STC)
                        </el-divider>
                      </div>
                      <div
                        v-if="moreSolar"
                        class="item"
                      >
                        <div class="ports-label">
                          Temperature coefficient of isc (%/℃):
                        </div>
                        <div class="ports-value">
                          {{ solarForm.temperature_coefficient_of_isc }}
                        </div>
                      </div>
                      <div
                        v-if="moreSolar"
                        class="item"
                      >
                        <div class="ports-label">
                          Temperature coefficient of voc (%/℃):
                        </div>
                        <div class="ports-value">
                          {{ solarForm.temperature_coefficient_of_voc }}
                        </div>
                      </div>
                      <div
                        v-if="moreSolar"
                        class="item"
                      >
                        <div class="ports-label">
                          Temperature coefficient of pmax (%/℃):
                        </div>
                        <div class="ports-value">
                          {{ solarForm.temperature_coefficient_of_pmax }}
                        </div>
                      </div>
                    </div>
                    <!--Racking/Tracker-->
                    <div
                      v-if="activePortsTab == 'tracker'"
                      class="ports-wrapper"
                    >
                      <div class="item">
                        <div class="ports-label">
                          Manufacturer:
                        </div>
                        <div class="ports-value">
                          {{ trackerForm.manufacturer }}
                        </div>
                      </div>
                      <div class="item">
                        <div class="ports-label">
                          Configuration:
                        </div>
                        <div class="ports-value">
                          {{ trackerForm.series }}
                        </div>
                      </div>
                      <div class="item">
                        <div class="ports-label">
                          BHA gap width (ft):
                          <div
                            v-if="seriesForm.bha_gap_width_confirm == 1"
                            class="comfirm-icon"
                          >
                            <i class="el-icon-circle-check icon" />
                          </div>
                        </div>
                        <div class="ports-value">
                          {{ seriesForm.bha_gap_width }}
                        </div>
                      </div>
                      <div class="item">
                        <div class="ports-label">
                          Motor gap width (ft):
                          <div
                            v-if="seriesForm.motor_gap_width_confirm == 1"
                            class="comfirm-icon"
                          >
                            <i class="el-icon-circle-check icon" />
                          </div>
                        </div>
                        <div class="ports-value">
                          {{ seriesForm.motor_gap_width }}
                        </div>
                      </div>
                      <div class="item">
                        <div class="ports-label">
                          Maximum pier height (ft):
                          <div
                            v-if="seriesForm.maximum_pier_height_confirm == 1"
                            class="comfirm-icon"
                          >
                            <i class="el-icon-circle-check icon" />
                          </div>
                        </div>
                        <div class="ports-value">
                          {{ seriesForm.maximum_pier_height }}
                        </div>
                      </div>
                      <div class="item">
                        <div class="ports-label">
                          Pile position:
                          <div
                            v-if="seriesForm.pile_position_confirm == 1"
                            class="comfirm-icon"
                          >
                            <i class="el-icon-circle-check icon" />
                          </div>
                        </div>
                        <div class="ports-value">
                          {{ seriesForm.pile_position }}
                        </div>
                      </div>
                    </div>
                    <!--Combination parameter-->
                    <div
                      v-if="activePortsTab == 'combination'"
                      class="ports-wrapper"
                    >
                      <div class="item">
                        <div class="ports-label">
                          Module to module spacing (mm):
                          <div
                            v-if="seriesForm.module_to_module_spacing_confirm == 1
                            "
                            class="comfirm-icon"
                          >
                            <i class="el-icon-circle-check icon" />
                          </div>
                        </div>
                        <div class="ports-value">
                          {{ seriesForm.module_to_module_spacing }}
                        </div>
                      </div>
                      <div class="item">
                        <div class="ports-label">
                          BHA gap extender (ft):
                          <div
                            v-if="seriesForm.bha_gap_extender_confirm == 1"
                            class="comfirm-icon"
                          >
                            <i class="el-icon-circle-check icon" />
                          </div>
                        </div>
                        <div class="ports-value">
                          {{ seriesForm.bha_gap_extender }}
                        </div>
                      </div>
                      <div class="item">
                        <div class="ports-label">
                          Motor gap extender (ft):
                          <div
                            v-if="seriesForm.bha_gap_width_confirm == 1"
                            class="comfirm-icon"
                          >
                            <i class="el-icon-circle-check icon" />
                          </div>
                        </div>
                        <div class="ports-value">
                          {{ seriesForm.bha_gap_width }}
                        </div>
                      </div>
                      <div class="item">
                        <div class="ports-label">
                          Number of modules per string (pcs):
                          <div
                            v-if="seriesForm.of_modules_per_string_confirm == 1"
                            class="comfirm-icon"
                          >
                            <i class="el-icon-circle-check icon" />
                          </div>
                        </div>
                        <div class="ports-value">
                          {{ seriesForm.of_modules_per_string }}
                        </div>
                      </div>
                      <div class="item">
                        <div class="ports-label">
                          Row to row spacing (ft):
                          <div
                            v-if="seriesForm.row_to_row_spacing_confirm == 1"
                            class="comfirm-icon"
                          >
                            <i class="el-icon-circle-check icon" />
                          </div>
                        </div>
                        <div class="ports-value">
                          {{ seriesForm.row_to_row_spacing }}
                        </div>
                      </div>
                      <div class="item">
                        <div class="ports-label">
                          Number of modules per tracker (pcs):
                          <div
                            v-if="seriesForm.modules_per_tracker_confirm == 1"
                            class="comfirm-icon"
                          >
                            <i class="el-icon-circle-check icon" />
                          </div>
                        </div>
                        <div class="ports-value">
                          {{ seriesForm.modules_per_tracker }}
                        </div>
                      </div>
                      <div class="item">
                        <div class="ports-label">
                          Maximum current factor:
                          <div
                            v-if="seriesForm.maximum_current_factor_confirm == 1"
                            class="comfirm-icon"
                          >
                            <i class="el-icon-circle-check icon" />
                          </div>
                        </div>
                        <div class="ports-value">
                          {{ seriesForm.maximum_current_factor }}
                        </div>
                      </div>
                      <div class="item">
                        <div class="ports-label">
                          Overload protection factor:
                          <div
                            v-if="seriesForm.overload_protection_factor_confirm == 1
                            "
                            class="comfirm-icon"
                          >
                            <i class="el-icon-circle-check icon" />
                          </div>
                        </div>
                        <div class="ports-value">
                          {{ seriesForm.overload_protection_factor }}
                        </div>
                      </div>
                      <div class="item">
                        <div class="ports-label">
                          Maximum overload protection current (A):
                          <div
                            v-if="seriesForm.maximum_overload_protection_current_confirm ==
                              1
                            "
                            class="comfirm-icon"
                          >
                            <i class="el-icon-circle-check icon" />
                          </div>
                        </div>
                        <div class="ports-value">
                          {{ seriesForm.maximum_overload_protection_current }}
                        </div>
                      </div>
                      <div class="item">
                        <div class="ports-label">
                          Module connection*N:
                          <div
                            v-if="seriesForm.module_connection_confirm == 1"
                            class="comfirm-icon"
                          >
                            <i class="el-icon-circle-check icon" />
                          </div>
                        </div>
                        <div class="ports-value">
                          <span
                            v-for="(item, key) in seriesForm.module_connection"
                            :key="key"
                          >
                            {{ item }}
                          </span>
                        </div>
                      </div>
                      <div class="item">
                        <div class="ports-label">
                          Module orientation:
                          <div
                            v-if="seriesForm.module_orientation_confirm == 1"
                            class="comfirm-icon"
                          >
                            <i class="el-icon-circle-check icon" />
                          </div>
                        </div>
                        <div class="ports-value">
                          {{ seriesForm.module_orientation }}
                        </div>
                      </div>
                      <div class="item">
                        <div class="ports-label">
                          Messenger wire or Trench:
                          <div
                            v-if="seriesForm.cab_or_trench_confirm == 1"
                            class="comfirm-icon"
                          >
                            <i class="el-icon-circle-check icon" />
                          </div>
                        </div>
                        <div class="ports-value">
                          {{
                            seriesForm.cab_or_trench === "CAB"
                              ? "Messenger wire"
                              : seriesForm.cab_or_trench
                          }}
                        </div>
                      </div>
                      <div class="item">
                        <div class="ports-label">
                          CBX outlet length (ft):
                          <div
                            v-if="seriesForm.cbx_outlet_length_confirm == 1"
                            class="comfirm-icon"
                          >
                            <i class="el-icon-circle-check icon" />
                          </div>
                        </div>
                        <div class="ports-value">
                          {{ seriesForm.cbx_outlet_length }}
                        </div>
                      </div>
                      <div class="item">
                        <div class="ports-label">
                          CBX height (ft):
                          <div
                            v-if="seriesForm.cbx_height_confirm == 1"
                            class="comfirm-icon"
                          >
                            <i class="el-icon-circle-check icon" />
                          </div>
                        </div>
                        <div class="ports-value">
                          {{ seriesForm.cbx_height }}
                        </div>
                      </div>
                      <div class="item">
                        <div class="ports-label">
                          Distance from CBX to row head (ft):
                          <div
                            v-if="seriesForm.distance_from_cbx_to_row_head_confirm ==
                              1
                            "
                            class="comfirm-icon"
                          >
                            <i class="el-icon-circle-check icon" />
                          </div>
                        </div>
                        <div class="ports-value">
                          {{ seriesForm.distance_from_cbx_to_row_head }}
                        </div>
                      </div>
                      <div class="item">
                        <div class="ports-label">
                          <span v-if="seriesForm.cab_or_trench == 'CAB'">Hanger height:</span>
                          <span v-else>Trench depth (ft):</span>
                          <div
                            v-if="seriesForm.cab_height_or_trench_depth_confirm == 1
                            "
                            class="comfirm-icon"
                          >
                            <i class="el-icon-circle-check icon" />
                          </div>
                        </div>
                        <div class="ports-value">
                          {{ seriesForm.cab_height_or_trench_depth }}
                        </div>
                      </div>
                    </div>
                  </div>
                </td>
              </tr>
              <tr>
                <td
                  colspan="12"
                  class="label"
                >
                  <i class="el-icon-folder icon" />
                  Customer files
                </td>
              </tr>
              <tr colspan="12">
                <td
                  colspan="1"
                  class="file-label"
                >
                  Electrical drawing files
                </td>
                <td colspan="5">
                  <div
                    v-for="(item, index) in winPhaseDetail.electrical_drawing_files"
                    :key="`electrical_drawing_files-${index}`"
                    class="file-item animate"
                    :style="{ marginTop: index == 0 ? '' : '10px' }"
                  >
                    <span @click="viewFile(item)">
                      <i class="el-icon-document-checked" /> {{ item.name }}
                    </span>
                  </div>
                </td>
                <td
                  colspan="1"
                  class="file-label"
                >
                  Golden row files
                </td>
                <td colspan="5">
                  <div
                    v-for="(item, index) in winPhaseDetail.golden_row_files"
                    :key="`golden_row_files-${index}`"
                    class="file-item animate"
                    :style="{ marginTop: index == 0 ? '' : '10px' }"
                  >
                    <span @click="viewFile(item)">
                      <i class="el-icon-document-checked" /> {{ item.name }}
                    </span>
                  </div>
                </td>
              </tr>
              <tr colspan="12">
                <td
                  colspan="1"
                  class="file-label"
                >
                  Sequence file
                </td>
                <td colspan="5">
                  <div
                    v-if="winPhaseDetail.sequence_file &&
                      winPhaseDetail.sequence_file != ''
                    "
                    class="file-item"
                  >
                    <span @click="viewFile(winPhaseDetail.sequence_file)">
                      <i class="el-icon-document-checked" />
                      {{ winPhaseDetail.sequence_file.name }}
                    </span>
                  </div>
                </td>
                <td
                  colspan="1"
                  class="file-label"
                >
                  Other files
                </td>
                <td colspan="5">
                  <div
                    v-for="(item, index) in winPhaseDetail.other_files"
                    :key="`other_files-${index}`"
                    class="file-item animate"
                    :style="{ marginTop: index == 0 ? '' : '10px' }"
                  >
                    <span @click="viewFile(item)">
                      <i class="el-icon-document-checked" /> {{ item.name }}
                    </span>
                  </div>
                </td>
              </tr>
              <tr colspan="12">
                <td
                  colspan="1"
                  class="label"
                >
                  <i class="el-icon-chat-dot-square icon" />
                  Comment
                </td>
                <td colspan="11">
                  {{ winPhaseDetail.remarks }}
                </td>
              </tr>
              <tr colspan="12">
                <td>
                  <div class="files-wrapper">
                    <div class="label">
                      <i class="el-icon-folder icon" />
                      Label files
                    </div>
                    <div
                      v-if="showCnUploadFile"
                      class="card-btn animate"
                      @click="handleUpload('Label')"
                    >
                      <i class="el-icon-upload2" />
                      Upload
                    </div>
                  </div>
                </td>
                <td colspan="11">
                  <div
                    v-for="(childItem, childKey) in labelFiles"
                    :key="childKey"
                  >
                    <div>
                      <!-- label files area -->
                      <div
                        v-if="
                          childItem.files &&
                            childItem.files != ''
                        "
                        class="progress-file-wrapper"
                      >
                        <div class="file-item version">
                          V{{ childItem.version }}
                          <span
                            v-if="childItem.win == 1"
                            class="badge-crown"
                          />
                        </div>
                        <div class="file-item file-name">
                          <div class="label">
                            Label file:
                          </div>
                          <div
                            class="name"
                            style="display: flex; align-items: center; justify-content: center;"
                          >
                            {{ (childItem.files[0]).name }}
                          </div>
                          <div style="display: flex; justify-content: center; align-items: center; gap: 2px; margin-left: 10px; margin-top: 4px">
                            <span @click.stop="handleViewFile(childItem.files[0])"><i
                              class="el-icon-view table-icon animate"
                              @click=""
                            /></span>
                            <span
                              @click.stop="viewFile(childItem.files[0], item)
                              "
                            ><img
                              src="@/assets/IconDesigns/download.png"
                              style="width:14px; height: 14px"
                              alt="view file"
                            ></span>
                          </div>
                        </div>
                        <div
                          class="file-item creator"
                          style="flex: 1"
                        >
                          Creator:
                          {{ childItem.creation_name }}
                        </div>
                        <div class="file-item time">
                          Time:
                          {{ transFormat(childItem.created_at, "time") }}
                        </div>
                        <div />
                        <div
                          v-if="currentPhase.archiving ==0"
                          class="file-item action"
                        >
                          <i
                            v-if="showCnUploadFile"
                            class="el-icon-delete icon"
                            @click="handleDeleteProgressFile(childItem)"
                          />
                        </div>
                      </div>
                      <!-- other files area -->
                      <div
                        v-for="(othertem, index) in childItem.other_files"
                        :key="'other_files' + index"
                        class="progress-file-wrapper"
                      >
                        <div class="file-item version" />
                        <div class="file-item file-name">
                          <div class="label">
                            Other files:
                          </div>
                          <div
                            class="name"
                            @click="viewFile(othertem)"
                          >
                            {{ othertem.name }}
                          </div>
                          <span
                            @click.stop="viewFile(othertem)
                            "
                          ><img
                            src="@/assets/IconDesigns/download.png"
                            style="width:14px; height: 14px"
                            alt="view file"
                          ></span>
                        </div>
                        <div class="file-item price-block" />
                        <div class="file-item creator" />
                        <div class="file-item time" />
                        <div class="file-item action" />
                      </div>
                    </div>
                  </div>
                </td>
              </tr>
            </table>
          </div>
        </div>

        <div
          v-else
          class="progress-container"
        >
          <div class="no-data-wrapper animate">
            <img
              src="@/assets/image/noOrder.png"
              alt=""
            >
          </div>
        </div>
        <!-- Label Section End -->
        <div class="operation-process-container">
          <!--操作流程-->
          <FormalProjectProcess
            :win-phase="winPhaseDetail"
            :project-status="labelStatus"
            :label-files="labelFiles"
            @progress="getProgressStatus"
            @email-sent-and-progress-status-changed="refreshUpdates"
          />
        </div>
        <CommentsAndUpdates
          ref="commentsAndUpdatesLabel"
          :progress-id="winPhaseDetail.id"
          :query-type="3"
        />
        <RegisterHoursSummary />
      </template>
    </div>

    <!--上传文件前选择弹窗-->
    <el-dialog
      :title="uploadTitle"
      :visible.sync="uploadVisible"
      :close-on-click-modal="false"
      @close="handleCancel"
    >
      <el-form
        ref="rulesupload"
        :rules="rulesupload"
        :model="uploadForm"
        label-width="140px"
      >
        <el-form-item
          :label="uploadFileName"
          class="upload-form"
          prop="quotation_file"
        >
          <el-upload
            ref="upload"
            :action="uploadURL"
            :multiple="false"
            :limit="1"
            :on-progress="handleQuotationFilesProgresss"
            :on-success="updateQuotationFiles"
            :on-preview="viewQuotationFiles"
            :on-remove="deleteQuotationFiles"
            :on-exceed="exceedQuotationFiles"
            :headers="uploadHeaders"
            :file-list="quotation_files"
          >
            <el-button
              size="mini"
              type="primary"
            >
              Click to upload
            </el-button>
          </el-upload>
          <el-progress
            v-if="progressQuotationFiles"
            :percentage="loadQuotationFiles"
          />
        </el-form-item>
        <el-form-item
          label="Other files"
          class="upload-form"
        >
          <el-upload
            ref="upload"
            :action="uploadURL"
            :multiple="true"
            :on-progress="handleOtherFilesProgresss"
            :on-success="updateOtherFiles"
            :on-preview="viewOtherFiles"
            :on-remove="deleteOtherFiles"
            :headers="uploadHeaders"
            :file-list="other_files"
          >
            <el-button
              size="mini"
              type="primary"
            >
              Click to upload
            </el-button>
          </el-upload>
          <el-progress
            v-if="progressOtherFiles"
            :percentage="loadOtherFiles"
          />
        </el-form-item>
      </el-form>
      <span
        slot="footer"
        class="dialog-footer"
      >
        <el-button
          size="mini"
          @click="handleCancel"
        >Cancel</el-button>
        <el-button
          type="primary"
          size="mini"
          :disabled="disabledSubmit"
          @click="uploadProgressFile"
        >Submit</el-button>
      </span>
    </el-dialog>

    <el-dialog
      title="Notice"
      :visible.sync="noticeVisible"
      width="30%"
      :close-on-click-modal="false"
      :show-close="false"
    >
      <div>
        {{ noticeTitle }}
      </div>
      <span
        slot="footer"
        class="dialog-footer"
      >
        <el-button
          type="primary"
          size="small"
          @click="handleNotice"
        >Confirm</el-button>
      </span>
    </el-dialog>

    <el-dialog
      title="Copy from"
      width="480px"
      :visible.sync="copyVisible"
      :close-on-click-modal="false"
    >
      <el-form
        ref="rulesCopySeries"
        :rules="rulesCopy"
        :model="copyForm"
        label-width="120px"
      >
        <el-form-item
          label="Project"
          class="upload-form"
          prop="progress"
        >
          <el-select
            v-model="copyForm.project"
            filterable
            placeholder="Please input and select"
            size="small"
            @change="copyChangeProject"
          >
            <el-option
              v-for="(item, key) in projectList"
              :key="key"
              :label="item.project_no + ' - ' + item.description"
              :value="item.id"
            />
          </el-select>
        </el-form-item>
        <el-form-item
          label="Phase"
          class="upload-form"
          prop="progress"
        >
          <el-select
            v-model="copyForm.progress"
            filterable
            placeholder="Please input and select"
            size="small"
            @change="copyChangeProgress"
          >
            <el-option
              v-for="(item, key) in progressOptions"
              :key="key"
              :label="item.version"
              :value="item.id"
            />
          </el-select>
        </el-form-item>
        <el-form-item
          label="Configuration"
          class="upload-form"
          prop="series"
        >
          <el-select
            v-model="copyForm.series"
            placeholder="Please input and select"
            size="small"
          >
            <el-option
              v-for="(item, key) in seriesOptions"
              :key="key"
              :label="'Series ' + item.id"
              :value="item.id"
            />
          </el-select>
        </el-form-item>
      </el-form>
      <span
        slot="footer"
        class="dialog-footer"
      >
        <el-button
          size="mini"
          @click="copyVisible = false"
        >Cancel</el-button>
        <el-button
          type="primary"
          size="mini"
          @click="copySeries"
        >Confirm</el-button>
      </span>
    </el-dialog>

    <!--Sales Tag-->
    <el-dialog
      title="Status"
      :visible.sync="sales_tag_visible"
      width="38%"
      @close="handleCloseWinPhaseSelectDialog"
    >
      <div>
        <el-radio-group v-model="projectForm.sales_status">
          <el-radio :label="1">
            Bidding
          </el-radio>
          <el-radio :label="2">
            Win
          </el-radio>
          <el-radio :label="3">
            Win Via Another EPC
          </el-radio>
          <el-radio :label="4">
            Lost
          </el-radio>
          <el-radio :label="5">
            On-hold
          </el-radio>
          <el-radio :label="6">
            Canceled
          </el-radio>
        </el-radio-group>
      </div>
      <div
        v-if="projectForm.sales_status == 2 || projectForm.sales_status == 3" 
        class="select-win-phase-form"
      >
        <el-form
          ref="selectWinPhase"
          :model="selectWinPhaseForm"
          label-width="60px"
        >
          <el-form-item
            label="Phase"
            class="upload-form"
            prop="phase"
            required
            label-width="80"
          >
            <el-select
              v-model="selectWinPhaseForm.phase"
              filterable
              placeholder="Please input and select"
              size="small"
              @change="onSelectWinPhase"
            >
              <el-option
                v-for="(item, key) in selectWinPhaseFormPhaseOptions"
                :key="key"
                :label="item.version+' '+item.progress"
                :value="item.id"
              />
            </el-select>
          </el-form-item>
          <el-form-item
            label="Quote"
            class="upload-form"
            prop="quote"
            required
          >
            <el-select
              v-model="selectWinPhaseForm.quote"
              filterable
              placeholder="Please input andselect"
              size="small"
            >
              <el-option
                v-for="(item, key) in selectWinPhaseFormQuoteOptions"
                :key="key"
                :label="'V' + item.version + '-' + item.type + '-' + JSON.parse(item.quotation_file).name"
                :value="item.id"
              />
            </el-select>
          </el-form-item>
        </el-form>
      </div>
      <span
        slot="footer"
        class="dialog-footer"
      >
        <el-button
          type="primary"
          size="small"
          @click="changeSalesTag"
        >Submit</el-button>
      </span>
    </el-dialog>
    <SimulationGeneration
      ref="simulation_task_dialog"
      :phase-options="progressList"
      @generate-simulation="handleSimulationGeneration"
    />
  </div>
</template>

<script>
import SimulationGeneration from './3d-project/SimulationGeneration.vue';
import CalculationProcess from './3d-project/CalculationProcess.vue'
import Process from './components/Process.vue';
import FileUpload from './components/3D/FileUpload.vue';
import { mapStatus } from '@/utils/commons.js';
import FormalProjectProcess from './formal-project/FormalProjectProcess'
import SimulationProcess from './3d-project/SimulationProcess.vue'
import ArchivedMark from '@/components/ArchivedMark.vue';
import ClockTag from '@/components/common/ClockTag.vue';
import {judgeDisplayClock} from '@/utils/commons.js';
import { PHASE_LIST, PHASE_VALUES } from '@/utils/constants';

import CommentsAndUpdates from '@/components/CommentsAndUpdates/index.vue';
import RegisterHoursSummary from './components/RegisterHoursSummary.vue';
import {
  projectDetail,
  progressDetail,
  seriesDetail,
  //v0.4.0版本，销售可以archive Phase and project：2023/09/01
  archiveProject,
  unarchiveProject,
  archivePhase,
  unarchivePhase,
  // ******************************************************
  uploadFiles,
  progressFile,
  projectStatus,
  notices,
  noticeRead,
  configParams,
  teamList,
  deleteSeries,
  progressFileList,
  editProject,
  upload3Dfiles,
  removeProgress,
  deleteProgressFile,
  projectsTotal,
  downloadQuote,
  downloadConfirmation,
  changeProjectStatus,
  removeSingleProgressFile,
  simulationTaskGeneration
} from '@/api/index.js';
import updateStatus from '@/utils/status.js';
import baseUrl from '@/config.js';
import { Loading } from 'element-ui';
import dayjs from 'dayjs'
import { isNavigationFailure } from 'vue-router';

export default {
  name: '',
  components: {
    SimulationGeneration,
    CalculationProcess,
    Process,
    FileUpload,
    FormalProjectProcess,
    SimulationProcess,
    CommentsAndUpdates,
    RegisterHoursSummary,
    ArchivedMark,
    ClockTag
  },
  data() {
    return {
      //3d相关，v0.7.0
      d3Sent: false,
     calDisplayFiles:[],
     calVideoFiles:[],
     calculationFiles:[],
     calOtherFiles:[],
           // 3d simu files
    simuVideoFiles:[],
    simuSiteFiles: [],
    simuOtherFiles:[],
    simulationStatus:'',
      simuPhaseDetail: {},
      simuStatus: '',
      simuSiteFiles:[],
       simuSeriesList:[],
      simulationSent: false,
      simuInternalDuedate:'',
      // **************************
      viewingType: '2D',
      progressDetailForProcess: {},
      uploadFileName:'Quote file',
      labelFiles:[],
      limits:{},
      labelDuedate:'',
      labelStatus: '',
      getCommentsType: 2,
      simuTeamDuedate:'',
      winPhaseDetail: {},
      selectWinPhaseFormPhaseOptions:'',
      showCnUploadFile: false,
      disabledSubmit: false,
      //Quote status中回显的字段
      statusText:'',
      //显示due_date的clock
      showCustomerDueDateClock:false,
      showInternalDueDateClock: false,
      showTeamDueDateClock: false,
      //due-date的天数计算
      computedCustomerDueDateToolTipText:'',
      computedInternalDueDateToolTipText:'',
      //当前选中的phase
      currentPhase:'',
      //当前选中的Progress
      fullscreenLoading: true,
      //下载进度
      size: undefined,
      //监听评论页面是否展开
      expand: false,
      projectForm: {},
      projectList: [],
      progressList: [],
      progressOptions: [],
      seriesOptions: [],
      progressEabled: '',
      activeProgress: undefined,
      progressForm: {},
      solarForm: {},
      //v0.4.0版本，销售可以archive项目：2023/09/01
      archived: false,
      DCsize: undefined,
      addNewConfig: false,
      //可否新增Phase
      showAddNewPhase: false,
      //可否编辑Phase
      showEditPhase: false,
      //可否删除Phase
      showDeletePhase: false,
      //可否激活Phase
      showActivatePhase: false,
      //可否新增Config
      showAddConfig: false,
      //是否可上传报价
      showUploadBtn: false,
      projectAddress: '',
      trackerForm: {},
      moreSolar: false,
      activePortsTab: 'solar',
      //销售设置project的状态的表格
      selectWinPhaseForm: {
        phase: '',
        quote: ''
      },
      selectWinPhaseFormQuoteOptions: [],
      serlesNavbar: [
        {
          id: 'solar',
          label: 'Solar module'
        },
        {
          id: 'tracker',
          label: 'Racking/Tracker'
        },
        {
          id: 'combination',
          label: 'Site info'
        }
      ],
      seriesForm: {},
      seriesList: [],
      activeSeries: '',
      connectorOptions: [],
      uploadVisible: false,
      editPhase: false,
      deletePhase: false,
      uploadTitle: 'Alex',
      quotation_files: [],
      circuit_map_files: [],
      other_files: [],
      uploadForm: {
        progress_id: '',
        type: '',
        quotation_file: [],
        circuit_map_file: [],
        other_files: [],
        total_price: undefined,
        per_watt_price: undefined,
        creation_name: '',
        creation_id: '',
        files:[]
      },
      rulesupload: {
        // total_price: [
        //   {
        //     required: true,
        //     message: "Please input total price",
        //     trigger: "blur",
        //   },
        //   { validator: this.validatePriceType, trigger: ["blur", 'enter'] },
        // ],
        // per_watt_price: [
        //   {
        //     required: true,
        //     message: "Please input per watt price",
        //     trigger: "blur",
        //   },
        //   { validator: this.validatePriceType, trigger: ["blur", 'enter'] },
        // ],
        quotation_file: [
          { required: true, message: 'Please select file', trigger: 'blur' }
        ]
      },
      userLimits: null,
      d3UserLimits: null,
      noticeVisible: false,
      noticeTitle: '',
      noticeList: [],
      activeNotice: 0,
      recordList: [
        {
          content: '活动按期开始',
          timestamp: '2021-04-15',
          auther: 'Ju Cai'
        },
        {
          content: '通过审核',
          timestamp: '2021-04-13',
          auther: 'Ju Cai'
        },
        {
          content: '创建成功',
          timestamp: '2021-04-11',
          auther: 'Ju Cai'
        }
      ],
      teamInfo: null,
      progressRecordShow: false,
      userRole: '',
      cnOperate: false,
      progressFiles: [],
      tagShow: false,
      tagTitle: '',
      sales_tag_visible: false,
      progressQuotationFiles: false,
      loadQuotationFiles: 0,
      progressOtherFiles: false,
      loadOtherFiles: 0,
      uploadURL: '',
      uploadHeaders: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      },
      copyVisible: false,
      copyForm: {
        project: '',
        progress: '',
        series: ''
      },
      rulesCopy: {
        project: [
          {
            required: true,
            message: 'Please select project',
            trigger: 'submit'
          }
        ],
        progress: [
          { required: true, message: 'Please select phase', trigger: 'submit' }
        ],
        series: [
          {
            required: true,
            message: 'Please select configuration',
            trigger: 'submit'
          }
        ]
      },
      salesStatusOptions: [
        {
          label:'Bidding',
          value: 1
        },
        {
          label:'Win',
          value: 2
        },
        {
          label:'Win Via Another EPC',
          value: 3
        },
        {
          label:'Lost',
          value: 4
        },
        {
          label:'On-hold',
          value: 5
        },
        {
          label:'Canceled',
          value: 6
        }
      ]
    };
  },
  computed: {
    isUnarchived() {
    if(this.projectForm.archiving == 0 && this.progressForm.archiving == 0) {
      return true
    }
    else {
      return false
    }
  },
    //是否显示quote文件区域
    showQuoteFilesArea() {
    if(this.userLimits.show_quote_files) {
      return true
    }
    else {
      return false
    }
  },
    //是否显示quote文件的操作
    showQuoteFileUpload() {
    if(this.userLimits.quote_file_upload) {
      //处于US Engineer的操作流
      // if(this.userRole == 'US Engineer') {
      //   let usEngineerSteps = ['US_TO_BE_SEND', 'CN_PASSED'];
      //   if(usEngineerSteps.includes(this.progressForm.status_label)) {
      //      return true
      //   }
      // }
      //处于CN Engineer Manager的操作流
      if(this.userRole == 'CN Engineer Manager') {
        let cnEngineerManagerSteps = ['US_HAS_BEEN_SEND', 'CN_TEAM_ALREADY_APPLIED', 'US_REJECTED'];
        if(cnEngineerManagerSteps.includes(this.progressForm.status)) {
           return true
        }
      }
      //处于Team Leader的操作流
      if(this.userRole == 'Team Leader') { 
        let cnTeamLeaderSteps = ['CN_ASSIGNED', 'CN_REJECTED'];
        if(cnTeamLeaderSteps.includes(this.progressForm.status)) {
           return true
        }
      }
      return false
    }
    else {
      return false
    }
  },
    // 计算是否展示calculation文件的upload按钮
    show3DCalculationFileUpload() { 
    let role = this.userRole;
    let calculationStatus = this.progressForm['3d_calculation_status'];
    if(this.progressForm.archiving == 1) {
      return false
    }
    if(this.d3UserLimits.show_upload_file){
      //3d manager的操作节点
      if(role == '3D Manager') {
        let d3ManagerSteps = ['CAL_US_HAS_BEEN_SEND', 'CAL_US_REJECTED', 'CAL_CN_TEAM_ALREADY_APPLIED'];
        if(d3ManagerSteps.includes(calculationStatus)) {
           return true
        }
      }
      //3d teamleader的操作节点
      if(role == '3D Team Leader') {
        let d3TeamLeaderSteps = ['CAL_CN_ASSIGNED', 'CAL_CN_REJECTED'];
        if(d3TeamLeaderSteps.includes(calculationStatus)) {
           return true
        }
      }
      return false
    }
    else {
      return false
    }
  },
  show3DSimulationFileUpload() {
    let role = this.userRole;
    let simulationStatus = this.simuStatus;
    if(this.progressForm.archiving == 1) {
      return false
    }
    if(this.d3UserLimits.show_upload_file){
      //3d manager的操作节点
      if(role == '3D Manager') {
        let d3ManagerSteps = ['SIM_HAS_BEEN_SEND', 'SIM_US_REJECTED', 'SIM_CN_TEAM_ALREADY_APPLIED'];
        if(d3ManagerSteps.includes(simulationStatus)) {
           return true
        }
      }
      //3d teamleader的操作节点
      if(role == '3D Team Leader') {
        let d3TeamLeaderSteps = ['SIM_CN_ASSIGNED', 'SIM_CN_REJECTED'];
        if(d3TeamLeaderSteps.includes(simulationStatus)) {
           return true
        }
      }
      return false
    }
    else {
      return false
    }
  },
    updatesType() {
    if(this.viewingType == '2D') {
       //bidding里面，如果浏览2d的时候，则为2d-bidding的updates
       return 2
    }
    if(this.viewingType == '3D') {
       //bidding里面，如果浏览3d的时候，则为3d-bidding的updates
       return 5
    }
  },
    //customer due date的判断
    dueStatus() {
      let today = new Date().getTime();
      let customerDueDate = this.transFormat(
        this.progressForm.due_date,
        'date'
      );
      customerDueDate = new Date(customerDueDate).getTime() + (23 * 60 * 60 + 59 * 60 + 59) * 1000;
       let dayDiff = customerDueDate - today;
       dayDiff = dayDiff / (24 * 60 * 60 * 1000);
          
       let result = 'normal';
       if(dayDiff <= 2 && dayDiff >= 0){
         result = 'close-due'; 
         this.computedCustomerDueDateToolTipText = Math.floor(dayDiff);
       }    
       if(dayDiff < 0){
         result = 'over-due';
         dayDiff = Math.abs(dayDiff);
         this.computedCustomerDueDateToolTipText = Math.floor(dayDiff);
       }

       return result;
  },
  //internal due date的判断
  internalDueStatus() {
    let today = new Date().getTime();
      let customerDueDate = this.transFormat(
        this.progressForm.inner_date,
        'date'
      );
      customerDueDate = new Date(customerDueDate).getTime() + (23 * 60 * 60 + 59 * 60 + 59) * 1000;
       let dayDiff = customerDueDate - today;
       dayDiff = dayDiff / (24 * 60 * 60 * 1000); 

       this.computedInternalDueDateToolTipText = Math.floor(dayDiff);

          
       let result = 'normal';
       if(dayDiff <= 2 && dayDiff >= 0){
         result = 'close-due';
         this.computedInternalDueDateToolTipText = Math.floor(dayDiff);
       }    
       if(dayDiff < 0){
         result = 'over-due';
         this.computedInternalDueDateToolTipText = Math.floor(dayDiff);
       }

       return result;
  }
},
watch: {
  $route: {
    handler (val) {
      this.getProjectDetail();
    },
    deep: true
  },  
  labelFiles: {
    handler (val) {
      console.log('ultra', this.labelFiles)
    },
    deep: true
  },
  currentPhase: {
  handler (val) {
    this.d3Sent = val['3d_send']
  },
  deep: true
}  
},
  mounted() {  
  window.scrollTo(0, 0)
    this.uploadURL = `${baseUrl.baseUrl}/api/upload-files`;
    this.getProjectDetail(); 
    this.getConfigParams();
    this.justifyRole();
    this.getUserInfoFromSession();
  },
  methods: {
    removeSingleProgressFile(file) {
      this.$confirm('Are you sure to delete this progress file?', 'Tips', {
      confirmButtonText: 'Confirm',
      cancelButtonText: 'Cancel',
      type: 'warning'
    }).then(() => {
      this.confirmRemoveSingleProgressFile(file);
    })
  },
  confirmRemoveSingleProgressFile(file) {
    let params = {
      id: file.id,
      type: 'files',
      url: file.url
    }
    removeSingleProgressFile(params).then((res) => {
      if(res.code === 200) {
        this.$message.success('Remove file successfully');
        this.getProjectDetail();
            this.getNoticeList();
            this.getConfigParams();
      }
    })
  },
    sort3Dfiles(data, type) {            
      //如果是calculation的文件
        if(type == 3) {  
        this.calDisplayFiles = [];
        this.calVideoFiles = [];
        this.calculationFiles = [];
        this.calOtherFiles = [];
        //整理calDisplayFiles
        let calDisplayFiles = data['3D display file'] || [];
        if(calDisplayFiles.length > 0) {
          calDisplayFiles = calDisplayFiles.forEach((item) => {
          if(item.files) {
              let {files} = item;
              files = files.map((file) => {
                return {
                  id: item.id,
                  name: file.name,
                  url: file.url,
                  creation_name: item.creation_name,
                  created_at: item.created_at
                }
                })
                this.calDisplayFiles = [...this.calDisplayFiles, ...files]
          }
        })
        }
        //整理calVideoFiles
        let calVideoFiles = data['3D video'] || [];
        if(calVideoFiles.length > 0) {
          calVideoFiles = calVideoFiles.forEach((item) => {
          if(item.files) {
              let {files} = item;
              files = files.map((file) => {
                return {
                  id: item.id,
                  name: file.name,
                  url: file.url,
                  creation_name: item.creation_name,
                  created_at: item.created_at
                }
                })
                this.calVideoFiles = [...this.calVideoFiles, ...files]
          }
        })
        }

        //整理calCalculational date Files
        let calculationFiles = data['Calculation file'] || [];
        if(calculationFiles.length > 0) {
          calculationFiles = calculationFiles.forEach((item) => {
          if(item.files) {
              let {files} = item;
              files = files.map((file) => {
                return {
                  id: item.id,
                  name: file.name,
                  url: file.url,
                  creation_name: item.creation_name,
                  created_at: item.created_at
                }
                })
                this.calculationFiles = [...this.calculationFiles, ...files]
          }
        })
        }
        //整理calOtherFiles
        let calOtherFiles = data['Other files'] || [];
        if(calOtherFiles.length > 0) {
          calOtherFiles = calOtherFiles.forEach((item) => {
          if(item.files) {
              let {files} = item;
              files = files.map((file) => {
                return {
                  id: item.id,
                  name: file.name,
                  url: file.url,
                  creation_name: item.creation_name,
                  created_at: item.created_at
                }
                })
                this.calOtherFiles = [...this.calOtherFiles, ...files]
          }
        })
        }
      }
      //如果是simulation的文件
      if(type == 4) { 
        this.simuSiteFiles = [];
        this.simuVideoFiles = [];
        this.simuOtherFiles = [];
        //整理calDisplayFiles
        let simuSiteFiles = data['3D site file'] || [];
        if(simuSiteFiles.length > 0) {
          simuSiteFiles = simuSiteFiles.forEach((item) => {
          if(item.files) {
              let {files} = item;
              files = files.map((file) => {
                return {
                  id: item.id,
                  name: file.name,
                  url: file.url,
                  creation_name: item.creation_name,
                  created_at: item.created_at
                }
                })
                this.simuSiteFiles = [...this.simuSiteFiles, ...files]
          }
        })
        }
        //整理calVideoFiles
        let simuVideoFiles = data['3D video'] || [];
        if(simuVideoFiles.length > 0) {
          simuVideoFiles = simuVideoFiles.forEach((item) => {
          if(item.files) {
              let {files} = item;
              files = files.map((file) => {
                return {
                  id: item.id,
                  name: file.name,
                  url: file.url,
                  creation_name: item.creation_name,
                  created_at: item.created_at
                }
                })
                this.simuVideoFiles = [...this.simuVideoFiles, ...files]
          }
        })
        }
        //整理calCalculational date Files
        let simuOtherFiles = data['Other files'] || [];
        if(simuOtherFiles.length > 0) {
          simuOtherFiles = simuOtherFiles.forEach((item) => {
          if(item.files) {
              let {files} = item;
              files = files.map((file) => {
                return {
                  id: item.id,
                  name: file.name,
                  url: file.url,
                  creation_name: item.creation_name,
                  created_at: item.created_at
                }
                })
                this.simuOtherFiles = [...this.simuOtherFiles, ...files]
          }
        })
        }
      }
  },
        //3d的文件上传dialog
  showFileUpload(fileType, uploadFrom) { 
    this.$refs['3d-file-upload'].show(fileType, uploadFrom);
  },
  handle3DfileUpload(files, fileType, uploadFrom) { 
    let progress_id;
    let file_type;
    switch(uploadFrom)
    {
      case 'calculation':
        progress_id = this.activeProgress;
        file_type = 3;
        break;
      case 'simulation':
        progress_id = this.simulationPhaseId;
        file_type = 4;
        break;
    }
    let params = {
      project_id: this.$route.query.projectId,
      progress_id,
      file_type,
      type: fileType,
      files
    }
    upload3Dfiles(params).then((res) => { 
      if(res.code === 200) {
        this.$message.success('Upload 3D files successfully');
        if(uploadFrom == 'calculation') {
          this.refreshCalculationFiles();
        }
        if(uploadFrom == 'simulation') { 
          this.refreshSimuFiles();
        }
      }
    })
  },
  refreshCalculationFiles() {  
    progressFileList({id: this.activeProgress, file_type: 3}).then((res) => { 
      if(res.code === 200) {
        let {data} = res;
        this.sort3Dfiles(data, 3);
      }
    })
  },
  refreshSimuFiles() {
    progressFileList({id: this.activeProgress, file_type: 4}).then((res) => { 
      if(res.code === 200) {
        let {data} = res;
        this.sort3Dfiles(data, 4);
      }
    })
  },
    handleSimulationGeneration(formData) {
      let params = {
      project_id: Number(this.$route.query.projectId),
      progress_id:formData.phase,
      due_date:formData.simu_due_date
    }
    simulationTaskGeneration(params).then((res) => {
      if(res.code === 200) {
        this.$message.success('Simulation task generation successfully');
        this.simulationSent = true;
        this.getProjectDetail();
      }
    })
    },
    initiateSimulationTask() {
      if(this.simulationSent) {
      return;
    }
    this.$refs.simulation_task_dialog.show();
  },
  //v0.7.0版本，详情区域切换2D和3D
    switchViewingType(type) {
    this.viewingType = type;
    let updateType;
    if(type == '2D') { updateType = 2}
    if(type == '3D') { updateType = 5}

    if(this.$refs.commentsAndUpdates) {
      this.$refs.commentsAndUpdates.getUpdates(this.activeProgress, updateType);
      this.$refs.commentsAndUpdates.getComments(this.activeProgress, updateType);
    }
  },
    judgeDisplayClock(dateType, quoteStatus) {
    return judgeDisplayClock(dateType, quoteStatus);
  },
    getCommentsAndUpdates() {
      this.refreshUpdates();
      this.refreshComments();
    },
    mapStatus(status) { 
    return mapStatus(status);
  },
    formatCreationTime(date) {
     return dayjs(date).format('YYYY-MM-DD HH:mm:ss')
    },
    onArchiveProject() {
      this.$confirm('Are you sure to archive this project? The relevant quote tasks will be automatically canceled after archiving and the phases under this project will not be available for editing', 'Tips', {
        confirmButtonText: 'Confirm',
        cancelButtonText: 'Cancel',
        type: 'warning',
        customClass: 'tipsMessageBox'
      }).then(() => {
        this.archiveProject();
      }).catch(() => {        
      });
    },
    //v0.4.0版本，销售可以archive项目：2023/09/01
    archiveProject() {
      archiveProject({id:this.$route.query.projectId}).then((res) => {
        if(res.code === 200) {
          this.$message.success('Archive project successfully');
          this.getProjectDetail();
        }
      }).catch((err) => {
        // this.$message.error("Archive project failed");
      })
    },
    openArchivePhaseConfirm(){
      if(this.currentPhase.archiving == 0) {
        this.$confirm('Whether to confirm the archiving, the relevant quote tasks will be automatically canceled after archiving?', 'Tips', {
          confirmButtonText: 'Confirm',
          cancelButtonText: 'Cancel',
          type: 'warning',
          customClass: 'tipsMessageBox'
        }).then(() => {
          this.handleArchivePhase();
          // this.$message({
          //   type: 'success',
          //   message: 'Archiving successful!'
          // });
        }).catch(() => {         
        });
      }
      if(this.currentPhase.archiving == 1) {
        this.$confirm('After unarchiving, the related quote tasks will be automatically activated and other phases will be automatically archived', 'Tips', {
          confirmButtonText: 'Confirm',
          cancelButtonText: 'Cancel',
          type: 'warning',
          customClass: 'tipsMessageBox'
        }).then(() => {
          this.handleArchivePhase();
          // this.$message({
          //   type: 'success',
          //   message: 'Unarchiving successful!'
          // });
        }).catch(() => {         
        });
      }
    },
    //v0.4.0版本，销售可以archive Phase：2023/09/01
    handleArchivePhase() {
      if(this.currentPhase.archiving == 0) {
        archivePhase({progress_id:this.activeProgress}).then((res) => {
        if(res.code === 200) {
          this.$message.success('Archive phase successfully');
          this.getProjectDetail();
          // window.location.reload();
        }
      }).catch((err) => {
        // this.$message.error("Archive phase failed");
      })
      }

      if(this.currentPhase.archiving != 0) {
        unarchivePhase({progress_id:this.activeProgress}).then((res) => {
        if(res.code === 200) {
          this.$message.success('Unarchive phase successfully');
          this.getProjectDetail();
          // window.location.reload();
        }
      }).catch((err) => {
        // this.$message.error("Unarchive phase failed");
      })
      }
    },
    onUnarchiveProject() {
      this.$confirm('Whether to unarchive, after unarchiving, related quote tasks will be automatically activated?', 'Tips', {
        confirmButtonText: 'Confirm',
        cancelButtonText: 'Cancel',
        type: 'warning',
        customClass: 'tipsMessageBox'
      }).then(() => {
        this.unarchiveProject();
      }).catch(() => {        
      });
    },
    unarchiveProject() {
      unarchiveProject({id:this.$route.query.projectId}).then((res) => {
        if(res.code === 200) {
          this.$message.success('Unarchive project successfully');
          this.getProjectDetail();
        }
      }).catch((err) => {
        // this.$message.error("Unarchive project failed");
      })
    },
    //手动刷新一下seriesList
    refreshSeriesList() {
      progressDetail(this.activeProgress).then((res) => {
                let seriesList = res.data.series;
            if (seriesList.length != 0) {
              seriesList = seriesList.map((item, index) => {
                let progress_version = res.data['version'];
                let count = index + 1;
                item['version'] = `${progress_version}-${count}`;
                return item;
              });
              this.seriesList = seriesList.reverse();
            } else {
              this.seriesList = [];
            }
              })
    },
    onSelectWinPhase(val) { 
      progressFileList({id: val, file_type:1})
        .then((res) => {
          if (res.code == 200) {
            let {data} = res;
            this.selectWinPhaseFormQuoteOptions = data.reverse(); 
          }
          return;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    handleCloseWinPhaseSelectDialog() {
      this.sales_tag_visible = false;
      this.selectWinPhaseForm.phase = '';
      this.selectWinPhaseForm.quote = '';
    },
    //如果路由中的query带有目标的Phase Number, 则跳转到该Phase
    jumpToPhase(phaseNo) {
      for (const item of this.progressList) {
  if (item.version === phaseNo) {
    this.handleProgress(item);
    break;
  }
}
    },
    refreshUpdates() { 
      if(this.$refs.commentsAndUpdates) {
        this.$refs.commentsAndUpdates.getUpdates(this.activeProgress);
      }
      if(this.$refs.commentsAndUpdatesLabel) {
        this.$refs.commentsAndUpdatesLabel.getUpdates(this.winPhaseDetail.id);
      }
      if(this.$refs.commentsAndUpdatesSimulation) {
        this.$refs.commentsAndUpdatesSimulation.getUpdates(this.simulationPhaseId);
      }
    },
    refreshComments() {
      if(this.$refs.commentsAndUpdates) {
        this.$refs.commentsAndUpdates.getComments(this.activeProgress);
      }
      if(this.$refs.commentsAndUpdatesLabel) {
        this.$refs.commentsAndUpdatesLabel.getComments(this.winPhaseDetail.id);
      }
      if(this.$refs.commentsAndUpdatesSimulation) {
        this.$refs.commentsAndUpdatesSimulation.getComments(this.simulationPhaseId);
      }
    },
    handleCancel() {
      this.uploadVisible = false;
      this.uploadForm = {
        progress_id: '',
        type: '',
        quotation_file: [],
        circuit_map_file: [],
        other_files: [],
        total_price: undefined,
        per_watt_price: undefined,
        creation_name: '',
        creation_id: '',
        files:[]
      };
    },
    //处理下载quote还是下载confirmation
    handleDownloadOptions(opt) {
      let progress_id = this.activeProgress;
      //如果是下载quote文件
      if (opt === 'quote') {
        downloadQuote({ progress_id }).then((res) => {
          if (
            res.code === 200
            && res.data.url
          ) {
            // 创建一个<a>元素来触发下载
            const anchor = document.createElement('a');
            anchor.href = res.data.url;

            // 设置download属性以指定文件名称
            anchor.setAttribute('download', res.data.name);

            // 触发模拟点击来开始下载
            anchor.click();
          }
          else if(this.progressFiles.length === 0) {
            // 处理API响应数据不完整或无效的情况
            this.$message.error('No files available'); 
            // 你可以显示错误消息或执行其他适当的操作。
          }
        }).catch((err) => {
          console.log(err);
        });
      }
      //如果是下载confirmation文件
      if(opt === 'confirmation') { 
       downloadConfirmation(this, progress_id, this.projectForm.description);
      }
    },
    handleExpand(expandStatus) {
      expandStatus ? (this.expand = true) : (this.expand = false);
    },
    clearPrices() {
      this.uploadForm.total_price = undefined;
      this.uploadForm.per_watt_price = undefined;
    },
    validatePriceType(rule, value, callback) {
      let checkNum = parseFloat(value);
      let checkNumStr = checkNum.toString();
      let intPart = !checkNumStr.includes('.')
        ? checkNumStr
        : checkNumStr.split('.')[0]; 
      if (isNaN(checkNum)) { 
        callback(new Error('Please input a number'));
        // this.clearPrices();
      }
      // if (intPart.length > 9) {
      //   // callback(new Error('The price should not exceed 9 figures'));
      //   this.$message.error("The price should not exceed 9 figures");
      //   // this.clearPrices();
      // } 
      else {
        callback();
      }
    },
    handleBack() {
      this.$router.go(-1);
    },
    getUserInfoFromSession() {
      const userJSONString = localStorage.getItem('user');
      const user = JSON.parse(userJSONString);
      this.userRole = user.role;
    },
    //     handlePriceInputBlur() {
    //         let number = this.uploadForm.total_price;
    //         this.uploadForm.total_price = number.toLocaleString(undefined, {
    //             minimumFractionDigits: 2,
    //   maximumFractionDigits: 2,
    //         });
    //     },
    //处理地址并且回填
    convertAddress(projAddress) {
      let address = projAddress.address || null;
      let city = projAddress.city || null;
      let state = projAddress.state || null;
      let county = projAddress.county || null;
      let zipcode = projAddress.zipcode || null;

      let addressArr = [address, city, county, state, zipcode];
      addressArr = addressArr.filter(
        (value) => {return value !== null && value !== undefined && value !== ''}
      );
      this.projectAddress = addressArr.join(', ');
    },
    justifyRole() { 
      let userInfo = JSON.parse(localStorage.getItem('user'));
      let {role} = userInfo;
      this.userRole = role;
      let limits = JSON.parse(localStorage.getItem('limits'));
      this.limits = limits;
      if(limits.Bidding_Project_Detail){
        this.userLimits = limits.Bidding_Project_Detail;
      }
      if(limits['3D_Calculation_Simulation']){ 
      this.d3UserLimits = limits['3D_Calculation_Simulation']; 
    }
      if (this.userLimits.label_file_upload) { 
        let statusLabel = mapStatus(this.labelStatus);
        if((statusLabel == 'Team assigned & pending label file' || statusLabel == 'Label file rejected & Pending re-label') && userInfo.team_id == this.winPhaseDetail.team_id && role == 'Team Leader') {
          this.showCnUploadFile = true; 
        }
        if(role == 'CN Engineer Manager' && statusLabel == 'Label file submitted & Pending approval') { 
          this.showCnUploadFile = true;
        }
      }
    },
    pickWinPhaseDetail(data) {
      data.forEach((item) => {
        if (item.win == 1) {
          this.winPhaseDetail = {...item}; 
          this.getLabelFiles();
        }
      }); 
    },
        //0.7.0版本，获取关联的simulation phase
  async pickSimuPhase(id) { 
    await progressDetail(id).then((res) => { 
      if(res.code === 200) {
        this.simuPhaseDetail = res.data; 
        this.simuSeriesList = res.data.series;
      }
    })
  },

    /**project详情 */
    async getProjectDetail() { 
      const id = this.$route.query.projectId;
      await projectDetail(id)
        .then((res) => {
          if (res.code == 200) { 
            this.labelDuedate = res.data.label_due_date ? res.data.label_due_date : '';
            let {progressUnderView} = this.$store.state.app;
            if(res.data.progress) {
              this.pickWinPhaseDetail(res.data.progress);
              this.labelStatus = res.data.label_status; 
              // 判断一下角色能不能上传label file
              this.justifyRole(); 
            }
            this.projectForm = JSON.parse(JSON.stringify(res.data));
            this.projectForm = res.data; 
            //v0.7.0判断项目详情中是否有simulation数据
            if(this.projectForm.simulation_phase_id) {
            this.simulationPhaseId = this.projectForm.simulation_phase_id;
            this.pickSimuPhase(this.simulationPhaseId);
            this.simuStatus = this.projectForm.simulation_status || '';
            this.simuInternalDuedate = this.projectForm.simulation_inner_date || '';
            this.simuTeamDuedate = this.projectForm.simulation_team_due_date || '';
            this.simulationSent = true;
            }
            //v0.4.0判断项目是否为已归档的
            this.archived = res.data.archiving == 1 ? true : false;
            this.tagTitle = this.projectForm.sales_status;
            this.DCsize = res.data.size;

            /**设置默认progress */
            let progressList = this.projectForm.progress;
            if (progressList && progressList.length != 0) {
              let {progress_id} = this.projectForm;
              //查看拿来的列表里是否有这个id
              let matchIdArr = progressList.filter(
                (item) => {return item.id == progress_id}
              );
              //查看拿来的列表里是否有WIN的phase
              let unarchivedProgress = progressList.filter(
                (item) => {return item.archiving == 0}
              );
              let unarchivedProgressId = unarchivedProgress.length > 0 ? unarchivedProgress[0].id : null;
              // ******************************************************
              this.progressList = progressList.reverse();
              //如果当前project有正在浏览的progress，比如从编辑该progress的界面返回，就选中这个progress
              if (progressUnderView.id && this.$route.query.projectId == progressUnderView.project_id) { 
                this.activeProgress = progressUnderView.id;
                let targetPhase = this.progressList.find((item) => {return item.id == this.activeProgress});
                //统一处理一下currentPhase，因为要根据这个值来返回是否显示归档相关的样式
                this.currentPhase = targetPhase;
                this.getProgressDetail();
                // return;
              }
              else if(unarchivedProgressId) {
                this.activeProgress = unarchivedProgressId;
                let targetPhase = this.progressList.find((item) => {return item.id == this.activeProgress});
                //统一处理一下currentPhase，因为要根据这个值来返回是否显示归档相关的样式
                this.currentPhase = targetPhase;
                this.getProgressDetail();
              }
              //如果有这个id，就用这个id来作为active，如果没有，表示它已经被删除掉。就用第一个
            //  else if (progress_id && progress_id != "" && matchIdArr.length !== 0) { 
            //     this.activeProgress = progress_id;
            //     let targetPhase = this.progressList.find(item => item.id == this.activeProgress); 
            //     //统一处理一下currentPhase，因为要根据这个值来返回是否显示归档相关的样式
            //     this.currentPhase = targetPhase;
            //     this.getProgressDetail();
            //   }              
              else {  
                this.activeProgress = this.progressList[0]['id'];
                let targetPhase = this.progressList.find((item) => {return item.id == this.activeProgress});
                //统一处理一下currentPhase，因为要根据这个值来返回是否显示归档相关的样式
                this.currentPhase = targetPhase;
                this.getProgressDetail();
              }
            }
            //把progressList的选项赋给selectWinPhaseFormPhaseOptions
            this.selectWinPhaseFormPhaseOptions = this.progressList; 
            //选定项目的默认状态
            this.projectForm.sales_status = res.data.sales_status;
            this.fullscreenLoading = false;
            this.size = res.data.size || undefined;
            this.convertAddress(this.projectForm);
          }
          // return;
        }).then(() => {
          //如果请求里有phaseNo，就跳转到这个phase
          const phaseNoQuery = this.$route.query.phaseNo || undefined;
    if (phaseNoQuery) { 
      this.jumpToPhase(phaseNoQuery);
    }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    async getConfigParams() {
      await configParams()
        .then((res) => {
          this.connectorOptions = res.connector;
          return;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    async getNoticeList() {
      await notices()
        .then((res) => {
          if (res.code == 200) {
            this.noticeList = res.data;
            if (res.data.length > 0) {
              this.activeNotice = 0;
              this.noticeInit();
            }
          } else {
            // this.$message.error(res.message);
          }
          return;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    noticeInit() {
      let {noticeList} = this;
      if (this.activeNotice < noticeList.length) {
        let row = noticeList[this.activeNotice];
        this.noticeTitle = row.message;
        this.noticeVisible = true;
      }
    },
    handleNotice() {
      this.noticeVisible = true;
      let index = this.activeNotice;
      let {noticeList} = this;
      if (index < noticeList.length) {
        let row = noticeList[index];
        this.noticeTitle = row.message;
        this.readNotice(row);
      } else {
        this.activeNotice = 0;
        this.noticeTitle = '';
        this.noticeVisible = false;
      }
    },
    async readNotice(row) {
      await noticeRead({
        id: row.id
      })
        .then((res) => {
          if (res.code == 200) {
            this.noticeVisible = false;
            this.activeNotice++;
          } else {
            // this.$message.error(res.message);
          }
          return;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    async getTeamList() {
      const teamId = this.progressForm.team_id;
      await teamList()
        .then((res) => {
          if (res.code == 200) {
            let {data} = res.data;
            for (let i = 0; i < data.length; i++) {
              let item = data[i];
              if (item.id == teamId) {
                this.teamInfo = item;
              }
            }
          }
          return;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    handleAddProgress() {
      this.$router.push({
        path: '/index/project/progress/form',
        query: {
          mode: 'add',
          type:'formal',
          projectId: this.$route.query.projectId
        }
      });
    },
    handleEditProgress() {
      this.$router.push({
        path: '/index/project/progress/form',
        query: {
          mode: 'edit',
          projectId: this.$route.query.projectId,
          progressId: this.activeProgress
        }
      });
    },
    handleDeleteProgress() {
      this.$confirm('Are you sure to delete this phase?', 'Tips', {
        confirmButtonText: 'Confirm',
        cancelButtonText: 'Cancel',
        type: 'warning'
      })
        .then(() => {
            this.deleteProgress();
        })
        .catch(() => {});
    },
    async deleteProgress() {
      await removeProgress(this.activeProgress)
        .then((res) => {
          if (res.code == 200) {
            this.$message({
              message: 'Done',
              type: 'success'
            });
          }
          return;
        }).finally(() => {
          // window.location.reload();
        })
        .catch((err) => {
          console.log(err);
        });
    },
    handleDeleteProgressFile(row) {
      this.$confirm('Are you sure to delete this progress file?', 'Tips', {
        confirmButtonText: 'Confirm',
        cancelButtonText: 'Cancel',
        type: 'warning'
      })
        .then(() => {
          this.removeProgressFile(row);
        })
        .catch(() => {});
    },
    async removeProgressFile(row) {
      await deleteProgressFile(row.id)
        .then((res) => {
          if (res.code == 200) {
            this.$message({
              message: 'Done',
              type: 'success'
            });
            this.getProjectDetail();
            this.getNoticeList();
            this.getConfigParams();
          }
          return;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    //2023/08/29 v0.4.0版本中，不需要激活phase
    handleActivateProgress() {
      this.$confirm('Are you sure to activate this progress?', 'Tips', {
        confirmButtonText: 'Confirm',
        cancelButtonText: 'Cancel',
        type: 'warning'
      })
        .then(() => {
          this.activateProgress();
        })
        .catch(() => {});
    },
    async activateProgress() {
      let form = this.progressForm;

      // await editProject({
      //     id: form.id,
      //     no: this.progressUniqeNo(),
      //     project_no: form.project_no,
      //     description: form.description,
      //     client_id: form.client_id,
      //     contact_id: form.contact_id,
      //     sales_id: form.sales_id,
      //     us_engineer_id: form.us_engineer_id,
      //     cn_engineer_id: form.cn_engineer_id,
      //     cn_engineer_team_id: form.cn_engineer_team_id,
      //     size: form.size,
      //     address: form.address,
      //     remark: form.remark,
      //     progress_id: this.activeProgress,
      //     due_date: form.due_date,
      //     quote_status: form.status_text
      // }).then(res => {
      //     if(res.code==200){
      //         this.$message({
      //             message: 'Done',
      //             type: 'success'
      //         });
      //         this.getProjectDetail();
      //         this.getNoticeList();
      //         this.getConfigParams();
      //     }else{
      //         this.$message.error(res.message);
      //     }
      //     return;
      // }).catch(err => {
      //     console.log(err);
      // });

      await projectStatus({
        id: this.projectForm.id,
        progress_id: form.id,
        due_date: form.due_date,
        status: form.status
      })
        .then((res) => {
          if (res.code == 200) {
            this.$message({
              message: 'Done',
              type: 'success'
            });
            this.getProjectDetail();
            this.getNoticeList();
            this.getConfigParams();
          } else {
            // this.$message.error(res.message);
          }
          return;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    progressUniqeNo() {
      let date = new Date();
      let time = date.getTime();
      return time;
    },
    handleProgress(row) {
      // this.activeProgress = String(row.id);
      this.activeProgress = row.id;
      //组件中也暂存一下选中的phase
      this.currentPhase = row;
      this.refreshUpdates();
      this.refreshComments();
      //向store存入选中的progress
      this.$store.dispatch('app/changeProgressUnderView', row);
      this.seriesList = [];
      this.activeSeries = {};
      this.getProgressDetail();
    },
    viewMore() {
      this.moreSolar = !this.moreSolar;
    },
    computeStatusText(text) { 
      switch(text) {
        case 'Pending US engineer review':
          this.statusText = 'Pending US engineer review';
          break;
        case 'CN engineer rejected':
          this.statusText = 'CN engineer rejected';
          break;
        case 'Pending assign design team':
          this.statusText = 'Pending assign design team';
          break;
        case 'US engineer rejected':
          this.statusText = `${'US engineer rejected' + '('}${this.progressForm.reason})`;
          break;
        case 'Quote released':
          this.statusText = 'Quote released';
          break;
        case 'Team assigned & pending quote':
          this.statusText = 'Team assigned & pending quote';
          break;
        case 'Quote submited & Pending CN approval':
          this.statusText = 'Quote submited & Pending CN approval';
          break;
        case 'Quote rejected & pending re-quote':
          this.statusText = 'Quote rejected & pending re-quote';
          break;
        case 'Pending US approval':
          this.statusText = 'Pending US approval';
          break;
        case 'Win & Pending US engineer final review':
          this.statusText = 'Win & Pending US engineer final review';
          break;
        case 'Quote sent':
          this.statusText = 'Quote sent';
          break;
        case 'Final review approval':
          this.statusText = 'Final review approval';
          break; 

          default:
          this.statusText = 'Final review approval';
            break;
      }
    },

    /**progress详情 */
    async getProgressDetail() { 
      this.fullscreenLoading = true;
      let id = this.activeProgress;
      await progressDetail(id)
        .then((res) => { 
          if (res.code == 200) {
            this.progressForm = res.data; 
            this.progressForm.product_type = res.data.product_type && res.data.product_type.includes('&') ? res.data.product_type.split('&') : res.data.product_type; 
            //显示dueDateClock与否
            this.showCustomerDueDateClock = this.showDueDateClock('due_date'); 
            this.showInternalDueDateClock = this.showDueDateClock('inner_date'); 
            this.showTeamDueDateClock = this.showDueDateClock('team_due_date');
            //计算status-text用来回显再Quote status, bidding项目中，如果是不属于该范围的状态，均显示为最后一步；
            // this.computeStatusText(res.data.status_text); 
            let {configUnderView} = this.$store.state.app;
            let {sequence_file} = res.data;
            if (sequence_file && sequence_file != '') {
              this.progressForm['sequence_file'] = JSON.parse(sequence_file);
            }
            //把progressForm赋给Process,20231116
            this.progressDetailForProcess = this.progressForm;
            let seriesList = res.data.series;
            if (seriesList.length != 0) {
              seriesList = seriesList.map((item, index) => {
                let progress_version = res.data['version'];
                let count = index + 1;
                item['version'] = `${progress_version}-${count}`;
                return item;
              });
              this.seriesList = seriesList.reverse();
              //此时去store里找有没有存下来的被选中的config。如果有，就去选中这个config，没有就选中第一个
              if (configUnderView.id) {
                let targetSeries = this.seriesList.find(
                  (item) => {return item.id === configUnderView.id}
                );
                if (targetSeries) {
                  this.handleSeriesTab(targetSeries);
                }
                //如果当前的seriesList匹配不到store里面的configUnderView, 这种情况可能是切换到另一个Phase了，那就默认选中第一个
                else {
                  this.handleSeriesTab(this.seriesList[0]);
                }
              } else {
                this.handleSeriesTab(this.seriesList[0]);
              }
            }
            this.teamInfo = null;
            if (res.data.team_id) {
              this.getTeamList();
            }
            this.justifyRole();
            this.getProgressFiles();
            this.get3DCalculationFiles();
          this.get3DSimulationFiles();
          } else {
            this.$message.error(res.message);
          }
          this.fullscreenLoading = false;
          this.refreshUpdates()
          return;
        })
        .catch((err) => {
          console.log(err);
        })
    },
    sortLabelFiles(data) {
       let labelFiles = [];
       let files = [];
       labelFiles = data.reverse(); 
          labelFiles.forEach((item) => {
            //做一层防空处理，以防出现文件name或者url为空的时候，template渲染出问题
               if(item.files && item.files.length > 0) {
                  if(item.files[0].name && item.files[0].url) {
                    files.push(item);
                  }
               }
            })
        this.labelFiles = files; 
    },
    async getLabelFiles() {
      await progressFileList({id:this.winPhaseDetail.id, file_type:2})
        .then((res) => {
          if (res.code == 200) {
            let {data} = res;
            // this.labelFiles = data.reverse();
            this.sortLabelFiles(data); 
          }
          return;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    async getProgressFiles() {
      await progressFileList({id:this.progressForm.id, file_type:1})
        .then((res) => {
          if (res.code == 200) {
            let {data} = res;
            this.progressFiles = data.reverse();
          }
          return;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    async get3DCalculationFiles() {
    await progressFileList({id:this.progressForm.id, file_type:3})
    .then((res) => {
      if (res.code == 200) {
        let {data} = res;
        this.sort3Dfiles(data, 3);
      }
      return;
    })
  },
  async get3DSimulationFiles() {
    await progressFileList({id:this.simulationPhaseId, file_type:4})
    .then((res) => {
      if (res.code == 200) {
        let {data} = res;
        this.sort3Dfiles(data, 4);
      }
      return;
    })
  },

    /**添加series */
    handleCmomadSeries(command) {
      switch (command) {
        case 'new':
          this.handleAddSeries();
          break;
        case 'copy':
          this.getTotalProject();
          this.copyVisible = true;
          break;
      }
    },
    async getTotalProject() {
      await projectsTotal()
        .then((res) => {
          if (res.code == 200) {
            let {data} = res;
            this.projectList = data.reverse();
            let project_id = this.projectForm.id;
            this.copyForm.project = project_id;
            this.getTotalProgress(project_id);
          } else {
            // this.$message.error(res.message);
          }
          return;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    async getTotalProgress(id) {
      await projectDetail(id)
        .then((res) => {
          if (res.code == 200) {
            let {data} = res;
            this.progressOptions = data.progress.reverse();
          }
          return;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    copyChangeProject(params) {
      this.copyForm.progress = '';
      this.getTotalProgress(params);
    },
    handleAddSeries() {
    let phase = PHASE_VALUES.find((item) => {return item.label === this.currentPhase.progress});
      this.$router.push({
        path: '/index/project/series/form',
        query: {
          mode: 'add',
          progressId: this.progressForm.id,
         progressRate: phase.value
        }
      });
    },

    /**复制series */
    async copyChangeProgress(params) {
      await progressDetail(params)
        .then((res) => {
          if (res.code == 200) {
            let {data} = res;
            this.seriesOptions = data.series;
          } else {
            // this.$message.error(res.message);
          }
          return;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    copySeries() {
      // this.$refs['rulesCopySeries'].validate((valid) => {
      //     if (valid) {

      //     } else {
      //         return false;
      //     }
      // });
      let copyFormInputInvalid =
        !this.copyForm.project ||
        !this.copyForm.progress ||
        !this.copyForm.series;
      if (copyFormInputInvalid) {
        this.$message.error('Please select all the options required');
        return;
      } else {
        let {copyForm} = this;
        this.$router.push({
          path: '/index/project/series/form',
          query: {
            mode: 'copy',
            progressId: this.activeProgress,
            seriesId: copyForm.series
          }
        });
      }
    },

    /**编辑series */
    handleEditSeries() {
      // if (['CN Engineer Manager', 'US Engineer'].includes(this.userRole)) {
    let phase = PHASE_VALUES.find((item) => {return item.label === this.currentPhase.progress});
        this.$router.push({
          path: '/index/project/series/form',
          query: {
            mode: 'edit',
            progressId: this.progressForm.id,
            seriesId: this.activeSeries,
            progressRate: phase.value
          }
        });
      // } 
    },

    /**删除series */
    handleDeleteSeries() {
      this.$confirm('Are you sure to delete this configuration?', 'Tips', {
        confirmButtonText: 'Confirm',
        cancelButtonText: 'Cancel',
        type: 'warning'
      })
        .then(() => {
          this.removeSeries();
        })
        .catch(() => {});
    },
    async removeSeries() {
      await deleteSeries(this.activeSeries)
        .then((res) => {
          if (res.code == 200) {
            const that = this;
            that.$message({
                  message: 'Donely',
                  type: 'success'
                });
               that.getProgressDetail();
              //进行删除后，多个异步操作阻碍了页面刷新，导致重新获得的SeriesList不会被渲染在页面上，这里手动重新更新一次
              that.refreshSeriesList();
            // updateStatus(
            //   {
            //     id: this.progressForm.id,
            //     status: "US_HAS_BEEN_SEND",
            //   },
            //  async function () {
            //     that.$message({
            //       message: "Donely",
            //       type: "success",
            //     });
            //   await that.getProgressDetail();
            //   //进行删除后，多个异步操作阻碍了页面刷新，导致重新获得的SeriesList不会被渲染在页面上，这里手动重新更新一次
            //   that.refreshSeriesList();
            //   }
            // );
          } else {
            // this.$message.error(res.message);
          }
          return;
        })
        .catch((err) => {
          console.log(err);
        })
    },
    handleSeriesTab(row) {
      this.currentSeries = row;
      //向store存入选中的series
      this.$store.dispatch('app/changeConfigUnderView', row);
      this.activeSeries = row.id;
      this.moreSolar = false;
      this.getSeriesDetail();
    },
    async getSeriesDetail() {
      let id = this.activeSeries;
      this.fullscreenLoading = true;
      await seriesDetail(id)
        .then((res) => {
          if (res.code == 200) {
            this.solarForm = res.data.solar_module || {};
            this.trackerForm = res.data.racking_tracker || {};
            this.seriesForm = res.data || {};
          } else {
            // this.$message.error(res.message);
          }
          this.fullscreenLoading = false;
          //刷新updates
          this.refreshUpdates();
          return;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    handlePortsTab(params) {
      this.activePortsTab = params;
    },
    viewFile(params) { 
      this.directDownload(params.url, params.name); 
    },
    handleViewFile(file) {
    if (file && file.url) {
      if(process.env.NODE_ENV === 'production') {
        file.url = file.url.includes('https:') ? file.url : file.url.replace('http://', 'https://'); 
      }
        // 检查文件类型，这里假设支持PDF和Excel文件预览
        const isPDF = file.name.toLowerCase().endsWith('.pdf');
        const isExcel = file.name.toLowerCase().endsWith('.xls');

        if (isPDF || isExcel) {
            // 使用window.open()打开文件预览
            window.open(file.url, '_blank');
        } else {
            this.$message.error('this type of files are not supported for preview');
            // 在这里可以处理其他文件类型的预览方式
        }
    } else {
        console.log('invalid type');
    }
},
    //直接下载
    directDownload(url, name) { 
      url = url.includes('http') ? url : `${baseUrl.baseUrl}/${url}`; 
      if(process.env.NODE_ENV === 'production') {
        url = url.includes('https:') ? url : url.replace('http://', 'https://'); 
      }
      const x = new XMLHttpRequest()
  x.open('GET', url, true)
  x.responseType = 'blob'
  x.onload = function(e) {
      const url = window.URL.createObjectURL(x.response)
      const a = document.createElement('a')
      a.href = url
      a.target = '_blank'
      a.download = name
      a.click()
      a.remove()
  }
  x.send()

    },
    // onDownFile(url, filename) { 
    //   this.getBlob(url, (blob) => {
    //     this.saveAs(blob, filename);
    //   });
    // },
    // getBlob(url, cb) {
    //   var xhr = new XMLHttpRequest();
    //   xhr.open("GET", url, true);
    //   xhr.responseType = "blob";
    //   xhr.onprogress = (event) => {
    //     if (event.lengthComputable) {
    //       this.downloadProgress = (event.loaded / event.total) * 100;
    //     }
    //   };
    //   xhr.onload = function () {
    //     if (xhr.status === 200) {
    //       this.downloadProgress = 100;
    //       cb(xhr.response);
    //     }
    //   };
    //   xhr.send();
    // },
    // saveAs(blob, filename) {
    //   if (window.navigator.msSaveOrOpenBlob) {
    //     navigator.msSaveBlob(blob, filename);
    //   } else {
    //     var link = document.createElement("a");
    //     var body = document.querySelector("body");
    //     link.href = window.URL.createObjectURL(blob);
    //     link.download = filename;
    //     link.style.display = "none";
    //     body.appendChild(link);
    //     link.click();
    //     body.removeChild(link);
    //     window.URL.revokeObjectURL(link.href);
    //   }
    // },
    handleUpload(params) {
      if(this.seriesList.length == 0) {
      this.$message.error('Please add a configuration first');
      return;
    }
      let userInfo = JSON.parse(localStorage.getItem('user'));
      this.uploadTitle = params;
      this.uploadForm = {
        progress_id: '',
        type: '',
        quotation_file: [],
        circuit_map_file: [],
        other_files: [],
        total_price: undefined,
        per_watt_price: undefined,
        creation_name: userInfo.name,
        creation_id: userInfo.id,
        files:[]
      };

      this.quotation_files = [];
      this.circuit_map_files = [];
      this.other_files = [];
      this.uploadFileName = params == 'Label' ? 'Label' : 'Quote file';
      this.uploadVisible = true;
    },

    /**上传文件 */
    handleQuotationFilesProgresss(event, file, fileList) {
      if (event.lengthComputable) {
        let val = ((event.loaded / event.total) * 100).toFixed(0);
        this.loadQuotationFiles = parseInt(val);
        this.disabledSubmit = true; 
      }
    },
    updateQuotationFiles(res, file, fileList) {
      if (res.code == 200) {
        let data = res.data.files; 
        //v0.7.0版本，文件新增size传给后端
       data.size = Math.floor(file.size / 1024);
        this.uploadForm.files = [data];
        this.disabledSubmit = false; 
      }
    },
    viewQuotationFiles(file) {
      let res = file.response;
      if (res.code == 200) {
        let {url} = res.data.files;
        window.open(url);
      }
    },
    deleteQuotationFiles(file, fileList) {
      this.uploadForm.quotation_file = fileList.map((item) => {
        let res = item.response;
        let itemFile = res.data.files;
        return itemFile;
      });
    },
    exceedQuotationFiles(files, fileList) {
      if (fileList.length > 0) {
        this.$message({
          message: 'Only one file can be uploaded',
          type: 'warning'
        });
      }
    },
    //Other files
    handleOtherFilesProgresss(event, file, fileList) {
      if (event.lengthComputable) {
        let val = ((event.loaded / event.total) * 100).toFixed(0);
        this.loadOtherFiles = parseInt(val);
        this.disabledSubmit = true; 
      }
    },
    updateOtherFiles(res, file, fileList) {
      if (res.code == 200) {
        let data = res.data.files;
        this.uploadForm.other_files.push(data);
        this.disabledSubmit = false;
      }
    },
    viewOtherFiles(file) {
      let res = file.response;
      if (res.code == 200) {
        let {url} = res.data.files;
        window.open(url);
      }
    },
    deleteOtherFiles(file, fileList) {
      this.uploadForm.other_files = fileList.map((item) => {
        let res = item.response;
        let itemFile = res.data.files;
        return itemFile;
      });
    },
    async uploadProgressFile() { 
      let uploadForm = {...this.uploadForm}; 
      console.log('glak', uploadForm);
      //如果没有提交quotation file
      if (uploadForm.files.length == 0) {
        this.$message({
          message: 'Please select quote file',
          type: 'warning'
        });
        return false;
      }
      let userInfo = JSON.parse(localStorage.getItem('user'));
      await progressFile({
        progress_id: this.currentPhase.id,
        type: this.uploadTitle,
        quotation_file: uploadForm.quotation_file,
        circuit_map_file: '',
        other_files: uploadForm.other_files,
        creation_name: userInfo.name,
        creation_id: userInfo.id,
        project_id: this.projectForm.id,
        files: uploadForm.files,
        //bidding项目中，上传文件传1,formal proj中传2
        file_type: this.uploadFileName == 'Label' ? 2 : 1
      })
        .then((res) => { 
          if (res.code == 200) {
            this.uploadVisible = false;
            this.$nextTick(() => {
             this.getProjectDetail();
            })
          } else {
            // this.$message.error(res.message);
          }
          return;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    //转换成千分位
    formatNumberToThousands(num) {
      // 先将数字转换成字符串
      let numStr = String(num);

      // 检查是否含有小数部分
      let decimalPart = '';
      const decimalIndex = numStr.indexOf('.');
      if (decimalIndex !== -1) {
        decimalPart = numStr.slice(decimalIndex);
        numStr = numStr.slice(0, decimalIndex);
      }

      // 正则表达式匹配千分位
      const reg = /\B(?=(\d{3})+(?!\d))/g;
      numStr = numStr.replace(reg, ',');

      // 将小数部分重新拼接回去
      return numStr + decimalPart;
    },
    //将千分位数字字符串转化回数字
    removeThousandsSeparator(numberString) {
      // 使用正则表达式将千分位的逗号替换为空字符串
      let numStr = numberString.replace(/,/g, '');
      return parseFloat(numStr);
    },
    changeInputPt(e, count) {
      let inputVal = this.removeThousandsSeparator(e.target.value);
      inputVal = inputVal.toString();
      let indexOfDot = inputVal.indexOf('.');
      let integerPart = ''
      if(indexOfDot > -1) {
         integerPart = inputVal.substring(0, indexOfDot);
      }
      else {
        integerPart = inputVal;
      }
      if(integerPart.length > 11) {
        this.$message.error('The price should not exceed 11 figures');
        return
      }
      if(isNaN(e.target.value)) { 
        let {value} = e.target;
        const regex = /^[\d,\.]*$/; 
        let isNumberString = regex.test(value); 

        if(typeof value === 'string' && isNumberString) { 
          let removedThousandsVal = this.removeThousandsSeparator(value);
          removedThousandsVal = removedThousandsVal.toString();
          this.convertPriceFormat(removedThousandsVal); 
          return    
        }
        this.$message.error('Please enter a valid number');
        return
      }
      if (e.target.value == '') { 
        // e.target.value = 0;
        return;
      }
      if (count == 0) {
        e.target.value = parseInt(e.target.value);
      } else { 
        this.convertPriceFormat(e.target.value);
      }
    },
    convertPriceFormat(value) {
      // if (value.indexOf(".") >= 0) { 
      //     value = value.substring(
      //       0,
      //       value.indexOf(".") + (count + 1)
      //     );
      //     this.uploadForm.per_watt_price =
      //       this.uploadForm.total_price / (this.DCsize * 1000000);
      //     this.uploadForm.per_watt_price =
      //       this.uploadForm.per_watt_price.toFixed(6);
      //     this.uploadForm.total_price = this.formatNumberToThousands(
      //       +value
      //     );
      //     this.$refs.perWattPrice.focus();
      //     this.$refs.perWattPrice.blur();
      //   } else 
        // { 
          let pureNumberValue = this.removeThousandsSeparator(value);

          this.uploadForm.per_watt_price =
            pureNumberValue / ((+this.DCsize) * 1000000); 
          this.uploadForm.per_watt_price =
            this.uploadForm.per_watt_price.toFixed(6);
          this.uploadForm.total_price = this.formatNumberToThousands(
            +pureNumberValue
          );
          this.$refs.perWattPrice.focus();
          this.$refs.perWattPrice.blur();
        // }
    },
    changePerWattPrice(e) {
      if(isNaN(e.target.value)) {  
        return
      }
      else if(e.target.value.trim() == '') {
        return 
      }
      let perWattPrice = parseFloat(this.uploadForm.per_watt_price);
      this.uploadForm.per_watt_price = perWattPrice.toFixed(6);
    },

    /**更改progress status */
    getProgressStatus(params) {
        this.getProjectDetail();
    },
    transFormat(params, mode) {
      // let date = new Date(params);
      // let year = date.getFullYear();
      // let month = date.getMonth() + 1;
      // let day = date.getDate();
      // // let hour = date.getHours()-8;
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
      //   if(hour == 0) {
      //     hour = '00'
      //   }
      //   hour = `0${hour}`;
      // }
      // if (minute < 10) {
      //   minute = `0${minute}`;
      // }
      // if (second < 10) {
      //   second = `0${second}`;
      // }
      // let dateTime = `${year}-${month}-${day} ${hour}:${minute}:${second}`;
      // if (mode == "date") {
      //   year = isNaN(year) ? (year = "") : year;
      //   month = isNaN(month) ? (month = "") : month;
      //   day = isNaN(day) ? (day = "") : day;
      //   dateTime = `${year}-${month}-${day}`;
      // }
      return params;
    },
    viewProgressRecord() {
      this.progressRecordShow = !this.progressRecordShow;
    },
    handleSalesTag() {
      this.sales_tag_visible = true;
      this.projectForm.sales_status = Number(this.projectForm.sales_status);
     },
    async changeSalesTag() {
      let form = this.projectForm;
      let {selectWinPhaseForm} = this;
      let status = form.sales_status;
      if (!status || status == '') {
        this.$message({
          message: 'Please select at least one',
          type: 'warning'
        });
        return;
      }
      await changeProjectStatus({
        project_id: form.id,
        status: this.projectForm.sales_status,
        progress_id: this.projectForm.sales_status == 'Win' ? this.selectWinPhaseForm.phase : this.activeProgress,
        quote_id: selectWinPhaseForm.quote || null
      })
        .then((res) => {
          if (res.code == 200) {
            this.sales_tag_visible = false;
            this.$message({
              message: 'Done',
              type: 'success'
            });
            this.getProjectDetail();
          } else {
            // this.$message.error(res.message);
          }
          return;
        })
        .catch((err) => {
          console.log(err);
        })
    },
    calPerWattPrice(totalPrice) {
      this.uploadForm.per_watt_price = totalPrice / this.size;
    },
    showDueDateClock(dueDateType) { 
       let {archiving} = this.projectForm;
       let phaseArchiving = this.progressForm.archiving;  
       let salesStatus = this.projectForm.sales_status;
       let quoteStatus = this.projectForm.quote_status;
       let validQuoteStatusValue = judgeDisplayClock(dueDateType, quoteStatus); 

       if(!archiving && !phaseArchiving && (salesStatus == 1 || salesStatus == 2 || salesStatus == 3) && validQuoteStatusValue) {  
        return true
       }

       else {
        return false
       }
    }
  }
};
</script>

<style>
 .el-message-box {
  width: 720px !important
}
</style>

<style lang="less" scoped>
/* stylelint-disable rule-empty-line-before */
/* stylelint-disable selector-class-pattern */
/* stylelint-disable no-descending-specificity */
 .threeD-file-upload-td {
  display: flex;
  align-items: center;
  justify-content: space-between
}
.team-type-tabs {
  display: flex;
  justify-content: flex-start;
  margin-left: 24px;
  gap: 48px;

  .team-type-tab {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;

    .tab-text {
       font-size: 14px;
       font-weight: 400;
       color: #303133;
       cursor: pointer;
       &.selected-tab-text {
        color: #007BFF;
       }
    }
  
    .selected-mark {
      width: 18px;
      height: 4px;
      background: #007BFF;
      transform: translateY(12px)
    }
  }
}

.icon-n-text {
  display: flex;
  margin-top: 2px;
  margin-right: 2px;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  font-family: "PingFang SC-Regular", "PingFang SC", sans-serif;
  font-weight: 400;
  color: #007bff;
  img {
    width: 14px;
    height: 14px;
  }
}
.page-container {
  background: #fff;
  border-radius: 10px;
  padding: 30px 30px 30px 0;
  min-height: calc(100vh - 150px);
}
.card-header {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 20px;
  .card-title-wrapper {
    position: relative;
    display: flex;
    align-items: center;

    .title-line {
      width: 6px;
      height: 24px;
      background: rgb(0 123 255);
      border-radius: 3px;
      position: absolute;
      left: -2px;
    }
    .card-title {
      margin-left: 30px;
      font-size: 18px;
      font-family: 'PingFang SC-Medium', 'PingFang SC', sans-serif;
      font-weight: 500;
      color: rgb(0 123 255);
    }
    .sales-status {
      margin-left: 30px;
      font-size: 14px;
      padding: 3px 15px;
      border: solid rgb(0 123 255) 1px;
      border-radius: 5px;
      color: rgb(0 123 255);
    }
  }
}
.project-detail-container {
  margin: 0 0 30px 30px;
  .project-detail-wrapper {
    display: flex;
    .project-item {
      flex: 1;

      .simulation-task-btn {
        width: 160px;
        height: 32px;
        background: #FFF;
        border-radius: 4px;
        border: 1px solid #007BFF;     
        display: flex;
        justify-content: center;
        align-items: center;
        gap: 3px;
        cursor: pointer;
       
        &.disabled {
          background: #F5F7FA;
          border: 1px solid #D9D9D9;
          color: #BFBFBF;
          cursor: not-allowed;       
        }
      }

      .title-wrapper {
        display: flex;
        align-items: center;
        justify-content: space-between;
        color: rgb(0 123 255);
        text-align: center;
        .title-content {
          display: flex;
          align-items: center;
          .icon {
            margin-right: 10px;
          }
        }
        .sales-btn {
          display: flex;
          align-items: center;
          font-size: 14px;
          .icon {
            margin-right: 5px;
          }
        }
        .sales-btn:hover {
          cursor: pointer;
          opacity: 0.8;
        }
      }
      .content-wrapper {
        margin: 20px 20px 0 0;
        border: solid #eee 1px;
        border-bottom: 0;
        .info-item {
          display: flex;
          align-items: center;
          font-size: 14px;
          border-bottom: solid #eee 1px;
          .title-label {
            width: 110px;
            color: #111;
            font-family: 'PingFang SC-Regular', 'PingFang SC', sans-serif;
            text-align: justify;
            text-justify: distribute-all-lines;
            text-align-last: justify;
            padding: 5px 10px;
            border-right: solid #eee 1px;
          }
          .info-value {
            flex: 1;
            font-family: 'PingFang SC-Regular', 'PingFang SC', sans-serif;
            color: #111;
            padding: 5px 0 5px 20px;
          }
        }
      }
    }
  }
}
.progress-container {
  margin: 0 0 0 30px;
  .tab-container {
    display: flex;
    align-items: center;
    justify-content: space-between;
    .tab-wrapper {
      flex: 1;
      display: flex;
      align-items: center;
    }
    .tab-item {
      padding: 10px 15px;
      border: solid #eee 1px;
      border-radius: 5px 5px 0 0;
      font-size: 14px;
      border-bottom: 0;
      position: relative;

      .badge-crown {
        position: absolute;
  top: -5px;
  right: 0;
  width: 16px;
  height: 16px;
  background-image: url("@/assets/IconDesigns/icon_crown.png");
  background-size: cover;
      }
    }
    .active {
      background: rgb(0 123 255);
      color: #fff;
      border: solid rgb(0 123 255) 1px;
      border-bottom: 0;
      position: relative;
    }
    .tab-item:hover {
      cursor: pointer;
    }
    .in-progress {
      position: absolute;
      top: -18px;
      left: 0;
      width: 30px;
      height: 30px;
      font-size: 14px;
      color: #007bff;
    }
  }
}
table {
  tr {
    border: 1px solid #eee;
    border-right: 0;
  }
  td {
    border-right: 1px solid #eee;
    padding: 10px;
    font-size: 14px;
    min-width: 120px;
    color: #606266;
  }
  .status-value {
    color: #007bff;
  }
  .series-navbar-container {
    display: flex;
    align-items: center;
    justify-content: space-between;
    .series-navbar-wrapper {
      display: flex;
      align-items: center;
      .icon {
        margin-right: 5px;
      }
      .tab-item {
        margin-right: 20px;
        position: relative;
        color: #606266;
      }
      .tab-item:hover {
        cursor: pointer;
        color: rgb(0 123 255);
      }
      .active {
        color: rgb(0 123 255);
      }
    }
    .series-btn-wrapper {
      display: flex;
      align-items: center;
    }
    .add-series-btn {
      color: rgb(0 123 255);
      font-size: 14px;
      font-weight: normal;
      margin-left: 10px;
    }
    .add-series-btn:hover {
      cursor: pointer;
      opacity: 0.8;
    }
  }
  .ports-container {
    .ports-tab-container {
      display: flex;
      border-bottom: solid #eee 1px;
      .tab-item {
        flex: 1;
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 10px 0;
        position: relative;
      }
      .tab-item:hover {
        cursor: pointer;
        color: rgb(0 123 255);
      }
      .active {
        color: rgb(0 123 255);
      }
      .navbar-more {
        margin-left: 20px;
        color: #111;
        font-size: 12px;
      }
      .line {
        width: 15px;
        height: 2px;
        background: rgb(0 123 255);
        border-radius: 5px;
        position: absolute;
        left: 50%;
        bottom: 0;
        transform: translateX(-50%);
        animation: line-move 0.3s;
      }

      @keyframes line-move {
        0% {
          width: 0;
        }
        100% {
          width: 15px;
        }
      }
    }
    .ports-wrapper {
      margin: 0 0 0 20px;
      .item {
        width: 25%;
        min-width: 300px;
        display: inline-block;
        padding: 10px 0;
        font-size: 13px;
        .ports-label {
          display: inline-block;
          position: relative;
          // min-width: 120px;
        }
        .comfirm-icon {
          position: absolute;
          left: -15px;
          top: 0;
          .icon {
            color: rgb(0 123 255);
            font-size: 13px;
          }
        }
        .ports-value {
          display: inline-block;
          margin: 0 20px 0 15px;
        }
      }
      .ports-mode {
        clear: both;
      }
    }
  }
  .file-label {
    font-size: 13px;
  }
  .progress-file-wrapper {
    display: flex;
    flex-wrap: nowrap;
    .file-item {
      line-height: 30px;
    }
    .version {
      width: 60px;
    }
    .file-name {
      flex: 1;
      display: flex;
    }
    // .file-name:hover {
    //   cursor: pointer;
    //   color: #409eff;
    // }
    .label {
      min-width: 80px;
    }
    .price {
      width: 200px;
    }
    .price-block {
      width: 400px;
    }
    .creator {
      width: 160px;
    }
    .time {
      width: 180px;
    }
    .action {
      width: 40px;
      display: flex;
      justify-content: flex-end;
      .icon:hover {
        cursor: pointer;
        color: #f56c6c;
      }
    }
  }
  .file-item {
    font-size: 13px;
    display: flex;
    align-items: center;
    i {
      margin-right: 5px;
    }
    .file-item-label {
      width: 120px;
    }
  }
  .file-item span:hover {
    cursor: pointer;
    color: #409eff;
  }
  .files-wrapper {
    display: flex;
    align-items: center;
    justify-content: space-between;
    .card-btn {
      font-size: 13px;
    }
  }
}
.record-btn {
  margin-top: 20px;
}
.edit-record-container {
  margin-top: 20px;
  .edit-record-item {
    font-size: 14px;
    color: #606266;
    margin-bottom: 10px;
    .info {
      display: flex;
      align-items: center;
      .edit-record-line {
        width: 3px;
        height: 15px;
        background: #11a1fd;
        border-radius: 5px;
        margin-right: 10px;
      }
      .date {
        margin-right: 15px;
      }
    }
    .content {
      margin-top: 10px;
    }
  }
}
.select-win-phase-form {
  margin-top: 20px;
  margin-bottom: -30px
}
.operation-process-container {
  margin-top: 100px;
}
.no-data-wrapper {
  text-align: center;
  padding-top: 30px;
  padding-bottom: 20px;
  .label span {
    font-size: 14px;
    margin-top: 10px;
    color: #22223e;
  }
  .label span:hover {
    cursor: pointer;
    color: rgb(0 123 255);
  }
}
.upload-form {
  position: relative;
  .require {
    position: absolute;
    left: -130px;
    top: 0;
    font-size: 12px;
    color: #f56c6c;
  }
  :deep(.el-form-item__label) {
    text-align: left;
  }
  :deep(.el-input-number--small) {
    width: 215px;
  }
}

:deep(.el-dialog) {
  border-radius: 10px;
}
</style>
