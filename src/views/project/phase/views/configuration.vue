<template>
  <div>
    <div
      v-if="isHas"
      class="configuration-content-container"
    >
      <div
        class="content-row-wrapper"
        style="margin-right: 16px"
      >
        <!--Solar module-->
        <div
          class="row"
          style="margin-bottom: 13px"
        >
          <div class="title">
            Solar module
          </div>
          <div class="content">
            <div class="item-wrapper">
              <div class="item">
                <div class="label">
                  Manufacturer :
                  <div
                    v-if="configUpdated.solar_manufacturer"
                    class="change-wrapper"
                  >
                    <el-tooltip placement="top-start">
                      <div
                        slot="content"
                        class="change-content"
                      >
                        <div class="first-row">
                          <span>{{ configUpdated.solar_manufacturer.creation_name }}</span>
                          <span>{{ configUpdated.solar_manufacturer.created_at }}</span>
                        </div>   
                        <div class="second-row">
                          {{ configUpdated.solar_manufacturer.label }}
                        </div>               
                      </div>
                      <i class="el-icon-warning-outline" />
                    </el-tooltip>
                  </div>
                </div>
                <div class="manufacturer-more">
                  <div class="value">
                    {{ solar_module['manufacturer'] }}
                  </div>
                  <div
                    class="more"
                    @click="solarDetailVisible = true"
                  >
                    <img
                      src="@/assets/image/more.png"
                      alt=""
                      class="image"
                    >
                  </div>
                </div>
              </div>
            </div>
            <div class="item-wrapper">
              <div class="item">
                <div class="label">
                  Module series :
                  <div
                    v-if="configUpdated.module_series"
                    class="change-wrapper"
                  >
                    <el-tooltip placement="top-start">
                      <div
                        slot="content"
                        class="change-content"
                      >
                        <div class="first-row">
                          <span>{{ configUpdated.module_series.creation_name }}</span><span>{{ configUpdated.module_series.created_at }}</span>
                        </div>   
                        <div class="second-row">
                          {{ configUpdated.module_series.label }}
                        </div>               
                      </div>
                      <i class="el-icon-warning-outline" />
                    </el-tooltip>
                  </div>
                </div>
                <div class="value">
                  {{ solar_module.module_type }}
                </div>
                <!-- <div
                  v-if="configuration.connector_confirm"
                  class="comfirm-wrapper"
                >
                  <i class="el-icon-circle-check" />
                </div> -->
              </div>
            </div>
            <div class="item-wrapper">
              <div class="item">
                <div class="label">
                  Bifacial :
                  <div
                    v-if="configUpdated.bifacial"
                    class="change-wrapper"
                  >
                    <el-tooltip placement="top-start">
                      <div
                        slot="content"
                        class="change-content"
                      >
                        <div class="first-row">
                          <span>{{ configUpdated.bifacial.creation_name }}</span><span>{{ configUpdated.bifacial.created_at }}</span>
                        </div>   
                        <div class="second-row">
                          {{ configUpdated.bifacial.label }}
                        </div>               
                      </div>
                      <i class="el-icon-warning-outline" />
                    </el-tooltip>
                  </div>
                </div>
                <div class="value">
                  {{ solar_module.is_bifacial ? 'Yes' : 'No' }}
                </div>
                <div
                  v-if="configuration.output_cable_pos_confirm"
                  class="comfirm-wrapper"
                >
                  <i class="el-icon-circle-check" />
                </div>
              </div>
            </div>
            <div class="item-wrapper">
              <div class="item">
                <div class="label">
                  Model :
                  <div
                    v-if="configUpdated.model"
                    class="change-wrapper"
                  >
                    <el-tooltip placement="top-start">
                      <div
                        slot="content"
                        class="change-content"
                      >
                        <div class="first-row">
                          <span>{{ configUpdated.model.creation_name }}</span><span>{{ configUpdated.model.created_at }}</span>
                        </div>   
                        <div class="second-row">
                          {{ configUpdated.model.label }}
                        </div>               
                      </div>
                      <i class="el-icon-warning-outline" />
                    </el-tooltip>
                  </div>
                </div>
                <div class="value">
                  {{ solar_module.model }}
                </div>
                <div
                  v-if="configuration.output_cable_neg_confirm"
                  class="comfirm-wrapper"
                >
                  <i class="el-icon-circle-check" />
                </div>
              </div>
            </div>
            <div class="item-wrapper">
              <div class="item">
                <div class="label">
                  Output cable-positive (mm) :
                  <div
                    v-if="configUpdated.output_cable_pos"
                    class="change-wrapper"
                  >
                    <el-tooltip placement="top-start">
                      <div
                        slot="content"
                        class="change-content"
                      >
                        <div class="first-row">
                          <span>{{ configUpdated.output_cable_pos.creation_name }}</span><span>{{ configUpdated.output_cable_pos.created_at }}</span>
                        </div>   
                        <div class="second-row">
                          {{ configUpdated.output_cable_pos.label }}
                        </div>               
                      </div>
                      <i class="el-icon-warning-outline" />
                    </el-tooltip>
                  </div>
                </div>
                <div class="value">
                  {{ configuration.output_cable_pos }}
                </div>
                <div
                  v-if="configuration.output_cable_pos_confirm"
                  class="comfirm-wrapper"
                >
                  <i class="el-icon-circle-check" />
                </div>
              </div>
            </div>
            <div class="item-wrapper">
              <div class="item">
                <div class="label">
                  Output cable-negative (mm) :
                  <div
                    v-if="configUpdated.output_cable_neg"
                    class="change-wrapper"
                  >
                    <el-tooltip placement="top-start">
                      <div
                        slot="content"
                        class="change-content"
                      >
                        <div class="first-row">
                          <span>{{ configUpdated.output_cable_neg.creation_name }}</span><span>{{ configUpdated.output_cable_neg.created_at }}</span>
                        </div>   
                        <div class="second-row">
                          {{ configUpdated.output_cable_neg.label }}
                        </div>               
                      </div>
                      <i class="el-icon-warning-outline" />
                    </el-tooltip>
                  </div>
                </div>
                <div class="value">
                  {{ configuration.output_cable_neg }}
                </div>
                <div
                  v-if="configuration.output_cable_neg_confirm"
                  class="comfirm-wrapper"
                >
                  <i class="el-icon-circle-check" />
                </div>
              </div>
            </div>
            <div class="block" />
          </div>
        </div>
        <!--Racking/Tracker-->
        <div class="row">
          <div class="title">
            Racking/Tracker
          </div>
          <div class="content">
            <div class="item-wrapper">
              <div class="item">
                <div class="label">
                  Manufacturer  :
                </div>
                <div
                  v-if="racking_tracker.manufacturer"
                  class="value"
                >
                  {{ racking_tracker.manufacturer }}
                </div>
              </div>
            </div>
            <div class="item-wrapper">
              <div class="item">
                <div class="label">
                  BHA gap width (ft) :
                  <div
                    v-if="configUpdated.bha_gap_width"
                    class="change-wrapper"
                  >
                    <el-tooltip placement="top-start">
                      <div
                        slot="content"
                        class="change-content"
                      >
                        <div class="first-row">
                          <span>{{ configUpdated.bha_gap_width.creation_name }}</span><span>{{ configUpdated.bha_gap_width.created_at }}</span>
                        </div>   
                        <div class="second-row">
                          {{ configUpdated.bha_gap_width.label }}
                        </div>               
                      </div>
                      <i class="el-icon-warning-outline" />
                    </el-tooltip>
                  </div>
                </div>
                <div class="value">
                  {{ configuration.bha_gap_width }}
                </div>
                <div
                  v-if="configuration.bha_gap_width_confirm"
                  class="comfirm-wrapper"
                >
                  <i class="el-icon-circle-check" />
                </div>
              </div>
            </div>
            <div class="item-wrapper">
              <div class="item">
                <div class="label">
                  Motor gap width (ft) :
                  <div
                    v-if="configUpdated.motor_gap_width"
                    class="change-wrapper"
                  >
                    <el-tooltip placement="top-start">
                      <div
                        slot="content"
                        class="change-content"
                      >
                        <div class="first-row">
                          <span>{{ configUpdated.motor_gap_width.creation_name }}</span><span>{{ configUpdated.motor_gap_width.created_at }}</span>
                        </div>   
                        <div class="second-row">
                          {{ configUpdated.motor_gap_width.label }}
                        </div>               
                      </div>
                      <i class="el-icon-warning-outline" />
                    </el-tooltip>
                  </div>
                </div>
                <div class="value">
                  {{ configuration.motor_gap_width }}
                </div>
                <div
                  v-if="configuration.motor_gap_width_confirm"
                  class="comfirm-wrapper"
                >
                  <i class="el-icon-circle-check" />
                </div>
              </div>
            </div>
            <div class="item-wrapper">
              <div class="item">
                <div class="label">
                  Maximum pier height (ft) :
                  <div
                    v-if="configUpdated.maximum_pier_height"
                    class="change-wrapper"
                  >
                    <el-tooltip placement="top-start">
                      <div
                        slot="content"
                        class="change-content"
                      >
                        <div class="first-row">
                          <span>{{ configUpdated.maximum_pier_height.creation_name }}</span><span>{{ configUpdated.maximum_pier_height.created_at }}</span>
                        </div>   
                        <div class="second-row">
                          {{ configUpdated.maximum_pier_height.label }}
                        </div>               
                      </div>
                      <i class="el-icon-warning-outline" />
                    </el-tooltip>
                  </div>
                </div>
                <div class="value">
                  {{ configuration.maximum_pier_height }}
                </div>
                <div
                  v-if="configuration.maximum_pier_height_confirm"
                  class="comfirm-wrapper"
                >
                  <i class="el-icon-circle-check" />
                </div>
              </div>
            </div>
            <div class="item-wrapper">
              <div class="item">
                <div class="label">
                  Pile position :
                  <div
                    v-if="configUpdated.pile_position"
                    class="change-wrapper"
                  >
                    <el-tooltip placement="top-start">
                      <div
                        slot="content"
                        class="change-content"
                      >
                        <div class="first-row">
                          <span>{{ configUpdated.pile_position.creation_name }}</span><span>{{ configUpdated.pile_position.created_at }}</span>
                        </div>   
                        <div class="second-row">
                          {{ configUpdated.pile_position.label }}
                        </div>               
                      </div>
                      <i class="el-icon-warning-outline" />
                    </el-tooltip>
                  </div>
                </div>
                <div class="value">
                  {{ configuration.pile_position }}
                </div>
                <div
                  v-if="configuration.pile_position_confirm"
                  class="comfirm-wrapper"
                >
                  <i class="el-icon-circle-check" />
                </div>
              </div>
            </div>
            <div class="block" />
          </div>
        </div>
      </div>
      <div class="content-row-wrapper">
        <!--Site info-->
        <div class="row">
          <div class="title">
            Site info
          </div>
          <div class="content">
            <div class="item-wrapper">
              <div class="item">
                <div class="label">
                  Module to module spacing (mm) :
                  <div
                    v-if="configUpdated.module_to_module_spacing"
                    class="change-wrapper"
                  >
                    <el-tooltip placement="top-start">
                      <div
                        slot="content"
                        class="change-content"
                      >
                        <div class="first-row">
                          <span>{{ configUpdated.module_to_module_spacing.creation_name }}</span><span>{{ configUpdated.module_to_module_spacing.created_at }}</span>
                        </div>   
                        <div class="second-row">
                          {{ configUpdated.module_to_module_spacing.label }}
                        </div>               
                      </div>
                      <i class="el-icon-warning-outline" />
                    </el-tooltip>
                  </div>
                </div>
                <div class="value">
                  {{ configuration.module_to_module_spacing }}
                </div>
                <div
                  v-if="configuration.module_to_module_spacing_confirm"
                  class="comfirm-wrapper"
                >
                  <i class="el-icon-circle-check" />
                </div>
              </div>
            </div>
            <div class="item-wrapper">
              <div class="item">
                <div class="label">
                  BHA gap extender (ft) :
                  <div
                    v-if="configUpdated.bha_gap_extender"
                    class="change-wrapper"
                  >
                    <el-tooltip placement="top-start">
                      <div
                        slot="content"
                        class="change-content"
                      >
                        <div class="first-row">
                          <span>{{ configUpdated.bha_gap_extender.creation_name }}</span><span>{{ configUpdated.bha_gap_extender.created_at }}</span>
                        </div>   
                        <div class="second-row">
                          {{ configUpdated.bha_gap_extender.label }}
                        </div>               
                      </div>
                      <i class="el-icon-warning-outline" />
                    </el-tooltip>
                  </div>
                </div>
                <div class="value">
                  {{ configuration.bha_gap_extender }}
                </div>
                <div
                  v-if="configuration.bha_gap_extender_confirm"
                  class="comfirm-wrapper"
                >
                  <i class="el-icon-circle-check" />
                </div>
              </div>
            </div>
            <div class="item-wrapper">
              <div class="item">
                <div class="label">
                  Motor gap extender (ft) :
                  <div
                    v-if="configUpdated.motor_gap_extender"
                    class="change-wrapper"
                  >
                    <el-tooltip placement="top-start">
                      <div
                        slot="content"
                        class="change-content"
                      >
                        <div class="first-row">
                          <span>{{ configUpdated.motor_gap_extender.creation_name }}</span><span>{{ configUpdated.motor_gap_extender.created_at }}</span>
                        </div>   
                        <div class="second-row">
                          {{ configUpdated.motor_gap_extender.label }}
                        </div>               
                      </div>
                      <i class="el-icon-warning-outline" />
                    </el-tooltip>
                  </div>
                </div>
                <div class="value">
                  {{ configuration.motor_gap_extender }}
                </div>
                <div
                  v-if="configuration.motor_gap_extender_confirm"
                  class="comfirm-wrapper"
                >
                  <i class="el-icon-circle-check" />
                </div>
              </div>
            </div>
            <div class="item-wrapper">
              <div class="item">
                <div class="label">
                  Number of modules per string (pcs) :
                  <div
                    v-if="configUpdated.of_modules_per_string"
                    class="change-wrapper"
                  >
                    <el-tooltip placement="top-start">
                      <div
                        slot="content"
                        class="change-content"
                      >
                        <div class="first-row">
                          <span>{{ configUpdated.of_modules_per_string.creation_name }}</span><span>{{ configUpdated.of_modules_per_string.created_at }}</span>
                        </div>   
                        <div class="second-row">
                          {{ configUpdated.of_modules_per_string.label }}
                        </div>               
                      </div>
                      <i class="el-icon-warning-outline" />
                    </el-tooltip>
                  </div>
                </div>
                <div class="value">
                  {{ configuration.of_modules_per_string }}
                </div>
                <div
                  v-if="configuration.of_modules_per_string_confirm"
                  class="comfirm-wrapper"
                >
                  <i class="el-icon-circle-check" />
                </div>
              </div>
            </div>
            <div class="item-wrapper">
              <div class="item">
                <div class="label">
                  Row to row spacing (ft) :
                  <div
                    v-if="configUpdated.row_to_row_spacing"
                    class="change-wrapper"
                  >
                    <el-tooltip
                      placement="top-start"
                    >
                      <div
                        slot="content"
                        class="change-content"
                      >
                        <div class="first-row">
                          <span>{{ configUpdated.row_to_row_spacing.creation_name }}</span><span>{{ configUpdated.row_to_row_spacing.created_at }}</span>
                        </div>   
                        <div class="second-row">
                          {{ configUpdated.row_to_row_spacing.label }}
                        </div>               
                      </div>
                      <i class="el-icon-warning-outline" />
                    </el-tooltip>
                  </div>
                </div>
                <div class="value">
                  {{ configuration.row_to_row_spacing }}
                </div>
                <div
                  v-if="configuration.row_to_row_spacing_confirm"
                  class="comfirm-wrapper"
                >
                  <i class="el-icon-circle-check" />
                </div>
              </div>
            </div>
            <div class="item-wrapper">
              <div class="item">
                <div class="label">
                  Number of modules per tracker (pcs) :
                  <div
                    v-if="configUpdated.number_of_moudules"
                    class="change-wrapper"
                  >
                    <el-tooltip placement="top-start">
                      <div
                        slot="content"
                        class="change-content"
                      >
                        <div class="first-row">
                          <span>{{ configUpdated.number_of_moudules.creation_name }}</span><span>{{ configUpdated.number_of_moudules.created_at }}</span>
                        </div>   
                        <div class="second-row">
                          {{ configUpdated.number_of_moudules.label }}
                        </div>               
                      </div>
                      <i class="el-icon-warning-outline" />
                    </el-tooltip>
                  </div>
                </div>
                <div class="value">
                  {{ configuration.number_of_moudules }}
                </div>
                <div
                  v-if="configuration.number_of_moudules_confirm"
                  class="comfirm-wrapper"
                >
                  <i class="el-icon-circle-check" />
                </div>
              </div>
            </div>
            <div class="item-wrapper">
              <div class="item">
                <div class="label">
                  Maximum current factor (A) :
                  <div
                    v-if="configUpdated.maximum_current_factor"
                    class="change-wrapper"
                  >
                    <el-tooltip placement="top-start">
                      <div
                        slot="content"
                        class="change-content"
                      >
                        <div class="first-row">
                          <span>{{ configUpdated.maximum_current_factor.creation_name }}</span><span>{{ configUpdated.maximum_current_factor.created_at }}</span>
                        </div>   
                        <div class="second-row">
                          {{ configUpdated.maximum_current_factor.label }}
                        </div>               
                      </div>
                      <i class="el-icon-warning-outline" />
                    </el-tooltip>
                  </div>
                </div>
                <div class="value">
                  {{ configuration.maximum_current_factor }}
                </div>
                <div
                  v-if="configuration.maximum_current_factor_confirm"
                  class="comfirm-wrapper"
                >
                  <i class="el-icon-circle-check" />
                </div>
              </div>
            </div>
            <div class="item-wrapper">
              <div class="item">
                <div class="label">
                  Overload protection factor :
                  <div
                    v-if="configUpdated.overload_protection_factor"
                    class="change-wrapper"
                  >
                    <el-tooltip placement="top-start">
                      <div
                        slot="content"
                        class="change-content"
                      >
                        <div class="first-row">
                          <span>{{ configUpdated.overload_protection_factor.creation_name }}</span><span>{{ configUpdated.overload_protection_factor.created_at }}</span>
                        </div>   
                        <div class="second-row">
                          {{ configUpdated.overload_protection_factor.label }}
                        </div>               
                      </div>
                      <i class="el-icon-warning-outline" />
                    </el-tooltip>
                  </div>
                </div>
                <div class="value">
                  {{ configuration.overload_protection_factor }}
                </div>
                <div
                  v-if="configuration.overload_protection_factor_confirm"
                  class="comfirm-wrapper"
                >
                  <i class="el-icon-circle-check" />
                </div>
              </div>
            </div>
            <div class="item-wrapper">
              <div class="item">
                <div class="label">
                  Maximum overload protection current :
                  <div
                    v-if="configUpdated.maximum_overload_protection_current"
                    class="change-wrapper"
                  >
                    <el-tooltip placement="top-start">
                      <div
                        slot="content"
                        class="change-content"
                      >
                        <div class="first-row">
                          <span>{{ configUpdated.maximum_overload_protection_current.creation_name }}</span><span>{{ configUpdated.maximum_overload_protection_current.created_at }}</span>
                        </div>   
                        <div class="second-row">
                          {{ configUpdated.maximum_overload_protection_current.label }}
                        </div>               
                      </div>
                      <i class="el-icon-warning-outline" />
                    </el-tooltip>
                  </div>
                </div>
                <div class="value">
                  {{ configuration.maximum_overload_protection_current }}
                </div>
                <div
                  v-if="
                    configuration.maximum_overload_protection_current_confirm
                  "
                  class="comfirm-wrapper"
                >
                  <i class="el-icon-circle-check" />
                </div>
              </div>
            </div>
            <div class="item-wrapper">
              <div class="item">
                <div class="label">
                  Module connection :
                  <div
                    v-if="configUpdated.module_connection"
                    class="change-wrapper"
                  >
                    <el-tooltip placement="top-start">
                      <div
                        slot="content"
                        class="change-content"
                      >
                        <div class="first-row">
                          <span>{{ configUpdated.module_connection.creation_name }}</span><span>{{ configUpdated.module_connection.created_at }}</span>
                        </div>   
                        <div class="second-row">
                          {{ configUpdated.module_connection.label }}
                        </div>               
                      </div>
                      <i class="el-icon-warning-outline" />
                    </el-tooltip>
                  </div>
                </div>
                <div class="value">
                  {{ configuration.module_connection }}
                </div>
                <div
                  v-if="configuration.module_connection_confirm"
                  class="comfirm-wrapper"
                >
                  <i class="el-icon-circle-check" />
                </div>
              </div>
            </div>
            <div class="item-wrapper">
              <div class="item">
                <div class="label">
                  Module orientation :
                  <div
                    v-if="configUpdated.module_orientation"
                    class="change-wrapper"
                  >
                    <el-tooltip placement="top-start">
                      <div
                        slot="content"
                        class="change-content"
                      >
                        <div class="first-row">
                          <span>{{ configUpdated.module_orientation.creation_name }}</span><span>{{ configUpdated.module_orientation.created_at }}</span>
                        </div>   
                        <div class="second-row">
                          {{ configUpdated.module_orientation.label }}
                        </div>               
                      </div>
                      <i class="el-icon-warning-outline" />
                    </el-tooltip>
                  </div>
                </div>
                <div class="value">
                  {{ configuration.module_orientation }}
                </div>
                <div
                  v-if="configuration.module_orientation_confirm"
                  class="comfirm-wrapper"
                >
                  <i class="el-icon-circle-check" />
                </div>
              </div>
            </div>
            <div class="item-wrapper">
              <div class="item">
                <div class="label">
                  Messenger wire or Trench :
                  <div
                    v-if="configUpdated.cab_or_trench"
                    class="change-wrapper"
                  >
                    <el-tooltip placement="top-start">
                      <div
                        slot="content"
                        class="change-content"
                      >
                        <div class="first-row">
                          <span>{{ configUpdated.cab_or_trench.creation_name }}</span><span>{{ configUpdated.cab_or_trench.created_at }}</span>
                        </div>   
                        <div class="second-row">
                          {{ configUpdated.cab_or_trench.label }}
                        </div>               
                      </div>
                      <i class="el-icon-warning-outline" />
                    </el-tooltip>
                  </div>
                </div>
                <div class="value">
                  {{ configuration.cab_or_trench }}
                </div>
                <div
                  v-if="configuration.cab_or_trench_confirm"
                  class="comfirm-wrapper"
                >
                  <i class="el-icon-circle-check" />
                </div>
              </div>
            </div>
            <div class="item-wrapper">
              <div class="item">
                <div class="label">
                  CBX outlet length (ft) :
                  <div
                    v-if="configUpdated.cbx_outlet_length"
                    class="change-wrapper"
                  >
                    <el-tooltip placement="top-start">
                      <div
                        slot="content"
                        class="change-content"
                      >
                        <div class="first-row">
                          <span>{{ configUpdated.cbx_outlet_length.creation_name }}</span><span>{{ configUpdated.cbx_outlet_length.created_at }}</span>
                        </div>   
                        <div class="second-row">
                          {{ configUpdated.cbx_outlet_length.label }}
                        </div>               
                      </div>
                      <i class="el-icon-warning-outline" />
                    </el-tooltip>
                  </div>
                </div>
                <div class="value">
                  {{ configuration.cbx_outlet_length }}
                </div>
                <div
                  v-if="configuration.cbx_outlet_length_confirm"
                  class="comfirm-wrapper"
                >
                  <i class="el-icon-circle-check" />
                </div>
              </div>
            </div>
            <div class="item-wrapper">
              <div class="item">
                <div class="label">
                  CBX height (ft) :
                  <div
                    v-if="configUpdated.cbx_height"
                    class="change-wrapper"
                  >
                    <el-tooltip placement="top-start">
                      <div
                        slot="content"
                        class="change-content"
                      >
                        <div class="first-row">
                          <span>{{ configUpdated.cbx_height.creation_name }}</span><span>{{ configUpdated.cbx_height.created_at }}</span>
                        </div>   
                        <div class="second-row">
                          {{ configUpdated.cbx_height.label }}
                        </div>               
                      </div>
                      <i class="el-icon-warning-outline" />
                    </el-tooltip>
                  </div>
                </div>
                <div class="value">
                  {{ configuration.cbx_height }}
                </div>
                <div
                  v-if="configuration.cbx_height_confirm"
                  class="comfirm-wrapper"
                >
                  <i class="el-icon-circle-check" />
                </div>
              </div>
            </div>
            <div class="item-wrapper">
              <div class="item">
                <div class="label">
                  Distance from CBX to row head (ft) :
                  <div
                    v-if="configUpdated.distance_from_cbx_to_row_head"
                    class="change-wrapper"
                  >
                    <el-tooltip placement="top-start">
                      <div
                        slot="content"
                        class="change-content"
                      >
                        <div class="first-row">
                          <span>{{ configUpdated.distance_from_cbx_to_row_head.creation_name }}</span><span>{{ configUpdated.distance_from_cbx_to_row_head.created_at }}</span>
                        </div>   
                        <div class="second-row">
                          {{ configUpdated.distance_from_cbx_to_row_head.label }}
                        </div>               
                      </div>
                      <i class="el-icon-warning-outline" />
                    </el-tooltip>
                  </div>
                </div>
                <div class="value">
                  {{ configuration.distance_from_cbx_to_row_head }}
                </div>
                <div
                  v-if="configuration.distance_from_cbx_to_row_head_confirm"
                  class="comfirm-wrapper"
                >
                  <i class="el-icon-circle-check" />
                </div>
              </div>
            </div>
            <div class="item-wrapper">
              <div class="item">
                <div class="label">
                  Trench depth (ft) :
                  <div
                    v-if="configUpdated.cab_height_or_trench_depth"
                    class="change-wrapper"
                  >
                    <el-tooltip placement="top-start">
                      <div
                        slot="content"
                        class="change-content"
                      >
                        <div class="first-row">
                          <span>{{ configUpdated.cab_height_or_trench_depth.creation_name }}</span><span>{{ configUpdated.cab_height_or_trench_depth.created_at }}</span>
                        </div>   
                        <div class="second-row">
                          {{ configUpdated.cab_height_or_trench_depth.label }}
                        </div>               
                      </div>
                      <i class="el-icon-warning-outline" />
                    </el-tooltip>
                  </div>
                </div>
                <div class="value">
                  {{ configuration.cab_height_or_trench_depth }}
                </div>
                <div
                  v-if="configuration.cab_height_or_trench_depth_confirm"
                  class="comfirm-wrapper"
                >
                  <i class="el-icon-circle-check" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div
      v-else
      class="no-data-wrapper"
    >
      <div class="img-wrapper">
        <img
          src="@/assets/image/no-data.png"
          alt=""
          class="no-data-img"
        >
      </div>
      <div class="label">
        No configuration
      </div>
    </div>

    <!--Solar module-->
    <POPDialog
      :dialog="{
        title: 'Solar module',
        type: 'dialog',
        visible: solarDetailVisible,
        width: '1280px'
      }"
      @dialogClosed="
        (val) => {
          solarDetailVisible = val;
        }
      "
    >
      <template #dialog-content>
        <solarModel :solar-data="solar_module" />
      </template>
    </POPDialog>
  </div>
