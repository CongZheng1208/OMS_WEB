<template>
  <div style="background-color: rgb(45, 45, 45);">
    <el-header height="9vh">
      <el-row style="width: 100%;">
        <el-col :span="3">
          <div class="el-header-title"> Select ATA System and Equipment </div>
        </el-col>
        <el-col :span="18">
          <div class="el-header-radios">
            <div class="radio"
                 @click="changeRadio('NVMDataRetrieval'); clearSelectedOptions()">
              <input type="radio"
                     name="retrieval-radio"
                     :checked="displaySelected == 'NVMDataRetrieval'" />
              <span>Retrieval</span>
            </div>
            <div class="radio"
                 @click="changeRadio('NVMDataReset'); clearSelectedOptions()">
              <input type="radio"
                     name="reset-radio"
                     :checked="displaySelected == 'NVMDataReset'" />
              <span>Reset(All legs)</span>
            </div>
          </div>
        </el-col>
        <el-col :span="3">
          <Clock />
        </el-col>
      </el-row>
    </el-header>
    <el-main>
      <el-row :gutter="2">
        <el-col :span="11"
                style="height: 70vh; border:  0.5px solid rgb(111, 111, 111);">
          <el-table v-if="displaySelected == 'NVMDataRetrieval'"
                    highlight-current-row
                    height="70vh"
                    style=" background-color: rgb(46, 45, 45)"
                    @row-click="handleATARowClickRetrieval"
                    :data="ATAsRetrieval"
                    :sort-method="customSortMethodForProgressColumn"
                    :header-cell-style="{ background: '#404040', color: '#FFFFFF', font: '14px' }"
                    :empty-text="'NO DATA DISPLAY'">
            <el-table-column :width="null"
                             :min-width="5"></el-table-column>
            <el-table-column prop="ataNumber"
                             label="ATA"
                             sortable
                             :width="null"
                             :min-width="15"></el-table-column>
            <el-table-column prop="equipmentName"
                             label="System Name"
                             sortable
                             :width="null"
                             :min-width="35"
                             :formatter="formatATAName"></el-table-column>
            <el-table-column :width="null"
                             :min-width="5"></el-table-column>
          </el-table>
          <el-table v-else
                    highlight-current-row
                    height="70vh"
                    style=" background-color: rgb(46, 45, 45)"
                    @row-click="handleATARowClickReset"
                    :data="ATAsReset"
                    :sort-method="customSortMethodForProgressColumn"
                    :header-cell-style="{ background: '#404040', color: '#FFFFFF', font: '14px' }"
                    :empty-text="'NO DATA DISPLAY'">
            <el-table-column :width="null"
                             :min-width="5"></el-table-column>
            <el-table-column prop="ataNumber"
                             label="ATA"
                             sortable
                             :width="null"
                             :min-width="15"></el-table-column>
            <el-table-column prop="equipmentName"
                             label="System Name"
                             sortable
                             :width="null"
                             :min-width="35"
                             :formatter="formatATAName"></el-table-column>
            <el-table-column :width="null"
                             :min-width="5"></el-table-column>
          </el-table>
        </el-col>
        <el-col :span="13"
                style="height: 70vh; border:  0.5px solid rgb(111, 111, 111);">
          <el-table v-if="displaySelected == 'NVMDataRetrieval'"
                    highlight-current-row
                    height="70vh"
                    style=" background-color: rgb(46, 45, 45)"
                    @row-click="handleEquipmentRetrievalRowClick"
                    :data="EquisRetrieval"
                    :sort-method="customSortMethodForProgressColumn"
                    :header-cell-style="{ background: '#404040', color: '#FFFFFF', font: '14px' }"
                    :empty-text="'NO DATA DISPLAY'"
                    :row-class-name="rowTestName">
            <el-table-column :width="null"
                             :min-width="5"></el-table-column>
            <el-table-column prop="memberSystemName"
                             label="Equipment Name"
                             sortable
                             :width="null"
                             :min-width="35"></el-table-column>
            <el-table-column prop="avai"
                             label="Availability"
                             sortable
                             :width="null"
                             :min-width="25"
                             :formatter="formatEquiAvailablilty"></el-table-column>
            <el-table-column :width="null"
                             :min-width="5"></el-table-column>
          </el-table>
          <el-table v-else
                    highlight-current-row
                    height="70vh"
                    style=" background-color: rgb(46, 45, 45)"
                    @row-click="handleEquipmentResetRowClick"
                    :data="EquisReset"
                    :sort-method="customSortMethodForProgressColumn"
                    :header-cell-style="{ background: '#404040', color: '#FFFFFF', font: '14px' }"
                    :empty-text="'NO DATA DISPLAY'"
                    :row-class-name="rowTestName">
            <el-table-column :width="null"
                             :min-width="5"></el-table-column>
            <el-table-column prop="memberSystemName"
                             label="Equipment Name"
                             sortable
                             :width="null"
                             :min-width="35"></el-table-column>
            <el-table-column prop="avai"
                             label="Availability"
                             sortable
                             :width="null"
                             :min-width="25"
                             :formatter="formatEquiAvailablilty"></el-table-column>
            <el-table-column :width="null"
                             :min-width="5"></el-table-column>
          </el-table>
        </el-col>
      </el-row>
      <el-dialog center
                 :visible.sync="isRetrievalAddedMsg"
                 title="CONFIRM">
        <p>Are you sure you want to ADD the equipment "{{ selectedEquiRetrieval.memberSystemName }}"?</p>
        <span slot="footer"
              class="dialog-footer">
          <el-button type="primary"
                     @click="confirmRetrievalAdd">Confirm</el-button>
          <el-button @click="cancelRetrievalAdd">Cancel</el-button>
        </span>
      </el-dialog>
      <el-dialog center
                 :visible.sync="isResetAddedMsg"
                 title="CONFIRM">
        <p>Are you sure you want to ADD the equipment "{{ selectedEquiReset.memberSystemName }}"?</p>
        <span slot="footer"
              class="dialog-footer">
          <el-button type="primary"
                     @click="confirmResetAdd">Confirm</el-button>
          <el-button @click="cancelResetAdd">Cancel</el-button>
        </span>
      </el-dialog>
      <el-dialog center
                 title="ERROR MESSAGE"
                 :visible.sync="isRetrievalSelected"
                 width="30%">
        <p>Please select a retrieval item!</p>
        <span slot="footer"
              class="dialog-footer">
          <el-button type="primary"
                     @click="isRetrievalSelected = false">OK</el-button>
        </span>
      </el-dialog>
      <el-dialog center
                 title="ERROR MESSAGE"
                 :visible.sync="isResetSelected"
                 width="30%">
        <p>Please select a reset item!</p>
        <span slot="footer"
              class="dialog-footer">
          <el-button type="primary"
                     @click="isResetSelected = false">OK</el-button>
        </span>
      </el-dialog>
    </el-main>
    <el-footer>
      <div>
        <button class="footer-btn"
                @click="printPage">PRINT</button>
      </div>
      <div>
        <button class="footer-btn"
                @click="goDefaultPage()">BACK</button>
        <button class="footer-btn"
                v-if="displaySelected == 'NVMDataRetrieval'"
                @click="sendRetrievalOrder()">RETRIEVAL</button>
        <button class="footer-btn"
                v-if="displaySelected == 'NVMDataReset'"
                @click="sendResetOrder()">RESET</button>
      </div>
    </el-footer>
  </div>
