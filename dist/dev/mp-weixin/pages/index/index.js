"use strict";
const common_vendor = require("../../common/vendor.js"), services_api_freight_index = require("../../services/api/freight/index.js"), utils_time = require("../../utils/time.js"), state_modules_auth = require("../../state/modules/auth.js"), services_api_user = require("../../services/api/user.js"), utils_cache_index = require("../../utils/cache/index.js"), enums_cacheEnum = require("../../enums/cacheEnum.js");
require("../../utils/http/index.js"), require("../../utils/env.js"), require("../../mock/index.js"), require("../../mock/v1/index.js"), require("../../mock/v1/modules/auth.js"), require("../../mock/utils.js"), require("../../enums/httpEnum.js"), require("../../utils/http/checkStatus.js"), require("../../utils/uniapi/prompt.js"), require("../../router/index.js"), require("../../router/guard.js"), require("../../services/api/auth.js"), require("../../utils/cache/storageCache.js"), require("../../settings/encryptionSetting.js"), require("../../utils/cipher.js"), require("../../utils/is.js");
if (!Array) {
  const _easycom_u_notice_bar2 = common_vendor.v("u-notice-bar");
  _easycom_u_notice_bar2();
}
const _easycom_u_notice_bar = () => "../../uni_modules/vk-uview-ui/components/u-notice-bar/u-notice-bar.js";
if (!Math) {
  _easycom_u_notice_bar();
}
const _sfc_main = /* @__PURE__ */ common_vendor.k({
  __name: "index",
  setup(__props) {
    const noticeShow = common_vendor.w(true);
    const searchForm = common_vendor.x({
      porCode: "",
      fndCode: "",
      porInfo: "",
      fndInfo: ""
    });
    const recommendParams = common_vendor.x({
      routeId: "",
      tagId: null
    });
    const jumpType = common_vendor.w("");
    const authStore = state_modules_auth.u();
    const noticeContent = common_vendor.w("");
    const { data: notice, send: noticeSend, onSuccess: changeNoticeContent } = common_vendor.u(services_api_user.a(), { immediate: false });
    changeNoticeContent(() => {
      let value = notice.value ? notice.value[0].content : "";
      let regx = /<\/?[a-zA-Z]+(\s+[a-zA-Z]+=".*")*>/g;
      noticeContent.value = value.replaceAll(regx, "");
    });
    const { data: TagData, onSuccess: loadAreaLists } = common_vendor.u(() => services_api_user.b("标签"));
    common_vendor.l(() => {
      common_vendor.i.$off("update");
      common_vendor.i.$on("update", (data) => {
        if (jumpType.value === "POR") {
          searchForm.porInfo = data.porInfo;
          searchForm.porCode = data.code;
        } else {
          searchForm.fndInfo = data.fndInfo;
          searchForm.fndCode = data.code;
        }
      });
      setTimeout(() => {
        isSend();
        noticeSend();
        common_vendor.y(services_api_freight_index.g());
      }, 1e3);
      console.log(authStore.token, "authStore.isLogin", utils_cache_index.g(enums_cacheEnum.T), "zzz");
    });
    const { data: historySearchOptions, send: isSend } = common_vendor.u(
      services_api_freight_index.g,
      { immediate: false }
    );
    const { data: areaList, onSuccess: loadAreaList, send: judgeArea } = common_vendor.u(services_api_freight_index.a, { immediate: false });
    const { data: recommendOptions, send: sendRecommendOptions } = common_vendor.u(
      (params) => services_api_freight_index.b(
        common_vendor.h({}, params)
      ),
      { immediate: false }
    );
    loadAreaLists(() => {
      judgeArea();
    });
    loadAreaList(() => {
      areaList.value = [
        {
          code: "",
          name: "特售推荐",
          id: TagData.value.find((el) => el.label === "强推").value
        },
        ...areaList.value.filter((el) => !el.parentId)
      ];
      recommendParams.tagId = TagData.value.find((el) => el.label === "强推").value || "";
      setTimeout(() => {
        sendRecommendOptions(recommendParams);
      }, 1e3);
    });
    const areaCurrent = common_vendor.w("");
    const changeArea = (item) => {
      areaCurrent.value = item.code;
      recommendParams.routeId = item.code ? item.id : "";
      recommendParams.tagId = item.code ? "" : item.id;
      sendRecommendOptions(recommendParams);
    };
    const loadMore = () => {
      let id = areaList.value.find((item) => item.code === areaCurrent.value).id;
      let name = areaList.value.find((item) => item.code === areaCurrent.value).name;
      router.push("/pagesA/freight/index?routeId=" + id + "&routeName=" + name);
    };
    const jumpSelected = (type) => {
      jumpType.value = type;
      router.push({
        path: "/pages/select-port/index?type=" + jumpType.value
      });
    };
    const getPriceJson = (price) => {
      let newArr = [];
      let prices = price ? JSON.parse(price) : {};
      for (let i in prices["normal"]) {
        prices["normal"][i] && newArr.push(prices["normal"][i]);
      }
      for (let i in prices["special"]) {
        prices["special"][i] && newArr.push(prices["special"][i]);
      }
      return newArr.length === 0 ? "" : Math.min(...newArr);
    };
    const searchHistory = (item) => {
      common_vendor.h(searchForm, item);
      searchForm.porInfo = item.porCnlName + "-" + item.porEnName;
      searchForm.fndInfo = item.fndCnlName + "-" + item.fndEnName;
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
    const getRecommendOptions = (arr) => {
      return arr && arr.length > 0 ? arr.slice(0, 6) : arr;
    };
    return (_ctx, _cache) => {
      var _a, _b, _c, _d;
      return common_vendor.z({
        a: noticeShow.value
      }, noticeShow.value ? {
        b: common_vendor.C(($event) => noticeShow.value = false),
        c: common_vendor.F({
          ["close-icon"]: true,
          list: [noticeContent.value],
          ["bg-color"]: "#FFFAE7",
          color: "#FF6400"
        })
      } : {}, {
        d: common_vendor.C(($event) => jumpSelected("POR")),
        e: searchForm.porInfo,
        f: common_vendor.C(($event) => searchForm.porInfo = $event.detail.value),
        g: common_vendor.C(($event) => jumpSelected("FND")),
        h: searchForm.fndInfo,
        i: common_vendor.C(($event) => searchForm.fndInfo = $event.detail.value),
        j: common_vendor.C(onSearch),
        k: common_vendor.D(common_vendor.B(historySearchOptions), (item, index, i0) => {
          return {
            a: common_vendor.G(item.porCnlName),
            b: common_vendor.G(item.fndCnlName),
            c: index,
            d: common_vendor.C(($event) => searchHistory(item), index)
          };
        }),
        l: common_vendor.D(common_vendor.B(areaList), (item, index, i0) => {
          return {
            a: common_vendor.G(item.name),
            b: common_vendor.H(areaCurrent.value === item.code ? "neutral bg-dull-red" : "bg-neutral dull-red active"),
            c: common_vendor.C(($event) => changeArea(item), index),
            d: index
          };
        }),
        m: common_vendor.D(getRecommendOptions(common_vendor.B(recommendOptions)), (item, index, i0) => {
          return {
            a: common_vendor.G(item.por.cnName),
            b: common_vendor.G(item.fnd.cnName),
            c: common_vendor.G(common_vendor.B(utils_time.f)(item.etd, "Y-M-D")),
            d: common_vendor.G(getPriceJson(item.innerPrice) ? "$" + getPriceJson(item.innerPrice) : "-"),
            e: common_vendor.C(($event) => goDetail(item), index),
            f: index
          };
        }),
        n: ((_a = common_vendor.B(recommendOptions)) == null ? void 0 : _a.length) > 0 && areaCurrent.value
      }, ((_b = common_vendor.B(recommendOptions)) == null ? void 0 : _b.length) > 0 && areaCurrent.value ? {
        o: common_vendor.C(loadMore)
      } : ((_c = common_vendor.B(recommendOptions)) == null ? void 0 : _c.length) === 0 && areaCurrent.value ? {} : {}, {
        p: ((_d = common_vendor.B(recommendOptions)) == null ? void 0 : _d.length) === 0 && areaCurrent.value
      });
    };
  }
});
const MiniProgramPage = /* @__PURE__ */ common_vendor.q(_sfc_main, [["__file", "/Users/zhangyi/Desktop/vue/vue3/Vue3-Vite-TS-uniapp freight- system/src/pages/index/index.vue"]]);
wx.createPage(MiniProgramPage);
