import { progressDetail, progressStatus } from '@/api/index.js'

let updateStatus = function(params, callback) {
    progressDetail(params.id).then((res) => {
        if (res.code === 200) {
            let {data} = res;
            let userInfo = JSON.parse(localStorage.getItem('user'));
            let {status} = data;
            let isHasUS = status.indexOf('US');
            if (userInfo.role === 'US Engineer' && isHasUS < 0) {
                requestStatus(params, data, callback);
            } else if (userInfo.role === 'CN Engineer Manager' || userInfo.role === 'CN Engineer') {
                requestStatus(params, data, callback);
            } else {
                callback();
            }
        }
        return;
    }).catch((err) => {
        return err
    });
}

let requestStatus = function(params, data, callback) {
    progressStatus({
        request: params.status,
        progress_id: data.id,
        files: data.files,
        remarks: data.remarks,
        due_date: data.due_date,
        team_id: data.team_id
    }).then((res) => {
        if (res.code === 200) {
            //状态更改为:US_HAS_BEEN_SEND
            callback();
        } else {
            // this.$message.error(res.message);
        }
        return;
    }).catch((err) => {
        return err
    });
}

export default {updateStatus, requestStatus};