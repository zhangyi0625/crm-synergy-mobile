"use strict";
const common_vendor = require("../../common/vendor.js"), services_api_freight_index = require("../../services/api/freight/index.js"), utils_time = require("../../utils/time.js"), state_modules_auth = require("../../state/modules/auth.js"), services_api_user = require("../../services/api/user.js"), utils_uniapi_prompt = require("../../utils/uniapi/prompt.js");
require("../../utils/http/index.js"), require("../../utils/env.js"), require("../../mock/index.js"), require("../../mock/v1/index.js"), require("../../mock/v1/modules/auth.js"), require("../../mock/utils.js"), require("../../enums/httpEnum.js"), require("../../utils/http/checkStatus.js"), require("../../router/index.js"), require("../../router/guard.js"), require("../../utils/cache/index.js"), require("../../utils/cache/storageCache.js"), require("../../settings/encryptionSetting.js"), require("../../utils/cipher.js"), require("../../utils/is.js"), require("../../enums/cacheEnum.js"), require("../../services/api/auth.js");
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
      let value = notice.value && notice.value.length > 0 ? notice.value[0].content : "";
      let regx = /<\/?[a-zA-Z]+(\s+[a-zA-Z]+=".*")*>/g;
      noticeContent.value = value.replaceAll(regx, "");
    });
    const { data: TagData, onSuccess: loadAreaLists, send: sendTags } = common_vendor.u(() => services_api_user.b("标签"), { immediate: false });
    common_vendor.l(() => {
      setTimeout(() => {
        authStore.isLogin && isSend();
        common_vendor.y(services_api_freight_index.g());
        common_vendor.y(services_api_user.a());
      }, 1500);
    });
    common_vendor.z(() => {
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
        sendTags();
        noticeSend();
      }, 1500);
    });
    const { data: historySearchOptions, send: isSend, onSuccess: historySuccess } = common_vendor.u(
      services_api_freight_index.g,
      { immediate: false }
    );
    historySuccess(() => {
      if (historySearchOptions.value.length > 0 && !searchForm.porCode) {
        searchForm.porCode = historySearchOptions.value[0].porCode;
        searchForm.porInfo = historySearchOptions.value[0].porCnlName + "-" + historySearchOptions.value[0].porEnName;
      }
    });
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
      concatTabs();
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
      }, 500);
    });
    const tabs = common_vendor.w([]);
    const concatTabs = () => {
      tabs.value = [
        {
          name: "强推",
          value: TagData.value.find((el) => el.label === "强推").value
        },
        {
          name: "优势",
          value: TagData.value.find((el) => el.label === "优势").value
        },
        ...areaList.value.filter((el) => !el.parentId)
      ];
    };
    const areaCurrent = common_vendor.w("");
    const changeArea = (item) => {
      areaCurrent.value = item.code;
      recommendParams.routeId = item.code ? item.id : "";
      recommendParams.tagId = item.code ? "" : item.id;
      sendRecommendOptions(recommendParams);
    };
    const loadMore = () => {
      let id = areaCurrent.value ? areaList.value.find((item) => item.code === areaCurrent.value).id : "";
      let name = areaCurrent.value ? areaList.value.find((item) => item.code === areaCurrent.value).name : "";
      router.push("/pagesA/freight/index?routeId=" + id + "&routeName=" + name + "&TABS=" + JSON.stringify(tabs.value));
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
        // path: "/pagesA/freight/index?info=" + JSON.stringify(searchForm),
        path: `/pagesA/freight/index?porCode=${searchForm.porCode}&fndCode=${searchForm.fndCode}&porInfo=${searchForm.porInfo}&fndInfo=${searchForm.fndInfo}`
      });
    };
    const router = common_vendor.T();
    const onSearch = () => {
      if (!searchForm.porCode) {
        utils_uniapi_prompt.T("请选择起运港！");
      } else if (!searchForm.fndCode) {
        utils_uniapi_prompt.T("请选择目的港！");
      } else
        router.push({
          // path: "/pagesA/freight/index?info=" + JSON.stringify(searchForm),
          path: `/pagesA/freight/index?porCode=${searchForm.porCode}&fndCode=${searchForm.fndCode}&porInfo=${searchForm.porInfo}&fndInfo=${searchForm.fndInfo}`
        });
    };
    const goDetail = (item) => {
      router.push(
        "/pagesA/freight/freight-detail/index?info=" + item.id
      );
    };
    const getRecommendOptions = (arr) => {
      return arr && arr.length > 0 ? arr.slice(0, 6) : arr;
    };
    return (_ctx, _cache) => {
      var _a, _b, _c, _d;
      return common_vendor.B({
        a: noticeShow.value
      }, noticeShow.value ? {
        b: common_vendor.D(($event) => noticeShow.value = false),
        c: common_vendor.G({
          ["close-icon"]: true,
          list: [noticeContent.value],
          ["bg-color"]: "#FFFAE7",
          color: "#FF6400"
        })
      } : {}, {
        d: common_vendor.D(($event) => jumpSelected("POR")),
        e: searchForm.porInfo,
        f: common_vendor.D(($event) => searchForm.porInfo = $event.detail.value),
        g: common_vendor.D(($event) => jumpSelected("POR")),
        h: common_vendor.D(($event) => jumpSelected("FND")),
        i: searchForm.fndInfo,
        j: common_vendor.D(($event) => searchForm.fndInfo = $event.detail.value),
        k: common_vendor.D(($event) => jumpSelected("FND")),
        l: common_vendor.D(onSearch),
        m: common_vendor.F(common_vendor.C(historySearchOptions), (item, index, i0) => {
          return {
            a: common_vendor.H(item.porCnlName),
            b: common_vendor.H(item.fndCnlName),
            c: index,
            d: common_vendor.D(($event) => searchHistory(item), index)
          };
        }),
        n: common_vendor.D(loadMore),
        o: common_vendor.F(common_vendor.C(areaList), (item, index, i0) => {
          return {
            a: common_vendor.H(item.name),
            b: common_vendor.I(areaCurrent.value === item.code ? "neutral bg-dull-red" : "bg-neutral dull-red active"),
            c: common_vendor.D(($event) => changeArea(item), index),
            d: index
          };
        }),
        p: common_vendor.F(getRecommendOptions(common_vendor.C(recommendOptions)), (item, index, i0) => {
          return {
            a: common_vendor.H(item.por.cnName),
            b: common_vendor.H(item.fnd.cnName),
            c: common_vendor.H(common_vendor.C(utils_time.f)(item.etd, "M-D")),
            d: common_vendor.H(getPriceJson(item.innerPrice) ? "$" + getPriceJson(item.innerPrice) : "-"),
            e: common_vendor.D(($event) => goDetail(item), index),
            f: index
          };
        }),
        q: ((_a = common_vendor.C(recommendOptions)) == null ? void 0 : _a.length) > 0
      }, ((_b = common_vendor.C(recommendOptions)) == null ? void 0 : _b.length) > 0 ? {
        r: common_vendor.D(loadMore)
      } : ((_c = common_vendor.C(recommendOptions)) == null ? void 0 : _c.length) === 0 ? {} : {}, {
        s: ((_d = common_vendor.C(recommendOptions)) == null ? void 0 : _d.length) === 0
      });
    };
  }
});
const MiniProgramPage = /* @__PURE__ */ common_vendor.q(_sfc_main, [["__file", "/Users/zhangyi/Desktop/vue/vue3/Vue3-Vite-TS-uniapp freight- system/src/pages/index/index.vue"]]);
wx.createPage(MiniProgramPage);
