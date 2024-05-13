<template>
  <div class="w-full flex">
    <div class="fontbold w-40 pl6 pt3 text-lg"> Section Option </div>
    <div class="flex">
      <div class="">
        <div class="radio"
             @click="goto('fileImport')">
          <input name="param-display-radio1"
                 type="radio"
                 :checked="displaySelected == 'fileImport'" />
          <label>File Import</label>
        </div>
        <div class="radio"
             @click="goto('avaliableFLS')">
          <input name="param-display-radio1"
                 type="radio"
                 :checked="displaySelected == 'avaliableFLS'" />
          <label>Avaliable FLS</label>
        </div>
      </div>
    </div>
    <div class="flex-1 items-end pl20">
      <div class="radio mt11"
           @click="goto('raw')">
        <input name="maintenance"
               type="radio"
               :checked="true" />
        <label>Maintenance Data</label>
      </div>
    </div>
    <div class="text-xl text-end w-1/4 pt3 pr3 fontbold">
      <Clock />
    </div>
  </div>
</template>
<script lang="ts">
import { changeRadio } from '@/utils/utils'
import Clock from '@/components/Clock/index.vue'

export default {
  name: "ParamSelect",
  components: {
    Clock
  },
  data() {
    return {
      displaySelected: 'fileImport',
    }
  },
  methods: {
    changeRadio,
    goto(name: string) {
      this.$router.push({ name: name })
    }
  },
  created() {
  },
}
</script>
<style scoped></style>
