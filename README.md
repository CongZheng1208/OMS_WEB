# oms_web

> oms project

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report
```

For a detailed explanation on how things work, check out the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).



## Code Structure

api: 存放与后端API交互相关的文件，如封装的接口请求、拦截器等。

assets: 存放静态资源文件，如图片、字体图标等。

components: 存放项目中的组件，可以按功能或页面进行组织，每个组件包含自己的.vue文件和相关的样式、脚本或测试文件。

mixins: 存放全局mixins。

plugins: 存放一些第三方插件如axios、vuex、element-ui等。

router: 存放路由配置文件。可以把每一个路由配置拆分成一个单独的文件，并在index.js中进行引入。

store: 存放全局状态管理文件，可以按照模块拆分。

utils: 存放一些公用的工具方法，如日期格式化、计算函数等。

views: 存放页面级的组件, 对应每一个路由的组件。





