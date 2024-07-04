<template>
  <div>
    <el-header style="height: 9vh;">
      <el-row style="width: 100%">
        <el-col :span="21">
          <div class="el-header-title"> Load Status: Data Load in Progress </div>
        </el-col>
        <el-col :span="3">
          <Clock />
        </el-col>
      </el-row>
    </el-header>
    <el-main>
      <el-row style=" border:  0.5px solid rgb(111, 111, 111);">
        <el-table style="width: 100%;background-color: rgb(46, 45, 45)"
                  :data="pageData.part_data_log_output"
                  :header-cell-style="{
          background: '#404040',
          color: '#FFFFFF',
          font: '14px'
        }"
                  height="65vh"
                  :empty-text="'NO DATA DISPLAY'"
                  row-key="index"
                  :tree-props="{ children: 'children', hasChildren: 'hasChildren' }"
                  v-loading="loading"
                  element-loading-text="Data Loading..."
                  element-loading-spinner="el-icon-loading"
                  element-loading-background="rgba(0, 0, 0, 0.5)">
          <el-table-column :width="null"
                           :min-width="2"></el-table-column>
          <el-table-column prop="equipment.name"
                           :width="null"
                           :min-width="20">
            <template slot="header"
                      slot-scope="scope">Equipment Name <el-input
                        style="margin-left: 2vh; margin-right: 1vh; width: 15vh;"
                        v-model="searchEquipmentContent"
                        placeholder="Enter key word here"
                        size="mini"
                        clearable />
              <i class="el-icon-search"></i>
            </template>
          </el-table-column>
          <el-table-column prop="part.id"
                           :width="null"
                           :min-width="15">
            <template slot="header"
                      slot-scope="scope">PNN<el-input style="margin-left: 2vh; margin-right: 1vh; width: 12vh;"
                        v-model="searchPNNContent"
                        placeholder="Enter key word here"
                        size="mini"
                        clearable />
              <i class="el-icon-search"></i>
            </template>
          </el-table-column>
          <el-table-column prop="start_time"
                           label="Start Time "
                           sortable
                           :width="null"
                           :min-width="15">
            <template slot-scope="scope">
              <div class="flex gap-3"> {{ scope.row.start_time.substring(0, 19) }}</div>
            </template>
          </el-table-column>
          <el-table-column prop="elapsed_time"
                           label="Elapsed Time "
                           sortable
                           :width="null"
                           :min-width="10">
          </el-table-column>
          <el-table-column prop="load_status"
                           label="Load Status"
                           sortable
                           :width="null"
                           :min-width="10">
          </el-table-column>
          <el-table-column prop="load_status"
                           label="Load Status"
                           sortable
                           :width="null"
                           :min-width="10">
            <template slot-scope="scope">
              <div v-if="scope.row.load_status === 'Completed'">
                <el-button class="confirm-btn"
                           type="primary"
                           @click="goConfirmPage()">Confirm</el-button>
              </div>
              <div v-else-if="scope.row.load_status === 'Failed' || scope.row.load_status === 'Confirmed'">
                <el-button type="text"
                           @click="viewDetails(scope.row)">View Details</el-button>
              </div>
              <div v-else>
                <el-progress :percentage="scope.row.load_progress"
                             :color="getProgressColor(scope.row.load_progress)"
                             :format="load_progress => `${load_progress}%`"
                             :stroke-width="10"
                             text-color="#ffffff"
                             define-back-color="#505050"
                             stroke-linecap="square"></el-progress>
              </div>
            </template>
          </el-table-column>
          <el-table-column :width="null"
                           :min-width="2"></el-table-column>
        </el-table>
        <div class="
                table-lower-bar">
          <span class="table-lower-bar-right-text">Number of Tests: {{ currentPageData.length }}</span>
        </div>
      </el-row>
    </el-main>
    <el-footer>
      <div>
        <button @click="printPage()"
                class="footer-btn">PRINT</button>
      </div>
      <div>
        <button class="footer-btn"
                @click="sendAbort">ABORT LOAD</button>
        <button class="footer-btn"
                @click="sendAbortAll">ABORT ALL</button>
        <button class="footer-btn"
                @click="goNewLoadPage">NEW LOAD</button>
      </div>
    </el-footer>
  </div>
