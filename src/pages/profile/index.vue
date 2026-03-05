<script lang="ts" setup>
	import { ref } from "vue";
	import { onShow } from "@dcloudio/uni-app";
	import { useAuthStore } from "@/state/modules/auth";
	import { useRouter } from "uni-mini-router";
	import { LOGIN_PAGE } from "@/enums/routerEnum";
	import { invalidateCache, useRequest } from "alova";
	import { getUserInfo, putAvatar } from "@/services/api/user";
	import { getCache } from "@/utils/cache";
	import { TOKEN_KEY } from "@/enums/cacheEnum";
	import { deleteFileUrl } from "@/services/api/file";
	import { Toast } from "@/utils/uniapi/prompt";


	const URL = import.meta.env.VITE_BASE_URL;

	const { data: userInfo, send: isSend, onSuccess: onSuccess } : any = useRequest(getUserInfo(), {
		initialData: [], immediate: false
	})

	const authStore = useAuthStore();
	const isLogin = ref<boolean>(false);
	const router = useRouter();

	const userData = ref({})

	onShow(() => {
		isLogin.value = authStore.isLogin;
		// isLogin.value && isSend()
		// isLogin.value && invalidateCache()
		if (authStore.isLogin) userData.value = wx.getStorageSync('userInfo')
		console.log(isLogin.value, authStore.isLogin);
	});

	onSuccess(() => {
		authStore.setUserInfo(userInfo.value)
	})


	const { send: isDelete } : any = useRequest(url => deleteFileUrl({ fileUrl: url }), { immediate: false })

	// 修改头像
	const editAvatar = () => {
		if (!isLogin.value) {
			uni.showModal({
				title: "",
				content: "登录即可修改头像，立刻去登录",
				success: function (res) {
					if (res.confirm) {
						router.push(LOGIN_PAGE);
					}
				},
			});
		} else {
			uni.chooseImage({
				count: 1,
				sizeType: ["original", "compressed"], //可以指定是原图还是压缩图，默认二者都有
				sourceType: ["album", "camera"], //从相册选择
				success: function (res) {
					const tempFiles : any = res.tempFilePaths
					uni.uploadFile({
						url: URL + '/api/file/upload',
						filePath: tempFiles[0],
						name: 'file',
						header: {
							'authorization': 'Bearer ' + getCache(TOKEN_KEY)
						},
						success: (uploadFileRes : any) => {
							let result = JSON.parse(uploadFileRes.data)
							if (result.code === 200) {
								Toast('头像上传成功！')
								// 上传头像成功之后回调
								onFinish(result.data)
							} else Toast(result.message)
						}
					});
				},
			});
		}
	};
	// 跳转
	const handleJump = () => {
		router.push("/pages/edit-info/password");
	};

	// 退出登录
	const handleLoginOut = () => {
		authStore.loginOut()
		isLogin.value = false;
		router.push(LOGIN_PAGE);
		userInfo.value = null
		wx.removeStorageSync('userInfo')
		wx.removeStorageSync('phone')
		wx.removeStorageSync('openid')
	};

	// 登录
	const handleLogin = () => {
		!isLogin.value && router.push(LOGIN_PAGE);
	};

	const { send: upload, onSuccess: refreshProfle } : any = useRequest((url) => putAvatar({ avatar: url }), { immediate: false })


	const onFinish = (url : string) => {
		authStore.userinfo?.avatar && isDelete(authStore.userinfo?.avatar)
		setTimeout(() => {
			upload(url)
		}, 200)
	}

	refreshProfle(() => {
		isSend()
		invalidateCache(getUserInfo())
	})
</script>

<template>
	<view class="profile">
		<view class="profile-title flex align-center">
			<img v-if="userInfo && userInfo?.avatar" :src="userInfo?.avatar" class="w-112 h-112 br-half" />
			<img v-else src="/static/images/avatar.png?timeStamp=111" class="w-112 h-112 br-half" />
			<view class="ml-20 font500 font40 dull-grey" v-if="!isLogin" @click="handleLogin">
				{{ !isLogin ? "登录/注册" : userInfo?.nickname }}
			</view>
			<view v-else class="ml-20 font500 font32 dull-grey">
				<p>{{userData.name}}</p>
				<p class="font28 font400">{{userData.phone}}</p>
			</view>
		</view>
		<view class="profile-content px-24 mt-40">
			<view class="br16 bg-neutral">
				<view class="flex align-center font400 font28 dull-grey px-24 py-32"
					style="border-bottom: 1rpx solid #f5f7fa">
					<view class="light-grey">所在企业</view>
					<view class="flex align-center ml-70 font26 font500">
						{{userData.companyName}}
						<!-- <view class="font26 light-grey">修改</view> -->
						<!-- <img src="/static/images/icon/left.png" class="w-16 h-24 ml-12" /> -->
					</view>
				</view>
				<view class="flex align-center  font400 font28 dull-grey px-24 py-32"
					style="border-bottom: 1rpx solid #f5f7fa">
					<view class="light-grey">所属一代</view>
					<view class="flex align-center ml-70 font26 font500">
						{{userData.companyName}}
						<!-- <view class="font26 light-grey">修改密码</view> -->
						<!-- <img src="/static/images/icon/left.png" class="w-16 h-24 ml-12" /> -->
					</view>
				</view>
				<!-- 				<view class="flex align-center flex-between font400 font28 dull-grey px-24 py-32">
					<view class="">绑定手机号</view>
					<view class="flex align-center">
						<view class="font26 light-grey">{{userInfo?.phone}}</view>
					</view>
				</view> -->
			</view>
			<button @click="handleLoginOut" class="logout-btn mt-20" style="border: none;">退出登录</button>
		</view>
	</view>
</template>

<style lang="scss" scoped>
	.profile {
		background: #F5F7FA;
		overflow: hidden;

		&-title {
			height: 400rpx;
			padding: 20rpx 0 0 32rpx;
		}

		&-content {
			// height: 160rpx;
			// background: linear-gradient(180deg, #ee2233 0%, #f5f7fa 100%);
		}

		::v-deep .uni-button:after {
			border: none !important;
		}
	}
</style>