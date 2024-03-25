<template>
  <div class="bidding-project-filter">
    <el-form
      ref="formProject"
      :model="formData"
      :inline="true"
      label-width="140"
      style="margin-left: 15px"
    >
      <el-row>
        <el-col :span="6">
          <el-form-item label="Role">
            <el-select
              v-model="formData.user_role"
              filterable
              clearable
              placeholder="Please input and select"
              size="small"
              style="width: 280px"
            >
              <el-option
                v-for="item in roleOptions"
                :key="item.id"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </el-form-item>
          <el-form-item label="Reject or not">
            <el-select
              v-model="formData.is_rejected"
              filterable
              clearable
              placeholder="Please input and select"
              size="small"
              style="width: 280px"
            >
              <el-option
                v-for="(item, key) in yesOrNoOptions"
                :key="key"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </el-form-item>
          <el-form-item label="Phase No.">
            <el-input
              v-model="formData.progress_no"
              size="small"
              style="width: 280px"
              clearable
              placeholder="Enter phase No. to search"
            />
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="Name">
            <el-input
              v-model="formData.user_name"
              size="small"
              style="width: 280px"
              clearable
              placeholder="Enter name to search"
            />
          </el-form-item>
          <el-form-item label="Reject reason">
            <el-select
              v-model="formData.reason"
              filterable
              clearable
              placeholder="Please input and select"
              size="small"
              style="width: 280px"
            >
              <el-option
                v-for="(item, key) in rejectReasonList"
                :key="key"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </el-form-item>
          <el-form-item label="Phase">
            <el-select
              v-model="formData.phase"
              filterable
              clearable
              placeholder="Please input and select"
              size="small"
              style="width: 280px"
            >
              <el-option
                v-for="(item, key) in phaseList"
                :key="key"
                :label="item.label"
                :value="item.label"
              />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="Title">
            <el-input
              v-model="formData.title"
              size="small"
              style="width: 280px"
              clearable
              placeholder="Enter title to search"
            />
          </el-form-item>
          <el-form-item label="Project name">
            <el-input
              v-model="formData.project_name"
              size="small"
              style="width: 280px"
              clearable
              placeholder="Enter overdue time to search"
            />
          </el-form-item>
          <el-form-item label="Review time">
            <DataRangePicker
              v-model="reviewTime"
              style="width: 220px"
              type="review-date"
              @input-start-date="addDate"
              @input-end-date="addDate"
            />
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="Type">
            <el-select
              v-model="formData.type"
              filterable
              clearable
              placeholder="Please input and select"
              size="small"
              style="width: 280px"
            >
              <el-option
                v-for="(item, key) in typeOptions"
                :key="key"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </el-form-item>
          <el-form-item label="Project No.">
            <el-input
              v-model="formData.project_no"
              size="small"
              style="width: 280px"
              clearable
              placeholder="Enter project No. to search"
            />
          </el-form-item>
          <div class="submit-btns">
            <el-button
              size="small"
              @click="resetForm"
            >
              Reset
            </el-button>
            <el-button
              class="form-confirm-btn"
              size="small"
              @click="filterList"
            >
              Confirm
            </el-button>
          </div>
        </el-col>
      </el-row>
    </el-form>
  </div>
</template>

<script>
import DataRangePicker from './components/DateRangePicker.vue';
import { getLastDay } from '@/utils/commons.js';
import { userList } from '@/api/index.js';

