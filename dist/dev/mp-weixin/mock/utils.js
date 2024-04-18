"use strict";
const enums_httpEnum = require("../enums/httpEnum.js");
const createMock = (options) => {
  return {
    status: 200,
    statusText: "OK",
    responseHeaders: {},
    body: {
      code: enums_httpEnum.R.SUCCESS,
      message: "succeed",
      ...options
    }
  };
};
exports.c = createMock;
