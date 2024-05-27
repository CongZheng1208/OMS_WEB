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
    <div class="w-1/2 border-t flex flex-col justify-between">
      <div class="p2 h-140 overflow-y-auto">
        <table>
          <thead>
            <tr>
              <th>File Name</th>
              <th>Flight Leg</th>
              <th>Time</th>
              <th>Size</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item in 3">
              <td>QAR Data</td>
              <td>0</td>
              <td>2022/01/01 12:00:00</td>
              <td>440K</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="
              border
              flex
              p2">
        <div class="flex-1 ">
          <div class="flex gap2">
            <button class="footer-btn">Select All </button>
            <button class="footer-btn">Delete </button>
          </div>
        </div>
        <button class="footer-btn">Clear</button>
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
table {
  @apply w-full text-lg fontbold text-start border;
  border-collapse: collapse;
}

td,
th {
  @apply p3 text-center;
}


tr {
  border: 1px solid rgb(111, 111, 111);
}

tr:first-child {
  @apply bg-[#404040] border-b-white border;
}

.footer-btn {
  width: 20vh;
  height: 5.5vh;
  font-size: 16px;
  font-weight: bold;
  padding: 1vh;
  border-radius: 3px;
  border: 1px solid rgb(111, 111, 111);

  box-shadow: 5px 5px 5px 0px rgba(42, 42, 42, 0.5);
  background-color: rgb(65, 65, 65);

  transition: box-shadow 0.3s ease background-color 0.3s ease;
}
</style>
