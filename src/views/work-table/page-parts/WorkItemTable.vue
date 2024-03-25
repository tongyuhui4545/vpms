<template>
  <div class="work-item-table-container">
    <div class="header-part">
      <div class="title">
        <p>Work item</p>
        <div class="work-item-type">
          <el-select
            v-model="workItemType"
            placeholder="select work item..."
            size="mini"
            style="padding-top: 3px"
            @change="handleChange"
          >
            <el-option
              label="Pending for me"
              :value="1"
            >
              Pending for me
            </el-option>
            <el-option
              label="Handled by me"
              :value="2"
            >
              Handled by me
            </el-option>
          </el-select>
        </div>
      </div>
      <div class="btn-wrapper">
        <el-button
          type="primary"
          style="width: 100%"
          size="mini"
          @click="handleClickAll"
        >
          All
        </el-button>
      </div>
    </div>
    <div class="body-part">
      <Tabs
        :tabs="tabs"
        @tab-clicked="changeTabStatus"
      />
      <TableContent
        v-if="tableType !== 'Others'"
        :table-data="tableData"
        :table-type="tableType"
        :work-item-type="workItemType"
      />

      <CustomTask
        v-else
        :table-data="taskData"
        :total-rows="totalRows"
        @refresh="getCustomTaskList"
      />
    </div>
  </div>
</template>

<script>
import TableContent from '../components/TableContent.vue';
import Tabs from '@/components/common/Tabs.vue';
import CustomTask from '../components/custom-task.vue';
import { taskList, getCustomTaskList, getTaskCount } from '@/api';

