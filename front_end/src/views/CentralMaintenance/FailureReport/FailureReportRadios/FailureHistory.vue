<template>
  <el-row v-if="!isPdfPageSelected"
          style="height: 65vh; border:  0.5px solid rgb(111, 111, 111);">
    <el-table highlight-current-row
              style="width: 100%; background-color: rgb(46, 45, 45);"
              :data="filteredFailure"
              :sort-method="customSortMethodForProgressColumn"
              :header-cell-style="{
    background: '#404040',
    color: '#FFFFFF',
    font: '14px'
  }"
              height="65vh"
              :empty-text="'NO DATA DISPLAY'"
              row-key="index"
              :default-expand-all="true"
              :tree-props="{ children: 'children', hasChildren: 'hasChildren' }"
              @current-change="tableRowClicked"
              v-loading="loading"
              element-loading-text="Data Loading..."
              element-loading-spinner="el-icon-loading"
              element-loading-background="rgba(0, 0, 0, 0.5)">
      <el-table-column :width="null"
                       :min-width="10"></el-table-column>
      <el-table-column prop="ata"
                       label="ATA"
                       sortable
                       :width="null"
                       :min-width="40"
                       :filters="ataFilters"
                       :filter-method="filterHandler"></el-table-column>
      <el-table-column prop="fimcodeInfo"
                       label="FIM Code"
                       :min-width="50">
        <template slot="header"
                  slot-scope="scope">
          <span>FIM Code</span>
          <el-input style="width: 100px; margin-left: 10px;"
                    v-model="searchFimCodeInput"
                    size="mini"
                    placeholder="Search FIM Code"
                    clearable />
        </template>
        <template slot-scope="scope">
          <span @click="// @ts-ignore
    findURL(scope.row.fimcodeInfo)"
                :style="{ padding: '8px', height: '32px', width: '32px', cursor: 'pointer' }"
                style="transition: color 0.3s;"
                @mouseenter="$event.target.style.textDecoration = 'underline'; $event.target.style.color = 'rgb(200, 200, 200)';"
                @mouseleave="$event.target.style.textDecoration = 'none'; $event.target.style.color = 'rgb(255, 255, 255)';">
            {{ scope.row.fimcodeInfo }} </span>
        </template>
      </el-table-column>
      <el-table-column prop="failureNameInfo"
                       label="Failure Name"
                       :width="null"
                       :min-width="95">
        <template slot="header"
                  slot-scope="scope"> Failure Name <el-input style="width: 13vh; margin-left: 2vh;margin-right: 1vh;"
                    v-model="searchFailureNameInput"
                    size="mini"
                    placeholder="Failure Name"
                    clearable />
          <!-- <i class="el-icon-search"></i> -->
        </template>
      </el-table-column>
      <el-table-column prop="failureState"
                       label="Failure Status"
                       sortable
                       :width="null"
                       :min-width="35"></el-table-column>
      <el-table-column prop="flightPhase"
                       label="Flight Phase"
                       sortable
                       :width="null"
                       :min-width="40"
                       :filters="phaseFilters"
                       :filter-method="filterHandler"></el-table-column>
      <el-table-column prop="failureTime"
                       label="Date/Time"
                       sortable
                       :width="null"
                       :min-width="50"></el-table-column>
      <el-table-column prop="flightLeg"
                       label="Flight Leg"
                       sortable
                       :width="null"
                       :formatter="flightLegFormatter"
                       :min-width="35"
                       :filters="legFilters"
                       :filter-method="filterHandler"></el-table-column>
      <el-table-column prop="fde.FDEText"
                       label="FDE Text"
                       :formatter="fdeTextFormatter"
                       :width="null"
                       :min-width="40"></el-table-column>
      <el-table-column :width="null"
                       :min-width="5"></el-table-column>
    </el-table>
    <el-dialog center
               style="font-size: 15px;"
               :visible.sync="isFlightLegsSelected"
               width="50%">
      <el-row style=" margin-left: 15px; margin-right: 15px;">
        <el-col :span="8">
          <div class="radio"
               @click="dialogSelected = 'ATA'">
            <input name="select-flightLegs-radio"
                   type="radio"
                   :checked="dialogSelected == 'ATA'" />
            <label class="form-check-label">ATA</label>
          </div>
        </el-col>
        <el-col :span="8">
          <div class="radio"
               @click="dialogSelected = 'flightPhase'">
            <input name="select-flightLegs-radio"
                   type="radio"
                   :checked="dialogSelected == 'flightPhase'" />
            <label class="form-check-label">Flight Phase</label>
          </div>
        </el-col>
        <el-col :span="8">
          <div class="radio"
               @click="dialogSelected = 'flightLeg'">
            <input name="select-flightLegs-radio"
                   type="radio"
                   :checked="dialogSelected == 'flightLeg'" />
            <label class="form-check-label">Flight Leg</label>
          </div>
        </el-col>
      </el-row>
      <el-row style=" margin-left: 15px; margin-right: 15px;  height: 50vh;">
        <el-table v-if="dialogSelected == 'ATA'"
                  :data="ataFilters"
                  style="
              width: 100%;
              height: 50vh;
              background-color: rgb(46, 45, 45);
              margin-top: 1vh;
              margin-bottom: 1vh;
              border:  0.5px solid rgb(111, 111, 111);
            "
                  class="el-table—dialog"
                  :header-cell-style="{ background: '#404040', color: '#FFFFFF', font: '14px' }"
                  :empty-text="'NO DATA DISPLAY'">
          <el-table-column :width="null"
                           :min-width="10"></el-table-column>
          <el-table-column prop="text"
                           label="ATA"
                           :width="null"
                           :min-width="30"></el-table-column>
          <el-table-column prop="count"
                           label="Count"
                           :width="null"
                           :min-width="15"></el-table-column>
          <el-table-column :width="null"
                           :min-width="10"></el-table-column>
        </el-table>
        <el-table v-if="dialogSelected == 'flightPhase'"
                  :data="phaseFilters"
                  style="
              width: 100%;
              height: 50vh;
              margin-top: 1vh;
              margin-bottom: 1vh;
              background-color: rgb(46, 45, 45);
              border:  0.5px solid rgb(111, 111, 111);
            "
                  :header-cell-style="{ background: '#404040', color: '#FFFFFF', font: '14px' }"
                  :empty-text="'NO DATA DISPLAY'">
          <el-table-column :width="null"
                           :min-width="10"></el-table-column>
          <el-table-column prop="text"
                           label="Phase"
                           :width="null"
                           :min-width="30"></el-table-column>
          <el-table-column prop="count"
                           label="Count"
                           :width="null"
                           :min-width="15"></el-table-column>
          <el-table-column :width="null"
                           :min-width="10"></el-table-column>
        </el-table>
        <el-table v-if="dialogSelected == 'flightLeg'"
                  :data="legFilters"
                  style="
              width: 100%;
              height: 50vh;
              background-color: rgb(46, 45, 45);
              margin-top: 1vh;
              margin-bottom: 1vh;
              border:  0.5px solid rgb(111, 111, 111);
            "
                  class="el-table—dialog"
                  :header-cell-style="{ background: '#404040', color: '#FFFFFF', font: '14px' }"
                  :empty-text="'NO DATA DISPLAY'">
          <el-table-column :width="null"
                           :min-width="10"></el-table-column>
          <el-table-column prop="text"
                           label="Leg"
                           :width="null"
                           :min-width="30"></el-table-column>
          <el-table-column prop="count"
                           label="Count"
                           :width="null"
                           :min-width="15"></el-table-column>
          <el-table-column :width="null"
                           :min-width="10"></el-table-column>
        </el-table>
      </el-row>
      <span slot="footer"
            class="dialog-footer">
        <el-button type="primary"
                   @click="isFlightLegsSelected = false">Back</el-button>
      </span>
    </el-dialog>
    <div class="
                table-lower-bar">
      <span class="table-lower-bar-right-text">
        <el-tooltip class="item"
                    effect="dark"
                    content="Failures Details"
                    placement="top">
          <el-button circle
                     class="table-outer-button"
                     icon="el-icon-s-data"
                     @click="isFlightLegsSelected = true"></el-button> </el-tooltip>
        <!-- Number of Failures:
        {{ failureCountTotal }} -->
      </span>
    </div>
  </el-row>
  <div v-else>
    <div class="html_page">
      <el-button class="html_close_btn"
                 icon="el-icon-close"
                 circle
                 size="mini"
                 v-on:click='isPdfPageSelected = false'>
      </el-button>
      <iframe id="iframe"
              class="html_OMD">
      </iframe>
    </div>
  </div>
