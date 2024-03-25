<template>
  <div class="page-container">
    <!--Solar列表-->
    <Card class="card-templete">
      <template #cardHeader>
        <span class="iconfont icon-kaiguan card-icon" />
        Solar module
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
            style="margin-top: 3px"
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
              prop="model"
              label="Model"
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
                    filter-for="SOLAR-MOUDLE-model"
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
                <div
                  class="project-name"
                  @click="handleView(scope.row)"
                >
                  {{ scope.row.model }}
                </div>
              </template>
            </el-table-column>
            <el-table-column
              prop="manufacturer"
              label="Manufacturer"
              width="auto"
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
                    filter-for="SOLAR-MOUDLE-manufacturer"
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
              prop="module_type"
              label="Module series"
              width="auto"
            >
              <template slot="header">
                <el-popover
                  ref="popover-series"
                  placement="bottom-start"
                  width="260"
                  popper-class="el-popover-self"
                  trigger="hover"
                  :visible-arrow="false"
                >
                  <span
                    slot="reference"
                    class="column-on-hover"
                  >Module series</span>
                  <FastFilter
                    filter-for="SOLAR-MOUDLE-series"
                    placeholder="Please input series"
                    fast-filter-type="InputFastFilter"
                    @fast-filter="handleFastFilter"
                  />
                </el-popover>
                <Sorter
                  ref="sorter-series"
                  sorter-type="sorter-series"
                  sort-by="series"
                  @on-sort="handleSort"
                />
                <FastFilteredIcon
                  ref="fast_filtered_icon_series"
                  @cancel="handleCancelFastFilter"
                />
              </template>
            </el-table-column>
            <el-table-column
              prop="is_bifacial"
              label="Bifacial"
            >
              <template slot="header">
                <el-popover
                  ref="popover-bifacial"
                  placement="bottom-start"
                  width="180"
                  popper-class="el-popover-self"
                  trigger="hover"
                  :visible-arrow="false"
                >
                  <span
                    slot="reference"
                    class="column-on-hover"
                  >Bifacial</span>
                  <FastFilter
                    filter-for="SOLAR-MOUDLE-bifacial"
                    placeholder="Please choose bifacial"
                    :options="bifacialOptions"
                    fast-filter-type="SelectFastFilter"
                    @fast-filter="handleFastFilter"
                  />
                </el-popover>
                <Sorter
                  ref="sorter-bifacial"
                  sorter-type="sorter-bifacial"
                  sort-by="bifacial"
                  @on-sort="handleSort"
                />
                <FastFilteredIcon
                  ref="fast_filtered_icon_bifacial"
                  @cancel="handleCancelFastFilter"
                />
              </template>
              <template slot-scope="scope">
                <div v-if="scope.row.is_bifacial == 1">
                  <el-tag size="small">
                    Yes
                  </el-tag>
                </div>
                <div v-else>
                  <el-tag
                    type="warning"
                    size="small"
                  >
                    N/A
                  </el-tag>
                </div>
              </template>
            </el-table-column>
            <!-- <el-table-column
                            prop="junction_box_location"
                            label="Junction box location"
                            width="160">
                        </el-table-column>
                        <el-table-column
                            prop="connector"
                            label="Connector"
                            width="160">
                        </el-table-column>
                        <el-table-column
                            prop="output_cable_pos"
                            label="Output cable - positive (mm)"
                            width="200">
                        </el-table-column>
                        <el-table-column
                            prop="output_cable_neg"
                            label="Output cable - negative (mm)"
                            width="200">
                        </el-table-column> -->
            <el-table-column
              prop="created_at"
              label="Creation time"
              width="auto"
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
                    filter-for="SOLAR-MOUDLE-creation-time"
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
                {{ transFormat(scope.row.created_at, false) }}
              </template>
            </el-table-column>>
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
          <div
            v-if="!tableLoading"
            class="page-gatation"
          >
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
import TableFilter from '@/components/TableFilter.vue';
import FastFilter from '@/views/project/components/FastFilter.vue';
import Sorter from '@/views/project/components/Sorter.vue';
import FastFilteredIcon from '@/views/project/components/FastFilteredIcon.vue';
import Card from '@/components/Card.vue';
import TogglableSearchBar from '@/components/common/TogglableSearchBar.vue';
import {
  solarList,
  deleteSolar,
  manufacturerList
} from '@/api/index.js';
import NormalPagination from '@/components/NormalPagination.vue';

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
  data() {
    return {
      bifacialOptions: [
        {
          label: 'Yes',
          value: 1
        },
        {
          label: 'N/A',
          value: 0
        }
      ],
      fastFilterIcon: '',
      fastFIlterIconRefs: [
        'fast_filtered_icon_model',
        'fast_filtered_icon_manufacturer',
        'fast_filtered_icon_series',
        'fast_filtered_icon_bifacial',
        'fast_filtered_icon_creation_time'
      ],
      //从编辑页面回列表页的话，因为有一些持久化的数据，比如保留页码，筛选条件等，因此不希望页面进行初始化数据获取，否则会覆盖。
      preventInitialList: false,
      manufacturerOptions: [],
      editVisible: false,
      searchVal: '',
      filterFor: 'solar-module',
      form: {
        manufacturer: '',
        module_type: '',
        model: '',
        is_bifacial: ''
      },
      sorterRefsList: [
        'sorter-model',
        'sorter-mfr',
        'sorter-series',
        'sorter-bifacial',
        'sorter-creation-time'
      ],
      order: '',
      moduleTypeOptions: [],
      modelOptions: [],
      tableLoading: false,
      underFilter: false,
      tableData: [],
      totalRows: 0,
      currentPage: 1,
      pageSize: 0,
      yPosition: 0
    };
  },
  mounted() { 
    this.justifyRole();
    this.getTableData();
    this.getManufacturers();
  },
  methods: {
    getManufacturers() {
      manufacturerList({ type: 1 })
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
        is_bifacial: '',
        created_time_start: '',
        created_time_end: ''
      };
      if (filterFor === 'SOLAR-MOUDLE-model') {
        filterForm.model = val;
        this.currentPage = 1;
        this.fastFilter(filterForm);
        this.fastFilterIcon = 'fast_filtered_icon_model';
        this.showFastFilterIccon();
        this.$refs['fast_filtered_icon_model'].applyContent(val);
      }
      if (filterFor === 'SOLAR-MOUDLE-manufacturer') {
        filterForm.manufacturer = val.label;
        this.currentPage = 1;
        this.fastFilter(filterForm);
        this.fastFilterIcon = 'fast_filtered_icon_manufacturer';
        this.showFastFilterIccon();
        this.$refs['fast_filtered_icon_manufacturer'].applyContent(val.label);
      }
      if (filterFor === 'SOLAR-MOUDLE-series') {
        filterForm.series_id = val;
        this.currentPage = 1;
        this.fastFilter(filterForm);
        this.fastFilterIcon = 'fast_filtered_icon_series';
        this.showFastFilterIccon();
        this.$refs['fast_filtered_icon_series'].applyContent(val);
      }
      if (filterFor === 'SOLAR-MOUDLE-bifacial') {
        filterForm.is_bifacial = val.value;
        this.currentPage = 1;
        this.fastFilter(filterForm);
        this.fastFilterIcon = 'fast_filtered_icon_bifacial';
        this.showFastFilterIccon();
        let value = val.value === 1 ? 'Yes' : 'N/A';
        this.$refs['fast_filtered_icon_bifacial'].applyContent(value);
      }
      if (filterFor === 'SOLAR-MOUDLE-creation-time') {
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
      this.fastFIlterIconRefs.forEach((item) => {
        if (item === this.fastFilterIcon) {
          this.$refs[item].show();
        } else {
          this.$refs[item].hide();
        }
      });
    },
    fastFilter(filterForm) {
      solarList(filterForm)
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
      this.fastFIlterIconRefs.forEach((item) => {
        this.$refs[item].hide();
      });
      this.currentPage = 1;
      this.searchVal = '';
      this.getTableData();
    },
    handlePageChange(page) {
      this.currentPage = page;
      this.getTableData();
    },
    handlePageSizeChange(size) {
      this.currentPage = 1;
      this.pageSize = Number(size);
      this.getTableData();
    },
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
    //当提交了筛选内容
    handleOnFilter(formData, currentPage) {
      this.filterFormData = formData;
      this.formatTimeRange();
      this.underFilter = true;
      this.currentPage = currentPage;
      this.toFilter(); 
    },
    //进行筛选
    toFilter() {
      let params = {
        page: this.currentPage,
        search: this.filterFormData.model,
        mfr_id: this.filterFormData.manufacturer,
        series_id: this.filterFormData.moduleSeries,
        is_bifacial: this.filterFormData.bifacial,
        created_time_start: this.filterFormData.creationTimeFrom,
        created_time_end: this.filterFormData.creationTimeTo
      };
      solarList(params)
        .then((res) => {
          if (res.code === 200) {
            this.tableData = res.data.data;
            this.totalRows = res.data.total;
            // this.pageSize = res.data.per_page;
          }
        })
        .catch((err) => {
          return err
        })
    },
    //转换时间戳
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
      // //判断是否为截至日期项，该项的分和秒要写成当天的23时59分59秒，否则正常传
      // if(endTime){
      //     return `${year}-${month}-${day} 23:59:59`;
      // }
      // else {
      // return `${year}-${month}-${day} ${hour}:${minute}:${second}`;
      // }
      return time;
    },

    /**获取solar列表数据 */
    async getTableData() {
      this.underFilter = false;
      await solarList({
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
          //this.tableLoading = false;
          return;
        })
        .catch((err) => {
          return err
        })
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
        path: '/index/solar-module/form',
        query: {
          mode: 'add'
        }
      });
    },

    /**详情 */
    handleView(row) {
      this.$router.push(`/index/solar-module/detail/${row.id}`);
    },

    /**编辑 */
    handleEdit(row) {
      this.$router.push({
        path: '/index/solar-module/form',
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
          this.removeSolar(row);
        })
        .catch(() => { return });
    },
    async removeSolar(row) {
      await deleteSolar(row.id)
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

    .input {
      margin-right: 10px;
      cursor: pointer;
    }

    .new-btn {
      width: 60px;
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
