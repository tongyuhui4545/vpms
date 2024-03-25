<template>
  <div class="new-bidding-project-form-container">
    <el-form
      ref="ruleForm"
      :model="form"
      :rules="rules"
    >
      <!-- 第一行的内容 -->
      <el-row>
        <el-col :span="12">
          <el-form-item
            label="Project No."
            prop="project_no"
          >
            <el-input
              v-model="form.project_no"
              style="width: 515px"
            />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item
            label="Project name"
            prop="description"
          >
            <el-input
              v-model="form.description"
              style="width: 515px"
            />
          </el-form-item>
        </el-col>
        <!-- </el-form> -->
      </el-row>
      <!-- ************************** -->
      <!-- 第二行的内容 -->
      <el-row>
        <el-col :span="6">
          <el-form-item
            label="Customer"
            prop="client_id"
          >
            <el-select
              v-model="form.client_id"
              filterable
              placeholder="Please input and select"
            >
              <el-option
                v-for="(item, key) in customerOptions"
                :key="key"
                :label="item.name"
                :value="item.id"
              />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item
            label="Sales"
            prop="sales_id"
            style="margin-right: 10px"
          >
            <el-select
              v-model="form.sales_id"
              placeholder="Please input and select"
              filterable
            >
              <el-option
                v-for="(item, key) in salesOptions"
                :key="key"
                :label="item.name"
                :value="item.id"
              />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item
            label="Size DC(MV)"
            prop="size"
          >
            <el-input-number
              v-model="form.size"
              :min="0"
              :precision="2"
            />
          </el-form-item>
        </el-col>
        <!-- </el-form> -->
      </el-row>
      <!-- ************************** -->
      <!-- 第三行的内容 -->
      <el-row>
        <div class="address-title">
          <ChosenMarkHorizontal
            :height="24"
            :width="8"
          />
          <span>Address</span>
        </div>
      </el-row>
      <el-row>
        <el-col :span="6">
          <el-form-item
            label="Address"
            label-width="auto"
            prop="address"
          >
            <el-input
              v-model="form.address"
              style="width: 290px"
              placeholder="Please enter the address"
            />
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item
            label="City"
            label-width="auto"
            prop="city"
          >
            <el-input
              v-model="form.city"
              style="width: 290px"
              placeholder="Please enter the city"
            />
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item
            label="County"
            label-width="auto"
            prop="county"
          >
            <el-input
              v-model="form.county"
              style="width: 290px"
              placeholder="Please enter the county"
            />
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item
            label="State"
            label-width="auto"
            prop="state"
          >
            <el-input
              v-model="form.state"
              style="width: 290px"
              placeholder="Please enter the state"
            />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="6">
          <el-form-item
            label="Zipcode"
            label-width="auto"
            prop="zipcode"
          >
            <el-input
              v-model="form.zipcode"
              style="width: 290px"
            />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="6">
          <el-form-item
            label="Comment"
            label-width="auto"
          >
            <el-input
              v-model="form.remark"
              type="textarea"
              :rows="5"
              style="width: 1232px"
            />
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
  </div>
</template>

<script>
import {
  projectsTotal,
  projectDetail,
  customerAll,
  salesList,
  addProject,
  editProject
} from '@/api/index.js';
import ChosenMarkHorizontal from '@/components/marks/ChosenMarkHorizontal.vue';

export default {
  name: '',
  components: {
    ChosenMarkHorizontal
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
        project_no: '',
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
          {
            required: true,
            message: 'Please input project No.',
            trigger: 'blur'
          }
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
    this.projectNoInit();
  },
  methods: {
    handleBack() {
      this.$router.go(-1);
    },
    resetForm() {
      this.form = {
        project_no: '',
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
      };
      this.projectNoInit();
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
            let { data } = res;
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
          return err;
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
          return err;
        });
    },
    async getSalesList() {
      await salesList()
        .then((res) => {
          let { user } = this;
          if (res.code === 200) {
            if (user.role === 'Sales') {
              this.salesOptions = res.data.filter((item) => {
                return item.id === user.id;
              });
            } else {
              this.salesOptions = res.data;
            }
          } else {
            // this.$message.error(res.message);
          }
          return;
        })
        .catch((err) => {
          return err;
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
      //   let that = this;
      // setTimeout(function () {
      //   that.submitLoading = false;
      // }, 2000);
      const { form } = this;
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
            this.$emit('add-success');
          } else {
            // this.$message.error(res.message);
          }
          return;
        })
        .catch((err) => {
          return err;
        });
    },

    /**编辑 */
    async getProjectDetail(id) {
      await projectDetail(id)
        .then((res) => {
          if (res.code === 200) {
            let { data } = res;
            this.form = data;
          }
          return;
        })
        .catch((err) => {
          return err;
        });
    },
    async handleEdit() {
      // this.submitLoading = true;
      //   let that = this;
      // setTimeout(function () {
      //   that.submitLoading = false;
      // }, 2000);
      let { form } = this;

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
        no: this.transFormat(),
        project_no: form.project_no,
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
.new-bidding-project-form-container {
  .address-title {
    display: flex;
    align-items: center;
    font-size: 14px;
    color: #333;
    font-weight: 500;
    gap: 8px;
  }
}
</style>
