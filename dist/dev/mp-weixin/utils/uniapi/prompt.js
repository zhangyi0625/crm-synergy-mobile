"use strict";
const common_vendor = require("../../common/vendor.js");
function Toast(title, options) {
  common_vendor.i.showToast({
    title,
    duration: 1500,
    icon: "none",
    mask: true,
    ...options
  });
}
exports.T = Toast;
