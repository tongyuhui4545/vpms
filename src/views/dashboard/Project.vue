<template>
  <div class="page-container">
    <Card class="card-templete">
      <template #cardHeader>
        <span>
          <span class="iconfont icon-xiangmu card-icon" />
          Project
        </span>
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
        <el-table
          v-loading="tableLoading"
          :data="tableData"
          size="mini"
          stripe
          style="width: 100%"
        >
          <el-table-column
            prop="project_no"
            label="Project No."
          >
            <template slot-scope="scope">
              <div
                class="project-name"
                @click="viewDetail(scope.row)"
              >
                {{ scope.row.project_no }}
              </div>
            </template>
          </el-table-column>
          <el-table-column
            prop="description"
            label="Project name"
          >
            <template slot-scope="scope">
              <div
                class="project-name"
                @click="viewDetail(scope.row)"
              >
                {{ scope.row.description }}
              </div>
            </template>
          </el-table-column>
          <el-table-column
            prop="sales_status"
            label="Project status"
          />
          <el-table-column
            prop="sales_id"
            label="Sales"
          >
            <template slot-scope="scope">
              <div
                v-for="(item, key) in userOptions"
                :key="key"
              >
                <div v-if="item.id == scope.row.sales_id">
                  {{ item.name }}
                </div>
              </div>
            </template>
          </el-table-column>
          <el-table-column
            prop="created_at"
            label="Creation time"
          >
            <template slot-scope="scope">
              {{ transFormat(scope.row.created_at) }}
            </template>
          </el-table-column>
        </el-table>
      </template>
    </Card>
  </div>
</template>

<script>
import Card from '@/components/Card.vue';
import { projectsList, userList } from '@/api/index.js';
export default {
  name: '',
  components: {
    Card
  },
  data() {
    return {
      tableLoading: false,
      // salesOptions: [],
      userOptions: [],
      tableData: []
    };
  },
  mounted() {
    // this.getSalesList();
    this.getUserList();
    this.getTableData();
  },
  methods: {

    /**获取项目列表数据 */
    async getTableData() {
      this.tableLoading = true;
      await projectsList({
        type: 1,
        page: 1
      })
        .then((res) => {
          if (res.code === 200) {
            let {data} = res.data;
            this.tableData = data;
            this.tableLoading = false;
          }
          return;
        })
        .catch((err) => {
          return err
        });
    },
    // async getSalesList(){
    //     await salesList().then(res => {
    //         if(res.code==200){
    //             this.salesOptions = [];
    //             this.salesOptions = res.data;
    //         }else{
    //             this.$message.error(res.message);
    //         }
    //         return;
    //     }).catch(err => {
    //         console.log(err);
    //     });
    // },
    getUserList() {
      userList()
        .then((res) => {
          if (res.code === 200) {
            this.userOptions = res.data.data;
          }
          return;
        })
        .catch((err) => {
          return err
        });
    },

    /**查看更多 */
    viewMore() {
      this.$router.push('/index/project/list');
    },
    transFormat(time) {
      // let date = new Date(time);
      // let year = date.getFullYear();
      // let month = date.getMonth()+1;
      // let day = date.getDate();
      // let hour = date.getHours();
      // let minute = date.getMinutes();
      // let second = date.getSeconds();
      // if(month < 10){
      //     month = `0${month}`;
      // }
      // if(day < 10){
      //     day = `0${day}`;
      // }
      // if(hour < 10){
      //     hour = `0${hour}`;
      // }
      // if(minute < 10){
      //     minute = `0${minute}`;
      // }
      // if(second < 10){
      //     second = `0${second}`;
      // }
      // return `${year}-${month}-${day} ${hour}:${minute}:${second}`;
      return time;
    },
    viewDetail(row) {
      this.$router.push({
        path: '/index/project/detail',
        query: {
          projectId: row.id
        }
      });
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

  .project-name:hover {
    cursor: pointer;
    color: #007bff;
  }
}
</style>
