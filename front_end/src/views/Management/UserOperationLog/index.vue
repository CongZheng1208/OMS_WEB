<template>
  <div>
    <Selection />
    <div class="flex px-6">
      <table class="flex-1 text-center text-lg fontbold text-start p6">
        <tr>
          <th class="text-start">Date</th>
          <th class="text-start">Password</th>
          <th class="text-start">Connection Type</th>
          <th class="text-start">Login Status</th>
          <th class="text-start">Last Login Time</th>
          <th class="text-start">Pemitted to Log Out</th>
        </tr>
        <tr class="h14">
          <td class="text-start">User D</td>
          <td class="text-start">**8*********</td>
          <td class="text-start">PDF</td>
          <td class="text-start">2022/01/01 12:00:00</td>
        </tr>
      </table>
    </div>
  </div>
</template>
<script lang="ts">
import Selection from './selection.vue';

export default {
  name: '',
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

  },
  methods: {

  }
};
</script>
<style lang='scss' scoped>
table {
  border-collapse: collapse;
}

td,
th {
  @apply p1;
}

tr:first-child {
  border: 2px solid white;
}
</style>
