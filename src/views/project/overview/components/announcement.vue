<template>
  <div class="announcement-wrapper">
    <div class="header-wrapper">
      <div class="title">
        Announcement
      </div>
      <div
        class="operate animate"
        @click="handleAdd"
      >
        Add
      </div>
    </div>
    <div
      ref="announcement"
      class="announcement-content"
    >
      <div
        v-if="tableData.length === 0"
        class="no-data-wrapper"
      >
        <img
          src="@/assets/image/no-data.png"
          alt=""
          class="no-data-img"
        >
        <div class="label">
          No data
        </div>
      </div>
      <div
        v-else
        class="content"
      >
        <div
          v-for="(item, key) in tableData"
          :key="key"
          class="announcement-row"
        >
          <div class="announcement-header">
            <div class="title-wrapper">
              <div class="important">
                <img
                  v-if="item.important == 1"
                  src="@/assets/image/annouce.png"
                  alt=""
                >
              </div>
              <div class="title">
                {{ item.theme }}
              </div>
            </div>
            <div class="announcement-info">
              <div
                v-if="item.creator == user_id"
                class="operate"
              >
                <i
                  class="el-icon-edit edit-icon animate"
                  @click="handleEdit(item)"
                />
                <i
                  class="el-icon-delete delete-icon animate"
                  @click="handleDelete(item)"
                />
              </div>
              <div class="creator">
                {{ item.creator_name }}
              </div>
              <div class="date">
                {{ item.created_at }}
              </div>
            </div>
          </div>
          <div class="announcement-textarea">
            <el-tooltip
              class="item"
              effect="dark"
              placement="top-start"
            >
              <div slot="content">
                <div style="max-width:500px;">
                  {{ item.content }}
                </div>
              </div>
              <span>
                {{ item.content }}
              </span>
            </el-tooltip>
          </div>
        </div>
      </div>
    </div>
    <!--新增/编辑-->
    <POPDialog
      :dialog="{
        title: 'Add announcement',
        type: 'dialog',
        visible: formVisible,
        width: '560px'
      }"
      @dialogClosed="
        (val) => {
          formVisible = val;
        }
      "
    >
      <template #dialog-content>
        <div class="form-container">
          <el-form
            ref="form"
            :inline="true"
            :model="form"
            class="demo-form-inline"
          >
            <el-form-item label="Important">
              <el-switch
                v-model="form.important"
                active-color="#007BFF"
              />
            </el-form-item>
            <el-form-item label="Theme">
              <el-input
                v-model="form.theme"
                placeholder="Please enter theme"
                size="small"
                maxlength="15"
                show-word-limit
                style="width: 306px"
              />
            </el-form-item>
            <el-form-item label="">
              <el-input
                v-model="form.content"
                type="textarea"
                placeholder="Please enter the content"
                maxlength="300"
                show-word-limit
                style="width: 508px"
                :rows="4"
              />
            </el-form-item>
          </el-form>
        </div>
      </template>
      <template #dialog-btn>
        <el-button
          size="small"
          @click="formVisible = false"
        >
          Cancel
        </el-button>
        <el-button
          v-if="formMode == 'add'"
          type="primary"
          size="small"
          @click="requestAdd"
        >
          Confirm
        </el-button>
        <el-button
          v-else
          type="primary"
          size="small"
          @click="requestEdit"
        >
          Confirm
        </el-button>
      </template>
    </POPDialog>

    <!--删除-->
    <POPDialog
      :dialog="{
        title: 'Tips',
        type: 'message',
        visible: deleteVisible,
        width: '560px'
      }"
      @dialogClosed="
        (val) => {
          deleteVisible = val;
        }
      "
    >
      <template #dialog-content>
        Are you sure to delete?
      </template>
      <template #dialog-btn>
        <el-button
          size="small"
          @click="deleteVisible = false"
        >
          Cancel
        </el-button>
        <el-button
          type="primary"
          size="small"
          @click="requestDelete"
        >
          Confirm
        </el-button>
      </template>
    </POPDialog>
  </div>
</template>

