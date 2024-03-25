<template>
  <div class="page-pagination">
    <span class="total-items">Total {{ totalRows }} items</span>
    <el-pagination
      background
      layout="prev, pager, next"
      :page-size="pageSize"
      :total="totalRows"
      :current-page="currentPage"
      @current-change="handlePage"
    />
    <div class="page-sizer">
      <p class="page-sizer-text">
        Page size
      </p>
      <el-select
        v-model="pageSizeNumber"
        size="mini"
        style="width: 66px"
        @change="handlePageSizeChange"
      >
        <el-option value="20">
          20
        </el-option>
        <el-option value="30">
          30
        </el-option>
        <el-option value="50">
          50
        </el-option>
        <el-option value="100">
          100
        </el-option>
      </el-select>
    </div>
  </div>
</template>

<script>
export default {
  name: 'NormalPagination',
  props: {
    totalRows: {
      type: Number,
      default: 0
    },
    pageSize: {
      type: Number,
      default: 20
    },
    currentPage: {
      type: Number,
      default: 1
    }
  },
  data() {
    return {
      pageSizeNumber: 20
    };
  },
  methods: {
    handlePage(page) {
      this.$emit('page-change', page);
    },
    handlePageSizeChange(val) {
      this.$emit('page-size-change', val);
    }
  }
};
</script>

<style scoped lang="less">
.page-pagination {
  text-align: center;
  margin-top: 25px;
  margin-right: 16px;
  margin-bottom: 15px;
  display: flex;
  align-items: center;
  justify-content: flex-end;

  .total-items {
    font-size: 13px;
    font-family: 'PingFang SC-Regular', 'PingFang SC', sans-serif;
    font-weight: 400;
    color: #909399;
    line-height: 0px;
  }

  .page-sizer {
    .page-sizer-text {
      font-size: 13px;
      font-family: 'PingFang SC-Regular', 'PingFang SC', sans-serif;
      font-weight: 400;
      color: #909399;
      line-height: 0px;
      margin-right: 3px;
    }

    display: flex;
    align-items: center;
    justify-content: center;
  }
}
</style>
