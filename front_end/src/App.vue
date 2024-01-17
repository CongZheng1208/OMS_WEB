<template>
  <div id="app">
    <div class="homeHeader-menus-bg" style="margin-top: 0px">
      <el-menu
        mode="horizontal"
        background-color="rgb(66, 66, 66)"
        text-color="#fff"
        active-text-color="#17bef1"
        style="font-weight: bold; font-size: 20px"
      >
        <el-menu-item
          v-for="(menu, key) in menus"
          :key="key"
          :index="key"
          :class="{
            'el-menu-item-active': menu.isActive,
            'el-menu-item': !menu.isActive,
            disabled: menu.disabled,
          }"
          :disabled="menu.disabled"
          @click="changeView(key)"
        >
          {{ menu.name }}
        </el-menu-item>
      </el-menu>
    </div>

    <router-view />
  </div>
</template>

<script>
export default {
  name: "App",
  data() {
    return {
      activeIndex: "",
      menus: {
        CentralMaintenance: {
          name: "CENTRAL MAINTENANCE",
          isActive: true,
          routeName: "FailureReport",
        },
        ConditionMonitoring: {
          name: "CONDITION MONITORING",
          isActive: false,
          routeName: "ParameterDisplay",
        },
        DataLoad: {
          name: "DATA LOAD",
          isActive: false,
          routeName: "DataLoad",
        },
        Utility: {
          name: "UTILITY",
          isActive: false,
          routeName: "Utility",
        },
      },
    };
  },
  methods: {
    /**
     * 本函数用于触发对一级菜单项目的点击回调事件，改变展示页面的路由
     * @param {viewKey} string - menus数据的name属性
     */
    async changeView(viewKey) {
      // 更新页面路由
      if (!this.$route.path.includes(viewKey)) {
        await this.$router.push({ name: this.menus[viewKey].routeName });
      }
      // 遍历 menus 对象，更新 isActive 属性，改变菜单被点击项目的样式
      Object.keys(this.menus).forEach((key, index) => {
        if (key === viewKey) {
          this.menus[key].isActive = true;
        } else {
          this.menus[key].isActive = false;
        }
      });
    },
  },
};
</script>

<style>
@import "styles/A661Style.css";
</style>
