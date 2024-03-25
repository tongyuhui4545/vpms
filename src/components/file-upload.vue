<template>
  <div class="upload-component">
    <div class="test">
      <el-upload
        drag
        :action="uploadURL"
        multiple
        :class="className"
        :on-success="handleFileSuccess"
        :headers="uploadHeaders"
        :on-remove="handleUploadFileRemove"
        :file-list="filesCopy"
      >
        <div>
          <img
            src="@/assets/image/upload.png"
            alt="load fail"
          >
          <div class="el-upload__text">
            Drop files here or
            <span style="color: #007bff">click to upload</span>
          </div>
        </div>
      </el-upload>

      <div
        v-if="files && files.length && formType !== 'create'"
        :style="{
          'max-height': height,
          'overflow-y': 'auto',
          'margin-top': '5px'
        }"
        class="files-list"
      >
        <div
          v-for="file in files"
          :key="file.id"
        >
          <el-tooltip
            effect="dark"
            content="Top Left 提示文字"
            placement="top-start"
          >
            <div slot="content">
              <p>File: {{ file.name }}</p>
              <p>File capacity: {{ file.size }}</p>
              <p>Creator: {{ file.creator }}</p>
              <p>Creation date: {{ file.created_at }}</p>
            </div>
            <div
              class="file-item"
              @mouseenter="handleHoverIn(file.id)"
              @mouseleave="handleHoverOut"
            >
              <div :class="file.id === hoverId ? '' : ''">
                <i class="el-icon-document" />
                {{ file.name }}
              </div>
              <div>
                <i
                  v-if="file.id !== hoverId"
                  class="el-icon-circle-check"
                  style="color: #61bd70; cursor: pointer"
                />
                <i
                  v-else
                  class="el-icon-close"
                  style="cursor: pointer"
                  @click="handleFileRemove(file)"
                />
              </div>
            </div>
          </el-tooltip>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import baseUrl from '@/config.js';

export default {
  props: {
    className: {
      type: String,
      default: ''
    },
    fileListVisible: {
      type: Boolean,
      default: false
    },
    formType: {
      type: String,
      default: ''
    },
    fileList: {
      type: Array,
      default: () => {
        return [];
      }
    },
    height: {
      type: String,
      default: 'auto'
    }
  },
  emits: ['get-files'],
  data() {
    return {
      files: [],
      fileEle: null,
      visible: false,
      parent: null,
      uploadURL: '',
      targetName: '',
      filesCopy: [],
      hoverId: 0,
      uploadHeaders: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      },
      fileListCopy: []
    };
  },
  mounted() {
    this.uploadURL = `${baseUrl.baseUrl}/api/upload-files`;
    this.$nextTick(() => {
      if (this.fileList.length) {
        this.fileList.forEach((item) => {
          item.id = item.id || item.uid;
        });
        if (this.formType === 'create') {
          this.filesCopy = this.fileList;
        } else {
          this.files = this.fileList;
        }
      }
    });
  },
  methods: {
    async handleFileSuccess(e) {
      if (e.code === 200) {
        this.fileListCopy.unshift(e.data.files);
        this.$emit(
          'get-files',
          this.fileListCopy.concat(this.files),
          '',
          null,
          e.data.files
        );
      }
    },
    handleHoverIn(id) {
      this.hoverId = id;
    },
    handleHoverOut() {
      this.hoverId = null;
    },
    handleUploadFileRemove(e) {
      this.fileListCopy.splice(
        this.fileListCopy.findIndex((file) => {
          return file.url === e.response.data.files.url;
        }),
        1
      );
      this.$emit(
        'get-files',
        this.fileListCopy.concat(this.files),
        'delete',
        e.response.data.files.url,
        null,
        //被删除的文件的id
        e.response.data.files.id
      );
    },
    handleFileRemove(e) {
      this.files.splice(
        this.files.findIndex((file) => {
          return file.id === e.id;
        }),
        1
      );
      this.$emit(
        'get-files',
        this.fileListCopy.concat(this.files),
        'delete',
        e.id
      );
    },
    // v0.8.0 bug修复，当用户点击Cancel的时候，把已经上传但未提交的文件列表清空
    handleCancel() {
      this.filesCopy = []; 
    }
  }
};
</script>

<style lang="less" scoped>
.task-form {
  .files-list,
  :deep(.el-upload-list) {
    margin-left: -148px;
    // border: 1px solid #eeeeee;
    font-weight: 400;
    color: #606266;
    max-height: 104px;
    overflow-y: auto;
    .file-item {
      font-size: 13px;
    }
  }
}

.upload-component {
  position: relative;
}

:deep(.el-upload) {
  width: 100%;
}

:deep(.el-upload-dragger) {
  width: 100%;
  background-color: #f5f7fa;
  border: 1px solid #f5f7fa;
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
}

:deep(.el-upload-list__item) {
  text-align: left;
}

.cancel-content {
  :deep(.el-button--primary) {
    background-color: #007bff;
    border: 1px solid #007bff;
    font-size: 16px;
  }

  :deep(.el-button--default) {
    font-size: 16px;
    font-weight: 400;
    color: #303133;
  }

  :deep(.el-dialog__footer) {
    padding-bottom: 40px;
  }
}

.file-item {
  display: flex;
  justify-content: space-between;
  margin: 5px 0;
  padding: 5px 5px 5px 5px;
  align-items: center;
  font-size: 14px;
  font-weight: 400;
  color: #606266;
}

.file-item:hover {
  background: #f5f7fa;
}

:deep(.el-upload-list__item-name) {
  font-weight: 400;
  color: #606266;
  font-size: 13px;
}
</style>
