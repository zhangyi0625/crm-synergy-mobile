<script lang="ts" setup>
	import { ref } from 'vue';
	import { onLoad } from '@dcloudio/uni-app';
	import { getNewFreight, postCreateTaskFreight } from "@/services/api/freight";
	import { useRequest, invalidateCache } from "alova";
	import { getDateStr } from "@/utils/time";
	import { basicCarriers } from '../config';
	import { ProductType } from "@/enums/freight";
	import { formatTime, formatUpdated } from "@/utils/time";
	import { useRouter } from "uni-mini-router";
	import CustomLoading from "@/components/Basic-loading/index.vue";

	const router = useRouter()

	const { data: taskData, send: createTask, onSuccess: createTaskSuccess, onError: createTaskError } : any = useRequest((params) => postCreateTaskFreight(params), { immediate: false })
	const { data: freightNewOptions, send: refreshFreight, onSuccess: refreshFreightSuccess, onError: refreshFreightError } : any = useRequest(id => getNewFreight(id), { immediate: false })


	onLoad((options : any) => {
		let { porInfo, fndInfo } = JSON.parse(options.info) || {};
		uni.setNavigationBarTitle({
			title:
				porInfo.split('-')[0] + "-" + fndInfo.split('-')[0]
		});
		// 页面初始化
		let params = {
			porCode: options.porCode,
			fndCode: options.fndCode,
			etdStart: getDateStr(3) + ' 00:00:00',
			etdEnd: '',
			carrierList: basicCarriers
		}

		createTask(params)
	})

	// 运价数据
	const freightNewData = ref<any>([])

	const isSearch = ref<boolean>(false)

	const taskID = ref<string>('');
	// 创建实时运价任务成功回调
	createTaskSuccess(() => {
		if (taskData.value) taskID.value = taskData.value
		taskData.value && refreshFreight(taskData.value)
	})
	// 创建实时运价任务失败回调
	createTaskError(() => {
		setTimeout(() => {
			freightNewData.value.map((item : any) => {
				item.searchstate = ''
			})
		}, 300)
	})
	const URL = import.meta.env.VITE_STATIC_URL;

	const timer = ref<any>(null);
	// 轮训接口
	refreshFreightSuccess(() => {
		isSearch.value = true
		if (timer.value) {
			clearInterval(timer.value);
			timer.value = null;
		}
		timer.value = setInterval(() => {
			if (freightNewOptions.value.taskStatus === 'SUCCESS') {
				clearInterval(timer.value);
				isSearch.value = false
				if (freightNewOptions.value.productList && freightNewOptions.value.productList.length > 0) {
					changeData(freightNewOptions.value.productList, 'sort')
				} else {
					freightNewData.value.map((item : any) => {
						item.searchstate = ''
					})
					// Toast('实时运价查询完成！')
				}
			} else if (freightNewOptions.value.taskStatus === 'PENDING') {
				if (freightNewOptions.value.productList && freightNewOptions.value.productList.length > 0) {
					changeData(freightNewOptions.value.productList)
				}
				refreshFreight(taskID.value)
				invalidateCache(refreshFreight(taskID.value))
			} else clearInterval(timer.value);
		}, 3000);
	})
	refreshFreightError(() => {
		clearInterval(timer.value);
	})

	// 组合数据结构
	const changeData = (data : Array<any>, type ?: string) => {
		let arr : any = basicCarriers.map((item : any) => {
			return {
				carrierCode: item,
				products: data.filter((el : any) => el.carrierCode === item),
			};
		});
		freightNewData.value = type ? arr.sort((a : any, b : any) => b.products.length - a.products.length) : arr
	}


	// 价格展示判断
	const getPrice = (price : string) => {
		let innerPrice = JSON.parse(price);
		let ctnType = ['20GP', '40GP', '40HQ']
		let obj : any = {}
		if (innerPrice) {
			for (let i in ctnType) {
				if (innerPrice['normal']) obj[ctnType[i] as any] = innerPrice['normal'][ctnType[i] as any] || ''
			}
			for (let i in innerPrice['special']) {
				if (ctnType.includes(i)) obj[i] = innerPrice['special'][i]
			}
		}
		return obj
	}

	const openShrink = (carrierCode : string) => {
		freightNewData.value.map((el : any) => {
			if (el.carrierCode === carrierCode && !el.searchstate) el.isShrink = !el.isShrink ? true : false
		})
	}

	const jump = (id : string) => {
		router.push(
			"/pagesA/freight/freight-detail/index?info=" + id
		);
	}

	// 判断船公司数据是否为空
	const isEmpty = (arr : Array<any>) => {
		return arr.filter((el : any) => el.products.length >= 0).length >= 0
	}
</script>

