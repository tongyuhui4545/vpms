<template>
  <div class="filter">
    <el-popover
      v-model="filterVisible"
      placement="bottom-start"
      width="600"
      trigger="click"
    >
      <!-- **************************************************************************************************** -->
      <!-- bidding project页面中的filter -->
      <template v-if="filterFor === 'bidding-project'">
        <el-form
          ref="formProject"
          :model="formData"
          label-width="120px"
          style="max-height: 700px; overflow-y: scroll; padding-right: 15px"
        >
          <el-form-item label="Project">
            <el-input
              v-model="formData.project"
              placeholder="Enter project to search"
              size="small"
            />
          </el-form-item>
          <el-form-item label="Sales">
            <el-select
              v-model="formData.sales"
              filterable
              clearable
              placeholder="Please select"
              size="small"
            >
              <el-option
                v-for="(item, key) in salesOptions"
                :key="key"
                :label="item.name"
                :value="item.id"
              />
            </el-select>
          </el-form-item>
          <el-form-item label="Customers">
            <el-select
              v-model="formData.customer"
              filterable
              clearable
              placeholder="Please select"
              size="small"
            >
              <el-option
                v-for="(item, key) in customerOptions"
                :key="key"
                :label="item.name"
                :value="item.id"
              />
            </el-select>
          </el-form-item>
          <el-form-item label="Creator">
            <el-select
              v-model="formData.creator"
              filterable
              clearable
              placeholder="Please select"
              size="small"
            >
              <el-option
                v-for="(item, key) in creatorList"
                :key="key"
                :label="item.name"
                :value="item.id"
              />
            </el-select>
          </el-form-item>
          <el-form-item label="Project status">
            <el-select
              v-model="formData.projectStatus"
              filterable
              clearable
              placeholder="Please select"
              size="small"
            >
              <el-option
                v-for="item in projectStatusOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </el-form-item>
          <el-form-item label="Solution">
            <el-select
              v-model="formData.solution"
              filterable
              clearable
              placeholder="Please select"
              size="small"
            >
              <el-option
                v-for="item in solutionOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </el-form-item>
          <el-form-item label="Team">
            <el-select
              v-model="formData.team_id"
              filterable
              clearable
              placeholder="Please select"
              size="small"
            >
              <el-option
                v-for="item in teamOptions"
                :key="item.id"
                :label="item.name"
                :value="item.id"
              />
            </el-select>
          </el-form-item>
          <el-form-item label="Quote status">
            <el-select
              v-model="formData.quoteStatus"
              filterable
              clearable
              placeholder="Please select quote status"
              size="small"
            >
              <el-option
                v-for="item in quoteStatusOptions"
                :key="item.value"
                :label="item.label"
                :value="item.label"
              />
            </el-select>
          </el-form-item>
          <el-form-item
            label="Customer due date"
            label-width="120"
          >
            <div style="display: flex; justify-content: space-around">
              <el-date-picker
                v-model="formData.quoteDueDateStart"
                type="date"
                value-format="yyyy-MM-dd HH:mm:ss"
                placeholder="Start"
                size="small"
              />
              <span>-</span>
              <el-date-picker
                v-model="formData.quoteDueDateEnd"
                type="date"
                value-format="yyyy-MM-dd HH:mm:ss"
                placeholder="End"
                size="small"
              />
            </div>
          </el-form-item>

          <el-form-item
            label="Interal due date"
            label-width="120"
          >
            <div style="display: flex; justify-content: space-around">
              <el-date-picker
                v-model="formData.inner_date_start"
                type="date"
                value-format="yyyy-MM-dd HH:mm:ss"
                placeholder="Start"
                size="small"
              />
              <span>-</span>
              <el-date-picker
                v-model="formData.inner_date_end"
                type="date"
                value-format="yyyy-MM-dd HH:mm:ss"
                placeholder="End"
                size="small"
              />
            </div>
          </el-form-item>

          <el-form-item
            label="Team due date"
            label-width="120"
          >
            <div style="display: flex; justify-content: space-around">
              <el-date-picker
                v-model="formData.team_due_date_start"
                type="date"
                value-format="yyyy-MM-dd HH:mm:ss"
                placeholder="Start"
                size="small"
              />
              <span>-</span>
              <el-date-picker
                v-model="formData.team_due_date_end"
                type="date"
                value-format="yyyy-MM-dd HH:mm:ss"
                placeholder="End"
                size="small"
              />
            </div>
          </el-form-item>

          <el-form-item label="Archiving status">
            <el-select
              v-model="formData.archiving"
              filterable
              clearable
              placeholder="Please select"
              size="small"
            >
              <el-option
                v-for="item in archivingOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </el-form-item>

          <el-form-item
            label="Size DC(MW)"
            prop="sizeFrom"
          >
            <el-input-number
              v-model="formData.sizeFrom"
              placeholder="Min"
              :min="0"
              size="small"
            />
            <span style="margin-left: 10px; margin-right: 10px">To</span>
            <el-input-number
              v-model="formData.sizeTo"
              placeholder="Max"
              :min="0"
              size="small"
            />
          </el-form-item>
          <el-form-item label="Creation time">
            <!-- <el-date-picker v-model="formData.creationTime" type="daterange" start-placeholder="From"
                            end-placeholder="To">
                        </el-date-picker> -->
            <div style="display: flex; justify-content: space-around">
              <el-date-picker
                v-model="formData.creationTimeFrom"
                type="date"
                value-format="yyyy-MM-dd HH:mm:ss"
                placeholder="Start"
                size="small"
              />
              <span>-</span>
              <el-date-picker
                v-model="formData.creationTimeTo"
                type="date"
                value-format="yyyy-MM-dd HH:mm:ss"
                placeholder="End"
                size="small"
              />
            </div>
          </el-form-item>
          <el-divider class="custom-divider" />
          <div class="form-buttons">
            <el-button
              type="primary"
              size="small"
              @click="resetForm"
            >
              Reset
            </el-button>
            <el-button
              type="primary"
              size="small"
              @click="handleConfirm"
            >
              Confirm
            </el-button>
          </div>
        </el-form>
      </template>
      <!-- formal project页面中的filter -->
      <template v-if="filterFor === 'formal-project'">
        <el-form
          ref="formalProject"
          :model="formData"
          label-width="120px"
          style="max-height: 700px; overflow-y: scroll; padding-right: 15px"
        >
          <el-form-item label="Project">
            <el-input
              v-model="formData.project"
              placeholder="Enter project to search"
              size="small"
            />
          </el-form-item>
          <el-form-item label="Sales">
            <el-select
              v-model="formData.sales"
              filterable
              clearable
              placeholder="Please select"
              size="small"
            >
              <el-option
                v-for="(item, key) in salesOptions"
                :key="key"
                :label="item.name"
                :value="item.id"
              />
            </el-select>
          </el-form-item>
          <el-form-item label="Customers">
            <el-select
              v-model="formData.customer"
              filterable
              clearable
              placeholder="Please select"
              size="small"
            >
              <el-option
                v-for="(item, key) in customerOptions"
                :key="key"
                :label="item.name"
                :value="item.id"
              />
            </el-select>
          </el-form-item>
          <el-form-item
            label="Label status"
            label-width="200"
          >
            <el-select
              v-model="formData.projectStatus"
              filterable
              clearable
              placeholder="Please select"
              size="small"
            >
              <el-option
                v-for="item in designingStatusOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </el-form-item>
          <el-form-item label="Solution">
            <el-select
              v-model="formData.solution"
              filterable
              clearable
              placeholder="Please select"
              size="small"
            >
              <el-option
                v-for="item in solutionOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </el-form-item>
          <el-form-item label="Team">
            <el-select
              v-model="formData.team_id"
              filterable
              clearable
              placeholder="Please select"
              size="small"
            >
              <el-option
                v-for="item in teamOptions"
                :key="item.id"
                :label="item.name"
                :value="item.id"
              />
            </el-select>
          </el-form-item>
          <el-form-item label="Due date">
            <div style="display: flex; justify-content: space-around">
              <el-date-picker
                v-model="formData.dueDateStart"
                type="date"
                value-format="yyyy-MM-dd HH:mm:ss"
                placeholder="Start"
                size="small"
              />
              <span>-</span>
              <el-date-picker
                v-model="formData.dueDateEnd"
                type="date"
                value-format="yyyy-MM-dd HH:mm:ss"
                placeholder="End"
                size="small"
              />
            </div>
          </el-form-item>
          <el-form-item
            label="Size DC(MW)"
            prop="sizeFrom"
          >
            <el-input-number
              v-model="formData.sizeFrom"
              placeholder="Min"
              :min="0"
              size="small"
            />
            <span style="margin-left: 10px; margin-right: 10px">To</span>
            <el-input-number
              v-model="formData.sizeTo"
              placeholder="Max"
              :min="0"
              size="small"
            />
          </el-form-item>
          <el-form-item label="Creation time">
            <div style="display: flex; justify-content: space-around">
              <el-date-picker
                v-model="formData.creationTimeFrom"
                type="date"
                value-format="yyyy-MM-dd HH:mm:ss"
                placeholder="Start"
                size="small"
              />
              <span>-</span>
              <el-date-picker
                v-model="formData.creationTimeTo"
                type="date"
                value-format="yyyy-MM-dd HH:mm:ss"
                placeholder="End"
                size="small"
              />
            </div>
          </el-form-item>
          <el-form-item label="Creator">
            <el-select
              v-model="formData.creator"
              filterable
              clearable
              placeholder="Please select"
              size="small"
            >
              <el-option
                v-for="(item, key) in creatorList"
                :key="key"
                :label="item.name"
                :value="item.id"
              />
            </el-select>
          </el-form-item>
          <el-divider class="custom-divider" />
          <div class="form-buttons">
            <el-button
              type="primary"
              size="small"
              @click="resetForm"
            >
              Reset
            </el-button>
            <el-button
              type="primary"
              size="small"
              @click="handleConfirm"
            >
              Confirm
            </el-button>
          </div>
        </el-form>
      </template>
      <!-- **************************************************************************************************** -->
      <!-- work-item-quote页面中的filter -->
      <template v-if="filterFor === 'work-item-quote'">
        <el-form
          ref="formWorkItemQuote"
          :model="formData"
          label-width="120px"
          style="max-height: 700px; overflow-y: scroll; padding-right: 15px"
        >
          <el-form-item label="Title">
            <el-input
              v-model="formData.title"
              placeholder="Enter title to search"
              size="small"
              clearable
            />
          </el-form-item>
          <el-form-item label="Project">
            <el-input
              v-model="formData.project"
              filterable
              placeholder="Please input"
              size="small"
              clearable
              @clear="handleClear"
            />
          </el-form-item>
          <el-form-item label="Phase">
            <el-input
              v-model="formData.progress"
              filterable
              placeholder="Please input"
              size="small"
              clearable
            />
          </el-form-item>
          <el-form-item label="Solution">
            <el-select
              v-model="formData.solution"
              placeholder="Please select"
              size="small"
              clearable
              filterable
            >
              <el-option
                label="Harness"
                value="Harness"
              />
              <el-option
                label="Lynx"
                value="Lynx"
              />
              <el-option
                label="Alex"
                value="Alex"
              />
            </el-select>
          </el-form-item>
          <el-form-item label="Team">
            <el-select
              v-model="formData.team_id"
              filterable
              placeholder="Please select"
              size="small"
              clearable
            >
              <el-option
                v-for="item in teamOptions"
                :key="item.id"
                :label="item.name"
                :value="item.id"
              />
            </el-select>
          </el-form-item>
          <el-form-item label="Quote status">
            <el-select
              v-model="formData.progress_status"
              filterable
              placeholder="Please select"
              size="small"
              clearable
            >
              <el-option
                v-for="(item, key) in quoteStatusOptions"
                :key="key"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </el-form-item>
          <el-form-item
            label="Customer due date"
            label-width="160px"
          >
            <div style="display: flex; justify-content: space-around">
              <el-date-picker
                v-model="formData.due_date_start"
                type="date"
                value-format="yyyy-MM-dd HH:mm:ss"
                placeholder="Start"
              />
              <span>-</span>
              <el-date-picker
                v-model="formData.due_date_end"
                type="date"
                value-format="yyyy-MM-dd HH:mm:ss"
                placeholder="End"
              />
            </div>
          </el-form-item>
          <el-form-item
            label="Internal due date"
            label-width="160px"
          >
            <div style="display: flex; justify-content: space-around">
              <el-date-picker
                v-model="formData.inner_date_start"
                type="date"
                value-format="yyyy-MM-dd HH:mm:ss"
                placeholder="Start"
              />
              <span>-</span>
              <el-date-picker
                v-model="formData.inner_date_end"
                type="date"
                value-format="yyyy-MM-dd HH:mm:ss"
                placeholder="End"
              />
            </div>
          </el-form-item>
          <el-form-item
            label="Team due date"
            label-width="160px"
          >
            <div style="display: flex; justify-content: space-around">
              <el-date-picker
                v-model="formData.team_due_date_start"
                type="date"
                value-format="yyyy-MM-dd HH:mm:ss"
                placeholder="Start"
              />
              <span>-</span>
              <el-date-picker
                v-model="formData.team_due_date_end"
                type="date"
                value-format="yyyy-MM-dd HH:mm:ss"
                placeholder="End"
              />
            </div>
          </el-form-item>
          <el-form-item label="Creation date">
            <div style="display: flex; justify-content: space-around">
              <el-date-picker
                v-model="formData.creation_date_start"
                type="date"
                value-format="yyyy-MM-dd HH:mm:ss"
                placeholder="Start"
              />
              <span>-</span>
              <el-date-picker
                v-model="formData.creation_date_end"
                type="date"
                value-format="yyyy-MM-dd HH:mm:ss"
                placeholder="End"
              />
            </div>
          </el-form-item>
          <el-form-item label="Creator">
            <el-select
              v-model="formData.creator"
              filterable
              placeholder="Please select"
              size="small"
              clearable
            >
              <el-option
                v-for="(item, key) in creatorList"
                :key="key"
                :label="item.name"
                :value="item.id"
              />
            </el-select>
          </el-form-item>
          <el-divider class="custom-divider" />
          <div class="form-buttons">
            <el-button
              type="primary"
              @click="resetForm"
            >
              Reset
            </el-button>
            <el-button
              type="primary"
              @click="handleConfirm"
            >
              Confirm
            </el-button>
          </div>
        </el-form>
      </template>
      <!-- **************************************************************************************************** -->
      <!-- work-item-project页面中的filter -->
      <template v-if="filterFor === 'work-item-project'">
        <el-form
          ref="formWorkItemProject"
          :model="formData"
          label-width="120px"
          style="max-height: 700px; overflow-y: scroll; padding-right: 15px"
        >
          <el-form-item label="Title">
            <el-input
              v-model="formData.title"
              placeholder="Enter title to search"
              size="small"
              clearable
            />
          </el-form-item>
          <el-form-item label="Project">
            <el-input
              v-model="formData.project"
              filterable
              placeholder="Please input"
              size="small"
              clearable
              @clear="handleClear"
            />
          </el-form-item>
          <el-form-item label="Team">
            <el-select
              v-model="formData.team_id"
              filterable
              placeholder="Please select"
              size="small"
              clearable
            >
              <el-option
                v-for="item in teamOptions"
                :key="item.id"
                :label="item.name"
                :value="item.id"
              />
            </el-select>
          </el-form-item>
          <el-form-item label="Solution">
            <el-select
              v-model="formData.solution"
              placeholder="Please select"
              size="small"
              clearable
              filterable
            >
              <el-option
                v-for="(item, key) in solutionOptions"
                :key="key"
                :label="item.value"
                :value="item.id"
              />
            </el-select>
          </el-form-item>
          <el-form-item
            label="Designing Status"
            label-width="140px"
          >
            <el-select
              v-model="formData.progress_status"
              filterable
              placeholder="Please select"
              size="small"
              clearable
            >
              <el-option
                v-for="(item, key) in designingStatusOptions"
                :key="key"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </el-form-item>
          <el-form-item label="Due date">
            <div style="display: flex; justify-content: space-around">
              <el-date-picker
                v-model="formData.due_date_start"
                type="date"
                value-format="yyyy-MM-dd HH:mm:ss"
                placeholder="Start"
              />
              <span>-</span>
              <el-date-picker
                v-model="formData.due_date_end"
                type="date"
                value-format="yyyy-MM-dd HH:mm:ss"
                placeholder="End"
              />
            </div>
          </el-form-item>
          <el-form-item label="Creation date">
            <div style="display: flex; justify-content: space-around">
              <el-date-picker
                v-model="formData.creation_date_start"
                type="date"
                value-format="yyyy-MM-dd HH:mm:ss"
                placeholder="Start"
              />
              <span>-</span>
              <el-date-picker
                v-model="formData.creation_date_end"
                type="date"
                value-format="yyyy-MM-dd HH:mm:ss"
                placeholder="End"
              />
            </div>
          </el-form-item>
          <el-form-item label="Creator">
            <el-select
              v-model="formData.creator"
              filterable
              placeholder="Please select"
              size="small"
              clearable
            >
              <el-option
                v-for="(item, key) in creatorList"
                :key="key"
                :label="item.name"
                :value="item.id"
              />
            </el-select>
          </el-form-item>
          <el-divider class="custom-divider" />
          <div class="form-buttons">
            <el-button
              type="primary"
              @click="resetForm"
            >
              Reset
            </el-button>
            <el-button
              type="primary"
              @click="handleConfirm"
            >
              Confirm
            </el-button>
          </div>
        </el-form>
      </template>
      <!-- ********************************************************************************************* -->
      <!-- Solar Module中的filter -->
      <template v-if="filterFor === 'solar-module'">
        <el-form
          v-if="filterFor === 'solar-module'"
          ref="formSolarModule"
          :model="formData"
          label-width="120px"
          style="max-height: 700px; overflow-y: scroll; padding-right: 15px"
        >
          <el-form-item label="Model">
            <el-input
              v-model="formData.model"
              placeholder="Enter model to search"
            />
          </el-form-item>
          <el-form-item label="Manufacturer">
            <el-select
              v-model="formData.manufacturer"
              filterable
              placeholder="Please select"
              size="small"
              clearable
              @clear="handleClear"
            >
              <el-option
                v-for="(item, key) in manufacturerOptions"
                :key="key"
                :label="item.mfr_name"
                :value="item.id"
              />
            </el-select>
          </el-form-item>
          <el-form-item label="Module series">
            <el-select
              v-model="formData.moduleSeries"
              filterable
              placeholder="Please select"
              size="small"
              clearable
            >
              <el-option
                v-for="(item, key) in seriesOptions"
                :key="key"
                :label="item.series"
                :value="item.id"
              />
            </el-select>
          </el-form-item>
          <el-form-item label="Bifacial">
            <el-select
              v-model="formData.bifacial"
              placeholder="Please select"
              clearable
            >
              <el-option
                label="N/A"
                :value="0"
              />
              <el-option
                label="Yes"
                :value="1"
              />
            </el-select>
          </el-form-item>
          <el-form-item label="Creation time">
            <div style="display: flex; justify-content: space-around">
              <el-date-picker
                v-model="formData.creationTimeFrom"
                type="date"
                value-format="yyyy-MM-dd HH:mm:ss"
                placeholder="Start"
              />
              <span>-</span>
              <el-date-picker
                v-model="formData.creationTimeTo"
                type="date"
                value-format="yyyy-MM-dd HH:mm:ss"
                placeholder="End"
              />
            </div>
          </el-form-item>
          <el-divider class="custom-divider" />
          <div class="form-buttons">
            <el-button
              type="primary"
              @click="resetForm"
            >
              Reset
            </el-button>
            <el-button
              type="primary"
              @click="handleConfirm"
            >
              Confirm
            </el-button>
          </div>
        </el-form>
      </template>
      <!-- Racking/Tracker的filter -->
      <template v-if="filterFor === 'racking-tracker'">
        <el-form
          ref="formRackingTracker"
          :model="formData"
          label-width="120px"
          style="max-height: 700px; overflow-y: scroll; padding-right: 15px"
        >
          <el-form-item label="Series">
            <el-input
              v-model="formData.series"
              placeholder="Enter to search"
            />
          </el-form-item>
          <el-form-item label="Manufacturer">
            <el-select
              v-model="formData.manufacturer"
              filterable
              placeholder="Please select"
              size="small"
              clearable
            >
              <el-option
                v-for="(item, key) in manufacturerOptions"
                :key="key"
                :label="item.mfr_name"
                :value="item.id"
              />
            </el-select>
          </el-form-item>
          <el-form-item label="Creation time">
            <div style="display: flex; justify-content: space-around">
              <el-date-picker
                v-model="formData.creationTimeFrom"
                type="date"
                value-format="yyyy-MM-dd HH:mm:ss"
                placeholder="Start"
              />
              <span>-</span>
              <el-date-picker
                v-model="formData.creationTimeTo"
                type="date"
                value-format="yyyy-MM-dd HH:mm:ss"
                placeholder="End"
              />
            </div>
          </el-form-item>
          <el-divider class="custom-divider" />
          <div class="form-buttons">
            <el-button
              type="primary"
              @click="resetForm"
            >
              Reset
            </el-button>
            <el-button
              type="primary"
              @click="handleConfirm"
            >
              Confirm
            </el-button>
          </div>
        </el-form>
      </template>
      <span slot="reference">
        <el-badge
          v-if="filterNum !== 0"
          :value="filterNum"
          type="primary"
        >
          <img
            class="filter-icon"
            src="@/assets/IconDesigns/filter.png"
            alt="filter"
          >
        </el-badge>
        <img
          v-else
          class="filter-icon"
          src="@/assets/IconDesigns/filter.png"
          alt="filter"
        >
      </span>
    </el-popover>
  </div>
