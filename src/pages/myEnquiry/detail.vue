<script lang="ts" setup>
	import { onLoad } from '@dcloudio/uni-app';
	import { ref, reactive } from 'vue';
	import { invalidateCache, useRequest } from "alova";
	import { getEnquiryDetail, getEnquiryProductPic, putCancelEnquiry, postConfirmEnquiry } from '@/services/api/enquiry';
	import { EnquiryType } from '@/services/model/enquiry';
	import { formatTime } from '@/utils/time';
	import { Toast } from '@/utils/uniapi/prompt';

	const tabs = reactive([
		{
			label: '全部',
			value: null
		},
		{
			label: '待报价',
			value: 'PENDING_QUOTE'
		},
		{
			label: '已报价',
			value: 'QUOTED'
		},
		{
			label: '已结束',
			value: 'ENDED'
		},
		{
			label: '待审核',
			value: 'PENDING_REVIEW'
		},
		{
			label: '审核不通过',
			value: 'REVIEW_REJECTED'
		},
		{
			label: '已取消',
			value: 'CANCELLED'
		}
	])

	const show = ref<boolean>(false)

	const detail = ref({} as EnquiryType)

	const isExpend = ref<boolean>(false)

	const detailId = ref<string>('')

	const current = ref<string>('')

	const { data: enquiryInfo, send: enquiryInfoSend, onSuccess: enquiryInfoSuccess } : any = useRequest((id) => getEnquiryDetail(id), { immediate: false });

	onLoad((options : any) => {
		console.log(options, 'options');
		detailId.value = options.id
		setTimeout(() => {
			enquiryInfoSend(options.id)
		}, 300)
	})

	const fileList = ref<string[]>([])

	const quotationsVal = ref<string>('')

	enquiryInfoSuccess(() => {
		console.log(enquiryInfo.value, 'enquiryInfo');
		detail.value = enquiryInfo.value
		current.value = enquiryInfo.value.quotations.length ? enquiryInfo.value.quotations[0].id : ''
		fileList.value = []
		if (detail.value.files?.length) {
			detail.value.files.map((item) => {
				getEnquiryProductPic(item).then((res : any) => {
					let url = 'https://sale.zaicang.net/public' + res
					fileList.value.push(url)
					console.log(res, 'res', fileList.value);
				})
			})
		}
	})

	const cancelEnquiry = () => {
		console.log(detail.value, 'item');
		cancelEnquirySend(detail.value.id)
	}

	const { send: cancelEnquirySend, onSuccess: cancelEnquirySuccess } : any = useRequest((id) => putCancelEnquiry(id), { immediate: false });
	cancelEnquirySuccess(() => {
		Toast('取消成功')
		invalidateCache(getEnquiryDetail(detail.value.id as string))
	})

	const { send: confirmEnquirySend, onSuccess: confirmEnquirySuccess } : any =
		useRequest((info) => postConfirmEnquiry(info), { immediate: false });


	const changeEnquiry = () => {
		quotationsVal.value = ''
		show.value = true
	}

	const onRadioChange = () => {
		console.log(quotationsVal.value, 'q');
		// let name = de
		// wx.showModal({
		// 	title: '选择报价确认',
		// 	content: '确定删除该产品吗？',
		// 	success(res) {
		// 		if (res.confirm) {
		// 			productList.value.splice(index, 1)
		// 		}
		// 	}
		// });
		confirmEnquirySend({ id: detail.value.id, quotationId: quotationsVal.value })
	}

	// const changeEnquiry = () => {
	// confirmEnquirySend({ id: detail.value.id, quotationId: current.value })
	// }

	confirmEnquirySuccess(() => {
		Toast('确认报价')
		invalidateCache(getEnquiryDetail(detail.value.id as string))
	})
</script>

