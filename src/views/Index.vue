<template>
  <div>
    <!--头部-->
    <Header />
    <!--侧导航-->
    <!-- <Slider></Slider> -->
    <!--内容区域-->
    <div class="main-container animate">
      <keep-alive>
        <router-view
          v-if="$route.meta.keepAlive"
          style="margin-right: 16px"
        />
      </keep-alive>
      <router-view
        v-if="!$route.meta.keepAlive"
        style="margin-right: 16px"
      />
    </div>
  </div>
</template>

<script>
import Header from '@/components/Header.vue';
export default {
  name: '',
  components: {
    // eslint-disable-next-line vue/no-reserved-component-names
    Header
  },
  data() {
    return {};
  },
  methods: {}
};
</script>

<style lang="less" scoped>
.main-container {
  width: calc(100% - 10px);
  position: absolute;
  left: 10px;
  top: 75px;
}
</style>
