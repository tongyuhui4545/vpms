<template>
  <div>
    <div class="status-msg">
      <div
        class="status"
        :style="{ 'background-color': mapStatusColor(detail.status) }"
      >
        {{ detail.status_value }}
      </div>
      <div
        v-if="detail.status < 4"
        class="action"
      >
        <el-button
          v-if="detail.creator === loginUser"
          type="text"
          class="edit"
          @click="showEditTaskDialog"
        >
          <div style="display: flex">
            <img
              src="@/assets/image/edit.png"
              alt=""
            >
            <span>Edit</span>
          </div>
        </el-button>
        <el-button
          type="text"
          class="copy"
          @click="showCopyTaskDialog"
        >
          <div style="display: flex">
            <img
              src="@/assets/image/copy.png"
              alt=""
            >
            <span>Copy</span>
          </div>
        </el-button>
        <el-button
          v-if="detail.creator === loginUser"
          type="text"
          class="delete"
          @click="changeTaskStatus(4)"
        >
          <div style="display: flex">
            <img
              src="@/assets/image/delete.png"
              alt=""
            >
            <span>Cancel</span>
          </div>
        </el-button>
      </div>
    </div>
    <div class="detail-content">
      <div class="detail-content-left">
        <div class="detail-content-left__title">
          {{ detail.title }}
        </div>
        <div class="detail-content-left__desc">
          <div class="detail-content-left__desc-msg">
            {{ detail.description }}
          </div>
          <file-view
            img-class-name="detail-img"
            img-item-class-name="detail-desc-img"
            file-class-name="detail-file"
            file-item-class-name="detail-file-item"
            :imgs="imgs"
            :files="files"
          />
          <div
            v-if="showArrow"
            class="detail-content-left__desc-more"
            @click="expandOrHideMore"
          >
            <img
              v-if="expand"
              src="@/assets/image/to-bottom.png"
              alt=""
            >
            <img
              v-if="hide"
              src="@/assets/image/to-top.png"
              alt=""
            >
          </div>
        </div>
        <div
          v-if="detail.p_task && JSON.stringify(detail.p_task) !== '{}'"
          class="detail-content-left__main"
        >
          <div class="detail-content-left__main-title">
            Main task
          </div>
          <table>
            <tr colspan="12">
              <td
                colspan="1"
                class="detail-content-left__main-table-title"
              >
                Task NO.
              </td>
              <td colspan="1">
                <el-button
                  type="text"
                  @click="gotoDetail(detail.p_task.id)"
                >
                  {{ detail.p_task.task_no }}
                </el-button>
              </td>
              <td
                colspan="1"
                class="detail-content-left__main-table-title"
              >
                Title
              </td>
              <td colspan="7">
                <el-button
                  type="text"
                  @click="gotoDetail(detail.p_task.id)"
                >
                  {{ detail.p_task.title }}
                </el-button>
              </td>
              <td
                colspan="1"
                class="detail-content-left__main-table-title"
              >
                Priority
              </td>
              <td colspan="1">
                {{ detail.p_task.priority_value }}
              </td>
            </tr>
            <tr colspan="12">
              <td
                colspan="1"
                class="detail-content-left__main-table-title desc-files"
              >
                Task description
              </td>
              <td colspan="11">
                {{ detail.p_task.description }}
              </td>
            </tr>
            <tr colspan="12">
              <td
                colspan="1"
                class="detail-content-left__main-table-title desc-files"
              >
                Files
              </td>
              <td colspan="11">
                <file-view
                  img-class-name="detail-img"
                  img-item-class-name="detail-desc-img"
                  file-class-name="detail-file"
                  file-item-class-name="detail-file-item"
                  :files="detail.p_task.files"
                  height="64px"
                />
              </td>
            </tr>
          </table>
        </div>
        <div class="detail-content-left__sub">
          <div class="detail-content-left__sub-title">
            <div>Sub-tasks</div>
            <div
              v-if="
                detail.sub_tasks &&
                  detail.sub_tasks.length > 0 &&
                  detail.recipient === loginUser
              "
              class="detail-content-left__sub-btn"
              @click="showAddSubTaskDialog"
            >
              + Sub-task
            </div>
          </div>
          <div v-if="detail.sub_tasks && detail.sub_tasks.length > 0">
            <el-table
              :data="detail.sub_tasks"
              border
            >
              <el-table-column
                label="Title"
                width="175px"
                :show-overflow-tooltip="true"
                prop="title"
              >
                <template slot-scope="scope">
                  <el-button
                    type="text"
                    @click="gotoDetail(scope.row.id)"
                  >
                    {{ scope.row.title }}
                  </el-button>
                </template>
              </el-table-column>
              <el-table-column
                label="Task No."
                width="118px"
                :show-overflow-tooltip="true"
              >
                <template slot-scope="scope">
                  <el-button
                    type="text"
                    @click="gotoDetail(scope.row.id)"
                  >
                    {{ scope.row.task_no }}
                  </el-button>
                </template>
              </el-table-column>
              <el-table-column
                label="Status"
                prop="status"
                width="120px"
              >
                <template slot-scope="scope">
                  <el-tag
                    v-if="
                      scope.row.status && scope.row.status_value.length <= 7
                    "
                    :color="mapStatusColor(scope.row.status)"
                    class="status-tag"
                    :style="{
                      'border-color': mapStatusColor(scope.row.status)
                    }"
                  >
                    {{ scope.row.status_value }}
                  </el-tag>
                  <el-tooltip
                    v-else
                    :content="scope.row.status_value"
                    placement="top-start"
                  >
                    <el-tag
                      :color="mapStatusColor(scope.row.status)"
                      class="status-tag"
                      :style="{
                        'border-color': mapStatusColor(scope.row.status)
                      }"
                    >
                      {{
                        scope.row.status_value.length >= 7
                          ? scope.row.status_value.substring(0, 6) + '...'
                          : scope.row.status_value
                      }}
                    </el-tag>
                  </el-tooltip>
                </template>
              </el-table-column>
              <el-table-column
                label="Assign to"
                width="102px"
                :show-overflow-tooltip="true"
                prop="recipient_name"
              />
              <el-table-column
                label="Complete date"
                width="128px"
                :show-overflow-tooltip="true"
                prop="complete_date"
              />
              <el-table-column
                label="Task due date"
                width="125px"
                :show-overflow-tooltip="true"
                prop="task_due_date"
              />
              <el-table-column
                label="Creator"
                width="97px"
                :show-overflow-tooltip="true"
                prop="creator_name"
              />
              <el-table-column
                label="Creation date"
                width="127px"
                :show-overflow-tooltip="true"
                prop="created_at"
              />
            </el-table>
          </div>
          <div
            v-if="
              (!detail.sub_tasks || detail.sub_tasks.length === 0) &&
                detail.recipient === loginUser
            "
            class="detail-content-left__sub-btn"
            @click="showAddSubTaskDialog"
          >
            + Sub-task
          </div>
        </div>
        <el-tabs
          v-model="activeName"
          type="card"
          @tab-click="handleTabClick"
        >
          <el-tab-pane
            :label="
              !commentInfo.length
                ? 'Comments'
                : `Comments(${commentInfo.length})`
            "
            name="comments"
          >
            <comments-or-updates
              v-if="activeName === 'comments'"
              type="comments"
              :info="commentInfo"
              @edit-comment="editComment"
              @delete-comment="deleteComment"
              @detele-file="deleteFile"
            />
          </el-tab-pane>
          <el-tab-pane
            :label="
              !updateInfo.length ? 'Updates' : `Updates(${updateInfo.length})`
            "
            name="task-updates"
          >
            <comments-or-updates
              type="updates"
              :info="updateInfo"
            />
          </el-tab-pane>
          <el-tab-pane
            :label="!fileList.length ? 'Files' : `Files(${fileList.length})`"
            name="files"
          >
            <file-center
              v-if="activeName === 'files'"
              :task-id="detail.id"
              :file-list="fileList"
              @delete-file="deleteFile"
            />
          </el-tab-pane>
        </el-tabs>
        <div
          v-if="activeName === 'comments' && commentsVisible"
          style="position: relative"
          class="comments-submit"
        >
          <el-input
            ref="commentInput"
            v-model="taskComment"
            placeholder="Please enter"
            clearable
            style="border: #eee"
            @keyup.native="logKey"
          />
          <tag-person
            v-if="atTagPerson"
            :style="{ position: 'absolute', top: '-284px', left: leftPosition }"
            @person-chosen="handleChosenPerson"
          />
          <div class="comments-component">
            <file-upload
              class-name="comments-upload"
              file-class-name="task-file"
              file-item-class-name="task-file-item"
              form-type="comments"
              :file-list="commentFiles"
              height="104px"
              @get-files="getFiles"
            />
          </div>
          <el-button @click="addComment">
            Submit
          </el-button>
        </div>
      </div>
      <div>
        <div class="detail-content-right">
          <div class="detail-content-right__row">
            <div class="detail-content-right__row-title">
              Task No. :
            </div>
            <!-- <el-tooltip
              v-if="detail.task_no.length > 25"
              effect="dark"
              :content="detail.task_no"
              placement="top-start"
            >
              <div class="detail-content-right__row-content">
                {{ truncatedContent(detail.task_no) }}
              </div>
            </el-tooltip> -->
            <div class="detail-content-right__row-content">
              {{ detail.task_no }}
            </div>
          </div>
          <div class="detail-content-right__row">
            <div class="detail-content-right__row-title">
              Priority :
            </div>
            <!-- <el-tooltip
              v-if="detail.priority_value.length > 25"
              effect="dark"
              :content="detail.priority_value"
              placement="top-start"
            >
              <div class="detail-content-right__row-content">
                {{ truncatedContent(detail.priority_value) }}
              </div>
            </el-tooltip> -->
            <div class="detail-content-right__row-content">
              {{ detail.priority_value }}
            </div>
          </div>
          <div class="detail-content-right__row">
            <div class="detail-content-right__row-title">
              Tag :
            </div>
            <!-- <el-tooltip
              v-if="detail.tag_name.length > 25"
              effect="dark"
              :content="detail.tag_name"
              placement="top-start"
            >
              <div class="detail-content-right__row-content">
                {{ truncatedContent(detail.tag_name) }}
              </div>
            </el-tooltip> -->
            <div class="detail-content-right__row-content">
              {{ detail.tag_name }}
            </div>
          </div>
          <div class="detail-content-right__row">
            <div class="detail-content-right__row-title">
              Project No. :
            </div>
            <!-- <el-tooltip
              v-if="detail.project_no.length > 25"
              effect="dark"
              :content="detail.project_no"
              placement="top-start"
            >
              <div class="detail-content-right__row-content">
                {{ truncatedContent(detail.project_no) }}
              </div>
            </el-tooltip> -->
            <div class="detail-content-right__row-content">
              {{ detail.project_no }}
            </div>
          </div>
          <div class="detail-content-right__row">
            <div class="detail-content-right__row-title">
              Project name :
            </div>
            <!-- <el-tooltip
              v-if="detail.project_name.length > 25"
              effect="dark"
              :content="detail.project_name"
              placement="top-start"
            >
              <div class="detail-content-right__row-content">
                {{ truncatedContent(detail.project_name) }}
              </div>
            </el-tooltip> -->
            <div class="detail-content-right__row-content">
              {{ detail.project_name }}
            </div>
          </div>
          <div class="detail-content-right__row">
            <div class="detail-content-right__row-title">
              Phase No. :
            </div>
            <!-- <el-tooltip
              v-if="detail.progress_no.length > 25"
              effect="dark"
              :content="detail.progress_no"
              placement="top-start"
            >
              <div class="detail-content-right__row-content">
                {{ truncatedContent(detail.progress_no) }}
              </div>
            </el-tooltip> -->
            <div class="detail-content-right__row-content">
              {{ detail.progress_no }}
            </div>
          </div>
          <div class="detail-content-right__row">
            <div class="detail-content-right__row-title">
              Phase :
            </div>
            <!-- <el-tooltip
              v-if="detail.progress.length > 25"
              effect="dark"
              :content="detail.progress"
              placement="top-start"
            >
              <div class="detail-content-right__row-content">
                {{ truncatedContent(detail.progress) }}
              </div>
            </el-tooltip> -->
            <div class="detail-content-right__row-content">
              {{ detail.progress }}
            </div>
          </div>
          <div class="detail-content-right__row">
            <div class="detail-content-right__row-title">
              Task due date :
            </div>
            <!-- <el-tooltip
              v-if="detail.task_due_date.length > 25"
              effect="dark"
              :content="detail.task_due_date"
              placement="top-start"
            >
              <div class="detail-content-right__row-content">
                {{ truncatedContent(detail.task_due_date) }}
              </div>
            </el-tooltip> -->
            <div class="detail-content-right__row-content">
              {{ detail.task_due_date }}
            </div>
          </div>
          <div class="detail-content-right__row">
            <div class="detail-content-right__row-title">
              Estimated start date :
            </div>
            <!-- <el-tooltip
              v-if="detail.estimated_start_date.length > 25"
              effect="dark"
              :content="detail.estimated_start_date"
              placement="top-start"
            >
              <div class="detail-content-right__row-content">
                {{ truncatedContent(detail.estimated_start_date) }}
              </div>
            </el-tooltip> -->
            <div class="detail-content-right__row-content">
              {{ detail.estimated_start_date }}
            </div>
          </div>
          <div class="detail-content-right__row">
            <div class="detail-content-right__row-title">
              Creator :
            </div>
            <!-- <el-tooltip
              v-if="detail.creator_name.length > 25"
              effect="dark"
              :content="detail.creator_name"
              placement="top-start"
            >
              <div class="detail-content-right__row-content">
                {{ truncatedContent(detail.creator_name) }}
              </div>
            </el-tooltip> -->
            <div class="detail-content-right__row-content">
              {{ detail.creator_name }}
            </div>
          </div>
          <div class="detail-content-right__row">
            <div class="detail-content-right__row-title">
              Creation date :
            </div>
            <!-- <el-tooltip
              v-if="detail.created_at.length > 25"
              effect="dark"
              :content="detail.created_at"
              placement="top-start"
            >
              <div class="detail-content-right__row-content">
                {{ truncatedContent(detail.created_at) }}
              </div>
            </el-tooltip> -->
            <div class="detail-content-right__row-content">
              {{ detail.created_at }}
            </div>
          </div>
          <div class="detail-content-right__row">
            <div class="detail-content-right__row-title">
              CC :
            </div>
            <!-- <el-tooltip
              v-if="detail.copy_to_name.length > 25"
              effect="dark"
              :content="detail.copy_to_name"
              placement="top-start"
            >
              <div class="detail-content-right__row-content">
                {{ truncatedContent(detail.copy_to_name) }}
              </div>
            </el-tooltip> -->
            <div class="detail-content-right__row-content">
              {{ detail.copy_to_name }}
            </div>
          </div>
          <div class="detail-content-right__row">
            <div class="detail-content-right__row-title">
              Assign to :
            </div>
            <div class="detail-content-right__row-content">
              <span v-if="!hasChangeReceipinent">{{
                detail.recipient_name
              }}</span>
              <span v-else>
                <el-select
                  v-model="recipient"
                  class="change-recipient"
                  clearable
                  filterable
                  size="mini"
                >
                  <el-option
                    v-for="user in userOptions"
                    :key="user.id"
                    :label="user.name"
                    :value="user.id"
                  /> </el-select></span>
              <el-button
                v-if="
                  !hasChangeReceipinent &&
                    detail.status === 1 &&
                    (loginUser === detail.recipient ||
                      detail.creator === loginUser)
                "
                type="text"
                @click="changeReceipinent"
              >
                Change
              </el-button>
            </div>
          </div>
          <div class="detail-content-right__comment">
            <div>Comment</div>
            <el-input
              v-model="comment"
              type="textarea"
              :rows="7"
              placeholder="Please enter"
              :disabled="detail.status > 3"
            />
          </div>
          <div
            class="detail-content-right__action"
          >
            <div v-if="hasChangeReceipinent">
              <el-button @click="hasChangeReceipinent = !hasChangeReceipinent">
                Cancel
              </el-button>
              <el-button
                type="primary"
                @click="changeTaskReceiption"
              >
                Save
              </el-button>
            </div>
            <div v-else>
              <el-button
                v-if="detail.status === 1 && detail.recipient === loginUser"
                type="primary"
                @click="changeTaskStatus(1)"
              >
                Start
              </el-button>
              <el-button
                v-if="detail.status === 2 && detail.recipient === loginUser"
                type="primary"
                @click="changeTaskStatus(2)"
              >
                Complete
              </el-button>
              <div v-if="detail.status === 3 && detail.creator === loginUser">
                <el-button @click="restartTask">
                  Restart
                </el-button>
                <el-button
                  type="primary"
                  @click="changeTaskStatus(3)"
                >
                  End
                </el-button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 编辑自定义任务 -->
    <el-dialog
      v-if="editTaskVisible"
      title="Edit task"
      :visible.sync="editTaskVisible"
      width="1280px"
      :close-on-click-modal="false"
      append-to-body
      :destroy-on-close="true"
      class="task-dialog"
      @close="closeEditTaskDialog"
    >
      <task-form
        type="edit"
        :task-data="detail"
        @open-tab-setting="openTabSetting('edit')"
        @close="closeEditTaskDialog"
        @open-task-drawer="closeEditTaskDialog"
        @refresh="refreshDetail"
      />
    </el-dialog>

    <!-- tag管理 -->
    <el-dialog
      title="Tag setting"
      :visible.sync="tagSettingVisible"
      width="1080px"
      :close-on-click-modal="false"
      append-to-body
      :destroy-on-close="true"
      @close="openTaskFormDialog"
    >
      <tag-setting />
    </el-dialog>

    <!-- 确认弹窗 -->
    <el-dialog
      v-if="confirmVisible"
      title="Confirm"
      :visible.sync="confirmVisible"
      width="560px"
      :close-on-click-modal="false"
      append-to-body
      class="cancel-content"
      :destroy-on-close="true"
    >
      <div slot="title">
        <i
          class="el-icon-warning"
          style="color: #e6a23c; margin-right: 8px"
        />
        <span class="cancel-title">Confirm</span>
      </div>
      <span class="cancel-text">{{ changeText }}</span>
      <span
        slot="footer"
        class="dialog-footer"
      >
        <el-button @click="closeChangeTaskDialog">Cancel</el-button>
        <el-button
          type="primary"
          @click="changeTaskConfirm"
        >Submit
        </el-button></span>
    </el-dialog>

    <el-dialog
      v-if="copyTaskVisible"
      title="New task"
      :visible.sync="copyTaskVisible"
      width="1280px"
      :close-on-click-modal="false"
      append-to-body
      :destroy-on-close="true"
      class="task-dialog"
      @close="closeCopyTaskDialog(detail.id)"
    >
      <task-form
        type="copy"
        :task-data="detail"
        @open-tab-setting="openTabSetting('copy')"
        @close="closeCopyTaskDialog(detail.id)"
        @open-task-drawer="closeCopyTaskDialog"
        @refresh="refreshDetail"
      />
    </el-dialog>

    <el-dialog
      v-if="createSubTaskVisible"
      title="New task"
      :visible.sync="createSubTaskVisible"
      width="1280px"
      :close-on-click-modal="false"
      append-to-body
      :destroy-on-close="true"
      class="task-dialog"
      @close="closeCreateSubTaskDialog"
    >
      <task-form
        type="create-sub"
        :parent-id="parentId"
        :task-data="detail"
        @open-tab-setting="openTabSetting('create-sub')"
        @close="closeCreateSubTaskDialog"
        @open-task-drawer="closeCreateSubTaskDialog"
        @refresh="refreshDetail"
      />
    </el-dialog>

    <el-dialog
      v-if="restartTaskVisible"
      title="Edit task"
      :visible.sync="restartTaskVisible"
      width="1280px"
      :close-on-click-modal="false"
      append-to-body
      :destroy-on-close="true"
      class="task-dialog"
      @close="closeRestartTaskDialog"
    >
      <task-form
        type="restart"
        :comment="comment"
        :task-data="detail"
        @open-tab-setting="openTabSetting('restart')"
        @close="closeRestartTaskDialog"
        @open-task-drawer="closeRestartTaskDialog"
        @refresh="refreshDetail"
      />
    </el-dialog>
  </div>
