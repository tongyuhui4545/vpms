<template>
  <div class="btn-container">
    <button
      class="btn-primary"
      @click="addNew"
    >
      <i class="el-icon-plus" />
      <span>New</span>
    </button>
  </div>
</template>

<script>
export default {
  name: 'AddNewButton',
  methods: {
    addNew() {
      this.$emit('add-new');
    }
  }
};
</script>

<style>
.btn-container {
  display: flex;
  justify-content: center;
  width: 80px;

  .btn-primary {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    height: 32px;
    background: #fff;
    border-radius: 4px;
    opacity: 1;
    color: #007bff;
    cursor: pointer;
    border: 1px solid #eee;

    &:hover {
      opacity: 0.8;
    }
  }
}
</style>
