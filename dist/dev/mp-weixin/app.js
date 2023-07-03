"use strict";
Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
const common_vendor = require("./common/vendor.js"), state_modules_auth = require("./state/modules/auth.js"), state_index = require("./state/index.js"), router_index = require("./router/index.js");
require("./utils/cache/index.js"), require("./utils/cache/storageCache.js"), require("./settings/encryptionSetting.js"), require("./utils/env.js"), require("./enums/platformEnum.js"), require("./utils/cipher.js"), require("./utils/is.js"), require("./enums/cacheEnum.js"), require("./services/api/auth.js"), require("./utils/http/index.js"), require("./mock/index.js"), require("./mock/v1/index.js"), require("./mock/v1/modules/auth.js"), require("./mock/utils.js"), require("./enums/httpEnum.js"), require("./utils/http/checkStatus.js"), require("./utils/uniapi/prompt.js"), require("./router/guard.js");
if (!Math) {
  "./pages/index/index.js";
  "./pages/demo/index.js";
  "./pages/about/index.js";
  "./pages/login/index.js";
  "./pages/log/index.js";
  "./pages/notFound/404.js";
  "./pagesA/list/test1/index.js";
  "./pagesA/list/test2/index.js";
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
const App = /* @__PURE__ */ common_vendor.q(_sfc_main, [["__file", "/Users/zhangyi/Desktop/vue/vue3/Vue3-Vite-TS-uniapp 移动端模版/src/App.vue"]]);
function createApp() {
  const app = common_vendor.t(App);
  router_index.s(app);
  state_index.s(app);
  return {
    app
  };
}
createApp().app.mount("#app");
exports.createApp = createApp;
