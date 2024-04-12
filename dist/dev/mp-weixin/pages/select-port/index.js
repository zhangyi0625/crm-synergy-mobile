"use strict";
const common_vendor = require("../../common/vendor.js"), services_api_freight_index = require("../../services/api/freight/index.js");
require("../../utils/http/index.js"), require("../../utils/env.js"), require("../../mock/index.js"), require("../../mock/v1/index.js"), require("../../mock/v1/modules/auth.js"), require("../../mock/utils.js"), require("../../enums/httpEnum.js"), require("../../state/modules/auth.js"), require("../../utils/cache/index.js"), require("../../utils/cache/storageCache.js"), require("../../settings/encryptionSetting.js"), require("../../utils/cipher.js"), require("../../utils/is.js"), require("../../enums/cacheEnum.js"), require("../../services/api/auth.js"), require("../../utils/http/checkStatus.js"), require("../../utils/uniapi/prompt.js");
if (!Array) {
  const _easycom_u_search2 = common_vendor.u("u-search");
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
    const type = common_vendor.v("");
    const placeholder = common_vendor.v("");
    const loading = common_vendor.v(false);
    const scrollTop = common_vendor.v(0);
    const searchParams = common_vendor.w({
      routeId: "",
      isPopularity: "",
      keyword: ""
    });
    common_vendor.H((options) => {
      console.log(options, "options");
      type.value = options.type;
      placeholder.value = options.type == "POR" ? "请输入起运港" : "请输入目的港";
      options.type === "POR" && loadPorList();
      options.type === "FND" && loadAreaOptions();
      searchParams.isPopularity = options.type === "FND" ? 1 : "";
      common_vendor.i.setNavigationBarTitle({
        title: options.type == "POR" ? "选择起运港" : "选择目的港"
      });
      common_vendor.J(services_api_freight_index.c(searchParams));
    });
    const { data: porList, send: loadPorList } = common_vendor.x(
      services_api_freight_index.c(searchParams),
      { immediate: false }
    );
    const {
      data: fndList,
      send: loadFndList,
      onSuccess: changeFndData
    } = common_vendor.x(services_api_freight_index.d(searchParams), { immediate: false });
    const {
      data: areaOptions,
      send: loadAreaOptions,
      onSuccess: loadAreaList
    } = common_vendor.x(services_api_freight_index.b(), { immediate: false });
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
    const fndOptions = common_vendor.v([]);
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
    const onSearch = () => {
      type.value = "POR";
      searchParams.isPopularity = "";
      searchParams.routeId = "";
      loadPorList();
    };
    const cancel = () => {
      searchParams.keyword = "";
    };
    common_vendor.T();
    const onClick = (item) => {
      let pages = getCurrentPages();
      let prevPage = pages[pages.length - 2];
      placeholder.value === "请输入起运港" && Reflect.set(item, "porInfo", item.cnName + "-" + item.enName);
      placeholder.value === "请输入目的港" && Reflect.set(item, "fndInfo", item.cnName + "-" + item.enName);
      prevPage.$vm["searchForm"] = item;
      common_vendor.i.$emit("update", item);
      common_vendor.i.navigateBack({
        delta: 1
      });
      console.log(item, prevPage, "////", prevPage.$vm._data, prevPage.update);
    };
    const current = common_vendor.v("");
    const changeArea = (id) => {
      current.value = id;
      searchParams.routeId = id;
      searchParams.isPopularity = id ? "" : "1";
      loadFndList();
    };
    return (_ctx, _cache) => {
      return common_vendor.y({
        a: loading.value
      }, loading.value ? {
        b: common_vendor.D({
          iconType: "annulus",
          position: "fixed",
          zIndex: 9,
          mask: false,
          maskOpacity: 1,
          maskMini: false,
          maskDark: true,
          color: "#0396FF"
        })
      } : common_vendor.y({
        c: common_vendor.B(onSearch),
        d: common_vendor.B(cancel),
        e: common_vendor.B(($event) => searchParams.keyword = $event),
        f: common_vendor.D({
          placeholder: placeholder.value,
          shape: "square",
          ["action-text"]: "取消",
          ["bg-color"]: "#F5F7FA",
          modelValue: searchParams.keyword
        }),
        g: type.value === "POR"
      }, type.value === "POR" ? {
        h: common_vendor.C(common_vendor.z(porList), (item, index, i0) => {
          return {
            a: common_vendor.F(item.cnName),
            b: common_vendor.F(item.enName),
            c: index,
            d: common_vendor.B(($event) => onClick(item), index)
          };
        })
      } : type.value === "FND" ? {
        j: common_vendor.C(common_vendor.z(areaOptions), (item, index, i0) => {
          return {
            a: common_vendor.G(searchParams.routeId === item.id ? "bg-dull-red" : ""),
            b: common_vendor.F(item.name),
            c: index,
            d: common_vendor.B(($event) => changeArea(item.id), index),
            e: common_vendor.G(searchParams.routeId === item.id ? "dull-red font-bold" : "")
          };
        }),
        k: common_vendor.C(fndOptions.value, (item, index, i0) => {
          return {
            a: common_vendor.F(item.areaInfoName),
            b: common_vendor.C(item.portInfo, (child, childIndex, i1) => {
              return {
                a: common_vendor.F(child.cnName),
                b: common_vendor.F(child.enName),
                c: common_vendor.F(child.countryLocalName),
                d: common_vendor.F(child.countryName),
                e: childIndex,
                f: common_vendor.B(($event) => onClick(child), childIndex)
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
