<template>
  <div class="container-fluid">
    <div class="row segment-top">
      <div class="col-1">Select Option</div>

      <div class="col">
        <div class="radio">
          <input  name="param-display-radio" type="radio" :checked="listSelected"
            v-on:change="changeRadio('list')" />
          <label class="form-check-label">List Display</label>
        </div>
        <div class="radio">
          <input  name="param-display-radio" type="radio" :checked="figureSelected"
            v-on:change="changeRadio('figure')" />
          <label class="form-check-label">Curve Display</label>
        </div>
      </div>

      <div class="col status-bar">
        Display Type: {{ displayType }} <br>
        Parameter Set Received at: {{ currParamUpdateTime }}
      </div>

      <div class="col date-bar">
        A/C Reg: {{ acReg }} <br>
        {{currentDate}} {{ currentTime }}
      </div>
    </div>


    <div class="row segment-bottom" v-show="listSelected">
      <!-- <div class="col-12"> -->
        <div class="table-test">
          <table class="table table-sm text-white" style=" table-layout: fixed;">
            <thead>
              <tr>
                <th scope="col" style="width: 80%">Parameter</th>
                <th scope="col" style="width: 10%">Value</th>
                <th scope="col" style="width: 10%">Units</th>
              </tr>
            </thead>
          </table>
          <vue-custom-scrollbar class="list-selected-area" :settings="settings">
            <table class="table table-sm text-white" style=" table-layout: fixed;">
              <tbody>
                <tr v-for="(param, index) in selectedParams" :key="index" class="scroll-item">
                  <td style="width: 80%">{{ param.para }}</td>
                  <td style="width: 10%">{{ param.curData }}</td>
                  <!-- <td style="width: 10%">{{ param.isChecked }}</td> -->
                  <td style="width: 10%">{{ param.unit }}</td>
                </tr>
              </tbody>
            </table>
          </vue-custom-scrollbar>
        </div>
    </div>

    <div class="row segment-bottom" v-show="figureSelected">
      <div class="col-4 segment-left-middle">
        <div class="param-tables">
          <div class="custom-scrollbar-wrapper" style="width: 100%; display: block; overflow: auto;">

              <table class="table-sm text-white" style="width:100%">
                <thead class="segment-title">
                  <tr>
                    <th scope="col">Parameter to Display</th>
                  </tr>
                </thead>
                <tbody>
                  <vue-custom-scrollbar class="scroll-selected-area" :settings="settings">
                    <tr v-for="para in selectedParams">
                      <th>
                        <span class="param-wrapper" :class="{ 'selected': showedParams.includes(para) }" @click="addParamToShow(para)">
                          {{para.para}}
                        </span>
                      </th>
                    </tr>
                  </vue-custom-scrollbar>
                </tbody>
              </table>

          </div>
        </div>
      </div>

      <div class="col-8 mid-chart" >
        <div style="background-color: #252525;border-radius: 10px; border-color:aliceblue">
          <vue-custom-scrollbar class="scroll-chart-area"  :settings="settings">

            <div v-if="showedParams.length==1" class="echarts" style="height: 70vh" id="mychart0" :style="myChartStyle"></div>

            <div v-if="showedParams.length>=2">
              <div class="echarts" style="height: 35vh" id="mychart0" :style="myChartStyle"></div>
              <div class="echarts" style="height: 35vh" id="mychart1" :style="myChartStyle"></div>
              <div v-if="showedParams.length>=3" class="echarts" style="height: 35vh" id="mychart2" :style="myChartStyle"></div>
              <div v-if="showedParams.length>=4" class="echarts" style="height: 35vh" id="mychart3" :style="myChartStyle"></div>
              <div v-if="showedParams.length>=5" class="echarts" style="height: 35vh" id="mychart4" :style="myChartStyle"></div>

            </div>

          </vue-custom-scrollbar>
        </div>
      </div>
    </div>



    <div class="row">
      <div class="col">
        <!-- <div v-show="curViewGroup"> -->
          <div style="float: left">
            <button class="button-bar-btn" @click="printPage">Print</button>
          </div>
          <div style="float: right">
            <button class="button-bar-btn" @click="backToParaPage">Back</button>

            <button v-if="listSelected" class="button-bar-btn" @click="stopListRefresh" :disabled="!isListRefreshing" :style="{'background-image': !isListRefreshing ? 'linear-gradient(rgb(128, 127, 127), rgb(200, 200, 200))' : 'linear-gradient(rgb(33, 33, 33), rgb(128, 127, 127))' }">Stop View</button>
            <button v-if="listSelected" class="button-bar-btn" @click="startListRefresh" :disabled="isListRefreshing" :style="{'background-image': isListRefreshing ? 'linear-gradient(rgb(128, 127, 127), rgb(200, 200, 200))' : 'linear-gradient(rgb(33, 33, 33), rgb(128, 127, 127))' }">Start View</button>

            <button v-if="!listSelected" class="button-bar-btn" @click="stopRefresh"  :disabled="!isRefreshing" :style="{'background-image': !isRefreshing ? 'linear-gradient(rgb(128, 127, 127), rgb(200, 200, 200))' : 'linear-gradient(rgb(33, 33, 33), rgb(128, 127, 127))' }">Stop View</button>
            <button v-if="!listSelected" class="button-bar-btn" @click="startRefresh"  :disabled="isRefreshing||showedParams.length==0" :style="{'background-image': isRefreshing||showedParams.length==0 ? 'linear-gradient(rgb(128, 127, 127), rgb(200, 200, 200))' : 'linear-gradient(rgb(33, 33, 33), rgb(128, 127, 127))' }">Start View</button>
          </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
