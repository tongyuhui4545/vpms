<template>
  <div class="comments-or-updates">
    <div class="main-title">
      Comments & Updates
    </div>
    <el-tabs
      v-model="activeName"
      type="card"
    >
      <el-tab-pane
        :label="
          !commentsInfo.length
            ? 'Comments'
            : `Comments (${commentsInfo.length})`
        "
        name="comments"
      >
        <comments-or-updates
          :info="commentsInfo"
          type="comments"
          @edit-comment="editComment"
          @delete-comment="deleteComment"
          @detele-file="deleteFile"
        />
      </el-tab-pane>
      <el-tab-pane
        :label="
          !updatesInfo.length ? 'Updates' : `Updates (${updatesInfo.length})`
        "
        name="updates"
      >
        <comments-or-updates
          :info="updatesInfo"
          type="others-updates"
        />
      </el-tab-pane>
      <el-tab-pane
        :label="!phaseInfo.length ? 'Phase' : `Phase (${phaseInfo.length})`"
        name="phase"
      >
        <comments-or-updates
          :info="phaseInfo"
          type="phase"
        />
      </el-tab-pane>
      <el-tab-pane
        :label="
          !configurationInfo.length
            ? 'Configuration'
            : `Configuration (${configurationInfo.length})`
        "
        name="configuration"
      >
        <comments-or-updates
          :info="configurationInfo"
          type="configuration"
        />
      </el-tab-pane>
    </el-tabs>
    <div
      v-if="activeName === 'comments' && commentsVisible"
      class="comments-submit"
    >
      <el-input
        ref="commentInput"
        v-model="commentInput"
        placeholder="Please enter"
        clearable
        style="border: #eee"
        @keyup.native="logKey"
      />
      <tag-person
        v-if="atTagPerson"
        :style="{ position: 'absolute', top: '-284px', left: leftPosition }"
        @person-chosen="handleChosenPerson"
      />
      <!-- <div style="margin: 0; position: relative">
        <at-person-input
          ref="at-person-input"
          height="24px"
          width="120%"
        />
      </div>    -->
      <div>
        <file-upload
          height="104px"
          @get-files="getFiles"
        />
      </div>
      <el-button @click="handleSubmitComment">
        Submit
      </el-button>
    </div>
    <POPDialog
      :dialog="{
        title: 'Tips',
        type: 'message',
        visible: deleteVisible,
        width: '560px'
      }"
      @dialogClosed="
        (val) => {
          deleteVisible = val;
        }
      "
    >
      <template #dialog-content>
        {{ confirmText }}
      </template>
      <template #dialog-btn>
        <el-button
          size="small"
          @click="deleteVisible = false"
        >
          Cancel
        </el-button>
        <el-button
          type="primary"
          size="small"
          @click="requestDelete"
        >
          Confirm
        </el-button>
      </template>
    </POPDialog>
  </div>
</template>

<script>
import CommentsOrUpdates from '@/views/work-table/components/comments-or-updates.vue';
import TagPerson from '@/components/CommentsAndUpdates/TagPerson.vue';
// import AtPersonInput from '@/components/at-person-input.vue';
import FileUpload from '@/components/file-upload.vue';
import POPDialog from '@/components/pop-dialog.vue';

import {
  getComments,
  getUpdates,
  getUpdatesList,
  addComment,
  editComment,
  deleteComment,
  deleteCommentFile
} from '@/api/index';

