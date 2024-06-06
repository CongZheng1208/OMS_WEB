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
      menus: [
        {
          name: "Parameter Display",
          isActive: true,
          routeName: "ParameterSelect",
        },
        {
          name: "Parameter Recording",
          isActive: false,
          routeName: "ParameterRecording",
        },
      ],
    };
  }
};
</script>
<style scoped></style>
