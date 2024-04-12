<script lang="ts" setup>
import { ref, watch, reactive } from "vue";
import { DragCheckProps } from "./props";

const emit = defineEmits(["update:visible", "result"]);

const props: DragCheckProps = defineProps();

const imageUrl = reactive([
  "/static/images/drag-check/drag-check1.jpg",
  "/static/images/drag-check/drag-check2.jpg",
  "/static/images/drag-check/drag-check3.jpg",
]);
const imgUrl = ref<string | undefined>("");

const disabled = ref<boolean>(false);
// 结果
const result = ref<string>("");
watch(props, () => {
  if (props.visiable) {
    result.value = "";
    toStart();
  }
});
const deg = ref<number>(0);
const startDeg = ref<number>(0);
const toStart = () => {
  var index = random(0, 2);
  imgUrl.value = imageUrl[index];
  var num = random(240, 300);
  deg.value = num;
  startDeg.value = num;
  x.value = x.value === 0 ? 0.1 : 0;
  disabled.value = false;
};

const touchEnd = (e: any) => {
  if (isPass.value) {
    disabled.value = true;
    result.value = "验证成功，2秒后自动关闭";
    setTimeout(() => {
      close();
      emit("result", isPass.value);
    }, 2000);
  } else {
    result.value = "验证失败，请重试";
    toStart();
  }
};

// 偏移X轴
const x = ref<number>(0);

// 关闭
const close = () => {
  if (!props.maskClick) return;
  emit("update:visible", false);
  disabled.value = false;
};

// 拖动回调
const isPass = ref<boolean>(false);
const onChange = (e: any) => {
  /** 详见文档 https://uniapp.dcloud.net.cn/component/movable-view.html */
  let newX = e.detail.x + startDeg.value;
  deg.value = newX;
  isPass.value =
    Math.abs((startDeg.value + newX) % 360) - startDeg.value > -10 &&
    Math.abs((startDeg.value + newX) % 360) - startDeg.value < 10
      ? true
      : false;
};

const random = (min: number, max: number) => {
  return Math.floor(Math.random() * (max - min)) + min;
};
</script>

<template>
  <view class="custom-modal">
    <view class="drag-check" v-if="props.visiable">
      <view class="font24 light-grey font400 text-center mt-50">{{
        props.title
      }}</view>
      <view class="font30 dull-grey font-bold mt-20 text-center">{{
        props.minTitle
      }}</view>
      <view
        class="font30 text-center dull-grey mt-20"
        :class="{ 'dull-red': result == '验证失败，请重试' }"
      >
        {{ result ? result : "" }}
      </view>
      <view
        class="flex align-center flex-center my-22"
        :style="'transform:rotate(' + deg + 'deg)'"
      >
        <img v-if="imgUrl" :src="imgUrl" class="w-400 h-400 br-100 my-10" />
      </view>
      <view class="drag-check-item">
        <movable-area>
          <movable-view
            :disabled="disabled"
            direction="horizontal"
            :x="x"
            @change="onChange"
            @touchend="touchEnd"
          >
            <img :src="props.icon" class="img" />
          </movable-view>
        </movable-area>
      </view>
    </view>
    <view
      @tap="close"
      @touchmove.stop.prevent
      :class="props.visiable ? 'pupop-model' : 'pupop-models'"
    ></view>
  </view>
</template>

<style lang="scss" scoped>
.custom-modal {
  .pupop-model {
    position: fixed;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    z-index: 100;
    background: rgba(0, 0, 0, 0.5);
  }

  .pupop-models {
    display: none;
  }

  .drag-check {
    position: fixed;
    width: 600rpx;
    height: 800rpx;
    border-radius: 30rpx;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    margin: auto;
    z-index: 120;
    background: #fff;

    &-item {
      padding: 0 50rpx;

      movable-area {
        height: 100rpx;
        width: 100%;
        border-radius: 100rpx;
        background: RGBA(254, 229, 229, 1);
        border: 2rpx solid #fa5151;

        movable-view {
          width: 80rpx;
          height: 80rpx;
          border-radius: 100%;
          padding: 10rpx;
          margin-top: 10rpx;

          .img {
            // width: 80rpx;
            // height: 76rpx;
            width: 100%;
            height: 100%;
          }
        }
      }
    }
  }
}
</style>
