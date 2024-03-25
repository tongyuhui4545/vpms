import Vue from 'vue';
import store from '@/store';
import VueRouter from 'vue-router';
import LoginV2 from '../views/LoginV2.vue';
import Register from '../views/Register.vue';
import Index from '../views/Index.vue';
import TestPage from '../views/test/TestPage.vue';

/**工作台-首页 */
//旧版本的work-table
import Dashboard from '../views/dashboard/Index.vue';
import WorkOverview from '../views/work-table/WorkOverview.vue';
import OngoingTaskList from '../views/work-table/ongoing-task-list.vue'
import NewProjectAndPhaseList from '../views/work-table/new-project-and-phase-list.vue'
import WorkItem from '../views/work-table/WorkItem.vue';

/**project */
import ProjectList from '../views/project/index.vue';
import FormalProjectList from '../views/project/formal-project/Index.vue';
// import ProjectDetail from '../views/project/Detail2.vue';
//正式项目的详情
// import FormalProjectDetailRevised from '../views/project/FormalProjectDetailRevised.vue';
import ProjectForm from '../views/project/Form.vue';
//修改正式项目
import FormalProjectForm from '../views/project/formal-project/FormalProjectForm.vue';
import ProgressForm from '../views/project/components/Progress.vue';
import SeriesForm from '../views/project/components/Spectrum.vue';

/**solar module */
import SolarList from '../views/solarModule/Index.vue';
import SolarDetail from '../views/solarModule/Detail.vue';
import SolarForm from '../views/solarModule/Form.vue';

/**racking tracker */
import trackerList from '../views/rackingTracker/Index.vue';
import trackerForm from '../views/rackingTracker/Form.vue';
import trackerDetail from '../views/rackingTracker/Detail.vue';

import customerList from '../views/customer/Index.vue';
import customerForm from '../views/customer/Form.vue';
import customerDetail from '../views/customer/Detail.vue';
// ***users***
import personnelList from '../views/personnel/Index.vue';
import PerformanceAppraisal from '../views/performance-appraisal/Index.vue';
import PerformanceAppraisalList from '../views/performance-appraisal/PerformanceAppraisalList.vue';
import personnelForm from '../views/personnel/Form.vue';
import personnelDetail from '../views/personnel/Detail.vue';

/**integrated data */
import integratedList from '../views/integrated/Index.vue';
import integratedAdd from '../views/integrated/Form.vue';
import integratedDetail from '../views/integrated/Detail.vue';

/**team */
import teamList from '../views/team/Index.vue';
import teamForm from '../views/team/Form.vue';

/* tools */
import Tools from '../views/tools/Index.vue';
import ToolsDashboard from '../views/tools/ToolsDashboard.vue';
import SalesTools from '../views/tools/sales-tools/Index.vue';
import CableSegment from '../views/tools/sales-tools/cable-segment/CableSegment.vue';

/**role */
import roleList from '../views/role/Index.vue';
import roleForm from '../views/role/Form.vue';

/**role */
import limitsList from '../views/limits/Index.vue';
import limitsForm from '../views/limits/Form.vue';

Vue.use(VueRouter);

const originalPush = VueRouter.prototype.push;
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch((err) => {
    return err;
  });
};
let clearFilterRouteNames = [
  'ProjectList',
  'FormalProjectList',
  'SolarList',
  'trackerList',
  'customerList',
  'personnelList',
  'teamList',
  'Dashboard',
  'WorkOverview',
  'WorkItem'
];

const clearFilterInStore = () => {
  store.dispatch('app/clearAllFilterNum');
};

const clearProgressUnderviewInStore = () => {
  store.dispatch('app/clearProgressUnderview');
};

