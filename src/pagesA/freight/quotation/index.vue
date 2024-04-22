<script lang="ts" setup>
	import { onLoad } from '@dcloudio/uni-app';
	import { ref } from 'vue';
	import { Toast } from '@/utils/uniapi/prompt';
	import { invalidateCache, useRequest } from 'alova';
	import { getQuotation } from '@/services/api/user';
	import { BasicArrItem } from '@/services/model/baseModel';
	import CustomLoading from "@/components/Basic-loading/index.vue";

	const loading = ref<boolean>(false)

	const { data: quotationInfo, send: isSend } : any = useRequest(id => getQuotation(id), { immediate: false })
	const quotationData = ref([] as Array<BasicArrItem>)

	onLoad((options : any) => {
		loading.value = true;
		let info = JSON.parse(options.item)
		isSend(info.id)
		invalidateCache(getQuotation(info.id))
		setTimeout(() => {
			quotationInfo.value && init()
		}, 200)
	})

	// 页面初始化
	const init = () => {
		let arr = quotationInfo.value.split('\r\n')
		quotationData.value = []
		arr.map((item : any) => {
			let ele = item.split(':')[0].split('：');
			quotationData.value.push({
				label: ele[0],
				value: ele[1]
			})
		})
		loading.value = false
	}

	const text = ref<string>('')
	// 复制报价单
	const handleClick = async () => {
		let arr = [];
		for (let i in quotationData.value) {
			arr.push({
				name: quotationData.value[i]?.label,
				value: quotationData.value[i]?.value,
			});
		}
		text.value = `${arr.map((item : any) => `${item.name}：${item.value}`).join('\n')}`;
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
	<CustomLoading v-if="loading" iconType="annulus" position="fixed" :zIndex="9" :mask="false" :maskOpacity="1"
		:maskMini="false" :maskDark="true" color="#0396FF" />
	<view class="quotation px-20" v-else>
		<view class="br12 bg-neutral mt-20 my-40">
			<view class="flex align-center font400 font28 light-grey px-24 py-32" v-for="(item,index) in quotationData"
				:key="index" style="border-bottom: 1rpx solid #f5f7fa">
				<view class="mr-10 whitespace-nowrap">{{item.label + ':'}}</view>
				<input type="text" v-model="item.value" class="dull-grey w-full" />
			</view>
		</view>
		<button class="quotation-btn" @click="handleClick">报价单</button>
	</view>
</template>

<style lang="scss" scoped></style>