<template>
  <div class="flex w-full">
    <div class="w-1/2 border-t border-r ">
      <div class="flex justify-between">
        <div class="w-1/3 pt10 flex pl-5">
          <div class="font-bold text-lg"> Section File Type </div>
        </div>
        <div class="w-2/3">
          <div class="radio ">
            <input name="param-display-radio1"
                   type="radio"
                   :checked="displaySelected == 'fileImport'" />
            <label class="font-bold ">File Loadable Software</label>
          </div>
          <div class="radio">
            <input name="param-display-radio1"
                   type="radio"
                   :checked="displaySelected == 'avaliableFLS'" />
            <label class="font-bold ">Config File</label>
          </div>
        </div>
      </div>
      <div class="pl5 pt10 fontbold text-lg"> Selection File Location </div>
      <div class="pl5 pt10 flex items-center text-lg font-bold">
        <div class="pr3">Location:</div>
        <div class="flex-1 flex">
          <input type="text "
                 class="p2 rounded border-2 border-white bg-black flex-1"
                 placeholder="Location" />
        </div>
        <button class="ml5 rounded px2 py1 mr3 text-lg border jianbian">Select File</button>
      </div>
      <div class="m-3 border flex p-1">
        <table class="
           flex-1
           text-start
           text-lg
           fontbold
           text-start">
          <tr>
            <th class="text-start pl3">Upload File</th>
            <th class="text-start pl3">Part Number</th>
            <th class="text-start pl3">Upload Duration</th>
          </tr>
          <tr>
            <td class="text-start pl3">ZFGTU.tar</td>
            <td class="text-start pl3">XXXXXXXXX1</td>
            <td class="text-start pl3">03:25</td>
          </tr>
        </table>
      </div>
      <div class="flex justify-end">
        <button class="ml5 rounded px2 py1 mr3 text-lg border jianbian">Upload</button>
      </div>
    </div>
    <div class="w-1/2 border-t   flex flex-col justify-between">
      <div class="p2 flex h-140 overflow-y-auto">
        <table class="flex-1 text-center text-lg fontbold text-start">
          <tr>
            <th class="text-start">Upload File</th>
            <th class="text-start">Upload Status</th>
            <th class="text-start">Upload Start</th>
            <th class="text-start">Part Number</th>
          </tr>
          <tr v-for="item in 10"
              class="h14">
            <td>QAR Data</td>
            <td>0</td>
            <td>2022/01/01 12:00:00</td>
            <td>440K</td>
          </tr>
        </table>
      </div>
      <div class=" flex p2 items-center justify-between">
        <div class="text-lg font-bold"> Number of Records: 3 </div>
        <button class="p2 text-lg rounded-xl border jianbian">Clear</button>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
export default {
  name: "avaliable-fls",
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
