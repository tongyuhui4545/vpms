import axios from '@/utils/request';
import axiosRequest from 'axios';
import config from '@/config';

// const tempBaseUrl = 'https://mock.apifox.com/m1/3142509-0-default';

//文件上传
export const uploadFiles = (data, header, options) => {
  return axios.post('/api/upload-files', data, header, options);
};
//登录
export const login = (data, header, options) => {
  return axios.post('/api/login', data, header, options);
};
//注册
export const register = (data, header, options) => {
  return axios.post('/api/users/add', data, header, options);
};
//修改密码
export const editPassword = (data, header, options) => {
  return axios.post('/api/change-password', data, header, options);
};
//用户注销
export const logout = (data, header, options) => {
  return axios.post('/api/logout', data, header, options);
};
//刷新token
export const refresh = (data, header, options) => {
  return axios.post('/api/token/refresh', data, header, options);
};
//用户信息
export const userInfo = (data, header, options) => {
  return axios.get('/api/user', data, header, options);
};
//角色列表
export const roleList = (data, header, options) => {
  return axios.get('/api/role/list', data, header, options);
};
export const roleAdd = (data, header, options) => {
  return axios.post('/api/role/add', data, header, options);
};
export const roleEdit = (data, header, options) => {
  return axios.post('/api/role/edit', data, header, options);
};
export const roleDelete = (data, header, options) => {
  return axios.post('/api/role/delete', data, header, options);
};
export const roleDetail = (id, data, header, options) => {
  return axios.get(`/api/role/detail/${id}`, data, header, options);
};
export const roleLimitsDetail = (data, header, options) => {
  return axios.get('/api/role/limits/detail', data, header, options);
};
export const roleLimitsList = (data, header, options) => {
  return axios.get('/api/role/limits/list', data, header, options);
};
export const limitsList = (data, header, options) => {
  return axios.get('/api/catalog/list', data, header, options);
};
export const limitsAdd = (data, header, options) => {
  return axios.post('/api/catalog/add', data, header, options);
};
export const limitsEdit = (data, header, options) => {
  return axios.post('/api/catalog/edit', data, header, options);
};
export const limitsDelete = (data, header, options) => {
  return axios.post('/api/catalog/delete', data, header, options);
};
export const limitsDetail = (id, data, header, options) => {
  return axios.get(`/api/catalog/detail/${id}`, data, header, options);
};

