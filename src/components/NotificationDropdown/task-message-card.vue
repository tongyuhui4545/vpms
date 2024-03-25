<template>
  <div class="message-card">
    <div
      class="message-content"
      :class="{ 'message-content-read': msg.read == '1' }"
    >
      <div
        v-if="msg.read == '0'"
        class="dot-line"
      >
        <span class="dot" />
      </div>
      <p class="message">
        {{ msg.message }}
      </p>
      <p>Task creator: {{ msg.creation_name }}</p>
      <p>Assign to: {{ msg.recipient }}</p>
      <p>Priority: {{ msg.priority }}</p>
      <p>Task due date: {{ msg.task_due_date }}</p>
      <p>Estimated start date: {{ msg.estimated_start_date }}</p>
      <p>Comment: {{ msg.comment }}</p>
      <p>Project Name: {{ msg.project_name }}</p>
      <p>Project No.: {{ msg.project_no }}</p>
      <p>Phase: {{ msg.progress }}</p>
      <p>
        Quick link:
        <span
          class="link-text"
          @click.stop="handleOpen"
        >
          Click to details
        </span>
      </p>
    </div>
    <div class="time-info">
      {{ msgTime }}
    </div>
  </div>
</template>

<script>
import dayjs from 'dayjs';

export default {
  props: {
    msg: {
      type: Object,
      default: () => {
        return { content: '', unread: true };
      }
    }
  },
  data() {
    return {
      msgTime: undefined,
      detailPath: ''
    };
  },
  watch: {
    msg: {
      handler(newVal) {
        let msgTime = dayjs(newVal.created_at).format('YYYY-MM-DD HH:mm:ss');
        this.msgTime = msgTime;
      },
      immediate: true
    }
  },
  methods: {
    handleOpen() {
      this.$emit('msg-clicked', this.msg);
      this.$router.push({
        path: '/index/work-item',
        query: {
          id: this.msg.custom_task_id
        }
      });
    }
  }
};
</script>

<style scoped>
.message-card {
  font-family: 'PingFang SC-Regular', 'PingFang SC', sans-serif;
  padding: 0;
  margin-bottom: 16px;
  width: 410;
  border-radius: 4px;
  border-top: #eee 1px solid;
}

.message-content {
  font-size: 13px;
  width: 400px;
  margin: 32px 16px 9px;
  border-radius: 4px;

  .link-text {
    color: #409eff;
    cursor: pointer;
    text-decoration: underline;

    &:hover {
      color: #66b1ff;
    }
  }
}

.message-content-read {
  font-weight: 400;
  color: #909399;
}

.time-info {
  font-size: 13px;
  margin: 32px 16px 0;
  font-family: 'PingFang SC-Regular', 'PingFang SC', sans-serif;
  font-weight: 400;
  color: #909399;
}

.dot-line {
  display: flex;
  flex-direction: row-reverse;
}

.dot-line .dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background-color: #f56c6c;
  margin-top: -8px;
  position: relative;
}

.message {
  font-weight: 550 !important;
  font-size: 14px !important;
}
</style>