export default {
  name: 'WorkItemTable',
  components: {
    TableContent,
    Tabs,
    CustomTask
  },
  data() {
    return {
      hasBasicTaskTab: false,
      has3DTaskTab: false,
      has2DTaskTab: false,
      userLimits: [],
      tableData: [],
      workItemType: 1,
      currentType: 1,
      fetchTaskListParams: {
        status: 1,
        type: 1,
        page: 1,
        limit: 20
      },
      taskCount: {},
      tabs: [],
      userInfo: {},
      tableType: 'quote',
      totalRows: 0,
      taskNumber: {},
      taskData: []
    };
  },
  async created() {
    this.userLimits = JSON.parse(localStorage.getItem('limits'));
    if (this.userLimits.Nav_List.show_basic_task_tab) {
      this.hasBasicTaskTab = true;
    }
    if (this.userLimits.Nav_List.show_3d_task_tab) {
      this.has3DTaskTab = true;
    }
    if (this.userLimits.Nav_List.show_2d_task_tab) {
      this.has2DTaskTab = true;
    }
    // await this.getCustomTaskList();
    this.calcTabs();
    this.getTaskCount(this.workItemType);
  },
  methods: {
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
    calcTabs() {
      let tabs = [
        {
          id: 1,
          title: 'Bidding',
          active: true,
          number: 0
        },
        {
          id: 2,
          title: 'Formal',
          active: false,
          number: 0
        },
        {
          id: 7,
          title: 'Others',
          active: false,
          number: 0
        }
      ];
      //可以看见label任务的情况，2d的某些人员
      if (this.has2DTaskTab) {
        tabs = [
          {
            id: 1,
            title: 'Bidding',
            active: true,
            number: 0
          },
          {
            id: 2,
            title: 'Formal',
            active: false,
            number: 0
          },
          {
            id: 3,
            title: 'Label',
            active: false,
            number: this.totalRows
          },
          {
            id: 7,
            title: 'Others',
            active: false,
            number: 0
          }
        ];
      }
      if (this.has3DTaskTab) {
        tabs = [
          {
            id: 4,
            title: '3D bidding',
            active: true,
            number: 0
          },
          {
            id: 5,
            title: '3D formal',
            active: false,
            number: 0
          },
          {
            id: 6,
            title: 'Simulation',
            active: false,
            number: 0
          },
          {
            id: 7,
            title: 'Others',
            active: false,
            number: 0
          }
        ];
      }
      if (this.hasBasicTaskTab && !this.has2DTaskTab) {
        tabs = [
          {
            id: 1,
            title: 'Bidding',
            active: true,
            number: 0
          },
          {
            id: 2,
            title: 'Formal',
            active: false,
            number: 0
          },
          {
            id: 7,
            title: 'Others',
            active: false,
            number: 0
          }
        ];
      }
      if (this.has2DTaskTab && this.has3DTaskTab) { 
        tabs = [
          {
            id: 1,
            title: 'Bidding',
            active: true,
            number: 0
          },
          {
            id: 4,
            title: '3D bidding',
            active: false,
            number: 0
          },
          {
            id: 2,
            title: 'Formal',
            active: false,
            number: 0
          },
          {
            id: 5,
            title: '3D formal',
            active: false,
            number: 0
          },
          {
            id: 3,
            title: 'Label',
            active: false,
            number: 0
          },
          {
            id: 6,
            title: 'Simulation',
            active: false,
            number: 0
          },
          {
            id: 7,
            title: 'Others',
            active: false,
            number: 0
          }
        ];
      }
      this.changeTabStatus(tabs[0]);
      this.tabs = tabs;
      let finalTab = this.tabs[this.tabs.length - 1];
      if (finalTab.id === 7) {
        finalTab.number = this.totalRows;
      }
    },
    async getTaskList() {
      if (this.tableType !== 'Others') {
        await taskList(this.fetchTaskListParams).then((res) => {
          this.tableData = res.data.data;
        });
      } else {
        this.getCustomTaskList();
      }
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
      let numberData = this.taskNumber;
      if (this.tabs[0]) {
        this.tabs[0].number = numberData.quote;
      }
      if (this.tabs[1]) {
        this.tabs[1].number = numberData.formal;
      }
      this.tabs[2].number = numberData.others;
    },
    calc2DTaskNumbers() {
      let numberData = this.taskNumber;
      if (this.tabs[0]) {
        this.tabs[0].number = numberData.quote;
      }
      if (this.tabs[1]) {
        this.tabs[1].number = numberData.formal;
      }
      if (this.tabs[2]) {
        this.tabs[2].number = numberData.label;
      }
      this.tabs[3].number = numberData.others;
    },
    calc3DTaskNumbers() {
      let numberData = this.taskNumber;
      if (this.tabs[0]) {
        this.tabs[0].number = numberData['3d_bidding'];
      }
      if (this.tabs[1]) {
        this.tabs[1].number = numberData['3d_formal'];
      }
      if (this.tabs[2]) {
        this.tabs[2].number = numberData.simulation;
      }
      this.tabs[3].number = numberData.others;
    },
    calcUSTaskNumbers() {
      let numberData = this.taskNumber;
      if (this.tabs[0]) {
        this.tabs[0].number = numberData.quote;
      }
      if (this.tabs[1]) {
        this.tabs[1].number = numberData['3d_bidding'];
      }
      if (this.tabs[2]) {
        this.tabs[2].number = numberData.formal;
      }
      if (this.tabs[3]) {
        this.tabs[3].number = numberData['3d_formal'];
      }
      if (this.tabs[4]) {
        this.tabs[4].number = numberData.label;
      }
      if (this.tabs[5]) {
        this.tabs[5].number = numberData.simulation;
      }
      this.tabs[6].number = numberData.others;
    },
    handleChange(val) {
      this.workItemType = val;
      this.fetchTaskListParams.status = this.workItemType;
      this.getTaskList();
      this.getTaskCount(this.workItemType);
    },
    changeTabStatus(tab) {
      this.tabs.forEach((item) => {
        if (item.title === tab.title) {
          item.active = true;
        } else {
          item.active = false;
        }
      });
      switch (tab.title) {
        case 'Bidding':
          this.tableType = 'quote';
          this.currentType = 1;
          this.fetchTaskListParams.type = this.currentType;
          break;
        case 'Formal':
          this.tableType = 'formal-project';
          this.currentType = 2;
          this.fetchTaskListParams.type = this.currentType;
          break;
        case 'Label':
          this.tableType = 'label';
          this.currentType = 3;
          this.fetchTaskListParams.type = this.currentType;
          break;
        case '3D bidding':
          this.tableType = '3d-bidding';
          this.currentType = 4;
          this.fetchTaskListParams.type = this.currentType;
          break;
        case '3D formal':
          this.tableType = '3d-formal';
          this.currentType = 5;
          this.fetchTaskListParams.type = this.currentType;
          break;
        case 'Simulation':
          this.tableType = 'simulation';
          this.currentType = 6;
          this.fetchTaskListParams.type = this.currentType;
          break;
        case 'Others':
          this.tableType = 'Others';
          // 待确定： this.currentType
          // this.fetchTaskListParams.type = this.currentType;
          break;
        default:
          break;
      }
      this.getTaskList();
    },
    handleClickAll() {
      this.$router.push('/index/work-item');
    },
    async getCustomTaskList() {
      let params = {
        task_category: this.workItemType
      };
      await getCustomTaskList(params).then((res) => {
        if (res.code === 200) {
          this.taskData = res.data.task_list;
          this.totalRows = res.data.count;
        }
      });
    }
  }
};
</script>

<style>
/* stylelint-disable-next-line selector-class-pattern */
.work-item-type .el-input--mini .el-input__inner {
  height: 32px;
}
</style>

<style lang="less" scoped>
@import url('@/css/variables.less');

.work-item-table-container {
  width: 100%;

  .header-part {
    display: flex;
    align-items: center;
    justify-content: space-between;

    .title {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 16px;
      margin-left: 25px;

      .work-item-type {
        width: 160px;
      }

      p {
        font-size: @title;
        font-family: @font-family;
        font-weight: @font-weight-bold;
        color: @color-text-primary;
      }
    }

    .btn-wrapper {
      margin-right: 10px;
      padding-top: 15px;
      height: 32px;
      flex: 0 0 68px;
      display: flex;
      justify-content: center;
    }
  }

  .body-part {
    margin: 5px 10px 0 25px;
    height: calc(100vh - 200px); 

    .no-data-area {
      width: 1232px;
      height: 264px;
      border: 1px solid #eee;
      border-radius: 4px;
      display: flex;
      align-items: center;
      justify-content: center;

      img {
        width: 200px;
        height: 200px;
      }
    }
  }
}
</style>
