<template>
  <div>
    <Card class="card-min">
      <template #cardHeader>
        <span class="iconfont icon-xiangmu card-icon" />
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
        <!--progress表单-->
        <div class="add-form-container">
          <el-form
            ref="ruleForm"
            :model="form"
            :rules="rules"
            label-width="120px"
          >
            <el-form-item
              label="Project No."
              prop="project_no"
            >
              <el-input
                v-model="form.project_no"
                size="small"
              />
            </el-form-item>
            <el-form-item
              label="Project name"
              prop="name"
            >
              <el-input
                v-model="form.name"
                size="small"
              />
            </el-form-item>
            <el-form-item
              label="Customer"
              prop="client_id"
            >
              <el-select
                v-model="form.client_id"
                filterable
                placeholder="Please input and select"
                size="small"
              >
                <el-option
                  v-for="(item, key) in customerOptions"
                  :key="key"
                  :label="item.name"
                  :value="item.id"
                />
              </el-select>
            </el-form-item>
            <el-form-item
              label="Sales"
              prop="sales_id"
            >
              <el-select
                v-model="form.sales_id"
                filterable
                placeholder="Please input and select"
                size="small"
              >
                <el-option
                  v-for="(item, key) in salesOptions"
                  :key="key"
                  :label="item.name"
                  :value="item.id"
                />
              </el-select>
            </el-form-item>
            <el-form-item
              label="Size DC(MW)"
              prop="size"
            >
              <el-input-number
                v-model="form.size"
                :min="0"
                :precision="2"
                size="small"
              />
            </el-form-item>
            <!-- 地址修改，改为详细字段，包含Address, Zipcode 等-->
            <!-- <el-form-item label="Address" prop="client.address">
              <el-input v-model="form.project.address" size="small" placeholder="Please enter the address"></el-input>
            </el-form-item>
            <el-form-item label="City" prop="city">
              <el-input v-model="form.project.city" size="small" placeholder="Please enter the city"></el-input>
            </el-form-item>
            <el-form-item label="County" prop="county">
              <el-input v-model="form.project.county" size="small" placeholder="Please enter the county"></el-input>
            </el-form-item>
            <el-form-item label="State" prop="state">
              <el-input v-model="form.project.state" size="small" placeholder="Please enter the state"></el-input>
            </el-form-item>
            <el-form-item label="Zipcode" prop="zipcode">
              <el-input v-model="form.project.zipcode" size="small" placeholder="Please enter the zipcode"></el-input>
            </el-form-item> -->
            <!-- ----------- -->
            <!-- <el-form-item label="Comment">
              <el-input type="textarea" :rows="5" v-model="form.project.remark"></el-input>
            </el-form-item> -->
            <el-form-item
              label="Solution"
              required
            >
              <el-select
                v-model="form.solution"
                multiple
              >
                <el-option
                  label="Alex"
                  value="Alex"
                />
                <el-option
                  label="Harness"
                  value="Harness"
                />
                <el-option
                  label="Lynx"
                  value="AleLynxx"
                />
              </el-select>
            </el-form-item>
            <el-form-item>
              <div class="form-submit-btn">
                <div
                  class="btn cancel animate"
                  @click="handleBack"
                >
                  Cancel
                </div>
                <div v-if="!submitLoading">
                  <div
                    v-if="formMode == 'add'"
                    class="btn submit animate"
                    @click="verifyForm"
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
                <div v-else>
                  <div class="btn submit loading animate">
                    Submit
                  </div>
                </div>
              </div>
            </el-form-item>
          </el-form>
        </div>
      </template>
    </Card>
  </div>
</template>

