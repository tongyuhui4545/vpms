<template>
  <div class="page-container">
    <!--表格数据-->
    <Card class="card-templete">
      <template #cardHeader>
        <span class="iconfont icon-renyuanguanli card-icon" />
        User
      </template>
      <template #cardOperate>
        <div class="table-search">
          <TogglableSearchBar
            :placeholder="'Enter user to search'"
            @on-search="handleSearch"
          />
          <div class="vertical-divider" />
          <div
            v-if="editVisible"
            class="add-customer-btn"
            @click="handleAdd"
          >
            <i class="el-icon-plus" />
            New
          </div>
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
              prop="user_no"
              label="User ID"
            />
            <el-table-column
              prop="name"
              label="Name"
            />
            <el-table-column
              prop="email"
              label="Email"
            />
            <el-table-column
              prop="role"
              label="Role"
            />
            <el-table-column
              prop="ding_id"
              label="Ding no."
            />
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
import TogglableSearchBar from '@/components/common/TogglableSearchBar.vue';
import NormalPagination from '@/components/NormalPagination.vue';
import { userList, userDelete } from '@/api/index.js';
export default {
  name: '',
  components: {
    Card,
    TogglableSearchBar,
    NormalPagination
  },
  data() {
    return {
      searchVal: '',
      form: {
        name: '',
        phone: '',
        team: ''
      },
      editVisible: false,
      teamOptions: [],
      tableData: [],
      currentPage: 1,
      pageSize: 20,
      totalRows: 0
    };
  },
  mounted() {
    this.justifyRole();
    // this.getTableData();
    this.checkQuery();
  },
  methods: {
    handlePageSizeChange(size) {
      this.currentPage = 1;
      this.pageSize = Number(size);
      this.getTableData();
    },
    checkQuery() {
      let { query } = this.$route;
      if (query.page) {
        this.currentPage = Number(query.page);
        this.getTableData();
        return;
      }
      this.getTableData();
    },
    justifyRole() {
      let limits = JSON.parse(localStorage.getItem('limits'));
      if (limits.Nav_List.add_new_user) {
        this.editVisible = true;
      }
    },
    async getTableData() {
      this.tableLoading = true;
      this.tableData = [];
      await userList({
        page: this.currentPage,
        limit: this.pageSize,
        search: this.searchVal
      })
        .then((res) => {
          if (res.code === 200) {
            let { data } = res.data;
            this.tableData = data;
            this.totalRows = res.data.total;
            // this.pageSize = res.data.per_page;
          }
          this.tableLoading = false;
          return;
        })
        .catch((err) => {
          return err;
        });
    },
    handleSearch(searchVal) {
      this.currentPage = 1;
      this.searchVal = searchVal;
      this.getTableData();
    },
    handlePageChange(num) {
      this.currentPage = Number(num);
      const query = { page: num };
      this.$router.push({ query }).catch((err) => {
        this.$message.error(err.message);
      });
      this.getTableData();
    },

    /**新增 */
    handleAdd() {
      this.$router.push({
        path: '/index/users/form',
        query: {
          mode: 'add'
        }
      });
    },

    /**编辑 */
    handleEdit(row) {
      this.$router.push({
        path: '/index/users/form',
        query: {
          mode: 'edit',
          id: row.id
        }
      });
    },

    /**删除 */
    handleDelete(row) {
      this.$confirm('Are you sure to delete this item?', 'Tips', {
        confirmButtonText: 'Confirm',
        cancelButtonText: 'Cancel',
        type: 'warning'
      })
        .then(() => {
          this.removeUser(row);
        })
        .catch(() => {
          return;
        });
    },
    async removeUser(row) {
      await userDelete(row.id)
        .then((res) => {
          if (res.code === 200) {
            this.$message({
              message: 'Done',
              type: 'success'
            });
            this.getTableData();
          } else {
            // this.$message.error(res.message);
          }
          return;
        })
        .catch((err) => {
          return err;
        });
    }
  }
};
</script>

<style lang="less" scoped>
.page-container {
  display: flex;
  flex-direction: column;
  min-height: calc(100vh - 90px);
  padding-bottom: 15px;

  .card-templete {
    flex: 1;

    .table-wrapper {
      width: 100%;
    }
  }

  .table-search {
    display: flex;
    align-items: center;

    .vertical-divider {
      width: 0;
      height: 16px;
      border: 1px solid #eee;
      margin-left: 8px;
      margin-right: 12px;
    }

    .add-customer-btn {
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 3px;
      color: #fff;
      width: 80px;
      height: 32px;
      background: #007bff;
      border-radius: 4px;
      opacity: 1;
    }

    .input {
      cursor: pointer;
    }

    .new-btn {
      width: 60px;
      text-align: right;
    }
  }

  .page-gatation {
    text-align: center;
    margin-top: 20px;
  }
}

/* stylelint-disable-next-line selector-class-pattern */
:deep(.el-dialog__header) {
  background: rgb(244 244 244);
}

.dialog-form-container {
  width: 90%;

  .series-item-wrapper {
    display: flex;
    justify-content: space-between;

    .series-item {
      flex: 1;
      display: flex;
      margin-right: 10px;
      border: solid #dcdfe6 1px;
      border-bottom: 0;

      .series-item-label {
        width: 80px;
        background: #fafafa;
        font-size: 12px;
        font-weight: 600;
        padding-left: 10px;
        border-bottom: solid #dcdfe6 1px;
      }

      .series-item-content {
        flex: 1;
        padding-left: 10px;
        font-size: 12px;
        border-bottom: solid #dcdfe6 1px;
      }
    }
  }
}
</style>
