<template>
  <div class="nav-container">
    <div
      v-for="nav in navs"
      :key="nav.text"
      class="nav"
      @click="routerGoTo(nav)"
    >
      <div class="nav-body">
        <img
          v-if="!judgeActive(nav)"
          :src="nav.icon"
        >
        <img
          v-if="judgeActive(nav)"
          :src="nav.iconActivated"
        >
        <div
          class="nav-text"
          :class="{ 'active-text': judgeActive(nav) }"
        >
          {{ nav.text }}
        </div>
        <i
          v-if="nav.cascated"
          class="el-icon-arrow-down"
          :class="{ 'rotate-180': nav.cascated && nav.expanded }"
        />
      </div>
      <ChosenMarkHorizontal
        v-if="judgeActive(nav)"
        class="chosen-mark"
      />
      <transition name="fade">
        <div
          v-if="nav.expanded && nav.children.length > 0"
          class="sub-nav"
        >
          <div
            v-for="subNav in nav.children"
            :key="subNav.text"
            class="sub-nav-item"
            @click="routerGoTo(subNav)"
          >
            <div class="sub-nav-text">
              {{ subNav.text }}
            </div>
          </div>
        </div>
      </transition>
    </div>
  </div>
</template>

<script>
import ChosenMarkHorizontal from '@/components/marks/ChosenMarkHorizontal.vue';

export default {
  components: {
    ChosenMarkHorizontal
  },
  data() {
    let limits = JSON.parse(localStorage.getItem('limits'));
    let env = process.env.NODE_ENV;
    let navs = [
      {
        text: 'Assigned task',
        icon: require('@/assets/IconDesigns/work-table.png'),
        iconActivated: require('@/assets/IconDesigns/work-table-blue.png'),
        cascated: false,
        routeName: 'WorkItem',
        expanded: false,
        children: []
      },
      {
        text: 'Bidding',
        icon: require('@/assets/IconDesigns/bidding.png'),
        iconActivated: require('@/assets/IconDesigns/bidding-blue.png'),
        cascated: false,
        routeName: 'ProjectList',
        expanded: false,
        children: []
      },
      {
        text: 'Formal',
        icon: require('@/assets/IconDesigns/formal-project.png'),
        iconActivated: require('@/assets/IconDesigns/formal-project-blue.png'),
        cascated: false,
        routeName: 'FormalProjectList',
        expanded: false,
        children: []
      },
      {
        text: 'Customer',
        icon: require('@/assets/IconDesigns/client.png'),
        iconActivated: require('@/assets/IconDesigns/client-blue.png'),
        cascated: false,
        routeName: 'customerList',
        expanded: false,
        children: [
          // {
          //   text: 'Customer',
          //   cascated: false,
          //   routeName: 'customerList',
          //   children: []
          // }
        ]
      },
      {
        text: 'Team',
        icon: require('@/assets/IconDesigns/team.png'),
        iconActivated: require('@/assets/IconDesigns/team-blue.png'),
        cascated: false,
        routeName: 'teamList',
        expanded: false,
        children: [
          // {
          //   text: 'Team',
          //   cascated: false,
          //   routeName: 'teamList',
          //   children: []
          // }
        ]
      },
      {
        text: 'Module data',
        icon: require('@/assets/IconDesigns/module-data.png'),
        iconActivated: require('@/assets/IconDesigns/module-data-blue.png'),
        cascated: true,
        routeName: ['Solar module', 'Racking/Tracker'],
        expanded: false,
        children: [
          {
            text: 'Solar module',
            cascated: false,
            routeName: 'SolarList',
            children: []
          },
          {
            text: 'Racking/Tracker',
            cascated: false,
            routeName: 'trackerList',
            children: []
          }
        ]
      }
    ];
    if (limits.Nav_List && limits.Nav_List.user_tab_visible) {
      // 将 'User' 导航项插入到倒数第二个位置
      navs.splice(navs.length - 1, 0, {
        text: 'User',
        icon: require('@/assets/IconDesigns/user_black.png'),
        iconActivated: require('@/assets/IconDesigns/user_blue.png'),
        cascated: true,
        routeName: ['User', 'PerformanceAppraisal'],
        expanded: false,
        children: []
      });
      if (limits.Nav_List.performance_page_visible) {
        navs[navs.length - 2].children.push({
          text: 'Performance appraisal',
          cascated: false,
          routeName: 'performanceAppraisal',
          children: []
        });
      }
      if (limits.Nav_List.user_list_visible) {
        navs[navs.length - 2].children.push({
          text: 'User',
          cascated: false,
          routeName: 'personnelList',
          children: []
        });
      }
    }
    if (env === 'development') {
      navs.push({
        text: 'Roles',
        icon: require('@/assets/IconDesigns/list_icon.png'),
        iconActivated: require('@/assets/IconDesigns/list_icon.png'),
        cascated: false,
        routeName: 'roleList',
        expanded: false,
        children: []
      });
      navs.push({
        text: 'Limits',
        icon: require('@/assets/IconDesigns/list_icon.png'),
        iconActivated: require('@/assets/IconDesigns/list_icon.png'),
        cascated: false,
        routeName: 'limitsList',
        expanded: false,
        children: []
      });
    }
    return {
      navs,
      activatedNav: ''
    };
  },
  watch: {
    $route: {
      handler() {
        if (this.$route.path === '/index/project/detail') {
          this.activatedNav = 'Bidding';
          return;
        }
        //v0.8.0 跳转时候判断bidding formal
        if(this.$route.params.project_type && this.$route.params.project_type === 'bidding') {
          this.activatedNav = 'Bidding';
          return;
        }
        //v0.8.0 跳转时候判断bidding formal
        if(this.$route.params.project_type && this.$route.params.project_type === 'formal') {
          this.activatedNav = 'Formal';
          return;
        }
        // ***************************************
        if (
          this.$route.path === '/index/project/formal-project-detail' ||
          this.$route.path === '/index/project/formal-project-detail/'
        ) {
          this.activatedNav = 'Formal';
          return;
        }
        if (this.$route.path.includes('team')) {
          this.activatedNav = 'Team';
          return;
        }
        if (this.$route.path.includes('users')) {
          this.activatedNav = 'User';
          return;
        }
        if (this.$route.path.includes('solar-module')) {
          this.activatedNav = 'Solar module';
          return;
        }
        if (this.$route.path.includes('racking-tracker')) {
          this.activatedNav = 'Racking/Tracker';
          return;
        }
        this.navs.forEach((item) => {
          if (typeof item.routeName === 'string') {
            if (item.routeName === this.$route.name) {
              this.activatedNav = item.text;
            }
          }
          if (Array.isArray(item.routeName)) {
            if (this.$route.name === 'customerList') {
              this.activatedNav = 'Customer';
            }
            if (this.$route.name === 'teamList') {
              this.activatedNav = 'Team';
            }
            if (this.$route.name === 'SolarList') {
              this.activatedNav = 'Solar module';
            }
          }
        });
      },
      immediate: true
    }
  },
  created() {
    window.addEventListener('click', this.closeSubNavOnClickOutside);
  },
  beforeDestroy() {
    window.removeEventListener('click', this.closeSubNavOnClickOutside);
  },
  methods: {
    resetNav() {
      this.activatedNav = '';
    },
    routerGoTo(nav) {
      if (!nav.cascated) {
        // 通过组件名称查找路由
        const routeIndex = this.$router.options.routes.find((route) => {
          return route.name === 'Index';
        });
        const route = routeIndex.children.find((route) => {
          return route.name === nav.routeName;
        });
        this.navs.forEach((item) => {
          item.expanded = false;
        });

        if (route) { 
          this.activatedNav = nav.text;
          // 使用路由对象进行路由跳转
          this.$router.push({ name: nav.routeName });
        } else {
          this.$message.error(`Route with name '${nav.routeName}' not found.`);
        }
      } else {
        this.openSubNav(nav);
      }
    },

    judgeActive(nav) {
      if (nav.children.length > 0) {
        let target = nav.children.find((item) => {
          return item.text === this.activatedNav;
        });
        if (target) {
          return true;
        }
      } else {
        if (nav.text === this.activatedNav) {
          return true;
        }
      }
      return false;
    },

    closeSubNavOnClickOutside(event) {
      // 获取点击事件的目标元素
      const { target } = event;
      // 判断点击的目标元素是否位于子导航栏内部，如果不是，则关闭子导航栏
      if (!this.isDescendant(target, 'nav-body')) {
        this.closeSubNav();
      }
    },

    isDescendant(element, className) {
      if (element.parentNode) {
        if (
          element.parentNode.className === className ||
          element.className === className
        ) {
          return true;
        }
        return false;
      }
    },

    closeSubNav() {
      // 关闭所有子导航栏
      this.navs.forEach((nav) => {
        nav.expanded = false;
      });
    },

    openSubNav(nav) {
      this.navs.forEach((item) => {
        if (item.text !== nav.text) {
          item.expanded = false;
        }
      });
      nav.expanded = !nav.expanded;
    }
  }
};
</script>

