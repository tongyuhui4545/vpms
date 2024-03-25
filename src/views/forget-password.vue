<template>
  <section style="height: 100vh">
    <div class="header-container">
      <!--logo-->
      <div class="logo-container">
        <div class="logo-wrapper">
          <img
            src="@/assets/IconDesigns/Logo_blue.png"
            alt=""
          >
          <div class="vertical-divider" />
          <div class="logo-text">
            VPMS
          </div>
        </div>
      </div>
    </div>
    <div class="forget-password-body">
      <div class="forget-password-content">
        <div
          class="return"
          @click="gotoLogin"
        >
          <div class="return-btn animate">
            <i class="el-icon-back" />
            Return
          </div>
        </div>
        <div class="content-title">
          Forget the password
        </div>
        <div>
          <div class="step-center">
            <el-steps
              :space="600"
              :active="activeStep"
              align-center
              :finish-status="finishStatus"
            >
              <el-step title="Identity verification" />
              <el-step title="Reset password" />
              <el-step title="Done" />
            </el-steps>
          </div>
          <div
            v-if="activeStep == 0"
            class="verfiy-form"
          >
            <el-form
              ref="verificationForm"
              label-width="155px"
              :model="verificationForm"
              :hide-required-asterisk="true"
            >
              <el-form-item
                label="User name :"
                class="user-name"
                prop="email"
                :rules="[
                  {
                    required: true,
                    message: 'Please enter the email number'
                  },
                  {
                    type: 'email',
                    message: 'Please enter the correct email number'
                  }
                ]"
              >
                <el-input
                  v-model="verificationForm.email"
                  clearable
                  :validate-event="false"
                />
              </el-form-item>
              <el-form-item
                label="Verification code :"
                prop="code"
                :rules="{
                  required: true,
                  message:
                    'The verification code is entered incorrectly, please obtain it again.'
                }"
              >
                <div style="display: flex">
                  <el-input
                    v-model="verificationForm.code"
                    clearable
                    :validate-event="false"
                  />
                  <el-button
                    type="primary"
                    plain
                    class="send-code-btn"
                    :disabled="sendBtnDisabled"
                    @click="sendCode"
                  >
                    {{ sendBtnText }}
                  </el-button>
                </div>
              </el-form-item>
              <el-form-item>
                <el-button
                  type="primary"
                  class="confirm-btn"
                  @click="gotoChangePassword"
                >
                  Submit
                </el-button>
              </el-form-item>
            </el-form>
          </div>
          <div
            v-if="activeStep == 1"
            class="change-form"
          >
            <el-form
              ref="passwordForm"
              label-width="250px"
              :model="passwordForm"
              :hide-required-asterisk="true"
              :rules="passwordFormRules"
            >
              <el-form-item
                label="New password :"
                class="password"
                prop="newPassword"
              >
                <el-input
                  v-model="passwordForm.newPassword"
                  show-password
                  clearable
                  :validate-event="false"
                />
              </el-form-item>
              <el-form-item
                label="Confirm new password :"
                class="password"
                prop="confirmPassword"
              >
                <el-input
                  v-model="passwordForm.confirmPassword"
                  show-password
                  clearable
                  :validate-event="false"
                />
              </el-form-item>
              <el-form-item>
                <el-button
                  type="primary"
                  class="confirm-btn"
                  @click="gotoSuccess"
                >
                  Submit
                </el-button>
              </el-form-item>
            </el-form>
          </div>
          <div
            v-if="activeStep == 3"
            class="return-to-login"
          >
            <div>
              <div class="return-to-content">
                Password reset successful, please remember and log in again
              </div>
              <div style="text-align: center">
                <el-button
                  type="primary"
                  class="return-login-btn"
                  @click="gotoLogin"
                >
                  Return to login
                </el-button>
              </div>
              <div class="auto-return">
                Automatically return after 10 seconds
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import {
  sendEmailCode,
  verificationEmailCode,
  changePassword
} from '@/api/index';
import { encrypt } from '@/utils/commons.js';
import { ENCRYPT_KEY, ENCRYPT_IV } from '@/utils/constants.js';

