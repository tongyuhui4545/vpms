<template>
  <div class="header-container">
    <!--logo-->
    <div class="logo-container">
      <div class="logo-wrapper">
        <img
          src="@/assets/IconDesigns/Logo_blue.png"
          alt=""
          @click="goToHomePage"
        >
        <div class="vertical-divider" />
        <div
          class="logo-text"
          @click="goToHomePage"
        >
          VPMS
        </div>
      </div>
    </div>
    <HeaderNav ref="headerNav" />
    <div
      v-if="displayUserStatus"
      class="user-info-wrapper"
    >
      <div class="info-item">
        <NotificationDropdown
          @has-unread="onHasUnread"
          @setAllAsRead="clearUnreadNum"
        >
          <template #icon>
            <el-badge
              v-if="hasUnread"
              :value="unreadNum"
              :max="99"
              class="item"
            >
              <img
                class="bell"
                src="@/assets/IconDesigns/bell.png"
                alt="bell"
              >
            </el-badge>
          </template>
        </NotificationDropdown>
      </div>

      <el-dropdown @command="handleCommand">
        <div class="el-dropdown-link user-info animate">
          <!--<img src="@/assets/image/auther.gif" alt="" class="user-avatar">-->
          {{ userInfo.name }}
          <i class="el-icon-caret-bottom user-info-icon" />
        </div>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item command="change-password">
            <div class="drapdown-row animate">
              Reset password
            </div>
          </el-dropdown-item>
          <el-dropdown-item command="logout">
            <div class="drapdown-row animate">
              Log out
            </div>
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>

    <el-dialog
      title="Reset password"
      :visible.sync="passwordVisible"
      :modal-append-to-body="true"
      :append-to-body="true"
      width="30%"
    >
      <div>
        <el-form
          ref="passwordForm"
          :model="passwordForm"
          :rules="passwordRules"
          label-width="150px"
          label-position="left"
        >
          <el-form-item
            label="New password"
            prop="password1"
          >
            <el-input
              v-model="passwordForm.password1"
              size="small"
              show-password
            />
          </el-form-item>
          <el-form-item
            label="Confirm password"
            prop="password2"
          >
            <el-input
              v-model="passwordForm.password2"
              size="small"
              show-password
            />
          </el-form-item>
        </el-form>
      </div>
      <span
        slot="footer"
        class="dialog-footer"
      >
        <el-button
          size="small"
          @click="passwordVisible = false"
        >Cancel</el-button>
        <el-button
          type="primary"
          size="small"
          @click="changePassword"
        >Submit</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { logout, notices, editPassword } from '@/api/index.js';
