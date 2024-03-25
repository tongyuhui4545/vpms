<template>
  <div class="new-cable-form-container">
    <div class="project-name-container">
      <p><span style="color: red">*</span>Project name:</p>
      <el-input v-model="projectName" />
    </div>
    <div class="product-table-title">
      <p>Product Details</p>
    </div>
    <el-table
      :data="tableData"
      border
    >
      <!-- product-type -->
      <el-table-column prop="productType">
        <template slot="header">
          <span style="color: red">*</span>Project Type
        </template>
        <template slot-scope="scope">
          <el-select
            v-model="scope.row.productType"
            size="mini"
            @change="changeType(scope.row)"
          >
            <el-option
              label="MV"
              value="MV"
            />
            <el-option
              label="PV"
              value="PV"
            />
          </el-select>
        </template>
      </el-table-column>
      <!-- product-name -->
      <el-table-column prop="productName">
        <template slot="header">
          <span style="color: red">*</span>Product Name
        </template>
        <template slot-scope="scope">
          <el-select
            v-if="scope.row.productType === 'MV'"
            v-model="scope.row.productName"
            size="mini"
            filterable
          >
            <el-option
              v-for="option in productNameOptionsMV"
              :key="option.id"
              :label="option.label"
              :value="option.id"
            />
          </el-select>
          <el-select
            v-if="scope.row.productType === 'PV'"
            v-model="scope.row.productName"
            size="mini"
            filterable
          >
            <el-option
              v-for="option in productNameOptionsPV"
              :key="option.id"
              :label="option.label"
              :value="option.id"
            />
          </el-select>
        </template>
      </el-table-column>
      <!-- color -->
      <el-table-column prop="color">
        <template slot="header">
          <span
            style="color: red"
          >*</span>Color
        </template>
        <template slot-scope="scope">
          <el-input
            v-model="scope.row.color"
            size="mini"
            placeholder="Please input color"
            :disabled="scope.row.productType === 'MV'"
          />
        </template>
      </el-table-column>
      <!-- length -->
      <el-table-column
        prop="length"
        width="160"
      >
        <template slot="header">
          <span style="color: red">*</span>Length(FT)
        </template>
        <template slot-scope="scope">
          <el-input-number
            v-model="scope.row.length"
            size="mini"
            :min="0"
            setp="1"
            step-strictly
          />
        </template>
      </el-table-column>
      <!-- packing-method -->
      <el-table-column prop="packingMethod">
        <template slot="header">
          <span style="color: red">*</span>Packing Method
        </template>
        <template slot-scope="scope">
          <el-select
            v-if="scope.row.productType === 'MV'"
            v-model="scope.row.packingMethod"
            size="mini"
            disabled
          >
            <el-option
              label="Single"
              value="1"
            />
          </el-select>
          <el-select
            v-else
            v-model="scope.row.packingMethod"
          >
            <el-option
              label="Single"
              value="1"
            />
            <el-option
              label="Parallel"
              value="2"
            />
          </el-select>
        </template>
      </el-table-column>
      <!-- delete -->
      <el-table-column width="80">
        <template slot-scope="scope">
          <div
            class="delete-btn"
            @click="handleDelete(scope.row)"
          >
            <img
              src="@/assets/IconDesigns/delete_gray.png"
              alt="delete_gray"
            >
          </div>
        </template>
      </el-table-column>
    </el-table>
    <div
      class="dashed-btn"
      @click="addNewRow"
    >
      + New
    </div>
  </div>
</template>

<script>
import { cableSegmentList, addCableProject, editCableProject } from '@/api';
import { debounce } from '@/utils/debounce';

