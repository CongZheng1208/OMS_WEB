<template>
  <div class="w-full flex">
    <div class="fontbold w-40 pl6 pt3 text-lg"> Section Option </div>
    <div class="flex-1"
         @click="changeRadio('list')">
      <div class="radio">
        <input name="param-display-radio1"
               type="radio"
               :checked="displaySelected == 'list'" />
        <label>Operation Log</label>
      </div>
      <div class="radio"
           @click="changeRadio('graphic')">
        <input name="param-display-radio1"
               type="radio"
               :checked="displaySelected == 'graphic'" />
        <label>Print Record</label>
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
      displaySelected: 'list',
    }
  },
  methods: {
    changeRadio
  },
  created() {
  },
}
</script>
<style scoped></style>
