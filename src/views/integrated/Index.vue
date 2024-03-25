<template>
  <div class="page-container">
    <!--综合参数列表-->
    <Card class="card-templete">
      <template #cardHeader>
        <span class="iconfont icon-chajiancanshupeizhi card-icon" />
        Integrated Data
      </template>
      <template #cardOperate>
        <div
          class="card-btn animate"
          @click="handleAdd"
        >
          <i class="el-icon-plus" />
          New Integrated Data
        </div>
      </template>
      <template #cardContent>
        <div class="table-wrapper">
          <el-table
            :data="tableData"
            size="small"
            style="width: 100%"
          >
            <el-table-column
              prop="manufacturer"
              label="Module to module spacing"
            />
            <el-table-column
              prop="module_type"
              label="BHA gap extender"
            />
            <el-table-column
              prop="is_bifacial"
              label="Motor gap extender"
            />
            <el-table-column
              prop="model"
              label="Of modules per string"
            />
            <el-table-column
              prop="model"
              label="row to row spacing"
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
            <el-pagination
              background
              layout="prev, pager, next"
              :total="totalRows"
            />
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
      form: {
        manufacturer: '',
        module_type: '',
        model: '',
        is_bifacial: ''
      },
      tableData: [],
      totalRows: 0
    };
  },
  mounted() {
    this.getTableData();
  },
  methods: {

    /**获取列表数据 */
    async getTableData() {
      return;
    },

    /**新增 */
    handleAdd() {
      this.$router.push('/index/integrated-data/add');
    },

    /**详情 */
    handleView() {
      this.$router.push({
        path: '/index/integrated-data/detail'
      });
    },

    /**编辑 */
    handleEdit() {
      return;
    },

    /**删除 */
    handleDelete() {
      this.$confirm('Are you sure to delete this item?', 'Tips', {
        confirmButtonText: 'Confirm',
        cancelButtonText: 'Cancel',
        type: 'warning'
      })
        .then(() => {
          return;
        })
        .catch(() => {
          return;
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
