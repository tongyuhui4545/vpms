<template>
  <div v-loading="submitLoading">
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
              prop="description"
            >
              <el-input
                v-model="form.description"
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
            <!--<el-form-item label="Contact" prop="contact_id">
                            <el-select v-model="form.contact_id" placeholder="Please select" size="small">
                                <el-option v-for="(item,key) in personnelOptions" 
                                :key="key" :label="item.name" :value="item.id"></el-option>
                            </el-select>
                        </el-form-item>-->
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
            <el-form-item
              label="Address"
              prop="address"
            >
              <el-input
                v-model="form.address"
                size="small"
                placeholder="Please enter the address"
              />
            </el-form-item>
            <el-form-item
              label="City"
              prop="city"
            >
              <el-input
                v-model="form.city"
                size="small"
                placeholder="Please enter the city"
              />
            </el-form-item>
            <el-form-item
              label="County"
              prop="county"
            >
              <el-input
                v-model="form.county"
                size="small"
                placeholder="Please enter the county"
              />
            </el-form-item>
            <el-form-item
              label="State"
              prop="state"
            >
              <el-input
                v-model="form.state"
                size="small"
                placeholder="Please enter the state"
              />
            </el-form-item>
            <el-form-item
              label="Zipcode"
              prop="zipcode"
            >
              <el-input
                v-model="form.zipcode"
                size="small"
                placeholder="Please enter the zipcode"
              />
            </el-form-item>
            <!-- ----------- -->
            <el-form-item label="Comment">
              <el-input
                v-model="form.remark"
                type="textarea"
                :rows="5"
              />
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
  projectDetail,
  customerAll,
  salesList,
  addProject,
  editProject
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
        // project_no: '',
        description: '',
        client_id: '',
        contact_id: 1,
        sales_id: '',
        us_engineer_id: '1',
        cn_engineer_id: '1',
        cn_engineer_team_id: '1',
        size: undefined,
        address: '',
        city: '',
        county: '',
        state: '',
        zipcode: '',
        remark: '',
        creation_id: '',
        creation_name: '',
        sales_status: 1
      },
      rules: {
        project_no: [
          //{ required: true, message: 'Please input', trigger: 'blur' },
          //{ pattern: /^[A-Za-z0-9u4e00-u9fa5]+$/, message: 'Please enter the correct content' }
        ],
        description: [
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
        state: [
          {
            required: true,
            message: 'Please input the state',
            trigger: 'blur'
          }
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
        // this.projectNoInit();
        break;
      case 'edit':
        this.cardTitle = 'Edit project';
        this.getProjectDetail(params.id);
        break;
      default:
        break;
    }
  },
  methods: {
    handleBack() {
      this.$router.go(-1);
    },
    // projectNoInit() {
    //   let date = new Date();
    //   let year = String(date.getFullYear());
    //   let yearArr = [...year];
    //   let project_year = yearArr[2] + yearArr[3];
    //   this.getTotalProject(project_year);
    // },
    // async getTotalProject(project_year) {
    //   await projectsTotal()
    //     .then((res) => {
    //       if (res.code === 200) {
    //         let {data} = res;
    //         let count = data.length + 1;
    //         if (count < 10) {
    //           count = `00${count}`;
    //         }
    //         if (count < 100) {
    //           count = `0${count}`;
    //         }
    //         this.form['project_no'] = `${project_year}-${count}`;
    //       }
    //       return;
    //     })
    //     .catch((err) => {
    //       return err
    //     });
    // },
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
      // setTimeout(function () {
      //   that.submitLoading = false;
      // }, 2000);
      const {form} = this;
      let user = JSON.parse(window.localStorage.getItem('user'));
      form.creation_id = user.id;
      form.creation_name = user.name;

      /*if(form.no == ''){
                this.$message({
                    message: 'Please input Project No.',
                    type: 'warning'
                });
                return;
            }*/
      if (form.description === '') {
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
      // this.submitLoading = true;
      delete form.no;
      delete form.project_no;
      await addProject(form)
        .then((res) => {
          if (res.code === 200) {
            // this.submitLoading = false;
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
    async getProjectDetail(id) {
      await projectDetail(id)
        .then((res) => { 
          if (res.code === 200) {
            let {data} = res;
            this.form = data;
          }
          return;
        })
        .catch((err) => {
          return err
        });
    },
    async handleEdit() {
      // this.submitLoading = true;
      // setTimeout(function () {
      //   that.submitLoading = false;
      // }, 2000);
      let {form} = this;

      /*if(form.no == ''){
                this.$message({
                    message: 'Please input Project No.',
                    type: 'warning'
                });
                return;
            }*/
      if (form.description === '') {
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
      //state 必填
      if (!form.state) {
        this.$message.error('State must be entered');
        return;
      }
      //county和city至少需要填写一个
      if (!form.city && !form.county) {
        this.$message.error('Please enter a city or county');
        return;
      }
      await editProject({
        id: form.id,
        // no: this.transFormat(),
        // project_no: form.project_no,
        description: form.description,
        client_id: form.client_id,
        contact_id: form.contact_id,
        sales_id: form.sales_id,
        us_engineer_id: form.us_engineer_id,
        cn_engineer_id: form.cn_engineer_id,
        cn_engineer_team_id: form.cn_engineer_team_id,
        size: form.size,
        address: form.address,
        city: form.city,
        county: form.county,
        state: form.state,
        zipcode: form.zipcode,
        remark: form.remark
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
              return item.path === '/index/project/bidding-project';
            });
            list[0].meta.isEdit = true;
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
