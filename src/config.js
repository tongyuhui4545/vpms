
let baseUrl;
if (process.env.VUE_APP_CURRENTMODE === 'development') {
    //  baseUrl = "http://127.0.0.1:80";
    baseUrl = 'http://192.168.5.6:3030';
    // biyun的本地服务器
    // baseUrl = 'http://192.168.1.33:3030';
    // baseUrl = "http://192.168.1.33:3030";
}
else if (process.env.VUE_APP_CURRENTMODE === 'test') {
    baseUrl = 'http://192.168.5.6:3030';
}
else if (process.env.VUE_APP_CURRENTMODE === 'production') {
    baseUrl = 'https://pv20140610.synology.me:4030';
}

export default {
    systemname: '',
    baseUrl
};

