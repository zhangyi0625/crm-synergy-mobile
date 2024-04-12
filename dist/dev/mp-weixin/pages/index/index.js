"use strict";
const common_vendor = require("../../common/vendor.js"), services_api_freight_index = require("../../services/api/freight/index.js"), utils_time = require("../../utils/time.js"), state_modules_auth = require("../../state/modules/auth.js");
require("../../utils/http/index.js"), require("../../utils/env.js"), require("../../mock/index.js"), require("../../mock/v1/index.js"), require("../../mock/v1/modules/auth.js"), require("../../mock/utils.js"), require("../../enums/httpEnum.js"), require("../../utils/http/checkStatus.js"), require("../../utils/uniapi/prompt.js"), require("../../utils/cache/index.js"), require("../../utils/cache/storageCache.js"), require("../../settings/encryptionSetting.js"), require("../../utils/cipher.js"), require("../../utils/is.js"), require("../../enums/cacheEnum.js"), require("../../services/api/auth.js");
if (!Array) {
  const _easycom_u_notice_bar2 = common_vendor.u("u-notice-bar");
  _easycom_u_notice_bar2();
}
const _easycom_u_notice_bar = () => "../../uni_modules/vk-uview-ui/components/u-notice-bar/u-notice-bar.js";
if (!Math) {
  _easycom_u_notice_bar();
}
const _sfc_main = /* @__PURE__ */ common_vendor.k({
  __name: "index",
  setup(__props) {
    const notice = common_vendor.v(["公告栏!"]);
    const noticeShow = common_vendor.v(true);
    const searchForm = common_vendor.w({
      // porId: '',
      // fndId: '',
      porInfo: "",
      fndInfo: ""
    });
    const recommendParams = common_vendor.w({
      pageIndex: 1,
      pageSize: 6,
      listOnly: true,
      filter: {
        route: ""
      }
    });
    const authStore = state_modules_auth.u();
    common_vendor.l(() => {
      common_vendor.i.$off("update");
      common_vendor.i.$on("update", (data) => {
        searchForm.porInfo = data.porInfo;
        searchForm.fndInfo = data.fndInfo;
        searchForm.porForm = data;
        console.log(data, "data", data.porInfo);
        console.log("监听到事件来自 update ，携带参数 msg 为：" + data);
      });
      authStore.isLogin && isSend();
    });
    const { data: historySearchOptions, send: isSend } = common_vendor.x(
      services_api_freight_index.g,
      { immediate: false }
    );
    const { data: areaList, onSuccess: loadAreaList } = common_vendor.x(services_api_freight_index.b);
    const { data: recommendOptions, send: sendRecommendOptions } = common_vendor.x(
      (params) => services_api_freight_index.a(
        common_vendor.h({}, params, {
          filter: JSON.stringify(recommendParams.filter)
        })
      ),
      { immediate: false }
    );
    loadAreaList(() => {
      areaList.value = [
        {
          code: "",
          name: "特售推荐"
        },
        ...areaList.value.filter((el) => !el.parentId)
      ];
      console.log(areaList.value, "arealsit");
      sendRecommendOptions(recommendParams);
    });
    const areaCurrent = common_vendor.v("");
    const changeArea = (code) => {
      areaCurrent.value = code;
      recommendParams.filter.route = code;
      sendRecommendOptions(recommendParams);
    };
    const loadMore = () => {
      router.push("/pagesA/freight/index");
    };
    const jumpSelected = (type) => {
      router.push({
        path: "/pages/select-port/index?type=" + type
      });
    };
    const getPriceJson = (price) => {
      let newArr = [];
      for (let i in price) {
        price[i] && newArr.push(price[i].basePrice);
      }
      return Math.min(...newArr);
    };
    const searchHistory = (item) => {
      common_vendor.h(searchForm, item);
      searchForm.porInfo = item.por.localName + "-" + item.por.name;
      searchForm.fndInfo = item.fnd.localName + "-" + item.fnd.name;
      router.push({
        path: "/pagesA/freight/index?info=" + JSON.stringify(searchForm)
      });
    };
    const router = common_vendor.T();
    const onSearch = () => {
      router.push({
        path: "/pagesA/freight/index?info=" + JSON.stringify(searchForm)
      });
    };
    const goDetail = (item) => {
      router.push(
        "/pagesA/freight/freight-detail/index?info=" + JSON.stringify(item)
      );
    };
    return (_ctx, _cache) => {
      var _a, _b, _c;
      return common_vendor.y({
        a: noticeShow.value
      }, noticeShow.value ? {
        b: common_vendor.B(($event) => noticeShow.value = false),
        c: common_vendor.D({
          ["close-icon"]: true,
          list: notice.value,
          ["bg-color"]: "#FFFAE7",
          color: "#FF6400"
        })
      } : {}, {
        d: common_vendor.B(($event) => jumpSelected("POR")),
        e: searchForm.porInfo,
        f: common_vendor.B(($event) => searchForm.porInfo = $event.detail.value),
        g: common_vendor.B(($event) => jumpSelected("FND")),
        h: searchForm.fndInfo,
        i: common_vendor.B(($event) => searchForm.fndInfo = $event.detail.value),
        j: common_vendor.B(onSearch),
        k: common_vendor.C(common_vendor.z(historySearchOptions), (item, index, i0) => {
          return {
            a: common_vendor.F(item.por.localName),
            b: common_vendor.F(item.fnd.localName),
            c: index,
            d: common_vendor.B(($event) => searchHistory(item), index)
          };
        }),
        l: common_vendor.C(common_vendor.z(areaList), (item, index, i0) => {
          return {
            a: common_vendor.F(item.name),
            b: common_vendor.G(areaCurrent.value === item.code ? "neutral bg-dull-red" : "bg-neutral dull-red active"),
            c: common_vendor.B(($event) => changeArea(item.code), index),
            d: index
          };
        }),
        m: common_vendor.C((_a = common_vendor.z(recommendOptions)) == null ? void 0 : _a.entries, (item, index, i0) => {
          return {
            a: common_vendor.F(item.porPortResp.cnName),
            b: common_vendor.F(item.fndPortResp.cnName),
            c: common_vendor.F(common_vendor.z(utils_time.f)(item.etd, "Y-M-D")),
            d: common_vendor.F(getPriceJson(item.priceJson)),
            e: common_vendor.B(($event) => goDetail(item), index),
            f: index
          };
        }),
        n: ((_b = common_vendor.z(recommendOptions)) == null ? void 0 : _b.entries.length) > 0
      }, ((_c = common_vendor.z(recommendOptions)) == null ? void 0 : _c.entries.length) > 0 ? {
        o: common_vendor.B(loadMore)
      } : {});
    };
  }
});
const MiniProgramPage = /* @__PURE__ */ common_vendor.q(_sfc_main, [["__file", "/Users/zhangyi/Desktop/vue/vue3/Vue3-Vite-TS-uniapp freight- system/src/pages/index/index.vue"]]);
wx.createPage(MiniProgramPage);
