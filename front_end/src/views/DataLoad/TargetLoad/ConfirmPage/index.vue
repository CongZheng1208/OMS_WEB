<template>
  <div>
    <Selection />
    <span class="px-6 py-4 fontbold text-lg ">Details:</span>
    <div class="border mx6">
      <div class="px-6 py-4 fontbold text-lg h100">
        <div class="pt20">
          <div>The Data Load is Complete.</div>
          <div class="pt-10">Failed text2:</div>
          <div>Updated Configuration is shown below:</div>
          <div>Hardware Part Number: <span class="pl3">XXXX</span></div>
          <div>Serial Number: <span class="pl3">940405327</span></div>
          <div>Software Part Number1: <span class="pl3 text-red">XXXX</span></div>
          <div>Software Part Number2: <span class="pl3">XXXXX</span></div>
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
      </div>
    </el-footer>
  </div>
</template>
<script lang="ts">
import Selection from './select-bar.vue';

export default {
  components: {
    Selection
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
    }
  }
};
</script>
