import { request } from "@/utils/http";

const LOGIN = "/admin/login/phone";
const LOGIN_OUT = "/api/app/my/logout";
const VERIFYCODE = "/admin/login/sms/phone/code";
const ISREGISTER = "/api/app/login/wxAppCode";

/**
 * 登录
 * @param params
 */
export function login(data : LoginByVerifyCodeParams) {
	return request.Post<LoginModel>(LOGIN, data);
}

/**
 * 退出登录
 */
export function logout() {
	return request.Post(LOGIN_OUT);
}

/**
 * 刷新token
 */
export function refreshToken(data : RegisterParams) {
	return request.Post(ISREGISTER, data);
}

/**
 * 获取验证码
 */
export function getVerifyCode(params : Pick<LoginByVerifyCodeParams, "phone">) {
	return request.Get(VERIFYCODE, {
		params: params,
	});
}