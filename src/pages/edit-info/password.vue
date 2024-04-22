<script lang="ts" setup>
	import { reactive, ref, computed } from "vue";
	import DragCheck from "@/components/Drag-check/index.vue";
	import { useRequest } from "alova";
	import { useAuthStore } from "@/state/modules/auth";
	import { getEditPwdByCode, postEditPwd } from "@/services/api/user";
	import { Toast } from "@/utils/uniapi/prompt";

	const authStore = useAuthStore();

	const pwdForm = reactive<EditPassWord>({
		phone: computed(() => authStore.userinfo?.phone).value,
		password: '',
		code: '',
		confirmPassword: '',
	});

	const { send: checkCodeIdentity } = useRequest(getEditPwdByCode(), { immediate: false });

	// 计时器
	const countdownNumber = ref<number>(60);
	const isSendCheckCode = ref<boolean>(false);

	// 发送验证码
	const dragCheckShow = ref<boolean>(false);
	const sendCode = () => {
		dragCheckShow.value = true;
	};

	const maskClick = ref<boolean>(true);
	const result = (e : boolean) => {
		dragCheckShow.value = false;
		checkCodeIdentity().then(() => {
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
	const { send: isSend } : any = useRequest(postEditPwd(pwdForm), { immediate: false })
	const save = () => {
		if (!pwdForm.code) {
			Toast("请输入验证码!");
			return;
		} else if (!pwdForm.password) {
			Toast("请输入密码!");
			return;
		} else {
			pwdForm.confirmPassword = pwdForm.password
			isSend()
		}
	};
</script>

<template>
	<view class="password px-20">
		<view class="br12 bg-neutral mt-20">
			<view class="flex align-center font400 font28 dull-grey px-24 py-32"
				style="border-bottom: 1rpx solid #f5f7fa">
				<view class="mr-50">手机号</view>
				<input type="text" :disabled="true" placeholder="请输入手机号" v-model="pwdForm.phone" />
			</view>
			<view class="flex align-center font400 font28 dull-grey px-24 py-32"
				style="border-bottom: 1rpx solid #f5f7fa">
				<view class="mr-50">验证码</view>
				<input type="text" placeholder="请输入验证码" v-model="pwdForm.code" />
				<view class="font26 dull-red ml-10 whitespace-nowrap"
					style="padding-left: 24rpx; border-left: 2px solid #f5f7fa" @click="sendCode"
					v-if="!isSendCheckCode">
					发送验证码
				</view>
				<view v-else class="ml-100">{{ countdownNumber }}s</view>
			</view>
			<view class="flex align-center font400 font28 dull-grey px-24 py-32">
				<view class="mr-50">新密码</view>
				<input type="text" placeholder="请输入新密码" v-model="pwdForm.password" />
			</view>
		</view>
		<DragCheck :visiable="dragCheckShow" title="人工验证" minTitle="滑动滑块，使图片显示角度为正" image="/static/logo.png"
			icon="/static/images/icon/drag-check.png" :maskClick="maskClick" @update:visible="dragCheckShow = $event"
			@result="result" />
		<button class="pwd-btn mt-40" @click="save">保存</button>
	</view>
</template>

<style lang="scss" scoped></style>