<template>
  <el-progress
    :percentage="downloadProgress"
    type="circle"
    width="15"
    :stroke-width="2"
    :text-inside="true"
  />
</template>

<script>
export default {
  props: {
    downloadProgress: {
      type: Number,
      default: 0
    }
  }
};
</script>
