<template>
  <!--侧导航-->
  <div class="slider-container">
    <div class="slider-wrapper animate">
      <div
        v-for="(item, key) in sliderList"
        :key="key"
        :class="[
          item.expanded ? 'slider-item-has-children-active' : 'slider-item',
          item.id == activeSlider && !item.children ? 'active' : ''
        ]"
        @click="handleSlider(item)"
      >
        <div class="primary-menu-wrapper">
          <span :class="`iconfont ${item.icon} slider-icon`" />
          <div class="slider-label">
            {{ item.label }}
          </div>
          <i
            v-if="item.children && !item.expanded"
            class="el-icon-arrow-down"
          />
          <i
            v-if="item.children && item.expanded"
            class="el-icon-arrow-up"
          />
        </div>
        <!-- 子菜单 -->
        <div
          v-if="item.expanded"
          class="sub-menu-wrapper"
        >
          <div
            v-for="(subItem, subKey) in item.children"
            :key="subKey"
            class="sub-menu-item"
            :class="activeSlider == subItem.id ? 'active' : ''"
            @click.stop="handleSubSlider(subItem)"
          >
            <div class="sub-menu-label">
              <p>{{ subItem.label }}</p>
            </div>
          </div>
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
      activeSlider: 'work-overview',
      sliderList: [
        {
          id: 'dashboard',
          icon: 'icon-gongzuotai',
          label: 'Work table',
          children: [
            { id: 'work-overview', label: 'Work overview', subKey: '1' },
            { id: 'work-item', label: 'Work item', subKey: '2' }
          ],
          expanded: false
        },
        {
          id: 'project',
          icon: 'icon-xiangmu',
          label: 'Project',
          children: [
            { id: 'bidding-project', label: 'Bidding project', subKey: '1' },
            { id: 'formal-project', label: 'Formal project', subKey: '2' }
          ],
          expanded: false
        },
        {
          id: 'solar-module',
          icon: 'icon-kaiguan',
          label: 'Solar module'
        },
        {
          id: 'racking-tracker',
          icon: 'icon-lianjiezhuangtai',
          label: 'Racking/Tracker'
        },

        /*{
                    id: "integrated-data",
                    icon: "icon-chajiancanshupeizhi",
                    label: "Integrated data"
                },*/
        {
          id: 'customer',
          icon: 'icon-kehu',
          label: 'Customer'
        },
        {
          id: 'team',
          icon: 'icon-tuandui',
          label: 'Team'
        },
        {
          id: 'personnel',
          icon: 'icon-renyuanguanli',
          label: 'User'
        }
        // {
        //     id: "role",
        //     icon: "icon-jiaose",
        //     label: "Role"
        // },
        // {
        //     id: "limits",
        //     icon: "icon-quanxian",
        //     label: "Limits"
        // },
      ]
    };
  },
  computed: {},
  watch: {
    $route: {
      handler(val) {
        this.echoSlider(val);
      },
      deep: true
    }
  },
  mounted() {
    this.echoSlider(this.$route);
  },
  methods: {
    // computeClass(item) {
    //     //记录所有children的id用于后面的判断
    //     let childrenIds = [];
    //     if (item.children) {
    //         item.children.forEach(child => {
    //             childrenIds.push(child.id)
    //         })
    //     }
    //     if (this.activeSlider != item.id) {
    //         this.computedClass = ['slider-item animate']
    //     }
    //     if (this.activeSlider != item.id && item.children) {
    //         this.computedClass = ['slider-item animate']
    //     }
    //     if (this.activeSlider == item.id && item.children && item.expanded) {
    //         this.computedClass = ['slider-item-has-children-active ']
    //     }
    //     if (childrenIds.includes(this.activeSlider) && item.expanded) {
    //         this.computedClass = ['slider-item-has-children-active ']
    //     }
    //     if (this.activeSlider == item.id && !item.children) {
    //         this.computedClass = ['slider-item active animate']
    //     }
    //     else {
    //         this.computedClass = ['slider-item']
    //     }
    // },
    /**点击侧导航 */
    handleSlider(row) {
      if (row.children) {
        row.expanded = !row.expanded;
        this.activeSlider = row.id;
      } else {
        this.sliderList.forEach((item) => {
          if (Object.prototype.hasOwnProperty.call(item, 'expanded')) {
            item.expanded = false;
          }
        });
        this.activeSlider = row.id;
        switch (row.id) {
          // case 'dashboard':
          //     this.$router.push(`/index/dashboard`);
          //     break;
          // case 'project':
          //     this.$router.push(`/index/project/list`);
          //     break;
          case 'solar-module':
            this.$router.push('/index/solar-module/list');
            break;
          case 'racking-tracker':
            this.$router.push('/index/racking-tracker/list');
            break;
          case 'integrated-data':
            this.$router.push('/index/integrated-data/list');
            break;
          case 'customer':
            this.$router.push('/index/customer/list');
            break;
          case 'personnel':
            this.$router.push('/index/users/list');
            break;
          case 'team':
            this.$router.push('/index/team/list');
            break;
          case 'role':
            this.$router.push('/index/role/list');
            break;
          case 'limits':
            this.$router.push('/index/limits/list');
            break;
          default:
            break;
        }
      }
    },
    handleSubSlider(subItem) {
      //把非此项目父级菜单的菜单关闭
      this.sliderList.forEach((item) => {
        if (Object.prototype.hasOwnProperty.call(item, 'expanded') && item.children) {
          let isParentOfSubItem = item.children.some((child) => {
            return child.id === subItem.id;
          });
          if (isParentOfSubItem) {
            item.expanded = true;
          } else {
            item.expanded = false;
          }
        }
      });
      this.activeSlider = subItem.id;
      switch (subItem.id) {
        case 'work-overview':
          this.$router.push('/index/work-overview');
          break;
        case 'work-item':
          this.$router.push('/index/work-item');
          break;
        case 'bidding-project':
          this.$router.push('/index/project/bidding-project');
          break;
        case 'formal-project':
          this.$router.push('/index/project/formal-project');
          break;
        default:
          break;
      }
    },

    /**页面回退与刷新，侧导航回显 */
    echoSlider(params) {
      const { path } = params;
      const { sliderList } = this;
      for (let i = 0; i < sliderList.length; i++) {
        let item = sliderList[i];
        if (!item.children) {
          if (path.indexOf(`/${item.id}`) >= 0) {
            this.activeSlider = item.id;
          }
        }
        //如果有子菜单
        if (item.children) {
          for (let j = 0; j < item.children.length; j++) {
            let subItem = item.children[j];
            if (path.indexOf(`/${subItem.id}`) >= 0) {
              this.activeSlider = subItem.id;
              item.expanded = true;
            }
          }
        }
      }
    }
  }
};
</script>

