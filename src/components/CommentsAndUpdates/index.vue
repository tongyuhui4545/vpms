<template>
  <div class="comments-and-updates">
    <div class="title">
      Comments & Updates
    </div>
    <div
      class="overlap-border-left"
      :style="{ height: computedOverlapDivHeight }"
    />
    <div
      class="overlap-border-right"
      :style="{ height: computedOverlapDivHeight }"
    />
    <el-tabs
      v-model="selectedTab"
      type="card"
      :style="{ height: tabHeight }"
    >
      <el-tab-pane
        :label="commentsLabel"
        name="comments"
      >
        <el-timeline v-if="comments.length !== 0">
          <div class="content-area">
            <el-timeline-item
              v-for="(comment, index) in comments"
              :key="index"
              color="#007BFF"
              style="margin-left: 2px"
            >
              <CommentCard
                v-if="comments.length !== 0"
                :comment="comment"
                @confirmEditComment="onConfirmEditComment"
                @deleteComment="onDeleteComment"
              />
            </el-timeline-item>
          </div>
        </el-timeline>
        <div
          v-else
          class="no-content"
          :style="{
            height: computedNoContentHeight,
            borderBottom:
              selectedTab === 'updates' ? '1px solid #eeeeee' : 'none'
          }"
        >
          <img
            src="@/assets/image/no-data.png"
            alt="no-data"
          >
        </div>
      </el-tab-pane>
      <el-tab-pane
        :label="updatesLabel"
        name="updates"
      >
        <el-timeline
          v-if="updates.length !== 0"
          style="border-bottom: 1px solid #eee"
        >
          <div class="content-area">
            <el-timeline-item
              v-for="(update, index) in updates"
              :key="index"
              color="#007BFF"
              style="margin-left: 2px"
            >
              <UpdateCard :update="update" />
            </el-timeline-item>
          </div>
        </el-timeline>
        <div
          v-else
          class="no-content"
          :style="{
            height: computedNoContentHeight,
            borderBottom:
              selectedTab === 'updates' ? '1px solid #eeeeee' : 'none'
          }"
        >
          <img
            src="@/assets/image/no-data.png"
            alt="no-data"
          >
        </div>
      </el-tab-pane>
    </el-tabs>
    <div
      v-if="selectedTab === 'comments'"
      class="input-area"
    >
      <div
        v-if="selectedTab === 'comments'"
        class="input-container"
      >
        <input
          ref="commentInput"
          v-model="commentInput"
          placeholder="Click to add a phase comment....."
          @keyup="logKey"
        >
        <TagPerson
          v-if="atTagPerson"
          ref="tagPerson"
          :style="{ position: 'absolute', top: '-270px', left: leftPosition }"
          @person-chosen="handleChoosePerson"
        />
      </div>
      <div
        v-if="selectedTab === 'comments'"
        class="submit-btn"
      >
        <el-button
          size="small"
          type="primary"
          plain
          @click="handleCommentSubmit"
        >
          Submit
        </el-button>
      </div>
    </div>
  </div>
</template>

<script>
import CommentCard from './CommentCard.vue';
import TagPerson from './TagPerson.vue';
import UpdateCard from './UpdateCard.vue';
import { getComments, addComment, getUpdates } from '@/api';

