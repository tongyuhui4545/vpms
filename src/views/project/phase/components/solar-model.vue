<template>
  <div class="solar-detail-container">
    <div class="header-container">
      <div class="row">
        <div class="label">
          Manufacturer :
        </div>
        <div class="value">
          {{ solarModel.manufacturer }}
        </div>
      </div>
      <div class="row">
        <div class="label">
          Module series :
        </div>
        <div class="value">
          {{ solarModel.module_type }}
        </div>
      </div>
      <div class="row">
        <div class="label">
          Bifacial :
        </div>
        <div class="value">
          {{ solarModel.is_bifacial === 1 ? 'Yes' : 'No' }}
        </div>
      </div>
      <div class="row">
        <div class="label">
          Model :
        </div>
        <div class="value">
          {{ solarModel.model }}
        </div>
      </div>
    </div>
    <div class="table-wrapper">
      <div class="header-wrapper">
        Mechanical Parameters
      </div>
      <div class="table-content">
        <div class="item">
          <div class="row">
            <div class="label">
              Cell type :
            </div>
            <div class="value">
              {{ solarModel.cell_orientation }}
            </div>
          </div>
          <div class="row">
            <div class="label">
              Junction box location :
            </div>
            <div class="value">
              {{ solarModel.junction_box_location }}
            </div>
          </div>
          <div class="row">
            <div class="label">
              Connector :
            </div>
            <div class="value">
              {{ solarModel.connector }}
            </div>
          </div>
          <div class="row">
            <div class="label">
              Output cable-positive (mm) :
            </div>
            <div class="value">
              {{ solarModel.output_cable_pos }}
            </div>
          </div>
        </div>
        <div class="item">
          <div class="row">
            <div class="label">
              Output cable-negative (mm) :
            </div>
            <div class="value">
              {{ solarModel.output_cable_neg }}
            </div>
          </div>
          <div class="row">
            <div class="label">
              Glass :
            </div>
            <div class="value">
              {{ solarModel.glass }}
            </div>
          </div>
          <div class="row">
            <div class="label">
              Frame :
            </div>
            <div class="value">
              {{ solarModel.frame }}
            </div>
          </div>
          <div class="row">
            <div class="label">
              Weight (kg) :
            </div>
            <div class="value">
              {{ solarModel.weight }}
            </div>
          </div>
        </div>
        <div class="item">
          <div class="row">
            <div class="label">
              Width (mm) :
            </div>
            <div class="value">
              {{ solarModel.width }}
            </div>
          </div>
          <div class="row">
            <div class="label">
              Height (mm) :
            </div>
            <div class="value">
              {{ solarModel.height }}
            </div>
          </div>
          <div class="row">
            <div class="label">
              Thickness (mm) :
            </div>
            <div class="value">
              {{ solarModel.thickness }}
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="table-wrapper">
      <div class="header-wrapper">
        Electrical characteristics (STC:AM1.5 1000W/m² 25℃)
      </div>
      <div class="table-content">
        <div class="item">
          <div class="row">
            <div class="label">
              Maximum power (Pmax/W) :
            </div>
            <div class="value">
              {{ solarModel.maximum_power }}
            </div>
          </div>
          <div class="row">
            <div class="label">
              Open circuit voltage (Voc/V) :
            </div>
            <div class="value">
              {{ solarModel.open_circuit_voltage }}
            </div>
          </div>
          <div class="row">
            <div class="label">
              Short circuit current (Isc/A) :
            </div>
            <div class="value">
              {{ solarModel.short_circuit_current }}
            </div>
          </div>
          <div class="row">
            <div class="label">
              Voltage at maximum power (Vmp/V) :
            </div>
            <div class="value">
              {{ solarModel.voltage_at_maximum_power }}
            </div>
          </div>
        </div>
        <div class="item">
          <div class="row">
            <div class="label">
              Current at maximum power (Imp/A) :
            </div>
            <div class="value">
              {{ solarModel.current_at_maximum_power }}
            </div>
          </div>
          <div class="row">
            <div class="label">
              Module efficiency (%) :
            </div>
            <div class="value">
              {{ solarModel.module_efficiency }}
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="table-wrapper">
      <div class="header-wrapper">
        Operating parameters
      </div>
      <div class="table-content">
        <div class="item">
          <div class="row">
            <div class="label">
              Operational temperature (℃) :
            </div>
            <div class="value">
              {{ solarModel.operational_temperature }}
            </div>
          </div>
          <div class="row">
            <div class="label">
              Power output tolerance (W) :
            </div>
            <div class="value">
              {{ solarModel.power_output_tolerance }}
            </div>
          </div>
          <div class="row">
            <div class="label">
              Voc and isc tolerance (%) :
            </div>
            <div class="value">
              {{ solarModel.voc_and_isc_tolerance }}
            </div>
          </div>
          <div class="row">
            <div class="label">
              Maximum system voltage (V) :
            </div>
            <div class="value">
              {{ solarModel.maximum_system_voltage }}
            </div>
          </div>
        </div>
        <div class="item">
          <div class="row">
            <div class="label">
              Maximum configuration fuse rating (A) :
            </div>
            <div class="value">
              {{ solarModel.maximum_series_fuse_rating }}
            </div>
          </div>
          <div class="row">
            <div class="label">
              Nominal operating cell temperature (℃) :
            </div>
            <div class="value">
              {{ solarModel.nominal_operating_cell_temperature }}
            </div>
          </div>
          <div class="row">
            <div class="label">
              Protection class :
            </div>
            <div class="value">
              {{ solarModel.protection_class }}
            </div>
          </div>
          <div class="row">
            <div class="label">
              Fire rating :
            </div>
            <div class="value">
              {{ solarModel.fire_rating }}
            </div>
          </div>
        </div>
        <div class="item">
          <div class="row">
            <div class="label">
              Bifacial gain (%) :
            </div>
            <div class="value">
              {{ solarModel.bifacial_gain }}
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="table-wrapper">
      <div class="header-wrapper">
        Mechanical loading
      </div>
      <div class="table-content">
        <div class="item">
          <div class="row">
            <div class="label">
              Front side maximum static loading (Pa) :
            </div>
            <div class="value">
              {{ solarModel.front_side_maximum_static_loading }}
            </div>
          </div>
          <div class="row">
            <div class="label">
              Rear side maximum static loading (Pa) :
            </div>
            <div class="value">
              {{ solarModel.rear_side_maximum_static_loading }}
            </div>
          </div>
          <div class="row-long">
            <div class="label">
              Hailstone Test :
            </div>
            <div class="value">
              {{ solarModel.hailstone_test }}
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="table-wrapper">
      <div class="header-wrapper">
        Temperature ratings (STC)
      </div>
      <div class="table-content">
        <div class="item">
          <div class="row">
            <div class="label">
              Temperature coefficient of isc (%/℃) :
            </div>
            <div class="value">
              {{ solarModel.temperature_coefficient_of_pmax }}
            </div>
          </div>
          <div class="row">
            <div class="label">
              Temperature coefficient of voc (%/℃) :
            </div>
            <div class="value">
              {{ solarModel.temperature_coefficient_of_voc }}
            </div>
          </div>
          <div class="row">
            <div class="label">
              Temperature coefficient of pmax (%/℃) :
            </div>
            <div class="value">
              {{ solarModel.temperature_coefficient_of_pmax }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: '',
  components: {},
  props: {
    solarData: {
      type: Object,
      default: null
    }
  },
  data() {
    return {
      solarModel: {}
    };
  },
  watch: {
    solarData: {
      handler(newVal) {
        if (newVal) {
          this.solarModel = newVal;
        }
      },
      deep: true,
      immediate: true
    }
  },
  methods: {}
};
</script>

