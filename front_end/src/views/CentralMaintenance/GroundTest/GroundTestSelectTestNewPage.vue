<template>
  <div>
    <el-header style="height: 10vh;">
      <el-row style="width: 100%;">
        <el-col :span="21">
          <div class="el-header-title"> Test Selection </div>
        </el-col>
        <el-col :span="3">
          <Clock />
        </el-col>
      </el-row>
    </el-header>
    <el-main>
      <el-row :gutter="2">
        <el-col :span="6">
          <el-table highlight-current-row
                    height="68vh"
                    style=" background-color: rgb(46, 45, 45)"
                    @row-click="handleATARowClick"
                    :data="ATAs"
                    :sort-method="customSortMethodForProgressColumn"
                    :header-cell-style="{ background: '#404040', color: '#FFFFFF', font: '14px' }"
                    :empty-text="'No Data Display'">
            <el-table-column :width="null"
                             :min-width="5"></el-table-column>
            <el-table-column prop="ataNumber"
                             label="ATA"
                             sortable
                             :width="null"
                             :min-width="20"></el-table-column>
            <el-table-column prop="systemName"
                             label="System Name"
                             sortable
                             :width="null"
                             :min-width="50"></el-table-column>
            <el-table-column :width="null"
                             :min-width="5"></el-table-column>
          </el-table>
        </el-col>
        <el-col :span="6">
          <el-table highlight-current-row
                    height="68vh"
                    @row-click="handleEquipmentRowClick"
                    style=" background-color: rgb(46, 45, 45)"
                    :data="Equipments"
                    :sort-method="customSortMethodForProgressColumn"
                    :header-cell-style="{ background: '#404040', color: '#FFFFFF', font: '14px' }"
                    :empty-text="'No Data Display'"
                    :row-class-name="rowEquipmentName">
            <el-table-column :width="null"
                             :min-width="5"></el-table-column>
            <el-table-column prop="equipmentName"
                             label="Equipment Name"
                             sortable
                             :width="null"
                             :min-width="60"></el-table-column>
            <el-table-column prop="availability"
                             label="Availability"
                             sortable
                             :width="null"
                             :min-width="40"
                             :formatter="formatEquiAvailablilty"></el-table-column>
            <el-table-column :width="null"
                             :min-width="5"></el-table-column>
          </el-table>
        </el-col>
        <el-col :span="12">
          <el-table highlight-current-row
                    class="test-table"
                    height="68vh"
                    style="background-color: rgb(46, 45, 45)"
                    @row-click="handleTestRowClick"
                    :data="filteredTests"
                    :sort-method="customSortMethodForProgressColumn"
                    :header-cell-style="{ background: '#404040', color: '#FFFFFF', font: '14px' }"
                    :empty-text="'No Data Display'"
                    :row-class-name="rowTestName">
            <el-table-column :width="null"
                             :min-width="5"></el-table-column>
            <el-table-column prop="InitiatedTestName"
                             label="Test Name"
                             sortable
                             :width="null"
                             :min-width="100"></el-table-column>
            <el-table-column align="right"
                             :min-width="50">
              <template slot="header"
                        slot-scope="scope">
                <el-input v-model="searchInput"
                          size="mini"
                          placeholder="Enter key word here"
                          clearable />
              </template>
            </el-table-column>
            <el-table-column prop="TestDurationTime"
                             label="Duration(mins)"
                             sortable
                             :width="null"
                             :min-width="40"></el-table-column>
            <el-table-column :width="null"
                             :min-width="5"></el-table-column>
          </el-table>
          <div class="table-outer-number"> Number of Tests: {{ filteredTests.length }} </div>
        </el-col>
      </el-row>
      <el-dialog title="Error Message"
                 :visible.sync="isTestNotBeSelected"
                 width="30%">
        <span style=" font-size: 15px;">Please select a test!</span>
        <span slot="footer"
              class="dialog-footer">
          <el-button type="primary"
                     @click="isTestNotBeSelected = false"> OK </el-button>
        </span>
      </el-dialog>
    </el-main>
    <el-footer>
      <div>
      </div>
      <div>
        <button class="footer-btn"
                @click="goDefaultPage()">BACK</button>
        <button class="footer-btn"
                @click="goThreeTestsPage()">SELECT</button>
      </div>
    </el-footer>
  </div>
</template>
<script>
import { getAllAtaEquiTests } from '@/services/centralMaintenance/groundTest/index.js';
import { ataNameEnum } from '@/globals/enums.js'
import { updateCurrentTime, customSortMethodForProgressColumn } from '@/utils/utils'
import Clock from '@/components/Clock'

