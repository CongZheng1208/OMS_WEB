<template>
  <div>
    <Selection />
    <div class="border mx6">
      <div class="px-6 py-4 fontbold text-lg ">
        <span>ATA:<span class="text-red">{{ ATA.name }}</span></span>
        <span class="pl12">Equipment:<span class="text-red">{{ equipment.name }}</span></span>
        <div class="">
          <!-- <Load Condition Text> -->
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
          <div v-for="item, idx in partlist">Software Part Number{{ idx + 1 }}: <span
                  class="text-red">{{ item.id }}</span></div>
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

export default {
  name: 'DataUpload',
  components: {
    Selection
  },
  mixins: [],
  props: {

  },
  data() {
    return {
      ATA: JSON.parse(this.$route.params.ATA),
      equipment: JSON.parse(this.$route.params.equipment),
      partlist: JSON.parse(this.$route.params.partlist),
      type: this.$route.params.type
    }
  },
  computed: {

  },
  watch: {

  },
  mounted() {
    if (this.type === 'equipment_partlist') {
    } else {
    }
  },
  methods: {
    goback() {
      this.$router.back()
    },
    goto(name: string) {
      this.$router.push({ name: name })
    },
    async beginLoad() {
      if (this.type === 'equipment_partlist') {
        const res = await http({
          url: '/load-ATA-equipment',
          method: 'post',
          data: JSON.stringify({
            equipment_id: this.equipment.id,
            partlist_id: this.partlist.map(item => item.id)
          })
        })
        if (res.code === 200) {
          this.$message({
            message: 'Loading Start',
            type: 'success'
          })
          this.goto('LoadStatus')
        }
      }
    }
  }
};
</script>
