"use strict";
const common_vendor = require("../../common/vendor.js");
if (!Array) {
  const _easycom_u_button2 = common_vendor.z("u-button");
  _easycom_u_button2();
}
const _easycom_u_button = () => "../../uni_modules/vk-uview-ui/components/u-button/u-button.js";
if (!Math) {
  (BasicButton + _easycom_u_button + AppProvider)();
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
        a: common_vendor.x(jumpList1),
        b: common_vendor.y({
          type: "primary"
        }),
        c: common_vendor.y({
          type: "success"
        }),
        d: common_vendor.y({
          type: "info"
        })
      };
    };
  }
});
const MiniProgramPage = /* @__PURE__ */ common_vendor.q(_sfc_main, [["__scopeId", "data-v-54871354"], ["__file", "/Users/zhangyi/Desktop/vue/vue3/Vue3-Vite-TS-uniapp 移动端模版/src/pages/demo/index.vue"]]);
wx.createPage(MiniProgramPage);
