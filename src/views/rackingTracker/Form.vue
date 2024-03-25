<template>
  <div class="page-container">
    <Card class="card-templete">
      manufacturerOptions
      <template #cardHeader>
        <span class="iconfont icon-lianjiezhuangtai card-icon" />
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
            <el-form
              ref="ruleForm"
              :model="trackerForm"
              :rules="rules"
              label-position="top"
              class="demo-ruleForm"
              size="small"
            >
              <el-form-item
                label="Manufacturer"
                prop="mfr_id"
              >
                <el-select
                  ref="manufacturer-select"
                  v-model="trackerForm.mfr_id"
                  class="input"
                  filterable
                  clearable
                  @change="handleOnMfrChange"
                  @visible-change="visibleChange"
                  @clear="handleClear"
                >
                  <el-option
                    v-for="(item, key) in manufacturerOptions"
                    :key="key"
                    :label="item.mfr_name"
                    :value="item.id"
                  />
                </el-select>
              </el-form-item>
              <el-form-item
                label="Series"
                prop="series"
              >
                <el-select
                  ref="series-select"
                  v-model="trackerForm.series_id"
                  class="input"
                  clearable
                  filterable
                  @change="handleSeriesSelected"
                  @visible-change="visibleChange"
                >
                  <el-option
                    v-for="(item, key) in seriesOptions"
                    :key="key"
                    :label="item.series"
                    :value="item.id"
                  />
                </el-select>
              </el-form-item>
              <el-form-item
                label="BHA gap width (ft)"
                prop="bha_gap_width"
              >
                <el-input-number
                  v-model="trackerForm.bha_gap_width"
                  :min="0"
                  class="input"
                />
              </el-form-item>
              <el-form-item
                label="Motor gap width (ft)"
                prop="motor_gap_width"
              >
                <el-input-number
                  v-model="trackerForm.motor_gap_width"
                  :min="0"
                  class="input"
                />
              </el-form-item>
              <el-form-item
                label="Maximum pier Height (ft)"
                prop="maximum_pier_height"
              >
                <el-input-number
                  v-model="trackerForm.maximum_pier_height"
                  :precision="3"
                  :min="0"
                  class="input"
                />
              </el-form-item>
              <el-form-item
                label="Pile position"
                prop="pile_position"
              >
                <el-input
                  v-model="trackerForm.pile_position"
                  class="input"
                />
              </el-form-item>
              <el-form-item label=" ">
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
              </el-form-item>
            </el-form>
            <el-dialog
              :title="dialogTitle"
              :visible.sync="dialogVisible"
              width="40%"
              @close="closeDialog"
            >
              <div
                style="
                  display: flex;
                  align-items: center;
                  gap: 10px;
                  justify-content: center;
                "
              >
                <span v-if="dialogTitle == 'Add Manufacturer'">Manufacturer</span>
                <span v-else>Module series</span>
                <el-input
                  v-model="addValue"
                  placeholder="Please input"
                  style="width: 80%"
                  size="mini"
                />
              </div>
              <template slot="footer">
                <div
                  style="
                    display: flex;
                    align-items: center;
                    justify-content: flex-end;
                  "
                >
                  <el-button
                    style="color: #007bff; border: 1px solid #007bff"
                    @click="closeDialog"
                  >
                    Cancel
                  </el-button>
                  <el-button
                    type="primary"
                    @click="handleConfirm"
                  >
                    Confirm
                  </el-button>
                </div>
              </template>
            </el-dialog>
          </div>
        </div>
      </template>
    </Card>
  </div>
</template>

