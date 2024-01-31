<template>
  <el-container style="display: flex; flex-direction: column">
    <el-header
      style="
        text-align: left;
        font-weight: bold;
        color: white;
        text-shadow: 2px 2px 2px #000;
        padding-top: 3vh;
        padding-left: 4vh;
        font-size: 16px;
        height: 13vh;
      "
    >
      <div style="float: left">Select Option:</div>
      <div style="margin-left: 5%; float: left">

        <div class="radio" @click="changeTabs('legPDEsSelected')">
          <input
            name="failure-rep-radio"
            type="radio"
            :checked="legPDEsSelected"
          />
          <label class="form-check-label">Inbound Leg FDEs</label>
        </div>

        <div class="radio" @click="changeTabs('existingFDEsSelected')">
          <input
            name="failure-rep-radio"
            type="radio"
            :checked="existingFDEsSelected"
          />
          <label class="form-check-label">Existing FDEs</label>
        </div>
      </div>

      <div style="margin-left: 5%; float: left">
        <div class="radio" @click="changeTabs('legFailuresSelected')">
          <input
            name="failure-rep-radio"
            type="radio"
            :checked="legFailuresSelected"
          />
          <label class="form-check-label">Inbound Leg Failures</label>
        </div>

        <div class="radio" @click="changeTabs('existingFailureSelected')">
          <input
            name="failure-rep-radio"
            type="radio"
            :checked="existingFailureSelected"
          />
          <label class="form-check-label">Existing Failures</label>
        </div>
      </div>
      <div style="margin-left: 5%; float: left" v-if="legFailuresSelected">
        <div class="radio" @click="switchAll(true)">
          <input
            name="inbound-leg-fail-radio"
            type="radio"
            :checked="legFailureAll"
          />
          <label class="form-check-label">All</label>
        </div>

        <div class="radio" @click="switchAll(false)">
          <input
            name="inbound-leg-fail-radio"
            type="radio"
            :checked="!legFailureAll"
          />
          <label class="form-check-label">Summary</label>
        </div>
      </div>
    </el-header>
    <el-main style="flex: 1; padding: 0">
      <div>
        <in-bound-leg v-if="legPDEsSelected" />
        <existing-fde v-if="existingFDEsSelected" />
        <in-bound-leg-failures
          v-if="legFailuresSelected"
          :isAll="legFailureAll"
        />
        <existing-failures v-if="existingFailureSelected" />
      </div>
    </el-main>
    <el-footer>
      <div>
        <el-button class="footer-btn" @click="printPage">PRINT</el-button>
      </div>
      <div>
        <el-button class="footer-btn" @click="goFailureHistoryPage()"
          >Failure History</el-button
        >
        <el-button class="footer-btn" @click="goSelectPage()">Select</el-button>
      </div>
    </el-footer>
  </el-container>
</template>

<script>
import InBoundLeg from "./InBoundLeg";
import ExistingFde from "./ExistingFde";
import ExistingFailures from "./ExistingFailures";
import InBoundLegFailures from "./InBoundLegFailures";
export default {
  components: {
    InBoundLeg,
    ExistingFde,
    ExistingFailures,
    InBoundLegFailures,
  },
  name: "FailureRep",
  data() {
    return {
      legPDEsSelected: true,
      legFailuresSelected: false,
      existingFDEsSelected: false,
      existingFailureSelected: false,
      legFailureAll: true,
    };
  },
  methods: {
    /**
     * 本函数用于Inbound Leg Failures单选按钮在All和Summary
     * @param {*} bool All选中：true;Summary选中：false
     */
    switchAll(bool) {
      this.legFailureAll = bool;
    },
    /**
     * 本函数用于打印页面
     */
    printPage() {
      window.print();
      console.log("null");
    },

    /**
     * 本函数用于Inbound Leg Failures单选按钮在All和Summary
     * @param {*} value failure-rep-radio组checked value
     */
    changeTabs(value) {
      if (value == "legPDEsSelected") {
        this.legPDEsSelected = true;
        this.legFailuresSelected = false;
        this.existingFDEsSelected = false;
        this.existingFailureSelected = false;
      }
      if (value == "legFailuresSelected") {
        this.legPDEsSelected = false;
        this.legFailuresSelected = true;
        this.existingFDEsSelected = false;
        this.existingFailureSelected = false;
      }
      if (value == "existingFDEsSelected") {
        this.legPDEsSelected = false;
        this.legFailuresSelected = false;
        this.existingFDEsSelected = true;
        this.existingFailureSelected = false;
      }
      if (value == "existingFailureSelected") {
        this.legPDEsSelected = false;
        this.legFailuresSelected = false;
        this.existingFDEsSelected = false;
        this.existingFailureSelected = true;
      }
    },
    /**
     * 本函数用于跳转页面至Failure History页面（暂未实现）
     *
     */
    goFailureHistoryPage() {
      //待实现
    },
    /**
     * 本函数用于跳转页面至选定的failure页面
     *
     */
    goSelectPage() {
      //深度拷贝，不改变state中selectedFailureInfo的原始数据
      const objSelectedData = JSON.parse(
        JSON.stringify(this.$store.state.selectedFailureInfo)
      );
      //判断是否选择表格某一行数据，若否则提示选择，若是则跳转至SelectFailuresDetails页面
      if (JSON.stringify(objSelectedData) === "{}") {
        alert("Please select one item !");
      } else {
        this.$router.push({ name: "SelectFailuresDetails" });
      }
    },
  },
};
</script>

<style scoped>
</style>
