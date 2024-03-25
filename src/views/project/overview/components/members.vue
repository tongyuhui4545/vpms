<template>
  <div class="members-wrapper">
    <div class="header">
      Members
    </div>
    <div
      v-if="twoDeptmembers.length === 0 && thrDeptMembers.length === 0"
      class="no-data-wrapper"
    >
      <img
        src="@/assets/image/no-data.png"
        alt=""
        class="no-data-img"
      >
      <div class="label">
        No data
      </div>
    </div>
    <div v-else>
      <div 
        v-if="thrDeptMembers.length > 0" 
        class="tab-wrapper"
      >
        <div
          v-for="(item, key) in membersOptions"
          :key="key"
          :class="
            membersValue == item.value
              ? 'tab-item-active animate'
              : 'tab-item animate'
          "
          @click="handleMembers(item)"
        >
          {{ item.label }}
          <div
            v-if="membersValue == item.value"
            class="line"
          />
        </div>
      </div>
      <div
        v-for="(item, key) in membersList"
        :key="key"
        style="overflow-y: auto; display: flex; flex-direction: column; justify-content: center;"
      >
        <div
          class="team-wrapper"
        >
          <div class="team-name">
            {{ item.type }}&nbsp;&nbsp; ({{ item.name }})
          </div>
          <div class="team-member">
            <div class="row">
              <div class="auther">
                {{ item.initials }}
              </div>
              <div class="name">
                {{ item.team_leader_name }}
              </div>
              <div class="role">
                Team Leader
              </div>
            </div>
          </div>
          <div class="team-member">
            <div
              v-for="(childItem, childKey) in item.members"
              :key="childKey"
              class="row"
            >
              <div class="auther">
                {{ childItem.initials }}
              </div>
              <div class="name">
                {{ childItem.name }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { projectTeams } from '@/api/index.js';
export default {
  name: '',
  components: {},
  data() {
    return {
      project_id: null,
      membersOptions: [
        {
          value: '2d',
          label: '2D'
        },
        {
          value: '3d',
          label: '3D'
        }
      ],
      membersValue: '2d',
      membersData: [],
      membersList: [],
      twoDeptmembers: [],
      thrDeptMembers: []
    };
  },
  created() {
    this.project_id = this.$route.params.project_id;
  },
  mounted() {
    this.getMembersData();
  },
  methods: {
    handleMembers(row) {
      this.membersValue = row.value;
      this.membersList = this.membersData[row.value];
    },
    getMembersData() {
      projectTeams({
        project_id: this.project_id,
        type: this.membersValue
      }).then((res) => {
        if (res.code === 200) {
          let {data} = res;
          this.membersData = data;
          this.twoDeptmembers = data['2d'];
          this.thrDeptMembers = data['3d'];
          const {membersValue} = this;
          this.membersList = this.membersData[membersValue]; 
        }
      });
    }
  }
};
</script>

<style scoped lang="less">
.members-wrapper {
  margin: 0px 0px 0px 16px;
  .header {
    font-size: 16px;
    font-weight: 550;
    color: #303133;
    line-height: 20px;
    padding-top: 16px;
  }
  .tab-wrapper {
    display: flex;
    align-items: center;
    margin-top: 16px;
    .tab-item {
      font-size: 14px;
      color: #303133;
      line-height: 20px;
      padding-bottom: 5px;
      position: relative;
      margin-right: 40px;
      text-align: center;
      transition: 0.5s;
      transition-property: all;
      transition-duration: 0.5s;
      transition-timing-function: ease;
      transition-delay: 0s;
    }
    .tab-item-active {
      font-size: 14px;
      color: #007bff;
      line-height: 20px;
      padding-bottom: 5px;
      position: relative;
      text-align: center;
      margin-right: 40px;
    }
    .tab-item:hover {
      cursor: pointer;
      color: #007bff;
    }
    .line {
      position: absolute;
      bottom: 0px;
      left: 50%;
      width: 100%;
      height: 4px;
      background: #007bff;
      border-radius: 4px;
      transform: translateX(-50%);
      animation: line 0.3s;
    }
    @keyframes line {
      0% {
        width: 0px;
      }
      100% {
        width: 100%;
      }
    }
  }
  .team-wrapper {
    // height:370px;
    margin-top: 16px;
    margin-bottom: 16px;
    .team-name {
      font-size: 14px;
      color: #303133;
      line-height: 20px;
    }
    .team-member {
      display: flex;
      flex-wrap: wrap;
      .row {
        min-width:25%;
        margin-top: 16px;
        display: flex;
        align-items: center;
        .auther {
          width: 32px;
          height: 32px;
          background: #f3c940;
          border-radius: 50%;
          margin-right: 16px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 13px;
          color: #ffffff;
        }
        .name {
          font-size: 13px;
          color: #606266;
        }
        .role {
          width: 88px;
          height: 24px;
          background: #ffffff;
          border-radius: 4px;
          border: 1px solid #007bff;
          font-size: 13px;
          color: #007bff;
          margin-left: 16px;
          display: flex;
          align-items: center;
          justify-content: center;
        }
      }
    }
  }
  .no-data-wrapper{
    width: 100%;
    height: 100%;
    text-align: center;
    .no-data-img {
      width: 120px;
      height: 120px;
      margin-top: 90px;
    }
    .label {
      font-size: 13px;
      color: #909399;
      margin-top: 5px;
    }
  }
}
</style>
