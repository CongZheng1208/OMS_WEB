<template>
   <el-container>
    <el-header>
          ATA: {{  }}
          Equipment Name: {{  }}
          Test Name: {{  }}
          Test Type: {{  }}
          Expected Duration(mins): {{  }}
    </el-header>

    <el-main>
      <el-row :gutter="20">
        <el-col :span="14">
          <div>
            <el-card
              header="Interactive Test"
              shadow="hover"
            >
              <div v-for="o in 10" :key="o" class="text item">
                {{'列表内容 ' + o }}
              </div>
            </el-card>

          </div>
        </el-col>
        <el-col :span="10">
          <div>
            Select an option and press continue

          </div>

        </el-col>
      </el-row>

    </el-main>
    <el-footer>
      <div>
      </div>
      <div>
        <el-button class="footer-btn" @click="goTestListPage()">BACK</el-button>
        <el-button class="footer-btn" @click="continueTest()">CONTINUE</el-button>
        <el-button class="footer-btn" @click="abortTest()">ABORT TEST</el-button>
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
     * 本函数用于根据排序对象确定排序逻辑
     * @param {number/string} a - 排序对象1
     * @param {number/string} b - 排序对象2
     * @returns {number/string} 排序逻辑
     */
    customSortMethodForProgressColumn(a, b) {
      // 判断a和b的类型
      if (typeof a === 'string' && typeof b === 'string') {
        // 字符串类型，使用localeCompare进行字典序排序
        return a.localeCompare(b);
      } else {
        // 数字类型，根据数值大小排序
        return a - b;
      }
    },

    /**
     * 本函数用于跳转页面
     */
     goTestListPage() {
      this.$router.push({ name: "TestList", params: { } });
    },

    /**
     * 本函数用于跳转页面
     */
     continueTest() {

    },


    /**
     * 本函数用于跳转页面
     */
     abortTest() {

    },
  },

  mounted() {
  }
  // 其他组件逻辑
}

</script>

<style scoped>
</style>

