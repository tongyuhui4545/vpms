<template>
  <div>
    <el-dialog :visible.sync="showFileUpload">
      <div
        slot="title"
        class="title"
      >
        {{ title }}
      </div>
      <div class="content">
        <span>{{ fileName }}</span>
        <el-button
          type="primary"
          size="large"
        >
          Click to upload
        </el-button>
      </div>
      <div
        slot="footer"
        class="footer"
      >
        <el-button>Cancel</el-button>
        <el-button type="primary">
          Submit
        </el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'FileUpload',
  props: {
    title: {
      type: String,
      default: ''
    },
    fileName: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      showFileUpload: false,
      // eslint-disable-next-line vue/no-dupe-keys
      title: '',
      // eslint-disable-next-line vue/no-dupe-keys
      fileName: ''
    };
  },
  methods: {
    show() {
      this.showFileUpload = true;
    },
    close() {
      this.showFileUpload = false;
    }
  }
};
</script>

<script lang="less" scoped></script>
