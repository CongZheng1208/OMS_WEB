<template>
  <div>
    <Selection />
    <div class="flex w-full">
      <div class="w-1/2 border-t border-r">
        <div class="ml-2 mt-2 border p3 text-center font-bold text-lg"> Folder </div>
        <div class="h-100 overflow-y-auto">
          <div v-for="item in 12"
               :key="item"
               :class="item === 1 ? 'folder-color' : ''"
               class="ml-2 mt-2  p3 font-bold text-lg pl3 "> Folder {{ item }} </div>
        </div>
      </div>
      <div class="w-1/2 border-t ">
        <div class="ml-2 mt-2  p3  font-bold text-lg flex justify-between">
          <div class="pt-2">Transmission:</div>
          <div class="flex-1 pl5">
            <div v-for="item in transimissionModeList"
                 class="radio ">
              <input name="param-display-radio1"
                     type="radio" />
              <label class="font-bold ">{{ item }}</label>
            </div>
          </div>
        </div>
        <div class="ml-2 mt-2  p3  font-bold text-lg"> notes: </div>
        <div class="ml-2   px-3   font-bold text-lg"> Note text is 146 characters and will be written over 1 line of 146
          characters. </div>
      </div>
    </div>
    <div class="p2 border w-full fixed bottom-0 left-0 flex justify-between items-center">
      <button class="p2 text-lg rounded-xl border jianbian">Print </button>
      <button class="p2 text-lg rounded-xl border jianbian">Download</button>
    </div>
  </div>
</template>
<script lang="ts">
import Selection from './selection.vue'

export default {
  name: '',
  components: {
    Selection
  },
  mixins: [],
  props: {

  },
  data() {
    return {
      transimissionModeList: [
        "Air-Ground Communication Data Link",
        "ATG Communication",
        "WiFi transmission",
        "Storage Only"
      ]
    }
  },
  computed: {

  },
  watch: {

  },
  mounted() {

  },
  methods: {

  }
};
</script>
<style lang='scss' scoped>
.folder-color {
  background: linear-gradient(to bottom, white, #666, white);
  color: white;
  /* 设置按钮颜色为白色确保可读性 */
  padding: 10px;
  /* p2 类可能意味着 padding，这里确保样式的一致性 */
  font-size: large;
  /* text-lg 类可能意味着大号文字，这里使用 CSS 的 large 值 */
  border-radius: 10px;
  /* rounded-xl 类可能意味着较大的圆角，这里假设为 10px */
  border: 1px solid black;
  /* border 类可能意味着有边框，这里添加一个黑色边框 */
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
