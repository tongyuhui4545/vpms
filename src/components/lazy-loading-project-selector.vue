<template>
  <div class="project-selector-wrapper">
    <el-select
      ref="elSelect"
      v-model="selectedProject"
      name="el-select-input"
      clearable
      filterable
      remote
      :remote-method="handleSearchProject"
      :size="size"
      :style="styleObj"
      :placeholder="placeHolder"
      @change="handleSelect"
      @visible-change="handleSelectVisible"
    >
      <el-option
        v-for="opt in projectList"
        :key="opt.project_id"
        :label="`${opt.project_no} -
        ${opt.name}`"
        :value="opt.id"
      />
    </el-select>
  </div>
</template>
  
  <script>
  import { projectsList } from '@/api';
  
  export default {
    name: '',
    components: {},
    props: {
      size: {
        type: String,
        default: 'mini'
      },
      styleObj: {
        type: Object,
        default: () => {
          return {
            width: '250px'
          };
        }
      },
      placeHolder: {
        type: String,
        default: 'Please select'
      },
      type: {
        type: String, 
        default: () => {
          return ''
        }
      },
      pickedProjectForRefill: {
        type: Object,
        default: () => {
          return {id:'', name:''}
        }
      }
    },
    data() {
      return {
        search:'',
        projectList: [],
        projectListPage: 1,
        selectedProject: undefined
      };
    },
    computed: {},
    watch: {},
    mounted() {
      this.initProject();
      // this.getProjectList();
    },
    //   created () {},
    methods: {
      fillFormProjectInfo(project) {
        // this.handleSearchProject(name)
        const selectInput = this.$refs.elSelect.$refs.reference.$refs.input;
        selectInput.value = project.name;
        this.handleSelect(project.id); 
        selectInput.dispatchEvent(new Event('input'));
      },
      initProject() {
      let mode = this.type;
      switch(mode) {
        case 'create':
          this.getProjectList();
          break
        case 'create-sub': 
          this.fillFormProjectInfo(this.pickedProjectForRefill);
        break;
        case 'copy':
          break;
        case 'edit': 
        this.fillFormProjectInfo(this.pickedProjectForRefill);
        break;
        case 'restart':
        this.fillFormProjectInfo(this.pickedProjectForRefill);
          break;
        default: this.getProjectList();
      }
    },
      handleSearchProject(val) { 
        this.search = val;
        this.projectListPage = 1;
        this.projectList = [];
        this.getProjectList(this.search);
      },
      resetSelector() {
        this.selectedProject = undefined;
      },
      getProjectList(search) {
        let params = search ? {page: this.projectListPage, search } : {page: this.projectListPage};
        projectsList(params)
          .then((res) => {
            if (res.code === 200) {
              this.projectList = [...this.projectList, ...res.data.data];
            }
          })
          .catch((err) => {
            return err;
          });
      },
      handleSelectVisible() {
        this.$nextTick(() => {
          const selectRef =
            this.$refs['elSelect'].$refs['scrollbar'].$refs['wrap'];
          selectRef.addEventListener('scroll', this.handleScroll);
        });
      },
      handleScroll(event) {
        const el = event.target;
        if (el.scrollHeight - el.scrollTop === el.clientHeight) {
          this.projectListPage++;
          this.getProjectList(this.search);
        }
      },
      handleSelect(val) {
        if(val) {
          this.$emit('select-project', val)
        }
      }
    }
  };
  </script>
  
  <style lang="less" scoped></style>
  