</template>
<script>
import { customSortMethodForProgressColumn } from '@/utils/utils'
import { postFimCodeForURL } from '@/services/centralMaintenance/failureReport';

// @ts-ignore
import qs from 'qs'

export default {
  components: {},
  name: "ExistingFailures",
  data() {
    return {
      existingFailureArray: [],
      ataFilters: [],
      phaseFilters: [],
      legFilters: [],
      failureCountTotal: 0,

      isPdfPageSelected: false,
      showFimCodeInput: false,
      showFailureNameInput: false,
      isFlightLegsSelected: false,
      dialogSelected: 'ATA',

      searchFimCodeInput: '',
      searchFailureNameInput: '',
      interval: null,
      loading: false
    };
  },
  created() {
    this.getfailureArray();
    // @ts-ignore
    // this.interval = setInterval(() => {
    //   this.getfailureArray();
    // }, 1000); // 每秒执行一次
    // setTimeout(() => {
    //   this.loading = false;
    // }, 200);
  },
  beforeDestroy() {
    // @ts-ignore
    clearInterval(this.interval);
  },

  methods: {
    // @ts-ignore
    findURL(fimCode) {
      const that = this
      this.isPdfPageSelected = true
      let tmp = qs.stringify({
        fimCode: fimCode
      })

      console.log("tmp:", tmp)
      console.log("targetURL is: http://192.168.1.34:81/manual/detail?groupNameCode=CES&language=sx_US&model=C919&path=%2FCES-C919-sx_US-2000300%2FDMC-C919-A-52-20-00-A1A-421A-A.XML&issueNumber=R11&publicationId=CES-C919-sx_US-2000300")

      postFimCodeForURL(tmp).then(response => {

        // @ts-ignore
        const queryString = response["file_name"];
        console.log("reponse url is", queryString)
        const urlraw = `http://192.168.1.34:81/manual/detail?groupNameCode=CES&language=sx_US&model=C919&path=%2FCES-C919-sx_US-2000300%` + queryString + `&issueNumber=R11&publicationId=CES-C919-sx_US-2000300`
        console.log("url raw:", urlraw)

        // @ts-ignore
        document.getElementById('iframe').src = urlraw;

      }).catch(error => {
        console.error('Error in Postting pdf url:', error)
      });

      // 在外部页面
      // @ts-ignore
      // window.addEventListener("message", function (event: MessageEvent<any>) {
      //   // 检查origin，确定消息发送方的安全性
      //   // if (event.origin !== "http://example.com") {
      //   //   return; // 来源不正确时忽略消息
      //   // }

      //   console.log("从iframe收到的消息：", event.data);
      //   if (event.data.hasOwnProperty("targetPage")) {
      //     if (event.data.targetPage === "selectTestNew") {
      //       console.log('[ this ] >', this)
      //       that.$router.push({ name: "SelectTestNew" });
      //     }
      //     console.log("[ event.data.targetPage ] >", event.data.targetPage)
      //     // window.parent.postMessage(event.data, "*");
      //   }
      // }, false);
    },

    fdeTextFormatter(row, column) {
      return row.fde && row.fde.FDEText ? row.fde.FDEText : "N/A";
    },

    flightLegFormatter(row, column) {
      // 找出flightLeg的最大值
      const maxFlightLeg = this.$store.state.failureList.maxflightLeg;

      // 对flightLeg进行格式化处理
      return row.flightLeg - maxFlightLeg;
    },



    // @ts-ignore
    filterHandler(value, row, column) {
      const property = column['property'];
      return row[property] === value;
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
     * 更新store的选中行数据
     * @param {*} item 选中行数据
     */
    tableRowClicked(item) {

      // @ts-ignore
      this.$store.state.failureList.selectedFailureId = item.index;
    },
    /**
     * 本函数用于mounted中，获取state中resFailureData数据，并处理数据，具体有：
     * 唯一化failureName，将相同的failureName合同至一个object，分为parent和children
     * 并将failure_name_info更新为failure_name_info+[count]格式
     * 更新至this.existingFailureArray，用于前端合并数据的展示
     */
    getfailureArray() {

      // @ts-ignore
      if (this.$store.state.failureList.resFailureData.length !== undefined) {
        //深度拷贝，不改变state中resFailureData的原始数据
        const existingFailureOri = JSON.parse(
          // @ts-ignore
          JSON.stringify(this.$store.state.failureList.resFailureData)
        );

        // 创建一个新数组来存放结果
        // @ts-ignore
        let mergedArray = existingFailureOri.reduce((acc, curr) => {
          // 检查当前对象是否与已有对象相匹配
          // @ts-ignore
          let match = acc.find(item => item.failureNameInfo === curr.failureNameInfo && item.failureTime === curr.failureTime);

          // 如果有匹配的对象，将当前对象添加到匹配对象的children数组中
          if (match) {
            if (!match.children) {
              match.children = [];
            }

            match.children.push({
              ata: "",
              failureNameInfo: "",
              failureState: "",
              failureTime: "",
              fault: "",
              fde: curr.fde,
              fimcodeInfo: "",
              flightLeg: "",
              flightPhase: "",
              id: "",
              index: curr.index,
              maintenceText: curr.maintenceText,
              maintenceTime: curr.maintenceTime
            });
          } else {
            // 如果没有匹配的对象，将当前对象直接添加到结果数组中
            acc.push(curr);
          }
          return acc;
        }, []);

        this.existingFailureArray = mergedArray

        // @ts-ignore
        this.ataFilters = Array.from(new Set(this.existingFailureArray.map(obj => obj.ata))).map(value => {
          // @ts-ignore
          const filteredItems = this.existingFailureArray.filter(item => item.ata === value);
          return {
            text: value,
            value: value,
            count: filteredItems.length
          };
        });

        // @ts-ignore
        this.phaseFilters = Array.from(new Set(this.existingFailureArray.map(obj => obj.flightPhase))).map(value => {
          // @ts-ignore
          const filteredItems = this.existingFailureArray.filter(item => item.flightPhase === value);
          return {
            text: value,
            value: value,
            count: filteredItems.length
          };
        });

        // 查找flightLeg的最大值
        // const maxFlightLeg = Math.max(...this.existingFailureArray.map(obj => obj.flightLeg));
        // 计算text，并创建 legFilters 数组
        this.legFilters = Array.from(new Set(this.existingFailureArray.map(obj => obj.flightLeg)))
          .map(value => {
            const filteredItems = this.existingFailureArray.filter(item => item.flightLeg === value);
            return {
              // text: (value - maxFlightLeg).toString(), // 使用每个对象的flightLeg属性减去最大值
              text: value - this.$store.state.failureList.maxflightLeg,
              value: value,
              count: filteredItems.length
            };
          });


        // // @ts-ignore
        // this.legFilters = Array.from(new Set(this.existingFailureArray.map(obj => obj.flightLeg))).map(value => {
        //   // @ts-ignore
        //   const filteredItems = this.existingFailureArray.filter(item => item.flightLeg === value);
        //   return {
        //     text: value,
        //     value: value,
        //     count: filteredItems.length
        //   };
        // });
      } else {
        this.existingFailureArray = []
      }
    },
    customSortMethodForProgressColumn
  },
  computed: {
    filteredFailure() {

      this.failureCountTotal = this.existingFailureArray.filter((item) => {
        // @ts-ignore
        return item.fimcodeInfo.toLowerCase().includes(this.searchFimCodeInput.toLowerCase())
          // @ts-ignore
          && item.failureNameInfo.toLowerCase().includes(this.searchFailureNameInput.toLowerCase());
      }).length

      return this.existingFailureArray.filter((item) => {
        // @ts-ignore
        return item.fimcodeInfo.toLowerCase().includes(this.searchFimCodeInput.toLowerCase())
          // @ts-ignore
          && item.failureNameInfo.toLowerCase().includes(this.searchFailureNameInput.toLowerCase());
      });
    },
  },
  mounted() {

    // this.getfailureArray();
    // console.log("existingFailureArray:", this.existingFailureArray);
  },
};
</script>
<style scoped></style>
