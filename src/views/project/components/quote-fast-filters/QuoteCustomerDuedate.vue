<template>
  <div class="customer-due-date-wrapper">
    <DateRangePicker
      v-model="dueDate"
      picker-time="date"
      @input-start-date="handleInputDate"
      @input-end-date="handleInputDate"
      @date-picker-opened="datePickerOpened"
    />
    <div class="confirm-btn">
      <el-button
        type="text"
        size="small"
        style="width: 50px; margin-right: 5px"
        @click="handleFastFilter"
      >
        Confirm
      </el-button>
    </div>
  </div>
</template>

<script>
import DateRangePicker from '@/components/filters/components/DateRangePicker.vue';
export default {
  components: {
    DateRangePicker
  },
  data() {
    return {
      dueDate: ['', '']
    };
  },
  methods: {
    handleFastFilter() {
      this.$emit('fast-filter', this.dueDate);
      this.dueDate = ['', ''];
    },
    handleInputDate(val, pickerType, dateType) {
      if (dateType === 'start') {
        this.dueDate[0] = val;
      } else {
        this.dueDate[1] = val;
      }
    },
    datePickerOpened() {
      this.$emit('date-picker-opened');
    }
  }
};
</script>

<style lang="less" scoped>
.customer-due-date-wrapper {
  margin: 15px 8px 0;
  
  .confirm-btn {
    display: flex;
    align-items: center;
    justify-content: flex-end;
  }
}
</style>
