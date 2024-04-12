"use strict";
const common_vendor = require("../../common/vendor.js"), services_api_auth = require("../../services/api/auth.js");
require("../../utils/http/index.js"), require("../../utils/env.js"), require("../../mock/index.js"), require("../../mock/v1/index.js"), require("../../mock/v1/modules/auth.js"), require("../../mock/utils.js"), require("../../enums/httpEnum.js"), require("../../state/modules/auth.js"), require("../../utils/cache/index.js"), require("../../utils/cache/storageCache.js"), require("../../settings/encryptionSetting.js"), require("../../utils/cipher.js"), require("../../utils/is.js"), require("../../enums/cacheEnum.js"), require("../../utils/http/checkStatus.js"), require("../../utils/uniapi/prompt.js");
if (!Math) {
  DragCheck();
}
const DragCheck = () => "../../components/Drag-check/index.js";
const _sfc_main = /* @__PURE__ */ common_vendor.k({
  __name: "password",
  setup(__props) {
    const pwdForm = common_vendor.w({
      password: "",
      code: "",
      passwordAgain: ""
    });
    const { send: checkCodeIdentity } = common_vendor.x(
      (params) => services_api_auth.g({ phone: params.phone }),
      { immediate: false }
    );
    const countdownNumber = common_vendor.v(60);
    const isSendCheckCode = common_vendor.v(false);
    const dragCheckShow = common_vendor.v(false);
    const sendCode = () => {
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
    const save = () => {
      return;
    };
    return (_ctx, _cache) => {
      return common_vendor.y({
        a: pwdForm.password,
        b: common_vendor.B(($event) => pwdForm.password = $event.detail.value),
        c: pwdForm.code,
        d: common_vendor.B(($event) => pwdForm.code = $event.detail.value),
        e: !isSendCheckCode.value
      }, !isSendCheckCode.value ? {
        f: common_vendor.B(sendCode)
      } : {
        g: common_vendor.F(countdownNumber.value)
      }, {
        h: pwdForm.passwordAgain,
        i: common_vendor.B(($event) => pwdForm.passwordAgain = $event.detail.value),
        j: common_vendor.B(($event) => dragCheckShow.value = $event),
        k: common_vendor.B(result),
        l: common_vendor.D({
          visiable: dragCheckShow.value,
          title: "人工验证",
          minTitle: "滑动滑块，使图片显示角度为正",
          image: "/static/logo.png",
          icon: "/static/images/icon/drag-check.png",
          maskClick: maskClick.value
        }),
        m: common_vendor.B(save)
      });
    };
  }
});
const MiniProgramPage = /* @__PURE__ */ common_vendor.q(_sfc_main, [["__file", "/Users/zhangyi/Desktop/vue/vue3/Vue3-Vite-TS-uniapp freight- system/src/pages/edit-info/password.vue"]]);
wx.createPage(MiniProgramPage);
