const state = {
  //页面浏览状态
  pageViewStatus: {},
  //全局loading
  isLoading: false,
  
  /**Shorey Cai */
  progress: '',
  dept: '2D',
  status: null,

  configUnderView: {},
  progressUnderView: {},
  projectListLastPosition: 0,
  solarListLastPosition: 0,
  trackerListLastPosition: 0,
  //页面消息提醒的个数
  messageNum: 0,
  // **************************************************************
  //Porject页面的筛选条件选择个数
  projectFilterNum: 0,
  //FormalProject页面的筛选条件选择个数
  formalProjectFilterNum: 0,
  //Solar页面的筛选条件选择个数
  solarFilterNum: 0,
  //Tracker页面的筛选条件选择个数
  trackerFilterNum: 0,
  //暂存work-item-quote的筛选条件个数
  workItemQuoteFilterNum: 0,
  //暂存workitem-formal-project的筛选条件个数
  workItemProjectFilterNum: 0,
  // ***********************************************************
  //暂存bidding-project的筛选条件
  projectFilter: {},
  //暂存formal-project的筛选条件
  formalProjectFilter: {},
  //暂存Solar的筛选条件
  solarFilter: {},
  //暂存Tracker的筛选条件
  trackerFilter: {},
  //暂存work-item-quote的筛选条件
  workItemQuoteFilter: {},
  //暂存work-item-formal-project的筛选条件
  workItemFormalProjectFilter: {},
  //ProjectList当前的浏览页面
  projectListCurrentPage: 1,
  //SolarList当前的浏览页面
  solarListCurrentPage: 1,
  //TrackerList当前的浏览页面
  trackerListCurrentPage: 1,
  //performance列表中的userIds
  performanceUserIds: [],
  customTaskInfo: {},
  users: [],
  tags: []
};

const mutations = {
  //存储Assign task页面的浏览状态
  setPageViewStatus: (state, status) => {
    state.pageViewStatus = {...status}
  },
  //改变全局loading状态
  setLoading: (state, status) => {
    state.isLoading = status;
  },
  SET_PROGRESS: (state, progress) => {
    state.progress = progress;
  },
  SET_DEPT: (state, dept) => {
    state.dept = dept;
  },
  SET_STATUS: (state, status) => {
    state.status = status;
  },
  changeConfigUnderView: (state, config) => {
    state.configUnderView = config;
  },
  setProgressUnderView: (state, config) => {
    state.progressUnderView = config;
  },
  //设置页面消息提醒的个数
  setMessageNum: (state, num) => {
    state.messageNum = num;
  },
  //项目列表的滚动位置
  setProjectListLastPosition: (state, position) => {
    state.projectListLastPosition = position;
  },
  //面板列表的滚动位置
  setSolarListLastPosition: (state, position) => {
    state.solarListLastPosition = position;
  },
  //支架列表的滚动位置
  setTrackerListLastPosition: (state, position) => {
    state.trackerListLastPosition = position;
  },
  //改变project页面的筛选条件选择个数
  setProjectFilterNum: (state, num) => {
    state.projectFilterNum = num;
  },
  //改变formal-project页面的筛选条件选择个数
  setFormalProjectFilterNum: (state, num) => {
    state.formalProjectFilterNum = num;
  },
  //改变solar页面的筛选条件选择个数
  setSolarFilterNum: (state, num) => {
    state.solarFilterNum = num;
  },
  //改变tracker页面的筛选条件选择个数
  setTrackerFilterNum: (state, num) => {
    state.trackerFilterNum = num;
  },
  //改变work-item-quote页面的筛选条件选择个数
  setWorkItemQuoteFilterNum: (state, num) => {
    state.workItemQuoteFilterNum = num;
  },
  //改变work-item-formal-project页面的筛选条件选择个数
  setWorkItemProjectFilterNum: (state, num) => {
    state.workItemProjectFilterNum = num;
  },
  //清空所有的筛选条件选择个数
  clearFilterNum: (state) => {
    state.projectFilterNum = 0;
    state.solarFilterNum = 0;
    state.trackerFilterNum = 0;
    state.workItemQuoteFilterNum = 0;
    state.workItemProjectFilterNum = 0;
    state.formalProjectFilterNum = 0;
  },
  //暂存bidding-project的筛选条件
  setProjectFilter: (state, data) => {
    state.projectFilter = data;
  },
  setFormalProjctFilter: (state, data) => {
    state.formalProjectFilter = data;
  },
  //暂存Solar的筛选条件
  setSolarFilter: (state, data) => {
    state.solarFilter = data;
  },
  //暂存Tracker的筛选条件
  setTrackerFilter: (state, data) => {
    state.trackerFilter = data;
  },
  //暂存WorkItemQuote的筛选条件
  setWorkItemQuoteFilter: (state, data) => {
    state.workItemQuoteFilter = data;
  },
  //暂存WorkItemFormalProject的筛选条件
  setWorkItemProjectFilter: (state, data) => {
    state.workItemProjectFilter = data;
  },
  //暂存ProjectList当前的浏览页面
  setProjectListCurrentPage: (state, page) => {
    state.projectListCurrentPage = page;
  },
  //暂存SolarList当前的浏览页面
  setSolarListCurrentPage: (state, page) => {
    state.solarListCurrentPage = page;
  },
  //暂存TrackerList当前的浏览页面
  setTrackerListCurrentPage: (state, page) => {
    state.trackerListCurrentPage = page;
  },
  setPerformanceUserIds: (state, data) => {
    state.performanceUserIds = data;
  },
  setCustomTaskInfo: (state, data) => {
    state.customTaskInfo = data;
  },
  setUsers: (state, data) => {
    state.users = data;
  },
  setTags: (state, data) => {
    state.tags = data;
  }
};