</template>
<script lang="ts">
import { PageData, formatDateString } from './store';
import { customSortMethodForProgressColumn, printPage, handleTestOrder } from '@/utils/utils'
import Clock from '@/components/Clock/index.vue'
import qs from 'qs'

export default {
  name: 'LoadStatus',
  components: {
    Clock
  },
  mixins: [],
  props: {

  },
  data() {
    return {
      searchEquipmentContent: '',
      searchPNNContent: '',
      pageData: new PageData(),
      timer: null,
      loading: true
    }
  },
  computed: {
    currentPageData() {
      console.log(this.pageData.part_data_log_output)
      this.parameterCountTotal = this.pageData.part_data_log_output.filter((item) => {
        const equipmentNameMatch = item.equipment.name.toLowerCase().includes(this.searchEquipmentContent.toLowerCase());
        const partIdMatch = item.part.id.toLowerCase().includes(this.searchPNNContent.toLowerCase());
        // Return true if either equipment name or part id matches the search content
        return equipmentNameMatch || partIdMatch;
      }).length

      return this.pageData.part_data_log_output.filter((item) => {
        const equipmentNameMatch = item.equipment.name.toLowerCase().includes(this.searchEquipmentContent.toLowerCase());
        const partIdMatch = item.part.id.toLowerCase().includes(this.searchPNNContent.toLowerCase());
        // Return true if either equipment name or part id matches the search content
        return equipmentNameMatch || partIdMatch;
      })
    },
  },
  watch: {

  },
  mounted() {
    setTimeout(() => {
      this.loading = false;
    }, 1000);
    this.timer = setInterval(() => {
      this.pageData.get_log_list({
        equipment_name: this.searchEquipmentContent,
        pnn_id: this.searchPNNContent
      })
    }, 1000)
  },
  beforeDestroy() {
    clearInterval(this.timer)
  },
  methods: {
    goto(name: string) {
      this.$router.push({ name: name })
    },
    formatDateString,
    searchEquipment() {
      this.pageData.search_equipment(this.searchEquipmentContent)
    },
    searchPart() {
      this.pageData.search_part(this.searchPNNContent)
    },
    goNewLoadPage() {
      this.$router.push({ name: "ATAandEquipmentSelection" });
    },
    goConfirmPage() {
      this.$router.push({ name: "ConfirmPage" });

    },
    goFailDetailPage() {
      this.$router.push({ name: "FailDetail" });
    },
    /**
 * 本函数用于向成员系统发送中止选中的测试的命令
 */
    sendAbort() {
      let tmp = qs.stringify({
        OrderType: "ABORT",

        currentPage: "LoadStatus",
        InitiatedTest_Index: "null",
        MemberSystemID: "",

        currentScreenId: "",
        selectedOption: "",
      });

      this.handleTestOrder(tmp)
    },

    /**
     * 本函数用于向成员系统发送全部中止的命令
     */
    sendAbortAll() {
      let tmp = qs.stringify({
        OrderType: "ABORTALL",

        currentPage: "LoadStatus",
        InitiatedTest_Index: "null",
        MemberSystemID: "",

        currentScreenId: "",
        selectedOption: "",
      });

      this.handleTestOrder(tmp)
    },

    /**
 * 本函数用于返回进度对应的进度条颜色
 * @param {number} progress - 进度值
 * @returns {number} 该进度值对应的颜色rgb值
 */
    getProgressColor(progress) {
      // if (progress < 100){
      //   return '#51cef1';
      // } else {
      //   return '#66CC99';
      // }
      return '#2a7c95';
    },
    customSortMethodForProgressColumn,
    printPage,
    handleTestOrder
  }
};
</script>
<style lang="scss"
       scoped>

      .confirm-btn {
        @apply flex items-center justify-center hover:cursor-pointer;
        width: 12vh;
        height: 3vh;
        color: white;
        font-size: 16px;
        font-weight: bold;
        padding: 1vh;
        border-radius: 3px;
        border: 1px solid rgb(111, 111, 111);
        box-shadow: 5px 5px 5px 0px rgba(42, 42, 42, 0.5);
        background-color: rgb(65, 65, 65);
        transition: box-shadow 0.3s ease background-color 0.3s ease;
      }

      .confirm-btn:hover {
        box-shadow: 2px 2px 10px 0px #2a7c95;
        border: 1px solid rgb(111, 111, 111);
        background-color: rgb(88, 88, 88);
      }
    </style>
