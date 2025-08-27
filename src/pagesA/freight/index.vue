<script lang="ts" setup>
	import { getFreightCtnType, getCarrierList, getFreightByShare, getFreightOptions, getNewFreight, postCreateTaskFreight, postFreightByShare } from "@/services/api/freight";
	import { onLoad, onShareAppMessage, onShareTimeline } from "@dcloudio/uni-app";
	import { invalidateCache, useRequest } from "alova";
	import { reactive, ref, watchEffect } from "vue";
	import {
		sortList,
		ctnSortPrice,
		dataSource,
		transitType,
		basicCarriers
	} from "./config";
	import FreightTable from "./component/freight-table/index";
	import { useRouter } from "uni-mini-router";
	import CustomLoading from "@/components/Basic-loading/index.vue";
	// import { Toast } from "@/utils/uniapi/prompt";
	import { ProductType } from "@/enums/freight";
	import { getDateStr } from "@/utils/time";

	// 查询条件 && 筛选条件
	const freightParams = reactive<freightSearchParams>({
		por: '',
		fnd: '',
		carrier: '',
		transit: '',
		channel: '',
		status: 1,
		tagId: '',
		routeId: ''
	});


	const loading = ref<boolean>(false)

	const router = useRouter()

	const locationInfo = ref<any>({});

	const current = ref<number>(0);

	const shareMsg = ref({} as any)

	const shareData = reactive({} as any)

	const Key = ref<string>('')

	uni.showShareMenu()
	onShareAppMessage(() => {
		let info = {
			freightParam: freightParams,
			shareMsg: shareMsg.value,
			freightData: freightNewData.value,
			type: '分享'
		}
		postShare(info)
		return new Promise((resolve, reject) => {
			setTimeout(() => {
				resolve(
					{
						title: '运价列表',
						path: `/pagesA/freight/index?key=${shareKey.value}`
					})
			}, 500)
		})
	})

	onShareTimeline(() => {
		let info = {
			freightParam: freightParams,
			shareMsg: shareMsg.value,
			freightData: freightNewData.value,
			type: '分享'
		}
		postShare(info)
		return new Promise((resolve, reject) => {
			setTimeout(() => {
				resolve(
					{
						title: '运价列表',
						path: `/pagesA/freight/index?key=${shareKey.value}`
					})
			}, 500)
		})
	})

	// 发送
	const { data: shareKey, send: postShare, onSuccess: success } : any = useRequest((info) => (postFreightByShare({ data: info })), { immediate: false })
	success(() => {
		// return {
		// 	title: '运价列表',
		// 	path: `/pagesA/freight/index?key=${shareKey.value}`
		// }
	})
	//回显
	const { data: showData, send: getShare, onSuccess: getShareSuccess } : any = useRequest((key) => (getFreightByShare(key)), { immediate: false })
	getShareSuccess(async () => {
		let info : any = JSON.parse(showData.value)
		console.log(info, showData.value);
		await init(info)
	})


	const init = (info : any) => {
		let { freightParam,
			shareMsg,
			freightData,
			type } = info
		Object.assign(freightParams, freightParam)
		shareMsg.value = shareMsg
		freightNewData.value = freightData
		locationInfo.value = shareMsg
		let { porInfo, fndInfo } = locationInfo.value
		console.log(porInfo, fndInfo);
		uni.setNavigationBarTitle({
			title:
				(porInfo ? porInfo.split('-')[0] : locationInfo.value.porCnlName) + "-" + (fndInfo ? fndInfo.split('-')[0] : locationInfo.value.fndCnlName),
		});
		console.log(freightNewData.value, freightParams, locationInfo.value);
		loading.value = false
	}

	// shareSuccess(() => {
	// 	console.log('ssss')
	// 	// return {
	// 	// 	title: '运价列表',
	// 	// 	path: `/pagesA/freight/index?key=${shareKey}`
	// 	// }
	// })


	onLoad((options : any) => {
		loading.value = true
		// 从分享进来时读取缓存数据
		console.log(options, 'options');
		if (!!options.key) {
			Key.value = options.key
			getShare(options.key)
			return
		}
		shareMsg.value = options
		// 按航线
		if (options.TABS) {
			TABS.value = JSON.parse(options.TABS)
			freightParams.routeId = options.routeId ? options.routeId : '';
			freightParams.tagId = options.routeId ? '' : TABS.value[0].value;
			tabIndex.value = freightParams.routeId ? TABS.value.findIndex((el : any) => el.id === freightParams.routeId) : 0;
			locationInfo.value = null;
			uni.setNavigationBarTitle({
				title: options.routeName
			})
			freightParams.channel = "QMS"
			isSend()
			invalidateCache(getFreightOptions(freightParams))
			loading.value = false;
		} else {
			// 按起运港、目的港
			locationInfo.value = options || shareMsg.value;
			let { porInfo, fndInfo } = locationInfo.value
			uni.setNavigationBarTitle({
				title:
					(porInfo ? porInfo.split('-')[0] : locationInfo.value.porCnlName) + "-" + (fndInfo ? fndInfo.split('-')[0] : locationInfo.value.fndCnlName),
			});
			freightParams.por = locationInfo.value.porCode
			freightParams.fnd = locationInfo.value.fndCode
		}
		freightParams.por && freightParams.fnd && isSend()
		freightParams.por && freightParams.fnd && invalidateCache(getFreightOptions(freightParams))
		// ctnSortPrice = []
		// setTimeout(() => {
		customCtnType.value.results && customCtnType.value.results.map((item : any) => {
			if (item.isDefault) {
				ctnSortPrices.value.push({
					label: item.code,
					value: 'CTN' + item.code
				})
			}
		})
		console.log(ctnSortPrices.value, customCtnType.value);
		// }, 500)
	});
	const ctnSortPrices = ref([] as any)

	// 船公司数据
	const { data: carrierList } : any = useRequest(getCarrierList(), {
		initialData: [],
	});

	const { data: customCtnType } : any = useRequest(getFreightCtnType(), {
		initialData: [],
	});

	// 运价数据
	const freightNewData = ref<any>([])
	const { data: freightData, send: isSend, onSuccess } : any = useRequest((getFreightOptions(freightParams)), { immediate: false })

	// 筛选切换回调
	const priceCtnShow = ref<boolean>(false);
	const changeCurrent = (index : number) => {
		current.value = index;
		if (index === 1) priceCtnShow.value = true;
		else {
			(sortList as any)[1]["name"] = "最便宜";
			freightParams.sort = (sortList as any)[current.value]["value"];
		}
		loading.value = true
		isSend()
	};

	onSuccess(() => {
		let arr : any = basicCarriers.map((item : any) => {
			return {
				carrierCode: item,
				products: [],
			};
		});
		// 重组数据结构 && 排序
		for (let i in freightData.value) {
			arr.forEach((item : any) => {
				if (item.carrierCode === freightData.value[i].carrierCode && freightData.value[i].channel !== ProductType.QMS && freightData.value[i].channel !== ProductType.SPOT) item.products.push(freightData.value[i]);
			});
		}
		arr[0].products = freightData.value.filter((el : any) => el.channel === ProductType.QMS || el.channel === ProductType.SPOT)
		freightNewData.value = freightParams.sort ? freightData.value : arr
		if (!freightParams.sort) {
			freightNewData.value = freightNewData.value.sort((a : any, b : any) => a.carrierCode !== ProductType.QMS && b.carrierCode !== ProductType.QMS && b.products.length - a.products.length)
		}
		loading.value = false
	})

	// 选择箱型回调
	const changeCtnType = (ctn : any) => {
		freightParams.sort = ctn.value;
		priceCtnShow.value = false;
		(sortList as any)[current.value]["name"] = ctn.label;
		loading.value = true
		isSend()
	};

	// 过滤popup
	const filterModalShow = ref<boolean>(false);
	const changeFilter = (item : any, type : string) => {
		if (type === "carrier") {
			let arr = freightParams.carrier ? freightParams.carrier.split(",") : [];
			freightParams.carrier =
				arr.length > 0 && arr.includes(item.code)
					? arr.filter((el : string) => el !== item.code).join(",")
					: arr.concat([item.code]).join(",");
		} else
			freightParams[type] = freightParams[type] === item.value ? "" : item.value;
	};
	const reset = () => {
		freightParams.carrier = '';
		freightParams.channel = '';
		freightParams.transit = '';
		filterModalShow.value = false;
		isSend()
	};
	const confirm = () => {
		filterModalShow.value = false;
		isSend()
	};

	const jumpEither = (item : any, type ?: string) => {
		if (type) {
			console.log(item, "jump", type);
			// Toast('在舱实时运价还未开放！')
			router.push(`/pagesA/freight/actual/index?porCode=${freightParams.por}&fndCode=${freightParams.fnd}&info=${JSON.stringify(locationInfo.value)}`)
		} else router.push(
			"/pagesA/freight/freight-detail/index?info=" + item.id
		);
	};

	const tabIndex = ref<number>(0)
	const TABS = ref<any>([])
	const tabChange = (val : number) => {
		current.value = val
		if (current.value === 0 || current.value === 1) {
			freightParams.routeId = ''
			freightParams.tagId = TABS.value[current.value].value
		} else {
			freightParams.tagId = ''
			freightParams.routeId = TABS.value[current.value].id
		}
		// loading.value = true
		isSend()
	}

	// 判断船公司数据是否为空
	const isEmpty = (arr : Array<any>) => {
		return arr.filter((el : any) => (freightParams.sort ? el : el.products.length >= 0)).length >= 0
	}

	const { data: taskData, send: createTask, onSuccess: createTaskSuccess, onError: createTaskError } : any = useRequest((params) => postCreateTaskFreight(params), { immediate: false })
	const { data: freightNewOptions, send: refreshFreight, onSuccess: refreshFreightSuccess, onError: refreshFreightError } : any = useRequest(id => getNewFreight(id), { immediate: false })

	// 刷新船公司数据(ZDP)
	const carrierRefresh = (carrierCode : string) => {
		freightNewData.value.map((item : any) => {
			if (item.carrierCode === carrierCode) item.searchstate = '正在更新....'
		})
		let params = {
			carrierList: [carrierCode],
			porCode: freightParams.por,
			fndCode: freightParams.fnd,
			etdStart: getDateStr(3) + ' 00:00:00',
			etdEnd: ''
		}
		createTask(params)
	}

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
	const timer = ref<any>(null);
	// 轮训接口
	refreshFreightSuccess(() => {
		if (timer.value) {
			clearInterval(timer.value);
			timer.value = null;
		}
		timer.value = setInterval(() => {
			if (freightNewOptions.value.taskStatus === 'SUCCESS') {
				clearInterval(timer.value);
				if (freightNewOptions.value.productList && freightNewOptions.value.productList.length > 0) {
					let carrierCode = freightNewOptions.value.productList[0].carrierCode;
					freightNewData.value.map((el : any) => {
						if (el.carrierCode === carrierCode) {
							el.products = freightNewOptions.value.productList;
							el.searchstate = ''
						}
					})
				} else {
					freightNewData.value.map((item : any) => {
						item.searchstate = ''
					})
					// Toast('实时运价查询完成！')
				}
			} else if (freightNewOptions.value.taskStatus === 'PENDING') {
				if (freightNewOptions.value.productList && freightNewOptions.value.productList.length > 0) {
					let carrierCode = freightNewOptions.value.productList[0].carrierCode;
					freightNewData.value.map((el : any) => {
						if (el.carrierCode === carrierCode) el.products = freightNewOptions.value.productList
					})
				}
				refreshFreight(taskID.value)
				invalidateCache(refreshFreight(taskID.value))
			} else clearInterval(timer.value);
		}, 2000);
	})
	refreshFreightError(() => {
		clearInterval(timer.value);
	})


	const openShrink = (carrierCode : string) => {
		freightNewData.value.map((el : any) => {
			if (el.carrierCode === carrierCode && !el.searchstate) el.isShrink = !el.isShrink ? true : false
		})
	}
