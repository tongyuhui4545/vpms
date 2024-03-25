<template>
  <div class="form-container">
    <el-form
      :rules="workRules"
      :inline="true"
      :model="workForm"
      class="demo-form-inline"
    >
      <el-form-item label="">
        <el-checkbox
          v-model="workForm.is_send"
          @change="handleSend"
        >
          3D calculation needed
        </el-checkbox>
      </el-form-item>
      <el-form-item
        v-if="workForm.is_send"
        label="3D internal due date"
        prop="inner_date"
        style="margin-left: 20px"
      >
        <el-date-picker
          v-model="workForm.inner_date"
          type="datetime"
          placeholder="Please enter date"
          size="small"
          value-format="yyyy-MM-dd HH:mm:ss"
          default-time="23:59:59"
          style="width: 280px"
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
      workForm: {
        is_send: false,
        inner_date: ''
      },
      workRules: {
        inner_date: [
          {
            required: true,
            message: 'Please select 3D internal due date',
            trigger: 'change'
          }
        ]
      }
    };
  },
  methods: {
    handleSend() {
      let { workForm } = this;
      this.$emit('calculationForm', workForm);
    }
  }
};
</script>

<style scoped lang="less">
.form-container {
  height: 41px;
  .form-gap {
    margin-right: 16px;
  }
  /deep/ .el-form-item {
    margin-bottom: 0px;
  }
}
</style>
