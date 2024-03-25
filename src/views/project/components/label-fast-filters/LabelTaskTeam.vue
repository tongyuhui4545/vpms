<template>
  <div class="status-wrapper">
    <div
      v-for="item in teamOptions"
      :key="item.id"
      class="options"
      @click="testClick(item.id)"
    >
      {{ item.name }}
    </div>
  </div>
</template>

<script>
import { teamList } from '@/api/index.js';
export default {
  data() {
    return {
      teamOptions: []
    };
  },
  mounted() {
    this.getTeamData();
  },
  methods: {
    testClick(val) {
      // eslint-disable-next-line no-param-reassign
      val = this.teamOptions.find((item) => {return item.id === val});
      this.$emit('fast-filter', val, this.fastFilterType);
    },
    getTeamData() {
      teamList()
        .then((res) => {
          if (res.code === 200) {
            this.teamOptions = res.data.data;
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
  width: 100px;
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
