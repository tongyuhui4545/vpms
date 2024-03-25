import dayjs from 'dayjs'
import rTime from 'dayjs/plugin/relativeTime'
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore';

// 对时间进行格式化
// eslint-disable-next-line func-style
export function formatTime(data = new Date(), type = 'YYYY-MM-DD') {
  return dayjs(data).format(type)
}

dayjs.extend(isSameOrBefore);
// 其它例如相对时间，需要单独配置它自己的插件才可以使用
dayjs.extend(rTime);


export const dayDifference = (value) => {
  let now = dayjs();
  return dayjs(value).diff(now, 'day', true);
}

export const monthDifference = (date1, date2) => {
  return dayjs(date2).diff(date1, 'month', true);
}

export const hourDifference = (value) => {
  let now = dayjs();
  return dayjs(value).diff(now, 'h', true);
}

export const compareIsSameOrBefore = (value) => {
  // 当前日期
  const currentDate = dayjs();
  // 传入的日期
  const inputDate = dayjs(value);

  // 使用isSameOrBefore方法比较日期
  return currentDate.isSameOrBefore(inputDate, 'day');
};

export default {
  formatTime,
  dayDifference,
  compareIsSameOrBefore,
  hourDifference
}