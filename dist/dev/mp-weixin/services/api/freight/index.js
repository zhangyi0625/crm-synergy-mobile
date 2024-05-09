"use strict";
const utils_http_index = require("../../../utils/http/index.js");
function getSearchRecent() {
  return utils_http_index.r.Get("/api/app/my/searchPortList");
}
function getAreaList() {
  return utils_http_index.r.Get("/api/base/route/list", {});
}
function getLocationList(params) {
  return utils_http_index.r.Get("/api/app/base/port/list", { params });
}
function getCarrierList() {
  return utils_http_index.r.Get("/api/base/carrier/list");
}
function getFreightOptions(params) {
  return utils_http_index.r.Get("/api/app/frt/list", { params });
}
function getFreightDetail(id) {
  return utils_http_index.r.Get("/api/app/frt/detail/" + id);
}
function getCollectPort() {
  return utils_http_index.r.Get("/api/app/my/getFavoritePortList");
}
function deleteCollectPort(id) {
  return utils_http_index.r.Delete("/api/app/my/deleteFavoritePort/" + id);
}
function postCreateTaskFreight(data) {
  return utils_http_index.r.Post("/api/zc/createTask", data);
}
function getNewFreight(taskId) {
  return utils_http_index.r.Get("/api/zc/taskResult/" + taskId);
}
exports.a = getAreaList;
exports.b = getFreightOptions;
exports.c = getCollectPort;
exports.d = deleteCollectPort;
exports.e = getLocationList;
exports.f = getCarrierList;
exports.g = getSearchRecent;
exports.h = getNewFreight;
exports.i = getFreightDetail;
exports.p = postCreateTaskFreight;
