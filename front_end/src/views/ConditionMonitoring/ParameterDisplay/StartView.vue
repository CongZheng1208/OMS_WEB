<template>
  <div>
    <el-header style="height: 9vh;">
      <el-row style="width: 100%;">
        <el-col :span="3">
          <div class="el-header-title"> Test Selection </div>
        </el-col>
        <el-col :span="12">
          <div class="el-header-radios">
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
          </div>
        </el-col>
        <el-col :span="6"
                class="el-header-radios"> Display Type: {{ displayType }} <br> Parameter Set Received at:
          {{ currParamUpdateTime }} </el-col>
        <el-col :span="3">
          <Clock />
        </el-col>
      </el-row>
    </el-header>
    <el-main>
      <el-row v-if="displaySelected == 'list'"
              style=" border:  0.5px solid rgb(111, 111, 111);">
        <el-table highlight-current-row
                  height="70vh"
                  style=" background-color: rgb(46, 45, 45)"
                  :data="selectedParams"
                  :sort-method="customSortMethodForProgressColumn"
                  :header-cell-style="{ background: '#404040', color: '#FFFFFF', font: '14px' }"
                  :empty-text="'NO DATA DISPLAY'">
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
                           :formatter="formatUnit"
                           :width="null"
                           :min-width="10"></el-table-column>
          <el-table-column :width="null"
                           :min-width="5"></el-table-column>
        </el-table>
      </el-row>
      <el-row v-else>
        <el-col :span="8"
                style=" border:  0.5px solid rgb(111, 111, 111);">
          <el-table highlight-current-row
                    height="70vh"
                    @row-click="addParamToShow"
                    style=" background-color: rgb(46, 45, 45)"
                    :data="selectedParams"
                    :row-class-name="tableRowClassName"
                    :sort-method="customSortMethodForProgressColumn"
                    :header-cell-style="{ background: '#404040', color: '#FFFFFF', font: '14px' }"
                    :empty-text="'NO DATA DISPLAY'">
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
               v-loading="loading"
               element-loading-text="Data Loading..."
               element-loading-spinner="el-icon-loading"
               element-loading-background="rgba(0, 0, 0, 0.5)"
               style="height: 70vh">
            <div class="custom-content">
              <div v-for="(item, i) in showedParams.length"
                   :key="i">
                <div class="echarts"
                     :style="{ height: (showedParams.length === 1 ? '70vh' : '30vh') }"
                     :id="'mychart' + i"
                     style="myChartStyle"></div>
              </div>
            </div>
          </div>
        </el-col>
      </el-row>
      <el-dialog center
                 :visible.sync="isParameterAddedMsg"
                 title="CONFIRM">
        <p>Are you sure you want to ADD the parameter "{{ parameterSelected.para }}"?</p>
        <span slot="footer"
              class="dialog-footer">
          <el-button type="primary"
                     @click="confirmAdd">Confirm</el-button>
          <el-button @click="cancelAdd">Cancel</el-button>
        </span>
      </el-dialog>
      <el-dialog center
                 :visible.sync="isParameterDeletedMsg"
                 title="CONFIRM">
        <p>Are you sure you want to DELETE the parameter "{{ parameterSelected.para }}"?</p>
        <span slot="footer"
              class="dialog-footer">
          <el-button type="primary"
                     @click="confirmDelete">Confirm</el-button>
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
import { postDataInTimeNew } from '@/services/conditionMonitoring/parameterDisplay/index';
import Clock from '@/components/Clock/index.vue'

