<template>
  <div class="bg-[rgb(45, 45, 45)] p-20px">
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
                height="65vh"
                :empty-text="'NO DATA DISPLAY'"
                row-key="index"
                :tree-props="{ children: 'children', hasChildren: 'hasChildren' }"
                @current-change="PartClick">
        <el-table-column prop="id"
                         :width="null"
                         :min-width="5">
          <template slot="header"
                    slot-scope="scope">
            <div class="flex justify-between items-center">Part Number <div>
                <el-input style="margin-left: 2vh; margin-right: 1vh; width: 15vh;"
                          placeholder="Enter key word here"
                          v-model="searchContent"
                          size="mini"
                          clearable />
                <button @click="searchPart">
                  <i class="el-icon-search"></i>
                </button>
                <button @click="clearContent">清除</button>
              </div>
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="description"
                         label="Description"
                         :width="null"
                         :min-width="5"> </el-table-column>
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
                height="65vh"
                :empty-text="'NO DATA DISPLAY'"
                row-key="index"
                @row-click="EquipmentClick"
                :tree-props="{ children: 'children', hasChildren: 'hasChildren' }">
        <el-table-column label="ATA"
                         :width="null"
                         :min-width="5"
                         :formatter="formatATAName"
                         sortable> </el-table-column>
        <el-table-column prop="name"
                         :width="null"
                         :min-width="5">
          <template slot="header"
                    slot-scope="scope">
            <div class="flex justify-between items-center"> Equipment Name <button class="header-btn "> Select
                All</button>
            </div>
          </template>
        </el-table-column>
      </el-table>
    </el-col>
    <footer
            class="fixed bottom-0 left-0 right-0 px-4 py1 flex justify-between items-center border-t  border-t-[#6F6F6F]">
      <div>
        <button class="footer-btn">PRINT</button>
      </div>
      <div class="flex gap3">
        <button @click="gotoDataUpload()"
                class="footer-btn">SELECT</button>
      </div>
    </footer>
  </div>
</template>
<script lang="ts">
import { PageData, Part } from './store';
import { ATAlist, Equipment } from '../store'


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
      searchContent: ''
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
    }
  },
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

thead {
  tr {
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

.header-btn {
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
