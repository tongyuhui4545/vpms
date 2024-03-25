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
    <!--登录表单-->
    <div class="form-container animate">
      <div class="form-wrapper">
        <div class="logo-wrapper animate">
          <img
            src="@/assets/image/logo.png"
            alt=""
          >
        </div>
        <div class="form-title">
          Login
        </div>
        <div class="form-content animate">
          <el-form
            ref="form"
            :model="form"
            :rules="rules"
          >
            <el-form-item prop="email">
              <el-input
                v-model="form.email"
                placeholder="Please enter the email"
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
                :type="passwordType"
                size="small"
              >
                <i
                  slot="prefix"
                  class="el-icon-lock"
                />
                <img
                  slot="suffix"
                  :src="
                    passwordType == 'password'
                      ? require('@/assets/image/eye-open.png')
                      : require('@/assets/image/eye-close.png')
                  "
                  alt=""
                  class="eye-img"
                  @click="handlePassword"
                >
              </el-input>
            </el-form-item>
            <el-form-item>
              <el-button
                type="primary"
                size="small"
                class="submit-btn"
                @click="goLogin"
                @keyup.enter="keyDown(e)"
              >
                Login
              </el-button>
            </el-form-item>
          </el-form>
        </div>
        <!--<div class="form-info animate" @click="goRegister">Don't have an account yet? Register immediately.</div>-->
      </div>
    </div>
  </div>
</template>

<script>
import CryptoJS from 'crypto-js';
import { login, userInfo, roleLimitsDetail } from '@/api/index.js';
export default {
  name: '',
  components: {},
  data() {
    return {

      /**加载动画数据 */
      form: {
        email: '',
        password: ''
      },
      passwordType: 'password',
      rules: {
        email: [
          {
            type: 'email',
            required: true,
            message: 'Please input the correct email address',
            trigger: 'blur'
          }
        ],
        password: [
          { required: true, message: 'Please enter password', trigger: 'blur' }
        ]
      }
    };
  },
  mounted() {
    window.addEventListener('keydown', this.keyDown);
  },
  destroyed() {
    window.removeEventListener('keydown', this.keyDown, false);
  },
  methods: {
    encrypt(str, KEY, IV) {
      let key = CryptoJS.enc.Utf8.parse(KEY);
      let iv = CryptoJS.enc.Utf8.parse(IV);
      let encrypted = CryptoJS.AES.encrypt(str, key, {
        iv,
        mode: CryptoJS.mode.CBC,
        padding: CryptoJS.pad.Pkcs7
      });
      return encrypted.toString();
    },
    handlePassword() {
      let type = this.passwordType;
      switch (type) {
        case 'password':
          this.passwordType = 'text';
          break;
        case 'text':
          this.passwordType = 'password';
          break;
        default:
          break;
      }
    },

    /**点击登录，表单验证及跳转 */
    async goLogin() {
      const { form } = this;
      if (form.email === '') {
        this.$message({
          message: 'Please input email',
          type: 'warning'
        });
        return;
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
      if (form.password === '') {
        this.$message({
          message: 'Please input password',
          type: 'warning'
        });
        return;
      }

      /**登录接口 */
      await login({
        email: form.email,
        password: form.password
      })
        .then((res) => {
          if (res.code === 200) {
            let { data } = res;

            /**保存token */
            localStorage.setItem('token', data.token);
            localStorage.setItem('refresh_token', data.refresh_token);
            this.getUserInfo();
          } else {
            this.$message.error(res.message);
          }
          return;
        })
        .catch((err) => {
          // this.$message.error(err);
          return err;
        });
    },
    async getUserInfo() {
      await userInfo()
        .then((res) => {
          if (res.code === 200) {

            /**保存用户信息 */
            localStorage.setItem('user', JSON.stringify(res.data));
            this.getRoleLimits(res.data);
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
    async getRoleLimits(data) {
      await roleLimitsDetail({
        role: data.role
      })
        .then((res) => {
          if (res.code === 200) {

            /**保存用户信息 */
            localStorage.setItem('limits', JSON.stringify(res.data));

            /**跳转首页 */
            /**跳转首页 */
            if (
              this.$route.query.redirect &&
              this.$route.query.redirect !== ''
            ) {
              let originPath = this.$route.query.redirect;
              this.$router.push(originPath);
            } else {
              this.$router.push('/index/work-overview');
            }
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

    /**注册跳转 */
    goRegister() {
      this.$router.push('/register');
    },
    keyDown(e) {
      if (e.keyCode === 13) {
        this.goLogin();
      }
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
  /* stylelint-disable-next-line function-url-quotes */
  background: #f0f2f5 url(@/assets/image/body.svg) no-repeat 50%;
  background-size: 100%;

  .particles-wrapper {
    width: 100%;
    height: 100vh;
    position: absolute;
    left: 0;
    top: 0;
  }

  .form-container {
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

        .eye-img {
          display: inline-block;
          width: 14px;
          position: relative;
          top: 3px;
          cursor: pointer;
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