<script>
import {
  projectsTotal,
  formalProjectDetail,
  editFormalProject,
  customerAll,
  salesList,
  addProject
} from '@/api/index.js';
import Card from '@/components/Card.vue';
export default {
  name: '',
  components: {
    Card
  },
  data() {
    let user = JSON.parse(window.localStorage.getItem('user'));
    return {
      user,
      formMode: '',
      cardTitle: '',
      customerOptions: [],
      salesOptions: [],
      form: {
        id: '',
        project_no: '',
        name: '',
        // team_id: "",
        team_name: 1,
        solution: '',
        // us_engineer_id: "1",
        // cn_engineer_id: "1",
        // cn_engineer_team_id: "1",
        size: undefined,
        sales_id: undefined,
        client_id: undefined
        // address: "",
        // city: "",
        // county: "",
        // state: "",
        // zipcode: "",
        // remark: "",
        // creation_id: "",
        // creation_name: "",
        // sales_status: 1
      },
      rules: {
        project_no: [
          //{ required: true, message: 'Please input', trigger: 'blur' },
          //{ pattern: /^[A-Za-z0-9u4e00-u9fa5]+$/, message: 'Please enter the correct content' }
        ],
        name: [
          {
            required: true,
            message: 'Please input project name',
            trigger: 'blur'
          }
        ],
        client_id: [
          { required: true, message: 'Please select client', trigger: 'blur' }
        ],
        sales_id: [
          { required: true, message: 'Please select Sales', trigger: 'blur' }
        ],
        size: [
          { required: true, message: 'Please input size dc', trigger: 'blur' }
        ],
        solution: [
          { required: true, message: 'Please select solution', trigger: 'blur' }
        ]
      },
      salesList: [],
      submitLoading: false
    };
  },
  created() {
    this.getCustomerList();
    this.getSalesList();
  },
  mounted() {
    const params = this.$route.query;
    this.formMode = params.mode;
    switch (params.mode) {
      case 'add':
        this.cardTitle = 'New project';
        this.projectNoInit();
        break;
      case 'edit':
        this.cardTitle = 'Edit project';
        this.getFormalProjectDetail(params.id);
        break;
      default:
        break;
    }
  },
  methods: {
    handleBack() {
      this.$router.go(-1);
    },
    projectNoInit() {
      let date = new Date();
      let year = String(date.getFullYear());
      let yearArr = [...year];
      let project_year = yearArr[2] + yearArr[3];
      this.getTotalProject(project_year);
    },
    async getTotalProject(project_year) {
      await projectsTotal()
        .then((res) => {
          if (res.code === 200) {
            let {data} = res;
            let count = data.length + 1;
            if (count < 10) {
              count = `00${count}`;
            }
            if (count < 100) {
              count = `0${count}`;
            }
            this.form['project_no'] = `${project_year}-${count}`;
          }
          return;
        })
        .catch((err) => {
          return err
        });
    },
    async getCustomerList() {
      await customerAll()
        .then((res) => {
          if (res.code === 200) {
            this.customerOptions = res.data;
          }
          return;
        })
        .catch((err) => {
          return err
        });
    },
    async getSalesList() {
      await salesList()
        .then((res) => {
          let {user} = this;
          if (res.code === 200) {
            if (user.role === 'Sales') {
              this.salesOptions = res.data.filter(
                (item) => {return item.id === user.id}
              );
            } else {
              this.salesOptions = res.data;
            }
          } else {
            // this.$message.error(res.message);
          }
          return;
        })
        .catch((err) => {
          return err
        });
    },
    verifyForm() {
      this.$refs['ruleForm'].validate((valid) => {
        if (valid) {
          this.handleAdd();
        } else {
          return false;
        }
      });
    },

    /**新增 */
    async handleAdd() {
      this.submitLoading = true;
      let that = this;
      setTimeout(() => {
        that.submitLoading = false;
      }, 2000);
      const {form} = this;
      // let user = JSON.parse(window.localStorage.getItem('user'));
      // form.creation_id = user.id
      // form.creation_name = user.name
      /*if(form.no == ''){
                this.$message({
                    message: 'Please input Project No.',
                    type: 'warning'
                });
                return;
            }*/
      if (form.name === '') {
        this.$message({
          message: 'Please enter Project Name',
          type: 'warning'
        });
        return;
      }
      if (form.client_id === '') {
        this.$message({
          message: 'Please select client',
          type: 'warning'
        });
        return;
      }
      if (form.sales_id === '') {
        this.$message({
          message: 'Please select sales',
          type: 'warning'
        });
        return;
      }
      if (form.size === '') {
        this.$message({
          message: 'Please input size',
          type: 'warning'
        });
        return;
      }
      //   if (form.address == "") {
      //     this.$message({
      //       message: "Please input address",
      //       type: "warning",
      //     });
      //     return;
      //   }
      //State是必须信息
      if (!form.state) {
        this.$message.error('State must be entered');
        return;
      }
      //county和city至少需要填写一个
      if (!form.city && !form.county) {
        this.$message.error('Please input city or county');
        return;
      }
      form['no'] = this.transFormat();
      delete form.no;
      delete form.project_no;
      await addProject(form)
        .then((res) => {
          if (res.code === 200) {
            this.$message({
              message: 'Added',
              type: 'success'
            });
            this.$router.go(-1);
          } else {
            // this.$message.error(res.message);
          }
          return;
        })
        .catch((err) => {
          return err
        });
    },

    /**编辑 */
    async getFormalProjectDetail(id) {
      await formalProjectDetail(id)
        .then((res) => {
          if (res.code === 200) {
            let {data} = res;
            this.form = data;
            if (this.form.solution) {
              this.form.solution = JSON.parse(this.form.solution);
            }
          }
          return;
        })
        .catch((err) => {
          return err
        });
    },
    async handleEdit() {
      this.submitLoading = true;
      let that = this;
      setTimeout(() => {
        that.submitLoading = false;
      }, 2000);
      let {form} = this;

      /*if(form.no == ''){
                this.$message({
                    message: 'Please input Project No.',
                    type: 'warning'
                });
                return;
            }*/
      if (form.name === '') {
        this.$message({
          message: 'Please enter Project Name',
          type: 'warning'
        });
        return;
      }
      if (form.client_id === '') {
        this.$message({
          message: 'Please select client',
          type: 'warning'
        });
        return;
      }
      if (form.sales_id === '') {
        this.$message({
          message: 'Please select sales',
          type: 'warning'
        });
        return;
      }
      if (form.size === '') {
        this.$message({
          message: 'Please input size',
          type: 'warning'
        });
        return;
      }
      if (!form.solution) {
        this.$message({
          message: 'Please input size',
          type: 'warning'
        });
        return;
      }
      await editFormalProject({
        id: form.id,
        project_no: form.project_no,
        name: form.name,
        client_id: form.client_id,
        sales_id: form.sales_id,
        size: form.size,
        solution: form.solution
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
          return err
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
.add-form-container {
  width: 90%;
  min-height: calc(100vh - 196px);

  /* stylelint-disable-next-line selector-class-pattern */
  :deep(.el-form-item__label) {
    text-align: left;
  }

  /* stylelint-disable-next-line selector-class-pattern */
  :deep(.el-input-number--small) {
    width: 215px;
  }
}
</style>
