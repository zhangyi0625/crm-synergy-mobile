"use strict";
const common_vendor = require("../../../common/vendor.js");
if (!Math) {
  BasicButton();
}
const BasicButton = () => "../../../components/BasicButton/index.js";
const _sfc_main = /* @__PURE__ */ common_vendor.k({
  __name: "index",
  setup(__props) {
    const router = common_vendor.T();
    const jumpDetail = () => {
      router.push("/pagesB/detail/index?page=1&limit=20");
    };
    return (_ctx, _cache) => {
      return {
        a: common_vendor.B(jumpDetail)
      };
    };
  }
});
const MiniProgramPage = /* @__PURE__ */ common_vendor.q(_sfc_main, [["__file", "/Users/zhangyi/Desktop/vue/vue3/Vue3-Vite-TS-uniapp freight- system/src/pagesA/list/test2/index.vue"]]);
wx.createPage(MiniProgramPage);
