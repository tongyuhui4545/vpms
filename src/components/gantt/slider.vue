<template>
  <div>
    <div
      class="model-slider-container"
      :style="{ minHeight: height }"
    >
      <div class="header-wrapper">
        <div class="header-row">
          <div
            v-for="(item, key) in headerData"
            :key="key"
            class="header-name title"
            :style="{ width: `${item.width}px` }"
          >
            <div class="header-text">
              {{ item.label }}
            </div>
          </div>
        </div>
      </div>

      <div
        v-if="group"
        class="content-wrapper"
      >
        <div
          v-for="(item, index) in sliderData"
          :key="index"
          class="content-vertical"
        >
          <div
            class="content-header"
            :style="{
              borderTop: index === 0 ? '' : '1px solid #eeeeee'
            }"
          >
            {{ item.title }}
          </div>
          <div
            v-for="(childItem, childIndex) in item.child"
            :key="`child-${childIndex}`"
            class="content-name"
            :style="{
              borderBottom: '1px solid #eeeeee'
            }"
          >
            <div class="content-text">
              {{ childItem[item.value] }}
            </div>
          </div>
        </div>
      </div>

      <div
        v-else
        class="content-wrapper"
      >
        <div
          v-for="(item, index) in sliderData"
          :key="index"
          class="content-row"
          :style="{
            borderBottom: '1px solid #eeeeee'
          }"
        >
          <div
            v-for="(childItem, childIndex) in item"
            :key="`child-${childIndex}`"
            class="content-name"
            :style="{ width: `${childItem.width}px` }"
          >
            <el-tooltip
              class="item"
              effect="dark"
              :content="childItem.label"
              placement="top-start"
            >
              <div class="content-text">
                {{ childItem.label }}
              </div>
            </el-tooltip>
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
  props: {
    params: {
      type: Object,
      default: null
    }
  },
  data() {
    return {
      group: false,
      headerData: [],
      sliderData: [],
      height: '0px'
    };
  },
  watch: {
    params: {
      handler(newValue) {
        if (newValue && newValue.header && newValue.data) {
          this.group = newValue.group;
          this.headerData = newValue.header;
          this.sliderData = newValue.data;
          let { data } = newValue;
          let rowNum = 0;
          if (this.group) {
            for (let i = 0; i < data.length; i++) {
              rowNum++;
              let item = data[i];
              let { child } = item;
              rowNum += child.length;
              if (i === data.length - 1) {
                if (rowNum < 6) {
                  rowNum = 6;
                } else {
                  rowNum += 2;
                }
                this.sliderHeight(rowNum);
              }
            }
          } else {
            if (data.length < 6) {
              rowNum = 6;
            } else {
              rowNum = data.length + 2;
            }
            this.sliderHeight(rowNum);
          }
        }
      },
      deep: true,
      immediate: true
    }
  },
  methods: {
    sliderHeight(rowNum) {
      let height = 49 + rowNum * 41;
      this.height = `${height}px`;
    }
  }
};
</script>

<style scoped lang="less">
.model-slider-container {
  width: 100%;
  border-top-left-radius: 4px;
  border: 1px solid #eeeeee;
  border-right: 0px;
  .header-wrapper {
    width: 100%;
    font-size: 14px;
    color: #303133;
    .header-row {
      width: 100%;
      background: #f5f7fa;
      border-top-left-radius: 4px;
      border-bottom: 1px solid #eeeeee;
      display: flex;
      height: 48px;
      .header-name {
        display: flex;
        align-items: center;
        .header-text {
          flex: 1;
          margin-left: 24px;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
      }
    }
  }
  .content-wrapper {
    width: 100%;
    font-size: 14px;
    color: #606266;
    .content-row {
      width: 100%;
      display: flex;
      height: 40px;
      .content-name {
        width: 100%;
        display: flex;
        align-items: center;
        .content-text {
          flex: 1;
          margin-left: 24px;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
      }
    }
    .content-vertical {
      .content-header {
        height: 40px;
        display: flex;
        align-items: center;
        padding-left: 24px;
        background: #fafafa;
        border-bottom: 1px solid #eeeeee;
      }
      .content-name {
        width: 100%;
        height: 40px;
        display: flex;
        align-items: center;
        .content-text {
          flex: 1;
          margin-left: 24px;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
      }
    }
  }
}
</style>
