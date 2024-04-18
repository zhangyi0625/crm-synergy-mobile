"use strict";
function formatTime(time, format) {
  if (time == null || format == "" || time == "" || time == void 0) {
    return "";
  }
  if (arguments.length === 0) {
    return null;
  }
  "string" == typeof time && (time = time.replace(/-/g, "/"));
  var formateArr = ["Y", "M", "D", "h", "m", "s"], arr = [], date = new Date(time);
  arr.push(date.getFullYear());
  arr.push(n(date.getMonth() + 1));
  arr.push(n(date.getDate()));
  arr.push(n(date.getHours()));
  arr.push(n(date.getMinutes()));
  arr.push(n(date.getSeconds()));
  for (var i = 0; i < arr.length; i++) {
    format = format.replace(formateArr[i], arr[i]);
  }
  return format;
}
const n = (e) => {
  let t = e.toString();
  return t[1] ? t : "0" + t;
};
function formatUpdated(data, num) {
  if (data !== null && data !== void 0 && num !== 0) {
    data = data.replace(/-/g, "/");
    var ms = (/* @__PURE__ */ new Date()).getTime() - new Date(data).getTime();
    var hours = parseInt(String(ms / 1e3 / 60 / 60));
    var mins = parseInt(String(ms / 1e3 / 60));
    if (hours === 0) {
      if (mins === 0) {
        return "1分钟内";
      } else {
        return mins + "分钟前";
      }
    } else if (hours > 0 && hours <= 24) {
      return hours + "小时前";
    } else {
      return formatTime(data, "Y-M-D");
    }
  } else {
    return "";
  }
}
exports.a = formatUpdated;
exports.f = formatTime;
