"use strict";
const common_vendor = require("../../common/vendor.js"), utils_cache_index = require("../../utils/cache/index.js"), enums_cacheEnum = require("../../enums/cacheEnum.js"), services_api_auth = require("../../services/api/auth.js"), services_api_user = require("../../services/api/user.js");
const useAuthStore = common_vendor.b({
  id: "auth",
  state: () => ({
    token: utils_cache_index.g(enums_cacheEnum.T),
    userinfo: utils_cache_index.g(enums_cacheEnum.U)
  }),
  getters: {
    getToken: (state) => state.token,
    isLogin: (state) => !!state.token,
    getAuthorization: (state) => {
      return state.token ? { authorization: `Bearer ${state.token}` } : {};
    }
  },
  actions: {
    initToken() {
      this.token = utils_cache_index.g(enums_cacheEnum.T) || void 0;
    },
    setToken(token) {
      utils_cache_index.s(enums_cacheEnum.T, token);
      this.token = token;
    },
    setUserInfo(info) {
      utils_cache_index.s(enums_cacheEnum.U, info);
      this.userinfo = info;
    },
    /**
     * @description 登出
     */
    async loginOut() {
      try {
        const res = common_vendor.u(services_api_auth.l());
        utils_cache_index.r(enums_cacheEnum.U);
        utils_cache_index.r(enums_cacheEnum.T);
        this.setToken(void 0);
        this.setUserInfo(void 0);
        return Promise.resolve(res);
      } catch (err) {
        return Promise.reject(err);
      }
    },
    /**
     * @description 刷新token
     */
    async refreshToken() {
    },
    /**
     * @description 获取用户信息
     */
    async getProfile() {
      try {
        let { data } = common_vendor.u(services_api_user.g());
        this.setUserInfo(data);
      } catch (err) {
        return Promise.reject(err);
      }
    }
  }
});
exports.u = useAuthStore;
