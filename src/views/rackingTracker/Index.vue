<template>
  <div class="page-container">
    <!--tracker列表-->
    <Card class="card-templete">
      <template #cardHeader>
        <span class="iconfont icon-lianjiezhuangtai card-icon" />
        Racking/Tracker
      </template>
      <template #cardOperate>
        <div class="table-search">
          <TogglableSearchBar
            :placeholder="'Enter to search'"
            style="margin-right: 15px"
            @on-search="handleSearch"
          />
          <TableFilter
            ref="tableFilter"
            :filter-for="filterFor"
            style="
              display: flex;
              justify-content: center;
              align-items: center;
              margin-top: 3px;
            "
            @onFilter="handleOnFilter"
          />
          <div
            v-if="editVisible"
            class="card-btn animate new-btn"
            @click="handleAdd"
          >
            <i class="el-icon-plus" />
            New
          </div>
        </div>
      </template>
      <template #cardContent>
        <div class="table-wrapper">
          <el-table
            :data="tableData"
            size="small"
            width="auto"
          >
            <el-table-column
              prop="series"
              label="Series"
            >
              <template slot="header">
                <el-popover
                  ref="popover-model"
                  placement="bottom-start"
                  width="260"
                  popper-class="el-popover-self"
                  trigger="hover"
                  :visible-arrow="false"
                >
                  <span
                    slot="reference"
                    class="column-on-hover"
                  >Model</span>
                  <FastFilter
                    filter-for="RACKING-TRACKER-model"
                    placeholder="Please input model"
                    fast-filter-type="InputFastFilter"
                    @fast-filter="handleFastFilter"
                  />
                </el-popover>
                <Sorter
                  ref="sorter-model"
                  sorter-type="sorter-model"
                  sort-by="model"
                  @on-sort="handleSort"
                />
                <FastFilteredIcon
                  ref="fast_filtered_icon_model"
                  @cancel="handleCancelFastFilter"
                />
              </template>
              <template slot-scope="scope">
                <span
                  class="project-name"
                  @click="handleView(scope.row)"
                >{{
                  scope.row.series
                }}</span>
              </template>
            </el-table-column>
            <el-table-column
              prop="manufacturer"
              label="Manufacturer"
            >
              <template slot="header">
                <el-popover
                  ref="popover-manufacturer"
                  placement="bottom-start"
                  width="180"
                  popper-class="el-popover-self"
                  trigger="hover"
                  :visible-arrow="false"
                >
                  <span
                    slot="reference"
                    class="column-on-hover"
                  >Manufacturer</span>
                  <FastFilter
                    :options="manufacturerOptions"
                    filter-for="RACKING-TRACKER-manufacturer"
                    placeholder="Please select manufacturer"
                    fast-filter-type="SelectFastFilter"
                    @fast-filter="handleFastFilter"
                  />
                </el-popover>
                <Sorter
                  ref="sorter-mfr"
                  sorter-type="sorter-mfr"
                  sort-by="mfr"
                  @on-sort="handleSort"
                />
                <FastFilteredIcon
                  ref="fast_filtered_icon_manufacturer"
                  @cancel="handleCancelFastFilter"
                />
              </template>
            </el-table-column>
            <el-table-column
              prop="bha_gap_width"
              label="BHA gap width(ft)"
            >
              <template slot="header">
                <el-popover
                  ref="popover-bha-gap-width"
                  placement="bottom-start"
                  width="260"
                  popper-class="el-popover-self"
                  trigger="hover"
                  :visible-arrow="false"
                >
                  <span
                    slot="reference"
                    class="column-on-hover"
                  >BHA gap width(ft)</span>
                  <FastFilter
                    filter-for="RACKING-TRACKER-BHA-gap-width"
                    placeholder="Please input model"
                    fast-filter-type="InputFastFilter"
                    @fast-filter="handleFastFilter"
                  />
                </el-popover>
                <Sorter
                  ref="sorter-bha-gap-width"
                  sorter-type="sorter-bha-gap-width"
                  sort-by="model"
                  @on-sort="handleSort"
                />
                <FastFilteredIcon
                  ref="fast_filtered_icon_bha_gap_width"
                  @cancel="handleCancelFastFilter"
                />
              </template>
            </el-table-column>
            <el-table-column
              prop="motor_gap_width"
              label="Motor gap width(ft)"
            >
              <template slot="header">
                <el-popover
                  ref="popover-model"
                  placement="bottom-start"
                  width="260"
                  popper-class="el-popover-self"
                  trigger="hover"
                  :visible-arrow="false"
                >
                  <span
                    slot="reference"
                    class="column-on-hover"
                  >Motor gap width(ft)</span>
                  <FastFilter
                    filter-for="RACKING-TRACKER-motor-gap-width"
                    placeholder="Please input model"
                    fast-filter-type="InputFastFilter"
                    @fast-filter="handleFastFilter"
                  />
                </el-popover>
                <Sorter
                  ref="sorter-motor-gap-width"
                  sorter-type="sorter-motor-gap-width"
                  sort-by="motor_gap_width"
                  @on-sort="handleSort"
                />
                <FastFilteredIcon
                  ref="fast_filtered_icon_motor_gap_width"
                  @cancel="handleCancelFastFilter"
                />
              </template>
            </el-table-column>
            <el-table-column
              prop="maximum_pier_height"
              label="Max pier height(ft)"
              width="auto"
            >
              <template slot="header">
                <el-popover
                  ref="popover-maximum-pier-height"
                  placement="bottom-start"
                  width="260"
                  popper-class="el-popover-self"
                  trigger="hover"
                  :visible-arrow="false"
                >
                  <span
                    slot="reference"
                    class="column-on-hover"
                  >Max pier height(ft)</span>
                  <FastFilter
                    filter-for="RACKING-TRACKER-max-pier-height"
                    placeholder="Please input model"
                    fast-filter-type="InputFastFilter"
                    @fast-filter="handleFastFilter"
                  />
                </el-popover>
                <Sorter
                  ref="sorter-maxium-pier-height"
                  sorter-type="sorter-maxium-pier-height"
                  sort-by="maximum_pier_height"
                  @on-sort="handleSort"
                />
                <FastFilteredIcon
                  ref="fast_filtered_icon_maximum_pier_height"
                  @cancel="handleCancelFastFilter"
                />
              </template>
            </el-table-column>
            <el-table-column
              prop="pile_position"
              label="Pile position"
            >
              <template slot="header">
                <el-popover
                  ref="popover-pile-position"
                  placement="bottom-start"
                  width="260"
                  popper-class="el-popover-self"
                  trigger="hover"
                  :visible-arrow="false"
                >
                  <span
                    slot="reference"
                    class="column-on-hover"
                  >Pile position</span>
                  <FastFilter
                    filter-for="RACKING-TRACKER-pile-position"
                    placeholder="Please input model"
                    fast-filter-type="InputFastFilter"
                    @fast-filter="handleFastFilter"
                  />
                </el-popover>
                <Sorter
                  ref="sorter-pile-position"
                  sorter-type="sorter-pile-position"
                  sort-by="pile_position"
                  @on-sort="handleSort"
                />
                <FastFilteredIcon
                  ref="fast_filtered_icon_pile_position"
                  @cancel="handleCancelFastFilter"
                />
              </template>
            </el-table-column>
            <el-table-column
              prop="created_at"
              label="Creation time"
            >
              <template slot="header">
                <el-popover
                  ref="popover-creation-time"
                  placement="bottom-start"
                  width="260"
                  popper-class="el-popover-self"
                  trigger="hover"
                  :visible-arrow="false"
                >
                  <span
                    slot="reference"
                    class="column-on-hover"
                  >Creation time</span>
                  <FastFilter
                    filter-for="RACKING-TRACKER-creation-time"
                    placeholder="Please input model"
                    fast-filter-type="DateRangeFastFilter"
                    @fast-filter="handleFastFilter"
                  />
                </el-popover>
                <Sorter
                  ref="sorter-creation-time"
                  sorter-type="sorter-creation-time"
                  sort-by="created_at"
                  @on-sort="handleSort"
                />
                <FastFilteredIcon
                  ref="fast_filtered_icon_creation_time"
                  @cancel="handleCancelFastFilter"
                />
              </template>
              <template slot-scope="scope">
                {{ transFormat(scope.row.created_at) }}
              </template>
            </el-table-column>
            <el-table-column
              fixed="right"
              label="Action"
              width="180"
            >
              <template slot-scope="scope">
                <i
                  class="el-icon-view table-icon animate"
                  @click="handleView(scope.row)"
                />
                <i
                  v-if="editVisible"
                  class="el-icon-edit table-icon animate"
                  @click="handleEdit(scope.row)"
                />
                <i
                  v-if="editVisible"
                  class="el-icon-delete table-icon animate"
                  @click="handleDelete(scope.row)"
                />
              </template>
            </el-table-column>
          </el-table>
          <div class="page-gatation">
            <NormalPagination
              :total-rows="totalRows"
              :page-size="pageSize"
              :current-page="currentPage"
              @page-change="handlePageChange"
              @page-size-change="handlePageSizeChange"
            />
          </div>
        </div>
      </template>
    </Card>
  </div>
