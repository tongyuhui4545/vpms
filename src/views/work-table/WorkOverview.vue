<template>
  <div class="work-table-container">
    <div
      v-if="showPageTabs"
      class="overview-page-tabs-wrapper"
    >
      <div
        v-for="item in pageTabs"
        :key="item.value"
        :class="[
          'overview-page-tab',
          { selected: item.value === selectedPageTab }
        ]"
        @click="handleChoosePageTab(item.value)"
      >
        <div class="text">
          {{ item.label }}
        </div>
        <div
          v-if="item.value === selectedPageTab"
          class="under-line"
        />
      </div>
    </div>
    <div
      v-if="selectedPageTab === 'worktable'"
      class="worktable-page"
    >
      <div class="content-area-left">
        <!-- <WorkItemTable /> -->
        <div class="task-overview page-content-card">
          <div
            v-if="!onlyHasOtherTasks"
            class="task-type-tabs-wrapper"
          >
            <div
              v-for="item in taskTabs"
              :key="item.value"
              class="task-type-tab"
              @click="handleChooseTaskTab(item)"
            >
              <span
                :class="{
                  'task-number': true,
                  selected: item.value === tableType
                }"
              >{{ taskNumbersMap[item.label] }}</span>
              <span
                :class="{
                  'task-label': true,
                  selected: item.value === tableType
                }"
              >{{ item.label }}</span>
            </div>
          </div>
          <div
            class="task-table-wrapper"
            :style="{ paddingTop: conputedTablePaddingTop }"
          >
            <div class="header-part">
              <span class="table-title">Pending for me</span>
              <span
                class="link-to"
                @click="$router.push('/index/work-item')"
              >More</span>
            </div>
            <div class="table-part">
              <PersonalOverviewTable
                :table-type="tableType"
                :table-data="taskListData"
                :display-ten-rows="onlyHasOtherTasks"
                @refresh-list="handleRefreshList"
              />
            </div>
          </div>
        </div>
        <div class="working-hours-chart page-content-card">
          <div
            v-if="showHoursWarningText"
            class="forget-register-warning-wrapper"
          >
            <div class="text-part">
              <i class="el-icon-info" />
              <span>{{ hoursWarningText }}</span>
            </div>
            <div class="btn-part">
              <span
                class="btn"
                @click="closeHoursWarning"
              >Close</span>
            </div>
          </div>
          <div
            class="register-hours-btn-wrapper"
            @click="dialogVisible = true"
          >
            <span>Go register</span>
          </div>
          <PersonalOverviewHoursChart :chart-data="personalWorkingHours" />
        </div>
      </div>
      <div class="content-area-right">
        <div class="aided-tools-wrapper page-content-card">
          <AidedTools />
        </div>
        <div class="work-summary-wrapper page-content-card">
          <WorkSummary />
        </div>
      </div>
    </div>
    <div
      v-if="selectedPageTab === 'dashboard'"
      class="dashboard-page"
    >
      <div class="charts-wrapper">
        <div class="line-chart-wrapper page-content-card">
          <div class="title-row">
            <div class="links-wrapper">
              <div
                class="link-card"
                @click="
                  $router.push({
                    name: 'NewProjectAndPhaseList',
                    query: { date_range: weekRange, target: 'project' }
                  })
                "
              >
                <span class="link-title">Project added this week</span>
                <span class="number">{{ projectAdded }}</span>
              </div>
              <div
                class="link-card"
                @click="
                  $router.push({
                    name: 'NewProjectAndPhaseList',
                    query: {date_range: weekRange, target: 'phase' }
                  })
                "
              >
                <span class="link-title">Phase 60% added this week</span>
                <span class="number">{{ phaseAdded }}</span>
              </div>
            </div>
            <div
              class="view-list"
              @click="$router.push({ name: 'NewProjectAndPhaseList', query: {date_range: lineChartDateRange} })"
            >
              <span>View list</span>
            </div>
          </div>
          <div class="operation-row">
            <div class="date-selector-wrapper">
              <el-date-picker
                v-model="lineChartDateRange"
                :clearable="false"
                value-format="yyyy-MM"
                style="width: 250px"
                type="monthrange"
                size="mini"
                range-separator="to"
                start-placeholder="start-date"
                end-placeholder="end-date"
              />
            </div>
            <div
              class="export-btn"
              @click="exportProjectAndPhaseSummary"
            >
              <i class="el-icon-download" />
              <span>Excel</span>
            </div>
          </div>
          <DashboardLineChart :raw-data="lineChartData" />
        </div>
        <div class="pie-chart-wrapper page-content-card">
          <div class="head-row">
            <div class="title-and-radios">
              <span class="link-title">Ongoing tasks</span>
              <span>
                <el-radio-group v-model="dashboardTaskType">
                  <template v-for="radio in ongoingTaskRadios">
                    <el-radio
                      v-if="radio.show"        
                      :key="radio.value"
                      :label="radio.value"
                    >{{ radio.label }}</el-radio>
                  </template>
                </el-radio-group>
              </span>
            </div>
            <div
              class="view-list"
              @click="$router.push({ name: 'OngoingTaskList', query: { type: dashboardTaskType }})"
            >
              <span>View list</span>
            </div>
          </div>
          <DashboardPieChart :raw-data="pieChartData" />
        </div>
      </div>
      <div class="gantt-wrapper">
        <DashboardGantt />
      </div>
    </div>
    <el-dialog
      :visible.sync="dialogVisible"
      :close-on-click-modal="false"
      width="560px"
      @closed="handleClose"
    >
      <template #title>
        <span style="font-size: 16px; color: #303133; text-align: center">Record working hours</span>
      </template>
      <el-form
        ref="dialog-form"
        :model="form"
        :rules="rules"
        label-position="top"
      >
        <el-row>
          <el-col :span="24">
            <!-- Task type -->
            <el-form-item prop="type">
              <span class="form_task_type_star" />
              <el-radio-group
                v-model="form.type"
                class="form_task_type"
              >
                <el-radio :label="'2D'">
                  2D
                </el-radio>
                <el-radio :label="'3D'">
                  3D
                </el-radio>
              </el-radio-group>
            </el-form-item>
            <!-- ***************** -->
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <!-- Project -->
            <el-form-item
              prop="project_id"
              label="Project"
            >
              <LazyLoadingProjectSelector
                ref="project-selector"
                @select-project="handleSelectProject"
              />
            </el-form-item>
            <!-- ************* -->
          </el-col>
          <el-col :span="12">
            <!-- Phase -->
            <el-form-item
              prop="progress_id"
              label="Phase"
            >
              <el-select
                v-model="form.progress_id"
                size="mini"
                style="width: 250px"
                placeholder="Please select"
              >
                <el-option
                  v-for="opt in phaseList"
                  :key="opt.id"
                  :value="opt.id"
                  :label="`${opt.phase_no} ${opt.phase}`"
                />
              </el-select>
            </el-form-item>
            <!-- ************* -->
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <!-- Category -->
            <el-form-item
              prop="job_category"
              label="Category"
            >
              <el-select
                v-model="form.job_category"
                size="mini"
                style="width: 250px"
                placeholder="Please select"
                clearable
              >
                <el-option
                  v-for="opt in categoryList"
                  :key="opt.value"
                  :value="opt.value"
                  :label="opt.label"
                />
              </el-select>
            </el-form-item>
            <!-- ************** -->
          </el-col>
          <el-col :span="12">
            <!-- Hour -->
            <el-form-item
              prop="work_hours"
              label="Hour"
            >
              <el-input-number
                v-model="form.work_hours"
                :precision="1"
                :min="0"
                placeholder="0 Hours"
                size="mini"
                style="width: 250px"
              />
            </el-form-item>
            <!-- ************** -->
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <!-- Date -->
            <el-form-item
              prop="work_date"
              label="Date"
            >
              <div
                style="
                  display: flex;
                  justify-content: flex-start;
                  align-items: center;
                  gap: 2px;
                  width: 100%;
                "
              >
                <el-date-picker
                  v-model="workDateStart"
                  size="mini"
                  style="width: 250px"
                />
                <span>-</span>
                <el-date-picker
                  v-model="workDateEnd"
                  size="mini"
                  style="width: 250px"
                />
              </div>
            </el-form-item>
            <!-- ************** -->
          </el-col>
        </el-row>
        <el-row>
          <el-form-item
            prop="description"
            label="Description"
          >
            <el-input
              v-model="form.description"
              type="textarea"
              :rows="5"
              placeholder="Please describe the work content"
            />
          </el-form-item>
        </el-row>
      </el-form>
      <template #footer>
        <div class="dialog-footer">
          <div
            class="btn cancel"
            @click="handleClose"
          >
            Cancel
          </div>
          <div
            class="btn confirm"
            @click="handleConfirm"
          >
            Confirm
          </div>
        </div>
      </template>
    </el-dialog>
  </div>
