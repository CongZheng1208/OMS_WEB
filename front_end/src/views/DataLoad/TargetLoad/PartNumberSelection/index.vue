<template>
  <div class="bg-[rgb(45, 45, 45)]">
    <el-main>
      <el-col :span="12"
              style="border:  0.5px solid rgb(111, 111, 111);">
        <el-table highlight-current-row
                  style="width: 100%;background-color: rgb(46, 45, 45)"
                  :data="pageData.part_list"
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
                           sortable
                           :width="null"
                           :min-width="50">
            <template slot="header"
                      slot-scope="scope">Part Number <el-input style="margin-left: 2vh; margin-right: 1vh; width: 15vh;"
                        v-model="searchContent"
                        placeholder="Enter key part number here"
                        size="mini"
                        clearable />
              <!-- <i class="el-icon-search"></i> -->
            </template></el-table-column>
          <el-table-column prop="description"
                           label="Description"
                           :width="null"
                           :min-width="50"> </el-table-column>
          <el-table-column :width="null"
                           :min-width="5"></el-table-column>
        </el-table>
      </el-col>
      <el-col :span="12"
              style="border:  0.5px solid rgb(111, 111, 111);">
        <el-table style="width: 100%;background-color: rgb(46, 45, 45)"
                  :data="pageData.equipment_list"
                  :header-cell-style="{
        background: '#404040',
        color: '#FFFFFF',
        font: '14px'
      }"
                  :row-class-name="tableRowClassName"
                  height="70vh"
                  :empty-text="'NO DATA DISPLAY'"
                  row-key="index"
                  @row-click="EquipmentClick"
                  :tree-props="{ children: 'children', hasChildren: 'hasChildren' }">
          <el-table-column :width="null"
                           :min-width="5"></el-table-column>
          <el-table-column label="ATA"
                           :width="null"
                           sortable
                           :min-width="15"
                           :formatter="formatATAName"> </el-table-column>
          <el-table-column prop="name"
                           :width="null"
                           :min-width="35">
            <template slot="header"
                      slot-scope="scope">
              <div class="flex justify-between items-center"> Equipment Name <button class="header-btn"> Select
                  All</button>
              </div>
            </template>
          </el-table-column>
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
import { PageData, Part } from './store';
import { ATAlist, Equipment } from '../store'
import { customSortMethodForProgressColumn, printPage } from '@/utils/utils'

export default {
  name: 'PartNumberSelection',
  components: {
  },
  mixins: [],
  props: {

  },
  data() {
    return {
      ATAlist,
      pageData: new PageData(),
      seletedPartIdx: '',
      selectedEquipmentIdx: [] as Array<number>,
      searchContent: '',
      hasTimeOut: undefined as NodeJS.Timeout | undefined
    }
  },
  computed: {

  },
  watch: {
    searchContent() {
      if (this.hasTimeOut) {
        clearTimeout(this.hasTimeOut)
      }
      this.hasTimeOut = setTimeout(async () => {
        await this.searchPart()
      }, 500)
    }
  },
  mounted() {
    this.pageData.get_all_part()
  },
  methods: {
    tableRowClassName({ row, rowIndex }: { row: Equipment, rowIndex: number }) {
      if (this.selectedEquipmentIdx.includes(row.id)) {
        return 'highlighted-row';
      }
      return '';
    },
    async clearContent() {
      this.searchContent = ''
      await this.pageData.get_all_part()
    },
    PartClick(part: Part) {
      this.seletedPartIdx = part.id
      this.pageData.get_equipments_by_part_id(part.id)
    },
    EquipmentClick(equipment: Equipment) {
      const the_idx = this.selectedEquipmentIdx.indexOf(equipment.id)
      if (the_idx === -1) {
        this.selectedEquipmentIdx.push(equipment.id)
      } else {
        this.selectedEquipmentIdx.splice(the_idx, 1)
      }
    },
    getDataloadList() {
      const dataload_list: Array<{
        equipment_id: number,
        part_id: string[],
      }> = []
      this.selectedEquipmentIdx.forEach(item => {
        dataload_list.push({
          equipment_id: item,
          part_id: [this.seletedPartIdx,],
        })
      })
      return dataload_list
    },
    gotoDataUpload() {
      if (this.selectedEquipmentIdx.length === 0) {
        this.$message.error('Please select Equipment')
        return
      }
      if (this.seletedPartIdx === '') {
        this.$message.error('Please select Part')
        return
      }
      this.$router.push({
        name: "DataUpload",
        query: {
          dataload_list: JSON.stringify(this.getDataloadList()),
        }
      })
    }, formatATAName(row: Equipment) {
      return `${row.ATA_id.substring(0, 2)} ${this.ATAlist.find(item => item.key == row.ATA_id.substring(0, 2))?.value}`
    },
    async searchPart() {
      await this.pageData.search_part(this.searchContent)
    },
    goBack() {
      this.$router.push({ name: "LoadStatus" });
    },
    customSortMethodForProgressColumn,
    printPage
  },
};
</script>
<style lang='scss'
       scoped>

      .header-btn {
        @apply flex items-center justify-center text-white;
        width: 16vh;
        height: 3vh;
        font-size: 16px;
        font-weight: bold;
        // padding: 1vh;
        border-radius: 3px;
        border: 1px solid rgb(111, 111, 111);
        box-shadow: 5px 5px 5px 0px rgba(42, 42, 42, 0.5);
        background-color: rgb(65, 65, 65);
        transition: box-shadow 0.3s ease background-color 0.3s ease;
      }
    </style>
