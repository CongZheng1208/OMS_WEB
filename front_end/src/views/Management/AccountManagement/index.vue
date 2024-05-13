<template>
  <div>
    <Selection />
    <div class="flex px-6">
      <table class="flex-1 text-center text-lg fontbold text-start p6">
        <tr>
          <th class="text-start">User Name</th>
          <th class="text-start">Password</th>
          <th class="text-start">Connection Type</th>
          <th class="text-start">Login Status</th>
          <th class="text-start">Last Login Time</th>
          <th class="text-start">Pemitted to Log Out</th>
        </tr>
        <tr v-for="item in 10"
            class="h14 "
            :class="item === 1 ? 'folder-color' : ''">
          <td class="text-start">User {{ item }}</td>
          <td class="text-start">**8*********</td>
          <td class="text-start">PMAT Wireless</td>
          <td class="text-start">Log out</td>
          <td class="text-start">2022/01/01 12:00:00</td>
          <td class="text-start">Yes</td>
        </tr>
      </table>
    </div>
    <div class="p2 border w-full fixed bottom-0 left-0 flex justify-between items-center">
      <button class="p2 text-lg rounded-xl border jianbian">Print </button>
      <div class="flex gap3">
        <button class="p2 text-lg rounded-xl border jianbian">Edit</button>
        <button class="p2 text-lg rounded-xl border jianbian">Download</button>
      </div>
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
.folder-color {
  background: linear-gradient(to bottom, white, #666, white);
  color: white;
  /* 设置按钮颜色为白色确保可读性 */
  padding: 10px;
  /* p2 类可能意味着 padding，这里确保样式的一致性 */
  font-size: large;
  /* text-lg 类可能意味着大号文字，这里使用 CSS 的 large 值 */
  border-radius: 10px;
  /* rounded-xl 类可能意味着较大的圆角，这里假设为 10px */
  border: 1px solid black;
  /* border 类可能意味着有边框，这里添加一个黑色边框 */
}

.jianbian {
  font-weight: bold;
  background-image: linear-gradient(white, black);
  color: white;
  /* 设置按钮文字颜色为白色以确保可读性 */
  padding: 10px;
  /* p2 类可能意味着 padding，这里确保样式的一致性 */
  font-size: large;
  /* text-lg 类可能意味着大号文字，这里使用 CSS 的 large 值 */
  border-radius: 10px;
  /* rounded-xl 类可能意味着较大的圆角，这里假设为 10px */
  border: 1px solid black;
  /* border 类可能意味着有边框，这里添加一个黑色边框 */
}

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
