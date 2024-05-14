<template>
  <div>
    <Selection />
    <div class="flex w-full">
      <div class="w-1/2 border-t border-r h-140 overflow-y-auto">
        <table>
          <tr>
            <th>Folder</th>
          </tr>
          <tr v-for="item in 10">
            <td>Folder {{ item }}</td>
          </tr>
        </table>
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
    <el-footer>
      <div>
        <button class="footer-btn">PRINT</button>
      </div>
      <div>
        <button class="footer-btn">DOWNLOAD</button>
      </div>
    </el-footer>
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
