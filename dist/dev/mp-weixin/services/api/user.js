"use strict";
const utils_http_index = require("../../utils/http/index.js");
function getUserInfo() {
  return utils_http_index.r.Get("/api/app/my/getInfo");
}
function getDictByTag(dictName) {
  return utils_http_index.r.Get("/api/system/dict/class/getData/" + dictName);
}
function getSysNotice() {
  return utils_http_index.r.Get("/api/message/notice/getValidList");
}
function getEditPwdByCode() {
  return utils_http_index.r.Get("/api/app/my/phoneCode");
}
function postEditPwd(data) {
  return utils_http_index.r.Post("/api/app/my/changePwd", data);
}
function putAvatar(data) {
  return utils_http_index.r.Post("/api/app/my/updateAvatar", data);
}
function getQuotation(id) {
  return utils_http_index.r.Get("/api/app/frt/getQuotationTemplate/" + id);
}
function postQuotation(data) {
  return utils_http_index.r.Post("/api/app/frt/saveQuotation", data);
}
exports.a = getSysNotice;
exports.b = getDictByTag;
exports.c = getEditPwdByCode;
exports.d = postEditPwd;
exports.e = getQuotation;
exports.f = postQuotation;
exports.g = getUserInfo;
exports.p = putAvatar;
