const getters = {
  progress: (state) => {
    return state.app.progress;
  },
  dept: (state) => {
    return state.app.dept;
  },
  status: (state) => {
    return state.app.status;
  }
};
export default getters;
