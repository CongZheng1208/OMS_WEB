<template>
  <div>
    <el-header style="height: 8vh;">
      <el-row style="width: 100%">
        <el-col :span="21">
          <div class="el-header-title"> Check Load Condition </div>
        </el-col>
        <el-col :span="3">
          <Clock />
        </el-col>
      </el-row>
    </el-header>
    <el-main>
      <div class="total-container">
        <div class="sub-container"
             v-for="item, idx in dataloadRes">
          <div class="px-6 py-4 fontbold text-lg ">
            <span>ATA:<span>{{ ATAlist.find(v => v.key === item.equipment.ATA_id.substring(0, 2)).value }}</span></span>
            <span class="pl12">Equipment:<span>{{ item.equipment.name }}</span></span>
            <div class="">
              <div>
                <span class="w-200 inline-block">Serial Number:940405327</span>
                <span>Load Condition:</span>
              </div>
              <div>
                <span class="w-200 inline-block">Configuration Report to Update</span>
                <span>{{ item.equipment.condition_text }}</span>
              </div>
              <div v-for="item2 in item.part_list">Software Part Number: <span
                      class="text-red">{{ item2.id }}</span></span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </el-main>
    <el-footer>
      <div>
        <button @click="printPage()"
                class="footer-btn">PRINT</button>
      </div>
      <div class="flex gap3">
        <button @click="goback()"
                class="footer-btn">BACK</button>
        <button @click="beginLoad()"
                class="footer-btn">START LOAD </button>
      </div>
    </el-footer>
  </div>
</template>
<script lang="ts">
import { http } from '@/utils/http';
import Selection from './select-bar.vue';
import { MyResponse } from '@/utils/store/response';
import { customSortMethodForProgressColumn, printPage } from '@/utils/utils'
import { EquipmentWithParts } from './store'
import { ATAlist } from '../store';
import Clock from '@/components/Clock/index.vue'

export default {
  components: {
    Clock
  },
  mixins: [],
  props: {

  },
  data() {
    return {
      ATAlist,
      dataloadList: JSON.parse(this.$route.query.dataload_list as string),
      dataloadRes: [] as EquipmentWithParts[]
    }
  },
  computed: {

  },
  watch: {

  },
  async mounted() {
    this.dataloadRes = await this.get_data_list()
  },
  methods: {
    async get_data_list() {
      const res = (await http({
        url: '/get-dataload-list-info',
        method: 'post',
        data: JSON.stringify(
          this.dataloadList
        )
      })) as MyResponse<EquipmentWithParts[]>
      return res.result
    },
    goback() {
      this.$router.back()
    },
    goto(name: string) {
      this.$router.push({ name: name })
    },
    async beginLoad() {
      const res = (await http({
        url: '/load-equipment-part',
        method: 'post',
        data: JSON.stringify(
          this.dataloadList,
        ),
      })) as MyResponse<undefined>
      // if (res.code === 200) {
      //   this.$message({
      //     message: 'Loading Start',
      //     type: 'success'
      //   })
      this.goto('LoadStatus')
      // }
    },
    customSortMethodForProgressColumn, printPage
  }
};
</script>
