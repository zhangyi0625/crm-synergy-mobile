<script setup lang="ts">
	import { reactive, ref, unref, onMounted } from "vue";
	import { onLoad } from "@dcloudio/uni-app";
	import { useAuthStore } from "@/state/modules/auth";
	import { Toast } from "@/utils/uniapi/prompt";
	import { useRouter } from "uni-mini-router";
	import { useRequest } from "alova";
	import { getVerifyCode, login, profileInfo } from "@/services/api/auth";
	import { omit } from "lodash-es";
	import DragCheck from "@/components/Drag-check/index.vue";


	let url = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=wxd1ee5e24bed667c3&redirect_uri=https://sx.zaicang.net/customer/#/pages/callback/index&response_type=code&scope=snsapi_base&state=123#wechat_redirect'
	const APP_ID = "wxd1ee5e24bed667c3"; // 公众号 AppID
	const API = import.meta.env.VITE_BASE_URL.split('/api')[0];
	const REDIRECT_URI = encodeURIComponent('https://testsx.zaicang.net/customer' + "/#/pages/callback/index"); // 需在公众号后台配置
	const SCOPE = "snsapi_base"; // 获取用户信息权限

	onMounted(() => {


	})



	const pageQuery = ref<Record<string, any> | undefined>(undefined);
	onLoad((query) => {
		// uni.login({
		// 	provider: "weixin", //使用微信登录
		// 	success: function (loginRes) {
		// 		// isSend(loginRes.code)
		// 		console.log(loginRes, 'loggin');
		// 	}
		// })
		pageQuery.value = query;
	});

	const current = ref<string>('smsCode')

	const showPassword = ref<boolean>(false)


	const router = useRouter();

	const authStore = useAuthStore();

	const { send: sendLogin } = useRequest((params) => login(params), {
		immediate: false,
	});

	const { data: profileData, send: sendProfile, onSuccess: sendProfileSuccess } = useRequest(() => profileInfo(), { immediate: false })
	sendProfileSuccess(() => {
		console.log(profileData.value, 'profileInfo');
		wx.setStorageSync('userInfo', profileData.value)
	})
	// 登录参数
	const loginForm = reactive<LoginByVerifyCodeParams>({
		phone: "",
		verifyCode: "",
		// aid: ""
	});
	const { data: checkCodeData, send: checkCodeIdentity, onSuccess: checkCodeSuccess } = useRequest(
		(params) => getVerifyCode({ phone: params.phone }),
		{ immediate: false }
	);
	// 中国大陆手机号码正则表达式
	const regex = /^1[3-9]\d{9}$/;
	// 发送验证码
	const dragCheckShow = ref<boolean>(false);
	const sendCode = () => {
		if (!loginForm.phone) {
			Toast("请输入手机号!");
			return;
		} else if (!regex.test(loginForm.phone)) {
			Toast("请输入正确手机号");
			return;
		} else {
			checkCodeIdentity(loginForm).then(() => {
				isSendCheckCode.value = true;
				Toast("手机号验证码服务暂未接通，请暂时填写0000");
				var timer = setInterval(() => {
					countdownNumber.value--;
					if (countdownNumber.value === 0) {
						isSendCheckCode.value = false;
						countdownNumber.value = 60;
						clearInterval(timer);
					}
				}, 1e3);
			});
		}
		// dragCheckShow.value = true;
	};
	// 登录
	const handleLogin = () => {
		if (current.value === 'smsCode' && !loginForm.verifyCode) {
			Toast("请输入验证码");
			return;
		} else {
			current.value === 'smsCode' &&
				// uni.login({
				// 	provider: "weixin", //使用微信登录
				// 	success: function (loginRes) {
				// loginForm.wxCode = loginRes.code;
				sendLogin(loginForm).then((res : any) => {
					console.log(res, "res");
					Toast("登录成功", { duration: 1500 });
					authStore.setToken(res.token);
					wx.setStorageSync('phone', loginForm.phone)

					sendProfile();
					setTimeout(() => {
						if (unref(pageQuery)?.redirect) {
							// 如果有存在redirect(重定向)参数，登录成功后直接跳转
							const params = omit(unref(pageQuery), ["redirect", "tabBar"]);
							if (unref(pageQuery)?.tabBar) {
								// 这里replace方法无法跳转tabbar页面故改为replaceAll
								router.replaceAll({ name: unref(pageQuery).redirect, params });
							} else {
								router.replace({ name: unref(pageQuery).redirect, params });
							}
						} else {
							// 不存在则返回上一页
							router.back();
						}
					}, 1500);
				});
			// 	},
			// });
			current.value === 'pwd' && loginByPwd()
		}
	};
	// 用户使用密码登录
	const pwdForm = reactive<LoginByPwdParams>({
		loginName: '',
		password: ''
	})
	const loginByPwd = () => {
		if (!pwdForm.loginName) {
			Toast("请输入用户名!");
			return;
		} else if (!pwdForm.password) {
			Toast("请输入密码");
			return;
		} else {
			// passWordLogin(pwdForm)
		}
	}
	checkCodeSuccess(() => {
		console.log(checkCodeData.value);
	})
	// pwdLoginSuccess(() => {
	// 	Toast("登录成功", { duration: 1500 });
	// 	authStore.setToken(pwdData.value);
	// 	setTimeout(() => {
	// 		if (unref(pageQuery)?.redirect) {
	// 			// 如果有存在redirect(重定向)参数，登录成功后直接跳转
	// 			const params = omit(unref(pageQuery), ["redirect", "tabBar"]);
	// 			if (unref(pageQuery)?.tabBar) {
	// 				// 这里replace方法无法跳转tabbar页面故改为replaceAll
	// 				router.replaceAll({ name: unref(pageQuery).redirect, params });
	// 			} else {
	// 				router.replace({ name: unref(pageQuery).redirect, params });
	// 			}
	// 		} else {
	// 			// 不存在则返回上一页
	// 			router.back();
	// 		}
	// 	}, 1500);
	// })
	const maskClick = ref<boolean>(true);
	const result = (e : boolean) => {
		dragCheckShow.value = false;
		checkCodeIdentity(loginForm).then(() => {
			isSendCheckCode.value = true;
			var timer = setInterval(() => {
				countdownNumber.value--;
				if (countdownNumber.value === 0) {
					isSendCheckCode.value = false;
					countdownNumber.value = 60;
					clearInterval(timer);
				}
			}, 1e3);
		});
	};
	// 计时器
	const countdownNumber = ref<number>(60);
	const isSendCheckCode = ref<boolean>(false);


	const changePassWordShow = () => {

	}

	const getQueryString = (name) => {
		const url = "https://open.weixin.qq.com/connect/oauth2/authorize?appid=wxd1ee5e24bed667c3&redirect_uri=http://localhost:5173/#/pages/login/index&response_type=code&scope=snsapi_base&state=STATE#wechat_redirect"
		const reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
		const r = url.substr(1).match(reg);
		console.log(reg, r, url);
		return r ? decodeURIComponent(r[2]) : null;
	};

	const handleLoginByWx = () => {
		// const code = getQueryString("code");
		// console.log(code, 'code');
		// if (code) {

		// }
		// router.push("/pages/login/register/index")
		// authStore.setToken('5fd4405be08d463ab6ed37a1d0f51a0d');
		// uni.switchTab({
		// 	url: '/pages/index/index'
		// })
		// return
		const authUrl = `https://sx.zaicang.net/get_wxcode.html?appid=${APP_ID}&redirect_uri=${REDIRECT_URI}&response_type=code&scope=${SCOPE}&state=123#wechat_redirect`;
		console.log(window.location.origin, 'window.location.origin', authUrl);
		window.location.href = authUrl;
	}
