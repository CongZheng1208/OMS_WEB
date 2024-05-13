<template>
  <div>
    <Selection />
    <div class="border-t fixed bottom-0  w-full">
      <div class="flex justify-between w-full items-center my-2">
        <button class="p2 text-lg rounded-xl border jianbian ml-3 text-center">Print </button>
        <button class="p2 text-lg rounded-xl border jianbian mr-3">Download</button>
      </div>
    </div>
    <router-view></router-view>
  </div>
</template>
<script lang="ts">
import Selection from './selection.vue'

export default {
  name: "DatabaseManagement",
  components: {
    Selection
  },
  data() {
    return {
      displaySelected: 'fileImport',
      selectionData: [
        "QAR Data",
        "Events",
        "Equipment Configuration",
        "Failure History Files",
        "Data Load Status File",
        "ACARS Report Files"
      ]
    }
  },
  methods: {
  },
  created() {
  },
  mounted() {
    this.$router.push({ name: 'fileImport' })
  },
}
</script>
<style lang="scss" scoped>
.min-max {
  background-color: black;
  /* 设置背景颜色为黑色 */
  border: 2px solid white;
  /* 设置边框为2像素的白色实线 */
  color: white;
  /* 设置输入文字颜色为白色 */
}

.jianbian {
  font-weight: bold;
  background-image: linear-gradient(white, black);
  color: white;
  /* 设置按钮文字颜色为白色以确保可读性 */
  padding: 10px;
  /* p2 类可能意味着 padding，这里确保样式的一致性 */
  font-size: large;
  /* text-lg 类可能意味着大号文字，这里使用 CSS 的 large 值 */
  border-radius: 10px;
  /* rounded-xl 类可能意味着较大的圆角，这里假设为 10px */
  border: 1px solid black;
  /* border 类可能意味着有边框，这里添加一个黑色边框 */
}
</style>
