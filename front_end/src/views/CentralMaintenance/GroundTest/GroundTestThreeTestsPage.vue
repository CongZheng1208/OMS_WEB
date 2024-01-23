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
        <el-col :span="8">
          <div>
            <el-card
              header="Pre-conditions"
              shadow="hover"
            >
              <div v-for="o in 4" :key="o" class="text item">
                {{'列表内容 ' + o }}
              </div>
            </el-card>
          </div>

        </el-col>
        <el-col :span="8">
          <div>
            <el-card
              header="Inhibit Conditions"
              shadow="hover"
            >
              <div v-for="o in 4" :key="o" class="text item">
                {{'列表内容 ' + o }}
              </div>
            </el-card>
          </div>

        </el-col>
        <el-col :span="8">
          <div>
            <el-card
              header="Interfering Tests"
              shadow="hover"
            >
              <div v-for="o in 4" :key="o" class="text item">
                {{'列表内容 ' + o }}
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

