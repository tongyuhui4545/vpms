<template>
  <div class="date-range-picker-container">
    <el-date-picker
      v-model="startDate"
      clearable
      :type="pickerTime"
      placeholder="start"
      :style="{ width: inputWidthData }"
      size="small"
      :append-to-body="appendToBody"
      @change="handleStartDateChange"
      @focus="handleFocus"
    />
    <span>-</span>
    <el-date-picker
      v-model="endDate"
      clearable
      :type="pickerTime"
      default-time="23:59:59"
      placeholder="end"
      :style="{ width: inputWidthData }"
      size="small"
      :append-to-body="appendToBody"
      @change="handleEndDateChange"
      @focus="handleFocus"
    />
  </div>
</template>

<script>
import { formatTime } from '@/utils/format-time.js';

export default {
  name: 'DateRangePicker',
  props: {
    value: {
      type: Array,
      default: () => {
        return [];
      }
    },
    type: {
      type: String,
      default: ''
    },
    pickerTime: {
      type: String,
      default: 'datetime'
    },
    inputWidth: {
      type: String,
      default: '120px'
    }
  },

  data() {
    return {
      startDate: '',
      endDate: '',
      appendToBody: true
    };
  },
  computed: {
    inputWidthData() {
      return this.inputWidth;
    }
  },
  watch: {
    value: {
      handler(val) {
        if (val) {
          this.startDate = val[0] || '';
          this.endDate = val[1] || '';
        }
      },
      immediate: true,
      deep: true
    },
    startDate(val) { 
      let data = val ? formatTime(val, 'YYYY-MM-DD HH:mm:ss') : '';
      this.$emit('input-start-date', data, this.type, 'start');
    },
    endDate(val) {
      let data = val ? formatTime(val, 'YYYY-MM-DD HH:mm:ss') : '';
      this.$emit('input-end-date', data, this.type, 'end');
    }
  },
  methods: {
    handleFocus() {
      this.$emit('date-picker-opened');
    },
    handleStartDateChange(val) {
      if (val === null) {
        this.startDate = '';
        return;
      }
    },
    handleEndDateChange(val) {
      if (val === null) {
        this.endDate = '';
        return;
      }
    }
  }
};
</script>

<style lang="less" scoped>
.date-range-picker-container {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  padding-left: -3px;

  span {
    margin: 0 5px;
  }
}
</style>
