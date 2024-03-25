<template>
  <div class="page-container">
    <Card class="card-templete">
      <template #cardHeader>
        <span class="iconfont icon-tuandui-1 card-icon" />
        Team
      </template>
      <template #cardOperate>
        <div
          class="card-btn animate"
          @click="viewMore"
        >
          View more
        </div>
      </template>
      <template #cardContent>
        <div class="team-container">
          <div
            v-for="(item, key) in tableData"
            :key="key"
            class="team-item"
          >
            <div class="team-img">
              <img
                src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"
                alt=""
              >
            </div>
            <div class="team-name">
              {{ item.name }}
            </div>
          </div>
        </div>
      </template>
    </Card>
  </div>
</template>

<script>
import Card from '@/components/Card.vue';
import { teamList } from '@/api/index.js';
export default {
  name: '',
  components: {
    Card
  },
  data() {
    return {
      tableData: []
    };
  },
  mounted() {
    this.getTeamList();
  },
  methods: {
    async getTeamList() {
      await teamList()
        .then((res) => {
          if (res.code === 200) {
            this.tableData = res.data.data;
          }
          return;
        })
        .catch((err) => {
          return err;
        });
    },
    viewMore() {
      this.$router.push('/index/team/list');
    }
  }
};
</script>

<style lang="less" scoped>
.page-container {
  height: 100%;

  .card-templete {
    height: 100%;
  }

  .team-container {
    display: flex;
    align-items: center;
    flex-wrap: wrap;

    .team-item {
      width: 50%;
      margin-bottom: 15px;
      display: flex;
      align-items: center;
    }

    .team-img {
      width: 40px;
      margin-right: 10px;

      img {
        width: 40px;
        height: 40px;
        border-radius: 50%;
      }
    }

    .team-name {
      font-size: 14px;
    }
  }
}
</style>
