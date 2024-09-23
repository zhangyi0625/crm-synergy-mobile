"use strict";
const utils_http_index = require("../../utils/http/index.js");
const LOGIN = "/admin/login/phone";
const LOGINBYPWD = "/api/app/login/password";
const LOGIN_OUT = "/api/app/my/logout";
const VERIFYCODE = "/admin/login/sms/phone/code";
const ISREGISTER = "/api/app/login/wxAppCode";
function login(data) {
  return utils_http_index.r.Post(LOGIN, data);
}
function pwdLogin(data) {
  return utils_http_index.r.Post(LOGINBYPWD, data);
}
function logout() {
  return utils_http_index.r.Post(LOGIN_OUT);
}
function refreshToken(data) {
  return utils_http_index.r.Post(ISREGISTER, data);
}
function getVerifyCode(params) {
  return utils_http_index.r.Get(VERIFYCODE, {
    params
  });
}
exports.a = login;
exports.g = getVerifyCode;
exports.l = logout;
exports.p = pwdLogin;
exports.r = refreshToken;
