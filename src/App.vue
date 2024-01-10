<template>
  <div id="app">
    <div class="homeHeader-menus-bg" style="margin-top:0px;">
      <el-menu
        mode="horizontal"
        background-color="rgb(66, 66, 66)"
        text-color="#fff"
        active-text-color="#17bef1"
        style="font-weight: bold;  font-size: 20px; "
      >
        <el-menu-item
          v-for="(menu, key) in menus"
          :key="key"
          :index="key"
          :class="{'el-menu-item-active': menu.isActive, 'el-menu-item': !menu.isActive, 'disabled': menu.disabled}"
          :disabled="menu.disabled"
          @click="changeView(key)"
        >
          {{ menu.name }}
        </el-menu-item>
      </el-menu>
    </div>
    <CentralMaintenance v-if="getVisibility('CentralMaintenance')" />
    <ConditionMonitoring v-if="getVisibility('ConditionMonitoring')" />
    <DataLoad v-if="getVisibility('DataLoad')" />
    <Utility v-if="getVisibility('Utility')" />

  </div>
</template>

<script>
  import CentralMaintenance from "./views/CentralMaintenance/CentralMaintenance";
  import ConditionMonitoring from "./views/ConditionMonitoring/ConditionMonitoring";
  import DataLoad from "./views/DataLoad/DataLoad";
  import Utility from "./views/Utility/Utility";

  export default {
    name: 'App',
    data() {
      return {
        activeIndex: '',
        menus: {
          CentralMaintenance: {
            name: "CENTRAL MAINTENANCE",
            isActive: true,
            routeName: "FailureReport"
          },
          ConditionMonitoring: {
            name: "CONDITION MONITORING",
            isActive: false,
            routeName: "ParameterDisplay"
          },
          DataLoad: {
            name: "DATA LOAD",
            isActive: false,
            routeName: "DataLoad"
          },
          Utility: {
            name: "UTILITY",
            isActive: false,
            routeName: "Utility"
          }
        }
      };
    },
    components: {
      CentralMaintenance,
      ConditionMonitoring,
      DataLoad,
      Utility
    },
    methods: {
      changeView(viewKey) {
        /**
         * 本函数用于
         */
        this.$router.push({ name: this.menus[viewKey].routeName  });

        Object.keys(this.menus).forEach((key, index) => {
          if (key === viewKey) {
            this.menus[key].isActive = true;
          } else {
            this.menus[key].isActive = false;
          }
        });
      },
      getVisibility(viewKey) {
        return this.menus[viewKey].isActive;
      },
    },
  }
</script>

<style>
  #app {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;

    background-color: rgb(46, 45, 45);

    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
  }

  .el-menu-item {
    background-image: linear-gradient(rgb(24, 24, 24), rgb(66, 66, 66));
    border: 1px solid rgb(85, 85, 85);
    height: 6vh;
    width: 25%;
    font-size: 16px;
  }

  .el-menu-item-active {
    background-image: linear-gradient(#363636, rgb(97, 97, 97));
    box-shadow: 5px 5px 30px 0px #17bef1;
    border: none;
    height: 6vh;
    width: 25%;
    font-size: 16px;
  }

  .el-table td {
    padding: 2vh 2vh;
    height: 20px;
    font-size: 15px;
    font-weight: 400;
    color: #ffffff;
    line-height: 30px;
    background-color: rgb(46, 45, 45);
  }

  .el-table--enable-row-hover .el-table__body tr:hover>td{
    background-color: #3b3b3c !important;
  }

  .el-table__body tr.current-row > td {
    background-color: #2b2b2be7 !important;
  }

  .el-footer {
    display: flex;
    justify-content: space-between; /* 左右两端对齐 */
    height: 20vh; /* 这里设置最大高度为100px，您可以根据需要进行调整 */
    overflow: auto; /* 如果内容超过最大高度，设置为自动滚动 */
  }

  .footer-btn {
    width: 22vh;
    height: 7vh;

    color: white;
    font-size: 16px;
    font-weight: bold;

    border: 1px solid rgb(111, 111, 111);
    border-radius: 0;

    box-shadow: 5px 5px 5px 0px rgba(42, 42, 42, 0.5);
    background-image: linear-gradient(rgb(33, 33, 33), rgb(128, 127, 127));
  }

  .footer-btn:hover {
    /* background-image: linear-gradient(rgb(128, 127, 127), rgb(33, 33, 33)); */
    box-shadow: 5px 5px 30px 0px #17bef1;
    border: 1px solid rgb(111, 111, 111);
    color: #17bef1
  }

  .footer-btn:active {
    /* box-shadow: none; 取消点击时的阴影效果 */
    box-shadow: 5px 5px 30px 0px #17bef1;
    color: #17bef1
  }


  .home-header-menu .el-menu--horizontal>.el-menu-item {
    height: 20px;
    line-height: 20px;
  }
  .home-header-menu .el-menu--horizontal>.el-submenu .el-submenu__title {
    height: 20px;
    line-height: 20px;
  }

</style>
