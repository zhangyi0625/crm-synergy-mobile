"use strict";
const common_vendor = require("../../common/vendor.js"), state_modules_auth = require("../../state/modules/auth.js"), utils_uniapi_prompt = require("../../utils/uniapi/prompt.js"), services_api_auth = require("../../services/api/auth.js");
require("../../utils/cache/index.js"), require("../../utils/cache/storageCache.js"), require("../../settings/encryptionSetting.js"), require("../../utils/env.js"), require("../../utils/cipher.js"), require("../../utils/is.js"), require("../../enums/cacheEnum.js"), require("../../utils/http/index.js"), require("../../mock/index.js"), require("../../mock/v1/index.js"), require("../../mock/v1/modules/auth.js"), require("../../mock/utils.js"), require("../../enums/httpEnum.js"), require("../../utils/http/checkStatus.js");
const _sfc_main = /* @__PURE__ */ common_vendor.k({
  __name: "index",
  setup(__props) {
    const pageQuery = common_vendor.u(void 0);
    common_vendor.z((query) => {
      pageQuery.value = query;
    });
    const router = common_vendor.T();
    const form = common_vendor.C({
      email: "uni-app@test.com",
      password: "Vue3_Ts_Vite"
    });
    const authStore = state_modules_auth.u();
    const { send: sendLogin } = common_vendor.D(services_api_auth.a, { immediate: false });
    const submit = (e) => {
      sendLogin(e.detail.value).then((res) => {
        utils_uniapi_prompt.T("登录成功", { duration: 1500 });
        authStore.setToken(res.token);
        setTimeout(() => {
          var _a, _b;
          if ((_a = common_vendor.w(pageQuery)) == null ? void 0 : _a.redirect) {
            const params = common_vendor.F(common_vendor.w(pageQuery), ["redirect", "tabBar"]);
            if ((_b = common_vendor.w(pageQuery)) == null ? void 0 : _b.tabBar) {
              router.replaceAll({ name: common_vendor.w(pageQuery).redirect, params });
            } else {
              router.replace({ name: common_vendor.w(pageQuery).redirect, params });
            }
          } else {
            router.back();
          }
        }, 1500);
      });
    };
    return (_ctx, _cache) => {
      return {
        a: form.email,
        b: form.password,
        c: common_vendor.x(submit)
      };
    };
  }
});
const MiniProgramPage = /* @__PURE__ */ common_vendor.q(_sfc_main, [["__scopeId", "data-v-45258083"], ["__file", "/Users/zhangyi/Desktop/vue/vue3/Vue3-Vite-TS-uniapp 移动端模版/src/pages/login/index.vue"]]);
wx.createPage(MiniProgramPage);
