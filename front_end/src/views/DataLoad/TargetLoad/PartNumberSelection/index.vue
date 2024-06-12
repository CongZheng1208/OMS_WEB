<template>
  <div>
    <div class="px-6 flex ">
      <div class="w-1/3 ">
        <table>
          <thead>
            <tr>
              <th>Part Number</th>
              <th>Description</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item in 10"
                class="h14 "
                :class="item === 1 ? 'folder-color' : ''">
              <td>User {{ item }}</td>
              <td>xxxxxxxxxxxxx</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="flex-1">
        <table>
          <thead>
            <tr>
              <th>ATA</th>
              <th>Equipment Name</th>
              <th class="w-30  "
                  style="padding:0px 10px 0px 10px;">
                <button class="footer-btn "> Select All</button>
              </th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item in 10"
                class="h14 "
                :class="item === 1 ? 'folder-color' : ''">
              <td>User {{ item }}</td>
              <td>Description</td>
              <td></td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    <el-footer>
      <div>
        <button class="footer-btn">PRINT</button>
      </div>
      <div class="flex gap3">
        <button @click="gotoDataUpload()"
                class="footer-btn">SELECT</button>
      </div>
    </el-footer>
  </div>
</template>
<script lang="ts">

export default {
  name: 'PartNumberSelection',
  components: {
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
    gotoDataUpload() {
      this.$router.push({
        name: "DataUpload"
      })
    }
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
  @apply flex items-center justify-center text-white;
  width: 16vh;
  height: 4vh;
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
