<template>
  <div
    v-if="tagText"
    class="quote-status-tag-container"
    :style="tagStyle"
  >
    <p>
      {{ tagText.length >= 15 ? tagText.substring(0, 15) + '...' : tagText }}
    </p>
  </div>
</template>

<script>
export default {
  props: {
    tagText: {
      type: String,
      default: ''
    },
    type: {
      type: String,
      default: 'quote'
    }
  },
  computed: {
    tagStyle() {
      //2d bidding中quote状态的相应颜色
      if (this.type === 'quote') {
        let backgroundColor = '';
        switch (this.tagText) {
          case 'Pending US engineer review':
          case 'Pending assign design team':
          case 'Team assigned & Pending quote':
          case 'Quote submitted & Pending CN approval':
          case 'Win & Pending US engineer final review':
          case 'Quote released':
          case 'Pending US approval':
            // 蓝色
            backgroundColor = '#409EFF'; 
            break;
          case 'Quote rejected & Pending re-quote':
          case 'US engineer rejected':
            // 红色
            backgroundColor = ' #F56C6C'; 
            break;
          case 'Quote sent':
          case 'Final review approval':
            // 绿色
            backgroundColor = '#22D9AE'; 
            break;
          default:
            // 默认为绿色
            backgroundColor = '#409EFF'; 
        }
        return {
          backgroundColor
        };
      }
      //2d bidding中formal状态的相应颜色
      if (this.type === 'formal') {
        let backgroundColor = '';
        switch (this.tagText) {
          case 'Pending assign design team':
          case 'Team assigned & pending label file':
          case 'Label file submited & Pending approval':
            // 蓝色
            backgroundColor = '#409EFF'; 
            break;
          case 'Label file rejected & pending re-label':
            // 红色
            backgroundColor = ' #F56C6C'; 
            break;
          case 'Label file released':
            // 绿色
            backgroundColor = '#22D9AE'; 
            break;
          default:
            // 默认为绿色
            backgroundColor = '#22D9AE'; 
        }
        return {
          backgroundColor
        };
      }
      //3d bidding和formal的状态的相应颜色, 均为calculation任务
      if (this.type === '3d-bidding' || this.type === '3d-formal') {
        let backgroundColor = '';
        switch (this.tagText) {
          case 'Pending assign 3D design team':
          case 'Team assigned & Pending 3D calculation':
          case '3D calculation submitted & Pending 3D CN approval':
          case 'Pending US 3D calculation approval':
            // 蓝色
            backgroundColor = '#409EFF'; 
            break;
          case '3D calculation rejected & Pending re-submit':
          case 'US engineer rejected 3D calculation':
            // 红色
            backgroundColor = ' #F56C6C'; 
            break;
          case '3D calculation released':
            // 绿色
            backgroundColor = '#22D9AE'; 
            break;
          default:
            // 默认为绿色
            backgroundColor = '#22D9AE'; 
        }
        return {
          backgroundColor
        };
      }
      //3d simulation状态的相应颜色
      if (this.type === 'simulation') {
        let backgroundColor = '';
        switch (this.tagText) {
          case 'Pending assign simulation team':
          case 'Team assigned & Pending simulation':
          case 'Simulation submitted & Pending approval':
          case 'Pending US simulation approval':
            // 蓝色
            backgroundColor = '#409EFF'; 
            break;
          case 'Simulation rejected & Pending re-submit':
          case 'Simulation rejected':
            // 红色
            backgroundColor = ' #F56C6C'; 
            break;
          case 'Simulation released':
            // 绿色
            backgroundColor = '#22D9AE'; 
            break;
          default:
            // 默认为绿色
            backgroundColor = '#22D9AE'; 
        }
        return {
          backgroundColor
        };
      }
      return ''
    }
  }
};
</script>

<style lang="less" scoped>
.quote-status-tag-container {
  width: 140px;
  height: 24px;
  border-radius: 4px;
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;

  p {
    margin-left: 3px;
  }
}
</style>
