<template>
  <el-dialog
    :close-on-click-modal="false"
    title="Simulation task"
    :visible.sync="showDialog"
    width="560px"
    @close="close"
  >
    <div class="content">
      <el-form
        ref="form"
        :model="formData"
        :rules="rules"
        label-width="180px"
        label-position="left"
      >
        <el-form-item
          label="Simulation due date"
          required
        >
          <el-date-picker
            v-model="formData.simu_due_date"
            value-format="yyyy-MM-dd HH:mm:ss"
            style="width: 330px"
            size="mini"
            type="datetime"
            placeholder="Please enter date"
          />
        </el-form-item>
        <el-form-item
          label="Phase"
          required
        >
          <el-select
            v-model="formData.phase"
            placeholder="Please select"
            size="mini"
            style="width: 330px"
          >
            <el-option
              v-for="opt in phaseOptionsData"
              :key="opt.value"
              :value="opt.value"
              :label="opt.label"
            />
          </el-select>
        </el-form-item>
      </el-form>
    </div>
    <div class="footer">
      <el-button
        size="mini"
        type="primary"
        @click="handleGeneratingSimulation"
      >
        Submit
      </el-button>
    </div>
  </el-dialog>
</template>

<script>
export default {
  name: 'SimulationGeneration',
  props: {
    phaseOptions: {
      type: Array,
      default: () => {return [
        {
          value: '1',
          label: 'Phase 1'
        },
        {
          value: '2',
          label: 'Phase 2'
        }
      ]}
    }
  },
  data() {
    return {
      showDialog: false,
      formData: {
        simu_due_date: null,
        phase: null
      },
      phaseOptionsData: [],
      rules: {
        simu_due_date: [
          {
            required: true,
            message: 'Please select date',
            trigger: ['blur', 'submit']
          }
        ],
        phase: [
          {
            required: true,
            message: 'Please select phase',
            trigger: ['blur', 'submit']
          }
        ]
      }
    };
  },
  watch: {
    phaseOptions: {
      handler (val) {
        this.phaseOptionsData = val.map((item) => {
          return {
            value: item.id,
            label: item.version
          };
        });
      },
      immediate: true
    }
  },
  methods: {
    handleGeneratingSimulation() {
      if (!this.formData.simu_due_date || !this.formData.phase) {
        this.$message({
          type: 'error',
          message: 'Please fill in the required fields'
        });
        return false;
      } else {
        this.$emit('generate-simulation', this.formData);
        this.formData = {
          simu_due_date: null,
          phase: null
        };
        this.close();
      }
    },
    show() {
      this.showDialog = true;
    },
    close() {
      this.showDialog = false;
    }
  }
};
</script>

<style lang="less" scoped>
.footer {
  display: flex;
  justify-content: flex-end;
  padding: 10px 20px;
}
</style>
