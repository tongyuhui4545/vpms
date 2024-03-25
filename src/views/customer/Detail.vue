<template>
  <div class="page-container">
    <Card class="card-templete">
      <template #cardHeader>
        <span class="iconfont icon-kehu card-icon" />
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
          <div class="form-wrapper">
            <div class="form-item-wrapper">
              <div class="form-item">
                <div class="form-label">
                  No.
                </div>
                <div class="form-content">
                  <div class="form-value">
                    {{ form.client_no }}
                  </div>
                </div>
              </div>
              <div class="form-item">
                <div class="form-label">
                  Name
                </div>
                <div class="form-content">
                  <div class="form-value">
                    {{ form.name }}
                  </div>
                </div>
              </div>
              <div class="form-item">
                <div class="form-label">
                  Tel
                </div>
                <div class="form-content">
                  <div class="form-value">
                    {{ form.tel }}
                  </div>
                </div>
              </div>
              <div class="form-item">
                <div class="form-label">
                  Address
                </div>
                <div class="form-content">
                  <div class="form-value">
                    {{ form.address }}
                  </div>
                </div>
              </div>
            </div>
            <div style="clear: both" />
          </div>
        </div>
      </template>
    </Card>
  </div>
</template>

<script>
import Card from '@/components/Card.vue';
import { customerDetail } from '@/api/index.js';
export default {
  name: '',
  components: {
    Card
  },
  data() {
    return {
      cardTitle: 'Customer detail',
      form: {
        client_no: '',
        name: '',
        tel: '',
        address: ''
      }
    };
  },
  mounted() {
    this.getDetail();
  },
  methods: {
    handleBack() {
      this.$router.go(-1);
    },
    async getDetail() {
      const id = this.$route.query.clientId;
      await customerDetail(id)
        .then((res) => {
          if (res.code === 200) {
            this.form = res.data;
          } else {
            // this.$message.error(res.message);
          }
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

        .form-value {
          background-color: #f5f7fa;
          border-color: #e4e7ed;
          color: #c0c4cc;
          height: 32px;
          line-height: 32px;
          padding-left: 10px;
          border-radius: 4px;
          border: 1px solid #dcdfe6;
          font-size: 12px;
        }
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