</template>
<!-- eslint-disable prefer-destructuring -->
<script>
import Card from '@/components/Card.vue';
import FastFilter from '@/views/project/components/FastFilter.vue';
import Sorter from '@/views/project/components/Sorter.vue';
import FastFilteredIcon from '@/views/project/components/FastFilteredIcon.vue';
import NormalPagination from '@/components/NormalPagination.vue';
import TogglableSearchBar from '@/components/common/TogglableSearchBar.vue';
import TableFilter from '@/components/TableFilter.vue';
import { trackerList, deleteTracker, manufacturerList, solarList } from '@/api/index.js';

// let clearFilterRouteNames = [
//   'ProjectList',
//   'FormalProjectList',
//   'SolarList',
//   'trackerList',
//   'customerList',
//   'personnelList',
//   'teamList',
//   'Dashboard'
// ];

export default {
  name: '',
  components: {
    Card,
    TableFilter,
    TogglableSearchBar,
    NormalPagination,
    FastFilter,
    Sorter,
    FastFilteredIcon
  },
  beforeRouteLeave(to, from, next) { 
    if (
      to.name === 'trackerDetail'
    ) { 
      from.meta.keepAlive = true;
    }
    else { 
      from.meta.keepAlive = false;
    }
    next();
  },
  data() {
    return {
      fastFilterIcon: '',
      fastFilterIconRefs: [
        'fast_filtered_icon_model',
        'fast_filtered_icon_manufacturer',
        'fast_filtered_icon_bha_gap_width',
        'fast_filtered_icon_motor_gap_width',
        'fast_filtered_icon_maximum_pier_height',
        'fast_filtered_icon_pile_position',
        'fast_filtered_icon_creation_time'
      ],
      sorterRefsList: [
        'sorter-model',
        'sorter-mfr',
        'sorter-bha-gap-width',
        'sorter-motor-gap-width',
        'sorter-maxium-pier-height',
        'sorter-pile-position',
        'sorter-creation-time'
      ],
      //从编辑页面回列表页的话，因为有一些持久化的数据，比如保留页码，筛选条件等，因此不希望页面进行初始化数据获取，否则会覆盖。
      preventInitialList: false,
      searchVal: '',
      form: {
        manufacturer: '',
        series: ''
      },
      tableData: [],
      manufacturerOptions: [],
      totalRows: 0,
      currentPage: 1,
      pageSize: 0,
      filterFormData: {},
      editVisible: false,
      underFilter: false,
      yPosition: 0,
      filterFor: 'racking-tracker'
    };
  },
  mounted() {
    this.justifyRole();
    if (!this.preventInitialList) {
      this.getTableData();
    }
    //监听滚动条位置
    window.addEventListener('scroll', this.getYposition);
    this.getManufacturers();
  },
  activated() { 
    if (this.$route.meta.isEdit) {
      this.tableData = [];
      this.getTableData();
    }
    this.$route.meta.isEdit = false;
  },
  //销毁监听
  beforeDestroy() {
    window.removeEventListener('scroll', this.getYposition, false);
  },
  methods: {
    getManufacturers() {
      manufacturerList({ type: 2 })
        .then((res) => {
          if (res.code === 200) {
            res.data.forEach((item) => {
              this.manufacturerOptions.push({
                id: item.id,
                label: item.mfr_name,
                value: item.mfr_no
              });
            });
          }
          return;
        })
        .catch((err) => {
          return err
        });
    },
    handleFastFilter(val, filterType, filterFor) {
      let filterForm = {
        page: this.currentPage,
        search: this.searchVal,
        mfr_id: '',
        series_id: '',
        bha_gap_width: '',
        motor_gap_width: '',
        max_pier_height: '',
        pile_position: '',
        created_time_start: '',
        maximum_pier_height: '',
        created_time_end: ''
      };
      if (filterFor === 'RACKING-TRACKER-model') {
        filterForm.model = val;
        this.currentPage = 1;
        this.fastFilter(filterForm);
        this.fastFilterIcon = 'fast_filtered_icon_model';
        this.showFastFilterIccon();
        this.$refs['fast_filtered_icon_model'].applyContent(val);
      }
      if (filterFor === 'RACKING-TRACKER-manufacturer') {
        filterForm.manufacturer = val.label;
        this.currentPage = 1;
        this.fastFilter(filterForm);
        this.fastFilterIcon = 'fast_filtered_icon_manufacturer';
        this.showFastFilterIccon();
        this.$refs['fast_filtered_icon_manufacturer'].applyContent(val.label);
      }
      if (filterFor === 'RACKING-TRACKER-BHA-gap-width') {
        filterForm.bha_gap_width = val;
        this.currentPage = 1;
        this.fastFilter(filterForm);
        this.fastFilterIcon = 'fast_filtered_icon_bha_gap_width';
        this.showFastFilterIccon();
        this.$refs['fast_filtered_icon_bha_gap_width'].applyContent(val);
      }
      if (filterFor === 'RACKING-TRACKER-motor-gap-width') {
        filterForm.motor_gap_width = val;
        this.currentPage = 1;
        this.fastFilter(filterForm);
        this.fastFilterIcon = 'fast_filtered_icon_motor_gap_width';
        this.showFastFilterIccon();
        let value = val.value === 1 ? 'Yes' : 'N/A';
        this.$refs['fast_filtered_icon_motor_gap_width'].applyContent(value);
      }
      if (filterFor === 'RACKING-TRACKER-max-pier-height') {
        filterForm.maximum_pier_height = val;
        this.currentPage = 1;
        this.fastFilter(filterForm);
        this.fastFilterIcon = 'fast_filtered_icon_maximum_pier_height';
        this.showFastFilterIccon();
        this.$refs['fast_filtered_icon_maximum_pier_height'].applyContent(val);
      }
      if (filterFor === 'RACKING-TRACKER-pile-position') {
        filterForm.pile_position = val;
        this.currentPage = 1;
        this.fastFilter(filterForm);
        this.fastFilterIcon = 'fast_filtered_icon_pile_position';
        this.showFastFilterIccon();
        this.$refs['fast_filtered_icon_pile_position'].applyContent(val);
      }
      if (filterFor === 'RACKING-TRACKER-creation-time') {
        filterForm.created_time_start = val[0];
        filterForm.created_time_end = val[1];
        this.currentPage = 1;
        this.fastFilter(filterForm);
        this.fastFilterIcon = 'fast_filtered_icon_creation_time';
        this.showFastFilterIccon();
        let value = `${val[0]} - ${val[1]}`;
        this.$refs['fast_filtered_icon_creation_time'].applyContent(value);
      }
    },
    showFastFilterIccon() {
      this.fastFilterIconRefs.forEach((item) => {
        if (item === this.fastFilterIcon) {
          this.$refs[item].show();
        } else {
          this.$refs[item].hide();
        }
      });
    },
    fastFilter(filterForm) {
      trackerList(filterForm)
        .then((res) => {
          if (res.code === 200) {
            this.tableData = res.data.data;
            this.totalRows = res.data.total;
          }
        })
        .catch((err) => {
          return err
        });
    },
    clearOtherSorterStyle(sorterType) {
      this.sorterRefsList.forEach((item) => {
        if (this.$refs[item] && item !== sorterType) {
          this.$refs[item].reset();
        }
      });
    },
    handleSort(order, sorterType, sortBy) {
      this.order = order;
      this.orderBy = order ? sortBy : '';
      this.clearOtherSorterStyle(sorterType);
      let params = {
        type: 1,
        page: 1,
        limit: this.pageSize,
        archiving: 0,
        order: this.order,
        order_by: this.orderBy
      };
      solarList(params)
        .then((res) => {
          if (res.code === 200) {
            this.tableData = res.data.data;
            this.totalRows = res.data.total;
            this.currentPage = 1;
          }
        })
        .catch((err) => {
          return err
        });
    },
    handleCancelFastFilter() {
      this.fastFilterIconRefs.forEach((item) => {
        this.$refs[item].hide();
      });
      this.currentPage = 1;
      this.searchVal = '';
      this.getTableData();
    },
    scrollPage() {
      this.$nextTick(() => {
        window.scrollTo(0, this.$store.state.app.trackerListLastPosition);
        this.$store.dispatch('app/changeTrackerListLastPosition', 0);
      });
    },
    handlePageChange(page) {
      this.currentPage = page;
      this.getTableData();
    },
    handlePageSizeChange(size) {
      this.pageSize = Number(size);
      this.currentPage = 1;
      this.getTableData();
    },
    //获取滚动条位置
    getYposition() {
      let {scrollY} = window;
      this.yPosition = scrollY;
    },
    justifyRole() {
      let limits = JSON.parse(localStorage.getItem('limits'));
      if (limits['project_phase_detail']['module_n_tracker_add']) {
        this.editVisible = true;
      }
    },
    handleOnFilter(formData, currentPage) {
      this.filterFormData = formData;
      this.formatTimeRange();
      this.underFilter = true;
      this.currentPage = currentPage;
      this.toFilter();
    },
    //进行过滤
    toFilter() {
      let params = {
        page: this.currentPage,
        search: this.filterFormData.series,
        mfr_id: this.filterFormData.manufacturer,
        created_time_start: this.filterFormData.creationTimeFrom,
        created_time_end: this.filterFormData.creationTimeTo
      };
      trackerList(params)
        .then((res) => {
          if (res.code === 200) {
            this.tableData = res.data.data;
            this.totalRows = res.data.total;
            this.pageSize = res.data.per_page;
          }
        })
        .catch((err) => {
          return err
        })
        .finally(() => {
          this.scrollPage();
        });
    },
    formatTimeRange() {
      if (this.filterFormData.quoteDueDateFrom) {
        this.filterFormData.quoteDueDateFrom = this.filterFormData
          .quoteDueDateStart
          ? this.transFormat(this.filterFormData.quoteDueDateStart)
          : '';
      }
      if (this.filterFormData.quoteDueDateTo) {
        this.filterFormData.quoteDueDateTo = this.filterFormData.quoteDueDateEnd
          ? this.transFormat(this.filterFormData.quoteDueDateEnd, true)
          : '';
      }
      if (this.filterFormData.creationTimeFrom) {
        this.filterFormData.creationTimeFrom = this.filterFormData
          .creationTimeFrom
          ? this.transFormat(this.filterFormData.creationTimeFrom)
          : '';
      }
      if (this.filterFormData.creationTimeTo) {
        this.filterFormData.creationTimeTo = this.filterFormData.creationTimeTo
          ? this.transFormat(this.filterFormData.creationTimeTo, true)
          : '';
      }
    },
    //转换时间戳
    transFormat(time) {
      // let date = new Date(time);
      // let year = date.getFullYear();
      // let month = date.getMonth() + 1;
      // let day = date.getDate();
      // // let hour = date.getHours()-8;
      // let hour = date.getHours();
      // let minute = date.getMinutes();
      // let second = date.getSeconds();
      // if (month < 10) {
      //     month = `0${month}`;
      // }
      // if (day < 10) {
      //     day = `0${day}`;
      // }
      // if (hour < 10) {
      //     hour = `0${hour}`;
      // }
      // if (minute < 10) {
      //     minute = `0${minute}`;
      // }
      // if (second < 10) {
      //     second = `0${second}`;
      // }
      //     //判断是否为截至日期项，该项的分和秒要写成当天的23时59分59秒，否则正常传
      //     if(endTime){
      //     return `${year}-${month}-${day} 23:59:59`;
      // }
      // else {
      // return `${year}-${month}-${day} ${hour}:${minute}:${second}`;
      // }
      return time;
    },
    async getTableData() {
      this.underFilter = false;
      await trackerList({
        page: this.currentPage,
        search: this.searchVal,
        limit: this.pageSize
      })
        .then((res) => {
          if (res.code === 200) {
            this.tableData = res.data.data;
            this.totalRows = res.data.total;
            this.pageSize = res.data.per_page;
          }
          return;
        })
        .catch((err) => {
          return err
        })
        .finally(() => {
          //从vuex中拿数据，滚动条回到之前的位置，并且重置vuex中的位置
          this.scrollPage();
        });
    },
    handleSearch(searchVal) {
      this.currentPage = 1;
      this.searchVal = searchVal;
      this.getTableData();
    },
    handlePage(num) {
      this.currentPage = num;
      this.$store.dispatch('app/storeProjectListCurrentPage', num);
      if (this.underFilter) {
        this.toFilter();
      } else {
        this.getTableData();
      }
    },

    /**新增 */
    handleAdd() {
      this.$router.push({
        path: '/index/racking-tracker/form',
        query: {
          mode: 'add'
        }
      });
    },

    /**详情 */
    handleView(row) {
      this.$router.push(`/index/racking-tracker/detail/${row.id}`);
    },

    /**编辑 */
    handleEdit(row) {
      this.$router.push({
        path: '/index/racking-tracker/form',
        query: {
          mode: 'edit',
          id: row.id
        }
      });
    },

    /**删除 */
    handleDelete(row) {
      this.$confirm('Are you sure to delete this item?', 'Tips', {
        confirmButtonText: 'Confirm',
        cancelButtonText: 'Cancel',
        type: 'warning'
      })
        .then(() => {
          this.removeTracker(row);
        })
        .catch(() => { return });
    },
    async removeTracker(row) {
      await deleteTracker(row.id)
        .then((res) => {
          if (res.code === 200) {
            this.$message({
              message: 'Done',
              type: 'success'
            });
            this.getTableData();
          } else {
            // this.$message.error(res.message);
          }
          return;
        })
        .catch((err) => {
          return err
        });
    }
  }
};
</script>

<!-- <style lang="less" scoped>
.page-container{
    display: flex;
    flex-direction: column;
    min-height:calc(100vh - 90px);
    .card-templete{
        flex:1;
        .table-wrapper{
            width: 100%;
        }
    }
    .table-search{
        display:flex;
        align-items: center;
        .input{
            cursor:pointer;
        }
        .new-btn{
            width:60px;
            text-align: right;
        }
    }
    .page-gatation{
        text-align: center;
        margin-top:20px;
    }
}
:deep(.el-dialog__header){
    background: rgb(244,244,244);
}
</style> -->

<style lang="less" scoped>
.page-container {
  display: flex;
  flex-direction: column;
  min-height: calc(100vh - 90px);

  .card-templete {
    flex: 1;

    .table-wrapper {
      width: 100%;

      .table-tag {
        min-width: 50px;
        text-align: center;
      }
    }
  }

  .table-search {
    display: flex;
    align-items: center;
    justify-content: center;

    .input {
      margin-right: 10px;
      cursor: pointer;
    }

    .new-btn {
      width: 65px;
      text-align: right;
    }
  }

  .project-name:hover {
    cursor: pointer;
    color: #007bff;
  }
}

.page-gatation {
  text-align: center;
  margin-top: 20px;
}
</style>
