<template>
  <div>
    <div class="page-container">
      <!--团队人员分配-->
      <div
        v-if="showTeamAssignSection && show3DsimulationWorkflow"
        class="drawer-container"
      >
        <div class="trans-container">
          <div class="trans-item-wrapper trans-gap">
            <div class="trans-label">
              Team
            </div>
            <div class="trans-item">
              <div class="trans-header">
                <div class="trans-num">
                  A total of {{ teamList.length }}
                </div>
              </div>
              <div class="trans-content animate">
                <div
                  v-for="(item, key) in teamList"
                  :key="key"
                >
                  <el-checkbox
                    v-model="item.checked"
                    :disabled="item.disabled"
                    @change="changeTeam(item)"
                  >
                    {{ item.name }}
                  </el-checkbox>
                </div>
              </div>
            </div>
          </div>
          <div class="trans-item-wrapper">
            <div class="trans-label">
              Member
            </div>
            <div class="trans-item">
              <div class="trans-header">
                <div class="trans-num">
                  A total of {{ memberList.length }}
                </div>
              </div>
              <div class="trans-content">
                <div
                  v-for="(item, key) in memberList"
                  :key="key"
                  class="checkobx-item"
                >
                  <div class="checkobx">
                    {{ item.name }}
                  </div>
                  <div class="line" />
                  <div class="info">
                    {{ activeTeam.name }}
                    <span
                      v-if="item.id == activeTeam.manager_id"
                      class="role"
                    >
                      Group leader
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <el-form
          ref="progressForm"
          :model="progressForm"
          label-width="120px"
          size="mini"
          class="form-dialog"
        >
          <el-form-item
            label="3D team due date"
            required
            label-width="135px"
          >
            <el-date-picker
              v-model="d3_team_due_date"
              type="datetime"
              placeholder="Please select due date"
              style="width: '140px'"
              value-format="yyyy-MM-dd HH:mm:ss"
            />
          </el-form-item>
          <el-form-item label="Comment">
            <el-input
              ref="commentInputArea"
              v-model="progressForm.remarks"
              type="textarea"
              :rows="5"
              style="width: 111%; transform: translateX(15px)"
              @keyup.native="handleKeyup"
            />
            <TagPerson
              v-if="atTagPerson"
              ref="tagPerson"
              class="tag-person"
              :style="{ left: leftPosition, top: '25px' }"
              @person-chosen="handleChoosePerson"
            />
          </el-form-item>
          <el-form-item
            label="Comment files"
            label-width="150"
            style="transform: translateX(35px)"
          >
            <el-upload
              ref="upload"
              :action="uploadURL"
              :multiple="true"
              :on-success="updateFiles"
              :on-preview="viewFiles"
              :on-remove="deleteFiles"
              :headers="uploadHeaders"
              :file-list="fileList"
            >
              <div class="form-submit-btn">
                <div class="btn submit animate">
                  Click to upload
                </div>
              </div>
            </el-upload>
          </el-form-item>
        </el-form>
        <div class="drawer-footer">
          <div class="form-submit-btn">
            <!--<div class="btn cancel animate" @click="rejectProgress('CN_REJECTED_MANAGER')">
                            Reject
                        </div>-->
            <div
              class="btn submit animate"
              style="margin-left: 135px"
              @click="handleProgress"
            >
              Assign
            </div>
          </div>
        </div>
      </div>
      <!--发送progress-->
      <div
        v-if="show3DsimulationWorkflow && !showTeamAssignSection"
        class="drawer-container"
      >
        <el-form
          v-if="simulationStatus != 'SIM_US_PASSED'"
          ref="progressForm"
          :model="progressForm"
          label-width="120px"
          size="mini"
          class="form-dialog"
        >
          <el-form-item
            v-if="showCommentArea"
            label="Comment"
          >
            <el-input
              ref="commentInputArea"
              v-model="progressForm.remarks"
              type="textarea"
              :rows="5"
              @keyup.native="handleKeyup"
            />
            <TagPerson
              v-if="atTagPerson"
              ref="tagPerson"
              class="tag-person"
              :style="{ left: leftPosition, top: '25px' }"
              @person-chosen="handleChoosePerson"
            />
          </el-form-item>
          <el-form-item
            v-if="simulationStatus != 'SIM_CN_ASSIGNED' && showCommentArea"
            label="Comment files"
          >
            <el-upload
              ref="upload"
              :action="uploadURL"
              :multiple="true"
              :on-success="updateFiles"
              :on-preview="viewFiles"
              :on-remove="deleteFiles"
              :headers="uploadHeaders"
              :file-list="fileList"
            >
              <div class="form-submit-btn">
                <div class="btn submit animate">
                  Click to upload
                </div>
              </div>
            </el-upload>
            <el-progress
              v-if="progressProcess"
              :percentage="loadprogressProcess"
            />
          </el-form-item>
          <el-form-item label=" ">
            <!-- 中国负责的流程 -->
            <div
              v-if="underCNprocessing"
              class="form-submit-btn"
              style="margin-top: 20px"
            >
              <div
                v-if="
                  simulationStatus == 'SIM_CN_TEAM_ALREADY_APPLIED' &&
                    userLimits.approve_or_reject_team_submit
                "
                class="btn cancel animate"
                @click="rejectProgress('CN_REJECTED')"
              >
                Reject
              </div>
              <!-- 以下操作只有3d CN manager 和 us engineer涉及 -->
              <div
                v-if="
                  simulationStatus == 'SIM_CN_TEAM_ALREADY_APPLIED' &&
                    userLimits.approve_or_reject_team_submit
                "
                class="btn submit animate"
                @click="handleProgress"
              >
                <span> Send to US </span>
              </div>

              <div
                v-if="
                  (simulationStatus == 'SIM_CN_ASSIGNED' ||
                    simulationStatus == 'SIM_CN_REJECTED') &&
                    !userLimits.approve_or_reject_team_submit
                "
                class="btn submit animate"
                @click="handleProgress"
              >
                <span v-if="showCNteamSubmit">Submit</span>
              </div>
            </div>
            <!-- 美国负责的流程 -->
            <div
              v-if="!underCNprocessing && userRole == 'US Engineer'"
              class="form-submit-btn"
              style="margin-top: 20px"
            >
              <div
                v-if="
                  simulationStatus == 'SIM_CN_PASSED' &&
                    userLimits.approve_or_reject_CN
                "
                class="btn cancel animate"
                @click="rejectProgress('US_REJECTED')"
              >
                Reject
              </div>

              <div
                v-if="
                  simulationStatus == 'SIM_CN_PASSED' &&
                    userLimits.approve_or_reject_CN
                "
                class="btn submit animate"
                @click="handleProgress"
              >
                <span> Approve </span>
              </div>
            </div>
          </el-form-item>
        </el-form>
      </div>
    </div>
    <RejectDialog
      :form-visible="rejectFormVisible"
      type="bidding"
      @confirm="confirmReject"
      @cancel="handleRejectFormCancel"
    />
  </div>
