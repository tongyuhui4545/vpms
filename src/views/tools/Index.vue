<template>
  <div class="main-container">
    <!--头部-->
    <HeaderForToolsPage />
    <!--内容区域-->
    <div>
      <router-view />
    </div>
  </div>
</template>

<script>
import HeaderForToolsPage from '@/components/HeaderForToolsPage.vue';
export default {
  name: '',
  components: {
    HeaderForToolsPage
  },
  data() {
    return {};
  },
  methods: {}
};
</script>

<style lang="less" scoped>
.main-container {
  width: 98%;
  position: absolute;
  height: 100vh;
  left: 15px;
  // right:15px;
  top: 75px;
}
</style>
