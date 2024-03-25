<template>
  <div class="filter-wrapper">
    <div
      v-for="item in optionsValue"
      :key="item.id"
      class="options"
      @click="onChoose(item)"
    >
      {{ item.label }}
    </div>
  </div>
</template>

<script>
import { teamList } from '@/api';
export default {
  props: {
    options: {
      type: Array,
      default: () => {
        return [];
      }
    },
    placeholder: {
      type: String,
      default: ''
    },
    filterFor: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      optionsValue: []
    };
  },
  watch: {
    options: {
      handler(val) {
        this.optionsValue = val;
      }
      // immediate: true
    },
    filterFor: {
      handler(val) {
        if (val === '3d-team' || val === 'team_id') {
          this.getTeam('3D');
        }
      },
      immediate: true
    }
  },
  mounted() {
    this.optionsValue = this.options;
    //如果是3d团队，则获取3d团队列表
    if(this.filterFor === '3d-team') {
      this.getTeam('3D');
    }
  },
  methods: {
    onChoose(val) {
      this.$emit('fast-filter', val, this.filterFor);
    },
    getTeam(teamType) {
      teamList({ type: teamType }).then((res) => {
        if (res.code === 200) {
          this.optionsValue = res.data.data.map((item) => {
            return {
              value: item.id,
              label: item.name
            };
          });
        }
      });
    }
  }
};
</script>

<style lang="less" scoped>
.filter-wrapper {
  max-height: 280px;
  overflow-y: auto;
  .options {
    min-width: 150px;
    white-space: nowrap;
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    padding-left: 24px;
    color: #606266;

    &:hover {
      cursor: pointer;
      background: #f2f6fc;
      color: #007bff;
    }
  }
}
</style>
