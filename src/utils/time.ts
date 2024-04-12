/***
 * 时间格式化
 * @param {string | number} time
 * @param {string} format
 * @return
 */
export function formatTime(time: string | number, format: string) {
  if (time == null || format == "" || time == "" || time == undefined) {
    return "";
  }
  if (arguments.length === 0) {
    return null;
  }
  "string" == typeof time && (time = time.replace(/-/g, "/"));
  var formateArr: any = ["Y", "M", "D", "h", "m", "s"],
    arr = [],
    date = new Date(time);
  arr.push(date.getFullYear()); //Y
  arr.push(n(date.getMonth() + 1)); //M
  arr.push(n(date.getDate())); //D
  arr.push(n(date.getHours())); //h
  arr.push(n(date.getMinutes())); //m
  arr.push(n(date.getSeconds())); //s
  for (var i = 0; i < arr.length; i++) {
    format = format.replace(formateArr[i], arr[i]);
  }
  return format;
}

const n = (e: any) => {
  let t = e.toString();
  return t[1] ? t : "0" + t;
};

/**
 * 格式话数据 24h内展示小时数，1天以上展示上次获取到得日期。
 * @param {any} data
 * @param {number} num
 * @return
 */
export function formatUpdated(data: any, num: number) {
  if (data !== null && data !== undefined && num !== 0) {
    data = data.replace(/-/g, "/");
    var ms = new Date().getTime() - new Date(data).getTime();
    var hours = parseInt(String(ms / 1000 / 60 / 60));
    var mins = parseInt(String(ms / 1000 / 60));
    if (hours === 0) {
      if (mins === 0) {
        return "1分钟内";
      } else {
        return mins + "分钟前";
      }
    } else if (hours > 0 && hours <= 24) {
      return hours + "小时前";
    } else {
      console.log("sssss");
      return formatTime(data, "Y-M-D");
    }
  } else {
    return "";
  }
}