</script>

<template>
	<view class="login bg-neutral">
		<!-- 		<view class="relative neutral font48 font-bold logo">
			<img src="/static/login/bg.png" class="w-full h-full flex" />
			<p class="absolute" style="top: 66px;left: 24px;">欢迎登录</p>
			<p class="absolute" style="top: 100px;left: 24px;">销售系统客户端</p>
		</view> -->
		<view class="p-48 bg-neutral relative h-full" style="border-radius: 24px 24px 0px 0px;top: -30px;">
			<view class="flex flex-column text-center flex-center" style="margin-bottom: 80px;">
				<img src="/static/images/logo.png" class="logo">
				<view class="font40 font-bold mt-10" style="color: #0E3380;">刷箱管理平台</view>
			</view>
			<!-- 			<view class="flex align-center font34 font-bold dull-grey">
				<view :class="[current === 'smsCode' ? 'active light-red' : '']" @click="current = 'smsCode'">验证码登录
				</view>
				<view class="ml-30" :class="[current === 'pwd' ? 'active light-red' : '']" @click="current = 'pwd'">密码登录
				</view>
			</view> -->
			<!-- 			<view class="info flex align-center px-24 py-28 br12 mt-40" v-if="current === 'smsCode'">
				<view class="font28 dull-grey mr-24">手机号</view>
				<input type="text" v-model="loginForm.phone" placeholder="请输入手机号" />
			</view>
			<view class="info flex align-center px-24 py-28 br12 mt-40" v-if="current === 'pwd'">
				<view class="font28 dull-grey mr-24">用户名</view>
				<input type="text" v-model="pwdForm.loginName" placeholder="请输入用户名" />
			</view>
			<view class="info flex align-center px-24 py-28 br12 mt-20 relative" v-if="current === 'pwd'">
				<view class="font28 dull-grey mr-24">登录密码</view>
				<input type="text" :password="showPassword" v-model="pwdForm.password" placeholder="请输入登录密码" />
				<img src="/static/images/icon/hidden.png" class="w-32 h-32 absolute right-10"
					@click="showPassword = !showPassword">
			</view>
			<view class="info flex align-center px-24 py-28 br12 mt-20" v-if="current === 'smsCode'">
				<view class="font28 dull-grey mr-24">验证码</view>
				<input type="text" v-model="loginForm.verifyCode" placeholder="请输入验证码" style="width: 300rpx" />
				<view class="dull-blue font28 font400 whitespace-nowrap" @click="sendCode" v-if="!isSendCheckCode">发送验证码
				</view>
				<view v-else class="ml-30">再次获取({{ countdownNumber }})</view>
			</view>
			<button class="pwd-btn mt-40" @click="handleLogin">登录/注册</button> -->
			<button class="wx-btn mt-20" @click="handleLoginByWx">微信登录</button>
		</view>
		<!-- 		<DragCheck :visiable="dragCheckShow" title="人工验证" minTitle="滑动滑块，使图片显示角度为正" image="/static/logo.png"
			icon="/static/images/icon/drag-check.png" :maskClick="maskClick" @update:visible="dragCheckShow = $event"
			@result="result" /> -->
	</view>
</template>

<style lang="scss" scoped>
	.login {
		height: 100vh;
		background: #EDEDED;
		overflow: hidden;

		.active {
			text-decoration: underline;
		}

		.logo {
			// width: 375rpx;
			width: 153rpx;
			// height: 168rpx;
			margin: 0 auto;
			padding-top: 80px;
		}


		.wx-btn {
			background: #1677FF;
			color: #fff;
			border-color: #1677FF;
		}

		.info {
			background: #f5f7fa;
		}
	}
</style>