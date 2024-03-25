<template>
  <div
    ref="ganttElement"
    class="public-gantt-container"
  >
    <div class="public-gantt-wrapper">
      <div
        v-for="(item, index) in dateList"
        :key="`gantt-${index}`"
        class="gantt-item"
        :style="{
          borderRight:
            index === dateList.length - 1 ? 'solid #EAEBEC 1px' : '0px'
        }"
      >
        <div class="gantt-year">
          {{ item.year }}-{{ item.month }}
        </div>
        <div
          v-for="childItem in item.days"
          :key="`gantt-${childItem}`"
          class="gantt-row"
          :style="{
            borderRight: childItem === item.days ? '0px' : 'solid #EAEBEC 1px',
            background:
              (item.index + childItem - 1) % 7 === 2 ||
              (item.index + childItem - 1) % 7 === 3
                ? '#FAFAFA'
                : ''
          }"
        >
          <div
            :class="
              justifyCurrentDay(item.year, item.month, childItem)
                ? 'gantt-header-active'
                : 'gantt-header'
            "
          >
            {{ childItem }}
          </div>
          <div
            :id="getFullDay(item.year, item.month, childItem)"
            class="gantt-content"
            :style="{
              height: 41 * rowNum + 'px'
            }"
          >
            <div
              v-if="justifyCurrentDay(item.year, item.month, childItem)"
              class="line"
            />
            <div
              v-for="(ganttItem, ganttIndex) in ganttData"
              :key="`bar-${ganttIndex}`"
              class="bar-container"
            >
              <div
                v-if="
                  ganttItem.start_date ===
                    getFullDay(item.year, item.month, childItem)
                "
                class="bar-wrapper"
                data-aos="fade"
                :style="{
                  top: getTotalBarTop(ganttIndex)
                }"
              >
                <div class="bar-content">
                  <div
                    v-for="(optionsItem, optionsIndex) in ganttItem.options"
                    :key="`options-${optionsIndex}`"
                    class="current-wrapper"
                    data-aos="fade-right"
                    :data-index="ganttIndex"
                    :style="setCurrentBarWrapper(ganttItem, optionsIndex)"
                    @mouseenter="enterBar"
                    @mouseleave="leaveBar"
                    @mousemove="moveBar"
                  />
                  <!--鼠标悬浮-提示内容-->
                  <!--<div 
                    v-if="ganttInfo.popVisible" 
                    class="gantt-pop-wrapper"
                  >
                    <el-popover
                      placement="right"
                      trigger="hover"
                    >
                      <div v-if="ganttInfo.popChild">
                        <div 
                          v-for="(popListItem, popListKey) in ganttItem.popList" 
                          :key="`pop-list-${popListKey}`"
                        >
                          <POP
                            :params="{
                              title: ganttInfo.pop,
                              data: popListItem
                            }"
                          />
                        </div>
                      </div>
                      <div v-else>
                        <POP
                          :params="{
                            title: ganttInfo.pop,
                            data: ganttItem
                          }"
                        />
                      </div>

                      <div
                        slot="reference"
                        :style="{
                          width: '100%',
                          height: '24px'
                        }"
                      />
                    </el-popover>
                  </div>-->
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!--鼠标悬浮-提示内容-->
    <div
      v-show="ganttInfo.popVisible && popVisible"
      ref="popModel"
      class="public-pop-container"
      data-aos="fade"
      :style="{
        top: `${popTop}px`,
        left: `${popLeft}px`
      }"
      @mouseleave="leavePop"
    >
      <div class="public-pop-wrapper">
        <div v-if="ganttInfo.popChild">
          <div
            v-for="(popItem, popKey) in popRow"
            :key="`pop-child-${popKey}`"
            class="public-pop-content"
          >
            <div
              v-for="(item, index) in ganttInfo.pop"
              :key="`pop-${index}`"
              class="row-wrapper"
            >
              <div
                v-if="index === 0"
                class="point-wrapper"
              >
                <div class="point" />
              </div>
              <div class="label">
                {{ item.label }}
              </div>
              <div
                v-if="popRow"
                class="value"
              >
                {{ popItem[item.value] }}
              </div>
            </div>
          </div>
        </div>
        <div
          v-else
          class="public-pop-content"
        >
          <div
            v-for="(item, index) in ganttInfo.pop"
            :key="`pop-${index}`"
            class="row-wrapper"
          >
            <div
              v-if="index === 0"
              class="point-wrapper"
            >
              <div class="point" />
            </div>
            <div class="label">
              {{ item.label }}
            </div>
            <div
              v-if="popRow"
              class="value"
            >
              {{ popRow[item.value] }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import BScroll from 'better-scroll';
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
      ganttInfo: {},
      dateList: [],
      Scroll: null,
      rowNum: 5,
      ganttData: [],
      currentDay: '',
      popVisible: false,
      popEnter: true,
      popRow: null,
      popTop: 0,
      popLeft: -10000
    };
  },
  watch: {
    params: {
      handler(newValue) {
        this.ganttInfo = newValue;
        this.ganttInit();
        this.$nextTick(() => {
          this.initScroll();
        });
      },
      deep: true,
      immediate: true
    }
  },
  methods: {
    ganttInit() {
      let { ganttInfo } = this;
      let { start_date } = ganttInfo;
      let { end_date } = ganttInfo;
      let start_month = this.getPreviousMonth(start_date);
      let end_month = this.getNextMonth(end_date);
      let monthArr = this.getMonthBetween(start_month, end_month);
      let dateArr = [];
      let lastDays = 0;
      for (let i = 0; i < monthArr.length; i++) {
        let item = monthArr[i];
        let [item_year, item_month] = item.split('-');
        let dayNum = this.getDaysInMonth(
          parseInt(item_year),
          parseInt(item_month)
        );
        if (i > 0) {
          lastDays += dateArr[i - 1]['days'];
        }
        let row = {
          index: lastDays,
          year: item_year,
          month: item_month,
          days: dayNum
        };
        dateArr.push(row);
        if (i === monthArr.length - 1) {
          this.dateList = dateArr;
          let rowNum = ganttInfo.data.length;
          if (rowNum < 6) {
            rowNum = 6;
          } else {
            rowNum += 2;
          }
          this.rowNum = rowNum;
          this.ganttData = ganttInfo.data;
        }
      }
    },
    getPreviousMonth(day) {
      let monthVal = null;
      if (day) {
        let [year, month] = day.split('-');
        let yearNum = parseInt(year, 10);
        let monthNum = parseInt(month, 10);
        if (monthNum === 1) {
          yearNum--;
          monthNum = 12;
        } else {
          monthNum--;
        }
        if (monthNum < 10) {
          monthNum = `0${monthNum}`;
        }
        monthVal = `${yearNum}-${monthNum}`;
      }
      return monthVal;
    },
    getNextMonth(day) {
      let current_day = this.getCurrentDay();
      let current_day_arr = current_day.split('-');
      let justify_day = `${day}-${current_day_arr[2]}`;
      let oDate1 = new Date(current_day);
      let oDate2 = new Date(justify_day);
      let used_day = day;
      if (oDate2 < oDate1) {
        used_day = `${current_day_arr[0]}-${current_day_arr[1]}`;
      }
      let [year, month] = used_day.split('-');
      let yearNum = parseInt(year, 10);
      let monthNum = parseInt(month, 10);
      monthNum++;
      if (monthNum > 12) {
        yearNum++;
        monthNum = 1;
      }
      if (monthNum < 10) {
        monthNum = `0${monthNum}`;
      }
      return `${yearNum}-${monthNum}`;
    },
    getMonthBetween(start, end) {
      let result = [];
      if (start && end) {
        let s = start.split('-');
        let e = end.split('-');
        let min = new Date();
        let max = new Date();
        min.setFullYear(s[0], s[1]);
        max.setFullYear(e[0], e[1]);
        let curr = min;
        while (curr <= max) {
          let month = curr.getMonth();
          let str = `${
            month === 0 ? curr.getFullYear() - 1 : curr.getFullYear()
          }-${month === 0 ? 12 : month < 10 ? `0${month}` : month}`;
          let s = `${curr.getFullYear()}-12`;
          if (str === s) {
            str = `${curr.getFullYear()}-12`;
          }
          result.push(str);
          curr.setMonth(month + 1);
        }
      }
      return result;
    },
    getDaysInMonth(year, month) {
      const daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
      if (
        month === 2 &&
        ((year % 4 === 0 && year % 100 !== 0) || year % 400 === 0)
      ) {
        return 29;
      } else {
        return daysInMonth[month - 1];
      }
    },
    justifyCurrentDay(itemYear, itemMonth, itemDay) {
      let currentDay = this.getCurrentDay();
      let itemDayLabel = itemDay;
      if (itemDay < 10) {
        itemDayLabel = `0${itemDay}`;
      }
      let itemLabel = `${itemYear}-${itemMonth}-${itemDayLabel}`;
      let is_today = false;
      if (itemLabel === currentDay) {
        is_today = true;
      }
      return is_today;
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
    },
    initScroll() {
      this.scroll = new BScroll('.public-gantt-container', {
        scrollX: true,
        click: true,
        tap: true
      });
      let that = this;
      let { ganttInfo } = this;
      this.apartCurrentDay(ganttInfo, (num) => {
        if (that.$refs.ganttElement) {
          const width = that.$refs.ganttElement.offsetWidth;
          const visibleWidth = width / 2;
          let offsetWidth = 0;
          let apartWidth = num * 32;
          if (apartWidth > visibleWidth) {
            offsetWidth = visibleWidth - apartWidth;
          }
          that.scroll.scrollTo(offsetWidth, 0, 0);
        }
      });
    },
    apartCurrentDay(ganttInfo, callback) {
      let { start_date } = ganttInfo;
      let start_previous = this.getPreviousMonth(start_date);
      if (start_previous) {
        let [start_year, start_month] = start_previous.split('-');
        if (Number(start_month) < 10) {
          start_month = `0${Number(start_month)}`;
        }
        let startDate = `${start_year}-${start_month}-01`;
        let currentDay = this.getCurrentDay();
        let daysNum = this.calculateDays(startDate, currentDay);
        callback(daysNum);
      }
    },
    getFullDay(year, month, day) {
      return day < 10 ? `${year}-${month}-0${day}` : `${year}-${month}-${day}`;
    },
    calculateDays(start, end) {
      let days = null;
      if (start && end) {
        let [year1, month1, day1] = start.split('-');
        let [year2, month2, day2] = end.split('-');
        let date1 = new Date(year1, month1 - 1, day1);
        let date2 = new Date(year2, month2 - 1, day2);
        let timeDiff = Math.abs(date2.getTime() - date1.getTime());
        days = Math.ceil(timeDiff / (1000 * 3600 * 24));
        days++;
      }
      return days;
    },
    getTotalBarTop(index) {
      let top = index * 41;
      return `${top}px`;
    },
    getTotalBarWidth(start, end) {
      let daysNum = this.calculateDays(start, end);
      let width = daysNum * 32;
      return `${width}px`;
    },
    setCurrentBarWrapper(row, index) {
      let { options } = row;
      let optionsItem = options[index];
      let { start_date } = row;
      let daysNum = this.calculateDays(start_date, optionsItem);
      let width = daysNum * 32;
      let currentDay = this.getCurrentDay();
      if (currentDay === optionsItem && index === 0) {
        width = daysNum * 32 - 16;
      }
      let optionsIndex = options.length - index;
      let indexOffect = optionsIndex + 10;
      let { color } = row;
      let background = color[index];
      return `width: ${width}px;background: ${background};z-index: ${indexOffect}`;
    },
    setCurrentBarContent(optionsIndex) {
      let { ganttInfo } = this;
      let { color } = ganttInfo;
      let background = color[optionsIndex];
      return `background: ${background}`;
    },
    enterBar(event) {
      let { ganttInfo } = this;
      if (ganttInfo.popVisible) {
        let { target } = event;
        let index = target.getAttribute('data-index');
        let { ganttData } = this;
        if (ganttInfo.popChild) {
          this.popRow = ganttData[index]['popList'];
        } else {
          this.popRow = ganttData[index];
        }
        this.popEnter = true;
        this.moveBar(event);
      }
    },
    leaveBar(){
      if(!this.popEnter){
        this.popVisible = false;
      }
    },
    moveBar(event) {
      let x = event.clientX;
      let y = event.clientY;
      let { scrollY } = window;
      if(this.$refs.popModel){
        const height = this.$refs.popModel.offsetHeight;
        this.popTop = y + scrollY - height - 70;
        this.popLeft = x - 15;
        this.popVisible = true;
        this.$refs.popModel.scrollTop = 0;
      }
    },
    leavePop(){
      this.popEnter = false;
      this.popVisible = false;
    }
  }
};
</script>