</template>

<script>
import POPDialog from '@/components/pop-dialog.vue';
import solarModel from '../components/solar-model.vue';
export default {
  name: '',
  components: {
    POPDialog,
    solarModel
  },
  props: {
    configurationData: {
      type: Object,
      default: null
    }
  },
  data() {
    return {
      isHas: false,
      configuration: {},
      solar_module: {},
      racking_tracker: {},
      solarDetailVisible: false,
       // v0.9.0 configuration里新加了updated字段，用来展示config中发生过变更的字段
      configUpdated: {}
    };
  },
  watch: {
    configurationData: {
      handler(newVal) { 
        if (newVal && newVal.id) {
          this.configuration = newVal;

          // v0.9.0 configuration里新加了updated字段，用来展示config中发生过变更的字段
          this.configUpdated = newVal['updated'];
          if(newVal['solar_module']){
            this.solar_module = newVal['solar_module'];
          }else{
            this.solar_module = {};
          }
          if(newVal['racking_tracker']){
            this.racking_tracker = newVal['racking_tracker'];
          }else{
            this.racking_tracker = {};
          }
          this.isHas = true;
        } else {
          this.isHas = false;
        }
      },
      deep: true,
      immediate: true
    }
  },
  methods: {}
};
</script>
<style>

</style>

