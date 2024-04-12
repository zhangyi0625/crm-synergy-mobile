"use strict";
function isDef(val) {
  return typeof val !== "undefined";
}
function isUnDef(val) {
  return !isDef(val);
}
function isNull(val) {
  return val === null;
}
function isNullOrUnDef(val) {
  return isUnDef(val) || isNull(val);
}
exports.i = isNullOrUnDef;
