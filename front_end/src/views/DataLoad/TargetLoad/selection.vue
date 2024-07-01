<template>
  <div>
    <div v-if="showMenu"
         class="w-full flex border-b mb1 border-b-[#6F6F6F]">
      <div class="fontbold w-40 pl6 pt3 text-lg"> Section Option </div>
      <div class="flex-1">
        <div class="flex gap4">
          <div>
            <div @click="changeRadio('ATAandEquipmentSelection')"
                 class="radio ">
              <input name="param-display-radio"
                     type="radio"
                     :checked="selectedOption == 'ATAandEquipmentSelection'" />
              <label class="cursor-pointer">ATA and Equipment Selection</label>
            </div>
            <div @click="changeRadio('PartNumberSelection')"
                 class="radio">
              <input name="param-display-radio"
                     type="radio"
                     :checked="selectedOption == 'PartNumberSelection'" />
              <label class="cursor-pointer">Part Number Selection</label>
            </div>
          </div>
          <div>
            <div @click="changeRadio('BatchPartSelection')"
                 class="radio">
              <input name="param-display-radio"
                     type="radio"
                     :checked="selectedOption == 'BatchPartSelection'" />
              <label class="cursor-pointer">Batch Part Selection</label>
            </div>
          </div>
        </div>
      </div>
      <div v-if="displaySelected == 'PartNumberSelection'"
           class="w-1/4 flex justify-end">
        <div class="pt">
          <div class="fontbold text-start">Part Number Filter: </div>
          <div><input class="w-40 p-1 mr10"
                   type="text" /></div>
        </div>
        <div>
          <div>
            <button class="uni-button mb2 cursor-pointer text-white">Search</button>
          </div>
          <div>
            <button class="uni-button cursor-pointer text-white">Clear</button>
          </div>
          <div></div>
        </div>
      </div>
      <div class="text-xl text-end w-1/4 pt3 pr3 fontbold">
        <Clock />
      </div>
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
      if (this.$route.name != router_name)
        this.$router.push({ name: router_name })
    },
  },
  computed: {
    // ...mapState(['userInfo']),
    showMenu() {
      return ['ATAandEquipmentSelection', 'PartNumberSelection', 'BatchPartSelection'].includes(this.selectedOption!)
    },
    selectedOption() {
      return this.$route.name
    }
  },
  mounted() {
    // this.$router.push({ name: 'ATAandEquipmentSelection' })
  },
  watch: {

  }
}
</script>
<style lang="scss" scoped>
.uni-button {
  @apply flex items - center justify - center text - white;
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
