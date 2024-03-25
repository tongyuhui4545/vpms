<template>
  <div>
    <Card class="card-gap card-min">
      <template #cardHeader>
        <!-- <span class="iconfont icon-kaiguan card-icon"></span>  -->
        <i class="el-icon-set-up" />
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
        <!--solar的参数表单-->
        <div class="form-container">
          <el-form
            ref="ruleForm"
            :inline="true"
            :rules="rules"
            :model="solarForm"
            label-position="top"
            class="demo-form-inline"
          >
            <el-form-item
              label="Manufacturer"
              prop="mfr_id"
            >
              <!-- <el-input v-model="solarForm.manufacturer" size="small" placeholder="Please input" class="input"></el-input> -->
              <el-select
                ref="manufacturer-select"
                v-model="solarForm.mfr_id"
                filterable
                placeholder="Please input and select"
                size="small"
                clearable
                @visible-change="visibleChange"
                @change="handleOnMfrChange"
                @clear="handleMfrClear"
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
              label="Module series"
              prop="series_id"
            >
              <el-select
                ref="series-select"
                v-model="solarForm.series_id"
                filterable
                placeholder="Please input and select"
                size="small"
                clearable
                @blur="handleBlur"
                @visible-change="visibleChange"
                @change="handleSeriesSelected"
                @clear="handlleMoudleSeriesClear"
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
              label="Bifacial"
              prop="is_bifacial"
            >
              <el-select
                v-model="solarForm.is_bifacial"
                placeholder="Please select"
                class="input"
                size="small"
              >
                <el-option
                  v-for="(item, key) in bifacialOptions"
                  :key="key"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
            </el-form-item>
            <el-form-item
              label="Model"
              prop="model"
            >
              <el-input
                v-model="solarForm.model"
                size="small"
                placeholder="Please input"
                class="input"
              />
            </el-form-item>
            <el-divider content-position="left">
              Mechanical parameters
            </el-divider>
            <el-form-item label="Cell type">
              <el-input
                v-model="solarForm.cell_orientation"
                size="small"
                placeholder="Please input"
                class="input"
              />
            </el-form-item>
            <el-form-item
              label="Junction box location"
              prop="junction_box_location"
            >
              <el-input
                v-model="solarForm.junction_box_location"
                size="small"
                placeholder="Please input"
                class="input"
              />
            </el-form-item>
            <el-form-item
              label="Connector"
              prop="connector"
            >
              <el-input
                v-model="solarForm.connector"
                size="small"
                placeholder="Please input"
                class="input"
              />
            </el-form-item>
            <el-form-item
              label="Fuse rating (A)"
              prop="fuse_rating"
            >
              <el-input
                v-model="solarForm.fuse_rating"
                size="small"
                placeholder="Please input"
                class="input"
              />
            </el-form-item>
            <el-form-item
              label="Output cable-positive (mm)"
              prop="output_cable_pos"
            >
              <el-input
                v-model="solarForm.output_cable_pos"
                size="small"
                placeholder="Please input"
                class="input"
              />
            </el-form-item>
            <el-form-item
              label="Output cable-negative (mm)"
              prop="output_cable_neg"
            >
              <el-input
                v-model="solarForm.output_cable_neg"
                size="small"
                placeholder="Please input"
                class="input"
              />
            </el-form-item>
            <el-form-item label="Glass">
              <el-input
                v-model="solarForm.glass"
                size="small"
                placeholder="Please input"
                class="input"
              />
            </el-form-item>
            <el-form-item label="Frame">
              <el-input
                v-model="solarForm.frame"
                size="small"
                placeholder="Please input"
                class="input"
              />
            </el-form-item>
            <el-form-item
              label="Weight(kg)"
              prop="weight"
            >
              <el-input
                v-model="solarForm.weight"
                size="small"
                :precision="2"
                placeholder="Please input"
                class="input"
              />
            </el-form-item>
            <el-form-item
              label="Width(mm)"
              prop="width"
            >
              <el-input
                v-model="solarForm.width"
                size="small"
                :min="0"
                placeholder="Please input"
                class="input"
              />
            </el-form-item>
            <el-form-item
              label="Height(ft)"
              prop="height"
            >
              <el-input
                v-model="solarForm.height"
                size="small"
                :min="0"
                placeholder="Please input"
                class="input"
              />
            </el-form-item>
            <el-form-item
              label="Thickness(mm)"
              prop="thickness"
            >
              <el-input
                v-model="solarForm.thickness"
                size="small"
                :min="0"
                placeholder="Please input"
                class="input"
              />
            </el-form-item>
            <el-divider content-position="left">
              Electrical characteristics (STC:AM1.5 1000W/m² 25℃)
            </el-divider>
            <el-form-item
              label="Maximum power (Pmax/W)"
              prop="maximum_power"
            >
              <el-input
                v-model="solarForm.maximum_power"
                size="small"
                :min="0"
                placeholder="Please input"
                class="input"
              />
            </el-form-item>
            <el-form-item
              label="Open circuit voltage (Voc/V)"
              prop="open_circuit_voltage"
            >
              <el-input
                v-model="solarForm.open_circuit_voltage"
                size="small"
                :min="0"
                :precision="2"
                placeholder="Please input"
                class="input"
              />
            </el-form-item>
            <el-form-item
              label="Short circuit current(Isc/A)"
              prop="short_circuit_current"
            >
              <el-input
                v-model="solarForm.short_circuit_current"
                size="small"
                :min="0"
                :precision="2"
                placeholder="Please input"
                class="input"
              />
            </el-form-item>
            <el-form-item
              label="Voltage at maximum power(Vmp/V)"
              prop="voltage_at_maximum_power"
            >
              <el-input
                v-model="solarForm.voltage_at_maximum_power"
                size="small"
                :min="0"
                :precision="2"
                placeholder="Please input"
                class="input"
              />
            </el-form-item>
            <el-form-item
              label="Current at maximum power(Imp/A)"
              prop="current_at_maximum_power"
            >
              <el-input
                v-model="solarForm.current_at_maximum_power"
                size="small"
                :min="0"
                :precision="2"
                placeholder="Please input"
                class="input"
              />
            </el-form-item>
            <el-form-item
              label="Module efficiency(%)"
              prop="module_efficiency"
            >
              <el-input
                v-model="solarForm.module_efficiency"
                size="small"
                :precision="2"
                :min="0"
                placeholder="Please input"
                class="input"
              />
            </el-form-item>
            <el-divider content-position="left">
              Operating parameters
            </el-divider>
            <el-form-item label="Operational temperature(℃)">
              <el-input
                v-model="solarForm.operational_temperature"
                size="small"
                placeholder="Please input"
                class="input"
              />
            </el-form-item>
            <el-form-item label="Power output tolerance(W)">
              <el-input
                v-model="solarForm.power_output_tolerance"
                size="small"
                placeholder="Please input"
                class="input"
              />
            </el-form-item>
            <el-form-item label="Voc and isc tolerance(%)">
              <el-input
                v-model="solarForm.voc_and_isc_tolerance"
                size="small"
                :min="0"
                placeholder="Please input"
                class="input"
              />
            </el-form-item>
            <el-form-item label="Maximum system voltage(V)">
              <el-input
                v-model="solarForm.maximum_system_voltage"
                size="small"
                :min="0"
                placeholder="Please input"
                class="input"
              />
            </el-form-item>
            <el-form-item
              label="Maximum configuration fuse rating"
              prop="maximum_series_fuse_rating"
            >
              <el-input
                v-model="solarForm.maximum_series_fuse_rating"
                size="small"
                :min="0"
                placeholder="Please input"
                class="input"
              />
            </el-form-item>
            <el-form-item label="Nominal operating cell temperature(℃)">
              <el-input
                v-model="solarForm.nominal_operating_cell_temperature"
                size="small"
                placeholder="Please input"
                class="input"
              />
            </el-form-item>
            <el-form-item label="Protection class">
              <el-input
                v-model="solarForm.protection_class"
                size="small"
                :min="0"
                placeholder="Please input"
                class="input"
              />
            </el-form-item>
            <el-form-item label="Fire rating">
              <el-input
                v-model="solarForm.fire_rating"
                size="small"
                :min="0"
                placeholder="Please input"
                class="input"
              />
            </el-form-item>
            <el-form-item label="Bifacial gain(%)">
              <el-input
                v-model="solarForm.bifacial_gain"
                size="small"
                :precision="2"
                :min="0"
                placeholder="Please input"
                class="input"
              />
            </el-form-item>
            <el-divider content-position="left">
              Mechanical loading
            </el-divider>
            <el-form-item label="Front Side Maximum Static Loading(Pa)">
              <el-input
                v-model="solarForm.front_side_maximum_static_loading"
                size="small"
                :min="0"
                placeholder="Please input"
                class="input"
              />
            </el-form-item>
            <el-form-item label="Rear Side Maximum Static Loading(Pa)">
              <el-input
                v-model="solarForm.rear_side_maximum_static_loading"
                size="small"
                :min="0"
                placeholder="Please input"
                class="input"
              />
            </el-form-item>
            <el-form-item label="Hailstone Test">
              <el-input
                v-model="solarForm.hailstone_test"
                size="small"
                placeholder="Please input"
                class="input"
              />
            </el-form-item>
            <el-divider content-position="left">
              Temperature ratings (STC)
            </el-divider>
            <el-form-item label="Temperature coefficient of Isc(%/℃)">
              <el-input
                v-model="solarForm.temperature_coefficient_of_isc"
                size="small"
                :precision="2"
                placeholder="Please input"
                class="input"
              />
            </el-form-item>
            <el-form-item label="Temperature coefficient of Voc(%/℃)">
              <el-input
                v-model="solarForm.temperature_coefficient_of_voc"
                size="small"
                :precision="2"
                placeholder="Please input"
                class="input"
              />
            </el-form-item>
            <el-form-item label="Temperature coefficient of Pmax(%/℃)">
              <el-input
                v-model="solarForm.temperature_coefficient_of_pmax"
                size="small"
                :precision="2"
                placeholder="Please input"
                class="input"
              />
            </el-form-item>
          </el-form>
        </div>
        <div class="form-container">
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
      </template>
    </Card>
  </div>
