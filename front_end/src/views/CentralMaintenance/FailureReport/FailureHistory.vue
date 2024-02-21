<template>
  <el-container style="display: flex; flex-direction: column">
    <el-header style="height: 16vh;">
      <el-row style="width: 100%;">
        <el-col :span="3">
          <div class="el-header-title">
            Faliure History Overview
          </div>
        </el-col>
        <el-col :span="10">
          <div class="radio"  @click="changeRadio('inboundLeg')">
            <input
              name="leg-display-radio"
              type="radio"
              :checked="displaySelected == 'inboundLeg'"
            />
            <label class="form-check-label">Inbound Leg</label>
          </div>
          <div class="radio"   @click="changeRadio('allLegs')">
            <input
              name="leg-display-radio"
              type="radio"
              :checked="displaySelected == 'allLegs'"
            />
            <label class="form-check-label">All Legs</label>
          </div>
          <div class="radio" @click="changeRadio('range')">
            <input
              name="leg-display-radio"
              type="radio"
              :checked="displaySelected == 'range'"
            />
            <label class="form-check-label">Range</label>
            <!--
            <el-input
              v-model="searchInput"
              size="mini"
              placeholder="Min"
              clearable
            />
            <el-input
              v-model="searchInput"
              size="mini"
              placeholder="Max"
              clearable
            /> -->
          </div>
        </el-col>
        <el-col :span="3">
          <div class="el-header-subtitle">
            Viewed Failure Counts against:
          </div>
        </el-col>
        <el-col :span="7">
          <div class="radio"  @click="changeResRadio('ata')">
            <input
              name="failure-display-radio"
              type="radio"
              :checked="resultSelected == 'ata'"
            />
            <label class="form-check-label">ATA</label>
          </div>
          <div class="radio" @click="changeResRadio('leg')">
            <input
              name="failure-display-radio"
              type="radio"
              :checked="resultSelected == 'leg'"
            />
            <label class="form-check-label">Leg</label>
          </div>
          <div class="radio" @click="changeResRadio('flightPhase')">
            <input
              name="failure-display-radio"
              type="radio"
              :checked="resultSelected == 'flightPhase'"
            />
            <label class="form-check-label">Flight Phase</label>
          </div>
        </el-col>
      </el-row>
    </el-header>

    <el-main style="flex: 1; padding: 0; color: white">
      <el-row :gutter="2">
        <el-col :span="7">
          <el-table
            v-if="displaySelected=='inboundLeg'"
            highlight-current-row
            height="62vh"
            style=" background-color: rgb(46, 45, 45)"
            :data="inboundLegATA"
            :sort-method="customSortMethodForProgressColumn"
            :header-cell-style="{background:'#404040',color:'#FFFFFF', font:'14px'}"
            :empty-text="'No Data Display'"
          >
            <el-table-column :width="null" :min-width="5"></el-table-column>
            <el-table-column prop="ATA" label="ATA" sortable :width="null" :min-width="20"></el-table-column>
            <el-table-column prop="name" label="System Name" sortable :width="null" :min-width="50"></el-table-column>
            <el-table-column align="right" :min-width="15">
              <template slot="header" slot-scope="scope">
                <span
                  @click="addInboundLegATAAll()"

                  :style="{ padding: '1.5vh', backgroundColor: 'rgb(80, 80, 80)', color: 'white'}"
                  style="transition: background-color 0.3s;"
                  @mouseenter="$event.target.style.backgroundColor = 'rgb(90, 90, 90)'"
                  @mouseleave="$event.target.style.backgroundColor = 'rgb(80, 80, 80)'"
                >
                  +
                </span>
              </template>

              <template slot-scope="scope">
                <span
                  @click="addInboundLegATA(scope.row)"
                  v-if="!scope.row.isChecked"
                  :style="{ padding: '1vh', height: '4vh', width: '4vh', backgroundColor: 'rgb(70, 72, 73)', color: 'white'}"
                  style="transition: background-color 0.3s;"
                  @mouseenter="$event.target.style.backgroundColor = 'rgb(90, 90, 90)'"
                  @mouseleave="$event.target.style.backgroundColor = 'rgb(70, 72, 73)'"
                >
                  +
                </span>
              </template>
            </el-table-column>
            <el-table-column :width="null" :min-width="5"></el-table-column>
          </el-table>
          <el-table
            v-if="displaySelected=='allLegs'"
            highlight-current-row
            height="62vh"
            style=" background-color: rgb(46, 45, 45)"
            :data="allLegsATA"
            :sort-method="customSortMethodForProgressColumn"
            :header-cell-style="{background:'#404040',color:'#FFFFFF', font:'14px'}"
            :empty-text="'No Data Display'"
          >
            <el-table-column :width="null" :min-width="5"></el-table-column>
            <el-table-column prop="ATA" label="ATA" sortable :width="null" :min-width="20"></el-table-column>
            <el-table-column prop="name" label="System Name" sortable :width="null" :min-width="50"></el-table-column>
            <el-table-column align="right" :min-width="15">
              <template slot="header" slot-scope="scope">
                <span
                  @click="addInboundLegATAAll()"

                  :style="{ padding: '1.5vh', backgroundColor: 'rgb(80, 80, 80)', color: 'white'}"
                  style="transition: background-color 0.3s;"
                  @mouseenter="$event.target.style.backgroundColor = 'rgb(90, 90, 90)'"
                  @mouseleave="$event.target.style.backgroundColor = 'rgb(80, 80, 80)'"
                >
                  +
                </span>
              </template>

              <template slot-scope="scope">
                <span
                  @click="addInboundLegATA(scope.row)"
                  v-if="!scope.row.isChecked"
                  :style="{ padding: '1vh', height: '4vh', width: '4vh', backgroundColor: 'rgb(70, 72, 73)', color: 'white'}"
                  style="transition: background-color 0.3s;"
                  @mouseenter="$event.target.style.backgroundColor = 'rgb(90, 90, 90)'"
                  @mouseleave="$event.target.style.backgroundColor = 'rgb(70, 72, 73)'"
                >
                  +
                </span>
              </template>
            </el-table-column>
            <el-table-column :width="null" :min-width="5"></el-table-column>
          </el-table>
          <el-table
            v-if="displaySelected=='range'"
            highlight-current-row
            height="62vh"
            style=" background-color: rgb(46, 45, 45)"
            :data="sortRangeATA"
            :sort-method="customSortMethodForProgressColumn"
            :header-cell-style="{background:'#404040',color:'#FFFFFF', font:'14px'}"
            :empty-text="'No Data Display'"
          >
            <el-table-column :width="null" :min-width="5"></el-table-column>
            <el-table-column prop="ATA" label="ATA" sortable :width="null" :min-width="20"></el-table-column>
            <el-table-column prop="name" label="System Name" sortable :width="null" :min-width="50"></el-table-column>
            <el-table-column align="right" :min-width="15">
              <template slot="header" slot-scope="scope">
                <span
                  @click="addInboundLegATAAll()"

                  :style="{ padding: '1.5vh', backgroundColor: 'rgb(80, 80, 80)', color: 'white'}"
                  style="transition: background-color 0.3s;"
                  @mouseenter="$event.target.style.backgroundColor = 'rgb(90, 90, 90)'"
                  @mouseleave="$event.target.style.backgroundColor = 'rgb(80, 80, 80)'"
                >
                  +
                </span>
              </template>

              <template slot-scope="scope">
                <span
                  @click="addInboundLegATA(scope.row)"
                  v-if="!scope.row.isChecked"
                  :style="{ padding: '1vh', height: '4vh', width: '4vh', backgroundColor: 'rgb(70, 72, 73)', color: 'white'}"
                  style="transition: background-color 0.3s;"
                  @mouseenter="$event.target.style.backgroundColor = 'rgb(90, 90, 90)'"
                  @mouseleave="$event.target.style.backgroundColor = 'rgb(70, 72, 73)'"
                >
                  +
                </span>
              </template>
            </el-table-column>
            <el-table-column :width="null" :min-width="5"></el-table-column>
          </el-table>
        </el-col>

        <el-col :span="6">
          <el-row>
            <el-table
              height="62vh"
              style=" background-color: rgb(46, 45, 45)"
              :data="flightPhases"
              :sort-method="customSortMethodForProgressColumn"
              :header-cell-style="{background:'#404040',color:'#FFFFFF', font:'14px'}"
              :empty-text="'No Data Display'"
            >
              <el-table-column :width="null" :min-width="5"></el-table-column>
              <el-table-column prop="label" label="Flight Phase" sortable :width="null" :min-width="80"></el-table-column>
              <el-table-column align="right" :min-width="20">
                <template slot="header" slot-scope="scope">
                  <span
                    @click="addFlightPhaseAll()"

                    :style="{ padding: '1.5vh', backgroundColor: 'rgb(80, 80, 80)', color: 'white'}"
                    style="transition: background-color 0.3s;"
                    @mouseenter="$event.target.style.backgroundColor = 'rgb(90, 90, 90)'"
                    @mouseleave="$event.target.style.backgroundColor = 'rgb(80, 80, 80)'"
                  >
                    +
                  </span>
                </template>
                <template slot-scope="scope">
                  <span
                    @click="addFlightPhase(scope.row)"
                    v-if="!scope.row.isChecked"
                    :style="{ padding: '1vh', height: '4vh', width: '4vh', backgroundColor: 'rgb(70, 72, 73)', color: 'white'}"
                    style="transition: background-color 0.3s;"
                    @mouseenter="$event.target.style.backgroundColor = 'rgb(90, 90, 90)'"
                    @mouseleave="$event.target.style.backgroundColor = 'rgb(70, 72, 73)'"
                  >
                    +
                  </span>
                </template>
              </el-table-column>
              <el-table-column :width="null" :min-width="5"></el-table-column>
            </el-table>
          </el-row>
        </el-col>

        <el-col :span="11">

          <el-table
            v-if="resultSelected == 'ata'"
            height="62vh"
            style=" background-color: rgb(46, 45, 45)"
            :data="inboundLegATARes"
            :sort-method="customSortMethodForProgressColumn"
            :header-cell-style="{background:'#404040',color:'#FFFFFF', font:'14px'}"
            :empty-text="'No Data Display'"
          >
            <el-table-column :width="null" :min-width="5"></el-table-column>

            <el-table-column prop="count" label="Count" sortable :width="null" :min-width="20"></el-table-column>
            <el-table-column prop="ATA" label="ATA" sortable :width="null" :min-width="40"></el-table-column>
            <el-table-column prop="name" label="System Name" sortable :width="null" :min-width="50"></el-table-column>
            <el-table-column align="right" :min-width="15">
              <template slot-scope="scope">
                <span
                  @click="removeInboundLegATA(scope.row)"
                  :style="{ padding: '1vh', height: '4vh', width: '4vh', backgroundColor: 'rgb(70, 72, 73)', color: 'white'}"
                  style="transition: background-color 0.3s;"
                  @mouseenter="$event.target.style.backgroundColor = 'rgb(90, 90, 90)'"
                  @mouseleave="$event.target.style.backgroundColor = 'rgb(70, 72, 73)'"
                >
                  -
                </span>
              </template>
            </el-table-column>

            <el-table-column :width="null" :min-width="5"></el-table-column>
          </el-table>

          <el-table
            v-if="resultSelected == 'leg'"
            height="62vh"
            style=" background-color: rgb(46, 45, 45)"

            :sort-method="customSortMethodForProgressColumn"
            :header-cell-style="{background:'#404040',color:'#FFFFFF', font:'14px'}"
            :empty-text="'No Data Display'"
          >
            <el-table-column :width="null" :min-width="5"></el-table-column>

            <el-table-column prop="para" label="Count" sortable :width="null" :min-width="20"></el-table-column>
            <el-table-column prop="para" label="Leg" sortable :width="null" :min-width="90"></el-table-column>
            <el-table-column align="right" :min-width="15">
              <template slot-scope="scope">
                <span
                  @click="removeleg(scope.row)"
                  :style="{ padding: '1vh', height: '4vh', width: '4vh', backgroundColor: 'rgb(70, 72, 73)', color: 'white'}"
                  style="transition: background-color 0.3s;"
                  @mouseenter="$event.target.style.backgroundColor = 'rgb(90, 90, 90)'"
                  @mouseleave="$event.target.style.backgroundColor = 'rgb(70, 72, 73)'"
                >
                  -
                </span>
              </template>
            </el-table-column>

            <el-table-column :width="null" :min-width="5"></el-table-column>
          </el-table>

          <el-table
            v-if="resultSelected == 'flightPhase'"
            height="62vh"
            style=" background-color: rgb(46, 45, 45)"
            :data="flightPhaseRes"
            :sort-method="customSortMethodForProgressColumn"
            :header-cell-style="{background:'#404040',color:'#FFFFFF', font:'14px'}"
            :empty-text="'No Data Display'"
          >
            <el-table-column :width="null" :min-width="5"></el-table-column>

            <el-table-column prop="count" label="Count" sortable :width="null" :min-width="20"></el-table-column>
            <el-table-column prop="label" label="Flight Phase" :width="null" :min-width="90"></el-table-column>
            <el-table-column align="right" :min-width="15">
              <template slot-scope="scope">
                <span
                  @click="removeflightPhase(scope.row)"
                  :style="{ padding: '1vh', height: '4vh', width: '4vh', backgroundColor: 'rgb(70, 72, 73)', color: 'white'}"
                  style="transition: background-color 0.3s;"
                  @mouseenter="$event.target.style.backgroundColor = 'rgb(90, 90, 90)'"
                  @mouseleave="$event.target.style.backgroundColor = 'rgb(70, 72, 73)'"
                >
                  -
                </span>
              </template>
            </el-table-column>

            <el-table-column :width="null" :min-width="5"></el-table-column>
          </el-table>
        </el-col>
      </el-row>



    </el-main>

    <el-footer>
      <div>
        <el-button class="footer-btn" @click="printPage">PRINT</el-button>
      </div>
      <div>
        <el-button class="footer-btn" @click="goBackToReportPage()">BACK</el-button>
        <el-button class="footer-btn" disabled @click="goShowPage()">FLIGHT LEGS</el-button>
        <el-button class="footer-btn" @click="goSelectPage()">SELECT</el-button>
      </div>
    </el-footer>
  </el-container>
