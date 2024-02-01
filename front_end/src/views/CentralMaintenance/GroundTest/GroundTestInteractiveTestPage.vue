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
        <el-col :span="14">
          <div>
            <el-card class="custom-card" shadow="hover">
              <div class="custom-header">Interactive Test</div>
              <div class="custom-content">
                <div v-for="o in 50" :key="o" class="content-item">
                  {{'列表内容 ' + o }}
                </div>
              </div>
            </el-card>
          </div>
        </el-col>
        <el-col :span="10">
          <div>
            <div class="el-main-subtitle">
              Select an option and press continue
            </div>

            <el-radio-group v-model="selectedOption" class="vertical-radio-group">
              <el-radio v-for="option in options" :key="option.id" :label="option.id" class="vertical-radio-item">{{ option.name }}</el-radio>
            </el-radio-group>
            <p>你选择的选项是: {{ selectedOption }}</p>
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
import {customSortMethodForProgressColumn} from '@/utils/utils.js'

export default {

  data() {
    return {
      selectedTestId: "",
      selectedOption: 1,
      options: [
        { id: 1, name: '选项1' },
        { id: 2, name: '选项2' },
        { id: 3, name: '选项3' },
        { id: 4, name: '选项4' },
        { id: 5, name: '选项5' }
      ]
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
    },

    /**
     * 本函数用于跳转页面
     */
     goTestListPage() {
      this.$router.push({ name: "TestList", params: { } });
    },

    /**
     * 本函数用于向成员系统发送继续指令
     */
     continueTest() {

    },

    /**
     * 本函数用于向成员系统发送终止指令
     */
     abortTest() {

    },

    customSortMethodForProgressColumn,
  },

  mounted() {
  }
}

</script>

<style scoped>
</style>

