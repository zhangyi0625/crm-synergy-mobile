<script lang="ts" setup>
	import { ProductType } from "@/enums/freight";
	import { formatTime } from "@/utils/time";

	const emit = defineEmits(["jumpEither"]);
	interface PropsType {
		data : Array<any>;
	}
	const props = defineProps<PropsType>();

	const URL = import.meta.env.VITE_STATIC_URL;

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
</script>

<template>
	<view class="freight-table mt-10">
		<view v-for="(item, index) in props.data" :key="index"
			class="p-24 bg-neutral mb-10 relative font28 font400 grey" @click.stop="jump(item)">
			<img v-if="item.channel !== ProductType.QMS" src="/static/images/freight/commercy.png"
				class="absolute left-0 top-0 w-68 h-68" />
			<view class="flex align-center flex-between">
				<view class="flex align-center">
					<img :src="URL + '/carrier-logo/' + item.carrierCode + '.png'" class="w-68 h-68" />
					<view class="flex flex-column font24 ml-24">
						<view>运价有效期：{{ formatTime(item.validFrom, "M-D") }} 至
							{{ formatTime(item.validTo, "M-D") }}
						</view>
						<view>{{ item.vesselName }}/{{ item.voyNo }}</view>
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
			<view class="pt-20 flex align-center flex-center light-grey" style="border-top: 1px solid #f5f7fa"
				v-if="item.channel === ProductType.QMS" @click.stop="jump(item, 'CARRIER')">
				查看电商实时运价
				<img src="/static/images/icon/left.png" class="w-16 h-24 ml-8" />
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