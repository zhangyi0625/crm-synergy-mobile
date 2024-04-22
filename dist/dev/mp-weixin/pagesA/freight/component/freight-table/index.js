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
    const URL = "https://files.zaicang.net";
    const jump = (item, type) => {
      emit("jumpEither", item, type);
    };
    const getPrice = (price) => {
      let innerPrice = JSON.parse(price);
      let ctnType = ["20GP", "40GP", "40HQ"];
      let obj = {};
      if (innerPrice) {
        for (let i in innerPrice["normal"]) {
          if (ctnType.includes(i))
            obj[i] = innerPrice["normal"][i];
        }
        for (let i in innerPrice["special"]) {
          if (ctnType.includes(i))
            obj[i] = innerPrice["special"][i];
        }
      }
      return obj;
    };
    return (_ctx, _cache) => {
      return {
        a: common_vendor.D(props.data, (item, index, i0) => {
          return common_vendor.z({
            a: item.channel !== common_vendor.B(enums_freight.P).QMS
          }, item.channel !== common_vendor.B(enums_freight.P).QMS ? {} : {}, {
            b: common_vendor.B(URL) + "/carrier-logo/" + item.carrierCode + ".png",
            c: item.validFrom || item.validTo
          }, item.validFrom || item.validTo ? {
            d: common_vendor.G(common_vendor.B(utils_time.f)(item.validFrom, "M-D")),
            e: common_vendor.G(common_vendor.B(utils_time.f)(item.validTo, "M-D"))
          } : {}, {
            f: item.vesselName || item.voyNo
          }, item.vesselName || item.voyNo ? {
            g: common_vendor.G(item.vesselName),
            h: common_vendor.G(item.voyNo)
          } : {}, {
            i: common_vendor.G(item.carrierRoute),
            j: item.etd && item.eta
          }, item.etd && item.eta ? {
            k: common_vendor.G(common_vendor.B(utils_time.f)(item.etd, "M-D")),
            l: common_vendor.G(common_vendor.B(utils_time.f)(item.eta, "M-D"))
          } : {}, {
            m: common_vendor.G(item.voyDays),
            n: common_vendor.G(item.cutOffDay ? item.cutOffDay + "截" : "-"),
            o: common_vendor.G(item.departureDay ? item.departureDay + "开" : "-"),
            p: common_vendor.G(item.transit > 0 ? "中转" : "直达"),
            q: common_vendor.G(item.isSale ? "有" : "无"),
            r: common_vendor.D(getPrice(item.innerPrice ? item.innerPrice : item.outerPrice), (price, priceIndex, i1) => {
              return {
                a: common_vendor.G(priceIndex),
                b: common_vendor.G(price ? "$" + price : "-"),
                c: priceIndex
              };
            }),
            s: common_vendor.H(item.channel !== common_vendor.B(enums_freight.P).QMS ? "mt-24" : "my-24"),
            t: item.channel === common_vendor.B(enums_freight.P).QMS
          }, item.channel === common_vendor.B(enums_freight.P).QMS ? {
            v: common_vendor.C(($event) => jump(item, "CARRIER"), index)
          } : {}, {
            w: index,
            x: common_vendor.C(($event) => jump(item), index)
          });
        })
      };
    };
  }
});
const Component = /* @__PURE__ */ common_vendor.q(_sfc_main, [["__scopeId", "data-v-3134b717"], ["__file", "/Users/zhangyi/Desktop/vue/vue3/Vue3-Vite-TS-uniapp freight- system/src/pagesA/freight/component/freight-table/index.vue"]]);
wx.createComponent(Component);
