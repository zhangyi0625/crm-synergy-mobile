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
    const { data: freightDetail, send: isSend, onSuccess } = common_vendor.u((id) => services_api_freight_index.i(id), { immediate: false });
    common_vendor.z((options) => {
      loading.value = true;
      let info = JSON.parse(options.info);
      if (info.channel === "QMS") {
        isSend(info.id);
        common_vendor.y(services_api_freight_index.i(info.id));
      } else {
        isSend(info.id);
        common_vendor.y(services_api_freight_index.i(info.id));
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
      () => cabinDetail.value.amsRemark || cabinDetail.value.amsPrice || cabinDetail.value.surchargeRemark || cabinDetail.value.warnRemark || cabinDetail.value.demurrageRemark || cabinDetail.value.remark || cabinDetail.value.innerRemark
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
      return common_vendor.B({
        a: loading.value
      }, loading.value ? {
        b: common_vendor.G({
          iconType: "annulus",
          position: "fixed",
          zIndex: 9,
          mask: false,
          maskOpacity: 1,
          maskMini: false,
          maskDark: true,
          color: "#0396FF"
        })
      } : common_vendor.B({
        c: cabinDetail.value.carrierCode
      }, cabinDetail.value.carrierCode ? {
        d: common_vendor.C(URL) + "/carrier-logo/" + cabinDetail.value.carrierCode + ".png"
      } : {}, {
        e: common_vendor.H(cabinDetail.value.carrierCode),
        f: common_vendor.H(cabinDetail.value.modified),
        g: cabinDetail.value.tag
      }, cabinDetail.value.tag ? {
        h: common_vendor.H(cabinDetail.value.tag),
        i: common_vendor.L(cabinDetail.value.tag === "强推" ? "background: #FF844A" : "background: #FFB23F")
      } : {}, {
        j: common_vendor.H(cabinDetail.value.transit > 0 ? "中转" : "直达"),
        k: common_vendor.H((_a = cabinDetail.value.por) == null ? void 0 : _a.cnName),
        l: common_vendor.H((_b = cabinDetail.value.por) == null ? void 0 : _b.enName),
        m: cabinDetail.value.validFrom && cabinDetail.value.validTo
      }, cabinDetail.value.validFrom && cabinDetail.value.validTo ? {
        n: common_vendor.H(common_vendor.C(utils_time.f)(cabinDetail.value.validFrom, "M-D")),
        o: common_vendor.H(common_vendor.C(utils_time.f)(cabinDetail.value.validTo, "M-D"))
      } : {}, {
        p: common_vendor.H(common_vendor.C(utils_time.f)(cabinDetail.value.etd, "M-D") || "-"),
        q: common_vendor.H(((_c = cabinDetail.value.terminal) == null ? void 0 : _c.name) || "-"),
        r: common_vendor.H(cabinDetail.value.voyDays),
        s: common_vendor.H(cabinDetail.value.carrierRoute),
        t: common_vendor.H(cabinDetail.value.cutOffDay ? cabinDetail.value.cutOffDay : ""),
        v: common_vendor.H(cabinDetail.value.departureDay ? cabinDetail.value.departureDay : ""),
        w: common_vendor.H(cabinDetail.value.vesselName ? cabinDetail.value.vesselName : ""),
        x: common_vendor.H(cabinDetail.value.voyNo ? cabinDetail.value.voyNo : ""),
        y: cabinDetail.value.transit > 0
      }, cabinDetail.value.transit > 0 ? {
        z: common_vendor.H(cabinDetail.value.transitPorts)
      } : {}, {
        A: common_vendor.H((_d = cabinDetail.value.fnd) == null ? void 0 : _d.cnName),
        B: common_vendor.H((_e = cabinDetail.value.fnd) == null ? void 0 : _e.enName),
        C: common_vendor.H(common_vendor.C(utils_time.f)(cabinDetail.value.eta, "M-D") || "-"),
        D: common_vendor.H(cabinDetail.value.isSale ? "有库存" : "无库存"),
        E: common_vendor.I(cabinDetail.value.isSale ? "active" : "light-grey"),
        F: isCtnPrice("costPrice")
      }, isCtnPrice("costPrice") ? {} : {}, {
        G: isCtnPrice("innerPrice")
      }, isCtnPrice("innerPrice") ? {} : {}, {
        H: isCtnPrice("outerPrice")
      }, isCtnPrice("outerPrice") ? {} : {}, {
        I: common_vendor.F(ctnTypeList.value, (price, index, i0) => {
          return common_vendor.B({
            a: common_vendor.H(price.ctnType)
          }, isCtnPrice("costPrice") ? {
            b: common_vendor.H(price.price.costPrice ? "$" + price.price.costPrice : "-")
          } : {}, isCtnPrice("innerPrice") ? {
            c: common_vendor.H(price.price.innerPrice ? "$" + price.price.innerPrice : "-  ")
          } : {}, isCtnPrice("outerPrice") ? {
            d: common_vendor.H(price.price.outerPrice ? "$" + price.price.outerPrice : "-")
          } : {}, {
            e: index
          });
        }),
        J: isCtnPrice("costPrice"),
        K: isCtnPrice("innerPrice"),
        L: isCtnPrice("outerPrice"),
        M: common_vendor.H(ctnType.value.join("/")),
        N: cabinDetail.value.extraPriceInfo
      }, cabinDetail.value.extraPriceInfo ? {
        O: common_vendor.F(cabinDetail.value.extraPriceInfo, (item, index, i0) => {
          return {
            a: common_vendor.H(item.name),
            b: common_vendor.H(item.currency),
            c: common_vendor.H(item.qtyType === "BL" ? "票" : "箱型"),
            d: common_vendor.H(item.qtyType === "BL" ? item.price : getRMBPrice(JSON.parse(item.ctnPrice))),
            e: index
          };
        })
      } : {}, {
        P: cabinDetail.value.localPriceInfo
      }, cabinDetail.value.localPriceInfo ? {
        Q: common_vendor.H(cabinDetail.value.channel === common_vendor.C(enums_freight.P).QMS ? "人民币费用" : "起运港费用"),
        R: common_vendor.F(cabinDetail.value.localPriceInfo, (item, index, i0) => {
          return {
            a: common_vendor.H(item.name),
            b: common_vendor.H(item.currency),
            c: common_vendor.H(item.qtyType === "BL" ? "票" : "箱型"),
            d: common_vendor.H(item.qtyType === "BL" ? item.price : getRMBPrice(JSON.parse(item.ctnPrice))),
            e: index
          };
        })
      } : {}, {
        S: common_vendor.C(hasRemark)
      }, common_vendor.C(hasRemark) ? common_vendor.B({
        T: cabinDetail.value.amsPrice || cabinDetail.value.amsRemark
      }, cabinDetail.value.amsPrice || cabinDetail.value.amsRemark ? {
        U: common_vendor.H(cabinDetail.value.amsPrice),
        V: common_vendor.H(cabinDetail.value.amsRemark)
      } : {}, {
        W: cabinDetail.value.warnRemark
      }, cabinDetail.value.warnRemark ? {
        X: common_vendor.H(cabinDetail.value.warnRemark)
      } : {}, {
        Y: cabinDetail.value.surchargeRemark
      }, cabinDetail.value.surchargeRemark ? {
        Z: common_vendor.H(cabinDetail.value.surchargeRemark)
      } : {}, {
        aa: cabinDetail.value.demurrageRemark
      }, cabinDetail.value.demurrageRemark ? {
        ab: common_vendor.H(cabinDetail.value.demurrageRemark)
      } : {}, {
        ac: cabinDetail.value.remark
      }, cabinDetail.value.remark ? {
        ad: common_vendor.H(cabinDetail.value.remark)
      } : {}, {
        ae: !!cabinDetail.value.innerRemark
      }, !!cabinDetail.value.innerRemark ? {
        af: common_vendor.H(cabinDetail.value.innerRemark)
      } : {}) : {}, {
        ag: common_vendor.D(jumpQuotation)
      }));
    };
  }
});
const MiniProgramPage = /* @__PURE__ */ common_vendor.q(_sfc_main, [["__scopeId", "data-v-e0edbedd"], ["__file", "/Users/zhangyi/Desktop/vue/vue3/Vue3-Vite-TS-uniapp freight- system/src/pagesA/freight/freight-detail/index.vue"]]);
wx.createPage(MiniProgramPage);
