<template>
  <div style="background-color: rgb(45, 45, 45);">
    <el-row style="border:  0.5px solid rgb(111, 111, 111);">
      <el-col :span="21">
        <div class="el-subheader"> Time Cycle Status: {{ }} </div>
      </el-col>
      <el-col :span="3">
        <div class="el-subheader"> Total Number: {{ }} </div>
      </el-col>
    </el-row>
    <el-row style="border:  0.5px solid rgb(111, 111, 111);">
      <el-table height="65vh"
                style="background-color: rgb(45, 45, 45);"
                :data="filteredTimeCycleData"
                :sort-method="customSortMethodForProgressColumn"
                :header-cell-style="{ background: '#404040', color: '#FFFFFF', font: '14px' }"
                :empty-text="'NO DATA DISPLAY'"
                v-loading="loading"
                element-loading-text="Data Loading..."
                element-loading-spinner="el-icon-loading"
                element-loading-background="rgba(0, 0, 0, 0.5)">
        <el-table-column :width="null"
                         :min-width="5"></el-table-column>
        <el-table-column prop="ATA"
                         label="ATA"
                         sortable
                         :width="null"
                         :min-width="30"
                         :filters="ataFilters"
                         :filter-method="filterHandler"></el-table-column>
        <el-table-column prop="MemberSystemName"
                         label="Equipment Name"
                         sortable
                         :width="null"
                         :min-width="100"
                         :filters="memberSystemNameFilters"
                         :filter-method="filterHandler">
          <template slot="header"
                    slot-scope="scope"> Equipment Name <el-input
                      style="margin-left: 2vh; margin-right: 1vh; width: 15vh;"
                      v-model="searchEquipmentNameInput"
                      size="mini"
                      placeholder="Equipment Name"
                      clearable />
            <i class="el-icon-search"></i>
          </template></el-table-column>
        <el-table-column prop="avail"
                         label="Availability"
                         sortable
                         :width="null"
                         :min-width="40"
                         :formatter="formatAvailablilty"
                         :filters="availFilters"
                         :filter-method="filterHandler"></el-table-column>
        <el-table-column prop="status"
                         label="Status"
                         sortable
                         :width="null"
                         :min-width="70">
          <template slot="header"
                    slot-scope="scope"> Status <el-input style="width: 15vh; margin-left: 2vh; margin-right: 1vh;"
                      v-model="searchStatusInput"
                      size="mini"
                      placeholder="Status"
                      clearable />
            <i class="el-icon-search"></i>
          </template></el-table-column>
        <el-table-column prop="hours"
                         label="Hours"
                         :width="null"
                         :formatter="formatHours"
                         :min-width="30"></el-table-column>
        <el-table-column prop="cycles"
                         label="Cycles"
                         :width="null"
                         :formatter="formatCycles"
                         :min-width="30">
        </el-table-column>
        <el-table-column label="Retrieval Data"
                         :width="null"
                         :min-width="30">
          <template slot-scope="scope">
            <el-button class="table-outer-button"
                       style="background-color: rgb(60, 60, 60);color:aliceblue;  font-weight: bold; border: 1px solid rgb(111, 111, 111); "
                       @click="sendOrder(scope.row)">Retrieval</el-button>
          </template>
        </el-table-column>
        <el-table-column :width="null"
                         :min-width="5"></el-table-column>
      </el-table>
      <div class="table-outer-tc"> Notes: Data marked with "*" is obtained by calculating When the MS compute module
        fails <el-button circle
                   slot="reference"
                   class="table-outer-button"
                   icon="el-icon-refresh"
                   @click="flashData"></el-button>
      </div>
    </el-row>
  </div>
</template>
<script>
import qs from 'qs'
import { printPage, customSortMethodForProgressColumn, handleTestOrder } from '@/utils/utils.ts'
import { getTimeCycle } from '@/services/centralMaintenance/extendedFunctions/index.js';