export default {
  props: {
    editedSegmentFormData: {
      type: Object,
      default: () => { return {} }
    }
  },
  data() {
    return {
      colorRequired: true,
      projectName: '',
      projectId: '',
      tableData: [],
      productNameOptionsMV: [],
      productNameOptionsPV: [],
      debouncedSubmitForm: null
    };
  },
  watch: {
    editedSegmentFormData: {
      handler(val) {
        if (!val) {
          return;
        }
        this.projectName = val.project_name;
        this.projectId = val.project_id;
        this.tableData = val.product_details
          ? val.product_details.map((item) => {return {
              productType: item.type,
              id: item.id || '',
              productName: item.cable_id,
              color: item.cable_color,
              length: item.cable_length,
              packingMethod: item.packing_method.toString()
            }})
          : [];
      },
      deep: true,
      immediate: true
    }
  },
  mounted() {
    this.getProductNameOptions();
    this.debouncedSubmitForm = debounce(this.submitForm, 500);
    // this.initMVColor();
  },
  methods: {
    initMVColor() {
      for(let item of this.tableData) {
        if(item.productType === 'MV') { 
          item.color = ' ';
        }
      }
    },
    changeType(row) {
      row.color = '';
      row.length = 0;
      if(row.productType === 'MV') {
        row.packingMethod = '1';
        row.color = ' '
      } else {
        this.colorRequired = false;
        row.packingMethod = ''
      }
        row.productName = '';
    },
    handleDelete(row) {
      const indexOfTargetItem = this.tableData.findIndex(
        (item) => {return item.id === row.id}
      );
      if (indexOfTargetItem !== -1) {
        this.tableData.splice(indexOfTargetItem, 1);
        this.$message.success('The row is deleted successfully');
      } else {
        this.$message.error('Row not found.');
      }
    },
    addNewRow() {
      //用当前时间戳作为唯一id
      const timestamp = new Date().getTime();
      this.tableData.push({
        id: timestamp,
        productType: 'MV',
        productName: this.productNameOptionsMV[0].id,
        color: ' ',
        length: '',
        packingMethod: this.productNameOptionsMV[0].packingMethod.toString()
      });
    },
    getProductNameOptions() {
      cableSegmentList({ type: 'MV' })
        .then((res) => {
          if (res.err_code === 0) {
            this.productNameOptionsMV = res.data.list.map((item) => {return {
              id: item.id,
              label: item.name,
              value: item.name,
              packingMethod: item.default_packing_method.toString()
            }});
          }
        })
        .catch((err) => {return this.$message.error(err)});

      cableSegmentList({ type: 'PV' })
        .then((res) => {
          if (res.err_code === 0) {
            this.productNameOptionsPV = res.data.list.map((item) => {return {
              id: item.id,
              label: item.name,
              value: item.name,
              packingMethod: item.default_packing_method.toString()
            }});
          }
        })
        .catch((err) => {return this.$message.error(err)});
    },
    validateTableData() {
      //校验table里的内容是否有空白处
      if (this.tableData.length === 0) {
        return true;
      } else {
        const checkedValue = this.tableData.map((item) => {
          const { ...rest } = item;
          return Object.values(rest).some((value) => {return value === ''});
        });
        return checkedValue.some((item) => {
          return item === true;
        });
      }
    },
    //检验是否所有length都为正数
    checkLength() {
      const allLengthData = this.tableData.map((item) => {
        return item.length;
      });
      return allLengthData.some((item) => {
        return item === 0;
      });
    },
    //检查是否所有信息都填写并且合法
    validateInfo() {
      let hasEmptyField = this.validateTableData();
      let checkLengthNumberPositive = this.checkLength();
      //校验所有内容是否有空白处
      if (this.projectName.trim() === '') {
        this.$message.error('Please input a project name');
        return false;
      }
      if (hasEmptyField) {
        if (this.tableData.length === 0) {
          this.$message.error('Please add some items');
        } else {
          this.$message.error(
            'Please fill all the fields required for the cable segments'
          );
        }
        return false;
      }
      if (checkLengthNumberPositive) {
        this.$message.error('Length should be a positive number');
      } else {
        return true;
      }
    },
    submitForm(underEditing) {
      const checkResult = this.validateInfo();
      if (checkResult) {
        const product_details = this.tableData.map((item) => {return {
          id: item.id || 0,
          cable_id: item.productName,
          cable_length: item.length,
          packing_method: parseFloat(item.packingMethod),
          cable_color: item.color
        }});
        const params = {
          project_name: this.projectName,
          project_id: underEditing ? this.projectId : 0,
          product_details
        };
        if (underEditing) {
          editCableProject(params)
            .then((res) => {
              if (res.err_code === 0) {
                this.$emit('operate-segment-success', 'edit');
                this.clearFormData();
              } else {
                this.$message.error(res.err_msg);
              }
            })
            .catch((err) => {
              return err
            });
        } else {
          addCableProject(params)
            .then((res) => {
              if (res.err_code === 0) {
                this.$emit('operate-segment-success', 'add');
                this.clearFormData();
              } else {
                this.$message.error(res.err_msg);
              }
            })
            .catch((err) => {
              return err
            });
        }
      }
    },
    clearFormData() {
      this.tableData = [];
      this.projectName = '';
    }
  }
};
</script>

<style>
/* stylelint-disable-next-line selector-class-pattern */
.new-cable-form-container .el-table th.el-table__cell {
  background-color: #f5f7fa;
}

/* stylelint-disable-next-line selector-class-pattern */
.new-cable-form-container .el-table--border .el-table__cell {
  border-right: none;
}
</style>

<style lang="less" scoped>
.new-cable-form-container {
  width: 100%;
  background-color: #ffff;

  .product-table-title {
    margin-top: 29px;
    // margin-bottom: -15px;
    p {
      font-size: 14px;
      font-family: 'PingFang SC-Regular', 'PingFang SC', sans-serif;
      font-weight: 400;
      color: #909399;
    }
  }

  .dashed-btn {
    margin-top: 15px;
    width: 100%;
    height: 40px;
    border: 1px dashed #007bff;
    border-radius: 4px;
    color: #007bff;
    text-align: center;
    line-height: 40px;
    cursor: pointer;
  }

  .project-name-container {
    display: flex;
    align-items: center;
    justify-content: flex-start;

    p {
      width: 180px;
    }
  }

  .delete-btn {
    &:hover {
      cursor: pointer;
    }
    
    img {
      width: 16px;
      height: 16px;
    }
  }
}
</style>
