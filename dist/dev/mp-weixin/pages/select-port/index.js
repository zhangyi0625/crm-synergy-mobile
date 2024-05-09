"use strict";
const common_vendor = require("../../common/vendor.js"), services_api_freight_index = require("../../services/api/freight/index.js");
require("../../utils/http/index.js"), require("../../utils/env.js"), require("../../mock/index.js"), require("../../mock/v1/index.js"), require("../../mock/v1/modules/auth.js"), require("../../mock/utils.js"), require("../../enums/httpEnum.js"), require("../../state/modules/auth.js"), require("../../utils/cache/index.js"), require("../../utils/cache/storageCache.js"), require("../../settings/encryptionSetting.js"), require("../../utils/cipher.js"), require("../../utils/is.js"), require("../../enums/cacheEnum.js"), require("../../services/api/auth.js"), require("../../services/api/user.js"), require("../../utils/http/checkStatus.js"), require("../../utils/uniapi/prompt.js"), require("../../router/index.js"), require("../../router/guard.js");
if (!Array) {
  const _easycom_u_search2 = common_vendor.v("u-search");
  _easycom_u_search2();
}
const _easycom_u_search = () => "../../uni_modules/vk-uview-ui/components/u-search/u-search.js";
if (!Math) {
  (CustomLoading + _easycom_u_search)();
}
const CustomLoading = () => "../../components/Basic-loading/index.js";
const _sfc_main = /* @__PURE__ */ common_vendor.k({
  __name: "index",
  setup(__props) {
    const type = common_vendor.w("");
    const placeholder = common_vendor.w("");
    const loading = common_vendor.w(false);
    const scrollTop = common_vendor.w(0);
    const searchParams = common_vendor.x({
      por: "",
      fnd: "",
      routeId: "",
      popularity: "",
      keyword: ""
    });
    common_vendor.z((options) => {
      type.value = options.type;
      if (options.type === "POR") {
        searchParams.por = 1;
        loadPorList();
      } else {
        searchParams.fnd = 1;
        loadAreaOptions();
      }
      placeholder.value = options.type == "POR" ? "请输入起运港" : "请输入目的港";
      searchParams.popularity = options.type === "FND" ? 1 : "";
      common_vendor.i.setNavigationBarTitle({
        title: options.type == "POR" ? "选择起运港" : "选择目的港"
      });
      common_vendor.y(services_api_freight_index.e(searchParams));
    });
    const { data: porList, send: loadPorList } = common_vendor.u(
      services_api_freight_index.e(searchParams),
      { immediate: false }
    );
    const {
      data: fndList,
      send: loadFndList,
      onSuccess: changeFndData
    } = common_vendor.u(services_api_freight_index.e(searchParams), { immediate: false });
    const {
      data: areaOptions,
      send: loadAreaOptions,
      onSuccess: loadAreaList
    } = common_vendor.u(services_api_freight_index.a(), { immediate: false });
    loadAreaList(() => {
      loading.value = true;
      areaOptions.value = [
        {
          code: "",
          name: "热门港口",
          id: ""
        },
        ...areaOptions.value.filter((el) => !el.parentId)
      ];
      loadFndList();
    });
    const fndOptions = common_vendor.w([]);
    changeFndData(() => {
      let newArr = [];
      let arr = [];
      if (!searchParams.routeId) {
        newArr = [
          {
            areaInfoName: "热门港口",
            portInfo: fndList.value
          }
        ];
      } else {
        fndList.value.map((item) => {
          let i = arr.indexOf(item.areaCode);
          if (i === -1) {
            arr.push(item.areaCode);
            newArr.push({
              areaInfoName: item.areaName,
              portInfo: [item]
            });
          } else
            newArr[i].portInfo.push(item);
        });
      }
      fndOptions.value = newArr;
      loading.value = false;
      scrollTop.value = 0;
    });
    const onSearch = (value) => {
      if (value) {
        type.value = "POR";
        searchParams.popularity = "";
        searchParams.routeId = "";
        searchParams.fnd = "";
        searchParams.por = "";
        loadPorList();
      }
    };
    const cancel = () => {
      searchParams.keyword = "";
    };
    const onClick = (item) => {
      let pages = getCurrentPages();
      let prevPage = pages[pages.length - 2];
      if (placeholder.value === "请输入起运港") {
        Reflect.set(item, "porInfo", item.cnName + "-" + item.enName);
        Reflect.set(item, "porCode", item.code);
      } else {
        Reflect.set(item, "fndInfo", item.cnName + "-" + item.enName);
        Reflect.set(item, "porCode", item.code);
      }
      prevPage.$vm["searchForm"] = item;
      common_vendor.i.$emit("update", item);
      common_vendor.i.navigateBack({
        delta: 1
      });
    };
    const current = common_vendor.w("");
    const changeArea = (id) => {
      current.value = id;
      searchParams.routeId = id;
      searchParams.popularity = id ? "" : "1";
      loadFndList();
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
        c: common_vendor.D(onSearch),
        d: common_vendor.D(cancel),
        e: common_vendor.D(($event) => searchParams.keyword = $event),
        f: common_vendor.G({
          placeholder: placeholder.value,
          shape: "square",
          ["action-text"]: "取消",
          ["bg-color"]: "#F5F7FA",
          modelValue: searchParams.keyword
        }),
        g: type.value === "POR"
      }, type.value === "POR" ? {
        h: common_vendor.F(common_vendor.C(porList), (item, index, i0) => {
          return {
            a: common_vendor.H(item.cnName),
            b: common_vendor.H(item.enName),
            c: common_vendor.H(item.countryLocalName),
            d: common_vendor.H(item.countryName),
            e: index,
            f: common_vendor.D(($event) => onClick(item), index)
          };
        })
      } : type.value === "FND" ? {
        j: common_vendor.F(common_vendor.C(areaOptions), (item, index, i0) => {
          return {
            a: common_vendor.I(searchParams.routeId === item.id ? "bg-dull-red" : ""),
            b: common_vendor.H(item.name),
            c: index,
            d: common_vendor.D(($event) => changeArea(item.id), index),
            e: common_vendor.I(searchParams.routeId === item.id ? "dull-red font-bold" : "")
          };
        }),
        k: common_vendor.F(fndOptions.value, (item, index, i0) => {
          return {
            a: common_vendor.H(item.areaInfoName),
            b: common_vendor.F(item.portInfo, (child, childIndex, i1) => {
              return {
                a: common_vendor.H(child.cnName),
                b: common_vendor.H(child.enName),
                c: common_vendor.H(child.countryLocalName),
                d: common_vendor.H(child.countryName),
                e: childIndex,
                f: common_vendor.D(($event) => onClick(child), childIndex)
              };
            }),
            c: index
          };
        }),
        l: scrollTop.value
      } : {}, {
        i: type.value === "FND"
      }));
    };
  }
});
const MiniProgramPage = /* @__PURE__ */ common_vendor.q(_sfc_main, [["__scopeId", "data-v-b84642d3"], ["__file", "/Users/zhangyi/Desktop/vue/vue3/Vue3-Vite-TS-uniapp freight- system/src/pages/select-port/index.vue"]]);
wx.createPage(MiniProgramPage);
