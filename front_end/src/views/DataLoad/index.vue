<template>
  <div class="container-fluid">
    <Menus :menus="menus" />
    <router-view />
  </div>
</template>
<script lang="ts">
import Menus from '@/components/Menus/index.vue'
export default {
  name: "DataLoad",
  components: { Menus },
  data() {
    return {
      FailureReportTimer: "",
      menus: [
        {
          name: "targetLoad",
          isActive: true,
          routeName: "TargetLoad",
        },
        {
          name: "equipmentConfig",
          isActive: false,
          routeName: "EquipmentConfig",
        },
      ],
    };
  },
  methods: {

  },

  watch: {

  },
  mounted() {
  },
  beforeDestroy() {
    clearTimeout(this.FailureReportTimer)
  },
};
</script>
<style scoped></style>
