"use strict";
Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
const common_vendor = require("./common/vendor.js"), state_modules_auth = require("./state/modules/auth.js"), state_index = require("./state/index.js"), router_index = require("./router/index.js"), uni_modules_vkUviewUi_index = require("./uni_modules/vk-uview-ui/index.js");
require("./utils/cache/index.js"), require("./utils/cache/storageCache.js"), require("./settings/encryptionSetting.js"), require("./utils/env.js"), require("./utils/cipher.js"), require("./utils/is.js"), require("./enums/cacheEnum.js"), require("./services/api/auth.js"), require("./utils/http/index.js"), require("./mock/index.js"), require("./mock/v1/index.js"), require("./mock/v1/modules/auth.js"), require("./mock/utils.js"), require("./enums/httpEnum.js"), require("./utils/http/checkStatus.js"), require("./utils/uniapi/prompt.js"), require("./router/guard.js"), require("./uni_modules/vk-uview-ui/libs/mixin/mixin.js"), require("./uni_modules/vk-uview-ui/libs/request/index.js"), require("./uni_modules/vk-uview-ui/libs/function/deepMerge.js"), require("./uni_modules/vk-uview-ui/libs/function/deepClone.js"), require("./uni_modules/vk-uview-ui/libs/function/test.js"), require("./uni_modules/vk-uview-ui/libs/function/queryParams.js"), require("./uni_modules/vk-uview-ui/libs/function/route.js"), require("./uni_modules/vk-uview-ui/libs/function/timeFormat.js"), require("./uni_modules/vk-uview-ui/libs/function/timeFrom.js"), require("./uni_modules/vk-uview-ui/libs/function/colorGradient.js"), require("./uni_modules/vk-uview-ui/libs/function/guid.js"), require("./uni_modules/vk-uview-ui/libs/function/color.js"), require("./uni_modules/vk-uview-ui/libs/function/type2icon.js"), require("./uni_modules/vk-uview-ui/libs/function/randomArray.js"), require("./uni_modules/vk-uview-ui/libs/function/addUnit.js"), require("./uni_modules/vk-uview-ui/libs/function/random.js"), require("./uni_modules/vk-uview-ui/libs/function/trim.js"), require("./uni_modules/vk-uview-ui/libs/function/toast.js"), require("./uni_modules/vk-uview-ui/libs/function/getParent.js"), require("./uni_modules/vk-uview-ui/libs/function/_parent.js"), require("./uni_modules/vk-uview-ui/libs/function/sys.js"), require("./uni_modules/vk-uview-ui/libs/function/debounce.js"), require("./uni_modules/vk-uview-ui/libs/function/throttle.js"), require("./uni_modules/vk-uview-ui/libs/function/addStyle.js"), require("./uni_modules/vk-uview-ui/libs/config/config.js"), require("./uni_modules/vk-uview-ui/libs/config/zIndex.js");
if (!Math) {
  "./pages/index/index.js";
  "./pages/collect/index.js";
  "./pages/profile/index.js";
  "./pages/login/index.js";
  "./pages/edit-info/index.js";
  "./pages/edit-info/password.js";
  "./pages/select-port/index.js";
  "./pages/notFound/404.js";
  "./pagesA/freight/index.js";
  "./pagesA/freight/freight-detail/index.js";
  "./pagesB/detail/index.js";
}
const _sfc_main = /* @__PURE__ */ common_vendor.k({
  __name: "App",
  setup(__props) {
    common_vendor.o(() => {
      console.log("App Launch");
    });
    common_vendor.l(() => {
      const authStore = state_modules_auth.u();
      authStore.initToken();
      console.log("App Show");
    });
    common_vendor.n(() => {
      console.log("App Hide");
    });
    return () => {
    };
  }
});
const App = /* @__PURE__ */ common_vendor.q(_sfc_main, [["__file", "/Users/zhangyi/Desktop/vue/vue3/Vue3-Vite-TS-uniapp freight- system/src/App.vue"]]);
function createApp() {
  const app = common_vendor.t(App);
  router_index.s(app);
  state_index.s(app);
  app.use(uni_modules_vkUviewUi_index.u);
  return {
    app
  };
}
createApp().app.mount("#app");
exports.createApp = createApp;
