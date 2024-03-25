<template>
  <div class="container">
    <div class="title">
      <span>Project List</span>
    </div>
    <div class="header">
      <div class="header-input">
        <el-input
          v-model="searchParam.keywords"
          size="mini"
          suffix-icon="el-icon-search"
          placeholder="Enter project to search"
          @change="getCableList"
        />
      </div>
      <el-button
        type="primary"
        size="mini"
        icon="el-icon-plus"
        @click="handleAddNewSegment"
      >
        New
      </el-button>
    </div>
    <div class="tools-project-list-content">
      <el-table
        :data="tableData"
        stripe
        border
      >
        <el-table-column
          prop="name"
          label="Project"
          width:auto
        />
        <el-table-column
          prop="created_at"
          label="Time"
          width:auto
        />
        <el-table-column
          prop="creator"
          label="Creator"
          width:auto
        />
        <el-table-column
          label="Action"
          width="240"
        >
          <template slot-scope="scope">
            <div class="operation-container">
              <div class="operation-group">
                <img
                  src="@/assets/IconDesigns/download.png"
                  alt="download"
                >
                <el-button
                  type="text"
                  size="small"
                  @click="handleDownload(scope.row)"
                >
                  Download
                </el-button>
              </div>
              <div class="operation-group">
                <img
                  src="@/assets/IconDesigns/edit_blue.png"
                  alt="edit"
                >
                <el-button
                  type="text"
                  size="small"
                  @click="handleEdit(scope.row)"
                >
                  Edit
                </el-button>
              </div>
              <div class="operation-group">
                <img
                  src="@/assets/IconDesigns/Delete.png"
                  alt="delete"
                >
                <el-button
                  type="text"
                  size="small"
                  style="color: #f56c6c"
                  @click="handleDelete(scope.row)"
                >
                  Delete
                </el-button>
              </div>
            </div>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="pagination-container">
      <el-pagination
        :current-page="searchParam.page"
        :page-sizes="[20, 50, 100]"
        :page-size="searchParam.page_size"
        layout="total, prev, pager, next, sizes"
        :total="totalPage"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
    </div>
    <el-dialog
      :title="dialogTitle"
      :visible.sync="showNewSegmentForm"
      :modal-append-to-body="false"
      @close="handleClose"
    >
      <NewSegmentForm
        ref="newSegmentForm"
        :edited-segment-form-data="editedSegmentFormData"
        @operate-segment-success="handleAddSegment"
      />
      <span
        slot="footer"
        class="dialog-footer"
      >
        <el-button
          type="primary"
          @click="handleSubmit"
        >Submit</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import {
  cableList,
  deleteCableSegment,
  downloadCableSegment,
  cableProjectDetail
} from '@/api';
import NewSegmentForm from './NewSegmentForm.vue';
import { MessageBox } from 'element-ui';

export default {
  components: {
    NewSegmentForm
  },
  data() {
    return {
      tableData: [],
      underEditing: false,
      editedSegmentFormData: {},
      showNewSegmentForm: false,
      totalPage: undefined,
      searchParam: {
        keywords: '',
        page: 1,
        page_size: 20
      }
    };
  },
  computed: {
    dialogTitle() {
      return this.underEditing ? 'Edit' : 'New';
    }
  },
  mounted() {
    this.getCableList();
  },
  methods: {
    getCableList() {
      cableList(this.searchParam).then((res) => {
        if (res.err_code === 0) {
          if (res.data.list.length === 0 && this.searchParam.page > 1) {
            this.searchParam.page--;
            this.getCableList();
          } else {
            this.tableData = res.data.list;
            this.totalPage = res.data.total;
          }
        }
      });
    },
    handleClose() {
      this.showNewSegmentForm = false;
      this.underEditing = false;
      this.$refs.newSegmentForm.clearFormData();
    },
    handleAddNewSegment() {
      this.showNewSegmentForm = true;
      this.$nextTick(() => {
            this.$refs['newSegmentForm'].initMVColor();
          })
    },
    handleCurrentChange(val) {
      this.searchParam.page = val;
      this.getCableList();
    },
    handleSizeChange(val) {
      this.searchParam.page_size = val;
      this.searchParam.page = 1;
      this.getCableList();
    },
    //下载操作
    handleDownload(row) {
      downloadCableSegment(this, row.id, row.name);
    },
    //编辑操作
    handleEdit(row) {
      cableProjectDetail(row.id).then((res) => {
        if (res.err_code === 0) {
          this.editedSegmentFormData = res.data;
          this.underEditing = true;
          this.showNewSegmentForm = true;
          this.$nextTick(() => {
            this.$refs['newSegmentForm'].initMVColor();
          })
        }
      });
    },
    //删除操作
    handleDelete(row) {
      MessageBox.confirm(
        'Are you sure you want to delete this item?',
        'Confirm Deletion',
        {
          confirmButtonText: 'Delete',
          cancelButtonText: 'Cancel',
          type: 'warning'
        }
      )
        .then(() => {
          this.deleteItem(row);
        })
        .catch(() => { return });
    },
    //确认删除
    deleteItem(row) {
      deleteCableSegment(row.id).then((res) => {
        if (res.err_code === 0) {
          this.$message.success('Successfully deleted');
          this.getCableList();
        }
      });
    },
    //提交新线缆段表单
    handleSubmit() {
      this.$refs.newSegmentForm.debouncedSubmitForm(this.underEditing);
    },
    handleAddSegment(action) {
      this.showNewSegmentForm = false;
      this.underEditing = false;
      if(action === 'add') {
        this.$message.success('Successfully added')
      }
      else {
        this.$message.success('Successfully edited');
      }
      this.getCableList();
    }
  }
};
</script>

<style>
/* stylelint-disable-next-line selector-class-pattern */
.tools-project-list-content .el-table th.el-table__cell {
  background-color: #f5f7fa;
}

/* stylelint-disable-next-line selector-class-pattern */
.tools-project-list-content .el-table--border .el-table__cell {
  border-right: none;
}
</style>

<style lang="less" scoped>
.container {
  display: flex;
  flex-direction: column;
  margin-left: 15px;
  margin-top: -16px;

  .title {
    font-size: 24px;
    font-weight: 500;
    margin-bottom: 15px;
  }

  .tools-project-list-content {
    margin-top: 12px;

    .operation-container {
      display: flex;

      .operation-group {
        display: flex;
        align-items: center;
        justify-content: center;
        margin-right: 10px;
        
        img {
          width: 16px;
          height: 16px;
          margin-right: 5px;
        }
      }
    }
  }

  .header {
    display: flex;
    align-items: center;
    justify-content: space-between;

    .header-input {
      width: 330px;
      height: 35px;
    }
  }

  .pagination-container {
    margin-top: auto; /* Pushes it to the bottom of the container */
    display: flex;
    justify-content: flex-end; /* Aligns it to the right */
    padding: 10px; /* Optional padding for spacing */
  }
}
</style>
