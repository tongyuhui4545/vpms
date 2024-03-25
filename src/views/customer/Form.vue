<template>
  <div class="page-container">
    <Card class="card-templete">
      <template #cardHeader>
        <span class="iconfont icon-kehu card-icon" />
        {{ cardTitle }}
      </template>
      <template #cardOperate>
        <div
          class="card-btn animate"
          @click="handleBack"
        >
          <i class="el-icon-back" />
          Return
        </div>
      </template>
      <template #cardContent>
        <div class="form-container">
          <div class="form-wrapper">
            <el-form
              ref="ruleForm"
              :model="form"
              :rules="rules"
              label-position="top"
              label-width="100px"
              class="demo-ruleForm"
            >
              <el-form-item label="Customer ID">
                <el-input
                  v-if="formMode === 'edit'"
                  v-model="form.client_no"
                  placeholder="Please input"
                  size="small"
                  disabled
                />
                <div
                  v-else
                  class="gray-span-notification"
                >
                  <span>Customer ID will be automatically generated</span>
                </div>
              </el-form-item>
              <el-form-item
                label="Name"
                prop="name"
              >
                <el-input
                  v-model="form.name"
                  placeholder="Please input"
                  size="small"
                />
              </el-form-item>
              <el-form-item label="Tel">
                <el-input
                  v-model="form.tel"
                  placeholder="Please input"
                  size="small"
                />
              </el-form-item>
              <el-form-item label="Address">
                <el-input
                  v-model="form.address"
                  placeholder="Please input"
                  size="small"
                />
              </el-form-item>
            </el-form>
            <!--<div class="form-item-wrapper">
                            <div class="form-item">
                                <div class="form-label">No.</div>
                                <div class="form-content">
                                    <el-input v-model="form.no" placeholder="请输入内容" size="small"></el-input>
                                </div>
                            </div>
                            <div class="form-item">
                                <div class="form-label">Name</div>
                                <div class="form-content">
                                    <el-input v-model="form.name" placeholder="请输入内容" size="small"></el-input>
                                </div>
                            </div>
                            <div class="form-item">
                                <div class="form-label">Tel</div>
                                <div class="form-content">
                                    <el-input v-model="form.tel" placeholder="请输入内容" size="small"></el-input>
                                </div>
                            </div>
                            <div class="form-item">
                                <div class="form-label">Address</div>
                                <div class="form-content">
                                    <el-input v-model="form.address" placeholder="请输入内容" size="small"></el-input>
                                </div>
                            </div>
                        </div>
                        <div style="clear:both;"></div>-->
          </div>
          <div class="form-wrapper">
            <div class="form-submit-btn">
              <div
                class="btn cancel animate"
                @click="handleBack"
              >
                Cancel
              </div>
              <div
                v-if="formMode == 'add'"
                class="btn submit animate"
                @click="handleAdd"
              >
                Submit
              </div>
              <div
                v-if="formMode == 'edit'"
                class="btn submit animate"
                @click="handleEdit"
              >
                Submit
              </div>
            </div>
          </div>
        </div>
      </template>
    </Card>
  </div>
</template>

<script>
import Card from '@/components/Card.vue';
import { customerAdd, customerDetail, editCustomer } from '@/api/index.js';
export default {
  name: '',
  components: {
    Card
  },
  data() {
    return {
      cardTitle: 'New customer',
      formMode: '',
      form: {
        client_no: '',
        name: '',
        tel: '',
        address: ''
      },
      rules: {
        // client_no: [
        //   { required: true, message: 'Please input No.', trigger: 'blur' }
        // ],
        name: [
          { required: true, message: 'Please input name', trigger: 'blur' }
        ],
        tel: [{ required: true, message: 'Please input tel', trigger: 'blur' }],
        address: [
          { required: true, message: 'Please input address', trigger: 'blur' }
        ]
      }
    };
  },
  mounted() {
    let params = this.$route.query;
    this.formMode = params.mode;
    switch (params.mode) {
      case 'add':
        this.cardTitle = 'New customer';
        break;
      case 'edit':
        this.cardTitle = 'Edit customer';
        this.getDetail(params.id);
        break;
      default:
        break;
    }
  },
  methods: {
    handleBack() {
      this.$router.go(-1);
    },
    async handleAdd() {
      let { form } = this;
        delete form.no;
        delete form.client_no;
      if (form.name === '') {
        this.$message({
          message: 'Please input name',
          type: 'warning'
        });
        return;
      }
      // form['no'] = this.transFormat();
      await customerAdd(form)
        .then((res) => {
          if (res.code === 200) {
            this.$message({
              message: 'Added',
              type: 'success'
            });
            this.$router.push('/index/customer/list');
          } 
          return;
        })
        .catch((err) => {
          return err;
        })
    },
    async getDetail(id) {
      await customerDetail(id)
        .then((res) => {
          if (res.code === 200) {
            this.form = res.data;
          } else {
            // this.$message.error(res.message);
          }
          return;
        })
        .catch((err) => {
          return err;
        });
    },
    async handleEdit() {
      let { form } = this;
      if (form.name === '') {
        this.$message({
          message: 'Please input name',
          type: 'warning'
        });
        return;
      }

      await editCustomer({
        id: form.id,
        // no: this.transFormat(),
        // client_no: form.client_no,
        name: form.name,
        tel: form.tel,
        address: form.address
      })
        .then((res) => {
          if (res.code === 200) {
            this.$message({
              message: 'Done',
              type: 'success'
            });
            this.$router.go(-1);
            let index = this.$router.options.routes.filter((item) => {
              return item.path === '/index';
            });
            let list = index[0].children.filter((item) => {
              return item.path === '/index/customer/list';
            });
            list[0].meta.isEdit = true;
          } else {
            // this.$message.error(res.message);
          }
          return;
        })
        .catch((err) => {
          return err;
        });
    },
    transFormat() {
      let date = new Date();
      let time = date.getTime();
      return time;
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
  }

  .form-wrapper {
    width: 90%;
    margin: 20px 0;

    .gray-span-notification {
      width: 1643px;
      background: #eeeeee;
      border-radius: 4px;
      opacity: 1;
      border: 1px solid #eeeeee;

      span {
        display: flex;
        justify-content: flex-start;
        align-items: center;
        color: #909399;
        padding-left: 16px;
      }
    }

    .form-item {
      margin-bottom: 10px;

      .form-label {
        font-size: 13px;
        color: #606266;
        margin: 10px 0;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }

      .form-content {
        margin-right: 20px;
      }

      .form-child-wrapper {
        display: flex;
        flex-wrap: wrap;
      }

      .form-child-item {
        width: 25%;
      }
    }

    .form-divider {
      border: solid #fff 1px;
    }
  }
}
</style>
