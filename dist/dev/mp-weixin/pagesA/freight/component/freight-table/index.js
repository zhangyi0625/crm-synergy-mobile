"use strict";
const common_vendor = require("../../../../common/vendor.js"), enums_freight = require("../../../../enums/freight.js"), utils_time = require("../../../../utils/time.js");
const _sfc_main = /* @__PURE__ */ common_vendor.k({
  __name: "index",
  props: {
    data: null,
    isSort: null,
    isRoute: { type: Boolean }
  },
  emits: ["jumpEither", "refresh"],
  setup(__props, { emit }) {
    const props = __props;
    const URL = "https://files.zaicang.net";
    console.log(props.isRoute, props.data);
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
    const refresh = (carrierCode) => {
      emit("refresh", carrierCode);
    };
    return (_ctx, _cache) => {
      return common_vendor.z({
        a: __props.isSort
      }, __props.isSort ? {
        b: common_vendor.D(props.data, (item, index, i0) => {
          return common_vendor.z({
            a: item.channel !== common_vendor.B(enums_freight.P).QMS
          }, item.channel !== common_vendor.B(enums_freight.P).QMS ? {} : {}, {
            b: common_vendor.B(URL) + "/carrier-logo/" + item.carrierCode + ".png",
            c: item.channel === common_vendor.B(enums_freight.P).QMS
          }, item.channel === common_vendor.B(enums_freight.P).QMS ? {
            d: common_vendor.G(common_vendor.B(utils_time.a)(item.modified, 10))
          } : {}, {
            e: common_vendor.G(item.carrierCode),
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
            t: index,
            v: common_vendor.C(($event) => jump(item), index)
          });
        })
      } : {
        c: common_vendor.D(props.data, (item, index, i0) => {
          var _a;
          return common_vendor.z({
            a: item.carrierCode !== common_vendor.B(enums_freight.P).QMS && item.products.length > 0 && !__props.isRoute
          }, item.carrierCode !== common_vendor.B(enums_freight.P).QMS && item.products.length > 0 && !__props.isRoute ? {
            b: common_vendor.B(URL) + "/carrier-logo/" + item.carrierCode + ".png",
            c: common_vendor.G(item.carrierCode === common_vendor.B(enums_freight.P).QMS ? "线下运价" : item.carrierCode),
            d: common_vendor.G(common_vendor.B(utils_time.a)((_a = item.products[0]) == null ? void 0 : _a.modified, 10)),
            e: common_vendor.C(($event) => refresh(item.carrierCode), index)
          } : {}, {
            f: item.products.length > 0
          }, item.products.length > 0 ? {
            g: common_vendor.D(item.products, (el, elIndex, i1) => {
              var _a2, _b;
              return common_vendor.z(__props.isRoute && item.products.length > 0 ? {
                a: common_vendor.G((_a2 = item.products[0].por) == null ? void 0 : _a2.cnName),
                b: common_vendor.G((_b = item.products[0].fnd) == null ? void 0 : _b.cnName)
              } : {}, {
                c: el.channel !== common_vendor.B(enums_freight.P).QMS
              }, el.channel !== common_vendor.B(enums_freight.P).QMS ? {} : {}, {
                d: common_vendor.B(URL) + "/carrier-logo/" + el.carrierCode + ".png",
                e: el.channel === common_vendor.B(enums_freight.P).QMS
              }, el.channel === common_vendor.B(enums_freight.P).QMS ? {
                f: common_vendor.G(common_vendor.B(utils_time.a)(el.modified, 10))
              } : {}, {
                g: common_vendor.G(el.carrierCode),
                h: el.vesselName || el.voyNo
              }, el.vesselName || el.voyNo ? {
                i: common_vendor.G(el.vesselName),
                j: common_vendor.G(el.voyNo)
              } : {}, {
                k: common_vendor.G(el.carrierRoute),
                l: el.etd && el.eta
              }, el.etd && el.eta ? {
                m: common_vendor.G(common_vendor.B(utils_time.f)(el.etd, "M-D")),
                n: common_vendor.G(common_vendor.B(utils_time.f)(el.eta, "M-D"))
              } : {}, {
                o: common_vendor.G(el.voyDays),
                p: common_vendor.G(el.cutOffDay ? el.cutOffDay + "截" : "-"),
                q: common_vendor.G(el.departureDay ? el.departureDay + "开" : "-"),
                r: common_vendor.G(el.transit > 0 ? "中转" : "直达"),
                s: common_vendor.G(el.isSale ? "有" : "无"),
                t: common_vendor.D(getPrice(el.innerPrice ? el.innerPrice : el.outerPrice), (price, priceIndex, i2) => {
                  return {
                    a: common_vendor.G(priceIndex),
                    b: common_vendor.G(price ? "$" + price : "-"),
                    c: priceIndex
                  };
                }),
                v: common_vendor.H(el.channel !== common_vendor.B(enums_freight.P).QMS ? "mt-24" : "my-24"),
                w: elIndex,
                x: common_vendor.C(($event) => jump(el), elIndex)
              });
            }),
            h: __props.isRoute && item.products.length > 0,
            i: common_vendor.H(__props.isRoute && item.products.length > 0 ? "mb-20" : "")
          } : {}, {
            j: index
          });
        })
      });
    };
  }
});
const Component = /* @__PURE__ */ common_vendor.q(_sfc_main, [["__scopeId", "data-v-3134b717"], ["__file", "/Users/zhangyi/Desktop/vue/vue3/Vue3-Vite-TS-uniapp freight- system/src/pagesA/freight/component/freight-table/index.vue"]]);
wx.createComponent(Component);