export default {
  data() {
    return {
      timeCycleData: [],
      currenTimeCyclesTimer: {},
      loading: true,

      searchStatusInput: "",
      searchEquipmentNameInput: "",

      timeCycleDataCountTotal: 0,

      ataFilters: [],
      memberSystemNameFilters: [],
      availFilters: []

    };
  },
  methods: {
    filterHandler(value, row, column) {
      if (value === 'all') {
        return true; // 不筛选
      } else {
        const property = column.property;
        return row[property] === value;
      }
    },

    /**
     * 本函数用于设置EquiAvailablilty的显示格式
     * @param {*} row table选中行信息
     */
    formatAvailablilty(row) {
      return row.avail == "1" ? "Available" : "Unavailable";
    },

    /**
     * 本函数用于设置EquiAvailablilty的显示格式
     * @param {*} row table选中行信息
     */
    formatHours(row) {
      return row.avail == "0" ? "--" : row.avail;
    },

    /**
     * 本函数用于设置EquiAvailablilty的显示格式
     * @param {*} row table选中行信息
     */
    formatHours(row) {
      return row.hours == "0" ? "--" : row.hours;
    },

    /**
     * 本函数用于设置EquiAvailablilty的显示格式
     * @param {*} row table选中行信息
     */
    formatCycles(row) {
      return row.cycles == "0" ? "--" : row.cycles;
    },


    /**
     * 本函数用于跳转页面
     */
    goSelectPage() {
      this.$router.push({ name: "TimeCyclesSelect" });
    },

    /**
     * 本函数用于创造筛选器
     */
    createFilters() {
      this.ataFilters = Array.from(new Set(this.timeCycleData.map(obj => obj.ATA))).map(value => {
        const filteredItems = this.timeCycleData.filter(item => item.ATA === value);
        return {
          text: value,
          value: value,
          count: filteredItems.length
        };
      });
      this.ataFilters.push({
        text: 'all',
        value: 'all',
        count: this.timeCycleData.length
      });

      this.memberSystemNameFilters = Array.from(new Set(this.timeCycleData.map(obj => obj.MemberSystemName))).map(value => {
        const filteredItems = this.timeCycleData.filter(item => item.MemberSystemName === value);
        return {
          text: value,
          value: value,
          count: filteredItems.length
        };
      });
      this.memberSystemNameFilters.push({
        text: 'all',
        value: 'all',
        count: this.timeCycleData.length
      });

      this.availFilters = Array.from(new Set(this.timeCycleData.map(obj => obj.avail))).map(value => {
        const filteredItems = this.timeCycleData.filter(item => item.avail === value);
        return {
          text: value,
          value: value,
          count: filteredItems.length
        };
      });
      this.availFilters.push({
        text: 'all',
        value: 'all',
        count: this.timeCycleData.length
      });

    },

    /**
     * 本函数用于实时获取时寿数据
     */
    flashData() {
      getTimeCycle().then(response => {
        this.timeCycleData = response;
        this.createFilters()
        // console.log(response)
      }).catch(error => {
        console.error('Error in getting fde list:', error);
      });

      this.loading = true

      setTimeout(() => {
        this.loading = false;
      }, 1000);
    },

    /**
     * 本函数用于发送待处理数据Id
     */
    sendOrder(row) {

      if (row.support == "1") {
        // 判断逻辑：若该项目的support值为1且avail为0，则无法被添加
        if (row.avail !== "0") {
          this.$message('This equipment is currently unavailable');
        } else {
          let tmp = qs.stringify({
            OrderType: "TCRETRIEVE",
            currentPage: "timeCycles",
            selectedEquipmentID: row.memberSystemId
          });
          this.handleTestOrder(tmp)
          this.$message({ message: 'Successfully retrieval', type: 'success' });
        }
      }
      else {
        this.$message('This equipment is currently unsupportable');
      }
    },


    /**
     * 本函数用于发送待处理数据Id
     */
    sendOrderAll() {

      let tmp = qs.stringify({
        OrderType: "TCRETRIEVE",
        currentPage: "timeCycles",
        selectedEquipmentID: []
      });
      this.handleTestOrder(tmp)
      this.$message({ message: 'Successfully selected', type: 'success' });
    },

    printPage,
    handleTestOrder,
    customSortMethodForProgressColumn
  },
  computed: {
    filteredTimeCycleData() {
      this.timeCycleDataCountTotal = this.timeCycleData.filter((item) => {
        return item.MemberSystemName.toLowerCase().includes(this.searchEquipmentNameInput.toLowerCase())
          && item.status.toLowerCase().includes(this.searchStatusInput.toLowerCase());
      }).length
      return this.timeCycleData.filter((item) => {
        return item.MemberSystemName.toLowerCase().includes(this.searchEquipmentNameInput.toLowerCase())
          && item.status.toLowerCase().includes(this.searchStatusInput.toLowerCase());
      });
    },
  },
  created() {
    this.flashData()
  },
  beforeDestroy() {
    clearInterval(this.currenTimeCyclesTimer)
  }
}
</script>
<style></style>