import { encrypt } from '@/utils/commons.js';
import { ENCRYPT_KEY, ENCRYPT_IV } from '@/utils/constants.js';
import NotificationDropdown from '@/components/NotificationDropdown/index.vue';
import HeaderNav from '@/components/HeaderNav.vue';
export default {
  name: '',
  components: {
    NotificationDropdown,
    HeaderNav
  },
  props: {
    displayUserStatus: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      fullscreenLoading: false,
      hasUnread: false,
      unreadNum: 0,
      userInfo: {},
      noticeList: [],
      passwordVisible: false,
      passwordForm: {
        password1: '',
        password2: ''
      },
      passwordRules: {
        password1: [
          {
            required: true,
            message: 'Please input new password',
            trigger: 'blur'
          }
        ],
        password2: [
          {
            required: true,
            message: 'Please input your new password again',
            trigger: 'blur'
          }
        ]
      }
    };
  },
  mounted() {
    this.userInfo = JSON.parse(localStorage.getItem('user'));
  },
  methods: {
    clearUnreadNum() {
      this.hasUnread = false;
      this.unreadNum = 0;
    },
    goToHomePage() {
      this.$router.push('/index/work-overview');
      this.$refs.headerNav.resetNav();
    },
    handleCommand(params) {
      switch (params) {
        case 'change-password':
          this.passwordForm = {
            password1: '',
            password2: ''
          };
          this.passwordVisible = true;
          break;
        case 'logout':
          this.goLogout();
          break;
        default:
          break;
      }
    },
    onHasUnread(unreadNum) {
      this.hasUnread = true;
      this.unreadNum = unreadNum;
    },
    async getNoticeList() {
      await notices({
        type: 1
      })
        .then((res) => {
          if (res.code === 200) {
            this.noticeList = res.data;
          } else {
            return;
          }
          return;
        })
        .catch((err) => {
          return err;
        });
    },

    /**退出 */
    async goLogout() {
      this.fullscreenLoading = true;
      await logout()
        .then((res) => {
          if (res.code === 200) {
            //除了自定义表头，其他localStorage项目全部清除
            const heads = localStorage.getItem('personal_table_heads');
            //工时登记忘记的提醒也要记住，不要清除
            const warning = localStorage.getItem('hours_register_warning');
            localStorage.clear();
            if (heads) { 
              localStorage.setItem('personal_table_heads', heads); 
            }
            if(warning) {
              localStorage.setItem('hours_register_warning', warning); 
            }
            // *************************************
            this.$store.dispatch('app/clearAllPage');
            this.$router.push('/');
          } else {
            this.$message({
              message: res.message,
              type: 'error'
            });
          }
          this.fullscreenLoading = false;
          return;
        })
        .catch((err) => {
          return err;
        });
    },
    async changePassword() {
      let form = this.passwordForm;
      if (form.password1 === '') {
        this.$message({
          message: 'Please input new password',
          type: 'warning'
        });
        return;
      }
      if (form.password2 === '') {
        this.$message({
          message: 'Please input your new password again',
          type: 'warning'
        });
        return;
      }
      if (form.password1 !== form.password2) {
        this.$message({
          message: 'The two passwords are different',
          type: 'warning'
        });
        return;
      }
      let userInfo = JSON.parse(window.localStorage.getItem('user'));
      let password = encrypt(form.password1, ENCRYPT_KEY, ENCRYPT_IV);
      await editPassword({
        id: userInfo.id,
        email: userInfo.email,
        password
      })
        .then((res) => {
          if (res.code === 200) {
            this.$message({
              message: 'Done',
              type: 'success'
            });
            this.passwordVisible = false;
            //除了自定义表头，其他localStorage项目全部清除
            const heads = localStorage.getItem('personal_tab_heads');
            localStorage.clear();
            if (heads) {
              localStorage.setItem('personal_tab_heads', heads);
            }
            // *************************************
            this.$router.push('/');
          } else {
            this.$message({
              message: res.message,
              type: 'error'
            });
          }
          this.fullscreenLoading = false;
          return;
        })
        .catch((err) => {
          return err;
        });
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
  position: fixed;
  left: 0;
  top: 0;
  z-index: 80;

  .logo-container {
    // flex: 1;
    display: flex;
    flex-wrap: nowrap;
    align-items: center;
    justify-content: flex-start;

    .logo-wrapper {
      // width: 240px;
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: flex-start;
      margin-left: 16px;

      img {
        // width: 220px;
        width: 56px;
        height: 56px;
        cursor: pointer;
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
        cursor: pointer;
      }
    }

    .location-container {
      flex: 1;
      height: 100%;
      margin-right: 50px;
      display: flex;
      align-items: center;

      .location-item {
        display: flex;
        align-items: center;
        font-size: 12px;

        .location-label {
          color: #606266;
        }

        .location-label:hover {
          cursor: pointer;
          color: rgb(0 123 255);
        }

        .location-line {
          color: #606266;
          margin: 0 5px;
        }
      }
    }
  }

  .logo-extra {
    flex: 1;
    flex-wrap: nowrap;
    display: flex;
  }

  .user-info-wrapper {
    margin-right: 50px;
    display: flex;
    align-items: center;

    .info-item {
      margin-right: 30px;
      cursor: pointer;

      .icon {
        font-size: 18px;
      }

      .bell {
        margin-top: 4px;
        width: 20px;
        height: 20px;
      }
    }

    .user-info {
      font-size: 14px;
      display: flex;
      align-items: center;
      height: 60px;
      color: #606266;
    }

    .user-info:hover {
      cursor: pointer;
      color: #409eff;
    }

    .user-avatar {
      width: 40px;
      height: 40px;
      border-radius: 50%;
      margin-right: 5px;
    }

    .user-info-icon {
      font-size: 10px;
      display: inline-block;
      position: relative;
      top: 2px;
      left: 3px;
      color: #606266;
    }

    .drapdown-row {
      display: flex;
      align-items: center;

      .drapdown-icon {
        font-size: 14px;
        margin-right: 5px;
      }
    }
  }
}

:deep(.el-dialog) {
  border-radius: 10px;
}
</style>
