<template>
  <div
    class="vertical-divider"
    :style="{ height: `${dividerHeight}px` }" 
  />
</template>

<script>
export default {
    props: {
        dividerHeight: {
            type: String,
            default: '32'
        }
    }
}
</script>

<style lang="less" scoped>
.vertical-divider {
    width: 0;
    border: 1px solid #EEE;
}
</style>