import { defineStore } from "pinia";
import { getCache, removeCache, setCache } from "@/utils/cache";
import { TOKEN_KEY, USER_INFO_KEY } from "@/enums/cacheEnum";
import { logout } from "@/services/api/auth";
import { getUserInfo } from "@/services/api/user";
import { useRequest } from "alova";

interface AuthState {
	token ?: string;
	userinfo ?: object | any
}

export const useAuthStore = defineStore({
	id: "auth",
	state: () : AuthState => ({
		token: getCache(TOKEN_KEY),
		userinfo: getCache(USER_INFO_KEY)
	}),
	getters: {
		getToken: (state) => state.token,
		isLogin: (state) : boolean => !!state.token,
		getAuthorization: (state) => {
			return state.token ? { authorization: `Bearer ${state.token}` } : {};
		},
	},
	actions: {
		initToken() {
			this.token = getCache<string>(TOKEN_KEY) || undefined;
		},
		setToken(token : string | undefined) {
			setCache(TOKEN_KEY, token);
			this.token = token;
		},
		setUserInfo(info : object | any) {
			setCache(USER_INFO_KEY, info)
			this.userinfo = info
		},
		/**
		 * @description 登出
		 */
		async loginOut() : Promise<any> {
			try {
				const res = useRequest(logout());
				removeCache(USER_INFO_KEY);
				removeCache(TOKEN_KEY);
				this.setToken(undefined);
				this.setUserInfo(undefined)
				return Promise.resolve(res);
			} catch (err : any) {
				return Promise.reject(err);
			}
		},
		/**
		 * @description 刷新token
		 */
		async refreshToken() : Promise<any> {
			try {

			} catch (err : any) {
				return Promise.reject(err);
			}
		},
		/**
		 * @description 获取用户信息
		 */
		async getProfile() : Promise<any> {
			try {
				let { data } = useRequest(getUserInfo())
				this.setUserInfo(data)
			} catch (err : any) {
				return Promise.reject(err);
			}
		},
	},
});