<template>
  <div class="flex w-full">
    <div class="w-1/2 border-t border-r ">
      <div class="flex justify-between">
        <div class="w-1/3 pt10 flex pl-5">
          <div class="font-bold text-lg"> Section Option </div>
        </div>
        <div class="w-1/3">
          <div class="radio ">
            <input name="param-display-radio1"
                   type="radio"
                   :checked="displaySelected == 'fileImport'" />
            <label class="font-bold ">File Import</label>
          </div>
          <div class="radio">
            <input name="param-display-radio1"
                   type="radio"
                   :checked="displaySelected == 'avaliableFLS'" />
            <label class="font-bold ">Flight Leg Range</label>
          </div>
          <div class="radio">
            <input name="param-display-radio1"
                   type="radio"
                   :checked="displaySelected == 'list'" />
            <label class="font-bold ">All Fight Legs</label>
          </div>
        </div>
        <div class="font-bold flex items-center w-1/3 justify-between pr-12">
          <div>Min <input class="min-max ml2 w16 pl3"
                   type="text">
          </div>
          <div> Max <input class="min-max ml2 w12 pr3"
                   type="text"></div>
        </div>
      </div>
      <div class="pl5 pt10 fontbold text-lg"> Selection Data </div>
      <div class="flex justify-end">
        <div class="w-1/2">
          <div v-for="(item, index) in selectionData"
               :key="index"
               class="flex justify-between mt2">
            <div>
              <div class="radio ">
                <input name="param-display-radio1"
                       type="radio"
                       :checked="displaySelected == 'list'" />
                <label class="font-bold ">{{ item }}</label>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="w-1/2 border-t   flex flex-col justify-between">
      <div class="p2 flex h-140 overflow-y-auto">
        <table class="flex-1 text-center text-lg fontbold text-start">
          <tr class="">
            <th class="text-start">File Name</th>
            <th class="text-start">Flight Leg</th>
            <th class="text-start">Time</th>
            <th class="text-start">Size</th>
          </tr>
          <tr v-for="item in 10"
              :class="item === 1 ? 'folder-color' : ''">
            <td>QAR Data</td>
            <td>0</td>
            <td>2022/01/01 12:00:00</td>
            <td>440K</td>
          </tr>
        </table>
      </div>
      <div class="border flex p2">
        <div class="flex-1 ">
          <div class="flex gap2">
            <button class="p2 text-lg rounded-xl border jianbian">Select All </button>
            <button class="p2 text-lg rounded-xl border jianbian">Delete </button>
          </div>
        </div>
        <button class="p2 text-lg rounded-xl border jianbian">Clear</button>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
export default {
  name: "fileImport",
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
}
</script>
<style lang="scss" scoped>
.jianbian {
  font-weight: bold;
  background-image: linear-gradient(white, black);
  color: white;
  /* text-lg 类可能意味着大号文字，这里使用 CSS 的 large 值 */
  border-radius: 10px;
  /* rounded-xl 类可能意味着较大的圆角，这里假设为 10px */
  border: 1px solid black;
  /* border 类可能意味着有边框，这里添加一个黑色边框 */
}

.folder-color {
  background: linear-gradient(to bottom, white, #666, white);
  color: white;
  /* 设置按钮颜色为白色确保可读性 */
  padding: 10px;
  /* p2 类可能意味着 padding，这里确保样式的一致性 */
  font-size: large;
  /* rounded-xl 类可能意味着较大的圆角，这里假设为 10px */
  border: 1px solid black;
  /* border 类可能意味着有边框，这里添加一个黑色边框 */
}


table {
  border-collapse: collapse;
}

td,
th {
  @apply p1;
}

tr:first-child {
  border: 2px solid white;
}
</style>
