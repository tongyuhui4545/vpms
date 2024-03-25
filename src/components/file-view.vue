<template>
  <div
    :class="viewArea"
    :style="{ height: height, 'overflow-y': 'auto' }"
  >
    <div
      v-if="imgArea && imgs.length"
      :class="imgClassName"
    >
      <div
        v-for="(img, index) in imgs"
        :key="img.id"
        class="img-box"
      >
        <el-image
          :ref="`preview${index}`"
          :src="img.thumbnail"
          :preview-src-list="srcList"
          :class="imgItemClassName"
          fit="cover"
          class="images"
        />
        <div class="icon-box">
          <i
            class="el-icon-zoom-in"
            @click="previewPic(index, img.url)"
          />
          <i
            v-if="type === 'has-delete' && img.creator_id === loginUser"
            class="el-icon-delete"
            @click="deleteFile(img.id)"
          />
        </div>
      </div>
    </div>
    <div
      v-if="fileArea && files.length"
      :class="fileClassName"
    >
      <div
        v-for="(file, index) in files"
        :key="file.id"
        :class="fileItemClassName"
      >
        <div
          style="
            display: flex;
            align-items: center;
            justify-content: space-between;
          "
        >
          <div>
            <i class="el-icon-document" />
            <el-tooltip
              effect="dark"
              placement="top-start"
            >
              <div slot="content">
                <p>File: {{ file.name }}</p>
                <p>File capacity: {{ file.size }}</p>
                <p>Creator: {{ file.creator }}</p>
                <p>Creation date: {{ file.created_at }}</p>
              </div>
              <span style="cursor: pointer">{{ file.name }}</span>
            </el-tooltip>
          </div>
          <div>
            <i
              v-if="determineFilePreview(file.name) && file.is_preview"
              class="el-icon-view table-icon animate"
              @click="previewFile(file.url, file.name, file.is_image, index)"
            />
            <i
              class="el-icon-download table-icon animate"
              @click="downloadFile(file.url, file.name)"
            />
            <!-- is_sync字段只有在文件中心中才有, 任务中心不会有这个字段，所以!file.is_sync永远为true, 不影响判断 -->
            <i
              v-if="
                type === 'has-delete' &&
                  file.creator_id === loginUser &&
                  !file.is_sync
              "
              class="el-icon-delete table-icon animate"
              @click="deleteFile(file.id)"
            />
          </div>
        </div>
      </div>
    </div>
    <el-image
      v-show="false"
      ref="previewImg"
      :preview-src-list="linkList"
    />
  </div>
</template>

<script>
import { directDownload, determineFilePreview } from '@/utils/commons';
export default {
  props: {
    imgClassName: {
      type: String,
      default: ''
    },
    imgItemClassName: {
      type: String,
      default: ''
    },
    fileClassName: {
      type: String,
      default: ''
    },
    fileItemClassName: {
      type: String,
      default: ''
    },
    viewArea: {
      type: String,
      default: ''
    },
    files: {
      type: Array,
      default: () => {
        return [];
      }
    },
    imgs: {
      type: Array,
      default: () => {
        return [];
      }
    },
    imgArea: {
      type: Boolean,
      default: true
    },
    fileArea: {
      type: Boolean,
      default: true
    },
    type: {
      type: String,
      default: ''
    },
    height: {
      type: String,
      default: 'auto'
    }
    // deleteVisible: {
    //   type: Boolean,
    //   defaullt: false
    // }
  },
  emits: ['delete-file', 'get-delete-type'],
  data() {
    return {
      srcList: [],
      linkList: []
    };
  },
  computed: {
    loginUser() {
      return JSON.parse(localStorage.getItem('user')).id;
    }
  },
  watch: {
    // imgs: {
    //   handler(val) {
    //     val.forEach((item) => {
    //       this.srcList.push(item.url);
    //     });
    //   },
    //   immediate: true,
    //   deep: true
    // }
    // files: {
    //   handler(val) {
    //     val.forEach((item) => {
    //       if (item.is_image) {
    //         this.linkList.push(item.url);
    //       }
    //     });
    //   },
    //   immediate: true,
    //   deep: true
    // }
  },
  methods: {
    determineFilePreview,
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
        this.$refs.previewImg.showViewer = true;
        this.linkList = [url];
      }
    },
    previewPic(index, url) {
      this.srcList.length = 0;
      this.srcList.push(url);
      this.imgs.forEach((item, idx) => {
        if (index !== idx) {
          for (let i = index + 1; i < this.imgs.length; i++) {
            this.srcList.push(item.url);
          }
          for (let i = 0; i < index; i++) {
            this.srcList.push(item.url);
          }
        }
      });
      this.$refs[`preview${index}`][0].showViewer = true;
    },
    downloadFile(url, name) {
      directDownload(url, name);
    },
    deleteFile(id) {
      this.$emit('delete-file', id);
    }
  }
};
</script>

<style lang="less" scoped>
.detail-img {
  border-radius: 4px;
  padding: 16px 0;
  display: flex;
  flex-wrap: wrap;
  cursor: pointer;

  img,
  :deep(.el-image) {
    width: 164px;
    height: 120px;
    margin-right: 16px;
  }
}

.comments-img {
  border-radius: 4px;
  padding: 16px 0;
  display: flex;
  flex-wrap: wrap;
  cursor: pointer;

  img,
  :deep(.el-image) {
    width: 76px;
    height: 56px;
    margin-right: 16px;
  }
}

.detail-file,
.comments-file {
  &-item {
    font-size: 14px;
    font-weight: 400;
    color: #606266;

    span {
      display: inline-block;
      margin: 5px 24px 5px 5px;
    }
  }
}

.task-file {
  height: 72px;
  overflow-y: auto;
  border: 1px solid #eee;
  padding: 5px;
  font-size: 13px;
  font-weight: 400;
}

.task-file-item {
  text-align: left;
  cursor: pointer;
  height: 20px;
  margin-top: 5px;
}

.task-form-file {
  margin-left: -134px;
}

.img-box {
  // display: flex;
  // justify-content: center;
  // align-items: center;
  position: relative;

  .icon-box {
    display: none;
    // margin-left: -82px;
    // margin-top: 60px;
  }
}

.img-box:hover {
  :deep(.el-image) {
    background: #000;

    img {
      opacity: 0.6;
    }

    :deep(.el-image__preview) > img {
      opacity: 1;
    }
  }

  .icon-box {
    display: block;
    color: #fff;
    cursor: pointer;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    width: 60px;
  }

  :deep(.el-icon-delete) {
    margin-left: 10px;
    display: inline-block;
  }
}
</style>