</template>

<script>
import TagPerson from '@/components/CommentsAndUpdates/TagPerson.vue';
import RejectDialog from '@/components/RejectDialog.vue';
import baseUrl from '@/config.js';
import {
  uploadFiles,
  teamList,
  progressStatus,
  sendEmail
} from '@/api/index.js';
export default {
  name: '',
  components: {
    RejectDialog,
    TagPerson
  },
  props: {
    processType: {
      type: String,
      default: '3d-bidding'
    },
    labelStatus: {
      type: String,
      default: ''
    },
    simuStatus: {
      type: String,
      default: ''
    },
    progressDetailForProcess: {
      type: Object,
      default: () => { return {} }
    }
  },
  data() {
    return {
      //3d相关的参数
      show3DsimulationWorkflow: false,
      simulationStatus: '',
      d3_inner_date: '',
      d3_team_due_date: '',
      d3Needed: false,
      userLimits: [],
      leftPosition: '',
      referredUsers: [],
      atTagPerson: false,
      rejectForm: {},
      activeProgress: {},
      rejectFormVisible: false,
      // showFinalReviewApproval: false,
      dialogTitle: 'Send Progress',
      userRole: '',
      progressForm: {
        request: '',
        progress_id: '',
        team_id: '',
        files: [],
        remarks: '',
        due_date: ''
      },
      uploadURL: '',
      fileList: [],
      show3DsimulationnWorkflow: false,
      requestStatus: '',
      teamList: [],
      //下发的team的id,2023/08/28,改变progress的接口调用逻辑改变，前端不发送sendEmail，而是将其余信息全都放在progressStatus里去传
      teamId: undefined,
      memberList: [],
      activeTeam: {},
      progressProcess: false,
      loadprogressProcess: 0,
      uploadHeaders: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    };
  },
  computed: {
    showCommentArea() {
      let userInfo = JSON.parse(localStorage.getItem('user'));
      let {role} = userInfo;
      //情况1，US Engineer 在他的操作中
      if (this.simulationStatus === 'SIM_CN_PASSED' && role === 'US Engineer') {
        return true;
      }
      //情况1，3D CN Engineer Manager 在他的操作中
      if (
        (this.simulationStatus === 'SIM_CN_TEAM_ALREADY_APPLIED' ||
          this.simulationStatus === 'SIM_HAS_BEEN_SEND') &&
        role === '3D Manager'
      ) {
        return true;
      }
      //情况1，3D CN Team leader 在他的操作中
      if (
        (this.simulationStatus === 'SIM_CN_ASSIGNED' ||
          this.simulationStatus === 'SIM_CN_REJECTED') &&
        role === '3D Team Leader'
      ) {
        return true;
      } else {return false;}
    },
    underCNprocessing() {
      let processingStatus = [
        'SIM_CN_ASSIGNED',
        'SIM_CN_TEAM_ALREADY_APPLIED',
        'SIM_CN_REJECTED'
      ];
      let role = this.userRole;
      let isCN3D = false;
      if (role === '3D Team Leader' || role === '3D Manager') {
        isCN3D = true;
      }
      if (processingStatus.includes(this.simulationStatus) && isCN3D) {
        return true;
      } else {
        return false;
      }
    },
    showTeamAssignSection() {
      if (
        this.userLimits.show_assign_team &&
        (this.simulationStatus === 'SIM_HAS_BEEN_SEND' ||
          this.simulationStatus === 'SIM_US_REJECTED')
      ) {
        return true;
      }
      return false;
    },
    showCNteamSubmit() {
      if (
        this.userLimits.show_CN_team_submit &&
        (this.simulationStatus === 'SIM_CN_ASSIGNED' ||
          this.simulationStatus === 'SIM_CN_REJECTED')
      ) {
        return true;
      }
      return false;
    }
  },
  watch: {
    progressDetailForProcess: {
      handler (val) {
        this.activeProgress = val;
        if (val.phase === '60%') {
          this.d3Needed = true;
        }
        this.justifyRole();
      },
      immediate: true
    },
    simuStatus: {
      handler (val) {
        this.simulationStatus = val;
        this.justifyRole();
      },
      immediate: true
    }
  },
  mounted() {
    this.uploadURL = `${baseUrl.baseUrl}/api/upload-files`;
    // this.justifyRole();
    this.getTeamList();
    this.getUserInfoFromSession();
  },
  methods: {
    handleKeyup(e) {
      if (e.key === '@') {
        let {length} = this.progressForm.remarks;
        this.leftPosition = `${length * 8 * 0.8 + 15}px`;
        this.atTagPerson = true;
      }
      if (e.key === 'Backspace') {
        this.atTagPerson = false;
      }
    },
    handleChoosePerson(person) {
      this.progressForm.remarks += `${person.name}`;
      this.referredUsers.push(person.id);
      this.$refs.commentInputArea.focus();
      this.atTagPerson = false;
    },
    confirmReject(rejectForm) {
      this.rejectForm = rejectForm;
      //已经在rejectProgress中判断了状态的流转
      this.handleProgress();
    },
    getUserInfoFromSession() {
      const userJSONString = localStorage.getItem('user');
      const user = JSON.parse(userJSONString);
      this.userRole = user.role;
    },
    handleRejectFormCancel() {
      this.rejectFormVisible = false;
      this.rejectForm = {};
    },
    justifyRole() {
      let limits = JSON.parse(localStorage.getItem('limits'));
      let userInfo = JSON.parse(localStorage.getItem('user'));
      let teamId = userInfo.team_id;
      limits = limits['3D_Calculation_Simulation'];
      this.userLimits = limits;
      this.show3DsimulationWorkflow = false;
      //判断是否显示calculation的流程给用户，配置了view_workflow的包括CN Manager和US Engineer。CN Team Leader没有全局开放，因为他必须属于这个任务的team才能看到。show_CN_team_submit是每一个team leader都有的权限。
      if (
        limits.show_simulation_section ||
        (teamId === this.activeProgress.team_id && limits.show_CN_team_submit)
      ) {
        this.show3DsimulationWorkflow = true;
      }
    },

    /**拒绝 */
    rejectProgress(state) {
      switch (state) {
        case 'CN_REJECTED':
          this.requestStatus = 'SIM_CN_REJECTED';
          this.rejectFormVisible = true;
          break;
        case 'US_REJECTED':
          this.requestStatus = 'SIM_US_REJECTED';
          this.rejectFormVisible = true;
          break;
        default:
          break;
      }
    },
    handleProgress() {
      //添加一个确认框，如果确认，就进行proceedProcess, 如果取消，就return
      this.$confirm(
        'The task status will be changed, are you sure to continue?',
        'Confirm',
        {
          confirmButtonText: 'Submit',
          cancelButtonText: 'Cancel',
          type: 'warning'
        }
      )
        .then(() => {
          this.proceedProcess();
        })
        .catch(() => {
          return;
        });
    },
    proceedProcess() {
      const status = this.simulationStatus;
      switch (status) {
        case 'SIM_HAS_BEEN_SEND':
          this.requestStatus = 'SIM_CN_ASSIGNED';
          break;
        case 'SIM_CN_ASSIGNED':
          this.requestStatus = 'SIM_CN_TEAM_ALREADY_APPLIED';
          break;
        case 'SIM_CN_TEAM_ALREADY_APPLIED':
          //要分情况判断，如果CN Manager拒绝了上传的文件，则请求状态为CAL_CN_REJECTED，否则为CAL_CN_PASSED
          if (!this.rejectForm.rejectReason) {
            this.requestStatus = 'SIM_CN_PASSED';
          }
          break;
        case 'SIM_CN_PASSED':
          //要分情况判断，如果US Engineer拒绝了上传的文件，则请求状态为CAL_US_REJECTED，否则为CAL_US_PASSED
          if (!this.rejectForm.rejectReason) {
            this.requestStatus = 'SIM_US_PASSED';
          }
          break;
        case 'SIM_CN_REJECTED':
          this.requestStatus = 'SIM_CN_TEAM_ALREADY_APPLIED';
          break;
        case 'SIM_US_REJECTED':
          this.requestStatus = 'SIM_CN_ASSIGNED';
          break;
        default:
          break;
      }
      this.changeProgress();
    },
    changeProgress() {
      let {progressForm} = this;
      let project_id = this.$route.query.projectId;
      //2023/08/28改变：改变progress的时候直接在该接口中改变参数，不再单独调用sendEmail的接口
      let type = 6;
      let params = {
        status: this.requestStatus,
        status_last: this.simulationStatus,
        project_id,
        progress_id: this.activeProgress.id,
        team_id: this.teamId || undefined,
        files: progressForm.files,
        comment: progressForm.remarks || '',
        remarks: this.rejectForm.rejectComment
          ? this.rejectForm.rejectComment
          : progressForm.remarks,
        reason: this.rejectForm.rejectReason || '',
        // due_date: this.dateFormat(progressForm.due_date) || "",
        due_date: this.d3_team_due_date || '',
        type,
        refer_user: this.referredUsers || '',
        inner_date: this.dateFormat(this.d3_inner_date) || ''
      };

      if (this.requestStatus === 'SIM_CN_ASSIGNED') {
        if (!this.activeTeam.id || this.activeTeam.id === '') {
          this.$message({
            message: 'Please select a team',
            type: 'warning'
          });
          return;
        }
        //中国队长必填due_date
        if (!this.d3_team_due_date) {
          this.$message({
            message: 'Please select due date',
            type: 'warning'
          });
          return;
        }
        params['team_id'] = this.activeTeam.id;
      }
      //默认选中上次的team
      // if (this.requestStatus == 'CN_REJECTED') {
      //     params['team_id'] = this.activeProgress.team_id;
      // }
      progressStatus(params)
        .then((res) => {
          if (res.code === 200) {
            // this.handleSendEmail();
            this.$message({
              message: 'Done',
              type: 'success'
            });
            this.progressForm.remarks = '';
            this.progressForm.files = [];
            this.fileList = [];
            this.rejectFormVisible = false;
            this.rejectForm = {};
            this.$emit('progress', 'change-progress-status');
            window.location.reload();
          } else {
            // this.$message.error(res.message);
          }
          return;
        })
        .catch((err) => {
          return err
        })
        .finally(() => {
          this.$emit('progress', 'change-progress-status');
        });
    },
    //2023/08/28暂时废弃发送邮件逻辑
    handleSendEmail() {
      let project_id = this.$route.query.projectId;
      let userInfo = JSON.parse(localStorage.getItem('user'));
      let params = {
        status: this.requestStatus,
        status_last: this.activeProgress.status,
        project_id,
        progress_id: this.activeProgress.id,
        user_id: userInfo.id,
        remarks: this.rejectForm.rejectComment || '',
        reason: this.rejectForm.rejectReason || ''
      };
      if (this.requestStatus === 'SIM_CN_ASSIGNED') {
        params['team_id'] = this.activeTeam.id;
      } else {
        params['team_id'] = this.activeProgress.team_id;
      }
      sendEmail(params)
        .then((res) => {
          if (res.code === 200) {
            this.$emit('email-sent-and-progress-status-changed');
          }
          return;
        })
        .catch((err) => {
          return err
        })
        .finally(() => {
          this.$emit('email-sent-and-progress-status-changed');
        });
    },
    async getTeamList() {
      this.memberList = [];
      await teamList({ type: '3D' })
        .then((res) => {
          if (res.code === 200) {
            let {data} = res.data;
            // let {activeProgress} = this;
            // let status = this.simulationStatus;
            // const that = this;
            // let activeTeam;
            this.teamList = data.map((item) => {
              item['checked'] = false;
              return item;
            });
            //如果只有一个队伍，默认选中
            if (this.teamList.length === 1) {
              this.teamList[0]['checked'] = true;
              this.teamList[0]['disabled'] = true;
              // eslint-disable-next-line prefer-destructuring
              this.activeTeam = this.teamList[0];
              this.teamId = this.teamList[0].id;
              this.changeTeam(this.activeTeam);
            }
          }
          return;
        })
        .catch((err) => {
          return err
        });
    },
    changeTeam(row) {
      this.teamId = row.id;
      let {teamList} = this;
      let teamArr = [];
      let memberArr = [];
      for (let i = 0; i < teamList.length; i++) {
        let item = teamList[i];
        if (row.id !== item.id) {
          item.checked = false;
        } else {
          this.activeTeam = item;
          for (let j = 0; j < item.members.length; j++) {
            let itemMember = item.members[j];
            itemMember['checked'] = false;
            memberArr.push(itemMember);
          }
        }
        teamArr.push(item);
        if (i === teamList.length - 1) {
          this.teamList = teamArr;
          this.memberList = memberArr;
        }
      }
    },
    handleProgresss(event) {
      if (event.lengthComputable) {
        let val = ((event.loaded / event.total) * 100).toFixed(0);
        this.loadprogressProcess = parseInt(val);
      }
    },
    updateFiles(res) {
      if (res.code === 200) {
        let data = res.data.files;
        this.progressForm.files.push(data);
      }
    },
    viewFiles(file) {
      let res = file.response;
      if (res.code === 200) {
        let {url} = res.data.files;
        window.open(url);
      }
    },
    deleteFiles(file, fileList) {
      this.progressForm.files = fileList.map((item) => {
        let res = item.response;
        let itemFile = res.data.files;
        return itemFile;
      });
    },

    async handleUpload(file) {
      await uploadFiles(
        {
          files: file.raw,
          type: 1123123
        },
        {
          'Content-Type': 'multipart/form-data'
        }
      )
        .then((res) => {
          if (res.code === 200) {
            const {data} = res;
            data['uid'] = file.uid;
            this.progressForm.files.push(data);
          } else {
            // this.$message.error(res.message);
          }
          return;
        })
        .catch((err) => {
          return err
        });
    },
    handleFilesPreview(file) {
      let fileLists = this.progressForm.files;
      for (let i = 0; i < fileLists.length; i++) {
        let item = fileLists[i];
        if (item.uid === file.uid) {
          // eslint-disable-next-line prefer-destructuring
          let activeFile = item.files[0];
          window.open(activeFile.url);
        }
      }
    },
    handleFilesRemove(file) {
      let fileLists = JSON.parse(JSON.stringify(this.progressForm.files));
      let newArr = [];
      for (let i = 0; i < fileLists.length; i++) {
        let item = fileLists[i];
        if (item.uid !== file.uid) {
          newArr.push(item);
        }
        if (i === fileLists.length - 1) {
          this.progressForm.files = newArr;
        }
      }
    },
    handleFilesSuccess() {
      this.$refs.upload.clearFiles();
    },
    dateFormat(date) {
      if (!date) {
        return;
      } else {
        let year = date.getFullYear();
        let month = date.getMonth() + 1;
        let day = date.getDate();
        let hour = date.getHours();
        let minute = date.getMinutes();
        let second = date.getSeconds();
        if (month < 10) {
          month = `0${month}`;
        }
        if (day < 10) {
          day = `0${day}`;
        }
        if (hour < 10) {
          hour = `0${hour}`;
        }
        if (minute < 10) {
          minute = `0${minute}`;
        }
        if (second < 10) {
          second = `0${second}`;
        }
        return `${year}-${month}-${day} ${hour}:${minute}:${second}`;
      }
    }
  }
};
</script>

