<script lang="ts" setup>
import { getCarrierList } from "@/services/api/freight";
import { onLoad } from "@dcloudio/uni-app";
import { useRequest } from "alova";
import { reactive, ref } from "vue";
import {
  sortList,
  ctnSortPrice,
  dataSource,
  transitType,
  freightTestData,
} from "./config";
import FreightTable from "./component/freight-table/index";
import { router } from "@/router";

const locationInfo = ref<any>({});

const current = ref<number>(0);

onLoad((options: any) => {
  locationInfo.value = JSON.parse(options.info) || {};
  uni.setNavigationBarTitle({
    title:
      locationInfo.value.por.localName + "-" + locationInfo.value.fnd.localName,
  });
});

// 船公司数据
const { data: carrierLsit }: any = useRequest(getCarrierList(), {
  initialData: [],
});

// 运价数据
const freightData = ref<any>([]);
// 查询条件 && 筛选条件
const freightParams = reactive<freightSearchParams>({
  porCode: "",
  fndCode: "",
  sortField: "",
  carriers: "",
  dataSource: "",
  transitNum: null,
});
console.log(sortList, "sortList");

// 筛选切换回调
const priceCtnShow = ref<boolean>(false);
const changeCurrent = (index: number) => {
  current.value = index;
  if (index === 1) priceCtnShow.value = true;
  else {
    (sortList as any)[1]["name"] = "最便宜";
    freightParams.sortField = (sortList as any)[current.value]["value"];
  }
  loadFreightData("sort");
};

const loadFreightData = (type: string) => {};

// 选择箱型回调
const changeCtnType = (ctn: any) => {
  freightParams.sortField = ctn.value;
  priceCtnShow.value = false;
  (sortList as any)[current.value]["name"] = ctn.label;
};

// 过滤popup
const filterModalShow = ref<boolean>(false);
const changeFilter = (item: any, type: string) => {
  if (type === "carrier") {
    let arr = freightParams.carriers ? freightParams.carriers.split(",") : [];
    freightParams.carriers =
      arr.length > 0 && arr.includes(item.carrierCode)
        ? arr.filter((el: string) => el !== item.carrierCode).join(",")
        : arr.concat([item.carrierCode]).join(",");
  } else
    freightParams[type] = freightParams[type] === item.value ? "" : item.value;
};
const reset = () => {
  console.log(freightParams);
  freightParams.carriers = "";
  freightParams.dataSource = "";
  freightParams.transitNum = null;
};
const confirm = () => {
  filterModalShow.value = false;
  console.log(freightParams);
};

const jumpEither = (item: any, type?: string) => {
  console.log(item, "jump", type);
  router.push(
    "/pagesA/freight/freight-detail/index?info=" + JSON.stringify(item)
  );
};
</script>

<template>
  <view class="freight">
    <view class="py-12 px-20 bg-neutral flex align-center">
      <view
        v-for="(item, index) in sortList"
        :key="index"
        class="sort br8 py-8 font26 ml-12 relative"
        :class="[
          current === index
            ? 'bg-light-red dull-red font-bolds'
            : 'bg-light-grey grey',
        ]"
        @click.stop="changeCurrent(index)"
      >
        <view class="flex align-center flex-center"
          >{{ item.name }}
          <img
            v-if="index === 1"
            :src="
              !priceCtnShow
                ? '/static/images/freight/down.png'
                : '/static/images/freight/down-select.png'
            "
            class="w-24 h-12 ml-2"
          />
        </view>
        <view
          class="absolute priceModal"
          v-if="index === 1 && priceCtnShow && current === index"
        >
          <view class="priceModal-title relative"></view>
          <view class="priceModal-content bg-neutral br8">
            <view
              v-for="(ctn, ctnIndex) in ctnSortPrice"
              :key="ctnIndex"
              class="flex flex-column px-12 font26 font400 py-24 text-center"
              :class="[
                freightParams.sortField === ctn.value
                  ? 'dull-red'
                  : 'dull-grey',
              ]"
              style="border-bottom: #edeff2 1px solid"
              @click.stop="changeCtnType(ctn)"
            >
              {{ ctn.label }}
            </view>
          </view>
        </view>
      </view>
      <view class="ml-50 pl-30 icon">
        <img
          src="/static/images/freight/filter.png"
          class="w-36 h-36"
          @click="filterModalShow = true"
        />
      </view>
    </view>
    <FreightTable :data="freightTestData" @jumpEither="jumpEither" />
    <!-- 过滤条件 -->
    <u-popup
      v-model="filterModalShow"
      mode="top"
      :custom-style="{ backgroundColor: '#F5F7FA' }"
    >
      <view class="py-32 px-24 bg-neutral font-bold">
        <view class="mb-20">船公司</view>
        <view class="flex align-center flex-wrap font28 font400 grid-4-1fr">
          <view
            v-for="item in carrierLsit"
            :key="item.carrierCode"
            @click="changeFilter(item, 'carrier')"
            class="text-center w-166 py-18 bg-light-grey mr-15 br12 mb-10 relative"
            :class="[
              freightParams.carriers.split(',').includes(item.carrierCode)
                ? 'bg-light-red dull-red'
                : '',
            ]"
          >
            {{ item.carrierCode }}
            <img
              v-if="
                freightParams.carriers.split(',').includes(item.carrierCode)
              "
              src="/static/images/freight/selected.png"
              class="absolute right-0 bottom-0 w-52 h-52"
            />
          </view>
        </view>
        <view class="mt-30 mb-20">数据来源</view>
        <view class="flex align-center flex-wrap font28 font400">
          <view
            v-for="item in dataSource"
            :key="item.label"
            @click="changeFilter(item, 'dataSource')"
            class="text-center w-166 py-18 bg-light-grey ml-15 br12"
            :class="[
              freightParams.dataSource === item.value
                ? 'bg-light-red dull-red'
                : '',
            ]"
          >
            {{ item.label }}
          </view>
        </view>
        <view class="mt-30 mb-20">直达中转</view>
        <view class="flex align-center flex-wrap font28 font400">
          <view
            v-for="item in transitType"
            :key="item.label"
            @click="changeFilter(item, 'transitNum')"
            class="text-center w-166 py-18 bg-light-grey ml-15 br12"
            :class="[
              freightParams.transitNum === item.value
                ? 'bg-light-red dull-red'
                : '',
            ]"
          >
            {{ item.label }}
          </view>
        </view>
      </view>
      <view class="mt-20 bg-neutral p-20 flex align-center">
        <button class="filter-reset-btn" @click="reset">重置</button>
        <button class="filter-confirm-btn" @click="confirm">确定</button>
      </view>
    </u-popup>
  </view>
</template>

<style lang="scss" scoped>
.freight {
  height: 100%;

  .sort {
    width: 132rpx;
  }

  .icon {
    box-shadow: -12rpx 0rpx 12rpx -10rpx rgba(0, 0, 0, 0.08);
  }

  .priceModal {
    width: 120px;
    top: 30px;
    right: -22px;

    &-title {
      width: 18px;
      height: 13px;
      overflow: hidden;
      margin: 0 auto;
    }

    &-title::before {
      content: "";
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: #fff;
      transform-origin: left bottom;
      transform: rotate(45deg);
      box-shadow: 0px 2px 6px 0px rgba(51, 51, 51, 0.2);
    }

    &-content {
      box-shadow: 0px 2px 6px 0px rgba(51, 51, 51, 0.2);
    }
  }
}
</style>
