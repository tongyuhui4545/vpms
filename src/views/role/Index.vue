<template>
  <div class="page-container">
    <Card class="card-templete">
      <template #cardHeader>
        <span class="iconfont icon-jiaose card-icon" />
        Role
      </template>
      <template #cardOperate>
        <div
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
        </div>
      </template>
    </Card>
  </div>
</template>

<script>
import Card from '@/components/Card.vue';
import { roleList, roleDelete } from '@/api/index.js';
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
    this.getRoleList();
  },
  methods: {
    async getRoleList() {
      await roleList({
        type: 0
      })
        .then((res) => {
          if (res.code === 200) {
            this.tableData = res.data;
          }
          return;
        })
        .catch((err) => {
          return err
        });
    },
    handleAdd() {
      this.$router.push({
        path: '/index/role/form',
        query: {
          mode: 'add'
        }
      });
    },
    handleEdit(row) {
      this.$router.push({
        path: '/index/role/form',
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
          this.removeRole(row);
        })
        .catch(() => { return });
    },
    async removeRole(row) {
      await roleDelete({
        id: row.id
      })
        .then((res) => {
          if (res.code === 200) {
            this.$message({
              message: 'Done',
              type: 'success'
            });
            this.getRoleList();
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
