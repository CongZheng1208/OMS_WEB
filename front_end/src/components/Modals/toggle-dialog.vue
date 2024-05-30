<template>
  <div>
    <button v-on:click="onClose"
            class="dialog-overlay"></button>
    <div class="dialog-content bg-[#404040] rounded border p3 z-2">
      <slot name="content" />
    </div>
  </div>
</template>
<script lang="ts">
export default {
  name: 'Dialog',

  methods: {
    onClose() { // 关闭dialog
      this.$emit('close')
    },
  },
  watch: {

  }
}
</script>
<style lang="scss" scoped>
.dialog-overlay {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1;
  background: rgba(0, 0, 0, 0.5);
  width: 100%;
  height: 100%;
}

.dialog-content {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
  border: 1px solid rgb(111, 111, 111);
}
</style>