<script>
import Card from '@/components/Card.vue';
import {
  trackerAdd,
  trackerDetail,
  editTracker,
  manufacturerList,
  seriesList,
  addManufacturer
} from '@/api/index.js';
export default {
  name: '',
  components: {
    Card
  },
  data() {
    return {
      dialogTitle: '',
      addValue: '',
      dialogVisible: false,
      cardTitle: 'New Racking/Tracker',
      formMode: '',
      manufacturerOptions: [],
      seriesOptions: [],
      trackerForm: {
        manufacturer: '', 
        mfr_id: undefined, 
        series: '', 
        series_id: undefined,
        bha_gap_width: undefined,
        motor_gap_width: undefined,
        maximum_pier_height: undefined,
        pile_position: ''
      },
      rules: {
        mfr_id: [
          {
            required: true,
            message: 'Please select manufacturer',
            trigger: 'change'
          }
        ],
        series: [
          { required: true, message: 'Please input series', trigger: 'blur' }
        ],
        bha_gap_width: [
          {
            required: true,
            message: 'Please input BHA gap width (ft)',
            trigger: 'blur'
          },
          {
            validator(rule, value, callback) {
              if (Number.isInteger(Number(value)) && Number(value) > 0) {
                callback();
              } else {
                callback(
                  new Error('Please enter a positive number greater than 1')
                );
              }
            },
            trigger: 'blur'
          }
        ],
        motor_gap_width: [
          {
            required: true,
            message: 'Please input motor gap width (ft)',
            trigger: 'blur'
          },
          {
            validator(rule, value, callback) {
              if (Number.isInteger(Number(value)) && Number(value) > 0) {
                callback();
              } else {
                callback(
                  new Error('Please enter a positive number greater than 1')
                );
              }
            },
            trigger: 'blur'
          }
        ],
        maximum_pier_height: [
          {
            required: true,
            message: 'Please input maximum pier height (ft)',
            trigger: 'blur'
          },
          {
            validator(rule, value, callback) {
              if (Number.isInteger(Number(value)) && Number(value) > 0) {
                callback();
              } else {
                callback(
                  new Error('Please enter a positive number greater than 1')
                );
              }
            },
            trigger: 'blur'
          }
        ],
        pile_position: [
          {
            required: true,
            message: 'Please input pile position',
            trigger: 'blur'
          }
        ]
      }
    };
  },
  mounted() {
    let params = this.$route.query;
    this.formMode = params.mode;
    switch (params.mode) {
      case 'add':
        this.cardTitle = 'New Racking/Tracker';
        break;
      case 'edit':
        this.cardTitle = 'Edit Racking/Tracker';
        this.getDetail(params.id);
        break;
      default:
        break;
    }
    this.getManufacturers();
  },
  methods: {
    handleConfirm() {
      let params = {
        mfr_no: '',
        mfr_name: this.addValue,
        type: 2
      };
      addManufacturer(params)
        .then((res) => {
          if (res.code === 200) {
            this.$message.success('Manufacturer added');
          }
        })
        .catch((err) => {
          return err
        })
        .finally(() => {
          this.dialogVisible = false;
          this.addValue = '';
        });
    },
    closeDialog() {
      this.addValue = '';
      this.dialogVisible = false;
    },
    visibleChange(visible) {
      if (visible) {
        let refArr = ['manufacturer-select', 'series-select'];
        refArr.forEach((v) => {
          const ref = this.$refs[v];
          let {popper} = ref.$refs;
          if (popper.$el) {popper = popper.$el;}
          if (
            !Array.from(popper.children).some((v) => {return v.className === 'btn-box'})
          ) {
            const el = document.createElement('div');
            el.className = 'btn-box';
            el.innerHTML = `<a class="btn" style="font-size:16px;display:block;line-height:38px;text-align:center; cursor: pointer; color:#007BFF; border: 1px solid #007BFF; border-radius: 0 0 4px 4px" >
                            <i class="el-icon-plus"></i>Add
                          </a>`;
            if (ref.options.length > 0) {
              popper.appendChild(el);
            }
            el.onclick = () => {
              if (ref === this.$refs['manufacturer-select']) {
                this.dialogTitle = 'Add Manufacture';
                this.dialogVisible = true;
              }
              if (ref === this.$refs['series-select']) {
                this.dialogTitle = 'Add Module series';
                this.dialogVisible = true;
              }
            };
          } else {
            if (ref === this.$refs['series-select']) {
              if (ref.options.length === 0) {
                popper.removeChild(popper.querySelector('.btn-box'));
              }
            }
          }
        });
      }
    },
    //获取品牌列表
    getManufacturers() {
      manufacturerList({ type: 2 })
        .then((res) => {
          if (res.code === 200) {
            this.manufacturerOptions = res.data;
          }
          return;
        })
        .catch((err) => {
          return err
        });
    },
    handleClear() {
      this.trackerForm.manufacturer = '';
      this.trackerForm.mfr_id = '';
      this.trackerForm.series_id = '';
      this.trackerForm.series = '';
      this.seriesOptions = [];
    },
    //获取系列列表
    getSeriesList(val) {
      seriesList({ mfr_id: val })
        .then((res) => {
          if (res.code === 200) {
            this.seriesOptions = res.data;
          }
          return;
        })
        .catch((err) => {
          return err
        });
    },
    handleSeriesSelected(val) {
      let target = this.seriesOptions.find((itm) => {return itm.id === val});
      this.trackerForm.series = target.series;
    },
    handleOnMfrChange(val) {
      let target = this.manufacturerOptions.find((itm) => {return itm.id === val});
      this.trackerForm.manufacturer = target.mfr_name;
      this.seriesOptions = [];
      this.trackerForm.series_id = undefined;
      this.getSeriesList(val);
    },
    handleBack() {
      this.$router.go(-1);
    },
    async getDetail(id) {
      await trackerDetail(id)
        .then((res) => {
          if (res.code === 200) {
            this.trackerForm = res.data;
            //编辑的时候，根据manufacturer来获取series
            this.getSeriesList(this.trackerForm.mfr_id);
          } else {
            // this.$message.error(res.message);
          }
          return;
        })
        .catch((err) => {
          return err
        });
    },
    handleAdd() {
      this.$refs['ruleForm'].validate((valid) => {
        if (valid) {
          if (!this.trackerForm.mfr_id || !this.trackerForm.series_id) {
            this.$message.error('Please fill in all the required fields');
            return false;
          }
          this.requestAdd();
        } else {
          return false;
        }
      });
    },
    async requestAdd() {
      await trackerAdd(this.trackerForm)
        .then((res) => {
          if (res.code === 200) {
            this.fullscreenLoading = false;
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
    async handleEdit() {
      this.trackerForm.created_at = '';
      this.trackerForm.updated_at = '';
      this.fullscreenLoading = true;
      await editTracker(this.trackerForm)
        .then((res) => {
          if (res.code === 200) {
            this.fullscreenLoading = false;
            this.$message({
              message: 'Done',
              type: 'success'
            });
            this.$router.go(-1);
            let index = this.$router.options.routes.filter((item) => {
              return item.path === '/index';
            });
            let list = index[0].children.filter((item) => {
              return item.path === '/index/racking-tracker/list';
            });
            list[0].meta.isEdit = true;
          } else {
            this.fullscreenLoading = false;
            // this.$message.error(res.message);
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
.page-container {
  min-height: calc(100vh - 90px);
  display: flex;
  flex-direction: column;

  .card-templete {
    flex: 1;
  }
}

.form-wrapper {
  width: 90%;
  margin: 20px 0;

  .input {
    width: 300px;
  }
}
</style>
