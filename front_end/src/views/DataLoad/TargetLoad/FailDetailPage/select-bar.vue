<template>
  <div class="w-full flex border-b mb-6">
    <div class="fontbold text-start flex-1 pl6 pt2 text-lg flex">
      <div class="w-1/3">
        <div>ATA:31</div>
        <div class="pt3">Equipment Name:</div>
      </div>
      <div class="w-1/3">
        <div>PNN: <span class="pl3">CMC11-1061-0001</span></div>
        <div class="pt3">LoadStatus:<span class="text-red-500 pl3">Failed</span></div>
      </div>
      <div class="w-1/3">
        <div>Elapsed Time: <span class="pl3"></span></div>
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
      displaySelected: 'ATAandEquipmentSelection',
    }
  },
  methods: {
    changeRadio(router_name: string) {
      this.displaySelected = router_name
      this.$router.push({ name: router_name })
    },
  }
}</script>
<style lang="scss" scoped>
.uni-button {
  @apply flex items-center justify-center text-white;
  width: 12vh;
  height: 3.5vh;
  font-size: 16px;
  font-weight: bold;
  padding: 1vh;
  border-radius: 3px;
  border: 1px solid rgb(111, 111, 111);
  box-shadow: 5px 5px 5px 0px rgba(42, 42, 42, 0.5);
  background-color: rgb(65, 65, 65);
  transition: box-shadow 0.3s ease background-color 0.3s ease;
}
</style>
