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
                :class="idx == selectedATAIdx ? 'selected' : ''">
              <td @click="ATAlistClick(idx)">{{ item.name }}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="w-1/3">
        <table >
          <thead>
            <tr>
              <th>Equipment Selection</th>
            </tr>
          </thead>
          <tbody v-if="selectedATAIdx !== -1">
            <tr
            v-for="item, idx in pageData.ATAlist[selectedATAIdx].equipments"
                class="h14 "
                :class="idx === selectedEquipmentsIdx ? 'selected' : ''">
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
            <tr @click="partClick(idx)"
                v-for="item, idx in pageData.partlist"
                :class="selectedPartIdx.indexOf(idx) !== -1 ? 'selected' : ''">
              <td>{{ item.id }}</td>
              <td>{{ item.description }}</td>
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
      selectedATAIdx: -1,
      selectedEquipmentsIdx: -1,
      selectedPartIdx: [] as Array<number>
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
      if (this.selectedATAIdx === -1) {
        this.$message.error('Please select ATA')
        return
      }
      if (this.selectedEquipmentsIdx === -1) {
        this.$message.error('Please select Equipment')
        return
      }
      if (this.selectedPartIdx.length === 0) {
        this.$message.error('Please select Part')
        return
      }
      this.$router.push({
        name: "DataUpload",
        query: {
          dataload_list:JSON.stringify(this.getDataloadList()),
        }
      })
    },
    ATAlistClick(idx: number) {
      this.selectedEquipmentsIdx = 0
      this.pageData.partlist=[]
      this.selectedATAIdx = idx
    },
    equipmentsClick(idx: number) {
      this.selectedEquipmentsIdx = idx
      this.pageData.getPartByEquipment(this.pageData.ATAlist[this.selectedATAIdx].equipments[idx].id)
    },
    getDataloadList() {
      const partlist_idx=this.selectedPartIdx.map(item => this.pageData.partlist[item])
      const equipment_idx=this.pageData.ATAlist[this.selectedATAIdx].equipments[this.selectedEquipmentsIdx].id
      const dataload_list:Array<{
        equipment_id: number,
        part_id: string,
      }>=[]
      partlist_idx.forEach(item=>{
        dataload_list.push({
          equipment_id:equipment_idx,
          part_id:item.id ,
        })
      })
      return dataload_list
    },
    partClick(idx: number) {
      const the_idx = this.selectedPartIdx.indexOf(idx)
      if (the_idx === -1) {
        this.selectedPartIdx.push(idx)
      } else {
        this.selectedPartIdx.splice(the_idx, 1)
      }
    },
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

thead{
  tr{
    @apply bg-[#404040];
  }
}
tr {
  border: 1px solid rgb(111, 111, 111);
}

.selected {
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
