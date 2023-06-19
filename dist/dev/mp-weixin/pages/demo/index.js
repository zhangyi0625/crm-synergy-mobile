"use strict";
const common_vendor = require("../../common/vendor.js");
if (!Math) {
  (BasicButton + AppProvider)();
}
const BasicButton = () => "../../components/BasicButton/index.js";
const AppProvider = () => "../../components/AppProvider/inedx.js";
const _sfc_main = /* @__PURE__ */ common_vendor.k({
  __name: "index",
  setup(__props) {
    const router = common_vendor.T();
    const jumpList1 = () => {
      router.push({ path: "/pagesA/list/test1/index", query: { key: "word", page: "1", limit: "15" } });
    };
    return (_ctx, _cache) => {
      return {
        a: common_vendor.x(jumpList1)
      };
    };
  }
});
const MiniProgramPage = /* @__PURE__ */ common_vendor.q(_sfc_main, [["__scopeId", "data-v-54871354"], ["__file", "/Users/zhangyi/Desktop/vue/vue3/Vue3-Vite-TS-uniapp 移动端模版/src/pages/demo/index.vue"]]);
wx.createPage(MiniProgramPage);
