<template>
  <div class="text-start">
    <button @click="onDialog">打开对话框</button>
    <Dialog v-show="isVisible"
            @close="onClose"
            @ok="onConfirm">
    </Dialog>
  </div>
</template>
<script lang="ts">
import Dialog from './toggle-dialog.vue'

export default {
  name: 'TheToggleButton',
  components: {
    Dialog
  },
  data() {
    return {
      isVisible: true,
      content: '',
      title: ''
    }
  },
  methods: {
    onDialog() { // 调用Dialog弹出对话框
      this.isVisible = true
    },
    onClose() { // 关闭dialog
      this.isVisible = false
    },
    onConfirm() { // “确定”按钮回调
      this.isVisible = false
    }
  }
}
</script>
