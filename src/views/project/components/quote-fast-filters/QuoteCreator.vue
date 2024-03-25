<template>
  <div class="status-wrapper">
    <div
      v-for="item in creatorList"
      :key="item.id"
      class="options"
      @click="testClick(item.id)"
    >
      {{ item.name }}
    </div>
  </div>
</template>

<script>
import { userList } from '@/api/index.js';
export default {
  data() {
    return {
      creatorList: []
    };
  },
  mounted() {
    this.getWholeUserList();
  },
  methods: {
    testClick(val) {
      // eslint-disable-next-line no-param-reassign
      val = this.creatorList.find((item) => {
        return item.id === val;
      });
      this.$emit('fast-filter', val, this.fastFilterType);
    },
    getWholeUserList() {
      userList()
        .then((res) => {
          if (res.code === 200) {
            let pageNum = res.data.total / res.data.per_page;
            this.totalUserPage = Math.ceil(pageNum);
            // for (let i = 0; i < this.totalUserPage; i++) {
            //   this.getUserList(i + 1);
            // }
            this.creatorList = res.data.data
          }
        })
        .catch((err) => {
          return err;
        });
    },
    getUserList(pageNum) {
      userList({ page: pageNum })
        .then((res) => {
          if (res.code === 200) {
            this.creatorList = this.creatorList.concat(res.data.data);
          }
          return;
        })
        .catch((err) => {
          return err;
        });
    }
  }
};
</script>

<style lang="less" scoped>
.status-wrapper {
  max-height: 300px;
  overflow-y: scroll;
  .options {
    width: 200px;
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    padding-left: 24px;
    word-wrap: normal;
    color: #606266;

    &:hover {
      cursor: pointer;
      background: #f2f6fc;
      color: #007bff;
    }
  }
}
</style>
