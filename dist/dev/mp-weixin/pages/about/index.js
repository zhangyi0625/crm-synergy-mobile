"use strict";
const common_vendor = require("../../common/vendor.js"), state_modules_auth = require("../../state/modules/auth.js");
require("../../utils/cache/index.js"), require("../../utils/cache/storageCache.js"), require("../../settings/encryptionSetting.js"), require("../../utils/env.js"), require("../../utils/cipher.js"), require("../../utils/is.js"), require("../../enums/cacheEnum.js"), require("../../services/api/auth.js"), require("../../utils/http/index.js"), require("../../mock/index.js"), require("../../mock/v1/index.js"), require("../../mock/v1/modules/auth.js"), require("../../mock/utils.js"), require("../../enums/httpEnum.js"), require("../../utils/http/checkStatus.js"), require("../../utils/uniapi/prompt.js");
if (!Math) {
  (BasicButton + AppProvider)();
}
const BasicButton = () => "../../components/BasicButton/index.js";
const AppProvider = () => "../../components/AppProvider/inedx.js";
const _sfc_main = /* @__PURE__ */ common_vendor.k({
  __name: "index",
  setup(__props) {
    common_vendor.z(() => {
      console.log("about load");
    });
    const authStore = state_modules_auth.u();
    const isLogin = common_vendor.u(false);
    const router = common_vendor.T();
    common_vendor.l(() => {
      isLogin.value = authStore.isLogin;
    });
    const handleJump = (url) => {
      router.push(url);
    };
    const handleLoginOut = () => {
      authStore.loginOut().then(() => {
        isLogin.value = false;
      });
    };
    return (_ctx, _cache) => {
      return common_vendor.B({
        a: common_vendor.v(isLogin.value ? "测试" : "未登入"),
        b: common_vendor.x(($event) => handleJump("/pages/log/index?id=4345&title=log&word=关键词")),
        c: isLogin.value
      }, isLogin.value ? {
        d: common_vendor.x(handleLoginOut)
      } : {
        e: common_vendor.x(($event) => handleJump("/pages/login/index"))
      });
    };
  }
});
const MiniProgramPage = /* @__PURE__ */ common_vendor.q(_sfc_main, [["__scopeId", "data-v-6b4e7e2d"], ["__file", "/Users/zhangyi/Desktop/vue/vue3/Vue3-Vite-TS-uniapp 移动端模版/src/pages/about/index.vue"]]);
wx.createPage(MiniProgramPage);
