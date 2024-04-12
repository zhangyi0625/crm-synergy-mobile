"use strict";
const common_vendor = require("../../../../common/vendor.js"), enums_freight = require("../../../../enums/freight.js"), utils_time = require("../../../../utils/time.js");
const _sfc_main = /* @__PURE__ */ common_vendor.k({
  __name: "index",
  props: {
    data: null
  },
  emits: ["jumpEither"],
  setup(__props, { emit }) {
    const props = __props;
    const URL = "http://192.168.110.124:8885/apis";
    const jump = (item, type) => {
      emit("jumpEither", item, type);
    };
    return (_ctx, _cache) => {
      return {
        a: common_vendor.C(props.data, (item, index, i0) => {
          return common_vendor.y({
            a: item.productType === common_vendor.z(enums_freight.P).CUSTOMER
          }, item.productType === common_vendor.z(enums_freight.P).CUSTOMER ? {} : {}, {
            b: common_vendor.z(URL) + "/carrier-logo/" + item.carrierCode + ".png",
            c: common_vendor.F(common_vendor.z(utils_time.f)(item.validFrom, "M-D")),
            d: common_vendor.F(common_vendor.z(utils_time.f)(item.validTo, "M-D")),
            e: common_vendor.F(item.vesselName),
            f: common_vendor.F(item.voyNo),
            g: common_vendor.F(item.carrierRoute),
            h: common_vendor.F(common_vendor.z(utils_time.f)(item.etd, "M-D")),
            i: common_vendor.F(common_vendor.z(utils_time.f)(item.eta, "M-D")),
            j: common_vendor.F(item.voyDays),
            k: common_vendor.F(item.schedule),
            l: common_vendor.F(item.transitNum > 0 ? "中转" : "直达"),
            m: common_vendor.F(item.isSale ? "有" : "无"),
            n: common_vendor.C(item.priceList, (price, priceIndex, i1) => {
              return {
                a: common_vendor.F(price.ctnType),
                b: common_vendor.F(price.totalPrice),
                c: priceIndex
              };
            }),
            o: item.productType === common_vendor.z(enums_freight.P).CARRIER
          }, item.productType === common_vendor.z(enums_freight.P).CARRIER ? {
            p: common_vendor.B(($event) => jump(item, "CARRIER"), index)
          } : {}, {
            q: index,
            r: common_vendor.B(($event) => jump(item), index)
          });
        })
      };
    };
  }
});
const Component = /* @__PURE__ */ common_vendor.q(_sfc_main, [["__scopeId", "data-v-3134b717"], ["__file", "/Users/zhangyi/Desktop/vue/vue3/Vue3-Vite-TS-uniapp freight- system/src/pagesA/freight/component/freight-table/index.vue"]]);
wx.createComponent(Component);
