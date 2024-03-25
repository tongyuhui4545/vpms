<template>
  <div>
    <el-timeline v-if="activities.length">
      <el-timeline-item
        v-for="(activity, index) in activities"
        :key="`updates-${index}`"
        type="primary"
      >
        <div class="comments-date">
          {{ activity.date }}
        </div>
        <div class="comments-msg">
          <div class="short-name">
            {{ activity.initials }}
          </div>
          <div>
            {{ activity.creator_name }}
          </div>
          <div style="color: #909399">
            {{ activity.time }}
          </div>
          <div
            v-if="activity.auto_approve"
            class="auto-approval"
          >
            Approve automatically
          </div>
        </div>
        <div
          v-if="!activity.isEdit"
          class="comments-desc"
          style="padding-bottom: 8px"
        >
          {{ activity.comment }}
        </div>
        <div
          v-else
          class="comments-desc"
          style="display: flex; position: relative"
        >
          <el-input
            ref="comment"
            v-model="activity.comment"
            style="width: 80%"
          />
          <div style="margin-left: 10px">
            <el-button
              type="text"
              style="color: #c0c4cc"
              @click="cancelEdit(activity)"
            >
              Cancel
            </el-button>
            <el-button
              type="text"
              @click="editComment(activity)"
            >
              Submit
            </el-button>
          </div>
        </div>
        <div
          v-if="type === 'comments'"
          class="comments-desc color-blue"
        >
          <file-view
            img-class-name="comments-img"
            img-item-class-name="comments-desc-img"
            file-class-name="comments-file"
            file-item-class-name="comments-file-item"
            :imgs="activity.imgs"
            :files="activity.filesCopy"
            type="has-delete"
            @delete-file="(id) => deleteFile(id, 'comment', activity.id)"
          />
          <div v-if="activity.creator === loginUser">
            <span @click="activity.isEdit = true">
              <i class="el-icon-edit" />
              Edit</span>
            <span @click="deleteComment(activity)"><i class="el-icon-delete" /> Delete</span>
          </div>
        </div>
        <!-- 0.8版本暂时还是依照0.7版本来弄，优化放在0.9版本上 -->
        <div
          v-if="type === 'others-updates'"
          class="comments-desc color-blue"
        >
          <div
            v-for="(file, key) in activity.filesCopy"
            :key="`files-${file.id}-${key}`"
            style="font-size: 14px; font-weight: 400; color: #606266"
          >
            <div
              style="
                display: flex;
                align-items: center;
                justify-content: space-between;
                padding-bottom: 5px;
              "
            >
              <div>
                <i
                  class="el-icon-document"
                  style="margin-right: 6px"
                />
                {{ file.name }}
              </div>
              <div>
                <i
                  class="el-icon-download table-icon animate"
                  @click="downloadFile(file.url, file.name)"
                />
              </div>
            </div>
          </div>
        </div>
        <!-- <div
        v-if="type === 'updates' && activity.comment"
        class="comments-desc"
        style="padding-bottom: 8px"
      >
        comment: {{ activity.comment }}
      </div> -->
      </el-timeline-item>
    </el-timeline>

    <div
      v-else
      class="no-data-area"
    >
      <img
        src="@/assets/image/no-data.png"
        alt="no_data"
      >
    </div>
  </div>
</template>

<script>
import FileView from '@/components/file-view.vue';
import { directDownload } from '@/utils/commons';

export default {
  components: {
    FileView
  },
  props: {
    type: {
      type: String,
      default: ''
    },
    info: {
      type: Array,
      default: () => {
        return [];
      }
    }
  },
  emits: ['edit-comment', 'delete-comment', 'detele-file'],
  data() {
    return {
      activities: [],
      files: [],
      imgs: [],
      atTagPerson: false,
      personIds: []
    };
  },
  computed: {
    loginUser() {
      return JSON.parse(localStorage.getItem('user')).id;
    }
  },
  watch: {
    info: {
      handler(val) {
        this.activities = val;
      },
      immediate: true,
      deep: true
    }
  },
  methods: {
    cancelEdit(activity) {
      activity.isEdit = false;
      activity.comment = activity.init;
    },
    editComment(val) {
      this.$emit('edit-comment', val, this.personIds);
    },
    deleteComment(val) {
      this.$emit('delete-comment', val.id, 'delete-comment');
    },
    deleteFile(id, type, comment_id) {
      this.$emit('detele-file', id, type, comment_id);
    },
    downloadFile(url, name) {
      directDownload(url, name);
    }
  }
};
</script>

<style lang="less" scoped>
.comments-date {
  position: absolute;
  left: -10px;
  top: -30px;
  background: #f4f5f9;
  border-radius: 2px;
  height: 24px;
  padding: 0 10px;
  display: flex;
  align-items: center;
  font-size: 14px;
  font-weight: 400;
  color: #909399;
}

.comments-msg {
  display: flex;
  align-items: center;

  div {
    height: 32px;
    line-height: 32px;
    margin-left: 16px;
    font-size: 14px;
    font-weight: 400;
  }

  .auto-approval {
    background: #ffffff;
    border-radius: 12px;
    border: 1px solid #67c23a;
    color: #67c23a;
    width: 160px;
    line-height: 24px;
    text-align: center;
    font-size: 14px;
    font-family: PingFang SC, PingFang SC;
    font-weight: 400;
    height: 24px;
  }

  .short-name {
    width: 32px;
    height: 32px;
    border-radius: 50%;
    background-color: #67d6ca;
    color: #fff;
    display: flex;
    align-items: center;
    justify-content: center;
  }
}

.comments-desc {
  font-size: 14px;
  font-weight: 400;
  color: #606266;
  margin: 8px 0 8px 65px;
  word-wrap: break-word;
}

.color-blue {
  color: #007bff;

  span {
    display: inline-block;
    margin: 0 14px 10px 0;
    cursor: pointer;
  }
}

:deep(.el-timeline-item__node--primary) {
  background-color: #007bff;
}

.no-data-area {
  height: 264px;
  display: flex;
  align-items: center;
  justify-content: center;

  img {
    width: 120px;
    height: 120px;
  }
}
</style>
