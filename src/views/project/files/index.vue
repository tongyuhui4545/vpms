<template>
  <div class="file-center-container">
    <div class="header-part-lv1">
      <span>File</span>
      <div
        class="return-btn"
        @click="goBackToProjectList"
      >
        <i class="el-icon-back" />
        <span>Return</span>
      </div>
    </div>
    <div
      class="header-part-lv2"
      :class="{ 'under-search': displaySearch }"
    >
      <div
        v-if="!displaySearch"
        class="left-wrapper"
      >
        <div
          v-for="tab in tabs"
          :key="tab.id"
          :class="['content-right-tab', { active: tab.id === tabActive.id }]"
          @click="handleChooseTab(tab)"
        >
          <span class="tab-title">{{ tab.title }}</span>
        </div>
      </div>
      <div class="right-wrapper">
        <TogglableSearchBar
          placeholder="Enter file name to search"
          @on-search="handleSearch"
        />
        <el-select
          v-if="tabActive.title === 'Others' && !displayFile"
          v-model="folderType"
          size="mini"
          style="width: 160px"
          @change="handleOthersFolderTypeChange"
        >
          <el-option
            value="0"
            label="All"
          />
          <el-option
            value="1"
            label="Created by me"
          />
        </el-select>
        <el-button
          v-if="displayFolder"
          type="primary"
          size="mini"
          @click="showNewFolderDialog"
        >
          + New
        </el-button>
        <span
          v-if="displaySearch"
          class="close-search"
          @click="handleCloseSearch"
        >Close</span>
      </div>
    </div>
    <transition name="crumb-transition">
      <Crumb
        v-show="crumbList.length > 1 && !displaySearch"
        :bread-crumbs="crumbList"
        @crumb-clicked="handleCrumbClick"
      />
    </transition>
    <div
      v-if="displayFolder"
      class="display-area"
    >
      <div
        ref="folderWrapper"
        class="folders-wrapper"
      >
        <div
          v-for="item in folderList"
          :key="item.id"
          class="folder-container"
          :class="{ active: folderMatched(item), 'sole-choice': item.is_sync }"
          @contextmenu.prevent="handleChooseFolder(item)"
          @dblclick="handleOpenFolder(item)"
        >
          <i
            class="el-icon-success"
            :class="{ 'right-clciked': item.id === selectedFolder.id }"
          />
          <img
            src="@/assets/IconDesigns/folder.png"
            alt="folder"
          >
          <div class="folder-name">
            {{ item.name }}
          </div>
          <div
            v-if="folderMatched(item) && showMenu"
            class="opt-menu"
          >
            <CustomizedMenu
              :options="folderOptions"
              @option-selected="handleMenuOptionSelect"
            />
          </div>
        </div>
      </div>
    </div>
    <div
      v-if="displaySearch"
      class="display-area"
    >
      <div class="search-result-wrapper">
        <div
          v-for="(item) in searchResult"
          :key="item.id"
          class="search-result-item"
        >
          <div class="name-and-operation-wrapper">
            <div class="file-name-wrapper">
              <i
                class="el-icon-document-checked"
                style="width: 16px; height: 16px"
              />
              <span
                v-dompurify-html="highlightedFileName(item.name)"
                style="font-size: 14px; color: #606266; margin-left: 5px"
              />
            </div>
            <div class="operation-wrapper">
              <i
                v-if="determineFilePreview(item.name) && item.is_preview"
                class="el-icon-view"
                @click="handlePreviewSearchedFile(item)"
              />
              <i
                class="el-icon-download"
                @click="handleDownloadSearchedFile(item)"
              />
              <i
                v-if="item.creator_id === userInfo.id"
                class="el-icon-delete"
                @click="handleDeleteSearchedFile(item)"
              />
            </div>
          </div>
          <div class="crumb-nav-wrapper">
            <div
              v-for="(path, index) in item.path_array"
              :key="path.id"
              class="search-result-crumb"
            >
              <span
                class="search-result-crumb-name"
                @click="handleClickSearchResultCrumb(index, item.path_array)"
              >{{ path.name }}</span>
              <span
                v-if="index < item.path_array.length - 1"
                class="search-result-crumb-slash"
              >
                &nbsp;&nbsp;/&nbsp;&nbsp;
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div
      v-if="displayFile"
      class="display-area"
    >
      <div class="files-wrapper">
        <FileCenter
          :allow-upload="allowFileUploadByAll"
          :file-list="fileList"
          source="project-file-center"
          @upload-project-files="handleUploadProjectFiles"
          @delete-project-file="handleDeleteProjectFile"
          @delete-file="onDeleteProjectFile"
        />
      </div>
    </div>
    <el-dialog
      class="folder-dialog"
      :close-on-click-modal="false"
      :append-to-body="true"
      :title="mode === 'add' ? 'New folder' : 'Edit folder'"
      :visible.sync="dialogFormVisible"
      width="560px"
    >
      <el-form
        :model="folderForm"
        label-width="120px"
        label-position="left"
      >
        <el-form-item
          label="Folder Name"
          label-width="120px"
          required
        >
          <el-input
            v-model="folderForm.folder_name"
            size="mini"
            style="width: 380px"
          />
        </el-form-item>
        <el-form-item
          label="Upload by"
          required
        >
          <el-radio-group
            v-model="folderForm.upload_by"
            @input="handleRadioChange"
          >
            <el-radio :label="0">
              Only me
            </el-radio>
            <el-radio :label="1">
              All
            </el-radio>
          </el-radio-group>
        </el-form-item>
      </el-form>
      <div
        slot="footer"
        class="dialog-footer"
      >
        <el-button @click="dialogFormVisible = false">
          Cancel
        </el-button>
        <el-button
          type="primary"
          @click="handleConfirm"
        >
          Confirm
        </el-button>
      </div>
    </el-dialog>
    <el-dialog
      :close-on-click-modal="false"
      :append-to-body="true"
      :visible.sync="deleteVisible"
      width="560px"
    >
      <div
        slot="title"
        style="
          display: flex;
          align-items: center;
          justify-content: flex-start;
          gap: 8px;
          font-size: 16px;
          height: 20px;
        "
      >
        <i
          class="el-icon-warning icon"
          style="color: #e6a23c"
        />
        <p style="font-size: 16px; color: #303133; font-weight: 550">
          Confirm
        </p>
      </div>
      <div style="margin-left: 26px; transform: translateY(-15px)">
        {{ deleteContent }}
      </div>
      <div
        slot="footer"
        class="dialog-footer"
      >
        <el-button @click="deleteVisible = false">
          Cancel
        </el-button>
        <el-button
          type="primary"
          @click="confirmDelete"
        >
          Submit
        </el-button>
      </div>
    </el-dialog>
    <el-image
      v-show="false"
      ref="image-display"
      :preview-src-list="linkList"
    />
  </div>
