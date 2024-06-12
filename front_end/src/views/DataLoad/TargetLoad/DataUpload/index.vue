<template>
  <div>
    <Selection />
    <div class="border mx6">
      <div class="px-6 py-4 fontbold text-lg ">
        <span>ATA:31</span>
        <span class="pl12">Equipment:IDU_CENTER</span>
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
          <div>Software Part Number2: XXXXXX</div>
          <div>Software Part Number1: XXXXXX</div>
          <div>Software Part Number1: XXXXX</div>
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
        <button @click="goto('LoadStatus')"
                class="footer-btn">START LOAD </button>
      </div>
    </el-footer>
  </div>
</template>
<script lang="ts">
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
