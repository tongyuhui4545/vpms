<template>
  <div class="crumb-wrapper">
    <el-breadcrumb separator="/">
      <el-breadcrumb-item
        v-for="(item, index) in breadCrumbs"
        :key="item.id"
        :class="{ 'last-crumb': isLastCrumb(index) }"
      >
        <span
          class="crumb-clickable"
          @click="handleClickCrumb(item)"
        >{{
          item.name
        }}</span>
      </el-breadcrumb-item>
    </el-breadcrumb>
  </div>
</template>
  
  <script>
  export default {
    name: '',
    components: {},
    props: {
      breadCrumbs: {
        type: Array,
        default: () => {
          return [];
        }
      }
    },
    data() {
      return {
        crumbPicked: null
      };
    },
    computed: {},
    watch: {},
    //   mounted () {},
    //   created () {},
    methods: {
      handleClickCrumb(item) {
        this.$emit('crumb-clicked', item);
      },
      isLastCrumb(index) {
        return index === this.breadCrumbs.length - 1;
      }
    }
  };
  </script>
  
  <style lang="less" scoped>
  .crumb-wrapper {
    display: flex;
    align-items: center;
    height: 35px;
    padding: 0 40px;
  
    .crumb-clickable {
      color: #409eff;
      cursor: pointer;
    }
  
    .last-crumb .crumb-clickable {
      color: #303133;
      cursor: default;
    }
  }
  </style>
  