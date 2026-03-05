<script lang="ts" setup>
	import { reactive, ref, unref, onMounted } from "vue";
	import { onLoad } from "@dcloudio/uni-app";
	import { useAuthStore } from "@/state/modules/auth";
	import { Toast } from "@/utils/uniapi/prompt";
	import { useRouter } from "uni-mini-router";
	import { useRequest } from "alova";
	import { getVerifyCode, login, profileInfo } from "@/services/api/auth";
	import { omit } from "lodash-es";
	import DragCheck from "@/components/Drag-check/index.vue";


	onMounted(() => {
		console.log('页面初始化....');
	})

	const router = useRouter();

	const authStore = useAuthStore();


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

	checkCodeSuccess(() => {

	})

	// 中国大陆手机号码正则表达式
	const regex = /^1[3-9]\d{9}$/;
	// 发送验证码
	const dragCheckShow = ref<boolean>(false);

	const countdownNumber = ref<number>(60);
	const isSendCheckCode = ref<boolean>(false);

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
				// Toast("手机号验证码服务暂未接通，请暂时填写0000");
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
	const { send: sendLogin } = useRequest((params) => login(params), {
		immediate: false,
	});
	const handleLogin = () => {
		if (!loginForm.verifyCode) {
			Toast("请输入验证码");
			return;
		} else {
			// uni.login({
			// 	provider: "weixin", //使用微信登录
			// 	success: function (loginRes) {
			// loginForm.wxCode = loginRes.code;
			let params = {
				code: loginForm.verifyCode,
				phone: loginForm.phone,
				openid: wx.getStorageSync('openid')
			}
			sendLogin(params).then((res : any) => {
				console.log(res, "res");
				Toast("登录成功", { duration: 1500 });
				authStore.setToken(res.accessToken);
				wx.setStorageSync('phone', loginForm.phone);
				wx.setStorageSync('userInfo', res.customer);
				// sendProfile();
				uni.switchTab({
					url: '/pages/index/index'
				})
				return
				// setTimeout(() => {
				// 	if (unref(pageQuery)?.redirect) {
				// 		// 如果有存在redirect(重定向)参数，登录成功后直接跳转
				// 		const params = omit(unref(pageQuery), ["redirect", "tabBar"]);
				// 		if (unref(pageQuery)?.tabBar) {
				// 			// 这里replace方法无法跳转tabbar页面故改为replaceAll
				// 			router.replaceAll({ name: unref(pageQuery).redirect, params });
				// 		} else {
				// 			router.replace({ name: unref(pageQuery).redirect, params });
				// 		}
				// 		router.replace('pages/index/index')
				// 	} else {
				// 		// 不存在则返回上一页
				// 		router.back();
				// 	}
				// }, 1500);
			});
			// 	},
			// });
		}
	};
</script>

<template>
	<view class="register">
		<view class="p-48 bg-neutral relative h-full" style="border-radius: 24px 24px 0px 0px;">
			<p class="dull-grey font34 font-bold">绑定手机号</p>
			<view class="info flex align-center px-24 py-28 br12 mt-40">
				<view class="font28 dull-grey mr-24">手机号</view>
				<input type="text" v-model="loginForm.phone" placeholder="请输入手机号" />
			</view>
			<view class="info flex align-center px-24 py-28 br12 mt-20">
				<view class="font28 dull-grey mr-24">验证码</view>
				<input type="text" v-model="loginForm.verifyCode" placeholder="请输入验证码" style="width: 300rpx" />
				<view class="dull-blue font28 font400 whitespace-nowrap" @click="sendCode" v-if="!isSendCheckCode">
					发送验证码
				</view>
				<view v-else class="ml-30">再次获取({{ countdownNumber }})</view>
			</view>
			<button class="pwd-btn mt-40" @click="handleLogin">登录</button>
		</view>
	</view>
</template>

<style lang="scss" scoped>
	.register {
		// background: #fff;
		// height: 100%;
		height: 100vh;
		overflow: hidden;
	}

	.info {
		background: #f5f7fa;
	}
</style>