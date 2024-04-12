"use strict";
const common_vendor = require("../../common/vendor.js"), utils_time = require("../../utils/time.js");
const _sfc_main = /* @__PURE__ */ common_vendor.k({
  __name: "index",
  setup(__props) {
    const collectData = common_vendor.v([
      {
        por: {
          localName: "宁波",
          name: "Ningbo"
        },
        fnd: {
          localName: "鹿特丹",
          name: "Rotterdam"
        },
        createdTime: "2024-04-10 19:34:57"
      },
      {
        por: {
          localName: "上海",
          name: "Shanghai"
        },
        fnd: {
          localName: "汉堡",
          name: "Hamburg"
        },
        createdTime: "2024-04-06 23:31:41"
      }
    ]);
    common_vendor.l(() => {
      init();
    });
    const init = () => {
    };
    const cancelCollect = () => {
    };
    return (_ctx, _cache) => {
      return {
        a: common_vendor.C(collectData.value, (item, index, i0) => {
          return common_vendor.y({
            a: common_vendor.B(cancelCollect, index),
            b: item.createdTime
          }, item.createdTime ? {
            c: common_vendor.F(common_vendor.z(utils_time.a)(item.createdTime, 10))
          } : {}, {
            d: common_vendor.F(item.por.localName),
            e: common_vendor.F(item.por.name),
            f: common_vendor.F(item.fnd.localName),
            g: common_vendor.F(item.fnd.name),
            h: index
          });
        })
      };
    };
  }
});
const MiniProgramPage = /* @__PURE__ */ common_vendor.q(_sfc_main, [["__scopeId", "data-v-155c1755"], ["__file", "/Users/zhangyi/Desktop/vue/vue3/Vue3-Vite-TS-uniapp freight- system/src/pages/collect/index.vue"]]);
wx.createPage(MiniProgramPage);
