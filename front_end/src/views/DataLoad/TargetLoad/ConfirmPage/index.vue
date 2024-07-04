<template>
  <div>
    <el-header style="height: 10vh;">
      <el-row style="width: 100%; margin-top: 1vh;">
        <el-col :span="7">
          <div class="el-header-subcontainer">
            <span class="el-header-dot"></span> ATA: {{ }}
          </div>
          <div class="el-header-subcontainer">
            <span class="el-header-dot"></span> Equipment Name: {{ }}
          </div>
        </el-col>
        <el-col :span="7">
          <div class="el-header-subcontainer">
            <span class="el-header-dot"></span> PNN: {{ }}
          </div>
          <div class="el-header-subcontainer">
            <span class="el-header-dot"></span> Load Status: {{ "Complete" }}
          </div>
        </el-col>
        <el-col :span="7">
          <div class="el-header-subcontainer">
            <span class="el-header-dot"></span> Elapsed Time:{{ }}
          </div>
        </el-col>
        <el-col :span="3">
          <Clock />
        </el-col>
      </el-row>
    </el-header>
    <el-main style="padding:2vh">
      <div class="custom-card"
           shadow="hover"
           style="height: 70vh">
        <div class="custom-header">DETAILS</div>
        <div class="custom-content">
          <el-row style="width: 100%;">
            <div class="px-6 py-4 fontbold text-lg ">
              <div>The Data Load is Complete.</div>
              <div class="pt-10">Failed text2:</div>
              <div>Updated Configuration is shown below:</div>
              <div>Hardware Part Number: <span class="pl3">XXXX</span></div>
              <div>Serial Number: <span class="pl3">940405327</span></div>
              <div>Software Part Number1: <span class="pl3 text-red">XXXX</span></div>
              <div>Software Part Number2: <span class="pl3">XXXXX</span></div>
            </div>
            <!-- <div class="px-6 py-4 fontbold text-lg ">
              <div>Failed Text 1;</div>
              <div>Failed Text 2;</div>
            </div> -->
          </el-row>
        </div>
      </div>
    </el-main>
    <el-footer>
      <div>
        <button @click="printPage()"
                class="footer-btn">PRINT</button>
      </div>
      <div class="flex gap3">
        <button class="footer-btn">CONFIRM</button>
        <button @click="goback()"
                class="footer-btn">BACK</button>
      </div>
    </el-footer>
  </div>
</template>
<script lang="ts">
import Clock from '@/components/Clock/index.vue'
import { printPage } from '@/utils/utils'

export default {
  components: {
    Clock
  },
  mixins: [],
  props: {

  },
  data() {
    return {

    }
  },
  computed: {

  },
  watch: {

  },
  mounted() {

  },
  methods: {
    goback() {
      this.$router.back()
    },
    goto(name: string) {
      this.$router.push({ name: name })
    },
    printPage
  }
};
</script>