/****************************Project Module*************************************/
//bidding-project列表
export const projectsList = (data, header, options) => {
  return axios.get('/api/project/list', data, header, options);
};
//formal-project列表
export const formalProjectsList = (data, header, options) => {
  return axios.get('/api/formal-project/list', data, header, options);
};
export const projectsTotal = (data, header, options) => {
  return axios.get('/api/projects/total', data, header, options);
};
//创建项目
export const addProject = (data, header, options) => {
  return axios.post('/api/project/add', data, header, options);
};
//项目编辑
export const editProject = (data, header, options) => {
  return axios.post('/api/project/edit', data, header, options);
};
//formal-project编辑
export const editFormalProject = (data, header, options) => {
  return axios.post('/api/formal-project/edit', data, header, options);
};
//修改bidding项目状态
export const projectStatus = (data, header, options) => {
  return axios.post('/api/progress/status/update', data, header, options);
};
//项目详情
export const projectDetail = (data, header, options) => {
  return axios.get('/api/project/detail', data, header, options);
};
//正式项目详情
export const formalProjectDetail = (id, data, header, options) => {
  return axios.get(`/api/formal-project/${id}`, data, header, options);
};
//删除项目
export const deleteProject = (data, header, options) => {
  return axios.post('/api/project/delete', data, header, options);
};
//项目归档
export const archiveProject = (data, header, options) => {
  return axios.post('/api/project/archiving', data, header, options);
};
//项目解档
export const unarchiveProject = (data, header, options) => {
  return axios.post('/api/project/unarchiving', data, header, options);
};
//项目团队
export const projectTeams = (data, header, options) => {
  return axios.get('/api/project/teams', data, header, options);
};
//phase列表
export const phaseList = (data, header, options) => {
  return axios.get('/api/progress/list', data, header, options);
};
//新增progress
export const addProgress = (data, header, options) => {
  return axios.post('/api/progress/add', data, header, options);
};
//编辑progress
export const editProgress = (data, header, options) => {
  return axios.post('/api/progress/edit', data, header, options);
};
//删除progress
export const removeProgress = (data, header, options) => {
  return axios.post('/api/progress/delete', data, header, options);
};
//phase的归档
export const archivePhase = (data, header, options) => {
  return axios.post('/api/phase/archiving', data, header, options);
};
//phase的解档
export const unarchivePhase = (data, header, options) => {
  return axios.post('/api/phase/unarchiving', data, header, options);
};
//progress详情
export const progressDetail = (data, header, options) => {
  return axios.get('/api/progress/detail', data, header, options);
};
// 任务列表
export const taskList = (data, header, options) => {
  return axios.get('/api/task/list', data, header, options);
};
export const workSummary = (data, header, options) => {
  return axios.get('/api/task/work-summary', data, header, options);
};
//新增Series
export const addSeries = (data, header, options) => {
  return axios.post('/api/series/add', data, header, options);
};
export const seriesDetail = (id, data, header, options) => {
  return axios.get(`/api/series/${id}`, data, header, options);
};
export const editSeries = (data, header, options) => {
  return axios.post('/api/series/edit', data, header, options);
};
export const deleteSeries = (data, header, options) => {
  return axios.post('/api/series/delete', data, header, options);
};
//progress-文件上传
export const progressFile = (data, header, options) => {
  return axios.post('/api/progress-file', data, header, options);
};
//2d/3d单个文件删除
export const removeSingleProgressFile = (data, header, options) => {
  return axios.post('/api/progress-file/remove', data, header, options);
};
//3d 文件上传
export const upload3Dfiles = (data, header, options) => {
  return axios.post('/api/submit-phase-3d-files', data, header, options);
};
export const progressFileList = (data, header, options) => {
  return axios.get('/api/progress-file/list', data, header, options);
};
export const editProgressFile = (data, header, options) => {
  return axios.post('/api/progress-file/edit', data, header, options);
};
export const deleteProgressFile = (data, header, options) => {
  return axios.post('/api/progress-file/delete', data, header, options);
};
//根据客户id获取联系人信息
export const contactListByClient = (clientId, data, header, options) => {
  return axios.get(`/api/contact-list/${clientId}`, data, header, options);
};
//simulation 任务产生
export const simulationTaskGeneration = (data, header, options) => {
  return axios.post('/api/project/simulation', data, header, options);
};
//项目详情获取报价列表
export const getQuoteList = (data, header, options) => {
  return axios.get('/api/project/quote-files/list', data, header, options);
};

/****************************Overview*************************************/
//Statistics
export const statisticsList = (data, header, options) => {
  return axios.get('/api/performance/statistics', data, header, options);
};
//公告列表
export const announcementList = (data, header, options) => {
  return axios.get('/api/announcement/list', data, header, options);
};
//公告新增
export const announcementAdd = (data, header, options) => {
  return axios.post('/api/announcement/add', data, header, options);
};
//公告编辑
export const announcementEdit = (data, header, options) => {
  return axios.post('/api/announcement/edit', data, header, options);
};
//公告编辑
export const announcementDelete = (data, header, options) => {
  return axios.post('/api/announcement/delete', data, header, options);
};

/****************************Solar Module*************************************/
//太阳能板列表
export const solarList = (data, header, options) => {
  return axios.get('/api/solar-modules', data, header, options);
};
//创建太阳能面板
export const addSolar = (data, header, options) => {
  return axios.post('/api/solar-module', data, header, options);
};
//编辑太阳能面板
export const editSolar = (data, header, options) => {
  return axios.post('/api/solar-module/edit', data, header, options);
};
//太阳能面板详情
export const solarDetail = (id, data, header, options) => {
  return axios.get(`/api/solar-module/${id}`, data, header, options);
};
//删除太阳能面板
export const deleteSolar = (id, data, header, options) => {
  return axios.post(`/api/solar-module/delete/${id}`, data, header, options);
};
//太阳能面板下拉框
export const solarListSelect = (data, header, options) => {
  return axios.get('/api/solar-module-list', data, header, options);
};

