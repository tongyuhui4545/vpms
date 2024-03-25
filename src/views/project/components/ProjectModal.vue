<template>
  <div class="dialog-container">
    <el-dialog
      :title="formTitle"
      :visible.sync="showDialog"
      width="1300px"
      :close-on-click-modal="false"
      @close="onClose"
    >
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
                  placeholder="The project number will be generated"
                  disabled
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
            <el-col :span="6">
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
            <el-col :span="6">
              <el-form-item
                label="Currency"
                prop="currency"
                label-width="80"
              >
                <el-radio-group v-model="form.currency">
                  <el-radio label="USD">
                    USD
                  </el-radio>
                  <el-radio label="CAD">
                    CAD
                  </el-radio>
                </el-radio-group>
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
                label-width="80"
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
                label-width="80"
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
                label-width="80"
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
                label-width="80"
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
                label-width="80"
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
                label-width="80"
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
      <div
        slot="footer"
        class="dialog-footer"
      >
        <el-button @click="onClose">
          Cancel
        </el-button>
        <el-button
          type="primary"
          @click="handleSubmit"
        >
          Submit
        </el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import {
  customerAll,
  salesList,
  projectsTotal,
  addProject,
  editProject
} from '@/api/index.js';
import ChosenMarkHorizontal from '@/components/marks/ChosenMarkHorizontal.vue';

export default {
  name: 'ProjectModal',
  components: { ChosenMarkHorizontal },
  props: {
    title: {
      type: String,
      default: 'New bidding'
    },
    mode: {
      type: String,
      default: 'add'
    },
    formData: {
      type: Object,
      default: () => {
        return {};
      }
    }
  },
  emits: ['refresh-updates'],
  data() {
    return {
      showDialog: false,
      form: {
        project_no: '',
        description: '',
        client_id: '',
        sales_id: '',
        size: undefined,
        currency: 'USD',
        address: '',
        city: '',
        county: '',
        zipcode: '',
        state: '',
        remark: ''
      },
      rules: {
        project_no: [
          {
            required: false
          }
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
          { required: false},
          {
            validator: (rule, value, callback) => {
              if (value === 0) {
                callback(new Error('Size cannot be 0'));
              } else {
                callback();
              }
            },
            trigger: 'blur'
          }
        ],
        state: [
          {
            required: true,
            message: 'Please input the state',
            trigger: 'blur'
          }
        ]
      },
      customerOptions: [],
      salesOptions: []
    };
  },
  computed: {
    formTitle() {
      if (this.mode === 'add') {
        return 'New bidding';
      }
      if (this.mode === 'edit') {
        return 'Edit project';
      }
      return 'add';
    }
  },
  watch: {
    formData: {
      handler(val) { 
        if(val.size === null) { 
              val.size = undefined;
            }
        this.form = val;
      }
    }
  },
  created() {
    this.getCustomerList();
    this.getSalesList();
  },
  // mounted() {
  //   if (this.mode !== 'edit') {
  //     this.projectNoInit();
  //   }
  // },
  methods: {
    setFormData(val) {
      this.form = val;
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
    resetForm() {
      this.form = {
        project_no: '',
        description: '',
        client_id: '',
        sales_id: '',
        size: undefined,
        currency: 'USD'
      };
      // this.projectNoInit();
    },
    async getSalesList() {
      await salesList()
        .then((res) => {
          if (res.code === 200) {
            this.salesOptions = res.data;
          }
          return;
        })
        .catch((err) => {
          return err;
        });
    },
    // projectNoInit() {
    //   let date = new Date();
    //   let year = String(date.getFullYear());
    //   let yearArr = [...year];
    //   let project_year = yearArr[2] + yearArr[3];
    //   this.getTotalProject(project_year);
    // },
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
    show() {
      this.showDialog = true;
    },
    onClose() {
      this.resetForm();
      this.$emit('refresh');
      this.showDialog = false;
    },
    handleSubmit() {
      this.$refs['ruleForm'].validate((valid) => {
        if (valid) {
          // 表单验证通过，执行提交操作
          //后端需要一个必传的唯一值no
          let no = new Date().getTime();
          let params = { ...this.form, no };
          delete params.no;
          delete params.project_no;
          if (this.mode === 'add') {
            addProject(params).then((res) => {
              if (res.code === 200) {
                this.$message.success('Project is successfully created');
                this.onClose();
              }
            });
          }
          if (this.mode === 'edit') {
            editProject(params).then((res) => {
              if (res.code === 200) {
                this.$message.success('edit successful');
                this.onClose();
                this.$emit('refresh-updates');
              }
            });
          }
        } 
        // else {
        //   // 表单验证失败，给出错误提示
        //   this.$message.error('Please fill in all the fields required');
        // }
      });
    }
  }
};
</script>

<style>
.el-button--primary {
  background: #007bff;
  border-radius: 4px;
  border: 1px solid #007bff;
}
</style>

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
