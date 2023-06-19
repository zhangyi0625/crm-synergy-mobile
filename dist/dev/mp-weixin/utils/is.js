"use strict";
const { toString } = Object.prototype;
function is(val, type) {
  return toString.call(val) === `[object ${type}]`;
}
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
function isBoolean(val) {
  return is(val, "Boolean");
}
exports.a = isBoolean;
exports.i = isNullOrUnDef;
