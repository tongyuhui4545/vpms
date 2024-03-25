<template>
  <div class="status-wrapper">
    <div
      v-for="item in salesOptions"
      :key="item.id"
      class="options"
      @click="testClick(item.id)"
    >
      {{ item.name }}
    </div>
  </div>
</template>

<script>
import { salesList } from '@/api/index.js';
export default {
  data() {
    return {
      salesOptions: []
    };
  },
  mounted() {
    this.getSalesList();
  },
  methods: {
    testClick(val) {
      // eslint-disable-next-line no-param-reassign
      val = this.salesOptions.find((item) => {return item.id === val});
      this.$emit('fast-filter', val, this.fastFilterType);
    },
    async getSalesList() {
      await salesList()
        .then((res) => {
          if (res.code === 200) {
            this.salesOptions = res.data;
          } else {
            // this.$message.error(res.message);
          }
          return;
        })
        .catch((err) => {
          return err
        });
    }
  }
};
</script>

<style lang="less" scoped>
.options {
  width: 120px;
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
</style>
