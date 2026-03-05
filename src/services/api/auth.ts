import { request } from "@/utils/http";
import type {
  TaskSearchParams,
  CreateTaskType,
  BrashBoxListType,
} from "../model/taskModel";

const LOGIN = "/client/customer/bindWx";
// const LOGINBYPWD = "/api/app/login/password";
// const LOGIN_OUT = "/api/app/my/logout";
const VERIFYCODE = "/client/customer/sendBindWxCode/";
// const ISREGISTER = "/api/app/login/wxAppCode";

const PROFILE = "/customer/detail";

/**
 * 验证码登录
 * @param params
 */
export function login(data: LoginByVerifyCodeParams) {
  return request.Post<LoginModel>(LOGIN, data);
}

/**
 * 获取用户信息
 * @param params
 */
export function profileInfo() {
  return request.Get(PROFILE);
}

/**
 * 密码登录
 * @param params
 */
// export function pwdLogin(data : LoginByPwdParams) {
// 	return request.Post<LoginModel>(LOGINBYPWD, data);
// }

/**
 * 退出登录
 */
// export function logout() {
// 	return request.Post(LOGIN_OUT);
// }

/**
 * 刷新token
 */
// export function refreshToken(data : RegisterParams) {
// 	return request.Post(ISREGISTER, data);
// }

/**
 * 获取验证码
 */
export function getVerifyCode(params: Pick<LoginByVerifyCodeParams, "phone">) {
  return request.Post(VERIFYCODE + params.phone, params);
}

/**
 * 微信一键登录
 */

export function postLoginByWX(params: { code: string }) {
  return request.Get("/client/customer/wxLogin", {
    params: params,
  });
}

/**
 * 查询刷箱列表
 * @param {TaskSearchParams} params
 * @return
 */
export function getTask(params: TaskSearchParams) {
  return request.Get("/client/container-task", {
    params: params,
  });
}

/**
 * 根据提单号查询刷箱任务
 * @param {TaskSearchParams} params
 * @return
 */
export function getTaskByBillNo(id: string) {
  return request.Get("/client/container-task/getByBillNo/" + id);
}

/**
 * 删除刷箱记录
 * @param {string} id
 * @return
 */
export function deleteTask(id: string) {
  return request.Delete("/client/container-task/" + id);
}

/**
 * 启动刷箱任务
 * @param {string} id
 * @return
 */
export function startTask(id: string) {
  return request.Post("/client/container-task/start/" + id);
}

/**
 * 暂停刷箱任务
 * @param {string} id
 * @return
 */
export function stopTask(id: string) {
  return request.Post("/client/container-task/pause/" + id);
}

/**
 * 暂停刷箱任务
 * @param {string} id
 * @return
 */
export function cancelTask(id: string) {
  return request.Post("/client/container-task/cancel/" + id);
}

/**
 * 更新刷箱任务状态
 * @param {string} id
 * @return
 */
export function updateTask(id: string) {
  return request.Get("/client/container-task/refresh/reuslt/" + id);
}

/**
 * 查询刷箱任务详情
 * @param {string} id
 * @return
 */
export function getTaskDetail(id: string) {
  return request.Get<BrashBoxListType>("/client/container-task/" + id);
}

/**
 * 添加刷箱任务
 * @param {CreateTaskType} params
 * @return
 */
export function postTask(params: CreateTaskType) {
  return request.Post("/client/container-task", params);
}

/**
 * 修改刷箱任务
 * @param {CreateTaskType} params
 * @return
 */
export function putTask(params: CreateTaskType) {
  return request.Put("/client/container-task", params);
}

/**
 * 查询刷箱一周统计
 * @return
 */
export function getTaskStatistic() {
  return request.Get("/client/container-task/getSuccessTrendLast7Days");
}

/**
 * 查询系统箱型配置
 * @return
 */
export function getContainerType() {
  return request.Get("/client/container-type");
}
