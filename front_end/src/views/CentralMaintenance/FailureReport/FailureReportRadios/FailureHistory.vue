<template>
  <el-row>
    <el-table highlight-current-row
              style="width: 100%; background-color: rgb(46, 45, 45);"
              :data="filteredFailure"
              :sort-method="customSortMethodForProgressColumn"
              :header-cell-style="{
                background: '#404040',
                color: '#FFFFFF',
                font: '14px',
                'text-align': 'center',
              }"
              height="70vh"
              :cell-style="{ 'text-align': 'center' }"
              :empty-text="'NO DATA DISPLAY'"
              row-key="index"
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
                       :min-width="30"
                       :filters="ataFilters"
                       :filter-method="filterHandler"></el-table-column>
      <el-table-column prop="fimcodeInfo"
                       label="FIM Code"
                       :width="null"
                       :min-width="70">
        <template slot="header"
                  slot-scope="scope"> FIM Code <el-input style="width: 15vh; margin-left: 2vh;margin-right: 1vh;"
                    v-model="searchFimCodeInput"
                    size="mini"
                    placeholder="FIM Code"
                    clearable />
          <i class="el-icon-search"></i>
        </template>
      </el-table-column>
      <el-table-column prop="failureNameInfo"
                       label="Failure Name"
                       :width="null"
                       :min-width="75">
        <template slot="header"
                  slot-scope="scope"> Failure Name <el-input style="width: 15vh; margin-left: 2vh;margin-right: 1vh;"
                    v-model="searchFailureNameInput"
                    size="mini"
                    placeholder="Failure Name"
                    clearable />
          <i class="el-icon-search"></i>
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
      <el-table-column prop="fde.FDEText"
                       label="FDE Text"
                       :width="null"
                       :min-width="60"></el-table-column>
      <el-table-column prop="flightLeg"
                       label="Flight Leg"
                       sortable
                       :width="null"
                       :min-width="35"
                       :filters="legFilters"
                       :filter-method="filterHandler"></el-table-column>
      <el-table-column :width="null"
                       :min-width="5"></el-table-column>
    </el-table>
    <el-dialog style="font-size: 15px; color: white;"
               :visible.sync="isFlightLegsSelected"
               width="50%">
      <el-row style=" margin-left: 15px; margin-right: 15px;">
        <el-col :span="8">
          <div class="radio"
               @click="dialogSelected = 'ATA'">
            <input name="select-flightLegs-radio"
                   type="radio"
                   :checked="dialogSelected == 'ATA'" />
            <label class="form-check-label"
                   style="color:black">ATA</label>
          </div>
        </el-col>
        <el-col :span="8">
          <div class="radio"
               @click="dialogSelected = 'flightPhase'">
            <input name="select-flightLegs-radio"
                   type="radio"
                   :checked="dialogSelected == 'flightPhase'" />
            <label class="form-check-label"
                   style="color:black">Flight Phase</label>
          </div>
        </el-col>
        <el-col :span="8">
          <div class="radio"
               @click="dialogSelected = 'flightLeg'">
            <input name="select-flightLegs-radio"
                   type="radio"
                   :checked="dialogSelected == 'flightLeg'" />
            <label class="form-check-label"
                   style="color:black">Flight Leg</label>
          </div>
        </el-col>
      </el-row>
      <el-row style=" margin-left: 15px; margin-right: 15px;">
        <el-table v-if="dialogSelected == 'ATA'"
                  :data="ataFilters"
                  style="
            width: 100%;
            background-color: rgb(52, 52, 52);
            margin-top: 1vh;
            margin-bottom: 1vh;
          "
                  :header-cell-style="{
                background: 'rgb(52, 52, 52)',
                color: '#FFFFFF',
                font: '14px',
                'text-align': 'center',
              }"
                  :cell-style="{ 'text-align': 'center' }"
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
                           :min-width="55"></el-table-column>
          <el-table-column :width="null"
                           :min-width="10"></el-table-column>
        </el-table>
        <el-table v-if="dialogSelected == 'flightPhase'"
                  style="
            width: 100%;
            background-color: rgb(52, 52, 52);
            margin-top: 1vh;
            margin-bottom: 1vh;
          "
                  :data="phaseFilters"
                  :header-cell-style="{
                background: 'rgb(52, 52, 52)',
                color: '#FFFFFF',
                font: '14px',
                'text-align': 'center',
              }"
                  :cell-style="{ 'text-align': 'center' }"
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
                           :min-width="55"></el-table-column>
          <el-table-column :width="null"
                           :min-width="10"></el-table-column>
        </el-table>
        <el-table v-if="dialogSelected == 'flightLeg'"
                  :data="legFilters"
                  style="
            width: 100%;
            background-color: rgb(52, 52, 52);
            margin-top: 1vh;
            margin-bottom: 1vh;
          "
                  :header-cell-style="{
                background: 'rgb(52, 52, 52)',
                color: '#FFFFFF',
                font: '14px',
                'text-align': 'center',
              }"
                  :cell-style="{ 'text-align': 'center' }"
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
                           :min-width="55"></el-table-column>
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
    <div class="table-outer-number">
      <el-button circle
                 slot="reference"
                 class="table-outer-button"
                 icon="el-icon-s-data"
                 @click="isFlightLegsSelected = true"></el-button> Number of Failures: {{ failureCountTotal }}
    </div>
  </el-row>