// import {pattern, urlHeads} from '../../config/url.js';
import qs from 'qs'

// import * as echarts from 'echarts';
// import vueCustomScrollbar from 'vue-custom-scrollbar'
// import "vue-custom-scrollbar/dist/vueScrollbar.css"

export default {
  name: "StartView",
  emits: ["backTo"],
  data() {
    return {
      isRefreshing: false,
      isListRefreshing: false,
      displayType: "LIVE",
      acReg: "C-WXWB",
      currentTime: '',
      currentDate: '',
      lastParamUpdateTime: "2023/11/01 08:34:11",
      currParamUpdateTime: "2023/11/01 07:26:13",
      currViewParamPage: 1,
      maxLineNum:26,
      indexArray: [],
      params: [],
      paramsLast: [],
      hisViewGroup:false,
      curViewGroup:true,
      currHisViewParamPage:-1,
      totalHisViewParamPage:-30,
      lastParams:[],
      lastIndex:0,
      listSelected: true,
      figureSelected: false,

      selectedParams : [],
      selectedParamsIndex: [],
      showedParams: [],
      showedParamsIndex: [],
      stopParamsIndex: [],

      aletMsg: '', // 弹出框中的提示语
      displayStsates: 'none',

      keyword: '',

      dateXaxis: [],
      dataYaxis: [],

      myCharts: [],
      myChartStyle: { float: "center", width: "95%"},
      settings: {
        suppressScrollY: false,
        suppressScrollX: false,
        wheelPropagation: false,
      },
      refreshInterval: null, // 保存刷新的间隔ID
      refreshListInterval: null
    };
  },
  components: {
    vueCustomScrollbar
  },

  methods: {
    printPage() {
      // 调用window.print()来触发打印
      window.print();
    },

    parameterInit(data){
      this.selectedParams = data;

      this.selectedParamsIndex = []

      for(var i = 0; i < this.selectedParams.length; i++){
        this.selectedParamsIndex.push(this.selectedParams[i].id)
      }

      try {
        let tmp = qs.stringify({
          index: this.selectedParamsIndex
        });

        var urlRoot5 = 'php/conditionMonitoring/paramerDisplay/getUnitInTime.php';
        axios.post(urlHeads[pattern]+urlRoot5, tmp).then(
          response => {
            for (var i = 0; i < response.data.length; i++) {
              this.selectedParams[i].unit = response.data[i]['unit']
            }
          },
          error => {
            // alert('发送请求失败！', error.message)
          }
        )

        var urlRoot4 = 'php/conditionMonitoring/paramerDisplay/getDataInTime.php';

        axios.post(urlHeads[pattern]+urlRoot4, tmp).then(
          response => {
            for (var i = 0; i < response.data.length; i++) {
              if(response.data[i].length > 0){
                this.selectedParams[i].curData = response.data[i][0]['data']
              }else{
                this.selectedParams[i].curData = 0
              }
            }
          },
          error => {
            // alert('发送请求失败！', error.message)
          }
        )
        resolve();
      } catch (error) {

      }

      this.startListRefresh()
    },

    addParamToShow(parameter){
      /*
        本函数用于实现将待选参数加入到展示图表中去
      */

      // 如果该参数正在被展示
      if(this.showedParams.includes(parameter) ){
        if (confirm(`Are you sure you want to delete the parameter ${parameter.para}?`)) {

          const index = this.showedParams.findIndex((p) => p.para === parameter.para);

          if (this.dataYaxis.length == 1 && index > -1) {
            this.showedParams = []
            this.showedParamsIndex = []
            this.dataYaxis = []
            this.dateXaxis = []
          }else{
            this.showedParams.splice(index, 1);
            this.showedParamsIndex.splice(index, 1);
            this.dataYaxis.splice(index, 1);
            this.dateXaxis.splice(index, 1);
          }
        }
      // 如果该参数未被展示
      }else{

        if (confirm(`Are you sure you want to add the parameter ${parameter.para}?`)) {
          let tmp = qs.stringify({
            index: [parameter.id]
          })
          var urlRoot1 = 'php/conditionMonitoring/paramerDisplay/getDataInTime.php';
          axios.post(urlHeads[pattern]+urlRoot1, tmp).then(
            response => {

              // 在加入之前，先探查一下该参数是否无法查询到数据，如果无法正常搜到数据，则直接不予展示
              if(response.data[0].length==0){
                alert('This table lacks data and cannot be initialized.')
              }else{
                var isIdInArray = this.showedParams.some(function(element) {
                  return element.id === parameter.id;
                });

                // 如果选中的参数已经在展示列表中
                if (!isIdInArray){
                  //如果当前展示列表的总数不超过5个
                  if (this.showedParams.length<5){

                    console.log("is used")

                    // 为了对齐时间轴，如果有新增的展示参数，则清空旧的参数的所有数据，时间戳都对齐新参数加入的时间
                    for (var i = 0; i < this.dataYaxis.length; i++) {
                      this.dataYaxis[i] = [];
                      this.dateXaxis[i] = [];
                    }

                    this.showedParams.push(parameter)
                    this.showedParamsIndex.push(parameter.id)
                    this.dataYaxis.push([])
                    this.dateXaxis.push([])

                    this.startRefresh()
                  }else{
                    alert('Allow up to 5 tables to be displayed simultaneously.')
                  }
                }else{
                  alert('This parameter is already in the display list.')
                }
              }
            }
          )
        }
      }

    },
    fetchListData(){
      return new Promise(async (resolve, reject) => {
        try {

          let tmp = qs.stringify({
            index: this.selectedParamsIndex
          });

          var urlRoot4 = 'php/conditionMonitoring/paramerDisplay/getDataInTime.php';

          axios.post(urlHeads[pattern]+urlRoot4, tmp).then(
            response => {
              for (var i = 0; i < response.data.length; i++) {
                if(response.data[i].length > 0){
                  this.selectedParams[i].curData = response.data[i][0]['data']
                }else{
                  this.selectedParams[i].curData = 0
                }
              }
            },
            error => {
              // alert('发送请求失败！', error.message)
            }
          )
          resolve();
        } catch (error) {
          // 错误处理
          reject(error);
        }
      });

    },
    fetchData() {
      return new Promise(async (resolve, reject) => {
        try {
          let tmp = qs.stringify({
            index: this.showedParamsIndex
          });

          var urlRoot1 = 'php/conditionMonitoring/paramerDisplay/getDataInTime.php';
          const response = await axios.post(urlHeads[pattern] + urlRoot1, tmp);

          // var flag = response.data[0][0]['data']

          for (var i = 0; i < response.data.length; i++) {

            if (response.data[i].length > 0) {
              for (var j = 0; j < response.data[i].length; j++) {
                // 如果数据连续三秒不变，则设为0
                // if(response.data[i][j]['data'] == response.data[i][j-1]['data']){
                //   this.dataYaxis[i].push(0);
                // }else{
                  this.dataYaxis[i].push(response.data[i][j]['data']);
                // }

                this.dateXaxis[i].push(new Date(response.data[i][j]['time']).toLocaleTimeString([], {hour: '2-digit', minute: '2-digit', second: '2-digit'}));
              }

              // 如果展示的长度过长，则移除数组开头的第一秒的元素
              if (this.dataYaxis[i].length > 60*response.data[i].length) {
                for (var k = 0; k < response.data[i].length; k++) {
                  this.dataYaxis[i].shift();
                  this.dateXaxis[i].shift();
                }
              }
            } else {
              this.showedParams.splice(i, 1);
              this.showedParamsIndex.splice(i, 1);

              var errorIndex = this.showedParamsIndex[i];

              if (!this.stopParamsIndex.includes(errorIndex)) {
                this.stopParamsIndex.push(errorIndex);
              }
            }
          }

          this.initEcharts();
          resolve();
        } catch (error) {
          // 错误处理
          reject(error);
        }
      });
    },

    initEcharts() {
      // 该函数用于初始化绘制表格的所有设定

      //在绘制之前，把现有的表格全给他扬了
      for(var i=0; i<this.myCharts.length; i++){
        this.myCharts[i].dispose();
      }

      for(var i=0; i<this.showedParams.length; i++){
        var index = this.showedParams[i].id

        var isIdInArray = this.stopParamsIndex.some(function(element) {
          return element === index;
        });

        // 如果待展示的数据被标记为无数据传输，则无法进行表格初始化
        if (!isIdInArray){
          // 计算该项曲线的最大最小值，用于绘制visualMap
          var minData = Math.min(...this.dataYaxis[i])
          var maxData = Math.max(...this.dataYaxis[i])
          var diff = maxData - minData + 0.0001

          if(!diff){
            continue;
          }

          const option = {
            title: { text: this.showedParams[i].para, textStyle: {color : '#999999'}, left: '5%', top: '5%'},
            tooltip: { trigger: 'axis', top: '5%'},
            grid: { left: '10%', right: '15%', bottom: '20%'},
            xAxis: { data: this.dateXaxis[i]},
            yAxis: {
              min: (minData - diff*0.5-0.0001).toFixed(4),
              max: (maxData + diff*0.5+0.0001).toFixed(4),
              axisLabel : {
                formatter: '{value}' // 格式化y轴的显示，保留3位小数
              },
              splitLine: {
                lineStyle: {
                  type: 'dashed' // 将分隔线设置为虚线
                }
              },
            },
            toolbox: { right: '1%', top: '5%', feature: { dataZoom: { yAxisIndex: 'none'},  saveAsImage: {}}},
            visualMap: {
              top: '15%', right: '0.5%', pieces: [
                { gt: minData, lte: minData + diff*3/4, color: '#93CE07'},
                { gt: minData + diff*3/4, lte: minData + diff*11/12, color: '#FBDB0F'},
                { gt: minData +  diff*11/12, lte: maxData, color: '#FC7D02'}
              ],
              textStyle:{ color : "#999999"},
              outOfRange: { color: '#999'},
              precision: 2 // 设置visualMap的精度为3，显示浮点数
            },
            animation: true,
            showSymbol: false, // 去除折线图中的点
            animationDuration: 20,
            series: [{
              name: this.showedParams[i].para,
              type: 'line',
              data: this.dataYaxis[i],
              smooth: true,
              symbol: 'none' // 去除折线图中的点
            }]
          };

          var myChart = echarts.init(document.getElementById("mychart"+i));

          this.myCharts.push(myChart)
          myChart.setOption(option);
          window.addEventListener("resize", () => {
            myChart.resize();
          });

        }else{
          console.log("This table lacks data and cannot be initialized")
        }
      }
    },

    updateCurrentTime() {
      const now = new Date();
      this.currentTime = now.toLocaleTimeString();
      this.currentDate = now.toLocaleDateString();
    },
    backToParaPage() {
      this.$bus.$emit("selectPtoShow", true);
      this.dataYaxis = []
      this.dateXaxis = []

      this.showedParams = []
      this.showedParamsIndex = []
      this.selectedParams = []
      this.selectedParamsIndex = []
      this.stopParamsIndex = []

      for(var i=0; i<this.myCharts.length; i++){
        this.myCharts[i].dispose();
      }
      this.stopRefresh()
      this.stopListRefresh()
    },
    changeRadio(value){
      if(value == "list") {
        this.listSelected = true;
        this.figureSelected = false;
      }else if (value == "figure"){
        this.listSelected = false;
        this.figureSelected = true;
      }
    },
    startRefresh() {
      if (this.isRefreshing) {
        return; // 如果正在进行数据刷新，则直接返回
      }
      this.isRefreshing = true;
      this.refreshInterval = setInterval(() => {
        this.fetchData()
      }, 1000) // 每秒刷新一次
    },
    // 停止刷新
    stopRefresh() {
      this.isRefreshing = false;
      clearInterval(this.refreshInterval)
    },
    startListRefresh() {
      if (this.isListRefreshing) {
        return; // 如果正在进行数据刷新，则直接返回
      }
      this.isListRefreshing = true;
      this.refreshListInterval = setInterval(() => {
        this.fetchListData()
      }, 1000) // 每秒刷新一次
    },
    // 停止刷新
    stopListRefresh() {
      this.isListRefreshing = false;
      clearInterval(this.refreshListInterval)
    }
  },
  mounted() {
    this.$bus.$on('sendIndexArray1', this.parameterInit);
  },
  created() {
    this.updateCurrentTime()
    setInterval(this.updateCurrentTime, 1000)

    this.currParamUpdateTime = localStorage.getItem('currParamUpdateTimeKey');
  },
  beforeUnmount() {
    window.addEventListener("beforeunload", () => {
      localStorage.setItem('currParamUpdateTimeKey', this.currParamUpdateTime);
    });
  },
  beforeDestroy() {
    for(var i=0; i<this.myCharts.length; i++){
      this.myCharts[i].dispose();
    }
    this.stopRefresh()
  },

  computed:{
    totalViewParamPage() {
      if (Math.ceil(this.params.length / this.maxLineNum) >= 1)
        return Math.ceil(this.params.length / this.maxLineNum)
      else
        return 1
    },
    currentViewParamArray() {
      if (this.curViewGroup == true){
        return this.params.slice((this.currViewParamPage - 1) * this.maxLineNum, this.currViewParamPage * this.maxLineNum);
      }else{
        return this.paramsLast.slice((this.currViewParamPage - 1) * this.maxLineNum, this.currViewParamPage * this.maxLineNum);
      }
    },
  }
};
</script>


