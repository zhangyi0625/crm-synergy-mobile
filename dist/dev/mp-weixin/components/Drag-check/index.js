"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = /* @__PURE__ */ common_vendor.k({
  __name: "index",
  emits: ["update:visible", "result"],
  setup(__props, { emit }) {
    const props = __props;
    const imageUrl = common_vendor.w([
      "/static/images/drag-check/drag-check1.jpg",
      "/static/images/drag-check/drag-check2.jpg",
      "/static/images/drag-check/drag-check3.jpg"
    ]);
    const imgUrl = common_vendor.v("");
    const disabled = common_vendor.v(false);
    const result = common_vendor.v("");
    common_vendor.L(props, () => {
      if (props.visiable) {
        result.value = "";
        toStart();
      }
    });
    const deg = common_vendor.v(0);
    const startDeg = common_vendor.v(0);
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
    const x = common_vendor.v(0);
    const close = () => {
      if (!props.maskClick)
        return;
      emit("update:visible", false);
      disabled.value = false;
    };
    const isPass = common_vendor.v(false);
    const onChange = (e) => {
      let newX = e.detail.x + startDeg.value;
      deg.value = newX;
      isPass.value = Math.abs((startDeg.value + newX) % 360) - startDeg.value > -10 && Math.abs((startDeg.value + newX) % 360) - startDeg.value < 10 ? true : false;
    };
    const random = (min, max) => {
      return Math.floor(Math.random() * (max - min)) + min;
    };
    return (_ctx, _cache) => {
      return common_vendor.y({
        a: props.visiable
      }, props.visiable ? common_vendor.y({
        b: common_vendor.F(props.title),
        c: common_vendor.F(props.minTitle),
        d: common_vendor.F(result.value ? result.value : ""),
        e: result.value == "验证失败，请重试" ? 1 : "",
        f: imgUrl.value
      }, imgUrl.value ? {
        g: imgUrl.value
      } : {}, {
        h: common_vendor.M("transform:rotate(" + deg.value + "deg)"),
        i: props.icon,
        j: disabled.value,
        k: x.value,
        l: common_vendor.B(onChange),
        m: common_vendor.B(touchEnd)
      }) : {}, {
        n: common_vendor.B(close),
        o: common_vendor.B(() => {
        }),
        p: common_vendor.G(props.visiable ? "pupop-model" : "pupop-models")
      });
    };
  }
});
const Component = /* @__PURE__ */ common_vendor.q(_sfc_main, [["__scopeId", "data-v-20b1dd87"], ["__file", "/Users/zhangyi/Desktop/vue/vue3/Vue3-Vite-TS-uniapp freight- system/src/components/Drag-check/index.vue"]]);
wx.createComponent(Component);
