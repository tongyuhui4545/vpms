<template>
  <div class="dc-size-container">
    <div class="input-wrapper">
      <el-input-number
        v-model="size[0]"
        size="small"
        placeholder="Min"
        :min="0"
        style="width: 150px"
      />
      <span style="margin: 0 2px">-</span>
      <el-input-number
        v-model="size[1]"
        size="small"
        placeholder="Max"
        :min="0"
        style="width: 150px"
      />
    </div>
    <div class="confirm-btn">
      <el-button
        type="text"
        size="small"
        style="width: 50px; margin-right: 5px"
        @click="handleFastFilter"
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
      size: [0, 0]
    };
  },
  methods: {
    handleFastFilter() {
      this.$emit('fast-filter', this.size);
    }
  }
};
</script>

<style lang="less" scoped>
.dc-size-container {
  margin: 15px 10px 0;

  .input-wrapper {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  el-input-number {
    width: 100px;
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
