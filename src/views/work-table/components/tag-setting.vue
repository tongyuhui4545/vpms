<template>
  <div class="tab-setting">
    <TogglableSearchBar
      style="margin-bottom: 3px; float: right"
      placeholder="Enter tag or creator to search"
      @on-search="handleSearch"
    />
    <div>
      <el-button
        v-if="!isAdd"
        type="primary"
        plain
        class="new-btn"
        @click="changeTagStatus"
      >
        + New tag
      </el-button>
      <div
        v-if="isAdd"
        class="input-area"
      >
        <el-input
          v-model="tagName"
          placeholder="Please enter"
        />
        <div>
          <el-button
            type="text"
            class="cancel-btn"
            @click="changeTagStatus"
          >
            Cancel
          </el-button>
          <el-button
            type="text"
            @click="addCustomTaskTag"
          >
            Submit
          </el-button>
        </div>
      </div>
    </div>

    <div class="content-right-table">
      <el-table
        :data="tagList"
        border
      >
        <template
          v-if="tagList.length == 0"
          slot="append"
        >
          <div class="no-data-area">
            <img
              src="@/assets/image/no-data.png"
              alt="no_data"
            >
          </div>
        </template>
        <el-table-column
          label="Tag name"
          :show-overflow-tooltip="true"
        >
          <template slot-scope="scope">
            <el-input
              v-if="scope.row.isEdit"
              v-model="scope.row.tag_name"
              class="edit-name_btn"
            />
            <div v-else>
              {{ scope.row.tag_name }}
            </div>
          </template>
        </el-table-column>
        <el-table-column
          label="Creator"
          prop="creator_name"
          :show-overflow-tooltip="true"
        />
        <el-table-column
          label="Creation date"
          prop="created_at"
          :show-overflow-tooltip="true"
        />
        <el-table-column label="Action">
          <template
            v-if="scope.row.creator === loginUser"
            slot-scope="scope"
          >
            <div v-if="!scope.row.isEdit">
              <i
                class="el-icon-edit"
                style="cursor: pointer"
                @click="handleEdit(scope.row)"
              />
              <i
                class="el-icon-delete"
                style="margin-left: 8px; cursor: pointer"
                @click="showConfirmDialog(scope.row.id)"
              />
            </div>
            <div v-else>
              <el-button
                type="text"
                class="cancel-btn"
                @click="handleCancel(scope.row)"
              >
                Cancel
              </el-button>
              <el-button
                type="text"
                @click="editCustomTaskTag(scope.row)"
              >
                Submit
              </el-button>
            </div>
          </template>
        </el-table-column>
      </el-table>

      <div
        class="page-gatation"
        style="padding-bottom: 15px"
      >
        <NormalPagination
          :total-rows="pageInfo.total"
          :current-page="pageInfo.currentPage"
          :page-size="pageInfo.pageSize"
          @page-change="handlePage"
          @page-size-change="handlePageSizeChange"
        />
      </div>

      <el-dialog
        v-if="confirmVisible"
        title="Confirm"
        :visible.sync="confirmVisible"
        width="560px"
        :close-on-click-modal="false"
        append-to-body
        class="cancel-content"
        :destroy-on-close="true"
      >
        <div slot="title">
          <i
            class="el-icon-warning"
            style="color: #e6a23c; margin-right: 8px"
          />
          <span class="cancel-title">Confirm</span>
        </div>
        <span class="cancel-text">The tag will be deleted, are you sure to continue?</span>
        <span
          slot="footer"
          class="dialog-footer"
        >
          <el-button @click="confirmVisible = false">Cancel</el-button>
          <el-button
            type="primary"
            @click="deleteCustomTaskTag"
          >Submit
          </el-button></span>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import TogglableSearchBar from '@/components/common/TogglableSearchBar.vue';
import NormalPagination from '@/components/NormalPagination.vue';
import {
  addCustomTaskTag,
  getCustomTaskTagList,
  editCustomTaskTag,
  deleteCustomTaskTag
} from '@/api/index';

