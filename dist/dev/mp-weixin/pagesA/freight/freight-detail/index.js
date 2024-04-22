"use strict";
const common_vendor = require("../../../common/vendor.js"), utils_time = require("../../../utils/time.js"), services_api_freight_index = require("../../../services/api/freight/index.js"), enums_freight = require("../../../enums/freight.js"), utils_index = require("../../../utils/index.js");
require("../../../utils/http/index.js"), require("../../../utils/env.js"), require("../../../mock/index.js"), require("../../../mock/v1/index.js"), require("../../../mock/v1/modules/auth.js"), require("../../../mock/utils.js"), require("../../../enums/httpEnum.js"), require("../../../state/modules/auth.js"), require("../../../utils/cache/index.js"), require("../../../utils/cache/storageCache.js"), require("../../../settings/encryptionSetting.js"), require("../../../utils/cipher.js"), require("../../../utils/is.js"), require("../../../enums/cacheEnum.js"), require("../../../services/api/auth.js"), require("../../../services/api/user.js"), require("../../../utils/http/checkStatus.js"), require("../../../utils/uniapi/prompt.js"), require("../../../router/index.js"), require("../../../router/guard.js");
if (!Math) {
  CustomLoading();
}
const CustomLoading = () => "../../../components/Basic-loading/index.js";
const _sfc_main = /* @__PURE__ */ common_vendor.k({
  __name: "index",
  setup(__props) {
    const router = common_vendor.T();
    const URL = "https://files.zaicang.net";
    const loading = common_vendor.w(false);
    const cabinDetail = common_vendor.w({});
    const ctnType = common_vendor.w([]);
    const ctnTypeList = common_vendor.w([]);
    const { data: freightDetail, send: isSend, onSuccess } = common_vendor.u((id) => services_api_freight_index.h(id), { immediate: false });
    common_vendor.I((options) => {
      loading.value = true;
      let info = JSON.parse(options.info);
      if (info.channel === "QMS") {
        isSend(info.id);
      } else {
        isSend(info.id);
      }
    });
    onSuccess(() => {
      ctnType.value = [];
      ctnTypeList.value = [];
      for (let i in freightDetail.value) {
        if (i === enums_freight.p.COST || i === enums_freight.p.INNER || i === enums_freight.p.OUTER) {
          getCtnTypePrice(i, freightDetail.value[i], ctnTypeList.value);
          console.log(ctnType.value, "freight", ctnTypeList.value);
        }
      }
      setTimeout(() => {
        cabinDetail.value = freightDetail.value;
        loading.value = false;
      }, 500);
    });
    const getCtnTypePrice = (type, price, arr) => {
      let prices = JSON.parse(price);
      if (prices) {
        let obj = common_vendor.h({}, utils_index.i(prices.normal) ? prices.normal : {}, utils_index.i(prices.special) ? prices.special : {});
        ctnType.value = Object.keys(obj);
        for (let i in obj) {
          let index = arr.findIndex((el) => el.ctnType === i);
          if (index === -1) {
            arr.push({
              ctnType: i,
              price: {
                [type]: obj[i]
              }
            });
          } else
            arr[index]["price"][type] = obj[i];
        }
      }
    };
    const jumpQuotation = () => {
      router.push("/pagesA/freight/quotation/index?item=" + JSON.stringify(cabinDetail.value));
    };
    const hasRemark = common_vendor.K(
      () => cabinDetail.value.surchargeRemark || cabinDetail.value.warnRemark || cabinDetail.value.demurrageRemark || cabinDetail.value.remark
    );
    const getRMBPrice = (info) => {
      let arr = [];
      for (let i in info) {
        arr.push(info[i]);
      }
      return arr.join("/");
    };
    const isCtnPrice = (type) => {
      return ctnTypeList.value.filter((item) => item.price[type]).length > 0;
    };
    return (_ctx, _cache) => {
      var _a, _b, _c, _d, _e;
      return common_vendor.z({
        a: loading.value
      }, loading.value ? {
        b: common_vendor.F({
          iconType: "annulus",
          position: "fixed",
          zIndex: 9,
          mask: false,
          maskOpacity: 1,
          maskMini: false,
          maskDark: true,
          color: "#0396FF"
        })
      } : common_vendor.z({
        c: common_vendor.B(URL) + "/carrier-logo/" + cabinDetail.value.carrierCode + ".png",
        d: common_vendor.G(cabinDetail.value.carrierCode),
        e: common_vendor.G(common_vendor.B(utils_time.f)(cabinDetail.value.validFrom, "M-D")),
        f: common_vendor.G(common_vendor.B(utils_time.f)(cabinDetail.value.validTo, "M-D")),
        g: common_vendor.G(cabinDetail.value.transit > 0 ? "中转" : "直达"),
        h: common_vendor.G((_a = cabinDetail.value.por) == null ? void 0 : _a.cnName),
        i: common_vendor.G((_b = cabinDetail.value.por) == null ? void 0 : _b.enName),
        j: common_vendor.G(common_vendor.B(utils_time.f)(cabinDetail.value.etd, "M-D") || "-"),
        k: common_vendor.G(((_c = cabinDetail.value.terminal) == null ? void 0 : _c.name) || "-"),
        l: common_vendor.G(cabinDetail.value.voyDays),
        m: common_vendor.G(cabinDetail.value.carrierRoute),
        n: common_vendor.G(cabinDetail.value.cutOffDay ? cabinDetail.value.cutOffDay + "截" : ""),
        o: common_vendor.G(cabinDetail.value.departureDay ? cabinDetail.value.departureDay + "开" : ""),
        p: common_vendor.G(cabinDetail.value.vesselName ? cabinDetail.value.vesselName : ""),
        q: common_vendor.G(cabinDetail.value.voyNo ? cabinDetail.value.voyNo : ""),
        r: common_vendor.G((_d = cabinDetail.value.fnd) == null ? void 0 : _d.cnName),
        s: common_vendor.G((_e = cabinDetail.value.fnd) == null ? void 0 : _e.enName),
        t: common_vendor.G(common_vendor.B(utils_time.f)(cabinDetail.value.eta, "M-D") || "-"),
        v: common_vendor.G(cabinDetail.value.isSale ? "有库存" : "无库存"),
        w: common_vendor.H(cabinDetail.value.isSale ? "active" : "light-grey"),
        x: isCtnPrice("costPrice")
      }, isCtnPrice("costPrice") ? {} : {}, {
        y: isCtnPrice("innerPrice")
      }, isCtnPrice("innerPrice") ? {} : {}, {
        z: isCtnPrice("outerPrice")
      }, isCtnPrice("outerPrice") ? {} : {}, {
        A: common_vendor.D(ctnTypeList.value, (price, index, i0) => {
          return common_vendor.z({
            a: common_vendor.G(price.ctnType)
          }, isCtnPrice("costPrice") ? {
            b: common_vendor.G(price.price.costPrice ? "$" + price.price.costPrice : "-")
          } : {}, isCtnPrice("innerPrice") ? {
            c: common_vendor.G(price.price.innerPrice ? "$" + price.price.innerPrice : "-  ")
          } : {}, isCtnPrice("outerPrice") ? {
            d: common_vendor.G(price.price.outerPrice ? "$" + price.price.outerPrice : "-")
          } : {}, {
            e: index
          });
        }),
        B: isCtnPrice("costPrice"),
        C: isCtnPrice("innerPrice"),
        D: isCtnPrice("outerPrice"),
        E: common_vendor.G(ctnType.value.join("/")),
        F: cabinDetail.value.extraPriceInfo
      }, cabinDetail.value.extraPriceInfo ? {
        G: common_vendor.D(cabinDetail.value.extraPriceInfo, (item, index, i0) => {
          return {
            a: common_vendor.G(item.name),
            b: common_vendor.G(item.currency),
            c: common_vendor.G(item.qtyType === "BL" ? "票" : "箱型"),
            d: common_vendor.G(item.qtyType === "BL" ? item.price : getRMBPrice(JSON.parse(item.ctnPrice))),
            e: index
          };
        })
      } : {}, {
        H: cabinDetail.value.localPriceInfo
      }, cabinDetail.value.localPriceInfo ? {
        I: common_vendor.G(cabinDetail.value.channel === common_vendor.B(enums_freight.P).QMS ? "人民币费用" : "起运港费用"),
        J: common_vendor.D(cabinDetail.value.localPriceInfo, (item, index, i0) => {
          return {
            a: common_vendor.G(item.nameEn),
            b: common_vendor.G(item.currency),
            c: common_vendor.G(item.qtyType === "BL" ? "票" : "箱型"),
            d: common_vendor.G(item.qtyType === "BL" ? item.price : getRMBPrice(JSON.parse(item.ctnPrice))),
            e: index
          };
        })
      } : {}, {
        K: common_vendor.B(hasRemark)
      }, common_vendor.B(hasRemark) ? common_vendor.z({
        L: cabinDetail.value.warnRemark
      }, cabinDetail.value.warnRemark ? {
        M: common_vendor.G(cabinDetail.value.warnRemark)
      } : {}, {
        N: cabinDetail.value.surchargeRemark
      }, cabinDetail.value.surchargeRemark ? {
        O: common_vendor.G(cabinDetail.value.surchargeRemark)
      } : {}, {
        P: cabinDetail.value.demurrageRemark
      }, cabinDetail.value.demurrageRemark ? {
        Q: common_vendor.G(cabinDetail.value.demurrageRemark)
      } : {}, {
        R: cabinDetail.value.remark
      }, cabinDetail.value.remark ? {
        S: common_vendor.G(cabinDetail.value.remark)
      } : {}) : {}, {
        T: common_vendor.C(jumpQuotation)
      }));
    };
  }
});
const MiniProgramPage = /* @__PURE__ */ common_vendor.q(_sfc_main, [["__scopeId", "data-v-e0edbedd"], ["__file", "/Users/zhangyi/Desktop/vue/vue3/Vue3-Vite-TS-uniapp freight- system/src/pagesA/freight/freight-detail/index.vue"]]);
wx.createPage(MiniProgramPage);
