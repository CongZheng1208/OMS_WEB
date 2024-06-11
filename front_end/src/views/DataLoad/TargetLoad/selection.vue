<template>
  <div class="w-full flex">
    <div class="fontbold w-40 pl6 pt3 text-lg"> Section Option </div>
    <div class="flex-1">
      <div class="flex gap4">
        <div>
          <div @click="changeRadio('ATAandEquipmentSelection')"
               class="radio ">
            <input name="param-display-radio1"
                   type="radio"
                   :checked="displaySelected == 'list'" />
            <label class="cursor-pointer">ATA and Equipment Selection</label>
          </div>
          <div @click="changeRadio('PartNumberSelection')"
               class="radio">
            <input name="param-display-radio2"
                   type="radio"
                   :checked="displaySelected == 'PartNumberSelection'" />
            <label class="cursor-pointer">Part Number Selection</label>
          </div>
        </div>
        <div>
          <div
          @click="changeRadio('BatchPartSelection')"
          class="radio">
            <input name="param-display-radio3"
                   type="radio"
                   :checked="displaySelected == 'BatchPartSelection'" />
            <label class="cursor-pointer">Batch Part Selection</label>
          </div>
        </div>
      </div>
    </div>
    <div class="text-xl text-end w-1/4 pt3 pr3 fontbold">
      <Clock />
    </div>
  </div>
</template>
<script lang="ts">
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
    changeRadio(router_name: string) {
      this.displaySelected = router_name
      this.$router.push({ name: router_name })
    },
  }
}</script>
<style scoped></style>