</template>

<script>
import Card from '@/components/Card.vue';
import {
  addSolar,
  editSolar,
  solarDetail,
  manufacturerList,
  seriesList,
  addManufacturer,
  addManufacturerSeries
} from '@/api/index.js';
export default {
  name: '',
  components: {
    Card
  },
  data() {
    return {
      addValue: '',
      dialogTitle: 'Add Manufacture',
      dialogVisible: false,
      formMode: '',
      cardTitle: 'New solar module',
      solarOptions: {},
      activeSolar: null,
      solarParams: [],
      solarForm: {
        manufacturer: '', 
        mfr_id: undefined, 
        module_type: '', 
        series_id: undefined, 
        is_bifacial: '',
        model: '',
        cell_orientation: '',
        junction_box_location: '',
        connector: '',
        fuse_rating: undefined,
        output_cable_pos: undefined,
        output_cable_neg: undefined,
        glass: '',
        frame: '',
        weight: '',
        width: undefined,
        height: undefined,
        thickness: undefined,
        maximum_power: undefined,
        open_circuit_voltage: undefined,
        short_circuit_current: undefined,
        voltage_at_maximum_power: undefined,
        current_at_maximum_power: undefined,
        module_efficiency: undefined,
        operational_temperature: '',
        power_output_tolerance: '',
        voc_and_isc_tolerance: '',
        maximum_system_voltage: '',
        maximum_series_fuse_rating: undefined,
        nominal_operating_cell_temperature: '',
        protection_class: '',
        fire_rating: '',
        bifacial_gain: '',
        front_side_maximum_static_loading: '',
        rear_side_maximum_static_loading: '',
        hailstone_test: '',
        temperature_coefficient_of_isc: '',
        temperature_coefficient_of_voc: '',
        temperature_coefficient_of_pmax: ''
      },
      manufacturerOptions: [],
      seriesOptions: [],
      connectorOptions: [],
      moduleTypeOptions: [],
      bifacialOptions: [
        {
          label: 'N/A',
          value: 0
        },
        {
          label: 'Yes',
          value: 1
        }
      ],
      rules: {
        mfr_id: [
          {
            required: true,
            message: 'Please input manufacturer',
            trigger: 'blur'
          }
        ],
        series_id: [
          {
            required: true,
            message: 'Please input module series',
            trigger: ['blur', 'submit']
          }
        ],
        is_bifacial: [
          {
            required: true,
            message: 'Please select bifacial',
            trigger: 'change'
          }
        ],
        model: [
          { required: true, message: 'Please input model', trigger: 'blur' }
        ],
        junction_box_location: [
          // { required: true, message: 'Please input junction box location', trigger: 'blur' }
        ],
        connector: [
          // { required: true, message: 'Please select connector', trigger: 'change' }
        ],
        output_cable_pos: [
          // { required: true, message: 'Please input output cable - positive', trigger: 'blur' }
        ],
        output_cable_neg: [
          // { required: true, message: 'Please input output cable - negative', trigger: 'blur' }
        ],
        weight: [
          // { required: true, message: 'Please input weight', trigger: 'blur' }
        ],
        width: [
          // { required: true, message: 'Please input width', trigger: 'blur' }
        ],
        height: [
          // { required: true, message: 'Please input height', trigger: 'blur' }
        ],
        thickness: [
          // { required: true, message: 'Please input thickness', trigger: 'blur' }
        ],
        maximum_power: [
          // { required: true, message: 'Please input maximum power (Pmax/W)', trigger: 'blur' }
        ],
        open_circuit_voltage: [
          // { required: true, message: 'Please input open circuit voltage (Voc/V)', trigger: 'blur' }
        ],
        short_circuit_current: [
          // { required: true, message: 'Please input short circuit current(Isc/A)', trigger: 'blur' }
        ],
        voltage_at_maximum_power: [
          // { required: true, message: 'Please input voltage at maximum power(Vmp/V)', trigger: 'blur' }
        ],
        current_at_maximum_power: [
          // { required: true, message: 'Please input current at maximum power(Imp/A)', trigger: 'blur' }
        ],
        module_efficiency: [
          // { required: true, message: 'Please input module efficiency(%)', trigger: 'blur' }
        ],
        maximum_series_fuse_rating: [
          // { required: true, message: 'Please input Maximum configuration fuse rating', trigger: 'blur' }
        ]
      }
    };
  },
  mounted() {
    const params = this.$route.query;
    this.formMode = params.mode;
    switch (params.mode) {
      case 'add':
        this.cardTitle = 'New solar module';
        break;
      case 'edit':
        this.cardTitle = 'Edit solar module';
        this.getSolarDetail(params.id);
        break;
      default: 
      break;
    }
    this.getManufacturers();
  },
  methods: {
    closeDialog() {
      this.addValue = '';
      this.dialogVisible = false;
    },
    handleConfirm() {
      if (this.dialogTitle === 'Add Manufacturer') {
        let params = {
          mfr_no: '',
          mfr_name: this.addValue,
          type: 1
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
            this.getManufacturers();
          });
      }
      if (this.dialogTitle === 'Add Module series') {
        let params = {
          mfr_id: this.solarForm.mfr_id,
          series: this.addValue
        };
        addManufacturerSeries(params)
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
            this.getSeriesList(this.solarForm.mfr_id);
          });
      }
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
            popper.appendChild(el);
            el.onclick = () => {
              if (ref === this.$refs['manufacturer-select']) {
                this.dialogTitle = 'Add Manufacturer';
                this.dialogVisible = true;
              }
              if (ref === this.$refs['series-select']) {
                this.dialogTitle = 'Add Module series';
                this.dialogVisible = true;
              }
            };
          }
        });
      }
    },
    handleBlur() {
      // // 获取对应的 ref 元素
      // const ref = this.$refs['series-select'];
      // // 获取 popper 元素
      // let popper = ref.$refs.popper;
      // if (popper.$el) popper = popper.$el;
      // // 找到要移除的按钮元素
      // const btnBox = popper.querySelector('.btn-box');
      // if (btnBox) {
      //     // 移除按钮元素
      //     popper.removeChild(btnBox);
      // }
    },
    //清空制造商
    handleMfrClear() {
      this.solarForm.mfr_id = undefined;
      this.solarForm.series_id = undefined;
      this.solarForm.module_type = '';
      this.seriesOptions = [];
    },
    handlleMoudleSeriesClear() {
      this.solarForm.mfr_id = undefined;
      this.solarForm.series_id = undefined;
      this.solarForm.module_type = '';
      this.seriesOptions = [];
    },
    //获取品牌列表
    getManufacturers() {
      manufacturerList({ type: 1 })
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
      this.solarForm.module_type = target.series;
    },
    handleOnMfrChange(val) {
      let target = this.manufacturerOptions.find((itm) => {return itm.id === val});
      this.solarForm.manufacturer = target.mfr_name;
      this.solarForm.series_id = undefined;
      this.seriesOptions = [];
      this.getSeriesList(val);
    },
    handleBack() {
      this.$router.go(-1);
    },
    async getSolarDetail(id) {
      await solarDetail(id)
        .then((res) => {
          if (res.code === 200) {
            this.solarForm = res.data;
            this.getSeriesList(res.data.mfr_id);
          }
          return;
        })
        .catch((err) => {
          return err
        });
    },

    /**新增太阳能列表 */
    handleAdd() {
      this.addSolar();
    },
    async addSolar() {
      await addSolar(this.solarForm)
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
    async handleEdit() {
      this.solarForm.created_at = '';
      this.solarForm.updated_at = '';
      await editSolar(this.solarForm)
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
              return item.path === '/index/solar-module/list';
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
    }
  }
};
</script>

<style lang="less" scoped>
.parts-mode {
  display: inline-block;
  margin-left: 20px;
}

.form-container {
  margin: 20px 0;

  /* stylelint-disable-next-line selector-class-pattern */
  :deep(.el-form-item__label) {
    line-height: 16px;
  }

  :deep(.el-form-item) {
    margin-bottom: 20px;
    margin-right: 20px;
  }

  /* stylelint-disable-next-line selector-class-pattern */
  :deep(.el-divider--horizontal) {
    margin: 15px 0 25px;
  }

  .input {
    min-width: 300px;
  }

  .confirm-switch {
    display: block;
  }
}
</style>
