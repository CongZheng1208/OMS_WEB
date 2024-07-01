<template>
  <el-dialog style="font-size: 15px; color: white; back"
             :visible.sync="isFlightLegsSelected"
             :show-close=false
             :close-on-click-modal=false
             width="70%">
    <el-row style=" margin-left: 15px; margin-right: 15px;  background-color: '#f1f1f1'">
      <el-table style="
              width: 100%;
              background-color:  #ffffff;
              margin-top: 1vh;
              margin-bottom: 1vh;
              border:  0.5px solid rgb(111, 111, 111);
            "
                :header-cell-style="{
              background: '#ffffff',
              color: '#010101',
              font: '14px'
            }"
                :empty-text="'NO DATA DISPLAY'">
        <el-table-column :width="null"
                         :min-width="10"></el-table-column>
        <el-table-column prop=""
                         label="Flight Leg"
                         :width="null"
                         :min-width="30"></el-table-column>
        <el-table-column prop=""
                         label="Flight Number Leg"
                         :width="null"
                         :min-width="55"></el-table-column>
        <el-table-column prop=""
                         label="Start Time"
                         :width="null"
                         :min-width="55"></el-table-column>
        <el-table-column prop=""
                         label="Origin"
                         :width="null"
                         :min-width="55"></el-table-column>
        <el-table-column prop=""
                         label="Destination"
                         :width="null"
                         :min-width="55"></el-table-column>
        <el-table-column :width="null"
                         :min-width="10"></el-table-column>
      </el-table>
    </el-row>
    <span slot="footer"
          class="dialog-footer">
      <el-button type="primary"
                 @click="onClose">Back</el-button>
    </span>
  </el-dialog>
</template>
<script lang="ts">
export default {
  data() {
    return {
      isFlightLegsSelected: true,
    }
  },

  created() {
  },
  methods: {
    onClose() {
      this.$emit('close')
    },
    onConfirm() {
      this.$emit('ok')
    }

  }
};
</script>
