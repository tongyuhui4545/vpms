<template>
  <div
    v-if="showUp"
    class="fast-filter-icon-wrapper"
  >
    <el-tooltip placement="top">
      <div
        slot="content"
        style="white-space: normal; overflow: hidden; text-overflow: ellipsis"
      >
        <p>{{ fastFilterContent }}</p>
      </div>
      <img
        class="filtered-icon"
        src="@/assets/IconDesigns/fast-filter-filtered.png"
        alt="filtered-icon"
      >
    </el-tooltip>
    <img
      src="@/assets/IconDesigns/cancel-fast-filter.png"
      class="fast-filter-cancel-icon"
      @click.stop="handleClickCancel"
    >
  </div>
</template>

<script>
export default {
  name: 'FastFilteredIcon',
  data() {
    return {
      showUp: false,
      fastFilterContent: ''
    };
  },
  methods: {
    show() {
      this.showUp = true;
    },
    hide() {
      this.showUp = false;
    },
    handleClickCancel() {
      this.$emit('cancel');
    },
    applyContent(val) {
      this.fastFilterContent = val;
    }
  }
};
</script>

<style lang="less" scoped>
.fast-filter-icon-wrapper {
  display: flex;
  justify-content: center;
  align-items: center;

  .filtered-icon {
    width: 16px;
    height: 16px;
  }

  .fast-filter-cancel-icon {
    position: absolute;
    width: 8px;
    height: 8px;
    cursor: pointer;
    transform: translateX(7px) translateY(-8px);
  }
}
</style>
