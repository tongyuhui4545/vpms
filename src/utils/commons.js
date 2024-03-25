/* eslint-disable func-style */
import CryptoJS from 'crypto-js';
import baseUrl from '@/config.js';
import store from '@/store/index.js';

export function formatDate(inputDate, type) {
  const date = new Date(inputDate);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  if (type !== 'yyyy-MM-dd') {
    const hour = String(date.getHours()).padStart(2, '0');
    const minute = String(date.getMinutes()).padStart(2, '0');
    const second = String(date.getSeconds()).padStart(2, '0');
    return `${year}-${month}-${day} ${hour}:${minute}:${second}`;
  }
  return `${year}-${month}-${day}`;
}

//根据任务的各种due-date计算任务过期状态
export function calDueDate(dueDate) {
  let formatedDueDate = new Date(dueDate);

  formatedDueDate.setHours(0, 0, 0, 0);

  const today = new Date();

  const dayDiffNum =
    (formatedDueDate.getTime() - today.getTime()) / (1000 * 3600 * 24);

  let dayDiff = '';

  //   if(dayDiffNum >= 0 && dayDiffNum <= 1) {
  //      dayDiff = 0;
  //   }

  {
    dayDiff = dayDiffNum > 0 ? Math.ceil(dayDiffNum) : Math.floor(dayDiffNum);
  }

  return dayDiff;
}

export function getUserInfo() {
  let userInfo = JSON.parse(localStorage.getItem('user'));
  if (userInfo) {
    return userInfo;
  }
  return null;
}

export function judgeDisplayClock(type, status) {
  let statusArr = [];
  if (type === 'due_date') {
    statusArr = [
      'Quote released',
      'Quote sent',
      'Win & Pending US engineer final review',
      'Final review approval'
    ];
    if (statusArr.indexOf(status) !== -1) {
      return false;
    } else {
      return true;
    }
  }
  if (type === 'inner_date') {
    statusArr = [
      'Quote released',
      'Quote sent',
      'Win & Pending US engineer final review',
      'Final review approval',
      'Final review approval'
    ];
    if (statusArr.indexOf(status) !== -1) {
      return false;
    } else {
      return true;
    }
  }
  if (type === 'team_due_date') {
    statusArr = [
      'Quote submited & Pending CN approval',
      'Pending US approval',
      'Quote released',
      'Quote sent',
      'Win & Pending US engineer final review',
      'Final review approval',
      'Final review approval'
    ];

    if (statusArr.indexOf(status) !== -1) {
      return false;
    } else {
      return true;
    }
  }
  if (type === 'formal_project') {
    statusArr = [
      'Label file submited & Pending approval',
      'Label file released'
    ];

    if (statusArr.indexOf(status) !== -1) {
      return false;
    } else {
      return true;
    }
  }
  if (type === 'simulation') {
    statusArr = [
      'Simulation submitted & Pending approval',
      'Simulation released',
      'Pending US simulation approval'
    ];

    if (statusArr.indexOf(status) !== -1) {
      return false;
    } else {
      return true;
    }
  }
  if (type === 'calculation') {
    statusArr = [
      '3D calculation submitted & Pending 3D CN approval',
      'Pending US 3D calculation approval',
      '3D calculation released'
    ];

    if (statusArr.indexOf(status) !== -1) {
      return false;
    } else {
      return true;
    }
  }
}

