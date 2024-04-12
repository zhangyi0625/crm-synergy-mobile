<script lang="ts" setup>
import {
  getAreaList,
  getLocationList,
  getFndPortList,
} from "@/services/api/freight";
import { onLoad } from "@dcloudio/uni-app";
import { useRequest, invalidateCache } from "alova";
import { useRouter } from "uni-mini-router";
import { reactive, ref } from "vue";
import CustomLoading from "@/components/Basic-loading/index.vue";

const type = ref<string>("");
const placeholder = ref<string>("");

const loading = ref<boolean>(false);

// scrollTop
const scrollTop = ref<number>(0);
// 查询条件
const searchParams = reactive<locationPort>({
  routeId: "",
  isPopularity: "",
  keyword: "",
});
onLoad((options: any) => {
  console.log(options, "options");
  type.value = options.type;
  // searchParams.tag = options.type
  placeholder.value = options.type == "POR" ? "请输入起运港" : "请输入目的港";
  options.type === "POR" && loadPorList();
  options.type === "FND" && loadAreaOptions();
  searchParams.isPopularity = options.type === "FND" ? 1 : "";
  uni.setNavigationBarTitle({
    title: options.type == "POR" ? "选择起运港" : "选择目的港",
  });
  invalidateCache(getLocationList(searchParams));
});
// 港口数据
const { data: porList, send: loadPorList }: any = useRequest(
  getLocationList(searchParams),
  { immediate: false }
);
const {
  data: fndList,
  send: loadFndList,
  onSuccess: changeFndData,
}: any = useRequest(getFndPortList(searchParams), { immediate: false });
// 航线列表
const {
  data: areaOptions,
  send: loadAreaOptions,
  onSuccess: loadAreaList,
}: any = useRequest(getAreaList(), { immediate: false });
loadAreaList(() => {
  loading.value = true;
  // 这种赋值方式为了解决和首页数据冲突带来的缓存问题
  areaOptions.value = [
    {
      code: "",
      name: "热门港口",
      id: "",
    },
    ...areaOptions.value.filter((el: any) => !el.parentId),
  ];
  loadFndList();
});
// 目的港格式
const fndOptions = ref<any>([]);
changeFndData(() => {
  let newArr: any = [];
  let arr: any = [];
  if (!searchParams.routeId) {
    newArr = [
      {
        areaInfoName: "热门港口",
        portInfo: fndList.value,
      },
    ];
  } else {
    fndList.value.map((item: any) => {
      let i = arr.indexOf(item.areaCode);
      if (i === -1) {
        arr.push(item.areaCode);
        newArr.push({
          areaInfoName: item.areaName,
          portInfo: [item],
        });
      } else newArr[i].portInfo.push(item);
    });
  }
  fndOptions.value = newArr;
  loading.value = false;
  // 置顶
  scrollTop.value = 0;
});
// 检索
const onSearch = () => {
  // 只根据keyword查询结果跟起运港数据格式一样
  type.value = "POR";
  searchParams.isPopularity = "";
  searchParams.routeId = "";
  loadPorList();
};
// 取消
const cancel = () => {
  searchParams.keyword = "";
};
const router = useRouter();
// 点击港口
const onClick = (item: any) => {
  let pages: any = getCurrentPages();
  let prevPage = pages[pages.length - 2];
  // prevPage.$vm['searchForm.porInfo'] = item.localName + '-' + item.name
  // prevPage.$vm['searchForm.fndInfo'] = item.localName + '-' + item.name
  // item.porInfo = item.localName + '-' + item.name
  placeholder.value === "请输入起运港" &&
    Reflect.set(item, "porInfo", item.cnName + "-" + item.enName);
  placeholder.value === "请输入目的港" &&
    Reflect.set(item, "fndInfo", item.cnName + "-" + item.enName);
  prevPage.$vm["searchForm"] = item;
  // // 返回上级页面的多级参数
  uni.$emit("update", item);
  uni.navigateBack({
    delta: 1,
  });
  console.log(item, prevPage, "////", prevPage.$vm._data, prevPage.update);
};

const current = ref<string>("");
// 航线切换回调
const changeArea = (id: string) => {
  current.value = id;
  searchParams.routeId = id;
  searchParams.isPopularity = id ? "" : "1";
  loadFndList();
};
</script>

<template>
  <view>
    <CustomLoading
      v-if="loading"
      iconType="annulus"
      position="fixed"
      :zIndex="9"
      :mask="false"
      :maskOpacity="1"
      :maskMini="false"
      :maskDark="true"
      color="#0396FF"
    />
    <view class="select-port" v-else>
      <view class="bg-neutral py-12 px-20">
        <u-search
          :placeholder="placeholder"
          shape="square"
          v-model="searchParams.keyword"
          action-text="取消"
          @change="onSearch"
          bg-color="#F5F7FA"
          @custom="cancel"
        />
      </view>
      <view class="mt-20 bg-neutral" v-if="type === 'POR'">
        <view
          v-for="(item, index) in porList"
          :key="index"
          class="bg-neutral px-32 py-30 font26 font400 dull-grey"
          style="border: 1px solid #f5f7fa"
          @click="onClick(item)"
        >
          {{ item.cnName }} - {{ item.enName }}
        </view>
      </view>
      <view
        v-else-if="type === 'FND'"
        class="content flex mt-20 font28 font400"
      >
        <view class="px-50 bg-neutral flex flex-column align-start">
          <view
            v-for="(item, index) in areaOptions"
            :key="index"
            @click="changeArea(item.id)"
            class="flex flex-column light-grey text-center font28 font400 light-grey relative mt-50"
            :class="[
              searchParams.routeId === item.id ? 'dull-red font-bold' : '',
            ]"
          >
            <view
              class="active-bar absolute"
              :class="[searchParams.routeId === item.id ? 'bg-dull-red' : '']"
            >
            </view>
            {{ item.name }}
          </view>
        </view>
        <view class="flex1 ml-10 font28 font-bold dull-grey bg-neutral">
          <scroll-view
            :scroll-y="true"
            style="height: 100%"
            :scroll-top="scrollTop"
          >
            <view
              v-for="(item, index) in fndOptions"
              :key="index"
              class="flex flex-column px-32 py-40"
            >
              <view class="mb-28">{{ item.areaInfoName }}</view>
              <view
                v-for="(child, childIndex) in item.portInfo"
                :key="childIndex"
                class="flex flex-column"
                @click="onClick(child)"
              >
                <view class="font26 font400 mt-28"
                  >{{ child.cnName }}-{{ child.enName }}</view
                >
                <view
                  class="font22 light-grey font400 pb-28"
                  style="border-bottom: 1px solid #edeff2"
                >
                  {{ child.countryLocalName }}-{{ child.countryName }}
                </view>
              </view>
            </view>
          </scroll-view>
        </view>
      </view>
    </view>
  </view>
</template>

<style lang="scss" scoped>
.select-port {
  .content {
    max-height: calc(100vh - 50px);
    overflow: hidden;

    .active-bar {
      width: 4rpx;
      height: 32rpx;
      top: 2rpx;
      left: -8px;
    }
  }
}
</style>