</template>

<script>
// import WorkItemTable from './page-parts/WorkItemTable.vue';
import dayjs from 'dayjs';
import AidedTools from './page-parts/AidedTools.vue';
import WorkSummary from './page-parts/WorkSummary.vue';
import LazyLoadingProjectSelector from '@/components/lazy-loading-project-selector.vue';
import {
  taskList,
  getTaskCount,
  getCustomTaskList,
  phaseList,
  getPersonalWorkingHours,
  getProjectAndPhaseSummary,
  getOngoingTaskSummary,
  exportProjectAndPhaseSummary,
  registerWorkingHours
} from '@/api';
import { WORK_TABLE_TASKS_FOR_ROLES, WORK_TYPES_VALUE } from './contants.js';
import PersonalOverviewTable from './components/personal-overview-table.vue';
import PersonalOverviewHoursChart from './components/personal-overview-hours-chart.vue';
import DashboardLineChart from './components/dashboard-line-chart.vue';
import DashboardPieChart from './components/dashboard-pie-chart.vue';
import DashboardGantt from './components/dashboard-gantt.vue';

export default {
  name: 'WorkTable',
  components: {
    // WorkItemTable,
    AidedTools,
    WorkSummary,
    PersonalOverviewTable,
    LazyLoadingProjectSelector,
    PersonalOverviewHoursChart,
    DashboardLineChart,
    DashboardPieChart,
    DashboardGantt
  },
  beforeRouteEnter(to, from, next) {
   if(from.name && (from.name === 'NewProjectAndPhaseList') || (from.name === 'OngoingTaskList')) {
     next((vm) => {
      vm.$route.query.from = 'list'
     })
   }
   else {
    next();
   }
    },
  data() {
    return {
      showHoursWarningText: false,
      ongoingTaskRadios:[],
      // taskCount: {},
      lineChartData: [],
      pieChartData:{},
      dialogVisible: false,
      taskNumbers: {},
      lineChartDateRange: [],
      //用于表示这周的有效起止时间
      weekRange:[],
      // v0.9.0个人全部工时信息
      personalWorkingHours: [],
      newRegisterHoursWarning: {},
      hoursWarning: {},
      //v0.9.0, 各个角色可以看到的首页任务类型映射
      tasksForRoles: WORK_TABLE_TASKS_FOR_ROLES,
      //v0.9.0, 该角色是否只能看到others的任务
      onlyHasOtherTasks: false,
      //v0.9.0, 各种任务类型传参的值
      workTypesValues: WORK_TYPES_VALUE,
      // v0.9.0Dashboard里的task类型
      dashboardTaskType: '',
      projectAdded: 5,
      phaseAdded: 3,
      workDateStart: null,
      workDateEnd: null,
      phaseList: [],
      //v0.9.0，新增工时中登记开始时间
      warning: {
        date: '',
        text: ''
      },
      taskTitleMap: {
        '3d_bidding': '3D Bidding',
        '3d_formal': '3D Formal',
        formal: 'Formal',
        quote: 'Bidding',
        label: 'Label',
        simulation: 'Simulation',
        others: 'Others'
      },
      userInfo: {},
      //v0.9.0, 首页任务列表的内容
      taskListData: [
        {
          title: 'colllllak1',
          project_name: 'pjtnam',
          project_no: 'pjtno_kalg',
          progress_no: 'pgsno_wqw',
          phase: '89%',
          solution: 'Harness',
          team_name: 'tamamamakna'
        },
        {
          title: 'colllllak2',
          project_name: 'pjtnam',
          project_no: 'pjtno_kalg',
          progress_no: 'pgsno_wqw',
          phase: '89%',
          solution: 'Harness',
          team_name: 'tamamamakna'
        },
        {
          title: 'colllllak3',
          project_name: 'pjtnam',
          project_no: 'pjtno_kalg',
          progress_no: 'pgsno_wqw',
          phase: '89%',
          solution: 'Harness',
          team_name: 'tamamamakna'
        },
        {
          title: 'colllllak4',
          project_name: 'pjtnam',
          project_no: 'pjtno_kalg',
          progress_no: 'pgsno_wqw',
          phase: '89%',
          solution: 'Harness',
          team_name: 'tamamamakna'
        },
        {
          title: 'colllllak5',
          project_name: 'pjtnam',
          project_no: 'pjtno_kalg',
          progress_no: 'pgsno_wqw',
          phase: '89%',
          solution: 'Harness',
          team_name: 'tamamamakna'
        },
        {
          title: 'colllllak6',
          project_name: 'pjtnamagags2',
          project_no: 'pjtno_kalg_kolomo',
          progress_no: 'pgsno_wqw',
          phase: '89%',
          solution: 'Harness',
          team_name: 'tamamamakna'
        },
        {
          title: 'colllllak6',
          project_name: 'pjtnamagags2',
          project_no: 'pjtno_kalg_kolomo',
          progress_no: 'pgsno_wqw',
          phase: '89%',
          solution: 'Harness',
          team_name: 'tamamamakna'
        },
        {
          title: 'colllllak6',
          project_name: 'pjtnamagags2',
          project_no: 'pjtno_kalg_kolomo',
          progress_no: 'pgsno_wqw',
          phase: '89%',
          solution: 'Harness',
          team_name: 'tamamamakna'
        },
        {
          title: 'colllllak6',
          project_name: 'pjtnamagags2',
          project_no: 'pjtno_kalg_kolomo',
          progress_no: 'pgsno_wqw',
          phase: '89%',
          solution: 'Harness',
          team_name: 'tamamamakna'
        },
        {
          title: 'colllllak6',
          project_name: 'pjtnamagags2',
          project_no: 'pjtno_kalg_kolomo',
          progress_no: 'pgsno_wqw',
          phase: '89%',
          solution: 'Harness',
          team_name: 'tamamamakna'
        }
      ],
      //v0.9.0, 页面头部增加tab切换
      pageTabs: [
        {
          label: 'Worktable',
          value: 'worktable'
        },
        {
          label: 'Dashboard',
          value: 'dashboard'
        }
      ],
      selectedPageTab: 'dashboard',
      tableType: 1,
      fetchTaskListParams: {
        status: 1,
        type: 1
      },
      rules: {
        type: [
          {
            required: true,
            message: 'Please choose the type',
            trigger: 'submit'
          }
        ],
        project_id: [
          {
            required: true,
            message: 'Please choose the project',
            trigger: 'submit'
          }
        ],
        progress_id: [
          {
            required: true,
            message: 'Please choose the phase',
            trigger: 'submit'
          }
        ],
        job_category: [
          {
            required: true,
            message: 'Please choose the job category',
            trigger: 'submit'
          }
        ],
        work_hours: [
          {
            required: true,
            message: 'Please input working hours',
            trigger: 'submit'
          }
        ],
        work_date: [
          {
            required: true,
            validator: this.workDateValidator,
            trigger: 'submit'
          }
        ],
        description: [
          {
            required: true,
            message: 'Please input the description',
            trigger: 'submit'
          }
        ]
      },
      form: {
        type: null,
        project_id: undefined,
        progress_id: undefined,
        job_category: '',
        work_hours: undefined,
        work_date: [null, null],
        description: ''
      },
      categoryList: [
        {
          label: 'Design',
          value: 'design'
        },
        {
          label: 'Check',
          value: 'check'
        },
        {
          label: 'Other',
          value: 'other'
        }
      ]
    };
  },
  computed: {
    showPageTabs() {   
      let notShow = ['CN Engineer', '3D CN Engineer', 'Sales'].includes(this.userInfo.role); 
      return !notShow
    },
    //v0.9.0, 是否显示登记工时提示的标记
    // showHoursWarningText() {
    //   let hoursWarning = JSON.parse(
    //     localStorage.getItem('hours_register_warning')
    //   ) || { message: '', date: '', display: false };
    //   return hoursWarning.display;
    // },
    hoursWarningText() {
     let warning = JSON.parse(localStorage.getItem('hours_register_warning'));
      return warning?.message;
    },
    // table部分的上部padding
    conputedTablePaddingTop() {
      return this.taskTabs.length === 1 ? '12px' : '12px';
    },
    //计算各个角色可见的任务tab
    taskTabs() {
      let tabs = [];
      let taskTypes = this.tasksForRoles[this.userInfo.role] || [];
      for (let key of taskTypes) {
        tabs.push({ label: key, value: this.workTypesValues[key] });
      }
      return tabs;
    },
    //计算各个任务类型的数量
    taskNumbersMap() {
      let numberMap = {};
      let keys = Object.keys(this.taskNumbers);
      for (let key of keys) {
        let titleKey = this.taskTitleMap[key];
        numberMap[titleKey] = this.taskNumbers[key];
      }
      return numberMap;
    }
  },
  watch: {
    taskTabs: {
      handler(val) {
        if (val.length === 1 && val[0].label === 'Others') {
          this.onlyHasOtherTasks = true;
        }
      }
    },
    newRegisterHoursWarning: {
      handler(val) { 
        //先获取localStorage中的警告数据
        let hoursWarning = JSON.parse(
          localStorage.getItem('hours_register_warning')
        ); 
        //如果该浏览器里的localStorage里根本就没有这个值，先存一个空值，标记为显示
        if (!hoursWarning) { 
          localStorage.setItem(
            'hours_register_warning',
            JSON.stringify({ message: '', date: '', display: false })
          );
          hoursWarning = JSON.parse(
            localStorage.getItem('hours_register_warning')
          );
        }
        //如果该浏览器里的localStorage里有这个值，但是日期和当前的值不一样，覆盖当前值，并且标记为显示
        if (val.date && hoursWarning.date !== val.date) { 
          let valToSet = val;
          valToSet.display = true;
          this.showHoursWarningText = true;
          localStorage.setItem(
            'hours_register_warning',
            JSON.stringify(valToSet)
          );
        }
        //如果该浏览器里的localStorage里有这个值，但是日期和当前的值一样，保持不变，用户没关闭过就显示，关闭过了就保持不显示
        if (val.date && hoursWarning.date === val.date) { 
          this.showHoursWarningText = hoursWarning.display;
          // return;
        }
        this.hoursWarning = hoursWarning;
      },
      // immdeiate: true,
      deep: true
    },
    lineChartDateRange: {
      handler(val) {
        let [startDate, endDate] = val;
      const monthDiff = dayjs(endDate).diff(dayjs(startDate), 'month'); 
      if (monthDiff > 12) {
   this.$message.error('month gap should be less than 12 months');
   this.initLineChartDefaultDateRange();
    return
  } else {
    let params = {
          creation_time_start: val[0] || '',
          creation_time_end: val[1] || ''
        };
        getProjectAndPhaseSummary(params).then((res) => {
          if (res.code === 200) {
            this.lineChartData = res.data ? res.data.list : [];
            this.weekRange = [res.data?.week_start, res.data?.week_end];
            this.projectAdded = res.data
              ? res.data.new_project_weekly_count
              : 0;
            this.phaseAdded = res.data ? res.data.new_phase_weekly_count : 0;
          }
        });
  }     
      }
    },
    dashboardTaskType: {
      handler(val) {
        let params = {type: val}
        getOngoingTaskSummary(params).then((res) => {
          if (res.code === 200) {
            this.pieChartData = res.data ? res.data : [];
          }
        }).catch((err) => {return err})
      }
    }
  },
  created() {
    this.userInfo = JSON.parse(localStorage.getItem('user'));
  },
  mounted() {
    let query = this.$route.query || {};
    let initView =
      query.from && query.from === 'list' ? 'dashboard' : 'worktable';
    if (initView === 'worktable') {
      this.handleChoosePageTab('worktable');
    }
    if (initView === 'dashboard') { 
      this.handleChoosePageTab('dashboard');
    }
  },
  methods: {
    closeHoursWarning() {
      let hoursWarning = JSON.parse(localStorage.getItem('hours_register_warning'));
      //把其中的display属性改为false
      if (hoursWarning) {
        hoursWarning.display = false;
        localStorage.setItem('hours_register_warning', JSON.stringify(hoursWarning));
        this.showHoursWarningText = false;
      }
    },
    getOngoingTaskRadios() {
      let {role} = this.userInfo;
      let showAll = ['User', 'Sales Assistant', 'US Engineer', 'Sales Director', 'HR', 'General Manager'].includes(role);
      let show2D = ['User', 'Sales Assistant', 'Sales Director', 'US Engineer', 'General Manager', 'HR', 'CN Engineer Manager', 'Team Leader'].includes(role);
      let show3D = ['User', 'Sales Assistant', 'Sales Director', 'US Engineer', 'General Manager', 'HR', '3D Manager', '3D Team Leader'].includes(role);
      let showOthers = ['User', 'Sales Assistant', 'Sales Director', 'US Engineer', 'General Manager', 'HR', 'CN Engineer Manager', 'Team Leader', '3D Manager', '3D Team Leader'].includes(role);
      let options = [{label:'All', value:1, show: showAll},{label:'2D', value:2, show: show2D},{label:'3D', value:3, show: show3D},{label:'Others', value:4, show: showOthers}]
      this.dashboardTaskType = options.find((item) => {return item.show === true}).value
      this.ongoingTaskRadios = options
    },
    exportProjectAndPhaseSummary() {
      exportProjectAndPhaseSummary(this, this.lineChartDateRange[0], this.lineChartDateRange[1])
    },
    initLineChartDefaultDateRange() {
      let today = new Date();
      let currentMonth = today.getMonth() + 1;
      let currentYear = today.getFullYear();
      let lastMonth = currentMonth === 1 ? 12 : currentMonth - 1;
      let lastYear = currentMonth === 1 ? currentYear - 1 : currentYear;

      // 格式化为 'yyyy-mm' 的格式
      let format = function (year, month) {
        return `${year}-${month.toString().padStart(2, '0')}`;
      };

      let currentMonthFormatted = format(currentYear, currentMonth);
      let lastMonthFormatted = format(lastYear, lastMonth);

      lastMonthFormatted = dayjs(lastMonthFormatted).isValid() ? dayjs(lastMonthFormatted).startOf('month').format('YYYY-MM-DD') : '';
      currentMonthFormatted = dayjs(currentMonthFormatted).isValid() ? dayjs(currentMonthFormatted).endOf('month').format('YYYY-MM-DD') : '';

      this.lineChartDateRange = [lastMonthFormatted, currentMonthFormatted];
    },
    handleRefreshList() {
      let lastTaskTab = this.taskTabs[this.taskTabs.length - 1];
      this.handleChooseTaskTab(lastTaskTab);
    },
    //v0.9.0关闭工时统计的提示
    closeHoursRegisterWarning() {
      let hoursWarning = JSON.parse(
        localStorage.getItem('hours_register_warning')
      );
      hoursWarning.display = false;
      localStorage.setItem(
        'hours_register_warning',
        JSON.stringify(hoursWarning)
      );
    },
    //v0.9.0 获取个人全部工时统计
   async getWorkHourRegistration() { 
     await getPersonalWorkingHours()
        .then((res) => {
          if (res.code === 200) {
            this.personalWorkingHours = res.data.list; 
            this.newRegisterHoursWarning = res.data.warning; 
          }
        })
        .catch((err) => {
          return err;
        });
    },
    // v0.9.0 登记工时的校验
    workDateValidator(rule, value, callback) {
      const [startDate, endDate] = value;
      if (
        value.every((date) => {
          return date !== null;
        })
      ) {
        if (dayjs(startDate).isAfter(endDate)) {
          callback(new Error('End date should be after start date'));
          return;
        }
        callback();
      } else {
        callback(new Error('Please choose the dates'));
      }
    },
    handleSelectProject(projectId) {
      this.form.project_id = projectId;
      phaseList({ project_id: projectId })
        .then((res) => {
          if (res.code === 200) {
            this.phaseList = res.data;
          }
        })
        .catch((err) => {
          return err;
        });
    },
    handleClose() {
      this.$refs['project-selector'].resetSelector();
      this.dialogVisible = false;
      this.form = {
        type: null,
        project_id: undefined,
        progress_id: undefined,
        job_category: '',
        work_hours: undefined,
        work_date: [null, null],
        description: ''
      };
    },

    handleConfirm() {
      if (this.workDateStart) {
        this.form['work_date'][0] = this.workDateStart;
      }
      if (this.workDateEnd) {
        this.form['work_date'][1] = this.workDateEnd;
      }
      if(this.form.work_hours === 0) {
        this.$message.error('Work hours cannot be 0');
        return;
      }
      this.$refs['dialog-form'].validate((valid) => {
        let params = {...this.form};
        delete params.work_date;
        params.work_date_start = dayjs(this.workDateStart).format('YYYY-MM-DD');
        params.work_date_end = dayjs(this.workDateEnd).format('YYYY-MM-DD');
        if (valid) {
          registerWorkingHours({...params}).then((res) => {
            if(res.code === 200) {
              this.getWorkHourRegistration();
          this.handleClose();
            }
          }).catch((err) => {return err})
        }
      });
    },
    //v0.9.0，选择页面的tab
    handleChoosePageTab(value) { 
      this.selectedPageTab = value;
      if (value === 'dashboard') { 
        this.initLineChartDefaultDateRange();
        this.getOngoingTaskRadios();
      }
      if (value === 'worktable') {
        this.getWorkHourRegistration();
        this.getTaskCounts();
        this.handleChooseTaskTab(this.taskTabs[0]);
        //clear route query
        this.$router.push({ query: {} });
      }
    },
    // v0.9.0, 选择任务类型
    handleChooseTaskTab(tab) {
      this.tableType = tab.value;
      let params = {
        is_public: 0,
        type: this.tableType,
        status: 1
      };
      if (tab.value === 7) {
        getCustomTaskList({ task_category: 1 }).then((res) => {
          this.taskListData = res.data['task_list'];
        });
      } else {
        taskList(params).then((res) => {
          if (res.code === 200) {
            this.taskListData = res.data.data;
          }
        });
      }
    },
    getTaskCounts() {
      getTaskCount({ task_type: 1 })
        .then((res) => {
          if (res.code === 200) {
            this.taskNumbers = res.data;
          }
        })
        .catch((err) => {
          return err;
        });
    }
  }
};
</script>
<style>
.work-table-container {
  .el-dialog {
    border-radius: 8px;
  }
  .el-form-item__label {
    line-height: 14px;
  }
  .el-dialog__body {
    padding: 0 20px;
  }
}
</style>

