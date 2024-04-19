<template>
  <div>
    <el-header
      style="
        text-align: left;
        font-weight: bold;
        color: white;
        padding-top: 3vh;
        padding-left: 4vh;
        font-size: 16px;
        height: 13vh;
      "
    >
      <el-row style="width: 100%;">
        <el-col :span="3">
          <div class="el-header-title">
            Select Filter:
          </div>

        </el-col>

        <el-col :span="21">
          <div class="el-header-title">
            <el-input
              placeholder="Please input filters"
              v-model="input3"
              class="input-with-select"
              style="width: 50vh;  background-color: grey;"
            >
              <el-select v-model="select" slot="prepend" placeholder="Please select">
                <el-option label="FIM Code" value="1"></el-option>
                <el-option label="Flight Phase" value="2"></el-option>
                <el-option label="Flight Leg" value="3"></el-option>
              </el-select>
              <el-button slot="append"
                icon="el-icon-search"
                style="background-color: rgb(46, 45, 45); transition: background-color 0.3s;">
              </el-button>
            </el-input>
          </div>
        </el-col>
      </el-row>

    </el-header>

    <el-main style="flex: 1; padding: 0">
      <div>
        <el-table
          highlight-current-row
          style="width: 100%; background-color: rgb(46, 45, 45)"
          :data="existingFailureArray"
          :sort-method="customSortMethodForProgressColumn"
          :header-cell-style="{
            background: '#404040',
            color: '#FFFFFF',
            font: '14px',
            'text-align': 'center',
          }"
          :cell-style="{ 'text-align': 'center' }"
          :empty-text="'No Data Display'"
          row-key="id"
          :tree-props="{ children: 'children', hasChildren: 'hasChildren' }"
          @current-change="tableRowClicked"
        >
          <el-table-column :width="null" :min-width="5"></el-table-column>
          <el-table-column
            prop="fimcode_info"
            label="FIM Code"
            sortable
            :width="null"
            :min-width="30"
          ></el-table-column>
          <el-table-column
            prop="failure_name_info"
            label="Failure Name"
            :width="null"
            :min-width="75"
          ></el-table-column>
          <el-table-column
            prop="failure_time"
            label="Date/Time"
            sortable
            :width="null"
            :min-width="55"
          ></el-table-column>
          <el-table-column
            prop="flight_phase"
            label="Flight Phase"
            :width="null"
            :min-width="35"
            :formatter="FlightPhaseData"
          ></el-table-column>
          <el-table-column
            prop="failure_state"
            label="Current State"
            :width="null"
            :min-width="35"
            :formatter="CurrentStateData"
          ></el-table-column>
          <el-table-column
            prop="flight_leg"
            label="Flight Leg"
            sortable
            :width="null"
            :min-width="35"
          ></el-table-column>
          <el-table-column
            prop="fde_text"
            label="FDE Alert Text"
            :width="null"
            :min-width="50"
            :formatter="FDETextData"
          ></el-table-column>

          <el-table-column :width="null" :min-width="5"></el-table-column>
        </el-table>
      </div>
    </el-main>

    <el-footer>
      <div>
        <button class="footer-btn" @click="printPage">PRINT</button>
      </div>
      <div>
        <button class="footer-btn" @click="goBackFailureHistoryPage()">BACK</button>
        <button class="footer-btn" @click="goSelectPage()">SELECT</button>
      </div>
    </el-footer>
  </div>
</template>

<script>
import {printPage, customSortMethodForProgressColumn} from '@/utils/utils.js'
import {flightPhaseEnum, failureStateEnum} from '@/globals/enums.js'
export default {
  components: {},
  name: "ExistingFailures",
  data() {
    return {
      existingFailureArray: [],


      input3: '',
      select: ''






    };
  },

  methods: {
    /**
     * 更新store的选中行数据
     * @param {*} item 选中行数据
     */
     tableRowClicked(item) {
      this.$store.state.failureList.selectedFailureId = item.id;
    },
    /**
     * 本函数用于切换当前展示数据至其下一条failure数据
     *
     */
     goBackFailureHistoryPage() {
      this.$router.push({ name: "FailureHistory" });
    },
    /**
     * 本函数用于切换当前展示数据至其下一条failure数据
     *
     */
    goSelectPage() {
      this.$router.push({ name: "SelectFailuresDetails" });
    },

    /**
     * 本函数用于设置FDE Alert Text列中fde_text的显示格式
     * 即将fde_text原数据（array）转为string
     * @param {*} row table选中行信息
     */
    FDETextData(row) {
      return JSON.stringify(row.fde_text);
    },
    /**
     * 本函数用于设置Flight Phase列中flight_phase的显示格式
     * 即将flight_phase原数据对应为state中flightPhaseEnum枚举值
     * @param {*} row table选中行信息
     */
    FlightPhaseData(row) {
      let fpIndex = row.flight_phase;
      return flightPhaseEnum[fpIndex];
    },
    /**
     * 本函数用于设置Current State列中failure_state的显示格式
     * 即将failure_state原数据对应为state中failureStateEnum枚举值
     * @param {*} row table选中行信息
     */
    CurrentStateData(row) {
      let fsIndex = row.failure_state;
      return failureStateEnum[fsIndex];
    },





    printPage,
    customSortMethodForProgressColumn
  },
  mounted() {



  },
};
</script>

<style scoped>
</style>
