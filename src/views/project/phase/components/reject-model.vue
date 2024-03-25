<template>
  <div class="form-container">
    <el-form
      ref="form"
      :rules="rules"
      :model="form"
      label-width="100px"
    >
      <el-form-item
        label="Reason"
        prop="reason"
      >
        <el-select
          v-model="form.reason"
          placeholder="Please select"
          size="small"
          style="width: 100%"
          @change="handleSend"
        >
          <el-option
            v-for="(item, key) in reasonOptions"
            :key="key"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item
        label="Comment"
        prop="remarks"
      >
        <el-input
          v-model="form.remarks"
          size="small"
          type="textarea"
          :rows="2"
          @change="handleSend"
        />
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: '',
  components: {},
  data() {
    return {
      form: {
        reason: '',
        remarks: ''
      },
      reasonOptions: [
        { 
          label: 'Customer updates', 
          value: 'Customer updates' 
        },
        { 
          label: 'Drawing errors', 
          value: 'Drawing errors' 
        },
        { 
          label: 'Quote errors', 
          value: 'Quote errors' 
        },
        { 
          label: 'Others', 
          value: 'Others' 
        }
      ],
      rules: {
        reason: [
          { required: true, message: 'Please select a reason', trigger: 'blur' }
        ],
        remarks: [
          {
            required: true,
            message: 'Please enter a comment',
            trigger: 'blur'
          }
        ]
      }
    };
  },
  created() {
    this.getOptionsData();
  },
  methods: {
    getOptionsData() {
      this.form = {
        reason: '',
        comment: ''
      };
    },
    handleSend(){
      this.$emit('rejectForm', this.form);
    }
  }
};
</script>

<style scoped lang="less">
.form-container {
  margin-right: 2px;
  /deep/ .el-form-item__label {
    text-align: left;
    font-size: 14px;
    font-family: PingFang SC, PingFang SC;
    font-weight: 400;
    color: #303133;
  }
  /deep/ .el-textarea__inner {
    padding: 8px 8px 8px 16px;
    resize: none;
  }
}
</style>
