<template>
  <div class="page-container">
    <Card class="card-templete card-gap">
      <template #cardHeader>
        <span class="iconfont icon-chajiancanshupeizhi card-icon" />
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
        <div class="ports-mode-wrapper">
          <div class="parts-mode">
            <div class="title">
              Solar Module
            </div>
            <!--选中的Solar-->
            <el-select
              v-model="activeSolar"
              placeholder="Please input and select"
              size="small"
              disabled
              @change="changeSolar"
            >
              <el-option
                v-for="item in solarOptions"
                :key="item.id"
                :label="`Solar Module ${item.id}`"
                :value="item.id"
              />
            </el-select>
            <div />
          </div>
          <div class="parts-mode">
            <div class="title">
              Racking/Tracker
            </div>
            <!--选中的tracker-->
            <el-select
              v-model="activeTracker"
              placeholder="Please input and select"
              size="small"
              disabled
              @change="changeTracker"
            >
              <el-option
                v-for="item in trackerOptions"
                :key="item.id"
                :label="`Solar Module ${item.id}`"
                :value="item.id"
              />
            </el-select>
          </div>
          <div
            class="card-btn animate mode-btn"
            @click="viewMore"
          >
            View More
          </div>
        </div>
        <!--solar与tracker参数,view more可查看-->
        <div v-show="isMore">
          <div class="form-container">
            <div class="form-title">
              Solar Module
            </div>
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
          <div class="form-container">
            <div class="form-title">
              Racking/Tracker
            </div>
            <div
              v-for="(item, key) in trackerParams"
              :key="key"
              :class="item.subset ? 'form-item-subset' : 'form-item-wrapper'"
            >
              <div class="form-item">
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
                    {{ trackerForm[item.id] }}
                  </div>
                </div>
              </div>
            </div>
            <div style="clear: both" />
          </div>
        </div>
        <!--综合参数的表单-->
        <div class="form-container">
          <div class="form-title">
            Site Info
          </div>
          <div
            v-for="(item, key) in combinationParams"
            :key="key"
            :class="item.subset ? 'form-item-subset' : 'form-item-wrapper'"
          >
            <div class="form-item">
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
                  {{ combinationParams[item.id] }}
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
import Card from '@/components/Card.vue';
import { solarList } from '@/api/index.js';
export default {
  name: '',
  components: {
    Card
  },
  props: {
    activeStatus: {
      type: String,
      default: ''
    },
    row: {
      type: Object,
      default: () => {
        return {};
      }
    }
  },
  data() {
    return {
      cardTitle: 'New Integrated Data',
      isMore: false,

      /**solar */
      activeSolar: null,
      solarOptions: [],
      solarParams: [],
      solarForm: {},

      /**tracker */
      activeTracker: null,
      trackerParams: [],
      trackerForm: {},

      /**combination */
      combinationParams: [],
      trackerOptions: [],
      combinationForm: {
        module_to_module_spacing: '',
        bha_gap_extender: '',
        motor_gap_extender: '',
        of_modules_per_string: '',
        row_to_row_spacing: '',
        modules_per_tracker: '',
        maximum_current_factor: '',
        overload_protection_factor: '',
        maximum_overload_protection_current: '',
        module_connection: '',
        module_orientation: '0',
        cbx_outlet_length: '',
        cbx_height: '',
        distance_from_cbx_to_row_head: '',
        cab_height: '',
        trench_depth: ''
      }
    };
  },
  mounted() {
    this.getTableData();
  },
  methods: {
    handleBack() {
      this.$router.go(-1);
    },

    /**获取太阳能面板的列表数据 */
    async getTableData() {
      this.tableLoading = true;
      await solarList()
        .then((res) => {
          if (res.code === 200) {
            this.solarOptions = res.data.data;
          }
          return;
        })
        .catch((err) => {
          return err;
        });
    },

    /**选择改变太阳能列表 */
    changeSolar(params) {
      const { solarOptions } = this;
      for (let i = 0; i < solarOptions.length; i++) {
        const item = solarOptions[i];
        if (item.id === params) {
          this.solarForm = item;
        }
      }
    },

    /**选择改变连接器 */
    changeTracker() {
      return;
    },

    /**查看solar与tracker的具体参数 */
    viewMore() {
      this.isMore = !this.isMore;
    }
  }
};
</script>

<style lang="less" scoped>
.ports-mode-wrapper {
  display: flex;
  align-items: center;
  position: relative;

  .parts-mode {
    display: flex;
    align-items: center;
    margin-right: 20px;

    .title {
      font-size: 14px;
      color: #606266;
      margin-right: 10px;
    }
  }

  .mode-btn {
    position: absolute;
    right: 0;
  }
}

.form-container {
  margin: 20px 0;

  .form-title {
    font-size: 14;
    font-weight: 600;
    margin-bottom: 10px;
    color: #606266;
  }

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
      height: 32px;
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
</style>
