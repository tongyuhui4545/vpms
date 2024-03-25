<template>
  <div class="overview-container">
    <div class="overview-wrapper">
      <div class="header-container">
        <div class="title-wrapper">
          <div class="title">
            Overview
          </div>
          <div
            v-if="archiveVisible == 1"
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
          class="return-wrapper animate"
          @click="handleBack"
        >
          <i class="el-icon-back back-icon" />
          Return
        </div>
      </div>
      <div class="overview-content">
        <!--项目详情-->
        <div class="project-detail-container">
          <ProjectDetail
            @archiveStatus="getArchiveStatus"
            @refresh-updates="refreshUpdates"
            @sales-status-changed="forceRefreshUpdates"
          />
        </div>
        <!--公告列表-->
        <div class="announcement-container">
          <Announcement />
        </div>
      </div>

      <div class="overview-content">
        <!--Statistics-->
        <Statistics />
      </div>
      <div class="overview-content">
        <!--Updates-->
        <div class="updates-conatiner">
          <Updates ref="updates" />
        </div>
        <!--Members-->
        <div class="members-conatiner">
          <Members />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ProjectDetail from './components/project-detail.vue';
import Announcement from './components/announcement.vue';
import Statistics from './components/statistics.vue';
import Updates from './components/updates.vue';
import Members from './components/members.vue';
export default {
  name: '',
  components: {
    ProjectDetail,
    Announcement,
    Statistics,
    Updates,
    Members
  },
  data() {
    return {
      archiveVisible: 0
    };
  },
  mounted() {
    window.scrollTo(0, 0);
  },
  methods: {
    getArchiveStatus(val) {
      this.archiveVisible = val;
    },
    handleBack() {
      let { project_type } = this.$route.params;
      this.$router.push({
        path: `/index/project/${project_type}`
      });
    },
    refreshUpdates() {
      let ref = this.$refs.updates;
      if (ref.updatesStatus === 1) { 
        ref.getUpdatesList();
      }
    },
    forceRefreshUpdates() {
      let ref = this.$refs.updates;
      ref.getUpdatesList();
    }
  }
};
</script>

<style scoped lang="less">
.overview-container {
  background: #ffffff;
  border-radius: 8px 8px 8px 8px;
  font-family: PingFang SC, PingFang SC;
  overflow: hidden;
  .overview-wrapper {
    padding: 16px 0px 16px 0px;
    margin: 0px 16px 0px 16px;
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
          .icon {
            font-size: 14px;
            margin-right: 8px;
            color: #007bff;
          }
          .label {
            font-size: 14px;
            color: #007bff;
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
    .overview-content {
      margin-top: 16px;
      display: flex;
      .project-detail-container {
        flex: 3;
        height: 264px;
        border-radius: 8px 8px 8px 8px;
        border: 1px solid #eeeeee;
        margin-right: 16px;
      }
      .announcement-container {
        flex: 2;
        max-width: 668px;
        height: 264px;
        border-radius: 8px 8px 8px 8px;
        border: 1px solid #eeeeee;
      }
      .updates-conatiner {
        flex: 3;
        height: 415px;
        border-radius: 8px;
        border: 1px solid #eeeeee;
        margin-right: 16px;
      }
      .members-conatiner {
        flex: 2;
        height: 415px;
        border-radius: 8px;
        border: 1px solid #eeeeee;
      }
    }
  }
}
</style>
