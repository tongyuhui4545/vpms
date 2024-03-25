<template>
  <div class="project-name-fast-filter-container">
    <div class="fast-filter-wrapper">
      <el-input
        v-model="fastFilterProjectName"
        clearable
        placeholder="please input project No."
        style="margin-right: 26px; margin-left: 26px; width: 256px"
        size="small"
      />
    </div>
    <div class="confirm-btn">
      <el-button
        type="text"
        size="small"
        style="width: 50px; margin-right: 5px"
        @click="confirmFastFilter"
      >
        Confirm
      </el-button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      fastFilterProjectName: ''
    };
  },
  methods: {
    confirmFastFilter() {
      this.$emit('fast-filter', this.fastFilterProjectName);
      this.fastFilterProjectName = '';
    }
  }
};
</script>

<style lang="less" scoped>
.project-name-fast-filter-container {
  margin: 15px 8px 0;
  
  .fast-filter-wrapper {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .confirm-btn {
    display: flex;
    align-items: center;
    justify-content: flex-end;
  }
}
</style>
