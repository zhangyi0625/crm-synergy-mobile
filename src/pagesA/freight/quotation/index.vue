<script lang="ts" setup>
	import { onLoad } from '@dcloudio/uni-app';
	import { ref, reactive } from 'vue';
	import { formatTime } from '@/utils/time';
	// import useClipboard from 'vue-clipboard3'
	import { Toast } from '@/utils/uniapi/prompt';
	import { quotationType } from '../config';

	const quotationForm = reactive<any>({
		portInfo: '',
		voyDaysInfo: '',
		vesselInfo: '',
		carrier: '',
		ctnTypePrice: '',
		otherPrice: ''
	})

	onLoad((options : any) => {
		let info = JSON.parse(options.item)
		quotationForm.portInfo = info.por.cnName + ' - ' + info.fnd.cnName + info.fnd.enName;
		quotationForm.voyDaysInfo = formatTime(info.etd, 'M-D') + ' — ' + formatTime(info.eta, 'M-D') + '/' + info.voyDays;
		quotationForm.vesselInfo = info.vesselName || info.voyNo ? info.vesselName + '/' + info.voyNo : '';
		quotationForm.carrier = info.carrierCode;
		quotationForm.ctnTypePrice = '';
		quotationForm.otherPrice = ''
	})

	const getPriceSheet = (priceType : string) => {

	}

	const text = ref<string>('')

	// 复制报价单
	const handleClick = async () => {
		let arr = [];
		for (let i in quotationForm) {
			arr.push({
				name: quotationType.find((el : any) => el.key === i)?.label,
				value: quotationForm[i],
			});
		}
		text.value = `${arr.map((item : any) => `${item.name}：${item.value}`).join('\n')}`;
		console.log(text.value);
		uni.setClipboardData({
			data: text.value,
			success: () => {
				Toast('复制成功')
			},
			fail: () => {
				Toast('复制失败')
			}
		})
	}
</script>

<template>
	<view class="quotation px-20">
		<view class="br12 bg-neutral mt-20 my-40">
			<view class="flex align-center font400 font28 light-grey px-24 py-32"
				style="border-bottom: 1rpx solid #f5f7fa">
				<view class="mr-10">起运港/目的港：</view>
				<input type="text" v-model="quotationForm.portInfo" class="dull-grey" />
			</view>
			<view class="flex align-center font400 font28 light-grey px-24 py-32"
				style="border-bottom: 1rpx solid #f5f7fa">
				<view class="mr-10">船期/航程：</view>
				<input type="text" v-model="quotationForm.voyDaysInfo" class="dull-grey" />
			</view>
			<view class="flex align-center font400 font28 light-grey px-24 py-32"
				style="border-bottom: 1rpx solid #f5f7fa">
				<view class="mr-10">船名航次：</view>
				<input type="text" v-model="quotationForm.vesselInfo" class="dull-grey" />
			</view>
			<view class="flex align-center font400 font28 light-grey px-24 py-32"
				style="border-bottom: 1rpx solid #f5f7fa">
				<view class="mr-10">船公司：</view>
				<input type="text" v-model="quotationForm.carrier" class="dull-grey" />
			</view>
			<view class="flex align-center font400 font28 light-grey px-24 py-32"
				style="border-bottom: 1rpx solid #f5f7fa">
				<view class="mr-10">箱型/海运费：</view>
				<input type="text" v-model="quotationForm.ctnTypePrice" class="dull-grey" />
			</view>
			<view class="flex align-center font400 font28 light-grey px-24 py-32"
				style="border-bottom: 1rpx solid #f5f7fa">
				<view class="mr-10">附加费：</view>
				<input type="text" v-model="quotationForm.otherPrice" class="dull-grey" />
			</view>
		</view>
		<button class="quotation-btn" @click="handleClick">报价单</button>
	</view>
</template>

<style lang="scss" scoped>
</style>