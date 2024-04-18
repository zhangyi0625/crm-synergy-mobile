"use strict";
const common_vendor = require("../common/vendor.js"), mock_v1_index = require("./v1/index.js");
const mockAdapter = common_vendor.c(mock_v1_index.m, {
  // 指定uniapp请求适配器后，未匹配模拟接口的请求将使用这个适配器发送请求
  httpAdapter: common_vendor.r,
  // mock接口响应延迟，单位毫秒
  delay: 1500,
  // 是否打印mock接口请求信息
  // mockRequestLogger: false,
  //  模拟响应适配器，指定后响应数据将转换为uniapp兼容的数据格式
  onMockResponse: common_vendor.m
});
exports.m = mockAdapter;
