<template>
  <div class="project-name-fast-filter-container">
    <div class="fast-filter-wrapper">
      <el-input
        v-if="filterFor !== 'version'"
        v-model="content"
        clearable
        :placeholder="placeholder"
        style="margin-right: 26px; margin-left: 26px; width: 256px"
        size="small"
      />
      <el-input
        v-else
        v-model.number="content"
        clearable
        :placeholder="placeholder"
        style="margin-right: 26px; margin-left: 26px; width: 256px"
        size="small"
      >
        <template slot="prepend">
          V
        </template>
      </el-input>
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
  props: {
    placeholder: {
      type: String,
      default: 'please input'
    },
    filterFor: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      content: ''
    };
  },
  methods: {
    confirmFastFilter() {
      if (this.filterFor === 'version') {
        let reg = /^[0-9]*$/;
        if (!reg.test(this.content)) {
          this.$message.warning('enter version is valid');
        } else {
          this.$emit('fast-filter', this.content);
          this.content = '';
        }
      } else {
        this.$emit('fast-filter', this.content);
        this.content = '';
      }
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
