"use strict";
const common_vendor = require("../../common/vendor.js"), uni_modules_vkUviewUi_libs_mixin_mixin = require("./libs/mixin/mixin.js"), uni_modules_vkUviewUi_libs_request_index = require("./libs/request/index.js"), uni_modules_vkUviewUi_libs_function_queryParams = require("./libs/function/queryParams.js"), uni_modules_vkUviewUi_libs_function_route = require("./libs/function/route.js"), uni_modules_vkUviewUi_libs_function_timeFormat = require("./libs/function/timeFormat.js"), uni_modules_vkUviewUi_libs_function_timeFrom = require("./libs/function/timeFrom.js"), uni_modules_vkUviewUi_libs_function_colorGradient = require("./libs/function/colorGradient.js"), uni_modules_vkUviewUi_libs_function_guid = require("./libs/function/guid.js"), uni_modules_vkUviewUi_libs_function_color = require("./libs/function/color.js"), uni_modules_vkUviewUi_libs_function_type2icon = require("./libs/function/type2icon.js"), uni_modules_vkUviewUi_libs_function_randomArray = require("./libs/function/randomArray.js"), uni_modules_vkUviewUi_libs_function_deepClone = require("./libs/function/deepClone.js"), uni_modules_vkUviewUi_libs_function_deepMerge = require("./libs/function/deepMerge.js"), uni_modules_vkUviewUi_libs_function_addUnit = require("./libs/function/addUnit.js"), uni_modules_vkUviewUi_libs_function_test = require("./libs/function/test.js"), uni_modules_vkUviewUi_libs_function_random = require("./libs/function/random.js"), uni_modules_vkUviewUi_libs_function_trim = require("./libs/function/trim.js"), uni_modules_vkUviewUi_libs_function_toast = require("./libs/function/toast.js"), uni_modules_vkUviewUi_libs_function_getParent = require("./libs/function/getParent.js"), uni_modules_vkUviewUi_libs_function_$parent = require("./libs/function/_parent.js"), uni_modules_vkUviewUi_libs_function_sys = require("./libs/function/sys.js"), uni_modules_vkUviewUi_libs_function_debounce = require("./libs/function/debounce.js"), uni_modules_vkUviewUi_libs_function_throttle = require("./libs/function/throttle.js"), uni_modules_vkUviewUi_libs_function_addStyle = require("./libs/function/addStyle.js"), uni_modules_vkUviewUi_libs_config_config = require("./libs/config/config.js"), uni_modules_vkUviewUi_libs_config_zIndex = require("./libs/config/zIndex.js");
function wranning(str) {
  if ({}.NODE_ENV === "development") {
    console.warn(str);
  }
}
const $u = {
  queryParams: uni_modules_vkUviewUi_libs_function_queryParams.q,
  route: uni_modules_vkUviewUi_libs_function_route.r,
  timeFormat: uni_modules_vkUviewUi_libs_function_timeFormat.t,
  date: uni_modules_vkUviewUi_libs_function_timeFormat.t,
  // 另名date
  timeFrom: uni_modules_vkUviewUi_libs_function_timeFrom.t,
  colorGradient: uni_modules_vkUviewUi_libs_function_colorGradient.c.colorGradient,
  colorToRgba: uni_modules_vkUviewUi_libs_function_colorGradient.c.colorToRgba,
  guid: uni_modules_vkUviewUi_libs_function_guid.g,
  color: uni_modules_vkUviewUi_libs_function_color.c,
  sys: uni_modules_vkUviewUi_libs_function_sys.s,
  os: uni_modules_vkUviewUi_libs_function_sys.o,
  type2icon: uni_modules_vkUviewUi_libs_function_type2icon.t,
  randomArray: uni_modules_vkUviewUi_libs_function_randomArray.r,
  wranning,
  get: uni_modules_vkUviewUi_libs_request_index.h.get,
  post: uni_modules_vkUviewUi_libs_request_index.h.post,
  put: uni_modules_vkUviewUi_libs_request_index.h.put,
  delete: uni_modules_vkUviewUi_libs_request_index.h.delete,
  hexToRgb: uni_modules_vkUviewUi_libs_function_colorGradient.c.hexToRgb,
  rgbToHex: uni_modules_vkUviewUi_libs_function_colorGradient.c.rgbToHex,
  test: uni_modules_vkUviewUi_libs_function_test.t,
  random: uni_modules_vkUviewUi_libs_function_random.r,
  deepClone: uni_modules_vkUviewUi_libs_function_deepClone.d,
  deepMerge: uni_modules_vkUviewUi_libs_function_deepMerge.d,
  getParent: uni_modules_vkUviewUi_libs_function_getParent.g,
  $parent: uni_modules_vkUviewUi_libs_function_$parent.$,
  addUnit: uni_modules_vkUviewUi_libs_function_addUnit.a,
  trim: uni_modules_vkUviewUi_libs_function_trim.t,
  type: ["primary", "success", "error", "warning", "info"],
  http: uni_modules_vkUviewUi_libs_request_index.h,
  toast: uni_modules_vkUviewUi_libs_function_toast.t,
  config: uni_modules_vkUviewUi_libs_config_config.c,
  // uView配置信息相关，比如版本号
  zIndex: uni_modules_vkUviewUi_libs_config_zIndex.z,
  debounce: uni_modules_vkUviewUi_libs_function_debounce.d,
  throttle: uni_modules_vkUviewUi_libs_function_throttle.t,
  addStyle: uni_modules_vkUviewUi_libs_function_addStyle.a
};
common_vendor.i.$u = $u;
const install = (Vue) => {
  Vue.mixin(uni_modules_vkUviewUi_libs_mixin_mixin.m);
  Vue.config.globalProperties.$u = $u;
};
const uView = {
  install
};
exports.u = uView;
