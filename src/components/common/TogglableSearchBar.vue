<template>
  <div
    class="toggle-searchbar-container"
    :class="{ 'border-display': showSearchBar, ...searchContainerClass }"
  >
    <input
      v-if="showSearchBar"
      ref="togglalbeSearchBar"
      v-model="inputValue"
      class="search-bar"
      type="text"
      :placeholder="placeholder"
      @keyup.enter="handleSearch"
    >
    <div class="clear-btn">
      <i
        v-if="showSearchBar && inputValue.length > 0"
        class="el-icon-close"
        @click.stop="handleClear"
      />
    </div>
    <div
      class="search-button"
      @click="toggleShowSearchbar"
    >
      <img
        src="@/assets/IconDesigns/Search.png"
        alt="search"
      >
    </div>
  </div>
</template>

<script>
export default {
  props: {
      placeholder: {
          type: String,
          default: 'Enter title to search'
      }   
  },
  data() {
      return {
          showSearchBar: false,
          inputValue: '',
          isInputEmpty: true
      }
  },
  computed: {
      searchContainerClass() {
          return {
              'expanded': this.showSearchBar
          };
      }
  },
  methods: {
      toggleShowSearchbar() {
          this.showSearchBar = !this.showSearchBar;
          if (this.showSearchBar) {
              this.$nextTick(() => {
                if(this.$refs.togglalbeSearchBar) {
                  this.$refs.togglalbeSearchBar.focus();
                }
              });
          }
      },
      handleSearch() {
          this.$emit('on-search', this.inputValue);
      },
      handleClear() {
          this.inputValue = '';
         if(this.$refs.togglalbeSearchBar) {
                  this.$refs.togglalbeSearchBar.focus();
                }
      }
  }
}
</script>

<style lang="less" scoped>
.clear-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 20px;
  height: 20px;
  background-color: #fff;
  border-radius: 50%;
  cursor: pointer;
  transition: opacity 0.1s ease-in-out;

  &:hover {
      background-color: #f0f0f0;
  }

  i {
      font-size: 14px;
      color: #999;
      transition: color 0.3s ease-in-out;
  }

  &:hover i {
      color: #333;
  }
}

.toggle-searchbar-container {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  height: 26px;
  width: 35px;
  border: 1px solid transparent;
  // box-shadow: -1px 2px 4px rgba(187, 180, 180, 0.2);
  margin-bottom: 1px;
  border-radius: 4px;
  overflow: hidden;
  transition: width 0.5s ease-in-out;

  &.border-display {
      border: 1px solid #D9D9D9;
      width: 240px
  }

  :hover {
      opacity: 0.8;

      /* 设置半透明度，可以根据需要调整值 */
      background: #fff;

      /* 设置背景颜色，也可以根据需要调整值 */
  }
}

.search-button {
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
      cursor: pointer;
  }

  img {
      width: 20px;
      height: 20px;
      padding: 8px;
  }
}

.search-bar {
  margin-left: 10px;
  flex: 1;
  border: none;
  background-color: transparent;
  padding-left: 10px;

  &:focus {
      outline: none;
      border: none;
  }
}

.search-bar::placeholder {
  color: #a7acb3;
}
</style>