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
      <p>{{ msg.message }}</p>
      <p>{{ msg.message_cn }}</p>
      <p>Task creator: {{ msg.creation_name }}</p>
      <p>Project name: {{ msg.project_name }}</p>
      <p>Project No.: {{ msg.project_no }}</p>
      <p v-if="msg.progress_no">
        Phase No.: {{ msg.progress_no }}
      </p>
      <p v-if="msg.progress_status">
        Quote status: {{ msg.progress_status }}
      </p>
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
      // msgTime: undefined,
      // detailPath: '',
      projectId: this.msg && this.msg.project_id ? this.msg.project_id : '',
      phaseNo: this.msg && this.msg.progress_no ? this.msg.progress_no : ''
    };
  },
  // watch: {
  //   msg: {
  //     handler(newVal) { 
  //       let msgTime = dayjs(newVal.created_at).format('YYYY-MM-DD HH:mm:ss');
  //       this.msgTime = msgTime;
  //       if (this.msg.type) {
  //         this.detailPath =
  //           this.msg.type === 1
  //             ? `/index/project/bidding/detail/overview/${this.projectId}?phaseNo=${this.phaseNo}`
  //             : `/index/project/formal/detail/overview/${this.projectId}`;
  //       } else { 
  //         this.detailPath = `/index/project/bidding/detail/overview/${this.projectId}?phaseNo=${this.phaseNo}`;
  //       }
  //     }
  //   }
  // },
  computed: {
    detailPath() {
      if(this.msg.project_type === null) {return }
      if(this.msg.project_type === 'bidding') {
        return `/index/project/bidding/detail/overview/${this.projectId}?phaseNo=${this.phaseNo}`;
      }
      if(this.msg.project_type === 'formal') {
        return `/index/project/formal/detail/overview/${this.projectId}?phaseNo=${this.phaseNo}`;
      }
      return '';
    },
    msgTime() {
      return dayjs(this.msg.created_at).format('YYYY-MM-DD HH:mm:ss');
    }
  },
  methods: {
    handleOpen() {
      this.$emit('msg-clicked', this.msg);
      this.$router.push(this.detailPath);
      // this.window.location.refresh();
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
</style>