export default {
  components: {
    TogglableSearchBar,
    NormalPagination
  },
  data() {
    return {
      tagList: [],
      pageInfo: {
        pageSize: 5,
        currentPage: 1,
        total: 0
      },
      isAdd: false,
      tagName: '',
      searchVal: '',
      initTagName: '',
      deletedId: 0,
      confirmVisible: false
    };
  },
  computed: {
    loginUser() {
      return JSON.parse(localStorage.getItem('user')).id;
    }
  },
  mounted() {
    this.getCustomTaskTagList();
  },
  methods: {
    handleSearch(searchVal) {
      this.pageInfo.currentPage = 1;
      this.searchVal = searchVal;
      this.getCustomTaskTagList();
    },
    handlePage(val) {
      this.isAdd = false;
      this.tagName = '';
      this.pageInfo.currentPage = val;
      this.getCustomTaskTagList();
      // this.$emit('page-change', this.pageInfo);
    },
    handlePageSizeChange(size) {
      this.isAdd = false;
      this.tagName = '';
      this.pageInfo.pageSize = Number(size);
      this.pageInfo.currentPage = 1;
      this.getCustomTaskTagList();
      // this.$emit('page-change', this.pageInfo);
    },
    handleEdit(row) {
      row.isEdit = true;
      this.initTagName = JSON.parse(JSON.stringify(row.tag_name));
    },
    handleCancel(row) {
      row.isEdit = false;
      row.tag_name = this.initTagName;
    },
    async addCustomTaskTag() {
      if (this.tagName) {
        await addCustomTaskTag({
          tag_name: this.tagName
        }).then((res) => {
          if (res.code === 200) {
            this.$message.success(res.message);
            this.pageInfo.currentPage = 1;
            this.getCustomTaskTagList();
            this.isAdd = false;
          }
        });
      } else {
        this.$message.warning('tag name is not empty');
      }
    },
    showConfirmDialog(id) {
      this.deletedId = id;
      this.confirmVisible = true;
    },
    async deleteCustomTaskTag() {
      await deleteCustomTaskTag({
        id: this.deletedId
      }).then((res) => {
        if (res.code === 200) {
          this.$message.success(res.message);
          this.confirmVisible = false;
          this.getCustomTaskTagList();
        }
      });
    },
    async editCustomTaskTag(row) {
      if (row.tag_name) {
        await editCustomTaskTag({
          tag_name: row.tag_name,
          id: row.id
        }).then((res) => {
          if (res.code === 200) {
            this.$message.success(res.message);
            this.pageInfo.currentPage = 1;
            this.getCustomTaskTagList();
          }
        });
      } else {
        this.$message.warning('tag name is not empty');
      }
    },
    async getCustomTaskTagList() {
      let body = {
        search: this.searchVal,
        page: this.pageInfo.currentPage,
        limit: this.pageInfo.pageSize
      };
      await getCustomTaskTagList(body).then((res) => {
        if (res.code === 200) {
          if (res.data.tagList.length > 0) {
            res.data.tagList.forEach((tag) => {
              tag.isEdit = false;
            });
          }
          this.tagList = res.data.tagList;
          this.pageInfo.total = res.data.total;
        }
      });
    },
    changeTagStatus() {
      this.isAdd = !this.isAdd;
      this.tagName = '';
    }
  }
  //   watch: {
  //   tableData: {
  //     handler(val) {
  //       this.handledTableData = val;
  //     },
  //     immediate: true
  //   }
  // }
};
</script>

<style lang="less" scoped>
.tab-setting {
  .new-btn {
    width: 100%;
    color: #007bff;
    font-weight: 400;
    font-size: 14px;
    border: 1px solid #eee;
    margin-block: 8px;
    background-color: #f5f7fa;
    height: 40px;
  }

  .input-area {
    border: 1px solid #eee;
    margin-block: 8px;
    background-color: #f5f7fa;
    display: flex;
    height: 40px;
    align-items: center;
    width: 100%;

    :deep(.el-input) {
      padding-left: 88px;
    }

    div {
      display: flex;
      padding-right: 100px;
    }

    :deep(.el-input__inner) {
      width: 320px;
      height: 24px;
    }
  }

  .cancel-btn {
    font-weight: 400;
    color: #909399;
    font-size: 13px;
  }

  :deep(thead .el-table__cell) {
    height: 40px;
    font-size: 14px;
    font-weight: 400;
    color: #303133;
  }

  :deep(.el-table__row .el-table__cell) {
    height: 40px;
    font-size: 14px;
    font-weight: 400;
    color: #606266;
  }

  :deep(.el-table__body tr:hover > td) {
    background-color: #fafafa !important;
  }

  .no-data-area {
    height: 264px;
    display: flex;
    align-items: center;
    justify-content: center;

    img {
      width: 120px;
      height: 120px;
    }
  }

  .edit-name_btn {
    :deep(.el-input__inner) {
      height: 24px;
      width: 140px;
    }
  }
}

.cancel-title {
  color: #303133;
}

.cancel-text {
  font-size: 14px;
  font-weight: 400;
  color: #606266;
  display: inline-block;
}

.cancel-content {
  :deep(.el-button--primary) {
    background-color: #007bff;
    border: 1px solid #007bff;
    font-size: 16px;
  }

  :deep(.el-button--default) {
    font-size: 16px;
    font-weight: 400;
    color: #303133;
  }

  :deep(.el-dialog__footer) {
    padding-bottom: 40px;
  }
}
</style>
