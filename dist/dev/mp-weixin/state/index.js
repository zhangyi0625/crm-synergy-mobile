"use strict";
const common_vendor = require("../common/vendor.js");
const store = common_vendor.a();
function setupStore(app) {
  app.use(store);
}
exports.s = setupStore;
