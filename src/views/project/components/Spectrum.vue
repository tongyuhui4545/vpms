<template>
  <div>
    <!--serises表单/新增与编辑-->
    <Card class="card-min">
      <template #cardHeader>
        <span class="iconfont icon-shidaxiaoxiangtong card-icon" />
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
        <div class="form-header-wrapper">
          <div class="form-header">
            <div class="form-title">
              Solar module
            </div>
            <div class="form-mode">
              <el-select
                ref="solar-select"
                v-model="activeSolar"
                filterable
                placeholder="Please input and select"
                size="small"
                class="input"
                @change="changeSolar"
                @visible-change="visibleChange"
              >
                <el-option
                  v-for="(item, key) in solarOptions"
                  :key="key"
                  :label="item.label"
                  :value="item.id"
                />
              </el-select>
            </div>
          </div>
          <div
            class="card-btn animate"
            @click="viewMoreSolar"
          >
            {{ moreSolarBtn }}
          </div>
        </div>
        <div class="form-container">
          <el-form
            ref="solarForm"
            :inline="true"
            :rules="rulesForm"
            :model="solarForm"
            label-position="top"
            class="demo-form-inline"
          >
            <el-form-item
              v-if="moreSolar"
              label="Manufacturer"
            >
              <el-input
                v-model="solarForm.manufacturer"
                size="small"
                placeholder="Please input"
                class="input"
                disabled
              />
            </el-form-item>
            <el-form-item
              v-if="moreSolar"
              label="Module series"
            >
              <el-select
                v-model="solarForm.module_type"
                size="small"
                placeholder="Please input and select"
                class="input"
                disabled
              >
                <el-option
                  v-for="(item, key) in moduleTypeOptions"
                  :key="key"
                  :label="item"
                  :value="item"
                />
              </el-select>
            </el-form-item>
            <el-form-item
              v-if="moreSolar"
              label="Bifacial"
            >
              <el-select
                v-model="solarForm.is_bifacial"
                placeholder="Please input and select"
                class="input"
                size="small"
                disabled
              >
                <el-option
                  label="N/A"
                  :value="0"
                />
                <el-option
                  label="Yes"
                  :value="1"
                />
              </el-select>
            </el-form-item>
            <el-form-item
              v-if="moreSolar"
              label="Model"
            >
              <el-input
                v-model="solarForm.model"
                size="small"
                placeholder="Please input"
                class="input"
                disabled
              />
            </el-form-item>
            <el-divider
              v-if="moreSolar"
              content-position="left"
            >
              Mechanical Parameters
            </el-divider>
            <el-form-item
              v-if="moreSolar"
              label="Cell type"
            >
              <el-input
                v-model="solarForm.cell_orientation"
                size="small"
                placeholder="Please input"
                class="input"
                disabled
              />
            </el-form-item>
            <el-form-item
              v-if="moreSolar"
              label="Junction box location"
            >
              <el-input
                v-model="solarForm.junction_box_location"
                size="small"
                placeholder="Please input"
                class="input"
                disabled
              />
            </el-form-item>
            <el-form-item
              label="Connector"
              prop="connector"
            >
              <!--<el-select v-model="solarForm.connector" placeholder="Please select" multiple class="input" size="small">
                                <el-option v-for="(item,key) in connectorOptions" :key="key" 
                                :label="item" :value="item"></el-option>
                            </el-select>-->
              <el-input
                v-model="solarForm.connector"
                size="small"
                placeholder="Please input"
                class="input"
              />
              <el-switch
                v-model="form.connector_confirm"
                :width="35"
                class="confirm-switch"
                :active-value="1"
                :inactive-value="0"
                active-text="Confirm"
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
              <el-switch
                v-model="form.fuse_rating_confirm"
                :width="35"
                class="confirm-switch"
                :active-value="1"
                :inactive-value="0"
                active-text="Confirm"
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
              <el-switch
                v-model="form.output_cable_pos_confirm"
                :width="35"
                class="confirm-switch"
                :active-value="1"
                :inactive-value="0"
                active-text="Confirm"
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
              <el-switch
                v-model="form.output_cable_neg_confirm"
                :width="35"
                class="confirm-switch"
                :active-value="1"
                :inactive-value="0"
                active-text="Confirm"
              />
            </el-form-item>
            <el-form-item
              v-if="!moreSolar && solarForm.is_bifacial === 1"
              label="Bifacial gain(%)"
            >
              <el-input
                v-model="solarForm.bifacial_gain"
                size="small"
                placeholder="Please input"
                class="input"
              />
            </el-form-item>
            <el-form-item
              v-if="moreSolar"
              label="Glass"
            >
              <el-input
                v-model="solarForm.glass"
                size="small"
                placeholder="Please input"
                class="input"
                disabled
              />
            </el-form-item>
            <el-form-item
              v-if="moreSolar"
              label="Frame"
            >
              <el-input
                v-model="solarForm.frame"
                size="small"
                placeholder="Please input"
                class="input"
                disabled
              />
            </el-form-item>
            <el-form-item
              v-if="moreSolar"
              label="Weight (kg)"
            >
              <el-input
                v-model="solarForm.weight"
                size="small"
                placeholder="Please input"
                class="input"
                disabled
              />
            </el-form-item>
            <el-form-item
              v-if="moreSolar"
              label="Width (mm)"
            >
              <el-input
                v-model="solarForm.width"
                size="small"
                placeholder="Please input"
                class="input"
                disabled
              />
            </el-form-item>
            <el-form-item
              v-if="moreSolar"
              label="Height (mm)"
            >
              <el-input
                v-model="solarForm.height"
                size="small"
                placeholder="Please input"
                class="input"
                disabled
              />
            </el-form-item>
            <el-form-item
              v-if="moreSolar"
              label="Thickness (mm)"
            >
              <el-input
                v-model="solarForm.thickness"
                size="small"
                placeholder="Please input"
                class="input"
                disabled
              />
            </el-form-item>
            <el-divider
              v-if="moreSolar"
              content-position="left"
            >
              Electrical characteristics (STC:AM1.5 1000W/m² 25℃)
            </el-divider>
            <el-form-item
              v-if="moreSolar"
              label="Maximum power (Pmax/W)"
            >
              <el-input
                v-model="solarForm.maximum_power"
                size="small"
                placeholder="Please input"
                class="input"
                disabled
              />
            </el-form-item>
            <el-form-item
              v-if="moreSolar"
              label="Open circuit voltage (Voc/V)"
            >
              <el-input
                v-model="solarForm.open_circuit_voltage"
                size="small"
                placeholder="Please input"
                class="input"
                disabled
              />
            </el-form-item>
            <el-form-item
              v-if="moreSolar"
              label="Short circuit current (Isc/A)"
            >
              <el-input
                v-model="solarForm.short_circuit_current"
                size="small"
                placeholder="Please input"
                class="input"
                disabled
              />
            </el-form-item>
            <el-form-item
              v-if="moreSolar"
              label="Voltage at maximum power (Vmp/V)"
            >
              <el-input
                v-model="solarForm.voltage_at_maximum_power"
                size="small"
                placeholder="Please input"
                class="input"
                disabled
              />
            </el-form-item>
            <el-form-item
              v-if="moreSolar"
              label="Current at maximum power (Imp/A)"
            >
              <el-input
                v-model="solarForm.current_at_maximum_power"
                size="small"
                placeholder="Please input"
                class="input"
                disabled
              />
            </el-form-item>
            <el-form-item
              v-if="moreSolar"
              label="Module efficiency (%)"
            >
              <el-input
                v-model="solarForm.module_efficiency"
                size="small"
                placeholder="Please input"
                class="input"
                disabled
              />
            </el-form-item>
            <el-divider
              v-if="moreSolar"
              content-position="left"
            >
              Operating parameters
            </el-divider>
            <el-form-item
              v-if="moreSolar"
              label="Operational temperature (℃)"
            >
              <el-input
                v-model="solarForm.operational_temperature"
                size="small"
                placeholder="Please input"
                class="input"
                disabled
              />
            </el-form-item>
            <el-form-item
              v-if="moreSolar"
              label="Power output tolerance (W)"
            >
              <el-input
                v-model="solarForm.power_output_tolerance"
                size="small"
                placeholder="Please input"
                class="input"
                disabled
              />
            </el-form-item>
            <el-form-item
              v-if="moreSolar"
              label="Voc and isc tolerance (%)"
            >
              <el-input
                v-model="solarForm.voc_and_isc_tolerance"
                size="small"
                placeholder="Please input"
                class="input"
                disabled
              />
            </el-form-item>
            <el-form-item
              v-if="moreSolar"
              label="Maximum system voltage (V)"
            >
              <el-input
                v-model="solarForm.maximum_system_voltage"
                size="small"
                placeholder="Please input"
                class="input"
                disabled
              />
            </el-form-item>
            <el-form-item
              v-if="moreSolar"
              label="Maximum configuration fuse rating (A)"
            >
              <el-input
                v-model="solarForm.maximum_series_fuse_rating"
                size="small"
                placeholder="Please input"
                class="input"
                disabled
              />
            </el-form-item>
            <el-form-item
              v-if="moreSolar"
              label="Nominal operating cell temperature (℃)"
            >
              <el-input
                v-model="solarForm.nominal_operating_cell_temperature"
                size="small"
                placeholder="Please input"
                class="input"
                disabled
              />
            </el-form-item>
            <el-form-item
              v-if="moreSolar"
              label="Protection class"
            >
              <el-input
                v-model="solarForm.protection_class"
                size="small"
                placeholder="Please input"
                class="input"
                disabled
              />
            </el-form-item>
            <el-form-item
              v-if="moreSolar"
              label="Fire rating"
            >
              <el-input
                v-model="solarForm.fire_rating"
                size="small"
                placeholder="Please input"
                class="input"
                disabled
              />
            </el-form-item>
            <el-form-item
              v-if="moreSolar && solarForm.is_bifacial === 1"
              label="Bifacial gain(%)"
            >
              <el-input
                v-model="solarForm.bifacial_gain"
                size="small"
                placeholder="Please input"
                class="input"
                disabled
              />
            </el-form-item>
            <el-divider
              v-if="moreSolar"
              content-position="left"
            >
              Mechanical loading
            </el-divider>
            <el-form-item
              v-if="moreSolar"
              label="Front side maximum static loading (Pa)"
            >
              <el-input
                v-model="solarForm.front_side_maximum_static_loading"
                size="small"
                placeholder="Please input"
                class="input"
                disabled
              />
            </el-form-item>
            <el-form-item
              v-if="moreSolar"
              label="Rear side maximum static loading(Pa)"
            >
              <el-input
                v-model="solarForm.rear_side_maximum_static_loading"
                size="small"
                placeholder="Please input"
                class="input"
                disabled
              />
            </el-form-item>
            <el-form-item
              v-if="moreSolar"
              label="Hailstone test"
            >
              <el-input
                v-model="solarForm.hailstone_test"
                size="small"
                placeholder="Please input"
                class="input"
                disabled
              />
            </el-form-item>
            <el-divider
              v-if="moreSolar"
              content-position="left"
            >
              Temperature ratings (STC)
            </el-divider>
            <el-form-item
              v-if="moreSolar"
              label="Temperature coefficient of isc(%/℃)"
            >
              <el-input
                v-model="solarForm.temperature_coefficient_of_isc"
                size="small"
                placeholder="Please input"
                class="input"
                disabled
              />
            </el-form-item>
            <el-form-item
              v-if="moreSolar"
              label="Temperature coefficient of voc(%/℃)"
            >
              <el-input
                v-model="solarForm.temperature_coefficient_of_voc"
                size="small"
                placeholder="Please input"
                class="input"
                disabled
              />
            </el-form-item>
            <el-form-item
              v-if="moreSolar"
              label="Temperature coefficient of pmax(%/℃)"
            >
              <el-input
                v-model="solarForm.temperature_coefficient_of_pmax"
                size="small"
                placeholder="Please input"
                class="input"
                disabled
              />
            </el-form-item>
          </el-form>
        </div>

        <div class="form-header-wrapper">
          <div class="form-header">
            <div class="form-title">
              Racking/Tracker
            </div>
            <div class="form-mode">
              <el-select
                ref="tracker-select"
                v-model="activeTracker"
                filterable
                placeholder="Please input and select"
                size="small"
                class="input"
                @change="changeTracker"
                @visible-change="visibleChange"
              >
                <el-option
                  v-for="item in trackerOptions"
                  :key="item.id"
                  :label="item.label"
                  :value="item.id"
                />
              </el-select>
            </div>
          </div>
        </div>
        <div class="form-container">
          <el-form
            ref="trackerForm"
            :inline="true"
            :rules="rulesForm"
            :model="trackerForm"
            label-position="top"
            class="demo-form-inline"
          >
            <el-form-item
              v-if="moreSolar"
              label="Manufacturer"
            >
              <el-input
                v-model="trackerForm.manufacturer"
                size="small"
                placeholder="Please input"
                class="input"
                disabled
              />
            </el-form-item>
            <el-form-item
              v-if="moreSolar"
              label="Configuration"
            >
              <el-input
                v-model="trackerForm.series"
                size="small"
                placeholder="Please input"
                class="input"
                disabled
              />
            </el-form-item>
            <el-form-item
              label="BHA gap width (ft)"
              prop="bha_gap_width"
            >
              <el-input-number
                v-model="trackerForm.bha_gap_width"
                size="small"
                :min="0"
                :precision="2"
                placeholder="Please input"
                class="input"
              />
              <el-switch
                v-model="form.bha_gap_width_confirm"
                :width="35"
                class="confirm-switch"
                :active-value="1"
                :inactive-value="0"
                active-text="Confirm"
              />
            </el-form-item>
            <el-form-item
              label="Motor gap width (ft)"
              prop="motor_gap_width"
            >
              <el-input-number
                v-model="trackerForm.motor_gap_width"
                size="small"
                :min="0"
                :precision="2"
                placeholder="Please input"
                class="input"
              />
              <el-switch
                v-model="form.motor_gap_width_confirm"
                :width="35"
                class="confirm-switch"
                :active-value="1"
                :inactive-value="0"
                active-text="Confirm"
              />
            </el-form-item>
            <el-form-item
              label="Maximum pier height (ft)"
              prop="maximum_pier_height"
            >
              <el-input-number
                v-model="trackerForm.maximum_pier_height"
                size="small"
                :min="0"
                :precision="2"
                placeholder="Please input"
                class="input"
              />
              <el-switch
                v-model="form.maximum_pier_height_confirm"
                :width="35"
                class="confirm-switch"
                :active-value="1"
                :inactive-value="0"
                active-text="Confirm"
              />
            </el-form-item>
            <!-- <el-form-item label="Pile position" prop="pile_position">
                            <el-input v-model="trackerForm.pile_position" size="small" placeholder="Please input" class="input"></el-input>
                            <el-switch 
                                v-model="form.pile_position_confirm" 
                                :width="35"  
                                class="confirm-switch"
                                :active-value="1"
                                :inactive-value="0"
                                active-text="Confirm">
                            </el-switch>
                        </el-form-item> -->
          </el-form>
        </div>

        <div class="form-header-wrapper">
          <div class="form-header">
            <div class="form-title">
              Site info
            </div>
          </div>
        </div>
        <div class="form-container">
          <el-form
            ref="form"
            :inline="true"
            :rules="rulesForm"
            :model="form"
            label-position="top"
            class="demo-form-inline"
          >
            <el-form-item
              label="Module to module spacing (mm)"
              prop="module_to_module_spacing"
            >
              <el-input-number
                v-model="form.module_to_module_spacing"
                :min="0"
                size="small"
                placeholder="Please input"
                class="input"
              />
              <el-switch
                v-model="form.module_to_module_spacing_confirm"
                :width="35"
                class="confirm-switch"
                :active-value="1"
                :inactive-value="0"
                active-text="Confirm"
              />
            </el-form-item>
            <el-form-item
              label="BHA gap extender (ft)"
              prop="bha_gap_extender"
            >
              <el-input-number
                v-model="form.bha_gap_extender"
                :min="0"
                :precision="2"
                size="small"
                placeholder="Please input"
                class="input"
              />
              <el-switch
                v-model="form.bha_gap_extender_confirm"
                :width="35"
                class="confirm-switch"
                :active-value="1"
                :inactive-value="0"
                active-text="Confirm"
              />
            </el-form-item>
            <el-form-item
              label="Motor gap extender (ft)"
              prop="motor_gap_extender"
            >
              <el-input-number
                v-model="form.motor_gap_extender"
                :min="0"
                :precision="2"
                size="small"
                placeholder="Please input"
                class="input"
              />
              <el-switch
                v-model="form.motor_gap_extender_confirm"
                :width="35"
                class="confirm-switch"
                :active-value="1"
                :inactive-value="0"
                active-text="Confirm"
              />
            </el-form-item>
            <el-form-item
              label="Number of modules per string (pcs)"
              prop="of_modules_per_string"
            >
              <el-input-number
                v-model="form.of_modules_per_string"
                :min="0"
                size="small"
                placeholder="Please input"
                class="input"
              />
              <el-switch
                v-model="form.of_modules_per_string_confirm"
                :width="35"
                class="confirm-switch"
                :active-value="1"
                :inactive-value="0"
                active-text="Confirm"
              />
            </el-form-item>
            <el-form-item
              label="Number of Moudules (pcs)"
              prop="number_of_moudules"
            >
              <el-input-number
                v-model="form.number_of_moudules"
                :min="0"
                size="small"
                placeholder="Please input"
                class="input"
              />
              <el-switch
                v-model="form.number_of_moudules_confirm"
                :width="35"
                class="confirm-switch"
                :active-value="1"
                :inactive-value="0"
                active-text="Confirm"
              />
            </el-form-item>
            <el-form-item
              label="Row to row spacing (ft)"
              prop="row_to_row_spacing"
            >
              <div
                style="
                  display: flex;
                  align-items: center;
                  padding-top: 4px;
                  gap: 16px;
                "
              >
                <el-input-number
                  v-model="form.row_to_row_spacing"
                  :min="0"
                  :precision="2"
                  size="small"
                  placeholder="Please input"
                  class="input"
                />
                <div
                  class="add-config-btn"
                  @click="addItem('row-to-row-spacing')"
                >
                  <span>+ Add</span>
                </div>
              </div>
              <div
                v-for="(item, index) in extraRowToRowSpacing"
                :key="index"
                style="
                  display: flex;
                  align-items: center;
                  gap: 16px;
                  margin-top: 8px;
                "
              >
                <el-input-number
                  v-model="extraRowToRowSpacing[index]"
                  :min="0"
                  :precision="2"
                  size="small"
                  placeholder="Please input"
                  class="input"
                />
                <i
                  font-size="16"
                  style="cursor: pointer"
                  class="el-icon-delete"
                  @click="deleteItem('row-to-row-spacing', index)"
                />
              </div>
              <el-switch
                v-model="form.row_to_row_spacing_confirm"
                :width="35"
                class="confirm-switch"
                :active-value="1"
                :inactive-value="0"
                active-text="Confirm"
              />
            </el-form-item>
            <!--<el-form-item label="BHA quantity" prop="bha_quantity">
                            <el-input-number v-model="form.bha_quantity" size="small" placeholder="Please input" class="input"></el-input-number>
                            <el-switch 
                                v-model="form.bha_quantity_confirm" 
                                :width="35"  
                                class="confirm-switch"
                                :active-value="1"
                                :inactive-value="0"
                                active-text="Confirm">
                            </el-switch>
                        </el-form-item>-->
            <el-form-item
              label="Number of modules per tracker (pcs)"
              prop="modules_per_tracker"
            >
              <div
                style="
                  display: flex;
                  align-items: center;
                  padding-top: 4px;
                  gap: 16px;
                "
              >
                <el-input-number
                  v-model="form.modules_per_tracker"
                  :min="0"
                  size="small"
                  placeholder="Please input"
                  class="input"
                />
                <div
                  class="add-config-btn"
                  @click="addItem('number-of-modules-per-tracker')"
                >
                  <span>+ Add</span>
                </div>
              </div>
              <div
                v-for="(item, index) in extraNumberOfModulesPerTracker"
                :key="index"
                style="
                  display: flex;
                  align-items: center;
                  gap: 16px;
                  margin-top: 8px;
                "
              >
                <el-input-number
                  v-model="extraNumberOfModulesPerTracker[index]"
                  :min="0"
                  :precision="2"
                  size="small"
                  placeholder="Please input"
                  class="input"
                />
                <i
                  font-size="16"
                  style="cursor: pointer"
                  class="el-icon-delete"
                  @click="deleteItem('number-of-modules-per-tracker', index)"
                />
              </div>
              <el-switch
                v-model="form.modules_per_tracker_confirm"
                :width="35"
                class="confirm-switch"
                :active-value="1"
                :inactive-value="0"
                active-text="Confirm"
              />
            </el-form-item>
            <el-form-item
              label="Maximum current factor"
              prop="maximum_current_factor"
            >
              <el-input-number
                v-model="form.maximum_current_factor"
                :min="0"
                :precision="2"
                size="small"
                placeholder="Please input"
                class="input"
              />
              <el-switch
                v-model="form.maximum_current_factor_confirm"
                :width="35"
                class="confirm-switch"
                :active-value="1"
                :inactive-value="0"
                active-text="Confirm"
              />
            </el-form-item>
            <el-form-item
              label="Overload protection factor"
              prop="overload_protection_factor"
            >
              <el-input-number
                v-model="form.overload_protection_factor"
                :min="0"
                :precision="2"
                size="small"
                placeholder="Please input"
                class="input"
              />
              <el-switch
                v-model="form.overload_protection_factor_confirm"
                :width="35"
                class="confirm-switch"
                :active-value="1"
                :inactive-value="0"
                active-text="Confirm"
              />
            </el-form-item>
            <el-form-item
              label="Maximum overload protection current (A)"
              prop="maximum_overload_protection_current"
            >
              <el-input-number
                :value="computedProtectionCurrent"
                :min="0"
                :precision="2"
                size="small"
                disabled
                placeholder="Please input"
                class="input"
              />
              <el-switch
                v-model="form.maximum_overload_protection_current_confirm"
                :width="35"
                class="confirm-switch"
                :active-value="1"
                :inactive-value="0"
                active-text="Confirm"
              />
            </el-form-item>
            <el-form-item
              label="Module connection"
              prop="module_connection"
            >
              <el-select
                v-model="form.module_connection"
                filterable
                allow-create
                default-first-option
                placeholder="Please input and select"
                clearable
                class="input"
                size="small"
              >
                <el-option
                  v-for="(item, key) in moduleConnectorOptions"
                  :key="key"
                  :label="item"
                  :value="item"
                />
              </el-select>
              <el-switch
                v-model="form.module_connection_confirm"
                :width="35"
                class="confirm-switch"
                :active-value="1"
                :inactive-value="0"
                active-text="Confirm"
              />
            </el-form-item>
            <el-form-item
              label="Module orientation"
              prop="module_orientation"
            >
              <el-select
                v-model="form.module_orientation"
                filterable
                clearable
                allow-create
                default-first-option
                placeholder="Please input and select"
                class="input"
                size="small"
              >
                <el-option
                  v-for="(item, key) in moduleOrientationOptions"
                  :key="key"
                  :label="item"
                  :value="item"
                />
              </el-select>
              <el-switch
                v-model="form.module_orientation_confirm"
                :width="35"
                class="confirm-switch"
                :active-value="1"
                :inactive-value="0"
                active-text="Confirm"
              />
            </el-form-item>
            <el-form-item
              label="Harness/ Homerun Extender Placement"
              prop="extender_placement"
            >
              <el-select
                v-model="form.extender_placement"
                filterable
                clearable
                allow-create
                default-first-option
                placeholder="Please input and select"
                class="input"
                size="small"
              >
                <el-option
                  v-for="(item, key) in harnessHomerunOptions"
                  :key="key"
                  :label="item"
                  :value="item"
                />
              </el-select>
              <el-switch
                v-model="form.extender_placement_confirm"
                :width="35"
                class="confirm-switch"
                :active-value="1"
                :inactive-value="0"
                active-text="Confirm"
              />
            </el-form-item>
            <el-form-item
              label="Wire Management of EOR Extenders (trench/cab/cable tray)"
              prop="wire_management_of_eor_extenders"
            >
              <el-select
                v-model="form.wire_management_of_eor_extenders"
                clearable
                filterable
                allow-create
                default-first-option
                placeholder="Please input and select"
                class="input"
                size="small"
              >
                <el-option
                  v-for="(item, key) in wireManagementOptions"
                  :key="key"
                  :label="item"
                  :value="item"
                />
              </el-select>
              <el-switch
                v-model="form.wire_management_of_eor_extenders_confirm"
                :width="35"
                class="confirm-switch"
                :active-value="1"
                :inactive-value="0"
                active-text="Confirm"
              />
            </el-form-item>
            <el-form-item
              label="Messenger wire or Trench or AWM"
              prop="cab_or_trench"
            >
              <el-radio-group
                v-model="form.cab_or_trench"
                class="input"
              >
                <el-radio label="Messenger wire">
                  Messenger wire
                </el-radio>
                <el-radio label="Trench">
                  Trench
                </el-radio>
                <el-radio label="AWM">
                  AWM
                </el-radio>
              </el-radio-group>
              <el-switch
                v-model="form.cab_or_trench_confirm"
                :width="35"
                class="confirm-switch"
                :active-value="1"
                :inactive-value="0"
                active-text="Confirm"
              />
            </el-form-item>
            <el-form-item
              label="CBX outlet length (ft)"
              prop="cbx_outlet_length"
            >
              <el-input-number
                v-model="form.cbx_outlet_length"
                :min="0"
                :precision="2"
                size="small"
                placeholder="Please input"
                class="input"
              />
              <el-switch
                v-model="form.cbx_outlet_length_confirm"
                :width="35"
                class="confirm-switch"
                :active-value="1"
                :inactive-value="0"
                active-text="Confirm"
              />
            </el-form-item>
            <el-form-item
              label="Height of CBX/LBD from Grade (ft)"
              prop="cbx_height"
            >
              <el-input-number
                v-model="form.cbx_height"
                size="small"
                :min="0"
                :precision="2"
                placeholder="Please input"
                class="input"
              />
              <el-switch
                v-model="form.cbx_height_confirm"
                :width="35"
                class="confirm-switch"
                :active-value="1"
                :inactive-value="0"
                active-text="Confirm"
              />
            </el-form-item>
            <el-form-item
              label="Distance from CBX/LBD to row head (ft)"
              prop="distance_from_cbx_to_row_head"
            >
              <el-input-number
                v-model="form.distance_from_cbx_to_row_head"
                :min="0"
                :precision="2"
                size="small"
                placeholder="Please input"
                class="input"
              />
              <el-switch
                v-model="form.distance_from_cbx_to_row_head_confirm"
                :width="35"
                class="confirm-switch"
                :active-value="1"
                :inactive-value="0"
                active-text="Confirm"
              />
            </el-form-item>
            <el-form-item
              label="LBD/CBX disconnect means for Harness/LYNX"
              prop="lbd_cbx_disconnect_means"
            >
              <el-select
                v-model="form.lbd_cbx_disconnect_means"
                clearable
                filterable
                allow-create
                default-first-option
                placeholder="Please input and select"
                class="input"
                size="small"
              >
                <el-option
                  v-for="(item, key) in disconnectMeansOptions"
                  :key="key"
                  :label="item"
                  :value="item"
                />
              </el-select>
              <el-switch
                v-model="form.lbd_cbx_disconnect_means_confirm"
                :width="35"
                class="confirm-switch"
                :active-value="1"
                :inactive-value="0"
                active-text="Confirm"
              />
            </el-form-item>
            <el-form-item
              label="Desired Wire Length Buffer % "
              prop="desired_wire_length_buffer"
            >
              <el-input
                v-model="form.desired_wire_length_buffer"
                placeholder="Please input"
                class="input"
                size="small"
              />
              <el-switch
                v-model="form.desired_wire_length_buffer_confirm"
                :width="35"
                class="confirm-switch"
                :active-value="1"
                :inactive-value="0"
                active-text="Confirm"
              />
            </el-form-item>
            <el-form-item
              label="Preferred Circuit Label Format"
              prop="preferred_circuit_label_format"
            >
              <el-input
                v-model="form.preferred_circuit_label_format"
                placeholder="Please input"
                class="input"
                size="small"
              />
              <el-switch
                v-model="form.preferred_circuit_label_format_confirm"
                :width="35"
                class="confirm-switch"
                :active-value="1"
                :inactive-value="0"
                active-text="Confirm"
              />
            </el-form-item>
            <!-- <el-form-item
                        :label="(form.cab_or_trench == 'CAB' || form.cab_or_trench == 'Messenger wire') ?'Hanger height (ft)':'Trench depth (ft)'" prop="cab_height_or_trench_depth">
                            <el-input-number v-model="form.cab_height_or_trench_depth" :min="0" :precision="2" size="small" placeholder="Please input" class="input"></el-input-number>
                            <el-switch 
                                v-model="form.cab_height_or_trench_depth_confirm" 
                                :width="35"  
                                class="confirm-switch"
                                :active-value="1"
                                :inactive-value="0"
                                active-text="Confirm">
                            </el-switch>
                        </el-form-item> -->
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
              v-if="formMode == 'add' || formMode == 'copy'"
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
      </template>
    </Card>
  </div>
