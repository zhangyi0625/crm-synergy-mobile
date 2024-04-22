"use strict";
const common_vendor = require("../../common/vendor.js"), utils_time = require("../../utils/time.js"), services_api_freight_index = require("../../services/api/freight/index.js");
require("../../utils/http/index.js"), require("../../utils/env.js"), require("../../mock/index.js"), require("../../mock/v1/index.js"), require("../../mock/v1/modules/auth.js"), require("../../mock/utils.js"), require("../../enums/httpEnum.js"), require("../../state/modules/auth.js"), require("../../utils/cache/index.js"), require("../../utils/cache/storageCache.js"), require("../../settings/encryptionSetting.js"), require("../../utils/cipher.js"), require("../../utils/is.js"), require("../../enums/cacheEnum.js"), require("../../services/api/auth.js"), require("../../services/api/user.js"), require("../../utils/http/checkStatus.js"), require("../../utils/uniapi/prompt.js"), require("../../router/index.js"), require("../../router/guard.js");
const _sfc_main = /* @__PURE__ */ common_vendor.k({
  __name: "index",
  setup(__props) {
    const router = common_vendor.T();
    common_vendor.l(() => {
      isSend();
      common_vendor.y(services_api_freight_index.c());
    });
    const { data: collectData, send: isSend } = common_vendor.u(services_api_freight_index.c(), { initialData: [] });
    const { send: isDelete, onSuccess } = common_vendor.u((id) => services_api_freight_index.d(id), { immediate: false });
    onSuccess(() => {
      isSend();
      common_vendor.y(services_api_freight_index.c());
    });
    const jump = (item) => {
      router.push({
        path: "/pagesA/freight/index?info=" + JSON.stringify(item)
      });
    };
    return (_ctx, _cache) => {
      return {
        a: common_vendor.D(common_vendor.B(collectData), (item, index, i0) => {
          return common_vendor.z({
            a: common_vendor.C(($event) => common_vendor.B(isDelete)(item.id), index),
            b: item.modified
          }, item.modified ? {
            c: common_vendor.G(common_vendor.B(utils_time.a)(item.modified, 10))
          } : {}, {
            d: common_vendor.G(item.porCnlName),
            e: common_vendor.G(item.porEnName),
            f: common_vendor.G(item.fndCnlName),
            g: common_vendor.G(item.fndEnName),
            h: index,
            i: common_vendor.C(($event) => jump(item), index)
          });
        })
      };
    };
  }
});
const MiniProgramPage = /* @__PURE__ */ common_vendor.q(_sfc_main, [["__scopeId", "data-v-155c1755"], ["__file", "/Users/zhangyi/Desktop/vue/vue3/Vue3-Vite-TS-uniapp freight- system/src/pages/collect/index.vue"]]);
wx.createPage(MiniProgramPage);