export function mapStatus(status) {
  switch (status) {
    case 'US_TO_BE_SEND':
      return 'Pending US engineer review';
    case 'CN_REJECTED_MANAGER':
      return 'CN engineer rejected';
    case 'US_HAS_BEEN_SEND':
      return 'Pending assign design team';
    case 'US_REJECTED':
      return 'US engineer rejected';
    case 'US_PASSED':
      return 'Quote released';
    case 'CN_ASSIGNED':
      return 'Team assigned & pending quote';
    case 'CN_TEAM_ALREADY_APPLIED':
      return 'Quote submited & Pending CN approval';
    case 'CN_REJECTED':
      return 'Quote rejected & pending re-quote';
    case 'CN_PASSED':
      return 'Pending US approval';
    case 'WIN':
      return 'Win & Pending US engineer final review';
    case 'QUOTE_SENT':
      return 'Quote sent';
    case 'US_FINAL_PASSED':
      return 'Final review approval';
    case 'FORMAL_ASSIGNED_TEAM':
      return 'Pending assign label team';
    case 'FORMAL_DESIGN_LABEL':
      return 'Team assigned & pending label file';
    case 'FORMAL_LABEL_SEND':
      return 'Label file submited & Pending approval';
    case 'FORMAL_LABEL_REJECTED':
      return 'Label file rejected & Pending re-label';
    case 'FORMAL_LABEL_RELEASED':
      return 'Label file released';
    default:
      return '';
  }
}

// 加密函数
export function encrypt(str, KEY, IV) {
  let key = CryptoJS.enc.Utf8.parse(KEY);
  let iv = CryptoJS.enc.Utf8.parse(IV);
  let encrypted = CryptoJS.AES.encrypt(str, key, {
    iv,
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.Pkcs7
  });
  return encrypted.toString();
}

// 解密函数
export function decrypt(str, KEY, IV) {
  let key = CryptoJS.enc.Utf8.parse(KEY);
  let iv = CryptoJS.enc.Utf8.parse(IV);
  let decrypt = CryptoJS.AES.decrypt(str, key, {
    iv,
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.Pkcs7
  });
  return decrypt.toString(CryptoJS.enc.Utf8);
}

//获取当月的最后一天
export function getLastDay(year, month) {
  const nextYear = year + 1;
  const nextMonth = month + 1;

  return new Date(
    new Date(
      `${month < 12 ? year : nextYear}-${month === 12 ? 1 : nextMonth} 00:00`
    ).getTime() - 1
  ).getDate();
}

export function directDownload(url, name) {
  let fileUrl = '';
  fileUrl = url.includes('http') ? url : `${baseUrl.baseUrl}/${url}`;
  if (process.env.NODE_ENV === 'production') {
    fileUrl = url.includes('https:') ? url : url.replace('http://', 'https://');
  }
  const x = new XMLHttpRequest();
  x.open('GET', fileUrl, true);
  x.responseType = 'blob';
  x.onload = function () {
    const url = window.URL.createObjectURL(x.response);
    const a = document.createElement('a');
    a.href = url;
    a.target = '_blank';
    a.download = name;
    a.click();
    a.remove();
  };
  x.onprogress = (event) => {
    //下载进度的展示效果
    if (event.lengthComputable) {
      store.dispatch('app/changeLoading', true);
      const percentComplete = (event.loaded / event.total) * 100;
      if (percentComplete === 100) {
        store.dispatch('app/changeLoading', false);
      }
    }
  };
  x.send();
}

export function determineFilePreview(filename) {
  if (
    /\.doc?$/.test(filename.toLowerCase()) ||
    /\.pptx?$/.test(filename.toLowerCase()) ||
    /\.ppt$/.test(filename.toLowerCase()) ||
    /\.mp4$/.test(filename.toLowerCase())
  ) {
    return false;
  } else {
    return true;
  }
}

export const detectZoom = () => {
  let ratio = 0,
    {screen} = window,
    ua = navigator.userAgent.toLowerCase();
  if (window.devicePixelRatio !== undefined) {
    ratio = window.devicePixelRatio;
  } else if (~ua.indexOf('msie')) {
    if (screen.deviceXDPI && screen.logicalXDPI) {
      ratio = screen.deviceXDPI / screen.logicalXDPI;
    }
  } else if (
    window.outerWidth !== undefined &&
    window.innerWidth !== undefined
  ) {
    ratio = window.outerWidth / window.innerWidth;
  }
  if (ratio) {
    ratio = Math.round(ratio * 100);
  }
  return ratio;
}

