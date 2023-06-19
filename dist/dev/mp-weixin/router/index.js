"use strict";
const common_vendor = require("../common/vendor.js"), router_guard = require("./guard.js");
const router = common_vendor._({
  routes: [...[{ "meta": { "tabBar": true }, "path": "/pages/index/index", "aliasPath": "/", "name": "Home" }, { "meta": { "tabBar": true }, "path": "/pages/demo/index", "name": "Demo" }, { "meta": { "ignoreAuth": true, "tabBar": true }, "path": "/pages/about/index", "name": "About" }, { "meta": { "ignoreAuth": true }, "path": "/pages/login/index", "name": "Login" }, { "path": "/pages/log/index", "name": "Log" }, { "meta": { "ignoreAuth": true }, "path": "/pages/notFound/404", "name": "NotFound" }, { "meta": { "ignoreAuth": true }, "path": "/pagesA/list/test1/index" }, { "meta": { "ignoreAuth": true }, "path": "/pagesA/list/test2/index" }, { "meta": { "ignoreAuth": true }, "path": "/pagesB/detail/index" }]]
  // 路由表信息
});
function setupRouter(app) {
  router_guard.c(router);
  app.use(router);
}
exports.s = setupRouter;
