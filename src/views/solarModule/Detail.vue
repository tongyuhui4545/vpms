<template>
  <div>
    <Card class="card-gap card-min">
      <template #cardHeader>
        <span class="iconfont icon-kaiguan card-icon" />
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
          <!--solar参数显示-->
          <div
            v-for="(item, key) in solarParams"
            :key="key"
            :class="item.subset ? 'form-item-subset' : 'form-item-wrapper'"
          >
            <!--存在子集时-->
            <div
              v-if="item.subset"
              class="form-item"
            >
              <div class="form-divider">
                <el-divider content-position="left">
                  {{ item.en }}
                </el-divider>
              </div>
              <div class="form-child-wrapper">
                <div
                  v-for="(childItem, childKey) in item.content"
                  :key="`child-${childKey}`"
                  class="form-child-item"
                >
                  <div class="form-label-wrapper">
                    <div
                      v-if="childItem.required"
                      class="form-dat"
                    >
                      *
                    </div>
                    <div class="form-label">
                      {{ childItem.en }}
                    </div>
                  </div>
                  <div class="form-content">
                    <div class="form-value">
                      {{ solarForm[childItem.id] }}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <!--不存在子集时-->
            <div
              v-else
              class="form-item"
            >
              <div class="form-label-wrapper">
                <div
                  v-if="item.required"
                  class="form-dat"
                >
                  *
                </div>
                <div class="form-label">
                  {{ item.en }}
                </div>
              </div>
              <div class="form-content">
                <div class="form-value">
                  {{ solarForm[item.id] }}
                </div>
              </div>
            </div>
          </div>
          <div style="clear: both" />
        </div>
      </template>
    </Card>
  </div>
</template>

<script>
import ports from '@/utils/ports/ports.js';
import Card from '@/components/Card.vue';
import { solarDetail } from '@/api/index.js';
export default {
  name: '',
  components: {
    Card
  },
  data() {
    return {
      cardTitle: 'Solar module detail',
      sloarOptions: {},
      activeSolar: null,
      solarParams: [],
      solarForm: {},
      moduleTypeOptions: [
        {
          value: 0,
          label: 'c-Si (Crystalline Silicon)'
        },
        {
          value: 1,
          label: 'Thin Film'
        }
      ]
    };
  },
  mounted() {
    this.solarParams = ports.solar;
    this.getDetail();
  },
  methods: {
    handleBack() {
      this.$router.go(-1);
    },
    async getDetail() {
      const {id} = this.$route.params;
      await solarDetail(id)
        .then((res) => {
          if (res.code === 200) {
            this.solarForm = res.data;
            this.solarForm.is_bifacial =
              this.solarForm.is_bifacial === 1 ? 'Yes' : 'N/A';
          }
          return;
        })
        .catch((err) => {
          return err
        });
    }
  }
};
</script>

<style lang="less" scoped>
.form-container {
  margin: 20px 0;

  .form-item-wrapper {
    width: 25%;
    float: left;
  }

  .form-item-subset {
    clear: both;
  }

  .form-item {
    margin-bottom: 10px;

    .form-label-wrapper {
      display: flex;
      align-items: center;
    }

    .form-dat {
      font-size: 13px;
      color: #f56c6c;
      margin-right: 4px;
    }

    .form-label {
      flex: 1;
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
        border: solid #e4e7ed 1px;
        color: #c0c4cc;
        height: 32px;
        line-height: 32px;
        padding-left: 10px;
        border-radius: 4px;
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
</style>
