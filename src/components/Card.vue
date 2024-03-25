<template>
  <!--card复用组件-->
  <div
    ref="cardContainer"
    class="card-container"
  >
    <div class="filter-area">
      <slot name="filterArea" />
    </div>
    <div class="card-header">
      <div class="card-title-wrapper">
        <!-- <div class="title-line"></div> -->
        <div class="card-title">
          <slot name="cardHeader" />
        </div>
      </div>
      <div class="card-operate">
        <slot name="cardOperate" />
      </div>
    </div>
    <div class="card-content">
      <slot name="cardContent" />
    </div>
  </div>
</template>

<script>
export default {
  name: '',
  components: {},
  data() {
    return {
      containerHeight: '1080px'
    };
  },
  methods: {}
};
</script>

<style lang="less" scoped>
.card-container {
  min-height: calc(100vh - 90px);
  background: #fff;
  border-radius: 8px;
  border: 1px solid #f0f0f3;
  padding: 30px 30px 30px 0;

  .filter-area {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .card-header {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;

    .card-title-wrapper {
      position: relative;

      .title-line {
        width: 6px;
        height: 24px;
        background: rgb(0 123 255);
        border-radius: 3px;
        position: absolute;
        left: -2px;
      }

      .card-title {
        margin-left: 30px;
        font-size: 18px;
        font-family: 'PingFang SC-Medium', 'PingFang SC', sans-serif;
        font-weight: 500;
        color: rgb(0 123 255);
      }
    }
  }

  .card-content {
    margin: 20px 0 0 30px;
  }
}
</style>
