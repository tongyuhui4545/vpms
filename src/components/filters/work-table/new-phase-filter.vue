<template>
  <div style="margin-right: 24px">
    <el-form
      ref="filterForm"
      label-width="140px"
      class="new-phase-form"
      :model="formData"
    >
      <el-row>
        <el-col :span="6">
          <el-form-item label="Phase creation date">
            <div class="creation-date-wrapper">
              <el-date-picker
                v-model="formData.creation_time_start"
                value-format="yyyy-MM-dd"
                size="small"
                placeholder="start"
                @input="handleDateChange"
              />
              <span>-</span>
              <el-date-picker
                v-model="formData.creation_time_end"
                value-format="yyyy-MM-dd"
                size="small"
                placeholder="end"
                @input="handleDateChange"
              />
            </div>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="Quote status">
            <el-select
              v-model="formData.quote_status"
              filterable
              clearable
              placeholder="Please input and select"
              size="small"
              style="width: 300px"
            >
              <el-option
                v-for="opt in quoteStatusOptions"
                :key="opt.value"
                :label="opt.label"
                :value="opt.value"
              />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="Project Name/No.">
            <el-input
              v-model="formData.search"
              size="small"
              style="width: 300px"
              clearable
              placeholder="Enter project to search"
            />
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="Status">
            <el-select
              v-model="formData.sales_status"
              filterable
              clearable
              placeholder="Please input and select"
              size="small"
              style="width: 300px"
            >
              <el-option
                v-for="opt in salesStatusOptions"
                :key="opt.value"
                :label="opt.label"
                :value="opt.value"
              />
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="6">
          <el-form-item label="Size DC (MW)">
            <div
              class="size-wrapper"
              style="
                display: flex;
                justify-content: space-between;
                gap: 4px;
                align-items: center;
              "
            >
              <el-input-number
                v-model="formData.size_start"
                size="small"
                style="width: 150px"
              />
              <span>To</span>
              <el-input-number
                v-model="formData.size_end"
                size="small"
                style="width: 150px"
              />
            </div>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="Customer">
            <el-select
              v-model="formData.client_id"
              filterable
              clearable
              placeholder="Please input and select"
              size="small"
              style="width: 300px"
            >
              <el-option
                v-for="customer in customerOptions"
                :key="customer.id"
                :label="customer.name"
                :value="customer.id"
              />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="Sales">
            <el-select
              v-model="formData.sales_id"
              filterable
              clearable
              placeholder="Please input and select"
              size="small"
              style="width: 300px"
            >
              <el-option
                v-for="person in salesOptions"
                :key="person.id"
                :label="person.name"
                :value="person.id"
              />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <div class="btns-wrapper">
            <div
              class="reset-btn"
              @click="resetForm"
            >
              Reset
            </div>
            <div
              class="confirm-btn"
              @click="handleConfirm"
            >
              Confirm
            </div>
          </div>
        </el-col>
      </el-row>
    </el-form>
  </div>
</template>
    
    <script>
    import { salesList, customerAll } from '@/api/index';
import dayjs from 'dayjs';

    import {
      QUOTE_STATUS_OPTIONS,
      SALES_STATUS,
      STATUS_OPTIONS
    } from '@/utils/constants.js';
    export default {
      emits: ['on-filter'],
      data() {
        return {
          formData: {
            creation_time_start:'',
            creation_time_end:''
          },
          quoteStatusOptions: QUOTE_STATUS_OPTIONS,
          salesStatusOptions: SALES_STATUS,
          userOptions: [],
          tagList: [],
          statusOptions: STATUS_OPTIONS,
          createDate: [],
          actualStartDate: [],
          completeDate: [],
          salesOptions: [],
          customerOptions: []
        };
      },
      computed: {
        filterFieldSelected() {
          let num = Object.values(this.formData).filter((value) => {
            return (
              value !== '' && value !== undefined && value !== null && value !== 0
            );
          }).length;
          return num;
        }
      },
      mounted() {
        this.getCustomerAndSalesOptions();
      },
      methods: {
        handleDateChange() {
          this.$forceUpdate(); 
        },
        handleConfirm() {
      this.formData.creation_time_start = dayjs(this.formData.creation_time_start).isValid() ? dayjs(this.formData.creation_time_start).format('YYYY-MM-DD') : '';
      this.formData.creation_time_end = dayjs(this.formData.creation_time_end).isValid() ? dayjs(this.formData.creation_time_end).format('YYYY-MM-DD') : '';
      this.$emit('on-filter', this.formData, this.filterFieldSelected);
    },
    resetForm() {
      this.formData = {
        creation_time_start: '',
        creation_time_end: '',
        search: '',
        sales_status: '',
        size_start: undefined,
        size_end: undefined,
        client_id: null,
        sales_id: null,
        quote_status: ''
      };
    },
        setDateRange(range) { 
          let [year, month] = range[1].split('-')
     let lastDayOfMonth = this.getLastDay(year, month); 
      [this.formData.creation_time_start] = range; 
      this.formData.creation_time_start = `${range[0]}-01`;
      this.formData.creation_time_end = `${range[1]}-${lastDayOfMonth}`; 
    },
    getLastDay(year, month) {
    // 使用 Date 对象构造指定年份和月份的下个月的第一天，再减去一天得到当前月的最后一天
    let lastDayOfMonth = new Date(year, month, 0);
    // 获取最后一天的日期
    let lastDay = lastDayOfMonth.getDate();
    return lastDay;
    },
    getCustomerAndSalesOptions() {
      customerAll()
        .then((res) => {
          this.customerOptions = res.code === 200 ? res.data : this.customerOptions; 
          this.$forceUpdate();
        })
        .catch((err) => {
          return err;
        });
      salesList().then((res) => {
        this.salesOptions = res.code === 200 ? res.data : this.salesOptions;
        this.$forceUpdate();
      }).catch((err) => {
        return err;
      })
    }
      }
    };
    </script>
    
    <style lang="less" scoped>
    .new-phase-form {
        padding: 16px; 

    .creation-date-wrapper {
        display: flex;
        justify-content: space-between;
        gap: 8px
    }
    .btns-wrapper {
      display: flex;
      justify-content: flex-end;
      align-items: center;
      padding-top: 8px;
      padding-right: 30px;
      gap: 16px;

      .reset-btn, .confirm-btn {
      width: 76px;
      height: 30px;
      text-align: center;
      line-height: 30px;
      border: 1px solid #007bff;
      border-radius: 4px;
      font-size: 14px;
      cursor: pointer
    }

    .reset-btn {
      background: #ffffff;
      color: #007bff;
    }
    .confirm-btn {
      background: #007bff;
      color: #fff
    }
    }
      .submit-btns {
        display: flex;
        align-items: center;
        justify-content: flex-end;
    
        :deep(.el-button) {
          width: 80px;
          font-size: 14px;
          font-weight: 400;
        }
    
        .reset {
          color: #007bff;
          border-color: #007bff;
        }
      }
    }
    </style>
    