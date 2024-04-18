"use strict";
function isFullObject(obj) {
  for (let key in obj) {
    if (!obj[key]) {
      return false;
    }
  }
  return true;
}
exports.i = isFullObject;
