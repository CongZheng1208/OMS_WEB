<template>
  <div class="bg-[#333333]">
    <Selection />
    <div v-for="item, idx in dataloadRes"
         class="border mx6 mb3">
      <div class="px-6 py-4 fontbold text-lg ">
        <span>ATA:<span
                class="text-red">{{ ATAlist.find(v => v.key === item.equipment.ATA_id.substring(0, 2)).value }}</span></span>
        <span class="pl12">Equipment:<span class="text-red">{{ item.equipment.name }}</span></span>
        <div class="">
          <div>
            <span class="w-200 inline-block">Configuration Report to Update</span>
            <span>&lt;Load Condition Text&gt;</span>
          </div>
          <div>
            <span class="w-200 inline-block">Hardware Part Number: XXXXXX</span>
            <span>&lt;The Aircraft shall........................&gt;</span>
          </div>
          <div>
            <span class="w-200 inline-block">Serial Number:940405327</span>
            <span>&lt;Load Condition text&gt;</span>
          </div>
          <div v-for="item2 in item.part_list">Software Part Number{{ item2.id }}: <span
                  class="text-red">{{ item2.description }}</span></div>
        </div>
      </div>
    </div>
    <footer
            class="fixed bottom-0 left-0 right-0 px-4 py1 flex justify-between items-center border-t  border-t-[#6F6F6F]">
      <div>
        <button class="footer-btn">PRINT</button>
      </div>
      <div class="flex gap3">
        <button @click="goback()"
                class="footer-btn">BACK</button>
        <button @click="beginLoad()"
                class="footer-btn">START LOAD </button>
      </div>
    </footer>
  </div>
</template>
<script lang="ts">
import { http } from '@/utils/http';
import Selection from './select-bar.vue';
import { MyResponse } from '@/utils/store/response';
import { EquipmentWithParts } from './store'
import { ATAlist } from '../store';

export default {
  components: {
    Selection
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
    // console.log('[ this.dataloadList ] >', this.dataloadList)
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
      console.log('[ this.$router ] >', this.$router)
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
      //   this.goto('LoadStatus')
      // }
    }
  }
};
</script>
