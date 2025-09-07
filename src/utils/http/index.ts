import { createAlova } from "alova";
import AdapterUniapp from "@alova/adapter-uniapp";
import { getBaseUrl, isUseMock } from "@/utils/env";
import { mockAdapter } from "@/mock";
import { assign, random } from "lodash-es";
import { useAuthStore } from "@/state/modules/auth";
import { checkStatus } from "@/utils/http/checkStatus";
import { ContentTypeEnum, ResultEnum } from "@/enums/httpEnum";
import { Toast } from "@/utils/uniapi/prompt";
import { API } from "@/services/model/baseModel";
import { router } from "@/router";
import { getCache, removeCache } from "../cache";
import { TOKEN_KEY, USER_INFO_KEY } from "@/enums/cacheEnum";

const BASE_URL = getBaseUrl();

const HEADER = {
  "Content-Type": ContentTypeEnum.JSON,
  Accept: "application/json, text/plain, */*",
  // Authorization: 'Bearer 86cc6e2130ae40a3ba471afe5b308a26'
};

/**
 * alova 请求实例
 * @link https://github.com/alovajs/alova
 */
const alovaInstance = createAlova({
  baseURL: BASE_URL,
  ...AdapterUniapp({
    /* #ifndef APP-PLUS */
    mockRequest: isUseMock() ? mockAdapter : undefined, // APP 平台无法使用mock
    /* #endif */
  }),
  timeout: 5000,
  beforeRequest: (method) => {
    const authStore = useAuthStore();
    if (method.url !== "/api/app/login/wxAppCode") {
      method.config.headers = assign(
        method.config.headers,
        HEADER,
        authStore.getAuthorization
      );
      if (method.url === "/admin/login/sms/phone/code") {
        method.config.headers["X-Captcha-Answer"] =
          "PEw4oT7PgtQRSc8MHibNC5lmT3sMjNfI";
        method.config.headers["Content-Type"] = ContentTypeEnum.FORM_URLENCODED;
      } else if (method.url === "/api/customer/login/wxapp/phone") {
        method.config.headers["Content-Type"] = ContentTypeEnum.FORM_URLENCODED;
      } else if (method.url === "/api/app/my/phoneCode") {
        method.config.headers["X-Captcha-Answer"] =
          "PEw4oT7PgtQRSc8MHibNC5lmT3sMjNfI";
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
      // @ts-ignore
      const { statusCode, data: rawData } = response;
      const { code, message, data } = rawData as API;
      // console.log(rawData, statusCode, message, code, data);
      // console.log(enableDownload, "enableUpload", enableUpload);
      if (rawData.code === 200) {
        if (enableDownload) {
          // 下载处理
          return rawData;
        }
        if (enableUpload) {
          // 上传处理
          return rawData;
        }
        if (code === ResultEnum.SUCCESS) {
          return data as any;
        }
        // console.log(data, 'data', rawData, code, statusCode, response);
        // message && message !== 'success' && Toast(message);
        // return Promise.reject(rawData);
        // console.log(rawData, statusCode);
        return rawData.data;
        // return Promise.reject(response)
      } else {
        if (
          rawData.code === 401 ||
          rawData.code === 402 ||
          rawData.code === 403
        ) {
          checkStatus(statusCode, message || "");
          removeCache(TOKEN_KEY);
          removeCache(USER_INFO_KEY);
          router.replace("/pages/login/index");
          console.log(getCache(TOKEN_KEY), "token_key");
          return;
        } else if (rawData.code === 400) {
          Toast(message);
        }
        // console.log(rawData, statusCode, message, code, data);
      }
      // checkStatus(statusCode, message || '');
      // checkStatus(rawData.code, rawData.message || "");
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
      // error('Request Error!');
      return Promise.reject({ err, method });
    },
  },
});

export const request = alovaInstance;
