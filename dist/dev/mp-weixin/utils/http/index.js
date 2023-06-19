"use strict";
const common_vendor = require("../../common/vendor.js"), utils_env = require("../env.js"), mock_index = require("../../mock/index.js"), state_modules_auth = require("../../state/modules/auth.js"), utils_http_checkStatus = require("./checkStatus.js"), enums_httpEnum = require("../../enums/httpEnum.js"), utils_uniapi_prompt = require("../uniapi/prompt.js");
const BASE_URL = utils_env.b();
const HEADER = {
  "Content-Type": enums_httpEnum.C.JSON,
  Accept: "application/json, text/plain, */*"
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
    method.config.headers = common_vendor.h(method.config.headers, HEADER, authStore.getAuthorization);
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
      if (statusCode === 200) {
        if (enableDownload) {
          return rawData;
        }
        if (enableUpload) {
          return rawData;
        }
        if (code === enums_httpEnum.R.SUCCESS) {
          return data;
        }
        message && utils_uniapi_prompt.T(message);
        return Promise.reject(rawData);
      }
      utils_http_checkStatus.c(statusCode, message || "");
      return Promise.reject(rawData);
    },
    /**
     * 请求失败的拦截器，请求错误时将会进入该拦截器。
     * 第二个参数为当前请求的method实例，你可以用它同步请求前后的配置信息
     * @param err
     * @param method
     */
    onError: (err, method) => {
      return Promise.reject({ err, method });
    }
  }
});
const request = alovaInstance;
exports.r = request;
