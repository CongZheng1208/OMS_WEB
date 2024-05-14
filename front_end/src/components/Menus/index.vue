<template lang="">
  <div
  class='flex text-white bg-[rgb(66, 66, 66)] font-bold justify-between'
  >
    <div
    class='text-white text-center w-1/2 h-15 flex flex-col justify-center hover:cursor-pointer border-b border-r border-color'
      v-for="(menu, index) in menus"
      :class="menu.isActive ? 'menu-active' : ''"
      @click="changeView(index)"
    >
      {{ menu.name.toUpperCase() }}
    </div>
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
<style lang="scss" scoped>
.menu-active {
  @apply bg-[#888];
  box-shadow: inset 0px -5px 5px 0px #17bef1;
}

.border-color {
  border: 1px solid rgb(111, 111, 111);
}
</style>
