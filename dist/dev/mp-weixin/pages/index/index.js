"use strict";
const common_vendor = require("../../common/vendor.js"), enums_platformEnum = require("../../enums/platformEnum.js"), utils_platform = require("../../utils/platform.js"), utils_env = require("../../utils/env.js");
if (!Math) {
  (BasicButton + Iconify + AppProvider)();
}
const BasicButton = () => "../../components/BasicButton/index.js";
const AppProvider = () => "../../components/AppProvider/inedx.js";
const Iconify = () => "../../components/Iconify/index.js";
const _sfc_main = /* @__PURE__ */ common_vendor.k({
  __name: "index",
  setup(__props) {
    const appTitle = utils_env.a("VITE_APP_TITLE");
    const title = common_vendor.u(appTitle);
    const platform = enums_platformEnum.C;
    const isVue3 = utils_platform.j(enums_platformEnum.P.VUE3);
    const router = common_vendor.T();
    const handleGetStarted = () => {
      router.pushTab({ path: "/pages/demo/index" });
    };
    return (_ctx, _cache) => {
      return {
        a: common_vendor.v(title.value),
        b: common_vendor.v(common_vendor.w(isVue3)),
        c: common_vendor.v(common_vendor.w(platform)),
        d: common_vendor.x(handleGetStarted),
        e: common_vendor.y({
          icon: "i-ph-anchor-simple-thin",
          size: "65"
        }),
        f: common_vendor.y({
          icon: "i-system-uicons-book-text"
        }),
        g: common_vendor.y({
          icon: "i-system-uicons-battery-full",
          size: "65"
        }),
        h: common_vendor.y({
          icon: "i-system-uicons-box-add",
          size: 65
        }),
        i: common_vendor.y({
          icon: "i-system-uicons-bell-snooze",
          color: "red",
          size: 65
        })
      };
    };
  }
});
const MiniProgramPage = /* @__PURE__ */ common_vendor.q(_sfc_main, [["__file", "/Users/zhangyi/Desktop/vue/vue3/Vue3-Vite-TS-uniapp 移动端模版/src/pages/index/index.vue"]]);
wx.createPage(MiniProgramPage);
