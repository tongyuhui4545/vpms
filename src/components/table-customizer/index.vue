<template>
  <div class="customizer-container">
    <el-popover
      v-model="showCustomizer"
      :popper-options="{ showArrow: false }"
      placement="bottom-end"
      popper-class="customizer-popper"
      width="210"
      trigger="click"
    >
      <div class="customizer">
        <div class="header-part">
          <span>Customize</span>
          <i
            class="el-icon-close"
            @click="closePopover"
          />
        </div>
        <div class="search-part">
          <el-input
            v-model="searchVal"
            style="width: 90%"
            size="mini"
            placeholder="Search"
            prefix-icon="el-icon-search"
            clearable
            @clear="handleSearch"
            @keyup.native="handleSearch"
          />
        </div>
        <div class="body-part">
          <el-checkbox
            v-for="(item, index) in fixedColumnsCopy"
            :key="index"
            :label="item"
            :value="true"
            disabled
          />
          <el-checkbox-group
            v-if="alternativeColumns.length > 0"
            v-model="checkList"
            class="column-alternatives"
          >
            <el-checkbox
              v-for="(item, index) in alternativeColumnsCopy"
              :key="index"
              :label="item"
            />
          </el-checkbox-group>
        </div>
        <div class="footer-part">
          <el-button
            type="text"
            size="mini"
            @click="handleSubmit('set')"
          >
            <span>Submit</span>
          </el-button>
        </div>
      </div>
      <img
        slot="reference"
        src="@/assets/IconDesigns/table-customizer.png"
        alt="table-customizer"
      >
    </el-popover>
  </div>
</template>

<script>
import personalTableHeadsConstants from '@/components/table-customizer/personal-table-heads.js';
export default {
  name: '',
  components: {},
  props: {
    fixedColumns: {
      type: Array,
      default: () => {
        return [];
      }
    },
    alternativeColumns: {
      type: Array,
      default: () => {
        return [];
      }
    },
    belongTo: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      showCustomizer: false,
      checkList: [],
      searchVal: '',
      fixedColumnsCopy: [],
      alternativeColumnsCopy: [],
      userInfo: {}
    };
  },
  computed: {},
  watch: {
    fixedColumns: {
      handler(val) {
        this.fixedColumnsCopy = val;
      },
      immediate: true
    },
    alternativeColumns: {
      handler(val) {
        this.alternativeColumnsCopy = val;
      },
      immediate: true
    }
  },
  created() {
    this.userInfo = JSON.parse(localStorage.getItem('user'));
  },
  mounted() { 
    let { role } = this.userInfo;
    let userId = this.userInfo.id;
    //获取localStorage里的personal_tab_heads
    let personal_table_heads = JSON.parse(
      localStorage.getItem('personal_table_heads')
    );
    if (personal_table_heads) {
      //如果存在该用户的自定义表头记录
      if (personal_table_heads[userId]) { 
        let heads = personal_table_heads[userId];
        //如果该用户的自定义表头里存在当前列表的自定义记录
        if (heads[this.belongTo]) {
          this.checkList = heads[this.belongTo];
          this.handleSubmit('init');
        } else {
          this.checkList = personalTableHeadsConstants[role][this.belongTo];
          this.handleSubmit('init');
        }
        return;
      }
    }
    if (personalTableHeadsConstants[role]) { 
      this.checkList = personalTableHeadsConstants[role][this.belongTo];
      this.handleSubmit('init');
    }
  },
  methods: {
    handleSearch() {
     let searchedTempFixedColumns = this.fixedColumns.filter( (item) => {
        let lowerCaseItem = item.toLowerCase();
        let lowerCaseSearchVal = this.searchVal.toLowerCase();       
        if(lowerCaseItem.includes(lowerCaseSearchVal)) { 
          return item
        }
      })
  this.fixedColumnsCopy = searchedTempFixedColumns;
  let searchedTeampAlternativeColumns = this.alternativeColumns.filter( (item) => {
        let lowerCaseItem = item.toLowerCase();
        let lowerCaseSearchVal = this.searchVal.toLowerCase();       
        if(lowerCaseItem.includes(lowerCaseSearchVal)) { 
          return item
        }
      })
  this.alternativeColumnsCopy = searchedTeampAlternativeColumns;
    },
    closePopover() {
      this.showCustomizer = false;
    },
    setTableHeads() {
      //先看localStorage里有没有自定义的表头信息（包含所有列表）
      let userId = this.userInfo.id;
      let personalTableHeads = JSON.parse(
        localStorage.getItem('personal_table_heads')
      );
      //如果存在自定义表头记录
      if (personalTableHeads) { 
        //如果该用户已经存在自定义表头记录
        if (personalTableHeads[userId]) {
          //设定当前列表的表头信息
          personalTableHeads[userId][this.belongTo] = this.checkList;
          localStorage.setItem(
            'personal_table_heads',
            JSON.stringify(personalTableHeads)
          );
        }
        //如果该用户不存在自定义表头记录
        else { 
          //设定当前列表的表头信息
          personalTableHeads[userId] = {};
          personalTableHeads[userId][this.belongTo] = this.checkList;
          localStorage.setItem(
            'personal_table_heads',
            JSON.stringify(personalTableHeads)
          );
        }
      } else {
        let personalTableHeads = {};
        personalTableHeads[userId] = {};
        personalTableHeads[userId][this.belongTo] = this.checkList;
        localStorage.setItem(
          'personal_table_heads',
          JSON.stringify(personalTableHeads)
        );
      }
    },
    handleSubmit(action) {
      this.setTableHeads();
      this.showCustomizer = false;
      let customizedTableColumns = this.fixedColumns.concat(this.checkList);
      this.$emit('table-customized', customizedTableColumns);
      //如果是变更操作，则弹出信息
      if (action === 'set') {
        this.$message.success(
          'Table columns have been successfully customized'
        );
      }
    }
  }
};
</script>
<style lang="less">
.customizer-popper {
  .popper__arrow {
    display: none !important;
  }
}
</style>
<style lang="less" scoped>
.customizer {
  width: 105%;
  display: flex;
  flex-direction: column;
  gap: 10px;
  .header-part {
    display: flex;
    justify-content: space-between;
    i {
      cursor: pointer;
      margin-right: 5px;
    }
  }
  .search-part {
    display: flex;
    justify-content: flex-start;
  }
  .body-part {
    display: flex;
    max-height: 300px;
    overflow: auto;
    flex-direction: column;
    gap: 10px;

    &::-webkit-scrollbar {
      width: 4px;
    }
    &::-webkit-scrollbar-thumb {
      background-color: #ebeef5;
    }
    &::-webkit-scrollbar-track {
      background: #fff;
    }
    .column-alternatives {
      display: flex;
      flex-direction: column;
      gap: 10px;
    }
  }
  .footer-part {
    display: flex;
    justify-content: flex-end;
    span {
      margin-right: 16px;
      color: #007aff;
      font-size: 14px;
    }
  }
}
.customizer-container {
  cursor: pointer;
  img {
    width: 24px;
    height: 24px;
  }
}
</style>
