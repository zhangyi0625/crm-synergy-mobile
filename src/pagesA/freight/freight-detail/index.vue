<script lang="ts" setup>
import { formatTime } from "@/utils/time";
import { onLoad } from "@dcloudio/uni-app";
import { useRouter } from "uni-mini-router";
import { computed, ref } from "vue";

const router = useRouter();

const URL = import.meta.env.VITE_BASE_URL;

const cabinDetail = ref<any>({});
onLoad((options: any) => {
  cabinDetail.value = options.info && JSON.parse(options.info);
});

// 打开报价单
const jumpQuotation = () => {
  router.push("");
};
const hasRemark = computed(
  () =>
    cabinDetail.value.weightRemark ||
    cabinDetail.value.freshRemark ||
    cabinDetail.value.otherRemark
);
</script>

<template>
  <view class="freight-detail relative font28 font400 dull-grey">
    <!-- 舱位详情 -->
    <view class="p-24 bg-neutral mx-20 mt-20 br12">
      <view class="flex align-center flex-between">
        <view class="flex align-center">
          <img
            :src="URL + '/carrier-logo/' + cabinDetail.carrierCode + '.png'"
            class="w-68 h-68"
          />
          <view class="flex flex-column font24 ml-12">
            <view class="font-bold">{{ cabinDetail.carrierCode }}</view>
            <view class="font24"
              >运价有效期：{{ formatTime(cabinDetail.validFrom, "M-D") }} 至
              {{ formatTime(cabinDetail.validTo, "M-D") }}
            </view>
          </view>
        </view>
        <view class="transitNum br8 dull-red font22 text-center"
          >{{ cabinDetail.transitNum > 0 ? "中转" : "直达" }}
        </view>
      </view>
      <view class="mt-40">
        <view class="flex align-center">
          <img src="/static/images/collect/por.png" class="mr-5 w-48 h-48" />
          <view
            >{{ cabinDetail.porPortResp.cnName }}-{{
              cabinDetail.porPortResp.enName
            }}</view
          >
        </view>
        <view
          class="pl-30 pb-20 ml-20 font400 grey"
          style="border-left: 1px solid #edeff2"
        >
          <view>ETD：{{ formatTime(cabinDetail.etd, "M-D") }}</view>
          <view>码头：</view>
          <view class="mt-40 p-24 bg-light-grey br12">
            <view class="flex">
              <view>航程：{{ cabinDetail.voyDays }}天</view>
              <view class="mx-40">航线：{{ cabinDetail.carrierRoute }}</view>
              <view>船期：{{ cabinDetail.schedule }}</view>
            </view>
            <view
              >船名航次：{{ cabinDetail.vesselName }}/{{
                cabinDetail.voyNo
              }}</view
            >
          </view>
        </view>
        <view class="flex flex-column">
          <view class="flex align-center">
            <img src="/static/images/collect/fnd.png" class="mr-5 w-48 h-48" />
            <view
              >{{ cabinDetail.fndPortResp.cnName }}-{{
                cabinDetail.fndPortResp.enName
              }}</view
            >
          </view>
          <view class="ml-50"
            >ETA：{{ formatTime(cabinDetail.eta, "M-D") }}</view
          >
          <view class="ml-50">码头：</view>
        </view>
      </view>
    </view>
    <!-- 价格详情 -->
    <view class="p-24 bg-neutral mx-20 mt-20 br12 relative">
      <view
        class="isSale absolute text-center left-0 top-0 font22"
        :class="[cabinDetail.isSale ? 'active' : 'light-grey']"
      >
        {{ cabinDetail.isSale ? "有库存" : "无库存" }}
      </view>
    </view>
    <!-- 费用详情 -->
    <view class="p-24 bg-neutral mx-20 mt-20 br12">
      <view
        class="flex align-center dull-grey flex-between pb-30"
        style="border-bottom: 1px solid #f5f7fa"
      >
        <view>费用详情</view>
        <view class="font24"></view>
      </view>
    </view>
    <!-- D&D -->
    <view class="p-24 bg-neutral mx-20 mt-20 br12">
      <view>D&D</view>
    </view>
    <!-- 备注 -->
    <view
      class="p-24 bg-neutral flex flex-column mx-20 br12 mt-20"
      v-if="hasRemark"
    >
      <view v-if="cabinDetail.weightRemark">
        限重备注
        <view class="mt-10 light-grey">{{ cabinDetail.weightRemark }}</view>
      </view>
      <view v-if="cabinDetail.freshRemark" class="mt-40">
        免用箱备注
        <view class="mt-10 light-grey">{{ cabinDetail.freshRemark }}</view>
      </view>
      <view v-if="cabinDetail.freshRemark" class="mt-40">
        其他备注
        <view class="mt-10 light-grey">{{ cabinDetail.freshRemark }}</view>
      </view>
    </view>
    <view class="quotation bg-neutral w-full">
      <button class="quotation-btn" @click="jumpQuotation">报价单</button>
    </view>
  </view>
</template>

<style lang="scss" scoped>
.freight-detail {
  .transitNum {
    width: 68rpx;
    height: 36rpx;
    border: 2rpx solid #ee2233;
  }

  .isSale {
    width: 112rpx;
    height: 40rpx;
    line-height: 40rpx;
    border-radius: 12rpx 0rpx 12rpx 0rpx;
    background: RGBA(238, 239, 240, 1);
    // opacity: 0.15;
  }

  .active {
    background: RGBA(254, 229, 229, 1);
    color: #fa5151;
  }

  .quotation {
    position: fixed;
    bottom: 0;
    padding: 20rpx 24rpx 40rpx;
  }
}
</style>