export default {
  name: '',
  components: {
    CommentsOrUpdates,
    TagPerson,
    FileUpload,
    POPDialog
  },
  props: {
    dept: {
      type: String,
      default: null
    },
    mode: {
      type: Number,
      default: 0
    },
    progress: {
      type: Object,
      default: null
    }
  },
  data() {
    return {
      //v0.9.0对于评论中@人功能的调整
      commentResult: undefined,
      // *****************************
      activeDept: '',
      projectMode: 0,
      activeName: 'comments',
      atTagPerson: false,
      commentInput: '',
      leftPosition: '27px',
      personMentioned: [],
      personIds: [],
      commentsInfo: [],
      phaseInfo: [],
      phaseData: {},
      updatesInfo: [],
      configurationInfo: [],
      personList: [],
      selectedPeople: [],
      options: [
        { key: 'Phil Heartman', value: 'pheartman' },
        { key: 'Gordon Ramsey', value: 'gramsey' }
      ],
      commentFiles: [],
      deleteVisible: false,
      confirmText: '',
      deleteCommentId: 0,
      deleteFileId: 0,
      commentType: '',
      updatesType: '',
      progressId: 0,
      commentsVisible: true
    };
  },
  watch: {
    mode: {
      handler(newValue) {
        this.projectMode = newValue;
      },
      deep: true,
      immediate: true
    },
    dept: {
      handler(newValue) {
        this.activeDept = newValue;
        if (this.phaseData && this.phaseData.id) {
          this.getOptionsData();
        }
      },
      deep: true,
      immediate: true
    },
    progress: {
      handler(newValue) {
        this.phaseData = newValue;
        if (this.phaseData && this.phaseData) {
          this.getOptionsData();
        }
      },
      deep: true,
      immediate: true
    }
  },
  methods: {
    filterPersonMentioned() {
      let persons = this.personMentioned;
      let comment = this.commentInput;

      let filteredPersonsMentioned = persons.filter((item) => {
  let {name} = item;
  return comment.includes(`@${name}`);
});
this.personMentioned = filteredPersonsMentioned;
this.personIds = filteredPersonsMentioned.map((item) => {return item.id});
    },
   async handleSubmitComment() {
    if (this.commentInput) {
        let files = [];
        if (this.commentFiles.length) {
          this.commentFiles.forEach((file) => {
            files.push(file.id);
          });
        }
        this.filterPersonMentioned()
        let body = {
          progress_id: this.progressId,
          comment: this.commentInput,
          files,
          refer_user: this.personIds,
          type: this.commentType
        };
        await addComment(body).then((res) => {
          if (res.code === 200) {
            this.$message.success(res.message);
            this.getComments();
            this.personIds.length = 0;
            this.commentInput = '';
            this.personIds = [];
            this.personMentioned = [];
            this.commentFiles.length = 0;
            this.commentsVisible = false;
            setTimeout(() => {
              this.commentsVisible = true;
            }, 500);
          }
        });
      } else {
        this.$message.warning('comment can not be empty');
      }
    },
    getOptionsData() {
      let { project_type } = this.$route.params;
      let { projectMode } = this;
      let dept = this.activeDept;
      if (project_type === 'bidding') {
        if (dept === '2D') {
          if (projectMode === 1) {
            this.commentType = 1;
            this.updatesType = 1;
          }
          if (projectMode === 2) {
            this.commentType = 3;
            this.updatesType = 3;
          }
        }
        if (dept === '3D') {
          if (projectMode === 1) {
            this.commentType = 4;
            this.updatesType = 4;
          }
          if (projectMode === 2) {
            this.commentType = 6;
            this.updatesType = 6;
          }
        }
      }
      if (project_type === 'formal') {
        if (dept === '2D') {
          if (projectMode === 1) {
            this.commentType = 2;
            this.updatesType = '1,2';
          }
          if (projectMode === 2) {
            this.commentType = 3;
            this.updatesType = 3;
          }
        }
        if (dept === '3D') {
          if (projectMode === 1) {
            this.commentType = 5;
            this.updatesType = '4,5';
          }
          if (projectMode === 2) {
            this.commentType = 6;
            this.updatesType = 6;
          }
        }
      }
      this.progressId = this.phaseData.id;
      this.getComments();
      this.getUpdates();
      this.getUpdatesList(2);
      this.getUpdatesList(3);
    },
    logKey() {
      const inputElement = this.$refs.commentInput.$refs.input;
      const cursorPos = inputElement.selectionStart;
      const textBeforeCursor = this.commentInput.substring(
        cursorPos - 1,
        cursorPos
      );
      // 判断光标前的字符是否是 @ 符号
      const lastChar = textBeforeCursor.slice(-1);
      if (lastChar === '@') {
        let { length } = this.commentInput;
        this.leftPosition = `${length * 8 * 0.7}px`;
        this.atTagPerson = true;
      } else {
        this.atTagPerson = false;
      }
    },
    handleChosenPerson(person) {
      // 获取输入框的 DOM 元素
      const inputElement = this.$refs.commentInput.$refs.input;
      if (inputElement) {
        // 获取选中的人员姓名
        const selectedPerson = person.name;
        // 获取光标位置
        const { selectionStart } = inputElement;
        const { selectionEnd } = inputElement;
        // 插入文本
        const currentValue = inputElement.value;
        const newValue = `${
          currentValue.substring(0, selectionStart) + selectedPerson
        } ${currentValue.substring(selectionEnd)}`;
        // 更新输入框的值和光标位置
        inputElement.value = newValue;
        inputElement.selectionStart = selectionStart + newValue.length;
        inputElement.selectionEnd = inputElement.selectionStart;
        inputElement.focus();
        // 触发 input 事件以更新 v-model 的值
        inputElement.dispatchEvent(new Event('input'));
      }
      this.personMentioned.push({name: person.name, id: person.id})
      this.personIds.push(person.id);
      // this.personList.push(person);
      this.atTagPerson = false;
    },
    updateContent(val) {
      if (val.status === 'US_TO_BE_SEND') {
        return 'Phase added';
      }
      if (
        val.status_last === 'US_TO_BE_SEND' &&
        val.status === 'CAL_US_HAS_BEEN_SEND'
      ) {
        return 'Calculation task starts, pending assign 3D design team ';
      } else {
        switch (val.type) {
          case 1:
          case 2:
            return `Updated quote status from ${val.progress_status_last} to ${val.progress_status}`;

          case 3:
            return `Updated label status from ${val.progress_status_last} to ${val.progress_status}`;

          case 4:
          case 5:
            return `Updated calculation status from ${val.progress_status_last} to ${val.progress_status}`;

          case 6:
            return `Updated simulation status from ${val.progress_status_last} to ${val.progress_status}`;

          default:
            return `Updated phase status from ${val.progress_status_last} to ${val.progress_status}`;
        }
      }
    },
    async getComments() {
      let params = {
        progress_id: this.progressId,
        type: this.commentType
      };
      await getComments(params).then((res) => {
        if (res.code === 200) {
          if (res.data && res.data.length) {
            res.data.forEach((item) => {
              item.creator_name = item.creation_name;
              item.isEdit = false;
              item.creator = item.user_id;
              item.init = JSON.parse(JSON.stringify(item.comment));
              if (item.files && item.files.length) {
                item.imgs = item.files.filter((item) => {
                  return item.is_image === 1;
                });
                item.filesCopy = item.files.filter((item) => {
                  return item.is_image !== 1;
                });
              }
            });
          }
          this.commentsInfo = res.data;
        }
      });
    },
    handleComemnt(val) {
      if (val.comment) {
        return `Comments:${val.comment}`;
      } else {
        return '';
      }
    },
    handleReason(val) {
      if(val.reason) {
        return `Reason: ${val.reason}`;
      } else {
        return ''
      }
    },
    async getUpdates() {
      let params = {
        progress_id: this.progressId,
        type: this.updatesType
      };
      await getUpdates(params).then((res) => {
        if (res.code === 200) {
          res.data.forEach((item) => {
            item.creator_name = item.creation_name;
            item.comment = `${this.updateContent(item)} ${this.handleComemnt(
              item
            )} ${this.handleReason(item)}`;
            item.filesCopy = item.files;
          });
          this.updatesInfo = res.data;
        }
      });
    },
    async getUpdatesList(type) {
      let params = {
        project_id: this.$route.params.project_id,
        progress_id: this.progressId,
        type,
        scope: 1
      };
      await getUpdatesList(params).then((res) => {
        if (res.code === 200) {
          res.data.forEach((item) => {
            item.comment = item.label;
            item.creator_name = item.creation_name;
          });
          if (type === 2) {
            this.phaseInfo = res.data;
          } else {
            this.configurationInfo = res.data;
            //v0.9.0, phase详情里的configuration需要获取修过的config字段进行显示，具体的值的变更在这个接口中获取，因此此处向上传值
            this.$emit('got-config', this.configurationInfo)
          }
        }
      });
    },
    getFiles(files) {
      this.commentFiles = files;
    },
    async addComment() {
      if (this.commentInput) {
        let files = [];
        if (this.commentFiles.length) {
          this.commentFiles.forEach((file) => {
            files.push(file.id);
          });
        }
        let body = {
          progress_id: this.progressId,
          comment: this.commentInput,
          files,
          refer_user: this.personIds,
          type: this.commentType
        };
        await addComment(body).then((res) => {
          if (res.code === 200) {
            this.$message.success(res.message);
            this.getComments();
            this.personIds.length = 0;
            this.commentInput = '';
            this.commentFiles.length = 0;
            this.commentsVisible = false;
            setTimeout(() => {
              this.commentsVisible = true;
            }, 500);
          }
        });
      } else {
        this.$message.warning('comment can not be empty');
      }
    },
    async editComment(val) {
      if (val.comment) {
        let body = {
          id: val.id,
          comment: val.comment,
          refer_user: this.personIds
        };
        await editComment(body).then((res) => {
          if (res.code === 200) {
            this.$message.success(res.message);
            this.getComments();
            this.personIds.length = 0;
          }
        });
      } else {
        this.$message.warning('comment can not be empty');
      }
    },
    async requestDelete() {
      if (this.deleteType === 'comment') {
        let body = {
          id: this.deleteCommentId
        };
        await deleteComment(body).then((res) => {
          if (res.code === 200) {
            this.$message.success(res.message);
            this.deleteVisible = false;
            this.getComments();
          }
        });
      } else {
        let body = {
          comment_id: this.deleteCommentId,
          file_id: this.deleteFileId
        };
        await deleteCommentFile(body).then((res) => {
          if (res.code === 200) {
            this.$message.success(res.message);
            this.deleteVisible = false;
            this.getComments();
          }
        });
      }
    },
    deleteComment(val) {
      this.deleteCommentId = val;
      this.deleteType = 'comment';
      this.confirmText =
        'The comment will be deleted, are you sure to continue?';
      this.deleteVisible = true;
    },
    deleteFile(val, _, comment_id) {
      this.deleteCommentId = comment_id;
      this.deleteFileId = val;
      this.deleteType = 'file';
      this.confirmText = 'The file will be deleted, are you sure to continue?';
      this.deleteVisible = true;
    }
  }
};
</script>

