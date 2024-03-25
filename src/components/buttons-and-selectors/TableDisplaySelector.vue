<template>
  <div class="selector-container">
    <el-select
      v-model="option"
      size="mini"
      @change="handleSelect"
    >
      <template slot="prefix">
        <img
          src="@/assets/IconDesigns/list_icon.png"
          alt="list_icon"
          style="width: 16px; height: 16px; display: flex; align-items: center"
        >
      </template>
      <el-option
        v-for="item in options"
        :key="item.value"
        :label="item.label"
        :value="item.value"
      >
        {{ item.label }}
      </el-option>
    </el-select>
  </div>
</template>

<script>
export default {
  props: {
    options: {
      type: Array,
      default: () => {
        return [
          { label: 'List', value: 'List' },
          { label: 'Gantt', value: 'Gantt' }
        ];
      }
    }
  },
  data() {
    return {
      option: 'List'
    };
  },
  methods: {
    handleSelect(val) {
      this.$emit('on-select', val);
    }
  }
};
</script>

<style>
/* stylelint-disable-next-line selector-class-pattern */
.selector-container .el-input__prefix {
  height: 100%;
  left: 5px;
  transition: all 0.3s;
  display: flex;
  align-items: center;
}

/* stylelint-disable-next-line selector-class-pattern */
.selector-container .el-input--mini .el-input__inner {
  height: 32px;
}
</style>

<style lang="less" scoped>
.selector-container {
  width: 120px;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
