<template>
  <el-container style="display: flex; flex-direction: column">
    <el-header style="height: 12vh;">
      <el-row style="width: 100%;">
        <el-col :span="3">
          <div class="el-header-title">
            Faliure History Overview
          </div>
        </el-col>
        <el-col :span="2">
          <div class="radio"   @click="changeRadio('allLegs')">
            <input
              name="leg-display-radio"
              type="radio"
              :checked="displaySelected == 'allLegs'"
            />
            <label class="form-check-label">All Legs</label>
          </div>
        </el-col>
        <el-col :span="3">
          <div class="radio"  @click="changeRadio('inboundLeg')">
            <input
              name="leg-display-radio"
              type="radio"
              :checked="displaySelected == 'inboundLeg'"
            />
            <label class="form-check-label">Inbound Leg</label>
          </div>
        </el-col>
        <el-col :span="5">
          <div class="radio" @click="changeRadio('range')">
            <input
              name="leg-display-radio"
              type="radio"
              :checked="displaySelected == 'range'"
            />
            <label class="form-check-label">Range</label>

            <el-input
              v-model="minFlightLeg"
              size="mini"
              placeholder="Min"
              style="width : 10vh; margin-left: 2vh"
              @change="updateRangeList"
              clearable
            />
            <el-input
              v-model="maxFlightLeg"
              size="mini"
              placeholder="Max"
              style="width : 10vh; margin-left: 2vh"
              @change="updateRangeList"
              clearable
            />

          </div>


        </el-col>

        <el-col :span="3">
          <div class="el-header-subtitle">
            Viewed Failure Counts against:
          </div>
        </el-col>
        <el-col :span="2">
          <div class="radio"  @click="changeResRadio('ata')">
            <input
              name="failure-display-radio"
              type="radio"
              :checked="resultSelected == 'ata'"
            />
            <label class="form-check-label">ATA</label>
          </div>
        </el-col>
        <el-col :span="2">
          <div class="radio" @click="changeResRadio('leg')">
            <input
              name="failure-display-radio"
              type="radio"
              :checked="resultSelected == 'leg'"
            />
            <label class="form-check-label">Leg</label>
          </div>
        </el-col>
        <el-col :span="3">
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
            height="65vh"
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
                  <span v-if="!isInboundLegATAAdded">
                    +
                  </span>
                  <span v-else>
                    -
                  </span>
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
            height="65vh"
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
                  @click="addAllLegsATAAll()"

                  :style="{ padding: '1.5vh', backgroundColor: 'rgb(80, 80, 80)', color: 'white'}"
                  style="transition: background-color 0.3s;"
                  @mouseenter="$event.target.style.backgroundColor = 'rgb(90, 90, 90)'"
                  @mouseleave="$event.target.style.backgroundColor = 'rgb(80, 80, 80)'"
                >
                  <span v-if="!isAllLegsATAAdded">
                    +
                  </span>
                  <span v-else>
                    -
                  </span>
                </span>
              </template>

              <template slot-scope="scope">
                <span
                  @click="addAllLegsATA(scope.row)"
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
            height="65vh"
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
                  @click="addRangeATAAll()"

                  :style="{ padding: '1.5vh', backgroundColor: 'rgb(80, 80, 80)', color: 'white'}"
                  style="transition: background-color 0.3s;"
                  @mouseenter="$event.target.style.backgroundColor = 'rgb(90, 90, 90)'"
                  @mouseleave="$event.target.style.backgroundColor = 'rgb(80, 80, 80)'"
                >
                  <span v-if="!isRangeATAAdded">
                    +
                  </span>
                  <span v-else>
                    -
                  </span>
                </span>
              </template>

              <template slot-scope="scope">
                <span
                  @click="addRangeATA(scope.row)"
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
              height="65vh"
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
                    <span v-if="!isFlightPhaseAdded">
                      +
                    </span>
                    <span v-else>
                      -
                    </span>
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
            v-if="resultSelected == 'ata' && displaySelected == 'inboundLeg'"
            height="65vh"
            style=" background-color: rgb(46, 45, 45)"
            :data="inboundLegATARes"
            :sort-method="customSortMethodForProgressColumn"
            :header-cell-style="{background:'#404040',color:'#FFFFFF', font:'14px'}"
            :empty-text="'No Data Display'"
          >
            <el-table-column :width="null" :min-width="5"></el-table-column>

            <el-table-column prop="count" label="Count" sortable :width="null" :min-width="20"></el-table-column>
            <el-table-column prop="ATA" label="ATA" sortable :width="null" :min-width="20"></el-table-column>
            <el-table-column prop="name" label="System Name" sortable :width="null" :min-width="70"></el-table-column>
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
            v-if="resultSelected == 'ata' && displaySelected == 'allLegs'"
            height="65vh"
            style=" background-color: rgb(46, 45, 45)"
            :data="allLegsATARes"
            :sort-method="customSortMethodForProgressColumn"
            :header-cell-style="{background:'#404040',color:'#FFFFFF', font:'14px'}"
            :empty-text="'No Data Display'"
          >
            <el-table-column :width="null" :min-width="5"></el-table-column>

            <el-table-column prop="count" label="Count" sortable :width="null" :min-width="20"></el-table-column>
            <el-table-column prop="ATA" label="ATA" sortable :width="null" :min-width="20"></el-table-column>
            <el-table-column prop="name" label="System Name" sortable :width="null" :min-width="70"></el-table-column>
            <el-table-column align="right" :min-width="15">
              <template slot-scope="scope">
                <span
                  @click="removeAllLegsATA(scope.row)"
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
            v-if="resultSelected == 'ata' && displaySelected == 'range'"
            height="65vh"
            style=" background-color: rgb(46, 45, 45)"
            :data="rangeATARes"
            :sort-method="customSortMethodForProgressColumn"
            :header-cell-style="{background:'#404040',color:'#FFFFFF', font:'14px'}"
            :empty-text="'No Data Display'"
          >
            <el-table-column :width="null" :min-width="5"></el-table-column>

            <el-table-column prop="count" label="Count" sortable :width="null" :min-width="20"></el-table-column>
            <el-table-column prop="ATA" label="ATA" sortable :width="null" :min-width="20"></el-table-column>
            <el-table-column prop="name" label="System Name" sortable :width="null" :min-width="70"></el-table-column>
            <el-table-column align="right" :min-width="15">
              <template slot-scope="scope">
                <span
                  @click="removeRangeATA(scope.row)"
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
            height="65vh"
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
            height="65vh"
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
import axios from "axios"