<style scoped lang="less">
.public-gantt-container {
  width: 100%;
  height: 100%;
  white-space: nowrap;
  overflow: hidden;
  font-family: PingFang SC, PingFang SC;
  background: #ffffff;
  box-shadow: -2px 2px 12px 1px rgba(0, 0, 0, 0.1);
  .public-gantt-wrapper {
    display: inline-block;
    .gantt-item {
      display: inline-block;
      border-left: solid #eaebec 1px;
      .gantt-year {
        height: 23px;
        font-size: 12px;
        color: #909399;
        display: flex;
        align-items: center;
        padding-left: 6px;
      }
      .gantt-row {
        display: inline-block;
        width: 31px;
        transition: 0.5s;
        transition-property: all;
        transition-duration: 0.5s;
        transition-timing-function: ease;
        transition-delay: 0s;
        border-top: solid #eaebec 1px;
        .gantt-header {
          width: 100%;
          height: 24px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 13px;
          color: #909399;
        }
        .gantt-header-active {
          width: 30px;
          height: 24px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 13px;
          background: #007bff;
          color: #ffffff;
          border: solid #007bff 1px;
        }
        .gantt-content {
          border-top: solid #eaebec 1px;
          position: relative;
          .line {
            width: 1px;
            height: 100%;
            background: #007bff;
            position: absolute;
            left: 15px;
            top: 0px;
          }
        }
        .bar-container {
          .bar-pop {
            position: absolute;
            height: 40px;
            z-index: 30;
          }
          .bar-wrapper {
            position: absolute;
            height: 40px;
            display: flex;
            align-items: center;
            z-index: 10;
            .bar-content {
              width: 100%;
              height: 24px;
              border-radius: 12px;
              position: relative;
              z-index: 8888;
              .current-wrapper {
                position: absolute;
                left: 0px;
                top: 0px;
                height: 24px;
                border-radius: 12px;
                /*animation: barRun 0.5s;*/
              }
              @keyframes barRun {
                0% {
                  width: 0%;
                }
                100% {
                  width: 100%;
                }
              }
              .gantt-pop-wrapper {
                position: absolute;
                left: 0px;
                top: 0px;
                width: 100%;
                height: 24px;
                z-index: 80;
              }
            }
          }
        }
      }
    }
  }
}
.public-pop-container {
  min-width: 320px;
  max-height: 256px;
  background: #ffffff;
  box-shadow: 0px 2px 4px 1px rgba(0, 0, 0, 0.1);
  border-radius: 4px;
  font-family: PingFang SC, PingFang SC;
  position: absolute;
  z-index: 888;
  transition: 0.5s;
  transition-property: all;
  transition-duration: 0.5s;
  transition-timing-function: ease;
  transition-delay: 0s;
  overflow-x: hidden;
  overflow-y: auto;
  .public-pop-wrapper {
    margin: 0px 16px 0px 16px;
    padding: 7px 0px 16px 0px;
    .public-pop-content {
      margin-top: 9px;
    }
    .row-wrapper {
      display: flex;
      justify-content: space-between;
      position: relative;
      margin-bottom: 7px;
      .point-wrapper {
        height: 20px;
        display: flex;
        align-items: center;
        position: absolute;
        left: 0px;
        top: 0px;
        .point {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: #5abdff;
        }
      }
      .label {
        font-size: 14px;
        color: #303133;
        padding-left: 13px;
        line-height: 20px;
      }
      .value {
        font-size: 14px;
        color: #606266;
        line-height: 20px;
        margin-left: 16px;
      }
    }
  }
}
</style>