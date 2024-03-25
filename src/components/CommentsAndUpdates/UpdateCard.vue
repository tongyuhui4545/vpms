<template>
  <div class="comment-container">
    <div class="comment-header">
      <p class="name">
        {{ update.creation_name }}
      </p>
      <p class="time">
        {{ updateTime }}
      </p>
    </div>
    <div class="comment-body">
      <div class="update-content">
        <span class="comment-text"> {{ updateContent }}</span>
      </div>
      <div
        v-if="update.comment && update.comment"
        class="update-comment"
      >
        Comment:{{ update.comment }}
      </div>
      <div
        v-if="update.files && update.files.length > 0"
        class="update-comment-files"
      >
        Comment files:
        <span
          v-for="(file, index) in update.files"
          :key="index"
          style="display: flex; justify-content: center; align-items: center"
        >
          {{ file.name }}
          <div
            style="
              display: flex;
              justify-content: center;
              align-items: center;
              gap: 2px;
              margin-left: 10px;
              margin-top: 4px;
            "
          >
            <span
              v-if="file.name.endsWith('.pdf')"
              @click.stop="handleViewFile(file)"
            ><i
              class="el-icon-view table-icon animate"
              @click="handleViewFile"
            /></span>
            <span
              class="download-icon"
              @click.stop="viewFile(file)"
            ><img
              src="@/assets/IconDesigns/download.png"
              style="width: 14px; height: 14px"
              alt="view file"
            ></span>
          </div>
        </span>
      </div>
    </div>
  </div>
</template>

<script>
import baseUrl from '@/config.js';

export default {
  props: {
    update: {
      type: Object,
      default: () => { return {} }
    }
  },
  data() {
    return {
      updateTime: ''
    };
  },
  computed: {
    updateContent() {
      if (this.update.status === 'US_TO_BE_SEND') {
        return 'Phase added';
      }
      if (
        this.update.status_last === 'US_TO_BE_SEND' &&
        this.update.status === 'CAL_US_HAS_BEEN_SEND'
      ) {
        return 'Calculation task starts, pending assign 3D design team ';
      } else {
        switch (this.update.type) {
          case 1:
          case 2:
            return `Updated quote status from ${this.update.progress_status_last} to ${this.update.progress_status}`;

          case 3:
            return `Updated label status from ${this.update.progress_status_last} to ${this.update.progress_status}`;

          case 4:
          case 5:
            return `Updated calculation status from ${this.update.progress_status_last} to ${this.update.progress_status}`;

          case 6:
            return `Updated simulation status from ${this.update.progress_status_last} to ${this.update.progress_status}`;

          default:
            return `Updated phase status from ${this.update.progress_status_last} to ${this.update.progress_status}`;
        }
      }
    }
  },
  watch: {
    'update.created_at': {
      handler (val) {
        this.updateTime = val;
      },
      immediate: true
    }
  },
  methods: {
    viewFile(params) {
      this.directDownload(params.url, params.name);
    },
    handleViewFile(file) {
      if (file && file.url) {
        // 检查文件类型，这里假设支持PDF和Excel文件预览
        const isPDF = file.name.toLowerCase().endsWith('.pdf');
        const isExcel = file.name.toLowerCase().endsWith('.xls');

        if (isPDF || isExcel) {
          // 使用window.open()打开文件预览
          window.open(file.url, '_blank');
        } else {
          this.$message.error('this type of files are not supported for preview');
          // 在这里可以处理其他文件类型的预览方式
        }
      } else {
        this.$message.error('invalid type');
      }
    },
    //直接下载
    directDownload(url, name) {
      let urlValue;
      urlValue = url.includes('http') ? url : `${baseUrl.baseUrl}/${url}`;
      let link = document.createElement('a');
      link.href = urlValue;
      link.download = name;
      link.target = '_blank';
      link.click();
    }
  }
};
</script>

<style scoped lang="less">
.comment-header {
  display: flex;
}

.comment-header .name,
.time {
  font-family: 'PingFang SC-Regular', 'PingFang SC', sans-serif;
  font-size: 13px;
  color: #909399;
  font-weight: 400;
}

.comment-body {
  /* width: 799px; */
  display: flex;
  align-items: center;
  justify-content: flex-start;

  .update-comment {
    margin: 0 32px;
  }

  .update-comment-files {
    margin-left: 7px;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 3px;

    .download-icon {
      :hover {
        cursor: pointer;
      }
    }

    span {
      margin-right: 10px;
      // cursor: pointer;
      // color: #007bff;
      // text-decoration: underline;
      transition: color 0.3s;
    }

    span:hover {
      color: #0056b3;
      text-decoration: none;
    }
  }
}

.comment-body .comment-text {
  font-family: 'PingFang SC-Regular', 'PingFang SC', sans-serif;
  font-size: 14px;
  color: #606266;
  font-weight: 400;
  word-wrap: break-word;
}

.comment-header .time {
  margin-left: 32px;
  text-align: center;
}

.comment-opt {
  display: flex;
}

.option-icon-field {
  display: flex;
  align-items: flex-start;
  margin-right: 16px;
}

.option-icon-field .option-text {
  color: #007bff;
}

.option-icon-field .option-text:hover {
  cursor: pointer;
}

.option-icon-field img {
  width: 14px;
  height: 14px;
}

::v-deep .el-textarea {
  min-height: 32px;
  margin-top: 7px;
  margin-bottom: 5px;
}
</style>
