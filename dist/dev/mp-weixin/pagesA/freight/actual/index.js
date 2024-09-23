"use strict";
const common_vendor = require("../../../common/vendor.js"), services_api_freight_index = require("../../../services/api/freight/index.js"), utils_time = require("../../../utils/time.js"), pagesA_freight_config = require("../config.js"), enums_freight = require("../../../enums/freight.js");
require("../../../utils/http/index.js"), require("../../../utils/env.js"), require("../../../mock/index.js"), require("../../../mock/v1/index.js"), require("../../../mock/v1/modules/auth.js"), require("../../../mock/utils.js"), require("../../../enums/httpEnum.js"), require("../../../state/modules/auth.js"), require("../../../utils/cache/index.js"), require("../../../utils/cache/storageCache.js"), require("../../../settings/encryptionSetting.js"), require("../../../utils/cipher.js"), require("../../../utils/is.js"), require("../../../enums/cacheEnum.js"), require("../../../services/api/auth.js"), require("../../../services/api/user.js"), require("../../../utils/http/checkStatus.js"), require("../../../utils/uniapi/prompt.js"), require("../../../router/index.js"), require("../../../router/guard.js");
if (!Math) {
  CustomLoading();
}
const CustomLoading = () => "../../../components/Basic-loading/index.js";
const _sfc_main = /* @__PURE__ */ common_vendor.k({
  __name: "index",
  setup(__props) {
    const router = common_vendor.T();
    const { data: taskData, send: createTask, onSuccess: createTaskSuccess, onError: createTaskError } = common_vendor.u((params) => services_api_freight_index.i(params), { immediate: false });
    const { data: freightNewOptions, send: refreshFreight, onSuccess: refreshFreightSuccess, onError: refreshFreightError } = common_vendor.u((id) => services_api_freight_index.j(id), { immediate: false });
    common_vendor.z((options) => {
      let { porInfo, fndInfo } = JSON.parse(options.info) || {};
      common_vendor.i.setNavigationBarTitle({
        title: porInfo.split("-")[0] + "-" + fndInfo.split("-")[0]
      });
      let params = {
        porCode: options.porCode,
        fndCode: options.fndCode,
        etdStart: utils_time.g(3) + " 00:00:00",
        etdEnd: "",
        carrierList: pagesA_freight_config.b
      };
      createTask(params);
    });
    const freightNewData = common_vendor.w([]);
    const isSearch = common_vendor.w(false);
    const taskID = common_vendor.w("");
    createTaskSuccess(() => {
      if (taskData.value)
        taskID.value = taskData.value;
      taskData.value && refreshFreight(taskData.value);
    });
    createTaskError(() => {
      setTimeout(() => {
        freightNewData.value.map((item) => {
          item.searchstate = "";
        });
      }, 300);
    });
    const URL = "https://files.zaicang.net";
    const timer = common_vendor.w(null);
    refreshFreightSuccess(() => {
      isSearch.value = true;
      if (timer.value) {
        clearInterval(timer.value);
        timer.value = null;
      }
      timer.value = setInterval(() => {
        if (freightNewOptions.value.taskStatus === "SUCCESS") {
          clearInterval(timer.value);
          isSearch.value = false;
          if (freightNewOptions.value.productList && freightNewOptions.value.productList.length > 0) {
            changeData(freightNewOptions.value.productList, "sort");
          } else {
            freightNewData.value.map((item) => {
              item.searchstate = "";
            });
          }
        } else if (freightNewOptions.value.taskStatus === "PENDING") {
          if (freightNewOptions.value.productList && freightNewOptions.value.productList.length > 0) {
            changeData(freightNewOptions.value.productList);
          }
          refreshFreight(taskID.value);
          common_vendor.y(refreshFreight(taskID.value));
        } else
          clearInterval(timer.value);
      }, 3e3);
    });
    refreshFreightError(() => {
      clearInterval(timer.value);
    });
    const changeData = (data, type) => {
      let arr = pagesA_freight_config.b.map((item) => {
        return {
          carrierCode: item,
          products: data.filter((el) => el.carrierCode === item)
        };
      });
      freightNewData.value = type ? arr.sort((a, b) => b.products.length - a.products.length) : arr;
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
    const openShrink = (carrierCode) => {
      freightNewData.value.map((el) => {
        if (el.carrierCode === carrierCode && !el.searchstate)
          el.isShrink = !el.isShrink ? true : false;
      });
    };
    const jump = (id) => {
      router.push(
        "/pagesA/freight/freight-detail/index?info=" + id
      );
    };
    const isEmpty = (arr) => {
      return arr.filter((el) => el.products.length >= 0).length >= 0;
    };
    return (_ctx, _cache) => {
      return common_vendor.B({
        a: !isEmpty(freightNewData.value)
      }, !isEmpty(freightNewData.value) ? {
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
        c: isSearch.value
      }, isSearch.value ? {} : {}, {
        d: common_vendor.F(freightNewData.value, (item, index, i0) => {
          var _a, _b, _c;
          return common_vendor.B({
            a: item.carrierCode !== common_vendor.C(enums_freight.P).QMS
          }, item.carrierCode !== common_vendor.C(enums_freight.P).QMS ? common_vendor.B({
            b: common_vendor.C(URL) + "/carrier-logo/" + item.carrierCode + ".png",
            c: common_vendor.H(item.carrierCode === common_vendor.C(enums_freight.P).QMS ? "线下运价" : item.carrierCode),
            d: !item.isShrink
          }, !item.isShrink ? common_vendor.B({
            e: ((_a = item.products[0]) == null ? void 0 : _a.modified) && !item.searchstate
          }, ((_b = item.products[0]) == null ? void 0 : _b.modified) && !item.searchstate ? {
            f: common_vendor.H(common_vendor.C(utils_time.a)((_c = item.products[0]) == null ? void 0 : _c.modified, 10))
          } : {}, {
            g: common_vendor.N(item.isShrink ? "opacity:0" : "z-index:1"),
            h: common_vendor.D(($event) => openShrink(item.carrierCode), index)
          }) : {
            i: common_vendor.N(item.isShrink ? "opacity:1" : ""),
            j: common_vendor.D(($event) => openShrink(item.carrierCode), index)
          }, {
            k: common_vendor.D(($event) => openShrink(item.carrierCode), index)
          }) : {}, {
            l: item.products.length > 0 && !item.isShrink
          }, item.products.length > 0 && !item.isShrink ? {
            m: common_vendor.F(item.products, (el, elIndex, i1) => {
              return common_vendor.B({
                a: el.channel !== common_vendor.C(enums_freight.P).QMS
              }, el.channel !== common_vendor.C(enums_freight.P).QMS ? {
                b: "/static/images/freight/" + el.channel + ".png"
              } : {}, {
                c: common_vendor.C(URL) + "/carrier-logo/" + el.carrierCode + ".png",
                d: el.channel === common_vendor.C(enums_freight.P).QMS || el.channel === common_vendor.C(enums_freight.P).SPOT
              }, el.channel === common_vendor.C(enums_freight.P).QMS || el.channel === common_vendor.C(enums_freight.P).SPOT ? {
                e: common_vendor.H(common_vendor.C(utils_time.a)(el.modified, 10))
              } : {}, {
                f: common_vendor.H(el.carrierCode),
                g: el.vesselName || el.voyNo
              }, el.vesselName || el.voyNo ? {
                h: common_vendor.H(el.vesselName),
                i: common_vendor.H(el.voyNo)
              } : {}, {
                j: common_vendor.H(el.carrierRoute),
                k: el.etd && el.eta
              }, el.etd && el.eta ? {
                l: common_vendor.H(common_vendor.C(utils_time.f)(el.etd, "M-D")),
                m: common_vendor.H(common_vendor.C(utils_time.f)(el.eta, "M-D"))
              } : {}, {
                n: common_vendor.H(el.voyDays),
                o: common_vendor.H(el.cutOffDay ? el.cutOffDay : "-"),
                p: common_vendor.H(el.departureDay ? el.departureDay : "-"),
                q: common_vendor.H(el.transit > 0 ? "中转" : "直达"),
                r: el.tag
              }, el.tag ? {
                s: common_vendor.H(el.tag),
                t: common_vendor.N(el.tag === "强推" ? "background: #FF844A" : "background: #FFB23F")
              } : {}, {
                v: common_vendor.H(el.isSale ? "有" : "无"),
                w: common_vendor.F(getPrice(el.innerPrice ? el.innerPrice : el.outerPrice), (price, priceIndex, i2) => {
                  return {
                    a: common_vendor.H(priceIndex),
                    b: common_vendor.H(price ? "$" + price : "-"),
                    c: priceIndex
                  };
                }),
                x: common_vendor.I(el.channel !== common_vendor.C(enums_freight.P).QMS ? "mt-24" : "my-24"),
                y: elIndex,
                z: common_vendor.D(($event) => jump(el.id), elIndex)
              });
            }),
            n: common_vendor.I(item.products.length > 0 ? "mt-20" : "")
          } : {}, {
            o: index
          });
        })
      }));
    };
  }
});
const MiniProgramPage = /* @__PURE__ */ common_vendor.q(_sfc_main, [["__scopeId", "data-v-2cb66466"], ["__file", "/Users/zhangyi/Desktop/vue/vue3/Vue3-Vite-TS-uniapp freight- system/src/pagesA/freight/actual/index.vue"]]);
wx.createPage(MiniProgramPage);
