<template>
  <div class="page-container">
    <Card class="card-templete">
      <template #cardHeader>
        <span class="iconfont icon-tuandui card-icon" />
        Team
      </template>
      <template #cardOperate>
        <div
          v-if="editVisible"
          class="card-btn animate"
          @click="handleAdd"
        >
          <i class="el-icon-plus" />
          New
        </div>
      </template>
      <template #cardContent>
        <div class="table-wrapper">
          <el-table
            :data="tableData"
            size="small"
            width="auto"
          >
            <el-table-column
              prop="name"
              label="Name"
            />
            <el-table-column
              prop="type"
              label="Team type"
            />
            <el-table-column
              prop="leader"
              label="Group leader"
            >
              <template slot-scope="scope">
                <div
                  v-for="(item, key) in scope.row.members"
                  :key="key"
                  class="team-member"
                >
                  <el-tag
                    v-if="scope.row.manager_id == item.id"
                    size="small"
                  >
                    {{
                      item.name
                    }}
                  </el-tag>
                </div>
              </template>
            </el-table-column>
            <el-table-column
              prop="leader"
              label="Members"
            >
              <template slot-scope="scope">
                <span
                  v-for="(item, key) in scope.row.members"
                  :key="key"
                >
                  <span
                    v-if="scope.row.manager_id != item.id"
                    style="margin-right: 15px"
                  >
                    {{ item.name }}
                  </span>
                </span>
              </template>
            </el-table-column>
            <el-table-column
              v-if="editVisible"
              fixed="right"
              label="Action"
              width="120"
            >
              <template slot-scope="scope">
                <i
                  class="el-icon-edit table-icon animate"
                  @click="handleEdit(scope.row)"
                />
                <i
                  class="el-icon-delete table-icon animate"
                  @click="handleDelete(scope.row)"
                />
              </template>
            </el-table-column>
          </el-table>
          <div class="page-gatation">
            <NormalPagination
              :total-rows="totalRows"
              :page-size="pageSize"
              :current-page="currentPage"
              @page-change="handlePageChange"
              @page-size-change="handlePageSizeChange"
            />
          </div>
        </div>
      </template>
    </Card>
  </div>
</template>

<script>
import Card from '@/components/Card.vue';
import { teamList, setManager, teamDelete } from '@/api/index.js';
import NormalPagination from '@/components/NormalPagination.vue';
export default {
  name: '',
  components: {
    Card,
    NormalPagination
  },
  data() {
    return {
      userLimits: {},
      tableData: [],
      totalRows: 0,
      activeRow: {},
      activeLeader: null,
      editVisible: false,
      pageSize: 20,
      currentPage: 1
    };
  },
  mounted() {
    this.justifyRole();
    this.getTeamList();
  },
  methods: {
    justifyRole() {
      this.userLimits = JSON.parse(localStorage.getItem('limits'));
      if (this.userLimits.Bidding_Project_List.team_edit) {
        this.editVisible = true;
      }
    },
    handlePageChange(page) {
      this.currentPage = page;
      this.getTeamList();
    },
    handlePageSizeChange(size) {
      this.pageSize = size;
    },
    async getTeamList() {
      let params = {
        page: this.currentPage,
        size: this.pageSize
      };
      this.tableData = [];
      await teamList(params)
        .then((res) => {
          if (res.code === 200) {
            let {data} = res.data;
            this.tableData = data;
            this.totalRows = res.data.total;
          }
          return;
        })
        .catch((err) => {
          return err
        });
    },
    changeLeader(row) {
      this.$confirm(
        'Are you sure this person will be the group leader?',
        'Tips',
        {
          confirmButtonText: 'Confirm',
          cancelButtonText: 'Cancel',
          type: 'warning'
        }
      )
        .then(() => {
          this.requestSetLeader(row);
        })
        .catch(() => {
          this.getTeamList();
        });
    },
    async requestSetLeader(row) {
      await setManager({
        team_id: row.id,
        manager_id: row.manager_id
      })
        .then((res) => {
          if (res.code === 200) {
            this.getTeamList();
            this.$message({
              message: 'Done',
              type: 'success'
            });
          }
          return;
        })
        .catch((err) => {
          return err
        });
    },
    handleAdd() {
      this.$router.push({
        path: '/index/team/form',
        query: {
          mode: 'add'
        }
      });
    },
    handleEdit(row) {
      this.$router.push({
        path: '/index/team/form',
        query: {
          mode: 'edit',
          id: row.id
        }
      });
    },
    handleDelete(row) {
      this.$confirm('Are you sure to delete this item?', 'Tips', {
        confirmButtonText: 'Confirm',
        cancelButtonText: 'Cancel',
        type: 'warning'
      })
        .then(() => {
          this.removeTeam(row);
        })
        .catch(() => { return });
    },
    async removeTeam(row) {
      await teamDelete(row.id)
        .then((res) => {
          if (res.code === 200) {
            this.$message({
              message: 'Done',
              type: 'success'
            });
            this.getTeamList();
          } else {
            // this.$message.error(res.message);
          }
          return;
        })
        .catch((err) => {
          return err
        });
    }
  }
};
</script>

<style lang="less" scoped>
.page-container {
  min-height: calc(100vh - 90px);
  display: flex;
  flex-direction: column;

  .card-templete {
    flex: 1;

    .table-wrapper {
      width: 100%;
    }
  }
  
  .page-gatation {
    text-align: center;
    margin-top: 20px;
  }
}
</style>
