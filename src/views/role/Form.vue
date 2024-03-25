<template>
  <div class="page-container">
    <Card class="card-templete card-gap">
      <template #cardHeader>
        <span class="iconfont icon-jiaose card-icon" />
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
                size="small"
              />
            </el-form-item>
            <el-form-item label="Limits">
              <div 
                v-for="(item, key) in tableData"
                :key="key"
                class="limits-row-wrapper"
              >
                <div class="header-wrapper">
                  <div class="title">
                    <i class="el-icon-paperclip" />
                    {{ item.title?item.title:'未填写' }}
                  </div>
                  <div class="name">
                    {{ item.name }}
                  </div>
                </div>
                <div class="content-wrapper">
                  <el-checkbox
                    v-for="(childItem, childKey) in item.feature"
                    :key="childKey"
                    v-model="childItem.checked"
                    class="collapse-label"
                  >
                    <span v-if="childItem.title">
                      {{ childItem.title }}
                      -
                    </span>
                    {{ childItem.name }}
                  </el-checkbox>
                </div>
              </div>
              <!--<el-collapse accordion>
                <el-collapse-item
                  v-for="(item, key) in tableData"
                  :key="key"
                >
                  <template slot="title">
                    {{ item.title }}
                    <span style="margin-left: 30px">{{ item.name }}</span>
                  </template>
                  <el-checkbox
                    v-for="(childItem, childKey) in item.feature"
                    :key="childKey"
                    v-model="childItem.checked"
                    class="collapse-label"
                  >
                    <span v-if="childItem.title !== ''">
                      {{ childItem.title }}
                      -
                    </span>
                    {{ childItem.name }}
                  </el-checkbox>
                </el-collapse-item>
              </el-collapse>-->
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
import { roleAdd, roleDetail, roleEdit, roleLimitsList } from '@/api/index.js';
export default {
  name: '',
  components: {
    Card
  },
  data() {
    return {
      cardTitle: '',
      formMode: '',
      form: {
        name: ''
      },
      tableData: [],
      rules: {
        name: [
          { required: true, message: 'Please input name', trigger: 'blur' }
        ]
      },
      limitsArr: []
    };
  },
  created() {
    const params = this.$route.query;
    this.formMode = params.mode;
    switch (params.mode) {
      case 'add':
        this.cardTitle = 'New role';
        this.getLimitsList();
        break;
      case 'edit':
        this.cardTitle = 'Edit role';
        this.getRoleDetail(params.id);
        break;
      default:
        break;
    }
  },
  methods: {
    handleBack() {
      this.$router.go(-1);
    },
    async getLimitsList() {
      await roleLimitsList()
        .then((res) => {
          if (res.code === 200) {
            let {data} = res;
            this.defaultTableData(data);
          }
          return;
        })
        .catch((err) => {
          return err
        });
    },
    defaultTableData(data) {
      let output = [];
      let {limitsArr} = this;
      for (let i = 0; i < data.length; i++) {
        let item = data[i];
        let {feature} = item;
        for (let j = 0; j < feature.length; j++) {
          feature[j]['checked'] = false;
          if (this.formMode === 'edit') {
            let id = String(feature[j]['id']);
            let isHas = limitsArr.indexOf(id);
            if (isHas >= 0) {
              feature[j]['checked'] = true;
            }
          }
          if (j === feature.length - 1) {
            data[i]['feature'] = feature;
            output.push(data[i]);
          }
        }
        if (i === data.length - 1) {
          this.tableData = output;
        }
      }
    },
    async handleAdd() {
      let {form} = this;
      if (form.name === '') {
        this.$message({
          message: 'Please fill in all the required fields',
          type: 'warning'
        });
        return;
      }
      form['limits'] = this.tableData;
      await roleAdd(form)
        .then((res) => {
          if (res.code === 200) {
            this.$message({
              message: 'Done',
              type: 'success'
            });
            this.$router.go(-1);
          }
          return;
        })
        .catch((err) => {
          // this.$message.error(err);
          return err
        });
    },
    async getRoleDetail(id) {
      await roleDetail(id)
        .then((res) => {
          if (res.code === 200) {
            let {data} = res;
            this.form = data;
            if (data.limits && data.limits !== '') {
              let limitsParams = data.limits;
              let limitsArr = limitsParams.split(',');
              this.limitsArr = limitsArr;
              this.getLimitsList();
            }
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
      if (form.name === '') {
        this.$message({
          message: 'Please fill in all the required fields',
          type: 'warning'
        });
        return;
      }
      form['limits'] = this.tableData;
      await roleEdit(form)
        .then((res) => {
          if (res.code === 200) {
            this.$message({
              message: 'Done',
              type: 'success'
            });
            this.$router.go(-1);
          } else {
            this.$message.error(res.message);
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

  .collapse-label { 
    min-width: 20%;
    margin-bottom: 5px;
  }
  .limits-row-wrapper{
    border: 1px solid #EEEEEE;
    margin-bottom:16px;
    border-radius:4px;
    .header-wrapper{
      display: flex;
      align-items: center;
      height: 32px;
      background: #F4F5F9;
      border-radius: 4px 4px 0px 0px;
      border-bottom: 1px solid #EEEEEE;
    }
    .title{
      color:#303133;
      font-size: 14px;
      font-weight: 550;
      margin-left:24px;
    }
    .name{
      font-size: 13px;
      margin-left:15px;
      color:#606266;
    }
    .content-wrapper{
      margin: 0px 24px 0px 24px;
      padding:16px 0px 16px 0px;
    }
  }
}
</style>
