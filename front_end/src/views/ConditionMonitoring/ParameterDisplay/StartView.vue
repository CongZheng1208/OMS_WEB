<template>
  <div>
    <el-header style="height: 12vh">
      <el-row style="width: 100%;">
        <el-col :span="3">
          <div class="el-header-title"> Test Selection </div>
        </el-col>
        <el-col :span="4">
          <div class="radio"
               @click="changeRadio('list')">
            <input name="param-display-radio"
                   type="radio"
                   :checked="displaySelected == 'list'" />
            <label>List Display</label>
          </div>
          <div class="radio"
               @click="changeRadio('figure')">
            <input name="param-display-radio"
                   type="radio"
                   :checked="displaySelected == 'figure'" />
            <label>Curve Display</label>
          </div>
        </el-col>
        <el-col :span="13"> Display Type: {{ displayType }} <br> Parameter Set Received at: {{ currParamUpdateTime }}
        </el-col>
        <el-col :span="4"> A/C Reg: {{ acReg }} <br> {{ currentDate }} {{ currentTime }} </el-col>
      </el-row>
    </el-header>
    <el-main>
      <el-row v-if="displaySelected == 'list'">
        <el-table highlight-current-row
                  height="65vh"
                  style=" background-color: rgb(46, 45, 45)"
                  :data="selectedParams"
                  :sort-method="customSortMethodForProgressColumn"
                  :header-cell-style="{ background: '#404040', color: '#FFFFFF', font: '14px' }"
                  :empty-text="'No Data Display'">
          <el-table-column :width="null"
                           :min-width="5"></el-table-column>
          <el-table-column prop="para"
                           label="Parameter"
                           sortable
                           :width="null"
                           :min-width="80"></el-table-column>
          <el-table-column prop="curData"
                           label="Value"
                           sortable
                           :width="null"
                           :min-width="10"></el-table-column>
          <el-table-column prop="unit"
                           label="Units"
                           sortable
                           :width="null"
                           :min-width="10"></el-table-column>
          <el-table-column :width="null"
                           :min-width="5"></el-table-column>
        </el-table>
      </el-row>
      <el-row v-else>
        <el-col :span="8">
          <el-table highlight-current-row
                    height="65vh"
                    @row-click="addParamToShow"
                    style=" background-color: rgb(46, 45, 45)"
                    :data="selectedParams"
                    :sort-method="customSortMethodForProgressColumn"
                    :header-cell-style="{ background: '#404040', color: '#FFFFFF', font: '14px' }"
                    :empty-text="'No Data Display'">
            <el-table-column :width="null"
                             :min-width="5"></el-table-column>
            <el-table-column prop="para"
                             label="Parameter to Display"
                             sortable
                             :width="null"
                             :min-width="80"></el-table-column>
            <el-table-column :width="null"
                             :min-width="5"></el-table-column>
          </el-table>
        </el-col>
        <el-col :span="16">
          <div class="custom-card"
               shadow="hover"
               style="height: 65vh">
            <!-- <div class="custom-header">DETAILS</div> -->
            <div class="custom-content">
              <div v-if="showedParams.length == 1"
                   class="echarts"
                   style="height: 70vh"
                   id="mychart0"
                   :style="myChartStyle"></div>
              <div v-if="showedParams.length >= 2">
                <div class="echarts"
                     style="height: 35vh"
                     id="mychart0"
                     :style="myChartStyle"></div>
                <div class="echarts"
                     style="height: 35vh"
                     id="mychart1"
                     :style="myChartStyle"></div>
                <div v-if="showedParams.length >= 3"
                     class="echarts"
                     style="height: 35vh"
                     id="mychart2"
                     :style="myChartStyle"></div>
                <div v-if="showedParams.length >= 4"
                     class="echarts"
                     style="height: 35vh"
                     id="mychart3"
                     :style="myChartStyle"></div>
                <div v-if="showedParams.length >= 5"
                     class="echarts"
                     style="height: 35vh"
                     id="mychart4"
                     :style="myChartStyle"></div>
              </div>
            </div>
          </div>
        </el-col>
      </el-row>
      <el-dialog :visible.sync="isParameterAddedMsg"
                 title="Confirm">
        <p>Are you sure you want to ADD the parameter "{{ parameterSelected.para }}"?</p>
        <span slot="footer"
              class="dialog-footer">
          <el-button @click="confirmAdd">Confirm</el-button>
          <el-button @click="cancelAdd">Cancel</el-button>
        </span>
      </el-dialog>
      <el-dialog :visible.sync="isParameterDeletedMsg"
                 title="Confirm">
        <p>Are you sure you want to DELETE the parameter "{{ parameterSelected.para }}"?</p>
        <span slot="footer"
              class="dialog-footer">
          <el-button @click="confirmDelete">Confirm</el-button>
          <el-button @click="cancelDelete">Cancel</el-button>
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
                @click="backToParaPage()">BACK</button>
        <button v-if="displaySelected == 'list'"
                class="footer-btn"
                :disabled="!isListRefreshing"
                @click="stopListRefresh()">STOP VIEW</button>
        <button v-else
                class="footer-btn"
                :disabled="!isRefreshing"
                @click="stopRefresh()">STOP VIEW</button>
        <button v-if="displaySelected == 'list'"
                class="footer-btn"
                :disabled="isListRefreshing"
                @click="startListRefresh">START VIEW</button>
        <button v-else
                class="footer-btn"
                :disabled="isRefreshing || showedParams.length == 0"
                @click="startRefresh">START VIEW</button>
      </div>
    </el-footer>
  </div>
