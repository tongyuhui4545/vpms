<template>
  <div class="folder-modal-container">
    <el-dialog :visible.sync="showModal">
      <div slot="title">
        {{ title }}
      </div>
      <div slot="footer">
        <el-button @click="closeModal">
          Cancel
        </el-button>
        <el-button @click="handleConfirm">
          Confirm
        </el-button>
      </div>
    </el-dialog>
  </div>
</template>
  
  <script>
  export default {
    name: '',
    components: {},
    props: {},
    data() {
      return {
        showModal: false
      };
    },
    computed: {},
    watch: {},
    //   mounted () {},
    //   created () {},
    methods: {
      closeModal() {
        this.showModal = false;
      },
      handleConfirm() {
        return;
      }
    }
  };
  </script>
  
  <style lang="less" scoped></style>
  