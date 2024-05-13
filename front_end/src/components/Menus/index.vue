<template lang="">
  <el-menu
    mode="horizontal"
    background-color="rgb(66, 66, 66)"
    text-color="#fff"
    active-text-color="#17bef1"
    style="font-weight: bold"
  >
    <el-menu-item
      v-for="(menu, index) in menus"
      :key="index"
      :class="menu.isActive ? 'el-menu-item-active' : 'el-menu-item'"
      :style="{ width: menuItemWidth}"
      @click="changeView(index)"
    >
      {{ menu.name.toUpperCase() }}
    </el-menu-item>
  </el-menu>
</template>
<script lang="ts">
export default {
  name: 'Menus',
  props: ['menus'],
  computed: {
    /**
     * 动态调整menu item的宽度
     */
    menuItemWidth() {
      const width = this.menus.length
      return `${100 / width}%`
    }
  },
  methods: {
    /**
     * 本函数用于触发对一级菜单项目的点击回调事件，改变展示页面的路由
     */
    async changeView(viewKey: string) {
      console.log('[ viewKey ] >', viewKey)
      console.log('[ this.$route.path ] >', this.$route.path)
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
  }
}
</script>
<style lang="">

</style>
