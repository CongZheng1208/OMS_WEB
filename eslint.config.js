// eslint.config.js
import antfu from "@antfu/eslint-config";

export default antfu({
  stylistic: {
    indent: "tab" // 4, or 'tab'
  },
  unocss: true,
  svelte: false,
  vue: true
});
