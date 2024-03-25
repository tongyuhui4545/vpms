<template>
  <div>
    <el-dialog>
      <span slot="title">{{ title }}</span>
      <span>{{ content }}</span>
      <span
        slot="footer"
        class="dialog-footer"
      >
        <el-button>Cancel</el-button>
        <el-button type="primary">Submit</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: '',
  components: {},
  props: {
    title: {
      type: String,
      default: 'Confirm'
    },
    content: {
      type: String,
      default: 'Are you sure to make the change?'
    }
  },
  data() {
    return {};
  },
  computed: {},
  watch: {},
  //   mounted () {},
  //   created () {},
  methods: {}
};
</script>

<style lang="less" scoped></style>
