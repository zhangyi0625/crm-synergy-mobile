"use strict";
const common_vendor = require("../../common/vendor.js"), state_modules_auth = require("../../state/modules/auth.js"), enums_routerEnum = require("../../enums/routerEnum.js"), services_api_user = require("../../services/api/user.js"), utils_cache_index = require("../../utils/cache/index.js"), enums_cacheEnum = require("../../enums/cacheEnum.js"), services_api_file = require("../../services/api/file.js"), utils_uniapi_prompt = require("../../utils/uniapi/prompt.js");
require("../../services/api/auth.js"), require("../../utils/http/index.js"), require("../../utils/env.js"), require("../../mock/index.js"), require("../../mock/v1/index.js"), require("../../mock/v1/modules/auth.js"), require("../../mock/utils.js"), require("../../enums/httpEnum.js"), require("../../utils/http/checkStatus.js"), require("../../router/index.js"), require("../../router/guard.js"), require("../../utils/cache/storageCache.js"), require("../../settings/encryptionSetting.js"), require("../../utils/cipher.js"), require("../../utils/is.js");
const _sfc_main = /* @__PURE__ */ common_vendor.k({
  __name: "index",
  setup(__props) {
    const URL = "http://qms.lihang-logistics.com/apis";
    const { data: userInfo, send: isSend, onSuccess } = common_vendor.u(services_api_user.g(), {
      initialData: []
    });
    const authStore = state_modules_auth.u();
    const isLogin = common_vendor.w(false);
    const router = common_vendor.T();
    common_vendor.l(() => {
      isLogin.value = authStore.isLogin;
      isLogin.value && isSend();
      isLogin.value && common_vendor.y();
    });
    onSuccess(() => {
      authStore.setUserInfo(userInfo.value);
    });
    const { send: isDelete } = common_vendor.u((url) => services_api_file.d({ fileUrl: url }), { immediate: false });
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
            const tempFiles = res.tempFilePaths;
            common_vendor.i.uploadFile({
              url: URL + "/api/file/upload",
              filePath: tempFiles[0],
              name: "file",
              header: {
                "authorization": "Bearer " + utils_cache_index.g(enums_cacheEnum.T)
              },
              success: (uploadFileRes) => {
                let result = JSON.parse(uploadFileRes.data);
                if (result.code === 200) {
                  utils_uniapi_prompt.T("头像上传成功！");
                  onFinish(result.data);
                } else
                  utils_uniapi_prompt.T(result.message);
              }
            });
          }
        });
      }
    };
    const handleJump = () => {
      router.push("/pages/edit-info/password");
    };
    const handleLoginOut = () => {
      authStore.loginOut();
      isLogin.value = false;
      router.push(enums_routerEnum.L);
      userInfo.value = null;
    };
    const handleLogin = () => {
      !isLogin.value && router.push(enums_routerEnum.L);
    };
    const { send: upload, onSuccess: refreshProfle } = common_vendor.u((url) => services_api_user.p({ avatar: url }), { immediate: false });
    const onFinish = (url) => {
      var _a, _b;
      ((_a = authStore.userinfo) == null ? void 0 : _a.avatar) && isDelete((_b = authStore.userinfo) == null ? void 0 : _b.avatar);
      setTimeout(() => {
        upload(url);
      }, 200);
    };
    refreshProfle(() => {
      isSend();
      common_vendor.y(services_api_user.g());
    });
    return (_ctx, _cache) => {
      var _a, _b, _c, _d, _e;
      return common_vendor.B({
        a: common_vendor.C(userInfo) && ((_a = common_vendor.C(userInfo)) == null ? void 0 : _a.avatar)
      }, common_vendor.C(userInfo) && ((_b = common_vendor.C(userInfo)) == null ? void 0 : _b.avatar) ? {
        b: (_c = common_vendor.C(userInfo)) == null ? void 0 : _c.avatar
      } : {}, {
        c: common_vendor.H(!isLogin.value ? "登录/注册" : (_d = common_vendor.C(userInfo)) == null ? void 0 : _d.nickname),
        d: common_vendor.D(handleLogin),
        e: common_vendor.D(editAvatar),
        f: common_vendor.D(handleJump),
        g: common_vendor.H((_e = common_vendor.C(userInfo)) == null ? void 0 : _e.phone),
        h: common_vendor.D(handleLoginOut)
      });
    };
  }
});
const MiniProgramPage = /* @__PURE__ */ common_vendor.q(_sfc_main, [["__scopeId", "data-v-f97f9319"], ["__file", "/Users/zhangyi/Desktop/vue/vue3/Vue3-Vite-TS-uniapp freight- system/src/pages/profile/index.vue"]]);
wx.createPage(MiniProgramPage);
