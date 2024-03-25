<template>
  <div
    class="person-option-container"
    @click="handleChoosePerson"
  >
    <div class="person-avatar">
      <p>{{ computedAbbr }}</p>
    </div>
    <div class="person-name">
      {{ person.name }}
    </div>
  </div>
</template>

<script>
export default {
  props: {
    person: {
      type: Object,
      default: () => { return {} }
    }
  },
  data() {
    return {};
  },
  computed: {
    computedAbbr() {
      let nameArr = this.person.name.split(' ');
      return `${nameArr[0][0]} `;
      // + nameArr[1][0];
    }
  },
  methods: {
    handleChoosePerson() {
      this.$emit('person-chosen', this.person);
    }
  }
};
</script>

<style lang="less" scoped>
.person-option-container {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: 8px;
  margin-bottom: 8px;
  margin-left: 12px;
  cursor: pointer;

  &:hover {
    background: #f2f6fc;
    border-radius: 0;
  }

  .person-avatar {
    width: 28px;
    height: 28px;
    background-color: #67d6ca;

    /* 或其他颜色 */
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;

    /* 如果需要内部圆形 */
    p {
      font-size: 12px;
      font-family: 'PingFang SC-Regular', 'PingFang SC', sans-serif;
      font-weight: 400;
      color: #fff;
      line-height: 20px;
    }
  }

  .person-name {
    font-size: 13px;
    font-family: 'PingFang SC-Regular', 'PingFang SC', sans-serif;
    font-weight: 400;
    color: #606266;
    line-height: 20px;
  }
}
</style>