</template>

<script>
import Crumb from './components/Crumb.vue';
import FileCenter from '@/views/work-table/components/file-center.vue';
import TogglableSearchBar from '@/components/common/TogglableSearchBar.vue';
import CustomizedMenu from '@/components/common/customized-menu.vue';
import {
  getFileCenterFolderList,
  getFileCenterFileList,
  createFolder,
  deleteFolder,
  editFolder,
  fileCenterSearchFile,
  fileCenterUploadFile,
  fileCenterDeleteFile
} from '@/api/index.js';
import { directDownload, determineFilePreview } from '@/utils/commons';

export default {
  name: '',
  components: {
    Crumb,
    TogglableSearchBar,
    CustomizedMenu,
    FileCenter
  },
  props: {},
  data() {
    return {
      //fix, 图片预览没有加上el-image
      linkList: [],
      showMenu: false,
      deleteContent: 'Are you sure to delete?',
      deleteTarget: '',
      deleteVisible: false,
      allowFileUploadByAll: true,
      deletedFileId: undefined,
      currentUserId: undefined,
      searchVal: '',
      //在Other文件夹下，可以选择Created by me 或者 All, 0代表All, 1代表Created by me
      folderListStatus: 0,
      userInfo: {},
      projectId: this.$route.params.project_id || 2024,
      //文件夹操作类别
      searchResult: [
        {
          id: 1,
          file_id: 2,
          name: 'torrontor.pdf',
          path: 'Project/Quotes/tt.pdf',
          path_array: [
            {
              id: 0,
              name: 'Project'
            },
            {
              id: 1,
              name: 'Quotes'
            }
          ],
          url: 'storage/ddjfihgr.pdf',
          size: '22KB',
          thumbnail: '',
          is_image: 0,
          is_preview: 1,
          creator_id: 27,
          creator: 'biyun',
          is_sync: 1,
          created_at: '2023-09-10 13:45:12'
        },
        {
          id: 2,
          file_id: 2,
          name: 'guadammmmm.pdf',
          path: 'Project/Quotes/tt.pdf',
          path_array: [
            {
              id: 0,
              name: 'Project'
            },
            {
              id: 1,
              name: 'Quotes'
            }
          ],
          url: 'storage/ddjfihgr.pdf',
          size: '22KB',
          thumbnail: '',
          is_image: 0,
          is_preview: 1,
          creator_id: 27,
          creator: 'biyun',
          is_sync: 1,
          created_at: '2023-09-10 13:45:12'
        },
        {
          id: 3,
          file_id: 2,
          name: 'shooooligogogo-pupu.pdf',
          path: 'Project/Quotes/tt.pdf',
          path_array: [
            {
              id: 0,
              name: 'Project'
            },
            {
              id: 1,
              name: 'Quotes'
            }
          ],
          url: 'storage/ddjfihgr.pdf',
          size: '22KB',
          thumbnail: '',
          is_image: 0,
          is_preview: 1,
          creator_id: 27,
          creator: 'biyun',
          is_sync: 1,
          created_at: '2023-09-10 13:45:12'
        },
        {
          id: 4,
          file_id: 2,
          name: 'mounted-gogogo.pdf',
          path: 'Project/Quotes/tt.pdf',
          path_array: [
            {
              id: 0,
              name: 'Project'
            },
            {
              id: 1,
              name: 'Quotes'
            }
          ],
          url: 'storage/ddjfihgr.pdf',
          size: '22KB',
          thumbnail: '',
          is_image: 0,
          is_preview: 1,
          creator_id: 27,
          creator: 'biyun',
          is_sync: 1,
          created_at: '2023-09-10 13:45:12'
        }
      ],
      displayFile: false,
      displayFolder: false,
      displaySearch: false,
      mode: 'add',
      rootPath: 'others',
      folderList: [
        {
          id: 1,
          name: 'P01 10%'
        },
        {
          id: 2,
          name: 'P02 20%'
        },
        {
          id: 3,
          name: 'P03 30%'
        },
        {
          id: 4,
          name: 'P04 40%'
        },
        {
          id: 5,
          name: 'P05 50%'
        },
        {
          id: 6,
          name: 'P06 60%'
        },
        {
          id: 7,
          name: 'P07 70%'
        }
      ],
      fileList: [],
      crumbList: [],
      tempFileUploadList: [],
      selectedFolder: {},
      folderForOperation: {},
      folderOptions: [
        {
          id: 1,
          label: 'Open',
          iconClass: 'el-icon-top-right'
        },
        {
          id: 2,
          label: 'Edit',
          iconClass: 'el-icon-edit'
        },
        {
          id: 3,
          label: 'Delete',
          iconClass: 'el-icon-delete'
        }
      ],
      folderType: 'All',
      //后续根据角色权限来判断，这里先写死
      tabs: [],
      tabActive: { id: 0 },
      // activeTabId: 0,
      folderForm: {
        folder_name: '',
        upload_by: 0
      },
      dialogFormVisible: false
    };
  },
  computed: {
    rootType() {
      let type;
      switch (this.rootPath) {
        case 'Project':
          type = 1;
          break;
        case 'Design':
          type = 2;
          break;
        case 'Others':
          type = 3;
          break;
        default:
          type = 1;
          break;
      }
      return type;
    }
  },
  watch: {},
  created() {
    //根据角色权限来进入根目录
    this.goToRootPath();
    //获取用户信息，后续可被其他方法使用
    this.initUserInfo();
  },
  mounted() {
    //添加点击事件，点击空白处，隐藏右击文件夹出现的菜单
    document.addEventListener('click', this.handleClickOutside);

    //将进入所处的默认根目录（project, design, others）推入面包屑队列
    let root = this.tabs.find((item) => {
      return item.id === 0;
    });
    //由于是根目录，has_children_dir必为1，因为该目录下不会是文件列表
    if (root) {
      this.crumbList.push({ id: 0, name: root.title, has_children_dir: 1 });
    } else {
      this.crumbList.push({ id: 1, name: 'Others', has_children_dir: 1 });
    }
  },

  //销毁之前，移出监听器
  beforeDestroy() {
    document.removeEventListener('click', this.handleClickOutside);
  },
  methods: {
    determineFilePreview,
    //当文件页面上传文件后
    handleUploadProjectFiles(file) {
      let parent_id =
        this.crumbList.length > 0
          ? this.crumbList[this.crumbList.length - 1].id
          : '';
      let file_id = file.id || '';
      fileCenterUploadFile({ parent_id, file_id })
        .then((res) => {
          if (res.code === 200) {
            //把上传上来的信息添加到暂存列表里，用于删除的时候匹配id
            this.tempFileUploadList.push(res.data);
          }
        })
        .catch((err) => {
          return err;
        });
    },
    //upload组件上传文件后，在下部回显的部分，直接点删除的时候进行此步
    handleDeleteProjectFile(file_id) {
      //通过file_id去暂存列表里匹配文件，找到其与文件夹关联的id
      let { id } = this.tempFileUploadList.find((item) => {
        return item.file_id === file_id;
      });
      fileCenterDeleteFile({ id }).then((res) => {
        if (res.code === 200) {
          //从暂存列表里移除
          this.fileList = this.fileList.filter((item) => {
            return item.file_id !== file_id;
          });
        }
      });
    },
    onDeleteProjectFile(id) {
      //文件页面中历史上传记录区域，执行删除操作的文件的id
      this.deletedFileId = id;
      this.deleteTarget = 'file';
      this.deleteVisible = true;
      this.deleteContent =
        'The file will be deleted, are you sure to continue?';
    },
    handleSearch(searchVal) {
      this.searchVal = searchVal;
      fileCenterSearchFile({ filename: searchVal, project_id: this.projectId })
        .then((res) => {
          if (res.code === 200) {
            this.searchResult = res.data;
            this.displaySearchArea();
          }
        })
        .catch((err) => {
          return err;
        });
    },
    //获取文件夹列表
    getFolderList(folder) {
      let params = {
        project_id: this.projectId,
        type: this.rootType,
        parent_id: ['project', 'design', 'others'].includes(folder.id)
          ? 0
          : folder.id,
        created_by_me: this.folderListStatus
      };
      if (this.rootType === 3) {
        params.created_by_me = this.folderListStatus;
      }
      getFileCenterFolderList(params)
        .then((res) => {
          if (res.code === 200) {
            this.folderList = res.data;
            this.displayFolderArea();
          }
        })
        .catch((err) => {
          return err;
        });
    },
    //获取文件列表
    getFileList(item) {
      // 如果是others根目录，id会是1，但请求的时候要发0
      if (item.id === 1) {
        item.id = 0;
      }
      getFileCenterFileList({ parent_id: item.id })
        .then((res) => {
          if (res.code === 200) {
            this.fileList = res.data;
            this.displayFileArea();
          }
        })
        .catch((err) => {
          return err;
        });
    },
    initUserInfo() {
      this.userInfo = JSON.parse(localStorage.getItem('user')) || {};
    },
    goToRootPath() {
      let limits = JSON.parse(localStorage.getItem('limits'));
      if (limits.file_center) {
        if (
          limits.file_center.show_project &&
          !limits.file_center.show_design
        ) {
          this.tabs = [
            {
              id: 'project',
              title: 'Project',
              active: true
            },
            {
              id: 'others',
              title: 'Others',
              active: false
            }
          ];
          this.rootPath = 'Project';
          this.tabActive.id = 'project';
        }
        if (
          limits.file_center.show_design &&
          !limits.file_center.show_project
        ) {
          this.tabs = [
            {
              id: 'design',
              title: 'Design',
              active: true
            },
            {
              id: 'others',
              title: 'Others',
              active: false
            }
          ];
          this.rootPath = 'Design';
          this.tabActive.id = 'design';
        }
        if (
          !limits.file_center.show_project &&
          !limits.file_center.show_design
        ) {
          this.tabs = [
            {
              id: 'others',
              title: 'Others',
              active: false
            }
          ];
          this.rootPath = 'Others';
          this.tabActive.id = 'others';
        }
        if (limits.file_center.show_project && limits.file_center.show_design) {
          this.tabs = [
            {
              id: 'project',
              title: 'Project',
              active: true
            },
            {
              id: 'design',
              title: 'Design',
              active: true
            },
            {
              id: 'others',
              title: 'Others',
              active: false
            }
          ];
          this.rootPath = 'Project';
          this.tabActive.id = 'project';
        }
        //根据根目录请求文件夹列表
        let type;
        if (this.rootPath === 'Project') {
          type = 1;
        }
        if (this.rootPath === 'Design') {
          type = 2;
        }
        if (this.rootPath === 'Others') {
          type = 3;
        }
        let params = {
          project_id: this.projectId,
          type,
          parent_id: 0,
          created_by_me: 0
        };
        getFileCenterFolderList(params).then((res) => {
          this.folderList = res.data;
          this.displayFolderArea();
        });
      }
    },
    highlightedFileName(name) {
      //将传入的name根据this.searchVal进行匹配，把和this.searchVal相同的部分显示成红色
      if (!this.searchVal) {
        // 如果没有搜索值，返回原始字符串
        return name;
      }
      // 创建全局不区分大小写的正则表达式
      const regex = new RegExp(this.searchVal, 'gi');
      // 使用<span>标签包裹匹配的文本，并添加红色样式
      return name.replace(regex, '<span style="color: red">$&</span>');
    },
    //当关闭搜索界面的时候执行的操作
    handleCloseSearch() {
      let lastCrumb = this.crumbList[this.crumbList.length - 1];
      //如果当前crumbList为三级，则为文件列表；否则则为文件夹列表
      if (!lastCrumb.has_children_dir) {
        this.getFileList(lastCrumb);
      } else {
        this.getFolderList(lastCrumb);
      }
    },
    handleOthersFolderTypeChange(val) {
      this.folderListStatus = val;
      this.getFolderList({ id: 0 });
    },
    //点击自然生成的面包屑（在文件中心主页面通过点击文件夹生成的面包屑导航）
    handleCrumbClick(item) {
      const index = this.crumbList.findIndex((el) => {
        return el.id === item.id;
      });
      //如果是最后一个面包屑，也就是当前页面，则不操作
      if (index === this.crumbList.length - 1) {
        return;
      } else {
        this.crumbList.splice(index + 1);
        this.getFolderList(item);
      }
    },
    //点击文件搜索结果的面包屑（搜索出的文件列表中的每条结果下的面包屑路径）
    handleClickSearchResultCrumb(index, pathArray) {
      let newCrumbList = pathArray.slice(0, index + 1);
      this.crumbList = newCrumbList;
      //如果是路径的最后一个，说明是文件列表，调用文件列表接口
      if (index === pathArray.length - 1) {
        this.getFileList(newCrumbList[newCrumbList.length - 1]);
        return;
      }
      this.getFolderList(newCrumbList[newCrumbList.length - 1]);
    },
    handleMenuOptionSelect(option) {
      this.showMenu = false;
      this.folderForOperation = this.selectedFolder;
      switch (option.label) {
        case 'Open':
          this.handleOpenFolder(this.folderForOperation);
          break;
        case 'Edit':
          this.handleEditFolder(this.folderForOperation);
          break;
        case 'Delete':
          this.handleDeleteFolder();
          break;
        default:
          break;
      }
      this.selectedFolder = {};
    },
    handleRadioChange(val) {
      this.folderForm.upload_by = val;
    },
    //folder的操作项
    handleOpenFolder(item) {
      //将文件夹作为面包屑路径推入数组
      let crumb = {
        id: item.id,
        name: item.name,
        has_children_dir: item.has_children_dir
      };
      this.crumbList.push(crumb);
      if (item.has_children_dir === 1) {
        this.getFolderList(item);
      }
      if (item.has_children_dir === 0) {
        //进入文件页面，标记一下是否允许所有人上传，
        let allowUpload = item.is_open === 1 ? true : false;
        //如果操作人就是文件夹创建人，则允许上传，否则就看文件夹是否允许所有人上传
        this.allowFileUploadByAll =
          item.creator_id === this.userInfo.id || allowUpload;
        this.getFileList(item);
      }
    },
    handleEditFolder(item) {
      this.dialogFormVisible = true;
      this.mode = 'edit';
      this.folderForm.folder_name = item.name;
      this.folderForm.upload_by = item.is_open;
    },
    handleDeleteFolder() {
      this.deleteTarget = 'folder';
      this.deleteVisible = true;
      this.deleteContent =
        'The folder will be deleted, are you sure to continue?';
    },
    //刷新当前所在的文件夹
    refreshCurrentFolder() {
      let currentFolder = this.crumbList[this.crumbList.length - 1];
      this.getFolderList(currentFolder);
    },
    confirmDelete() {
      //如果是在文件夹中进行删除文件
      if (this.deleteTarget === 'folder') {
        let { id } = this.folderForOperation;
        deleteFolder({ id }).then((res) => {
          if (res.code === 200) {
            this.deleteVisible = false;
            this.$message.success('The folder has been deleted');
            this.refreshCurrentFolder();
          }
        });
      }
      //如果是在文件列表中删除文件
      if (this.deleteTarget === 'file') {
        fileCenterDeleteFile({ id: this.deletedFileId }).then((res) => {
          if (res.code === 200) {
            this.deleteVisible = false;
            this.$message.success('The file has been deleted');
            this.fileList = this.fileList.filter((item) => {
              return item.id !== this.deletedFileId;
            });
            this.deletedFileId = undefined;
          }
        });
      }
      //如果是在搜索结果中删除文件
      if (this.deleteTarget === 'search') {
        fileCenterDeleteFile({ id: this.deletedFileId }).then((res) => {
          if (res.code === 200) {
            this.deleteVisible = false;
            this.$message.success('The file has been deleted');
            this.handleSearch(this.searchVal);
          }
        });
      }
    },
    // ****************
    goBackToProjectList() {
      let project_type = this.$route.params.project_type || 'bidding';
      this.$router.push(`/index/project/${project_type}`);
    },
    handleClickOutside(event) {
      if (this.$refs.folderWrapper) {
        const isOutsideFolder = !this.$refs.folderWrapper.contains(
          event.target
        );
        const isLeftClick = event.button === 0;
        //如果不在文件夹区域或者左击鼠标，就让菜单隐藏
        if (isOutsideFolder || isLeftClick) {
          this.selectedFolder = {};
        }
      }
    },
    folderMatched(item) {
      if (item.id === this.selectedFolder.id) {
        return true;
      } else {
        return false;
      }
    },
    handleChooseTab(tab) {
      //根据点击的tab，将该tab作为一个根目录
      this.initiateRootPath(tab);
      // this.activeTabId = tab.id;
      this.tabActive = tab;
      let type;
      if (tab.title === 'Project') {
        type = 1;
        this.rootPath = 'Project';
      }
      if (tab.title === 'Design') {
        type = 2;
        this.rootPath = 'Design';
      }
      if (tab.title === 'Others') {
        type = 3;
        this.rootPath = 'Others';
      }
      //获取对应根目录的文件夹列表
      let params = {
        project_id: this.projectId,
        type,
        parent_id: 0,
        created_by_me: 0
      };
      getFileCenterFolderList(params).then((res) => {
        if (res.code === 200) {
          this.folderList = res.data;
          this.selectedFolder = {};
          this.displayFolderArea();
        }
      });
    },
    // 初始化根目录
    initiateRootPath(tab) {
      this.crumbList = [];
      this.crumbList.push({ id: 0, name: tab.title });
    },
    // 展示各个区域
    displayFolderArea() {
      this.displayFolder = true;
      this.displaySearch = false;
      this.displayFile = false;
    },
    displaySearchArea() {
      this.displayFolder = false;
      this.displaySearch = true;
      this.displayFile = false;
    },
    displayFileArea() {
      this.displayFolder = false;
      this.displaySearch = false;
      this.displayFile = true;
    },
    showNewFolderDialog() {
      this.mode = 'add';
      this.dialogFormVisible = true;
    },
    handleChooseFolder(item) {
      this.selectedFolder = item;
      this.getMenuOptions();
      this.showMenu = true;
    },
    //根据是不是自己创建的文件来判断可展示的菜单选项
    getMenuOptions() {
      if (this.userInfo) {
        this.folderOptions =
          this.userInfo.id === this.selectedFolder.creator_id &&
          this.selectedFolder.is_sync === 0
            ? [
                {
                  id: 1,
                  label: 'Open',
                  iconClass: 'el-icon-top-right'
                },
                {
                  id: 2,
                  label: 'Edit',
                  iconClass: 'el-icon-edit'
                },
                {
                  id: 3,
                  label: 'Delete',
                  iconClass: 'el-icon-delete'
                }
              ]
            : [
                {
                  id: 1,
                  label: 'Open',
                  iconClass: 'el-icon-top-right'
                }
              ];
      }
    },
    previewFile(url, name, flag) {
      if (!flag) {
        const { href } = this.$router.resolve({
          path: '/file-preview',
          query: {
            path: url,
            name
          }
        });
        window.open(href, '_blank');
      } else {
        this.$refs['image-display'].showViewer = true;
        this.linkList = [url];
      }
    },
    //对于搜索出的文件的操作
    handlePreviewSearchedFile(item) {
      this.previewFile(item.url, item.name, item.is_image);
    },
    handleDownloadSearchedFile(item) {
      directDownload(item.url, item.name);
    },
    handleDeleteSearchedFile(item) {
      this.deletedFileId = item.id;
      //删除类型为search
      this.deleteTarget = 'search';
      this.deleteVisible = true;
      this.deleteContent =
        'The file will be deleted, are you sure to continue?';
    },
    resetForm() {
      this.form = {
        folder_name: '',
        upload_by: 1
      };
    },
    handleConfirm() {
      if (this.mode === 'add') {
        // 添加文件夹
        let params = {
          project_id: this.projectId,
          type: this.rootType,
          name: this.folderForm.folder_name,
          is_open: this.folderForm.upload_by,
          parent_id: ['project', 'design', 'others'].includes(
            this.crumbList[this.crumbList.length - 1].id
          )
            ? 0
            : this.crumbList[this.crumbList.length - 1].id
        };
        let folderName = this.folderForm.folder_name;
        if (folderName.trim().length > 40) {
          this.$message.error('The folder name cannot exceed 40 characters');
          return;
        }
        createFolder(params).then((res) => {
          if (res.code === 200) {
            this.$message.success('The folder has been created successfully');
            this.dialogFormVisible = false;
            this.folderForm.folder_name = '';
            this.folderForm.upload_by = 0;
            this.refreshCurrentFolder();
          }
        });
      }
      if (this.mode === 'edit') {
        if (this.validateFolderForm) {
          // 修改文件夹
          let params = {
            id: this.folderForOperation.id,
            name: this.folderForm.folder_name,
            is_open: this.folderForm.upload_by
          };
          editFolder(params).then((res) => {
            if (res.code === 200) {
              this.$message.success('The folder has been edited successfully');
              this.folderForm.folder_name = '';
              this.folderForm.upload_by = 1;
              this.dialogFormVisible = false;
              this.refreshCurrentFolder();
            }
          });
        }
      }
    },
    validateFolderForm() {
      if (
        (this.folderForm && !this.folderForm.folder_name.trim()) ||
        (this.folderForm && !this.folderForm.upload_by)
      ) {
        this.$message.error('Please fill in all the required fields');
        return false;
      } else {
        return true;
      }
    },
    close() {
      this.resetForm();
      this.dialogFormVisible = false;
    }
  }
};
</script>
<style>
.folder-dialog .el-dialog__body {
  padding: 0 20px;
}
</style>
<style lang="less" scoped>
@import url('@/css/variables.less');
::v-deep .el-button--primary {
  background-color: #007bff;
}

