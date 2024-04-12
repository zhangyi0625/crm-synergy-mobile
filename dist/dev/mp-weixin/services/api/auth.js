"use strict";
const utils_http_index = require("../../utils/http/index.js");
const LOGIN = "/admin/login/phone";
const LOGIN_OUT = "/api/customer/logout";
const VERIFYCODE = "/admin/login/sms/phone/code";
function login(data) {
  return utils_http_index.r.Post(LOGIN, data);
}
function logout() {
  return utils_http_index.r.Post(LOGIN_OUT, {});
}
function getVerifyCode(params) {
  return utils_http_index.r.Get(VERIFYCODE, {
    params
  });
}
exports.a = login;
exports.g = getVerifyCode;
exports.l = logout;
