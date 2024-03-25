<template>
  <div class="content">
    <!--文本框-->
    <div
      ref="divRef"
      :style="{ width, height, borderColor }"
      class="editor"
      contenteditable
      @keyup="handkeKeyUp"
      @keydown="handleKeyDown"
      @click="handleClickInputArea"
    />
    <!--选项-->
    <TagPerson
      v-if="showDialog"
      :position="position"
      @person-chosen="handlePickUser"
    />
  </div>
</template>
<script>
import TagPerson from '@/components/CommentsAndUpdates/TagPerson.vue';
export default {
  name: 'SandBox',
  components: { TagPerson },
  props: {
    width: {
      type: String,
      default: '100%'
    },
    height: {
      type: String,
      default: '68px'
    },
    borderColor: {
      type: String,
      default: '#eee'
    }
  },
  data() {
    return {
      node: '',
      user: '',
      endIndex: '',
      queryString: '',
      showDialog: false,
      position: {
        x: 0,
        y: 0
      }
    };
  },
  methods: {
    handleClickInputArea() {
  //     this.$refs.divRef.focus(); // 聚焦到输入区域
  // const range = document.createRange();
  // range.selectNodeContents(this.$refs.divRef); // 选中输入区域的内容
  // range.collapse(false); // 将光标放在内容的末尾
  // const selection = window.getSelection();
  // selection.removeAllRanges();
  // selection.addRange(range);
    },
    // 获取光标位置
    getCursorIndex() {
      const selection = window.getSelection();
      return selection.focusOffset;
    },
    // 获取节点
    getRangeNode() {
      const selection = window.getSelection();
      return selection.focusNode;
    },
    // 弹窗出现的位置
    getRangeRect() {
      const selection = window.getSelection();
      const range = selection.getRangeAt(0);
      // eslint-disable-next-line prefer-destructuring
      const rect = range.getClientRects()[0];
      const LINE_HEIGHT = 30;
      return {
        x: rect.x,
        y: rect.y + LINE_HEIGHT
      };
    },
    // 是否展示 @
    showAt() {
      const node = this.getRangeNode();
      if (!node || node.nodeType !== Node.TEXT_NODE) {
        return false;
      }
      const content = node.textContent || '';
      const regx = /@([^@\s]*)$/;
      const match = regx.exec(content.slice(0, this.getCursorIndex()));
      return match && match.length === 2;
    },
    // 获取 @ 用户
    getAtUser() {
      const content = this.getRangeNode().textContent || '';
      const regx = /@([^@\s]*)$/;
      const match = regx.exec(content.slice(0, this.getCursorIndex()));
      if (match && match.length === 2) {
        return match[1];
      }
      return undefined;
    },
    // 创建标签
    createAtButton(user) {
      const btn = document.createElement('span');
      btn.style.display = 'inline-block';
      btn.dataset.user = JSON.stringify(user);
      btn.className = 'at-button';
      btn.contentEditable = 'false';
      btn.textContent = `@${user.name}`;
      const wrapper = document.createElement('span');
      wrapper.id = user.id;
      wrapper.style.display = 'inline-block';
      wrapper.contentEditable = 'false';
      const spaceElem = document.createElement('span');
      spaceElem.style.whiteSpace = 'pre';
      spaceElem.textContent = ' ';
      spaceElem.contentEditable = 'false';
      const clonedSpaceElem = spaceElem.cloneNode(true);
      wrapper.appendChild(spaceElem);
      wrapper.appendChild(btn);
      wrapper.appendChild(clonedSpaceElem);
      return wrapper;
    },
    replaceString(raw, replacer) {
      return raw.replace(/@([^@\s]*)$/, replacer);
    },
    // 插入@标签
    replaceAtUser(user) {
      const { node } = this;
      if (node && user) {
        const content = node.textContent || '';
        const { endIndex } = this;
        const preSlice = this.replaceString(content.slice(0, endIndex), '');
        const restSlice = content.slice(endIndex);
        const { parentNode } = node;
        const nextNode = node.nextSibling;
        const previousTextNode = new Text(preSlice);
        const nextTextNode = new Text(`\u200b${restSlice}`);
        const atButton = this.createAtButton(user);
        parentNode.removeChild(node);
        // 获取 @ 按钮元素
        const btn = atButton.querySelector('.at-button');
        if (btn) {
          // 修改样式：加粗和蓝色
          btn.style.fontWeight = 'bold';
          btn.style.color = '#007BFF';
        }
        // 插在文本框中
        if (nextNode) {
          parentNode.insertBefore(previousTextNode, nextNode);
          parentNode.insertBefore(atButton, nextNode);
          parentNode.insertBefore(nextTextNode, nextNode);
        } else {
          parentNode.appendChild(previousTextNode);
          parentNode.appendChild(atButton);
          parentNode.appendChild(nextTextNode);
        }

        // 重置光标的位置
        const range = new Range();
        const selection = window.getSelection();
        range.setStart(nextTextNode, 0);
        range.setEnd(nextTextNode, 0);
        selection.removeAllRanges();
        selection.addRange(range);

        this.$refs.divRef.focus();
      }
    },
    // 键盘抬起事件
    handkeKeyUp() {
      if (this.showAt()) {
        const node = this.getRangeNode();
        const endIndex = this.getCursorIndex();
        this.node = node;
        this.endIndex = endIndex;
        this.position = this.getRangeRect();
        this.queryString = this.getAtUser() || '';
        this.showDialog = true;
      } else {
        this.showDialog = false;
      }
    },
    // 键盘按下事件
    handleKeyDown(e) {
  if (this.showDialog) {
    if (e.code === 'ArrowUp' || e.code === 'ArrowDown' || e.code === 'Enter') {
      e.preventDefault();
    } else if (e.code === 'Backspace') {
      const selection = window.getSelection();
      const node = selection.anchorNode;
      const offset = selection.anchorOffset;

      // 判断光标位置是否在已插入的人员标签之后
      if (node && node.nodeType === Node.TEXT_NODE) {
        const content = node.textContent || '';
        const contentBeforeCursor = content.slice(0, offset);
        const regex = /@([^@\s]*)$/;
        const match = regex.exec(contentBeforeCursor);
        
        if (match && match.index + match[0].length === offset) {
          const tagNode = node.previousSibling;
          if (tagNode && tagNode.className === 'at-button') {
            // 删除人员标签
            tagNode.remove();

            // 将光标移动到标签前面的内容
            const range = new Range();
            range.setStart(node, match.index);
            range.setEnd(node, match.index);
            selection.removeAllRanges();
            selection.addRange(range);
          }
        }
      }
    }
  }
},
    //获取输入区域的内容和提前及的人员id集合
    getContent() {
       let difRefNodes = this.$refs.divRef.childNodes; 
       let contentString = this.traverseAndPush(difRefNodes);
       return contentString;
    },
    clearContent() {
      this.$refs.divRef.innerHTML = '';
    },
    traverseAndPush(nodes) { 
      let comment = [];
      let users = [];
      nodes.forEach((node) => { 
        if(node.data) { 
            comment.push(node.data);
        }
        else if(node.innerText) { 
            comment.push(node.innerText);
            users.push(Number(node.id));
        }
        else {return}   
      })
      let resultString = comment.join('');
      let result = {comment: resultString, refferedUsers: users}

      return result
    },
    // 插入标签后隐藏选择框
    handlePickUser(user) {
      this.replaceAtUser(user);
      this.user = user;
      this.$emit('user-pick', this.user);
      this.showDialog = false;
    },
    // 隐藏选择框
    handleHide() {
      this.showDialog = false;
    },
    // 显示选择框
    handleShow() {
      this.showDialog = true;
    }
  }
};
</script>

<style scoped lang="less">
.content {
  display: flex;
}
.editor {
  display: flex;
  margin: 0;
  width: 100%;
  height: 75px;
  background: #fff;
  border: 1px solid;
  border-color: #eee;
  text-align: left;
  padding: 10px;
  overflow: auto;
  line-height: 30px;
  &:focus {
    outline: none;
  }
}
</style>
