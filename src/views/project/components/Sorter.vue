<template>
  <div
    class="sorter-wrapper"
    @click="toggleSorter"
  >
    <i
      class="sort-caret ascending asc-blue"
      :style="ascIconStyle"
    />
    <i
      class="sort-caret descending"
      :style="desIconStyle"
    />
  </div>
</template>

<script>
export default {
  name: 'Sorter',
  props: {
    sorterType: {
      type: String,
      default: ''
    },
    sortBy: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      status: '',
      step: 0
    };
  },
  computed: {
    ascIconStyle() {
      return {
        borderBottomColor: this.status === 'asc' ? '#409EFF' : '#C0C4CC'
      };
    },
    desIconStyle() {
      return {
        borderTopColor: this.status === 'desc' ? '#409EFF' : '#C0C4CC'
      };
    }
  },
  watch: {
    sorterType: {
      handler() { return },
      immediate: true
    }
  },
  methods: {
    toggleSorter() {
      this.step++;
      if (this.step === 3) {
        this.step = 0;
      }
      switch (this.step) {
        case 0: {
          this.status = '';
          this.$emit('on-sort', '', this.sorterType, this.sortBy);
          break;
        }
        case 1: {
          this.status = 'asc';
          this.$emit('on-sort', 'ASC', this.sorterType, this.sortBy);
          break;
        }
        case 2: {
          this.status = 'desc';
          this.$emit('on-sort', 'DESC', this.sorterType, this.sortBy);
          break;
        }
        default: 
        break;
      }
    },
    reset() {
      this.status = '';
      this.step = 0;
    }
  }
};
</script>

<style lang="less" scoped>
.sorter-wrapper {
  display: inline-flex;
  flex-direction: column;
  align-items: center;
  height: 34px;
  width: 24px;
  vertical-align: middle;
  cursor: pointer;
  overflow: initial;
  position: relative;
}
</style>
