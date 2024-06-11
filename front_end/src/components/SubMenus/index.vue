<template>
  <div class='flex text-white bg-[rgb(66, 66, 66)] font-bold justify-between'>
    <div class='text-white text-xl text-center w-1/2 h-13 flex flex-col justify-center hover:cursor-pointer border-b border-r border-color'
         v-for="(menu, index) in menus"
         :class="menu.isActive ? 'el-menu-item-active' : 'el-menu-item'"
         @click="changeView(index)"> {{ menu.name.toUpperCase() }} </div>
  </div>
</template>
<script lang="ts">
export default {
  name: 'SubMenus',
  props: ['menus'],

  methods: {
    /**
     * 本函数用于触发对一级菜单项目的点击回调事件，改变展示页面的路由
     */
    async changeView(viewKey: number) {
      // 更新页面路由

      if (!this.$route.path.toLowerCase().includes(this.menus[viewKey].routeName.toLowerCase())) {
        await this.$router.push({ name: this.menus[viewKey].routeName });
      } else {
      }
      // 遍历 menus 对象，更新 isActive 属性，改变菜单被点击项目的样式
      this.menus.forEach((menu: { isActive: boolean; }, index: number) => {
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
<style lang="scss"
       scoped>
      .border-color {
        border: 1px solid rgb(111, 111, 111);
      }
    </style>
