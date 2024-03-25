<template>
  <div>
    <el-popover
      ref="popover"
      :visible="isPopoverVisible"
      width="453"
      placement="bottom"
      trigger="click"
      popper-class="wrap"
      @click.native="handleBellClick"
    >
      <span
        slot="reference"
        class="popover-trigger"
      >
        <slot name="icon">
          <img
            class="bell"
            src="@/assets/IconDesigns/bell.png"
            alt="bell"
          >
        </slot>
      </span>
      <div
        ref="popoverContent"
        class="popover-content"
        @scroll="checkScrollPosition"
      >
        <MessageHeader
          @setAllAsRead="onSetAllAsRead"
          @messageTypeChanged="onMessageTypeChanged"
        />
        <div v-if="messageList.length !== 0">
          <div
            v-for="message in messageList"
            :key="message.id"
          >
            <MessageCard
              v-if="message.type !== 7"
              :msg="message"
              @msg-clicked="handleClickMessage"
            />
            <TaskMessageCard
              v-else
              :msg="message"
              @msg-clicked="handleClickMessage"
            />
          </div>
        </div>
        <div
          v-else
          class="no-data"
        >
          <img
            src="@/assets/image/no-data.png"
            alt="no_data"
          >
        </div>
      </div>
    </el-popover>
  </div>
</template>

<script>
import MessageHeader from './MessageHeader.vue';
import MessageCard from './MessageCard.vue';
import TaskMessageCard from './task-message-card.vue';
import { notices, noticeRead, getUnreadNoticeNum } from '@/api/';

export default {
  components: {
    MessageHeader,
    MessageCard,
    TaskMessageCard
  },
  data() {
    return {
      isPopoverVisible: false,
      messageList: [],
      noticePage: 1,
      currentNoticeType: 'all'
    };
  },
  computed: {
    read() {
      if (this.currentNoticeType === 'all') {
        return '';
      } else {
        return 0;
      }
    }
  },
  mounted() {
    this.getUnreadNoticeNum();
  },
  methods: {
    checkScrollPosition() {
      const { popoverContent } = this.$refs;
      const isAtBottom =
        popoverContent.scrollHeight - popoverContent.clientHeight <=
        popoverContent.scrollTop;
      if (isAtBottom) {
        this.noticePage++;
        notices({ page: this.noticePage, read: this.read }).then((res) => {
          if (res.code === 200) {
            this.messageList = this.messageList.concat(res.data.data);
          } else {
            return;
          }
        });
      }
    },
    handleBellClick() {
      this.noticePage = 1;
      this.getNoticeList(this.currentNoticeType);
      this.getUnreadNoticeNum();
    },
    getNoticeList(type) {
      if (type === 'all') {
        notices({ page: this.noticePage, read: '' }).then((res) => {
          if (res.code === 200) {
            this.messageList = res.data.data;
          } else {
            return;
          }
        });
      }
      if (type === 'unread') {
        notices({ page: this.noticePage, read: 0 }).then((res) => {
          if (res.code === 200) {
            this.messageList = res.data.data;
          } else {
            return;
          }
        });
      }
    },
    handleClickMessage(message) {
      noticeRead({ id: message.id })
        .then((res) => {
          if (res.code === 200) {
            this.$refs.popover.doClose();
            //刷新未读数的角标
            setTimeout(() => {
              this.getUnreadNoticeNum();
            }, 500);
          } else {
            this.$message({
              message: 'Failed to mark message as read',
              type: 'error'
            });
          }
        })
        .finally(() => {
          //刷新未读数的角标
          this.getUnreadNoticeNum();
        });
    },
    onSetAllAsRead() {
      noticeRead().then((res) => {
        if (res.code === 200) {
          this.$refs.popover.doClose();
          this.$emit('setAllAsRead');
        } else {
          this.$message({
            message: 'Failed to mark message as read',
            type: 'error'
          });
        }
      });
    },
    onMessageTypeChanged(type) {
      this.currentNoticeType = type;
      this.noticePage = 1;
      this.getNoticeList(type);
    },
    getUnreadNoticeNum() {
      getUnreadNoticeNum().then((res) => {
        if (res.code === 200) {
          if (res.data.unread && res.data.unread > 0) {
            this.$emit('has-unread', res.data.unread);
          }
        } else {
          return;
        }
      });
    }
  }
};
</script>

<style>
.wrap {
  top: 4% !important;
}

.no-data {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 400px;
}

.no-data img {
  width: 120px;
  height: 120px;
}

.bell {
  margin-top: 4px;
  width: 20px;
  height: 20px;
}

.message-item {
  padding: 8px;
  cursor: pointer;
}

/* stylelint-disable-next-line selector-class-pattern */
.wrap .popper__arrow {
  display: none !important;
}

.popover-content {
  height: 846px;
  overflow-y: auto;
}
</style>
