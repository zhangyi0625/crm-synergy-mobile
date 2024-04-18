"use strict";
const utils_http_index = require("../../utils/http/index.js");
function deleteFileUrl(data) {
  return utils_http_index.r.Post("/api/file/deleteByUrl", data);
}
exports.d = deleteFileUrl;