export default {
  components: {
    DataRangePicker
  },
  data() {
    return {
      formData: {
        user_role: '',
        user_name: '',
        type: '',
        title: '',
        is_overdue: '',
        overdue_time_start: '',
        overdue_time_end: '',
        project_name: '',
        project_no: '',
        progress_no: '',
        phase: '',
        due_date_start: '',
        due_date_end: '',
        completed_at_start: '',
        completed_at_end: '',
        work_due_date_start: '',
        work_due_date_end: '',
        is_rejected: '',
        reason: ''
      },
      phaseList: [
        {
          value: 5,
          label: 'Site Plan'
        },
        {
          value: 10,
          label: '10%'
        },
        {
          value: 30,
          label: '30%'
        },
        {
          value: 50,
          label: '50%'
        },
        {
          value: 60,
          label: '60%'
        },
        {
          value: 75,
          label: '75%'
        },
        {
          value: 90,
          label: '90%'
        },
        {
          value: 100,
          label: 'IFP'
        },
        {
          value: 110,
          label: 'IFC'
        },
        {
          value: 120,
          label: 'IFC Rev1'
        },
        {
          value: 130,
          label: 'IFC Rev2'
        },
        {
          value: 140,
          label: 'IFC Rev3'
        },
        {
          value: 150,
          label: 'IFC Rev4'
        },
        {
          value: 160,
          label: 'IFC Rev5'
        }
      ],
      typeOptions: [
        {
          id: 1,
          label: 'Bidding',
          value: 1
        },
        {
          id: 2,
          label: 'Formal',
          value: 2
        },
        {
          id: 3,
          label: 'Label',
          value: 3
        },
        {
          id: 4,
          label: '3D bidding',
          value: 4
        },
        {
          id: 5,
          label: '3D formal',
          value: 5
        },
        {
          id: 6,
          label: 'Simulation',
          value: 6
        }
      ],
      yesOrNoOptions: [
        {
          id: 1,
          label: 'Yes',
          value: 1
        },
        {
          id: 2,
          label: 'No',
          value: 0
        }
      ],
      rejectReasonList: [
        {
          key: 1,
          label: 'Customer updates',
          value: 'Customer updates'
        },
        {
          key: 2,
          label: 'Drawing errors',
          value: 'Drawing errors'
        },
        {
          key: 3,
          label: 'Quote errors',
          value: 'Quote errors'
        },
        {
          key: 4,
          label: 'Others',
          value: 'Others'
        }
      ],
      roleOptions: [
        {
          id: 1,
          label: 'Team Leader',
          value: 'Team Leader'
        },
        {
          id: 2,
          label: 'CN Engineer Manager',
          value: 'CN Engineer Manager'
        },
        {
          id: 3,
          label: '3D Team Leader',
          value: '3D Team Leader'
        },
        {
          id: 4,
          label: '3D Manager',
          value: '3D Manager'
        }
      ],
      creationTime: [],
      teamDueDate: [],
      customerOptions: [],
      teamOptions: [],
      creatorList: [],
      reviewTime: [],
      projectStatusOptions: [
        {
          value: 1,
          label: 'Bidding'
        },
        {
          value: 2,
          label: 'Win'
        },
        {
          value: 3,
          label: 'Win Via Another EPC'
        },
        {
          value: 4,
          label: 'Lost'
        },
        {
          value: 5,
          label: 'On-hold'
        },
        {
          value: 6,
          label: 'Canceled'
        }
      ],
      quoteStatusOptions: [
        {
          label: 'Pending US engineer review',
          value: 'US_TO_BE_SEND'
        },
        {
          label: 'Pending assign design team',
          value: 'US_HAS_BEEN_SEND'
        },
        {
          label: 'Team assigned & Pending quote',
          value: 'CN_ASSIGNED'
        },
        {
          label: 'Quote submited & Pending CN approval',
          value: 'CN_TEAM_ALREADY_APPLIED'
        },
        {
          label: 'Quote rejected & Pending re-quote',
          value: 'CN_REJECTED'
        },
        {
          label: 'Pending US approval',
          value: 'CN_PASSED'
        },
        {
          label: 'US engineer rejected',
          value: 'US_REJECTED'
        },
        {
          label: 'Quote released',
          value: 'US_PASSED'
        },
        {
          label: 'Quote sent',
          value: 'QUOTE_SENT'
        },
        {
          label: 'Win & Pending US engineer final review',
          value: 'WIN'
        },
        {
          label: 'Final review approval',
          value: 'US_FINAL_PASSED'
        }
      ],

      solutionOptions: [
        {
          value: 'Harness',
          label: 'Harness'
        },
        {
          value: 'Lynx',
          label: 'Lynx'
        },
        {
          value: 'Alex',
          label: 'Alex'
        }
      ],
      archivingOptions: [
        {
          value: 1,
          label: 'Archived'
        },
        {
          value: 0,
          label: 'Unarchived'
        }
      ]
    };
  },
  computed: {
    filterFieldSelected() {
      let num = Object.values(this.formData).filter((value) => {
        return (
          value !== '' && value !== undefined && value !== null && value !== 0
        );
      }).length;
      return num;
    }
  },
  methods: {
    setRole(role, months, projectType) {
      switch(role) {
        case 1:
this.userRole = 'Team Leader';
        break;
        case 2:
this.userRole = 'CN Engineer Manager';
        break;
        case 3:
this.userRole = '3D Team Leader';
        break;
        case 4:
this.userRole = '3D Manager';
          break
          default:
            break
      }
      let firstDayofMonthFrom = `${months[0]}-01`;
      let lastDayofMonthTo = getLastDay(
        Number(months[1].split('-')[0]),
        Number(months[1].split('-')[1])
      );
      let from = `${firstDayofMonthFrom} ` + '00:00:00';
      let to = `${months[1]}-${lastDayofMonthTo}` + ' ' + '23:59:59';
      this.reviewTime = [from, to];
      this.formData.completed_at_start = from;
      this.formData.completed_at_end = to;
      this.formData.type = projectType;
    },
    addDate(val, dueDateType, startOrEnd) {
      if (dueDateType === 'review-date') {
        if (startOrEnd === 'start') {
          this.formData.completed_at_start = val;
        } else {
          this.formData.completed_at_end = val;
        }
      }
    },
    getWholeUserList() {
      userList()
        .then((res) => {
          if (res.code === 200) {
            let pageNum = res.data.total / res.data.per_page;
            this.totalUserPage = Math.ceil(pageNum);
            // for (let i = 0; i < this.totalUserPage; i++) {
            //   this.getUserList(i + 1);
            // }
            this.creatorList = res.data.data;
          }
        })
        .catch((err) => {
          return err;
        });
    },
    // getUserList(pageNum) {
    //   userList({ page: pageNum })
    //     .then((res) => {
    //       if (res.code === 200) {
    //         this.creatorList = this.creatorList.concat(res.data.data);
    //       }
    //       return;
    //     })
    //     .catch((err) => {
    //       return err;
    //     });
    // },
    filterList() {
      this.$emit('on-filter', { ...this.formData }, this.filterFieldSelected);
    },
    resetForm() {
      this.formData = {
        user_role: '',
        user_name: '',
        type: '',
        title: '',
        is_overdue: '',
        overdue_time_start: '',
        overdue_time_end: '',
        project_name: '',
        project_no: '',
        progress_no: '',
        phase: '',
        due_date_start: '',
        due_date_end: '',
        completed_at_start: '',
        completed_at_end: '',
        work_due_date_start: '',
        work_due_date_end: '',
        is_rejected: '',
        reason: ''
      };
      this.reviewTime = [];
    }
  }
};
</script>

<style lang="less" scoped>
.bidding-project-filter {
  margin-right: 5px;

  .submit-btns {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    margin-right: 35px;
  }
}
</style>
