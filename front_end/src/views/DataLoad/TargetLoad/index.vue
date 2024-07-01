<template>
  <div>
    <Selection />
    <div class="p-20px">
      <router-view></router-view>
    </div>
  </div>
</template>
<script lang="ts">
import Selection from './selection.vue';

export default {
  name: 'TargetLoad',
  components: {
    Selection
  },
  mixins: [],
  props: {

  },
  data() {
    return {

    }
  },
  computed: {

  },
  watch: {

  },
  mounted() {
    this.$router.replace({ name: "ATAandEquipmentSelection" })
  },
  methods: {
  }
};
</script>