</template>

<script>
import Card from '@/components/Card.vue';
import {PHASE_VALUES} from '@/utils/constants.js';
import {
  solarListSelect,
  trackerListSelect,
  solarDetail,
  trackerDetail,
  addSeries,
  seriesDetail,
  editSeries,
  configParams
} from '@/api/index.js';
import updateStatus from '@/utils/status.js';
export default {
  name: '',
  components: {
    Card
  },
  data() {
    return {
      //fix: 根据query里传入的phase进度来判断信息要不要必填，现在传入的直接是 10%， Site Plan之类的字符串，所以直接用字典值来对应一下算了
      phaseProgressValues: PHASE_VALUES,
      harnessHomerunOptions: ['Along Torque Tube', 'Along Module'],
      wireManagementOptions: ['trench', 'cab', 'cabletray'],
      disconnectMeansOptions: ['Connects on Whips', 'Termination Inside Box'],
      extraNumberOfModulesPerTracker: [],
      extraRowToRowSpacing: [],
      progressRate: undefined,
      cardTitle: 'New configuration',
      formMode: '',
      solarOptions: [],
      activeSolar: '',
      moreSolar: false,
      moreSolarBtn: 'More',
      seriesId: '',
      form: {

        /**solar module */
        connector_confirm: 0,
        fuse_rating_confirm: 0,
        output_cable_pos_confirm: 0,
        output_cable_neg_confirm: 0,
        bifacial_gain: 0,

        /**tracker */
        bha_gap_width_confirm: 0,
        motor_gap_width_confirm: 0,
        maximum_pier_height_confirm: 0,
        pile_position_confirm: 0,

        /**combination */
        module_to_module_spacing: undefined,
        bha_gap_extender: undefined,
        motor_gap_extender: undefined,
        of_modules_per_string: undefined,
        row_to_row_spacing: undefined,
        //bha_quantity: undefined,
        modules_per_tracker: undefined,
        maximum_current_factor: undefined,
        overload_protection_factor: undefined,
        maximum_overload_protection_current: undefined,
        module_connection: '',
        module_orientation: '',
        cab_or_trench: '',
        cbx_outlet_length: undefined,
        cbx_height: undefined,
        distance_from_cbx_to_row_head: undefined,
        // cab_height_or_trench_depth: undefined,
        //20231107configuration调整字段，新加如下：
        number_of_moudules: undefined,
        extender_placement: undefined,
        wire_management_of_eor_extenders: undefined,
        lbd_cbx_disconnect_means: undefined,
        desired_wire_length_buffer: undefined,
        preferred_circuit_label_format: undefined,

        number_of_moudules_confirm: 0,
        extender_placement_confirm: 0,
        wire_management_of_eor_extenders_confirm: 0,
        lbd_cbx_disconnect_means_confirm: 0,
        desired_wire_length_buffer_confirm: 0,
        preferred_circuit_label_format_confirm: 0,
        module_to_module_spacing_confirm: 0,
        bha_gap_extender_confirm: 0,
        motor_gap_extender_confirm: 0,
        of_modules_per_string_confirm: 0,
        row_to_row_spacing_confirm: 0,
        modules_per_tracker_confirm: 0,
        maximum_current_factor_confirm: 0,
        overload_protection_factor_confirm: 0,
        maximum_overload_protection_current_confirm: 0,
        module_connection_confirm: 0,
        module_orientation_confirm: 0,
        cab_or_trench_confirm: 0,
        cbx_outlet_length_confirm: 0,
        cbx_height_confirm: 0,
        distance_from_cbx_to_row_head_confirm: 0
        // cab_height_or_trench_depth_confirm: 0
      },
      formInfo: {},
      trackerOptions: [],
      activeTracker: '',
      solarForm: {
        manufacturer: '',
        module_type: '',
        is_bifacial: 0,
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
        width: '',
        height: '',
        thickness: '',
        maximum_power: '',
        open_circuit_voltage: '',
        short_circuit_current: '',
        voltage_at_maximum_power: '',
        current_at_maximum_power: '',
        module_efficiency: '',
        operational_temperature: '',
        power_output_tolerance: '',
        voc_and_isc_tolerance: '',
        maximum_system_voltage: '',
        maximum_series_fuse_rating: '',
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
      trackerForm: {
        manufacturer: '',
        series: '',
        bha_gap_width: undefined,
        motor_gap_width: undefined,
        maximum_pier_height: undefined,
        pile_position: ''
      },
      connectorOptions: [],
      moduleTypeOptions: [],
      moduleConnectorOptions: '',
      moduleOrientationOptions: ''
    };
  },
  computed: {
    rulesForm() {
      let rulesForm = [];
      if (this.progressRate >= 60) { 
        rulesForm = {
          preferred_circuit_label_format: [
            {
              required: true,
              message: 'Please input Preferred Circuit Label Format',
              trigger: ['submit', 'change']
            }
          ],
          desired_wire_length_buffer: [
            {
              required: true,
              message: 'Please input Desired Wire Length Buffer % ',
              trigger: ['submit', 'change']
            }
          ],
          lbd_cbx_disconnect_means: [
            {
              required: true,
              message: 'Please input LBD/CBX disconnect means for Harness/LYNX',
              trigger: ['submit', 'change']
            }
          ],
          wire_management_of_eor_extenders: [
            {
              required: true,
              message:
                'Please input Wire Management of EOR Extenders (trench/cab/cable tray)',
              trigger: ['submit', 'change']
            }
          ],
          extender_placement: [
            {
              required: true,
              message: 'Please input Harness/ Homerun Extender Placement',
              trigger: ['submit', 'change']
            }
          ],
          number_of_moudules: [
            {
              required: true,
              message: 'Please input number of modules',
              trigger: ['submit', 'change']
            }
          ],
          connector: [
            {
              required: true,
              message: 'Please select Connector',
              trigger: ['submit', 'blur']
            }
          ],
          fuse_rating: [
            {
              required: true,
              message: 'Please input Fuse Rating (A)',
              trigger: ['submit']
            }
          ],
          output_cable_pos: [
            {
              required: true,
              message: 'Please input Output Cable - positive',
              trigger: ['submit', 'change']
            }
          ],
          output_cable_neg: [
            {
              required: true,
              message: 'Please input Output Cable - negative',
              trigger: ['submit', 'change']
            }
          ],
          bha_gap_width: [
            {
              required: true,
              message: 'Please input BHA Gap width (ft)',
              trigger: ['submit', 'change']
            }
          ],
          motor_gap_width: [
            {
              required: true,
              message: 'Please input Motor Gap width (ft)',
              trigger: ['submit', 'change']
            }
          ],
          maximum_pier_height: [
            {
              required: true,
              message: 'Please input Maximum Pier Height (ft)',
              trigger: ['submit', 'change']
            }
          ],
          pile_position: [
            {
              required: true,
              message: 'Please input Pile Position',
              trigger: ['submit', 'change']
            }
          ],
          module_to_module_spacing: [
            {
              required: true,
              message: 'Please input module to module spacing (mm)',
              trigger: ['submit', 'change']
            }
          ],
          bha_gap_extender: [
            {
              required: true,
              message: 'Please input bha gap extender (ft)',
              trigger: ['submit', 'change']
            }
          ],
          motor_gap_extender: [
            {
              required: true,
              message: 'Please input motor gap extender (ft)',
              trigger: ['submit', 'change']
            }
          ],
          of_modules_per_string: [
            {
              required: true,
              message: 'Please input number of modules per string (pcs)',
              trigger: ['submit', 'change']
            }
          ],
          row_to_row_spacing: [
            {
              required: true,
              message: 'Please input row to row spacing (ft)',
              trigger: ['submit', 'change']
            }
          ],
          bha_quantity: [
            {
              required: true,
              message: 'Please input BHA quantity',
              trigger: ['submit', 'change']
            }
          ],
          modules_per_tracker: [
            {
              required: true,
              message: 'Please input number of modules per tracker (pcs)',
              trigger: ['submit', 'change']
            }
          ],
          maximum_current_factor: [
            {
              required: true,
              message: 'Please input maximum current factor',
              trigger: ['submit', 'change']
            }
          ],
          overload_protection_factor: [
            {
              required: true,
              message: 'Please input overload protection factor',
              trigger: ['submit', 'change']
            }
          ],
          maximum_overload_protection_current: [
            {
              required: true,
              message: 'Please input maximum overload protection current',
              trigger: ['submit', 'change']
            }
          ],
          module_connection: [
            {
              required: true,
              message: 'Please select module connection',
              trigger: ['submit', 'change']
            }
          ],
          module_orientation: [
            {
              required: true,
              message: 'Please select module orientation',
              trigger: ['submit', 'change']
            }
          ],
          cab_or_trench: [
            {
              required: true,
              message: 'Please select messenger wire or trench',
              trigger: ['submit', 'change']
            }
          ],
          cbx_outlet_length: [
            {
              required: true,
              message: 'Please input CBX outlet length (ft)',
              trigger: ['submit', 'change']
            }
          ],
          cbx_height: [
            {
              required: true,
              message: 'Please input CBX height (ft)',
              trigger: ['submit', 'change']
            }
          ],
          distance_from_cbx_to_row_head: [
            {
              required: true,
              message: 'Please input distance from CBX to row head (ft)',
              trigger: ['submit', 'change']
            }
          ],
          cab_height_or_trench_depth: [
            {
              required: true,
              message: 'Please input hanger height or trench depth',
              trigger: ['submit', 'change']
            }
          ]
        };
      } else {
        rulesForm = {
          preferred_circuit_label_format: [
            {
              required: false,
              message: 'Please input Preferred Circuit Label Format',
              trigger: 'blur'
            }
          ],
          desired_wire_length_buffer: [
            {
              required: false,
              message: 'Please input Desired Wire Length Buffer % ',
              trigger: 'blur'
            }
          ],
          lbd_cbx_disconnect_means: [
            {
              required: false,
              message: 'Please input LBD/CBX disconnect means for Harness/LYNX',
              trigger: 'blur'
            }
          ],
          wire_management_of_eor_extenders: [
            {
              required: false,
              message:
                'Please input Wire Management of EOR Extenders (trench/cab/cable tray)',
              trigger: 'blur'
            }
          ],
          extender_placement: [
            {
              required: false,
              message: 'Please input Harness/ Homerun Extender Placement',
              trigger: 'blur'
            }
          ],
          number_of_moudules: [
            {
              required: false,
              message: 'Please input number of modules',
              trigger: 'blur'
            }
          ],
          connector: [
            {
              required: false,
              message: 'Please select Connector',
              trigger: 'change'
            }
          ],
          fuse_rating: [
            {
              required: false,
              message: 'Please input Fuse Rating (A)',
              trigger: 'blur'
            },
            {
              validator: this.validateFuseRating,
              trigger: ['submit', 'change']
            }
          ],
          output_cable_pos: [
            {
              required: false,
              message: 'Please input Output Cable - positive',
              trigger: 'blur'
            }
          ],
          output_cable_neg: [
            {
              required: false,
              message: 'Please input Output Cable - negative',
              trigger: 'blur'
            }
          ],
          bha_gap_width: [
            {
              required: false,
              message: 'Please input BHA Gap width (ft)',
              trigger: 'blur'
            }
          ],
          motor_gap_width: [
            {
              required: false,
              message: 'Please input Motor Gap width (ft)',
              trigger: 'blur'
            }
          ],
          maximum_pier_height: [
            {
              required: false,
              message: 'Please input Maximum Pier Height (ft)',
              trigger: 'blur'
            }
          ],
          pile_position: [
            {
              required: false,
              message: 'Please input Pile Position',
              trigger: 'blur'
            }
          ],
          module_to_module_spacing: [
            {
              required: false,
              message: 'Please input module to module spacing (mm)',
              trigger: 'blur'
            }
          ],
          bha_gap_extender: [
            {
              required: false,
              message: 'Please input bha gap extender (ft)',
              trigger: 'blur'
            }
          ],
          motor_gap_extender: [
            {
              required: false,
              message: 'Please input motor gap extender (ft)',
              trigger: 'blur'
            }
          ],
          of_modules_per_string: [
            {
              required: false,
              message: 'Please input number of modules per string (pcs)',
              trigger: 'blur'
            }
          ],
          row_to_row_spacing: [
            {
              required: false,
              message: 'Please input row to row spacing (ft)',
              trigger: 'blur'
            }
          ],
          bha_quantity: [
            {
              required: false,
              message: 'Please input BHA quantity',
              trigger: 'blur'
            }
          ],
          modules_per_tracker: [
            {
              required: false,
              message: 'Please input number of modules per tracker (pcs)',
              trigger: 'blur'
            }
          ],
          maximum_current_factor: [
            {
              required: false,
              message: 'Please input maximum current factor',
              trigger: 'blur'
            }
          ],
          overload_protection_factor: [
            {
              required: false,
              message: 'Please input overload protection factor',
              trigger: 'blur'
            }
          ],
          maximum_overload_protection_current: [
            {
              required: false,
              message: 'Please input maximum overload protection current',
              trigger: 'blur'
            }
          ],
          module_connection: [
            {
              required: false,
              message: 'Please select module connection',
              trigger: 'change'
            }
          ],
          module_orientation: [
            {
              required: false,
              message: 'Please select module orientation',
              trigger: 'change'
            }
          ],
          cab_or_trench: [
            {
              required: false,
              message: 'Please select messenger wire or trench',
              trigger: 'change'
            }
          ],
          cbx_outlet_length: [
            {
              required: false,
              message: 'Please input CBX outlet length (ft)',
              trigger: 'blur'
            }
          ],
          cbx_height: [
            {
              required: false,
              message: 'Please input CBX height (ft)',
              trigger: 'blur'
            }
          ],
          distance_from_cbx_to_row_head: [
            {
              required: false,
              message: 'Please input distance from CBX to row head (ft)',
              trigger: 'blur'
            }
          ],
          cab_height_or_trench_depth: [
            {
              required: false,
              message: 'Please input hanger height or trench depth',
              trigger: 'blur'
            }
          ]
        };
      }
      return rulesForm;
    },
    computedProtectionCurrent() {
      let val =
        this.solarForm.short_circuit_current *
        this.form.maximum_current_factor *
        this.form.overload_protection_factor;
      // eslint-disable-next-line vue/no-side-effects-in-computed-properties
      this.form.maximum_overload_protection_current = val;
      return val;
    }
  },
  watch: {
    progressRate: {
      handler(val) {
        if (val >= 60) {
          let form = this.rulesForm;
          for (const key in form) {
            // eslint-disable-next-line no-prototype-builtins
            if (form.hasOwnProperty(key)) {
              form[key] = form[key].map((rule) => {
                return { ...rule, required: true };
              });
            }
          }
        }
      }
    }
  },
  created() {
    this.getSolarList();
    this.getTrackerList();
    this.getConfigParams();
  },
  mounted() { 
    const params = this.$route.query;
    this.form['progress_id'] = params.progressId;
    let rate = params.progressRate;
    let rateVal = this.phaseProgressValues.find((item) => {return item.label === rate});
    rateVal = rateVal ? rateVal = rateVal.value : undefined;
    this.progressRate = rateVal;
    if (isNaN(this.progressRate)) {
      this.progressRate = 170;
    }
    this.formMode = params.mode;
    switch (params.mode) {
      case 'add':
        this.cardTitle = 'New configuration';
        break;
      case 'edit':
        this.cardTitle = 'Edit configuration';
        this.seriesId = params.seriesId;
        this.getSeriesDetail();
        break;
      case 'copy':
        this.cardTitle = 'New configuration';
        this.seriesId = params.seriesId;
        this.getSeriesDetail();
        break;
      default:
        break;
    }
  },
  methods: {
    addItem(itemToAdd) {
      if (itemToAdd === 'row-to-row-spacing') {
        this.extraRowToRowSpacing.push('');
      }
      if (itemToAdd === 'number-of-modules-per-tracker') {
        this.extraNumberOfModulesPerTracker.push('');
      }
    },
    deleteItem(itemToDelete, idx) {
      if (itemToDelete === 'row-to-row-spacing') {
        this.extraRowToRowSpacing.splice(idx, 1);
      }
      if (itemToDelete === 'number-of-modules-per-tracker') {
        this.extraNumberOfModulesPerTracker.splice(idx, 1);
      }
    },
    visibleChange(visible) {
      if (visible) {
        let refArr = ['solar-select', 'tracker-select'];
        refArr.forEach((v) => {
          const ref = this.$refs[v];
          let { popper } = ref.$refs;
          if (popper.$el) {
            popper = popper.$el;
          }
          if (
            !Array.from(popper.children).some((v) => {
              return v.className === 'btn-box';
            })
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
              if (ref === this.$refs['solar-select']) {
                window.open('#/index/solar-module/form?mode=add', '_blank');
              }
              if (ref === this.$refs['tracker-select']) {
                window.open('#/index/racking-tracker/form?mode=add', '_blank');
              }
            };
          }
        });
      }
    },
    //验证Fuse Rating
    validateFuseRating(value, callback) {
      let maxFuseRating =
        this.solarForm.maximum_series_fuse_rating || undefined;
      let val = Number(value);
      if (maxFuseRating && val > maxFuseRating) {
        callback(
          new Error(
            `Fuse rating is over maximum configuration fuse rating(${maxFuseRating}A)`
          )
        );
        return false;
      } else if (this.progressRate < 60) {
        return
      } else if (this.progressRate >= 60) {
        if (value === undefined || value === '') {
          callback(new Error('Please input Fuse Rating (A)'));
        } else {
          callback();
        }
      }
    },
    handleBack() {
      this.$router.go(-1);
    },
    async getSolarList() {
      await solarListSelect()
        .then((res) => {
          if (res.code === 200) {
            let { data } = res;
            let handledData = [];
            data.forEach((item) => {
              handledData.push({
                label: `${item.manufacturer}-${item.model}`,
                id: item.id,
                key: item.id
              });
            });
            this.solarOptions = handledData;
          }
          return;
        })
        .catch((err) => {
          return err;
        });
    },
    async getTrackerList() {
      await trackerListSelect()
        .then((res) => {
          if (res.code === 200) {
            let { data } = res;
            let handledData = [];
            data.forEach((item) => {
              let label = item.series
                ? `${item.manufacturer}-${item.series}`
                : item.manufacturer;
              handledData.push({
                label,
                id: item.id,
                key: item.id
              });
            });
            this.trackerOptions = handledData;
          }
          return;
        })
        .catch((err) => {
          return err;
        });
    },
    async getConfigParams() {
      await configParams()
        .then((res) => {
          this.connectorOptions = res.connector;
          this.moduleTypeOptions = res.solar_module.module_type;
          this.moduleConnectorOptions = res.module_connector;
          this.moduleOrientationOptions = res.module_orientation;
          return;
        })
        .catch((err) => {
          return err;
        });
    },
    async changeSolar(params) {
      await solarDetail(params)
        .then((res) => {
          if (res.code === 200) {
            let { data } = res;
            this.solarForm = data;
          }
          return;
        })
        .catch((err) => {
          return err;
        });
    },
    async changeTracker(params) {
      await trackerDetail(params)
        .then((res) => {
          if (res.code === 200) {
            let { data } = res;
            this.trackerForm = data;
          }
          return;
        })
        .catch((err) => {
          return err;
        });
    },
    viewMoreSolar() {
      this.moreSolar = !this.moreSolar;
      if (this.moreSolar === true) {
        this.moreSolarBtn = 'Hide';
      } else {
        this.moreSolarBtn = 'More';
      }
    },
    handleAdd() { 
      //判断fuse rating是否超过最大值
      if (
        this.solarForm.maximum_series_fuse_rating &&
        this.solarForm.maximum_series_fuse_rating !== 0
      ) {
        if (this.solarForm.fuse_rating && isNaN(this.solarForm.fuse_rating)) {
          this.$message.error('Fuse rating must be a number');
          return false;
        }
        if (
          this.solarForm.fuse_rating &&
          Number(this.solarForm.fuse_rating) >
            this.solarForm.maximum_series_fuse_rating
        ) {
          this.$message.error(
            `Fuse rating is over maximum configuration fuse rating(${this.solarForm.maximum_series_fuse_rating}A)`
          );
          return false;
        }
      }

      if (this.progressRate < 60) {
        let { form } = this;
        form.fuse_rating = this.solarForm.fuse_rating;
        form.bifacial_gain = this.solarForm.bifacial_gain;
        form.row_to_row_spacing = [
          form.row_to_row_spacing,
          ...this.extraRowToRowSpacing
        ];
        form.modules_per_tracker = [
          form.modules_per_tracker,
          ...this.extraNumberOfModulesPerTracker
        ];
        if (this.formMode === 'copy') {
          const params = this.$route.query;
          form['progress_id'] = params.progressId;
        }
        this.requestAdd(form);
      } else {
        this.$refs['solarForm'].validate((valid) => {
          if (valid) {
            this.$refs['trackerForm'].validate((valid) => {
              if (valid) {
                this.$refs['form'].validate((valid) => {
                  if (valid) {
                    let { form } = this; 
                    form.fuse_rating = this.solarForm.fuse_rating;
                    form.bifacial_gain = this.solarForm.bifacial_gain;
                    form.row_to_row_spacing = [
                      form.row_to_row_spacing,
                      ...this.extraRowToRowSpacing
                    ];
                    form.modules_per_tracker = [
                      form.modules_per_tracker,
                      ...this.extraNumberOfModulesPerTracker
                    ];
                    if (this.formMode === 'copy') {
                      const params = this.$route.query;
                      form['progress_id'] = params.progressId;
                    }
                    this.requestAdd(form);
                  } else {
                    scroll(0, 0);
                    return false;
                  }
                });
              } else {
                scroll(0, 0);
                return false;
              }
            });
          } else {
            scroll(0, 0);
            return false;
          }
        });
      }
    },
    async requestAdd(form) {
      form['solar_module_id'] = this.activeSolar;
      form['racking_tracker_id'] = this.activeTracker;
      delete form.id;

      form['connector'] = this.solarForm.connector;
      form['output_cable_pos'] = this.solarForm.output_cable_pos;
      form['output_cable_neg'] = this.solarForm.output_cable_neg;

      form['bha_gap_width'] = this.trackerForm.bha_gap_width;
      form['motor_gap_width'] = this.trackerForm.motor_gap_width;
      form['maximum_pier_height'] = this.trackerForm.maximum_pier_height;
      form['pile_position'] = this.trackerForm.pile_position;
      await addSeries(form)
        .then((res) => {
          if (res.code === 200) {
            const that = this;
            // updateStatus({
            //     id: this.form["progress_id"],
            //     status: 'US_HAS_BEEN_SEND'
            // },
            // function(){
            that.$message({
              message: 'Added',
              type: 'success'
            });
            that.$router.go(-1);
            // });
          } else {
            // this.$message.error(res.message);
          }
          return;
        })
        .catch((err) => {
          return err;
        });
    },

    async getSeriesDetail() {
      await seriesDetail(this.seriesId)
        .then((res) => {
          if (res.code === 200) {
            this.activeSolar = res.data.solar_module_id;
            this.solarForm = res.data.solar_module || {};
            // 从solarModule里获取的fuse_rating为undefined
            this.solarForm['fuse_rating'] = res.data.fuse_rating || undefined;
            this.activeTracker = res.data.racking_tracker_id;
            this.trackerForm = res.data.racking_tracker || {};
            this.form = res.data;
            this.formInfo = JSON.parse(JSON.stringify(res.data));
            this.solarForm['output_cable_pos'] = this.form.output_cable_pos;
            this.solarForm['output_cable_neg'] = this.form.output_cable_neg;
            this.solarForm['connector'] = this.form.connector;

            this.trackerForm['bha_gap_width'] = this.form.bha_gap_width;
            this.trackerForm['motor_gap_width'] = this.form.motor_gap_width;
            this.trackerForm['maximum_pier_height'] =
              this.form.maximum_pier_height;
            this.trackerForm['pile_position'] = this.form.pile_position;
          } else {
            // this.$message.error(res.message);
          }
          this.fullscreenLoading = false;
          return;
        })
        .catch((err) => {
          return err;
        });
    },
    async handleEdit() { 
      //判断fuse rating是否超过最大值
      if (this.solarForm.fuse_rating && isNaN(this.solarForm.fuse_rating)) { 
        this.$message.error('Fuse rating must be a number');
        return false;
      }
      if (
        this.solarForm.maximum_series_fuse_rating &&
        this.solarForm.maximum_series_fuse_rating !== 0
      ) { 
        if (
          this.solarForm.fuse_rating &&
          Number(this.solarForm.fuse_rating) >
            this.solarForm.maximum_series_fuse_rating
        ) { 
          this.$message.error(
            `Fuse rating is over maximum configuration fuse rating(${this.solarForm.maximum_series_fuse_rating}A)`
          );
          return false;
        } else {
          if(this.progressRate < 60) {
          this.editSeries();
          return
          }
          this.$refs['solarForm'].validate((valid) => { 
            if (valid) { 
              this.$refs['trackerForm'].validate((valid) => { 
                if (valid) { 
                  this.$refs['form'].validate((valid) => { 
                    if (valid) { 
                      this.editSeries();
                    } else { 
                      scroll(0, 0);
                      return false;
                    }
                  });
                } else { 
                  scroll(0, 0);
                  return false;
                }
              });
            } else { 
              scroll(0, 0);
              return false;
            }
          });
        }
      }
      else {
        this.editSeries();
      }
    },
    async editSeries() {
      let { form } = this;
      form['bifacial_gain'] = this.solarForm.bifacial_gain;
      form['solar_module_id'] = this.activeSolar;
      form['racking_tracker_id'] = this.activeTracker;

      form['connector'] = this.solarForm.connector;
      form['output_cable_pos'] = this.solarForm.output_cable_pos;
      form['output_cable_neg'] = this.solarForm.output_cable_neg;

      form['bha_gap_width'] = this.trackerForm.bha_gap_width;
      form['motor_gap_width'] = this.trackerForm.motor_gap_width;
      form['maximum_pier_height'] = this.trackerForm.maximum_pier_height;
      form['pile_position'] = this.trackerForm.pile_position;
      form['fuse_rating'] = this.solarForm.fuse_rating;
      form['progress_id'] = this.$route.query.progressId;

      delete form.solar_module;
      delete form.racking_tracker;
      delete form.created_at;
      delete form.updated_at;
      delete form.creator_name;

      await editSeries(form)
        .then((res) => {
          if (res.code === 200) {
            // this.justifyEditConfirm();
            this.$message.success('configuration edited successfully')
            this.$router.go(-1)
          } else {
            return;
          }
        })
        .catch((err) => {
          return err;
        });
    },
    justifyEditConfirm() {
      let { formInfo } = this;
      let { form } = this;
      let isChange = false;
      let myPromise = new Promise((resolve) => {
        for (let i in formInfo) {
          let item = formInfo[i];
          let isHas = i.indexOf('_confirm');
          if (isHas > 0 && item === 1) {
            let confirmArr = i.split('_confirm');
            // eslint-disable-next-line prefer-destructuring
            let confirmItem = confirmArr[0];
            let originalItem = formInfo[confirmItem];
            let currentItem = form[confirmItem];
            if (Array.isArray(originalItem) || Array.isArray(currentItem)) {
              if (originalItem.length === currentItem.length) {
                for (let j = 0; j < originalItem.length; j++) {
                  let originalArrItem = originalItem[j];
                  let isInArr = currentItem.indexOf(originalArrItem);
                  if (isInArr < 0) {
                    isChange = true;
                    this.changeStatus();
                    break;
                  }
                }
              } else {
                isChange = true;
                this.changeStatus();
                break;
              }
            } else {
              if (originalItem !== currentItem) {
                isChange = true;
                this.changeStatus();
                break;
              }
            }
          }
        }
        resolve();
      });

      myPromise.then(() => {
        if (!isChange) {
          this.$message({
            message: 'Done',
            type: 'success'
          });
          this.$router.go(-1);
        }
      });
    },
    changeStatus() {
      const that = this;
      updateStatus(
        {
          id: this.form['progress_id'],
          status: 'US_TO_BE_SEND'
        },
        () => {
          that.$message({
            message: 'Done',
            type: 'success'
          });
          that.$router.go(-1);
        }
      );
    }
  }
};
</script>

<style lang="less" scoped>
.add-config-btn {
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 64px;
  height: 30px;
  border-radius: 4px;
  cursor: pointer;
  border: 1px solid #007bff;
  color: #007bff;
}

.form-header-wrapper {
  display: flex;
  align-items: center;
  justify-content: space-between;

  .form-header {
    display: flex;
    align-items: center;

    .form-title {
      font-size: 14;
      font-weight: 600;
      min-width: 160px;
      color: #606266;
    }
  }

  .input {
    width: 300px;
  }
}

.form-container {
  margin: 20px 0;

  /* stylelint-disable-next-line selector-class-pattern */
  :deep(.el-form-item__label) {
    line-height: 20px;
  }

  :deep(.el-form-item) {
    margin-bottom: 20px;
    margin-right: 20px;
    position: relative;
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
    margin-top: 5px;
    margin-bottom: 10px;

    /* stylelint-disable-next-line selector-class-pattern */
    :deep(.el-switch__label *) {
      font-size: 12px;
    }
  }
}
</style>
