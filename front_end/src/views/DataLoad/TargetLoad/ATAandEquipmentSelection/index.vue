<template>
  <div>
    <div class="px-6 flex ">
      <div class="w-1/4 ">
        <table>
          <thead>
            <tr>
              <th>ATA Selection</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item, idx in pageData.ATAlist"
                class="h14 "
                :class="idx == selectedATAIdx ? 'seleted' : ''">
              <td @click="ATAlistClick(idx)">{{ item.name }}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="w-1/3">
        <table>
          <thead>
            <tr>
              <th>Equipment Selection</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item, idx in pageData.ATAlist[selectedATAIdx].equipments"
                class="h14 "
                :class="idx === 2 ? 'seleted' : ''">
              <td @click="equipmentsClick(idx)">User {{ item.name }}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="flex-1">
        <table>
          <thead>
            <tr>
              <th>Part Number</th>
              <th>Description</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item in 10"
                class="h14 "
                :class="item === 1 ? 'folder-color' : ''">
              <td>User {{ item }}</td>
              <td>Description</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    <el-footer>
      <div>
        <button class="footer-btn">PRINT</button>
      </div>
      <div class="flex gap3">
        <button @click="gotoDataUpload()"
                class="footer-btn">SELECT</button>
      </div>
    </el-footer>
  </div>
</template>
<script lang="ts">
import { http } from '@/utils/http'
import { PageData } from './store';

export default {
  name: '',
  components: {
  },
  mixins: [],
  props: {

  },
  data() {
    return {
      pageData: new PageData(),
      selectedATAIdx: 2,
      selectedEquipmentsIdx: 2
    }
  },
  computed: {

  },
  watch: {

  },
  mounted() {
    this.pageData.getATAlist()
  },
  methods: {
    gotoDataUpload() {
      this.$router.push({
        name: "DataUpload"
      })
    },
    ATAlistClick(idx: number) {
      this.selectedEquipmentsIdx = 0
      this.selectedATAIdx = idx
    },
    equipmentsClick(idx: number) {
      this.selectedEquipmentsIdx = idx
    }
  }
}
</script>
<style lang='scss' scoped>
table {
  @apply w-full text-lg fontbold text-start border;
  border-collapse: collapse;
}

td,
th {
  @apply p3 text-center;
}

td {
  @apply hover:cursor-pointer;
}


tr {
  border: 1px solid rgb(111, 111, 111);
}

.seleted {
  @apply bg-[#404040] border-b-white border
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