<style scoped>
  .radio {
    display: flex;
    align-items: center;
    margin-bottom: 5px;
    margin-top: 5px;
  }
  .radio input[type="radio"] {
    appearance: none;
    -webkit-appearance: none;
    outline: none;
    width: 18px;
    height: 18px;
    border-radius: 50%;
    border: 2px solid rgb(111, 111, 111);
    margin-right: 10px;
    cursor: pointer;
    position: relative;
  }
  .radio input[type="radio"]:before {
    content: "";
    display: block;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 10px;
    height: 10px;
    border-radius: 50%;
    background-color: rgb(37,37,37);
    transition: background-color 0.2s ease-in;
  }
  .radio input[type="radio"]:checked:before {
    background-color: rgb(32,255,255);
  }
  .segment-top {
    border: 1.5px solid lightgray;
    border-bottom: none;
    padding: 0.5rem;
  }

  .param-tables {
      width: 100%;
      border: 1.5px solid lightgray;
      height: 5vh;
      margin-top: 1vh;
    }

  .segment-bottom {
    border: 1.5px solid lightgray;
    height: 71vh;
  }

  .segment-left-middle{
    border: 1.5px solid lightgray;
    border-top: none;
    border-bottom: none;
    border-left: none;

  }
  .date-bar {
    height: 6vh;
    text-align: right;
  }

  .status-bar {
    height: 6vh;
  }

  .button-bar-btn {

    margin-top: 1vh;
    background-image: linear-gradient(rgb(33, 33, 33), rgb(128, 127, 127));
    color: white;
    width: 20vh;
    height: 5vh;
  }

  .add-bar-btn {
    margin-top: 1vh;
    background-image: linear-gradient(rgb(33, 33, 33), rgb(128, 127, 127));
    color: white;
    width: auto;
    height: 5vh;
  }
  .selected {
    background-color: rgb(70, 72, 73);
  }
  .button-bar {
    position: absolute;
    bottom: 5vh;
    display: inline-block;
    margin-left: 44%;
  }

  .page-btn {
    color: white;
    background-image: linear-gradient(rgb(33, 33, 33), rgb(128, 127, 127));
  }
  .table-test {
    /* margin: 1vh; */
    /* border: 1.5px solid lightgray; */
    height: 69vh;
    /* width: auto; */
  }
  .list-selected-area {
    position: relative;
    /* margin: 1vh; */
    width: auto;
    height: 60vh;
  }
  .scroll-item {
    border: none;
    padding: 10px;
    margin: 10px
  }
  .scroll-selected-area {
    position: relative;

    /* border: 1.5px solid lightgray;
    border-top: none;
    border-right: none;
    border-left: none; */

    width: 100%;
    height: 60vh;

    margin-top: 3vh;
    /* margin-left: 1vh; */
  }
  .scroll-selected-area span {
    display: block;
    margin-bottom: 2vh;
  }

  .param-wrapper:hover {
    transition: background-color 0.3s;
  }

  .param-wrapper:hover {
    /* 添加悬浮样式 */
    border: 1px solid #006EAA;
  }

  .scroll-chart-area {
    position: relative;
    margin: auto;
    width: auto;
    height: 70vh;
  }
