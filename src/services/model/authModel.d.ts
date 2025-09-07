declare interface LoginParams {
  email: string;
  password: string;
}
declare interface LoginModel {
  token: string;
}

declare interface LoginByVerifyCodeParams {
  phone: string;
  verifyCode: string;
  wxCode?: string;
  aid?: string;
}

declare interface LoginByPwdParams {
  loginName: string;
  password: string;
}

declare interface RegisterParams {
  jsCode: string;
}