<style lang="less" scoped>
.tag-person {
  position: absolute;
  top: 25;
  z-index: 3;
}

.card-header {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;

  .card-title-wrapper {
    position: relative;

    .title-line {
      width: 6px;
      height: 24px;
      background: rgb(0 123 255);
      border-radius: 3px;
      position: absolute;
      left: -2px;
    }

    .card-title {
      margin-left: 30px;
      font-size: 18px;
      font-family: 'PingFang SC-Medium', 'PingFang SC', sans-serif;
      font-weight: 500;
      color: rgb(0 123 255);
    }
  }
}

.page-container {
  display: flex;
  margin-top: -100px;
}

.drawer-container {
  flex: 1;
  margin: 30px 0 30px 30px;

  .drawer-footer {
    display: flex;
  }
}

.process-container {
  width: 40px;
  height: 40px;
  background: none repeat scroll 0 0 var(--white);
  box-shadow: 0 0 10px 0 rgb(0 0 0 / 8%);
  border-radius: 5px 0 0 5px;
  position: fixed;
  right: 0;
  top: 50%;
  z-index: 80;
  display: flex;
  align-items: center;
  justify-content: center;

  .process-icon {
    font-size: 30px;
    color: #11a1fd;
    animation: rotate 2s linear infinite;
  }

//   @keyframes rotate {
//     0% {
//       -webkit-transform: rotate(0deg);
//     }

//     25% {
//       -webkit-transform: rotate(90deg);
//     }

//     50% {
//       -webkit-transform: rotate(180deg);
//     }

//     75% {
//       -webkit-transform: rotate(270deg);
//     }

//     100% {
//       -webkit-transform: rotate(360deg);
//     }
//   }
}

