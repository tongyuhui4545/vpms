<template>
  <div>
    <div
      class="process-container animate"
      @click="handleSend"
    >
      <i class="el-icon-s-promotion process-icon" />
    </div>

    <el-drawer
      :title="dialogTitle"
      :visible.sync="dialogVisible"
      direction="rtl"
      :before-close="handleClose"
      size="50%"
    >
      <div class="dialog-step-container">
        <div class="step-item">
          <img
            src="@/assets/image/r1.png"
            alt=""
          >
          <div class="step-label">
            US Sales
          </div>
        </div>
        <div class="step-item">
          <img
            src="@/assets/image/r2.png"
            alt=""
          >
          <div class="step-label">
            US Engineer
          </div>
        </div>
        <div class="step-item">
          <img
            src="@/assets/image/r2.png"
            alt=""
          >
          <div class="step-label">
            CN Engineer
          </div>
        </div>
        <div class="step-item">
          <img
            src="@/assets/image/r2.png"
            alt=""
          >
          <div class="step-label">
            CN Engineer Team
          </div>
        </div>
        <div class="step-item">
          <img
            src="@/assets/image/r2.png"
            alt=""
          >
          <div class="step-label">
            CN Engineer
          </div>
        </div>
      </div>
      <!--发送progress-->
      <div v-if="sendProject">
        <el-form
          ref="sendForm"
          :model="sendForm"
          label-width="80px"
          size="mini"
          class="form-dialog"
        >
          <el-form-item label="Comment">
            <el-input
              v-model="sendForm.remark"
              type="textarea"
              :rows="5"
            />
            <TagPerson
              v-if="atTagPerson"
              ref="tagPerson"
              class="tag-person"
              :style="{ left: leftPosition, top: '25px' }"
              @person-chosen="handleChoosePerson"
            />
          </el-form-item>
          <el-form-item label="Comment files">
            <el-upload
              class="upload-demo"
              action="https://jsonplaceholder.typicode.com/posts/"
              :on-preview="handlePreview"
              :on-remove="handleRemove"
              :before-remove="beforeRemove"
              multiple
              :limit="3"
              :on-exceed="handleExceed"
              :file-list="sendForm.files"
            >
              <el-button
                size="mini"
                type="primary"
              >
                Upload
              </el-button>
              <div
                slot="tip"
                class="el-upload__tip"
              />
            </el-upload>
          </el-form-item>
        </el-form>
        <div class="form-footer">
          <el-button
            size="mini"
            @click="sendVisible = false"
          >
            Cancel
          </el-button>
          <el-button
            type="primary"
            size="mini"
            @click="send"
          >
            Send
          </el-button>
        </div>
      </div>
      <!--团队人员分配-->
      <div v-if="assingProject">
        <div class="trans-container">
          <div class="trans-item-wrapper trans-gap">
            <div class="trans-label">
              Team
            </div>
            <div class="trans-item">
              <div class="trans-header">
                <div class="trans-all">
                  <el-checkbox v-model="teamAllChacked">
                    全选
                  </el-checkbox>
                </div>
              </div>
              <div class="trans-content">
                <el-tree
                  ref="tree"
                  :data="treeData"
                  show-checkbox
                  default-expand-all
                  node-key="id"
                  highlight-current
                  :props="defaultProps"
                />
              </div>
            </div>
          </div>
          <div class="trans-item-wrapper">
            <div class="trans-label">
              Member
            </div>
            <div class="trans-item">
              <div class="trans-header">
                <div class="trans-all">
                  <el-checkbox v-model="teamAllChacked">
                    全选
                  </el-checkbox>
                </div>
                <div class="trans-num">
                  已选0人/共{{ memberChecked.length }}人
                </div>
              </div>
              <div class="trans-content">
                <div
                  v-for="(item, key) in memberChecked"
                  :key="key"
                  class="checkobx-item"
                >
                  <div class="checkobx">
                    <el-checkbox v-model="item.checked">
                      {{
                        item.label
                      }}
                    </el-checkbox>
                  </div>
                  <div class="line" />
                  <div class="info">
                    {{ item.team }}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="form-footer">
          <el-button
            size="mini"
            @click="sendVisible = false"
          >
            Cancel
          </el-button>
          <el-button
            type="primary"
            size="mini"
            @click="send"
          >
            Assign
          </el-button>
        </div>
      </div>
    </el-drawer>
  </div>