export default {
  data() {
    let validatePassword = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('Please enter the password'));
      } else if (value !== this.passwordForm.newPassword) {
        callback(new Error('The entered passwords do not match'));
      } else {
        callback();
      }
    };
    return {
      activeStep: 0,
      finishStatus: 'finish',
      verificationForm: {},
      sendBtnText: 'Send verification code',
      sendBtnDisabled: false,
      passwordForm: {},
      passwordFormRules: {
        newPassword: [
          {
            required: true,
            message: 'Please enter the password'
          }
        ],
        confirmPassword: [{ validator: validatePassword, required: true }]
      },
      returnTimer: null,
      sendTimer: null
    };
  },
  methods: {
    // 发送验证码
    async sendCode() {
      if (this.verificationForm.email) {
        await sendEmailCode({
          email: this.verificationForm.email
        }).then((res) => {
          if (res.code === 200) {
            //2分钟倒计时
            let time = 120;
            let timer = setInterval(() => {
              time--;
              if (time < 10 && time > 0) {
                this.sendBtnText = `Sent (0${time}s)`;
                this.sendBtnDisabled = true;
              } else if (time > 10) {
                this.sendBtnText = `Sent (${time}s)`;
                this.sendBtnDisabled = true;
              } else {
                this.sendBtnText = 'Send verification code';
                this.sendBtnDisabled = false;
                clearInterval(timer);
              }
            }, 1000);
          }
        });
      } else {
        this.$message.error('User name is empty');
      }
    },
    async verificationEmail() {
      await verificationEmailCode(this.verificationForm).then((res) => {
        if (res.code === 200) {
          this.activeStep = 1;
          this.finishStatus = 'success';
          clearInterval(this.sendTimer);
        }
      });
    },
    // 校验验证码
    gotoChangePassword() {
      this.$refs.verificationForm.validate((valid) => {
        if (valid) {
          this.verificationEmail();
        } else {
          return false;
        }
      });
    },
    async resetPassword() {
      let secret_key = encrypt(
        this.verificationForm.email,
        ENCRYPT_KEY,
        ENCRYPT_IV
      );
      let password = encrypt(
        this.passwordForm.newPassword,
        ENCRYPT_KEY,
        ENCRYPT_IV
      );
      await changePassword({
        email: this.verificationForm.email,
        password,
        secret_key
      })
        .then((res) => {
          if (res.code === 200) {
            this.$message.success(res.message);
            this.activeStep = 3;
            //十秒自动跳回登录页
            this.returnTimer = setTimeout(() => {
              this.gotoLogin();
            }, 10000);
          }
        })
        .catch((err) => {
          this.$message.err(err);
        });
    },
    gotoSuccess() {
      this.$refs.passwordForm.validate((valid) => {
        if (valid) {
          //TODO: 对接修改密码的接口
          this.resetPassword();
        } else {
          return false;
        }
      });
    },
    gotoLogin() {
      this.$router.push('/');
      clearTimeout(this.returnTimer);
      clearTimeout(this.sendTimer);
    }
  }
};
</script>

<style lang="less" scoped>
.header-container {
  width: 100%;
  height: 63px;
  background: #fff;
  display: flex;
  align-items: center;
  justify-content: space-between;
  z-index: 80;

  .logo-container {
    display: flex;
    flex-wrap: nowrap;
    align-items: center;
    justify-content: flex-start;

    .logo-wrapper {
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: flex-start;
      margin-left: 16px;

      img {
        width: 56px;
        height: 56px;
      }

      .vertical-divider {
        width: 0;
        height: 32px;
        border: 1px solid #eee;
        margin-left: 8px;
      }

      .logo-text {
        width: 51px;
        height: 28px;
        text-align: center;
        font-size: 20px;
        font-weight: 500;
        color: #303133;
        line-height: 28px;
        margin-left: 16px;
      }
    }
  }
}

.content-title {
  font-size: 32px;
  font-weight: 500;
  color: #303133;
  text-align: center;
  margin-bottom: 32px;
}

