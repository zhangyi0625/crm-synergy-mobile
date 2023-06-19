"use strict";
const common_vendor = require("../../../common/vendor.js"), mock_utils = require("../../utils.js"), enums_httpEnum = require("../../../enums/httpEnum.js");
const createRandomToken = (len = 36 * 6) => {
  const token = common_vendor.j(common_vendor.s("0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ._-", len), "");
  return `eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.${token}`;
};
const authMocks = common_vendor.d({
  // 登录
  "[POST]/api/v1/login": (params) => {
    const { email, password } = params.data;
    if (email === "uni-app@test.com" && (password === "Vue3_Ts_Vite" || password === "123456")) {
      const token = createRandomToken();
      return mock_utils.c({ data: { token } });
    }
    return mock_utils.c({ data: [], code: enums_httpEnum.R.FAIL, message: "邮箱或密码错误" });
  }
});
exports.a = authMocks;