<template>
	<view class="myEnquiry-detail relative">
		<view class="status px-24 py-24 w-full font-bold font28 flex flex-column" style="background: #F7F7F7;">
			<view class="flex align-center flex-between">
				<view>{{tabs.find((items) => items.value === detail.status)?.label}}</view>
				<view style="color: #52C41A;" v-if="detail.confirmQuotationId">
					已选择{{detail.quotations.find((item) => item.id === detail.confirmQuotationId).supplierName ?? ''}}为意向报价
				</view>
			</view>
			<view class="light-grey" v-if="detail.status === 'REVIEW_REJECTED' && detail.remark">失败原因:{{detail.remark}}
			</view>
		</view>
		<view class="px-24 py-24 bg-neutral font-400" style="color: #8C8C8C;">
			<view class="dull-grey font32 font-bold">{{detail.title}}</view>
			<view class="flex align-center flex-between mt-24">
				预估金额
				<view class="dull-grey">{{detail.estimatedAmount}}</view>
			</view>
			<view class="flex align-center flex-between mt-24">
				城市/区县
				<view class="dull-grey">{{detail.address}}</view>
			</view>
			<view class="flex align-center flex-between mt-24">
				截止报价日期
				<view class="dull-grey">{{formatTime(detail.deadline as string,'Y-M-D')}}</view>
			</view>
			<view class="flex align-center flex-between mt-24">
				询价创建日期
				<view class="dull-grey">{{formatTime(detail.createTime as string,'Y-M-D')}}</view>
			</view>
		</view>
		<view class="py-24 bg-neutral px-24" style="border-top: 1px solid #F0F0F0;">
			<view class="dull-grey font32 font-bold mb-28">询价清单</view>
			<view class="flex flex-column font28 font400 light-grey"
				:class="[!isExpend ? 'h-180 overflow-hidden' : 'h-full overflow-auto']" style="row-gap: 10px;"
				v-if="detail.products.length">
				<view class="flex align-center flex-between mt-12">
					<view>型号-电压等级-规格（单位）</view>
					<view>数量</view>
				</view>
				<view v-for="(item,index) in detail.products" :key="index" class="flex align-center flex-between mt-12">
					<view>{{item.productName}}</view>
					<view>{{item.qty}}</view>
				</view>
			</view>
			<view class="grid-3-1fr font28 font400 light-grey" style="row-gap: 10px;" v-else>
				<view v-for="(item,index) in fileList" :key="index" class="w-180 h-180">
					<img :src="item" alt="" class="w-full h-full">
				</view>
			</view>
			<view class="flex align-center flex-center pt-25 mt-12" @click.stop="isExpend = !isExpend"
				style="border-top: 1px solid #F0F0F0;">
				<view class="light-grey mr-10">{{!isExpend ? '展开' : '收起'}}</view>
				<img src="/static/images/icon/down.png" class="w-24 h-12" alt=""
					:style="[isExpend ? 'transform: rotateX(180deg)' : 'transform: rotateX(0deg)']">
			</view>
		</view>
		<view class="mt-20 bg-neutral w-full">
			<view class="mx-auto flex flex-column align-center" v-if="!detail.quotations.length">
				<img src="/static/home/empty.png" class="w-120 h-120 mt-80 mb-28" alt="">
				<view class="light-grey font28 font400 mb-80">暂无报价信息</view>
			</view>
			<view v-else>
				<view v-for="(item,index) in detail.quotations" class="flex flex-column" :key="index">
					<view class="flex align-center mr-10 px-24 py-24" style="border-bottom: 1px solid #F5F5F5;">
						<view class="relative">
							{{item.supplierName}}
							<span :class="[current === item.id ? 'line' : '']"></span>
						</view>
					</view>
					<view class="px-24 py-24" style="padding-bottom: 130rpx;">
						<view class="flex align-center flex-between">
							报价日期
							<view>{{formatTime(item.createTime,'Y-M-D')}}</view>
						</view>
						<view class="flex align-center flex-between mt-24">
							报价总金额
							<view class="dull-red">{{item.amount}}</view>
						</view>
						<view class="mt-24">报价清单</view>
						<view class="flex align-center flex-between mt-24 light-grey">
							型号-电压等级-规格（单位）
							<view>数量*单价</view>
						</view>
						<view v-for="(el) in item.items" :key="el.id" class="mt-24">
							<view class="flex align-center flex-between light-grey">
								{{el.name}}
								<view class="dull-grey">{{el.qty}}*{{el.amount}}</view>
							</view>
						</view>
					</view>
				</view>
			</view>
		</view>
		<view v-if="detail.status !== 'CANCELLED'"
			class="fixed bottom-0 h-112 bg-neutral w-full flex flex-end align-center"
			style="margin-top: 118px;bottom: 0;box-shadow: 0px 0px 4px 0px rgba(0,0,0,0.15);">
			<view style="background: #F5F5F5;" class="my-24 mr-24 w-160 px-24 py-14 font-400 font28"
				@click="cancelEnquiry">
				取消询价
			</view>
			<view v-if="detail.quotations.length && detail.status === 'QUOTED'"
				style="background: #167fff;float: right;"
				class="br8 neutral mr-24 my-24 w-160 px-24 py-14 font-400 font28" @click.stop="changeEnquiry">
				选择报价
			</view>
		</view>
		<u-popup v-model="show" mode="bottom" :closeable="true">
			<view class="" style="height: 500px;">
				<view class="text-center py-30">选择意向报价</view>
				<view v-for="(item, index) in detail.quotations" class="flex align-center flex-between px-20 py-30"
					:key="index" style="border-bottom: 1px solid #F0F0F0;">
					<view class="flex flex-column my-10">
						<view>{{item.supplierName}}</view>
						<view class="mt-12 light-grey">报价总金额：{{item.amount}}</view>
					</view>
					<u-radio-group v-model="quotationsVal" @change="onRadioChange">
						<u-radio :name="item.id">
						</u-radio>
					</u-radio-group>
				</view>
			</view>
		</u-popup>
	</view>
</template>

<style lang="scss" scoped>
	.myEnquiry-detail {
		background: #F7F7F7;

		// overflow: hidden;
		.line {
			position: absolute;
			width: 42px;
			height: 4px;
			background: #1677FF;
			bottom: -13px;
			left: 10px;
		}
	}
</style>