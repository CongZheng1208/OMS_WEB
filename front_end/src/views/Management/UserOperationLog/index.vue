<template>
  <div>
    <Selection />
    <div class="p-6  h-140 overflow-y-auto">
      <table>
        <tr>
          <th>Date</th>
          <th>Password</th>
          <th>Connection Type</th>
          <th>Login Status</th>
          <th>Last Login Time</th>
          <th>Pemitted to Log Out</th>
        </tr>
        <tr>
          <td>User D</td>
          <td>**8*********</td>
          <td>PDF</td>
          <td>2022/01/01 12:00:00</td>
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
  @apply w-full text-lg fontbold text-start border;
  border-collapse: collapse;
}

td,
th {
  @apply p3 text-center;
}


tr {
  border: 1px solid rgb(111, 111, 111);
}

tr:first-child {
  @apply bg-[#404040] border-b-white border;
}
</style>
