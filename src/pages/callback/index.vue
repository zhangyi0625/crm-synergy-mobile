<script lang="ts" setup>
	import { reactive, ref, unref, onMounted } from "vue";
	import { useRouter } from "uni-mini-router";
	import { useRequest } from "alova";
	import { postLoginByWX } from "../../services/api/auth";
	import { useAuthStore } from "@/state/modules/auth";
	import { Toast } from "@/utils/uniapi/prompt";
	import route from "../../uni_modules/vk-uview-ui/libs/function/route";
	import { omit } from "lodash-es";

	const router = useRouter();


	const authStore = useAuthStore();


	onMounted(() => {
		const code = getQueryString("code");
		if (code) {
			sendLogin({ code: code })
		}
	})

	const { data: loginData, send: sendLogin, onSuccess: success } : any = useRequest((params) => postLoginByWX(params), {
		immediate: false,
	});
	success(() => {
		console.log(loginData.value);
		if (loginData.value.customerTokenVO) {
			Toast("登录成功", { duration: 1500 });
			authStore.setToken(loginData.value.customerTokenVO.accessToken);
			// wx.setStorageSync('phone', loginForm.phone)
			wx.setStorageSync('openid', loginData.value.openid)
			wx.setStorageSync('userInfo', loginData.value.customerTokenVO.customer);
			// router.replace({ name: 'Home' })
			// router.push("/pages/index/index");
			uni.switchTab({
				url: '/pages/index/index'
			})
		} else {
			Toast('该微信号暂未注册，正在跳转到注册....')
			router.replace('/pages/login/register/index')
			wx.setStorageSync('openid', loginData.value.openid)
		}
	})
	const getQueryString = (name) => {
		const reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
		const r = window.location.search.substr(1).match(reg);
		return r ? decodeURIComponent(r[2]) : null;
	};
</script>



<template>

	<view class="">
		<view>登录中...</view>
	</view>
</template>

<style lang="scss" scoped>
</style>