<template>
  <div>
    <button class="dialog-overlay"
            @click="onClose"></button>
    <div class="dialog-content bg-[#404040] rounded border p3 z-2">
      <div>
        <CloseButton />
      </div>
      <div class="p4">
        <div class="text-lg font-medium">提示</div>
      </div>
      <div class="p-6 text-lg leading-6 overflow-auto">
      </div>
      <div class="flex justify-end">
        <button class="footer-btn"
                @click="onClose">取消</button>
        <button class="footer-btn "
                @click="onConfirm">确定</button>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import CloseButton from './close.svg.vue'
export default {
  name: 'Dialog',
  data() {
    return {
    }
  },
  components: {
    CloseButton
  },
  methods: {
    onBlur() {
      this.$emit('close')
    },
    onClose() {
      this.$emit('close')
    },
    onConfirm() {
      this.$emit('ok')
    }
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


.footer-btn {
  @apply cursor-pointer;
  width: 10vh;
  height: 5vh;

  color: white;
  font-size: 16px;
  font-weight: bold;

  padding: 1vh;
  margin-left: 1vh;

  border-radius: 3px;
  border: 1px solid rgb(111, 111, 111);

  box-shadow: 5px 5px 5px 0px rgba(42, 42, 42, 0.5);
  background-color: rgb(65, 65, 65);

  transition: box-shadow 0.3s ease background-color 0.3s ease;
}
</style>
