"use strict";
const common_vendor = require("../../common/vendor.js"), state_modules_auth = require("../../state/modules/auth.js"), utils_uniapi_prompt = require("../../utils/uniapi/prompt.js"), services_api_auth = require("../../services/api/auth.js");
require("../../utils/cache/index.js"), require("../../utils/cache/storageCache.js"), require("../../settings/encryptionSetting.js"), require("../../utils/env.js"), require("../../utils/cipher.js"), require("../../utils/is.js"), require("../../enums/cacheEnum.js"), require("../../utils/http/index.js"), require("../../mock/index.js"), require("../../mock/v1/index.js"), require("../../mock/v1/modules/auth.js"), require("../../mock/utils.js"), require("../../enums/httpEnum.js"), require("../../utils/http/checkStatus.js");
if (!Math) {
  DragCheck();
}
const DragCheck = () => "../../components/Drag-check/index.js";
const _sfc_main = /* @__PURE__ */ common_vendor.k({
  __name: "index",
  setup(__props) {
    const pageQuery = common_vendor.v(void 0);
    common_vendor.H((query) => {
      pageQuery.value = query;
    });
    const router = common_vendor.T();
    const authStore = state_modules_auth.u();
    const { send: sendLogin } = common_vendor.x((params) => services_api_auth.a(params), {
      immediate: false
    });
    const loginForm = common_vendor.w({
      phone: "",
      code: ""
      // verifyCode: '',
      // verifyKey: ''
    });
    const { send: checkCodeIdentity } = common_vendor.x(
      (params) => services_api_auth.g({ phone: params.phone }),
      { immediate: false }
    );
    const regex = /^1[3-9]\d{9}$/;
    const dragCheckShow = common_vendor.v(false);
    const sendCode = () => {
      if (!loginForm.phone) {
        utils_uniapi_prompt.T("请输入手机号!");
        return;
      } else if (!regex.test(loginForm.phone)) {
        utils_uniapi_prompt.T("请输入正确手机号");
        return;
      } else
        dragCheckShow.value = true;
    };
    const handleLogin = () => {
      if (!loginForm.code) {
        utils_uniapi_prompt.T("请输入验证码");
        return;
      } else {
        common_vendor.i.login({
          provider: "weixin",
          //使用微信登录
          success: function(loginRes) {
            loginForm.wxCode = loginRes.code;
            sendLogin(loginForm).then((res) => {
              console.log(res, "res");
              utils_uniapi_prompt.T("登录成功", { duration: 1500 });
              authStore.setToken(res.access_token);
              setTimeout(() => {
                var _a, _b;
                if ((_a = common_vendor.z(pageQuery)) == null ? void 0 : _a.redirect) {
                  const params = common_vendor.I(common_vendor.z(pageQuery), ["redirect", "tabBar"]);
                  if ((_b = common_vendor.z(pageQuery)) == null ? void 0 : _b.tabBar) {
                    router.replaceAll({ name: common_vendor.z(pageQuery).redirect, params });
                  } else {
                    router.replace({ name: common_vendor.z(pageQuery).redirect, params });
                  }
                } else {
                  router.back();
                }
              }, 1500);
            });
          }
        });
      }
    };
    const maskClick = common_vendor.v(true);
    const result = (e) => {
      dragCheckShow.value = false;
      checkCodeIdentity(loginForm).then(() => {
        isSendCheckCode.value = true;
        var timer = setInterval(() => {
          countdownNumber.value--;
          if (countdownNumber.value === 0) {
            isSendCheckCode.value = false;
            countdownNumber.value = 60;
            clearInterval(timer);
          }
        }, 1e3);
      });
    };
    const countdownNumber = common_vendor.v(60);
    const isSendCheckCode = common_vendor.v(false);
    return (_ctx, _cache) => {
      return common_vendor.y({
        a: loginForm.phone,
        b: common_vendor.B(($event) => loginForm.phone = $event.detail.value),
        c: loginForm.code,
        d: common_vendor.B(($event) => loginForm.code = $event.detail.value),
        e: !isSendCheckCode.value
      }, !isSendCheckCode.value ? {
        f: common_vendor.B(sendCode)
      } : {
        g: common_vendor.F(countdownNumber.value)
      }, {
        h: common_vendor.B(handleLogin),
        i: common_vendor.B(($event) => dragCheckShow.value = $event),
        j: common_vendor.B(result),
        k: common_vendor.D({
          visiable: dragCheckShow.value,
          title: "人工验证",
          minTitle: "滑动滑块，使图片显示角度为正",
          image: "/static/logo.png",
          icon: "/static/images/icon/drag-check.png",
          maskClick: maskClick.value
        })
      });
    };
  }
});
const MiniProgramPage = /* @__PURE__ */ common_vendor.q(_sfc_main, [["__scopeId", "data-v-45258083"], ["__file", "/Users/zhangyi/Desktop/vue/vue3/Vue3-Vite-TS-uniapp freight- system/src/pages/login/index.vue"]]);
wx.createPage(MiniProgramPage);
