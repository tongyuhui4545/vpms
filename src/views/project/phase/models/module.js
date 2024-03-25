/**phase类型 */
let phaseType = function (vm) { 
  let { project_type } = vm.$route.params;
  let { mode } = vm.$route.params;
  let { dept } = vm.$store.state.app.dept;
  let type = 0;
  if (project_type === 'bidding') {
    if (dept === '2D') {
      if (mode === 'phase') {
        type = 1;
      }
      if (mode === 'label&sim') {
        type = 3;
      }
    }
    if (dept === '3D') {
      if (mode === 'phase') {
        type = 4;
      }
      if (mode === 'label&sim') {
        type = 6;
      }
    }
  }
  if (project_type === 'formal') {
    if (dept === '2D') {
      if (mode === 'phase') {
        type = 2;
      }
      if (mode === 'label&sim') {
        type = 3;
      }
    }
    if (dept === '3D') {
      if (mode === 'phase') {
        type = 5;
      }
      if (mode === 'label&sim') {
        type = 6;
      }
    }
  }
  return type;
};

export { phaseType };