</template>

<script>
import TagPerson from '@/components/CommentsAndUpdates/TagPerson.vue';

export default {
  name: '',
  components: {

    TagPerson
  },
  data() {
    return {
      atTagPerson: false,
      dialogTitle: 'Send Project',
      dialogVisible: false,
      sendForm: {
        remark: '',
        files: []
      },
      activeStatus: {
        from: 'US Engineer',
        to: 'CN Engineer'
      },
      sendProject: false,
      assingProject: false,
      progressList: [
        {
          id: 'USP190006',
          progress: '30%',
          dueDate: '2023-01-10',
          remark: 'series remark'
        },
        {
          id: 'USP190007',
          progress: '50%',
          dueDate: '2023-01-10',
          remark: 'series remark'
        },
        {
          id: 'USP190008',
          progress: '70%',
          dueDate: '2023-01-10',
          remark: 'series remark'
        },
        {
          id: 'USP190009',
          progress: '90%',
          dueDate: '2023-01-10',
          remark: 'series remark'
        }
      ],
      treeData: [
        {
          id: 1,
          label: '3D部门',
          children: [
            {
              id: 4,
              label: '二级 1-1'
            }
          ]
        },
        {
          id: 2,
          label: '2D部门',
          children: [
            {
              id: 5,
              label: '二级 2-1'
            },
            {
              id: 6,
              label: '二级 2-2'
            }
          ]
        },
        {
          id: 3,
          label: '信息部',
          children: [
            {
              id: 7,
              label: '二级 3-1'
            },
            {
              id: 8,
              label: '二级 3-2'
            }
          ]
        }
      ],
      defaultProps: {
        children: 'children',
        label: 'label'
      },
      teamAllChacked: false,
      memberChecked: [
        {
          checked: false,
          label: '妲己',
          team: '信息部'
        },
        {
          checked: false,
          label: '小卤蛋',
          team: '信息部'
        },
        {
          checked: false,
          label: '瑶',
          team: '信息部'
        },
        {
          checked: false,
          label: '张良',
          team: '信息部'
        },
        {
          checked: false,
          label: '甄姬',
          team: '信息部'
        }
      ]
    };
  },
  methods: {
    handleChoosePerson(person) {
      this.progressForm.remarks += `${person.name}`;
      this.referredUsers.push(person.id);
      this.$refs.commentInputArea.focus();
      this.atTagPerson = false;
    },
    handleClose() {
      this.dialogVisible = false;
    },
    handleSend() {
      let status = this.activeStatus;
      if (status) {
        this.dialogVisible = true;

        /**US Engineer 发送给 CN Engineer */
        if (status.from === 'US Engineer' && status.to === 'CN Engineer') {
          this.sendProject = true;
          this.assingProject = false;
        }

        /**CN Engineer Team 分配 人员 */
        if (status.from === 'CN Engineer' && status.to === 'CN Engineer Team') {
          this.sendProject = false;
          this.assingProject = true;
        }

        /**CN Engineer 审核项目 */
        if (status.from === 'CN Engineer' && status.to === 'US Engineer') {
          this.sendProject = true;
          this.assingProject = false;
        }

        /**US Engineer 审核项目 */
        if (status.from === 'US Engineer' && status.to === 'Customer') {
          this.sendProject = true;
          this.assingProject = false;
        }
      } else {
        this.$message({
          message: 'The project has been completed',
          type: 'warning'
        });
      }
    },
    send() {
      this.dialogVisible = false;
      this.sendProject = false;
      this.assingProject = false;
      let status = this.activeStatus;

      /**US Engineer 发送给 CN Engineer */
      if (status.from === 'US Engineer' && status.to === 'CN Engineer') {
        this.activeStatus = {
          from: 'CN Engineer',
          to: 'CN Engineer Team'
        };
        this.$message({
          message: 'The project has been submitted to the CN Engineer',
          type: 'success'
        });
      }

      /**CN Engineer Team 分配 人员 */
      if (status.from === 'CN Engineer' && status.to === 'CN Engineer Team') {
        this.activeStatus = {
          from: 'CN Engineer',
          to: 'US Engineer'
        };
        this.$message({
          message: 'Personnel allocation has been completed',
          type: 'success'
        });
      }

      /**CN Engineer 审核项目 */
      if (status.from === 'CN Engineer' && status.to === 'US Engineer') {
        this.activeStatus = {
          from: 'US Engineer',
          to: 'Customer'
        };
        this.$message({
          message: 'The project has been submitted to the US Engineer',
          type: 'success'
        });
      }

      /**US Engineer 审核项目 */
      if (status.from === 'US Engineer' && status.to === 'Customer') {
        this.activeStatus = null;
        this.$message({
          message: 'The project has been completed',
          type: 'success'
        });
      }
    }

    /**上传图片 */
    // handlePreview() {},
    // handleRemove() {},
    // beforeRemove() {},
    // handleExceed() {}
  }
};
</script>

