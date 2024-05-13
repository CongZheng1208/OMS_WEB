<template>
  <div>
    <el-main>
      <div class="controller">
        <el-select v-model="parameterSelected"
                   @change="clearFilter()">
          <el-option v-for="x in testData"
                     :value="x.value"
                     :key="x.value"
                     :label="x.name"></el-option>
        </el-select>
      </div>
      <el-row>
        <el-col :span="6">
          <div class="custom-card"
               shadow="hover"
               style="height: 60vh">
            <div class="custom-header"> FILTER</div>
            <div class="custom-content">
              <div style="height: 38vh">
                <div class="input-row">
                  <span class="label">Source Port</span>
                  <input type="text"
                         class="search-input"
                         placeholder="e.g. 8080"
                         v-model="sourcePortKey" />
                </div>
                <div class="input-row">
                  <span class="label">Des Port</span>
                  <input type="text"
                         class="search-input"
                         placeholder="e.g. 8080"
                         v-model="desPortKey" />
                </div>
                <div v-if="parameterSelected == 1">
                  <div class="input-row">
                    <span class="label">Byte Offset(Byte)</span>
                    <input type="text"
                           class="search-input"
                           placeholder="e.g. 3  Unit: Byte"
                           v-model="byteOffsetKey" />
                  </div>
                  <div class="input-row">
                    <span class="label">Length(Byte)</span>
                    <input type="text"
                           class="search-input"
                           placeholder="e.g. 5  Unit: Byte"
                           v-model="lengthKey" />
                  </div>
                </div>
                <div v-if="parameterSelected == 2">
                  <div class="input-row">
                    <span class="label">Key Field</span>
                    <input type="text"
                           class="search-input"
                           placeholder="e.g. 3C"
                           v-model="keyFieldKey" />
                  </div>
                </div>
              </div>
            </div>
            <el-button @click="clearFilter()"
                       class="custom-footer"> Clear </el-button>
          </div>
        </el-col>
        <el-col :span="18">
          <el-row>
            <el-col :span="6">
              <div class="custom-card"
                   shadow="hover"
                   style="height: 60vh">
                <div class="custom-header"> TIMESTAMP</div>
                <div class="custom-content">
                  <div class="param-wrapper"
                       v-for="(ele, index) in curRawDatas.slice(0, 15)"
                       :key="index"
                       :class="{ 'selected': selectedRawData && selectedRawData.idx == ele.idx }"
                       @click="addParamToStart(ele)">
                    <label>{{ ele.timestamp }}</label>
                  </div>
                </div>
                <el-button @click="clearTimestamp()"
                           class="custom-footer"> Clear </el-button>
              </div>
            </el-col>
            <el-col :span="18">
              <div class="custom-card"
                   shadow="hover"
                   style="height: 60vh">
                <div class="custom-header"> RAW DATA</div>
                <div class="custom-content">
                  <div class="raw-data-display">
                    <div v-if="rawDataChunks"
                         v-for="(chunk, index) in rawDataChunks"
                         :key="index"
                         class="hex-chunk"
                         :class="{ 'selected': index >= startIndex && index < endIndex }"> {{ chunk }} </div>
                    <div v-else> No Parameter Found </div>
                  </div>
                </div>
              </div>
            </el-col>
          </el-row>
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
                :disabled="isStop"
                @click="stopTimestamp()">STOP VIEW</button>
        <button class="footer-btn"
                :disabled="!isStop"
                @click="startRefresh()">START TEST</button>
      </div>
    </el-footer>
  </div>
</template>
<script>
import { printPage } from '@/utils/utils'
import { getRawInTime } from '@/services/conditionMonitoring/parameterDisplay/index.js';