</style>


<style scoped>
  .radio {
    display: flex;
    align-items: center;
    margin-bottom: 5px;
    margin-top: 5px;
  }
  .radio input[type="radio"] {
    appearance: none;
    -webkit-appearance: none;
    outline: none;
    width: 18px;
    height: 18px;
    border-radius: 50%;
    border: 2px solid rgb(111, 111, 111);
    margin-right: 10px;
    cursor: pointer;
    position: relative;
  }
  .radio input[type="radio"]:before {
    content: "";
    display: block;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 10px;
    height: 10px;
    border-radius: 50%;
    background-color: rgb(37,37,37);
    transition: background-color 0.2s ease-in;
  }
  .radio input[type="radio"]:checked:before {
    background-color: rgb(32,255,255);
  }



  .content{
    padding: 10px;
  }

.wh_container >>> .wh_content_all{
  background-color: #252525!important;
  border:1px solid #dfe0e6;
  width:auto;
  border-radius: 6px;
}
.wh_container{
  margin: 0px!important;
}

.wh_container >>> .wh_item_date{
  color:#ffffff;

}
  .wh_container >>> .wh_item_date:hover{
    color:#ffffff;
    background: #252525;
    font-weight: 900;
    border-radius: 50%;
  }
.wh_container >>>  .wh_other_dayhide{
  color:#696969a0;
}

.wh_container >>> .wh_content_item{
  margin-bottom: 1px;
  margin-left: 1px;
}

.wh_container >>> .wh_content{
  color:#ffffff;
}

.wh_container >>> .wh_top_tag{
  color:#ffffff;
}
.wh_container >>> .wh_content_li{
  color:#ffffff;
  font-weight: bold;
}
.wh_container >>> .wh_jiantou1{
  border-top: 2px solid #ffffff;
  border-left: 2px solid #ffffff;
}
.wh_container >>> .wh_jiantou2{
  border-top: 2px solid #ffffff;
  border-right: 2px solid #ffffff;
}

.wh_container >>> .wh_content_item .wh_isMark{
  background-color: rgba(19,105,167,0.15);
}
.wh_container >>> .wh_content_item .wh_isToday{
  background-color: rgba(75, 90, 100, 0.483);
  color: #ffffff;
}
.wh_container >>> .wh_content_item .wh_chose_day{
  background-color: rgba(75, 90, 100, 0.483);
  border-radius: 50%;
  color: #ffffff;
}
</style>