</script>

<template>
	<CustomLoading v-if="loading" iconType="annulus" position="fixed" :zIndex="9" :mask="false" :maskOpacity="1"
		:maskMini="false" :maskDark="true" color="#0396FF" />
	<view v-else class="freight">
		<view class="py-12 px-20 bg-neutral flex align-center" v-if="locationInfo && Object.keys(locationInfo)">
			<view v-for="(item, index) in sortList" :key="index" class="sort br8 py-8 font26 ml-12 relative" :class="[
		      current === index
		        ? 'bg-light-red dull-red font-bolds'
		        : 'bg-light-grey grey',
		    ]" @click.stop="changeCurrent(index)">
				<view class="flex align-center flex-center">{{ item.name }}
					<img v-if="index === 1" :src="
		          !priceCtnShow
		            ? '/static/images/freight/down.png'
		            : '/static/images/freight/down-select.png'
		        " class="w-24 h-12 ml-2" />
				</view>
				<view class="absolute priceModal" v-if="index === 1 && priceCtnShow && current === index">
					<view class="priceModal-title relative"></view>
					<view class="priceModal-content bg-neutral br8">
						<view v-for="(ctn, ctnIndex) in ctnSortPrices" :key="ctnIndex"
							class="flex flex-column px-12 font26 font400 py-24 text-center" :class="[
		            freightParams.sort === ctn.value
		              ? 'dull-red'
		              : 'dull-grey',
		          ]" style="border-bottom: #edeff2 1px solid" @click.stop="changeCtnType(ctn)">
							{{ ctn.label }}
						</view>
					</view>
				</view>
			</view>
			<view class="ml-50 pl-30 icon">
				<img src="/static/images/freight/filter.png" class="w-36 h-36" @click="filterModalShow = true" />
			</view>
		</view>

		<view v-else>
			<u-tabs :list="TABS" v-model="tabIndex" active-color="#EE2233" @change="tabChange"></u-tabs>
		</view>
		<FreightTable v-if="isEmpty(freightNewData)" :data="freightNewData" :isSort="freightParams.sort"
			:isRoute="!locationInfo" :customCtnType="customCtnType" @refresh="carrierRefresh" @jumpEither="jumpEither"
			@openShrink="openShrink" />
		<view v-else style="margin: 250px auto;">
			<u-empty mode="data"></u-empty>
		</view>s
		<!-- 过滤条件 -->
		<u-popup v-model="filterModalShow" mode="top" :custom-style="{ backgroundColor: '#F5F7FA' }">
			<view class="py-32 px-24 bg-neutral font-bold" style="overflow-y: scroll;max-height: 300px;">
				<view class="mb-20">船公司</view>
				<view class="flex align-center flex-wrap font28 font400 grid-4-1fr">
					<view v-for="item in carrierList" :key="item.code" @click="changeFilter(item, 'carrier')"
						class="text-center w-166 py-18 bg-light-grey mr-15 br12 mb-10 relative" :class="[
		          freightParams.carrier.split(',').includes(item.code)
		            ? 'bg-light-red dull-red'
		            : '',
		        ]">
						{{ item.code }}
						<img v-if="
		            freightParams.carrier.split(',').includes(item.code)
		          " src="/static/images/freight/selected.png" class="absolute right-0 bottom-0 w-52 h-52" />
					</view>
				</view>
				<view class="mt-30 mb-20">数据来源</view>
				<view class="flex align-center flex-wrap font28 font400">
					<view v-for="item in dataSource" :key="item.label" @click="changeFilter(item, 'channel')"
						class="text-center w-166 py-18 bg-light-grey ml-15 br12" :class="[
		          freightParams.channel === item.value
		            ? 'bg-light-red dull-red'
		            : '',
		        ]">
						{{ item.label }}
					</view>
				</view>
				<view class="mt-30 mb-20">直达中转</view>
				<view class="flex align-center flex-wrap font28 font400">
					<view v-for="item in transitType" :key="item.label" @click="changeFilter(item, 'transit')"
						class="text-center w-166 py-18 bg-light-grey ml-15 br12" :class="[
		          freightParams.transit === item.value
		            ? 'bg-light-red dull-red'
		            : '',
		        ]">
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
	.auto {
		width: 100%;
		margin: auto;
		height: 100vh;
	}

	.freight {
		height: 100vh;

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
			z-index: 9999;

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