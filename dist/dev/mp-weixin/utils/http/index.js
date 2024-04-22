"use strict";
const common_vendor = require("../../common/vendor.js"), utils_env = require("../env.js"), mock_index = require("../../mock/index.js"), state_modules_auth = require("../../state/modules/auth.js"), utils_http_checkStatus = require("./checkStatus.js"), enums_httpEnum = require("../../enums/httpEnum.js"), utils_uniapi_prompt = require("../uniapi/prompt.js"), router_index = require("../../router/index.js"), utils_cache_index = require("../cache/index.js"), enums_cacheEnum = require("../../enums/cacheEnum.js");
const BASE_URL = utils_env.b();
const HEADER = {
  "Content-Type": enums_httpEnum.C.JSON,
  Accept: "application/json, text/plain, */*"
  // Authorization: 'Bearer 86cc6e2130ae40a3ba471afe5b308a26'
};
const alovaInstance = common_vendor.g({
  baseURL: BASE_URL,
  ...common_vendor.A({
    mockRequest: utils_env.c() ? mock_index.m : void 0
    // APP 平台无法使用mock
  }),
  timeout: 5e3,
  beforeRequest: (method) => {
    const authStore = state_modules_auth.u();
    if (method.url !== "/api/app/login/wxAppCode") {
      method.config.headers = common_vendor.h(
        method.config.headers,
        HEADER,
        authStore.getAuthorization
      );
      if (method.url === "/admin/login/sms/phone/code") {
        method.config.headers["X-Captcha-Answer"] = "PEw4oT7PgtQRSc8MHibNC5lmT3sMjNfI";
        method.config.headers["Content-Type"] = enums_httpEnum.C.FORM_URLENCODED;
      } else if (method.url === "/api/customer/login/wxapp/phone") {
        method.config.headers["Content-Type"] = enums_httpEnum.C.FORM_URLENCODED;
      } else if (method.url === "/api/app/my/phoneCode") {
        method.config.headers["X-Captcha-Answer"] = "PEw4oT7PgtQRSc8MHibNC5lmT3sMjNfI";
      }
    }
  },
  responsed: {
    /**
     * 请求成功的拦截器
     * 第二个参数为当前请求的method实例，你可以用它同步请求前后的配置信息
     * @param response
     * @param method
     */
    onSuccess: async (response, method) => {
      const { config } = method;
      const { enableDownload, enableUpload } = config;
      const { statusCode, data: rawData } = response;
      const { code, message, data } = rawData;
      if (rawData.code === 200) {
        if (enableDownload) {
          return rawData;
        }
        if (enableUpload) {
          return rawData;
        }
        if (code === enums_httpEnum.R.SUCCESS) {
          return data;
        }
        message && message !== "success" && utils_uniapi_prompt.T(message);
        return rawData.data;
      } else {
        if (rawData.code === 401 || rawData.code === 402 || rawData.code === 403) {
          utils_http_checkStatus.c(statusCode, message || "");
          utils_cache_index.r(enums_cacheEnum.T);
          utils_cache_index.r(enums_cacheEnum.U);
          router_index.r.replace("/pages/login/index");
          console.log(utils_cache_index.g(enums_cacheEnum.T), "token_key");
          return;
        } else if (rawData.code === 400) {
          utils_uniapi_prompt.T(message);
        }
      }
      return Promise.reject(rawData);
    },
    /**
     * 请求失败的拦截器，请求错误时将会进入该拦截器。
     * 第二个参数为当前请求的method实例，你可以用它同步请求前后的配置信息
     * @param err
     * @param method
     */
    onError: (err, method) => {
      console.log(err, "err", method);
      console.log("sssssssss");
      return Promise.reject({ err, method });
    }
  }
});
const request = alovaInstance;
exports.r = request;
