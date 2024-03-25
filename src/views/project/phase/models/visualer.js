let modelsView = function (params) {
  let output = {
    calculation: false,
    assignTeams: false,
    teamDueDate: false,
    comments: false,
    sendBtn: false,
    rejectBtn: false,
    changeTeams: false
  };
  if(params.length > 0){
    for(let row in output){
      let isHas = params.indexOf(row);
      if(isHas >= 0){
        output[row] = true;
      }
    }
  }
  return output;
};

export { modelsView };
