<script lang="ts" setup>
import { reactive, ref } from "vue";
import DragCheck from "@/components/Drag-check/index.vue";
import { useRequest } from "alova";
import { getVerifyCode } from "@/services/api/auth";

const pwdForm = reactive({
  password: "",
  code: "",
  passwordAgain: "",
});

const { send: checkCodeIdentity } = useRequest(
  (params) => getVerifyCode({ phone: params.phone }),
  { immediate: false }
);

// 计时器
const countdownNumber = ref<number>(60);
const isSendCheckCode = ref<boolean>(false);

// 发送验证码
const dragCheckShow = ref<boolean>(false);
const sendCode = () => {};

const maskClick = ref<boolean>(true);
const result = (e: boolean) => {
  dragCheckShow.value = false;
  checkCodeIdentity(loginForm).then(() => {
    // loginForm.verifyKey = res.verifyKey
    // loginForm.code = res.code
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
const save = () => {
  return;
};
</script>

<template>
  <view class="password px-20">
    <view class="br12 bg-neutral mt-20">
      <view
        class="flex align-center font400 font28 dull-grey px-24 py-32"
        style="border-bottom: 1rpx solid #f5f7fa"
      >
        <view class="mr-50">手机号</view>
        <input
          type="text"
          placeholder="请输入手机号"
          v-model="pwdForm.password"
        />
      </view>
      <view
        class="flex align-center font400 font28 dull-grey px-24 py-32"
        style="border-bottom: 1rpx solid #f5f7fa"
      >
        <view class="mr-50">验证码</view>
        <input type="text" placeholder="请输入验证码" v-model="pwdForm.code" />
        <view
          class="font26 dull-red ml-50"
          style="padding-left: 24rpx; border-left: 2px solid #f5f7fa"
          @click="sendCode"
          v-if="!isSendCheckCode"
        >
          发送验证码
        </view>
        <view v-else class="ml-50">{{ countdownNumber }}s</view>
      </view>
      <view class="flex align-center font400 font28 dull-grey px-24 py-32">
        <view class="mr-50">新密码</view>
        <input
          type="text"
          placeholder="请输入新密码"
          v-model="pwdForm.passwordAgain"
        />
      </view>
    </view>
    <DragCheck
      :visiable="dragCheckShow"
      title="人工验证"
      minTitle="滑动滑块，使图片显示角度为正"
      image="/static/logo.png"
      icon="/static/images/icon/drag-check.png"
      :maskClick="maskClick"
      @upstate-visible="dragCheckShow = $event"
      @result="result"
    />
    <button class="pwd-btn mt-40" @click="save">保存</button>
  </view>
</template>

<style lang="scss" scoped></style>
