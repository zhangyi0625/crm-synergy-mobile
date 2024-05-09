"use strict";
const common_vendor = require("../../common/vendor.js"), services_api_freight_index = require("../../services/api/freight/index.js"), pagesA_freight_config = require("./config.js"), utils_uniapi_prompt = require("../../utils/uniapi/prompt.js"), enums_freight = require("../../enums/freight.js"), utils_time = require("../../utils/time.js");
require("../../utils/http/index.js"), require("../../utils/env.js"), require("../../mock/index.js"), require("../../mock/v1/index.js"), require("../../mock/v1/modules/auth.js"), require("../../mock/utils.js"), require("../../enums/httpEnum.js"), require("../../state/modules/auth.js"), require("../../utils/cache/index.js"), require("../../utils/cache/storageCache.js"), require("../../settings/encryptionSetting.js"), require("../../utils/cipher.js"), require("../../utils/is.js"), require("../../enums/cacheEnum.js"), require("../../services/api/auth.js"), require("../../services/api/user.js"), require("../../utils/http/checkStatus.js"), require("../../router/index.js"), require("../../router/guard.js");
if (!Array) {
  const _easycom_u_tabs2 = common_vendor.v("u-tabs");
  const _easycom_u_empty2 = common_vendor.v("u-empty");
  const _easycom_u_popup2 = common_vendor.v("u-popup");
  (_easycom_u_tabs2 + _easycom_u_empty2 + _easycom_u_popup2)();
}
const _easycom_u_tabs = () => "../../uni_modules/vk-uview-ui/components/u-tabs/u-tabs.js";
const _easycom_u_empty = () => "../../uni_modules/vk-uview-ui/components/u-empty/u-empty.js";
const _easycom_u_popup = () => "../../uni_modules/vk-uview-ui/components/u-popup/u-popup.js";
if (!Math) {
  (CustomLoading + _easycom_u_tabs + common_vendor.C(FreightTable) + _easycom_u_empty + _easycom_u_popup)();
}
const FreightTable = () => "./component/freight-table/index.js";
const CustomLoading = () => "../../components/Basic-loading/index.js";
const _sfc_main = /* @__PURE__ */ common_vendor.k({
  __name: "index",
  setup(__props) {
    const loading = common_vendor.w(false);
    const router = common_vendor.T();
    const locationInfo = common_vendor.w({});
    const current = common_vendor.w(0);
    common_vendor.z((options) => {
      loading.value = true;
      console.log(options, "options");
      if (options.TABS) {
        TABS.value = JSON.parse(options.TABS);
        freightParams.routeId = options.routeId ? options.routeId : "";
        freightParams.tagId = options.routeId ? "" : TABS.value[0].value;
        tabIndex.value = freightParams.routeId ? TABS.value.findIndex((el) => el.id === freightParams.routeId) : 0;
        locationInfo.value = null;
        common_vendor.i.setNavigationBarTitle({
          title: options.routeName
        });
        freightParams.channel = "QMS";
        isSend();
        common_vendor.y(services_api_freight_index.b(freightParams));
      } else {
        locationInfo.value = JSON.parse(options.info) || {};
        let { porInfo, fndInfo } = locationInfo.value;
        common_vendor.i.setNavigationBarTitle({
          title: (porInfo ? porInfo.split("-")[0] : locationInfo.value.porCnlName) + "-" + (fndInfo ? fndInfo.split("-")[0] : locationInfo.value.fndCnlName)
        });
        freightParams.por = locationInfo.value.porCode;
        freightParams.fnd = locationInfo.value.fndCode;
      }
      freightParams.por && freightParams.fnd && isSend();
      freightParams.por && freightParams.fnd && common_vendor.y(services_api_freight_index.b(freightParams));
    });
    const { data: carrierList } = common_vendor.u(services_api_freight_index.f(), {
      initialData: []
    });
    const freightParams = common_vendor.x({
      por: "",
      fnd: "",
      carrier: "",
      transit: "",
      channel: "",
      status: 1,
      tagId: "",
      routeId: ""
    });
    const freightNewData = common_vendor.w([]);
    const { data: freightData, send: isSend, onSuccess } = common_vendor.u(services_api_freight_index.b(freightParams), { immediate: false });
    const priceCtnShow = common_vendor.w(false);
    const changeCurrent = (index) => {
      current.value = index;
      if (index === 1)
        priceCtnShow.value = true;
      else {
        pagesA_freight_config.s[1]["name"] = "最便宜";
        freightParams.sort = pagesA_freight_config.s[current.value]["value"];
      }
      loading.value = true;
      isSend();
    };
    onSuccess(() => {
      let arr = pagesA_freight_config.b.map((item) => {
        return {
          carrierCode: item,
          products: []
        };
      });
      for (let i in freightData.value) {
        arr.forEach((item) => {
          if (item.carrierCode === freightData.value[i].carrierCode && freightData.value[i].channel !== enums_freight.P.QMS && freightData.value[i].channel !== enums_freight.P.SPOT)
            item.products.push(freightData.value[i]);
        });
      }
      arr[0].products = freightData.value.filter((el) => el.channel === enums_freight.P.QMS || el.channel === enums_freight.P.SPOT);
      freightNewData.value = freightParams.sort ? freightData.value : arr;
      loading.value = false;
    });
    const changeCtnType = (ctn) => {
      freightParams.sort = ctn.value;
      priceCtnShow.value = false;
      pagesA_freight_config.s[current.value]["name"] = ctn.label;
      loading.value = true;
      isSend();
    };
    const filterModalShow = common_vendor.w(false);
    const changeFilter = (item, type) => {
      if (type === "carrier") {
        let arr = freightParams.carrier ? freightParams.carrier.split(",") : [];
        freightParams.carrier = arr.length > 0 && arr.includes(item.code) ? arr.filter((el) => el !== item.code).join(",") : arr.concat([item.code]).join(",");
      } else
        freightParams[type] = freightParams[type] === item.value ? "" : item.value;
    };
    const reset = () => {
      freightParams.carrier = "";
      freightParams.channel = "";
      freightParams.transit = "";
      filterModalShow.value = false;
      isSend();
    };
    const confirm = () => {
      filterModalShow.value = false;
      isSend();
    };
    const jumpEither = (item, type) => {
      if (type) {
        console.log(item, "jump", type);
        utils_uniapi_prompt.T("在舱实时运价还未开放！");
      } else
        router.push(
          "/pagesA/freight/freight-detail/index?info=" + JSON.stringify(item)
        );
    };
    const tabIndex = common_vendor.w(0);
    const TABS = common_vendor.w([]);
    const tabChange = (val) => {
      current.value = val;
      if (current.value === 0 || current.value === 1) {
        freightParams.routeId = "";
        freightParams.tagId = TABS.value[current.value].value;
      } else {
        freightParams.tagId = "";
        freightParams.routeId = TABS.value[current.value].id;
      }
      isSend();
    };
    const isEmpty = (arr) => {
      return arr.filter((el) => freightParams.sort ? el : el.products.length >= 0).length >= 0;
    };
    const { data: taskData, send: createTask, onSuccess: createTaskSuccess, onError: createTaskError } = common_vendor.u((params) => services_api_freight_index.p(params), { immediate: false });
    const { data: freightNewOptions, send: refreshFreight, onSuccess: refreshFreightSuccess, onError: refreshFreightError } = common_vendor.u((id) => services_api_freight_index.h(id), { immediate: false });
    const carrierRefresh = (carrierCode) => {
      console.log(freightNewData.value, "freightNewData.value ", utils_time.g(3));
      freightNewData.value.map((item) => {
        if (item.carrierCode === carrierCode)
          item.searchstate = "正在更新....";
      });
      let params = {
        carrierList: [carrierCode],
        porCode: freightParams.por,
        fndCode: freightParams.fnd,
        etdStart: utils_time.g(3) + " 00:00:00",
        etdEnd: ""
      };
      createTask(params);
    };
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
    const timer = common_vendor.w(null);
    refreshFreightSuccess(() => {
      if (timer.value) {
        clearInterval(timer.value);
        timer.value = null;
      }
      timer.value = setInterval(() => {
        if (freightNewOptions.value.taskStatus === "SUCCESS") {
          clearInterval(timer.value);
          console.log("success", freightNewOptions.value);
          if (freightNewOptions.value.productList && freightNewOptions.value.productList.length > 0) {
            let carrierCode = freightNewOptions.value.productList[0].carrierCode;
            freightNewData.value.map((el) => {
              if (el.carrierCode === carrierCode) {
                el.products = freightNewOptions.value.productList;
                el.searchstate = "";
              }
            });
          } else {
            freightNewData.value.map((item) => {
              item.searchstate = "";
            });
          }
          console.log(freightNewData.value, "freightNewData.value");
        } else if (freightNewOptions.value.taskStatus === "PENDING") {
          if (freightNewOptions.value.productList && freightNewOptions.value.productList.length > 0) {
            let carrierCode = freightNewOptions.value.productList[0].carrierCode;
            freightNewData.value.map((el) => {
              if (el.carrierCode === carrierCode)
                el.products = freightNewOptions.value.productList;
            });
          }
          refreshFreight(taskID.value);
          common_vendor.y(refreshFreight(taskID.value));
        } else
          clearInterval(timer.value);
      }, 2e3);
    });
    refreshFreightError(() => {
      clearInterval(timer.value);
    });
    const openShrink = (carrierCode) => {
      freightNewData.value.map((el) => {
        if (el.carrierCode === carrierCode && !el.searchstate)
          el.isShrink = !el.isShrink ? true : false;
      });
    };
    return (_ctx, _cache) => {
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
        c: locationInfo.value
      }, locationInfo.value ? {
        d: common_vendor.F(common_vendor.C(pagesA_freight_config.s), (item, index, i0) => {
          return common_vendor.B({
            a: common_vendor.H(item.name),
            b: index === 1
          }, index === 1 ? {
            c: !priceCtnShow.value ? "/static/images/freight/down.png" : "/static/images/freight/down-select.png"
          } : {}, {
            d: index === 1 && priceCtnShow.value && current.value === index
          }, index === 1 && priceCtnShow.value && current.value === index ? {
            e: common_vendor.F(common_vendor.C(pagesA_freight_config.c), (ctn, ctnIndex, i1) => {
              return {
                a: common_vendor.H(ctn.label),
                b: ctnIndex,
                c: common_vendor.I(freightParams.sort === ctn.value ? "dull-red" : "dull-grey"),
                d: common_vendor.D(($event) => changeCtnType(ctn), ctnIndex)
              };
            })
          } : {}, {
            f: index,
            g: common_vendor.I(current.value === index ? "bg-light-red dull-red font-bolds" : "bg-light-grey grey"),
            h: common_vendor.D(($event) => changeCurrent(index), index)
          });
        }),
        e: common_vendor.D(($event) => filterModalShow.value = true)
      } : {
        f: common_vendor.D(tabChange),
        g: common_vendor.D(($event) => tabIndex.value = $event),
        h: common_vendor.G({
          list: TABS.value,
          ["active-color"]: "#EE2233",
          modelValue: tabIndex.value
        })
      }, {
        i: isEmpty(freightNewData.value)
      }, isEmpty(freightNewData.value) ? {
        j: common_vendor.D(carrierRefresh),
        k: common_vendor.D(jumpEither),
        l: common_vendor.D(openShrink),
        m: common_vendor.G({
          data: freightNewData.value,
          isSort: freightParams.sort,
          isRoute: !locationInfo.value
        })
      } : {
        n: common_vendor.G({
          mode: "data"
        })
      }, {
        o: common_vendor.F(common_vendor.C(carrierList), (item, k0, i0) => {
          return common_vendor.B({
            a: common_vendor.H(item.code),
            b: freightParams.carrier.split(",").includes(item.code)
          }, freightParams.carrier.split(",").includes(item.code) ? {} : {}, {
            c: item.code,
            d: common_vendor.D(($event) => changeFilter(item, "carrier"), item.code),
            e: common_vendor.I(freightParams.carrier.split(",").includes(item.code) ? "bg-light-red dull-red" : "")
          });
        }),
        p: common_vendor.F(common_vendor.C(pagesA_freight_config.d), (item, k0, i0) => {
          return {
            a: common_vendor.H(item.label),
            b: item.label,
            c: common_vendor.D(($event) => changeFilter(item, "channel"), item.label),
            d: common_vendor.I(freightParams.channel === item.value ? "bg-light-red dull-red" : "")
          };
        }),
        q: common_vendor.F(common_vendor.C(pagesA_freight_config.t), (item, k0, i0) => {
          return {
            a: common_vendor.H(item.label),
            b: item.label,
            c: common_vendor.D(($event) => changeFilter(item, "transit"), item.label),
            d: common_vendor.I(freightParams.transit === item.value ? "bg-light-red dull-red" : "")
          };
        }),
        r: common_vendor.D(reset),
        s: common_vendor.D(confirm),
        t: common_vendor.D(($event) => filterModalShow.value = $event),
        v: common_vendor.G({
          mode: "top",
          ["custom-style"]: {
            backgroundColor: "#F5F7FA"
          },
          modelValue: filterModalShow.value
        })
      }));
    };
  }
});
const MiniProgramPage = /* @__PURE__ */ common_vendor.q(_sfc_main, [["__scopeId", "data-v-b05ec43e"], ["__file", "/Users/zhangyi/Desktop/vue/vue3/Vue3-Vite-TS-uniapp freight- system/src/pagesA/freight/index.vue"]]);
wx.createPage(MiniProgramPage);
