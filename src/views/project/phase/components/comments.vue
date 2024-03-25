<template>
  <div class="form-container">
    <el-form
      :model="workForm"
      label-width="130px"
    >
      <el-form-item label="Comment">
        <el-input
          v-model="workForm.comment"
          size="small"
          type="textarea"
          :rows="2"
          @change="handleSend"
        />
      </el-form-item>
      <el-form-item label="Comment files">
        <div class="test">
          <FileUpload
            @get-files="getFilesList"
          />
        </div>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import FileUpload from '@/components/file-upload.vue';
export default {
  name: '',
  components: {
    FileUpload
  },
  data() {
    return {
      workForm: {
        files: [],
        comment: ''
      }
    };
  },
  methods: {
    handleSend() {
      this.$emit('commentsForm', this.workForm);
    },
    getFilesList(value) {
      this.workForm.files = value;
      this.$emit('commentsForm', this.workForm);
    }
  }
};
</script>

<style scoped lang="less">
.form-container {
  :deep(.el-form-item__label){
    text-align: left;
  }
  :deep(.el-textarea__inner) {
    padding: 8px 8px 8px 16px;
    resize: none;
  }
}
:deep(.el-upload-dragger){
  height:96px;
}
</style>