export default {
  data() {
    return {
      ATAs: [],
      Equipments: [],
      Tests: [],
      selectedTests: [],


        InterferingTestIndexs: [],

      selectedTestId: "",
      isTestNotBeSelected: false,

      searchInput: "",
      testCountTotal: 0,

      acReg: "C-WXWB",
      currentTime: '',
      currentDate: "",
    }
  },
  components: {
    Clock
  },
  methods: {
    /**
     * 本函数用于开启用户选中的测试
     * @param {Object} row
     */
    handleATARowClick(row) {
      let selectedEquipment = this.$store.state.groundTestList.ataAndEquiArray[row.ataNumber]
      this.Equipments = []
      this.Tests = []
      Object.keys(selectedEquipment).forEach(key => {
        this.Equipments.push({
          equipmentName: selectedEquipment[key].MemberSystemName,
          availability: selectedEquipment[key].Tests[0].TestAvailable,
          Tests: selectedEquipment[key].Tests,
        });
      });

      console.log("Tests is:", this.Equipments)
    },

    /**
     * 本函数用于更新更新选中行的status属性到selectedRowStatus变量
     * @param {string} row - menus数据的name属性
     */
    handleEquipmentRowClick(row) {

      if (row.availability !== "0") {
        this.$message('This equipment is currently unavailable');
        return false;
      } else {
        this.Tests = row.Tests
      }

      console.log(this.Tests)
    },

    /**
     * 本函数用于更新更新选中行的status属性到selectedRowStatus变量
     * @param {string} row - rawData数据的ataNumber属性
     */
    handleTestRowClick(row) {

      if (this.selectedTests.includes(row)) {
        this.$message({
          type: 'warning',
          message: 'This text is already selected!'
        });
      } else if (this.InterferingTestIndexs.includes(row.InitiatedTest_Index)) {
        this.$message({
          type: 'warning',
          message: 'This text is interfering!'
        });
      } else {
        this.$confirm('Do you want to add parameter ', row.InitiatedTestName, ' to the list to be opened?', 'Tips', {
          confirmButtonText: 'Confirm',
          cancelButtonText: 'Cancel',
          type: 'warning'
        }).then(() => {

          this.selectedTests.push(row)

          this.InterferingTestIndexs = [...this.InterferingTestIndexs, ...row.InterferingTests_Index.split(';').filter(Boolean)];
          console.log(this.InterferingTestIndexs)

          this.$message({
            type: 'success',
            message: 'Success!'
          });

        }).catch(() => {
          this.$message({
            type: 'info',
            message: 'Canceled'
          });
        });
      }
    },


    /**
     * 本函数用于确定某行是否可被选中样式
     * @param {*} row table选中行信息
     */
    rowEquipmentName({ row }) {
      return row.availability == "0" ? '' : 'disable-row';
    },


    /**
     * 本函数用于确定某行是否可被选中样式
     * @param {*} row table选中行信息
     */
    rowTestName({ row }) {
      return this.InterferingTestIndexs.includes(row.InitiatedTest_Index) ? 'disable-row' : '';
    },


    /**
     * 本函数用于设置EquiAvailablilty的显示格式
     * @param {*} row table选中行信息
     */
    formatEquiAvailablilty(row) {
      return row.availability == "0" ? "Available" : "Unavailable";
    },

    /**
     * 本函数用于跳转页面
     */
    goThreeTestsPage() {
      // 如果选择了要进行的测试
      if (this.selectedTests.length > 0) {
        this.$router.push({ name: "ThreeTests", params: { selectedTests: this.selectedTests } });
      } else {
        // 否则弹框提示
        this.isTestNotBeSelected = true
      }
    },

    /**
     * 本函数用于跳转页面
     */
    goDefaultPage() {
      this.$router.push({ name: "TestList" });
    },

    updateCurrentTime,
    customSortMethodForProgressColumn,
  },

  computed: {
    filteredTests() {

      if (this.Tests == []) {
        this.testCountTotal = 0
        return []
      } else {
        this.testCountTotal = this.Tests.filter((item) => {
          return item.InitiatedTestName.toLowerCase().includes(this.searchInput.toLowerCase());
        }).length

        return this.Tests.filter((item) => {
          return item.InitiatedTestName.toLowerCase().includes(this.searchInput.toLowerCase());
        })
      }
    },
  },

  mounted() {

    getAllAtaEquiTests().then(response => {
      Object.keys(response).forEach(key => {
        this.ATAs.push({
          ataNumber: key,
          systemName: "to be done"
        });
      });
    })
  },
}

</script>
<style scoped></style>