export default {
  name: "SelectFailuresDetails",
  data() {
    return {
      failureHistoryDatas: [],
      rangeList: [],
      ataListBefore: [],
      ataList: [],
      legListBefore: [],
      legList: [],
      legInitBefore: [],
      legInit: [],

      minFlightLeg: '',
      maxFlightLeg: '',










      displaySelected: 'inboundLeg',
      resultSelected: 'ata',

      isInboundLegATAAdded: false,
      isAllLegsATAAdded: false,
      isRangeATAAdded: false,
      isFlightPhaseAdded: false,


      inboundLegATA: [],
      allLegsATA: [],
      sortRangeATA: [],

      inboundLegATARes: [],
      allLegsATARes: [],
      rangeATARes: [],

      flightPhaseRes: [],
    };
  },
  methods: {
    /*
     * 本函数用于更新所有展示数据
     */
    initData(){
      this.failureHistoryDatas = this.$store.state.failureList.resFailureData
      console.log("xxxx")
      console.log( this.failureHistoryDatas)
    },


    /**
     * 本函数用于返回至FailureReport主界面
     *
     */
    goBackToReportPage() {
      this.$store.state.failureList.selectedFailureId = -1
      this.$router.push({ name: "FailureList" });
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
          this.inboundLegATA.push({
            ATA: ele.ATA,
            name: ataNameEnum[ele.ATA],
            isChecked: ele.isChecked,
            count: 0
          })

          this.allLegsATA.push({
            ATA: ele.ATA,
            name: ataNameEnum[ele.ATA],
            isChecked: ele.isChecked,
            count: 0
          })
        })
      }).catch(error => {
        console.error('Error in fetching parameter list:', error);
      });
    },

    /*
     * 本函数用于根据用户输入的FlightLeg上下范围更新符合条件的ATA项
     */
    updateRangeList() {

      // 检查用户输入，处理非数字的情况
      if(isNaN(this.minFlightLeg) || isNaN(this.maxFlightLeg)) {
        this.$message({
          message: 'Please enter a valid number.',
          type: 'warning'
        });
        return;
      }

      // 检查用户输入，处理最小值大于最大值的情况
      if(parseInt(this.minFlightLeg) >= parseInt(this.maxFlightLeg)) {
        this.$message({
          message: 'The minimum value cannot be greater than the maximum value.',
          type: 'warning'
        });
        return;
      }

      if(this.minFlightLeg != '' && this.maxFlightLeg != '') {
        var min = parseInt(this.minFlightLeg);
        var max = parseInt(this.maxFlightLeg);

        this.sortRangeATA = []
        var rangBefore = [];

        if(this.displaySelected == 'range') {

          this.failureHistoryDatas.forEach(ele =>{
            if(ele.flight_leg >= min && ele.flight_leg <= max && !rangBefore.includes(ele.ata)) {
              rangBefore.push(parseInt(ele.ata));
            }
          });


          var rangeAfter = [...new Set(rangBefore.sort().map(String))];
          for(var j = 0;j < rangeAfter.length; j++) {
            var rangeobj = {};
            rangeobj.ATA = rangeAfter[j];
            rangeobj.name = ataNameEnum[rangeAfter[j]];
            rangeobj.isChecked = false;
            rangeobj.count = 0;

            this.sortRangeATA.push(rangeobj);
          };
        };

      }
    },


    /**
     * 本函数用于跳转参数展示的三种不同模块
     * @param {string} value 代表三种模块的不同字符值
     */
    changeResRadio(value) {
      this.resultSelected = value
    },


    /**
     * 本函数用于实现将inboundLeg的ATA全部添加至条件筛选框或者全部清除
     */
    addInboundLegATAAll(){
      if(this.isInboundLegATAAdded == false){
        this.inboundLegATARes = []

        this.inboundLegATA.forEach(ele => {
          ele.isChecked = true
          this.inboundLegATARes.push(ele)
        })
      }else{
        this.inboundLegATA.forEach(ele => {
          ele.isChecked = false
        })

        this.inboundLegATARes = []
      }
      this.isInboundLegATAAdded = ! this.isInboundLegATAAdded
    },

    /**
     * 本函数用于实现将选中的某行inboundLeg的ATA添加至条件筛选框
     *  @param {Object} ele 选中的ATA对象
     */
    addInboundLegATA(ele){

      var isIdInArray = this.inboundLegATARes.some(function(element) {
        return element.ATA === ele.ATA;
      });
      if (!isIdInArray){
        this.inboundLegATARes.push(ele)
        ele.isChecked = true
      }else{
        this.$message('This parameter haa already been added to the display list.')
      }
    },

    /**
     * 本函数用于实现将AllLegs的ATA全部添加至条件筛选框或者全部清除
     */
    addAllLegsATAAll(){
      if(this.isAllLegsATAAdded == false){
        this.allLegsATARes = []

        this.allLegsATA.forEach(ele => {
          ele.isChecked = true
          this.allLegsATARes.push(ele)
        })
      }else{
        this.allLegsATA.forEach(ele => {
          ele.isChecked = false
        })

        this.allLegsATARes = []
      }
      this.isAllLegsATAAdded = ! this.isAllLegsATAAdded
    },

    /**
     * 本函数用于实现将选中的某行AllLegs的ATA添加至条件筛选框
     *  @param {Object} ele 选中的ATA对象
     */
    addAllLegsATA(ele){
      var isIdInArray = this.allLegsATARes.some(function(element) {
        return element.ATA === ele.ATA;
      });
      if (!isIdInArray){
        this.allLegsATARes.push(ele)
        ele.isChecked = true
      }else{
        this.$message('This parameter haa already been added to the display list.')
      }
    },

    /**
     * 本函数用于实现将AllLegs的ATA全部添加至条件筛选框或者全部清除
     */
     addRangeATAAll(){
      if(this.isRangeATAAdded == false){
        this.rangeATARes = []

        this.sortRangeATA.forEach(ele => {
          ele.isChecked = true
          this.rangeATARes.push(ele)
        })
      }else{
        this.sortRangeATA.forEach(ele => {
          ele.isChecked = false
        })

        this.rangeATARes = []
      }
      this.isRangeATAAdded = ! this.isRangeATAAdded
    },

    /**
     * 本函数用于实现将选中的某行range的ATA添加至条件筛选框
     *  @param {Object} ele 选中的ATA对象
     */
    addRangeATA(ele){
      var isIdInArray = this.rangeATARes.some(function(element) {
        return element.ATA === ele.ATA;
      });
      if (!isIdInArray){
        this.rangeATARes.push(ele)
        ele.isChecked = true
      }else{
        this.$message('This parameter haa already been added to the display list.')
      }
    },



    /**
     * 本函数用于实现将AllLegs的ATA全部添加至条件筛选框或者全部清除
     */
    addFlightPhaseAll(){
      if(this.isFlightPhaseAdded == false){
        this.flightPhaseRes = []

        this.flightPhases.forEach(ele => {
          ele.isChecked = true
          this.flightPhaseRes.push(ele)
        })
      }else{
        this.flightPhases.forEach(ele => {
          ele.isChecked = false
        })

        this.flightPhaseRes = []
      }
      this.isFlightPhaseAdded = ! this.isFlightPhaseAdded
    },

    /**
     * 本函数用于实现将选中的某行AllLegs的ATA添加至条件筛选框
     * @param {Object} ele 选中的flightPhase对象
     */
    addFlightPhase(ele){
      var isIdInArray = this.flightPhaseRes.some(function(element) {
        return element.label === ele.label;
      });
      if (!isIdInArray){
        this.flightPhaseRes.push(ele)
        ele.isChecked = true
      }else{
        this.$message('This parameter haa already been added to the display list.')
      }
    },

    /**
     * 本函数用于实现将选中的某行InboundLeg的ATA从结果框中清除
     * @param {Object} ele 选中的ATA对象
     */
    removeInboundLegATA(ele) {
      ele.isChecked = false
      const index = this.inboundLegATARes.findIndex(item => item.ATA === ele.ATA);
      if (index !== -1) {
        this.inboundLegATARes.splice(index, 1);
      }
    },

    /**
     * 本函数用于实现将选中的某行AllLegs的ATA从结果框中清除
     * @param {Object} ele 选中的ATA对象
     */
    removeAllLegsATA(ele) {
      ele.isChecked = false
      const index = this.allLegsATARes.findIndex(item => item.ATA === ele.ATA);
      if (index !== -1) {
        this.allLegsATARes.splice(index, 1);
      }
    },

    /**
     * 本函数用于实现将选中的某行AllLegs的ATA从结果框中清除
     * @param {Object} ele 选中的ATA对象
     */
     removeRangeATA(ele) {
      ele.isChecked = false
      const index = this.rangeATARes.findIndex(item => item.ATA === ele.ATA);
      if (index !== -1) {
        this.rangeATARes.splice(index, 1);
      }
    },

    /**
     * 本函数用于实现将选中的某行flightPhase从结果框中清除
     * @param {Object} ele 选中的flightPhase对象
     */
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
    this.initData()
  },
};
</script>

<style scoped>
</style>
