<template>
  <!-- <div v-if="!isPdfPageSelected"> -->
  <div>
    <el-table
      highlight-current-row
      style="width: 100%; background-color: rgb(46, 45, 45)"
      :data="existingFDEArray"
      :sort-method="customSortMethodForProgressColumn"
      :header-cell-style="{
        background: '#404040',
        color: '#FFFFFF',
        font: '14px',
        'text-align': 'center',
      }"
      :cell-style="{ 'text-align': 'center' }"
      row-key="index"
      :tree-props="{ children: 'children', hasChildren: 'hasChildren' }"
      :empty-text="'No Data Display'"
      @current-change="tableRowClicked"
    >
      <!-- <el-button>test</el-button> -->
      <el-table-column :width="null" :min-width="10"></el-table-column>
      <el-table-column
        prop="FDECode"
        label="FDE Code"
        sortable
        :width="null"
        :min-width="35"
      ></el-table-column>
      <el-table-column
        prop="FDEText"
        label="FDE Test"
        :width="null"
        :min-width="35"
      ></el-table-column>
      <el-table-column
        prop="FDEStatus"
        label="First Status"
        :width="null"
        :min-width="30"
        :formatter="fdeStatusData"
      ></el-table-column>
      <el-table-column
        prop="FDEClass"
        label="FDE Class"
        :width="null"
        :min-width="30"
        :formatter="fdeClassData"
      ></el-table-column>
      <el-table-column
        prop="fde_time"
        label="Date/Time"
        sortable
        :width="null"
        :min-width="40"
      ></el-table-column>
      <el-table-column
        prop="FIMCode_info"
        label="FIM Code"
        sortable
        :width="null"
        :min-width="35"
      >
        <!-- <template slot-scope="scope">
          <span
            @click=" isPdfPageSelected = true"
            :style="{ padding: '1vh', height: '4vh', width: '4vh', color: 'white'}"
            style="transition: color 0.3s;"
            @mouseenter="$event.target.style.textDecoration = 'underline'; $event.target.style.color = 'rgb(200, 200, 200)';"
            @mouseleave="$event.target.style.textDecoration = 'none'; $event.target.style.color = 'white';""
          >
            {{ scope.row.FIMCode_info[0] }}
          </span>
        </template> -->
        <template slot-scope="scope">
          <span
            @click="openNewPage"
            :style="{ padding: '1vh', height: '4vh', width: '4vh', color: 'white'}"
            style="transition: color 0.3s;"
            @mouseenter="$event.target.style.textDecoration = 'underline'; $event.target.style.color = 'rgb(200, 200, 200)';"
            @mouseleave="$event.target.style.textDecoration = 'none'; $event.target.style.color = 'white';""
          >
            {{ scope.row.FIMCode_info[0] }}
          </span>
        </template>

      </el-table-column>
      <el-table-column
        prop="failure_name_info"
        label="Failure Name"
        :width="null"
        :min-width="40"
      ></el-table-column>
      <el-table-column
        prop="failure_state"
        label="State"
        :width="null"
        :min-width="35"
        :formatter="failureStateData"
      ></el-table-column>
      <el-table-column
        prop="flight_phase"
        label="Flight Phase"
        :width="null"
        :min-width="35"
        :formatter="flightPhaseData"
      ></el-table-column>
    </el-table>
  </div>


  <!-- <div v-else class="html_page">
    <div class="html_btn">
      <el-button
        icon="el-icon-close"
        circle
        size="mini"
        v-on:click='isPdfPageSelected=false'>
      </el-button>
    </div>




    <guideBook style="position: relative;">
    </guideBook>

  </div> -->
</template>

<script>
import {customSortMethodForProgressColumn} from '@/utils/utils.js'
import {fdeStatusEnum, fdeClassEnum, failureStateEnum, flightPhaseEnum} from '@/globals/enums.js'
import qs from 'qs'
import { postURL } from '@/services/centralMaintenance/failureReport';

import { mapState } from 'vuex';