export default {
  name: "ParamSelect",
  data() {
    return {
      parameterSelected: 1,
      testData: [
        {
          id: 0,
          name: 'Parameter Query',
          value: 1
        },
        {
          id: 1,
          name: 'Field Query',
          value: 2
        }
      ],
      sourcePortKey: '',
      desPortKey: '',
      byteOffsetKey: '',
      lengthKey: '',
      keyFieldKey: '',
      rawDatas: [],
      rawDatas: [],
      selectedRawData: null,
      startIndex: '',
      endIndex: '',
      isStop: false,
      refreshInterval: null
    };
  },
  methods: {
    addParamToStart(ele) {
      this.selectedRawData = ele
      this.byteOffsetKey = ''
      this.lengthKey = ''
    },
    clearTimestamp() {
      this.rawDatas = []
    },
    stopTimestamp() {
      this.isStop = true
      clearInterval(this.refreshInterval)
    },
    fetchData() {
      getRawInTime().then(response => {
        if (this.rawDatas.length == 0) {
          response.forEach(ele => {
            this.rawDatas.push(
              {
                idx: ele.idx,
                timestamp: ele.timestamp,
                source_port: ele.source_port,
                destination_port: ele.destination_port,
                ds_number: ele.ds_number,
                raw_data: ele.raw_data,
              }
            )
          })
        }

        if (response.length > 0 & this.rawDatas.length > 0) {
          if (response[0].idx != this.rawDatas[0].idx) {
            console.log("data flushing")
            // 只有当idx更新时，才会刷新this.rawDatas
            this.rawDatas = []
            response.forEach(ele => {
              this.rawDatas.push({
                idx: ele.idx,
                timestamp: ele.timestamp,
                source_port: ele.source_port,
                destination_port: ele.destination_port,
                ds_number: ele.ds_number,
                raw_data: ele.raw_data,
              })
            })
          }
        }
      }).catch(error => {
        console.error('Error in fetching parameter list:', error);
      });
    },
    startRefresh() {
      this.isStop = false
      this.refreshInterval = setInterval(() => {
        this.fetchData()
      }, 1000)
    },
    clearFilter() {
      this.sourcePortKey = ''
      this.desPortKey = ''
      this.byteOffsetKey = ''
      this.lengthKey = ''
      this.keyFieldKey = ''
    },
    printPage
  },
  mounted() {
    this.startRefresh()
  },
  computed: {
    curRawDatas() {
      if (this.sourcePortKey === '' && this.desPortKey === '') {
        // 如果都为空，则返回全部数据
        return this.rawDatas.filter(data => {
          return data.raw_data.includes(this.keyFieldKey);
        });
      } else if (!this.sourcePortKey && this.desPortKey) {
        // 如果sourcePortKey为空，则返回desPortKey筛选后的数据
        return this.rawDatas.filter(data => {
          return data.destination_port.includes(this.desPortKey) && data.raw_data.includes(this.keyFieldKey);
        });
      } else if (this.sourcePortKey && !this.desPortKey) {
        // 如果desPortKey为空，则返回sourcePortKey筛选后的数据
        return this.rawDatas.filter(data => {
          return data.source_port.includes(this.sourcePortKey) && data.raw_data.includes(this.keyFieldKey);
        });
      } else {
        // 如果都不为空，则返回sourcePortKey和desPortKey联合筛选后的数据
        return this.rawDatas.filter(data => {
          const sourcePortMatch = data.source_port.includes(this.sourcePortKey);
          const desPortMatch = data.destination_port.includes(this.desPortKey);
          const keyFieldMatch = data.raw_data.includes(this.keyFieldKey);

          return sourcePortMatch && desPortMatch && keyFieldMatch;
        });
      }
    },
    rawDataChunks() {
      if (isNaN(this.byteOffsetKey) || isNaN(this.lengthKey)) {
        // 如果输入的byteOffsetKey和lengthKey参数不是数据
        this.$message("Please enter valid numerical values for Byte Offset and Length.");
        this.byteOffsetKey = ''
        this.lengthKey = ''
      }
      if (this.selectedRawData && this.byteOffsetKey && !this.lengthKey) {
        // 如果仅输入了byteOffsetKey
        this.endIndex = parseInt(this.selectedRawData.raw_data.length * 1)
      } else {
        this.endIndex = parseInt(this.byteOffsetKey * 1 + this.lengthKey * 1)
      }
      this.startIndex = parseInt(this.byteOffsetKey * 1)

      // 将字符串每2个字符分开
      if (this.selectedRawData) {
        return this.selectedRawData.raw_data.match(/.{1,2}/g) || [];
      } else {
        return null
      }
    },
  },
  beforeDestroy() {
    clearInterval(this.refreshInterval)
  },
}
</script>
<style scoped>
.controller {
  margin-top: -6.5%;
  margin-left: 30%;
  position: absolute;
  width: 10%;
}

.search-input {
  background-color: black;
  color: white;
  margin-left: 2vh;
  height: 5vh;
  width: 15vh
}

.input-row {
  display: flex;
  align-items: center;
  margin-bottom: 2vh;
  margin-top: 3vh;
  margin-left: 1vh;
  margin-right: 1vh;
}

.label {
  width: 50vh;
  margin-right: 2vh;
}

input {
  flex: 1;
}

.param-wrapper {
  margin: 2vh;
  transition: background-color 0.3s;
}

.param-wrapper:hover {
  border: 1px solid #006EAA;
}

.selected {
  background-color: rgb(108, 111, 112);
}

.raw-data-display {
  display: flex;
  flex-wrap: wrap;
  margin: 2vh;
}

.hex-chunk {
  padding: 5px;
  margin-top: 1vh;
  width: 5vh;
  transition: background-color 0.3s;
}

.hex-chunk:hover {
  background-color: rgb(108, 111, 112);
}
</style>
