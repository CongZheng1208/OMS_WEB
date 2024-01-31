<template>
   <el-container>
    <el-header style="height: 12vh;">
      <el-row style="width: 80%;">
        <el-col :span="8">
          <div class="el-header-subcontainer">
            <span class="el-header-dot" ></span>
            ATA: {{  }}
          </div>
          <div class="el-header-subcontainer">
            <span class="el-header-dot" ></span>
            Equipment Name: {{  }}
          </div>
        </el-col>
        <el-col :span="8">
          <div class="el-header-subcontainer">
            <span class="el-header-dot" ></span>
            Test Name: {{  }}
          </div>
          <div class="el-header-subcontainer">
            <span class="el-header-dot" ></span>
            Test Type: {{  }}
          </div>

        </el-col>
        <el-col :span="8">
          <div class="el-header-subcontainer">
            <span class="el-header-dot" ></span>
            Expected Duration(mins): {{  }}
          </div>
        </el-col>
      </el-row>
    </el-header>

    <el-main style="padding:2vh">
      <el-row>
        <el-col :span="8">

          <div>
            <el-card class="custom-card" shadow="hover">
              <div class="custom-header">Pre-conditions</div>
              <div class="custom-content">
                <div v-for="o in 50" :key="o" class="content-item">
                  {{'列表内容 ' + o }}
                </div>
              </div>
            </el-card>
          </div>

        </el-col>

        <el-col :span="8">
          <div>
            <el-card class="custom-card" shadow="hover">
              <div class="custom-header">Inhibit Conditions</div>
              <div class="custom-content">
                <div v-for="o in 50" :key="o" class="content-item">
                  {{'列表内容 ' + o }}
                </div>
              </div>
            </el-card>
          </div>

        </el-col>
        <el-col :span="8">
          <div>
            <el-card class="custom-card" shadow="hover">
              <div class="custom-header">Interfering Tests</div>
              <div class="custom-content">
                <div v-for="o in 50" :key="o" class="content-item">
                  {{'列表内容 ' + o }}
                </div>
              </div>
            </el-card>
          </div>
        </el-col>
      </el-row>

    </el-main>
    <el-footer>
      <div>
      </div>
      <div>
        <el-button class="footer-btn" @click="goSelectTestPage()">BACK</el-button>
        <el-button class="footer-btn" @click="goInteractiveTestPage()">CONTINUE</el-button>
      </div>
    </el-footer>
  </el-container>
</template>

<script>

export default {
  data() {
    return {
      selectedTestId: "",


    }
  },
  computed: {

  },
  methods: {


    /**
     * 本函数用于更新更新选中行的status属性到selectedRowStatus变量
     * @param {string} row - rawData数据的ataNumber属性
     */
    handleRowClick(row) {

      this.selectedTestId = row.T_ID;
      // console.log(this.selectedTestId)
    },


    /**
     * 本函数用于跳转页面
     */
    goInteractiveTestPage() {
      this.$router.push({ name: "InteractiveTest", params: { } });
    },

    /**
     * 本函数用于跳转页面
     */
     goSelectTestPage() {
      this.$router.push({ name: "SelectTest" });
    }
  },

  mounted() {
  }
  // 其他组件逻辑
}

</script>

<style scoped>
</style>

