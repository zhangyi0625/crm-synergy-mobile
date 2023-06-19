"use strict";
const common_vendor = require("../../common/vendor.js"), utils_is = require("../../utils/is.js");
const _sfc_main = /* @__PURE__ */ common_vendor.k({
  __name: "index",
  props: {
    icon: {
      type: String
    },
    size: {
      type: [Number, String]
    },
    color: {
      type: String
    }
  },
  emits: ["click"],
  setup(__props, { emit }) {
    const props = __props;
    const iconSize = common_vendor.u(props.size ? `${props.size}rpx` : false);
    let style = common_vendor.G(() => {
      let ISize = common_vendor.w(iconSize);
      return common_vendor.h({ width: utils_is.a(ISize) ? "" : ISize, height: utils_is.a(ISize) ? "" : ISize }, { color: props.color });
    });
    const onClick = () => {
      emit("click");
    };
    return (_ctx, _cache) => {
      return {
        a: common_vendor.x(onClick),
        b: common_vendor.H(__props.icon),
        c: common_vendor.I(common_vendor.w(style))
      };
    };
  }
});
const Component = /* @__PURE__ */ common_vendor.q(_sfc_main, [["__scopeId", "data-v-f0e06e02"], ["__file", "/Users/zhangyi/Desktop/vue/vue3/Vue3-Vite-TS-uniapp 移动端模版/src/components/Iconify/index.vue"]]);
wx.createComponent(Component);
