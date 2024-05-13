// vite.config.ts
import { defineConfig } from "vite";
import { createVuePlugin } from "vite-plugin-vue2";
import UnoCSS from "unocss/vite";

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    host: true,
    proxy: {
      // 代理 "/api" 前缀的请求到 "http://localhost:4000"
      "/api": {
        target: "http://172.18.25.149:3000",
        changeOrigin: true, // 是否改变源
        rewrite: (path) => path.replace(/^\/api/, ""),
      },
      // 可以添加更多的代理规则
    },
  },
  resolve: {
    alias: {
      "@": "/src",
      "/@": "/src",
      vue: "vue/dist/vue.esm.js",
    },
  },
  plugins: [
    createVuePlugin(),
    UnoCSS({
      configFile: "uno.config.ts",
    }),
  ],
  build: {
    minify: "terser",
    terserOptions: {
      compress: {
        // 生产环境时移除console
        drop_console: true,
        drop_debugger: true,
      },
    },
    target: "es6",
  },
  css: {
    preprocessorOptions: {
      scss: {
        // 配置 nutui 全局 scss 变量
        additionalData: ``,
      },
    },
  },
});
