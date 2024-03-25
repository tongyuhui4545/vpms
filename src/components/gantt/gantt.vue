<template>
  <div>
    <div class="header-container">
      <div class="header-wrapper">
        <div
          v-show="checkShow"
          class="gantt-filter"
        >
          <el-checkbox-group
            v-model="checkList"
            @change="handleCheck"
          >
            <el-checkbox
              v-for="(item, key) in checkOptions"
              :key="key"
              :label="item.value"
            >
              {{ item.label }}
            </el-checkbox>
          </el-checkbox-group>
        </div>
      </div>
      <div
        v-if="pageMode === 2"
        class="return-wrapper animate"
        @click="handleBack"
      >
        <i class="el-icon-back back-icon" />
        Return
      </div>
    </div>
    
    <Gantt :gantt-params="ganttData" />
  </div>
</template>

<script>
import Gantt from '@/components/gantt/index.vue';
import { ganttTeamMember, ganttDeptManager } from '@/api';
export default {
  name: '',
  components: {
    Gantt
  },
  props: {
    setting: {
      type: Object,
      default: null
    }
  },
  data() {
    return {
      pageMode: null,
      checkShow: false,
      checkOptions: [],
      options_2d: [
        {
          label: 'Quote',
          value: 1
        },
        {
          label: 'Label',
          value: 2
        },
        {
          label: 'Others',
          value: 5
        }
      ],
      options_3d: [
        {
          label: 'Calculation',
          value: 3
        },
        {
          label: 'Simulation',
          value: 4
        },
        {
          label: 'Others',
          value: 5
        }
      ],
      checkList: [],
      ganttData: {
        mode: 4,
        group: false,
        start_date: '',
        end_date: '',
        data: []
      }
    };
  },
  watch: {
    setting: {
      handler(newValue) {
        this.ganttInit(newValue);
      },
      deep: true,
      immediate: true
    }
  },
  methods: {
    handleBack() {
      this.$router.go(-1);
    },
    ganttInit(params){
      let { mode } = params;
      let { dept } = params;
      let { type } = params;
      this.pageMode = mode;
      if(dept === '2D'){
        if(type === 1){
          this.defaultDept(this.options_2d);
          this.getDeptManager();
        }
        if(type === 2){
          this.getTeamMember();
        }
      }
      if(dept === '3D'){
        if(type === 1){
          this.defaultDept(this.options_3d);
          this.getDeptManager();
        }
        if(type === 2){
          this.getTeamMember();
        }
      }
    },
    defaultDept(options) {
      this.checkShow = true;
      this.checkOptions = options;
      this.checkList = this.checkOptions.map((item) => {
        return item.value;
      });
    },
    handleCheck(val) {
      this.checkList = val;
      this.getDeptManager();
    },
    getDeptManager() {

      /**
       * 1=Quote, 2=Label, 3=Calculation, 4=Simulation, 5=Others
       */
      ganttDeptManager({
        task_type: this.checkList
      }).then((res) => {
        if (res.code === 200) {
          let { data } = res;
          this.ganttData = {
            mode: 4,
            group: true,
            start_date: data.total_start_date,
            end_date: data.total_end_date,
            data: data.list
          };
        }else{
          this.$message({
            message: res.message,
            type: 'warning'
          });
        }
      });
    },
    getTeamMember() {
      ganttTeamMember().then((res) => {
        if (res.code === 200) {
          let { data } = res;
          this.ganttData = {
            mode: 5,
            group: false,
            start_date: data.total_start_date,
            end_date: data.total_end_date,
            data: data.list
          };
        }else{
          this.$message({
            message: res.message,
            type: 'warning'
          });
        }
      });
    }
  }
};
</script>

<style scoped lang="less">
.header-container{
  display: flex;
  justify-content: space-between;
  height:40px;
  .header-wrapper{
    height:100%;
  }
  .return-wrapper {
    display: flex;
    align-items: center;
    font-size: 16px;
    color: #007bff;
    margin-right: 8px;
    transition: 0.5s;
    transition-property: all;
    transition-duration: 0.5s;
    transition-timing-function: ease;
    transition-delay: 0s;
    .back-icon {
      margin-right: 3px;
    }
  }
  .return-wrapper:hover {
    cursor: pointer;
    opacity: 0.8;
  }
}
.gantt-filter {
  margin-top:10px;
  margin-bottom: 18px;
  :deep(
      .el-checkbox__input.is-checked .el-checkbox__inner,
      .el-checkbox__input.is-indeterminate .el-checkbox__inner
    ) {
    background-color: #007bff;
    border-color: #007bff;
  }
  :deep(.el-checkbox__input.is-checked + .el-checkbox__label) {
    color: #007bff;
  }
}
</style>
