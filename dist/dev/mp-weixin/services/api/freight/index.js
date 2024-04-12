"use strict";
const utils_http_index = require("../../../utils/http/index.js");
function getSearchRecent() {
  return utils_http_index.r.Get("/api/customer/product/spot/search/recent", {});
}
function getAreaList() {
  return utils_http_index.r.Get("/api/base/route/list", {});
}
function getRecommendByArea(params) {
  return utils_http_index.r.Get("/api/customer/product/suggested/zdp/page", {
    params
  });
}
function getLocationList(params) {
  return utils_http_index.r.Get("/api/base/port/getPor", { params });
}
function getFndPortList(params) {
  return utils_http_index.r.Get("/api/base/port/getFnd", { params });
}
function getCarrierList() {
  return utils_http_index.r.Get("/api/base/carrier/list");
}
exports.a = getRecommendByArea;
exports.b = getAreaList;
exports.c = getLocationList;
exports.d = getFndPortList;
exports.e = getCarrierList;
exports.g = getSearchRecent;
