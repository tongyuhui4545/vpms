<template>
  <div class="login-page-container">
    <div
      class="background-page"
      :style="{ 'background-image': 'url(' + backgroundUrl + ')', 'background-repeat': 'no-repeat' }"
    >
      <div class="company-logo" />
    </div>

    <div class="login-form-container">
      <div class="form-title">
        <p>Voltage PMS</p>
      </div>
      <div class="login-form">
        <el-form
          ref="form"
          :model="form"
          :rules="rules"
        >
          <el-form-item>
            <div class="login-input-wrap">
              <i class="user" />
              <input
                v-model="form.email"
                class="login-input"
                placeholder="Please enter the user name"
              >
            </div>
          </el-form-item>
          <el-form-item style="margin-top: 56px">
            <div class="login-input-wrap">
              <i class="password" />
              <input
                ref="passwordInput"
                v-model="form.password"
                class="login-input"
                :type="pswdInputType"
                placeholder="Please enter password"
                @keyup="handleKeyup"
              >
              <i
                class="eye"
                @click="toggleShowPassword"
              />
            </div>
          </el-form-item>
        </el-form>
      </div>
      <div
        class="forget-password-text"
        @click="gotoForgetPassword"
      >
        Forget the password ?
      </div>
      <div class="login-btn-wrap">
        <el-button
          type="primary"
          style="width: 100%; height: 100%"
          @click="goLogin"
        >
          Sign in
        </el-button>
      </div>
    </div>
  </div>
</template>

<script>
import { login, userInfo, roleLimitsDetail } from '@/api/index.js';
import config from '@/config.js'
import { encrypt } from '@/utils/commons.js';
import { ENCRYPT_KEY, ENCRYPT_IV } from '@/utils/constants.js';

export default {
  name: 'LoginPage',
  data() {
    return {
      form: {
        email: '',
        password: ''
      },
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
      },
      showPassword: false
    };
  },
  computed: {
    pswdInputType() {
      return this.showPassword ? 'text' : 'password';
    },
    backgroundUrl() {
      let url = `${config.baseUrl}/storage/upload/bg/bg.jpg`
      return url
    }
  },
  methods: {
    handleKeyup(e) {
      if (e.code === 'Enter' || e.code === 'NumpadEnter') {
        this.goLogin();
      }
    },
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

      let password = encrypt(form.password, ENCRYPT_KEY, ENCRYPT_IV);

      /**登录接口 */
      await login({
        email: form.email,
        password
      })
        .then((res) => {
          if (res.code === 200) {
            let { data } = res;

            /**保存token */
            //除了自定义表头，其他localStorage项目全部清除
            const heads = localStorage.getItem('personal_table_heads');
            //提醒公式登记的提示展示与否也要记住
            const warning = localStorage.getItem('hours_register_warning')
            localStorage.clear();
            if(heads) {
            localStorage.setItem('personal_table_heads', heads);
            }
            if(warning) {
            localStorage.setItem('hours_register_warning', warning);
            }
            // *************************************
            localStorage.setItem('token', data.token);
            localStorage.setItem('refresh_token', data.refresh_token);
            this.getUserInfo();
          }
          return;
        })
        .catch((err) => {
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
          }
          return;
        })
        .catch((err) => {
          return err;
        });
    },
    toggleShowPassword() {
      if (this.$refs.passwordInput.value.trim().length === 0) {
        return;
      }
      this.showPassword = !this.showPassword;

      let { passwordInput } = this.$refs;

      this.$nextTick(() => {
        passwordInput.setSelectionRange(
          passwordInput.value.length,
          passwordInput.value.length
        );

        passwordInput.focus();
      });
    },
    gotoForgetPassword() {
      this.$router.push('/forget-password');
    }
  }
};
</script>

<style lang="less" scoped>

.el-button {
  font-size: 18px !important;
}

.login-page-container {
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: flex-start;
  gap: 340px;
  align-items: center;
  overflow: hidden;
  background: #fff;

  .background-page {
    width: 640px;
    height: 100%;
    // background: url("${config.baseUrl}/storage/upload/bg/bg.jpg") no-repeat;
    background-size: 155% 105%;
    background-position: bottom right -15px;

    .company-logo {
      width: 387px;
      height: 80px;
      position: absolute;
      top: 32px;
      background: url('@/assets/image/logo-white.png') no-repeat;
      left: 40px;
      background-size: contain;
    }
  }

  .login-form-container {
    width: 600px;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;

    .form-title {
      font-size: 40px;
      font-weight: 500;
      margin-top: 120px;
    }

    .login-form {
      margin-top: 55px;

      .login-input-wrap {
        width: 600px;
        height: 60px;
        border: 1px solid #dcdfe6;
        border-radius: 8px;
        display: flex;
        align-items: center;
        justify-content: flex-start;
        gap: 7px;

        .user {
          width: 16px;
          height: 16px;
          margin-left: 15px;
          background: url('@/assets/IconDesigns/user.png') no-repeat;
          background-size: contain;
          background-position: center;
        }

        .password {
          width: 16px;
          height: 16px;
          margin-left: 15px;
          background: url('@/assets/IconDesigns/password.png') no-repeat;
          background-size: contain;
          background-position: center;
        }

        .eye {
          width: 24px;
          height: 24px;
          margin-left: 10px;
          background: url('@/assets/IconDesigns/eye.png') no-repeat;
          background-size: contain;
          background-position: center;
          cursor: pointer;
        }

        .login-input {
          margin: 4px;
          width: 80%;
          height: 55px;
          border: none;
          font-size: 16px;

          &:focus {
            outline: none;
          }

          &::placeholder {
            color: #c0c4cc;
          }
        }
      }
    }

    .login-btn-wrap {
      margin-top: 65px;
      height: 55px;
    }

    .forget-password-text {
      font-size: 14px;
      font-weight: 400;
      color: #007bff;
      text-align: right;
      cursor: pointer;
    }
  }
}
</style>
