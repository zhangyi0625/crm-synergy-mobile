"use strict";
const common_vendor = require("../../../../common/vendor.js"), enums_freight = require("../../../../enums/freight.js"), utils_time = require("../../../../utils/time.js"), utils_uniapi_prompt = require("../../../../utils/uniapi/prompt.js");
const _sfc_main = /* @__PURE__ */ common_vendor.k({
  __name: "index",
  props: {
    data: null,
    isSort: null,
    isRoute: { type: Boolean }
  },
  emits: ["jumpEither", "refresh", "openShrink"],
  setup(__props, { emit }) {
    const props = __props;
    const URL = "https://files.zaicang.net";
    const jump = (item, type) => {
      if (type) {
        return;
      }
      emit("jumpEither", item, type);
    };
    const getPrice = (price) => {
      let innerPrice = JSON.parse(price);
      let ctnType = ["20GP", "40GP", "40HQ"];
      let obj = {};
      if (innerPrice) {
        for (let i in ctnType) {
          if (innerPrice["normal"])
            obj[ctnType[i]] = innerPrice["normal"][ctnType[i]] || "";
        }
        for (let i in innerPrice["special"]) {
          if (ctnType.includes(i))
            obj[i] = innerPrice["special"][i];
        }
      }
      return obj;
    };
    const refresh = (carrierCode) => {
      if (props.data.find((el) => el.searchstate)) {
        utils_uniapi_prompt.T("存在其他运价实时任务正在执行！");
        return;
      }
      emit("refresh", carrierCode);
    };
    const openShrink = (carrierCode) => {
      emit("openShrink", carrierCode);
    };
    return (_ctx, _cache) => {
      return common_vendor.B({
        a: __props.isSort
      }, __props.isSort ? {
        b: common_vendor.F(props.data, (item, index, i0) => {
          return common_vendor.B({
            a: item.channel !== common_vendor.C(enums_freight.P).QMS
          }, item.channel !== common_vendor.C(enums_freight.P).QMS ? {
            b: "/static/images/freight/" + item.channel + ".png"
          } : {}, {
            c: common_vendor.C(URL) + "/carrier-logo/" + item.carrierCode + ".png",
            d: item.channel === common_vendor.C(enums_freight.P).QMS || item.channel === common_vendor.C(enums_freight.P).SPOT
          }, item.channel === common_vendor.C(enums_freight.P).QMS || item.channel === common_vendor.C(enums_freight.P).SPOT ? {
            e: common_vendor.H(common_vendor.C(utils_time.a)(item.modified, 10))
          } : {}, {
            f: common_vendor.H(item.carrierCode),
            g: item.vesselName || item.voyNo
          }, item.vesselName || item.voyNo ? {
            h: common_vendor.H(item.vesselName),
            i: common_vendor.H(item.voyNo)
          } : {}, {
            j: common_vendor.H(item.carrierRoute),
            k: item.etd && item.eta
          }, item.etd && item.eta ? {
            l: common_vendor.H(common_vendor.C(utils_time.f)(item.etd, "M-D")),
            m: common_vendor.H(common_vendor.C(utils_time.f)(item.eta, "M-D"))
          } : {}, {
            n: common_vendor.H(item.voyDays),
            o: common_vendor.H(item.cutOffDay ? item.cutOffDay : "-"),
            p: common_vendor.H(item.departureDay ? item.departureDay : "-"),
            q: common_vendor.H(item.transit > 0 ? "中转" : "直达"),
            r: item.tag
          }, item.tag ? {
            s: common_vendor.H(item.tag),
            t: common_vendor.L(item.tag === "强推" ? "background: #FF844A" : "background: #FFB23F")
          } : {}, {
            v: common_vendor.H(item.isSale ? "有" : "无"),
            w: common_vendor.F(getPrice(item.innerPrice ? item.innerPrice : item.outerPrice), (price, priceIndex, i1) => {
              return {
                a: common_vendor.H(priceIndex),
                b: common_vendor.H(price ? "$" + price : "-"),
                c: priceIndex
              };
            }),
            x: common_vendor.I(item.channel !== common_vendor.C(enums_freight.P).QMS ? "mt-24" : "my-24"),
            y: index,
            z: common_vendor.D(($event) => jump(item), index)
          });
        })
      } : {
        c: common_vendor.F(props.data, (item, index, i0) => {
          var _a, _b, _c;
          return common_vendor.B({
            a: item.carrierCode !== common_vendor.C(enums_freight.P).QMS && !__props.isRoute
          }, item.carrierCode !== common_vendor.C(enums_freight.P).QMS && !__props.isRoute ? common_vendor.B({
            b: common_vendor.C(URL) + "/carrier-logo/" + item.carrierCode + ".png",
            c: common_vendor.H(item.carrierCode === common_vendor.C(enums_freight.P).QMS ? "线下运价" : item.carrierCode),
            d: !item.isShrink
          }, !item.isShrink ? common_vendor.B({
            e: ((_a = item.products[0]) == null ? void 0 : _a.modified) && !item.searchstate
          }, ((_b = item.products[0]) == null ? void 0 : _b.modified) && !item.searchstate ? {
            f: common_vendor.H(common_vendor.C(utils_time.a)((_c = item.products[0]) == null ? void 0 : _c.modified, 10))
          } : {}, {
            g: !item.searchstate
          }, !item.searchstate ? {
            h: common_vendor.D(($event) => refresh(item.carrierCode), index)
          } : {}, {
            i: common_vendor.L(item.isShrink ? "opacity:0" : "z-index:1"),
            j: common_vendor.D(($event) => openShrink(item.carrierCode), index)
          }) : {
            k: common_vendor.L(item.isShrink ? "opacity:1" : ""),
            l: common_vendor.D(($event) => openShrink(item.carrierCode), index)
          }) : {}, {
            m: item.products.length > 0 && !item.isShrink
          }, item.products.length > 0 && !item.isShrink ? {
            n: common_vendor.F(item.products, (el, elIndex, i1) => {
              var _a2, _b2, _c2, _d;
              return common_vendor.B(__props.isRoute && item.products.length > 0 ? {
                a: common_vendor.H((_a2 = item.products[0].por) == null ? void 0 : _a2.cnName),
                b: common_vendor.H((_b2 = item.products[0].por) == null ? void 0 : _b2.enName),
                c: common_vendor.H((_c2 = item.products[0].fnd) == null ? void 0 : _c2.cnName),
                d: common_vendor.H((_d = item.products[0].fnd) == null ? void 0 : _d.enName)
              } : {}, {
                e: el.channel !== common_vendor.C(enums_freight.P).QMS
              }, el.channel !== common_vendor.C(enums_freight.P).QMS ? {
                f: "/static/images/freight/" + el.channel + ".png"
              } : {}, {
                g: common_vendor.C(URL) + "/carrier-logo/" + el.carrierCode + ".png",
                h: el.channel === common_vendor.C(enums_freight.P).QMS || el.channel === common_vendor.C(enums_freight.P).SPOT
              }, el.channel === common_vendor.C(enums_freight.P).QMS || el.channel === common_vendor.C(enums_freight.P).SPOT ? {
                i: common_vendor.H(common_vendor.C(utils_time.a)(el.modified, 10))
              } : {}, {
                j: common_vendor.H(el.carrierCode),
                k: el.vesselName || el.voyNo
              }, el.vesselName || el.voyNo ? {
                l: common_vendor.H(el.vesselName),
                m: common_vendor.H(el.voyNo)
              } : {}, {
                n: common_vendor.H(el.carrierRoute),
                o: el.etd && el.eta
              }, el.etd && el.eta ? {
                p: common_vendor.H(common_vendor.C(utils_time.f)(el.etd, "M-D")),
                q: common_vendor.H(common_vendor.C(utils_time.f)(el.eta, "M-D"))
              } : {}, {
                r: common_vendor.H(el.voyDays),
                s: common_vendor.H(el.cutOffDay ? el.cutOffDay : "-"),
                t: common_vendor.H(el.departureDay ? el.departureDay : "-"),
                v: common_vendor.H(el.transit > 0 ? "中转" : "直达"),
                w: el.tag
              }, el.tag ? {
                x: common_vendor.H(el.tag),
                y: common_vendor.L(el.tag === "强推" ? "background: #FF844A" : "background: #FFB23F")
              } : {}, {
                z: common_vendor.H(el.isSale ? "有" : "无"),
                A: common_vendor.F(getPrice(el.innerPrice ? el.innerPrice : el.outerPrice), (price, priceIndex, i2) => {
                  return {
                    a: common_vendor.H(priceIndex),
                    b: common_vendor.H(price ? "$" + price : "-"),
                    c: priceIndex
                  };
                }),
                B: common_vendor.I(el.channel !== common_vendor.C(enums_freight.P).QMS ? "mt-24" : "my-24"),
                C: elIndex,
                D: common_vendor.D(($event) => jump(el, item.searchstate), elIndex)
              });
            }),
            o: __props.isRoute && item.products.length > 0,
            p: common_vendor.I(__props.isRoute && item.products.length > 0 ? "mt-20" : ""),
            q: common_vendor.I(__props.isRoute && item.products.length > 0 ? "mb-20 pb-0" : "")
          } : {}, {
            r: index
          });
        })
      });
    };
  }
});
const Component = /* @__PURE__ */ common_vendor.q(_sfc_main, [["__scopeId", "data-v-3134b717"], ["__file", "/Users/zhangyi/Desktop/vue/vue3/Vue3-Vite-TS-uniapp freight- system/src/pagesA/freight/component/freight-table/index.vue"]]);
wx.createComponent(Component);
