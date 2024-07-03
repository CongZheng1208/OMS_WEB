<template>
  <div>
    <Selection />
    <router-view></router-view>
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
  methods: {
  },
  mounted() {

  },
};
</script>
