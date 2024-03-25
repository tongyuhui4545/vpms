import { addNotice } from '@/api/index.js'

let updateNotice = function () {
    let userInfo = JSON.parse(localStorage.getItem('user'));
    addNotice({
        user_id: userInfo.id,
        project_id: this.form.project_id,
        message: '',
        type: 1,
        read: 0
    }).then((res) => {
        if (res.code === 200) {
            //插入notice
        }
        return;
    }).catch((err) => {
        return err
    });
}

export default updateNotice;