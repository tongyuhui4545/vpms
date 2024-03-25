<template>
  <div class="page-container">
    <!--customer列表-->
    <Card class="card-templete">
      <template #cardHeader>
        <span class="customer-title">Customer</span>
      </template>
      <template #cardOperate>
        <div class="table-search">
          <TogglableSearchBar
            :placeholder="'Enter customer to search'"
            @on-search="handleSearch"
          />
          <div
            v-if="createVisible"
            class="vertical-divider"
          />
          <div
            v-if="createVisible"
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
              prop="client_no"
              label="Customer ID"
              width="150"
            >
              <template slot-scope="scope">
                <span
                  class="project-name"
                  @click="handleView(scope.row)"
                >{{
                  scope.row.client_no
                }}</span>
              </template>
            </el-table-column>
            <el-table-column
              prop="name"
              label="Name"
            >
              <template slot-scope="scope">
                <span
                  class="project-name"
                  @click="handleView(scope.row)"
                >{{
                  scope.row.name
                }}</span>
              </template>
            </el-table-column>
            <el-table-column
              prop="tel"
              label="Tel"
            />
            <el-table-column
              prop="address"
              label="Address"
            />
            <el-table-column
              fixed="right"
              label="Action"
              width="180"
            >
              <template slot-scope="scope">
                <i
                  class="el-icon-view table-icon animate"
                  @click="handleView(scope.row)"
                />
                <i
                  v-if="editVisible"
                  class="el-icon-edit table-icon animate"
                  @click="handleEdit(scope.row)"
                />
                <i
                  v-if="editVisible"
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
import NormalPagination from '@/components/NormalPagination.vue';
import TogglableSearchBar from '@/components/common/TogglableSearchBar.vue';
import { customerList, deleteCustomer } from '@/api/index.js';
export default {
  name: '',
  components: {
    Card,
    TogglableSearchBar,
    NormalPagination
  },
  beforeRouteLeave(to, from, next) {
    if(to.name === 'customerDetail') {
      from.meta.keepAlive = false; 
      next()
    }
    else {
      from.meta.keepAlive = true;
      next()
    }
  },
  beforeRouteEnter(to, from, next) {
    next((vm) => {
      if(from.name === 'customerForm') {
        vm.getTableData()
      }
    })
  },
  data() {
    return {
      searchVal: '',
      teamOptions: [],
      tableData: [],
      totalRows: 10,
      currentPage: 1,
      pageSize: 20,
      editVisible: false,
      createVisible: false
    };
  },
  mounted() {
    this.justifyRole();
    this.getTableData();
  },
  activated() {
    if (this.$route.meta.isEdit) {
      this.tableData = [];
      this.getTableData();
    }
    this.$route.meta.isEdit = false;
  },
  methods: {
    justifyRole() {
      let limits = JSON.parse(localStorage.getItem('limits'));
      if(limits['edit_delete_auth'] && limits['edit_delete_auth']['edit_delete_customer']) {
        this.editVisible = true;
        this.createVisible = true;
      }
    },
    async getTableData() {
      await customerList({
        page: this.currentPage,
        search: this.searchVal,
        limit: this.pageSize
      })
        .then((res) => {
          if (res.code === 200) {
            this.tableData = res.data.data;
            this.totalRows = res.data.total;
            // this.pageSize = res.data.per_page;
          } else {
            // this.$message.error(res.message);
          }
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
      this.currentPage = num;
      this.getTableData();
    },
    handlePageSizeChange(size) {
      this.pageSize = Number(size);
      this.currentPage = 1;
      this.getTableData();
    },

    /**新增 */
    handleAdd() {
      this.$router.push({
        path: '/index/customer/form',
        query: {
          mode: 'add'
        }
      });
    },

    /**详情 */
    handleView(row) {
      this.$router.push({
        path: '/index/customer/detail',
        query: {
          clientId: row.id
        }
      });
    },

    /**编辑 */
    handleEdit(row) {
      this.$router.push({
        path: '/index/customer/form',
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
          this.removeClient(row);
        })
        .catch(() => {
          return;
        });
    },
    async removeClient(row) {
      await deleteCustomer(row.id)
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
.customer-title {
  font-size: 18px;
  font-weight: 500;
  color: #303133;
  line-height: 20px;
}
.page-container {
  min-height: calc(100vh - 90px);
  display: flex;
  flex-direction: column;

  .card-templete {
    flex: 1;

    .table-wrapper {
      width: 100%;
      position: relative;
    }

    .table-wrapper ::-webkit-scrollbar {
      width: 5px;
      height: 5px;
    }
  }

  .table-search {
    display: flex;
    align-items: center;

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

    .vertical-divider {
      width: 0;
      height: 16px;
      border: 1px solid #eee;
      margin-left: 8px;
      margin-right: 12px;
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

  .project-name:hover {
    cursor: pointer;
    color: #007bff;
  }
}
</style>
