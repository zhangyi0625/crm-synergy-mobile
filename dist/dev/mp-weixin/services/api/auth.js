"use strict";
const utils_http_index = require("../../utils/http/index.js");
const LOGIN = "/login";
const LOGIN_OUT = "/logout";
function login(params) {
  return utils_http_index.r.Post(LOGIN, params);
}
function logout() {
  return utils_http_index.r.Post(LOGIN_OUT, {});
}
exports.a = login;
exports.l = logout;
