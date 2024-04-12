<script lang="ts" setup>
import { computed } from "vue";
import { propsParams } from "./props";
const props: propsParams = defineProps();

const emit = defineEmits(["handleClick"]);

const handleClick = () => {
  emit("handleClick");
};
const comColor = computed(() => props.color);
</script>

<template>
  <view
    class="container"
    :class="{ mask: 'mask', maskMini: 'mask-mini', maskDark: 'mask-dark' }"
    :style="{
      'z-index': props.zIndex,
      opacity: props.maskOpacity,
      position: props.position,
    }"
    @click.prevent="handleClick"
  >
    <view class="main">
      <view v-if="props.iconType === 'annulus'" class="main-item">
        <view class="loader-annulus" :style="{ color: props.color }"></view>
      </view>
      <view v-if="props.iconType === 'triangle'" class="main-item">
        <view class="loader-triangle">
          <view class="loader-triangle-ball"></view>
          <view class="loader-triangle-ball"></view>
          <view class="loader-triangle-ball"></view>
        </view>
      </view>
    </view>
  </view>
</template>

<style lang="scss" scoped>
$dotSize: 30rpx;

@keyframes spinner {
  to {
    transform: rotate(360deg);
  }
}

@keyframes rotate {
  from {
    transform: rotate(0);
  }

  to {
    transform: rotate(360deg);
  }
}

@keyframes move {
  0%,
  15% {
    transform: translateY(0);
  }

  100% {
    transform: translateY(-150%);
  }
}

.container {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  .mask {
    z-index: 999 !important;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    height: 100vh;
    width: 100vw;
    background: rgba(255, 255, 255, var(--opacity));
    transform: translate(0, 0);
  }

  .mask-mini {
    height: 300rpx;
    width: 300rpx;
    border-radius: 20rpx;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }

  .mask-dark {
    background: rgba(7, 17, 27, var(--opacity));
  }

  .main {
    &-item {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);

      .loader-annulus {
        width: 60px;
        height: 60px;
      }

      .loader-annulus::before {
        content: "";
        box-sizing: border-box;
        position: absolute;
        width: 60px;
        height: 60px;
        border-radius: 50%;
        border-top: 2px solid v-bind(comColor);
        border-right: 2px solid transparent;
        animation: spinner 1s linear infinite;
      }

      .loader-triangle {
        animation: rotate 2s linear infinite normal;
        position: relative;
        transform-origin: 50% 50%;

        &-ball {
          height: $dotSize;
          width: $dotSize;
          left: -$dotSize * 0.5;
          position: absolute;
          top: -$dotSize * 0.5;
          transform-origin: 50% 50%;

          &:nth-of-type(2) {
            transform: rotate(120deg);
          }

          &:nth-of-type(3) {
            transform: rotate(240deg);
          }

          &::after {
            animation: move 2s * 0.5 ease-in-out infinite alternate;
            background: linear-gradient(135deg, #1fa2ff, #12d8fa, #29ffc6);
            border-radius: 50%;
            content: "";
            display: inline-block;
            height: 100%;
            width: 100%;
            transform-origin: 50% 50%;
          }
        }
      }
    }
  }
}
</style>