<script>
import POPDialog from '@/components/pop-dialog.vue';
import {
  announcementList,
  announcementAdd,
  announcementEdit,
  announcementDelete
} from '@/api/index.js';
export default {
  name: '',
  components: {
    POPDialog
  },
  data() {
    return {
      project_id: null,
      tableData: [],
      formMode: 'add',
      formVisible: false,
      form: {
        important: false,
        theme: '',
        content: ''
      },
      user_id: null,
      deleteVisible: false,
      deleteRow: {}
    };
  },
  created() {
    this.project_id = this.$route.params.project_id;
    let user = JSON.parse(localStorage.getItem('user'));
    this.user_id = user.id;
  },
  mounted() {
    this.getDataList();
  },
  methods: {
    getDataList() {
      announcementList({
        project_id: this.project_id
      }).then((res) => {
        if (res.code === 200) {
          this.tableData = res.data;
        }
      });
    },
    handleAdd() {
      this.form = {
        important: false,
        theme: '',
        content: ''
      };
      this.formMode = 'add';
      this.formVisible = true;
    },
    handleEdit(row) {
      let important = false;
      if (row.important === 1) {
        important = true;
      }
      this.form = {
        id: row.id,
        important,
        theme: row.theme,
        content: row.content
      };
      this.formMode = 'edit';
      this.formVisible = true;
    },
    requestAdd() {
      let { form } = this;
      let {theme} = form;
      if (theme.trim() === '') {
        this.form.theme = '';
        this.$message({
          message: 'Please enter theme',
          type: 'warning'
        });
        return;
      }
      let {content} = form;
      if (content.trim() === '') {
        this.form.content = '';
        this.$message({
          message: 'Please enter the content',
          type: 'warning'
        });
        return;
      }
      if (form.important) {
        form.important = 1;
      } else {
        form.important = 0;
      }
      form['project_id'] = this.project_id;
      announcementAdd(form).then((res) => {
        if (res.code === 200) {
          this.formVisible = false;
          this.$message({
            message: 'Done',
            type: 'success'
          });
          this.getDataList();
        }
      });
    },
    requestEdit() {
      let { form } = this;
      let {theme} = form;
      if (theme.trim() === '') {
        this.form.theme = '';
        this.$message({
          message: 'Please enter theme',
          type: 'warning'
        });
        return;
      }
      let {content} = form;
      if (content.trim() === '') {
        this.form.content = '';
        this.$message({
          message: 'Please enter the content',
          type: 'warning'
        });
        return;
      }
      if (form.important) {
        form.important = 1;
      } else {
        form.important = 0;
      }
      announcementEdit(form).then((res) => {
        if (res.code === 200) {
          this.formVisible = false;
          this.$message({
            message: 'Done',
            type: 'success'
          });
          this.getDataList();
        }
      });
    },
    handleDelete(row) {
      this.deleteRow = row;
      this.deleteVisible = true;
    },
    requestDelete() {
      announcementDelete({
        id: this.deleteRow.id
      }).then((res) => {
        if (res.code === 200) {
          this.$message({
            message: 'Done',
            type: 'success'
          });
          this.deleteVisible = false;
          this.getDataList();
        }
      });
    }
  }
};
</script>

<style scoped lang="less">
.announcement-wrapper {
  margin: 0px 0px 16px 16px;
  .header-wrapper {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 16px 16px 16px 0px;
    .title {
      font-size: 16px;
      font-weight: 550;
      color: #303133;
    }
    .operate {
      font-size: 14px;
      color: #007bff;
    }
    .operate:hover {
      cursor: pointer;
      opacity: 0.8;
    }
  }
  .announcement-content {
    height: 211px;
    overflow: auto;
    .announcement-row {
      margin: 0px 16px 16px 0px;
      transition: 0.5s;
      transition-property: all;
      transition-duration: 0.5s;
      transition-timing-function: ease;
      transition-delay: 0s;
      .announcement-header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        flex-wrap: wrap;
        margin-bottom: 5px;
        .title-wrapper {
          display: flex;
          .important {
            width: 24px;
            height: 20px;
            display: flex;
            align-items: center;
            img {
              width: 16px;
              height: 16px;
            }
          }
          .title {
            font-size: 14px;
            font-weight: 550;
            line-height: 20px;
            color: #303133;
            font-family: PingFang SC, PingFang SC;
          }
        }
        .announcement-info {
          display: flex;
          align-items: center;
          .operate {
            margin-right: 16px;
            color: #909399;
            .edit-icon {
              font-size: 14px;
              margin-right: 8px;
            }
            .delete-icon {
              font-size: 14px;
            }
            .edit-icon:hover {
              cursor: pointer;
              color: #409eff;
            }
            .delete-icon:hover {
              cursor: pointer;
              color: #f56c6c;
            }
          }
          .creator {
            font-size: 14px;
            color: #909399;
            margin-right: 8px;
          }
          .date {
            font-size: 14px;
            color: #909399;
          }
        }
      }
      .announcement-textarea {
        font-size: 14px;
        color: #303133;
        padding-left: 24px;
        line-height: 20px;
        text-overflow: -o-ellipsis-lastline;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        line-clamp: 2;
        -webkit-box-orient: vertical;
      }
    }
    .no-data-wrapper {
      width: 100%;
      height: 100%;
      text-align: center;
      .no-data-img {
        width: 120px;
        height: 120px;
        margin-top: 18px;
      }
      .label {
        font-size: 13px;
        color: #909399;
        margin-top: 5px;
      }
    }
  }
  /ddep/ .el-form-item__label {
    text-align: left !important;
    color: #303133;
    padding: 0px 16px 0px 0px;
  }
  /deep/ .el-form--inline .el-form-item {
    margin-right: 24px;
    margin-bottom: 8px;
  }
  /deep/ .el-textarea__inner {
    padding: 8px 8px 8px 16px;
    resize: none;
  }
  /deep/ .el-textarea .el-input__count {
    bottom: 0px;
    right: 8px;
    background: transparent !important;
  }
  /deep/ .el-form-item__content {
    line-height: 32px;
  }
}
</style>
