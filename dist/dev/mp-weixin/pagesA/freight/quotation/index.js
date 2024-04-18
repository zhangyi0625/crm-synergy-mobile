"use strict";
const common_vendor = require("../../../common/vendor.js"), utils_time = require("../../../utils/time.js"), utils_uniapi_prompt = require("../../../utils/uniapi/prompt.js"), pagesA_freight_config = require("../config.js");
const _sfc_main = /* @__PURE__ */ common_vendor.k({
  __name: "index",
  setup(__props) {
    const quotationForm = common_vendor.x({
      portInfo: "",
      voyDaysInfo: "",
      vesselInfo: "",
      carrier: "",
      ctnTypePrice: "",
      otherPrice: ""
    });
    common_vendor.I((options) => {
      let info = JSON.parse(options.item);
      quotationForm.portInfo = info.por.cnName + " - " + info.fnd.cnName + info.fnd.enName;
      quotationForm.voyDaysInfo = utils_time.f(info.etd, "M-D") + " — " + utils_time.f(info.eta, "M-D") + "/" + info.voyDays;
      quotationForm.vesselInfo = info.vesselName || info.voyNo ? info.vesselName + "/" + info.voyNo : "";
      quotationForm.carrier = info.carrierCode;
      quotationForm.ctnTypePrice = "";
      quotationForm.otherPrice = "";
    });
    const text = common_vendor.w("");
    const handleClick = async () => {
      var _a;
      let arr = [];
      for (let i in quotationForm) {
        arr.push({
          name: (_a = pagesA_freight_config.q.find((el) => el.key === i)) == null ? void 0 : _a.label,
          value: quotationForm[i]
        });
      }
      text.value = `${arr.map((item) => `${item.name}：${item.value}`).join("\n")}`;
      console.log(text.value);
      common_vendor.i.setClipboardData({
        data: text.value,
        success: () => {
          utils_uniapi_prompt.T("复制成功");
        },
        fail: () => {
          utils_uniapi_prompt.T("复制失败");
        }
      });
    };
    return (_ctx, _cache) => {
      return {
        a: quotationForm.portInfo,
        b: common_vendor.C(($event) => quotationForm.portInfo = $event.detail.value),
        c: quotationForm.voyDaysInfo,
        d: common_vendor.C(($event) => quotationForm.voyDaysInfo = $event.detail.value),
        e: quotationForm.vesselInfo,
        f: common_vendor.C(($event) => quotationForm.vesselInfo = $event.detail.value),
        g: quotationForm.carrier,
        h: common_vendor.C(($event) => quotationForm.carrier = $event.detail.value),
        i: quotationForm.ctnTypePrice,
        j: common_vendor.C(($event) => quotationForm.ctnTypePrice = $event.detail.value),
        k: quotationForm.otherPrice,
        l: common_vendor.C(($event) => quotationForm.otherPrice = $event.detail.value),
        m: common_vendor.C(handleClick)
      };
    };
  }
});
const MiniProgramPage = /* @__PURE__ */ common_vendor.q(_sfc_main, [["__file", "/Users/zhangyi/Desktop/vue/vue3/Vue3-Vite-TS-uniapp freight- system/src/pagesA/freight/quotation/index.vue"]]);
wx.createPage(MiniProgramPage);
