
let registerWatchers = function (vm, activeDept, activePhase) {
  let workflow = {
    mode: vm.$route.params.mode,
    progress: activePhase,
    dept: activeDept
  };
  //console.log(workflow);
  vm.$store.dispatch('app/setWorkflow', workflow);
}

export { registerWatchers };
