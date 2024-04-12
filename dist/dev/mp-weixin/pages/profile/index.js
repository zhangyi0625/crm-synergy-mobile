"use strict";
const common_vendor = require("../../common/vendor.js"), state_modules_auth = require("../../state/modules/auth.js"), enums_routerEnum = require("../../enums/routerEnum.js");
require("../../utils/cache/index.js"), require("../../utils/cache/storageCache.js"), require("../../settings/encryptionSetting.js"), require("../../utils/env.js"), require("../../utils/cipher.js"), require("../../utils/is.js"), require("../../enums/cacheEnum.js"), require("../../services/api/auth.js"), require("../../utils/http/index.js"), require("../../mock/index.js"), require("../../mock/v1/index.js"), require("../../mock/v1/modules/auth.js"), require("../../mock/utils.js"), require("../../enums/httpEnum.js"), require("../../utils/http/checkStatus.js"), require("../../utils/uniapi/prompt.js");
const _sfc_main = /* @__PURE__ */ common_vendor.k({
  __name: "index",
  setup(__props) {
    common_vendor.H(() => {
      console.log("about load");
    });
    const authStore = state_modules_auth.u();
    const isLogin = common_vendor.v(false);
    const router = common_vendor.T();
    common_vendor.l(() => {
      isLogin.value = authStore.isLogin;
    });
    const editAvatar = () => {
      if (!isLogin.value) {
        common_vendor.i.showModal({
          title: "",
          content: "登录即可修改头像，立刻去登录",
          success: function(res) {
            if (res.confirm) {
              router.push(enums_routerEnum.L);
            }
          }
        });
      } else {
        common_vendor.i.chooseImage({
          count: 1,
          sizeType: ["original", "compressed"],
          //可以指定是原图还是压缩图，默认二者都有
          sourceType: ["album", "camera"],
          //从相册选择
          success: function(res) {
            console.log(JSON.stringify(res.tempFilePaths));
          }
        });
      }
    };
    const handleJump = () => {
      router.push("/pages/edit-info/password");
    };
    const handleLoginOut = () => {
      authStore.loginOut().then(() => {
        isLogin.value = false;
      });
      router.push("LOGIN_PAGE");
    };
    const handleLogin = () => {
      !isLogin.value && router.push(enums_routerEnum.L);
    };
    return (_ctx, _cache) => {
      return {
        a: common_vendor.F(!isLogin.value ? "登录/注册" : "13120760853"),
        b: common_vendor.B(handleLogin),
        c: common_vendor.B(editAvatar),
        d: common_vendor.B(handleJump),
        e: common_vendor.B(handleLoginOut)
      };
    };
  }
});
const MiniProgramPage = /* @__PURE__ */ common_vendor.q(_sfc_main, [["__scopeId", "data-v-f97f9319"], ["__file", "/Users/zhangyi/Desktop/vue/vue3/Vue3-Vite-TS-uniapp freight- system/src/pages/profile/index.vue"]]);
wx.createPage(MiniProgramPage);