export default {
  components: {
    CommentCard,
    UpdateCard,
    TagPerson
  },
  props: {
    progressId: {
      type: Number,
      default: undefined
    },
    queryType: {
      type: Number,
      default: 1
    }
  },
  data() {
    let userInfo = JSON.parse(localStorage.getItem('user'));
    let userId = userInfo.id;
    return {
      personIds: [],
      leftPosition: '27px',
      commentInput: '',
      atTagPerson: false,
      selectedTab: 'comments',
      tabHeight: '388px',
      expandText: 'Expand',
      expandStatus: false,
      userId,
      comments: [],
      updates: []
    };
  },
  computed: {
    computedOverlapDivHeight() {
      // Calculate and return the height of overlap-div
      // based on the height of el-tabs minus 40 pixels
      return `calc(${this.tabHeight} - 40px)`;
    },
    computedNoContentHeight() {
      return `calc(${this.computedOverlapDivHeight} - 15px)`;
    },
    commentsLabel() {
      return `Comments (${this.comments.length})`;
    },
    updatesLabel() {
      return `Updates (${this.updates.length})`;
    }
  },
  watch: {
    progressId: {
      handler(newVal) {
        this.getComments(newVal);
        this.getUpdates(newVal);
      }
    }
  },
  mounted() {
    this.getComments(this.progressId);
    this.getUpdates(this.progressId);
  },
  methods: {
    handleChoosePerson(person) {
      // 获取输入框的 DOM 元素
      const inputElement = this.$refs.commentInput;

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
        inputElement.selectionStart = selectionStart + selectedPerson.length;
        inputElement.selectionEnd = inputElement.selectionStart;
        inputElement.focus();

        // 触发 input 事件以更新 v-model 的值
        inputElement.dispatchEvent(new Event('input'));
      }
      this.personIds.push(person.id);
      this.atTagPerson = false;
    },
    logKey(e) {
      if (e.key === '@') {
        let { length } = this.commentInput;
        this.leftPosition = `${length * 8 * 0.7}px`;
        this.atTagPerson = true;
      }
      if (e.key === 'Backspace') {
        this.atTagPerson = false;
      }
    },
    handleCommentSubmit() {
      // 获取输入框的内容
      const comment = this.commentInput;
      if (comment === '') {
        this.$message.warning('Please enter a comment');
        return;
      }
      // 将输入框的内容添加到评论列表中
      this.addComment(this.progressId, comment);
      this.commentInput = '';
    },
    //获取评论列表
    getComments(id, updateType) {
      let typeData = updateType ? updateType : this.queryType;
      if (id) {
        getComments({ progress_id: id, type: typeData }).then((res) => {
          this.comments = res.data;
          this.atTagPerson = false;
        });
      }
    },
    //获取更新列表
    getUpdates(id, updateType) {
      let typeData = updateType ? updateType : this.queryType;
      if (id) {
        getUpdates({
          progress_id: id,
          type: typeData
        }).then((res) => {
          this.updates = res.data;
        });
      }
    },
    //添加评论
    addComment(id, comment) {
      addComment({
        progress_id: id,
        comment,
        user_id: this.userId,
        refer_user: this.personIds,
        type: this.queryType
      }).then((res) => {
        if (res.code === 200) {
          this.getComments(id);
        }
      });
    },
    //编辑评论
    onConfirmEditComment() {
      this.getComments(this.progressId);
    },
    //删除评论
    onDeleteComment() {
      this.getComments(this.progressId);
    }
  }
};
</script>

<style lang="less" scoped>
.comments-and-updates {
  margin-left: 30px;
  margin-top: 10px;
  width: 114rem;

  /* height: 450px; */
  position: relative;
}

/* stylelint-disable-next-line selector-class-pattern */
::v-deep .el-button--primary.is-plain {
  color: #409eff;
  background: #fff;
  border-color: #b3d8ff;
  border: 1px solid;
}

.content-area {
  height: 320px;

  /* Set the desired height for the content area */
  overflow-y: auto;

  /* Enable vertical scrolling when content exceeds the height */
}

.no-content {
  display: flex;
  justify-content: center;
  align-items: center;
}

.no-content img {
  width: 120px;
  height: 120px;
}

.title {
  font-size: 16px;
  font-family: 'PingFang SC-Regular', sans-serif;
  font-weight: 400;
  color: #007bff;
  margin-bottom: 19px;
}

.overlap-border-left,
.overlap-border-right {
  z-index: 1;
  width: 0;
  border-top: 1px solid #eee;
  border-left: 1px solid #eee;
  position: absolute;
  top: 80px;
}

.overlap-border-right {
  left: 114rem;
}

.input-area {
  position: relative;
  z-index: 2;
  display: flex;
  height: 64px;
  width: 113.953rem;
  border: 1px solid #eee;
  // border-top: none;
  border-radius: 0 0 5px 5px;
}

.input-area input {
  width: 500px;
  margin-left: 15px;
  margin-top: 23px;
  border: none;
}

.input-container input {
  width: 1500px;
  margin-left: 15px;
  border: none;
  outline: none;
}

.input-container input:focus {
  outline: none;

  /* 移除聚焦时的外部边框 */
  border-color: transparent;

  /* 设置聚焦时的边框颜色为透明，即不显示边框 */
}

.input-container input::placeholder {
  width: 196px;
  height: 18px;
  font-size: 13px;
  font-family: 'PingFang SC-Regular', 'PingFang SC', sans-serif;
  font-weight: 400;
  color: #909399;

  /* 设置placeholder的样式 */
}

.submit-btn {
  margin-left: auto;

  /* Push the button to the end of the flex container */
  margin-right: 24px;
  margin-top: 18px;
}

/* stylelint-disable-next-line selector-class-pattern */
::v-deep .el-tabs--card > .el-tabs__header .el-tabs__item.is-active {
  border-bottom-color: #eee;
}

::v-deep .el-timeline-item {
  position: relative;
  padding-bottom: 5px;
}
</style>