export default {
  name: "StartView",
  emits: ["backTo"],
  data() {
    return {
      isRefreshing: false,
      isListRefreshing: false,
      displayType: "LIVE",
      loading: false,
      currParamUpdateTime: "2024/06/22 13:26:13",

      displaySelected: 'figure',

      selectedParams: [],
      selectedParamsIndex: [],

      showedParams: [],
      showedParamsIndex: [],

      dateXaxis: [],
      dataYaxis: [],

      myCharts: [],
      myChartStyle: { float: "center", width: "95%" },

      refreshInterval: null, // 保存刷新的间隔ID
      refreshListInterval: null,

      isParameterAddedMsg: false,
      isParameterDeletedMsg: false,

      parameterSelected: ""
    };
  },
  components: {
    Clock
  },
  methods: {
    tableRowClassName({ row, rowIndex }) {
      if (this.showedParamsIndex.includes(row.id)) {
        return 'highlighted-row';
      }
      return '';
    },
    /**
     * 本函数用于更新初始化表格中的数据
     */
    parameterInit(data) {
      this.selectedParams = data;
      this.selectedParamsIndex = []

      for (var i = 0; i < this.selectedParams.length; i++) {
        this.selectedParamsIndex.push(this.selectedParams[i].id)
      }

      this.startListRefresh()
    },

    /**
     * 本函数用于设置formatUnit的显示格式
     * @param {*} row table选中行信息
     */
    formatUnit(row) {
      return row.unit ? row.unit : "None";
    },

    /**
     * 本函数用于实现将待选参数加入到展示图表中去
     * @param {Object} parameter
     */
    addParamToShow(parameter) {

      // console.log("parameter", parameter)
      // console.log("this.showedParams", this.showedParams)

      this.parameterSelected = parameter
      // 如果该参数已经被添加至展示列表


      if (this.showedParamsIndex.includes(this.parameterSelected.id)) {
        console.log("already")
        this.isParameterDeletedMsg = true;
      } else {
        console.log("not")
        this.isParameterAddedMsg = true;
      }
    },

    confirmAdd() {
      // var isIdInArray = this.showedParams.some(function (element) {
      //   return element.id === this.parameterSelected.id;
      // });

      // 如果选中的参数已经在展示列表中
      // if (!isIdInArray) {

      if (this.showedParams.length < 5) {
        // 为了对齐时间轴，如果有新增的展示参数，则清空旧的参数的所有数据，时间戳都对齐新参数加入的时间
        for (var i = 0; i < this.dataYaxis.length; i++) {
          this.dataYaxis[i] = [];
          this.dateXaxis[i] = [];
        }

        console.log("this.parameterSelected", this.parameterSelected)

        this.showedParams.push(this.parameterSelected)
        this.showedParamsIndex.push(this.parameterSelected.id)
        this.dataYaxis.push([])
        this.dateXaxis.push([])

        this.startRefresh()
      } else {
        this.$message('Allow up to 5 tables to be displayed simultaneously.')
      }
      this.isParameterAddedMsg = false;
    },

    cancelAdd() {
      this.isParameterAddedMsg = false;
    },

    confirmDelete() {

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
      this.isParameterDeletedMsg = false;
    },

    cancelDelete() {
      this.isParameterDeletedMsg = false;
    },


    fetchListData() {
      let tmp = qs.stringify({
        index: this.selectedParamsIndex,
        timeIndex: this.getCurrentDateTime()
      });

      let tempSelectedParams = []; // 创建一个临时变量来保存更新后的selectedParams

      postDataInTimeNew(tmp).then(response => {
        for (let i = 0; i < response.length; i++) {
          let newData = response[i].length > 0 ? response[i][response[i].length - 1].data : 0;
          tempSelectedParams.push({ ...this.selectedParams[i], curData: newData }); // 更新临时变量中的数据
        }
        // 更新this.selectedParams为新的值
        this.selectedParams = tempSelectedParams;

      }).catch(error => {
        console.error('Error in fetching parameter list:', error);
      });
    },

    /**
     * 本函数用于实时刷新图形化表格中的数据
     */
    fetchData() {
      return new Promise(async (resolve, reject) => {
        try {
          let tmp = qs.stringify({
            index: this.showedParamsIndex,
            timeIndex: this.getCurrentDateTime()
          });

          postDataInTimeNew(tmp).then(response => {
            for (var i = 0; i < response.length; i++) {
              if (response[i].length > 0) {
                for (var j = 0; j < response[i].length; j++) {
                  this.dataYaxis[i].push(response[i][j]['data']);
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
                // 如果该秒无法获取数据，则直接塞入0
                this.dataYaxis[i].push("0");
                this.dateXaxis[i].push(new Date().toLocaleTimeString('en-US', { hour12: false, hour: '2-digit', minute: '2-digit', second: '2-digit' }));

                // 如果展示的长度过长，则移除数组开头的第一秒的元素
                if (this.dataYaxis[i].length > 60 * response[i].length) {
                  for (var k = 0; k < response[i].length; k++) {
                    this.dataYaxis[i].shift();
                    this.dateXaxis[i].shift();
                  }
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
      }
    },

    /**
     * 本函数用于获取当前时间
     */
    getCurrentDateTime() {
      var now = new Date();
      var year = now.getFullYear();
      var month = (now.getMonth() + 1).toString().padStart(2, '0');
      var day = now.getDate().toString().padStart(2, '0');
      var hours = now.getHours().toString().padStart(2, '0');
      var minutes = now.getMinutes().toString().padStart(2, '0');
      var seconds = now.getSeconds().toString().padStart(2, '0');

      var formattedDateTime = year + '-' + month + '-' + day + ' ' + hours + ':' + minutes + ':' + seconds;
      return formattedDateTime;
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
        return; // 如果正在进行数据刷新，则直接返回，不进行任何下一步操作
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
        return; // 如果正在进行数据刷新，则直接返回，不进行任何下一步操作
      }
      this.isListRefreshing = true;

      this.refreshListInterval = setInterval(() => {
        this.fetchListData();
      }, 1000); // 每秒执行一次

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
  beforeDestroy() {
    for (var i = 0; i < this.myCharts.length; i++) {
      this.myCharts[i].dispose();
    }
    this.stopRefresh()
    this.stopListRefresh()
  },
};
</script>
