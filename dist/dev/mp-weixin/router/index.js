"use strict";
const common_vendor = require("../common/vendor.js"), router_guard = require("./guard.js");
const router = common_vendor._({
  routes: [...[{ "meta": { "tabBar": true }, "path": "/pages/index/index", "aliasPath": "/", "name": "Home" }, { "meta": { "tabBar": true }, "path": "/pages/collect/index", "name": "Collect" }, { "meta": { "ignoreAuth": true, "tabBar": true }, "path": "/pages/profile/index", "name": "Profile" }, { "meta": { "ignoreAuth": true }, "path": "/pages/login/index", "name": "Login" }, { "path": "/pages/edit-info/index", "name": "Edit-Info" }, { "path": "/pages/edit-info/password", "name": "Password" }, { "meta": { "ignoreAuth": true }, "path": "/pages/select-port/index", "name": "SelectPort" }, { "meta": { "ignoreAuth": true }, "path": "/pages/notFound/404", "name": "NotFound" }, { "path": "/pagesA/list/test1/index" }, { "path": "/pagesA/list/test2/index" }, { "path": "/pagesA/freight/index" }, { "path": "/pagesA/freight/freight-detail/index" }, { "meta": { "ignoreAuth": true }, "path": "/pagesB/detail/index" }]]
  // 路由表信息
});
function setupRouter(app) {
  router_guard.c(router);
  app.use(router);
}
exports.r = router;
exports.s = setupRouter;
