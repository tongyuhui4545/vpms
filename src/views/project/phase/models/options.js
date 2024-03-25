let optionsData = function () {
  let data = {
    '2D': {
      phase_files: {
        label: 'Solution',
        data: [
          {
            value: 'Alex',
            label: 'Alex',
            mode: 'phase'
          },
          {
            value: 'Lynx',
            label: 'Lynx',
            mode: 'phase'
          },
          {
            value: 'Harness',
            label: 'Harness',
            mode: 'phase'
          }
        ]
      },
      label_Sim_files: {
        label: 'Solution',
        data: [
          {
            value: 'Alex',
            label: 'Alex',
            mode: 'phase'
          },
          {
            value: 'Lynx',
            label: 'Lynx',
            mode: 'phase'
          },
          {
            value: 'Harness',
            label: 'Harness',
            mode: 'phase'
          },
          {
            value: 'Label',
            label: 'Label files',
            mode: 'label&sim'
          }
        ]
      }
    },
    '3D': {
      phase_files: {
        label: '3D calculation files',
        data: [
          {
            value: '3D display file',
            label: '3D display file',
            mode: 'phase'
          },
          {
            value: '3D video',
            label: '3D video',
            mode: 'phase'
          },
          {
            value: 'Calculation file',
            label: 'Calculation file',
            mode: 'phase'
          },
          {
            value: 'Other files',
            label: 'Other files',
            mode: 'phase'
          }
        ]
      },
      label_Sim_files: {
        label: '3D simulation files',
        data: [
          {
            value: '3D site file',
            label: '3D site file',
            mode: 'label&sim'
          },
          {
            value: '3D video',
            label: '3D video',
            mode: 'label&sim'
          },
          {
            value: 'Other files',
            label: 'Other files',
            mode: 'label&sim'
          }
        ]
      }
    }
  };
  return data;
};

export default optionsData;
