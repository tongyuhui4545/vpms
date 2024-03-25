<template>
  <div class="tag-person-container">
    <div class="input-area">
      <el-input
        v-model="personNameForSearch"
        placeholder="Enter name to search"
        suffix-icon="el-icon-search"
        size="mini"
        @input="searchPerson"
      />
    </div>
    <div class="person-list">
      <PersonOption
        v-for="person in personList"
        :key="person.name"
        :person="person"
        @person-chosen="handleChoosePerson"
      />
    </div>
  </div>
</template>

<script>
import PersonOption from './PersonOption'
import {userList} from '@/api/index.js';
export default {
  components: {
      PersonOption
  },
  data() {
      return {
          personNameForSearch: '',
          totalUserPage: 0,
          personList: [
          ]
      }
  },
  mounted() {
      this.getUserList();
  },
  methods: {
      handleChoosePerson(person) {
          this.$emit('person-chosen', person)
      },
      searchPerson(val) {
          this.personList = [];
          if (val === '') {
              this.getUserList();
          } else { 
              userList({ page: 1, name: val })
                  .then((res) => {
                      if (res.code === 200) { 
                          this.personList = res.data.data;
                      }
                  })
                  .catch((err) => {
                      return err
                  });
          }
      },
      // getWholeUserList() {
      //     userList()
      //         .then((res) => {
      //             if (res.code === 200) {
      //                 let pageNum = res.data.total / res.data.per_page;
      //                 this.totalUserPage = Math.ceil(pageNum);
      //                 for (let i = 0; i < this.totalUserPage; i++) {
      //                     this.getUserList(i + 1);
      //                 }
      //             }
      //         })
      //         .catch((err) => {
      //             return err
      //         });
      // },
      getUserList() {
          userList()
              .then((res) => {
                  if (res.code === 200) {
                      this.personList = (res.data.data);
                  }
                  return;
              })
              .catch((err) => {
                  return err
              });
      }
  }
}
</script>

<style lang="less" scoped>
.tag-person-container {
  width: 184px;
  height: 296px;
  background: #FFFFFF;
  box-shadow: 0px 2px 4px 1px rgba(0, 0, 0, 0.1);
  border-radius: 4px 4px 4px 4px;
  overflow-y: auto;

  person-list {
      margin-left: 0px;
  }

  .input-area {
      margin: 16px 12px 19px 12px
  }
}
</style>