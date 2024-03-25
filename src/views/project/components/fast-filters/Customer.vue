<template>
  <div class="status-wrapper">
    <div
      v-for="item in customerOptions"
      :key="item.id"
      class="options"
      @click="testClick(item.id)"
    >
      {{ item.name }}
    </div>
  </div>
</template>

<script>
import { customerAll } from '@/api/index.js';
export default {
  data() {
    return {
      customerOptions: []
    };
  },
  mounted() {
    this.getCustomers();
  },
  methods: {
    testClick(val) {
      // eslint-disable-next-line no-param-reassign
      val = this.customerOptions.find((item) => {
        return item.id === val;
      });
      this.$emit('fast-filter', val);
    },
    getCustomers() {
      customerAll()
        .then((res) => {
          if (res.code === 200) {
            this.customerOptions = res.data;
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
  max-height: 280px;
  overflow-y: auto;

  .options {
    width: 250px;
    white-space: nowrap;
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    padding-left: 24px;
    color: #606266;

    &:hover {
      cursor: pointer;
      background: #f2f6fc;
      color: #007bff;
    }
  }
}
</style>
