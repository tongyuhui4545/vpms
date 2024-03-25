
import { phaseList, progressDetail } from '@/api/index.js';

let getPhaseList = function (vm, params, callback) {
  let form = {
    project_id: vm.$route.params.project_id
  };
  let {mode} = vm.$route.params;
  let {deptNo} = params;
  if(mode === 'phase'){
    if(deptNo === '3D'){
      form['type'] = 1;
    }
  }
  if(mode === 'label&sim'){
    if(deptNo === '2D'){
      form['type'] = 2;
    }
    if(deptNo === '3D'){
      form['type'] = 3;
    }
  }
  phaseList(form).then((res) => {
    if (res.code === 200) {
      callback(res.data);
    }
  });
};

let getPhaseDetail = function (vm, callback) {
  progressDetail({
    id: vm.$store.state.app.progress
  }).then((res) => {
    if (res.code === 200) {
      callback(res.data);
    }
  });
};

let refreshStatus = function (vm, params, callback) {
  getPhaseList(vm, params, (res) => {
    params['progressList'] = res;
    getPhaseDetail(vm, (res) => {
      params['progressData'] = res;
      callback(params);
    });
  });
};

export { getPhaseList, getPhaseDetail, refreshStatus };
