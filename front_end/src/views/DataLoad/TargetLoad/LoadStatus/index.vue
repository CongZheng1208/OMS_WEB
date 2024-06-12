<template>
  <div>
    <Selection />
    <div class="px-6">
      <table class="wfull ">
        <thead>
          <tr>
            <th>Equipment Name <input type="text" />
            </th>
            <th>PNN <input type="text" />
            </th>
            <th>Start Time <input type="text" />
            </th>
            <th>Elapsed Time <input type="text" />
            </th>
            <th>Load Status <input type="text" />
            </th>
            <th>Load Progress <input type="text" />
            </th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in 10"
              class="h14 "
              :class="item === 1 ? 'folder-color' : ''">
            <td>IDU_{{ item }}</td>
            <td>CMC11-1061</td>
            <td>2023/03/10 17:05:20</td>
            <td>00:32:34</td>
            <td>Queued</td>
            <td>
              <div v-if="item !== 2 && item !== 3"
                   class="flex items-center">
                <div class="w-30 h-5 bg-white border border-white flex">
                  <!-- Progress Bar Fill -->
                  <div class="bg-blue-500 text-xs leading-none py-1 text-center text-white"
                       style="width: 50%;"> </div>
                </div>
                <span class="pl3">50%</span>
              </div>
              <div v-if="item === 2"
                   class="flex items-center">
                <button @click="goto('ConfirmPage')"
                        class="confirm-btn">Confirm</button>
              </div>
              <div v-if="item === 3">
                <button @click="goto('FailDetailPage')"
                        class="confirm-btn">View Detail</button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <el-footer>
      <div>
        <button class="footer-btn">PRINT</button>
      </div>
      <div class="flex gap3">
        <button @click="goback()"
                class="footer-btn">BACK</button>
        <button @click="gotoDataUpload()"
                class="footer-btn">START LOAD </button>
      </div>
    </el-footer>
  </div>
</template>
<script lang="ts">
import Selection from './select-bar.vue';

export default {
  name: 'LoadStatus',
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
    goback() {
      this.$router.back()
    },
    gotoDataUpload() { },
    goto(name: string) {
      this.$router.push({ name: name })
    }
  }
};
</script>
<style lang="scss" scoped>
table {
  @apply w-full text-lg fontbold border;
  border-collapse: collapse;
}

td,
th {
  @apply p3;
}


tr {
  border: 1px solid rgb(111, 111, 111);
}

tr:first-child {
  @apply bg-[#404040] border-b-white border;
}

th {
  @apply text-start pl10;
}

td {
  @apply pl10;
}


.confirm-btn {
  @apply flex items-center justify-center hover:cursor-pointer;
  width: 12vh;
  height: 4vh;
  color: white;
  font-size: 16px;
  font-weight: bold;
  padding: 1vh;
  border-radius: 3px;
  border: 1px solid rgb(111, 111, 111);
  box-shadow: 5px 5px 5px 0px rgba(42, 42, 42, 0.5);
  background-color: rgb(65, 65, 65);
  transition: box-shadow 0.3s ease background-color 0.3s ease;
}

.confirm-btn:hover {
  box-shadow: 2px 2px 10px 0px #17bef1;
  border: 1px solid rgb(111, 111, 111);
  background-color: rgb(88, 88, 88);
}
</style>