</template>

<script>
import {
  customerAll,
  salesList,
  manufacturerList,
  seriesList,
  userList,
  teamList
} from '@/api/index.js';
import { formatTime } from '@/utils/format-time.js';

export default {
  name: 'TableFilter',
  components: {
    // filterIcon
  },
  props: {
    filterFor: {
      type: String,
      default: ''
    }
  },
  data() {
    let formData = {};
    let filterNum = 0;
    if (this.filterFor === 'bidding-project') {
      formData = {
        project: '',
        sales: '',
        customer: '',
        projectStatus: '',
        quoteStatus: '',
        quoteDueDateStart: '',
        quoteDueDateEnd: '',
        inner_date_start: '',
        inner_date_end: '',
        team_due_date_start: '',
        team_due_date_end: '',
        sizeFrom: undefined,
        sizeTo: undefined,
        creationTimeFrom: '',
        creationTimeTo: '',
        solution: '',
        team_id: '',
        archiving: ''
      };
      filterNum = this.$store.state.app.projectFilterNum;
    }
    if (this.filterFor === 'formal-project') {
      formData = {
        project: '',
        sales: '',
        customer: '',
        projectStatus: '',
        dueDateStart: '',
        dueDateEnd: '',
        sizeFrom: undefined,
        sizeTo: undefined,
        creationTimeFrom: '',
        creationTimeTo: '',
        solution: '',
        team_id: '',
        creator: ''
      };
      filterNum = this.$store.state.app.projectFilterNum;
    }
    if (this.filterFor === 'work-item-quote') {
      formData = {
        title: '',
        project: '',
        progress: '',
        solution: '',
        team_id: '',
        progress_status: '',
        due_date_start: '',
        due_date_end: '',
        inner_date_start: '',
        inner_date_end: '',
        team_due_date_start: '',
        team_due_date_end: '',
        creation_date_start: '',
        creation_date_end: '',
        creator: ''
      };
      filterNum = this.$store.state.app.workItemQuoteFilterNum;
    }
    if (this.filterFor === 'work-item-project') {
      formData = {
        title: '',
        project: '',
        team_id: '',
        solution: '',
        progress_status: '',
        due_date_start: '',
        due_date_end: '',
        creation_date_start: '',
        creation_date_end: '',
        creator: ''
      };
      filterNum = this.$store.state.app.workItemProjectFilterNum;
    }
    if (this.filterFor === 'solar-module') {
      formData = {
        model: '',
        manufacturer: undefined,
        moduleSeries: undefined,
        bifacial: '',
        creationTimeFrom: '',
        creationTimeTo: ''
      };
      filterNum = this.$store.state.app.solarFilterNum;
    }
    if (this.filterFor === 'racking-tracker') {
      formData = {
        series: '',
        manufacturer: '',
        creationTimeFrom: '',
        creationTimeTo: ''
      };
      filterNum = this.$store.state.app.trackerFilterNum;
    }
    return {
      filterVisible: false,
      clearStoreFilter: true,
      formData,
      filterNum,
      totalUserPage: 1,
      customerOptions: [],
      creatorList: [],
      salesOptions: [],
      quoteStatusOptions: [
        {
          label: 'Pending US engineer review',
          value: 'US_TO_BE_SEND'
        },
        {
          label: 'Pending assign design team',
          value: 'US_HAS_BEEN_SEND'
        },
        {
          label: 'Team assigned & Pending quote',
          value: 'CN_ASSIGNED'
        },
        {
          label: 'Quote submited & Pending CN approval',
          value: 'CN_TEAM_ALREADY_APPLIED'
        },
        {
          label: 'Quote rejected & Pending re-quote',
          value: 'CN_REJECTED'
        },
        {
          label: 'Pending US approval',
          value: 'CN_PASSED'
        },
        {
          label: 'US engineer rejected',
          value: 'US_REJECTED'
        },
        {
          label: 'Quote released',
          value: 'US_PASSED'
        },
        {
          label: 'Quote sent',
          value: 'QUOTE_SENT'
        },
        {
          label: 'Win & Pending US engineer final review',
          value: 'WIN'
        },
        {
          label: 'Final review approval',
          value: 'US_FINAL_PASSED'
        }
      ],
      projectStatusOptions: [
        {
          value: 1,
          label: 'Bidding'
        },
        {
          value: 2,
          label: 'Win'
        },
        {
          value: 3,
          label: 'Win Via Another EPC'
        },
        {
          value: 4,
          label: 'Lost'
        },
        {
          value: 5,
          label: 'On-hold'
        },
        {
          value: 6,
          label: 'Canceled'
        }
      ],
      designingStatusOptions: [
        {
          value: 'FORMAL_ASSIGNED_TEAM',
          label: 'Pending assign label team'
        },
        {
          value: 'FORMAL_DESIGN_LABEL',
          label: 'Team assigned & Pending label file'
        },
        {
          value: 'FORMAL_LABEL_SEND',
          label: 'Label file submited & Pending approval'
        },
        {
          value: 'FORMAL_LABEL_REJECTED',
          label: 'Label file rejected & Pending re-label'
        },
        {
          value: 'FORMAL_LABEL_RELEASED',
          label: 'Label file released'
        }
      ],
      solutionOptions: [
        {
          value: 'Harness',
          label: 'Harness'
        },
        {
          value: 'Lynx',
          label: 'Lynx'
        },
        {
          value: 'Alex',
          label: 'Alex'
        }
      ],
      archivingOptions: [
        {
          value: 1,
          label: 'Archived'
        },
        {
          value: 0,
          label: 'Unarchived'
        }
      ],
      teamOptions: [],
      //制造商列表
      manufacturerOptions: [],
      //系列列表
      seriesOptions: []
    };
  },
  computed: {
    filterFieldSelected() {
      return Object.values(this.formData).filter((value) => {
        return value !== '' && value !== undefined && value !== null;
      }).length;
    }
  },
  watch: {
    'formData.manufacturer'(newVal) {
      //   this.formData.moduleSeries = undefined;

      if (!newVal) {
        this.formData.moduleSeries = undefined;
        this.seriesOptions = [];
        return;
      }

      this.seriesOptions = [];
      this.getSeriesList(newVal);
    }
  },
  created() {
    if (this.filterFor === 'bidding-project') {
      this.getCustomers();
      this.getSalesList();
      this.getWholeUserList();
    }
    if (this.filterFor === 'formal-project') {
      this.getSalesList();
      this.getWholeUserList();
      this.getCustomers();
      this.getTeamData();
    }
    if (this.filterFor === 'bidding-project') {
      this.getCustomers();
      this.getSalesList();
      this.getWholeUserList();
    }
    if (this.filterFor === 'solar-module') {
      this.getManufacturers();
    }
    if (this.filterFor === 'racking-tracker') {
      this.getManufacturers();
    }
    if (this.filterFor === 'work-item-quote') {
      this.getSalesList();
      this.getWholeUserList();
      this.getCustomers();
      this.getTeamData();
    }
    if (this.filterFor === 'work-item-project') {
      this.getSalesList();
      this.getWholeUserList();
      this.getCustomers();
      this.getTeamData();
    }
  },
  methods: {
    clearFilterNum() {
      this.filterNum = 0;
    },
    keepPage(filterFor) {
      if (filterFor === 'bidding-project') {
        this.formData = this.$store.state.app.projectFilter;
        this.getTeamData();
        let currentPage = this.$store.state.app.projectListCurrentPage;
        this.$emit('onFilter', this.formData, currentPage);
      }
      if (filterFor === 'solar-module') {
        this.formData = this.$store.state.app.solarFilter;
        let currentPage = this.$store.state.app.projectListCurrentPage;
        this.$emit('onFilter', this.formData, currentPage);
      }
      if (filterFor === 'racking-tracker') {
        this.formData = this.$store.state.app.trackerFilter;
        let currentPage = this.$store.state.app.projectListCurrentPage;
        this.$emit('onFilter', this.formData, currentPage);
      }
    },
    //mfr清空时
    handleClear() {
      this.seriesOptions = [];
      this.formData.manufacturer = undefined;
      this.$nextTick(() => {
        this.formData.moduleSeries = undefined;
      });
    },
    handleConfirm() {
      if (this.filterFor === 'bidding-project') {
        this.handleConfirmProjectFilter();
        this.$store.dispatch(
          'app/changeProjectFilterNum',
          this.filterFieldSelected
        );
        this.filterNum = this.$store.state.app.projectFilterNum;
        //暂存projectList页面中的filter
        this.$store.dispatch('app/storeProjectFilter', this.formData);
      }
      if (this.filterFor === 'formal-project') {
        this.handleConfirmFormalProjectFilter();
        this.$store.dispatch(
          'app/changeFormalProjectFilterNum',
          this.filterFieldSelected
        );
        this.filterNum = this.$store.state.app.formalProjectFilterNum;
        //暂存projectList页面中的filter
        this.$store.dispatch('app/storeFormalProjectFilter', this.formData);
      }
      if (this.filterFor === 'solar-module') {
        this.handleConfirmSolarModuleFilter();
        this.$store.dispatch(
          'app/changeSolarFilterNum',
          this.filterFieldSelected
        );
        this.filterNum = this.$store.state.app.solarFilterNum;
        //暂存solarModuleList页面中的filter
        this.$store.dispatch('app/storeSolarFilter', this.formData);
      }
      if (this.filterFor === 'racking-tracker') {
        this.handleConfirmRackingTrackerFilter();
        this.$store.dispatch(
          'app/changeTrackerFilterNum',
          this.filterFieldSelected
        );
        this.filterNum = this.$store.state.app.trackerFilterNum;
        //暂存rackingTrackerList页面中的filter
        this.$store.dispatch('app/storeTrackerFilter', this.formData);
      }
      if (this.filterFor === 'work-item-quote') {
        this.handleConfirmWorkItemQuoteFilter();
        //暂存workItemQuoteList页面中的filter
        this.$store.dispatch(
          'app/changeWorkItemQuoteFilterNum',
          this.filterFieldSelected
        );
        this.filterNum = this.$store.state.app.workItemQuoteFilterNum;
        //暂存workItemQuoteList页面中的filter
        this.$store.dispatch('app/storeWorkItemQuoteFilter', this.formData);
      }
      if (this.filterFor === 'work-item-project') {
        this.handleConfirmWorkItemProjectFilter();
        this.$store.dispatch(
          'app/changeWorkItemProjectFilterNum',
          this.filterFieldSelected
        );
        this.filterNum = this.$store.state.app.workItemProjectFilterNum;
        //暂存workItemProjectList页面中的filter
        this.$store.dispatch('app/storeWorkItemProjectFilter', this.formData);
      }
      this.$store.dispatch('app/clearAllPage');
      this.$store.dispatch('app/clearAllPosition');
    },
    //处理project页面中的filter
    handleConfirmProjectFilter() {
      if (this.formData.sizeFrom > this.formData.sizeTo) {
        this.$message.error('The range of \'Size DC(MW)\' is incorrect');
        return;
      }
      this.$emit('onFilter', this.formData, 1);
      this.filterVisible = false;
    },
    //处理formal-project页面中的filter
    handleConfirmFormalProjectFilter() {
      if (this.formData.sizeFrom > this.formData.sizeTo) {
        this.$message.error('The range of \'Size DC(MW)\' is incorrect');
        return;
      }
      this.$emit('onFilter', this.formData, 1);
      this.filterVisible = false;
    },
    //处理Solar Module中的filter
    handleConfirmSolarModuleFilter() {
      this.$emit('onFilter', this.formData, 1);
      this.filterVisible = false;
    },
    //处理Racking&Tracker中的filter
    handleConfirmRackingTrackerFilter() {
      this.$emit('onFilter', this.formData, 1);
      this.filterVisible = false;
    },
    //处理work-item-quote中的filter
    handleConfirmWorkItemQuoteFilter() {
      if (this.formData.due_date_start) {
        this.formData.due_date_start = formatTime(this.formData.due_date_start);
      }
      if (this.formData.due_date_end) {
        this.formData.due_date_end = formatTime(this.formData.due_date_end);
      }
      if (this.formData.inner_date_start) {
        this.formData.inner_date_start = formatTime(
          this.formData.inner_date_start
        );
      }
      if (this.formData.inner_date_end) {
        this.formData.inner_date_end = formatTime(this.formData.inner_date_end);
      }
      if (this.formData.team_due_date_start) {
        this.formData.team_due_date_start = formatTime(
          this.formData.team_due_date_start
        );
      }
      if (this.formData.team_due_date_end) {
        this.formData.team_due_date_end = formatTime(
          this.formData.team_due_date_end
        );
      }
      if (this.formData.created_time_start) {
        this.formData.created_time_start = formatTime(
          this.formData.created_time_start
        );
      }
      if (this.formData.created_time_end) {
        this.formData.created_time_end = formatTime(
          this.formData.created_time_end
        );
      }

      this.$emit('onFilter', this.formData, 1);
      this.filterVisible = false;
    },
    //处理work-item-project中的filter
    handleConfirmWorkItemProjectFilter() {
      this.$emit('onFilter', this.formData, 1);
      this.filterVisible = false;
    },
    //获取客户
    getCustomers() {
      customerAll()
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
    getTeamData() {
      teamList()
        .then((res) => {
          if (res.code === 200) {
            this.teamOptions = res.data;
          }
          return;
        })
        .catch((err) => {
          return err;
        });
    },
    getWholeUserList() {
      userList({ page: 1 })
        .then((res) => {
          if (res.code === 200) {
            let pageNum = res.data.total / res.data.per_page;
            this.totalUserPage = Math.ceil(pageNum);
            for (let i = 0; i < this.totalUserPage; i++) {
              this.getUserList(i + 1);
            }
          }
        })
        .catch((err) => {
          return err;
        });
    },
    getUserList(pageNum) {
      userList({ page: pageNum })
        .then((res) => {
          if (res.code === 200) {
            this.creatorList = this.creatorList.concat(res.data.data);
          }
          return;
        })
        .catch((err) => {
          return err;
        });
    },
    //获取销售列表
    async getSalesList() {
      await salesList()
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
    //获取制造商列表
    getManufacturers() {
      let type = this.filterFor === 'solar-module' ? 1 : 2;
      manufacturerList({ type })
        .then((res) => {
          if (res.code === 200) {
            this.manufacturerOptions = res.data;
          }
          return;
        })
        .catch((err) => {
          return err;
        });
    },
    //获取系列列表
    getSeriesList(val) {
      seriesList({ mfr_id: val })
        .then((res) => {
          if (res.code === 200) {
            this.seriesOptions = res.data;
          }
          return;
        })
        .catch((err) => {
          return err;
        });
    },
    resetForm() {
      if (this.filterFor === 'bidding-project') {
        this.formData = {
          project: '',
          sales: '',
          customer: '',
          creator: undefined,
          tag: '',
          quoteStatus: '',
          quoteDueDateStart: '',
          quoteDueDateEnd: '',
          sizeFrom: undefined,
          sizeTo: undefined,
          creationTimeFrom: '',
          creationTimeTo: ''
        };
      }
      if (this.filterFor === 'formal-project') {
        this.formData = {
          project: '',
          sales: '',
          customer: '',
          projectStatus: '',
          dueDateStart: '',
          dueDateEnd: '',
          sizeFrom: undefined,
          sizeTo: undefined,
          creationTimeFrom: '',
          creationTimeTo: '',
          solution: '',
          team_id: '',
          creator: ''
        };
      }
      if (this.filterFor === 'solar-module') {
        this.formData = {
          model: '',
          manufacturer: '',
          moduleSeries: '',
          bifacial: '',
          creationTimeFrom: '',
          creationTimeTo: ''
        };
      }
      if (this.filterFor === 'racking-tracker') {
        this.formData = {
          series: '',
          manufacturer: '',
          creationTimeFrom: '',
          creationTimeTo: ''
        };
      }
      if (this.filterFor === 'work-item-quote') {
        this.formData = {
          title: '',
          project: '',
          phase: '',
          solution: '',
          team: '',
          progress_status: '',
          customer_due_date_start: '',
          customer_due_date_end: '',
          internal_due_date_start: '',
          internal_due_date_end: '',
          team_due_date_start: '',
          team_due_date_end: '',
          creation_date_start: '',
          creation_date_end: '',
          creator: ''
        };
      }
      if (this.filterFor === 'work-item-project') {
        this.formData = {
          title: '',
          project: '',
          team_id: '',
          solution: '',
          progress_status: '',
          due_date_start: '',
          due_date_end: '',
          creation_date_start: '',
          creation_date_end: '',
          creator: ''
        };
      }
    }
  }
};
</script>

<style lang="less" scoped>
.filter-icon {
  cursor: pointer;
  width: 18px;
  height: 18px;
}

.dc-range {
  display: flex;
  justify-content: space-between;
  align-items: center;

  span {
    margin: 0 10px;
    flex-shrink: 0;
  }
}

.custom-divider {
  height: 2px;
}

.form-buttons {
  display: flex;
  justify-content: flex-end;
}

.icon-shaixuanguolv {
  cursor: pointer;
}

/* stylelint-disable-next-line selector-class-pattern */
::v-deep .el-badge__content.is-fixed {
  position: absolute;
  top: -4px;
  right: 8px;
  transform: translateY(-50%) translateX(100%);
}
</style>