</template>

<script>
import CommentsOrUpdates from './comments-or-updates.vue';
import FileUpload from '@/components/file-upload.vue';
import FileCenter from './file-center.vue';
import TaskForm from './task-form.vue';
import TagSetting from './tag-setting.vue';
import FileView from '@/components/file-view.vue';
// import AtPersonInput from '@/components/at-person-input.vue';
import TagPerson from '@/components/CommentsAndUpdates/TagPerson.vue';
import baseUrl from '@/config.js';
import {
  changeRecipient,
  userList,
  getCustomTaskDetail,
  changeTaskStatus,
  getCustomTaskCommentList,
  addCustomTaskComment,
  editCustomTaskComment,
  deleteCustomTaskComment,
  getCustomTaskUpdate,
  getTaskFiles,
  deleteTaskFiles
} from '@/api/index';

export default {
  components: {
    CommentsOrUpdates,
    FileUpload,
    FileCenter,
    TaskForm,
    TagSetting,
    FileView,
    TagPerson
  },
  props: {
    taskDetail: {
      type: Object,
      default: () => {
        return {};
      }
    }
  },
  emits: ['close-drawer', 'open-drawer', 'refresh-list'],
  data() {
    return {
       //v0.9.0对于评论中@人功能的调整
       commentResult: undefined,
      // *****************************
      detail: {},
      leftPosition: '27px',
      atTagPerson: false,
      showArrow: false,
      subTableData: [
        {
          status: 'Completed',
          link: '/index/work-item'
        }
      ],
      hasChangeReceipinent: false,
      activeName: 'comments',
      files: [],
      imgs: [],
      personMentioned: [],
      personIds: [],
      height: '295px',
      expand: false,
      hide: false,
      editTaskVisible: false,
      tagSettingVisible: false,
      recipient: '',
      confirmVisible: false,
      copyTaskVisible: false,
      createSubTaskVisible: false,
      restartTaskVisible: false,
      gotoBaseURL: '',
      changeText: '',
      userOptions: [],
      comment: '',
      parentId: null,
      actionType: null,
      taskComment: '',
      commentInfo: [],
      commentId: '',
      confirmType: 'change-status',
      commentFiles: [],
      updateInfo: [],
      fileList: [],
      fileId: null,
      deleteType: '',
      commentsVisible: true,
      storeFormData: {},
      type: ''
    };
  },
  computed: {
    loginUser() {
      return JSON.parse(localStorage.getItem('user')).id;
    }
  },
  watch: {
    taskDetail: {
      handler(val) {
        this.detail = val || {};
        if (JSON.stringify(this.detail) !== '{}') {
          this.imgs = this.detail.files.filter((file) => {
            return file.is_image === 1;
          });
          this.files = this.detail.files.filter((file) => {
            return file.is_image === 0;
          });
          this.getCustomTaskCommentList();
          this.getCustomTaskUpdate();
          this.getTaskFiles();
        }
      },
      immediate: true,
      deep: true
    }
  },
  mounted() {
    this.gotoBaseURL = baseUrl.baseUrl;
    let that = this;
    this.$nextTick(() => {
      that.getArrow();
    });
  },
  methods: {
    filterPersonMentioned() {
      let persons = this.personMentioned;
      let comment = this.taskComment;

      let filteredPersonsMentioned = persons.filter((item) => {
  let {name} = item;
  return comment.includes(`@${name}`);
});
this.personMentioned = filteredPersonsMentioned;
this.personIds = filteredPersonsMentioned.map((item) => {return item.id});
    },
    logKey() {
      const inputElement = this.$refs.commentInput.$refs.input;
      const cursorPos = inputElement.selectionStart;
      const textBeforeCursor = this.taskComment.substring(
        cursorPos - 1,
        cursorPos
      );
      // 判断光标前的字符是否是 @ 符号
      const lastChar = textBeforeCursor.slice(-1);
      if (lastChar === '@') {
        let { length } = this.taskComment;
        this.leftPosition = `${length * 8 * 0.7}px`;
        this.atTagPerson = true; 
      } else {
        this.atTagPerson = false;
      }
    },
    handleChosenPerson(person) {
      // 获取输入框的 DOM 元素
      const inputElement = this.$refs.commentInput.$refs.input;
      if (inputElement) {
        // 获取选中的人员姓名
        const selectedPerson = person.name;
        // 获取光标位置
        const { selectionStart } = inputElement;
        const { selectionEnd } = inputElement;
        // 插入文本
        const currentValue = inputElement.value;
        const newValue = `${
          currentValue.substring(0, selectionStart) + selectedPerson
        } ${currentValue.substring(selectionEnd)}`;
        // 更新输入框的值和光标位置
        inputElement.value = newValue;
        inputElement.selectionStart = selectionStart + newValue.length;
        inputElement.selectionEnd = inputElement.selectionStart;
        inputElement.focus();
        // 触发 input 事件以更新 v-model 的值
        inputElement.dispatchEvent(new Event('input'));
      }
      this.personMentioned.push({name: person.name, id: person.id})
      this.personIds.push(person.id);
      // this.personList.push(person);
      this.atTagPerson = false;
    },
    openTaskFormDialog() {
      this.detail = this.$store.state.app.customTaskInfo;
      switch (this.type) {
        case 'edit':
          this.editTaskVisible = true;
          break;
        case 'create-sub':
          this.createSubTaskVisible = true;
          break;
        case 'copy':
          this.copyTaskVisible = true;
          break;
        case 'restart':
          this.restartTaskVisible = true;
          break;
        default:
      }
      this.tagSettingVisible = false;
    },
    getArrow() {
      const fileList = document.querySelectorAll('.detail-file-item');
      const imgList = document.querySelectorAll('.detail-desc-img');
      const parent = document
        .getElementsByClassName('detail-content-left__desc')[0]
        .getBoundingClientRect().top;
      if (
        fileList &&
        fileList.length > 0 &&
        fileList[this.files.length - 1].getBoundingClientRect().top - parent >
          293
      ) {
        this.showArrow = true;
        this.expand = true;
      }

      if (
        imgList &&
        imgList.length > 0 &&
        fileList.length === 0 &&
        imgList[this.imgs.length - 1].getBoundingClientRect().bottom - parent >
          293
      ) {
        this.showArrow = true;
        this.expand = true;
      }
    },
    mapStatusColor(status) {
      switch (status) {
        case 1:
        case 2:
          return '#409EFF';
        case 3:
          return '#22D9AE';
        case 4:
        case 5:
          return '#C0C4CC';
        default:
          return '';
      }
    },
    expandOrHideMore() {
      this.expand = !this.expand;
      this.hide = !this.hide;
      const desc = document.querySelectorAll('.detail-content-left__desc');
      desc[0].style.height = this.expand ? '295px' : 'auto';
    },
    showEditTaskDialog() {
      this.closeDetailDrawer(() => {
        this.editTaskVisible = true;
        this.type = 'edit';
      });
    },
    closeEditTaskDialog() {
      this.editTaskVisible = false;
      this.openDetailDrawer(this.detail.id);
    },
    openTabSetting(type) {
      switch (type) {
        case 'edit':
          this.editTaskVisible = false;
          break;
        case 'create-sub':
          this.createSubTaskVisible = false;
          break;
        case 'copy':
          this.copyTaskVisible = false;
          break;
        case 'restart':
          this.restartTaskVisible = false;
          break;
        default:
      }
      this.tagSettingVisible = true;
    },
    changeReceipinent() {
      this.getUserOptions();
    },
    showCopyTaskDialog() {
      this.closeDetailDrawer(() => {
        this.copyTaskVisible = true;
        this.type = 'copy';
      });
    },
    closeCopyTaskDialog(id) {
      this.copyTaskVisible = false;
      this.openDetailDrawer(id);
    },
    closeChangeTaskDialog() {
      this.confirmVisible = false;
    },
    openDetailDrawer(id) {
      setTimeout(() => {
        this.getCustomTaskDetail(id);
        this.$emit('open-drawer');
      }, 500);
    },
    closeDetailDrawer(fn) {
      this.$emit('close-drawer');
      setTimeout(() => {
        fn();
      }, 500);
    },
    showAddSubTaskDialog() {
      this.closeDetailDrawer(() => {
        this.createSubTaskVisible = true;
        this.parentId = this.detail.id;
        this.type = 'create-sub';
      });
    },
    closeCreateSubTaskDialog() {
      this.createSubTaskVisible = false;
      this.openDetailDrawer(this.detail.id);
    },
    refreshDetail() {
      this.getCustomTaskDetail(this.detail.id);
    },
    changeTaskStatus(action) {
      this.changeText = `The task status will be ${
        action === 4 ? 'deleted' : 'changed'
      }, are you sure to continue?`;
      this.confirmVisible = true;
      this.actionType = action;
      this.confirmType = 'change-status';
    },
    restartTask() {
      this.closeDetailDrawer(() => {
        this.restartTaskVisible = true;
        this.type = 'restart';
      });
    },
    async changeTaskConfirm() {
      if (this.confirmType === 'change-status') {
        let body = {
          id: this.detail.id,
          action_type: this.actionType,
          comment: this.comment
        };
        await changeTaskStatus(body).then((res) => {
          if (res.code === 200) {
            this.$message.success(res.message);
            this.getCustomTaskDetail(this.detail.id);
            this.confirmVisible = false;
            this.comment = '';
            this.getCustomTaskUpdate();
          }
        });
      } else if (this.confirmType === 'delete file') {
        this.deleteTaskFile(1);
      } else {
        let body = {
          id: this.commentId
        };
        await deleteCustomTaskComment(body).then((res) => {
          if (res.code === 200) {
            this.$message.success(res.message);
            this.getCustomTaskCommentList();
            this.confirmVisible = false;
          }
        });
      }
    },
    async deleteTaskFile(flag) {
      await deleteTaskFiles({
        file_id: this.fileId
      }).then((res) => {
        if (res.code === 200) {
          this.$message.success(res.message);
          this.comment = '';
          if (this.deleteType === 'files') {
            // this.getTaskFiles();
            //通过flag来判断，历史文件删除调删除接口，但不请求列表接口，而是前端来做页面删除操作
            if (flag) {
              this.fileList.splice(
                this.fileList.findIndex((file) => {
                  return file.id === this.fileId;
                }),
                1
              );
            }
          } else {
            this.getCustomTaskCommentList();
          }
          this.confirmVisible = false;
        }
      });
    },
    closeRestartTaskDialog() {
      this.restartTaskVisible = false;
      this.openDetailDrawer(this.detail.id);
    },
    gotoDetail(id) {
      const { href } = this.$router.resolve({
        path: '/index/work-item',
        query: {
          id
        }
      });
      window.open(href, '_blank');
    },
    async getCustomTaskDetail(id) {
      let params = {
        id
      };
      await getCustomTaskDetail(params).then((res) => {
        if (res.code === 200) {
          this.detail = res.data;
          this.hasChangeReceipinent = false;
          if (JSON.stringify(this.detail) !== '{}') {
            this.imgs = this.detail.files.filter((file) => {
              return file.is_image === 1;
            });
            this.files = this.detail.files.filter((file) => {
              return file.is_image === 0;
            });
          }
          this.$emit('refresh-list');
        }
      });
    },
    async getUserOptions() {
      await userList().then((res) => {
        if (res.code === 200) {
          this.userOptions = res.data.data;
          this.recipient = this.detail.recipient;
          this.hasChangeReceipinent = !this.hasChangeReceipinent;
        }
      });
    },
    async changeTaskReceiption() {
      if (this.recipient) {
        let body = {
          comment: this.comment,
          new_recipient: this.recipient,
          id: this.detail.id
        };
        await changeRecipient(body).then((res) => {
          if (res.code === 200) {
            this.$message.success(res.message);
            this.getCustomTaskDetail(this.detail.id);
          }
        });
      } else {
        this.$message.warning('Assign to 不可为空');
      }
    },
    async getCustomTaskCommentList() {
      let params = {
        task_id: this.detail.id
      };
      await getCustomTaskCommentList(params).then((res) => {
        if (res.code === 200) {
          if (res.data.comments && res.data.comments.length) {
            res.data.comments.forEach((item) => {
              item.isEdit = false;
              item.init = JSON.parse(JSON.stringify(item.comment));
              if (item.files && item.files.length) {
                item.imgs = item.files.filter((item) => {
                  return item.is_image === 1;
                });
                item.filesCopy = item.files.filter((item) => {
                  return item.is_image !== 1;
                });
              }
            });
          }
          this.commentInfo = res.data.comments || [];
        }
      });
    },
    async getCustomTaskUpdate() {
      let params = {
        task_id: this.detail.id
      };
      await getCustomTaskUpdate(params).then((res) => {
        if (res.code === 200) {
          this.updateInfo = res.data.updates || [];
        }
      });
    },
    async getTaskFiles() {
      let params = {
        task_id: this.detail.id
      };
      await getTaskFiles(params).then((res) => {
        if (res.code === 200) {
          this.fileList = res.data.files || [];
        }
      });
    },
    async addComment() {
      if (this.taskComment) {
        this.filterPersonMentioned()
        let body = {
          task_id: this.detail.id,
          refer_user: this.personIds,
          comment: this.taskComment,
          files: this.commentFiles.length
            ? JSON.stringify(this.commentFiles)
            : ''
        };
        await addCustomTaskComment(body).then((res) => {
          if (res.code === 200) {
            this.$message.success(res.message);
            this.getCustomTaskCommentList();
            this.commentResult = undefined;
            this.commentFiles.length = 0;
            this.personIds = [];
            this.personMentioned = [];
            this.taskComment = '';
            this.commentsVisible = false;
            setTimeout(() => {
              this.commentsVisible = true;
            }, 500);
          }
        });
      } else {
        this.$message.warning('comment can not be empty');
      }
    },
    async editComment(val) {
      if (val.comment) {
        let body = {
          id: val.id,
          comment: val.comment,
          files: this.commentFiles.length
            ? JSON.stringify(this.commentFiles)
            : ''
        };
        await editCustomTaskComment(body).then((res) => {
          if (res.code === 200) {
            this.$message.success(res.message);
            this.getCustomTaskCommentList();
            this.commentFiles = [];
          }
        });
      } else {
        this.$message.warning('comment can not be empty');
      }
    },
    async deleteComment(id, type) {
      this.confirmVisible = true;
      this.changeText =
        'The comment will be deleted, are you sure to continue?';
      this.commentId = id;
      this.confirmType = type;
    },
    getFiles(files) {
      this.commentFiles = files;
    },
    handleTabClick(tab) {
      if (tab._props.name === 'files') {
        this.getTaskFiles();
      }
    },
    deleteFile(id, type, flag = 1) {
      this.fileId = id;
      this.deleteType = type;
      if (!flag) {
        this.deleteTaskFile(flag);
      } else {
        this.confirmVisible = true;
        this.changeText = 'The file will be deleted, are you sure to continue?';
        this.confirmType = 'delete file';
      }
    }
    // truncatedContent(content) {
    //   if (String(content).length > 25) {
    //     return `${content.slice(0, 25)}...`;
    //   } else {
    //     return content;
    //   }
    // }
  }
};
</script>

