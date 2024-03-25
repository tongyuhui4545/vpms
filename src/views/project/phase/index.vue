<template>
  <div class="phase-container">
    <div class="phase-wrapper">
      <div class="header-container">
        <div class="title-wrapper">
          <div
            class="title"
            data-aos="fade-in"
          >
            <span
              v-for="(item, key) in titleOptions"
              :key="key"
            >
              <span v-if="$route.params.mode === item.value">
                {{ item.label }}
              </span>
            </span>
          </div>
          <div
            v-if="archiveVisible === 1"
            class="archive-info"
            data-aos="slide-up"
          >
            <i class="el-icon-warning icon" />
            <span class="label">
              The current phase has been automatically/manually archived and can
              only be viewed. Please unarchive it if you want to edit it.
            </span>
          </div>
        </div>
        <div
          class="return-wrapper"
          @click="handleBack"
        >
          <i class="el-icon-back back-icon" />
          Return
        </div>
      </div>
      <!--phase内容-->
      <div class="phase-content">
        <PhaseList @archiveStatus="getArchiveStatus" />
      </div>
    </div>
  </div>
</template>

<script>
import PhaseList from './views/phase-list.vue';

export default {
  name: '',
  components: {
    PhaseList
  },
  data() {
    return {
      titleOptions: [
        {
          value: 'phase',
          label: 'Phase'
        },
        {
          value: 'label&sim',
          label: 'Label&Sim'
        }
      ],
      archiveVisible: 0
    };
  },
  methods: {
    handleBack(){
      let {project_type} = this.$route.params;
      this.$router.push({
        path: `/index/project/${project_type}`
      });
    },
    getArchiveStatus(val) {
      this.archiveVisible = val;
    }
  }
};
</script>

<style scoped lang="less">
.phase-container {
  min-height: calc(100vh - 91px);
  .phase-wrapper {
    padding: 16px 16px 16px 24px;
    position: relative;
    .header-container {
      display: flex;
      justify-content: space-between;
      align-items: center;
      .title-wrapper {
        display: flex;
        flex-wrap: wrap;
        .title {
          font-size: 18px;
          font-weight: 550;
          color: #303133;
          margin-right: 16px;
          line-height: 32px;
        }
        .archive-info {
          height: 32px;
          background: rgba(0, 123, 255, 0.1);
          border-radius: 4px;
          display: flex;
          align-items: center;
          padding: 0px 24px 0px 16px;
          transition: 0.5s;
          transition-property: all;
          transition-duration: 0.5s;
          transition-timing-function: ease;
          transition-delay: 0s;
          .icon {
            font-size: 14px;
            margin-right: 8px;
            color: #007bff;
          }
          .label {
            font-size: 14px;
            color: #007bff;
          }
          animation: move 0.5s;
        }
        @keyframes move {
          0% {
            transform: scale(0);
          }
          100% {
            transform: scale(1);
          }
        }
      }
      .return-wrapper {
        display: flex;
        align-items: center;
        font-size: 16px;
        color: #007bff;
        .back-icon {
          margin-right: 3px;
        }
      }
      .return-wrapper:hover {
        cursor: pointer;
        opacity: 0.8;
      }
    }
    .phase-content {
      margin-top: 16px;
    }
  }
}
</style>
