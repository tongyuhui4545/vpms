<template>
  <div class="card-container">
    <div class="page-title">
      <p>Aided tools</p>
    </div>
    <div class="link-card-container">
      <div
        v-for="item in toolsList"
        :key="item.title"
        class="tool-link-card"
      >
        <img
          :src="item.picUrl"
          @click="handleClickTool(item)"
        >
        <p
          class="clickable"
          @click="handleClickTool(item)"
        >
          {{ item.title }}
        </p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: '',
  data() {
    return {
      toolsList: [
        {
          picUrl: require('@/assets/IconDesigns/Sales.png'),
          title: 'Supporting Sales',
          route: '/tools/supporting-sales'
        },
        {
          picUrl: require('@/assets/IconDesigns/Production.png'),
          title: 'Supporting Production',
          route: '/tools/supporting-production'
        },
        {
          picUrl: require('@/assets/IconDesigns/Operation.png'),
          title: 'Supporting Operation',
          route: '/tools/supporting-operation'
        },
        {
          picUrl: require('@/assets/IconDesigns/Designing.png'),
          title: 'Supporting Designing',
          route: '/tools/supporting-designing'
        },
        {
          picUrl: require('@/assets/IconDesigns/Purchasing.png'),
          title: 'Supporting Purchasing',
          route: '/tools/supporting-purchasing'
        }
      ]
    };
  },
  methods: {
    handleClickTool(item) {
      if (item.title === 'Supporting Sales') {
        this.$router.push({
          path: item.route
        });
      } else {
        window.location.href = 'http://192.168.5.6/';
      }
    }
  }
};
</script>

<style lang="less" scoped>
.card-container {
  height: 100vh;
  background: #fff;
  border-radius: 8px;
  border: 1px solid #f0f0f3;
  padding: 30px;

  .page-title {
    font-size: 18px;
    font-family: 'PingFang SC-Medium', 'PingFang SC', sans-serif;
    font-weight: 500;
    color: #303133;
    margin-top: -32px;
  }

  .link-card-container {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: space-between;
    margin-right: 5px;
  }

  .tool-link-card {
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    padding: 0 80px;
    margin: 10px;

    img {
      width: 160px;
      height: 160px;
      cursor: pointer;

      &:hover {
        color: #1890ff;
      }
    }

    .clickable {
      cursor: pointer; /* Change cursor to pointer on hover */
      transition: background-color 0.3s ease; /* Add smooth transition */

      &:hover {
        color: #1890ff;
      }
    }
  }
}
</style>