<style lang="less" scoped>
/deep/ .el-input--suffix .el-input__inner {
  border-radius: 0;
  border-color: #eee
}
.status-msg {
  height: 56px;
  border-bottom: 1px solid #eee;
  display: flex;
  align-items: center;
  padding-left: 24px;
  padding-right: 24px;
  position: sticky;
  top: 0;
  z-index: 999;
  background-color: #fff;
  justify-content: space-between;

  .status {
    height: 24px;
    border-radius: 4px;
    font-size: 13px;
    font-weight: 400;
    color: #fff;
    width: 80px;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .action {
    font-size: 14px;
    font-weight: 400;
    color: #007bff;
  }

  :deep(.el-icon-edit::before),
  :deep(.el-icon-delete::before) {
    color: #007bff;
  }
}

.detail-content {
  display: flex;

  &-left {
    padding: 24px;
    width: calc(100% - 440px);
    border-right: 1px solid #eee;
    height: calc(100% - 56px);

    &__title {
      font-size: 16px;
      font-weight: 550;
      color: #303133;
      word-wrap: break-word;
    }

    &__desc {
      background: #f5f7fa;
      border-radius: 4px;
      margin-top: 8px;
      padding: 16px 24px;
      position: relative;
      overflow: hidden;
      height: 295px;
      word-wrap: break-word;

      &-msg {
        color: #606266;
      }

      &-more {
        position: absolute;
        bottom: 0;
        text-align: center;
        width: 100%;
        cursor: pointer;
        background: #f5f7fa;
      }
    }

    &__sub {
      margin: 29px 0;
      :deep(.el-table) {
        border-radius: 4px 4px 0 0;
      }

      :deep(.el-table th.el-table__cell > .cell) {
        font-weight: 550;
      }

      :deep(thead .el-table__cell) {
        height: 40px;
        font-size: 14px;
        font-weight: 400;
        color: #303133;
      }

      :deep(.el-table__row .el-table__cell) {
        height: 40px;
        font-size: 14px;
        font-weight: 400;
        color: #606266;
      }

      :deep(.el-table__body tr:hover > td) {
        background-color: #fafafa !important;
      }

      .no-data-area {
        height: 264px;
        display: flex;
        align-items: center;
        justify-content: center;

        img {
          width: 200px;
          height: 200px;
        }
      }

      .status-tag {
        color: #fff;
        width: 80px;
        height: 24px;
        border-radius: 4px;
        text-align: center;
        font-size: 13px;
        line-height: 23px;
      }

      &-title {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 8px;
      }

      &-btn {
        font-size: 16px;
        font-weight: 400;
        background-color: #007bff;
        width: 100px;
        color: #fff;
        border-radius: 4px;
        height: 32px;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
      }
    }

    &__main {
      &-title {
        margin: 24px 0 8px;
        font-size: 16px;
        font-weight: 400;
        color: #303133;
      }

      &-table-title {
        font-size: 14px;
        font-weight: 400;
        color: #303133 !important;
        background: #f5f7fa;
        height: 40px;
        word-wrap: break-word;
      }

      .desc-files {
        height: 64px;
      }

      table {
        width: 100%;
        border-collapse: collapse;

        tr {
          border: 1px solid #eee;
          border-right: 0;
        }

        td {
          border-right: 1px solid #eee;
          padding: 10px;
          font-size: 14px;
          min-width: 120px;
          color: #606266;
        }
      }
    }

    :deep(.el-tabs__content) {
      border: 1px solid #eee;
      height: 300px;
      overflow-y: auto;
      padding: 50px 15px 8px;

      &::-webkit-scrollbar {
        background-color: #ebeef5;
      }
    }

    :deep(.el-tabs__item.is-active),
    :deep(.el-tabs__item:hover) {
      color: #007bff;
    }

    .comments-submit {
      text-align: right;

      :deep(.el-button) {
        margin-top: 8px;
      }
    }
  }

  &-right {
    width: 420px;
    padding: 24px 5px 24px 24px;
    position: fixed;
    top: 56px;

    &__row {
      display: flex;
      margin-bottom: 20px;

      &-title {
        font-size: 14px;
        font-weight: 400;
        color: #303133;
        width: 142px;
      }

      &-content {
        font-size: 14px;
        font-weight: 400;
        color: #606266;
        margin-left: 15px;
        display: flex;

        .change-recipient {
          :deep(.el-input__inner) {
            height: 32px;
            width: 97%;
          }
        }

        :deep(.el-button) {
          padding: 0;
          margin-left: 16px;
        }
      }
    }

    &__comment {
      color: #303133;
      font-weight: 400;
      font-size: 14px;
      margin-top: 30px;
      margin-right: 35px;

      div {
        margin-bottom: 8px;
        width: 345px;
      }
    }

    &__action {
      text-align: right;
      margin-right: 40px;
      margin-top: 22px;
      width: 345px
    }
  }

  :deep(.el-button--primary) {
    background-color: #007bff;
    border: 1px solid #007bff;
  }

  :deep(.el-button--default) {
    color: #007bff;
    border: 1px solid #007bff;
  }
}

:deep(.el-button--primary),
:deep(.el-button--default) {
  font-weight: 400;
  height: 40px;
  width: 104px;
}

:deep(.el-button--text) {
  color: #007bff;
}

.cancel-title {
  color: #303133;
}

.cancel-text {
  font-size: 14px;
  font-weight: 400;
  color: #606266;
  display: inline-block;
}

.cancel-content {
  :deep(.el-button--primary) {
    background-color: #007bff;
    border: 1px solid #007bff;
    font-size: 16px;
  }

  :deep(.el-button--default) {
    font-size: 16px;
    font-weight: 400;
    color: #303133;
  }

  :deep(.el-dialog__footer) {
    padding-bottom: 40px;
  }
}

:deep(.el-tabs__header) {
  margin: 0;
}

:deep(.el-tabs--card > .el-tabs__header) {
  border-bottom: 0;
}

.copy,
.edit,
.delete {
  img {
    width: 14px;
    height: 14px;
    margin-right: 3px;
  }
}

.task-dialog {
  :deep(.el-dialog__body) {
    padding: 16px 24px 40px 24px;
  }
  :deep(.el-dialog__header) {
    padding-bottom: 0;
  }
}
</style>