<style lang="less" scoped>
              .link-title {
                font-weight: 550;
                font-size: 14px;
                color: #303133;
              }
.form_task_type_star {
  &::before {
    content: '*';
    color: #f56c6c;
    margin-right: 4px;
  }
}

.dialog-footer {
  display: flex;
  justify-content: flex-end;
  gap: 16px;

  .btn {
    width: 100px;
    height: 36px;
    border: 1px solid #007bff;
    border-radius: 4px;
    text-align: center;
    line-height: 36px;
    font-size: 16px;
    cursor: pointer;

    &.confirm {
      background: #007bff;
      color: #fff;
    }
    &.cancel {
      background: #fff;
      color: #007bff;
    }
  }
}
.work-table-container {
  display: flex;
  flex-direction: column;
  height: calc(100vh - 80px);
  gap: 16px;
  .overview-page-tabs-wrapper {
    height: 4vh;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 40px;
    .overview-page-tab {
      cursor: pointer;
      position: relative;
      .text {
        font-weight: 550;
        font-size: 16px;
      }
      .under-line {
        position: absolute;
        bottom: -10px;
        left: 0;
        height: 3px;
        border-radius: 2px;
        width: 100%;
        background-color: #007bff;
        animation: line 0.3s;
      }
      @keyframes line {
        0% {
          width: 0px;
        }
        100% {
          width: 100%;
        }
      }
      &.selected {
        .text {
          font-weight: 550;
          font-size: 16px;
          color: #007bff;
          transition: color 0.3s;
        }
      }
    }
    .under-line {
      padding: 0;
      margin: 0;
      height: 3px;
      width: 100%;
      background-color: #007bff;
    }
  }

  .worktable-page {
    display: flex;
    max-height: 85%;
    gap: 0px;
    .content-area-left {
      flex: 2.2;
      padding-right: 10px;
      min-height: calc(86vh - 16px);
      display: flex;
      flex-direction: column;
      gap: 12px;

      .task-overview {
        flex: 1.5;
        flex-shrink: 0;
        display: flex;
        flex-direction: column;
        gap: 24px;
        .task-type-tabs-wrapper {
          position: relative;
          margin-top: 14px;
          padding: 0 96px 0 96px;
          display: flex;
          justify-content: space-between;
          align-items: center;

          .task-type-tab {
            display: flex;
            width: 55px;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            cursor: pointer;

            .task-number {
              // margin-top: -3px;
              font-size: 42px;
              font-weight: bold;
              transition: color 0.1s ease, transform 0.1s ease;
              &.selected {
                font-size: 53px;
                color: #007bff;
              }
            }
            .task-label {
              position: absolute;
              top: 60px;
              display: flex;
              font-weight: 400;
              font-size: 14px;
              color: #606266;
              align-items: baseline;
              text-wrap: nowrap;
              transition: color 0.3s;

              &.selected {
                color: #007bff;
              }
            }
          }
        }

        .task-table-wrapper {
          flex: 1;
          width: 1248px;
          padding-left: 16px;
          margin-right: -14px;
          .header-part {
            display: flex;
            align-items: center;
            justify-content: space-between;
            margin-bottom: -10px;

            .table-title {
              font-weight: 500;
              font-size: 14px;
              color: #303133;
              line-height: 20px;
              text-align: left;
            }
            .link-to {
              font-weight: 500;
              font-size: 14px;
              color: #007bff;
              line-height: 0px;
              text-align: left;
              cursor: pointer;
            }
          }

          .table-part {
            width: 100%;
            max-height: 355px;
            margin-top: 16px;
            overflow-y: auto;
          }
        }
      }
      .working-hours-chart {
        flex: 1;
        position: relative;
        .forget-register-warning-wrapper {
          z-index: 1;
          position: absolute;
          top: 8px;
          left: 140px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          width: 560px;
          height: 28px;
          background: rgba(0, 123, 255, 0.1);
          border-radius: 4px;
          .text-part {
            display: flex;
            justify-content: flex-start;
            align-items: center;
            margin-left: 16px;
            gap: 8px;

            font-size: 14px;
            color: #007bff;
            text-align: center;
            font-style: normal;
            text-transform: none;

            i {
              color: #007bff;
            }
          }
          .btn-part {
            margin-right: 16px;
            font-weight: 400;
            font-size: 14px;
            color: #007bff;
            text-align: center;
            cursor: pointer;
          }
        }
        .register-hours-btn-wrapper {
          z-index: 1;
          width: 88px;
          height: 28px;
          background: #007bff;
          border-radius: 4px;
          position: absolute;
          top: 15px;
          right: 15px;
          text-align: center;
          line-height: 28px;
          font-size: 13px;
          color: #fff;
          cursor: pointer;
        }
      }
    }

    .page-content-card {
      padding-top: 10px;
      padding-right: 0;
    }

    .content-area-right {
      flex: 1;
      min-width: 500px;
      // min-height: 75vh;
      display: flex;
      flex-direction: column;
      gap: 12px;

      .aided-tools-wrapper {
        flex: 1;
        display: flex;
        align-items: center;
        justify-content: center;
        height: 75%;
      }

      .work-summary-wrapper {
        flex: 1.5;
      }
    }
  }
  .dashboard-page {
    flex-direction: column;
    flex: 1;
    gap: 12px;
    .charts-wrapper {
      display: flex;
      flex-direction: row;
      gap: 12px;
      align-items: space-between;

      .page-content-card {
        padding: 16px 16px 0 16px;
      }

      .line-chart-wrapper {
        height: 375px;
        position: relative;
        flex: 1;
        display: flex;
        flex-direction: column;

        .title-row {
          display: flex;
          justify-content: space-between;
          align-items: baseline;

          .links-wrapper {
            display: flex;
            gap: 89px;
            padding-left: 6px;

            .link-card {
              display: flex;
              flex-direction: column;
              gap: 8px;

              .number {
                width: 40px;
                font-weight: 500;
                font-size: 42px;
                color: #007bff;
                cursor: pointer;
              }
            }
          }
        }
        .operation-row {
          z-index: 1;
          position: absolute;
          top: 103px;
          right: 30px;
          display: flex;
          gap: 32px;
          justify-content: space-between;

          .export-btn {
            width: 72px;
            height: 26px;
            background: #ffffff;
            border-radius: 4px;
            border: 1px solid #007bff;
            cursor: pointer;

            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 14px;
            color: #007bff;
            gap: 4px;
          }
        }
        .operation-row::v-deep .el-date-editor.el-input {
          width: 120px;
        }
      }
      .pie-chart-wrapper {
        height: 375px;
        position: relative;
        flex: 1;
        display: flex;
        flex-direction: column;
        gap: 20px;
        .head-row {
          display: flex;
          justify-content: space-between;

          .title-and-radios {
            display: flex;
            justify-content: space-between;
            gap: 72px;
            font-size: 14px;
            color: #303133;
          }
        }
      }
      .line-chart-wrapper,
      .pie-chart-wrapper {
        .view-list {
          height: 100%;
          font-size: 14px;
          color: #007bff;
          cursor: pointer;
        }
      }
    }
    .gantt-wrapper {
      width: 100%;
      flex: 1;
      margin-top: 16px;
    }
  }
}
</style>
