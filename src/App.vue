<script setup lang="ts">
	import { onLaunch, onShow, onHide } from "@dcloudio/uni-app";
	import { useAuthStore } from "@/state/modules/auth";
	import { useRequest } from "alova";
	// import { refreshToken } from "./services/api/auth";
	import { useRouter } from "uni-mini-router";

	const router = useRouter()

	// const { data: dataOptions, send: isSend, onSuccess: onSuccess } : any = useRequest((loginRes) => refreshToken({ jsCode: loginRes }), { immediate: false });
	onLaunch(() => {
		// console.log("App Launch");
		// const updateManager = uni.getUpdateManager();

		// updateManager.onCheckForUpdate(function (res) {
		// 	// 请求完新版本信息的回调
		// 	console.log(res.hasUpdate);
		// });

		// updateManager.onUpdateReady(function (res) {
		// 	uni.showModal({
		// 		title: '更新提示',
		// 		content: '新版本已经准备好，是否重启应用？',
		// 		success(res) {
		// 			if (res.confirm) {
		// 				// 新的版本已经下载好，调用 applyUpdate 应用新版本并重启
		// 				updateManager.applyUpdate();
		// 			}
		// 		}
		// 	});

		// });

		// updateManager.onUpdateFailed(function (res) {
		// 	// 新的版本下载失败
		// });
	});
	onShow(() => {
		/**
		 * 新用户首次进入时跳转login页 使用验证码注册登录
		 * 平台用户进入时判断获取token 实现自动登录
		 */
		uni.login({
			provider: "weixin", //使用微信登录
			success: function (loginRes) {
				// isSend(loginRes.code)
			}
		})
		// 隐藏底部导航
		uni.hideTabBar();
	});
	onHide(() => {
		console.log("App Hide");
	});

	// onSuccess(() => {
	// 	const authStore = useAuthStore();
	// 	if (dataOptions.value.status) {
	// 		authStore.setToken(dataOptions.value.accessToken)
	// 		authStore.getProfile()
	// 	} else {
	// 		router.push('/pages/login/index')
	// 	}
	// })
</script>
<style lang="scss">
	@import "@/assets/main.scss";
	@import "../src/uni_modules/vk-uview-ui/index.scss";
	@import"@/assets/reset.css";
	// @use '../src/uni_modules/vk-uview-ui/theme.scss' as uview;
	@import '../src/uni_modules/vk-uview-ui/theme.scss';
</style>