<style lang="less">
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
}

.nav-container {
  flex: 1;
  display: flex;
  align-items: center;
  gap: 40px;
  margin-left: 47px;

  .nav {
    position: relative;

    .nav-body {
      display: flex;
      gap: 5px;
      align-items: center;
      cursor: pointer;

      .nav-text {
        font-size: 18px;
        font-weight: 500;
        color: #303133;
        display: flex;
        line-height: 100%;
        align-items: center;
      }

      .active-text {
        color: #007bff;
      }

      .rotate-180 {
        transform: rotate(180deg);

        /* 旋转 180 度 */
        transition: transform 0.3s;

        /* 添加过渡效果 */
      }

      img {
        width: 20px;
        height: 20px;
      }
    }

    .chosen-mark {
      position: absolute;
      top: 37px;
      left: 24px;
    }

    .sub-nav {
      margin-top: 5px;
      position: absolute;
      min-width: 100%;
      // min-height: 60px;
      top: 100%;
      background-color: #fff;
      border: 1px solid #ebeef5;
      border-radius: 4px;
      box-shadow: 0 2px 12px 0 rgb(0 0 0 / 10%);

      .sub-nav-item {
        white-space: nowrap;

        /* 防止文字换行 */
        overflow: hidden;

        /* 隐藏溢出内容 */
        text-overflow: ellipsis;

        /* 添加省略号以指示有更多内容 */
        display: flex;
        align-items: center;
        justify-content: center;

        &:first-child {
          margin-top: 10px;
        }

        .sub-nav-text {
          text-align: center;
          line-height: 100%;
          margin: 8px 15px;
          font-weight: 400;
        }

        &:hover {
          color: #f5f7fa;
          cursor: pointer;
          background: linear-gradient(60deg, #5580f5 0%, #72a3f5 60%);
        }
      }

      .sub-nav-item:last-child {
        margin-bottom: 10px;
      }
    }
  }
}
</style>
