<template>
  <div class="project-detail-slider">
    <div class="slider-wrapper">
      <div
        v-for="(item, key) in sliderData"
        :key="key"
        :class="activeSlider == item.value ? 'slider-row-active' : 'slider-row'"
        @click="handleSlider(item)"
        @mouseenter="enterSlider(item)"
        @mouseleave="leaveSlider"
      >
        <div class="slider-icon">
          <img
            :src="
              activeSlider == item.value || mouseSlider === item.value
                ? item.active
                : item.icon
            "
            alt=""
            class="slider-image"
          >
        </div>
        <div class="slider-label">
          {{ item.label }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: '',
  components: {},
  data() {
    return {
      project_id: null,
      sliderData: [
        {
          value: 'overview',
          label: 'Overview',
          icon: require('@/assets/image/overview.png'),
          active: require('@/assets/image/overview-active.png')
        },
        {
          value: 'phase',
          label: 'Phase',
          icon: require('@/assets/image/phase.png'),
          active: require('@/assets/image/phase-active.png')
        },
        {
          value: 'quote',
          label: 'Quote',
          icon: require('@/assets/image/quote.png'),
          active: require('@/assets/image/quote-active.png')
        },
        {
          value: 'task',
          label: 'Task',
          icon: require('@/assets/image/task.png'),
          active: require('@/assets/image/task-active.png')
        },
        {
          value: 'label&sim',
          label: 'Label&Sim',
          icon: require('@/assets/image/label_sim.png'),
          active: require('@/assets/image/label_sim-active.png')
        },
        {
          value: 'files',
          label: 'Files',
          icon: require('@/assets/image/files.png'),
          active: require('@/assets/image/files-active.png')
        }
      ],
      activeSlider: 'overview',
      mouseSlider: ''
    };
  },
  watch: {
    '$route.params': {
      handler() {
        this.backOverview();
      },
      deep: true,
      immediate: true
    }
  },
  created() {
    this.project_id = this.$route.params.project_id;
    this.backOverview();
  },
  methods: {
    handleSlider(row) {
      this.activeSlider = row.value;
      const { project_id } = this;
      //v0.8.0,tyh,切换导航栏目的时候判断是bidding还是formal
      const {project_type} = this.$route.params;
      this.$router.push({
        path: `/index/project/${project_type}/detail/${row.value}/${project_id}`
      });
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    },
    enterSlider(row) {
      this.mouseSlider = row.value;
    },
    leaveSlider() {
      this.mouseSlider = '';
    },
    backOverview() {
      let { name } = this.$route;
      this.activeSlider = name;
    }
  }
};
</script>

<style scoped lang="less">
.project-detail-slider {
  width: 96px;
  height: calc(100vh - 91px);
  background: #ffffff;
  border-radius: 8px;
  font-family: PingFang SC, PingFang SC;
  position: fixed;
  left: 10px;
  .slider-wrapper {
    padding-top: 20px;
    .slider-row {
      padding: 20px 0px 20px 0px;
      font-size: 16px;
      color: #303133;
      text-align: center;
      transition: 0.5s;
      transition-property: all;
      transition-duration: 0.5s;
      transition-timing-function: ease;
      transition-delay: 0s;
    }
    .slider-row:hover {
      cursor: pointer;
      color: #007bff;
    }
    .slider-row-active {
      padding: 20px 0px 20px 0px;
      font-size: 16px;
      color: #007bff;
      text-align: center;
    }
    .slider-image {
      width: 20px;
      height: 20px;
      animation: show 0.5s;
    }
    @keyframes show {
      0% {
        opacity: 0;
      }
      100% {
        opacity: 1;
      }
    }
  }
}
</style>