<style scoped lang="less">
.solar-detail-container {
  .header-container {
    display: flex;
    .row {
      flex: 1;
      display: flex;
      align-items: center;
      font-size: 14px;
      color: #303133;
      .value{
        flex:1;
        margin-left:16px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
    }
  }
  .table-wrapper {
    margin-top: 16px;
    border: 1px solid #eeeeee;
    border-radius: 4px 4px 0px 0px;
    .header-wrapper {
      height: 32px;
      background: #f4f5f9;
      border-radius: 4px 4px 0px 0px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 14px;
      color: #303133;
      border-bottom: 1px solid #eeeeee;
    }
    .table-content {
      padding: 8px 0px 16px 0px;
    }
    .item {
      display: flex;
      height: 32px;
      margin: 0px 16px 0px 16px;
      .row {
        flex: 1;
        max-width:284px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        font-size: 13px;
        color: #606266;
        margin: 0px 8px 0px 8px;
        border-bottom: 1px solid #eeeeee;
      }
      .row-long{
        flex: 2;
        max-width:586px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        font-size: 13px;
        color: #606266;
        margin: 0px 8px 0px 8px;
        border-bottom: 1px solid #eeeeee;
      }
      .value {
        flex: 1;
        text-align: right;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        margin-left:8px;
      }
    }
  }
}
</style>
