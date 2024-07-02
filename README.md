# oms_web

> oms project

## Build Setup

```bash
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

## Project Structure

```bash
├── README.md                    # 说明文档
├── back_end                     # 后端代码文件夹
│   └── php
│       ├── centralMaintenance   # 中央维护模块
│       ├── conditionMonitoring  # 状态监控模块
│       ├── config              # 配置文件夹
│       ├── files               # 文件处理模块
│       └── utils               # 工具类
└── front_end                    # 前端代码文件夹
    ├── LICENSE                 # 许可证文件
    ├── build                   # 构建输出目录
    ├── config                  # 配置文件夹
    │   ├── dev.env.js          # 开发环境配置文件
    │   ├── index            # 入口配置文件
    │   └── prod.env.js         # 生产环境配置文件
    ├── index.html              # 主 HTML 文件
    ├── node_modules            # Node.js 模块依赖文件夹
    ├── package-lock.json       # 包版本锁定文件
    ├── package.json            # 项目依赖信息文件
    ├── pnpm-lock.yaml          # pnpm 锁定文件
    ├── src                     # 源代码文件夹
    │   ├── App.vue             # 主程序组件
    │   ├── api                 # API 相关代码
    │   ├── assets              # 静态资源文件夹
    │   ├── components          # 组件文件夹
    │   ├── globals             # 全局配置文件
    │   ├── main.js             # 主程序入口文件
    │   ├── mixins              # 混入文件夹
    │   ├── plugins             # 插件文件夹
    │   ├── router              # 路由配置文件夹
    │   ├── services            # 服务文件夹
    │   ├── store               # 状态管理文件夹
    │   ├── styles              # 样式文件夹
    │   ├── utils               # 工具类
    │   └── views               # 视图文件夹
    ├── static                  # 静态资源文件夹
    └── vue.config.js           # Vue 配置文件
```

api: 存放与后端 API 交互相关的文件，如封装的接口请求、拦截器等。

assets: 存放静态资源文件，如图片、字体图标等。

components: 存放项目中的组件，可以按功能或页面进行组织，每个组件包含自己的.vue 文件和相关的样式、脚本或测试文件。

mixins: 存放全局 mixins。

plugins: 存放一些第三方插件如 axios、vuex、element-ui 等。

router: 存放路由配置文件。可以把每一个路由配置拆分成一个单独的文件，并在 index 中进行引入。

store: 存放全局状态管理文件，可以按照模块拆分。

styles: 存放全局样式文件。

utils: 存放一些公用的工具方法，如日期格式化、计算函数等。

views: 存放页面级的组件, 对应每一个路由的组件。
