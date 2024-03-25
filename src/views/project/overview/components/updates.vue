<template>
  <div class="updates-wrapper">
    <div class="header-wrapper">
      <div class="title">
        Updates
      </div>
      <div class="operate">
        <el-select
          v-model="updatesStatus"
          placeholder="请选择"
          size="small"
          @change="handleChange"
        >
          <el-option
            v-for="item in updateOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </div>
    </div>
    <div class="updates-content">
      <comments-or-updates
        :info="updatesInfo"
        type="overview-updates"
      />
    </div>
  </div>
</template>

<script>
import CommentsOrUpdates from '@/views/work-table/components/comments-or-updates.vue';
import { getUpdatesList } from '@/api/index';

export default {
  name: '',
  components: {
    CommentsOrUpdates
  },
  props: {
    progressId: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {
      updatesStatus: 2,
      updateOptions: [
        {
          value: 2,
          label: 'Project status'
        },
        {
          value: 1,
          label: 'Project field'
        }
      ],
      updatesInfo: []
    };
  },
  mounted() {
    this.getUpdatesList();
  },
  methods: {
    handleChange(val) {
      this.updatesStatus = val;
      this.getUpdatesList();
    },
    async getUpdatesList() {
      let params = {
        project_id: this.$route.params.project_id,
        progress_id: 0,
        type: 1,
        scope: this.updatesStatus
      };
      await getUpdatesList(params).then((res) => {
        if (res.code === 200) {
          res.data.forEach((item) => {
            item.comment = item.label;
            item.creator_name = item.creation_name;
          });
          this.updatesInfo = res.data;
        }
      });
    }
  }
};
</script>

<style scoped lang="less">
.updates-wrapper {
  margin: 0px 0px 16px 16px;
  .header-wrapper {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding-top: 16px;
    .title {
      font-size: 16px;
      font-weight: 550;
      color: #303133;
      line-height: 20px;
    }
    .operate {
      width: 160px;
      margin-right:16px;
    }
  }
  .updates-content{
    height:370px;
    margin-top: 16px;
  }

  :deep(.el-timeline-item__wrapper),
  :deep(.el-timeline-item__node) {
    top: 30px;
  }

  :deep(.el-timeline) {
    padding-left: 8px;
    padding-top: 5px;
    height: 300px;
    overflow-y: auto;
  }
}
</style>
