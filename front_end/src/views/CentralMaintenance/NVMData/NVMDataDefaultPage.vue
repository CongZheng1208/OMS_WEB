<template>
  <div style="background-color: rgb(45, 45, 45);">
    <el-header height="12vh">
      <el-row style="width: 100%;">
        <el-col :span="3">
          <div class="el-header-title"> Select Option </div>
        </el-col>
        <el-col :span="18">
          <div class="radio"
               @click="changeRadio('NVMDataRetrieval'); selectedRetrievalData = []; selectedResetData = []">
            <input type="radio"
                   name="retrieval-radio"
                   :checked="displaySelected == 'NVMDataRetrieval'" />
            <span>RETRIEVAL</span>
          </div>
          <div class="radio"
               @click="changeRadio('NVMDataReset'); selectedRetrievalData = []; selectedResetData = []">
            <input type="radio"
                   name="reset-radio"
                   :checked="displaySelected == 'NVMDataReset'" />
            <span>RESET</span>
          </div>
        </el-col>
        <el-col :span="3">
          <Clock />
        </el-col>
      </el-row>
    </el-header>
    <el-main>
      <el-row :gutter="2">
        <el-col :span="14">
          <div v-if="displaySelected == 'NVMDataRetrieval'">
            <el-table highlight-current-row
                      height="70vh"
                      style=" background-color: rgb(46, 45, 45)"
                      @row-click="handleClickRetrieval"
                      :data="dataForRetrieval"
                      :sort-method="customSortMethodForProgressColumn"
                      :header-cell-style="{ background: '#404040', color: '#FFFFFF', font: '14px' }"
                      :empty-text="'No Data Display'"
                      v-loading="loading"
                      element-loading-text="Data Loading..."
                      element-loading-spinner="el-icon-loading"
                      element-loading-background="rgba(0, 0, 0, 0.5)"
                      :row-class-name="rowRetrievalName">
              <el-table-column :width="null"
                               :min-width="5"></el-table-column>
              <el-table-column prop="ata"
                               label="ATA"
                               sortable
                               :width="null"
                               :min-width="15"></el-table-column>
              <el-table-column prop="memberSystemName"
                               label="Equiment Name"
                               sortable
                               :width="null"
                               :min-width="35"></el-table-column>
              <el-table-column prop="startTime"
                               label="Start Time"
                               sortable
                               :width="null"
                               :min-width="25"></el-table-column>
              <el-table-column prop="status"
                               label="Status"
                               sortable
                               :width="null"
                               :min-width="20"></el-table-column>
              <el-table-column prop="elapsedTime"
                               label="Elapsed Time"
                               sortable
                               :width="null"
                               :min-width="20"></el-table-column>
              <el-table-column :width="null"
                               :min-width="5"></el-table-column>
            </el-table>
            <div class="table-outer-number"> Total Number: {{ dataForRetrieval.length }} </div>
          </div>
          <div v-else>
            <el-table highlight-current-row
                      height="70vh"
                      style=" background-color: rgb(46, 45, 45)"
                      @row-click="handleClickReset"
                      :data="dataForReset"
                      :sort-method="customSortMethodForProgressColumn"
                      :header-cell-style="{ background: '#404040', color: '#FFFFFF', font: '14px' }"
                      :empty-text="'No Data Display'"
                      :row-class-name="rowResetName">
              <el-table-column :width="null"
                               :min-width="5"></el-table-column>
              <el-table-column prop="ata"
                               label="ATA"
                               sortable
                               :width="null"
                               :min-width="15"></el-table-column>
              <el-table-column prop="memberSystemName"
                               label="Equiment Name"
                               sortable
                               :width="null"
                               :min-width="35"></el-table-column>
              <el-table-column prop="startTime"
                               label="Start Time"
                               sortable
                               :width="null"
                               :min-width="25"></el-table-column>
              <el-table-column prop="status"
                               label="Status"
                               sortable
                               :width="null"
                               :min-width="20"></el-table-column>
              <el-table-column prop="elapsedTime"
                               label="Elapsed Time"
                               sortable
                               :width="null"
                               :min-width="20"></el-table-column>
              <el-table-column :width="null"
                               :min-width="5"></el-table-column>
            </el-table>
            <div class="table-outer-number"> Total Number: {{ dataForReset.length }} </div>
          </div>
        </el-col>
        <el-col :span="10"
                style="padding-right: 0.5vh;">
          <div class="custom-card"
               shadow="hover"
               style="height: 70vh">
            <div class="custom-header">DETAILS</div>
            <div class="custom-content"
                 v-if="displaySelected == 'NVMDataRetrieval'">
              <div v-if="Object.keys(selectedRetrievalData).length !== 0">{{ selectedRetrievalData.details }}
                <el-progress v-if="['INPROGRESS', 'COMPLETE'].includes(selectedRetrievalData.status)"
                             :percentage=parseInt(selectedRetrievalData.processPercent)></el-progress></div>
              <div v-else
                   class="content-alert"> No Alive Data </div>
            </div>
            <div class="custom-content"
                 v-else>
              <div v-if="Object.keys(selectedResetData).length !== 0"> {{ selectedResetData.details }} <el-progress
                             v-if="['INPROGRESS', 'COMPLETE'].includes(selectedResetData.status)"
                             :percentage=parseInt(selectedResetData.processPercent)></el-progress></div>
              <div v-else
                   class="content-alert"> No Alive Data </div>
            </div>
          </div>
        </el-col>
      </el-row>
    </el-main>
    <el-footer>
      <div>
        <button class="footer-btn"
                @click="printPage">PRINT</button>
      </div>
      <div>
        <button class="footer-btn"
                @click="goManagementPage()">MANAGE NVM</button>
      </div>
    </el-footer>
  </div>
