<template>
  <div class="model-gantt-container">
    <div :style="{ width: `${sliderWidth}px` }">
      <Slider :params="sliderData" />
    </div>
    <div :style="{ width: `calc(100% - ${sliderWidth}px)` }">
      <DateBar :params="ganttInfo" />
    </div>
  </div>
</template>

<script>
import Slider from './slider.vue';
import DateBar from './date.vue';
import { setting } from './utils/config.js';
export default {
  name: '',
  components: {
    Slider,
    DateBar
  },
  props: {
    ganttParams: {
      type: Object,
      default: null
    }
  },
  data() {
    return {
      colorTool: {
        gray: '#F0F0F0',
        blue: '#5ABDFF',
        red: '#F96C6C',
        green: '#29D58B'
      },
      sliderData: {},
      ganttInfo: {
        start_date: '',
        end_date: '',
        background: '#F4F5F9',
        group: false,
        data: []
      },
      sliderWidth: 0
    };
  },
  watch: {
    ganttParams: {
      handler(newValue) {
        let { group } = newValue;
        this.ganttInfo['group'] = group;
        if (group) {
          this.groupInit(newValue);
        } else {
          this.sliderInit(newValue);
        }
      },
      deep: true,
      immediate: false
    }
  },
  methods: {
    sliderInit(params) {
      let infoArr = setting();
      let { mode } = params;
      let info = infoArr[mode];
      let { slider } = info;
      let { data } = params;
      let sliderList = [];
      for (let i = 0; i < data.length; i++) {
        let item = data[i];
        sliderList[i] = [];
        let sliderWidth = 0;
        for (let j = 0; j < slider.length; j++) {
          let itemSlider = slider[j];
          let { value } = itemSlider;
          sliderList[i][j] = {
            label: item[value],
            width: itemSlider['width']
          };
          sliderWidth += itemSlider['width'];
        }

        if (i === data.length - 1) {
          this.sliderData = {
            group: false,
            header: slider,
            data: sliderList
          };

          this.ganttInfo['background'] = info['background'];
          this.ganttInfo['pop'] = info['pop'];
          this.ganttInfo['popChild'] = info['popChild'];
          this.ganttInfo['popVisible'] = info['popVisible'];
          this.sliderWidth = sliderWidth + 24;
          this.ganttInit(params);
        }
      }
    },
    groupInit(params) {
      let infoArr = setting();
      let { mode } = params;
      let info = infoArr[mode];
      let { slider } = info;
      let { data } = params;
      let sliderList = [];
      for (let i = 0; i < data.length; i++) {
        let item = data[i];
        let sliderWidth = 0;
        for (let j = 0; j < slider.length; j++) {
          let itemSlider = slider[j];
          let { title } = itemSlider;
          let titleText = '';
          for (let k = 0; k < title.length; k++) {
            let itemTitle = title[k];
            titleText += `${item[itemTitle]}`;
            if (k !== title.length - 1) {
              titleText += '-';
            }
          }
          let { child } = itemSlider;
          let { value } = itemSlider;
          let itemRow = {
            title: titleText,
            child: item[child],
            value,
            width: itemSlider['width']
          };
          sliderList.push(itemRow);
          sliderWidth += itemSlider['width'];
        }
        if (i === data.length - 1) {
          this.sliderData = {
            group: true,
            header: slider,
            data: sliderList
          };
          this.ganttInfo['background'] = info['background'];
          this.ganttInfo['pop'] = info['pop'];
          this.ganttInfo['popChild'] = info['popChild'];
          this.ganttInfo['popVisible'] = info['popVisible'];
          this.sliderWidth = sliderWidth + 24;
          this.ganttInit(params);
        }
      }
    },
    ganttInit(params) {
      let { mode } = params;
      let { data } = params;
      let { start_date } = params;
      let { end_date } = params;
      if (start_date !== '' && end_date !== '') {
        this.ganttInfo['start_date'] = params.start_date;
        this.ganttInfo['end_date'] = params.end_date;
        switch (mode) {
          case 0:
            this.projectGantt(mode, data);
            break;
          case 1:
            this.projectGantt(mode, data);
            break;
          case 2:
            this.taskGantt(mode, data);
            break;
          case 3:
            this.taskGantt(mode, data);
            break;
          case 4:
            this.teamDeptGantt(mode, data);
            break;
          case 5:
            this.teamMemberGantt(mode, data);
            break;
          default:
            break;
        }
      }
    },

    /**项目甘特图 */
    projectGantt(mode, data) {
      let current_day = this.getCurrentDay();
      let { colorTool } = this;
      let dataList = [];
      this.ganttInfo['data'] = [];
      for (let i = 0; i < data.length; i++) {
        let item = data[i];
        let is_sent = null;
        if (mode === 0) {
          is_sent = item['quote_sent'];
        }
        if (mode === 1) {
          is_sent = item['label_complete'];
        }
        let { estimated_end_date } = item;
        let { actual_end_date } = item;
        
        let color = [];
        let options = [];
        if (is_sent === 0) {
          if (estimated_end_date) {
            let oDate1 = new Date(estimated_end_date);
            let oDate2 = new Date(current_day);
            if (oDate1 < oDate2) {
              color = [colorTool.blue, colorTool.red];
              options = [estimated_end_date, current_day];
            } else if (oDate1 > oDate2) {
              color = [colorTool.blue, colorTool.gray];
              options = [current_day, estimated_end_date];
            } else {
              color = [colorTool.blue];
              options = [current_day];
            }
          }
        }
        if (is_sent === 1) {
          let oDate1 = new Date(estimated_end_date);
          let oDate2 = new Date(actual_end_date);
          if (estimated_end_date) {
            if (oDate1 < oDate2) {
              color = [colorTool.green, colorTool.red];
              options = [estimated_end_date, actual_end_date];
            } else if (oDate1 > oDate2) {
              color = [colorTool.green, colorTool.gray];
              options = [actual_end_date, estimated_end_date];
            } else {
              color = [colorTool.green];
              options = [actual_end_date];
            }
          }
        }
        item['color'] = color;
        item['options'] = options;
        dataList.push(item);
        if (i === data.length - 1) {
          this.ganttInfo['data'] = dataList;
        }
      }
    },

    /**任务甘特图 */
    taskGantt(mode, data) {
      let current_day = this.getCurrentDay();
      let { colorTool } = this;
      let dataList = [];
      this.ganttInfo['data'] = [];
      for (let i = 0; i < data.length; i++) {
        let item = data[i];
        let { estimated_end_date } = item;

        let oDate1 = new Date(current_day);
        let oDate2 = new Date(estimated_end_date);
        let color = [];
        let options = [];
        if (estimated_end_date) {
          if (oDate1 < oDate2) {
            color = [colorTool.blue, colorTool.gray];
            options = [current_day, estimated_end_date];
          } else if (oDate1 > oDate2) {
            color = [colorTool.blue, colorTool.red];
            options = [estimated_end_date, current_day];
          } else {
            color = [colorTool.blue];
            options = [current_day];
          }
        }
        item['color'] = color;
        item['options'] = options;
        dataList.push(item);
        if (i === data.length - 1) {
          this.ganttInfo['data'] = dataList;
        }
      }
    },

    /**小组甘特图 */
    teamDeptGantt(mode, data) {
      let current_day = this.getCurrentDay();
      let { colorTool } = this;
      let dataList = [];
      this.ganttInfo['data'] = [];
      for (let i = 0; i < data.length; i++) {
        let item = data[i];
        let itemData = item.summary;
        let titleRow = {
          start_date: null,
          end_date: null,
          color: [],
          options: [],
          popList: []
        };
        dataList.push(titleRow);
        for (let j = 0; j < itemData.length; j++) {
          let rowData = itemData[j];
          let { estimated_end_date } = rowData;
          let oDate1 = new Date(current_day);
          let oDate2 = new Date(estimated_end_date);
          let color = [];
          let options = [];
          if (estimated_end_date) {
            if (oDate1 < oDate2) {
              color = [colorTool.blue, colorTool.gray];
              options = [current_day, estimated_end_date];
            }
            if (oDate1 === oDate2) {
              color = [colorTool.blue];
              options = [current_day];
            }
            if (oDate1 > oDate2) {
              color = [colorTool.blue, colorTool.red];
              options = [estimated_end_date, current_day];
            }
          }
          rowData['color'] = color;
          rowData['options'] = options;
          if (this.ganttInfo['popChild']) {
            rowData['popList'] = rowData['tasks'];
          }
          dataList.push(rowData);
        }
        if (i === data.length - 1) {
          this.ganttInfo['data'] = dataList;
        }
      }
    },

    /**组员甘特图 */
    teamMemberGantt(mode, data) {
      let current_day = this.getCurrentDay();
      let { colorTool } = this;
      let dataList = [];
      this.ganttInfo['data'] = [];
      for (let i = 0; i < data.length; i++) {
        let item = data[i];
        let { estimated_end_date } = item;
        let oDate1 = new Date(current_day);
        let oDate2 = new Date(estimated_end_date);
        let color = [];
        let options = [];
        if (estimated_end_date) {
          if (oDate1 < oDate2) {
            color = [colorTool.blue, colorTool.gray];
            options = [current_day, estimated_end_date];
          }
          if (oDate1 === oDate2) {
            color = [colorTool.blue];
            options = [current_day];
          }
          if (oDate1 > oDate2) {
            color = [colorTool.blue, colorTool.red];
            options = [estimated_end_date, current_day];
          }
        }
        item['color'] = color;
        item['options'] = options;
        if (this.ganttInfo['popChild']) {
          item['popList'] = item['tasks'];
        }
        dataList.push(item);
        if (i === data.length - 1) {
          this.ganttInfo['data'] = dataList;
        }
      }
    },

    getCurrentDay() {
      let date = new Date();
      let year = date.getFullYear();
      let month = date.getMonth() + 1;
      let day = date.getDate();
      if (month < 10) {
        month = `0${month}`;
      }
      if (day < 10) {
        day = `0${day}`;
      }
      return `${year}-${month}-${day}`;
    }
  }
};
</script>

<style scoped lang="less">
.model-gantt-container {
  width: 100%;
  display: flex;
}
</style>