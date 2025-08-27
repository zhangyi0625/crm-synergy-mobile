<script lang="ts" setup>
	import { ProductType } from "@/enums/freight";
	import { formatTime, formatUpdated } from "@/utils/time";
	import { getFreightCtnType } from "@/services/api/freight";

	const emit = defineEmits(["jumpEither", "openShrink"]);
	interface PropsType {
		data : Array<any>;
		isSort : string;
		isRoute : boolean;
		customCtnType : any
	}
	const props = defineProps<PropsType>();

	const URL = import.meta.env.VITE_STATIC_URL;
	// 跳转
	const jump = (item : any, type ?: string) => {
		if (type) {
			return
		}
		emit("jumpEither", item, type);
	};

	// 价格展示判断
	const getPrice = (price : string) => {
		let innerPrice = JSON.parse(price);
		// let ctnType = ['20GP', '40GP', '40HQ']
		// let ctnType = [];
		let ctnType = props.customCtnType.results.filter((item : any) => item.isDefault).map((er : any) => er.code);
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
	// 展开折叠
	const openShrink = (carrierCode : string) => {
		emit('openShrink', carrierCode)
	}

	const refreshFreight = () => {
		emit('jumpEither', null, 'jump')
	}
</script>

<template>
	<view class="freight-table mt-10 relative">
		<view v-if="isSort" v-for="(item, index) in props.data" :key="index"
			class="p-24 bg-neutral mb-10 relative font28 font400 grey" @click.stop="jump(item)">
			<img v-if="item.channel !== ProductType.QMS" :src="'/static/images/freight/' + item.channel +
			'.png'" class="absolute left-0 top-0 w-68 h-68" />
			<view class="flex align-center flex-between">
				<view class="flex align-center">
					<img :src="URL + '/carrier-logo/' + item.carrierCode + '.png'" class="w-68 h-68" />
					<view class="flex flex-column font24 ml-24">
						<view v-if="item.channel === ProductType.QMS || item.channel === ProductType.SPOT">
							最近更新：{{ formatUpdated(item.modified, 10) }}
						</view>
						<view class="flex align-center">
							<view>{{item.carrierCode}}</view>
							<view class="ml-20" v-if="item.vesselName || item.voyNo">
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
			<view class="mt-10 flex align-center flex-between dull-grey">
				<view class="flex align-center">
					<view class="mr-20">航程：{{ item.voyDays }}天</view>
					<view class="px-20 schedule">船期：{{ item.cutOffDay ? item.cutOffDay : '-'}} /
						{{item.departureDay ? item.departureDay : '-'}}
					</view>
					<view class="ml-20">{{ item.transit > 0 ? "中转" : "直达" }}</view>
				</view>
				<view v-if="item.tag" :style="[item.tag === '强推' ? 'background: #FF844A' : 'background: #FFB23F']"
					class="font22 font400 neutral px-12 py-2 br8">{{item.tag}}
				</view>
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
		<view v-else>
			<view class="mt-20" v-for="(item, index) in props.data" :key="index">
				<view class="py-18 px-24 bg-neutral flex align-center flex-between"
					style="border-bottom: 1px solid #F5F7FA;"
					v-if="item.carrierCode !== ProductType.QMS && !isRoute && item.products.length > 0"
					@click.stop="openShrink(item.carrierCode)">
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
				<view class="" v-if="item.products.length > 0 && !item.isShrink">

					<view v-for="(el,elIndex) in item.products" :key="elIndex" style="border-bottom: 1px solid #F5F7FA"
						class="p-24 bg-neutral relative font28 font400 grey"
						:class="[isRoute && item.products.length > 0 ? 'mb-20 pb-0' : '']"
						@click.stop="jump(el,item.searchstate)">
						<view class="pb-18 bg-neutral flex align-center font32 font-bold dull-grey"
							style="border-bottom: 1px solid #F5F7FA;" v-if="isRoute && item.products.length > 0">
							{{el.por?.cnName}}{{el.por?.enName}} -
							{{el.fnd?.cnName}}{{el.fnd?.enName}}
						</view>
						<img v-if="el.channel !== ProductType.QMS" :src="'/static/images/freight/' + el.channel +
			'.png'" class="absolute left-0 top-0 w-68 h-68" />
						<view class="flex align-center flex-between"
							:class="[isRoute && item.products.length > 0 ? 'mt-20' : '']">
							<view class="flex align-center">
								<img :src="URL + '/carrier-logo/' + el.carrierCode + '.png'" class="w-68 h-68" />
								<view class="flex flex-column font24 ml-24">
									<view v-if="el.channel === ProductType.QMS || el.channel === ProductType.SPOT">
										最近更新：{{ formatUpdated(el.modified, 10) }}
									</view>
									<view class="flex align-center">
										<view>{{el.carrierCode}}</view>
										<view class="ml-20" v-if="el.vesselName || el.voyNo">
											{{ el.vesselName }}/{{ el.voyNo }}
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
							<view v-if="el.tag"
								:style="[el.tag === '强推' ? 'background: #FF844A' : 'background: #FFB23F']"
								class="font22 font400 neutral px-12 py-2 br8">{{el.tag}}
							</view>
						</view>
						<view class="flex align-center" :class="[el.channel !== ProductType.QMS ? 'mt-24' : 'my-24']">
							<view class="flex flex-column" style="width: 200rpx">
								<view class="light-grey font24 font-bold">库存</view>
								<view class="mt-5 font500 dull-red">{{ el.isSale ? "有" : "无"}}</view>
							</view>
							<view class="flex align-center w-full flex-between">
								<view
									v-for="(price, priceIndex) in getPrice(el.innerPrice ? el.innerPrice : el.outerPrice)"
									:key="priceIndex">
									<p class="light-grey font24 font-bold">{{ priceIndex }}</p>
									<p class="mt-5 font500 dull-red">{{ price ? '$' + price : '-' }}</p>
								</view>
							</view>
						</view>
					</view>
				</view>
			</view>
		</view>
		<view v-if="!isRoute" class="fixed right-0" style="bottom: 160rpx;z-index: 10;" @click="refreshFreight">
			<img src="/static/images/freight/freight.png" class="freight-logo">
		</view>
	</view>
</template>

<style lang="scss" scoped>
	.freight-table {

		height: calc(100% - 140rpx);

		.schedule {
			border-left: 1px solid #edeff2;
			border-right: 1px solid #edeff2;
		}

		.update {
			transition: opacity 1s ease 0s;
			opacity: 1;
		}

		.shrink {
			opacity: 0;
			overflow: hidden;
			transition: opacity .5s ease 0s;
		}

		.freight-logo {
			width: 264rpx;
			height: 128rpx;
		}
	}
</style>