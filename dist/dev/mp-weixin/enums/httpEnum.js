"use strict";
var ResultEnum = /* @__PURE__ */ ((ResultEnum2) => {
  ResultEnum2[ResultEnum2["SUCCESS"] = 1e4] = "SUCCESS";
  ResultEnum2[ResultEnum2["FAIL"] = 10001] = "FAIL";
  ResultEnum2[ResultEnum2["ERROR"] = 1] = "ERROR";
  ResultEnum2[ResultEnum2["TIMEOUT"] = 401] = "TIMEOUT";
  ResultEnum2["TYPE"] = "success";
  return ResultEnum2;
})(ResultEnum || {});
var ContentTypeEnum = /* @__PURE__ */ ((ContentTypeEnum2) => {
  ContentTypeEnum2["JSON"] = "application/json;charset=UTF-8";
  ContentTypeEnum2["FORM_URLENCODED"] = "application/x-www-form-urlencoded;charset=UTF-8";
  ContentTypeEnum2["FORM_DATA"] = "multipart/form-data;charset=UTF-8";
  return ContentTypeEnum2;
})(ContentTypeEnum || {});
exports.C = ContentTypeEnum;
exports.R = ResultEnum;