</template>
<script>
import qs from 'qs'

import * as echarts from 'echarts';
import { printPage, customSortMethodForProgressColumn, changeRadio } from '@/utils/utils'
import { postUnitInTime, postDataInTime } from '@/services/conditionMonitoring/parameterDisplay/index.js';


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
      maxLineNum: 26,
      indexArray: [],
      params: [],
      paramsLast: [],
      hisViewGroup: false,
      curViewGroup: true,
      currHisViewParamPage: -1,
      totalHisViewParamPage: -30,
      lastParams: [],
      lastIndex: 0,

      displaySelected: 'figure',

      selectedParams: [],
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
      myChartStyle: { float: "center", width: "95%" },
      settings: {
        suppressScrollY: false,
        suppressScrollX: false,
        wheelPropagation: false,
      },
      refreshInterval: null, // 保存刷新的间隔ID
      refreshListInterval: null,

      isParameterAddedMsg: false,
      isParameterDeletedMsg: false,

      parameterSelected: {}
    };
  },
  methods: {
    /**
     * 本函数用于更新更新选中行的status属性到selectedRowStatus变量
     * @param {string} row - menus数据的name属性
     */
    parameterInit(data) {
      this.selectedParams = data;

      this.selectedParamsIndex = []

      for (var i = 0; i < this.selectedParams.length; i++) {
        this.selectedParamsIndex.push(this.selectedParams[i].id)
      }

      try {
        let tmp = qs.stringify({
          index: this.selectedParamsIndex
        });

        postUnitInTime(tmp).then(response => {
          for (var i = 0; i < response.length; i++) {
            this.selectedParams[i].unit = response[i]['unit']
          }
        }).catch(error => {
          console.error('Error in fetching parameter list:', error);
        });

        postDataInTime(tmp).then(response => {
          for (var i = 0; i < response.length; i++) {
            if (response[i].length > 0) {
              this.selectedParams[i].curData = response[i][0]['data']
            } else {
              this.selectedParams[i].curData = 0
            }
          }
          console.log("success")
        }).catch(error => {
          console.error('Error in fetching parameter list:', error);
        });
        resolve();
      } catch (error) {
      }

      this.startListRefresh()
    },


    confirmAdd() {
      // 在这里处理确认操作
      this.isParameterAddedMsg = false;

      this.$message({ message: 'The parameter has been successfully added.', type: 'success' });

      let tmp = qs.stringify({
        index: [this.parameterSelected.id]
      })

      postDataInTime(tmp).then(response => {
        // 在加入之前，先探查一下该参数是否无法查询到数据，如果无法正常搜到数据，则直接不予展示
        if (response[0].length == 0) {
          this.$message.error('This table lacks data and cannot be initialized.')
        } else {
          var isIdInArray = this.showedParams.some(function (element) {
            return element.id === this.parameterSelected.id;
          });

          // 如果选中的参数已经在展示列表中
          if (!isIdInArray) {
            //如果当前展示列表的总数不超过5个
            if (this.showedParams.length < 5) {
              // 为了对齐时间轴，如果有新增的展示参数，则清空旧的参数的所有数据，时间戳都对齐新参数加入的时间
              for (var i = 0; i < this.dataYaxis.length; i++) {
                this.dataYaxis[i] = [];
                this.dateXaxis[i] = [];
              }

              this.showedParams.push(this.parameterSelected)
              this.showedParamsIndex.push(this.parameterSelected.id)
              this.dataYaxis.push([])
              this.dateXaxis.push([])

              this.startRefresh()
            } else {
              this.$message('Allow up to 5 tables to be displayed simultaneously.')
            }
          } else {
            this.$message('This parameter is already in the display list.')
          }
        }
      }).catch(error => {
        console.error('Error in fetching parameter list:', error);
      });
      // 继续处理确认逻辑
    },

    cancelAdd() {
      this.isParameterAddedMsg = false;
      this.$message('The parameter addition operation has been canceled.');
      // 在这里处理取消操作
    },

    confirmDelete() {
      // 关闭提示框
      this.isParameterDeletedMsg = false;

      this.$message({ message: 'The parameter has been successfully deleted.', type: 'success' });

      const index = this.showedParams.findIndex((p) => p.para === this.parameterSelected.para);

      if (this.dataYaxis.length == 1 && index > -1) {
        this.showedParams = []
        this.showedParamsIndex = []
        this.dataYaxis = []
        this.dateXaxis = []
      } else {
        this.showedParams.splice(index, 1);
        this.showedParamsIndex.splice(index, 1);
        this.dataYaxis.splice(index, 1);
        this.dateXaxis.splice(index, 1);
      }
    },

    cancelDelete() {
      this.isParameterDeletedMsg = false;
      this.$message('The parameter deletion operation has been canceled.');
      // 在这里处理取消操作
    },

    /**
     * 本函数用于实现将待选参数加入到展示图表中去
     * @param {Object} parameter
     */
    addParamToShow(parameter) {

      this.parameterSelected = parameter
      // 如果该参数已经被添加至展示列表
      if (this.showedParams.includes(parameter)) {
        // this.isParameterDeletedMsg = true;

        if (confirm(`Are you sure you want to  DELETE  the parameter " ${parameter.para} "? `)) {

          const index = this.showedParams.findIndex((p) => p.para === parameter.para);

          if (this.dataYaxis.length == 1 && index > -1) {
            this.showedParams = []
            this.showedParamsIndex = []
            this.dataYaxis = []
            this.dateXaxis = []
          } else {
            this.showedParams.splice(index, 1);
            this.showedParamsIndex.splice(index, 1);
            this.dataYaxis.splice(index, 1);
            this.dateXaxis.splice(index, 1);
          }
        }
        // 如果该参数尚未被添加
      } else {
        // this.isParameterAddedMsg = true;

        if (confirm(`Are you sure you want to  ADD  the parameter " ${parameter.para} "? `)) {
          let tmp = qs.stringify({
            index: [parameter.id]
          })

          postDataInTime(tmp).then(response => {
            // 在加入之前，先探查一下该参数是否无法查询到数据，如果无法正常搜到数据，则直接不予展示
            if (response[0].length == 0) {
              this.$message.error('This table lacks data and cannot be initialized.')
            } else {
              var isIdInArray = this.showedParams.some(function (element) {
                return element.id === parameter.id;
              });

              // 如果选中的参数已经在展示列表中
              if (!isIdInArray) {
                //如果当前展示列表的总数不超过5个
                if (this.showedParams.length < 5) {
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
                } else {
                  this.$message('Allow up to 5 tables to be displayed simultaneously.')
                }
              } else {
                this.$message('This parameter is already in the display list.')
              }
            }
          }).catch(error => {
            console.error('Error in fetching parameter list:', error);
          });

        }
      }
    },

    /**
     * 本函数用于实时刷新List展示表格中的数据
     */
    fetchListData() {
      return new Promise(async (resolve, reject) => {
        try {

          let tmp = qs.stringify({
            index: this.selectedParamsIndex
          });

          postDataInTime(tmp).then(response => {
            for (var i = 0; i < response.length; i++) {
              if (response[i].length > 0) {
                this.selectedParams[i].curData = response[i][0]['data']
              } else {
                this.selectedParams[i].curData = 0
              }
            }
          }).catch(error => {
            console.error('Error in fetching parameter list:', error);
          });
          resolve();
        } catch (error) {
          // 错误处理
          reject(error);
        }
      });
    },

    /**
     * 本函数用于实时刷新图形化表格中的数据
     */
    fetchData() {
      return new Promise(async (resolve, reject) => {
        try {
          let tmp = qs.stringify({
            index: this.showedParamsIndex
          });

          postDataInTime(tmp).then(response => {

            for (var i = 0; i < response.length; i++) {

              if (response[i].length > 0) {
                for (var j = 0; j < response[i].length; j++) {
                  // 如果数据连续三秒不变，则设为0
                  // if(response.data[i][j]['data'] == response.data[i][j-1]['data']){
                  //   this.dataYaxis[i].push(0);
                  // }else{
                  this.dataYaxis[i].push(response[i][j]['data']);
                  // }

                  this.dateXaxis[i].push(new Date(response[i][j]['time']).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }));
                }

                // 如果展示的长度过长，则移除数组开头的第一秒的元素
                if (this.dataYaxis[i].length > 60 * response[i].length) {
                  for (var k = 0; k < response[i].length; k++) {
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

          }).catch(error => {
            console.error('Error in fetching parameter list:', error);
          });

          this.initEcharts();
          resolve();
        } catch (error) {
          // 错误处理
          reject(error);
        }
      });
    },

    /**
     * 本函数用于初始化绘制表格的所有设定
     */
    initEcharts() {

      //在绘制之前，把现有的表格全给他扬了
      for (var i = 0; i < this.myCharts.length; i++) {
        this.myCharts[i].dispose();
      }

      for (var i = 0; i < this.showedParams.length; i++) {
        var index = this.showedParams[i].id

        var isIdInArray = this.stopParamsIndex.some(function (element) {
          return element === index;
        });

        // 如果待展示的数据被标记为无数据传输，则无法进行表格初始化
        if (!isIdInArray) {
          // 计算该项曲线的最大最小值，用于绘制visualMap
          var minData = Math.min(...this.dataYaxis[i])
          var maxData = Math.max(...this.dataYaxis[i])
          var diff = maxData - minData + 0.0001

          if (!diff) {
            continue;
          }

          const option = {
            title: { text: this.showedParams[i].para, textStyle: { color: '#999999' }, left: '5%', top: '5%' },
            tooltip: { trigger: 'axis', top: '5%' },
            grid: { left: '10%', right: '15%', bottom: '20%' },
            xAxis: { data: this.dateXaxis[i] },
            yAxis: {
              min: (minData - diff * 0.5 - 0.0001).toFixed(4),
              max: (maxData + diff * 0.5 + 0.0001).toFixed(4),
              axisLabel: {
                formatter: '{value}' // 格式化y轴的显示，保留3位小数
              },
              splitLine: {
                lineStyle: {
                  type: 'dashed' // 将分隔线设置为虚线
                }
              },
            },
            toolbox: { right: '1%', top: '5%', feature: { dataZoom: { yAxisIndex: 'none' }, saveAsImage: {} } },
            visualMap: {
              top: '15%', right: '0.5%', pieces: [
                { gt: minData, lte: minData + diff * 3 / 4, color: '#93CE07' },
                { gt: minData + diff * 3 / 4, lte: minData + diff * 11 / 12, color: '#FBDB0F' },
                { gt: minData + diff * 11 / 12, lte: maxData, color: '#FC7D02' }
              ],
              textStyle: { color: "#999999" },
              outOfRange: { color: '#999' },
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

          var myChart = echarts.init(document.getElementById("mychart" + i));

          this.myCharts.push(myChart)
          myChart.setOption(option);
          window.addEventListener("resize", () => {
            myChart.resize();
          });

        } else {
          console.log("This table lacks data and cannot be initialized")
        }
      }
    },

    /**
     * 本函数用于更新时间
     */
    updateCurrentTime() {
      const now = new Date();
      this.currentTime = now.toLocaleTimeString();
      this.currentDate = now.toLocaleDateString();
    },

    /**
     * 本函数用于跳转回之前的参数选择页面，并处理所有现存表格数据的回收
     */
    backToParaPage() {
      this.dataYaxis = []
      this.dateXaxis = []

      this.showedParams = []
      this.showedParamsIndex = []
      this.selectedParams = []
      this.selectedParamsIndex = []
      this.stopParamsIndex = []

      for (var i = 0; i < this.myCharts.length; i++) {
        this.myCharts[i].dispose();
      }
      this.stopRefresh()
      this.stopListRefresh()

      this.$router.push({ name: "ParameterSelect" });
    },

    /**
     * 本函数用于开启图形化表格的实时数据刷新
     */
    startRefresh() {
      if (this.isRefreshing) {
        return; // 如果正在进行数据刷新，则直接返回
      }
      this.isRefreshing = true;
      this.refreshInterval = setInterval(() => {
        this.fetchData()
      }, 1000) // 每秒刷新一次
    },

    /**
     * 本函数用于关闭图形化表格的实时数据刷新
     */
    stopRefresh() {
      this.isRefreshing = false;
      clearInterval(this.refreshInterval)
    },

    /**
     * 本函数用于开启列表数据的实时刷新
     */
    startListRefresh() {
      if (this.isListRefreshing) {
        return; // 如果正在进行数据刷新，则直接返回
      }
      this.isListRefreshing = true;
      this.refreshListInterval = setInterval(() => {
        this.fetchListData()
      }, 1000) // 每秒刷新一次
    },

    /**
     * 本函数用于关闭列表数据的实时刷新
     */
    stopListRefresh() {
      this.isListRefreshing = false;
      clearInterval(this.refreshListInterval)
    },
    changeRadio,
    printPage,
    customSortMethodForProgressColumn
  },
  mounted() {
    this.parameterInit(this.$route.params.selectedParameter)
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
    for (var i = 0; i < this.myCharts.length; i++) {
      this.myCharts[i].dispose();
    }
    this.stopRefresh()
  },

  computed: {
    totalViewParamPage() {
      if (Math.ceil(this.params.length / this.maxLineNum) >= 1)
        return Math.ceil(this.params.length / this.maxLineNum)
      else
        return 1
    },
    currentViewParamArray() {
      if (this.curViewGroup == true) {
        return this.params.slice((this.currViewParamPage - 1) * this.maxLineNum, this.currViewParamPage * this.maxLineNum);
      } else {
        return this.paramsLast.slice((this.currViewParamPage - 1) * this.maxLineNum, this.currViewParamPage * this.maxLineNum);
      }
    },
  }
};
</script>
