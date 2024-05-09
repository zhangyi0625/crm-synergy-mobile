"use strict";
const common_vendor = require("../../common/vendor.js");
if (!Math) {
  BasicButton();
}
const BasicButton = () => "../../components/BasicButton/index.js";
const _sfc_main = /* @__PURE__ */ common_vendor.k({
  __name: "404",
  setup(__props) {
    const go = common_vendor.w("");
    const router = common_vendor.T();
    const redirect = common_vendor.w("");
    common_vendor.z((query) => {
      go.value = (query == null ? void 0 : query.go) || "";
      redirect.value = (query == null ? void 0 : query.redirect) || "";
    });
    const backHome = () => {
      router.pushTab(redirect.value);
    };
    return (_ctx, _cache) => {
      return {
        a: common_vendor.H(go.value),
        b: common_vendor.D(backHome)
      };
    };
  }
});
const MiniProgramPage = /* @__PURE__ */ common_vendor.q(_sfc_main, [["__file", "/Users/zhangyi/Desktop/vue/vue3/Vue3-Vite-TS-uniapp freight- system/src/pages/notFound/404.vue"]]);
wx.createPage(MiniProgramPage);