//获取品牌列表
export const manufacturerList = (data, header, options) => {
  return axios.get('/api/manufacturer', data, header, options);
};
//获取品牌系列
export const seriesList = (data, header, options) => {
  return axios.get('/api/module-series', data, header, options);
};
//新增厂商
export const addManufacturer = (data, header, options) => {
  return axios.post('/api/manufacturer/add', data, header, options);
};
//新增厂商系列
export const addManufacturerSeries = (data, header, options) => {
  return axios.post('/api/module-series/add', data, header, options);
};

/****************************Racking Tracker**********************************/
export const trackerList = (data, header, options) => {
  return axios.get('/api/racking-trackers', data, header, options);
};
export const trackerAdd = (data, header, options) => {
  return axios.post('/api/racking-tracker', data, header, options);
};
export const trackerDetail = (id, data, header, options) => {
  return axios.get(`/api/racking-tracker/${id}`, data, header, options);
};
export const editTracker = (data, header, options) => {
  return axios.post('/api/racking-tracker/edit', data, header, options);
};
export const deleteTracker = (id, data, header, options) => {
  return axios.post(`/api/racking-tracker/delete/${id}`, data, header, options);
};
export const trackerListSelect = (data, header, options) => {
  return axios.get('/api/racking-tracker-list', data, header, options);
};

/****************************customer**********************************/
export const customerList = (data, header, options) => {
  return axios.get('/api/clients', data, header, options);
};
export const customerAdd = (data, header, options) => {
  return axios.post('/api/client', data, header, options);
};
export const customerDetail = (id, data, header, options) => {
  return axios.get(`/api/client/${id}`, data, header, options);
};
export const customerAll = (data, header, options) => {
  return axios.get('/api/clients-all', data, header, options);
};
export const editCustomer = (data, header, options) => {
  return axios.post('/api/client/edit', data, header, options);
};
export const deleteCustomer = (id, data, header, options) => {
  return axios.post(`/api/client/delete/${id}`, data, header, options);
};

/****************************personnel**********************************/
export const personnelList = (data, header, options) => {
  return axios.get('/api/contacts', data, header, options);
};
export const personnelAdd = (data, header, options) => {
  return axios.post('/api/contact', data, header, options);
};
export const personnelDetail = (id, data, header, options) => {
  return axios.get(`/api/contact/${id}`, data, header, options);
};

