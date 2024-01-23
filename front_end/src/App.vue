<template>
  <div id="app">
    <el-menu
      mode="horizontal"
      background-color="rgb(66, 66, 66)"
      text-color="#fff"
      active-text-color="#17bef1"
      style="font-weight: bold; font-size: 20px"
    >
      <el-menu-item
        v-for="(menu, index) in menus"
        :key="index"
        :class="menu.isActive ? 'el-menu-item-active' : 'el-menu-item'"
        @click="changeView(index)"
      >
        {{ menu.name }}
      </el-menu-item>
    </el-menu>

    <router-view />
  </div>
</template>

<script>
export default {
  name: "App",
  data() {
    return {
      menus: [
        {
          name: "CENTRAL MAINTENANCE",
          isActive: true,
          routeName: "FailureList",
        },
        {
          name: "CONDITION MONITORING",
          isActive: false,
          routeName: "ParameterSelect",
        },
        {
          name: "DATA LOAD",
          isActive: false,
          routeName: "DataLoad",
        },
        {
          name: "UTILITY",
          isActive: false,
          routeName: "Utility",
        },
      ],
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
      this.menus.forEach((menu, index) => {
        if (index === viewKey) {
          menu.isActive = true;
        } else {
          menu.isActive = false;
        }
      });
    },
  },
};
</script>

<style>
@import "styles/A661Style.css";
</style>
