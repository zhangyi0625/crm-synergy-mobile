"use strict";
const common_vendor = require("../../../../common/vendor.js");
function os() {
  return common_vendor.i.getSystemInfoSync().platform;
}
function sys() {
  return common_vendor.i.getSystemInfoSync();
}
exports.o = os;
exports.s = sys;