//销售列表
export const salesList = (data, header, options) => {
  return axios.get('/api/sales-list', data, header, options);
};
//配置信息
export const configParams = (data, header, options) => {
  return axios.get('/api/config', data, header, options);
};
//修改progress状态
export const progressStatus = (data, header, options) => {
  return axios.post('/api/change-progress-status', data, header, options);
};
//更改小组分配
export const changeTeam = (data, header, options) => {
  return axios.post('/api/project/change-team', data, header, options);
};
//销售修改project状态
export const changeProjectStatus = (data, header, options) => {
  return axios.post('/api/project/sales-status', data, header, options);
};
//发送邮件
export const sendEmail = (data, header, options) => {
  return axios.post('/api/send-email', data, header, options);
};
//团队列表
export const teamList = (data, header, options) => {
  return axios.get('/api/teams-list', data, header, options);
};
export const addTeam = (data, header, options) => {
  return axios.post('/api/teams/add', data, header, options);
};
export const teamDetail = (id, data, header, options) => {
  return axios.get(`/api/teams/detail/${id}`, data, header, options);
};
export const teamEdit = (data, header, options) => {
  return axios.post('/api/teams/edit', data, header, options);
};
export const teamDelete = (id, data, header, options) => {
  return axios.post(`/api/teams/delete/${id}`, data, header, options);
};
//人员列表
export const userList = (data, header, options) => {
  return axios.get('/api/users', data, header, options);
};
//人员详情
export const userDetail = (id, data, header, options) => {
  return axios.get(`/api/users/detail/${id}`, data, header, options);
};
export const userEdit = (data, header, options) => {
  return axios.post('/api/users/edit', data, header, options);
};
export const userDelete = (id, data, header, options) => {
  return axios.post(`/api/users/delete/${id}`, data, header, options);
};
//设置团队组长
export const setManager = (data, header, options) => {
  return axios.post('/api/set-manager', data, header, options);
};
// ****************************notice**********************************
//通知列表
export const notices = (data, header, options) => {
  return axios.get('/api/notices', data, header, options);
};
//新增通知
export const addNotice = (data, header, options) => {
  return axios.post('/api/notices/add', data, header, options);
};
//设置通知已读
export const noticeRead = (data, header, options) => {
  return axios.post('/api/notices/read', data, header, options);
};
//获取已读通知的数量
export const getUnreadNoticeNum = (data, header, options) => {
  return axios.get('/api/notices/unread', data, header, options);
};
// ****************************Comments&Updates**********************************
//获取评论列表
export const getComments = (data, header, options) => {
  return axios.get('/api/comments', data, header, options);
};
//新增评论
export const addComment = (data, header, options) => {
  return axios.post('/api/comments/add', data, header, options);
};
//编辑评论
export const editComment = (data, header, options) => {
  return axios.post('/api/comments/edit', data, header, options);
};
// 删除评论
export const deleteComment = (data, header, options) => {
  return axios.post('/api/comments/delete', data, header, options);
};
export const deleteCommentFile = (data, header, options) => {
  return axios.post('/api/comments/remove-file', data, header, options);
};
// 获取updates列表
export const getUpdates = (data, header, options) => {
  return axios.get('/api/updates', data, header, options);
};
// ****************************Download**********************************
//下载Quote文件
export const downloadQuote = (data, header, options) => {
  return axios.get('/api/quote-file', data, header, options);
};
//下载confirmation文件
export const downloadConfirmation = async (
  vueInstance,
  progressId,
  projectName
) => {
  const token = localStorage.getItem('token');
  axiosRequest({
    url:
      `${config.baseUrl}/api/confirmation/download?progress_id=` +
      `${progressId}`,
    method: 'GET',
    responseType: 'blob',
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
    .then((res) => {
      const url = URL.createObjectURL(res.data);
      const link = document.createElement('a');
      link.href = url;
      link.download = `${projectName} confirmation file.xlsx`;
      link.click();
      URL.revokeObjectURL(url);
      vueInstance.$message.success('Download successfully');
    })
    .catch(() => {
      vueInstance.$message.error('Download failed or no files available');
    });
};
//查找线缆项目列表
export const cableList = (data, header, options) => {
  return axios.get(
    '/api/v1/aided-tools/supporting-sales/cable-segment/project-list',
    data,
    header,
    options
  );
};

//查找线缆列表
export const cableSegmentList = (data, header, options) => {
  return axios.get(
    '/api/v1/aided-tools/supporting-sales/cable-segment/cable-list',
    data,
    header,
    options
  );
};

//删除线缆分段方案
export const deleteCableSegment = (project_id, data, header, options) => {
  return axios.post(
    `/api/v1/aided-tools/supporting-sales/cable-segment/delete/${project_id}`,
    data,
    header,
    options
  );
};

//新建线缆项目
export const addCableProject = (data, header, options) => {
  return axios.post(
    '/api/v1/aided-tools/supporting-sales/cable-segment/create',
    data,
    header,
    options
  );
};

//删除线缆项目
export const downloadCableSegment = (vueInstance, project_id, project_name) => {
  axiosRequest({
    url: `${config.baseUrl}/api/v1/aided-tools/supporting-sales/cable-segment/download-solution/${project_id}`,
    method: 'GET',
    responseType: 'blob',
    headers: {}
  }).then((res) => {
    const url = URL.createObjectURL(res.data);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${project_name}-cable-segment.xlsx`;
    link.click();
    URL.revokeObjectURL(url);
    vueInstance.$message.success('Download successfully');
  });
};

//查看线缆项目详情
export const cableProjectDetail = (project_id, data, header, options) => {
  return axios.get(
    `/api/v1/aided-tools/supporting-sales/cable-segment/view/${project_id}`,
    data,
    header,
    options
  );
};
//提交线缆项目的编辑
export const editCableProject = (data, header, options) => {
  return axios.post(
    '/api/v1/aided-tools/supporting-sales/cable-segment/edit',
    data,
    header,
    options
  );
};
// *********************************working hours***********************************************
// v0.9.0个人全部工时统计
export const getPersonalWorkingHours = (data, header, options) => {
  return axios.get('/api/work-date/personal/summary', data, header, options);
}
//登记工时
export const registerWorkingHours = (data, header, options) => {
  return axios.post('/api/work-date/add', data, header, options);
};
//获取工时列表
export const getWorkingHoursList = (data, header, options) => {
  return axios.get('/api/work-date/list', data, header, options);
};
//编辑工时
export const editWorkingHours = (data, header, options) => {
  return axios.post('/api/work-date/edit', data, header, options);
};
//获取工时详情
export const getWorkingHoursDetail = (id, data, header, options) => {
  return axios.get(`/api/work-date/detail/${id}`, data, header, options);
};
//删除工时
export const deleteWorkingHours = (data, header, options) => {
  return axios.post('/api/work-date/delete', data, header, options);
};
//获取工时统计
export const getWorkingHoursSummary = (data, header, options) => {
  return axios.get('/api/work-date/summary', data, header, options);
};
// *********************************************************************************************

// *********************************performance appraisal***************************************
export const getPerformanceList = (data, header, options) => {
  return axios.get('/api/performance/list', data, header, options);
};
export const getPerformanceSummary = (data, header, options) => {
  return axios.get('/api/performance/summary', data, header, options);
};
export const performanceSummaryAdd = (data, header, options) => {
  return axios.post('/api/performance/add', data, header, options);
};

export const downloadPerformanceListFile = async (vueInstance, params) => {
  const token = localStorage.getItem('token');
  // Convert params object to query string
  const queryString = Object.keys(params)
    .map((key) => {
      if (key === 'user') {
        // Leave 'user' as it is
        return `${encodeURIComponent(key)}=${params[key]}`;
      }
      return `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`;
    })
    .join('&');

  // Append the query string to the URL
  const apiUrl = `${config.baseUrl}/api/performance/list-excel?${queryString}`;

  axiosRequest({
    url: apiUrl,
    method: 'GET',
    responseType: 'blob',
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
    .then((res) => {
      const url = URL.createObjectURL(res.data);
      const link = document.createElement('a');
      link.href = url;
      link.download = 'performanceFile.xlsx';
      link.click();
      URL.revokeObjectURL(url);
      vueInstance.$message.success('Download successfully');
    })
    .catch((error) => {
      vueInstance.$message.error(error);
    });
};

export const downloadPerformanceFile = async (
  vueInstance,
  mode,
  type,
  date_start,
  date_end,
  task_type
) => {
  const token = localStorage.getItem('token');
  axiosRequest({
    url: `${config.baseUrl}/api/performance/download?mode=${mode}&type=${type}&date_start=${date_start}&date_end=${date_end}&task_type=${task_type}`,
    method: 'GET',
    responseType: 'blob',
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
    .then(async (res) => {
      // 将 Blob 数据转换为文本
      const textData = await new Response(res.data).text();
      if (textData.includes('code')) {
        const jsonData = JSON.parse(textData);
        const { code } = jsonData;
        if (code === 422) {
          vueInstance.$message.error('No content could be downloaded');
          return;
        }
      }
      const url = URL.createObjectURL(res.data);
      const link = document.createElement('a');
      link.href = url;
      link.download = 'performanceFile.xlsx';
      link.click();
      URL.revokeObjectURL(url);
      vueInstance.$message.success('Download successfully');
    })
    .catch((error) => {
      vueInstance.$message.error(error);
    });
};
// *********************************Forget Password***************************************
export const sendEmailCode = (data, header, options) => {
  return axios.post(
    '/api/login/forget-password/send-email-code',
    data,
    header,
    options
  );
};

export const verificationEmailCode = (data, header, options) => {
  return axios.post(
    '/api/login/forget-password/verification-email-code',
    data,
    header,
    options
  );
};

export const changePassword = (data, header, options) => {
  return axios.post(
    '/api/login/forget-password/change-password',
    data,
    header,
    options
  );
};

// ********************************* 自定义任务 ***************************************
export const createCustomTask = (data, header, options) => {
  return axios.post('/api/custom-task', data, header, options);
};

export const getCustomTaskDetail = (data, header, options) => {
  return axios.get('/api/custom-task', data, header, options);
};

export const editCustomTask = (data, header, options) => {
  return axios.post('/api/custom-task/edit', data, header, options);
};

export const changeRecipient = (data, header, options) => {
  return axios.post('/api/custom-task/recipient', data, header, options);
};

export const getCustomTaskList = (data, header, options) => {
  return axios.get('/api/custom-task/list', data, header, options);
};

export const getCustomTaskTagList = (data, header, options) => {
  return axios.get('/api/custom-task/tag/list', data, header, options);
};

export const addCustomTaskTag = (data, header, options) => {
  return axios.post('/api/custom-task/tag', data, header, options);
};

export const editCustomTaskTag = (data, header, options) => {
  return axios.post('/api/custom-task/tag/edit', data, header, options);
};

export const deleteCustomTaskTag = (data, header, options) => {
  return axios.post('/api/custom-task/tag/delete', data, header, options);
};

export const changeTaskStatus = (data, header, options) => {
  return axios.post('/api/custom-task/status', data, header, options);
};

export const restartTaskStatus = (data, header, options) => {
  return axios.post('/api/custom-task/restart', data, header, options);
};

export const getCustomTaskCommentList = (data, header, options) => {
  return axios.get('/api/custom-task/comment/list', data, header, options);
};

export const addCustomTaskComment = (data, header, options) => {
  return axios.post('/api/custom-task/comment', data, header, options);
};
export const editCustomTaskComment = (data, header, options) => {
  return axios.post('/api/custom-task/comment/edit', data, header, options);
};

export const deleteCustomTaskComment = (data, header, options) => {
  return axios.post('/api/custom-task/comment/delete', data, header, options);
};

export const getCustomTaskUpdate = (data, header, options) => {
  return axios.get('/api/custom-task/updates', data, header, options);
};

export const uploadTaskFiles = (data, header, options) => {
  return axios.post('/api/custom-task/files', data, header, options);
};

export const getTaskFiles = (data, header, options) => {
  return axios.get('/api/custom-task/files', data, header, options);
};

export const deleteTaskFiles = (data, header, options) => {
  return axios.post('/api/custom-task/files/delete', data, header, options);
};

export const getTaskTotal = (data, header, options) => {
  return axios.get('/api/task/list/total', data, header, options);
};

export const getTaskCount = (data, header, options) => {
  return axios.get('/api/task/list/count', data, header, options);
};

export const getUpdatesList = (data, header, options) => {
  return axios.get('/api/project/updates-list', data, header, options);
};

// ********************************************文件中心*********************************************
//获取文件夹列表
export const getFileCenterFolderList = (data, header, options) => {
  return axios.get('/api/project/directory/list', data, header, options);
};
//获取文件列表
export const getFileCenterFileList = (data, header, options) => {
  return axios.get('/api/project/file/list', data, header, options);
};
//创建文件夹
export const createFolder = (data, header, options) => {
  return axios.post('/api/project/directory/add', data, header, options);
};
//编辑文件夹
export const editFolder = (data, header, options) => {
  return axios.post('/api/project/directory/edit', data, header, options);
};
//删除文件夹
export const deleteFolder = (data, header, options) => {
  return axios.post('/api/project/directory/delete', data, header, options);
};
//上传文件
export const fileCenterUploadFile = (data, header, options) => {
  return axios.post('/api/project/file/add', data, header, options);
};
//删除文件
export const fileCenterDeleteFile = (data, header, options) => {
  return axios.post('/api/project/file/delete', data, header, options);
};
//文件搜索
export const fileCenterSearchFile = (data, header, options) => {
  return axios.get('/api/project/file/search', data, header, options);
};

/* ************************************************************************ */

/* v0.9.0 Dashboard 页面 */
// v0.9.0 project and phase stats - dashboard page
export const getProjectAndPhaseSummary = (data, header, options) => {
  return axios.get('/api/dashboard/summary', data, header, options);
}
// v0.9.0 project and phase export
export const exportProjectAndPhaseSummary = async (
  vueInstance,
  creation_time_start,
  creation_time_end
) => {
  const token = localStorage.getItem('token');
  axiosRequest({
    url: `${config.baseUrl}/api/dashboard/summary/download?creation_time_start=${creation_time_start}&creation_time_end=${creation_time_end}`,
    method: 'GET',
    responseType: 'blob',
    headers: {
      Authorization: `Bearer ${token}`
    }
  }).then(async (res) => {
    // 将 Blob 数据转换为文本
    const textData = await new Response(res.data).text();
    if (textData.includes('code')) {
      const jsonData = JSON.parse(textData);
      const { code } = jsonData;
      if (code === 422) {
        vueInstance.$message.error('No content could be downloaded');
        return;
      }
    }
    const url = URL.createObjectURL(res.data);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'performanceFile.xlsx';
    link.click();
    URL.revokeObjectURL(url);
    vueInstance.$message.success('Download successfully');
  })
  .catch((error) => {
    vueInstance.$message.error(error);
  });
  // return axios.get('/api/dashboard/summary/download', data, header, options);
}
// v0.9.0 dashboard project list
export const getDashboardProjectList = (data, header, options) => {
  return axios.get('/api/dashboard/project/list', data, header, options);
}
// v0.9.0 dashboard project list export
export const exportDashboardProjectList = (data, header, options) => {
  return axios.get('/api/dashboard/project/list/download', data, header, options);
}
// v0.9.0 dashboard project list export
export const getDashboardPhaseList = (data, header, options) => {
  return axios.get('/api/dashboard/phase/list', data, header, options);
}
// v0.9.0 dashboard project list export
export const exportDashboardPhaseList = (data, header, options) => {
  return axios.get('/api/dashboard/phase/list/download', data, header, options);
}
//v0.9.0 on-going task统计
export const getOngoingTaskSummary = (data, header, options) => {
  return axios.get('/api/dashboard/ongoing-tasks/summary', data, header, options);
}
//v0.9.0 on-going task统计导出
export const getOngoingTaskList = (data, header, options) => {
  return axios.get('/api/dashboard/ongoing-tasks/list', data, header, options);
}
//甘特图-小组
export const ganttDeptManager = (data, header, options) => {
  return axios.get('/api/dashboard/team-task', data, header, options);
}
//甘特图-组员
export const ganttTeamMember = (data, header, options) => {
  return axios.get('/api/dashboard/member-task', data, header, options);
}

/* ************************************************************************ */

// 封装的统一的导出列表的接口调用
export const exportListData = async (vueInstance, params, apiUrl) => {
  const token = localStorage.getItem('token');
  const query = Object.keys(params)
    .map((key) => {return `${key}=${params[key]}`})
    .join('&');
  const url = `${config.baseUrl}${apiUrl}?${query}`;

  axiosRequest({
    url,
    method: 'GET',
    responseType: 'blob',
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
    .then(async (res) => {
      // 将 Blob 数据转换为文本
      const textData = await new Response(res.data).text();
      if (textData.includes('code')) {
        const jsonData = JSON.parse(textData);
        const { code } = jsonData;
        if (code === 422) {
          vueInstance.$message.error(jsonData?.message);
          return;
        }
      }
      const url = URL.createObjectURL(res.data);
      const link = document.createElement('a');
      link.href = url;
      link.download = 'performanceFile.xlsx';
      link.click();
      URL.revokeObjectURL(url);
      vueInstance.$message.success('Download successfully');
    })
    .catch((error) => {
      vueInstance.$message.error(error);
    });
};

// *********************************************************************************