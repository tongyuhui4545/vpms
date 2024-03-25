<template>
  <div>
    <div class="icon-bg">
      <div style="display: flex">
        <img
          v-if="docxVisible"
          src="@/assets/image/word.png"
          alt=""
          class="preview-icon"
        >
        <img
          v-if="excelVisible"
          src="@/assets/image/excel.png"
          alt=""
          class="preview-icon"
        >
        <img
          v-if="pdfVisible"
          src="@/assets/image/pdf.png"
          alt=""
          class="preview-icon"
        >
        <div class="color-white">
          {{ $route.query.name }}
        </div>
      </div>
      <div>
        <!-- 目前打印功能还存在问题，后面优化 -->
        <!-- <i
          class="el-icon-printer color-white"
          @click="printFile"
        /> -->
        <i
          class="el-icon-download color-white"
          @click="downloadFile"
        />
      </div>
    </div>
    <div id="file">
      <vue-office-docx
        v-if="docxVisible"
        :src="url"
        class="file-preview"
      />
      <vue-office-excel
        v-if="excelVisible"
        :src="url"
        class="file-preview"
        style="height: 100vh"
      />
      <vue-office-pdf
        v-if="pdfVisible"
        :src="url"
        class="file-preview"
      />
    </div>
  </div>
</template>

<script>
import VueOfficeDocx from '@vue-office/docx';
import VueOfficeExcel from '@vue-office/excel';
import VueOfficePdf from '@vue-office/pdf';
import { directDownload } from '@/utils/commons';
import '@vue-office/excel/lib/index.css';
// import '@vue-office/docx/lib/index.css';
import baseUrl from '@/config.js';
import axiosRequest from 'axios';
import * as XLSX from 'xlsx';
export default {
  components: {
    VueOfficeDocx,
    VueOfficeExcel,
    VueOfficePdf
  },
  data() {
    return {
      docxVisible: false,
      excelVisible: false,
      pdfVisible: false,
      visible: true,
      query: null,
      url: ''
    };
  },
  mounted() {
    this.query = this.$route.query;
    this.url = `${baseUrl.baseUrl}/${this.query.path}`;
    if (this.query.name.includes('.doc')) {
      this.docxVisible = true;
    } else if (this.query.name.includes('.xls')) {
      this.previewFile('excel');
      this.excelVisible = true;
    } else if (this.query.name.includes('.pdf')) {
      this.pdfVisible = true;
    }
  },
  methods: {
    // printFile() {
    //   const subOutputRankPrint = document.getElementById('file');
    //   const printDiv = document.createElement('div');
    //   printDiv.innerHTML = subOutputRankPrint.innerHTML;
    //   printDiv.style.position = 'fixed';
    //   printDiv.style.left = '0';
    //   printDiv.style.top = '0';
    //   printDiv.style.width = '100%';
    //   printDiv.style.height = '100%';
    //   printDiv.style.zIndex = '999999';
    //   printDiv.style.background = '#fff';
    //   printDiv.style.overflow = 'auto';
    //   document.body.appendChild(printDiv);
    //   window.print();
    //   document.body.removeChild(printDiv);
    //   return false;
    // },
    downloadFile() {
      //下载
      let { query } = this.$route;
      directDownload(query.path, query.name);
    },
    previewFile(type) {
      const token = localStorage.getItem('token');
      // const xhr = new XMLHttpRequest();
      // const mammoth = require('mammoth');
      switch (type) {
        case 'excel':
          //针对.xls作特殊处理
          if (/\.xls?$/.test(this.query.name.toLowerCase())) {
            axiosRequest({
              method: 'GET',
              url: this.url,
              responseType: 'arraybuffer',
              headers: {
                Authorization: `Bearer ${token}`
              }
            }).then((res) => {
              if (res) {
                const workbook = XLSX.read(new Uint8Array(res.data), {
                  type: 'array'
                });

                // 将工作簿（workbook）写入XLSX格式的文件
                const xlsxFile = XLSX.write(workbook, {
                  bookType: 'xlsx',
                  type: 'array'
                });

                // 如果需要预览，可以将 xlsxFile 转换为 Blob 对象
                const blob = new Blob([xlsxFile], {
                  type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
                });

                // 然后，将 blob 对象传给 vue-office 组件进行预览
                this.url = blob;
              }
            });
          }
          break;
        default:
      }
    }
  }
};
</script>

<style lang="less" scoped>
@page {
  margin-top: 0;
  margin-bottom: 0;
}

.file-preview {
  height: 100vh;
}

.icon-bg {
  background-color: #171718;
  height: 64px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 14px;

  .preview-icon {
    width: 20px;
    height: 20px;
    margin-right: 10px;
    margin-left: 20px;
  }

  .color-white {
    color: #fff;
    // width: 20px;
    height: 20px;
  }

  :deep(.el-icon-printer),
  :deep(.el-icon-download) {
    margin-right: 10px;
    cursor: pointer;
  }
}
</style>
