<template>
  <div class="container-fluid">

    <el-menu
      :default-active="activeIndex"
      mode="horizontal"
      background-color="rgb(66, 66, 66)"
      text-color="#fff"
      active-text-color="#17bef1"
      style="margin-top: 1vh; font-weight: bold;"
    >
      <el-menu-item
        v-for="(menu, key) in menus"
        :key="key"
        :index="key"
        :class="{'el-menu-demo-active': menu.isActive, 'el-menu-demo': !menu.isActive, 'disabled': menu.disabled}"
        :disabled="menu.disabled"
        @click="navigateToRoute(key)"
      >
        {{ menu.name.toUpperCase() }}
      </el-menu-item>
    </el-menu>
    <router-view/>

  </div>
</template>

<script>
  export default {
    name: 'ConditionMon',
    data() {
      return {
        activeIndex: '',
        menus: {
          paramDisplay: {
            name: "parameter display",
            isActive: true,
            routeName: "paramDisplay"
          },
          paramGrapDisplay: {
            name: "parameter recording",
            isActive: false,
            routeName: "paramGrapDisplay"
          },
          eventMonitoring: {
            name: "event monitoring",
            isActive: false,
            routeName: "eventMonitoring"
          },
        },
      };
    },
    methods: {
      async navigateToRoute(key) {
        const routeName = key

        if (this.$route.name !== routeName) {
          await this.$router.push({ name: routeName });
        }

        // 遍历 menus 对象，更新 isActive 属性
        for (const menuKey in this.menus) {
          if (menuKey === key) {
            this.$set(this.menus[menuKey], 'isActive', true); // 使用 $set 方法更新响应式数据
          } else {
            this.$set(this.menus[menuKey], 'isActive', false);
          }
        }
      }
    },
  }

</script>

<style scoped>
  .el-menu-demo {
    background-image: linear-gradient(rgb(24, 24, 24), rgb(66, 66, 66));
    border: 1px solid rgb(85, 85, 85);
    width: 33.3%
  }
  .el-menu-demo-active {
    background-image: linear-gradient(#363636, rgb(97, 97, 97));
    box-shadow: 5px 5px 30px 0px #17bef1;
    border: none;
    width: 33.3%
  }
</style>

