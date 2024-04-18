declare interface EditPassWord {
	/** 手机号 */
	phone ?: string;
	/** 密码 */
	password : string,
	/** 验证码 */
	code : string | number,
	/** 确认密码 */
	confirmPassword : string,
}