declare interface LoginParams {
	email : string;
	password : string;
}
declare interface LoginModel {
	token : string;
}

declare interface LoginByVerifyCodeParams {
	phone : string;
	// verifyCode : string;
	// verifyKey : string;
	code : string;
	wxCode ?: string;
	aid ?: string
}

declare interface RegisterParams {
	jsCode : string
}