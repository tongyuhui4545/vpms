<template>
  <div class="comment-container">
    <div class="comment-header">
      <span class="name">{{ comment.creation_name }}</span>
      <span class="time">{{ commentTime }}</span>
    </div>
    <div class="comment-body">
      <p
        v-if="!onEdit"
        class="comment-text"
      >
        {{ comment.comment }}
      </p>
      <TagPerson
        v-if="atTagPerson"
        ref="tagPerson"
        class="tag-person"
        :style="{ left: leftPosition }"
        @person-chosen="handleChoosePerson"
      />
      <el-input
        v-if="onEdit"
        ref="editInputArea"
        v-model="editedCommentText"
        size="small"
        type="textarea"
        :row="3"
        autofocus
        placeholder="Please input"
        style="width: 700px"
        @keyup.native="handleKeyup"
      />
    </div>
    <div class="comment-opt">
      <div class="option-icon-field">
        <span v-show="!onEdit && userMatched"><img
          src="@/assets/IconDesigns/edit_blue.png"
          alt="edit_blue"
        ></span>
        <span
          v-if="!onEdit && userMatched"
          class="option-text"
          @click="handleEdit"
        >Edit</span>
        <span
          v-if="onEdit"
          class="option-text"
          @click="confirmEdit"
        >Confirm</span>
      </div>
      <div class="option-icon-field">
        <span v-show="!onEdit && userMatched">
          <img
            src="@/assets/IconDesigns/delete_blue.png"
            alt="delete_blue"
          >
        </span>
        <span
          v-if="!onEdit && userMatched"
          class="option-text"
          @click="showDeleteDialog"
        >
          Delete
        </span>
        <span
          v-if="onEdit"
          class="option-text"
          @click="handleCancel"
        >
          Cancel
        </span>
      </div>
    </div>
  </div>
</template>

<script>
import { editComment, deleteComment } from '@/api';
import TagPerson from './TagPerson.vue';
import dayjs from 'dayjs';

export default {
  components: {
    TagPerson
  },
  props: {
    comment: {
      type: Object,
      default: () => {return {}}
    }
  },
  data() {
    let userInfo = JSON.parse(localStorage.getItem('user'));
    let userId = userInfo.id;
    return {
      referredUsers: [],
      atTagPerson: false,
      onEdit: false,
      editedCommentText: '',
      commentTime: '',
      userId,
      userMatched: false,
      deleteDialogVisible: false
    };
  },
  watch: {
    comment: {
      immediate: true,
      handler(newVal) {
        this.commentTime = dayjs(newVal.created_at).format(
          'YYYY-MM-DD HH:mm:ss'
        );
        if (newVal.user_id === this.userId) {
          this.userMatched = true;
        }
      }
    }
  },
  methods: {
    handleChoosePerson(person) {
      this.editedCommentText += `${person.name}`;
      this.referredUsers.push(person.id);
      this.$refs.editInputArea.$refs.textarea.focus();
      this.atTagPerson = false;
    },
    handleKeyup(e) {
      if (e.key === '@') {
        let {length} = this.editedCommentText;
        this.leftPosition = `${length * 8 * 0.8 + 15}px`;
        this.atTagPerson = true;
      }
      if (e.key === 'Backspace') {
        this.atTagPerson = false;
      }
    },
    showDeleteDialog() {
      this.$confirm('Are you sure to delete?', 'Warning', {
        confirmButtonText: 'Confirm',
        cancelButtonText: 'Cancel',
        closeOnClickModal: false,
        type: 'warning'
      })
        .then(() => {
          this.handleDelete();
        })
        .catch(() => {
          return;
        });
    },
    handleEdit() {
      this.onEdit = true;
      this.editedCommentText = this.comment.comment;
    },
    handleDelete() {
      deleteComment({ id: this.comment.id }).then(() => {
        this.$emit('deleteComment');
      });
    },
    //确认提交评论的编辑
    confirmEdit() {
      editComment({
        id: this.comment.id,
        comment: this.editedCommentText,
        refer_user: this.referredUsers
      }).then(() => {
        this.onEdit = false;
        this.$emit('confirmEditComment');
      });
    },
    //取消编辑评论
    handleCancel() {
      this.onEdit = false;
    }
  }
};
</script>

<style scoped>
.comment-header {
  display: flex;
}

.comment-header .name,
.time {
  font-family: 'PingFang SC-Regular', sans-serif;
  font-size: 13px;
  color: #909399;
  font-weight: 400;
}

.comment-body {
  position: relative;
  width: 799px;

  .tag-person {
    position: absolute;
    top: 25;
    z-index: 3;
  }
}

.comment-body .comment-text {
  font-family: 'PingFang SC-Regular', sans-serif;
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
