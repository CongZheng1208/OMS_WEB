<template>
  <div class="bg-[#333333]">
    <Selection />
    <div v-for="item, idx in pageData.rows"
         class="border mx6 mb3">
      <div class="px-6 py-4 fontbold text-lg ">
        <span>ATA:<span class="text-red">{{ item.ATA.name }}</span></span>
        <span class="pl12">Equipment:<span class="text-red">{{ item.Equipment.name }}</span></span>
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
          <div>Software Part Number{{ item.Part.id }}: <span class="text-red">{{ item.Part.id }}</span></div>
        </div>
      </div>
    </div>
    <el-footer>
      <div>
        <button class="footer-btn">PRINT</button>
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
import { PageData, RowClass } from './store'

export default {
  components: {
    Selection
  },
  mixins: [],
  props: {

  },
  data() {
    return {
      dataloadList: JSON.parse(this.$route.query.dataload_list as string),
      pageData: new PageData()
    }
  },
  computed: {

  },
  watch: {

  },
  async mounted() {
    await this.get_data_list()
  },
  methods: {
    async get_data_list() {
      const res = (await http({
        url: '/get-dataload-list-info',
        method: 'post',
        data: JSON.stringify(
          this.dataloadList
        )
      })) as MyResponse<RowClass[]>
      if (res.code === 200) {
        this.pageData.rows = res.result
      }
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
        headers: {
          'Content-Type': 'application/json'
        }
      })) as MyResponse<undefined>
      if (res.code === 200) {
        this.$message({
          message: 'Loading Start',
          type: 'success'
        })
        this.goto('LoadStatus')
      }
    }
  }
};
</script>
