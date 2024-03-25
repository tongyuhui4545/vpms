<template>
  <el-dialog
    title="Reject"
    width="480px"
    :visible.sync="formVisibleData"
    :close-on-click-modal="false"
    @close="handleCancel"
  >
    <el-form
      ref="usRejectForm"
      :model="rejectForm"
      :rules="rules"
      label-width="120px"
    >
      <el-form-item
        label="Reason:"
        class="upload-form"
        prop="reason"
      >
        <el-select
          v-model="rejectForm.rejectReason"
          filterable
          placeholder="Please input and select"
          size="small"
        >
          <el-option
            v-for="(item, key) in rejectReasonList"
            :key="key"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item
        label="Comment:"
        class="upload-form"
        prop="comment"
      >
        <el-input
          v-model="rejectForm.rejectComment"
          filterable
          placeholder="Please enter your comment"
          size="small"
          type="textarea"
        />
      </el-form-item>
    </el-form>
    <span
      slot="footer"
      class="dialog-footer"
    >
      <el-button
        size="mini"
        @click="handleCancel"
      >Cancel</el-button>
      <el-button
        type="primary"
        size="mini"
        @click="handleConfirm"
      >Confirm</el-button>
    </span>
  </el-dialog>
</template>

<script>
export default {
  props: {
    formVisible: {
      type: Boolean,
      default: false
    },
    type: {
      type: String,
      default: 'bidding'
    }
  },
  data() {
    return {
      formVisibleData: false,
      rejectForm: {
        rejectReason: '',
        rejectComment: ''
      },
      rejectReasonList: [],
      rules: {
        reason: [
          { required: true, message: 'Please select a reason', trigger: 'blur' }
        ],
        comment: [
          {
            required: true,
            message: 'Please enter a comment',
            trigger: 'input'
          }
        ]
      }
    };
  },
  watch: {
    type: {
      handler(val) {
        if (val === 'bidding') {
          this.rejectReasonList = [
            { key: 1, label: 'Customer updates', value: 'Customer updates' },
            { key: 2, label: 'Drawing errors', value: 'Drawing errors' },
            { key: 3, label: 'Quote errors', value: 'Quote errors' },
            { key: 4, label: 'Others', value: 'Others' }
          ];
        }
        if (val === 'formal') {
          this.rejectReasonList = [
            { key: 4, label: 'Others', value: 'Others' }
          ];
        }
      },
      immediate: true
    },
    formVisible(val) {
      this.formVisibleData = val;
    }
  },
  methods: {
    handleCancel() {
      this.rejectForm = {
        rejectReason: '',
        rejectComment: ''
      };
      this.$emit('cancel');
    },
    handleConfirm() {
      if (
        this.rejectForm.rejectReason === '' ||
        this.rejectForm.rejectComment === ''
      ) {
        this.$message({
          message: 'Please fill in the required fields',
          type: 'warning'
        });
        return false;
      }
      this.$emit('confirm', this.rejectForm);
    }
  }
};
</script>
