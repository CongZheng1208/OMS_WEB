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
      <div class="m-3 border  p-1">
        <table>
          <tr>
            <th>Upload File</th>
            <th>Part Number</th>
            <th>Upload Duration</th>
          </tr>
          <tr>
            <td>ZFGTU.tar</td>
            <td>XXXXXXXXX1</td>
            <td>03:25</td>
          </tr>
        </table>
      </div>
      <div class="flex justify-end">
        <button class="ml5 rounded px2 py1 mr3 text-lg border jianbian">Upload</button>
      </div>
    </div>
    <div class="w-1/2 border-t flex flex-col justify-between">
      <div class="p2 flex h-140 overflow-y-auto">
        <table>
          <tr>
            <th>Upload File</th>
            <th>Upload Status</th>
            <th>Upload Start</th>
            <th>Part Number</th>
          </tr>
          <tr v-for="item in 10">
            <td>QAR Data</td>
            <td>0</td>
            <td>2022/01/01 12:00:00</td>
            <td>440K</td>
          </tr>
        </table>
      </div>
      <div class=" flex p2 items-center justify-between">
        <div class="text-lg font-bold"> Number of Records: 3 </div>
        <button class="p2 text-lg rounded-xl border footer-btn">Clear</button>
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