const actions = {
  //更改页面浏览状态
  changePageStatus({ commit }, status) {
    commit('setPageViewStatus', status);
  },
  changeLoading({ commit }, status) {
    commit('setLoading', status);
  },
  setProgress({ commit }, progress) {
    commit('SET_PROGRESS', progress);
  },
  setDept({ commit }, dept) {
    commit('SET_DEPT', dept);
  },
  setStatus({ commit }, status) {
    commit('SET_STATUS', status);
  },
  changeConfigUnderView({ commit }, config) {
    commit('changeConfigUnderView', config);
  },
  //改变页面消息提醒的个数
  changeMessageNum({ commit }, num) {
    commit('setMessageNum', num);
  },
  changeProgressUnderView({ commit }, config) {
    commit('setProgressUnderView', config);
  },
  changeProjectListLastPosition({ commit }, position) {
    commit('setProjectListLastPosition', position);
  },
  changeSolarListLastPosition({ commit }, position) {
    commit('setSolarListLastPosition', position);
  },
  changeTrackerListLastPosition({ commit }, position) {
    commit('setTrackerListLastPosition', position);
  },
  //改变project页面的筛选条件选择个数
  changeProjectFilterNum({ commit }, num) {
    commit('setProjectFilterNum', num);
  },
  //改变formal-project页面的筛选条件选择个数
  changeFormalProjectFilterNum({ commit }, num) {
    commit('setFormalProjectFilterNum', num);
  },
  //改变solar页面的筛选条件选择个数
  changeSolarFilterNum({ commit }, num) {
    commit('setSolarFilterNum', num);
  },
  //改变tracker页面的筛选条件选择个数
  changeTrackerFilterNum({ commit }, num) {
    commit('setTrackerFilterNum', num);
  },
  //改变work-item-quote页面的筛选条件选择个数
  changeWorkItemQuoteFilterNum({ commit }, num) {
    commit('setWorkItemQuoteFilterNum', num);
  },
  //改变work-item-formal-project页面的筛选条件选择个数
  changeWorkItemProjectFilterNum({ commit }, num) {
    commit('setWorkItemProjectFilterNum', num);
  },
  //清空所有的筛选条件选择个数
  clearAllFilterNum({ commit }) {
    commit('clearFilterNum');
  },
  //清空所有缓存的筛选条件
  clearFilter({ commit }) {
    commit('setProjectFilter', {});
    commit('setFormalProjctFilter', {});
    commit('setSolarFilter', {});
    commit('setTrackerFilter', {});
    commit('setWorkItemQuoteFilter', {});
    // commit('setWorkItemFormalProjectFilter', {});
  },
  //清空所有记住的页码
  clearAllPage({ commit }) {
    commit('setProjectListCurrentPage', 1);
    commit('setSolarListCurrentPage', 1);
    commit('setTrackerListCurrentPage', 1);
  },
  //清空所有记住的页面位置
  clearAllPosition({ commit }) {
    commit('setProjectListLastPosition', 0);
    commit('setSolarListLastPosition', 0);
    commit('setTrackerListLastPosition', 0);
  },
  //清除当前浏览的Progress
  clearProgressUnderview({ commit }) {
    commit('setProgressUnderView', {});
  },
  //暂存Project的筛选条件
  storeProjectFilter({ commit }, data) {
    commit('setProjectFilter', data);
  },
  //暂存FormalProject的筛选条件
  storeFormalProjectFilter({ commit }, data) {
    commit('setFormalProjctFilter', data);
  },
  //暂存Solar的筛选条件
  storeSolarFilter({ commit }, data) {
    commit('setSolarFilter', data);
  },
  //暂存Tracker的筛选条件
  storeTrackerFilter({ commit }, data) {
    commit('setTrackerFilter', data);
  },
  //暂存work-item-quote的筛选条件
  storeWorkItemQuoteFilter({ commit }, data) {
    commit('setWorkItemQuoteFilter', data);
  },
  //暂存ProjectList当前的浏览页面
  storeProjectListCurrentPage({ commit }, page) {
    commit('setProjectListCurrentPage', page);
  },
  //暂存SolarList当前的浏览页面
  storeSolarListCurrentPage({ commit }, page) {
    commit('setSolarListCurrentPage', page);
  },
  //暂存TrackerList当前的浏览页面
  storeTrackerListCurrentPage({ commit }, page) {
    commit('setTrackerListCurrentPage', page);
  },
  //暂存performance列表中的userIds
  storePerformanceUserIds({ commit }, data) {
    commit('setPerformanceUserIds', data);
  }
};

export default {
  namespaced: true,
  state,
  mutations,
  actions
};
