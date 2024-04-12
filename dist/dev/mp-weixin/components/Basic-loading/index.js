"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = /* @__PURE__ */ common_vendor.k({
  __name: "index",
  emits: ["handleClick"],
  setup(__props, { emit }) {
    const props = __props;
    common_vendor.N((_ctx) => ({
      "0374ca5e": common_vendor.z(comColor)
    }));
    const handleClick = () => {
      emit("handleClick");
    };
    const comColor = common_vendor.K(() => props.color);
    return (_ctx, _cache) => {
      return common_vendor.y({
        a: props.iconType === "annulus"
      }, props.iconType === "annulus" ? {
        b: props.color
      } : {}, {
        c: props.iconType === "triangle"
      }, props.iconType === "triangle" ? {} : {}, {
        d: common_vendor.M({
          "z-index": props.zIndex,
          opacity: props.maskOpacity,
          position: props.position
        }),
        e: common_vendor.M(_ctx.__cssVars()),
        f: common_vendor.B(handleClick)
      });
    };
  }
});
const Component = /* @__PURE__ */ common_vendor.q(_sfc_main, [["__scopeId", "data-v-fd642f09"], ["__file", "/Users/zhangyi/Desktop/vue/vue3/Vue3-Vite-TS-uniapp freight- system/src/components/Basic-loading/index.vue"]]);
wx.createComponent(Component);