<style lang="less" scoped>
.process-container {
  width: 40px;
  height: 40px;
  border: solid #248de8 1px;
  border-radius: 5px;
  position: fixed;
  right: 0;
  bottom: 80px;
  z-index: 80;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #248de8;

  .process-icon {
    font-size: 18px;
    color: #fff;
  }
}

.process-container:hover {
  cursor: pointer;
  opacity: 0.8;
}

.dialog-step-container {
  margin-bottom: 30px;
  display: flex;
  justify-content: center;

  .step-item {
    width: 160px;
    height: 32px;
    position: relative;

    img {
      width: 160px;
      height: 32px;
    }

    .step-label {
      width: 100%;
      height: 100%;
      position: absolute;
      left: 0;
      top: 0;
      display: flex;
      justify-content: center;
      align-items: center;
      color: #fff;
      font-size: 14px;
    }
  }
}

/* stylelint-disable-next-line selector-class-pattern */
:deep(.el-dialog__header) {
  background: rgb(244 244 244);
}

.form-dialog {
  width: 90%;
}

.form-footer {
  display: flex;
  justify-content: flex-end;
  margin-right: 30px;
}

.trans-container {
  display: flex;
  margin-bottom: 20px;

  .trans-item-wrapper {
    flex: 1;

    .trans-label {
      font-size: 22px;
      font-family: 'PingFang SC-Regular', 'PingFang SC', sans-serif;
      font-weight: 400;
      color: #666;
      margin-bottom: 10px;
    }

    .trans-item {
      height: 400px;
      background: #fff;
      border-radius: 8px;
      border: 1px solid #cbcbcb;
      display: flex;
      flex-direction: column;

      .trans-header {
        height: 40px;
        background: #f7f7f8;
        border-radius: 8px 8px 0 0;
        display: flex;
        align-items: center;
        justify-content: space-between;

        .trans-all {
          margin-left: 15px;
        }

        .trans-num {
          font-size: 12px;
          font-family: 'PingFang SC-Regular', 'PingFang SC', sans-serif;
          font-weight: 400;
          color: #606a74;
          margin-right: 15px;
        }
      }

      .trans-content {
        flex: 1;
        height: 0;
        padding: 10px 15px;
        overflow-y: auto;

        .checkobx-item {
          display: flex;
          align-items: center;
          padding-bottom: 10px;
          border-bottom: 1px solid #eaeaea;
          margin-bottom: 10px;

          .checkobx {
            min-width: 80px;
          }

          .info {
            flex: 1;
            font-size: 14px;
            font-family: 'PingFang SC-Regular', 'PingFang SC', sans-serif;
            font-weight: 400;
            color: #848f9a;
          }

          .line {
            width: 1px;
            height: 14px;
            background: #d7d7d7;
            margin-right: 15px;
          }
        }
      }
    }
  }
  
  .trans-gap {
    margin-right: 15px;
  }
}
</style>
