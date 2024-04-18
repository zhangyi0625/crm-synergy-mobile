"use strict";
const common_vendor = require("../../common/vendor.js"), state_modules_auth = require("../../state/modules/auth.js"), services_api_user = require("../../services/api/user.js"), utils_uniapi_prompt = require("../../utils/uniapi/prompt.js");
require("../../utils/cache/index.js"), require("../../utils/cache/storageCache.js"), require("../../settings/encryptionSetting.js"), require("../../utils/env.js"), require("../../utils/cipher.js"), require("../../utils/is.js"), require("../../enums/cacheEnum.js"), require("../../services/api/auth.js"), require("../../utils/http/index.js"), require("../../mock/index.js"), require("../../mock/v1/index.js"), require("../../mock/v1/modules/auth.js"), require("../../mock/utils.js"), require("../../enums/httpEnum.js"), require("../../utils/http/checkStatus.js"), require("../../router/index.js"), require("../../router/guard.js");
if (!Math) {
  DragCheck();
}
const DragCheck = () => "../../components/Drag-check/index.js";
const _sfc_main = /* @__PURE__ */ common_vendor.k({
  __name: "password",
  setup(__props) {
    const authStore = state_modules_auth.u();
    const pwdForm = common_vendor.x({
      phone: common_vendor.K(() => {
        var _a;
        return (_a = authStore.userinfo) == null ? void 0 : _a.phone;
      }).value,
      password: "",
      code: "",
      confirmPassword: ""
    });
    const { send: checkCodeIdentity } = common_vendor.u(services_api_user.c(), { immediate: false });
    const countdownNumber = common_vendor.w(60);
    const isSendCheckCode = common_vendor.w(false);
    const dragCheckShow = common_vendor.w(false);
    const sendCode = () => {
      dragCheckShow.value = true;
    };
    const maskClick = common_vendor.w(true);
    const result = (e) => {
      dragCheckShow.value = false;
      checkCodeIdentity().then(() => {
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
    const { send: isSend } = common_vendor.u(services_api_user.d(pwdForm), { immediate: false });
    const save = () => {
      if (!pwdForm.code) {
        utils_uniapi_prompt.T("请输入验证码!");
        return;
      } else if (!pwdForm.password) {
        utils_uniapi_prompt.T("请输入密码!");
        return;
      } else {
        pwdForm.confirmPassword = pwdForm.password;
        isSend();
      }
    };
    return (_ctx, _cache) => {
      return common_vendor.z({
        a: pwdForm.phone,
        b: common_vendor.C(($event) => pwdForm.phone = $event.detail.value),
        c: pwdForm.code,
        d: common_vendor.C(($event) => pwdForm.code = $event.detail.value),
        e: !isSendCheckCode.value
      }, !isSendCheckCode.value ? {
        f: common_vendor.C(sendCode)
      } : {
        g: common_vendor.G(countdownNumber.value)
      }, {
        h: pwdForm.password,
        i: common_vendor.C(($event) => pwdForm.password = $event.detail.value),
        j: common_vendor.C(($event) => dragCheckShow.value = $event),
        k: common_vendor.C(result),
        l: common_vendor.F({
          visiable: dragCheckShow.value,
          title: "人工验证",
          minTitle: "滑动滑块，使图片显示角度为正",
          image: "/static/logo.png",
          icon: "/static/images/icon/drag-check.png",
          maskClick: maskClick.value
        }),
        m: common_vendor.C(save)
      });
    };
  }
});
const MiniProgramPage = /* @__PURE__ */ common_vendor.q(_sfc_main, [["__file", "/Users/zhangyi/Desktop/vue/vue3/Vue3-Vite-TS-uniapp freight- system/src/pages/edit-info/password.vue"]]);
wx.createPage(MiniProgramPage);
