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



## Project Structure


``` bash
├──font_end						# 前端相关
	├── build                      # 构建相关
	├── config                     # 项目配置
	├── node_modules               # 构建配置
	├── src                        # 源代码
	│   ├── api                    # 存放与后端API交互相关的文件，如封装的接口请求、拦截器等。
	│   ├── assets                 # 存放静态资源文件，如图片、字体图标等。
	│   ├── components             # 存放项目中的组件，可以按功能或页面进行组织，每个组件包含自己的.vue文件和相关的样式、脚本或测试文件。
	│   ├── mixins                 # 存放全局mixins。
	│   ├── plugins                # 存放一些第三方插件如axios、vuex、element-ui等。
	│   ├── router                 # 路由
	│   ├── store                  # 全局 store管理
	│   ├── styles                 # 全局样式
	│   ├── utils                  # 全局公用方法
	│   ├── views                  # views 所有页面
	│   ├── App.vue                # 入口页面
	│   └── main.js                # 入口文件 加载组件 初始化等
	├── tests                      # 测试
	├── .env.xxx                   # 环境变量配置
	├── .eslintrc.js               # eslint 配置项
	├── .babelrc                   # babel-loader 配置
	├── vue.config.js              # vue-cli 配置
	├── postcss.config.js          # postcss 配置
	└── package.json               # package.json
├──back_end						# 后端相关
	├── php                      # php脚本
```


api: 存放与后端API交互相关的文件，如封装的接口请求、拦截器等。

assets: 存放静态资源文件，如图片、字体图标等。

components: 存放项目中的组件，可以按功能或页面进行组织，每个组件包含自己的.vue文件和相关的样式、脚本或测试文件。

mixins: 存放全局mixins。

plugins: 存放一些第三方插件如axios、vuex、element-ui等。

router: 存放路由配置文件。可以把每一个路由配置拆分成一个单独的文件，并在index.js中进行引入。

store: 存放全局状态管理文件，可以按照模块拆分。

styles: 存放全局样式文件。

utils: 存放一些公用的工具方法，如日期格式化、计算函数等。

views: 存放页面级的组件, 对应每一个路由的组件。



ToDoList： （2024）

1.协议方面：全局实现Service的HTTP请求封装API

2.业务方面：
  启动测试部分，tcp&http通信，多用户tcp连接池，交互测试....
  参数显示部分，save按钮element重实现
  故障报告部分，后续业务

3.全局部分：
  实现vuex的store全局变量







