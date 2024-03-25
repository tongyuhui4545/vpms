<template>
  <div>
    <div class="phase-info-container">
      <div
        v-for="(item, key) in duedateOptions"
        :key="key"
        class="row"
      >
        <div class="label">
          {{ item.label }}
        </div>
        <div
          class="value"
          data-aos="fade"
          style="border-right: 0px; border-radius: 0px"
        >
          <span v-if="phaseData">
            {{ phaseData[item.value] }}
          </span>
          <span
            v-if="phaseData[item.value]"
            class="clock-wrapper"
          >
            <el-tooltip
              v-if="justifyDanger(phaseData[item.value])"
              class="item"
              effect="dark"
              :content="dangerTime(phaseData[item.value])"
              placement="top-start"
            >
              <img
                src="@/assets/IconDesigns/yellow_clock.png"
                alt=""
                class="image"
              >
            </el-tooltip>
            <el-tooltip
              v-if="justifyOverdue(phaseData[item.value])"
              class="item"
              effect="dark"
              :content="overDueTime(phaseData[item.value])"
              placement="top-start"
            >
              <img
                src="@/assets/IconDesigns/red_clock.png"
                alt=""
                class="image"
              >
            </el-tooltip>
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: '',
  components: {},
  props: {
    dept: {
      type: String,
      default: null
    },
    phase: {
      type: Object,
      default: null
    }
  },
  data() {
    return {
      activeDept: null,
      duedateOptions: [],
      phaseData: {}
    };
  },
  watch: {
    dept: {
      handler(newValue) {
        this.activeDept = newValue;
        this.getPhaseData();
      },
      deep: true,
      immediate: true
    },
    phase: {
      handler(newValue) {
        this.phaseData = newValue; 
      },
      deep: true
      // immediate: true
    }
  },
  methods: {
    getPhaseData() {
      let { phaseData } = this;
      if (phaseData) {
        let { activeDept } = this;
        if (activeDept === '2D') {
          this.duedateOptions = [
            {
              value: 'inner_date',
              label: 'Internal due date :'
            },
            {
              value: 'team_due_date',
              label: 'Team due date :'
            }
          ];
        }
        if (activeDept === '3D') {
          this.duedateOptions = [
            {
              value: '3d_inner_date',
              label: '3D internal due date :'
            },
            {
              value: '3d_team_due_date',
              label: '3D team due date :'
            }
          ];
        }
      }
    },
    justifyOverdue(params) {
      let is_overdue = false;
      let timestamp = new Date().getTime();
      let datetime = new Date(params).getTime();
      let gap = datetime - timestamp;
      if (gap < 0) {
        is_overdue = true;
      }
      return is_overdue;
    },
    justifyDanger(params) {
      let is_danger = false;
      let timestamp = new Date().getTime();
      let cardinal = 1000 * 60 * 60 * 24 * 2;
      let datetime = new Date(params).getTime();
      let gap = datetime - timestamp;
      if (gap >= 0) {
        if (gap <= cardinal) {
          is_danger = true;
        }
      }
      return is_danger;
    },
    overDueTime(params) {
      let time = '';
      let timestamp = new Date().getTime();
      let datetime = new Date(params).getTime();
      let gap = datetime - timestamp;
      let tag = 1000 * 60 * 60 * 24;
      if (gap < 0) {
        gap = gap * -1;
        let day = Math.floor(gap / tag);
        let totalHours = gap - tag * day;
        let hours = Math.floor(totalHours / (1000 * 60 * 60));
        time = `Overdue by ${day} days ${hours} hours`;
      }
      return time;
    },
    dangerTime(params) {
      let time = '';
      let timestamp = new Date().getTime();
      let cardinal = 1000 * 60 * 60 * 24 * 2;
      let datetime = new Date(params).getTime();
      let gap = datetime - timestamp;
      let tag = 1000 * 60 * 60 * 24;
      if (gap >= 0 && gap <= cardinal) {
        let day = Math.floor(gap / tag);
        let totalHours = gap - tag * day;
        let hours = Math.floor(totalHours / (1000 * 60 * 60));
        time = `${day} days ${hours} hours left before the deadline`;
      }
      return time;
    }
  }
};
</script>

<style scoped lang="less">
.phase-info-container {
  display: flex;
  flex-wrap: wrap;
  height: 32px;
  background: #f4f5f9;
  border-radius: 4px;
  border: 1px solid #eeeeee;
  .row {
    flex: 1;
    display: flex;
    .label {
      flex: 1;
      height: 100%;
      border-left: 1px solid #eeeeee;
      font-size: 14px;
      color: #606266;
      display: flex;
      align-items: center;
      padding-left: 24px;
      border-right: 0px;
    }
    .value {
      flex: 1;
      height: 100%;
      background: #fff;
      font-size: 14px;
      color: #606266;
      display: flex;
      align-items: center;
      padding-left: 24px;
      border-radius: 4px;
    }
  }
  .clock-wrapper {
    margin-left: 5px;
    width: 16px;
    height: 16px;
    .image {
      width: 100%;
      height: 100%;
    }
  }
}
</style>
