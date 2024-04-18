import { request } from '@/utils/http';

/**
 * 获取用户信息
 */
export function getUserInfo() {
	return request.Get('/api/app/my/getInfo');
}


/**
 * 获取字典数据
 */
export function getDictByTag(dictName : string) {
	return request.Get('/api/system/dict/class/getData/' + dictName);
}

/**
 * 获取系统公告数据
 */
export function getSysNotice() {
	return request.Get('/api/message/notice/getValidList');
}


/**
 * 修改密码获取验证码
 */
export function getEditPwdByCode() {
	return request.Get('/api/app/my/phoneCode');
}



/**
 * 修改密码
 */
export function postEditPwd(data : EditPassWord) {
	return request.Post('/api/app/my/changePwd', data);
}

/**
 * 修改密码
 */
export function putAvatar(data : any) {
	return request.Post('/api/app/my/updateAvatar', data);
}