<template>
  <div>
    <el-header v-if="showMenu"
               style="height: 9vh;">
      <el-row style="width: 100%">
        <el-col :span="3">
          <div class="el-header-title"> Select Option </div>
        </el-col>
        <el-col :span="5">
          <div class="el-header-radios">
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
        </el-col>
        <el-col :span="13">
          <div class="el-header-radios">
            <div @click="changeRadio('BatchPartSelection')"
                 class="radio">
              <input name="param-display-radio"
                     type="radio"
                     :checked="selectedOption == 'BatchPartSelection'" />
              <label class="cursor-pointer">Batch Part Selection</label>
            </div>
          </div>
        </el-col>
        <el-col :span="3">
          <Clock />
        </el-col>
      </el-row>
    </el-header>
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
<style lang="scss"
       scoped>
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
