"use strict";
const common_vendor = require("../../common/vendor.js"), services_api_freight_index = require("../../services/api/freight/index.js"), pagesA_freight_config = require("./config.js"), utils_uniapi_prompt = require("../../utils/uniapi/prompt.js");
require("../../utils/http/index.js"), require("../../utils/env.js"), require("../../mock/index.js"), require("../../mock/v1/index.js"), require("../../mock/v1/modules/auth.js"), require("../../mock/utils.js"), require("../../enums/httpEnum.js"), require("../../state/modules/auth.js"), require("../../utils/cache/index.js"), require("../../utils/cache/storageCache.js"), require("../../settings/encryptionSetting.js"), require("../../utils/cipher.js"), require("../../utils/is.js"), require("../../enums/cacheEnum.js"), require("../../services/api/auth.js"), require("../../services/api/user.js"), require("../../utils/http/checkStatus.js"), require("../../router/index.js"), require("../../router/guard.js");
if (!Array) {
  const _easycom_u_empty2 = common_vendor.v("u-empty");
  const _easycom_u_popup2 = common_vendor.v("u-popup");
  (_easycom_u_empty2 + _easycom_u_popup2)();
}
const _easycom_u_empty = () => "../../uni_modules/vk-uview-ui/components/u-empty/u-empty.js";
const _easycom_u_popup = () => "../../uni_modules/vk-uview-ui/components/u-popup/u-popup.js";
if (!Math) {
  (CustomLoading + common_vendor.B(FreightTable) + _easycom_u_empty + _easycom_u_popup)();
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
    common_vendor.I((options) => {
      loading.value = true;
      if (options.routeId) {
        freightParams.routeId = options.routeId;
        common_vendor.i.setNavigationBarTitle({
          title: options.routeName
        });
        isSend();
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
      console.log(options, "options", JSON.parse(options.info));
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
      status: 1
      // sortField: "",
      // carriers: "",
      // dataSource: "",
      // transitNum: null,
    });
    const { data: freightData, send: isSend, onSuccess } = common_vendor.u((params) => services_api_freight_index.b(freightParams), { immediate: false });
    const priceCtnShow = common_vendor.w(false);
    const changeCurrent = (index) => {
      current.value = index;
      if (index === 1)
        priceCtnShow.value = true;
      else {
        pagesA_freight_config.s[1]["name"] = "最便宜";
        freightParams.sortField = pagesA_freight_config.s[current.value]["value"];
      }
    };
    onSuccess(() => {
      loading.value = false;
    });
    const changeCtnType = (ctn) => {
      freightParams.sortField = ctn.value;
      priceCtnShow.value = false;
      pagesA_freight_config.s[current.value]["name"] = ctn.label;
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
    return (_ctx, _cache) => {
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
        c: common_vendor.D(common_vendor.B(pagesA_freight_config.s), (item, index, i0) => {
          return common_vendor.z({
            a: common_vendor.G(item.name),
            b: index === 1
          }, index === 1 ? {
            c: !priceCtnShow.value ? "/static/images/freight/down.png" : "/static/images/freight/down-select.png"
          } : {}, {
            d: index === 1 && priceCtnShow.value && current.value === index
          }, index === 1 && priceCtnShow.value && current.value === index ? {
            e: common_vendor.D(common_vendor.B(pagesA_freight_config.c), (ctn, ctnIndex, i1) => {
              return {
                a: common_vendor.G(ctn.label),
                b: ctnIndex,
                c: common_vendor.H(freightParams.sortField === ctn.value ? "dull-red" : "dull-grey"),
                d: common_vendor.C(($event) => changeCtnType(ctn), ctnIndex)
              };
            })
          } : {}, {
            f: index,
            g: common_vendor.H(current.value === index ? "bg-light-red dull-red font-bolds" : "bg-light-grey grey"),
            h: common_vendor.C(($event) => changeCurrent(index), index)
          });
        }),
        d: common_vendor.C(($event) => filterModalShow.value = true),
        e: common_vendor.B(freightData) && common_vendor.B(freightData).length > 0
      }, common_vendor.B(freightData) && common_vendor.B(freightData).length > 0 ? {
        f: common_vendor.C(jumpEither),
        g: common_vendor.F({
          data: common_vendor.B(freightData)
        })
      } : {
        h: common_vendor.F({
          mode: "data"
        })
      }, {
        i: common_vendor.D(common_vendor.B(carrierList), (item, k0, i0) => {
          return common_vendor.z({
            a: common_vendor.G(item.code),
            b: freightParams.carrier.split(",").includes(item.code)
          }, freightParams.carrier.split(",").includes(item.code) ? {} : {}, {
            c: item.code,
            d: common_vendor.C(($event) => changeFilter(item, "carrier"), item.code),
            e: common_vendor.H(freightParams.carrier.split(",").includes(item.code) ? "bg-light-red dull-red" : "")
          });
        }),
        j: common_vendor.D(common_vendor.B(pagesA_freight_config.d), (item, k0, i0) => {
          return {
            a: common_vendor.G(item.label),
            b: item.label,
            c: common_vendor.C(($event) => changeFilter(item, "channel"), item.label),
            d: common_vendor.H(freightParams.channel === item.value ? "bg-light-red dull-red" : "")
          };
        }),
        k: common_vendor.D(common_vendor.B(pagesA_freight_config.t), (item, k0, i0) => {
          return {
            a: common_vendor.G(item.label),
            b: item.label,
            c: common_vendor.C(($event) => changeFilter(item, "transit"), item.label),
            d: common_vendor.H(freightParams.transit === item.value ? "bg-light-red dull-red" : "")
          };
        }),
        l: common_vendor.C(reset),
        m: common_vendor.C(confirm),
        n: common_vendor.C(($event) => filterModalShow.value = $event),
        o: common_vendor.F({
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
