<template>
  <div class="status-wrapper">
    <div
      v-for="item in progressOptions"
      :key="item.value"
      class="options"
      @click="testClick(item)"
    >
      {{ item.name }}
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      fastFilterQuotePhase: '',
      progressOptions: [
        {
          value: 5,
          name: 'Site Plan'
        },
        {
          value: 10,
          name: '10%'
        },
        {
          value: 30,
          name: '30%'
        },
        {
          value: 50,
          name: '50%'
        },
        {
          value: 60,
          name: '60%'
        },
        {
          value: 75,
          name: '75%'
        },
        {
          value: 90,
          name: '90%'
        },
        {
          value: 100,
          name: 'IFP'
        },
        {
          value: 110,
          name: 'IFC'
        },
        {
          value: 120,
          name: 'IFC Rev1'
        },
        {
          value: 130,
          name: 'IFC Rev2'
        },
        {
          value: 140,
          name: 'IFC Rev3'
        },
        {
          value: 150,
          name: 'IFC Rev4'
        },
        {
          value: 160,
          name: 'IFC Rev5'
        }
      ]
    };
  },
  methods: {
    testClick(val) {
      this.$emit('fast-filter', val, this.fastFilterType);
    }
  }
};
</script>

<style lang="less" scoped>
.status-wrapper{
  max-height: 280px;
  overflow-y: auto;
  .options {
  width: 120px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  padding-left: 24px;
  color: #606266;

  &:hover {
    cursor: pointer;
    background: #f2f6fc;
    color: #007bff;
  }
}
}

</style>
