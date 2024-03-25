export default function registerListeners(params) {
  let limits = localStorage.getItem('limits');
  if(limits && limits !== ''){
    let limitsData = JSON.parse(limits);
    return limitsData[params];
  }
}
