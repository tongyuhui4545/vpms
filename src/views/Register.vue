<template>
  <div class="page-container">
    <!--登录页粒子动画-->
    <div class="particles-wrapper">
      <vue-particles
        color="#dedede"
        :particle-opacity="0.7"
        :particles-number="80"
        shape-type="circle"
        :particle-size="4"
        lines-color="#dedede"
        :lines-width="1"
        :line-linked="true"
        :line-opacity="0.4"
        :lines-distance="150"
        :move-speed="5"
        :hover-effect="true"
        hover-mode="grab"
        :click-effect="true"
        click-mode="push"
      />
    </div>
    <!--注册表单-->
    <div class="form-container animate">
      <div class="form-wrapper">
        <div class="logo-wrapper animate">
          <img
            src="@/assets/image/logo.png"
            alt=""
          >
        </div>
        <div class="form-title">
          Register
        </div>
        <div class="form-content animate">
          <el-form
            ref="form"
            :model="form"
            :rules="rules"
          >
            <el-form-item prop="username">
              <el-input
                v-model="form.username"
                placeholder="Please enter account name"
                size="small"
              >
                <i
                  slot="prefix"
                  class="el-icon-user"
                />
              </el-input>
            </el-form-item>
            <el-form-item prop="password">
              <el-input
                v-model="form.password"
                placeholder="Please enter password"
                type="password"
                size="small"
              >
                <i
                  slot="prefix"
                  class="el-icon-lock"
                />
              </el-input>
            </el-form-item>
            <el-form-item prop="password2">
              <el-input
                v-model="form.password2"
                placeholder="Please enter password again"
                type="password"
                size="small"
              >
                <i
                  slot="prefix"
                  class="el-icon-lock"
                />
              </el-input>
            </el-form-item>
            <el-form-item>
              <el-button
                type="primary"
                size="small"
                class="submit-btn"
                @click="register"
              >
                Register
              </el-button>
            </el-form-item>
          </el-form>
        </div>
        <div
          class="form-info animate"
          @click="goLogin"
        >
          Have an account? Go login.
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { register } from '@/api/index.js';
export default {
  name: '',
  components: {},
  data() {
    return {
      form: {
        username: '',
        password: '',
        password2: ''
      },
      rules: {
        username: [
          {
            required: true,
            message: 'Please input account name',
            trigger: 'blur'
          }
        ],
        password: [
          { required: true, message: 'Please input password', trigger: 'blur' }
        ],
        password2: [
          {
            required: true,
            message: 'Please input password again',
            trigger: 'blur'
          }
        ]
      }
    };
  },
  methods: {

    /**点击注册，表单验证及跳转 */
    async register() {
      const {form} = this;
      if (form.username === '') {
        this.$message({
          message: 'Please input account name',
          type: 'warning'
        });
        return;
      }
      const reg =
        /^\w+((-\w+)|(\.\w+))*@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+$/;
      if (!reg.test(form.username)) {
        this.$message({
          message: 'Please input the correct email address',
          type: 'warning'
        });
        return;
      }
      if (form.password === '') {
        this.$message({
          message: 'Please input password',
          type: 'warning'
        });
        return;
      }
      if (form.password2 === '') {
        this.$message({
          message: 'Please input password again',
          type: 'warning'
        });
        return;
      }
      if (form.password2 !== form.password) {
        this.$message({
          message: 'The two passwords are different',
          type: 'warning'
        });
        return;
      }
      this.fullscreenLoading = true;
      await register({
        email: form.username,
        password: form.password
      })
        .then((res) => {
          if (res.code === 200) {
            this.$message.success('Register success');
          } else {
            this.fullscreenLoading = false;
            // this.$message.error(res.message);
          }
          return;
        })
        .catch((err) => {
          this.fullscreenLoading = false;
          // this.$message.error(err);
          return err
        });
    },
    goLogin() {
      this.$router.push('/');
    }
  }
};
</script>

<style lang="less" scoped>
.page-container {
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  background: #f0f2f5 url("@/assets/image/body.svg") no-repeat 50%;
  background-attachment: fixed;
  background-repeat: no-repeat;
  background-position: top left;

  .particles-wrapper {
    width: 100%;
    height: 100vh;
    position: absolute;
    left: 0;
    top: 0;
  }

  .form-container {
    /* background: #fff; */
    border-radius: 10px;
    position: relative;
    z-index: 80;

    .logo-wrapper {
      text-align: center;

      img {
        width: 180px;
      }
    }

    .form-wrapper {
      .form-title {
        text-align: center;
        font-family: nunito, cursive;
        color: #27304b;
        font-size: 42px;
        padding: 20px 0 50px;
        font-weight: 600;
      }

      .form-content {
        width: 260px;
        margin: 0 auto;
        margin-bottom: 30px;

        .submit-btn {
          width: 100%;
        }
      }

      .form-info {
        margin-bottom: 50px;
        font-size: 12px;
        text-align: center;
        color: #606266;
      }

      .form-info:hover {
        cursor: pointer;
        color: #409eff;
      }
    }
  }
}
</style>
