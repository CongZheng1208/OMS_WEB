<template>
  <!-- <div class="container-fluid">
    config
    <h2>Ground Test Select Test Page</h2>
    <p>Selected Equipment: {{ $route.params.selectedEquipment }}</p>
  </div> -->

  <el-container style="display: flex; flex-direction: column;">
    <el-header style="text-align: left; font-weight: bold; color: white; text-shadow: 2px 2px 2px #000;
      padding-top: 3vh; padding-left: 4vh; font-size: 16px;">
      Test Selection
      <!-- ATA: {{ testDetails }}
      <p>Selected Equipment: {{ $route.params.selectedEquipment }}</p> -->
    </el-header>

    <el-main style="flex: 1; padding: 0;">
      <el-table

        highlight-current-row
        style="width: 100%; background-color: rgb(46, 45, 45)"
        @row-click="handleRowClick"
        :data="testDetails"
        :sort-method="customSortMethodForProgressColumn"
        :header-cell-style="{background:'#404040',color:'#FFFFFF', font:'14px'}"
        :empty-text="'No Data Display'"
      >
        <el-table-column :width="null" :min-width="5"></el-table-column>
        <el-table-column prop="T_NA" label="Test Name" sortable :width="null" :min-width="120"></el-table-column>
        <el-table-column prop="T_TP" label="Test Type" sortable :width="null" :min-width="50"></el-table-column>
        <el-table-column prop="T_ED" label="Expected Duration (mins)" sortable :width="null" :min-width="80"></el-table-column>
        <el-table-column label="Availability" :width="null" :min-width="50"></el-table-column>
        <el-table-column label="Note" :width="null" :min-width="30"></el-table-column>
        <el-table-column :width="null" :min-width="5"></el-table-column>
      </el-table>
    </el-main>
    <el-footer>
      <div>
      </div>
      <div>
          <el-button class="footer-btn" @click="goSelectATAandEquipmentPage()">BACK</el-button>
          <el-button class="footer-btn" @click="goThreeTestsPage()">SELECT</el-button>
      </div>
    </el-footer>
  </el-container>
</template>

<script>

export default {



  data() {
    return {
      testDetails: [],
      selectedTestId: ""


    }
  },
  methods: {
    /**
     * 本函数用于更新更新选中行的status属性到selectedRowStatus变量
     * @param {string} row - rawData数据的ataNumber属性
     */
    handleRowClick(row) {

      this.selectedTestId = row.T_ID
      console.log(this.selectedTestId)

    },


    /**
     * 本函数用于更新更新选中行的status属性到selectedRowStatus变量
     * @param {string} row - menus数据的name属性
     */
    getSelectedData(ataNum) {
      return this.rawData.find(item => item.ataNumber === ataNum);
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
    goThreeTestsPage() {
      this.$router.push({ name: "GroundTestThreeTestsPage", params: { } });
    },

    /**
     * 本函数用于跳转页面
     */
    goSelectATAandEquipmentPage() {
      this.$router.push({ name: "GroundTestSelectATAandEquipmentPage" });
    }
  },

  mounted() {
    this.testDetails = this.$route.params.selectedEquipment.testDetails
    console.log(this.testDetails); // 访问从上一个页面传递而来的参数
  }
  // 其他组件逻辑
}

</script>

<style scoped>
</style>

