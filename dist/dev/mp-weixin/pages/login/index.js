"use strict";
const common_vendor = require("../../common/vendor.js"), state_modules_auth = require("../../state/modules/auth.js"), utils_uniapi_prompt = require("../../utils/uniapi/prompt.js"), services_api_auth = require("../../services/api/auth.js");
require("../../utils/cache/index.js"), require("../../utils/cache/storageCache.js"), require("../../settings/encryptionSetting.js"), require("../../utils/env.js"), require("../../utils/cipher.js"), require("../../utils/is.js"), require("../../enums/cacheEnum.js"), require("../../services/api/user.js"), require("../../utils/http/index.js"), require("../../mock/index.js"), require("../../mock/v1/index.js"), require("../../mock/v1/modules/auth.js"), require("../../mock/utils.js"), require("../../enums/httpEnum.js"), require("../../utils/http/checkStatus.js"), require("../../router/index.js"), require("../../router/guard.js");
if (!Math) {
  DragCheck();
}
const DragCheck = () => "../../components/Drag-check/index.js";
const _sfc_main = /* @__PURE__ */ common_vendor.k({
  __name: "index",
  setup(__props) {
    const { data: dataOptions, send: isSend, onSuccess } = common_vendor.u((loginRes) => services_api_auth.r({ jsCode: loginRes }), { immediate: false });
    const pageQuery = common_vendor.w(void 0);
    common_vendor.z((query) => {
      common_vendor.i.login({
        provider: "weixin",
        //使用微信登录
        success: function(loginRes) {
          isSend(loginRes.code);
        }
      });
      pageQuery.value = query;
    });
    const current = common_vendor.w("smsCode");
    const showPassword = common_vendor.w(false);
    onSuccess(() => {
      loginForm.aid = dataOptions.value.aid;
    });
    const router = common_vendor.T();
    const authStore = state_modules_auth.u();
    const { send: sendLogin } = common_vendor.u((params) => services_api_auth.a(params), {
      immediate: false
    });
    const loginForm = common_vendor.x({
      phone: "",
      code: "",
      aid: ""
    });
    const { send: checkCodeIdentity } = common_vendor.u(
      (params) => services_api_auth.g({ phone: params.phone }),
      { immediate: false }
    );
    const { data: pwdData, send: passWordLogin, onSuccess: pwdLoginSuccess } = common_vendor.u((params) => services_api_auth.p(params), { immediate: false });
    const regex = /^1[3-9]\d{9}$/;
    const dragCheckShow = common_vendor.w(false);
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
      if (current.value === "smsCode" && !loginForm.code) {
        utils_uniapi_prompt.T("请输入验证码");
        return;
      } else {
        current.value === "smsCode" && common_vendor.i.login({
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
                if ((_a = common_vendor.C(pageQuery)) == null ? void 0 : _a.redirect) {
                  const params = common_vendor.J(common_vendor.C(pageQuery), ["redirect", "tabBar"]);
                  if ((_b = common_vendor.C(pageQuery)) == null ? void 0 : _b.tabBar) {
                    router.replaceAll({ name: common_vendor.C(pageQuery).redirect, params });
                  } else {
                    router.replace({ name: common_vendor.C(pageQuery).redirect, params });
                  }
                } else {
                  router.back();
                }
              }, 1500);
            });
          }
        });
        current.value === "pwd" && loginByPwd();
      }
    };
    const pwdForm = common_vendor.x({
      loginName: "",
      password: ""
    });
    const loginByPwd = () => {
      if (!pwdForm.loginName) {
        utils_uniapi_prompt.T("请输入用户名!");
        return;
      } else if (!pwdForm.password) {
        utils_uniapi_prompt.T("请输入密码");
        return;
      } else {
        passWordLogin(pwdForm);
      }
    };
    pwdLoginSuccess(() => {
      utils_uniapi_prompt.T("登录成功", { duration: 1500 });
      authStore.setToken(pwdData.value);
      setTimeout(() => {
        var _a, _b;
        if ((_a = common_vendor.C(pageQuery)) == null ? void 0 : _a.redirect) {
          const params = common_vendor.J(common_vendor.C(pageQuery), ["redirect", "tabBar"]);
          if ((_b = common_vendor.C(pageQuery)) == null ? void 0 : _b.tabBar) {
            router.replaceAll({ name: common_vendor.C(pageQuery).redirect, params });
          } else {
            router.replace({ name: common_vendor.C(pageQuery).redirect, params });
          }
        } else {
          router.back();
        }
      }, 1500);
    });
    const maskClick = common_vendor.w(true);
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
    const countdownNumber = common_vendor.w(60);
    const isSendCheckCode = common_vendor.w(false);
    return (_ctx, _cache) => {
      return common_vendor.B({
        a: common_vendor.I(current.value === "smsCode" ? "active light-red" : ""),
        b: common_vendor.D(($event) => current.value = "smsCode"),
        c: common_vendor.I(current.value === "pwd" ? "active light-red" : ""),
        d: common_vendor.D(($event) => current.value = "pwd"),
        e: current.value === "smsCode"
      }, current.value === "smsCode" ? {
        f: loginForm.phone,
        g: common_vendor.D(($event) => loginForm.phone = $event.detail.value)
      } : {}, {
        h: current.value === "pwd"
      }, current.value === "pwd" ? {
        i: pwdForm.loginName,
        j: common_vendor.D(($event) => pwdForm.loginName = $event.detail.value)
      } : {}, {
        k: current.value === "pwd"
      }, current.value === "pwd" ? {
        l: showPassword.value,
        m: pwdForm.password,
        n: common_vendor.D(($event) => pwdForm.password = $event.detail.value),
        o: common_vendor.D(($event) => showPassword.value = !showPassword.value)
      } : {}, {
        p: current.value === "smsCode"
      }, current.value === "smsCode" ? common_vendor.B({
        q: loginForm.code,
        r: common_vendor.D(($event) => loginForm.code = $event.detail.value),
        s: !isSendCheckCode.value
      }, !isSendCheckCode.value ? {
        t: common_vendor.D(sendCode)
      } : {
        v: common_vendor.H(countdownNumber.value)
      }) : {}, {
        w: common_vendor.D(handleLogin),
        x: common_vendor.D(($event) => dragCheckShow.value = $event),
        y: common_vendor.D(result),
        z: common_vendor.G({
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