const routes = [
  {
    path: '/',
    name: 'Login',
    component: LoginV2
  },
  //************暂时的test文件，等合并其他人员的分支后，放置到相应的目录，设置对应路由********
  {
    path: '/test',
    name: 'TestPage',
    component: TestPage
  },
  // ************************end**********************************
  {
    path: '/register',
    name: 'Register',
    component: Register
  },
  {
    path: '/tools',
    name: 'Tools',
    component: Tools,
    children: [
      {
        path: '/tools/tools-dashboard',
        name: 'tools-dashboard',
        component: ToolsDashboard
      },
      {
        path: '/tools/supporting-sales',
        name: 'sales-tools',
        redirect: '/tools/supporting-sales/cable-segment',
        component: SalesTools,
        children: [
          {
            path: '/tools/supporting-sales/cable-segment',
            name: 'cable-segment',
            component: CableSegment
          }
        ]
      }

      /* 等待开发 */
      // {
      //   path:'/tools/production-tools',
      //   name:'production-tools',
      //   component: ProductionTools
      // },
      // {
      //   path:'/tools/operation-tools',
      //   name:'operation-tools',
      //   component: OperationTools
      // },
      // {
      //   path:'/tools/designing-tools',
      //   name:'designing-tools',
      //   component: DesigningTools
      // },
      // {
      //   path:'/tools/purchasing-tools',
      //   name:'purchasing-tools',
      //   component: PurchasingTools
      // },
    ]
  },
  {
    path: '/index',
    name: 'Index',
    component: Index,
    meta: {
      title: '首页',
      requireAuth: true
    },
    children: [
      {
        path: '/index/dashboard',
        name: 'Dashboard',
        component: Dashboard
      },

      /* work-overview */
      {
        path: '/index/work-overview',
        name: 'WorkOverview',
        component: WorkOverview
      },

     /*  ongoing-task-list*/
      {
        path:'/index/work-overview/ongoing-task-list',
        name: 'OngoingTaskList',
        component: OngoingTaskList
      },

      /*  new-project-and-phase-list */
      {
        path:'/index/work-overview/new-project-and-phase-list',
        name: 'NewProjectAndPhaseList',
        component: NewProjectAndPhaseList
      },

      /* work-item */
      {
        path: '/index/work-item',
        name: 'WorkItem',
        component: WorkItem,
        meta: {
          keepAlive: true
        }
      },

      /**project */
      {
        path: '/index/project/bidding',
        name: 'ProjectList',
        component: ProjectList,
        meta: {
          keepAlive: true,
          isEdit: false
        },
        beforeEnter: (to, from, next) => {
          if (clearFilterRouteNames.includes(from.name)) {
            clearFilterInStore();
          }
          next();
        }
      },

      /**甘特图 */
      {
        path: '/index/project/detail/gantt',
        name: 'ProjectGantt',
        component: () => {
          return import('../views/project/phase/views/phase-gantt.vue');
        }
      },

      /* formal-project */
      {
        path: '/index/project/formal',
        name: 'FormalProjectList',
        component: FormalProjectList,
        meta: {
          keepAlive: true,
          isEdit: false
        },
        beforeEnter: (to, from, next) => {
          if (clearFilterRouteNames.includes(from.name)) {
            clearFilterInStore();
          }
          next();
        }
      },
      {
        path: '/index/project/:project_type/gantt',
        name: 'BiddingProjectList',
        component: () => {
          return import('../views/project/phase/views/phase-gantt.vue');
        }
      },
      {
        path: '/index/project/:project_type/detail',
        component: () => {
          return import('../views/project/detail.vue');
        },
        children: [
          //overview部分
          {
            path: 'overview/:project_id',
            name: 'overview',
            component: () => {
              return import('../views/project/overview/index.vue');
            }
          },
          //Phase
          {
            path: 'phase/:project_id',
            name: 'phase',
            component: () => {
              return import('../views/project/phase/phase.vue');
            }
          },
          //Label&Sim
          {
            path: 'label&sim/:project_id',
            name: 'label&sim',
            component: () => {
              return import('../views/project/phase/label-sim.vue');
            }
          },
          //Quote部分
          {
            path: 'quote/:project_id',
            name: 'quote',
            component: () => {
              return import('../views/project/quote/index.vue');
            }
          },
          //Task部分
          {
            path: 'task/:project_id',
            name: 'task',
            component: () => {
              return import('../views/project/task/index.vue');
            }
          },
          //Files部分
          {
            path: 'files/:project_id',
            name: 'files',
            component: () => {
              return import('../views/project/files/index.vue');
            }
          }
        ],
        beforeEnter: (to, from, next) => {
          if (clearFilterRouteNames.includes(from.name)) {
            clearProgressUnderviewInStore();
          }
          next();
        }
      },
      // {
      //   path: '/index/project/formal-project-detail/',
      //   component: FormalProjectDetailRevised
      // },
      {
        path: '/index/project/form',
        component: ProjectForm
      },
      {
        path: '/index/project/formal-project/form',
        component: FormalProjectForm
      },
      {
        path: '/index/project/progress/form',
        component: ProgressForm
      },
      {
        path: '/index/project/series/form',
        component: SeriesForm
      },

      /**solar module */
      {
        path: '/index/solar-module/list',
        name: 'SolarList',
        component: SolarList,
        meta: {
          keepAlive: true
        }
      },
      {
        path: '/index/solar-module/detail/:id',
        component: SolarDetail,
        name: 'SolarDetail'
      },
      {
        path: '/index/solar-module/form',
        component: SolarForm
      },

      /**racking tracker */
      {
        path: '/index/racking-tracker/list',
        name: 'trackerList',
        meta: {
          keepAlive: true
          // isEdit: false
        },
        component: trackerList
        // beforeEnter: (to, from, next) => {
        //   if (clearFilterRouteNames.includes(from.name)) {
        //     clearFilterInStore();
        //   }
        //   next();
        // }
      },
      {
        path: '/index/racking-tracker/detail/:id',
        component: trackerDetail,
        name: 'trackerDetail'
      },
      {
        path: '/index/racking-tracker/form',
        component: trackerForm
      },

      /**customer */
      {
        path: '/index/customer/list',
        name: 'customerList',
        component: customerList,
        meta: {
          keepAlive: true
        }
      },
      {
        path: '/index/customer/form',
        component: customerForm,
        name: 'customerForm'
      },
      {
        path: '/index/customer/detail',
        component: customerDetail
      },

      /**personnel */
      {
        path: '/index/users/list',
        name: 'personnelList',
        component: personnelList,
        beforeEnter: (to, from, next) => {
          if (clearFilterRouteNames.includes(from.name)) {
            clearFilterInStore();
          }
          next();
        }
      },
      {
        path: '/index/users/performance-appraisal',
        name: 'performanceAppraisal',
        component: PerformanceAppraisal
      },
      {
        path: '/index/users/performance-appraisal/list',
        name: 'performanceAppraisalList',
        component: PerformanceAppraisalList
      },
      {
        path: '/index/users/form',
        component: personnelForm
      },
      {
        path: '/index/users/detail',
        component: personnelDetail
      },

      /**integrated */
      {
        path: '/index/integrated-data/list',
        component: integratedList
      },
      {
        path: '/index/integrated-data/add',
        component: integratedAdd
      },
      {
        path: '/index/integrated-data/detail',
        component: integratedDetail
      },
      {
        path: '/index/team/list',
        name: 'teamList',
        component: teamList,
        beforeEnter: (to, from, next) => {
          if (clearFilterRouteNames.includes(from.name)) {
            clearFilterInStore();
          }
          next();
        }
      },
      {
        path: '/index/team/form',
        component: teamForm
      },
      {
        path: '/index/role/list',
        name: 'roleList',
        component: roleList
      },
      {
        path: '/index/role/form',
        component: roleForm
      },
      {
        path: '/index/limits/list',
        name: 'limitsList',
        component: limitsList
      },
      {
        path: '/index/limits/form',
        component: limitsForm
      }
    ]
  },
  {
    path: '/forget-password',
    name: 'ForgetPassword',
    component: () => {
      return import('../views/forget-password.vue');
    }
  },
  {
    path: '/file-preview',
    component: () => {
      return import('../components/file-preview.vue');
    }
  }
  //only for test pages
];

const router = new VueRouter({
  //mode: 'history',
  base: process.env.BASE_URL,
  routes
});

router.beforeEach((to, from, next) => { 
  if(from.name === 'SolarList') { 
    if(to.name === 'SolarDetail') { 
      from.meta.keepAlive = true;
    }
    else {from.meta.keepAlive = false}
    next()
  }
  if(from.name === 'WorkItem') {
    if(to.name === 'overview' || to.name === 'workflow'){ 
    from.meta.keepAlive = true;
    next()
    }
    else {
      from.meta.keepAlive = false;
    next()
    }
  }
  if (
    to.matched.some((auth) => {
      return auth.meta.requireAuth;
    })
  ) {
    let token = localStorage.getItem('token');
    if (token) {
      next();
    } else {
      next({
        path: '/',
        query: {
          redirect: to.fullPath
        }
      });
    }
  } else {
    next();
  }
});

export default router;
