<script setup lang="ts">
	import { onLaunch, onShow, onHide } from "@dcloudio/uni-app";
	import { useAuthStore } from "@/state/modules/auth";
	import { useRequest } from "alova";
	import { refreshToken } from "./services/api/auth";

	const { data: dataOptions, send: isSend, onSuccess: onSuccess } : any = useRequest((loginRes) => refreshToken({ jsCode: loginRes }), { immediate: false });
	onLaunch(() => {
		console.log("App Launch");
	});
	onShow(() => {
		/**
		 * 新用户首次进入时跳转login页 使用验证码注册登录
		 * 平台用户进入时判断获取token 实现自动登录
		 */
		uni.login({
			provider: "weixin", //使用微信登录
			success: function (loginRes) {
				isSend(loginRes.code)
			}
		})
	});
	onHide(() => {
		console.log("App Hide");
	});

	onSuccess(() => {
		const authStore = useAuthStore();
		if (dataOptions.value.status) {
			authStore.setToken(dataOptions.value.accessToken)
			authStore.getProfile()
		} else {

		}
	})
</script>
<style lang="scss">
	@import "@/assets/main.scss";
	@import "../src/uni_modules/vk-uview-ui/index.scss";
	@import "@/assets/reset.css";
</style>