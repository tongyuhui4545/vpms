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
        // this.$router.push({
        //   path: item.route,
        // });
        window.open(
          'http://pv20140610.synology.me:4030/index.html#/tools/supporting-sales/cable-segment'
        );
      } else {
        window.open('http://pv20140610.synology.me:4031/admin/auth/login');
      }
    }
  }
};
</script>

<style lang="less" scoped>
/* stylelint-disable-next-line import-notation */
@import '@/css/variables.less';

.card-container {
  padding: 0;
  padding-left: 25px;

  .page-title {
    margin-top: -10px;
    p {
      font-size: @title;
      font-family: @font-family;
      font-weight: @font-weight-bold;
      color: @color-text-primary;
    }
  }

  .link-card-container {
    display: flex;
    flex-wrap: wrap; 
    align-items: center;
    justify-content: flex-start;
    margin-left: 16px;
    gap: 55px;    
    padding-bottom: 30px;
  }

  .tool-link-card {
    margin-bottom: -40px;
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    font-size: 14px;

    img {
      width: 54px;
      height: 54px;
      cursor: pointer;

      &:hover {
        color: #1890ff;
      }
    }

    .clickable {
      cursor: pointer;

      /* Change cursor to pointer on hover */
      transition: background-color 0.3s ease;
      
      /* Add smooth transition */

      &:hover {
        color: #1890ff;
      }
    }
  }
}
</style>
