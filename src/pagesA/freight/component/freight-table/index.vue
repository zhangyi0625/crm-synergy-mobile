<script lang="ts" setup>
	import { ProductType } from "@/enums/freight";
	import { formatTime, formatUpdated } from "@/utils/time";

	const emit = defineEmits(["jumpEither", "refresh"]);
	interface PropsType {
		data : Array<any>;
		isSort : string;
		isRoute : boolean
	}
	const props = defineProps<PropsType>();

	const URL = import.meta.env.VITE_STATIC_URL;
	console.log(props.isRoute, props.data);
	// 跳转
	const jump = (item : any, type ?: string) => {
		emit("jumpEither", item, type);
	};

	// 价格展示判断
	const getPrice = (price : string) => {
		let innerPrice = JSON.parse(price);
		let ctnType = ['20GP', '40GP', '40HQ']
		let obj : any = {}
		if (innerPrice) {
			for (let i in innerPrice['normal']) {
				if (ctnType.includes(i)) obj[i] = innerPrice['normal'][i]
			}
			for (let i in innerPrice['special']) {
				if (ctnType.includes(i)) obj[i] = innerPrice['special'][i]
			}
		}
		return obj
	}
	const refresh = (carrierCode : string) => {
		emit('refresh', carrierCode)
	}
</script>

<template>
	<view class="freight-table mt-10">
		<view v-if="isSort" v-for="(item, index) in props.data" :key="index"
			class="p-24 bg-neutral mb-10 relative font28 font400 grey" @click.stop="jump(item)">
			<img v-if="item.channel !== ProductType.QMS" src="/static/images/freight/commercy.png"
				class="absolute left-0 top-0 w-68 h-68" />
			<view class="flex align-center flex-between">
				<view class="flex align-center">
					<img :src="URL + '/carrier-logo/' + item.carrierCode + '.png'" class="w-68 h-68" />
					<view class="flex flex-column font24 ml-24">
						<view v-if="item.channel === ProductType.QMS">最近更新：{{ formatUpdated(item.modified, 10) }}
						</view>
						<view class="flex align-center">
							<view>{{item.carrierCode}}</view>
							<view class="ml-5" v-if="item.vesselName || item.voyNo">
								{{ item.vesselName }}/{{ item.voyNo }}
							</view>
						</view>
					</view>
				</view>
				<view class="flex align-center">
					<img src="/static/images/freight/boat.png" class="w-36 h-36" />
					<view class="dull-red ml-2" style="white-space: nowrap;">{{ item.carrierRoute }}</view>
				</view>
			</view>
			<view class="mt-20 flex align-center font-bold font32 dull-grey" v-if="item.etd && item.eta">
				<view>ETD {{ formatTime(item.etd, "M-D") }}</view>
				<img src="/static/images/freight/arrive.png" class="w-68 h-20 mx-12" />
				<view>ETA {{ formatTime(item.eta, "M-D") }}</view>
			</view>
			<view class="mt-10 flex align-center dull-grey">
				<view class="mr-20">航程：{{ item.voyDays }}天</view>
				<view class="px-20 schedule">船期：{{ item.cutOffDay ? item.cutOffDay + '截' : '-'}}
					{{item.departureDay ? item.departureDay + '开' : '-'}}
				</view>
				<view class="ml-20">{{ item.transit > 0 ? "中转" : "直达" }}</view>
			</view>
			<view class="flex align-center" :class="[item.channel !== ProductType.QMS ? 'mt-24' : 'my-24']">
				<view class="flex flex-column" style="width: 200rpx">
					<view class="light-grey font24 font-bold">库存</view>
					<view class="mt-5 font500 dull-red">{{ item.isSale ? "有" : "无"}}</view>
				</view>
				<view class="flex align-center w-full flex-between">
					<view v-for="(price, priceIndex) in getPrice(item.innerPrice ? item.innerPrice : item.outerPrice)"
						:key="priceIndex">
						<p class="light-grey font24 font-bold">{{ priceIndex }}</p>
						<p class="mt-5 font500 dull-red">{{ price ? '$' + price : '-' }}</p>
					</view>
				</view>
			</view>
		</view>
		<view v-else v-for="(item, index) in props.data" :key="index" class="mt-20">
			<view class="py-18 px-24 bg-neutral flex align-center flex-between"
				style="border-bottom: 1px solid #F5F7FA;"
				v-if="item.carrierCode !== ProductType.QMS && item.products.length > 0 && !isRoute">
				<view class="flex align-center">
					<img :src="URL + '/carrier-logo/' + item.carrierCode + '.png'" class="w-60 h-60" />
					<view class="font36 font-bold ml-12">
						{{item.carrierCode === ProductType.QMS ? '线下运价' : item.carrierCode}}
					</view>
					<view class="ml-15 px-8 py-6 dull-blue bg-light-blue font22 br4">官网原价</view>
				</view>
				<view class="flex align-center light-grey">
					<view>最近更新：{{ formatUpdated(item.products[0]?.modified, 10) }}</view>
					<img src="/static/images/icon/refresh.png" class="w-32 h-32 ml-12"
						@click="refresh(item.carrierCode)">
				</view>
			</view>
			<!-- <view class="py-18 px-24 bg-neutral flex align-center font32 font-bold"
				style="border-bottom: 1px solid #F5F7FA;" v-if="isRoute && item.products.length > 0">
				{{item.products[0].por?.cnName}} - {{item.products[0].fnd?.cnName}}
			</view> -->
			<view v-if="item.products.length > 0" v-for="(el,elIndex) in item.products" :key="elIndex"
				style="border-bottom: 1px solid #F5F7FA" class="p-24 bg-neutral relative font28 font400 grey"
				:class="[isRoute && item.products.length > 0 ? 'mb-20' : '']" @click.stop="jump(el)">
				<view class="pb-18 bg-neutral flex align-center font32 font-bold dull-grey"
					style="border-bottom: 1px solid #F5F7FA;" v-if="isRoute && item.products.length > 0">
					{{item.products[0].por?.cnName}} - {{item.products[0].fnd?.cnName}}
				</view>
				<img v-if="el.channel !== ProductType.QMS" src="/static/images/freight/commercy.png"
					class="absolute left-0 top-0 w-68 h-68" />
				<view class="flex align-center flex-between">
					<view class="flex align-center">
						<img :src="URL + '/carrier-logo/' + el.carrierCode + '.png'" class="w-68 h-68" />
						<view class="flex flex-column font24 ml-24">
							<view v-if="el.channel === ProductType.QMS">最近更新：{{ formatUpdated(el.modified, 10) }}
							</view>
							<view class="flex align-center">
								<view>{{el.carrierCode}}</view>
								<view class="ml-5" v-if="el.vesselName || el.voyNo">{{ el.vesselName }}/{{ el.voyNo }}
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
				<view class="mt-10 flex align-center dull-grey">
					<view class="mr-20">航程：{{ el.voyDays }}天</view>
					<view class="px-20 schedule">船期：{{ el.cutOffDay ? el.cutOffDay + '截' : '-'}}
						{{el.departureDay ? el.departureDay + '开' : '-'}}
					</view>
					<view class="ml-20">{{ el.transit > 0 ? "中转" : "直达" }}</view>
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
	.freight-table {
		.schedule {
			border-left: 1px solid #edeff2;
			border-right: 1px solid #edeff2;
		}
	}
</style>