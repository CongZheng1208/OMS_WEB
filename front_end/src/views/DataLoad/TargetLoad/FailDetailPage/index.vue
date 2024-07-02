<template>
  <div>
    <Selection />
    <span class="px-6 py-4 fontbold text-lg ">Details</span>
    <div class="border mx6">
      <div class="px-6 py-4 fontbold text-lg h100">
        <div class="pt20">
          <div>Failed text1:</div>
          <div>Failed text2:</div>
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