<style scoped lang="less">
.el-tooltip__popper {
  border-radius: 2px;
  background: #4E4E4E;
  .change-content {
              display: flex;
              flex-direction: column;
            gap: 15px;

            .first-row {
              display: flex;
              gap: 16px
            }
            }
}

.configuration-content-container {
  min-height: 347px;
  margin-top: 16px;
  display: flex;
  transition: 0.5s;
  transition-property: all;
  transition-duration: 0.5s;
  transition-timing-function: ease;
  transition-delay: 0s;
  .content-row-wrapper {
    flex: 1;
    min-height: 347px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    .row {
      flex: 1;
      border-radius: 4px 4px 0px 0px;
      border: 1px solid #eeeeee;
      .title {
        height: 32px;
        background: #f4f5f9;
        border-radius: 4px 4px 0px 0px;
        border-bottom: 1px solid #eeeeee;
        font-size: 14px;
        color: #606266;
        display: flex;
        align-items: center;
        justify-content: center;
      }
      .content {
        border-radius: 0px 0px 4px 4px;
        border-top: 0px;
        padding: 8px 8px 16px 8px;
        display: flex;
        flex-wrap: wrap;
        .item-wrapper {
          width: 50%;
          padding: 8px 0px 3px 0px;
          position: relative;
          .item {
            display: flex;
            align-items: center;
            justify-content: space-between;
            font-size: 13px;
            color: #606266;
            line-height: 24px;
            border-bottom: 1px solid #eeeeee;
            margin: 0px 16px 0px 16px;
          }
          .label{
            display: flex;
            align-items: center;
            gap: 3px
          }
          .value {
            flex: 1;
            display: flex;
            justify-content: flex-end;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            margin-left: 24px;
          }
          .comfirm-wrapper {
            font-size: 12px;
            color: #67c23a;
            position: absolute;
            right: -1px;
          }
          .change-wrapper {
            font-size: 14px;
            color: #FFD36A;
          }
        }
        .gap {
          margin-right: 32px;
        }
        .block {
          width: 50%;
          min-width: 394px;
          display: flex;
          padding: 8px 0px 3px 0px;
          line-height: 24px;
        }
        .manufacturer-more {
          flex: 1;
          display: flex;
          align-items: center;
          justify-content: space-between;
          .value {
            flex: 1;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            display: flex;
            align-items: center;
            justify-content: flex-end;
            margin-left: 24px;
          }
          .more {
            margin-left: 8px;
            display: flex;
            align-items: center;
            .image {
              width: 16px;
              height: 16px;
            }
            .image:hover {
              cursor: pointer;
            }
          }
        }
      }
    }
  }
}
.no-data-wrapper {
  width: 100%;
  height: 347px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 16px;
  border-radius: 4px;
  border: 1px solid #eeeeee;
  .no-data-img {
    width: 120px;
    height: 120px;
  }
  .label {
    font-size: 13px;
    color: #909399;
    margin-top: 5px;
  }
}
</style>
