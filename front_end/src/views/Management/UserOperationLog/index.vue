<template>
  <div style="background-color: rgb(45, 45, 45);">
    <el-header style="height: 9vh;">
      <el-row style="width: 100%">
        <el-col :span="3">
          <div class="el-header-title"> Select Option </div>
        </el-col>
        <el-col :span="18">
          <div class="el-header-radios">
            <div class="radio"
                 @click="changeRadio('operationLog')">
              <input name="user-operation-log-radio"
                     type="radio"
                     :checked="displaySelected == 'operationLog'" />
              <label class="form-check-label">Operation Log</label>
            </div>
            <div class="radio"
                 @click="changeRadio('printRecord')">
              <input name="user-operation-log-radio"
                     type="radio"
                     :checked="displaySelected == 'printRecord'" />
              <label class="form-check-label">Print Record</label>
            </div>
          </div>
        </el-col>
        <el-col :span="3">
          <Clock />
        </el-col>
      </el-row>
    </el-header>
    <OperationLog v-if="displaySelected == 'operationLog'"></OperationLog>
    <PrintRecord v-if="displaySelected == 'printRecord'"></PrintRecord>
    <el-footer>
      <div>
        <button class="footer-btn"
                @click="printPage">PRINT</button>
      </div>
      <div>
      </div>
    </el-footer>
  </div>
</template>
<script lang="ts">
import OperationLog from './operationLog.vue'
import PrintRecord from './printRecord.vue'
import { changeRadio, printPage } from '@/utils/utils'
import Clock from '@/components/Clock/index.vue'

export default {
  name: "UserOperationLog",
  components: {
    OperationLog,
    PrintRecord,
    Clock
  },
  data() {
    return {
      displaySelected: 'operationLog',
    }
  },
  methods: {
    changeRadio,
    printPage
  },
  created() {
  },
}
</script>
<style scoped></style>
