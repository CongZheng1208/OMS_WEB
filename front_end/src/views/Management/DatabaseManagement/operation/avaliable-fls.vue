<template>
  <div> <el-main>
      <el-row style="width: 100%; border:  0.5px solid rgb(111, 111, 111);">
        <el-col :span="12">
          <el-row style=" border:  0.5px solid rgb(111, 111, 111);">
            <el-table height="70vh"
                      style="background-color: rgb(45, 45, 45);"
                      :sort-method="customSortMethodForProgressColumn"
                      :header-cell-style="{ background: '#404040', color: '#FFFFFF', font: '14px' }"
                      :empty-text="'NO DATA DISPLAY'">
              <el-table-column :width="null"
                               :min-width="5"></el-table-column>
              <el-table-column :width="null"
                               sortable
                               :min-width="30">
                <template slot="header"
                          slot-scope="scope">Part Number<el-input
                            style="margin-left: 2vh; margin-right: 1vh; width: 15vh;"
                            placeholder="Enter key word here"
                            size="mini"
                            clearable />
                  <!--    <i class="el-icon-search"></i> -->
                </template>
              </el-table-column>
              <el-table-column label="Description"
                               :width="null"
                               :min-width="30"></el-table-column>
              <el-table-column :width="null"
                               :min-width="5"></el-table-column>
            </el-table>
          </el-row>
        </el-col>
        <el-col :span="12">
          <el-row style=" border:  0.5px solid rgb(111, 111, 111);">
            <el-table height="70vh"
                      style="background-color: rgb(45, 45, 45);"
                      :sort-method="customSortMethodForProgressColumn"
                      :header-cell-style="{ background: '#404040', color: '#FFFFFF', font: '14px' }"
                      :empty-text="'NO DATA DISPLAY'">
              <el-table-column :width="null"
                               :min-width="5"></el-table-column>
              <el-table-column label="Equipment"
                               :width="null"
                               :min-width="30"></el-table-column>
              <el-table-column label="ATA"
                               sortable
                               :width="null"
                               :min-width="30"></el-table-column>
              <el-table-column :width="null"
                               :min-width="5"></el-table-column>
            </el-table>
          </el-row>
        </el-col>
      </el-row>
    </el-main>
    <el-footer>
      <div>
        <button @click="printPage"
                class="footer-btn">PRINT</button>
      </div>
      <div>
        <button class="footer-btn">DELETE</button>
        <button class="footer-btn">DOWNLOAD</button>
      </div>
    </el-footer>
  </div>
</template>
<script lang="ts">
import { printPage, customSortMethodForProgressColumn, changeRadio } from '@/utils/utils'
export default {
  name: "avaliablefls",
  components: {

  },
  data() {
    return {
    }
  },
  methods: {
    printPage,
    customSortMethodForProgressColumn,
    changeRadio
  },
  created() {
  },
}
</script>
