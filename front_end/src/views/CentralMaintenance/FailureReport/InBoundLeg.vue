<template>
  <div>
    <table class="text-white">
      <thead>
        <tr>
          <th class="click" @click="changeType('code')">
            FDE Code
            <span
              class="icon"
              :class="{
                inverse: isReverse && sortType === 'code',
                gray: sortType !== 'code',
              }"
            >
              &#9650;
            </span>
          </th>
          <th scope="col">FDE Test</th>
          <th scope="col">FDE Status</th>
          <th scope="col">FDE Class</th>
          <th class="click" @click="changeType('datetime')">
            Date/Time
            <span
              class="icon"
              :class="{
                inverse: isReverse && sortType === 'datetime',
                gray: sortType !== 'datetime',
              }"
            >
              &#9650;
            </span>
          </th>
          <th class="click" @click="changeType('fimCode')">
            FIM Code
            <span
              class="icon"
              :class="{
                inverse: isReverse && sortType === 'fimCode',
                gray: sortType !== 'fimCode',
              }"
            >
              &#9650;
            </span>
          </th>
          <th scope="col">Failure Name</th>
          <th scope="col">State</th>
          <th scope="col">Flight Phase</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(record, index) in sortCurrentArray" :key="index">
          <td>{{ record.FIMCode_info }}</td>
          <td>{{ record.FDEText }}</td>
          <td>{{ fdeStatusEnum[record.FDEState] }}</td>
          <td>{{ fdeClassEnum[record.FDEClass] }}</td>
          <td>{{ record.failure_time }}</td>
          <td>
            <el-button
              name="turnToPdf"
              class="el-buttons"
              type="text"
              plain
              v-on:click="findURL(record.fimCode)"
            >
              {{ record.fimCode || "-" }}</el-button
            >
          </td>
          <td>{{ record.failureName || "-" }}</td>
          <td>{{ failureStateEnum[record.state] || "-" }}</td>
          <td>{{ flightPhaseEnum[record.phase] || "-" }}</td>
          <td>
            <input
              class="form-check-input"
              type="radio"
              name="inbound-leg-fde-radio"
              @change="radioSelect(index + (currPageNum - 1) * maxLineNum)"
            />
          </td>
        </tr>
      </tbody>
    </table>
    <div>
      <span class="text-white">{{ $store.state.count }}</span>
    </div>
    <div>
      <button class="text-white" @click="btn">点击我增加count</button>
      <button class="text-white" @click="btn2">点击重写count的值</button>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  components: {},
  name: "InBoundLeg",
  data() {
    return {
      sortType: "",
      isReverse: false,
      sortCurrentArray: {},
      // 此处定义一系列枚举值
      // FlightPhase
      flightPhaseEnum: {
        0: "--",
        1: "PWR-ON",
        2: "ENG-START",
        3: "TAXI-OUT",
        4: "TO-ROLL",
        5: "INT-CLIMB",
        6: "CLIMB",
        7: "CRUISE",
        8: "DESCENT",
        9: "APPROACH",
        10: "GO-AROUND",
        11: "FLARE",
        12: "ROLLOUT",
        13: "TAXI-IN",
        14: "ENG-STOP",
        15: "MAINT",
      },
      // FailureState
      failureStateEnum: {
        0: "INACTV",
        1: "ACTV",
        3: "LATCH",
      },
      // FDE Status
      fdeStatusEnum: {
        0: "INACTV",
        1: "ACTV",
        2: "INHB",
      },
      // FDE Class
      fdeClassEnum: {
        0: "--",
        1: "CAUT",
        2: "ADVR",
        3: "STAT",
        4: "WARN",
      },
    };
  },

  methods: {
    findURL() {},
    btn() {
      this.$store.commit("addcount", 10);
      this.$store.commit("timeTest");

      //this.$store.dispatch("myarray");
      console.log("!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!");
      console.log(this.$store.state.res);
      console.log(this.$store.state.count);
      console.log("!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!");
      this.sortCurrentArray = this.$store.state.res;
      console.log("sortCurrentArray:", this.sortCurrentArray);
    },
    btn2() {
      this.$store.state.count = 10000;
      console.log("this.$store.state.count:", this.$store.state.count);
    },
    changeType(type) {
      var vm = this;
      if (vm.sortType == type) {
        vm.isReverse = !vm.isReverse;
      } else {
        vm.isReverse = false;
      }
      vm.sortType = type;
    },
  },
  mounted() {
    console.log("????????????????????????????");
    this.$store.commit("myarray");
    console.log("????????????????????????????");
  },
};
</script>

<style scoped>
.icon {
  display: inline-block;
  color: white;
}
.icon.inverse {
  transform: rotate(180deg);
}
.icon.gray {
  color: gray;
}
.text-white {
  color: white;
}
#inBoundLeg {
  position: relative;
  text-align: center;
}
</style>
