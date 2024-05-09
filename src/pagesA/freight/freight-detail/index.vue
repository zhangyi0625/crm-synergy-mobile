<script lang="ts" setup>
	import { formatTime } from "@/utils/time";
	import { onLoad } from "@dcloudio/uni-app";
	import { invalidateCache, useRequest } from "alova";
	import { useRouter } from "uni-mini-router";
	import { computed, ref } from "vue";
	import { getFreightDetail } from "@/services/api/freight";
	import CustomLoading from "@/components/Basic-loading/index.vue";
	import { ProductType, priceType } from "@/enums/freight";
	import { assign } from "lodash-es";
	import { isFullObject } from "@/utils";

	const router = useRouter();
	// URL
	const URL = import.meta.env.VITE_STATIC_URL;

	const loading = ref<boolean>(false);

	const cabinDetail = ref<any>({});

	const ctnType = ref<string[]>([])

	// 箱型价格
	const ctnTypeList = ref<any>([])


	const { data: freightDetail, send: isSend, onSuccess: onSuccess } : any = useRequest((id) => getFreightDetail(id), { immediate: false })
	onLoad((options : any) => {
		loading.value = true
		let info = JSON.parse(options.info)
		// 自有运价
		if (info.channel === 'QMS') {
			isSend(info.id)
			invalidateCache(getFreightDetail(info.id))
		} else {
			// 电商运价
			isSend(info.id)
			invalidateCache(getFreightDetail(info.id))
		}
	});

	// 运价详情成功回调
	onSuccess(() => {
		ctnType.value = []
		ctnTypeList.value = []
		for (let i in freightDetail.value) {
			if (i === priceType.COST || i === priceType.INNER || i === priceType.OUTER) {
				getCtnTypePrice(i, freightDetail.value[i], ctnTypeList.value)
				console.log(ctnType.value, 'freight', ctnTypeList.value);
			}
		}
		setTimeout(() => {
			cabinDetail.value = freightDetail.value
			loading.value = false
		}, 500)
	})

	const getCtnTypePrice = (type : string, price : any, arr : Array<any>) => {
		let prices = JSON.parse(price)
		if (prices) {
			let obj = assign({}, (isFullObject(prices.normal) ? prices.normal : {}), (isFullObject(prices.special) ? prices.special : {}))
			ctnType.value = Object.keys(obj);
			for (let i in obj) {
				let index = arr.findIndex((el : any) => el.ctnType === i)
				if (index === -1) {
					arr.push({
						ctnType: i,
						price: {
							[type]: obj[i]
						}
					})
				} else arr[index]['price'][type] = obj[i]
			}
		}
	}

	// 打开报价单
	const jumpQuotation = () => {
		router.push("/pagesA/freight/quotation/index?item=" + JSON.stringify(cabinDetail.value));
	};
	// 判断备注信息
	const hasRemark = computed(
		() =>
			cabinDetail.value.amsRemark ||
			cabinDetail.value.amsPrice ||
			cabinDetail.value.surchargeRemark ||
			cabinDetail.value.warnRemark ||
			cabinDetail.value.demurrageRemark ||
			cabinDetail.value.remark ||
			cabinDetail.value.innerRemark
	);

	const getRMBPrice = (info : any) => {
		let arr = []
		for (let i in info) {
			arr.push(info[i])
		}
		return arr.join('/')
	}

	// 判断改价格是否存在
	const isCtnPrice = (type : string) => {
		return ctnTypeList.value.filter((item : any) => item.price[type]).length > 0
	}
</script>

