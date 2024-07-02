<template>
  <div class="bg-[#333333]">
    <Selection />
    <div class="px-6">
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
                :tree-props="{ children: 'children', hasChildren: 'hasChildren' }">
        <el-table-column prop="equipment.name"
                         :width="null"
                         :min-width="5">
          <template slot="header"
                    slot-scope="scope">
            <div class="flex justify-between items-center">Equipment Name </div>
            <el-input style="margin-left: 2vh; margin-right: 1vh; width: 15vh;"
                      placeholder="Enter key word here"
                      v-model="searchEquipmentContent"
                      size="mini"
                      clearable />
          </template>
        </el-table-column>
        <el-table-column prop="part.id"
                         :width="null"
                         :min-width="5">
          <template slot="header"
                    slot-scope="scope">
            <div class="flex justify-between items-center">PNN </div>
            <el-input style="margin-left: 2vh; margin-right: 1vh; width: 15vh;"
                      placeholder="Enter key word here"
                      v-model="searchPNNContent"
                      size="mini"
                      clearable />
          </template>
        </el-table-column>
        <el-table-column prop="start_time"
                         label="Start Time "
                         sortable
                         :width="null"
                         :min-width="5">
          <template slot-scope="scope">
            <div class="flex gap-3"> {{ scope.row.start_time.substring(0, 19) }}</div>
          </template>
        </el-table-column>
        <el-table-column prop="elapsed_time"
                         label="Elapsed Time "
                         sortable
                         :width="null"
                         :min-width="5">
        </el-table-column>
        <el-table-column prop="load_status"
                         label="Load Status"
                         sortable
                         :width="null"
                         :min-width="5">
        </el-table-column>
        <el-table-column prop="load_progress"
                         label="Load Progress"
                         sortable
                         :width="null"
                         :min-width="5">
        </el-table-column>
      </el-table>
    </div>
    <footer
            class="fixed bottom-0 left-0 right-0 px-4 py1 flex justify-between items-center border-t  border-t-[#6F6F6F]">
      <div>
        <button class="footer-btn">PRINT</button>
      </div>
      <div class="flex gap3">
        <button @click="goback()"
                class="footer-btn">BACK</button>
      </div>
    </footer>
  </div>
</template>
<script lang="ts">
import Selection from './select-bar.vue';
import { PageData, formatDateString } from './store';

export default {
  name: 'LoadStatus',
  components: {
    Selection
  },
  mixins: [],
  props: {

  },
  data() {
    return {
      searchEquipmentContent: '',
      searchPNNContent: '',
      pageData: new PageData(),
      timer: null
    }
  },
  computed: {

  },
  watch: {

  },
  mounted() {
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
    goback() {
      this.$router.back()
    },
    goto(name: string) {
      this.$router.push({ name: name })
    },
    formatDateString,

  }
};
</script>
<style lang="scss" scoped>
table {
  @apply w-full text-lg fontbold border;
  border-collapse: collapse;
}

td,
th {
  @apply p3;
}


tr {
  border: 1px solid rgb(111, 111, 111);
}

thead {
  tr {
    @apply bg-[#404040];
  }
}

th {
  @apply text-start pl10;
}

td {
  @apply pl10;
}


.confirm-btn {
  @apply flex items-center justify-center hover:cursor-pointer;
  width: 12vh;
  height: 4vh;
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
  box-shadow: 2px 2px 10px 0px #17bef1;
  border: 1px solid rgb(111, 111, 111);
  background-color: rgb(88, 88, 88);
}
</style>
