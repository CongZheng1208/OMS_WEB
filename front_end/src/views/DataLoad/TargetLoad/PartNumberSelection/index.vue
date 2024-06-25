<template>
  <div >
    <div class="px-6 flex ">
      <div class="w-1/3 ">
        <table>
          <thead>
            <tr>
              <th>Part Number</th>
              <th>Description</th>
            </tr>
          </thead>
          <tbody>
            <tr @click="PartClick(idx)"
                v-for="item, idx in pageData.part_list"
                :key="item.id"
                :class="idx === seletedPartIdx ? 'selected' : ''"
                class="h14 hover:cursor-pointer">
              <td> {{ item.id }}</td>
              <td>{{ item.description }}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="flex-1">
        <table>
          <thead>
            <tr>
              <th>ATA</th>
              <th>Equipment Name</th>
              <th class="w-30  "
                  style="padding:0px 10px 0px 10px;">
                <button class="footer-btn "> Select All</button>
              </th>
            </tr>
          </thead>
          <tbody>
            <tr @click="EquipmentClick(idx)"
                v-for="item, idx in pageData.equipment_list"
                class="h14 hover:cursor-pointer"
                :class="selectedEquipmentIdx.indexOf(idx) !== -1 ? 'selected' : ''">
              <td>{{ item.ATA_id }}</td>
              <td> {{ item.name }}</td>
              <td></td>
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
  name: 'PartNumberSelection',
  components: {
  },
  mixins: [],
  props: {

  },
  data() {
    return {
      pageData: new PageData(),
      seletedPartIdx: 0,
      selectedEquipmentIdx: [] as Array<number>
    }
  },
  computed: {

  },
  watch: {

  },
  mounted() {
    this.pageData.get_all_part()
  },
  methods: {
    PartClick(idx: number) {
      this.seletedPartIdx = idx
      this.pageData.get_equipments_by_part_id(this.pageData.part_list[idx].id)
    },
    EquipmentClick(idx: number) {
      const the_idx = this.selectedEquipmentIdx.indexOf(idx)
      if (the_idx === -1) {
        this.selectedEquipmentIdx.push(idx)
      } else {
        this.selectedEquipmentIdx.splice(the_idx, 1)
      }
    },
    getDataloadList() {
      const equipment_idx=this.selectedEquipmentIdx.map(item => this.pageData.equipment_list[item])
      const part_idx=this.seletedPartIdx
      const dataload_list:Array<{
        equipment_id: number,
        part_id: string,
      }>=[]
      equipment_idx.forEach(item=>{
        dataload_list.push({
          equipment_id:item.id,
          part_id:this.pageData.part_list[part_idx].id,
        })
      })
      return dataload_list
    },
    gotoDataUpload() {
      if (this.selectedEquipmentIdx.length === 0) {
        this.$message.error('Please select Equipment')
        return
      }
      if (this.seletedPartIdx === -1) {
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
  }
};
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
  @apply flex items-center justify-center text-white;
  width: 16vh;
  height: 4vh;
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
