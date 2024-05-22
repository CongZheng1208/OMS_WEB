<template>
  <div style="height: 20vh">
    <el-row>
      <div style="float: left">
        <div v-for="item in selectedData"
             :key="item.id">
          <div v-for="(list, index) in item.fault_name"
               :key="index">
            <br />
            <div style="text-align: left; margin-left: 15px"> {{ list }} </div>
          </div>
        </div>
        <div class="table-outer-button">
          <button class="footer-btn"
                  @click="isAddNotesSelected = true">Add Notes</button>
        </div>
      </div>
    </el-row>
  </div>
</template>
<script>
import qs from 'qs'
import { addNote, postNote } from '@/services/centralMaintenance/failureReport';

export default {
  name: "Notes",
  data() {
    return {
      selectedData: [],
      isAddNotesSelected: false
    };
  },
  methods: {
    /**
     * 本函数用于mounted中，获取state中所选行的selectedFailureId数据，并生parameterTable
     * 将原始数据转化为前端table所需要的array：parameterTable[]
     */
    getRootCauseData() {
      // this.selectedData = [];

      let tmp = qs.stringify({
        failureNameInfo: this.$store.state.failureList.selectedFailureId
      });

      postNote(tmp).then(response => {
        this.selectedData = response.failureNote
      }).catch(error => {
        console.error('Error in fetching parameter list:', error);
      });

      console.log("this.selectedData:", this.selectedData);
    },
  },

  mounted() {
    this.getRootCauseData();


    // 监听selectedFailureId变化，当变化时重新调用getParameterData函数
    this.$watch('$store.state.failureList.selectedFailureId', (newVal, oldVal) => {
      if (newVal !== oldVal) {
        this.getRootCauseData();
      }
    });
  },
};
</script>
<style scoped></style>
