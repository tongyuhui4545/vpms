<template>
  <div class="page-container">
    <Card class="card-templete card-gap">
      <template #cardHeader>
        <span class="iconfont icon-quanxian card-icon" />
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
            label-width="80px"
          >
            <el-form-item
              label="Title"
              prop="title"
            >
              <el-input
                v-model="form.title"
                placeholder="Please input the title"
                size="small"
              />
            </el-form-item>
            <el-form-item
              label="Keyword"
              prop="name"
            >
              <el-input
                v-model="form.name"
                placeholder="Please input the keyword"
                size="small"
              />
            </el-form-item>
            <el-form-item
              label="Page path"
              prop="path"
            >
              <el-input
                v-model="form.path"
                placeholder="Please input the path"
                size="small"
              />
            </el-form-item>
            <el-form-item
              label="Feature"
              prop="feature"
            >
              <div
                v-for="(item, index) in form.feature"
                :key="`feature-${index}`"
                class="form-item"
              >
                <el-input
                  v-model="item.name"
                  placeholder="Please input feature"
                  size="small"
                  style="width: 300px"
                />
                <span class="form-remark">
                  中文备注：
                </span>
                <el-input
                  v-model="item.title"
                  placeholder="Please input remark"
                  size="small"
                  style="width: 300px"
                />
                <div class="feature-btn">
                  <i
                    v-if="index == 0"
                    class="el-icon-circle-plus-outline icon add animate"
                    @click="handleAddFeature"
                  />
                  <i
                    v-if="index != 0"
                    class="el-icon-delete icon delete animate"
                    @click="handleDeleteFeature(index)"
                  />
                </div>
              </div>
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
import { limitsAdd, limitsDetail, limitsEdit } from '@/api/index.js';
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
        title: '',
        name: '',
        path: '',
        feature: []
      },
      rules: {
        title: [
          {
            required: true,
            message: 'Please input page title',
            trigger: 'blur'
          }
        ],
        name: [
          { required: true, message: 'Please input page name', trigger: 'blur' }
        ],
        feature: [
          { required: true, message: 'Please input feature', trigger: 'blur' }
        ]
      }
    };
  },
  mounted() {
    const params = this.$route.query;
    this.formMode = params.mode;
    switch (params.mode) {
      case 'add':
        this.cardTitle = 'New catalog';
        this.featureInit();
        break;
      case 'edit':
        this.cardTitle = 'Edit catalog';
        this.getLimitsDetail(params.id);
        break;
      default:
        break;
    }
  },
  methods: {
    handleBack() {
      this.$router.go(-1);
    },
    featureInit() {
      this.form.feature = [
        {
          name: ''
        }
      ];
    },
    handleAddFeature() {
      let row = {
        title: '',
        name: ''
      };
      this.form.feature.push(row);
    },
    handleDeleteFeature(index) {
      this.form.feature.splice(index, 1);
    },
    async handleAdd() {
      let { form } = this;
      if (form.title === '' || form.name === '' || form.path === '') {
        this.$message({
          message: 'Please fill in all the required fields',
          type: 'warning'
        });
        return;
      }
      await limitsAdd(form)
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
          this.$message.error(err);
        });
    },
    async getLimitsDetail(id) {
      await limitsDetail(id)
        .then((res) => {
          if (res.code === 200) {
            let { data } = res;
            this.form = {
              id: data.id,
              title: data.title,
              name: data.name,
              path: data.path,
              feature: data.feature
            };
          }
          return;
        })
        .catch((err) => {
          this.$message.error(err);
        });
    },
    async handleEdit() {
      let { form } = this;
      if (form.title === '' || form.name === '' || form.path === '') {
        this.$message({
          message: 'Please fill in all the required fields',
          type: 'warning'
        });
        return;
      }
      await limitsEdit(form)
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
          this.$message.error(err);
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
  :deep(.el-form-item__label) {
    text-align: left;
  }
  .form-item {
    display: flex;
    align-items: center;
    .feature-btn {
      .icon {
        margin-left: 30px;
        font-size: 16px;
      }
      .add:hover {
        cursor: pointer;
        color: #409eff;
      }
      .delete:hover {
        cursor: pointer;
        color: #f56c6c;
      }
    }
  }
  .form-remark{
    margin-left:30px;
    font-size: 14px;
    color:#606266;
  }
  .form-submit-btn{
    margin-left:80px;
  }
}
</style>
