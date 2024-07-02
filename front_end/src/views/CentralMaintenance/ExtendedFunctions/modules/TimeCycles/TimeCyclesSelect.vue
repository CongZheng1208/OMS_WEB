<template>
  <div>
    <el-main>
      <el-row :gutter="2">
        <el-col :span="12">
          <el-table highlight-current-row
                    height="67vh"
                    style=" background-color: rgb(46, 45, 45)"
                    @row-click="handleATARowClick"
                    :data="ATAs"
                    :sort-method="customSortMethodForProgressColumn"
                    :header-cell-style="{ background: '#404040', color: '#FFFFFF', font: '14px' }"
                    :empty-text="'NO DATA DISPLAY'">
            <el-table-column :width="null"
                             :min-width="5"></el-table-column>
            <el-table-column prop="ataNumber"
                             label="ATA Selection"
                             sortable
                             :width="null"
                             :min-width="20"></el-table-column>
            <el-table-column prop="systemName"
                             label="System Name"
                             sortable
                             :width="null"
                             :min-width="30"></el-table-column>
            <el-table-column :width="null"
                             :min-width="5"></el-table-column>
          </el-table>
        </el-col>
        <el-col :span="12">
          <el-table highlight-current-row
                    height="67vh"
                    style=" background-color: rgb(46, 45, 45)"
                    @row-click="handleEquipmentRowClick"
                    :data="Equis"
                    :sort-method="customSortMethodForProgressColumn"
                    :header-cell-style="{ background: '#404040', color: '#FFFFFF', font: '14px' }"
                    :empty-text="'NO DATA DISPLAY'"
                    :row-class-name="rowTestName">
            <el-table-column :width="null"
                             :min-width="5"></el-table-column>
            <el-table-column prop="MemberSystemName"
                             label="Equiment Name"
                             sortable
                             :width="null"
                             :min-width="35"></el-table-column>
            <el-table-column :width="null"
                             :min-width="5"></el-table-column>
          </el-table>
        </el-col>
      </el-row>
      <div class="table-outer-number">
        <el-button circle
                   slot="reference"
                   class="table-outer-button"
                   icon="el-icon-circle-plus-outline"
                   @click="isMemberSystemIDAddedAllMsg = true"></el-button> Total Number: {{ Equis.length }}
      </div>
      <el-dialog center
                 :visible.sync="isMemberSystemIDAddedMsg"
                 title="CONFIRM">
        <p>Are you sure you want to ADD the parameter "{{ selectedEqui.MemberSystemName }}"?</p>
        <span slot="footer"
              class="dialog-footer">
          <el-button type="primary"
                     @click="confirmAdd">Confirm</el-button>
          <el-button @click="cancelAdd">Cancel</el-button>
        </span>
      </el-dialog>
      <el-dialog center
                 :visible.sync="isMemberSystemIDAddedAllMsg"
                 title="CONFIRM">
        <p>Are you sure you want to ADD ALL of "{{ Equis.map(item => item.MemberSystemName).join(', ') }}"?</p>
        <span slot="footer"
              class="dialog-footer">
          <el-button type="primary"
                     @click="confirmAddAll">Confirm</el-button>
          <el-button @click="cancelAdd">Cancel</el-button>
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
                @click="goDefaultPage">BACK</button>
        <button class="footer-btn"
                @click="sendOrder">RETRIEVE</button>
      </div>
    </el-footer>
  </div>
</template>
<script>
import qs from 'qs'
import { printPage, customSortMethodForProgressColumn, handleTestOrder } from '@/utils/utils'
import { getATAandEqui } from '@/services/centralMaintenance/extendedFunctions/index';

export default {
  name: "DefaultResetPage",
  data() {
    return {
      ATAs: [],
      Equis: [],
      isMemberSystemIDAddedMsg: false,
      isMemberSystemIDAddedAllMsg: false,
      selectedEqui: {},
      selectedMemberSystemIds: []

    };
  },
  created() {
    getATAandEqui().then(response => {
      this.ataEquiData = response
      Object.keys(response).forEach(key => {
        this.ATAs.push({
          ataNumber: key,
          systemName: "to be done",
        });
      });
    });
  },
  methods: {
    /**
     * 本函数用于跳转页面
     */
    goDefaultPage() {
      this.$router.push({ name: "TimeCycles" });
    },

    /**
     * 本函数用于选中某个ATA
     * @param {Object} row
     */
    handleATARowClick(row) {
      this.Equis = this.ataEquiData[row.ataNumber]
    },

    /**
     * 本函数用于选中要进行的装备
     * @param {Object} row
     */
    handleEquipmentRowClick(row) {
      this.isMemberSystemIDAddedMsg = true
      this.selectedEqui = row
    },

    /**
     * 本函数用于确定某行是否可被选中样式
     * @param {*} row table选中行信息
     */
    rowTestName({ row }) {
      return this.selectedMemberSystemIds.includes(row.memberSystemId) ? 'current-row ' : '';
    },

    confirmAdd() {
      if (this.selectedMemberSystemIds.includes(this.selectedEqui.memberSystemId)) {
        this.$message('This equipment has been selected');
      } else if (this.selectedEqui.support == "1") {
        // 判断逻辑：若该项目的support值为1且avail为0，则无法被添加
        if (this.selectedEqui.avail !== "0") {
          this.$message('This equipment is currently unavailable');
        } else {
          this.selectedMemberSystemIds.push(this.selectedEqui.memberSystemId);
          this.$message({ message: 'Successfully selected', type: 'success' });
        }
      } else {
        this.$message('This equipment is currently unsupportable');
      }
      this.isMemberSystemIDAddedMsg = false
      // console.log( this.selectedMemberSystemIds)
    },


    confirmAddAll() {

      this.Equis.forEach((equipment) => {
        if (this.selectedMemberSystemIds.includes(equipment.memberSystemId)) {
          this.$message('This equipment has been selected');
        } else if (equipment.support == "1") {
          if (equipment.avail !== "0") {
            this.$message('This equipment is currently unavailable');
          } else {
            this.selectedMemberSystemIds.push(equipment.memberSystemId);
            this.$message({ message: 'Successfully selected', type: 'success' });
          }
        } else {
          this.$message('This equipment is currently unsupportable');
        }
      });

      this.isMemberSystemIDAddedAllMsg = false
    },

    cancelAdd() {
      this.$message({
        message: 'Already canceled'
      });
      this.isMemberSystemIDAddedMsg = false
      this.isMemberSystemIDAddedAllMsg = false
    },

    sendOrder() {
      let tmp = qs.stringify({
        OrderType: "TCRETRIEVE",
        currentPage: "TimeCyclesSelect",
        selectedEquipmentID: this.selectedMemberSystemIds
      });
      this.handleTestOrder(tmp)
      this.selectedMemberSystemIds = []

      this.$router.push({ name: "TimeCycles" });

    },

    printPage,
    handleTestOrder,
    customSortMethodForProgressColumn
  }
}

</script>
<style scoped></style>
