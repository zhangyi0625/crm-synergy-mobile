"use strict";
const enums_platformEnum = require("../enums/platformEnum.js");
function judgePlatform(target) {
  let isVue3 = false;
  let isAppPlus = false;
  let isAppPlusNvue = false;
  let isAppNvue = false;
  let isH5 = false;
  let isMp = false;
  let isMpWeinxin = false;
  let isMpAlipay = false;
  let isMpBaidu = false;
  let isMpToutiao = false;
  let isMpLark = false;
  let isMpQq = false;
  let isMpKuaishou = false;
  let isMp360 = false;
  let isQuickAppWebView = false;
  let isQuickAppWebViewUnion = false;
  let isQuickAppWebViewHuawei = false;
  switch (target) {
    case enums_platformEnum.P.VUE3:
      isVue3 = true;
      return isVue3;
    case enums_platformEnum.P.APP_PLUS:
      return isAppPlus;
    case enums_platformEnum.P.APP_PLUS_NVUE:
      return isAppPlusNvue;
    case enums_platformEnum.P.APP_NVUE:
      return isAppNvue;
    case enums_platformEnum.P.H5:
      return isH5;
    case enums_platformEnum.P.MP:
      isMp = true;
      return isMp;
    case enums_platformEnum.P.MP_WEIXIN:
      isMpWeinxin = true;
      return isMpWeinxin;
    case enums_platformEnum.P.MP_ALIPAY:
      return isMpAlipay;
    case enums_platformEnum.P.MP_BAIDU:
      return isMpBaidu;
    case enums_platformEnum.P.MP_TOUTIAO:
      return isMpToutiao;
    case enums_platformEnum.P.MP_LARK:
      return isMpLark;
    case enums_platformEnum.P.MP_QQ:
      return isMpQq;
    case enums_platformEnum.P.MP_KUAISHOU:
      return isMpKuaishou;
    case enums_platformEnum.P.MP_360:
      return isMp360;
    case enums_platformEnum.P.QUICKAPP_WEBVIEW:
      return isQuickAppWebView;
    case enums_platformEnum.P.QUICKAPP_WEBVIEW_UNION:
      return isQuickAppWebViewUnion;
    case enums_platformEnum.P.QUICKAPP_WEBVIEW_HUAWEI:
      return isQuickAppWebViewHuawei;
    default:
      return false;
  }
}
exports.j = judgePlatform;