.process-container:hover {
  cursor: pointer;
  opacity: 0.8;
}

.dialog-step-container {
  width: 90%;
  margin: 0 auto;
  margin-bottom: 30px;
  display: flex;
  align-items: center;
  position: relative;
  height: 80px;

  .rect-wrapper {
    width: 100px;
    height: 100px;
    margin-right: 20px;

    img {
      width: 100%;
      height: 100%;
    }
  }

  .step-wrapper {
    display: flex;
    color: #22223e;

    .step-item {
      font-weight: 600;
    }
  }
}

/* stylelint-disable-next-line selector-class-pattern */
:deep(.el-dialog__header) {
  background: rgb(244 244 244);
}

.form-dialog {
  width: 90%;
}

.form-footer {
  display: flex;
  justify-content: flex-end;
  margin-right: 30px;
}

.edit-record-container {
  flex: 1;
  margin: 20px 30px 0;

  .edit-record-item {
    font-size: 14px;
    color: #111;
    margin-bottom: 10px;

    .info {
      display: flex;
      align-items: center;
      
      .edit-record-line {
        width: 3px;
        height: 15px;
        background: #11a1fd;
        border-radius: 5px;
        margin-right: 10px;
      }

      .date {
        margin-right: 15px;
      }
    }

    .content {
      margin-top: 10px;

      .item {
        display: flex;
        font-size: 14px;
        color: #606266;
        margin-bottom: 10px;

        .label {
          width: 80px;
        }

        .value {
          flex: 1;

          .file-item {
            margin-bottom: 10px;
          }

          .file-item:hover {
            cursor: pointer;
            color: rgb(0 123 255);
          }
        }
      }
    }
  }
}

