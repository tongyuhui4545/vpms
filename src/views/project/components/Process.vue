<template>
  <div>
    <div class="page-container">
      <!--团队人员分配-->
      <div
        v-if="teamVisible"
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
            label="Team due date"
            required
          >
            <el-date-picker
              v-model="progressForm.due_date"
              type="datetime"
              placeholder="Please select"
            />
          </el-form-item>
          <el-form-item label="Comment">
            <el-input
              ref="commentInputArea"
              v-model="progressForm.comment"
              type="textarea"
              :rows="5"
              style="width: 112%"
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
              style="margin-left: 100px"
              @click="handleProgress"
            >
              Assign
            </div>
          </div>
        </div>
      </div>

      <!--发送progress-->
      <div
        v-if="remarkVisible"
        class="drawer-container"
      >
        <el-form
          v-if="activeProgress.status != 'US_PASSED'"
          ref="progressForm"
          :model="progressForm"
          label-width="120px"
          size="mini"
          class="form-dialog"
        >
          <div
            v-if="
              userLimits['3D_Calculation_Simulation']
                .assign_calculation_to_CN &&
                activeProgress.status == 'US_TO_BE_SEND'
            "
            class="d3-need-or-not"
          >
            <div class="d3-check-box">
              <el-checkbox v-model="d3Needed">
                3D calculation needed
              </el-checkbox>
            </div>
            <div class="d3-inner-date-picker">
              <el-form-item
                v-if="d3Needed"
                label="3D internal due date"
                label-width="180px"
                required
              >
                <el-date-picker
                  v-model="d3_inner_date"
                  type="datetime"
                  placeholder="Please select"
                />
              </el-form-item>
            </div>
          </div>
          <el-form-item label="Comment">
            <el-input
              ref="commentInputArea"
              v-model="progressForm.comment"
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
            v-if="activeProgress.status != 'CN_ASSIGNED'"
            label="Comment files"
          >
            <!--<el-upload
                            :action="uploadURL"
                            :multiple="true"
                            :on-change="handleUpload"
                            :on-preview="handleFilesPreview"
                            :on-remove="handleFilesRemove"
                            :on-success="handleFilesSuccess"
                            :auto-upload="false"
                            :file-list="fileList">
                            <div class="form-submit-btn">
                                <div class="btn submit animate">Click to upload</div>
                            </div>
                        </el-upload>-->
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
            <div
              v-if="
                activeProgress.status != 'US_PASSED' && !showFinalReviewApproval
              "
              class="form-submit-btn"
              style="margin-top: 20px"
            >
              <div
                v-if="activeProgress.status == 'CN_TEAM_ALREADY_APPLIED'"
                class="btn cancel animate"
                @click="rejectProgress('CN_REJECTED')"
              >
                Reject
              </div>
              <div
                v-if="activeProgress.status == 'CN_PASSED'"
                class="btn cancel animate"
                @click="rejectProgress('US_REJECTED')"
              >
                Reject
              </div>
              <div
                class="btn submit animate"
                @click="handleProgress"
              >
                <span v-if="activeProgress.status == 'US_TO_BE_SEND'">
                  Send to CN Team
                </span>
                <span
                  v-else-if="activeProgress.status == 'CN_TEAM_ALREADY_APPLIED'"
                >
                  Send to US Team
                </span>
                <span v-else-if="activeProgress.status == 'CN_PASSED'">
                  Approve
                </span>
                <span
                  v-else-if="
                    isFromTaskTeam &&
                      (activeProgress.status == 'CN_ASSIGNED' ||
                        activeProgress.status == 'CN_REJECTED')
                  "
                >Submit</span>
                <span
                  v-else-if="
                    userRole == 'CN Engineer Manager' &&
                      activeProgress.status == 'CN_ASSIGNED'
                  "
                >Submit</span>
              </div>
            </div>
            <!-- 20230901新增,如果销售将某个phase设置为win,而该phase的状态不为US_FINAL_PASSED,则出现Approve final review按钮 -->
            <div
              v-if="showFinalReviewApproval"
              class="form-submit-btn"
              style="margin-top: 20px"
            >
              <div
                class="btn submit form-approval-btn animate"
                @click="handleProgress"
              >
                Approve final review
              </div>
            </div>
          </el-form-item>
        </el-form>
      </div>

      <div
        v-if="showMarkAsSent"
        class="form-submit-btn"
        style="margin: 20px 0 10px 30px"
        @click="handleProgress"
      >
        <div class="btn submit animate">
          Mark as sent
        </div>
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
      default: 'Bidding'
    },
    labelStatus: {
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
      //3d相关
      d3Needed: false,
      d3_inner_date: '',
      // ************
      isFromTaskTeam: false,
      userLimits: [],
      leftPosition: '',
      referredUsers: [],
      atTagPerson: false,
      rejectForm: {},
      activeProgress: {},
      rejectFormVisible: false,
      //20230831新增,美国通过后,出现mark as sent按钮,销售总监和销售可以点击该按钮
      showMarkAsSent: false,
      showFinalReviewApproval: false,
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
      teamVisible: false,
      remarkVisible: false,

      /**
       * US_TO_BE_SEND 美国【待发送】
       * US_HAS_BEEN_SEND 美国【已发送】
       * CN_ASSIGNED 中国【已分配】
       * CN_TEAM_ALREADY_APPLIED 中国团队【已申请】
       * CN_PASSED 中国【已通过】
       * CN_REJECTED 中国【已拒绝】
       * US_REJECTED 美国【已拒绝】
       */
      /**
       * US_ENGINEER_SEND    美国【已发送】  中国【待分配】
       * US_ENGINEER_REJECT   美国【已拒绝】  中国【待分配】
       * US_ENGINEER_ACCEPT   美国【已通过】
       * CN_ENGINEER_ASSIGN   中国【已分配】  中国团队【待审批】
       * CN_ENGINEER_TEAM_APPLY   中国团队【已申请】  中国团队【待审批】
       * CN_ENGINEER_REJECT   中国【已拒绝】  中国团队【待审批】
       * CN_ENGINEER_ACCEPT   中国【已通过】  美国【待审批】  中国团队【已通过】
       */
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
  watch: {
    progressDetailForProcess: {
      handler (val) {
        this.activeProgress = val;
        //60%的phase, 3d calculation needed必选
        if (
          val.progress === '60%' &&
          val['3d_send'] !== 1 &&
          val.status === 'US_TO_BE_SEND'
        ) {
          this.d3Needed = true;
        }
        this.justifyRole();
      }
    }
  },
  mounted() {
    this.uploadURL = `${baseUrl.baseUrl}/api/upload-files`;
    // this.justifyRole();
    this.getUserInfoFromSession();
    setTimeout(() => {
      this.getTeamList();
    }, 500);
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
      this.changeProgress();
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
      let userInfo = JSON.parse(localStorage.getItem('user'));
      let {role} = userInfo;
      let {status} = this.activeProgress;
      this.userLimits = JSON.parse(localStorage.getItem('limits'));
      this.teamVisible = false;
      this.remarkVisible = false;
      //如果是中国团队的人，需要判断当前phase是否被分配到他
      if (userInfo.team_id === this.activeProgress.team_id) {
        this.isFromTaskTeam = true;
      }
      if (role === 'US Engineer') {
        //US Engineer无视团队
        this.isFromTaskTeam = true;
        if (status === 'US_TO_BE_SEND') {
          this.teamVisible = false;
          this.remarkVisible = true;
        }
        if (status === 'CN_PASSED') {
          this.teamVisible = false;
          this.remarkVisible = true;
        }
        if (
          (status === 'QUOTE_SENT' || status === 'WIN') &&
          this.activeProgress.win === 1
        ) {
          this.teamVisible = false;
          this.remarkVisible = true;
          this.showFinalReviewApproval = true;
        }
      }
      if (role === 'CN Engineer Manager') {
        if (status === 'US_HAS_BEEN_SEND') {
          this.teamVisible = true;
          this.remarkVisible = false;
        }
        if (status === 'CN_TEAM_ALREADY_APPLIED') {
          this.teamVisible = false;
          this.remarkVisible = true;
        }
        if (status === 'CN_ASSIGNED') {
          this.teamVisible = false;
          this.remarkVisible = true;
        }
        if (status === 'US_REJECTED') {
          this.teamVisible = true;
          this.remarkVisible = false;
        }
      }
      if (role === 'Team Leader') {
        if (status === 'CN_ASSIGNED' || status === 'CN_REJECTED') {
          this.teamVisible = false;
          this.remarkVisible = true;
        }
        if (status === 'CN_REJECTED') {
          this.teamVisible = false;
          this.remarkVisible = true;
        }
      }
      if (
        role === 'Sales Director' ||
        role === 'Sales Assistant' ||
        role === 'Sales'
      ) {
        if (
          (status === 'US_PASSED' || status === 'WIN') &&
          this.activeProgress.mark_sent === 0
        ) {
          this.showMarkAsSent = true;
        }
      }
    },

    /**拒绝 */
    rejectProgress(state) {
      switch (state) {
        case 'CN_REJECTED_MANAGER':
          this.requestStatus = 'CN_REJECTED_MANAGER';
          break;
        case 'CN_REJECTED':
          this.requestStatus = 'CN_REJECTED';
          this.rejectFormVisible = true;
          break;
        case 'US_REJECTED':
          this.requestStatus = 'US_REJECTED';
          this.rejectFormVisible = true;
          break;
        default:
          break;
      }
    },
    handleProgress() {
      //拦截以下如果选择需要3d文件，但是没有选择3d内部due date的情况
      if (this.d3Needed && !this.d3_inner_date) {
        this.$message({
          message: 'Please select 3D internal due date',
          type: 'warning'
        });
        return;
      }
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
      const {status} = this.activeProgress;
      let userInfo = JSON.parse(localStorage.getItem('user'));
      let {role} = userInfo;

      switch (status) {
        case 'US_TO_BE_SEND':
          this.requestStatus = 'US_HAS_BEEN_SEND';
          break;
        case 'CN_REJECTED_MANAGER':
          this.requestStatus = 'US_HAS_BEEN_SEND';
          break;
        case 'US_HAS_BEEN_SEND':
          this.requestStatus = 'CN_ASSIGNED';
          break;
        case 'CN_ASSIGNED':
          this.requestStatus = 'CN_TEAM_ALREADY_APPLIED';
          break;
        case 'CN_TEAM_ALREADY_APPLIED':
          this.requestStatus = 'CN_PASSED';
          break;
        case 'CN_PASSED':
          this.requestStatus = 'US_PASSED';
          break;
        case 'CN_REJECTED':
          this.requestStatus = 'CN_TEAM_ALREADY_APPLIED';
          break;
        case 'US_REJECTED':
          this.requestStatus = 'CN_ASSIGNED';
          break;
        //1026晚新加。碰到状态为QUOTE_SENT,点击Final Approve没用。
        case 'WIN':
          this.requestStatus = 'US_FINAL_PASSED';
          break;
        case 'QUOTE_SENT':
          this.requestStatus = 'US_FINAL_PASSED';
          break;
        default:
          break;
      }
      //2023/09/12将销售的mark as sent和 美国技术的 Final approve逻辑单独拿出来判断。
      if (
        role.includes('Sales') &&
        (status === 'US_PASSED' || status === 'WIN')
      ) {
        this.requestStatus = 'QUOTE_SENT';
        this.showMarkAsSent = false;
      }
      if (role === 'US Engineer' && status === 'WIN') {
        this.requestStatus = 'US_FINAL_PASSED';
      }
      this.changeProgress();
    },
    changeProgress() {
      let {progressForm} = this;
      let project_id = this.$route.query.projectId;
      //2023/08/28改变：改变progress的时候直接在该接口中改变参数，不再单独调用sendEmail的接口
      let type = '';
      if (this.processType === 'Formal') {
        type = 2;
      }
      if (this.processType === 'Bidding') {
        type = 1;
      }
      let params = {
        status: this.requestStatus,
        status_last: this.activeProgress.status,
        project_id,
        progress_id: this.activeProgress.id,
        team_id: this.teamId || undefined,
        files: progressForm.files,
        comment: progressForm.comment || '',
        remarks: this.rejectForm.rejectComment
          ? this.rejectForm.rejectComment
          : progressForm.remarks,
        reason: this.rejectForm.rejectReason || '',
        due_date: this.dateFormat(progressForm.due_date) || '',
        type,
        refer_user: this.referredUsers || '',
        //3d相关的内容
        '3d_send': this.d3Needed ? 1 : 0,
        '3d_inner_date': this.d3Needed
          ? this.dateFormat(this.d3_inner_date) || ''
          : ''
      };

      if (this.requestStatus === 'CN_ASSIGNED') {
        if (!this.activeTeam.id || this.activeTeam.id === '') {
          this.$message({
            message: 'Please select team member',
            type: 'warning'
          });
          return;
        }
        //中国队长必填due_date
        if (!progressForm.due_date) {
          this.$message({
            message: 'Please select due date',
            type: 'warning'
          });
          return;
        }
        params['team_id'] = this.activeTeam.id;
      }
      if (this.requestStatus === 'CN_REJECTED') {
        params['team_id'] = this.activeProgress.team_id;
      }
      progressStatus(params)
        .then((res) => {
          if (res.code === 200) {
            // this.handleSendEmail();
            this.$message({
              message: 'Done',
              type: 'success'
            });
            setTimeout(() => {
              this.$emit('progress', 'change-progress-status');
            }, 500);
            this.progressForm.remarks = '';
            this.progressForm.comment = '';
            this.progressForm.files = [];
            this.fileList = [];
            this.rejectFormVisible = false;
            this.rejectForm = {};
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
      if (this.requestStatus === 'CN_ASSIGNED') {
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
      await teamList({ type: '2D' })
        .then((res) => {
          if (res.code === 200) {
            let {data} = res.data;
            let {activeProgress} = this;
            let {status} = activeProgress;
            const that = this;
            let activeTeam;
            this.teamList = data.map((item) => {
              item['checked'] = false;
              if (status === 'CN_REJECTED' || status === 'US_REJECTED') {
                if (item.id === activeProgress.team_id) {
                  item['checked'] = true;
                  activeTeam = item;
                }
              }
              return item;
            });
            if (status === 'CN_REJECTED' || status === 'US_REJECTED') {
              this.activeTeam = activeTeam;
              that.changeTeam(activeTeam);
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

  .d3-need-or-not {
    margin-left: 10px;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    gap: 10px;

    .d3-check-box {
      font-size: 14px;
      font-family: 'PingFang SC', sans-serif;
      font-weight: 400;
      color: #606266;
      margin-bottom: 18px;
    }

    .d3-inner-date-picker {
      display: flex;
      align-items: center;
      justify-content: flex-start;
    }
  }
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
