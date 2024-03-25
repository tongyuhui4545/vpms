<template>
  <div class="project-container">
    <div class="slider-wrapper">
      <Slider />
    </div>
    <div class="page-wrapper">
      <router-view />
    </div>
  </div>
</template>
  
  <script>
  import Slider from './components/slider.vue';
  import { projectDetail } from '@/api/index.js';
  export default {
    name: '',
    components: {
      Slider
    },
    data() {
      return {};
    },
    created() {
      this.getProjectDetail();
    },
    methods: {
      getProjectDetail() {
        projectDetail({
          id: this.$route.params.project_id
        }).then((res) => {
          if (res.code === 200) {
            localStorage.setItem('project', JSON.stringify(res.data));
          }
        });
      }
    }
  };
  </script>
  <style scoped lang="less">
  .project-container {
    .page-wrapper {
      width: calc(100% - 122px);
      position: absolute;
      left: 96px;
      background: #ffffff;
      border-radius: 8px;
      margin-left: 8px;
      overflow-x: hidden;
    }
  }
  </style>
  