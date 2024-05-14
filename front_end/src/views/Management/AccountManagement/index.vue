<template>
  <div>
    <Selection />
    <div class=" px-6">
      <table>
        <tr>
          <th>User Name</th>
          <th>Password</th>
          <th>Connection Type</th>
          <th>Login Status</th>
          <th>Last Login Time</th>
          <th>Pemitted to Log Out</th>
        </tr>
        <tr v-for="item in 10"
            class="h14 "
            :class="item === 1 ? 'folder-color' : ''">
          <td>User {{ item }}</td>
          <td>**8*********</td>
          <td>PMAT Wireless</td>
          <td>Log out</td>
          <td>2022/01/01 12:00:00</td>
          <td>Yes</td>
        </tr>
      </table>
    </div>
    <el-footer>
      <div>
        <button class="footer-btn">PRINT</button>
      </div>
      <div class="flex gap3">
        <button class="footer-btn">EDIT</button>
        <button class="footer-btn">DOWNLOAD</button>
      </div>
    </el-footer>
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



.footer-btn {
  width: 20vh;
  height: 5.5vh;
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