<template>
	<CustomLoading v-if="loading" iconType="annulus" position="fixed" :zIndex="9" :mask="false" :maskOpacity="1"
		:maskMini="false" :maskDark="true" color="#0396FF" />
	<view class="freight-detail relative" v-else>
		<view class="font28 font400 dull-grey content pb-20">
			<!-- 舱位详情 -->
			<view class="p-24 bg-neutral mx-20 mt-20 br12">
				<view class="flex align-center flex-between">
					<view class="flex align-center">
						<img v-if="cabinDetail.carrierCode"
							:src="URL + '/carrier-logo/' + cabinDetail.carrierCode + '.png'" class="w-68 h-68" />
						<view class="flex flex-column font24 ml-12">
							<view class="font-bold">{{ cabinDetail.carrierCode }}</view>
							<view class="font24 grey">最近更新：{{ cabinDetail.modified }}</view>
						</view>
					</view>
					<view class="flex align-center">
						<view v-if="cabinDetail.tag"
							:style="[cabinDetail.tag === '强推' ? 'background: #FF844A' : 'background: #FFB23F']"
							class="font22 font400 neutral px-12 py-2 br8">{{cabinDetail.tag}}
						</view>
						<view class="transitNum br8 dull-red font22 text-center ml-12">
							{{ cabinDetail.transit > 0 ? "中转" : "直达" }}
						</view>
					</view>
				</view>
				<view class="mt-40">
					<view class="flex align-center flex-between">
						<view class="flex align-center">
							<img src="/static/images/collect/por.png" class="mr-5 w-48 h-48" />
							<view class="font-bold">{{ cabinDetail.por?.cnName }}-{{
							  cabinDetail.por?.enName
							}}</view>
						</view>
						<view class="font24 grey" v-if="cabinDetail.validFrom && cabinDetail.validTo">
							运价有效期：{{ formatTime(cabinDetail.validFrom, "M-D") }} 至
							{{ formatTime(cabinDetail.validTo, "M-D") }}
						</view>
					</view>
					<view class="pl-30 pb-20 ml-20 font400 grey whitespace-nowrap"
						style="border-left: 1px solid #edeff2">
						<view>ETD：{{ formatTime(cabinDetail.etd, "M-D") || '-' }}</view>
						<view>码头：{{cabinDetail.terminal?.name || '-'}}</view>
						<view class="mt-40 p-24 bg-light-grey br12">
							<view class="flex flex-wrap">
								<view>航程：{{ cabinDetail.voyDays }}天</view>
								<view class="mx-40">航线：{{ cabinDetail.carrierRoute }}</view>
								<view>船期：{{ cabinDetail.cutOffDay ? cabinDetail.cutOffDay : ''}}
									/ {{cabinDetail.departureDay ? cabinDetail.departureDay : ''}}
								</view>
							</view>
							<view>船名航次：{{ cabinDetail.vesselName ? cabinDetail.vesselName : '' }}/{{
				            cabinDetail.voyNo ? cabinDetail.voyNo : ''
				          }}</view>
						</view>
					</view>
					<view class="flex flex-column" v-if="cabinDetail.transit > 0">
						<view class="flex align-center font28 dull-grey font500">
							<img src="/static/images/collect/transit.png" class="mr-5 w-48 h-48" />
							<view>中转港：{{cabinDetail.transitPorts}}</view>
						</view>
					</view>
					<view class="flex flex-column">
						<view class="flex align-center">
							<img src="/static/images/collect/fnd.png" class="mr-5 w-48 h-48" />
							<view class="font-bold">{{ cabinDetail.fnd?.cnName }}-{{
				            cabinDetail.fnd?.enName
				          }}</view>
						</view>
						<view class="ml-50 grey">ETA：{{ formatTime(cabinDetail.eta, "M-D") || '-' }}</view>
					</view>
				</view>
			</view>
			<!-- 价格详情 -->
			<view class="p-24 bg-neutral mx-20 mt-20 br12 relative">
				<view class="isSale absolute text-center left-0 top-0 font22"
					:class="[cabinDetail.isSale ? 'active' : 'light-grey']">
					{{ cabinDetail.isSale ? "有库存" : "无库存" }}
				</view>
				<view class="flex align-center flex-between font28 font500 light-grey pt-16 pb-24"
					style="border-bottom: 1px solid #F5F7FA;">
					<view>箱型</view>
					<view class="ml-50" v-if="isCtnPrice('costPrice')">成本价</view>
					<view class="ml-10" v-if="isCtnPrice('innerPrice')">内部价</view>
					<view v-if="isCtnPrice('outerPrice')">外部价</view>
				</view>
				<view v-for="(price,index) in ctnTypeList" :key="index" class="flex flex-column py-32 price-item"
					style="border-bottom: 1px solid #F5F7FA;">
					<view class="flex align-center flex-between">
						<view class="dull-grey">{{price.ctnType}}</view>
						<view class="dull-red" v-if="isCtnPrice('costPrice')">
							{{price.price.costPrice ? '$' + price.price.costPrice : '-'}}
						</view>
						<view class="dull-red" v-if="isCtnPrice('innerPrice')">
							{{price.price.innerPrice ? '$' + price.price.innerPrice : '-  '}}
						</view>
						<view class="dull-red" v-if="isCtnPrice('outerPrice')">
							{{price.price.outerPrice ? '$' + price.price.outerPrice : '-'}}
						</view>
					</view>
				</view>
			</view>
			<!-- 费用详情 -->
			<view class="p-24 bg-neutral mx-20 mt-20 br12">
				<view class="flex align-center dull-grey flex-between pb-30" style="border-bottom: 1px solid #f5f7fa">
					<view>费用详情</view>
					<view class="font24">{{ctnType.join('/')}}</view>
				</view>
				<view class="mt-28 font400 font24" v-if="cabinDetail.extraPriceInfo">
					<view class="font28 font-bold">海运附加费用</view>
					<view class="flex flex-column mt-28" v-for="(item,index) in cabinDetail.extraPriceInfo"
						:key="index">
						<view>{{item.name}}</view>
						<view class="flex align-center flex-between">
							<view class="light-grey">{{item.currency}}/{{item.qtyType === 'BL' ? '票' :'箱型'}}</view>
							<view>{{item.qtyType === 'BL' ? item.price : getRMBPrice(JSON.parse(item.ctnPrice))}}</view>
						</view>
					</view>
				</view>
				<view class="mt-28 font400 font24" v-if="cabinDetail.localPriceInfo">
					<view class="font28 font-bold">{{ cabinDetail.channel === ProductType.QMS ? '人民币费用' : '起运港费用'}}
					</view>
					<view class="flex flex-column mt-28" v-for="(item,index) in cabinDetail.localPriceInfo"
						:key="index">
						<view>{{item.name}}</view>
						<view class="flex align-center flex-between">
							<view class="light-grey">{{item.currency}}/{{item.qtyType === 'BL' ? '票' :'箱型'}}</view>
							<view>{{item.qtyType === 'BL' ? item.price : getRMBPrice(JSON.parse(item.ctnPrice))}}</view>
						</view>
					</view>
				</view>
			</view>
			<view class="p-24 bg-neutral flex flex-column mx-20 br12 mt-20" v-if="hasRemark">
				<view v-if="cabinDetail.amsPrice || cabinDetail.amsRemark" class="mb-40">
					AMS/ENS
					<view class="mt-10 light-grey">{{ cabinDetail.amsPrice }}&nbsp;&nbsp;{{cabinDetail.amsRemark}}
					</view>
				</view>
				<view v-if="cabinDetail.warnRemark" class="mb-40">
					特别提醒
					<view class="mt-10 light-grey">{{ cabinDetail.warnRemark }}</view>
				</view>
				<view v-if="cabinDetail.surchargeRemark" class="mb-40">
					附加费备注
					<view class="mt-10 light-grey">{{ cabinDetail.surchargeRemark }}</view>
				</view>
				<view v-if="cabinDetail.demurrageRemark" class="mb-40">
					免用箱备注
					<view class="mt-10 light-grey">{{ cabinDetail.demurrageRemark }}</view>
				</view>
				<view v-if="cabinDetail.remark" class="mb-40">
					其他备注
					<view class="mt-10 light-grey">{{ cabinDetail.remark }}</view>
				</view>
				<view v-if="!!cabinDetail.innerRemark">
					代理信息
					<view class="mt-10 light-grey">{{ cabinDetail.innerRemark }}</view>
				</view>
			</view>
		</view>
		<view class="quotation bg-neutral w-full">
			<button class="quotation-btn" @click="jumpQuotation">报价单</button>
		</view>
	</view>
</template>

<style lang="scss" scoped>
	.freight-detail {

		.content {
			height: calc(100vh - 70px);
			overflow-y: scroll;

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

			.price-item:nth-last-of-type(1) {
				padding: 32rpx 0 8rpx;
				border-bottom: none !important;
			}

		}

		.quotation {
			position: fixed;
			bottom: 0;
			padding: 20rpx 24rpx 40rpx;
		}
	}
</style>