import guideBook from '@/components/Files/guideBook.vue'
export default {
  components: {guideBook},
  name: "ExistingFDE",
  data() {
    return {
      existingFDEArray: [],

      isPdfPageSelected: false,
      url: "",
    };
  },
  computed: {
    ...mapState('websocketVuex', ['infoOMD'])
  },
  watch: {
    infoOMD: {
      deep: true,
      handler(newVal, oldVal) {
        // Check if infoOMD has changed
        if (newVal !== oldVal) {
          this.$router.push({ path: newVal.path, query: newVal.query });
        }
      }
    }
  },
  methods: {
    openNewPage() {
      const url = 'http://localhost:8080/centralMaintenance/failureReport/guideBook';
      const target = '_blank';

      window.open(url, target);
    },

    /**
     * 更新store的选中行数据
     * @param {*} item 选中行数据
     */
    tableRowClicked(item) {
      this.$store.state.failureList.selectedFailureId = item.id[0];
      console.log(
        "selectedFailureId",
        this.$store.state.failureList.selectedFailureId
      );
    },

    /**
     * 本函数用于设置Flight Phase列中flight_phase的显示格式
     * 即将flight_phase原数据对应为state中flightPhaseEnum枚举值
     * @param {*} row table选中行信息
     */
     fdeStatusData(row) {
      let fpIndex = row.FDEStatus;

      return fdeStatusEnum[fpIndex];
    },

    /**
     * 本函数用于设置Flight Phase列中flight_phase的显示格式
     * 即将flight_phase原数据对应为state中flightPhaseEnum枚举值
     * @param {*} row table选中行信息
     */
     fdeClassData(row) {
      let fpIndex = row.FDEClass;

      return fdeClassEnum[fpIndex];
    },

    /**
     * 本函数用于设置Flight Phase列中flight_phase的显示格式
     * 即将flight_phase原数据对应为state中failureStateEnum枚举值
     * @param {*} row table选中行信息
     */
     failureStateData(row) {
      let fpIndex = row.failure_state[0];

      return failureStateEnum[fpIndex];
    },

    /**
     * 本函数用于设置Flight Phase列中flight_phase的显示格式
     * 即将flight_phase原数据对应为state中flightPhaseEnum枚举值
     * @param {*} row table选中行信息
     */
     flightPhaseData(row) {
      let fpIndex = row.flight_phase[0];

      return flightPhaseEnum[fpIndex];
    },

    /**
     * 本函数用于根据选取行的FIMCode获取对应的手册链接
     * @param {string} fimCode 选中行对应的FIM Code
     */
    findURL(fimCode){
      this.isPdfPageSelected = true

      let tmp = qs.stringify({
        FIMCode: fimCode
      })

      postURL(tmp).then(response => {
        this.url = "http://localhost:8888/oms/php/files/" + response[0];

        }).catch(error => {
        console.error('Error in Postting pdf url:', error);
      });
    },


    /**
     * 本函数用于mounted中，获取state中resFDEData数据，并处理数据，具体有：
     * 筛选原数据中flight_leg为0的数据，
     * 更新至this.ExistingFDEsSumArray，用于前端数据的展示
     */
    getExistingFDEArray() {
      //深度拷贝，不改变state中resFailureData的原始数据
      let existingFDEOri = JSON.parse(
        JSON.stringify(this.$store.state.failureList.resFDEData)
      );
      //处理原始数据，筛选出parentFailure，将其他子成员挂在其名下
      let existingFDEParent = existingFDEOri.filter(
        (existingFDEOri) => existingFDEOri.is_parent == true
      );
      let existingFDEChild = existingFDEOri.filter(
        (existingFDEOri) => existingFDEOri.is_parent == false
      );
      //针对每个Parent，找到child，放到children属性中
      for (let item of existingFDEParent) {
        let tempFDEText = item.FDEText;
        let childFailureName = existingFDEChild.filter(
          (existingFDEChild) =>
          existingFDEChild.FDEText == tempFDEText
        );

        let childrenFDE = [];
        if (childFailureName.length >= 1) {
          for (let childItem of childFailureName) {
            //将childItem的自身属性设置为''
            childItem.FDEClass = "";
            childItem.FDECode = "";
            childItem.FDEStatus = "";
            childItem.FDEText = "";
            childrenFDE.push(childItem);
          }
        }
        item.children = childrenFDE;
      }

      for (let item of existingFDEParent) {
        //更新failure_name_info
        item.FDEText =
          item.FDEText + " [ " + String(item.count) + " ]";
      }

      this.existingFDEArray = existingFDEParent;
      console.log("check it", this.existingFDEArray)
    },


    customSortMethodForProgressColumn
  },
  mounted() {
    this.getExistingFDEArray();
  },

};
</script>

<style scoped>
</style>