.trans-container {
  display: flex;
  margin-bottom: 20px;

  .trans-item-wrapper {
    flex: 1;

    .trans-label {
      font-size: 22px;
      font-family: 'PingFang SC-Regular', 'PingFang SC', sans-serif;
      font-weight: 400;
      color: #666;
      margin-bottom: 10px;
    }

    .trans-item {
      min-height: 140px;
      background: #fff;
      border-radius: 8px;
      border: 1px solid #cbcbcb;
      display: flex;
      flex-direction: column;

      .trans-header {
        height: 40px;
        background: #f7f7f8;
        border-radius: 8px 8px 0 0;
        display: flex;
        align-items: center;

        .trans-all {
          margin-left: 15px;
        }

        .trans-num {
          font-size: 12px;
          font-family: 'PingFang SC-Regular', 'PingFang SC', sans-serif;
          font-weight: 400;
          color: #606a74;
          margin-left: 15px;
        }
      }

      .trans-content {
        flex: 1;
        height: 0;
        padding: 10px 15px;
        overflow-y: auto;

        .checkobx-item {
          display: flex;
          align-items: center;
          padding-bottom: 10px;
          border-bottom: 1px solid #eaeaea;
          margin-bottom: 10px;

          .checkobx {
            min-width: 140px;
            font-size: 14px;
          }

          .info {
            flex: 1;
            font-size: 14px;
            font-family: 'PingFang SC-Regular', 'PingFang SC', sans-serif;
            font-weight: 400;
            color: #848f9a;

            .role {
              margin-left: 15px;
              text-transform: capitalize;
            }
          }

          .line {
            width: 1px;
            height: 14px;
            background: #d7d7d7;
            margin-right: 20px;
          }
        }
      }
    }
  }

  .trans-gap {
    margin-right: 15px;
  }
}

.form-approval-btn {
  width: 160px;
}
</style>
