"use strict";
const common_vendor = require("../../common/vendor.js"), utils_cache_index = require("../../utils/cache/index.js"), enums_cacheEnum = require("../../enums/cacheEnum.js"), services_api_auth = require("../../services/api/auth.js");
const useAuthStore = common_vendor.b({
  id: "auth",
  state: () => ({
    token: void 0
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
    /**
     * @description 登出
     */
    async loginOut() {
      try {
        const res = await services_api_auth.l();
        utils_cache_index.r(enums_cacheEnum.T);
        this.setToken(void 0);
        return Promise.resolve(res);
      } catch (err) {
        return Promise.reject(err);
      }
    }
    /**
     * @description 刷新token
     */
    // async refreshToken(): Promise<LoginModel> {
    //     try {
    //         const { data } = await refreshToken();
    //         this.setToken(data.token);
    //         return Promise.resolve(data);
    //     } catch (err: any) {
    //         return Promise.reject(err);
    //     }
    // },
  }
});
exports.u = useAuthStore;
