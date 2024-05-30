<template>
  <div>
    <div>
      <div class="flex justify-end">
        <!-- <button class="bg-transparent border-none p-0 m-0"
                @click="onClose">
          <CloseButton />
        </button> -->
      </div>
      <table>
        <thead>
          <tr>
            <th>Flight Leg</th>
            <th>Flight Number Leg</th>
            <th>Start Time</th>
            <th>Origin</th>
            <th>Destination</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>12</td>
            <td>12</td>
            <td>12</td>
            <td>12</td>
            <td>12</td>
          </tr>
        </tbody>
      </table>
    </div>
    <div class="flex justify-end">
      <button class="footer-btn"
              @click="onClose">取消</button>
      <button class="footer-btn "
              @click="onConfirm">确定</button>
    </div>
  </div>
</template>
<script lang="ts">
import CloseButton from './close.svg.vue'

export default {
  components: {
    CloseButton
  },
  methods: {
    onBlur() {
      this.$emit('close')
    },
    onClose() {
      this.$emit('close')
    },
    onConfirm() {
      this.$emit('ok')
    }
  }
}
</script>
<style lang="scss"
       scoped>
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
        @apply cursor-pointer;
        width: 10vh;
        height: 5vh;

        color: white;
        font-size: 16px;
        font-weight: bold;

        padding: 1vh;
        margin-left: 1vh;

        border-radius: 3px;
        border: 1px solid rgb(111, 111, 111);

        box-shadow: 5px 5px 5px 0px rgba(42, 42, 42, 0.5);
        background-color: rgb(65, 65, 65);

        transition: box-shadow 0.3s ease background-color 0.3s ease;
      }


      .footer-btn:hover {
        box-shadow: 2px 2px 10px 0px #17bef1;
        border: 1px solid rgb(111, 111, 111);

        background-color: rgb(88, 88, 88);
        color: #ffffff;
      }

      .footer-btn:active {
        box-shadow: 2px 2px 10px 0px #17bef1;
        border: 1px solid rgb(111, 111, 111);

        background-color: rgb(88, 88, 88);
        color: #17bef1;
      }
    </style>
