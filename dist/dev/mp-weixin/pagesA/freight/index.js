"use strict";
const common_vendor = require("../../common/vendor.js"), services_api_freight_index = require("../../services/api/freight/index.js"), pagesA_freight_config = require("./config.js"), router_index = require("../../router/index.js");
require("../../utils/http/index.js"), require("../../utils/env.js"), require("../../mock/index.js"), require("../../mock/v1/index.js"), require("../../mock/v1/modules/auth.js"), require("../../mock/utils.js"), require("../../enums/httpEnum.js"), require("../../state/modules/auth.js"), require("../../utils/cache/index.js"), require("../../utils/cache/storageCache.js"), require("../../settings/encryptionSetting.js"), require("../../utils/cipher.js"), require("../../utils/is.js"), require("../../enums/cacheEnum.js"), require("../../services/api/auth.js"), require("../../utils/http/checkStatus.js"), require("../../utils/uniapi/prompt.js"), require("../../router/guard.js");
if (!Array) {
  const _easycom_u_popup2 = common_vendor.u("u-popup");
  _easycom_u_popup2();
}
const _easycom_u_popup = () => "../../uni_modules/vk-uview-ui/components/u-popup/u-popup.js";
if (!Math) {
  (common_vendor.z(FreightTable) + _easycom_u_popup)();
}
const FreightTable = () => "./component/freight-table/index.js";
const _sfc_main = /* @__PURE__ */ common_vendor.k({
  __name: "index",
  setup(__props) {
    const locationInfo = common_vendor.v({});
    const current = common_vendor.v(0);
    common_vendor.H((options) => {
      locationInfo.value = JSON.parse(options.info) || {};
      common_vendor.i.setNavigationBarTitle({
        title: locationInfo.value.por.localName + "-" + locationInfo.value.fnd.localName
      });
    });
    const { data: carrierLsit } = common_vendor.x(services_api_freight_index.e(), {
      initialData: []
    });
    common_vendor.v([]);
    const freightParams = common_vendor.w({
      porCode: "",
      fndCode: "",
      sortField: "",
      carriers: "",
      dataSource: "",
      transitNum: null
    });
    console.log(pagesA_freight_config.s, "sortList");
    const priceCtnShow = common_vendor.v(false);
    const changeCurrent = (index) => {
      current.value = index;
      if (index === 1)
        priceCtnShow.value = true;
      else {
        pagesA_freight_config.s[1]["name"] = "最便宜";
        freightParams.sortField = pagesA_freight_config.s[current.value]["value"];
      }
    };
    const changeCtnType = (ctn) => {
      freightParams.sortField = ctn.value;
      priceCtnShow.value = false;
      pagesA_freight_config.s[current.value]["name"] = ctn.label;
    };
    const filterModalShow = common_vendor.v(false);
    const changeFilter = (item, type) => {
      if (type === "carrier") {
        let arr = freightParams.carriers ? freightParams.carriers.split(",") : [];
        freightParams.carriers = arr.length > 0 && arr.includes(item.carrierCode) ? arr.filter((el) => el !== item.carrierCode).join(",") : arr.concat([item.carrierCode]).join(",");
      } else
        freightParams[type] = freightParams[type] === item.value ? "" : item.value;
    };
    const reset = () => {
      console.log(freightParams);
      freightParams.carriers = "";
      freightParams.dataSource = "";
      freightParams.transitNum = null;
    };
    const confirm = () => {
      filterModalShow.value = false;
      console.log(freightParams);
    };
    const jumpEither = (item, type) => {
      console.log(item, "jump", type);
      router_index.r.push(
        "/pagesA/freight/freight-detail/index?info=" + JSON.stringify(item)
      );
    };
    return (_ctx, _cache) => {
      return {
        a: common_vendor.C(common_vendor.z(pagesA_freight_config.s), (item, index, i0) => {
          return common_vendor.y({
            a: common_vendor.F(item.name),
            b: index === 1
          }, index === 1 ? {
            c: !priceCtnShow.value ? "/static/images/freight/down.png" : "/static/images/freight/down-select.png"
          } : {}, {
            d: index === 1 && priceCtnShow.value && current.value === index
          }, index === 1 && priceCtnShow.value && current.value === index ? {
            e: common_vendor.C(common_vendor.z(pagesA_freight_config.c), (ctn, ctnIndex, i1) => {
              return {
                a: common_vendor.F(ctn.label),
                b: ctnIndex,
                c: common_vendor.G(freightParams.sortField === ctn.value ? "dull-red" : "dull-grey"),
                d: common_vendor.B(($event) => changeCtnType(ctn), ctnIndex)
              };
            })
          } : {}, {
            f: index,
            g: common_vendor.G(current.value === index ? "bg-light-red dull-red font-bolds" : "bg-light-grey grey"),
            h: common_vendor.B(($event) => changeCurrent(index), index)
          });
        }),
        b: common_vendor.B(($event) => filterModalShow.value = true),
        c: common_vendor.B(jumpEither),
        d: common_vendor.D({
          data: common_vendor.z(pagesA_freight_config.f)
        }),
        e: common_vendor.C(common_vendor.z(carrierLsit), (item, k0, i0) => {
          return common_vendor.y({
            a: common_vendor.F(item.carrierCode),
            b: freightParams.carriers.split(",").includes(item.carrierCode)
          }, freightParams.carriers.split(",").includes(item.carrierCode) ? {} : {}, {
            c: item.carrierCode,
            d: common_vendor.B(($event) => changeFilter(item, "carrier"), item.carrierCode),
            e: common_vendor.G(freightParams.carriers.split(",").includes(item.carrierCode) ? "bg-light-red dull-red" : "")
          });
        }),
        f: common_vendor.C(common_vendor.z(pagesA_freight_config.d), (item, k0, i0) => {
          return {
            a: common_vendor.F(item.label),
            b: item.label,
            c: common_vendor.B(($event) => changeFilter(item, "dataSource"), item.label),
            d: common_vendor.G(freightParams.dataSource === item.value ? "bg-light-red dull-red" : "")
          };
        }),
        g: common_vendor.C(common_vendor.z(pagesA_freight_config.t), (item, k0, i0) => {
          return {
            a: common_vendor.F(item.label),
            b: item.label,
            c: common_vendor.B(($event) => changeFilter(item, "transitNum"), item.label),
            d: common_vendor.G(freightParams.transitNum === item.value ? "bg-light-red dull-red" : "")
          };
        }),
        h: common_vendor.B(reset),
        i: common_vendor.B(confirm),
        j: common_vendor.B(($event) => filterModalShow.value = $event),
        k: common_vendor.D({
          mode: "top",
          ["custom-style"]: {
            backgroundColor: "#F5F7FA"
          },
          modelValue: filterModalShow.value
        })
      };
    };
  }
});
const MiniProgramPage = /* @__PURE__ */ common_vendor.q(_sfc_main, [["__scopeId", "data-v-b05ec43e"], ["__file", "/Users/zhangyi/Desktop/vue/vue3/Vue3-Vite-TS-uniapp freight- system/src/pagesA/freight/index.vue"]]);
wx.createPage(MiniProgramPage);
