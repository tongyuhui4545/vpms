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
        <div class="form-container">
          <el-form
            ref="form"
            :model="form"
            :rules="rules"
            label-position="top"
          >
            <el-form-item
              label="Name"
              prop="name"
            >
              <el-input
                v-model="form.name"
                placeholder="Please input the name"
                :disabled="formMode == 'edit' ? true : false"
                size="small"
              />
            </el-form-item>
            <el-form-item
              label="Team type"
              prop="type"
              required
            >
              <el-radio-group v-model="form.type">
                <el-radio :label="'2D'" />
                <el-radio :label="'3D'" />
              </el-radio-group>
            </el-form-item>
            <el-form-item
              label="Leader"
              prop="manager_id"
            >
              <el-select
                v-model="form.manager_id"
                filterable
                clearable
                placeholder="Please select leader"
                size="small"
                style="width: 50%npm"
              >
                <el-option
                  v-for="item in usersData"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id"
                />
              </el-select>
            </el-form-item>
            <el-form-item
              label="Member"
              prop="member"
            >
              <el-select
                v-model="form.member"
                filterable
                clearable
                multiple
                placeholder="Please select member"
                size="small"
                style="width: 50%"
              >
                <el-option
                  v-for="item in usersData"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id"
                >
                  {{ item.name }}
                </el-option>
              </el-select>
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
import { userList, addTeam, teamDetail, teamEdit } from '@/api/index.js';
export default {
  name: '',
  components: {
    Card
  },
  data() {
    return {
      cardTitle: 'New team',
      formMode: '',
      usersData: [],
      managerList: [],
      memberList: [],
      form: {
        name: '',
        manager_id: '',
        member: [],
        type: ''
      },
      rules: {
        name: [
          { required: true, message: 'Please input name', trigger: 'blur' }
        ],
        manager_id: [
          { required: true, message: 'Please select leader', trigger: 'change' }
        ],
        member: [
          { required: true, message: 'Please select member', trigger: 'change' }
        ]
      }
    };
  },
  mounted() {
    const params = this.$route.query;
    this.formMode = params.mode;
    this.getUsersList();
    switch (params.mode) {
      case 'add':
        this.cardTitle = 'New team';
        this.form.type = '';
        break;
      case 'edit':
        this.cardTitle = 'Edit team';
        this.getTeamDetail(params.id);
        break;
      default:
        break;
    }
  },
  methods: {
    handleBack() {
      this.$router.go(-1);
    },
    async getUsersList() {
      this.managerList = [];
      this.memberList = [];
      await userList()
        .then((res) => {
          if (res.code === 200) {
            //后端接口做了修改。当获取userList时候，如果什么都不传，或传page:""，则返回所有的用户列表,此时的res结构为res.data.如果带参数，返回为res.data.data
            let {data} = res;
            this.usersData = data.data;
            // for (let i = 0; i < data.length; i++) {
            //   let item = data[i];
            //   this.managerList.push(item);
            //   this.memberList.push(item);
            // }
           
            // this.memberList = data;
          }
          return;
        })
        .catch((err) => {
          return err
        });
    },
    async handleAdd() {
      let {form} = this;
      if (form.name === '' || !form.manager_id || form.member.length === 0) {
        this.$message({
          message: 'Please fill in all the required fields',
          type: 'warning'
        });
        return;
      }

      await addTeam(form)
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
          return err
        });
    },
    async getTeamDetail(id) {
      await teamDetail(id)
        .then((res) => {
          if (res.code === 200) {
            let {data} = res;
            let memberIds = data.members.map((item) => {return item.id});
            this.form = {
              id,
              name: data.name,
              manager_id: '',
              member: memberIds,
              type: data.type
            };
            //判断这个manager_id的所有者的身份是不是CN Engineer Manager或者CN Engineer
            let user = data.members.find((item) => {return item.id === data.manager_id});
            if (!user) {
              user = {};
            }
            let managerIdValid = false;
            if (
              user.role === 'CN Engineer Manager' ||
              user.role === 'CN Engineer' ||
              user.role === 'Team Leader'
            ) {
              managerIdValid = true;
            }
            if (data.manager_id && data.manager_id !== '' && managerIdValid) {
              this.form['manager_id'] = data.manager_id;
            }
            // if(data.members && data.members.length>0){
            //     let members = data.members;
            //     this.form['member'] = members.map(function(item){
            //         if(item.id != data.manager_id && (item.role !== 'CN Engineer Manager')){
            //             return item.id;
            //         }
            //     });
            // }
          } else {
            // this.$message.error(res.message);
          }
          return;
        })
        .catch((err) => {
          // this.$message.error(err);
          return err
        });
    },
    async handleEdit() {
      let {form} = this;
      if (form.manager_id === '') {
        this.$message({
          message: 'Please select leader',
          type: 'warning'
        });
        return;
      }
      if (form.member.length === 0) {
        this.$message({
          message: 'Please select member',
          type: 'warning'
        });
        return;
      }
      let handledMember = this.form.member.map((item) => {
        if (item === null || typeof item === 'undefined') {
          return;
        } else {
          return item;
        }
      });
      await teamEdit({
        id: form.id,
        name: form.name,
        manager_id: form.manager_id,
        member: handledMember,
        type: form.type
      })
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
          return err
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
  }

  .form-wrapper {
    width: 90%;
    margin: 20px 0;

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
