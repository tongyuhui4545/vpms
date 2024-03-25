<template>
  <div class="filter">
    <span slot="reference">
      <el-badge
        v-if="filterNum !== 0"
        :value="filterNum"
        type="primary"
      >
        <img
          class="filter-icon"
          src="@/assets/IconDesigns/filter.png"
          alt="filter"
        >
      </el-badge>
      <img
        v-else
        class="filter-icon"
        src="@/assets/IconDesigns/filter.png"
        alt="filter"
      >
    </span>
  </div>
</template>

<script>
export default {
  name: 'TableFilterV2',
  data() {
    return {
      filterNum: 0
    };
  }
};
</script>

<style lang="less" scoped>
.filter-icon {
  cursor: pointer;
  width: 18px;
  height: 18px;
}

.dc-range {
  display: flex;
  justify-content: space-between;
  align-items: center;

  span {
    margin: 0 10px;
    flex-shrink: 0;
  }
}

.custom-divider {
  height: 2px;
}

.form-buttons {
  display: flex;
  justify-content: flex-end;
}

.icon-shaixuanguolv {
  cursor: pointer;
}

/* stylelint-disable-next-line selector-class-pattern */
::v-deep .el-badge__content.is-fixed {
  position: absolute;
  top: -4px;
  right: 8px;
  transform: translateY(-50%) translateX(100%);
}
</style>