</template>
<script>
import Clock from '@/components/Clock'
import { printPage, customSortMethodForProgressColumn, changeRadio } from '@/utils/utils.js'
import { getRetrievalStatus, getResetStatus } from '../../../services/centralMaintenance/nvmData';


export default {
  name: "DefaultResetPage",

  data() {
    return {
      displaySelected: 'NVMDataRetrieval',
      interval: '',

      selectedRetrievalData: {},
      selectedResetData: {},

      loading: true,
      dataForRetrieval: [],
      dataForReset: [],
    };
  },
  components: {
    Clock
  },
  mounted() {
    this.interval = setInterval(() => {
      this.getNVMStatus();
    }, 1000); // 每秒执行一次
    setTimeout(() => {
      this.loading = false;
    }, 1000);
  },
  beforeDestroy() {
    clearInterval(this.interval);
  },
  methods: {
    /**
     * 本函数用于跳转页面
     */
    goManagementPage() {
      this.$router.push({ name: "NVMDataManagement" });
    },

    handleClickRetrieval(row) {
      this.selectedRetrievalData = row
    },

    handleClickReset(row) {
      this.selectedResetData = row

    },

    /**
     * 本函数用于确定某行是否可被选中样式
     * @param {*} row table选中行信息
     */
    rowRetrievalName({ row }) {
      return this.selectedRetrievalData.memberSystemId == row.memberSystemId ? 'current-row' : '';
    },

    /**
     * 本函数用于确定某行是否可被选中样式
     * @param {*} row table选中行信息
     */
    rowResetName({ row }) {
      return this.selectedResetData.memberSystemId == row.memberSystemId ? 'current-row' : '';
    },


    getNVMStatus() {
      getRetrievalStatus().then(response => {
        this.dataForRetrieval = response
      }).catch(error => {
        console.error('Error in getting nvm retrieval list:', error);
      });
      getResetStatus().then(response => {
        this.dataForReset = response
      }).catch(error => {
        console.error('Error in getting nvm reset list:', error);
      });
    },
    changeRadio,
    printPage,
    customSortMethodForProgressColumn
  }
}

</script>
<style scoped></style>
