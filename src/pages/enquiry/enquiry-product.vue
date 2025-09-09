<script lang="ts" setup>
	import { ref } from 'vue';
	import { useRouter } from "uni-mini-router";
	import { invalidateCache, useRequest } from "alova";
	import { postEnquiry, getAllProduct } from '@/services/api/enquiry';
	import { ProductType } from '@/enums/freight';
	import { ProductsType } from '@/services/model/enquiry';
	import { onShow } from '@dcloudio/uni-app';

	const router = useRouter()


	const list = ref<ProductsType[]>([])

	const copyList = ref<ProductType[]>([])

	const value = ref<any>('')

	onShow(() => {
		invalidateCache(getAllProduct())
	})

	const { data: productInfo, send: productSend, onSuccess: productSuccess } : any = useRequest(getAllProduct(), { immediate: true });
	productSuccess(() => {
		keyword.value = ''
		let arr = wx.getStorageSync('product') ? JSON.parse(wx.getStorageSync(('product')) as string) : []
		productInfo.value.map((item : any) => {
			item.productId = item.id
			item.productName = item.name
			item.productModel = item.model
			item.productSpec = item.spec
			item.productUnit = item.unit
			item.productVolt = item.void
			item.qty = 1
			item.checked = arr.filter((items : ProductsType) => items.productId === item.id).length > 0 ? true : false
			item.id = null
		})
		list.value = productInfo.value
		copyList.value = productInfo.value
		console.log(arr, 'arr');
	})

	const radioGroupChange = () => {

	}

	const radioChange = () => {

	}

	const confirm = () => {
		let item = list.value.filter((item) => item.checked)
		wx.setStorageSync('product', JSON.stringify(item))
		let pages : any = getCurrentPages();
		let prevPage = pages[pages.length - 2];
		// uni.setStorageSync('product-item', item)
		// router.back()
		prevPage.$vm["form"] = item;
		// // 返回上级页面的多级参数
		uni.$emit("update", item);
		uni.navigateBack({
			delta: 1,
		});
	}

	const keyword = ref<string>('')

	const onSearch = () => {
		const arr = copyList.value.filter((item) => item.productName?.includes(keyword.value) || item.pinyin?.includes(keyword.value))
		console.log(keyword.value, 'aaaa', arr, copyList.value);
		list.value = arr;
	}
</script>

<template>

	<view class="enquiry-product relative">
		<view style="background: #EDEDED;" class="px-20 py-24">
			型号-电压等级-规格（单位）
		</view>
		<view class="px-20 py-24">
			<u-search placeholder="搜索产品" v-model="keyword" @search="onSearch"></u-search>
		</view>
		<view style="padding-bottom: 100px;">
			<view v-for="(item, index) in list" class="flex align-center flex-between px-20 py-30" :key="index"
				style="border-bottom: 1px solid #F0F0F0;">
				<view>{{item.productName}}</view>
				<u-checkbox-group @change="radioGroupChange">
					<u-checkbox :name="item.productName" v-model="item.checked">
					</u-checkbox>
				</u-checkbox-group>
			</view>
		</view>
		<view class="fixed w-full px-24"
			style="height: 148rpx;bottom:2px;background: #FFFFFF;box-shadow: 0px 0px 4px 0px rgba(0,0,0,0.15);">
			<button class="pwd-btn mt-20" @click="confirm">确定</button>
		</view>
	</view>
</template>

<style lang="scss" scoped>
	.enquiry-product {
		background: #F7F7F7;
	}

	.u-radio {
		width: 100% !important;
		padding: 20px 30px !important;
	}
</style>