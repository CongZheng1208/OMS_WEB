<template>
  <div class="container-fluid">
    <Menus :menus="menus" />
    <router-view />
  </div>
</template>
<script lang="ts">
import Menus from '@/components/SubMenus/index.vue'
export default {
  name: "DataLoad",
  components: { Menus },
  data() {
    return {
      menus: [
        {
          name: "target Load",
          isActive: true,
          realName: "TargetLoad",
          routeName: "LoadStatus",
        },
        {
          name: "equipment Config",
          isActive: false,
          realName: "EquipmentConfig",
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
};
</script>
<style scoped></style>