</template>
<script>
import { customSortMethodForProgressColumn } from '@/utils/utils.ts'
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

      showFimCodeInput: false,
      showFailureNameInput: false,
      isFlightLegsSelected: false,
      dialogSelected: 'ATA',

      searchFimCodeInput: '',
      searchFailureNameInput: '',
      interval: null,
      loading: true
    };
  },
  created() {
    this.interval = setInterval(() => {
      this.getfailureArray();
    }, 1000); // 每秒执行一次
    setTimeout(() => {
      this.loading = false;
    }, 500);
  },
  beforeDestroy() {
    clearInterval(this.interval);
  },

  methods: {
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

      this.$store.state.failureList.selectedFailureId = item.index;
    },
    /**
     * 本函数用于mounted中，获取state中resFailureData数据，并处理数据，具体有：
     * 唯一化failureName，将相同的failureName合同至一个object，分为parent和children
     * 并将failure_name_info更新为failure_name_info+[count]格式
     * 更新至this.existingFailureArray，用于前端合并数据的展示
     */
    getfailureArray() {

      if (this.$store.state.failureList.resFailureData.length !== undefined) {
        //深度拷贝，不改变state中resFailureData的原始数据
        const existingFailureOri = JSON.parse(
          JSON.stringify(this.$store.state.failureList.resFailureData)
        );



        // 创建一个新数组来存放结果
        let mergedArray = existingFailureOri.reduce((acc, curr) => {
          // 检查当前对象是否与已有对象相匹配
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

        // 输出合并后的数组
        //console.log(mergedArray);



        this.ataFilters = Array.from(new Set(this.existingFailureArray.map(obj => obj.ata))).map(value => {
          const filteredItems = this.existingFailureArray.filter(item => item.ata === value);
          return {
            text: value,
            value: value,
            count: filteredItems.length
          };
        });

        this.phaseFilters = Array.from(new Set(this.existingFailureArray.map(obj => obj.flightPhase))).map(value => {
          const filteredItems = this.existingFailureArray.filter(item => item.flightPhase === value);
          return {
            text: value,
            value: value,
            count: filteredItems.length
          };
        });

        this.legFilters = Array.from(new Set(this.existingFailureArray.map(obj => obj.flightLeg))).map(value => {
          const filteredItems = this.existingFailureArray.filter(item => item.flightLeg === value);
          return {
            text: value,
            value: value,
            count: filteredItems.length
          };
        });
      } else {
        this.existingFailureArray = []
      }
    },
    customSortMethodForProgressColumn
  },
  computed: {
    filteredFailure() {

      this.failureCountTotal = this.existingFailureArray.filter((item) => {
        return item.fimcodeInfo.toLowerCase().includes(this.searchFimCodeInput.toLowerCase())
          && item.failureNameInfo.toLowerCase().includes(this.searchFailureNameInput.toLowerCase());
      }).length

      return this.existingFailureArray.filter((item) => {
        return item.fimcodeInfo.toLowerCase().includes(this.searchFimCodeInput.toLowerCase())
          && item.failureNameInfo.toLowerCase().includes(this.searchFailureNameInput.toLowerCase());
      });
    },
  },
  mounted() {

    this.getfailureArray();
    console.log("existingFailureArray:", this.existingFailureArray);
  },
};
</script>
<style scoped></style>
