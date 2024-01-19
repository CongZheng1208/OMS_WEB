<template>
  <div class="container-fluid  full-height">
    <el-menu
      :default-active="activeIndex"
      mode="horizontal"
      background-color="rgb(66, 66, 66)"
      text-color="#fff"
      active-text-color="#17bef1"
      style="margin-top: 1vh; font-weight: bold;"
    >
      <el-menu-item
        v-for="(menu, index) in menus"
        :key="index"
        :class="{
          'el-menu-demo-active': menu.isActive,
          'el-menu-demo': !menu.isActive,
        }"
        @click="changeSubView(index)"
      >
        {{ menu.name.toUpperCase() }}
      </el-menu-item>
    </el-menu>

    <router-view/>

  </div>
</template>

<script>
  export default {
    name: 'CentralMaintenance',
    data() {
      return {
        activeIndex: '',
        menus: [
          {
            name: "failure report",
            isActive: true,
            routeName: "FailureReport"
          },
          {
            name: "ground test",
            isActive: false,
            routeName: "GroundTestDefaultPage"
          },
          {
            name: "configuration",
            isActive: false,
            routeName: "Configuration"
          },
          {
            name: "NVM Data",
            isActive: false,
            routeName: "NVMData"
          },
          {
            name: "Extended Functions",
            isActive: false,
            routeName: "ExtendedFunctions"
          },
        ],
      };
    },
    methods: {
      /**
       * 本函数用于触发对一级菜单项目的点击回调事件，改变展示页面的路由
       * @param {viewKey} string - menus数据的name属性
       */
      async changeSubView(viewKey) {
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
      }
    },
  }

</script>

<style scoped>
  .el-menu-demo {
    background-image: linear-gradient(rgb(24, 24, 24), rgb(66, 66, 66));
    border: 1px solid rgb(85, 85, 85);
    width: 20%
  }
  .el-menu-demo-active {
    background-image: linear-gradient(#363636, rgb(97, 97, 97));
    box-shadow: 5px 5px 30px 0px #17bef1;
    border: none;
    width: 20%
  }

  .container-fluid.full-height {
    height: 62vh;
  }
</style>

