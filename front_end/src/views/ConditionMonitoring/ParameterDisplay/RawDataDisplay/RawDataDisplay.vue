<template>

  <div class="container-fluid">
    <div class="controller" >
      <select class="top-bar-btn" v-model="parameterSelected"  @change="clearFilter()">
        <option v-for="x in testData" :value="x.value" style="background-color:grey">{{x.name}}</option>
      </select>
    </div>


    <div class="row segment-bottom">
      <div class="col-3">

        <div class="row" style="padding: 4px">
          <div class="segment-title">
            Filter
          </div>
        </div>

        <div style="height: 48vh">
          <div class="input-row">
            <span class="label">Source Port</span>
            <input type="text" class="search-input" placeholder="e.g. 8080" v-model="sourcePortKey" />
          </div>
          <div class="input-row">
            <span class="label">Des Port</span>
            <input type="text" class="search-input" placeholder="e.g. 8080" v-model="desPortKey" />
          </div>

          <div v-if="parameterSelected==1">
            <div class="input-row">
              <span class="label">Byte Offset(Byte)</span>
              <input type="text" class="search-input" placeholder="e.g. 3  Unit: Byte" v-model="byteOffsetKey" />
              <!-- <span class="units">Bit</span> -->
            </div>
            <div class="input-row">
              <span class="label">Length(Byte)</span>
              <input type="text" class="search-input" placeholder="e.g. 5  Unit: Byte" v-model="lengthKey" />
            </div>
          </div>

          <div v-if="parameterSelected==2">
            <div class="input-row">
              <span class="label">Key Field</span>
              <input type="text" class="search-input" placeholder="e.g. 3C" v-model="keyFieldKey" />
            </div>
          </div>
        </div>

        <button class="page-btn" @click="clearFilter()">Clear</button>
      </div>


      <div class="col-9">

        <div class="row" style="padding: 4px">
          <div class="col-3 segment-middle">
            <div class="segment-title">Timestamp </div>
            <div>
              <vue-custom-scrollbar class="mid-table-area">
                <div class="param-wrapper" v-for="(ele, index) in curRawDatas.slice(0, 15)" :key="index"
                :class="{ 'selected': selectedRawData && selectedRawData.idx==ele.idx }"
                 @click="addParamToStart(ele)">
                  <label>{{ ele.timestamp }}</label>
                </div>
              </vue-custom-scrollbar>
            </div>
            <div class="mid-btn-group">
              <button class="page-btn"  @click="clearTimestamp()">Clear</button>
            </div>
          </div>

          <div class="col-9">
            <div class="segment-title">
               Raw Data
            </div>
            <div>
              <vue-custom-scrollbar class="mid-table-area">
                <div class="raw-data-display">

                  <div v-if="rawDataChunks" v-for="(chunk, index) in rawDataChunks" :key="index" class="hex-chunk"
                  :class="{ 'selected': index >= startIndex && index < endIndex }">
                    {{ chunk }}
                  </div>
                  <div v-if="!rawDataChunks">
                    No Parameter Found
                  </div>
                </div>
                <!-- <label v-if="selectedRawData" class="check-button">{{ selectedRawData.raw_data }}</label> -->
              </vue-custom-scrollbar>
            </div>
          </div>
        </div>

      </div>
    </div>
    <!-- 底部按钮栏 -->
    <div class="row">
      <div class="col">
        <div class="button-bar">
          <div style="float: left">
            <button class="button-bar-btn" @click="printPage">Print</button>
          </div>
          <div style="float: right">
            <button class="button-bar-btn" @click="stopTimestamp()" :disabled="isStop" :style="{'background-image': isStop ? 'linear-gradient(rgb(128, 127, 127), rgb(200, 200, 200))' : 'linear-gradient(rgb(33, 33, 33), rgb(128, 127, 127))' }">
              Stop View
            </button>
            <button class="button-bar-btn" @click="startRefresh()" :disabled="!isStop" :style="{'background-image': !isStop ? 'linear-gradient(rgb(128, 127, 127), rgb(200, 200, 200))' : 'linear-gradient(rgb(33, 33, 33), rgb(128, 127, 127))' }">
              Start View
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import axios from 'axios'
  // import {pattern, urlHeads} from '../../../config/url.js'
  // import vueCustomScrollbar from 'vue-custom-scrollbar'
  // import "vue-custom-scrollbar/dist/vueScrollbar.css"
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
    components: {
      vueCustomScrollbar
    },
    methods: {
      printPage() {
      // 调用window.print()来触发打印
        window.print();
      },
      addParamToStart(ele){
        this.selectedRawData = ele
        this.byteOffsetKey = ''
        this.lengthKey = ''
      },
      clearTimestamp(){
        this.rawDatas = []
      },
      stopTimestamp(){
        this.isStop = true
        clearInterval(this.refreshInterval)
      },
      fetchData() {
        var urlRoot1 = 'php/conditionMonitoring/paramerDisplay/getRawInTime.php';
        axios.get(urlHeads[pattern]+urlRoot1).then(
          response => {
            if(this.rawDatas.length == 0){
                response.data.forEach(ele => {
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

            if(response.data.length>0 & this.rawDatas.length>0){
              if(response.data[0].idx != this.rawDatas[0].idx){
                console.log("data flushing")
                // 只有当idx更新时，才会刷新this.rawDatas
                this.rawDatas = []
                response.data.forEach(ele => {
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
            }

          },
          error => {
            // alert('发送请求失败！', error.message)
          }
        )
      },
      startRefresh() {
        this.isStop = false
        this.refreshInterval = setInterval(() => {
          this.fetchData()
        }, 1000)
      },
      clearFilter(){
        this.sourcePortKey = ''
        this.desPortKey = ''
        this.byteOffsetKey = ''
        this.lengthKey = ''
        this.keyFieldKey = ''
      },

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
        } else if( !this.sourcePortKey && this.desPortKey ){
          // 如果sourcePortKey为空，则返回desPortKey筛选后的数据
          return this.rawDatas.filter(data => {
            return data.destination_port.includes(this.desPortKey) && data.raw_data.includes(this.keyFieldKey);
          });
        } else if( this.sourcePortKey && !this.desPortKey ){
          // 如果desPortKey为空，则返回sourcePortKey筛选后的数据
          return this.rawDatas.filter(data => {
            return data.source_port.includes(this.sourcePortKey) && data.raw_data.includes(this.keyFieldKey);
          });
        }else{
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
          alert("Please enter valid numerical values for Byte Offset and Length.");
        }
        if (this.selectedRawData && this.byteOffsetKey && !this.lengthKey) {
          // 如果仅输入了byteOffsetKey
          this.endIndex = parseInt(this.selectedRawData.raw_data.length*1)
        }else{
          this.endIndex = parseInt(this.byteOffsetKey*1 + this.lengthKey*1)
        }
        this.startIndex = parseInt(this.byteOffsetKey*1)

        // 将字符串每2个字符分开
        if(this.selectedRawData){
          return this.selectedRawData.raw_data.match(/.{1,2}/g) || [];
        }else{
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

  .mid-btn-group {
    position: relative;
    bottom: 0;
    display: inline-block;
    margin-bottom: 2rem;
    margin-left: 1vh;
  }

  .controller{
    margin-top: -6.5%;
    margin-left: 30%;
    position: absolute;
    width: 60%;
  }

  .top-bar-btn{
    background-image: linear-gradient(rgb(33, 33, 33), rgb(128, 127, 127));
    color: white;
    width: 20%;
    height: 5vh;
  }

  .page-btn {
    color: white;
    background-image: linear-gradient(rgb(33, 33, 33), rgb(128, 127, 127));
  }

  .segment-title {
    border: 1.5px solid lightgray;
    position: relative;
    text-align: center;
    font-weight: bold;
    padding-top: 0.5vh;
    padding-bottom: 0.5vh;
  }

  .button-bar-btn{
    background-image: linear-gradient(rgb(33, 33, 33), rgb(128, 127, 127));
    color: white;
    width: 22vh;
    height: 5vh;
  }

  .segment-bottom {
    /* border: 1.5px solid lightgray; */
    height: 65vh;
    /* margin-top: 8vh; */
  }

  .segment-middle {
    border: 1.5px solid lightgray;
    border-top: none;
    border-bottom: none;
    height: 64vh;
  }

  .search-input {
    background-color: black;
    color: white;
    margin-left: 2vh;
    height: 5vh;
    width: 15vh
  }
  .button-bar {
    margin-top: 0.5rem;
  }

.input-row {
  display: flex;
  align-items: center;
  margin-bottom: 2vh;
  margin-top: 3vh;
  margin-left: 1vh;
  margin-right: 1vh;
}
.mid-table-area{
  position: relative;
  margin: auto;
  width: auto;
  height: 52vh;
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
  background-color: rgb(70, 72, 73);
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
  background-color:rgb(70, 72, 73);
}
</style>

