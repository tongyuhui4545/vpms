class STATUS {
  constructor() {
    this.statusData = [

      /**2D-Bidding,Formal */
      {
        label: 'Pending US engineer review',
        value: 'US_TO_BE_SEND',
        role: ['US Engineer'],
        type: [1, 2],
        step: ['US_HAS_BEEN_SEND'],
        model: ['calculation', 'comments', 'sendBtn'],
        button: 'Assign to CN group'
      },
      {
        label: 'Pending assign design team',
        value: 'US_HAS_BEEN_SEND',
        role: ['CN Engineer Manager'],
        type: [1, 2],
        step: ['CN_ASSIGNED'],
        model: ['assignTeams', 'teamDueDate', 'comments', 'sendBtn'],
        button: 'Assign'
      },
      {
        label: 'Team assigned & Pending quote',
        value: 'CN_ASSIGNED',
        role: ['CN Engineer Manager'],
        type: [1, 2],
        step: ['CN_TEAM_ALREADY_APPLIED'],
        model: ['comments', 'changeTeams', 'sendBtn'],
        button: 'Submit'
      },
      {
        label: 'Team assigned & Pending quote',
        value: 'CN_ASSIGNED',
        role: ['Team Leader'],
        type: [1, 2],
        step: ['CN_TEAM_ALREADY_APPLIED'],
        model: ['comments', 'sendBtn'],
        button: 'Submit'
      },
      {
        label: 'Quote submitted & Pending CN approval',
        value: 'CN_TEAM_ALREADY_APPLIED',
        role: ['CN Engineer Manager'],
        type: [1, 2],
        step: ['CN_PASSED', 'CN_REJECTED'],
        model: ['comments', 'sendBtn', 'rejectBtn'],
        button: 'Send to US'
      },
      {
        label: 'Pending US approval',
        value: 'CN_PASSED',
        role: ['US Engineer'],
        type: [1, 2],
        step: ['US_PASSED', 'US_REJECTED'],
        model: ['comments', 'sendBtn', 'rejectBtn'],
        button: 'Approve'
      },
      {
        label: 'Quote rejected & Pending re-quote',
        value: 'CN_REJECTED',
        role: ['Team Leader'],
        type: [1, 2],
        step: ['CN_TEAM_ALREADY_APPLIED'],
        model: ['comments', 'sendBtn'],
        button: 'Submit'
      },
      {
        label: 'Quote released',
        value: 'US_PASSED',
        role: ['Sales Director', 'Sales Assistant', 'Sales'],
        type: [1, 2],
        step: ['QUOTE_SENT'],
        model: ['sendBtn'],
        button: 'Mark send'
      },
      {
        label: 'US engineer rejected',
        value: 'US_REJECTED',
        role: ['CN Engineer Manager'],
        type: [1, 2],
        step: ['CN_ASSIGNED'],
        model: ['assignTeams', 'teamDueDate', 'comments', 'sendBtn'],
        button: 'Assign'
      },
      {
        label: 'Win & Pending US engineer final review',
        value: 'WIN',
        role: ['US Engineer'],
        type: [2],
        step: ['US_FINAL_PASSED'],
        model: ['comments', 'sendBtn'],
        button: 'Final approve'
      },
      {
        label: 'Win & Pending US engineer final review',
        value: 'WIN',
        role: ['Sales Director', 'Sales Assistant', 'Sales'],
        type: [2],
        step: ['QUOTE_SENT'],
        model: ['sendBtn'],
        button: 'Mark send'
      },
      {
        label: 'Quote sent',
        value: 'QUOTE_SENT',
        role: ['US Engineer'],
        type: [1, 2],
        step: ['US_FINAL_PASSED'],
        model: ['comments', 'sendBtn'],
        button: 'Final approve'
      },
      {
        label: 'Final review approval',
        value: 'US_FINAL_PASSED',
        role: ['Sales Director', 'Sales Assistant', 'Sales'],
        type: [2],
        step: ['QUOTE_SENT'],
        model: ['sendBtn'],
        button: 'Mark send'
      },

      /**2D-Label */
      {
        label: 'Pending assign label team',
        value: 'FORMAL_ASSIGNED_TEAM',
        role: ['CN Engineer Manager'],
        type: [3],
        step: ['FORMAL_DESIGN_LABEL'],
        model: ['assignTeams', 'teamDueDate', 'comments', 'sendBtn'],
        button: 'Assign'
      },
      {
        label: 'Team assigned & Pending label file',
        value: 'FORMAL_DESIGN_LABEL',
        role: ['CN Engineer Manager'],
        type: [3],
        step: ['FORMAL_LABEL_SEND'],
        model: ['comments', 'changeTeams', 'sendBtn'],
        button: 'Submit'
      },
      {
        label: 'Team assigned & Pending label file',
        value: 'FORMAL_DESIGN_LABEL',
        role: ['Team Leader'],
        type: [3],
        step: ['FORMAL_LABEL_SEND'],
        model: ['comments', 'sendBtn'],
        button: 'Submit'
      },
      {
        label: 'Label file submitted & Pending approval',
        value: 'FORMAL_LABEL_SEND',
        role: ['CN Engineer Manager'],
        type: [3],
        step: ['FORMAL_LABEL_RELEASED', 'FORMAL_LABEL_REJECTED'],
        model: ['comments', 'sendBtn', 'rejectBtn'],
        button: 'Approve'
      },
      {
        label: 'Label file released',
        value: 'FORMAL_LABEL_RELEASED',
        role: [],
        type: [3],
        step: [],
        model: [],
        button: ''
      },
      {
        label: 'Label file rejected & Pending re-label',
        value: 'FORMAL_LABEL_REJECTED',
        role: ['CN Engineer Manager'],
        type: [3],
        step: ['FORMAL_LABEL_SEND'],
        model: ['comments', 'changeTeams', 'sendBtn'],
        button: 'Submit'
      },
      {
        label: 'Label file rejected & Pending re-label',
        value: 'FORMAL_LABEL_REJECTED',
        role: ['Team Leader'],
        type: [3],
        step: ['FORMAL_LABEL_SEND'],
        model: ['comments', 'sendBtn'],
        button: 'Submit'
      },

      /**3D-Calculation */
      {
        label: 'Pending assign 3D design team',
        value: 'CAL_US_HAS_BEEN_SEND',
        role: ['3D Manager'],
        type: [4, 5],
        step: ['CAL_CN_ASSIGNED'],
        model: ['assignTeams', 'teamDueDate', 'comments', 'sendBtn'],
        button: 'Assign'
      },
      {
        label: 'Team assigned & Pending 3D calculation',
        value: 'CAL_CN_ASSIGNED',
        role: ['3D Manager'],
        type: [4, 5],
        step: ['CAL_CN_TEAM_ALREADY_APPLIED'],
        model: ['comments', 'changeTeams', 'sendBtn'],
        button: 'Submit'
      },
      {
        label: 'Team assigned & Pending 3D calculation',
        value: 'CAL_CN_ASSIGNED',
        role: ['3D Team Leader'],
        type: [4, 5],
        step: ['CAL_CN_TEAM_ALREADY_APPLIED'],
        model: ['comments', 'sendBtn'],
        button: 'Submit'
      },
      {
        label: '3D calculation submitted & Pending 3D CN approval',
        value: 'CAL_CN_TEAM_ALREADY_APPLIED',
        role: ['3D Manager'],
        type: [4, 5],
        step: ['CAL_CN_PASSED', 'CAL_CN_REJECTED'],
        model: ['comments', 'sendBtn', 'rejectBtn'],
        button: 'Send to US'
      },
      {
        label: 'Pending US 3D calculation approval',
        value: 'CAL_CN_PASSED',
        role: ['US Engineer'],
        type: [4, 5],
        step: ['CAL_US_PASSED', 'CAL_US_REJECTED'],
        model: ['comments', 'sendBtn', 'rejectBtn'],
        button: 'Approve'
      },
      {
        label: '3D calculation rejected & Pending re-submit',
        value: 'CAL_CN_REJECTED',
        role: ['3D Team Leader'],
        type: [4, 5],
        step: ['CAL_CN_TEAM_ALREADY_APPLIED'],
        model: ['comments', 'sendBtn'],
        button: 'Submit'
      },
      {
        label: '3D calculation released',
        value: 'CAL_US_PASSED',
        role: [],
        type: [4, 5],
        step: [],
        model: [],
        button: ''
      },
      {
        label: 'US engineer rejected 3D calculation',
        value: 'CAL_US_REJECTED',
        role: ['3D Manager'],
        type: [4, 5],
        step: ['CAL_CN_ASSIGNED'],
        model: ['assignTeams', 'teamDueDate', 'comments', 'sendBtn'],
        button: 'Assign'
      },

      /**3D-Simulation */
      {
        label: 'Pending assign simulation team',
        value: 'SIM_HAS_BEEN_SEND',
        role: ['3D Manager'],
        type: [6],
        step: ['SIM_CN_ASSIGNED'],
        model: ['assignTeams', 'teamDueDate', 'comments', 'sendBtn'],
        button: 'Assign'
      },
      {
        label: 'Team assigned & Pending simulation',
        value: 'SIM_CN_ASSIGNED',
        role: ['3D Manager'],
        type: [6],
        step: ['SIM_CN_TEAM_ALREADY_APPLIED'],
        model: ['comments', 'changeTeams', 'sendBtn'],
        button: 'Submit'
      },
      {
        label: 'Team assigned & Pending simulation',
        value: 'SIM_CN_ASSIGNED',
        role: ['3D Team Leader'],
        type: [6],
        step: ['SIM_CN_TEAM_ALREADY_APPLIED'],
        model: ['comments', 'sendBtn'],
        button: 'Submit'
      },
      {
        label: 'Simulation submitted & Pending approval',
        value: 'SIM_CN_TEAM_ALREADY_APPLIED',
        role: ['3D Manager'],
        type: [6],
        step: ['SIM_CN_PASSED', 'SIM_CN_REJECTED'],
        model: ['comments', 'sendBtn', 'rejectBtn'],
        button: 'Send to US'
      },
      {
        label: 'Pending US simulation approval',
        value: 'SIM_CN_PASSED',
        role: ['US Engineer'],
        type: [6],
        step: ['SIM_US_PASSED', 'SIM_US_REJECTED'],
        model: ['comments', 'sendBtn', 'rejectBtn'],
        button: 'Approve'
      },
      {
        label: 'Simulation rejected & Pending re-submit',
        value: 'SIM_CN_REJECTED',
        role: ['3D Team Leader'],
        type: [6],
        step: ['SIM_CN_TEAM_ALREADY_APPLIED'],
        model: ['comments', 'sendBtn'],
        button: 'Submit'
      },
      {
        label: 'Simulation released',
        value: 'SIM_US_PASSED',
        role: [],
        type: [6],
        step: [],
        model: [],
        button: ''
      },
      {
        label: 'Simulation rejected',
        value: 'SIM_US_REJECTED',
        role: ['3D Manager'],
        type: [6],
        step: ['SIM_CN_ASSIGNED'],
        model: ['assignTeams', 'teamDueDate', 'comments', 'sendBtn'],
        button: 'Assign'
      }
    ];
  }
  list(params) {
    let data = this.statusData;
    let response = [];
    if (params) {
      for (let i = 0; i < data.length; i++) {
        let item = data[i];
        let { type } = item;
        let isHas = type.indexOf(params);
        if (isHas >= 0) {
          response.push(item);
        }
      }
    } else {
      response = data;
    }
    return response;
  }
  label(params) {
    let data = this.statusData;
    let response = '';
    for (let i = 0; i < data.length; i++) {
      let item = data[i];
      if (params === item.value) {
        response = item.label;
        break;
      }
    }
    return response;
  }
  view(params) {
    let data = this.statusData;
    let user = localStorage.getItem('user');
    let response = [];
    if (user) {
      let userInfo = JSON.parse(user);
      let { role } = userInfo;
      for (let i = 0; i < data.length; i++) {
        let item = data[i];
        let roleArr = item.role;
        let isHas = roleArr.indexOf(role);
        if (params === item.value && isHas >= 0) {
          response = item.model;
          break;
        }
      }
    }
    return response;
  }
  step(params, reject) {
    let data = this.statusData;
    let user = localStorage.getItem('user');
    let response = {
      label: '',
      value: params,
      role: '',
      type: [],
      step: [],
      model: []
    };
    if (user) {
      let userInfo = JSON.parse(user);
      let { role } = userInfo;
      response['role'] = role;
      for (let i = 0; i < data.length; i++) {
        let item = data[i];
        let roleArr = item.role;
        let isHas = roleArr.indexOf(role);
        if (params === item.value && isHas >= 0) {
          let stepArr = item.step;
          response = {
            button: item.button,
            status: item.value,
            request: reject ? stepArr[1] : stepArr[0]
          };
          break;
        }
      }
    }
    return response;
  }
}

export default STATUS;