::v-deep .el-dialog {
  border-radius: 8px;
}

.el-dialog {
  border-radius: 8px;
}
.crumb-transition-enter-active,
.crumb-transition-leave-active {
  transition: opacity 0.3s;
}
.crumb-transition-enter,
.crumb-transition-leave-to {
  opacity: 0;
}
.content-right-tab {
  height: 30px;
  display: flex;
  align-items: center;

  .round-symbol {
    display: inline-block;
    width: 2px;
    height: 2px;
    background-color: black;
    border-radius: 50%;
    margin: 0 4px;
  }

  &.active {
    color: @color-text-blue;
    border-bottom: 3px solid @color-text-blue;
    padding-bottom: 5px;
    margin-bottom: -8px;
  }

  &:hover {
    cursor: pointer;
  }
}
.file-center-container {
  margin-left: -55px;
  width: 1807px;
  height: 805px;
  padding-bottom: 15px;
  background: #fff;
  border-radius: 8px;
  opacity: 1;
  transform: translateX(50px);

  .header-part-lv1 {
    display: flex;
    justify-content: space-between;
    margin: 0 45px 15px 23px;
    padding-top: 15px;

    span {
      font-size: 18px;
      font-weight: 500;
      color: #333333;
    }
    .return-btn {
      cursor: pointer;
      color: #007bff;
      span {
        font-size: 16px;
        font-weight: 500;
        color: #007bff;
      }
    }
  }
  .header-part-lv2 {
    display: flex;
    justify-content: space-between;
    margin: 0 40px 0 20px;
    padding-top: 15px;
    margin-bottom: 8px;
    border-bottom: 2px solid #f0f0f3;

    &.under-search {
      justify-content: flex-end;
    }

    .left-wrapper,
    .right-wrapper {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 8px;
      gap: 40px;

      .close-search {
        font-size: 16px;
        font-weight: 400;
        color: #007bff;
        cursor: pointer;
      }
    }
  }
  .crumb {
    display: flex;
    justify-content: flex-start;
    margin-left: 38px;
    transform: translateY(-30px);
  }
  .display-area {
    display: flex;
    margin-left: 20px;
    align-items: flex-start;
    justify-content: flex=start;
    // margin-top: -22px;
    width: 1750px;
    height: 690px;
    background: #fff;
    border-radius: 4px;
    border: 1px solid #eee;
    overflow: auto;

    .folders-wrapper {
      display: flex;
      justify-content: flex-start;
      flex-wrap: wrap;
      gap: 45px;
      margin: 48px 68px;
      .folder-container {
        position: relative;
        width: 155px;
        height: 168px;
        display: flex;
        justify-content: flex-start;
        align-items: center;
        flex-direction: column;

        .folder-name {
          padding-top: 8px;
          text-align: center;
          word-wrap: break-word;
          white-space: wrap;
          overflow: hidden;
          width: 150px;
        }

        .el-icon-success {
          /* 默认隐藏 */
          display: none;
          position: absolute;
          color: #007bff;
          opacity: 0.5;
          top: 8px;
          left: 8px;

          &.right-clciked {
            display: inline-block;
            opacity: 1;
          }
        }

        .opt-menu {
          z-index: 999;
          position: absolute;
          top: 96px;
          left: 120px;
        }

        img {
          padding-top: 25px;
          width: 80px;
          height: 80px;
        }

        &:hover {
          background: #fafafa;
          .el-icon-success {
            display: inline-block;
          }
        }

        &.active {
          background: #fafafa;
        }
      }
    }

    .files-wrapper {
      width: 100%;
      padding: 40px;
    }

    .search-result-wrapper {
      margin-left: 40px;
      margin-top: 24px;
      margin-right: 40px;
      width: 100%;

      .search-result-item {
        margin-top: 16px;
        display: flex;
        flex-direction: column;
        gap: 5px;

        &:first-child {
          margin-top: 0;
        }
        .name-and-operation-wrapper {
          display: flex;
          justify-content: space-between;
          align-items: center;

          .file-name-wrapper {
            display: flex;
            align-items: center;
          }
          .operation-wrapper {
            display: flex;
            align-items: center;
            gap: 8px;
            cursor: pointer;

            i {
              &:hover {
                color: #007bff;
              }
            }
          }
        }
        .crumb-nav-wrapper {
          display: flex;
          align-items: center;
          justify-content: flex-start;
          margin-top: 4px;

          .search-result-crumb {
            display: flex;
            align-items: center;
            justify-content: flex-start;
            font-size: 14;
            color: #007bff;
            .search-result-crumb-name {
              cursor: pointer;
            }
          }
        }
      }
    }
  }
  .pagination-wrapper {
    display: flex;
    justify-content: flex-end;
    margin-right: 38px;
    margin-top: -20px;
  }
}
</style>
