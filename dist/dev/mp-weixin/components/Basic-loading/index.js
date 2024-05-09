"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = /* @__PURE__ */ common_vendor.k({
  __name: "index",
  emits: ["handleClick"],
  setup(__props, { emit }) {
    const props = __props;
    common_vendor.N((_ctx) => ({
      "0374ca5e": common_vendor.C(comColor)
    }));
    const handleClick = () => {
      emit("handleClick");
    };
    const comColor = common_vendor.K(() => props.color);
    return (_ctx, _cache) => {
      return common_vendor.B({
        a: props.iconType === "annulus"
      }, props.iconType === "annulus" ? {
        b: props.color
      } : {}, {
        c: props.iconType === "triangle"
      }, props.iconType === "triangle" ? {} : {}, {
        d: props.iconType === "sword"
      }, props.iconType === "sword" ? {} : {}, {
        e: common_vendor.L({
          "z-index": props.zIndex,
          "opacity": props.maskOpacity,
          "position": props.position
        }),
        f: common_vendor.L(_ctx.__cssVars()),
        g: common_vendor.D(handleClick)
      });
    };
  }
});
const Component = /* @__PURE__ */ common_vendor.q(_sfc_main, [["__scopeId", "data-v-fd642f09"], ["__file", "/Users/zhangyi/Desktop/vue/vue3/Vue3-Vite-TS-uniapp freight- system/src/components/Basic-loading/index.vue"]]);
wx.createComponent(Component);
