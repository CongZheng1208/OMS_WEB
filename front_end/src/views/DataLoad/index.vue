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
          name: "partNumberSelection",
          isActive: false,
          routeName: "PartNumberSelection",
        },
      ],
    };
  },
  methods: {

  },

  watch: {

  },

  mounted() {
    this.$router.push({ name: "TargetLoad" })
  },
};
</script>
<style scoped></style>
