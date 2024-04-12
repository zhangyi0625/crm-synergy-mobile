"use strict";
const state_modules_auth = require("../state/modules/auth.js"), utils_cache_index = require("../utils/cache/index.js"), enums_cacheEnum = require("../enums/cacheEnum.js");
function createRouterGuard(router) {
  createBeforeEachGuard(router);
  createAfterEachGuard(router);
}
function createBeforeEachGuard(router) {
  router.beforeEach((to, _, next) => {
    var _a, _b;
    const authStore = state_modules_auth.u();
    console.log(
      authStore,
      authStore.isLogin,
      "to",
      to,
      utils_cache_index.g(enums_cacheEnum.T),
      enums_cacheEnum.T
    );
    if (to && ((_a = to == null ? void 0 : to.meta) == null ? void 0 : _a.ignoreAuth)) {
      next();
    } else if (!authStore.isLogin && to && to.name !== "Login") {
      next({
        name: "Login",
        params: { redirect: to.name, tabBar: (_b = to == null ? void 0 : to.meta) == null ? void 0 : _b.tabBar, ...to.query },
        navType: "push"
      });
    } else if (authStore.isLogin && to && to.name === "Login") {
      next({ name: "Home", navType: "replaceAll" });
    } else {
      next();
    }
  });
}
function createAfterEachGuard(router) {
  router.afterEach((to) => {
    var _a;
    if (to && ((_a = to == null ? void 0 : to.meta) == null ? void 0 : _a.ignoreAuth))
      return;
    const authStore = state_modules_auth.u();
    if (!authStore.isLogin && to && to.name !== "Login")
      ;
    else if (authStore.isLogin && to && to.name === "Login") {
      router.replaceAll({ name: "Home" });
    }
  });
}
exports.c = createRouterGuard;