.forget-password-body {
  background-color: #f5f5f5;
  height: calc(100% - 95px);

  .return {
    margin-left: 24px;
    padding-top: 16px;
    cursor: pointer;

    .return-card {
      font-size: 18px;
      font-weight: 400;
      color: #303133;
    }
  }

  .return:hover {
    color: #007bff;
  }

  .forget-password-content {
    margin: 16px;
    background: #fff;
    height: 100%;

    :deep(.el-step__icon) {
      width: 64px;
      height: 64px;
    }

    :deep(.el-step.is-horizontal .el-step__line) {
      top: 31px;
      background-color: #dcdfe6;
    }

    :deep(.is-process .el-step__icon) {
      background-color: #007bff;
      border-color: #007bff;
    }

    :deep(.is-process .el-step__icon-inner) {
      color: #fff;
    }

    :deep(.is-success .el-step__icon) {
      background-color: #67c23a;
      border-color: #67c23a;
    }

    :deep(.is-success .el-step__icon-inner) {
      color: #fff;
    }

    :deep(.el-step__icon-inner) {
      font-size: 24px;
      color: #fff;
    }

    :deep(.is-wait .el-step__icon) {
      background-color: #c0c4cc;
      border-color: #c0c4cc;
    }

    :deep(.is-wait .el-step__icon-inner) {
      color: #fff;
    }

    :deep(.el-step__head.is-success) {
      color: #c0c4cc;
      border-color: #c0c4cc;
    }

    :deep(.el-step__title.is-finish),
    :deep(.el-step__title.is-process),
    :deep(.el-step__title.is-wait),
    :deep(.el-step__title.is-success) {
      color: #303133;
      font-size: 20px;
    }

    :deep(.el-step__title.is-process),
    :deep(.el-step__title.is-wait) {
      font-weight: 400;
    }

    :deep(.el-input__inner) {
      height: 64px;
    }

    :deep(.el-form-item__label) {
      line-height: 64px;
      font-size: 18px;
    }

    .user-name,
    .password {
      :deep(.el-input__inner) {
        width: 680px;
      }
    }

    :deep(.el-form-item) {
      margin-bottom: 40px;
    }

    :deep(
        .el-form-item.is-error .el-input__inner,
        .el-form-item.is-error .el-input__inner:focus
      ) {
      border-color: #f56c6c;
    }

    :deep(.el-form-item__error) {
      font-size: 18px;
      font-family: 'PingFang SC', 'PingFang SC';
      font-weight: 400;
      color: #f56c6c;
      margin-top: 8px;
    }

    :deep(.el-form-item__error::before) {
      content: '';
      background: url('../assets/image/waring.png') no-repeat;
      width: 16px;
      height: 16px;
      display: inline-block;
    }

    :deep(.el-button--primary.is-plain) {
      background: #fff;
      color: #007bff;
      border-color: #007bff;
    }

    :deep(
        .el-button--primary.is-plain.is-disabled,
        .el-button--primary.is-plain.is-disabled:active,
        .el-button--primary.is-plain.is-disabled:focus,
        .el-button--primary.is-plain.is-disabled:hover
      ) {
      color: #8cc5ff;
      background-color: #ecf5ff;
      border-color: #d9ecff;
    }

    .step-center {
      margin: auto;
      max-width: 1800px;
    }

    .send-code-btn {
      margin-left: 40px;
      width: 320px;
      font-size: 16px;
      font-weight: 400;
    }

    .confirm-btn {
      width: 100%;
      border-radius: 4px;
      background: #007bff;
      height: 64px;
      margin-top: 104px;
      font-size: 18px;
      font-weight: 400;
    }

    .return-login-btn {
      margin-top: 104px;
      width: 80%;
      border-radius: 4px;
      background: #007bff;
      height: 64px;
    }
  }

  .verfiy-form,
  .change-form,
  .return-to-login {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 80px;

    :deep(.el-input__inner) {
      border: 1px solid #eee;
    }
  }

  .return-to-content {
    font-size: 32px;
    font-weight: 500;
    color: #303133;
    line-height: 20px;
  }

  .auto-return {
    font-size: 18px;
    font-weight: 400;
    color: #909399;
    line-height: 20px;
    margin-top: 24px;
    text-align: center;
  }
}
</style>
