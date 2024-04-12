"use strict";
const common_vendor = require("../../../common/vendor.js"), utils_time = require("../../../utils/time.js");
const _sfc_main = /* @__PURE__ */ common_vendor.k({
  __name: "index",
  setup(__props) {
    const router = common_vendor.T();
    const URL = "http://192.168.110.124:8885/apis";
    const cabinDetail = common_vendor.v({});
    common_vendor.H((options) => {
      cabinDetail.value = options.info && JSON.parse(options.info);
    });
    const jumpQuotation = () => {
      router.push("");
    };
    const hasRemark = common_vendor.K(
      () => cabinDetail.value.weightRemark || cabinDetail.value.freshRemark || cabinDetail.value.otherRemark
    );
    return (_ctx, _cache) => {
      return common_vendor.y({
        a: common_vendor.z(URL) + "/carrier-logo/" + cabinDetail.value.carrierCode + ".png",
        b: common_vendor.F(cabinDetail.value.carrierCode),
        c: common_vendor.F(common_vendor.z(utils_time.f)(cabinDetail.value.validFrom, "M-D")),
        d: common_vendor.F(common_vendor.z(utils_time.f)(cabinDetail.value.validTo, "M-D")),
        e: common_vendor.F(cabinDetail.value.transitNum > 0 ? "中转" : "直达"),
        f: common_vendor.F(cabinDetail.value.porPortResp.cnName),
        g: common_vendor.F(cabinDetail.value.porPortResp.enName),
        h: common_vendor.F(common_vendor.z(utils_time.f)(cabinDetail.value.etd, "M-D")),
        i: common_vendor.F(cabinDetail.value.voyDays),
        j: common_vendor.F(cabinDetail.value.carrierRoute),
        k: common_vendor.F(cabinDetail.value.schedule),
        l: common_vendor.F(cabinDetail.value.vesselName),
        m: common_vendor.F(cabinDetail.value.voyNo),
        n: common_vendor.F(cabinDetail.value.fndPortResp.cnName),
        o: common_vendor.F(cabinDetail.value.fndPortResp.enName),
        p: common_vendor.F(common_vendor.z(utils_time.f)(cabinDetail.value.eta, "M-D")),
        q: common_vendor.F(cabinDetail.value.isSale ? "有库存" : "无库存"),
        r: common_vendor.G(cabinDetail.value.isSale ? "active" : "light-grey"),
        s: common_vendor.z(hasRemark)
      }, common_vendor.z(hasRemark) ? common_vendor.y({
        t: cabinDetail.value.weightRemark
      }, cabinDetail.value.weightRemark ? {
        v: common_vendor.F(cabinDetail.value.weightRemark)
      } : {}, {
        w: cabinDetail.value.freshRemark
      }, cabinDetail.value.freshRemark ? {
        x: common_vendor.F(cabinDetail.value.freshRemark)
      } : {}, {
        y: cabinDetail.value.freshRemark
      }, cabinDetail.value.freshRemark ? {
        z: common_vendor.F(cabinDetail.value.freshRemark)
      } : {}) : {}, {
        A: common_vendor.B(jumpQuotation)
      });
    };
  }
});
const MiniProgramPage = /* @__PURE__ */ common_vendor.q(_sfc_main, [["__scopeId", "data-v-e0edbedd"], ["__file", "/Users/zhangyi/Desktop/vue/vue3/Vue3-Vite-TS-uniapp freight- system/src/pagesA/freight/freight-detail/index.vue"]]);
wx.createPage(MiniProgramPage);
