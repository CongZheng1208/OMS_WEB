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
      "
    >
      <div style="float: left">Select Option:</div>
      <div style="margin-left: 5%; float: left">
        <div>
          <input
            class="form-check-input"
            name="failure-rep-radio"
            type="radio"
            :checked="legPDEsSelected"
            v-on:change="changeTabs('legPDEsSelected')"
          />
          <span>Inbound Leg FDEs</span>
        </div>
        <div>
          <input
            class="form-check-input"
            name="failure-rep-radio"
            type="radio"
            :checked="existingFDEsSelected"
            v-on:change="changeTabs('existingFDEsSelected')"
          />
          <span>Existing FDEs</span>
        </div>
      </div>

      <div style="margin-left: 5%; float: left">
        <div>
          <input
            class="form-check-input"
            name="failure-rep-radio"
            type="radio"
            :checked="legFailuresSelected"
            v-on:change="changeTabs('existingFailureSelected')"
          />
          <span>Inbound Leg Failures</span>
        </div>
        <div>
          <input
            class="form-check-input"
            name="failure-rep-radio"
            type="radio"
            :checked="existingFailureSelected"
            v-on:change="changeTabs('existingFailureSelected')"
          />
          <span>Existing Failures</span>
        </div>
      </div>
      <div style="margin-left: 5%; float: left">
        <div>
          <input
            class="form-check-input"
            name="failure-rep-radio"
            type="radio"
            :checked="legFailureAll"
            v-on:change="switchAll(true)"
          />
          <span>All</span>
        </div>
        <div>
          <input
            class="form-check-input"
            name="failure-rep-radio"
            type="radio"
            :checked="!legFailureAll"
            v-on:change="switchAll(false)"
          />
          <span>Summary</span>
        </div>
      </div>
    </el-header>
    <el-main style="flex: 1; padding: 0">
      <div class="row segment-bottom">
        <in-bound-leg v-if="legPDEsSelected" />
        <existing-fde v-if="existingFDEsSelected" />
        <in-bound-leg-failures
          v-if="legFailuresSelected"
          :isAll="legFailureAll"
        />
        <existing-failures v-if="existingFailureSelected" />
      </div>
    </el-main>
    <el-footer> </el-footer>
  </el-container>
</template>
<!-- import ExistingFailures from "/ExistingFailures";
import ExistingFde from "../../radioTabs/failureReportRadios/ExistingFde"; -->


<!-- import InBoundLegFailures from "../../radioTabs/failureReportRadios/InBoundLegFailures";
import SelectView from "../../radioTabs/failureReportRadios/SelectView";
import FailureHistory from "../../radioTabs/failureReportRadios/FailureHistory" -->
<script>
import InBoundLeg from "./InBoundLeg";

export default {
  components: {
    InBoundLeg,
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
    switchAll(bool) {
      this.legFailureAll = bool;
    },
    printPage() {
      window.print();
      console.log("null");
    },
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
  },
};
</script>

<style scoped>
</style>
