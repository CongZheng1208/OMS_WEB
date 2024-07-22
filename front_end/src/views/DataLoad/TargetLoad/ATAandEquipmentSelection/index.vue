<template>
  <div class="bg-[rgb(45, 45, 45)]">
    <el-main>
      <el-col :span="6"
              style="border:  0.5px solid rgb(111, 111, 111);">
        <el-table highlight-current-row
                  style="width: 100%;background-color: rgb(46, 45, 45)"
                  :data="ATAlist"
                  :sort-method="customSortMethodForProgressColumn"
                  :header-cell-style="{
        background: '#404040',
        color: '#FFFFFF',
        font: '14px'
      }"
                  height="70vh"
                  :empty-text="'NO DATA DISPLAY'"
                  row-key="index"
                  :tree-props="{ children: 'children', hasChildren: 'hasChildren' }"
                  @current-change="ATAlistClick">
          <el-table-column :width="null"
                           :min-width="5"></el-table-column>
          <el-table-column prop="key"
                           label="ATA Selection"
                           :width="null"
                           :min-width="50"
                           sortable>
            <template slot-scope="scope">
              <div class="flex gap-3">
                <div>{{ scope.row.key }}</div>
                <div>{{ scope.row.value }}</div>
              </div>
            </template>
          </el-table-column>
          <el-table-column :width="null"
                           :min-width="5"></el-table-column>
        </el-table>
      </el-col>
      <el-col :span="9"
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
                  height="70vh"
                  :empty-text="'NO DATA DISPLAY'"
                  row-key="index"
                  :tree-props="{ children: 'children', hasChildren: 'hasChildren' }"
                  @current-change="EquipmentClick">
          <el-table-column :width="null"
                           :min-width="5"></el-table-column>
          <el-table-column prop="name"
                           label="Equipment Selection"
                           :width="null"
                           sortable
                           :min-width="50"> </el-table-column>
          <el-table-column :width="null"
                           :min-width="5"></el-table-column>
        </el-table>
      </el-col>
      <el-col :span="9"
              style="border:0.5px solid rgb(111, 111, 111);">
        <el-table highlight-current-row
                  style="width: 100%;background-color: rgb(46, 45, 45)"
                  :data="pageData.partlist"
                  :sort-method="customSortMethodForProgressColumn"
                  :header-cell-style="{
        background: '#404040',
        color: '#FFFFFF',
        font: '14px'
      }"
                  height="70vh"
                  :empty-text="'NO DATA DISPLAY'"
                  row-key="index"
                  :tree-props="{ children: 'children', hasChildren: 'hasChildren' }"
                  @current-change="PartClick">
          <el-table-column :width="null"
                           :min-width="5"></el-table-column>
          <el-table-column prop="id"
                           label="Part Number"
                           :width="null"
                           sortable
                           :min-width="20"> </el-table-column>
          <el-table-column prop="description"
                           label="Description"
                           :width="null"
                           :min-width="30"></el-table-column>
          <el-table-column :width="null"
                           :min-width="5"></el-table-column>
        </el-table>
      </el-col>
    </el-main>
    <el-footer>
      <div>
        <button @click="printPage()"
                class="footer-btn">PRINT</button>
      </div>
      <div class="flex gap3">
        <button @click="goBack()"
                class="footer-btn">BACK</button>
        <button @click="gotoDataUpload()"
                class="footer-btn">SELECT</button>
      </div>
    </el-footer>
  </div>
</template>
<script lang="ts">
import { http } from '@/utils/http';
import { PageData, Equipment, Part } from './store';
import { customSortMethodForProgressColumn, printPage } from '@/utils/utils'
import { MyResponse } from '@/utils/store/response';
import { ATAlist } from '../store'

export default {
  name: '',
  components: {
  },
  mixins: [],
  props: {

  },
  data() {
    return {
      ATAlist,
      pageData: new PageData(),
      selectedATAId: undefined,
      selectedEquipmentsId: '',
      selectedPartIdx: [] as Array<string>,
    }
  },
  computed: {

  },
  watch: {

  },
  async mounted() {
  },
  methods: {
    gotoDataUpload() {
      if (this.selectedATAId === undefined) {
        this.$message.error('Please select ATA')
        return
      }
      if (this.selectedATAId === '') {
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
          dataload_list: JSON.stringify(this.getDataloadList()),
        }
      })
    },
    async ATAlistClick(ata: { key: string, value: string }) {
      this.selectedATAId = ata.key
      const res = (await http({
        url: `/equipment-list?ATA_id=${ata.key}`,
        method: "GET",
      })) as MyResponse<Equipment[]>
      this.pageData.equipmentlist = res.result
    },
    async EquipmentClick(equipment: Equipment) {
      this.selectedEquipmentsId = equipment.id
      const res = (await http({
        url: `/part-list?equipment_id=${equipment.id}`,
        method: "GET",
      })) as MyResponse<Part[]>
      this.pageData.partlist = res.result
    },
    async PartClick(part: Part) {
      if (this.selectedPartIdx.includes(part.id)) {
        this.selectedPartIdx = this.selectedPartIdx.filter(item => item !== part.id)
      } else {
        this.selectedPartIdx.push(part.id)
      }
    },
    tableRowClassName({ row, rowIndex }: { row: Part, rowIndex: number }) {
      if (this.selectedPartIdx.includes(row.id)) {
        return 'highlighted-row';
      }
      return '';
    },
    getDataloadList() {
      const dataload_list: Array<{
        equipment_id: string,
        part_id: string[],
      }> = []
      dataload_list.push({
        equipment_id: this.selectedEquipmentsId,
        part_id: this.selectedPartIdx,
      })
      return dataload_list
    },
    goBack() {
      this.$router.push({ name: "LoadStatus" });
    },
    printPage,
    customSortMethodForProgressColumn,
  }
}
</script>
<!-- <style lang='scss'
       scoped>
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
    </style> -->
