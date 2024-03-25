<template>
  <div class="page-container">
    <Card class="card-templete">
      <template #cardHeader>
        <span class="iconfont icon-dongtai card-icon" />
        Latest update
      </template>
      <template #cardOperate>
        <div class="card-btn animate">
          View more
        </div>
      </template>
      <template #cardContent>
        <div class="dynamic-container">
          <div
            v-for="(item, key) in dynamicList"
            :key="key"
            class="dynamic-item animate"
          >
            <div class="dynamic-content">
              <div class="dynamic-icon">
                <img
                  :src="item.img"
                  alt=""
                >
              </div>
              <div class="dynamic-label">
                {{ item.auther }}
                更新了
                <span class="dynamic-name">{{ item.content }}</span>
              </div>
            </div>
            <div class="dynamic-date">
              2018-08-23 14:47:00
            </div>
          </div>
        </div>
      </template>
    </Card>
  </div>
</template>

<script>
import Card from '@/components/Card.vue';
export default {
  name: '',
  components: {
    Card
  },
  data() {
    return {
      dynamicList: [
        {
          img: 'https://gw.alipayobjects.com/zos/rmsportal/BiazfanxmamNRoxxVxka.png',
          date: '2018-08-23 14:47:00',
          auther: '@name',
          content: '项目计划一'
        },
        {
          img: 'https://gw.alipayobjects.com/zos/rmsportal/BiazfanxmamNRoxxVxka.png',
          date: '2018-08-22 10:12:00',
          auther: '蓝莓酱',
          content: '项目计划二'
        },
        {
          img: 'https://gw.alipayobjects.com/zos/rmsportal/BiazfanxmamNRoxxVxka.png',
          date: '2018-08-23 14:47:00',
          auther: '@name',
          content: '项目计划一'
        },
        {
          img: 'https://gw.alipayobjects.com/zos/rmsportal/BiazfanxmamNRoxxVxka.png',
          date: '2018-08-22 10:12:00',
          auther: '蓝莓酱',
          content: '项目计划二'
        },
        {
          img: 'https://gw.alipayobjects.com/zos/rmsportal/BiazfanxmamNRoxxVxka.png',
          date: '2018-08-23 14:47:00',
          auther: '@name',
          content: '项目计划一'
        }
      ]
    };
  },
  methods: {}
};
</script>

<style lang="less" scoped>
.page-container {
  height: 100%;

  .card-templete {
    height: 100%;
  }

  .dynamic-container {
    .dynamic-item {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 8px;
      border-bottom: 1px solid #e8e8e8;
      font-size: 12px;

      .dynamic-content {
        flex: 1;
        display: flex;
        align-items: center;

        .dynamic-icon {
          width: 24px;

          img {
            width: 24px;
            height: 24px;
            border-radius: 50%;
          }
        }

        .dynamic-label {
          flex: 1;
          color: rgba(0 0 0 0.65);
          line-height: 22px;
          margin-left: 10px;

          .dynamic-name {
            color: rgb(0 123 255);
            cursor: pointer;
          }
        }
      }

      .dynamic-date {
        color: rgba(0 0 0 0.45);
        font-size: 12px;
        line-height: 22px;
      }
    }

    .dynamic-item:hover {
      background: rgb(245 247 250);
    }
  }
}
</style>
