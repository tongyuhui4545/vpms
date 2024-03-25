<template>
  <div class="dialog-container">
    <el-dialog
      :title="title"
      :visible.sync="showDialog"
      width="1280px"
      :close-on-click-modal="false"
      @close="onClose"
    >
      <NewBiddingProjectForm
        ref="newBiddingProjectForm"
        @add-success="onClose"
      />
      <div
        slot="footer"
        class="dialog-footer"
      >
        <el-button @click="onClose">
          Cancel
        </el-button>
        <el-button
          type="primary"
          @click="handleSubmit"
        >
          Submit
        </el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import NewBiddingProjectForm from './NewBiddingProjectForm.vue';

export default {
  name: 'AddBiddingProjectModal',
  components: {
    NewBiddingProjectForm
  },
  props: {
    title: {
      type: String,
      default: 'New bidding'
    }
  },
  data() {
    return {
      showDialog: false
    };
  },
  methods: {
    show() {
      this.showDialog = true;
    },
    onClose() {
      this.$refs.newBiddingProjectForm.resetForm();
      this.$emit('refresh');
      this.showDialog = false;
    },
    handleSubmit() {
      this.$refs.newBiddingProjectForm.verifyForm();
    }
  }
};
</script>
