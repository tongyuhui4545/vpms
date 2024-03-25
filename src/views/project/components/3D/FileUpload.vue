<template>
  <el-dialog
    :title="uploadedFileType"
    :visible.sync="showDialog"
    width="560px"
    class="upload-file-dialog"
    @close="close"
  >
    <div class="content">
      <el-upload
        class="3d-file-upload"
        :action="uploadURL"
        :on-progress="handleQuotationFilesProgresss"
        :on-success="onFileUploaded"
        :on-preview="handlePreview"
        :on-remove="handleRemove"
        :headers="uploadHeaders"
        :file-list="fileList"
        multiple
      >
        <span class="file-type-text">{{ uploadedFileType }}</span>
        <el-button
          size="small"
          type="primary"
          class="upload-btn"
        >
          Click to upload
        </el-button>
      </el-upload>
    </div>
    <div slot="footer">
      <div class="footer-btn-group">
        <el-button @click="close">
          Cancel
        </el-button>
        <el-button
          type="primary"
          @click="handleSubmit"
        >
          Submit
        </el-button>
      </div>
    </div>
  </el-dialog>
</template>

<script>
import baseUrl from '@/config.js';

export default {
  name: 'FileUpload',
  data() {
    return {
      uploadHeaders: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      },
      fileList: [],
      fileListData: [],
      showDialog: false,
      uploadedFileType: '',
      uploadFrom: '',
      loadQuotationFiles: []
    };
  },
  computed: {
    uploadURL() {
      return `${baseUrl.baseUrl}/api/upload-files`;
    }
  },
  methods: {
    handleQuotationFilesProgresss(event) {
      if (event.lengthComputable) {
        let val = ((event.loaded / event.total) * 100).toFixed(0);
        this.loadQuotationFiles = parseInt(val);
      }
    },
    onFileUploaded(response, file) {
      if (response.code === 200) {
        response.data.files.size = Math.floor(file.size / 1024);
        this.fileListData.push(response.data.files);
      }
    },
    handlePreview() { return },
    handleRemove(file) {
      this.fileListData = this.fileListData.filter(
        (item) => {return item.name !== file.name}
      );
    },
    show(fileType, uploadFrom) {
      this.uploadedFileType = fileType;
      //从算量还是定量
      this.uploadFrom = uploadFrom;
      this.showDialog = true;
    },
    close() {
      this.fileList = [];
      this.showDialog = false;
    },
    handleSubmit() {
      this.$nextTick(() => {
        this.$emit(
          'on-upload',
          this.fileListData,
          this.uploadedFileType,
          this.uploadFrom
        );
        this.fileList = [];
        this.fileListData = [];
        this.close();
      });
    }
  }
};
</script>

<style lang="less" scoped>
.upload-file-dialog {
  .content {
    height: 200px;
    overflow: auto;

    .file-type-text {
      font-size: 14px;
      font-family: 'PingFang SC', sans-serif;
      font-weight: 400;
      color: #606266;
    }

    .upload-btn {
      margin-left: 16px;
    }
  }

  .footer-btn-group {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    height: 60px;
  }
}
</style>
