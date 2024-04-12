import { request } from "@/utils/http";

const LOGIN = "/admin/login/phone";
const LOGIN_OUT = "/api/customer/logout";
const REFRESH_TOKEN = "/refresh/token";
const VERIFYCODE = "/admin/login/sms/phone/code";

/**
 * 登录
 * @param params
 */
export function login(data: LoginByVerifyCodeParams) {
  return request.Post<LoginModel>(LOGIN, data);
}

/**
 * 登出
 */
export function logout() {
  return request.Post(LOGIN_OUT, {});
}

/**
 * 刷新token
 */
export function refreshToken() {
  return request.Post<LoginModel>(REFRESH_TOKEN, {});
}

/**
 * 获取验证码
 */
export function getVerifyCode(params: Pick<LoginByVerifyCodeParams, "phone">) {
  return request.Get(VERIFYCODE, {
    params: params,
  });
}