<style lang="less" scoped>
.comments-or-updates {
  /deep/ .el-upload-dragger {
    border-radius: 0 0 8px 8px;
  }
/deep/ .el-input--suffix .el-input__inner {
  border-radius: 0;
  border-color: #eee
}
}
.comments-or-updates {
  .main-title {
    font-size: 18px;
    font-weight: 550;
    color: #303133;
    margin-top: 24px;
    margin-bottom: 16px;
  }

  :deep(.el-timeline-item__wrapper),
  :deep(.el-timeline-item__node) {
    top: 30px;
  }

  :deep(.el-tabs__header) {
    margin: 0;
  }

  :deep(.el-tabs--card > .el-tabs__header) {
    border-bottom: 0;
  }

  :deep(.el-tabs__item:hover) {
    color: #007bff;
  }

  :deep(.el-tabs__item.is-active) {
    color: #007bff;
  }

  :deep(.el-tabs__content) {
    height: 348px;
    border: 1px solid #eee;
    overflow-y: auto;
    // padding-top: 8px;
    padding: 8px 15px 8px;

    &::-webkit-scrollbar {
      background-color: #ebeef5;
    }

    .no-data-area {
      height: 348px !important;
    }
  }

  :deep(.el-timeline) {
    padding-left: 8px;
  }

  .comments-submit {
    text-align: right;
    position: relative;

    :deep(.el-button) {
      margin-top: 8px;
    }

    :deep(.el-button--default) {
      color: #007bff;
      border: 1px solid #007bff;
    }
  }
}
</style>
