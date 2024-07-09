<template>
  <div class='flex text-white bg-[rgb(66, 66, 66)] font-bold justify-between'>
    <div class='text-white text-l text-center h-12 flex flex-col justify-center hover:cursor-pointer border-b border-r border-color'
         v-for="(menu, index) in menus"
         :class="menu.isActive ? 'el-menu-item-active' : 'el-menu-item'"
         :style="{ width: menuItemWidth }"
         @click="changeView(index)"> {{ menu.name.toUpperCase() }} </div>
  </div>
</template>
<script lang="ts">
export default {
  name: 'Menus',
  props: ['menus'],

  methods: {
    /**
     * 本函数用于触发对一级菜单项目的点击回调事件，改变展示页面的路由
     */
    async changeView(viewKey: number) {
      const targetRouteName = this.menus[viewKey].routeName.toLowerCase();
      if (this.$route.name && this.$route.name.toLowerCase() === targetRouteName) {
        return; // 路由已经激活，不需要切换
      }

      await this.$router.push({ name: this.menus[viewKey].routeName });
      // 遍历 menus 对象，更新 isActive 属性，改变菜单被点击项目的样式
      this.menus.forEach((menu: { isActive: boolean; }, index: number) => {
        menu.isActive = (index === viewKey);
      });
    },
  },
  computed: {
    /**
     * 动态调整menu item的宽度
     */
    menuItemWidth() {
      const width = this.menus.length
      return `${100 / width}%`
    }
  },

  watch: {
    // 监听路由变化，改变菜单被点击项目的样式
    $route(to, from) {

      const pathList = to.matched.map((item, idx) => {
        const pathName = item.name;
        return pathName
      })
      console.log("pathList", pathList)
      this.menus.forEach((menu) => {
        if (pathList.includes(menu.realName)) {
          menu.isActive = true;
        } else {
          menu.isActive = false;
        }
      })
    }
  }
}
</script>
<style lang="scss"
       scoped>
      .border-color {
        border: 1px solid rgb(111, 111, 111);
      }
    </style>
