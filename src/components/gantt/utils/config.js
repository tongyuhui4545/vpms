let setting = function () {
  let output = [

    /** mode取值
     * 0: 项目甘特图-Bidding
     * 1: 项目甘特图-Formal
     * 2：任务甘特图
     * 3：小组甘特图
     * 4：组内甘特图
     */
    /**项目甘特图：Bidding */
    {
      mode: 0,
      background: '#F4F5F9',
      slider: [
        {
          label: 'Project name',
          value: 'name',
          width: 140
        },
        {
          label: 'Lastest phase',
          value: 'progress',
          width: 140
        }
      ],
      pop: [
        {
          label: 'Project name',
          value: 'name'
        },
        {
          label: 'Phase',
          value: 'progress'
        },
        {
          label: 'Customer due date',
          value: 'due_date'
        },
        {
          label: 'Internal due date',
          value: 'inner_date'
        },
        {
          label: 'Team due date',
          value: 'team_due_date'
        },
        {
          label: 'Quote team',
          value: 'team_name'
        },
        {
          label: 'Quote status',
          value: 'status_label'
        }
      ],
      popVisible: true,
      popChild: false
    },

    /**项目甘特图：Formal */
    {
      mode: 1,
      background: '#F4F5F9',
      group: false,
      slider: [
        {
          label: 'Project name',
          value: 'name',
          width: 140
        },
        {
          label: 'Label status',
          value: 'label_status_label',
          width: 200
        }
      ],
      pop: [
        {
          label: 'Project name',
          value: 'name'
        },
        {
          label: 'Win Phase',
          value: 'progress'
        },
        {
          label: 'Label due date',
          value: 'label_due_date'
        },
        {
          label: 'Label team',
          value: 'label_team_name'
        },
        {
          label: 'Label status',
          value: 'label_status_label'
        }
      ],
      popVisible: true,
      popChild: false
    },

    /**任务甘特图: Public */
    {
      mode: 2,
      background: '#F4F5F9',
      slider: [
        {
          label: 'Title',
          value: 'title',
          width: 200
        },
        {
          label: 'Project name',
          value: 'project_name',
          width: 120
        },
        {
          label: 'Solution',
          value: 'solution',
          width: 120
        },
        {
          label: 'Assign to',
          value: 'receiver_name',
          width: 140
        }
      ],
      pop: [],
      popVisible: false,
      popChild: false
    },

    /**任务甘特图: Others */
    {
      mode: 3,
      background: '#F4F5F9',
      slider: [
        {
          label: 'Title',
          value: 'title',
          width: 140
        },
        {
          label: 'Type',
          value: 'task_type_value',
          width: 120
        },
        {
          label: 'Priority',
          value: 'priority_value',
          width: 80
        },
        {
          label: 'Status',
          value: 'status_value',
          width: 90
        },
        {
          label: 'Assign to',
          value: 'recipient_name',
          width: 120
        }
      ],
      pop: [],
      popVisible: false,
      popChild: false
    },

    /**小组甘特图 */
    {
      mode: 4,
      background: '#F4F5F9',
      slider: [
        {
          label: 'Team',
          title: ['team_name', 'leader'],
          child: 'summary',
          value: 'label',
          width: 160
        }
      ],
      pop: [
        {
          label: 'Project',
          value: 'project_name'
        },
        {
          label: 'Phase',
          value: 'phase'
        },
        {
          label: 'Title',
          value: 'title'
        },
        {
          label: 'Due date',
          value: 'due_date'
        }
      ],
      popVisible: true,
      popChild: true
    },

    /**组员甘特图 */
    {
      mode: 5,
      background: '#F4F5F9',
      slider: [
        {
          label: 'Team member',
          value: 'user_name',
          width: 160
        }
      ],
      pop: [
        {
          label: 'Project',
          value: 'project_name'
        },
        {
          label: 'Phase',
          value: 'phase'
        },
        {
          label: 'Title',
          value: 'title'
        },
        {
          label: 'Due date',
          value: 'due_date'
        }
      ],
      popVisible: true,
      popChild: true
    }
  ];
  return output;
};

export { setting };