</template>
<script>
import Clock from '@/components/Clock/index.vue'
import qs from 'qs'
import { ataNameEnum } from '@/globals/enums'
import { printPage, customSortMethodForProgressColumn, changeRadio, handleTestOrder } from '@/utils/utils'
import { getRetrievalATAandEqui, getResetATAandEqui } from '@/services/centralMaintenance/nvmData/index';


export default {
  name: "DefaultResetPage",
  data() {
    return {

      displaySelected: 'NVMDataRetrieval',

      ATAsRetrieval: [],
      ATAsReset: [],

      EquisRetrieval: [],
      EquisReset: [],

      selectedEquiRetrieval: {},
      selectedEquiReset: {},

      selectedMemberSystemIdsRetrieval: [],
      selectedMemberSystemIdsReset: [],

      isRetrievalAddedMsg: false,
      isResetAddedMsg: false,

      isRetrievalSelected: false,
      isResetSelected: false,
    };
  },
  created() {

    this.displaySelected = this.$route.params.selectedMode;

    console.log("this.displaySelected", this.displaySelected)

    getRetrievalATAandEqui().then(response => {
      this.ataEquiDataRetrieval = response
      Object.keys(response).forEach(key => {
        this.ATAsRetrieval.push({
          ataNumber: key,
          systemName: "to be done",
        });
      });
    });
    getResetATAandEqui().then(response => {
      this.ataEquiDataReset = response
      Object.keys(response).forEach(key => {
        this.ATAsReset.push({
          ataNumber: key,
          systemName: "to be done",
        });
      });
    });
  },
  components: {
    Clock
  },
  methods: {
    clearSelectedOptions() {

      this.selectedEquiRetrieval = {};
      this.selectedEquiReset = {};
      this.selectedMemberSystemIdsRetrieval = [];
      this.selectedMemberSystemIdsReset = []

      this.EquisRetrieval = []
      this.EquisReset = []
    },
    /**
     * 本函数用于跳转页面
     */
    goDefaultPage() {
      this.$router.push({ name: "NVMDataDefault" });
    },

    /**
     * 本函数用于设置EquiAvailablilty的显示格式
     * @param {*} row table选中行信息
     */
    formatEquiAvailablilty(row) {
      return row.avai == "1" ? "Available" : "Unavailable";
    },

    /**
     * 本函数用于
     * 即将flight_phase原数据对应为state中flightPhaseEnum枚举值
     * @param {*} row table选中行信息
     */
    formatATAName(row) {
      return ataNameEnum[row.ataNumber.substring(0, 2)];
    },

    /**
     * 本函数用于确定某行是否可被选中样式
     * @param {*} row table选中行信息
     */
    rowTestName({ row }) {
      return row.avai == "1" ? '' : 'disable-row';
    },

    /**
     * 本函数用于选中某个ATA
     * @param {Object} row
     */
    handleATARowClickRetrieval(row) {
      this.EquisRetrieval = this.ataEquiDataRetrieval[row.ataNumber]
    },

    /**
     * 本函数用于选中要进行的装备,并进行可选性状态判断
     * @param {Object} row
     */
    handleEquipmentRetrievalRowClick(row) {
      if (row.avai !== "1") {
        this.$message({
          type: 'warning',
          message: 'This nvm is unavailable!'
        });
      } else if (this.selectedMemberSystemIdsRetrieval.includes(row.memberSystemId)) {
        this.$message('This equipment has been selected');
      }
      else {
        this.isRetrievalAddedMsg = true
        this.selectedEquiRetrieval = row
      }
    },

    confirmRetrievalAdd() {
      this.selectedMemberSystemIdsRetrieval.push(this.selectedEquiRetrieval.memberSystemId);
      this.$message({ message: 'Successfully selected', type: 'success' });
      //}
      this.isRetrievalAddedMsg = false
    },

    cancelRetrievalAdd() {
      this.$message({
        message: 'Already canceled'
      });
      this.isRetrievalAddedMsg = false
    },

    /**
     * 本函数用于选中某个ATA
     * @param {Object} row
     */
    handleATARowClickReset(row) {
      this.EquisReset = this.ataEquiDataReset[row.ataNumber]
    },
    /**
     * 本函数用于选中要进行的装备
     * @param {Object} row
     */
    handleEquipmentResetRowClick(row) {
      if (row.avai !== "1") {
        this.$message({
          type: 'warning',
          message: 'This nvm is unavailable!'
        });
      } else if (this.selectedMemberSystemIdsReset.includes(row.memberSystemId)) {
        this.$message('This equipment has been selected');
      } else {
        this.isResetAddedMsg = true
        this.selectedEquiReset = row
      }
    },

    confirmResetAdd() {

      this.selectedMemberSystemIdsReset.push(this.selectedEquiReset.memberSystemId);
      this.$message({ message: 'Successfully selected', type: 'success' });

      this.isResetAddedMsg = false
    },

    cancelResetAdd() {
      this.$message({
        message: 'Already canceled'
      });
      this.isResetAddedMsg = false
    },


    sendRetrievalOrder() {
      if (this.selectedMemberSystemIdsRetrieval.length === 0) {
        this.isRetrievalSelected = true
      } else {
        let tmp = qs.stringify({
          OrderType: "NVMRETRIEVAL",
          currentPage: "NVMDataManagement",
          selectedEquipmentID: this.selectedMemberSystemIdsRetrieval,
        });

        this.handleTestOrder(tmp)
        // this.interval = setInterval(() => {
        //   this.handleTestOrder(tmp)
        // }, 1000);
        this.selectedMemberSystemIdsRetrieval = []
      }
    },

    sendResetOrder() {
      if (this.selectedMemberSystemIdsReset.length === 0) {
        this.isResetSelected = true
      } else {
        let tmp = qs.stringify({
          OrderType: "NVMRESET",
          currentPage: "NVMDataManagement",
          selectedEquipmentID: this.selectedMemberSystemIdsReset,
        });
        this.handleTestOrder(tmp)
        this.selectedMemberSystemIdsReset = []
      }
    },

    changeRadio,
    printPage,
    handleTestOrder,
    customSortMethodForProgressColumn
  }
}

</script>
<style scoped></style>