</template>

<script>
import {flightPhaseEnum, ataNameEnum} from '@/globals/enums.js'
import {printPage, changeRadio, customSortMethodForProgressColumn} from '@/utils/utils.js'
import { getParaSet } from '@/services/conditionMonitoring/parameterDisplay/index.js';


export default {
  name: "SelectFailuresDetails",
  data() {
    return {
      displaySelected: 'inboundLeg',
      resultSelected: 'ata',


      inboundLegATA: [],
      allLegsATA: [],

      inboundLegATARes: [],
      allLegsATARes: [],

      flightPhaseRes: [],
    };
  },
  methods: {
    /**
     * 本函数用于返回至FailureReport主界面
     *
     */
    goBackToReportPage() {
      this.$store.state.failureList.selectedFailureId = -1
      this.$router.push({ name: "FailureList" });
    },
    /**
     * 本函数用于切换当前展示数据至其上一条failure数据
     *
     */
    goShowPage() {

    },


    /**
     * 本函数用于切换当前展示数据至其下一条failure数据
     *
     */
    goSelectPage() {
      this.$router.push({ name: "SelectFailuresHistory" });
    },



    /*
    * 本函数用于调用service中封装的api，实现一次对参数集合数据的获取
    */
    flashData() {
      getParaSet().then(response => {
        response.forEach(ele => {
          // var boolArray = new Array(ele.RPName.length).fill(false)
          this.inboundLegATA.push({
            ATA: ele.ATA,
            name: ataNameEnum[ele.ATA],
            paras: ele.RPName,
            index: ele.RP_index,
            isChecked: ele.isChecked,
            count: 0
          })

          this.allLegsATA.push({
            ATA: ele.ATA,
            name: ataNameEnum[ele.ATA],
            paras: ele.RPName,
            index: ele.RP_index,
            isChecked: ele.isChecked,
            count: 0
          })
        })
      }).catch(error => {
        console.error('Error in fetching parameter list:', error);
      });
    },


    /**
     * 本函数用于跳转参数展示的三种不同模块
     * @param {string} value 代表三种模块的不同字符值
     */
    changeResRadio(value) {
      this.resultSelected = value
    },



    addInboundLegATAAll(){
      this.inboundLegATARes = []

      this.inboundLegATA.forEach(ele => {
        ele.isChecked = true
        this.inboundLegATARes.push(ele)
      })
    },

    addInboundLegATA(ele){

      var isIdInArray = this.inboundLegATARes.some(function(element) {
        return element.ATA === ele.ATA;
      });
      if (!isIdInArray){
        this.inboundLegATARes.push(ele)
        ele.isChecked = true
      }else{
        alert('This parameter haa already been added to the display list.')
      }
    },



    addAllLegsATAAll(){
      this.allLegsATARes = []

      this.allLegsATA.forEach(ele => {
        ele.isChecked = true
        this.allLegsATARes.push(ele)
      })
    },

    addAllLegsATA(ele){
      var isIdInArray = this.allLegsATARes.some(function(element) {
        return element.ATA === ele.ATA;
      });
      if (!isIdInArray){
        this.allLegsATARes.push(ele)
        ele.isChecked = true
      }else{
        alert('This parameter haa already been added to the display list.')
      }
    },

    addFlightPhaseAll(){
      this.flightPhaseRes = []

      this.flightPhases.forEach(ele => {
        ele.isChecked = true
        this.flightPhaseRes.push(ele)
      })
    },

    addFlightPhase(ele){
      var isIdInArray = this.flightPhaseRes.some(function(element) {
        return element.label === ele.label;
      });
      if (!isIdInArray){
        this.flightPhaseRes.push(ele)
        ele.isChecked = true
      }else{
        alert('This parameter haa already been added to the display list.')
      }

    },


    removeInboundLegATA(ele) {
      ele.isChecked = false
      const index = this.inboundLegATARes.findIndex(item => item.para === ele.para);
      if (index !== -1) {
        this.inboundLegATARes.splice(index, 1);
      }
    },

    removeAllLegsATA(ele) {
      ele.isChecked = false
      const index = this.allLegsATARes.findIndex(item => item.para === ele.para);
      if (index !== -1) {
        this.allLegsATARes.splice(index, 1);
      }
    },


    removeflightPhase(ele) {
      ele.isChecked = false
      const index = this.flightPhaseRes.findIndex(item => item.label === ele.label);
      if (index !== -1) {
        this.flightPhaseRes.splice(index, 1);
      }
    },


    printPage,
    changeRadio,
    customSortMethodForProgressColumn
  },
  computed: {
    flightPhases() {
      return Object.entries(flightPhaseEnum).map(([value, label]) => ({
        value,
        label,
        isChecked: false,
        count: 0
      }));
    },
  },
  mounted() {
    this.flashData()
  },
};
</script>

<style scoped>
</style>
