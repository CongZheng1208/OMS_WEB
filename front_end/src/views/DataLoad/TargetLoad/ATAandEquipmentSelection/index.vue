<template>
  <div class="bg-[rgb(45, 45, 45)] p-20px">
    <el-col :span="6"
            style="border:  0.5px solid rgb(111, 111, 111);">
      <el-table highlight-current-row
                style="width: 100%;background-color: rgb(46, 45, 45)"
                :data="pageData.ATAlist"
                :sort-method="customSortMethodForProgressColumn"
                :header-cell-style="{
                  background: '#404040',
                  color: '#FFFFFF',
                  font: '14px'
                }"
                height="65vh"
                :empty-text="'NO DATA DISPLAY'"
                row-key="index"
                :tree-props="{ children: 'children', hasChildren: 'hasChildren' }"
                @current-change="ATAlistClick">
        <el-table-column prop="key"
                         label="ATA Selection Key"
                         :width="null"
                         :min-width="5"
                         sortable> </el-table-column>
        <el-table-column prop="value"
                         label="ATA Selection"
                         :width="null"
                         :min-width="5"
                         sortable> </el-table-column>
      </el-table>
    </el-col>
    <el-col :span="6"
            style="border:0.5px solid rgb(111, 111, 111);">
      <el-table highlight-current-row
                style="width: 100%;background-color: rgb(46, 45, 45)"
                :data="pageData.equipmentlist"
                :sort-method="customSortMethodForProgressColumn"
                :header-cell-style="{
                  background: '#404040',
                  color: '#FFFFFF',
                  font: '14px'
                }"
                height="65vh"
                :empty-text="'NO DATA DISPLAY'"
                row-key="index"
                :tree-props="{ children: 'children', hasChildren: 'hasChildren' }"
                @current-change="EquipmentClick">
        <el-table-column prop="id"
                         label="Equipment ID"
                         :width="null"
                         :min-width="5"
                         sortable> </el-table-column>
        <el-table-column prop="name"
                         label="Equipment Name"
                         :width="null"
                         :min-width="5"
                         sortable> </el-table-column>
      </el-table>
    </el-col>
    <el-col :span="6"
            style="border:  0.5px solid rgb(111, 111, 111);">
      <el-table highlight-current-row
                style="width: 100%;background-color: rgb(46, 45, 45)"
                :data="pageData.partlist"
                :sort-method="customSortMethodForProgressColumn"
                :header-cell-style="{
                  background: '#404040',
                  color: '#FFFFFF',
                  font: '14px'
                }"
                height="65vh"
                :empty-text="'NO DATA DISPLAY'"
                row-key="index"
                :tree-props="{ children: 'children', hasChildren: 'hasChildren' }"
                @current-change="PartClick">
        <el-table-column prop="id"
                         label="Part ID"
                         :width="null"
                         :min-width="5"
                         sortable> </el-table-column>
        <el-table-column prop="description"
                         label="Part Description"
                         :width="null"
                         :min-width="5"
                         sortable> </el-table-column>
      </el-table>
    </el-col>
    <!--
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
      </div> -->
    <footer
            class="fixed bottom-0 left-0 right-0 px-4 py1 flex justify-between items-center border-t  border-t-[#6F6F6F]">
      <div>
        <button class="footer-btn">PRINT</button>
      </div>
      <!-- <div class="flex gap3">
        <button @click="gotoDataUpload()"
                class="footer-btn">SELECT</button>
      </div> -->
    </footer>
  </div>
</template>
<script lang="ts">
import { http } from '@/utils/http';
import { PageData, Equipment, Part } from './store';
import { customSortMethodForProgressColumn } from '@/utils/utils'
import { MyResponse } from '@/utils/store/response';

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
      selectedPartIdx: [] as Array<string>
    }
  },
  computed: {

  },
  watch: {

  },
  async mounted() {
  },
  methods: {
    //   gotoDataUpload() {
    //     if (this.selectedATAIdx === -1) {
    //       this.$message.error('Please select ATA')
    //       return
    //     }
    //     if (this.selectedEquipmentsIdx === -1) {
    //       this.$message.error('Please select Equipment')
    //       return
    //     }
    //     if (this.selectedPartIdx.length === 0) {
    //       this.$message.error('Please select Part')
    //       return
    //     }
    //     this.$router.push({
    //       name: "DataUpload",
    //       query: {
    //         dataload_list: JSON.stringify(this.getDataloadList()),
    //       }
    //     })
    //   },
    async ATAlistClick(ata: { key: string, value: string }) {
      console.log('[ idx ] >', ata)
      const res = (await http({
        url: `/equipment-list?ATA_id=${ata.key}`,
        method: "GET",
      })) as MyResponse<Equipment[]>
      this.pageData.equipmentlist = res.result
    },
    async EquipmentClick(equipment: Equipment) {
      const res = (await http({
        url: `/part-list?equipment_id=${equipment.id}`,
        method: "GET",
      })) as MyResponse<Part[]>
      this.pageData.partlist = res.result
    },
    async PartClick(part: Part) {
      this.selectedPartIdx = [part.id,]
    },
    //   partlistClick(part: Part) {
    //     this.selectedPartIdx = []
    //     this.selectedPartIdx.push(this.pageData.partlist.indexOf(part))
    //   equipmentsClick(idx: number) {
    //     this.selectedEquipmentsIdx = idx
    //     this.pageData.getPartByEquipment(this.pageData.ATAlist[this.selectedATAIdx].equipments[idx].id)
    //   },
    //   getDataloadList() {
    //     const partlist_idx = this.selectedPartIdx.map(item => this.pageData.partlist[item])
    //     const equipment_idx = this.pageData.ATAlist[this.selectedATAIdx].equipments[this.selectedEquipmentsIdx].id
    //     const dataload_list: Array<{
    //       equipment_id: number,
    //       part_id: string,
    //     }> = []
    //     partlist_idx.forEach(item => {
    //       dataload_list.push({
    //         equipment_id: equipment_idx,
    //         part_id: item.id,
    //       })
    //     })
    //     return dataload_list
    //   },
    //   partClick(idx: number) {
    //     const the_idx = this.selectedPartIdx.indexOf(idx)
    //     if (the_idx === -1) {
    //       this.selectedPartIdx.push(idx)
    //     } else {
    //       this.selectedPartIdx.splice(the_idx, 1)
    //     }
    //   },
    customSortMethodForProgressColumn,
  }
}
</script>
<style lang='scss' scoped>
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
