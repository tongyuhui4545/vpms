<template>
  <div class="files-component">
    <file-upload
      v-if="allowUpload"
      ref="file-upload"
      class-name="files-upload"
      form-type="files-center"
      @get-files="getFiles"
    />
    <file-view
      style="margin-top: 10px"
      :files="fileList"
      file-class-name="detail-file"
      file-item-class-name="detail-file-item"
      type="has-delete"
      @delete-file="deleteFile"
    />
  </div>
</template>

<script>
import fileUpload from '@/components/file-upload.vue';
import fileView from '@/components/file-view.vue';
//与任务中心相关的接口
import { uploadTaskFiles } from '@/api/index';
export default {
  components: {
    fileUpload,
    fileView
  },
  props: {
    taskId: {
      type: Number,
      default: null
    },
    fileList: {
      type: Array,
      default: () => {
        return [];
      }
    },
    source: {
        type: String,
        default: 'task-files-center'
      },
    allowUpload: {
      type: Boolean,
      default: true
    }
  },
  emits: ['delete-file'],
  data() {
    return {
      successFileList: [],
      type: ''
    };
  },
  methods: {
    getDeleteType(type) {
      this.type = type;
    },
    async getFiles(files, type, url, file, file_id) { 
      //如果是任务中心里的文件上传
      if (this.source === 'task-files-center') {
        if (type === 'delete' && !this.type) {
          //针对是file-upload组件单独做的删除处理，根据url来拿到删除的file_id
          let currentDeleteFile = this.successFileList.filter((item) => {
            return item.file_path === url;
          });
          this.deleteFile(currentDeleteFile[0].file_id, 0);
        } else {
          //文件中心除了要调upload接口还需要调用自定义任务附件上传的接口
          this.uploadTaskFiles([file]);
        }
      } 
      //如果是项目详情中的文件中心
      else if(this.source === 'project-file-center') { 
        if(type === 'delete') {
          this.$emit('delete-project-file', file_id)
        }
        else {
          this.$emit('upload-project-files', file);
        }
      }
      else {
        if(type === 'delete') {
          this.$emit('delete-project-file', file_id, this.source)
        }
        else {
          this.$emit('upload-project-files', file, this.source);
        }
      }
    },
    async uploadTaskFiles(files) {
      let body = {
        task_id: this.taskId,
        files: JSON.stringify(files)
      };
      await uploadTaskFiles(body).then((res) => {
        if (res.code === 200) {
          // this.$message.success(res.message);
          this.successFileList = this.successFileList.concat(res.data.files);
        }
      });
    },
    // flag =0  不需要确认弹窗, flag = 1 需要确认弹窗
    deleteFile(id, flag) {
      this.$emit('delete-file', id, 'files', flag);
    },
    handleCancel() {
       this.$refs['file-upload'].handleCancel();
    }
  }
};
</script>