<style lang="less" scoped>
.slider-container {
  width: 200px;
  height: calc(100vh - 90px);
  background: linear-gradient(141deg, #4a6bea 0%, #7995ff 100%);
  border-radius: 8px;
  transition: all 0.2s;
  position: fixed;
  top: 75px;
  left: 15px;

  .slider-wrapper {
    margin-top: 35px;
  }

  .slider-item {
    width: 100%;
    height: 38px;
    font-size: 16px;
    font-family: 'PingFang SC-Medium', 'PingFang SC', sans-serif;
    font-weight: 500;
    color: #fff;
    margin-bottom: 20px;
    // display: flex;
    text-align: center;

    i {
      margin-top: 4px;
      margin-left: 3px;
      font-size: 5px;
      align-self: center;
    }

    .primary-menu-wrapper {
      display: flex;
      align-items: center;
      padding-top: 8px;
    }
  }

  .slider-item:hover {
    cursor: pointer;
    opacity: 0.8;
  }

  .slider-item-has-children-active {
    font-size: 16px;
    font-family: 'PingFang SC-Medium', 'PingFang SC', sans-serif;
    font-weight: 500;
    color: #fff;
    cursor: pointer;

    i {
      margin-top: 4px;
      margin-left: 3px;
      font-size: 5px;
      align-self: center;
    }

    .primary-menu-wrapper {
      display: flex;
      align-items: center;
      padding-top: 8px;
    }
  }

  .active {
    background: linear-gradient(90deg, #5580f5 0%, #72a3f5 100%);
  }

  .sub-menu-wrapper {
    margin-left: 38px;
    margin-top: 14px;
    display: flex;
    flex-direction: column;
    // align-items: flex-end;
    padding: 0;

    .sub-menu-item {
      font-size: 14px;
      font-family: 'PingFang SC-Medium', 'PingFang SC', sans-serif;
      font-weight: 500;
      color: #fff;

      .sub-menu-label {
        height: 30px;
        margin-left: 10px;
      }

      .active {
        background: linear-gradient(60deg, #5580f5 0%, #72a3f5 80%);
        padding-top: 15px;
      }

      &:hover {
        cursor: pointer;
        opacity: 0.8;
      }
    }
  }

  .slider-icon {
    font-size: 16px;
    display: inline-block;
    position: relative;
    margin-left: 20px;
  }

  .slider-label {
    margin-left: 10px;
  }
}
</style>
