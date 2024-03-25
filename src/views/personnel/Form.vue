<template>
  <div class="page-container">
    <Card class="card-templete card-gap">
      <template #cardHeader>
        <span class="iconfont icon-renyuanguanli card-icon" />
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
        <div class="form-wrapper">
          <el-form
            ref="form"
            :model="form"
            :rules="rules"
            label-position="top"
          >
            <el-form-item
              label="User ID"
              prop="user_no"
            >
              <el-input
                v-if="formMode === 'edit'"
                v-model="form.user_no"
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
                placeholder="Please enter the name"
                size="small"
              />
            </el-form-item>
            <el-form-item
              label="Email"
              prop="email"
            >
              <el-input
                v-model="form.email"
                placeholder="Please enter email"
                type="email"
                size="small"
                :disabled="formMode == 'edit' ? true : false"
              />
              <div class="email-switch">
                <p>Email notification</p>
                <el-switch v-model="form.email_switch" />
              </div>
            </el-form-item>
            <el-form-item
              label="Role"
              prop="role"
            >
              <el-select
                v-model="form.role"
                placeholder="Please select role"
                size="small"
              >
                <el-option
                  v-for="opt in userTypeList"
                  :key="opt.value"
                  :label="opt.name"
                  :value="opt.name"
                />
              </el-select>
            </el-form-item>
            <el-form-item
              label="Design fee"
              prop="design_fee"
            >
              <el-input-number
                v-model="form.design_fee"
                size="small"
                :precision="1"
                :step="0.1"
                :min="0"
              />
              <span
                style="
                  vertical-align: middle;
                  font-size: 14px;
                  color: #606266;
                  line-height: 40px;
                  margin-left: 5px;
                "
              >$per hour</span>
            </el-form-item>
            <el-form-item label="Ding no.">
              <el-input
                v-model="form.ding_id"
                placeholder="Please enter the ding no."
                size="small"
              />
            </el-form-item>
          </el-form>
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
import { register, userDetail, userEdit, roleList } from '@/api/index.js';
export default {
  name: '',
  components: {
    Card
  },
  data() {
    return {
      cardTitle: 'New user',
      userTypeList: [],
      formMode: '',
      form: {
        name: '',
        email: '',
        email_switch: true,
        password: '123456',
        role: '',
        ding_id: ''
      },
      rules: {
        name: [
          { required: true, message: 'Please input name', trigger: 'blur' }
        ],
        email: [
          { required: true, message: 'Please input email', trigger: 'blur' }
        ],
        role: [
          { required: true, message: 'Please select role', trigger: 'change' }
        ]
      }
    };
  },
  mounted() {
    const params = this.$route.query;
    this.formMode = params.mode;
    roleList({type: 0}).then((res) => {
      if (res.code === 200) {
        this.userTypeList = res.data;
      }
    });
    switch (params.mode) {
      case 'add':
        this.cardTitle = 'New user';
        break;
      case 'edit':
        this.cardTitle = 'Edit user';
        this.getUserDetail(params.id);
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
      if (form.name === '') {
        this.$message({
          message: 'Please input name',
          type: 'warning'
        });
      }
      if (form.email === '') {
        this.$message({
          message: 'Please input the email',
          type: 'warning'
        });
      }
      const reg =
        /^\w+((-\w+)|(\.\w+))*@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+$/;
      if (!reg.test(form.email)) {
        this.$message({
          message: 'Please input the correct email address',
          type: 'warning'
        });
        return;
      }
      if (form.role === '') {
        this.$message({
          message: 'Please select role',
          type: 'warning'
        });
        return;
      }

      form['pid'] = 0;
      form.email_switch = form.email_switch === true ? 0 : 1;
      delete form.password;
      delete form.pid;
      await register(form)
        .then((res) => {
          if (res.code === 200) {
            this.$message({
              message: 'Done',
              type: 'success'
            });
            this.$router.go(-1);
          } else {
            // this.$message.error(res.message);
          }
          return;
        })
        .catch((err) => {
          // this.$message.error(err);
          return err;
        });
    },
    async getUserDetail(id) {
      await userDetail(id)
        .then((res) => {
          if (res.code === 200) {
            let { data } = res;
            this.form = {
              user_no: data.user_no,
              id,
              design_fee: data.design_fee,
              email: data.email,
              email_switch: data.email_switch === 1 ? false : true,
              name: data.name,
              role: data.role,
              ding_id: data.ding_id
            };
          } else {
            // this.$message.error(res.message);
          }
          return;
        })
        .catch((err) => {
          // this.$message.error(err);
          return err;
        });
    },
    async handleEdit() {
      let { form } = this;
      form.email_switch = form.email_switch === true ? 0 : 1;
      if (form.name === '') {
        this.$message({
          message: 'Please input name',
          type: 'warning'
        });
      }
      if (form.email === '') {
        this.$message({
          message: 'Please input the email',
          type: 'warning'
        });
      }
      const reg =
        /^\w+((-\w+)|(\.\w+))*@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+$/;
      if (!reg.test(form.email)) {
        this.$message({
          message: 'Please input the correct email address',
          type: 'warning'
        });
        return;
      }
      if (form.role === '') {
        this.$message({
          message: 'Please select role',
          type: 'warning'
        });
        return;
      }
      delete form.password;
      await userEdit(form)
        .then((res) => {
          if (res.code === 200) {
            this.$message({
              message: 'Done',
              type: 'success'
            });
            this.$router.go(-1);
          } else {
            // this.$message.error(res.message);
          }
          return;
        })
        .catch((err) => {
          // this.$message.error(err);
          return err;
        });
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

    .email-switch {
      display: flex;
      align-items: center;
      justify-content: flex-start;
      gap: 10px;
      font-size: 14px;
      color: #606266;
      line-height: 40px;
      vertical-align: middle;
    }
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
