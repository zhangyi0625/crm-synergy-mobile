<script setup lang="ts">
	import { reactive, ref, unref } from "vue";
	import { onLoad } from "@dcloudio/uni-app";
	import { useAuthStore } from "@/state/modules/auth";
	import { Toast } from "@/utils/uniapi/prompt";
	import { useRouter } from "uni-mini-router";
	import { useRequest } from "alova";
	import { getVerifyCode, login } from "@/services/api/auth";
	import { omit } from "lodash-es";
	import DragCheck from "@/components/Drag-check/index.vue";

	const pageQuery = ref<Record<string, any> | undefined>(undefined);
	onLoad((query) => {
		pageQuery.value = query;
	});

	const router = useRouter();

	const authStore = useAuthStore();

	const { send: sendLogin } = useRequest((params) => login(params), {
		immediate: false,
	});
	// 登录参数
	const loginForm = reactive<LoginByVerifyCodeParams>({
		phone: "",
		code: "",
	});
	const { send: checkCodeIdentity } = useRequest(
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
		} else dragCheckShow.value = true;
	};
	// 登录
	const handleLogin = () => {
		if (!loginForm.code) {
			Toast("请输入验证码");
			return;
		} else {
			uni.login({
				provider: "weixin", //使用微信登录
				success: function (loginRes) {
					loginForm.wxCode = loginRes.code;
					sendLogin(loginForm).then((res : any) => {
						console.log(res, "res");
						Toast("登录成功", { duration: 1500 });
						authStore.setToken(res.access_token);
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
				},
			});
		}
	};
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
</script>

<template>
	<view class="login bg-neutral">
		<img src="/static/logo.png" class="logo flex" />
		<view class="mx-30">
			<view class="info flex align-center px-24 py-28 br12">
				<view class="font28 dull-grey mr-24">手机号</view>
				<input type="text" v-model="loginForm.phone" placeholder="请输入手机号" />
			</view>
			<view class="info flex align-center px-24 py-28 br12 mt-20">
				<view class="font28 dull-grey mr-24">验证码</view>
				<input type="text" v-model="loginForm.code" placeholder="请输入验证码" style="width: 380rpx" />
				<view class="dull-red font28 font400 whitespace-nowrap" @click="sendCode" v-if="!isSendCheckCode">发送验证码
				</view>
				<view v-else class="ml-50">{{ countdownNumber }}s</view>
			</view>
			<button class="pwd-btn mt-40" @click="handleLogin">登录</button>
		</view>
		<DragCheck :visiable="dragCheckShow" title="人工验证" minTitle="滑动滑块，使图片显示角度为正" image="/static/logo.png"
			icon="/static/images/icon/drag-check.png" :maskClick="maskClick" @upstate-visible="dragCheckShow = $event"
			@result="result" />
	</view>
</template>

<style lang="scss" scoped>
	.login {
		height: 100vh;

		.logo {
			width: 400rpx;
			height: 400rpx;
			margin: auto;
		}

		.info {
			background: #f5f7fa;
		}
	}
</style>