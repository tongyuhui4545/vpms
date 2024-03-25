<template>
  <div
    class="customized-menu-container"
    :class="{ 'sole-choice': options.length === 1 }"
  >
    <div
      v-for="item in options"
      :key="item.value"
      class="option"
      @click="handleClickOption(item)"
    >
      <i :class="item.iconClass" />
      <span>{{ item.label }}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: '',
  components: {},
  props: {
    options: {
      type: Array,
      default: () => {
        return [];
      }
    }
  },
  data() {
    return {};
  },
  computed: {},
  watch: {},
  methods: {
    handleClickOption(option) {
      this.$emit('option-selected', option);
    }
  }
};
</script>

<style lang="less" scoped>
.customized-menu-container {
  width: 120px;
  min-height: 50px;
  border-radius: 4px;
  box-shadow: 0px 2px 4px 1px rgba(0, 0, 0, 0.1);
  background: #ffffff;

  &:first-child {
    padding-top: 8px;
  }
  &:last-child {
    padding-bottom: 8px;
  }

  &.sole-choice {
    &:first-child {
      padding-top: 8px;
    }
    &:last-child {
      padding-bottom: 0px;
    }
  }

  .option {
    display: flex;
    height: 40px;
    align-items: center;
    justify-content: flex-start;
    gap: 1px;
    padding-left: 16px;
    cursor: pointer;

    &:hover {
      background-color: #f2f6fc;
      color: #007bff;
    }

    i {
      margin-right: 10px;
    }
  }
}
</style>
