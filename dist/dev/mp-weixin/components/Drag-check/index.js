"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = /* @__PURE__ */ common_vendor.k({
  __name: "index",
  emits: ["update:visible", "result"],
  setup(__props, { emit }) {
    const props = __props;
    const imageUrl = common_vendor.x([
      "/static/images/drag-check/drag-check1.jpg",
      "/static/images/drag-check/drag-check2.jpg",
      "/static/images/drag-check/drag-check3.jpg"
    ]);
    const imgUrl = common_vendor.w("");
    const disabled = common_vendor.w(false);
    const result = common_vendor.w("");
    common_vendor.O(props, () => {
      if (props.visiable) {
        result.value = "";
        toStart();
      }
    });
    const deg = common_vendor.w(0);
    const startDeg = common_vendor.w(0);
    const toStart = () => {
      var index = random(0, 2);
      imgUrl.value = imageUrl[index];
      var num = random(240, 300);
      deg.value = num;
      startDeg.value = num;
      x.value = x.value === 0 ? 0.1 : 0;
      disabled.value = false;
    };
    const touchEnd = (e) => {
      if (isPass.value) {
        disabled.value = true;
        result.value = "验证成功，2秒后自动关闭";
        setTimeout(() => {
          close();
          emit("result", isPass.value);
        }, 2e3);
      } else {
        result.value = "验证失败，请重试";
        toStart();
      }
    };
    const x = common_vendor.w(0);
    const close = () => {
      if (!props.maskClick)
        return;
      emit("update:visible", false);
      disabled.value = false;
    };
    const isPass = common_vendor.w(false);
    const onChange = (e) => {
      let newX = e.detail.x + startDeg.value;
      deg.value = newX;
      isPass.value = Math.abs((startDeg.value + newX) % 360) - startDeg.value > -10 && Math.abs((startDeg.value + newX) % 360) - startDeg.value < 10 ? true : false;
    };
    const random = (min, max) => {
      return Math.floor(Math.random() * (max - min)) + min;
    };
    return (_ctx, _cache) => {
      return common_vendor.B({
        a: props.visiable
      }, props.visiable ? common_vendor.B({
        b: common_vendor.H(props.title),
        c: common_vendor.H(props.minTitle),
        d: common_vendor.H(result.value ? result.value : ""),
        e: result.value == "验证失败，请重试" ? 1 : "",
        f: imgUrl.value
      }, imgUrl.value ? {
        g: imgUrl.value
      } : {}, {
        h: common_vendor.N("transform:rotate(" + deg.value + "deg)"),
        i: props.icon,
        j: disabled.value,
        k: x.value,
        l: common_vendor.D(onChange),
        m: common_vendor.D(touchEnd)
      }) : {}, {
        n: common_vendor.D(close),
        o: common_vendor.D(() => {
        }),
        p: common_vendor.I(props.visiable ? "pupop-model" : "pupop-models")
      });
    };
  }
});
const Component = /* @__PURE__ */ common_vendor.q(_sfc_main, [["__scopeId", "data-v-20b1dd87"], ["__file", "/Users/zhangyi/Desktop/vue/vue3/Vue3-Vite-TS-uniapp freight- system/src/components/Drag-check/index.vue"]]);
wx.createComponent(Component);
