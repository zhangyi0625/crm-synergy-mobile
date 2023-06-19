"use strict";
const common_vendor = require("../../common/vendor.js"), components_BasicButton_prpos = require("./prpos.js");
const _sfc_main = /* @__PURE__ */ common_vendor.k({
  __name: "index",
  props: components_BasicButton_prpos.b,
  emits: ["click"],
  setup(__props, { emit: emits }) {
    const props = __props;
    const click = () => {
      emits("click");
    };
    return (_ctx, _cache) => {
      return {
        a: props.disabled,
        b: common_vendor.x(click)
      };
    };
  }
});
const Component = /* @__PURE__ */ common_vendor.q(_sfc_main, [["__scopeId", "data-v-c5014d92"], ["__file", "/Users/zhangyi/Desktop/vue/vue3/Vue3-Vite-TS-uniapp 移动端模版/src/components/BasicButton/index.vue"]]);
wx.createComponent(Component);
