<script lang="ts" setup>
	import { reactive, ref } from 'vue';
	import { useRouter } from "uni-mini-router";
	import { invalidateCache, useRequest } from "alova";
	import { getAllEnquiryList, putCancelEnquiry, postConfirmEnquiry } from '@/services/api/enquiry';
	import { EnquiryType } from '@/services/model/enquiry';
	import { formatTime } from '@/utils/time';
	import { Toast } from '@/utils/uniapi/prompt';
	import { onShow } from '@dcloudio/uni-app';

	const router = useRouter()

	interface TabsType {
		label : string
		value : string
	}

	const tabs = reactive([
		{
			label: '全部',
			value: ''
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

	const quotations = ref([] as any)

	const current = ref<string | null>('')

	const searchForm = reactive({
		status: ''
	})

	const enquiryOptions = ref<EnquiryType[]>([])

	const quotationsVal = ref<string[]>([])

	onShow(() => {
		invalidateCache(getAllEnquiryList(searchForm))
	})


	const { data: enquiryInfo, send: enquiryInfoSend, onSuccess: enquiryInfoSuccess } : any = useRequest(() => getAllEnquiryList(searchForm), { immediate: true });
	enquiryInfoSuccess(() => {
		console.log(enquiryInfo.value, 'enquiryInfo');
		enquiryOptions.value = enquiryInfo.value
	})

	const { send: confirmEnquirySend, onSuccess: confirmEnquirySuccess } : any =
		useRequest((info) => postConfirmEnquiry(info), { immediate: false });

	const { send: cancelEnquirySend, onSuccess: cancelEnquirySuccess } : any = useRequest((id) => putCancelEnquiry(id), { immediate: false });
	cancelEnquirySuccess(() => {
		Toast('取消成功')
		invalidateCache(getAllEnquiryList(searchForm))
	})


	const onChange = (item : TabsType) => {
		current.value = item.value ?? ''
		searchForm.status = item.value as string
		invalidateCache(enquiryInfoSend())
	}

	const cancelEnquiry = (item : EnquiryType) => {
		console.log(item, 'item');
		cancelEnquirySend(item.id)
	}

	const enquiryId = ref<string>('')
	const changeEnquiry = (item : EnquiryType) => {
		quotationsVal.value = ''
		show.value = true
		quotations.value = item.quotations
		enquiryId.value = item.id as string
		console.log(item, 'item', quotations.value);
	}

	const jump = (id : string) => {
		router.push({
			path: '/pages/myEnquiry/detail?id=' + id
		})
	}

	const onRadioChange = () => {
		console.log(quotationsVal.value, 'q');
		confirmEnquirySend({ id: enquiryId.value, quotationId: quotationsVal.value })
	}

	confirmEnquirySuccess(() => {
		console.log('zzzz');
		Toast('确认报价')
		show.value = false
		invalidateCache(getAllEnquiryList(searchForm))
		invalidateCache(enquiryInfoSend())
	})
</script>

<template>

	<view class="my-enquiry">
		<view class="h-104 bg-neutral flex align-center flex-around pb-20">
			<view v-for="(item,index) in tabs.slice(0,4)" :key="index" class="relative title"
				@click.stop="onChange(item)">
				{{item.label}}
				<span :class="[current === item.value ? 'line' : '']"></span>
			</view>
		</view>
		<view class="mt-20 bg-neutral min-h-340" v-for="(item,index) in enquiryOptions" :key="index"
			@click="jump(item.id)">
			<view style="border-bottom: 1px solid #F0F0F0;"
				class="flex px-24 py-28 align-center flex-between whitespace-nowrap">
				<view>发布日期：{{formatTime(item.createTime as string,'Y-M-D')}}</view>
				<view class="dull-red ml-50">{{tabs.find((items) => items.value === item.status)?.label}}</view>
			</view>
			<view class="dull-grey font-bold font32 px-24 py-24 relative">
				<view>{{item.title}}</view>
				<view class="flex align-center flex-between font28 font400 mt-12">
					<view>预估金额：{{item.estimatedAmount}}</view>
					<view class="flex align-center">
						<view>报价数：{{item.quotationCount}}</view>
						<view class="ml-20">浏览量：{{item.viewCount}}</view>
					</view>
				</view>
				<view v-if="item.quotations.length && item.status === 'QUOTED'"
					style="background: #167fff;float: right;"
					class="br8 neutral ml-12 mt-40 w-160 px-24 py-14 font-400 font28" @click.stop="changeEnquiry(item)">
					选择报价
				</view>
				<view v-if="item.status !== 'CANCELLED'" style="background: #F5F5F5;float: right;"
					class="br8 mt-40 w-160 px-24 py-14 font-400 font28" @click.stop="cancelEnquiry(item)">取消询价
				</view>
			</view>
		</view>
		<u-popup v-model="show" mode="bottom" :closeable="true">
			<view class="" style="height: 500px;">
				<view class="text-center py-30">选择意向报价</view>
				<view v-for="(item, index) in quotations" class="flex align-center flex-between px-20 py-30"
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
	.my-enquiry {
		background: #F7F7F7;
		// overflow: hidden;

		.title {

			.line {
				position: absolute;
				width: 42px;
				height: 4px;
				background: #1677FF;
				bottom: -13px;
				left: -4px;
			}
		}
	}
</style>