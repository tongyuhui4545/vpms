<template>
  <el-dialog
    :visible.sync="showDialog"
    :close-on-click-modal="false"
    class="working-hours-details-container"
    width="1280px"
    @close="close"
  >
    <RegisterHoursModal
      ref="editRegisterHoursModal"
      :project-id="projectId"
      type="edit"
      :form-data-for-edit="registerHoursformDataForEdit"
      @refresh="getWorkingHoursList"
    />
    <template #title>
      <p
        style="
          font-weight: 550;
          background-color: #fff;
          color: #303133;
          line-height: 0px;
          font-size: 16px;
        "
      >
        Working-hours details
      </p>
    </template>
    <div class="details-container">
      <div class="details-header-part">
        <TogglableSearchBar
          ref="toggleSearchBar"
          :placeholder="'Enter personnel or phase to search'"
          @on-search="searchForWorkingHoursDetails"
        />
      </div>
      <div class="details-body">
        <el-table
          :data="tableData"
          border
          header-row-class-name="header-row-working-hours-details"
        >
          <el-table-column
            label="Category"
            prop="job_category"
          >
            <template slot-scope="scope">
              <span>{{ scope.row.job_category }}</span>
            </template>
          </el-table-column>
          <el-table-column
            label="Type"
            prop="job_category"
          >
            <template slot-scope="scope">
              <span>{{ scope.row.type }}</span>
            </template>
          </el-table-column>
          <el-table-column
            label="Phase"
            prop="progress_no"
          >
            <template slot-scope="scope">
              <span>{{ scope.row.progress_no }} {{ scope.row.progress }}%</span>
            </template>
          </el-table-column>
          <el-table-column
            label="Actual working hours"
            prop="work_hours"
            width="180"
          />
          <el-table-column
            v-if="showWorkExpenses"
            label="Work expenses($)"
            prop="total_price"
          />
          <el-table-column
            label="Working date"
            prop="working_date"
            :show-overflow-tooltip="true"
          />
          <el-table-column
            label="Personnel"
            prop="creation_name"
            width="120"
          />
          <el-table-column
            label="Task description"
            prop="description"
            :show-overflow-tooltip="true"
          />
          <el-table-column
            label="Record at"
            prop="updated_at"
            :show-overflow-tooltip="true"
          />
          <el-table-column
            label="Action"
            width="80"
          >
            <template slot-scope="scope">
              <div class="icons-wrapper">
                <i
                  v-if="scope.row.creation_id == userInfo.id"
                  class="el-icon-edit"
                  @click="onEditWorkingHour(scope.row)"
                />
                <i
                  v-if="scope.row.creation_id == userInfo.id"
                  class="el-icon-delete"
                  @click="confirmDelete(scope.row)"
                />
              </div>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>
    <template #footer>
      <NormalPagination
        :total-rows="totalRows"
        :page-size="pageSize"
        :current-page="currentPage"
        @page-size-change="handlePageSizeChange"
        @page-change="handlePageChange"
      />
    </template>
  </el-dialog>
</template>

<script>
import { getWorkingHoursList, deleteWorkingHours } from '@/api';
import RegisterHoursModal from '@/views/project/components/RegisterHoursModal.vue';
import TogglableSearchBar from '@/components/common/TogglableSearchBar.vue';
import NormalPagination from '@/components/NormalPagination.vue';
import { MessageBox } from 'element-ui';
export default {
  components: {
    RegisterHoursModal,
    NormalPagination,
    TogglableSearchBar
  },
  props: {
    showWorkExpenses: {
      type: Boolean,
      default: false
    }
  },
  data() {
    let projectId = Number(this.$route.params.project_id);
    return {
      userInfo: [],
      projectId,
      registerHoursformDataForEdit: {},
      showDialog: false,
      searchVal: '',
      tableData: [],
      params: {
        project_id: projectId,
        search: '',
        page: 1,
        limit: 20
      },
      pageSize: 20,
      totalRows: 0,
      currentPage: 1
    };
  },
  mounted() {
    this.getWorkingHoursList();
    this.userInfo = JSON.parse(localStorage.getItem('user'));
  },
  methods: {
    close() {
      if (this.$refs.toggleSearchBar) {
        this.$refs.toggleSearchBar.handleClear();
      }
      this.params.page = 1;
      this.currentPage = 1;
      this.params.search = '';
      this.$emit('refresh')
      this.showDialog = false;
    },
    handlePageChange(val) {
      this.currentPage = val;
      this.params.page = val;
      this.getWorkingHoursList();
    },
    handlePageSizeChange(val) {
      this.pageSize = Number(val);
      this.currentPage = 1;
      this.params.page = 1;
      this.params.limit = this.pageSize;
      this.getWorkingHoursList();
    },
    tableRowClassName() {
      return 'header-row-working-hours-details';
    },
    show() {
      this.showDialog = true;
    },
    searchForWorkingHoursDetails(val) {
      this.params.search = val;
      this.params.limit = this.pageSize;
      this.params.page = 1;
      this.getWorkingHoursList();
    },
    onEditWorkingHour(row) {
      let data = { ...row };
      data.working_date = this.reverseDateRangeToDates(row.working_date);
      this.registerHoursformDataForEdit = data;
      this.$refs.editRegisterHoursModal.show();
    },
    //拿到的数据为两个日期字符串，表格里需要显示为a to b的格式
    transformDateRangeToString(start, end) {
      return `${start} to ${end}`;
    },
    //将数据处理回单个日期，用于数据回填等
    reverseDateRangeToDates(dateRangeString) {
      let data = dateRangeString;
      return data.split(' to ');
    },
    getWorkingHoursList() {
      getWorkingHoursList(this.params).then((res) => {
        if (res.code === 200) {
          let { data } = res.data;
          this.totalRows = res.data.total;
          data.forEach((item) => {
            item.working_date = this.transformDateRangeToString(
              item.work_date_start,
              item.work_date_end
            );
          });
          this.tableData = data;
        }
      });
    },
    deleteWorkingHoursRecord(row) {
      deleteWorkingHours({ id: row.id })
        .then((res) => {
          if (res.code === 200) {
            this.$message.success('Delete successfully');
            this.getWorkingHoursList();
          }
        })
        .catch((err) => {
          return err;
        });
    },
    confirmDelete(row) {
      MessageBox.confirm(
        'Are you sure to delete this record?',
        'Delete Confirmation',
        {
          type: 'warning',
          confirmButtonText: 'OK',
          cancelButtonText: 'Cancel',
          // Prevent closing the dialog by clicking outside
          closeOnClickModal: false
        }
      )
        .then(() => {
          // User confirmed, perform the delete action here
          this.deleteWorkingHoursRecord(row);
        })
        .catch(() => {
          return;
        });
    }
  }
};
</script>

<style>
/* stylelint-disable-next-line selector-class-pattern */
.working-hours-details-container .el-dialog__body {
  padding: 0 20px;
}

.header-row-working-hours-details {
  font-size: 13px;
  font-family: 'PingFang SC-Regular', 'PingFang SC', sans-serif;
  font-weight: 400;
  color: #303133;
  line-height: 24px;
}
</style>

<style lang="less" scoped>
.details-container {
  .details-header-part {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    margin-bottom: 8px;
  }

  .details-body {
    .icons-wrapper {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 8px;

      i {
        cursor: pointer;
      }
    }
  }
}
</style>
