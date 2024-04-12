<script lang="ts" setup>
import { onShow } from "@dcloudio/uni-app";
import { ref } from "vue";
import { formatUpdated } from "@/utils/time";

const collectData = ref([
  {
    por: {
      localName: "宁波",
      name: "Ningbo",
    },
    fnd: {
      localName: "鹿特丹",
      name: "Rotterdam",
    },
    createdTime: "2024-04-10 19:34:57",
  },
  {
    por: {
      localName: "上海",
      name: "Shanghai",
    },
    fnd: {
      localName: "汉堡",
      name: "Hamburg",
    },
    createdTime: "2024-04-06 23:31:41",
  },
]);

onShow(() => {
  // 初始化
  init();
});
const init = () => {};
// 取消收藏
const cancelCollect = () => {};
</script>

<template>
  <view class="collect px-20">
    <view
      class="p-24 bg-neutral br12 relative mt-20"
      v-for="(item, index) in collectData"
      :key="index"
    >
      <view
        class="absolute right-0 top-0 py-12 px-18 flex align-center bg-light-red br12-sm"
      >
        <img
          src="/static/images/collect/collect.png"
          class="w-32 h-32"
          @click="cancelCollect"
        />
        <view class="ml-4 font26 font400 dull-red">取消收藏</view>
      </view>
      <view
        class="absolute right-24 top-84 font24 font400 light-grey"
        v-if="item.createdTime"
      >
        收藏时间：{{ formatUpdated(item.createdTime, 10) }}</view
      >
      <view class="flex align-center">
        <img src="/static/images/collect/por.png" class="w-48 h-48" />
        <view class="font500 font32 dull-grey">
          {{ item.por.localName }} - {{ item.por.name }}
        </view>
      </view>
      <view class="line br2"></view>
      <view class="flex align-center">
        <img src="/static/images/collect/fnd.png" class="w-48 h-48" />
        <view class="font500 font32 dull-grey">
          {{ item.fnd.localName }} - {{ item.fnd.name }}
        </view>
      </view>
    </view>
  </view>
</template>

<style lang="scss" scoped>
.collect {
  .line {
    width: 2rpx;
    height: 40rpx;
    background: #edeff2;
    margin: 8rpx 0 8rpx 18rpx;
  }
}
</style>
