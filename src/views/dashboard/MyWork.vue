<template>
  <div>
    <Card>
      <template #cardHeader>
        <span class="iconfont icon-gongzuotai card-icon" />
        Work table
      </template>
      <template #cardContent>
        <div class="mywork-info-container">
          <div class="mywork-info-wrapper">
            <!--<div class="user-avatar-wrapper">
                            <img src="@/assets/image/auther.gif" alt="">
                        </div>-->
            <div class="mywork-info">
              <div class="user-name">
                Hello, {{ userInfo.name }}
              </div>
              <div class="user-role-wrapper">
                <div class="user-role">
                  {{ userInfo.email }}
                </div>
                <div class="user-role-line" />
                <div class="user-company">
                  {{ userInfo.role }}
                </div>
              </div>
            </div>
          </div>
          <!--<div class="project-info-wrapper">
                        <div class="project-info-item">
                            <div class="project-info-label">Projects</div>
                            <div class="project-info-num">
                                <animate-number
                                from="0" 
                                :to="56"
                                duration="2000" 
                                easing="easeOutQuad"
                                ></animate-number>
                            </div>
                        </div>
                        <div class="project-info-line"></div>
                        <div class="project-info-item">
                            <div class="project-info-label">Processed</div>
                            <div class="project-info-num">
                                <animate-number
                                from="0" 
                                :to="30"
                                duration="2000" 
                                easing="easeOutQuad"
                                ></animate-number>
                            </div>
                        </div>
                        <div class="project-info-line"></div>
                        <div class="project-info-item">
                            <div class="project-info-label">Unprocessed</div>
                            <div class="project-info-num">
                                <animate-number
                                from="0" 
                                :to="26"
                                duration="2000" 
                                easing="easeOutQuad"
                                ></animate-number>
                            </div>
                        </div>
                    </div>-->
        </div>
      </template>
    </Card>
  </div>
</template>

<script>
import Card from '@/components/Card.vue';
export default {
  name: '',
  components: {
    Card
  },
  data() {
    return {
      userInfo: {}
    };
  },
  mounted() {
    this.userInfo = JSON.parse(localStorage.getItem('user'));
  },
  methods: {}
};
</script>

<style lang="less" scoped>
.mywork-info-container {
  display: flex;
  justify-content: space-between;

  .mywork-info-wrapper {
    display: flex;

    .user-avatar-wrapper {
      margin-right: 20px;

      img {
        width: 72px;
        height: 72px;
        border-radius: 50%;
      }
    }

    .mywork-info {
      .user-name {
        margin-bottom: 12px;
        font-size: 20px;
        font-weight: 500;
        line-height: 28px;
        color: rgba(0 0 0 0.85);
      }

      .user-role-wrapper {
        color: rgba(0 0 0 0.45);
        font-size: 14px;
        line-height: 28px;
        display: flex;
        align-items: center;

        .user-role-line {
          width: 1px;
          height: 12px;
          background: rgba(0 0 0 0.35);
          margin: 0 10px;
        }
      }
    }
  }

  .project-info-wrapper {
    display: flex;
    align-items: center;

    .project-info-item {
      .project-info-label {
        margin-bottom: 4px;
        color: rgba(0 0 0 0.45);
        font-size: 14px;
      }

      .project-info-num {
        color: rgba(0 0 0 0.85);
        font-size: 24px;
        font-family: -apple-system, 'Blink MacSystemFont', 'Segoe UI',
          'PingFang SC', 'Hiragino Sans GB', 'Microsoft YaHei', 'Helvetica Neue',
          Helvetica, Arial, sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji',
          'Segoe UI Symbol';
        text-align: right;
      }
    }

    .project-info-line {
      width: 1px;
      height: 30px;
      background: rgba(0 0 0 0.25);
      margin: 0 40px;
    }
  }
}
</style>