<template>
	<CustomLoading v-if="!isEmpty(freightNewData)" iconType="annulus" position="fixed" :zIndex="9" :mask="false"
		:maskOpacity="1" :maskMini="false" :maskDark="true" color="#0396FF" />
	<!-- 	<view class="notice font28 font500 flex py-12 align-center flex-center">
		更多商品正在查询中，请耐心等待···
	</view> -->
	<view class="actual-freight" v-else>
		<view v-if="isSearch" class="notice font28 font500 flex py-12 align-center flex-center">
			更多商品正在查询中，请耐心等待···
		</view>
		<view v-for="(item, index) in freightNewData" :key="index" class="mt-20">
			<view class="py-18 px-24 bg-neutral flex align-center flex-between"
				@click.stop="openShrink(item.carrierCode)" style="border-bottom: 1px solid #F5F7FA;"
				v-if="item.carrierCode !== ProductType.QMS">
				<view class="flex align-center">
					<img :src="URL + '/carrier-logo/' + item.carrierCode + '.png'" class="w-60 h-60" />
					<view class="font36 font-bold ml-12">
						{{item.carrierCode === ProductType.QMS ? '线下运价' : item.carrierCode}}
					</view>
					<view class="ml-15 px-8 py-6 dull-blue bg-light-blue font22 br4">官网原价</view>
				</view>
				<view v-if="!item.isShrink" class="flex align-center flex1 flex-end light-grey update"
					:style="[item.isShrink ? 'opacity:0' : 'z-index:1']" @click.stop="openShrink(item.carrierCode)">
					<view v-if="item.products[0]?.modified && !item.searchstate">
						最近更新：{{ formatUpdated(item.products[0]?.modified, 10) }}
					</view>
				</view>
				<view class="shrink" :style="[item.isShrink ? 'opacity:1' : '']" v-else
					@click="openShrink(item.carrierCode)">
					<img src="/static/images/icon/down.png" class="w-24 h-12" />
				</view>
			</view>
			<view v-if="item.products.length > 0 && !item.isShrink" v-for="(el,elIndex) in item.products" :key="elIndex"
				style="border-bottom: 1px solid #F5F7FA" class="p-24 bg-neutral relative font28 font400 grey"
				@click.stop="jump(el.id)">
				<img v-if="el.channel !== ProductType.QMS" :src="'/static/images/freight/' + el.channel +
			'.png'" class="absolute left-0 top-0 w-68 h-68" />
				<view class="flex align-center flex-between" :class="[item.products.length > 0 ? 'mt-20' : '']">
					<view class="flex align-center">
						<img :src="URL + '/carrier-logo/' + el.carrierCode + '.png'" class="w-68 h-68" />
						<view class="flex flex-column font24 ml-24">
							<view v-if="el.channel === ProductType.QMS || el.channel === ProductType.SPOT">
								最近更新：{{ formatUpdated(el.modified, 10) }}
							</view>
							<view class="flex align-center">
								<view>{{el.carrierCode}}</view>
								<view class="ml-20" v-if="el.vesselName || el.voyNo">{{ el.vesselName }}/{{ el.voyNo }}
								</view>
							</view>
						</view>
					</view>
					<view class="flex align-center">
						<img src="/static/images/freight/boat.png" class="w-36 h-36" />
						<view class="dull-red ml-2" style="white-space: nowrap;">{{ el.carrierRoute }}</view>
					</view>
				</view>
				<view class="mt-20 flex align-center font-bold font32 dull-grey" v-if="el.etd && el.eta">
					<view>ETD {{ formatTime(el.etd, "M-D") }}</view>
					<img src="/static/images/freight/arrive.png" class="w-68 h-20 mx-12" />
					<view>ETA {{ formatTime(el.eta, "M-D") }}</view>
				</view>
				<view class="mt-10 flex align-center flex-between dull-grey">
					<view class="flex align-center">
						<view class="mr-20">航程：{{ el.voyDays }}天</view>
						<view class="px-20 schedule">截/开：{{ el.cutOffDay ? el.cutOffDay : '-'}} /
							{{el.departureDay ? el.departureDay : '-'}}
						</view>
						<view class="ml-20">{{ el.transit > 0 ? "中转" : "直达" }}</view>
					</view>
					<view v-if="el.tag" :style="[el.tag === '强推' ? 'background: #FF844A' : 'background: #FFB23F']"
						class="font22 font400 neutral px-12 py-2 br8">{{el.tag}}
					</view>
				</view>
				<view class="flex align-center" :class="[el.channel !== ProductType.QMS ? 'mt-24' : 'my-24']">
					<view class="flex flex-column" style="width: 200rpx">
						<view class="light-grey font24 font-bold">库存</view>
						<view class="mt-5 font500 dull-red">{{ el.isSale ? "有" : "无"}}</view>
					</view>
					<view class="flex align-center w-full flex-between">
						<view v-for="(price, priceIndex) in getPrice(el.innerPrice ? el.innerPrice : el.outerPrice)"
							:key="priceIndex">
							<p class="light-grey font24 font-bold">{{ priceIndex }}</p>
							<p class="mt-5 font500 dull-red">{{ price ? '$' + price : '-' }}</p>
						</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<style lang="scss" scoped>
	.actual-freight {
		.notice {
			background: #FFFAE7;
			color: #FA8C16;
		}

	}
</style>