"use strict";
const common_vendor = require("../../../common/vendor.js"), utils_uniapi_prompt = require("../../../utils/uniapi/prompt.js"), services_api_user = require("../../../services/api/user.js");
require("../../../utils/http/index.js"), require("../../../utils/env.js"), require("../../../mock/index.js"), require("../../../mock/v1/index.js"), require("../../../mock/v1/modules/auth.js"), require("../../../mock/utils.js"), require("../../../enums/httpEnum.js"), require("../../../state/modules/auth.js"), require("../../../utils/cache/index.js"), require("../../../utils/cache/storageCache.js"), require("../../../settings/encryptionSetting.js"), require("../../../utils/cipher.js"), require("../../../utils/is.js"), require("../../../enums/cacheEnum.js"), require("../../../services/api/auth.js"), require("../../../utils/http/checkStatus.js"), require("../../../router/index.js"), require("../../../router/guard.js");
if (!Math) {
  CustomLoading();
}
const CustomLoading = () => "../../../components/Basic-loading/index.js";
const _sfc_main = /* @__PURE__ */ common_vendor.k({
  __name: "index",
  setup(__props) {
    const loading = common_vendor.w(false);
    const { data: quotationInfo, send: isSend } = common_vendor.u((id) => services_api_user.e(id), { immediate: false });
    const { send: onSave } = common_vendor.u((params) => services_api_user.f(params), { immediate: false });
    const quotationData = common_vendor.w([]);
    const info = common_vendor.w({});
    common_vendor.z((options) => {
      loading.value = true;
      info.value = JSON.parse(options.item);
      isSend(info.value.id);
      common_vendor.y(services_api_user.e(info.value.id));
      setTimeout(() => {
        quotationInfo.value && init();
      }, 200);
    });
    const init = () => {
      let arr = quotationInfo.value.split("\r\n");
      quotationData.value = [];
      arr.map((item) => {
        let ele = item.split(":")[0].split("：");
        quotationData.value.push({
          label: ele[0],
          value: ele[1]
        });
      });
      loading.value = false;
    };
    const text = common_vendor.w("");
    const handleClick = async () => {
      var _a, _b;
      let arr = [];
      for (let i in quotationData.value) {
        arr.push({
          name: (_a = quotationData.value[i]) == null ? void 0 : _a.label,
          value: (_b = quotationData.value[i]) == null ? void 0 : _b.value
        });
      }
      text.value = `${arr.map((item) => `${item.name}：${item.value}`).join("\n")}`;
      common_vendor.i.setClipboardData({
        data: text.value,
        success: () => {
          utils_uniapi_prompt.T("复制成功");
          let params = {
            freightId: info.value.id,
            freightInfo: quotationInfo.value,
            porCode: info.value.por.code,
            fndCode: info.value.fnd.code,
            carrierCode: info.value.carrierCode,
            carrierRoute: info.value.carrierRoute
          };
          onSave(params);
        },
        fail: () => {
          utils_uniapi_prompt.T("复制失败");
        }
      });
    };
    return (_ctx, _cache) => {
      return common_vendor.B({
        a: loading.value
      }, loading.value ? {
        b: common_vendor.G({
          iconType: "sword",
          position: "fixed",
          zIndex: 9,
          mask: false,
          maskOpacity: 1,
          maskMini: false,
          maskDark: true,
          color: "#0396FF"
        })
      } : {
        c: common_vendor.F(quotationData.value, (item, index, i0) => {
          return {
            a: common_vendor.H(item.label + ":"),
            b: item.value,
            c: common_vendor.D(($event) => item.value = $event.detail.value, index),
            d: index
          };
        }),
        d: common_vendor.D(handleClick)
      });
    };
  }
});
const MiniProgramPage = /* @__PURE__ */ common_vendor.q(_sfc_main, [["__file", "/Users/zhangyi/Desktop/vue/vue3/Vue3-Vite-TS-uniapp freight- system/src/pagesA/freight/quotation/index.vue"]]);
wx.createPage(MiniProgramPage);
